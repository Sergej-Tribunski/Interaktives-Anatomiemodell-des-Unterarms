namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);


  let scene: ƒ.Node | null = null;
  let joints: ƒ.Node | null = null;
  //let rbFirstMetacarpal: ƒ.ComponentRigidbody | null = null;
  let rotAxis: ƒ.Vector3 | undefined = undefined;
  let selectedBones: ƒ.ComponentRigidbody[] = [];
  let timer: number = 0;
  let direction: number = 1;
  let deltaTime: number = 0;


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

    //bFirstMetacarpal = scene.getChildByName("First metacarpal bone.r").getComponent(ƒ.ComponentRigidbody);

    //TODO
    //Test for selectedBones - this needs to be Handeled with eventlisteners later
    for (let node of scene.getChildren()) {
      selectBone(node.getComponent(ƒ.ComponentRigidbody));
    }




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
    //rbFirstMetacarpal!.applyTorque(testVectorX);
    /* testVectorJ = rbSecondDistal?.node?.mtxLocal.getX();
    rbSecondDistal?.applyTorque(testVectorJ!.scale(-1));
    readVectors(); */

    deltaTime = ƒ.Loop.timeFrameGame / 1000;
    timer += deltaTime;
    if (timer >= 5) {
      timer = 0;
      direction *= -1;
    }
    rotateBones(0, 0, 20, direction);

    viewport.draw();
    ƒ.AudioManager.default.update();
  }

  /* function readVectors() {
    console.log("Node mtxLocal X: ", rbSecondDistal!.node?.mtxLocal.getX());
    console.log("Node mtxLocal Y: ", rbSecondDistal!.node?.mtxLocal.getY());
    console.log("Node mtxLocal Z: ", rbSecondDistal!.node?.mtxLocal.getZ());

    console.log("Node mtsWorld X: ", rbSecondDistal!.node?.mtxWorld.getX());
    console.log("Node mtxWorld Y: ", rbSecondDistal!.node?.mtxWorld.getY());
    console.log("Node mtxWorld Z: ", rbSecondDistal!.node?.mtxWorld.getZ());

    console.log("Rb mtxLocal X: ", rbSecondDistal!.mtxPivot.getX());
    console.log("Rb mtxLocal Y: ", rbSecondDistal!.mtxPivot.getY());
    console.log("Rb mtxLocal Z: ", rbSecondDistal!.mtxPivot.getZ());

    console.log("testVectorJ: ", testVectorJ);
  } */

  function defineRigidBodies(_scene: ƒ.Node) {
    for (let node of _scene.getIterator(false)) {
      if (!node.name.includes("Primitive") && !node.name.includes("Scene")) {                                                                   //WIP change bodytype to dynamic (only the humerus stays static)
        let cmpRigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(10, node.name.includes("Humerus") ? ƒ.BODY_TYPE.STATIC : ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
        //WIP remove if-statements when done placing all joints in the editor
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
        cmpRigidbody.effectGravity = 0;
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

  function defineJoint(_node: ƒ.Node, _anchor: ƒ.ComponentRigidbody, _tied: ƒ.ComponentRigidbody) {
    if (_node.getComponent(Joint).jointType == JOINT_TYPE.REVOLUTE) {
      let joint: ƒ.JointRevolute = new ƒ.JointRevolute(_anchor, _tied, _node.mtxLocal.getX().normalize());
      joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxWorld.translation, _anchor.node!.mtxWorld.translation);
      joint.minMotor = -_node.getComponent(Joint).flexInLimit;
      joint.maxMotor = _node.getComponent(Joint).flexOutLimit;

      _node.addComponent(joint);
    }

    if (_node.getComponent(Joint).jointType == JOINT_TYPE.UNIVERSAL) {
      let joint: ƒ.JointUniversal = new ƒ.JointUniversal(_anchor, _tied, _node.mtxLocal.getX().normalize(), _node.mtxLocal.getY().normalize());
      joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxWorld.translation, _anchor.node!.mtxWorld.translation);
      joint.minRotorFirst = -_node.getComponent(Joint).flexInLimit;
      joint.maxRotorFirst = _node.getComponent(Joint).flexOutLimit;
      if (_node.getComponent(Joint).abductLeftLimit != 0 || _node.getComponent(Joint).abductRightLimit != 0) {
        joint.minRotorSecond = -_node.getComponent(Joint).abductLeftLimit;
        joint.maxRotorSecond = _node.getComponent(Joint).abductRightLimit;
      }
      _node.addComponent(joint);
    }

    if (_node.getComponent(Joint).jointType == JOINT_TYPE.RAGDOLL) {
      let joint: ƒ.JointRagdoll = new ƒ.JointRagdoll(_anchor, _tied, _node.mtxLocal.getX().normalize(), _node.mtxLocal.getZ().normalize());
      joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxLocal.translation, _anchor.node!.mtxLocal.translation);
      joint.maxAngleFirstAxis = -_node.getComponent(Joint).flexOutLimit;
      joint.maxAngleSecondAxis = _node.getComponent(Joint).flexInLimit;
      if (_node.getComponent(Joint).twistClockwiseLimit != 0 || _node.getComponent(Joint).twistCounterClockwiseLimit != 0) {
        joint.minMotorTwist = -_node.getComponent(Joint).twistCounterClockwiseLimit;
        joint.minMotorTwist = _node.getComponent(Joint).twistClockwiseLimit;
      }
      _node.addComponent(joint);
    }
  }

  function selectBone(_rb: ƒ.ComponentRigidbody): void {
    if (!selectedBones.includes(_rb)) {
      selectedBones.push(_rb);
    }
  }
  function deselectBone(_rb: ƒ.ComponentRigidbody): void {
    let index = selectedBones.indexOf(_rb, 0);
    selectedBones.splice(index, 1);
  }
  function deselectAllBones(): void {
    selectedBones.length = 0;
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
      rotAxis = _rb.node!.mtxLocal.getX();
    if (_axis === AXIS.ABDUCTION)
      rotAxis = _rb.node!.mtxLocal.getY();
    if (_axis === AXIS.TWIST)
      rotAxis = _rb.node!.mtxLocal.getZ();

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
}
