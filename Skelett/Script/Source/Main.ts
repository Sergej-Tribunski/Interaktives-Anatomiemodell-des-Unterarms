namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let distal: ƒ.Node | null = null;
  let middle: ƒ.Node | null = null;
  let rbDistal: ƒ.ComponentRigidbody | null = null;
  let rbMiddle: ƒ.ComponentRigidbody | null = null;
  let joint: ƒ.JointRevolute | null = null;
  let rotVector : ƒ.Vector3 = new ƒ.Vector3(-0.1,0,0);
  let minRotation: number = 0;
  let maxRotation: number = -90;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    viewport.getBranch();
    let branch: ƒ.Node = viewport.getBranch();

    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;

    for (let node of branch.getIterator(true)) {
      if (node.name.startsWith("Arrow"))
        node.activate(false);
    }



    for (let node of branch.getIterator(false)) {
      if (node.name.includes("Middle phalanx of second") && !node.name.includes("Primitive")) {
        middle = node;
      }
      if (node.name.includes("Distal phalanx of second") && !node.name.includes("Primitive")) {
        distal = node;
      }
      if (middle && distal){
        break;
      }
    }
    rbMiddle = new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
    rbMiddle.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));
    rbDistal = new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE);
    rbDistal.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));

    if (rbMiddle && rbDistal){
      let axis: ƒ.Vector3 = middle!.mtxLocal.getX();
      let localAnchor: ƒ.Vector3 = new ƒ.Vector3(
        (distal?.mtxWorld.translation.x! - middle?.mtxWorld.translation.x!)/1.9,
        (distal?.mtxWorld.translation.y! - middle?.mtxWorld.translation.y!)/1.9,
        (distal?.mtxWorld.translation.z! - middle?.mtxWorld.translation.z!)/1.9
      );
        axis.normalize();
        console.log("Axis : ", axis);
      joint = new ƒ.JointRevolute(
        rbMiddle,
        rbDistal,
        axis,
        localAnchor
      );
      joint.minMotor = maxRotation;
      joint.maxMotor = minRotation;
    }



    if (rbDistal && rbMiddle && middle && joint){
      middle.addComponent(rbMiddle);
      distal?.addComponent(rbDistal);
      middle.addComponent(joint);
    }
    ƒ.Render.prepare(branch);

    console.log(distal?.name);
    console.log(distal?.getAllComponents());
    console.log(middle?.name);
    console.log(middle?.getAllComponents());


    let material: ƒ.Material = <ƒ.Material>ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];
    for (let node of branch.getIterator(false))
      if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
        let cmpMaterial: ƒ.ComponentMaterial = node.getComponent(ƒ.ComponentMaterial);
        cmpMaterial.material = material;
      }

    /* for (let node of branch.getIterator(false)) {
      console.log("Node " + node.name + " has the Components:");
      console.log(node.getAllComponents());
    } */
   console.log("Middle: ", middle?.mtxLocal.translation);
   console.log("Distal: ", distal?.mtxLocal.translation);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used

    rbDistal?.setAngularVelocity(rotVector);
    if(rbDistal?.getRotation().x! <= maxRotation){
      rotVector.set(0.1,0,0);
    }
    if(rbDistal?.getRotation().x! >= minRotation){
      rotVector.set(-0.1,0,0);
    }
    

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}