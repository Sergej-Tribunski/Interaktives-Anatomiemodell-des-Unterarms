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
        JOINT_TYPE[JOINT_TYPE["RAGDOLL"] = 2] = "RAGDOLL";
        JOINT_TYPE[JOINT_TYPE["WELDING"] = 3] = "WELDING";
    })(JOINT_TYPE = Script.JOINT_TYPE || (Script.JOINT_TYPE = {}));
    let twistAxis;
    (function (twistAxis) {
        twistAxis[twistAxis["FLEXION"] = 0] = "FLEXION";
        twistAxis[twistAxis["ABDUCTION"] = 1] = "ABDUCTION";
        twistAxis[twistAxis["TWIST"] = 2] = "TWIST";
    })(twistAxis || (twistAxis = {}));
    ;
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
        let _flexInLimit_decorators;
        let _flexInLimit_initializers = [];
        let _flexInLimit_extraInitializers = [];
        let _flexOutLimit_decorators;
        let _flexOutLimit_initializers = [];
        let _flexOutLimit_extraInitializers = [];
        let _abductLeftLimit_decorators;
        let _abductLeftLimit_initializers = [];
        let _abductLeftLimit_extraInitializers = [];
        let _abductRightLimit_decorators;
        let _abductRightLimit_initializers = [];
        let _abductRightLimit_extraInitializers = [];
        let _twistClockwiseLimit_decorators;
        let _twistClockwiseLimit_initializers = [];
        let _twistClockwiseLimit_extraInitializers = [];
        let _twistCounterClockwiseLimit_decorators;
        let _twistCounterClockwiseLimit_initializers = [];
        let _twistCounterClockwiseLimit_extraInitializers = [];
        return class Joint extends _classSuper {
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
                _jointType_decorators = [ƒ.type(JOINT_TYPE)];
                _bodyAnchor_decorators = [ƒ.serialize(ƒ.Node)];
                _bodyTied_decorators = [ƒ.serialize(ƒ.Node)];
                _flexInLimit_decorators = [ƒ.type(Number)];
                _flexOutLimit_decorators = [ƒ.type(Number)];
                _abductLeftLimit_decorators = [ƒ.type(Number)];
                _abductRightLimit_decorators = [ƒ.type(Number)];
                _twistClockwiseLimit_decorators = [ƒ.type(Number)];
                _twistCounterClockwiseLimit_decorators = [ƒ.type(Number)];
                __esDecorate(null, null, _jointType_decorators, { kind: "field", name: "jointType", static: false, private: false, access: { has: obj => "jointType" in obj, get: obj => obj.jointType, set: (obj, value) => { obj.jointType = value; } }, metadata: _metadata }, _jointType_initializers, _jointType_extraInitializers);
                __esDecorate(null, null, _bodyAnchor_decorators, { kind: "field", name: "bodyAnchor", static: false, private: false, access: { has: obj => "bodyAnchor" in obj, get: obj => obj.bodyAnchor, set: (obj, value) => { obj.bodyAnchor = value; } }, metadata: _metadata }, _bodyAnchor_initializers, _bodyAnchor_extraInitializers);
                __esDecorate(null, null, _bodyTied_decorators, { kind: "field", name: "bodyTied", static: false, private: false, access: { has: obj => "bodyTied" in obj, get: obj => obj.bodyTied, set: (obj, value) => { obj.bodyTied = value; } }, metadata: _metadata }, _bodyTied_initializers, _bodyTied_extraInitializers);
                __esDecorate(null, null, _flexInLimit_decorators, { kind: "field", name: "flexInLimit", static: false, private: false, access: { has: obj => "flexInLimit" in obj, get: obj => obj.flexInLimit, set: (obj, value) => { obj.flexInLimit = value; } }, metadata: _metadata }, _flexInLimit_initializers, _flexInLimit_extraInitializers);
                __esDecorate(null, null, _flexOutLimit_decorators, { kind: "field", name: "flexOutLimit", static: false, private: false, access: { has: obj => "flexOutLimit" in obj, get: obj => obj.flexOutLimit, set: (obj, value) => { obj.flexOutLimit = value; } }, metadata: _metadata }, _flexOutLimit_initializers, _flexOutLimit_extraInitializers);
                __esDecorate(null, null, _abductLeftLimit_decorators, { kind: "field", name: "abductLeftLimit", static: false, private: false, access: { has: obj => "abductLeftLimit" in obj, get: obj => obj.abductLeftLimit, set: (obj, value) => { obj.abductLeftLimit = value; } }, metadata: _metadata }, _abductLeftLimit_initializers, _abductLeftLimit_extraInitializers);
                __esDecorate(null, null, _abductRightLimit_decorators, { kind: "field", name: "abductRightLimit", static: false, private: false, access: { has: obj => "abductRightLimit" in obj, get: obj => obj.abductRightLimit, set: (obj, value) => { obj.abductRightLimit = value; } }, metadata: _metadata }, _abductRightLimit_initializers, _abductRightLimit_extraInitializers);
                __esDecorate(null, null, _twistClockwiseLimit_decorators, { kind: "field", name: "twistClockwiseLimit", static: false, private: false, access: { has: obj => "twistClockwiseLimit" in obj, get: obj => obj.twistClockwiseLimit, set: (obj, value) => { obj.twistClockwiseLimit = value; } }, metadata: _metadata }, _twistClockwiseLimit_initializers, _twistClockwiseLimit_extraInitializers);
                __esDecorate(null, null, _twistCounterClockwiseLimit_decorators, { kind: "field", name: "twistCounterClockwiseLimit", static: false, private: false, access: { has: obj => "twistCounterClockwiseLimit" in obj, get: obj => obj.twistCounterClockwiseLimit, set: (obj, value) => { obj.twistCounterClockwiseLimit = value; } }, metadata: _metadata }, _twistCounterClockwiseLimit_initializers, _twistCounterClockwiseLimit_extraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            // Register the script as component for use in the editor via drag&drop
            static { this.iSubclass = ƒ.Component.registerSubclass(Joint); }
            constructor() {
                super();
                // Properties may be mutated by users in the editor via the automatically created user interface
                this.message = "CustomComponentScript added to ";
                this.jointType = __runInitializers(this, _jointType_initializers, JOINT_TYPE.WELDING);
                this.bodyAnchor = (__runInitializers(this, _jointType_extraInitializers), __runInitializers(this, _bodyAnchor_initializers, undefined));
                this.bodyTied = (__runInitializers(this, _bodyAnchor_extraInitializers), __runInitializers(this, _bodyTied_initializers, undefined));
                this.flexInLimit = (__runInitializers(this, _bodyTied_extraInitializers), __runInitializers(this, _flexInLimit_initializers, 0));
                this.flexOutLimit = (__runInitializers(this, _flexInLimit_extraInitializers), __runInitializers(this, _flexOutLimit_initializers, 0));
                this.abductLeftLimit = (__runInitializers(this, _flexOutLimit_extraInitializers), __runInitializers(this, _abductLeftLimit_initializers, 0));
                this.abductRightLimit = (__runInitializers(this, _abductLeftLimit_extraInitializers), __runInitializers(this, _abductRightLimit_initializers, 0));
                this.twistClockwiseLimit = (__runInitializers(this, _abductRightLimit_extraInitializers), __runInitializers(this, _twistClockwiseLimit_initializers, 0));
                this.twistCounterClockwiseLimit = (__runInitializers(this, _twistClockwiseLimit_extraInitializers), __runInitializers(this, _twistCounterClockwiseLimit_initializers, 0));
                // Activate the functions of this component as response to events
                this.hndEvent = (__runInitializers(this, _twistCounterClockwiseLimit_extraInitializers), (_event) => {
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
                this.addEventListener("mutate" /* ƒ.EVENT.MUTATE */, (event) => {
                    console.log("Joint mutated!", event);
                });
                // Listen to this component being added to or removed from a node
                this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
            }
            reduceMutator(_mutator) {
                if (_mutator.bodyAnchor instanceof ƒ.Node)
                    _mutator.bodyAnchor = _mutator.bodyAnchor.name;
                if (_mutator.bodyTied instanceof ƒ.Node)
                    _mutator.bodyTied = _mutator.bodyTied.name;
                if (_mutator.jointType === JOINT_TYPE.WELDING) {
                    removeRotationFields(_mutator, twistAxis.FLEXION);
                    removeRotationFields(_mutator, twistAxis.ABDUCTION);
                    removeRotationFields(_mutator, twistAxis.TWIST);
                }
                if (_mutator.jointType === JOINT_TYPE.REVOLUTE) {
                    removeRotationFields(_mutator, twistAxis.ABDUCTION);
                    removeRotationFields(_mutator, twistAxis.TWIST);
                }
                if (_mutator.jointType === JOINT_TYPE.UNIVERSAL)
                    removeRotationFields(_mutator, twistAxis.TWIST);
                if (_mutator.jointType === JOINT_TYPE.RAGDOLL)
                    removeRotationFields(_mutator, twistAxis.ABDUCTION);
                // delete properties that should not be mutated
                // undefined properties and private fields (#) will not be included by default
            }
        };
    })();
    Script.Joint = Joint;
    function removeRotationFields(_mutator, _twistAxis) {
        if (_twistAxis === twistAxis.FLEXION) {
            delete _mutator.flexInLimit;
            delete _mutator.flexOutLimit;
        }
        if (_twistAxis === twistAxis.ABDUCTION) {
            delete _mutator.abductRightLimit;
            delete _mutator.abductLeftLimit;
        }
        if (_twistAxis === twistAxis.TWIST) {
            delete _mutator.twistClockwiseLimit;
            delete _mutator.twistCounterClockwiseLimit;
        }
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let userInputHandler;
    let prepareVisuals;
    let physicsController;
    let prepareRbs;
    let prepareJoints;
    let uiController;
    let selectionController;
    let movementController;
    function start(_event) {
        viewport = _event.detail;
        viewport.getBranch();
        let branch = viewport.getBranch();
        viewport.physicsDebugMode = ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;
        ƒ.Render.prepare(branch);
        let scene = branch.getChildByName("Scene");
        uiController = new Script.UIController();
        prepareVisuals = new Script.PrepareVisuals(branch);
        physicsController = new Script.PhysicsController(scene, uiController);
        prepareRbs = new Script.PrepareRigidbodies(scene, physicsController);
        prepareJoints = new Script.PrepareJoints(branch);
        selectionController = new Script.SelectionController(scene, uiController);
        movementController = new Script.MovementController(prepareJoints, selectionController, uiController);
        userInputHandler = new Script.UserInputHandler(viewport, selectionController, physicsController, movementController, uiController);
        document.getElementById("controlsPanelsContainer").style.display = "block";
        document.getElementById("listPanelsContainer").style.display = "block";
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        movementController.moveModel();
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("MovementController running!");
    let AXIS;
    (function (AXIS) {
        AXIS[AXIS["FLEXTION"] = 0] = "FLEXTION";
        AXIS[AXIS["ABDUCTION"] = 1] = "ABDUCTION";
        AXIS[AXIS["TWIST"] = 2] = "TWIST";
    })(AXIS || (AXIS = {}));
    ;
    class MovementController {
        constructor(_joints, _selectionController, _uiController) {
            this.flexStrength = 10;
            this.flexDirection = 1;
            this.abductStrength = 10;
            this.abductDirection = 1;
            this.movementEnabled = false;
            this.rotAxis = undefined;
            this.joints = _joints;
            this.selectionController = _selectionController;
            this.uiController = _uiController;
        }
        setFlexStrength(_flexStrength) {
            this.flexStrength = _flexStrength;
        }
        setFlexDirection(_flexDirection) {
            this.flexDirection = _flexDirection;
        }
        setAbductStrength(_abductStrength) {
            this.abductStrength = _abductStrength;
        }
        setAbductDirection(_abductDirection) {
            this.abductDirection = _abductDirection;
        }
        toggleMovement() {
            this.movementEnabled = !this.movementEnabled;
            this.uiController.updateMovementButton(this.movementEnabled);
        }
        rotate(_rb, _strength, _direction, _axis) {
            _strength *= -1;
            if (_axis === AXIS.FLEXTION)
                this.rotAxis = ƒ.Vector3.TRANSFORMATION(this.joints.getAnchoringJoint().get(_rb).node.mtxLocal.getX(), _rb.node.mtxWorld, false).normalize();
            if (_axis === AXIS.ABDUCTION)
                this.rotAxis = ƒ.Vector3.TRANSFORMATION(this.joints.getAnchoringJoint().get(_rb).node.mtxLocal.getY(), _rb.node.mtxWorld, false).normalize();
            if (_axis === AXIS.TWIST)
                this.rotAxis = ƒ.Vector3.TRANSFORMATION(this.joints.getAnchoringJoint().get(_rb).node.mtxLocal.getZ(), _rb.node.mtxWorld, false).normalize();
            this.rotAxis?.normalize();
            this.rotAxis?.scale(_direction * _strength);
            _rb.applyTorque(this.rotAxis);
        }
        rotateBoneRevolute(_rb, _strengthFlexion, _directionFlexion) {
            this.rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
        }
        rotateBoneUniversal(_rb, _strengthFlexion, _directionFlexion, _strengthAbduction, _directionAbduction) {
            this.rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
            this.rotate(_rb, _strengthAbduction, _directionAbduction, AXIS.ABDUCTION);
        }
        rotateBoneRagdoll(_rb, _strengthFlexion, _directionFlexion, _strengthTwist, _directionTwist) {
            this.rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
            this.rotate(_rb, _strengthTwist, _directionTwist, AXIS.TWIST);
        }
        rotateBones(_flexStrength, _flexDirection, _abductStrength, _abductDirection) {
            for (let rb of this.selectionController.getSelectedBones()) {
                if (this.joints.getAnchoringJoint().get(rb) instanceof ƒ.JointRevolute) {
                    this.rotateBoneRevolute(rb, _flexStrength, _flexDirection);
                }
                if (this.joints.getAnchoringJoint().get(rb) instanceof ƒ.JointUniversal) {
                    this.rotateBoneUniversal(rb, _flexStrength, _flexDirection, _abductStrength, _abductDirection);
                }
                if (this.joints.getAnchoringJoint().get(rb) instanceof ƒ.JointRagdoll) {
                    this.rotateBoneRagdoll(rb, _flexStrength, _flexDirection, _abductStrength, _abductDirection);
                }
            }
        }
        moveModel() {
            if (this.movementEnabled) {
                this.rotateBones(this.flexStrength, this.flexDirection, this.abductStrength, this.abductDirection);
            }
        }
    }
    Script.MovementController = MovementController;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("PhysicsController running!");
    class PhysicsController {
        constructor(_scene, _uiController) {
            this.simulatedBones = [];
            this.scene = _scene;
            this.uiController = _uiController;
        }
        updateSimulatedBonesList(_rb, _isDynamic) {
            if (_isDynamic) {
                if (!this.simulatedBones.includes(_rb)) {
                    this.simulatedBones.push(_rb);
                }
                else {
                    const rbIndexInArray = this.simulatedBones.indexOf(_rb);
                    if (rbIndexInArray !== -1) {
                        this.simulatedBones.splice(rbIndexInArray, 1);
                    }
                }
            }
            this.onSimulatedBonesChanged?.(_rb.node?.name, _isDynamic);
        }
        onSimulatedBonesChanged(_boneName, _isInList) {
            this.uiController.updateSimulatedBonesList(_boneName, _isInList);
        }
        changeBodyType(_rb) {
            if (_rb.node?.name.includes("Humerus"))
                return;
            if (_rb.typeBody === ƒ.BODY_TYPE.DYNAMIC) {
                _rb.typeBody = ƒ.BODY_TYPE.STATIC;
                this.updateSimulatedBonesList?.(_rb, false);
            }
            else if (_rb.typeBody === ƒ.BODY_TYPE.STATIC) {
                _rb.typeBody = ƒ.BODY_TYPE.DYNAMIC;
                this.updateSimulatedBonesList?.(_rb, true);
            }
        }
        changeAllBodiesToStatic() {
            for (let node of this.scene?.getChildren()) {
                let rb = node.getComponent(ƒ.ComponentRigidbody);
                if (!rb)
                    continue;
                if (rb.typeBody === ƒ.BODY_TYPE.DYNAMIC)
                    this.changeBodyType(rb);
            }
        }
        changeAllBodiesToDynamic() {
            for (let node of this.scene?.getChildren()) {
                let rb = node.getComponent(ƒ.ComponentRigidbody);
                if (!rb || node.name.includes("Humerus"))
                    continue;
                if (rb.typeBody === ƒ.BODY_TYPE.STATIC)
                    this.changeBodyType(rb);
            }
        }
    }
    Script.PhysicsController = PhysicsController;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("PrepareJoints running!");
    class PrepareJoints {
        constructor(_branch) {
            this.anchoringJoint = new Map();
            this.branch = _branch;
            this.jointContainer = this.branch.getChildByName("Joints");
            this.scene = this.branch.getChildByName("Scene");
            this.defineJoints(this.jointContainer);
        }
        defineJoints(_joints) {
            ƒ.Render.prepare(this.branch);
            for (let node of _joints.getIterator(false)) {
                if (node.name.startsWith("Joint ")) {
                    this.defineJoint(node, this.resolveJoint(node.getComponent(Script.Joint).bodyAnchor)?.getComponent(ƒ.ComponentRigidbody), this.resolveJoint(node.getComponent(Script.Joint).bodyTied)?.getComponent(ƒ.ComponentRigidbody));
                }
            }
        }
        defineJoint(_jointNode, _anchor, _tied) {
            if (_jointNode.getComponent(Script.Joint).jointType == Script.JOINT_TYPE.REVOLUTE) {
                let joint = new ƒ.JointRevolute(_anchor, _tied, _jointNode.mtxLocal.getX().normalize());
                joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxWorld.translation, _anchor.node.mtxWorld.translation);
                joint.minMotor = -_jointNode.getComponent(Script.Joint).flexInLimit;
                joint.maxMotor = _jointNode.getComponent(Script.Joint).flexOutLimit;
                _jointNode.addComponent(joint);
                this.anchoringJoint.set(_tied, joint);
                //console.log("Joint Revolute would be added.");
            }
            if (_jointNode.getComponent(Script.Joint).jointType == Script.JOINT_TYPE.UNIVERSAL) {
                let joint = new ƒ.JointUniversal(_anchor, _tied, _jointNode.mtxLocal.getX().normalize(), _jointNode.mtxLocal.getY().normalize());
                joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxWorld.translation, _anchor.node.mtxWorld.translation);
                joint.minRotorFirst = -_jointNode.getComponent(Script.Joint).flexInLimit;
                joint.maxRotorFirst = _jointNode.getComponent(Script.Joint).flexOutLimit;
                joint.minRotorSecond = -_jointNode.getComponent(Script.Joint).abductLeftLimit;
                joint.maxRotorSecond = _jointNode.getComponent(Script.Joint).abductRightLimit;
                _jointNode.addComponent(joint);
                this.anchoringJoint.set(_tied, joint);
                //console.log("Joint Universal would be added.");
            }
            if (_jointNode.getComponent(Script.Joint).jointType == Script.JOINT_TYPE.RAGDOLL) {
                let joint = new ƒ.JointRagdoll(_anchor, _tied, _jointNode.mtxLocal.getY().normalize(), _jointNode.mtxLocal.getY().normalize());
                joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxLocal.translation, _anchor.node.mtxLocal.translation);
                joint.maxAngleFirstAxis = -_jointNode.getComponent(Script.Joint).flexOutLimit;
                joint.maxAngleSecondAxis = _jointNode.getComponent(Script.Joint).flexInLimit;
                joint.minMotorTwist = -_jointNode.getComponent(Script.Joint).twistCounterClockwiseLimit;
                joint.maxMotorTwist = _jointNode.getComponent(Script.Joint).twistClockwiseLimit;
                _jointNode.addComponent(joint);
                this.anchoringJoint.set(_tied, joint);
                //console.log("Joint Ragdoll would be added.");
            }
            if (_jointNode.getComponent(Script.Joint).jointType == Script.JOINT_TYPE.WELDING) {
                let joint = new ƒ.JointWelding(_anchor, _tied);
                joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxLocal.translation, _anchor.node.mtxLocal.translation);
                _jointNode.addComponent(joint);
                this.anchoringJoint.set(_tied, joint);
                //console.log("Joint Welding would be added.");
            }
        }
        resolveJoint(_body) {
            if (!_body) {
                return null;
            }
            if (typeof _body === "string") {
                return this.scene?.getChildByName(_body);
            }
            return _body;
        }
        getAnchoringJoint() {
            return this.anchoringJoint;
        }
    }
    Script.PrepareJoints = PrepareJoints;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("PrepareRigidbodies running!");
    class PrepareRigidbodies {
        constructor(_scene, _physicsController) {
            this.scene = _scene;
            this.physicsController = _physicsController;
            this.defineRigidbodies();
        }
        defineRigidbodies() {
            for (let node of this.scene.getIterator(false)) {
                if (!node.name.includes("Primitive") && !node.name.includes("Scene")) {
                    let cmpRb = new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
                    cmpRb.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));
                    cmpRb.effectGravity = 1;
                    cmpRb.dampRotation = 10;
                    cmpRb.dampTranslation = 10;
                    node.addComponent(cmpRb);
                    this.onRbCreated?.(cmpRb);
                }
            }
        }
        onRbCreated(_rb) {
            this.physicsController.changeBodyType(_rb);
        }
    }
    Script.PrepareRigidbodies = PrepareRigidbodies;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("PrepareVisuals running!");
    class PrepareVisuals {
        constructor(_branch) {
            this.material = ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];
            this.branch = _branch;
            this.prepareShaders();
            this.prepareNodeVisibility();
        }
        prepareShaders() {
            for (let node of this.branch.getIterator(false))
                if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
                    let cmpMaterial = node.getComponent(ƒ.ComponentMaterial);
                    cmpMaterial.material = this.material;
                }
        }
        prepareNodeVisibility() {
            for (let node of this.branch.getIterator(true)) {
                if (node.name.includes("Arrow")) {
                    node.activate(false);
                }
                if (node.name.includes("Joint ")) {
                    node.activate(false);
                }
            }
        }
    }
    Script.PrepareVisuals = PrepareVisuals;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("SelectionController running!");
    class SelectionController {
        constructor(_scene, _uiController) {
            this.selectedBones = [];
            this.scene = _scene;
            this.uiController = _uiController;
        }
        updateSelectedBonesList(_rb, _isSelected) {
            if (_isSelected) {
                if (!this.selectedBones.includes(_rb)) {
                    this.selectedBones.push(_rb);
                }
                else {
                    const rbIndexInArray = this.selectedBones.indexOf(_rb);
                    if (rbIndexInArray !== -1) {
                        this.selectedBones.splice(rbIndexInArray, 1);
                    }
                }
            }
            this.onSelectedBonesChanged?.(_rb.node?.name, _isSelected);
        }
        onSelectedBonesChanged(_boneName, _isInList) {
            this.uiController.updateSelectedBonesList(_boneName, _isInList);
        }
        toggleBoneSelection(_rb) {
            if (this.selectedBones.includes(_rb)) {
                this.deselectBone(_rb);
            }
            else {
                this.selectBone(_rb);
            }
        }
        selectBone(_rb) {
            this.updateSelectedBonesList(_rb, true);
        }
        deselectBone(_rb) {
            this.updateSelectedBonesList(_rb, false);
        }
        selectAllBones() {
            for (let bone of this.scene.getChildren()) {
                this.selectBone(bone.getComponent(ƒ.ComponentRigidbody));
            }
        }
        deselectAllBones() {
            for (let rb of this.selectedBones) {
                this.deselectBone(rb);
            }
        }
        getSelectedBones() {
            return this.selectedBones;
        }
    }
    Script.SelectionController = SelectionController;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("UIController running!");
    class UIController {
        addBoneToList(_boneName, _list) {
            const item = document.createElement("li");
            item.textContent = _boneName;
            item.dataset.boneName = _boneName;
            _list.appendChild(item);
        }
        removeBoneFromList(_boneName, _list) {
            const escapedBoneName = CSS.escape(_boneName);
            const selector = `li[data-bone-name="${escapedBoneName}"]`;
            const listItem = _list.querySelector(selector);
            if (listItem) {
                listItem.remove();
            }
        }
        updateSimulatedBonesList(_boneName, _isInList) {
            const list = document.getElementById("simulatedBonesList");
            if (_isInList) {
                this.addBoneToList(_boneName, list);
            }
            else {
                this.removeBoneFromList(_boneName, list);
            }
        }
        updateSelectedBonesList(_boneName, _isInList) {
            const list = document.getElementById("selectedBonesList");
            if (_isInList) {
                this.addBoneToList(_boneName, list);
            }
            else {
                this.removeBoneFromList(_boneName, list);
            }
        }
        updateMovementButton(_movementEnabled) {
            const toggleButton = document.getElementById("toggleMovement");
            toggleButton.textContent = _movementEnabled ? "Stop Movement" : "Start Movement";
        }
        togglePanel(_header) {
            const panelContent = _header.nextElementSibling;
            const isCollapsed = panelContent.classList.contains("collapsed");
            if (isCollapsed) {
                panelContent.classList.remove("collapsed");
            }
            else {
                panelContent.classList.add("collapsed");
            }
        }
    }
    Script.UIController = UIController;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("UserInputHandler running!");
    class UserInputHandler {
        constructor(_viewport, _selectionController, _physicsController, _movementController, _uiController) {
            this.viewport = _viewport;
            this.selectionController = _selectionController;
            this.physicsController = _physicsController;
            this.movementController = _movementController;
            this.uiController = _uiController;
            this.setupEventListeners();
        }
        setupEventListeners() {
            this.viewport.canvas.addEventListener("mousedown", this.hndSelection.bind(this));
            this.viewport.canvas.addEventListener("keydown", this.hndApplyToAllBones.bind(this));
            const panelHeaders = document.querySelectorAll(".panel-header");
            panelHeaders.forEach(header => {
                header.addEventListener("click", () => {
                    this.uiController.togglePanel(header);
                });
            });
            const flexStrengthInput = document.getElementById("flexStrength");
            flexStrengthInput.addEventListener("input", () => {
                const flexStrength = Number(flexStrengthInput.value);
                this.movementController.setFlexStrength(flexStrength);
            });
            const flexDirectionInput = document.getElementById("flexDirection");
            flexDirectionInput.addEventListener("change", () => {
                const flexDirection = Number(flexDirectionInput.value);
                this.movementController.setFlexDirection(flexDirection);
            });
            const abductStrengthInput = document.getElementById("abductStrength");
            abductStrengthInput.addEventListener("input", () => {
                const abductStrength = Number(abductStrengthInput.value);
                this.movementController.setAbductStrength(abductStrength);
            });
            const abductDirectionInput = document.getElementById("abductDirection");
            abductDirectionInput.addEventListener("change", () => {
                const abductDirection = Number(abductDirectionInput.value);
                this.movementController.setAbductDirection(abductDirection);
            });
            const toggleButton = document.getElementById("toggleMovement");
            toggleButton.addEventListener("click", () => {
                this.movementController.toggleMovement();
            });
            /* const deactivateSelectedBones =
                document.getElementById("deactivateSelectedBones") as HTMLButtonElement;
            deactivateSelectedBones.addEventListener("click", () => {
                deactivateSelectedBonesHandler();
            });
 
            const resetPage =
                document.getElementById("resetPage") as HTMLButtonElement;
            resetPage.addEventListener("click", () => {
                resetPageHandler();
            }) */
        }
        hndSelection(_event) {
            if (_event.button != 0)
                return;
            let picks = ƒ.Picker.pickViewport(this.viewport, new ƒ.Vector2(_event.clientX, _event.clientY));
            if (picks.length == 0)
                return;
            picks.sort((a, b) => a.zBuffer - b.zBuffer);
            let node = picks[0].node;
            while (node && !node.getComponent(ƒ.ComponentRigidbody))
                node = node.getParent();
            if (!node)
                return;
            let rb = node.getComponent(ƒ.ComponentRigidbody);
            if (_event.shiftKey) {
                this.physicsController.changeBodyType(rb);
            }
            if (_event.ctrlKey) {
                this.selectionController.toggleBoneSelection(rb);
            }
        }
        hndApplyToAllBones(_event) {
            if (_event.key === "Q")
                this.selectionController.deselectAllBones();
            if (_event.key === "E")
                this.selectionController.selectAllBones();
            if (_event.key === "A")
                this.physicsController.changeAllBodiesToStatic();
            if (_event.key === "D")
                this.physicsController.changeAllBodiesToDynamic();
        }
    }
    Script.UserInputHandler = UserInputHandler;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map