namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let userInputHandler: UserInputHandler;
  let prepareVisuals: PrepareVisuals;
  let physicsController: PhysicsController;
  let prepareRbs: PrepareRigidbodies;
  let prepareJoints: PrepareJoints;
  let uiController: UIController;
  let selectionController: SelectionController;





  let rotAxis: ƒ.Vector3 | undefined = undefined;

  let timer: number = 0;
  let direction: number = 1;
  let deltaTime: number = 0;

  let flexStrength: number = 10;
  let flexDirection: number = 1;
  let abductStrength: number = 10;
  let abductDirection: number = 1;
  let movementEnabled: boolean = false;

  enum AXIS { FLEXTION, ABDUCTION, TWIST };


  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.getBranch();
    let branch: ƒ.Node = viewport.getBranch();
    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;
    ƒ.Render.prepare(branch);
    let scene = branch.getChildByName("Scene");

    userInputHandler = new UserInputHandler(viewport);
    prepareVisuals = new PrepareVisuals(branch);
    physicsController = new PhysicsController(scene);
    prepareRbs = new PrepareRigidbodies(scene);
    prepareJoints = new PrepareJoints(branch);
    uiController = new UIController();
    selectionController = new SelectionController(scene);

    prepareRbs.onRbCreated = (_rb) => {
      physicsController.changeBodyType(_rb);
    }
    physicsController.onSimulatedBonesChanged = (boneName, isInList) => {
      uiController.updateSimulatedBonesList(boneName, isInList);
    }
    selectionController.onSelectedBonesChanged = (boneName, isInList) => {
      uiController.updateSelectedBonesList(boneName, isInList);
    }

    viewport.canvas.addEventListener("mousedown", hndSelection);
    viewport.canvas.addEventListener("keydown", hndApplyToAllBones)

    const flexStrengthInput =
      document.getElementById("flexStrength") as HTMLInputElement;

    const flexDirectionInput =
      document.getElementById("flexDirection") as HTMLSelectElement;

    const abductStrengthInput =
      document.getElementById("abductStrength") as HTMLInputElement;

    const abductDirectionInput =
      document.getElementById("abductDirection") as HTMLSelectElement;

    const toggleButton =
      document.getElementById("toggleMovement") as HTMLButtonElement;

    const deactivateSelectedBones =
      document.getElementById("deactivateSelectedBones") as HTMLButtonElement;

    const resetPage =
      document.getElementById("resetPage") as HTMLButtonElement;


    flexStrengthInput.addEventListener("input", () => {
      flexStrength = Number(flexStrengthInput.value);
    });

    flexDirectionInput.addEventListener("change", () => {
      flexDirection = Number(flexDirectionInput.value);
    });

    abductStrengthInput.addEventListener("input", () => {
      abductStrength = Number(abductStrengthInput.value);
    });

    abductDirectionInput.addEventListener("change", () => {
      abductDirection = Number(abductDirectionInput.value);
    });

    toggleButton.addEventListener("click", () => {
      movementEnabled = !movementEnabled;
      toggleButton.textContent =
        movementEnabled ? "Stop Movement" : "Start Movement";
    });

    /*     deactivateSelectedBones.addEventListener("click", () => {
          deactivateSelectedBonesHandler();
        });
    
        resetPage.addEventListener("click", () => {
          resetPageHandler();
        }) */

    document.getElementById("controlsPanelsContainer")!.style.display = "block";
    document.getElementById("listPanelsContainer")!.style.display = "block";


    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used

    deltaTime = ƒ.Loop.timeFrameGame / 1000;
    timer += deltaTime;
    if (timer >= 5) {
      timer = 0;
      direction *= -1;
    }

    if (movementEnabled) {
      rotateBones(
        flexStrength,
        flexDirection,
        abductStrength,
        abductDirection
      );
    }

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  /*   function deactivateSelectedBonesHandler(): void {
      for (let bone of selectedBones) {
        bone.node?.activate(false);
        //not gonna work like this - the bones are invisible, but the rigidbodies are still connected and rotate with the other bones -> needs more force
        //gonna have to use ƒ.Joint.disconnect(), which will need the old anchoringJoints map to keep information to reconnect it
      }
    }
  
    function resetPageHandler(): void {
      for (let bone of selectedBones) {
        bone.node?.activate(true);
        //gotta change back to old anchoringJoint map using Joint.ts (instead of ƒ.Joint...) for easy access to information to reconnect
        //might need to store info of default bone locations
      };
    } */

  function rotateBones(_strengthFirst: number, _directionFirst: number, _strengthSecond: number, _directionSecond: number): void {
    for (let rb of selectedBones) {
      if (prepareJoints.getAnchoringJoint().get(rb) instanceof ƒ.JointRevolute) {
        rotateBoneRevolute(rb, _strengthFirst, _directionFirst);
      }
      if (prepareJoints.getAnchoringJoint().get(rb) instanceof ƒ.JointUniversal) {
        rotateBoneUniversal(rb, _strengthFirst, _directionFirst, _strengthSecond, _directionSecond);
      }
      if (prepareJoints.getAnchoringJoint().get(rb) instanceof ƒ.JointRagdoll) {
        rotateBoneRagdoll(rb, _strengthFirst, _directionFirst, _strengthSecond, _directionSecond);
      }
    }
  }

  function rotate(_rb: ƒ.ComponentRigidbody, _strength: number, _direction: number, _axis: AXIS): void {
    _strength *= -1;

    if (_axis === AXIS.FLEXTION)
      rotAxis = ƒ.Vector3.TRANSFORMATION(prepareJoints.getAnchoringJoint().get(_rb)!.node!.mtxLocal.getX(), _rb.node!.mtxWorld, false).normalize();
    if (_axis === AXIS.ABDUCTION)
      rotAxis = ƒ.Vector3.TRANSFORMATION(prepareJoints.getAnchoringJoint().get(_rb)!.node!.mtxLocal.getY(), _rb.node!.mtxWorld, false).normalize();
    if (_axis === AXIS.TWIST)
      rotAxis = ƒ.Vector3.TRANSFORMATION(prepareJoints.getAnchoringJoint().get(_rb)!.node!.mtxLocal.getZ(), _rb.node!.mtxWorld, false).normalize();

    rotAxis?.normalize();
    rotAxis?.scale(_direction * _strength);

    _rb.applyTorque(rotAxis!);
  }

  function rotateBoneRevolute(_rb: ƒ.ComponentRigidbody, _strengthFlexion: number, _directionFlexion: number): void {
    rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
  }

  function rotateBoneUniversal(_rb: ƒ.ComponentRigidbody, _strengthFlexion: number, _directionFlexion: number, _strengthAbduction: number, _directionAbduction: number): void {
    rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
    rotate(_rb, _strengthAbduction, _directionAbduction, AXIS.ABDUCTION);
  }

  function rotateBoneRagdoll(_rb: ƒ.ComponentRigidbody, _strengthFlexion: number, _directionFlexion: number, _strengthTwist: number, _directionTwist: number): void {
    rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
    rotate(_rb, _strengthTwist, _directionTwist, AXIS.TWIST);
  }

  function hndSelection(_event: MouseEvent): void {
    if (_event.button != 0)
      return;
    let picks: ƒ.Pick[] = ƒ.Picker.pickViewport(viewport, new ƒ.Vector2(_event.clientX, _event.clientY));
    if (picks.length == 0)
      return;
    picks.sort((a, b) => a.zBuffer - b.zBuffer);
    let node: ƒ.Node = picks[0].node;
    while (node && !node.getComponent(ƒ.ComponentRigidbody))
      node = node.getParent()!;
    if (!node)
      return;
    let rb: ƒ.ComponentRigidbody = node.getComponent(ƒ.ComponentRigidbody);

    if (_event.shiftKey) {
      changeBodyType(rb, rb.node?.name!);
    }
    if (_event.ctrlKey) {
      if (selectedBones.includes(rb))
        deselectBone(rb);
      else
        selectBone(rb);
    }
  }

  function hndApplyToAllBones(_event: KeyboardEvent): void {
    if (_event.key === "Q")
      deselectAllBones();
    if (_event.key === "E")
      selectAllBones();
    if (_event.key === "A")
      changeAllBodiesToStatic();
    if (_event.key === "D")
      changeAllBodiesToDynamic();
  }

  function togglePanel(_header: HTMLElement): void {
    console.log("togglePanel called!");
    const panelContent = _header.nextElementSibling as HTMLElement;
    const isCollapsed = panelContent.classList.contains("collapsed");

    if (isCollapsed) {
      panelContent.classList.remove("collapsed");
    } else {
      panelContent.classList.add("collapsed");
    }
  }
  (<any>window).togglePanel = togglePanel;
}
