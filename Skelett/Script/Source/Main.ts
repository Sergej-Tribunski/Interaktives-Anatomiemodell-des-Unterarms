namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let distal: ƒ.Node | null = null;
  let middle: ƒ.Node | null = null;
  let rbDistal: ƒ.ComponentRigidbody | null = null;
  let rbMiddle: ƒ.ComponentRigidbody | null = null;

  let rotVector: ƒ.Vector3 = new ƒ.Vector3(0.1, 0, 0);
  let minRotation: number = 0;
  let maxRotation: number = 90;

  let joint: ƒ.JointRevolute | null = null;
  let bodyAnchor: ƒ.ComponentRigidbody | null = null;
  let bodyTied: ƒ.ComponentRigidbody | null = null;
  let axis: ƒ.Vector3 | null = null;
  let localAnchor: ƒ.Vector3 | null = null;



  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    viewport.getBranch();
    let branch: ƒ.Node = viewport.getBranch();

    viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;

    for (let node of branch.getIterator(true)) {
      if (node.name.includes("Arrow")) {
        node.activate(false);
      }
      if (node.name.includes("Joint")) {
        //node.activate(false);
      }
    }
    ƒ.Render.prepare(branch);
    let scene: ƒ.Node = branch.getChildByName("Scene");
    let joints: ƒ.Node = branch.getChildByName("Joints");

    defineRigidBodies(scene);
    defineJoints(joints);




    /* for (let node of branch.getIterator(false)) {
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
    console.log(middle?.getAllComponents()); */


    let material: ƒ.Material = <ƒ.Material>ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];
    for (let node of branch.getIterator(false))
      if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
        let cmpMaterial: ƒ.ComponentMaterial = node.getComponent(ƒ.ComponentMaterial);
        cmpMaterial.material = material;
      }

    /* for (let node of branch.getIterator(false)) {
      console.log(node.name + " has the Components:");
      console.log(node.getAllComponents());
    } */

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used


    /* rbDistal?.setAngularVelocity(rotVector);
    if (rbDistal?.getRotation().x! <= maxRotation) {
      rotVector.set(0.1, 0, 0);
    }
    if (rbDistal?.getRotation().x! >= minRotation) {
      rotVector.set(-0.1, 0, 0);
    } */


    viewport.draw();
    ƒ.AudioManager.default.update();
  }


  function defineRigidBodies(_scene: FudgeCore.Node) {
    for (let node of _scene.getIterator(false)) {
      if (!node.name.includes("Primitive") && !node.name.includes("Scene")) {
        let distal: boolean = false;
        if (node.name.includes("Distal phalanx of second finger"))
          distal = true;
        let cmpRigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(100, distal ? ƒ.BODY_TYPE.DYNAMIC : ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
        cmpRigidbody.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));

        if (node.name.includes("Middle phalanx of second finger")) {
          rbMiddle = cmpRigidbody;
        }
        if (distal) {
          rbDistal = cmpRigidbody;
        }



        node.addComponent(cmpRigidbody);
      }
    }
  }



  function defineJoints(_joints: ƒ.Node) {
    ƒ.Render.prepare(viewport.getBranch());
    for (let node of _joints.getIterator(false)) {
      if (node.name.includes("Joint second distal middle")) {
        defineJoint(node, rbMiddle!, rbDistal!);
      }
    }
  }

  function defineJoint(_node: ƒ.Node, _anchor: ƒ.ComponentRigidbody, _tied: ƒ.ComponentRigidbody) {
    let joint: ƒ.JointRevolute = new ƒ.JointRevolute(_anchor, _tied, _node.mtxWorld.getX().normalize());
    joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxWorld.translation, _anchor.node!.mtxWorld.translation);
    _node.addComponent(joint);
    //ƒ.Vector3.DIFFERENCE(_anchor.node!.mtxWorld.translation, _node.mtxWorld.translation)));
  }

  /* if (node.name.includes("Joint second distal middle")) {
    for (let node of branch.getIterator(false)) {
      if (node.name.includes("Distal phalanx of second finger") && !node.name.includes("Primitive")) {

        distal = node;
        rbDistal = node.getComponent(ƒ.ComponentRigidbody);

        bodyTied = node.getComponent(ƒ.ComponentRigidbody);
        break;
      }
    }
    for (let node of branch.getIterator(false)) {
      if (node.name.includes("Middle phalanx of second finger") && !node.name.includes("Primitive")) {

        middle = node;
        rbMiddle = node.getComponent(ƒ.ComponentRigidbody);

        bodyAnchor = node.getComponent(ƒ.ComponentRigidbody);
        break;
      }
    }
    localAnchor = ƒ.Vector3.DIFFERENCE(node.mtxWorld.translation.clone, bodyAnchor!.node!.mtxWorld.translation);
    axis = node.mtxWorld.getX().normalize();
    joint = new ƒ.JointRevolute(bodyAnchor!, bodyTied!, axis!, localAnchor);
    //joint.minMotor = minRotation;
    //joint.maxMotor = maxRotation;

    bodyAnchor!.node!.addComponent(joint);
  } */
}
