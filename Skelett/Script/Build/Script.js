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
    let JOINT_TYPE;
    (function (JOINT_TYPE) {
        JOINT_TYPE[JOINT_TYPE["REVOLUTE"] = 0] = "REVOLUTE";
        JOINT_TYPE[JOINT_TYPE["UNIVERSAL"] = 1] = "UNIVERSAL";
    })(JOINT_TYPE = Script.JOINT_TYPE || (Script.JOINT_TYPE = {}));
    let Joint = (() => {
        let _classSuper = ƒ.ComponentScript;
        let _jointType_decorators;
        let _jointType_initializers = [];
        let _jointType_extraInitializers = [];
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
        let _rotLeft_decorators;
        let _rotLeft_initializers = [];
        let _rotLeft_extraInitializers = [];
        let _rotRight_decorators;
        let _rotRight_initializers = [];
        let _rotRight_extraInitializers = [];
        return class Joint extends _classSuper {
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
                _jointType_decorators = [ƒ.type(JOINT_TYPE)];
                _bodyAnchor_decorators = [ƒ.serialize(ƒ.Node)];
                _bodyTied_decorators = [ƒ.serialize(ƒ.Node)];
                _rotIn_decorators = [ƒ.type(Number)];
                _rotOut_decorators = [ƒ.type(Number)];
                _rotLeft_decorators = [ƒ.type(Number)];
                _rotRight_decorators = [ƒ.type(Number)];
                __esDecorate(null, null, _jointType_decorators, { kind: "field", name: "jointType", static: false, private: false, access: { has: obj => "jointType" in obj, get: obj => obj.jointType, set: (obj, value) => { obj.jointType = value; } }, metadata: _metadata }, _jointType_initializers, _jointType_extraInitializers);
                __esDecorate(null, null, _bodyAnchor_decorators, { kind: "field", name: "bodyAnchor", static: false, private: false, access: { has: obj => "bodyAnchor" in obj, get: obj => obj.bodyAnchor, set: (obj, value) => { obj.bodyAnchor = value; } }, metadata: _metadata }, _bodyAnchor_initializers, _bodyAnchor_extraInitializers);
                __esDecorate(null, null, _bodyTied_decorators, { kind: "field", name: "bodyTied", static: false, private: false, access: { has: obj => "bodyTied" in obj, get: obj => obj.bodyTied, set: (obj, value) => { obj.bodyTied = value; } }, metadata: _metadata }, _bodyTied_initializers, _bodyTied_extraInitializers);
                __esDecorate(null, null, _rotIn_decorators, { kind: "field", name: "rotIn", static: false, private: false, access: { has: obj => "rotIn" in obj, get: obj => obj.rotIn, set: (obj, value) => { obj.rotIn = value; } }, metadata: _metadata }, _rotIn_initializers, _rotIn_extraInitializers);
                __esDecorate(null, null, _rotOut_decorators, { kind: "field", name: "rotOut", static: false, private: false, access: { has: obj => "rotOut" in obj, get: obj => obj.rotOut, set: (obj, value) => { obj.rotOut = value; } }, metadata: _metadata }, _rotOut_initializers, _rotOut_extraInitializers);
                __esDecorate(null, null, _rotLeft_decorators, { kind: "field", name: "rotLeft", static: false, private: false, access: { has: obj => "rotLeft" in obj, get: obj => obj.rotLeft, set: (obj, value) => { obj.rotLeft = value; } }, metadata: _metadata }, _rotLeft_initializers, _rotLeft_extraInitializers);
                __esDecorate(null, null, _rotRight_decorators, { kind: "field", name: "rotRight", static: false, private: false, access: { has: obj => "rotRight" in obj, get: obj => obj.rotRight, set: (obj, value) => { obj.rotRight = value; } }, metadata: _metadata }, _rotRight_initializers, _rotRight_extraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            // Register the script as component for use in the editor via drag&drop
            static { this.iSubclass = ƒ.Component.registerSubclass(Joint); }
            constructor() {
                super();
                // Properties may be mutated by users in the editor via the automatically created user interface
                this.message = "CustomComponentScript added to ";
                this.jointType = __runInitializers(this, _jointType_initializers, JOINT_TYPE.REVOLUTE);
                //Serializer yields strings of nodes, rather their reference during runtime. Typescript expects their reference --> just do both
                this.bodyAnchor = (__runInitializers(this, _jointType_extraInitializers), __runInitializers(this, _bodyAnchor_initializers, undefined));
                this.bodyTied = (__runInitializers(this, _bodyAnchor_extraInitializers), __runInitializers(this, _bodyTied_initializers, undefined));
                this.rotIn = (__runInitializers(this, _bodyTied_extraInitializers), __runInitializers(this, _rotIn_initializers, 0));
                this.rotOut = (__runInitializers(this, _rotIn_extraInitializers), __runInitializers(this, _rotOut_initializers, 0));
                this.rotLeft = (__runInitializers(this, _rotOut_extraInitializers), __runInitializers(this, _rotLeft_initializers, 0));
                this.rotRight = (__runInitializers(this, _rotLeft_extraInitializers), __runInitializers(this, _rotRight_initializers, 0));
                // Activate the functions of this component as response to events
                this.hndEvent = (__runInitializers(this, _rotRight_extraInitializers), (_event) => {
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
    //let rbFirstMetacarpal: ƒ.ComponentRigidbody | null = null;
    let rotAxis = undefined;
    let selectedBones = [];
    let timer = 0;
    let direction = 0.5;
    let deltaTime = 0;
    let anchoringJoint = new Map();
    function start(_event) {
        viewport = _event.detail;
        viewport.getBranch();
        let branch = viewport.getBranch();
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
        let material = ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];
        for (let node of branch.getIterator(false))
            if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
                let cmpMaterial = node.getComponent(ƒ.ComponentMaterial);
                cmpMaterial.material = material;
            }
        //bFirstMetacarpal = scene.getChildByName("First metacarpal bone.r").getComponent(ƒ.ComponentRigidbody);
        //TODO
        //Test for selectedBones - this needs to be Handeled with eventlisteners later
        for (let node of scene.getChildren()) {
            selectBone(node.getComponent(ƒ.ComponentRigidbody));
        }
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
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
        if (timer >= 10) {
            timer = 0;
            direction *= -1;
        }
        rotateBones(1, direction, 1, direction);
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
    function defineRigidBodies(_scene) {
        for (let node of _scene.getIterator(false)) {
            if (!node.name.includes("Primitive") && !node.name.includes("Scene")) { //WIP change bodytype to dynamic (only the humerus stays static)
                let cmpRigidbody = new ƒ.ComponentRigidbody(1, node.name.includes("Humerus") ? ƒ.BODY_TYPE.STATIC : ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
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
    function resolveJoint(_body) {
        if (!_body) {
            return null;
        }
        if (typeof _body === "string") {
            return scene?.getChildByName(_body);
        }
        return _body;
    }
    function defineJoints(_joints) {
        ƒ.Render.prepare(viewport.getBranch());
        for (let node of _joints.getIterator(false)) {
            if (node.name.startsWith("Joint ")) {
                defineJoint(node, resolveJoint(node.getComponent(Script.Joint).bodyAnchor)?.getComponent(ƒ.ComponentRigidbody), resolveJoint(node.getComponent(Script.Joint).bodyTied)?.getComponent(ƒ.ComponentRigidbody));
                anchoringJoint.set(resolveJoint(node.getComponent(Script.Joint).bodyTied)?.getComponent(ƒ.ComponentRigidbody), node.getComponent(Script.Joint));
            }
        }
    }
    function defineJoint(_node, _anchor, _tied) {
        if (_node.getComponent(Script.Joint).jointType == Script.JOINT_TYPE.REVOLUTE) {
            let joint = new ƒ.JointRevolute(_anchor, _tied, _node.mtxWorld.getX().normalize());
            joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxWorld.translation, _anchor.node.mtxWorld.translation);
            joint.minMotor = -_node.getComponent(Script.Joint).rotIn;
            joint.maxMotor = _node.getComponent(Script.Joint).rotOut;
            _node.addComponent(joint);
        }
        if (_node.getComponent(Script.Joint).jointType == Script.JOINT_TYPE.UNIVERSAL) {
            let joint = new ƒ.JointUniversal(_anchor, _tied, _node.mtxLocal.getX().normalize(), _node.mtxLocal.getY().normalize());
            joint.anchor = ƒ.Vector3.DIFFERENCE(_node.mtxWorld.translation, _anchor.node.mtxWorld.translation);
            joint.minRotorFirst = -_node.getComponent(Script.Joint).rotIn;
            joint.maxRotorFirst = _node.getComponent(Script.Joint).rotOut;
            joint.minRotorSecond = -_node.getComponent(Script.Joint).rotLeft;
            joint.maxRotorSecond = _node.getComponent(Script.Joint).rotRight;
            _node.addComponent(joint);
        }
    }
    function selectBone(_rb) {
        if (!selectedBones.includes(_rb)) {
            selectedBones.push(_rb);
        }
    }
    function deselectBone(_rb) {
        let index = selectedBones.indexOf(_rb, 0);
        selectedBones.splice(index, 1);
    }
    function deselectAllBones() {
        selectedBones.length = 0;
    }
    function rotateBones(_strengthFirst, _directionFirst, _strengthSecond, _directionSecond) {
        for (let rb of selectedBones) {
            if (anchoringJoint.get(rb)?.jointType == Script.JOINT_TYPE.REVOLUTE) {
                rotateBoneRevolute(rb, _strengthFirst, _directionFirst);
            }
            if (anchoringJoint.get(rb)?.jointType == Script.JOINT_TYPE.UNIVERSAL) {
                rotateBoneUniversal(rb, _strengthFirst, _directionFirst, _strengthSecond, _directionSecond);
            }
        }
    }
    function rotate(_rb, _strength, _direction) {
        _strength *= -1;
        rotAxis?.normalize();
        rotAxis?.scale(_direction * _strength);
        _rb.applyTorque(rotAxis);
    }
    function rotateBoneRevolute(_rb, _strength, _direction) {
        _strength = _strength * -1;
        rotAxis = _rb.node.mtxLocal.getX();
        rotate(_rb, _strength, _direction);
    }
    function rotateBoneUniversal(_rb, _strengthFirst, _directionFirst, _strengthSecond, _directionSecond) {
        rotAxis = _rb.node.mtxLocal.getX();
        rotate(_rb, _strengthFirst, _directionFirst);
        rotAxis = _rb.node.mtxLocal.getY();
        rotate(_rb, _strengthSecond, _directionSecond);
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map