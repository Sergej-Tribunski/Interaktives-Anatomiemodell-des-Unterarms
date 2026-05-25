"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    let Joint = (() => {
        let _classSuper = ƒ.ComponentScript;
        let _anchor_decorators;
        let _anchor_initializers = [];
        let _anchor_extraInitializers = [];
        return class Joint extends _classSuper {
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
                _anchor_decorators = [ƒ.type(ƒ.Node)];
                __esDecorate(null, null, _anchor_decorators, { kind: "field", name: "anchor", static: false, private: false, access: { has: obj => "anchor" in obj, get: obj => obj.anchor, set: (obj, value) => { obj.anchor = value; } }, metadata: _metadata }, _anchor_initializers, _anchor_extraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            // Register the script as component for use in the editor via drag&drop
            static { this.iSubclass = ƒ.Component.registerSubclass(Joint); }
            constructor() {
                super();
                // Properties may be mutated by users in the editor via the automatically created user interface
                this.message = "CustomComponentScript added to ";
                this.angle = 0;
                this.anchor = __runInitializers(this, _anchor_initializers, null);
                // Activate the functions of this component as response to events
                this.hndEvent = (__runInitializers(this, _anchor_extraInitializers), (_event) => {
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
                });
                // Don't start when running in editor
                if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                    return;
                // Listen to this component being added to or removed from a node
                this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
            }
        };
    })();
    Script.Joint = Joint;
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
    let rotVector = new ƒ.Vector3(0.1, 0, 0);
    let minRotation = 0;
    let maxRotation = 90;
    let joint = null;
    let bodyAnchor = null;
    let bodyTied = null;
    let axis = null;
    let localAnchor = null;
    function start(_event) {
        viewport = _event.detail;
        viewport.getBranch();
        let branch = viewport.getBranch();
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
        let scene = branch.getChildByName("Scene");
        let joints = branch.getChildByName("Joints");
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
        let material = ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];
        for (let node of branch.getIterator(false))
            if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
                let cmpMaterial = node.getComponent(ƒ.ComponentMaterial);
                cmpMaterial.material = material;
            }
        /* for (let node of branch.getIterator(false)) {
          console.log(node.name + " has the Components:");
          console.log(node.getAllComponents());
        } */
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
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
    function defineRigidBodies(_scene) {
        for (let node of _scene.getIterator(false)) {
            if (!node.name.includes("Primitive") && !node.name.includes("Scene")) {
                let distal = false;
                if (node.name.includes("Distal phalanx of second finger"))
                    distal = true;
                let cmpRigidbody = new ƒ.ComponentRigidbody(100, distal ? ƒ.BODY_TYPE.DYNAMIC : ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
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
    function defineJoints(_joints) {
        ƒ.Render.prepare(viewport.getBranch());
        for (let node of _joints.getIterator(false)) {
            if (node.name.includes("Joint second distal middle")) {
                defineJoint(node, rbMiddle, rbDistal);
            }
        }
    }
    function defineJoint(_node, _anchor, _tied) {
        let joint = new ƒ.JointRevolute(_anchor, _tied, _node.mtxWorld.getX().normalize());
        joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxWorld.translation, _anchor.node.mtxWorld.translation);
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
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map