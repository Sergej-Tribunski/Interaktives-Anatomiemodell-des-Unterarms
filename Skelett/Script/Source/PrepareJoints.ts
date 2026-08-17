namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("PrepareJoints running!");
    export class PrepareJoints {

        private branch: ƒ.Node;
        private jointContainer: ƒ.Node;
        private anchoringJoint: Map<ƒ.ComponentRigidbody, ƒ.Joint> = new Map();
        private scene: ƒ.Node;

        constructor(_branch: ƒ.Node) {

            this.branch = _branch;
            this.jointContainer = this.branch.getChildByName("Joints");
            this.scene = this.branch.getChildByName("Scene");

            this.defineJoints(this.jointContainer);
        }

        private defineJoints(_joints: ƒ.Node): void {
            ƒ.Render.prepare(this.branch);
            for (let node of _joints.getIterator(false)) {
                if (node.name.startsWith("Joint ")) {
                    this.defineJoint(node, this.resolveJoint(node.getComponent(Joint).bodyAnchor)?.getComponent(ƒ.ComponentRigidbody)!, this.resolveJoint(node.getComponent(Joint).bodyTied)?.getComponent(ƒ.ComponentRigidbody)!);
                }
            }
        }

        private defineJoint(_jointNode: ƒ.Node, _anchor: ƒ.ComponentRigidbody, _tied: ƒ.ComponentRigidbody) {
            if (_jointNode.getComponent(Joint).jointType == JOINT_TYPE.REVOLUTE) {
                let joint: ƒ.JointRevolute = new ƒ.JointRevolute(_anchor, _tied, _jointNode.mtxLocal.getX().normalize());
                joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxWorld.translation, _anchor.node!.mtxWorld.translation);
                joint.minMotor = -_jointNode.getComponent(Joint).flexInLimit;
                joint.maxMotor = _jointNode.getComponent(Joint).flexOutLimit;
                _jointNode.addComponent(joint);
                this.anchoringJoint.set(_tied, joint);
                //console.log("Joint Revolute would be added.");
            }

            if (_jointNode.getComponent(Joint).jointType == JOINT_TYPE.UNIVERSAL) {
                let joint: ƒ.JointUniversal = new ƒ.JointUniversal(_anchor, _tied, _jointNode.mtxLocal.getX().normalize(), _jointNode.mtxLocal.getY().normalize());
                joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxWorld.translation, _anchor.node!.mtxWorld.translation);
                joint.minRotorFirst = -_jointNode.getComponent(Joint).flexInLimit;
                joint.maxRotorFirst = _jointNode.getComponent(Joint).flexOutLimit;
                joint.minRotorSecond = -_jointNode.getComponent(Joint).abductLeftLimit;
                joint.maxRotorSecond = _jointNode.getComponent(Joint).abductRightLimit;
                _jointNode.addComponent(joint);
                this.anchoringJoint.set(_tied, joint);
                //console.log("Joint Universal would be added.");
            }

            if (_jointNode.getComponent(Joint).jointType == JOINT_TYPE.RAGDOLL) {
                let joint: ƒ.JointRagdoll = new ƒ.JointRagdoll(_anchor, _tied, _jointNode.mtxLocal.getY().normalize(), _jointNode.mtxLocal.getY().normalize());
                joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxLocal.translation, _anchor.node!.mtxLocal.translation);
                joint.maxAngleFirstAxis = -_jointNode.getComponent(Joint).flexOutLimit;
                joint.maxAngleSecondAxis = _jointNode.getComponent(Joint).flexInLimit;
                joint.minMotorTwist = -_jointNode.getComponent(Joint).twistCounterClockwiseLimit;
                joint.maxMotorTwist = _jointNode.getComponent(Joint).twistClockwiseLimit;
                _jointNode.addComponent(joint);
                this.anchoringJoint.set(_tied, joint);
                //console.log("Joint Ragdoll would be added.");
            }
            if (_jointNode.getComponent(Joint).jointType == JOINT_TYPE.WELDING) {
                let joint: ƒ.JointWelding = new ƒ.JointWelding(_anchor, _tied);
                joint.anchor = ƒ.Vector3.DIFFERENCE(_jointNode.mtxLocal.translation, _anchor.node!.mtxLocal.translation);
                _jointNode.addComponent(joint);
                this.anchoringJoint.set(_tied, joint);
                //console.log("Joint Welding would be added.");
            }
        }

        private resolveJoint(_body: ƒ.Node | string | undefined): ƒ.Node | null {
            if (!_body) {
                return null;
            }
            if (typeof _body === "string") {
                return this.scene?.getChildByName(_body)!;
            }
            return _body;
        }

        public getAnchoringJoint(): Map<ƒ.ComponentRigidbody, ƒ.Joint> {
            return this.anchoringJoint;
        }
    }
}