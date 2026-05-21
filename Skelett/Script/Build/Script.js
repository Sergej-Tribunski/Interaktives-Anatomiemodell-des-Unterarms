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
    let distal = null;
    let middle = null;
    let rbDistal = null;
    let rbMiddle = null;
    let joint = null;
    let rotVector = new ƒ.Vector3(-0.1, 0, 0);
    let minRotation = 0;
    let maxRotation = -90;
    function start(_event) {
        viewport = _event.detail;
        viewport.getBranch();
        let branch = viewport.getBranch();
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
            if (middle && distal) {
                break;
            }
        }
        rbMiddle = new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
        rbMiddle.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));
        rbDistal = new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE);
        rbDistal.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));
        if (rbMiddle && rbDistal) {
            let axis = middle.mtxLocal.getX();
            let localAnchor = new ƒ.Vector3((distal?.mtxWorld.translation.x - middle?.mtxWorld.translation.x) / 1.9, (distal?.mtxWorld.translation.y - middle?.mtxWorld.translation.y) / 1.9, (distal?.mtxWorld.translation.z - middle?.mtxWorld.translation.z) / 1.9);
            axis.normalize();
            console.log("Axis : ", axis);
            joint = new ƒ.JointRevolute(rbMiddle, rbDistal, axis, localAnchor);
            joint.minMotor = maxRotation;
            joint.maxMotor = minRotation;
        }
        if (rbDistal && rbMiddle && middle && joint) {
            middle.addComponent(rbMiddle);
            distal?.addComponent(rbDistal);
            middle.addComponent(joint);
        }
        ƒ.Render.prepare(branch);
        console.log(distal?.name);
        console.log(distal?.getAllComponents());
        console.log(middle?.name);
        console.log(middle?.getAllComponents());
        let material = ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];
        for (let node of branch.getIterator(false))
            if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
                let cmpMaterial = node.getComponent(ƒ.ComponentMaterial);
                cmpMaterial.material = material;
            }
        /* for (let node of branch.getIterator(false)) {
          console.log("Node " + node.name + " has the Components:");
          console.log(node.getAllComponents());
        } */
        console.log("Middle: ", middle?.mtxLocal.translation);
        console.log("Distal: ", distal?.mtxLocal.translation);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        rbDistal?.setAngularVelocity(rotVector);
        if (rbDistal?.getRotation().x <= maxRotation) {
            rotVector.set(0.1, 0, 0);
        }
        if (rbDistal?.getRotation().x >= minRotation) {
            rotVector.set(-0.1, 0, 0);
        }
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map