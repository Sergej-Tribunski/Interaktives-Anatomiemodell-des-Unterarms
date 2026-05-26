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
        let _bodyAnchor_decorators;
        let _bodyAnchor_initializers = [];
        let _bodyAnchor_extraInitializers = [];
        let _bodyTied_decorators;
        let _bodyTied_initializers = [];
        let _bodyTied_extraInitializers = [];
        let _rotIn_decorators;
        let _rotIn_initializers = [];
        let _rotIn_extraInitializers = [];
        let _rotOut_decorators;
        let _rotOut_initializers = [];
        let _rotOut_extraInitializers = [];
        return class Joint extends _classSuper {
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
                _bodyAnchor_decorators = [ƒ.type(String)];
                _bodyTied_decorators = [ƒ.type(String)];
                _rotIn_decorators = [ƒ.type(Number)];
                _rotOut_decorators = [ƒ.type(Number)];
                __esDecorate(null, null, _bodyAnchor_decorators, { kind: "field", name: "bodyAnchor", static: false, private: false, access: { has: obj => "bodyAnchor" in obj, get: obj => obj.bodyAnchor, set: (obj, value) => { obj.bodyAnchor = value; } }, metadata: _metadata }, _bodyAnchor_initializers, _bodyAnchor_extraInitializers);
                __esDecorate(null, null, _bodyTied_decorators, { kind: "field", name: "bodyTied", static: false, private: false, access: { has: obj => "bodyTied" in obj, get: obj => obj.bodyTied, set: (obj, value) => { obj.bodyTied = value; } }, metadata: _metadata }, _bodyTied_initializers, _bodyTied_extraInitializers);
                __esDecorate(null, null, _rotIn_decorators, { kind: "field", name: "rotIn", static: false, private: false, access: { has: obj => "rotIn" in obj, get: obj => obj.rotIn, set: (obj, value) => { obj.rotIn = value; } }, metadata: _metadata }, _rotIn_initializers, _rotIn_extraInitializers);
                __esDecorate(null, null, _rotOut_decorators, { kind: "field", name: "rotOut", static: false, private: false, access: { has: obj => "rotOut" in obj, get: obj => obj.rotOut, set: (obj, value) => { obj.rotOut = value; } }, metadata: _metadata }, _rotOut_initializers, _rotOut_extraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            // Register the script as component for use in the editor via drag&drop
            static { this.iSubclass = ƒ.Component.registerSubclass(Joint); }
            constructor() {
                super();
                // Properties may be mutated by users in the editor via the automatically created user interface
                this.message = "CustomComponentScript added to ";
                this.bodyAnchor = __runInitializers(this, _bodyAnchor_initializers, "");
                this.bodyTied = (__runInitializers(this, _bodyAnchor_extraInitializers), __runInitializers(this, _bodyTied_initializers, ""));
                this.rotIn = (__runInitializers(this, _bodyTied_extraInitializers), __runInitializers(this, _rotIn_initializers, 0));
                this.rotOut = (__runInitializers(this, _rotIn_extraInitializers), __runInitializers(this, _rotOut_initializers, 0));
                // Activate the functions of this component as response to events
                this.hndEvent = (__runInitializers(this, _rotOut_extraInitializers), (_event) => {
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
    let scene = null;
    let joints = null;
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
        scene = branch.getChildByName("Scene");
        joints = branch.getChildByName("Joints");
        defineRigidBodies(scene);
        defineJoints(joints);
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
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function defineRigidBodies(_scene) {
        for (let node of _scene.getIterator(false)) {
            if (!node.name.includes("Primitive") && !node.name.includes("Scene")) { //WIP change bodytype to dynamic
                let cmpRigidbody = new ƒ.ComponentRigidbody(100, node.name.includes("Humerus") ? ƒ.BODY_TYPE.STATIC : ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
                //WIP remove if statements when done testing
                if (node.name.includes("Distal phalanx of second")) {
                    cmpRigidbody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
                }
                /* if (node.name.includes("Middle phalanx of second")) {
                   cmpRigidbody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
                 }
                 if (node.name.includes("Proximal phalanx of second")){
                   cmpRigidbody.typeBody = ƒ.BODY_TYPE.DYNAMIC;
                 } */
                cmpRigidbody.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));
                node.addComponent(cmpRigidbody);
            }
        }
    }
    function defineJoints(_joints) {
        ƒ.Render.prepare(viewport.getBranch());
        for (let node of _joints.getIterator(false)) {
            if (node.name.startsWith("Joint ")) {
                defineJoint(node, scene?.getChildByName(node.getComponent(Script.Joint).bodyAnchor).getComponent(ƒ.ComponentRigidbody), scene?.getChildByName(node.getComponent(Script.Joint).bodyTied).getComponent(ƒ.ComponentRigidbody));
            }
        }
    }
    function defineJoint(_node, _anchor, _tied) {
        let joint = new ƒ.JointRevolute(_anchor, _tied, _node.mtxWorld.getX().normalize());
        joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxWorld.translation, _anchor.node.mtxWorld.translation);
        joint.minMotor = -_node.getComponent(Script.Joint).rotIn;
        joint.maxMotor = _node.getComponent(Script.Joint).rotOut;
        _node.addComponent(joint);
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map