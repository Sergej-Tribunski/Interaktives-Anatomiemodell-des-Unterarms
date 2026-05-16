"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static { this.iSubclass = ƒ.Component.registerSubclass(CustomComponentScript); }
        constructor() {
            super();
            // Properties may be mutated by users in the editor via the automatically created user interface
            this.message = "CustomComponentScript added to ";
            // Activate the functions of this component as response to events
            this.hndEvent = (_event) => {
                switch (_event.type) {
                    case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                        ƒ.Debug.log(this.message, this.node);
                        break;
                    case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                        this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                        this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                        break;
                    case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                        // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                        break;
                }
            };
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    // let middleFinger: ƒ.Node | null = null;
    let secondDistal;
    let secondMiddle;
    let secondProximal;
    let secondMetacarpal;
    // let rbSecondDistal: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(0, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE);
    // let rbSecondMiddle: ƒ.ComponentRigidbody | null = null;
    // let rbSecondProximal: ƒ.ComponentRigidbody | null = null;
    // let rbSecondMetacarpal: ƒ.ComponentRigidbody | null = null;
    function start(_event) {
        viewport = _event.detail;
        /* viewport.camera.mtxPivot.translateX(-0.26);
        viewport.camera.mtxPivot.translateY(0.7);
        viewport.camera.mtxPivot.translateZ(4.7); */
        // viewport.getBranch();
        let branch = viewport.getBranch();
        viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;
        for (let node of branch.getIterator(true)) {
            if (node.name.startsWith("Arrow"))
                node.activate(false);
        }
        // for (let node of branch.getIterator(true))
        //   if (node.name.startsWith("Proximal phalanx of third finger")) {
        //     middleFinger = node;
        //     break;
        //   }
        // console.log(middleFinger);
        // middleFinger?.addComponent(new ƒ.ComponentRigidbody(0, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE));
        for (let node of branch.getIterator(true)) {
            if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1"))
                continue;
            if (node.name.startsWith("Distal phalanx of second finger"))
                secondDistal = node;
            if (node.name.startsWith("Middle phalanx of second finger"))
                secondMiddle = node;
            if (node.name.startsWith("Proximal phalanx of second finger"))
                secondProximal = node;
            if (node.name.startsWith("Second metacarpal"))
                secondMetacarpal = node;
        }
        // secondDistal?.addComponent(rbSecondDistal);
        /*     secondMetacarpal!.addChild(secondProximal!);
            secondProximal!.addChild(secondMiddle!);
            secondMiddle!.addChild(secondDistal!); */
        secondDistal.addComponent(new ƒ.ComponentRigidbody(100, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE));
        secondMiddle.addComponent(new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE));
        secondProximal.addComponent(new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE));
        secondMetacarpal.addComponent(new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE));
        let rbMetacarpal = secondMetacarpal.getComponent(ƒ.ComponentRigidbody);
        rbMetacarpal.mtxPivot.scale(new ƒ.Vector3(0.01, 0.01, 0.01));
        let rbProximal = secondProximal.getComponent(ƒ.ComponentRigidbody);
        rbProximal.mtxPivot.scale(new ƒ.Vector3(0.01, 0.01, 0.01));
        let rbMiddle = secondMiddle.getComponent(ƒ.ComponentRigidbody);
        rbMiddle.mtxPivot.scale(new ƒ.Vector3(0.01, 0.01, 0.01));
        let rbDistal = secondDistal.getComponent(ƒ.ComponentRigidbody);
        // rbDistal.initialization = ƒ.BODY_INIT.TO_NODE;
        // /* node.getComponent(ƒ.ComponentRigidbody).isInitialized = false;
        // rbDistal.initialize();
        rbDistal.mtxPivot.scale(new ƒ.Vector3(0.01, 0.01, 0.01));
        rbDistal.dampRotation = 0;
        rbDistal.dampTranslation = 0;
        ƒ.Render.prepare(branch);
        let joint = new ƒ.JointRevolute(rbMiddle, rbDistal, ƒ.Vector3.X());
        joint.anchor = new ƒ.Vector3(0, -0.008, 0.008);
        /* if (rbMetacarpal && rbProximal) {
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
        } */
        /* for (let node of branch.getIterator(true)) {
          console.log(node.name);
        } */
        /* for (let node of branch.getIterator(true)) {
          if (!(node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1") || node.name.startsWith("Arrow"))) {
            node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE));
            console.log("Node " + node.name + " has the Components:");
            console.log(node.getAllComponents());
    
    
          }
          if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
            console.log("Child Node " + node.name + " has the Components:");
            console.log(node.getAllComponents());
          }
        } */
        // for (let node of branch.getIterator(false)) {
        //   if (!(node.name.includes("Main") || node.name.includes("Scene") || node.name.includes("Focus") || node.name.includes("Arrow") || node.name.includes("Primitive"))) {
        //     if (node.name.endsWith("Humerus.l")) {
        //       console.log("Before: ");
        //       console.log("Humerus children: " + node.getChildren());
        //       console.log(node.getAllComponents());
        //     }
        //     /* let pos: ƒ.Vector3 = node.mtxLocal.translation.clone;
        //     let rot: ƒ.Vector3 = node.mtxLocal.rotation.clone;
        //     let scl: ƒ.Vector3 = node.mtxLocal.scaling.clone; */
        //     node.addComponent(new ƒ.ComponentRigidbody(0, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE));
        //     //node.getComponent(ƒ.ComponentRigidbody).initialization = ƒ.BODY_INIT.TO_NODE;
        //     /* node.getComponent(ƒ.ComponentRigidbody).isInitialized = false;
        //     node.getComponent(ƒ.ComponentRigidbody).initialize(); */
        //     /* node.getComponent(ƒ.ComponentRigidbody).setScaling(scl);
        //     node.getComponent(ƒ.ComponentRigidbody).setPosition(pos);
        //     node.getComponent(ƒ.ComponentRigidbody).setRotation(rot); */
        //     if (node.name.endsWith("Humerus.l")) {
        //       console.log("After: " + node.getAllComponents());
        //       console.log("Humerus children: " + node.getChildren());
        //       console.log(node.getAllComponents());
        //     }
        //   }
        // }
        let material = ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];
        for (let node of branch.getIterator(false))
            if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
                let cmpMaterial = node.getComponent(ƒ.ComponentMaterial);
                cmpMaterial.material = material;
            }
        /* for (let node of branch.getIterator(false)) {
          console.log("Node " + node.name + " had the Components:");
          console.log(node.getAllComponents());
        } */
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        //middleFinger?.mtxLocal.rotateX(1);
        //secondProximal?.mtxLocal.rotateX(1);
        //secondDistal?.mtxLocal.rotateX(1);
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map