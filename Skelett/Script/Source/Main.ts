namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let timer: number = 0;
  let direction: number = 1;
  let deltaTime: number = 0;

  let userInputHandler: UserInputHandler;
  let prepareVisuals: PrepareVisuals;
  let physicsController: PhysicsController;
  let prepareRbs: PrepareRigidbodies;
  let prepareJoints: PrepareJoints;
  let uiController: UIController;
  let selectionController: SelectionController;
  let movementController: MovementController;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.getBranch();
    let branch: ƒ.Node = viewport.getBranch();
    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;
    ƒ.Render.prepare(branch);
    let scene = branch.getChildByName("Scene");

    uiController = new UIController();
    prepareVisuals = new PrepareVisuals(branch);
    physicsController = new PhysicsController(scene, uiController);
    prepareRbs = new PrepareRigidbodies(scene, physicsController);
    prepareJoints = new PrepareJoints(branch);
    selectionController = new SelectionController(scene, uiController);
    movementController = new MovementController(prepareJoints, selectionController, uiController);
    userInputHandler = new UserInputHandler(viewport, selectionController, physicsController, movementController);

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
    movementController.moveModel();

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
