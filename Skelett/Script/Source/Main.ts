namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let scene: ƒ.Node | null = null;
  let joints: ƒ.Node | null = null;


  let rbSecondDistal: ƒ.ComponentRigidbody | null = null;
  let testVectorX: ƒ.Vector3 = new ƒ.Vector3(1, 0, 0);
  let testVectorY: ƒ.Vector3 = new ƒ.Vector3(0, 1, 0);
  let testVectorZ: ƒ.Vector3 = new ƒ.Vector3(0, 0, 1);
  let rbFirstMetacarpal: ƒ.ComponentRigidbody | null = null;
  let testVectorJ: ƒ.Vector3 | null = null;



  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    //viewport.camera.mtxPivot.translateX(50);

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

    /* for (let node of branch.getIterator(false)) {
      console.log(node.name + " has the Components:");
      console.log(node.getAllComponents());
    } */

    rbSecondDistal = scene.getChildByName("Distal phalanx of second finger of hand.r").getComponent(ƒ.ComponentRigidbody);
    rbFirstMetacarpal = scene.getChildByName("First metacarpal bone.r").getComponent(ƒ.ComponentRigidbody);


    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    ƒ.Physics.simulate();  // if physics is included and used

    //rbSecondDistal!.applyTorque(testVector);  //seems to rotate Y relative to distal
    //rbSecondDistal!.applyForce(testVector);     //up vertically
    //rbSecondDistal!.setVelocity(testVector);    //up vertically
    //rbSecondDistal!.setAngularVelocity(testVector); //Y relative to distal
    //rbSecondDistal!.applyLinearImpulse(testVector); //up vertically
    //rbSecondDistal!.applyAngularImpulse(testVector); //y rel dist
    //rbSecondDistal!.addVelocity(testVector); //y up
    //rbSecondDistal!.addAngularVelocity(testVector); //y rel dist

    //changing vector to x or z behaves unexpectedly, test more

    //try hinge joint on thumb, see what changing the vector does
    rbFirstMetacarpal!.applyTorque(testVectorX);


    viewport.draw();
    ƒ.AudioManager.default.update();
  }


  function defineRigidBodies(_scene: ƒ.Node) {
    for (let node of _scene.getIterator(false)) {
      if (!node.name.includes("Primitive") && !node.name.includes("Scene")) {                                                                   //WIP change bodytype to dynamic
        let cmpRigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(1, node.name.includes("Humerus") ? ƒ.BODY_TYPE.STATIC : ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
        //WIP remove if-statements when done testing
        if (node.name.includes("Distal ")) {
          cmpRigidbody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
        }
        if (node.name.includes("Middle ")) {
          cmpRigidbody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
        }
        if (node.name.includes("Proximal ")) {
          cmpRigidbody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
        }
        if (node.name.includes("First metacarpal")) {
          cmpRigidbody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
        }

        cmpRigidbody.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));
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
      }
    }
  }


  function defineJoint(_node: ƒ.Node, _anchor: ƒ.ComponentRigidbody, _tied: ƒ.ComponentRigidbody) {
    if (_node.getComponent(Joint).jointType == JOINT_TYPE.REVOLUTE) {
      let joint: ƒ.JointRevolute = new ƒ.JointRevolute(_anchor, _tied, _node.mtxWorld.getX().normalize());
      joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxWorld.translation, _anchor.node!.mtxWorld.translation);
      joint.minMotor = -_node.getComponent(Joint).rotIn;
      joint.maxMotor = _node.getComponent(Joint).rotOut;
      _node.addComponent(joint);
    }

    if (_node.getComponent(Joint).jointType == JOINT_TYPE.UNIVERSAL) {
      let joint: ƒ.JointUniversal = new ƒ.JointUniversal(_anchor, _tied, _node.mtxLocal.getX().normalize(), _node.mtxLocal.getY().normalize());
      joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxWorld.translation, _anchor.node!.mtxWorld.translation);
      joint.minRotorFirst = -_node.getComponent(Joint).rotIn;
      joint.maxRotorFirst = _node.getComponent(Joint).rotOut;
      joint.minRotorSecond = -_node.getComponent(Joint).rotLeft;
      joint.maxRotorSecond = _node.getComponent(Joint).rotRight;
      _node.addComponent(joint);
    }
  }
}
