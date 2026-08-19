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
    userInputHandler = new UserInputHandler(viewport, selectionController, physicsController, movementController, uiController);

    document.getElementById("controlsPanelsContainer")!.style.display = "block";
    document.getElementById("listPanelsContainer")!.style.display = "block";

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used

    movementController.moveModel();

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}
