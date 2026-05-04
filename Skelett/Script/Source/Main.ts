namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);
  let middleFinger: ƒ.Node | null = null;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    viewport.getBranch();
    let branch: ƒ.Node = viewport.getBranch();

    for (let node of branch.getIterator(true))
      if (node.name.startsWith("Proximal phalanx of third finger")) {
        middleFinger = node;
        break;
      }
    console.log(middleFinger);

    let material: ƒ.Material = <ƒ.Material>ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];

    for (let node of branch.getIterator(true))
      if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
        //console.log("Node " + node.name + " has the components:")
        let cmpMaterial:ƒ.ComponentMaterial = node.getComponent(ƒ.ComponentMaterial);
        cmpMaterial.material = material;
      }

    middleFinger?.addComponent(new ƒ.ComponentRigidbody(0, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE));

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used
    middleFinger?.mtxLocal.rotateX(1);

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}
//Proximal phalanx of third finger of hand.l