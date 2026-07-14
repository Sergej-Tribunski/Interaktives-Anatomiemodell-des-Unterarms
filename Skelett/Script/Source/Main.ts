namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);


  let scene: ƒ.Node | null = null;
  let joints: ƒ.Node | null = null;
  let rotAxis: ƒ.Vector3 | undefined = undefined;
  let selectedBones: ƒ.ComponentRigidbody[] = [];
  let timer: number = 0;
  let direction: number = 1;
  let deltaTime: number = 0;

  let flexStrength: number = 10;
  let flexDirection: number = 1;
  let abductStrength: number = 10;
  let abductDirection: number = 1;
  let movementEnabled: boolean = false;


  let anchoringJoint: Map<ƒ.ComponentRigidbody, Joint> = new Map();
  enum AXIS { FLEXTION, ABDUCTION, TWIST };


  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    viewport.getBranch();
    let branch: ƒ.Node = viewport.getBranch();

    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;

    for (let node of branch.getIterator(true)) {
      if (node.name.includes("Arrow")) {
        node.activate(false);
      }
      if (node.name.includes("Joint ")) {
        node.activate(false);
      }
    }

    ƒ.Render.prepare(branch);
    scene = branch.getChildByName("Scene");
    joints = branch.getChildByName("Joints");

    defineRigidBodies(scene);
    defineJoints(joints);


    let material: ƒ.Material = <ƒ.Material>ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];
    for (let node of branch.getIterator(false))
      if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
        let cmpMaterial: ƒ.ComponentMaterial = node.getComponent(ƒ.ComponentMaterial);
        cmpMaterial.material = material;
      }

    for (let node of scene.getChildren()) {
      selectBone(node.getComponent(ƒ.ComponentRigidbody));
    }

    viewport.canvas.addEventListener("mousedown", hndSelection);
    viewport.canvas.addEventListener("keydown", hndDeselectAll)

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

    document.getElementById("controls")!.style.display = "block";
    document.getElementById("controls")!.style.display = "flex";
    document.getElementById("selectedBonesPanel")!.style.display = "block";




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


  function defineRigidBodies(_scene: ƒ.Node) {
    for (let node of _scene.getIterator(false)) {
      if (!node.name.includes("Primitive") && !node.name.includes("Scene")) {
        let cmpRigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(10, node.name.includes("Humerus") ? ƒ.BODY_TYPE.STATIC : ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE);
        cmpRigidbody.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));
        //cmpRigidbody.effectGravity = 0;
        node.addComponent(cmpRigidbody);
      }
    }
  }


  function resolveJoint(_body: ƒ.Node | string | undefined): ƒ.Node | null {
    if (!_body) {
      return null;
    }
    if (typeof _body === "string") {
      return scene?.getChildByName(_body)!;
    }
    return _body;
  }

  function defineJoints(_joints: ƒ.Node) {
    ƒ.Render.prepare(viewport.getBranch());
    for (let node of _joints.getIterator(false)) {
      if (node.name.startsWith("Joint ")) {
        defineJoint(node, resolveJoint(node.getComponent(Joint).bodyAnchor)?.getComponent(ƒ.ComponentRigidbody)!, resolveJoint(node.getComponent(Joint).bodyTied)?.getComponent(ƒ.ComponentRigidbody)!);
        anchoringJoint.set(resolveJoint(node.getComponent(Joint).bodyTied)?.getComponent(ƒ.ComponentRigidbody)!, node.getComponent(Joint));
      }
    }
  }

  function defineJoint(_jointNode: ƒ.Node, _anchor: ƒ.ComponentRigidbody, _tied: ƒ.ComponentRigidbody) {
    if (_jointNode.getComponent(Joint).jointType == JOINT_TYPE.REVOLUTE) {
      let joint: ƒ.JointRevolute = new ƒ.JointRevolute(_anchor, _tied, _jointNode.mtxLocal.getX().normalize());
      joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxWorld.translation, _anchor.node!.mtxWorld.translation);
      joint.minMotor = -_jointNode.getComponent(Joint).flexInLimit;
      joint.maxMotor = _jointNode.getComponent(Joint).flexOutLimit;
      _jointNode.addComponent(joint);
      //console.log("Joint Revolute would be added.");
    }

    if (_jointNode.getComponent(Joint).jointType == JOINT_TYPE.UNIVERSAL) {
      let joint: ƒ.JointUniversal = new ƒ.JointUniversal(_anchor, _tied, _jointNode.mtxLocal.getX().normalize(), _jointNode.mtxLocal.getY().normalize());
      joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxWorld.translation, _anchor.node!.mtxWorld.translation);
      joint.minRotorFirst = -_jointNode.getComponent(Joint).flexInLimit;
      joint.maxRotorFirst = _jointNode.getComponent(Joint).flexOutLimit;
      joint.minRotorSecond = -_jointNode.getComponent(Joint).abductLeftLimit;
      joint.maxRotorSecond = _jointNode.getComponent(Joint).abductRightLimit;
      _jointNode.addComponent(joint);
      //console.log("Joint Universal would be added.");
    }

    if (_jointNode.getComponent(Joint).jointType == JOINT_TYPE.RAGDOLL) {
      let joint: ƒ.JointRagdoll = new ƒ.JointRagdoll(_anchor, _tied, _jointNode.mtxLocal.getX().normalize(), _jointNode.mtxLocal.getY().normalize());
      joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxLocal.translation, _anchor.node!.mtxLocal.translation);
      joint.maxAngleFirstAxis = -_jointNode.getComponent(Joint).flexOutLimit;
      joint.maxAngleSecondAxis = _jointNode.getComponent(Joint).flexInLimit;
      joint.minMotorTwist = -_jointNode.getComponent(Joint).twistCounterClockwiseLimit;
      joint.maxMotorTwist = _jointNode.getComponent(Joint).twistClockwiseLimit;
      _jointNode.addComponent(joint);
      //console.log("Joint Ragdoll would be added.");
    }
    if (_jointNode.getComponent(Joint).jointType == JOINT_TYPE.WELDING) {
      let joint: ƒ.JointWelding = new ƒ.JointWelding(_anchor, _tied);
      joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxLocal.translation, _anchor.node!.mtxLocal.translation);
      _jointNode.addComponent(joint);
      //console.log("Joint Welding would be added.");
    }
  }

  function selectBone(_rb: ƒ.ComponentRigidbody): void {
    if (!selectedBones.includes(_rb)) {
      selectedBones.push(_rb);
      console.log("Select: ", _rb.node?.name);

      updatedSelectedBonesList();
    }
  }
  function deselectBone(_rb: ƒ.ComponentRigidbody): void {
    let index = selectedBones.indexOf(_rb, 0);
    selectedBones.splice(index, 1);
    console.log("Deselect: ", _rb.node?.name);
    updatedSelectedBonesList();
  }
  function deselectAllBones(): void {
    selectedBones.length = 0;
    console.log("Deselect all!");
    updatedSelectedBonesList();
  }
  function updatedSelectedBonesList(): void {
    const list: HTMLUListElement = document.getElementById("selectedBonesList") as HTMLUListElement;
    list.innerHTML = "";
    for (let rb of selectedBones) {
      const item: HTMLLIElement = document.createElement("li");
      item.textContent = rb.node?.name ?? "Unknown";
      list.appendChild(item);
    }
  }

  function rotateBones(_strengthFirst: number, _directionFirst: number, _strengthSecond: number, _directionSecond: number): void {
    for (let rb of selectedBones) {
      if (anchoringJoint.get(rb)?.jointType == JOINT_TYPE.REVOLUTE) {
        rotateBoneRevolute(rb, _strengthFirst, _directionFirst);
      }
      if (anchoringJoint.get(rb)?.jointType == JOINT_TYPE.UNIVERSAL) {
        rotateBoneUniversal(rb, _strengthFirst, _directionFirst, _strengthSecond, _directionSecond);
      }
      if (anchoringJoint.get(rb)?.jointType == JOINT_TYPE.RAGDOLL) {
        rotateBoneRagdoll(rb, _strengthFirst, _directionFirst, _strengthSecond, _directionSecond);
      }
    }
  }

  function rotate(_rb: ƒ.ComponentRigidbody, _strength: number, _direction: number, _axis: AXIS): void {
    _strength *= -1;

    if (_axis === AXIS.FLEXTION)
      rotAxis = ƒ.Vector3.TRANSFORMATION(anchoringJoint.get(_rb)!.node!.mtxLocal.getX(), _rb.node!.mtxWorld, false).normalize();
    if (_axis === AXIS.ABDUCTION)
      rotAxis = ƒ.Vector3.TRANSFORMATION(anchoringJoint.get(_rb)!.node!.mtxLocal.getY(), _rb.node!.mtxWorld, false).normalize();
    if (_axis === AXIS.TWIST)
      rotAxis = ƒ.Vector3.TRANSFORMATION(anchoringJoint.get(_rb)!.node!.mtxLocal.getZ(), _rb.node!.mtxWorld, false).normalize();

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
    if (!(_event.button == 0 && _event.ctrlKey))
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

    if (selectedBones.includes(rb))
      deselectBone(rb);
    else
      selectBone(rb);
  }

  function hndDeselectAll(_event: KeyboardEvent): void {
    if (_event.key === "Escape") {
      deselectAllBones();
    }
  }
}
