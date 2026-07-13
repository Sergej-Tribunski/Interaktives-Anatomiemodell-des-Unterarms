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
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    let scene = null;
    let joints = null;
    let rotAxis = undefined;
    let selectedBones = [];
    let timer = 0;
    let direction = 1;
    let deltaTime = 0;
    let flexStrength = 10;
    let flexDirection = 1;
    let abductStrength = 10;
    let abductDirection = 1;
    let movementEnabled = false;
    let anchoringJoint = new Map();
    let AXIS;
    (function (AXIS) {
        AXIS[AXIS["FLEXTION"] = 0] = "FLEXTION";
        AXIS[AXIS["ABDUCTION"] = 1] = "ABDUCTION";
        AXIS[AXIS["TWIST"] = 2] = "TWIST";
    })(AXIS || (AXIS = {}));
    ;
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
        for (let node of scene.getChildren()) {
            selectBone(node.getComponent(ƒ.ComponentRigidbody));
        }
        viewport.canvas.addEventListener("mousedown", hndSelection);
        viewport.canvas.addEventListener("keydown", hndDeselectAll);
        const flexStrengthInput = document.getElementById("flexStrength");
        const flexDirectionInput = document.getElementById("flexDirection");
        const abductStrengthInput = document.getElementById("abductStrength");
        const abductDirectionInput = document.getElementById("abductDirection");
        const toggleButton = document.getElementById("toggleMovement");
        flexStrengthInput.addEventListener("input", () => {
            flexStrength = Number(flexStrengthInput.value);
        });
        flexDirectionInput.addEventListener("change", () => {
            flexDirection = Number(flexDirectionInput.value);
        });
        abductStrengthInput.addEventListener("input", () => {
            abductStrength = Number(abductStrengthInput.value);
        });
        abductDirectionInput.addEventListener("change", () => {
            abductDirection = Number(abductDirectionInput.value);
        });
        toggleButton.addEventListener("click", () => {
            movementEnabled = !movementEnabled;
            toggleButton.textContent =
                movementEnabled ? "Stop Movement" : "Start Movement";
        });
        document.getElementById("controls").style.display = "block";
        document.getElementById("controls").style.display = "flex";
        document.getElementById("selectedBonesPanel").style.display = "block";
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        ƒ.Physics.simulate(); // if physics is included and used
        deltaTime = ƒ.Loop.timeFrameGame / 1000;
        timer += deltaTime;
        if (timer >= 5) {
            timer = 0;
            direction *= -1;
        }
        if (movementEnabled) {
            rotateBones(flexStrength, flexDirection, abductStrength, abductDirection);
        }
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    function defineRigidBodies(_scene) {
        for (let node of _scene.getIterator(false)) {
            if (!node.name.includes("Primitive") && !node.name.includes("Scene")) { //WIP change bodytype to dynamic (only the humerus stays static)
                let cmpRigidbody = new ƒ.ComponentRigidbody(10, node.name.includes("Humerus") ? ƒ.BODY_TYPE.STATIC : ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
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
                //cmpRigidbody.effectGravity = 0;
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
    function defineJoint(_jointNode, _anchor, _tied) {
        if (_jointNode.getComponent(Script.Joint).jointType == Script.JOINT_TYPE.REVOLUTE) {
            let joint = new ƒ.JointRevolute(_anchor, _tied, _jointNode.mtxLocal.getX().normalize());
            joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxWorld.translation, _anchor.node.mtxWorld.translation);
            joint.minMotor = -_jointNode.getComponent(Script.Joint).flexInLimit;
            joint.maxMotor = _jointNode.getComponent(Script.Joint).flexOutLimit;
            _jointNode.addComponent(joint);
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
            //console.log("Joint Universal would be added.");
        }
        if (_jointNode.getComponent(Script.Joint).jointType == Script.JOINT_TYPE.RAGDOLL) {
            let joint = new ƒ.JointRagdoll(_anchor, _tied, _jointNode.mtxLocal.getX().normalize(), _jointNode.mtxLocal.getZ().normalize());
            joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxLocal.translation, _anchor.node.mtxLocal.translation);
            joint.maxAngleFirstAxis = -_jointNode.getComponent(Script.Joint).flexOutLimit;
            joint.maxAngleSecondAxis = _jointNode.getComponent(Script.Joint).flexInLimit;
            joint.minMotorTwist = -_jointNode.getComponent(Script.Joint).twistCounterClockwiseLimit;
            joint.minMotorTwist = _jointNode.getComponent(Script.Joint).twistClockwiseLimit;
            _jointNode.addComponent(joint);
            //console.log("Joint Ragdoll would be added.");
        }
        if (_jointNode.getComponent(Script.Joint).jointType == Script.JOINT_TYPE.WELDING) {
            let joint = new ƒ.JointWelding(_anchor, _tied);
            joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxLocal.translation, _anchor.node.mtxLocal.translation);
            _jointNode.addComponent(joint);
            //console.log("Joint Welding would be added.");
        }
    }
    function selectBone(_rb) {
        if (!selectedBones.includes(_rb)) {
            selectedBones.push(_rb);
            console.log("Select: ", _rb.node?.name);
            updatedSelectedBonesList();
        }
    }
    function deselectBone(_rb) {
        let index = selectedBones.indexOf(_rb, 0);
        selectedBones.splice(index, 1);
        console.log("Deselect: ", _rb.node?.name);
        updatedSelectedBonesList();
    }
    function deselectAllBones() {
        selectedBones.length = 0;
        console.log("Deselect all!");
        updatedSelectedBonesList();
    }
    function updatedSelectedBonesList() {
        const list = document.getElementById("selectedBonesList");
        list.innerHTML = "";
        for (let rb of selectedBones) {
            const item = document.createElement("li");
            item.textContent = rb.node?.name ?? "Unknown";
            list.appendChild(item);
        }
    }
    function rotateBones(_strengthFirst, _directionFirst, _strengthSecond, _directionSecond) {
        for (let rb of selectedBones) {
            if (anchoringJoint.get(rb)?.jointType == Script.JOINT_TYPE.REVOLUTE) {
                rotateBoneRevolute(rb, _strengthFirst, _directionFirst);
            }
            if (anchoringJoint.get(rb)?.jointType == Script.JOINT_TYPE.UNIVERSAL) {
                rotateBoneUniversal(rb, _strengthFirst, _directionFirst, _strengthSecond, _directionSecond);
            }
            if (anchoringJoint.get(rb)?.jointType == Script.JOINT_TYPE.RAGDOLL) {
                rotateBoneRagdoll(rb, _strengthFirst, _directionFirst, _strengthSecond, _directionSecond);
            }
        }
    }
    function rotate(_rb, _strength, _direction, _axis) {
        _strength *= -1;
        if (_axis === AXIS.FLEXTION)
            rotAxis = ƒ.Vector3.TRANSFORMATION(anchoringJoint.get(_rb).node.mtxLocal.getX(), _rb.node.mtxWorld, false).normalize();
        if (_axis === AXIS.ABDUCTION)
            rotAxis = ƒ.Vector3.TRANSFORMATION(anchoringJoint.get(_rb).node.mtxLocal.getY(), _rb.node.mtxWorld, false).normalize();
        if (_axis === AXIS.TWIST)
            rotAxis = ƒ.Vector3.TRANSFORMATION(anchoringJoint.get(_rb).node.mtxLocal.getZ(), _rb.node.mtxWorld, false).normalize();
        rotAxis?.normalize();
        rotAxis?.scale(_direction * _strength);
        _rb.applyTorque(rotAxis);
    }
    function rotateBoneRevolute(_rb, _strengthFlexion, _directionFlexion) {
        rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
    }
    function rotateBoneUniversal(_rb, _strengthFlexion, _directionFlexion, _strengthAbduction, _directionAbduction) {
        rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
        rotate(_rb, _strengthAbduction, _directionAbduction, AXIS.ABDUCTION);
    }
    function rotateBoneRagdoll(_rb, _strengthFlexion, _directionFlexion, _strengthTwist, _directionTwist) {
        rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
        rotate(_rb, _strengthTwist, _directionTwist, AXIS.TWIST);
    }
    function hndSelection(_event) {
        if (!(_event.button == 0 && _event.ctrlKey))
            return;
        let picks = ƒ.Picker.pickViewport(viewport, new ƒ.Vector2(_event.clientX, _event.clientY));
        if (picks.length == 0)
            return;
        picks.sort((a, b) => a.zBuffer - b.zBuffer);
        let node = picks[0].node;
        while (node && !node.getComponent(ƒ.ComponentRigidbody))
            node = node.getParent();
        if (!node)
            return;
        let rb = node.getComponent(ƒ.ComponentRigidbody);
        if (selectedBones.includes(rb))
            deselectBone(rb);
        else
            selectBone(rb);
    }
    function hndDeselectAll(_event) {
        if (_event.key === "Escape") {
            deselectAllBones();
        }
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map