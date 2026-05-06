namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  //let middleFinger: ƒ.Node | null = null;

  let secondDistal: ƒ.Node | null = null;
  let secondMiddle: ƒ.Node | null = null;
  let secondProximal: ƒ.Node | null = null;
  let secondMetacarpal: ƒ.Node | null = null;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    /* viewport.camera.mtxPivot.translateX(-0.26);
    viewport.camera.mtxPivot.translateY(0.7);
    viewport.camera.mtxPivot.translateZ(4.7); */

    viewport.getBranch();
    let branch: ƒ.Node = viewport.getBranch();

    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;


/*     for (let node of branch.getIterator(true))
      if (node.name.startsWith("Proximal phalanx of third finger")) {
        middleFinger = node;
        break;
      }
    console.log(middleFinger);
    middleFinger?.addComponent(new ƒ.ComponentRigidbody(0, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE)); */


    for (let node of branch.getIterator(true)) {
      if (node.name.startsWith("Distal phalanx of second finger") && !node.name.endsWith("Primitive0") && !node.name.endsWith("Primitive1"))
        secondDistal = node;
      if (node.name.startsWith("Middle phalanx of second finger") && !node.name.endsWith("Primitive0") && !node.name.endsWith("Primitive1"))
        secondMiddle = node;
      if (node.name.startsWith("Proximal phalanx of second finger") && !node.name.endsWith("Primitive0") && !node.name.endsWith("Primitive1"))
        secondProximal = node;
      if (node.name.startsWith("Second metacarpal") && !node.name.endsWith("Primitive0") && !node.name.endsWith("Primitive1"))
        secondMetacarpal = node;
    }
    /*     secondMetacarpal!.addChild(secondProximal!);
        secondProximal!.addChild(secondMiddle!);
        secondMiddle!.addChild(secondDistal!); */

    secondDistal?.addComponent(new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE));
    secondMiddle?.addComponent(new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE));
    secondProximal?.addComponent(new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE));
    secondMetacarpal?.addComponent(new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE));

    let rbMetacarpal = secondMetacarpal?.getComponent(ƒ.ComponentRigidbody);
    rbMetacarpal?.mtxPivot.scale(new ƒ.Vector3(0.01, 0.01, 0.01));
    let rbProximal = secondProximal?.getComponent(ƒ.ComponentRigidbody);
    rbProximal?.mtxPivot.scale(new ƒ.Vector3(0.01, 0.01, 0.01));
    let rbMiddle = secondMiddle?.getComponent(ƒ.ComponentRigidbody);
    rbMiddle?.mtxPivot.scale(new ƒ.Vector3(0.01, 0.01, 0.01));
    let rbDistal = secondDistal?.getComponent(ƒ.ComponentRigidbody);
    rbDistal?.mtxPivot.scale(new ƒ.Vector3(0.01, 0.01, 0.01));

    if (rbMetacarpal && rbProximal) {
      let joint = new ƒ.JointRevolute(
        rbMetacarpal,
        rbProximal,
        ƒ.Vector3.X()
      );
      joint.anchor = new ƒ.Vector3(-0.285, -0.76, -0.04);
      secondMetacarpal?.addComponent(joint);
    }
    if (rbProximal && rbMiddle){
      let joint = new ƒ.JointRevolute(
        rbProximal,
        rbMiddle,
        ƒ.Vector3.X()
      );
      joint.anchor = new ƒ.Vector3(-0.315, -0.727, -0.063);
      secondProximal?.addComponent(joint);
    }
    if (rbMiddle && rbDistal){
      let joint = new ƒ.JointRevolute(
        rbMiddle,
        rbDistal,
        ƒ.Vector3.X()
      );
      joint.anchor = new ƒ.Vector3(-0.315, -0.727, -0.063);
      secondMiddle?.addComponent(joint);
    }

    for (let node of branch.getIterator(true)) {
      if (!(node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1"))) {
        console.log("Found Node: " + node.name)
      }
      if (node.name.startsWith("Arrow"))
        node.activate(false);
    }

    let material: ƒ.Material = <ƒ.Material>ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];
    for (let node of branch.getIterator(true))
      if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
        //console.log("Node " + node.name + " has the components:")
        let cmpMaterial: ƒ.ComponentMaterial = node.getComponent(ƒ.ComponentMaterial);
        cmpMaterial.material = material;
      }



    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used
    //middleFinger?.mtxLocal.rotateX(1);
    //secondProximal?.mtxLocal.rotateX(1);

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}
//Proximal phalanx of third finger of hand.l