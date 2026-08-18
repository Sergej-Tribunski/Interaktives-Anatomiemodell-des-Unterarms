namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("MovementController running!");

    enum AXIS { FLEXTION, ABDUCTION, TWIST };

    export class MovementController {

        private joints: PrepareJoints;
        private selectionController: SelectionController;
        private uiController: UIController;

        private flexStrength: number = 10;
        private flexDirection: number = 1;
        private abductStrength: number = 10;
        private abductDirection: number = 1;
        private movementEnabled: boolean = false;
        private rotAxis: ƒ.Vector3 | undefined = undefined;

        constructor(_joints: PrepareJoints,
            _selectionController: SelectionController,
            _uiController: UIController) {

            this.joints = _joints;
            this.selectionController = _selectionController;
            this.uiController = _uiController;
        }

        public setFlexStrength(_flexStrength: number): void {
            this.flexStrength = _flexStrength;
        }
        public setFlexDirection(_flexDirection: number): void {
            this.flexDirection = _flexDirection;
        }
        public setAbductStrength(_abductStrength: number): void {
            this.abductStrength = _abductStrength;
        }
        public setAbductDirection(_abductDirection: number): void {
            this.abductDirection = _abductDirection;
        }
        public toggleMovement(): void {
            this.movementEnabled = !this.movementEnabled;
            this.uiController.updateMovementButton(this.movementEnabled)

        }

        private rotate(_rb: ƒ.ComponentRigidbody, _strength: number, _direction: number, _axis: AXIS): void {
            _strength *= -1;

            if (_axis === AXIS.FLEXTION)
                this.rotAxis = ƒ.Vector3.TRANSFORMATION(this.joints.getAnchoringJoint().get(_rb)!.node!.mtxLocal.getX(), _rb.node!.mtxWorld, false).normalize();
            if (_axis === AXIS.ABDUCTION)
                this.rotAxis = ƒ.Vector3.TRANSFORMATION(this.joints.getAnchoringJoint().get(_rb)!.node!.mtxLocal.getY(), _rb.node!.mtxWorld, false).normalize();
            if (_axis === AXIS.TWIST)
                this.rotAxis = ƒ.Vector3.TRANSFORMATION(this.joints.getAnchoringJoint().get(_rb)!.node!.mtxLocal.getZ(), _rb.node!.mtxWorld, false).normalize();

            this.rotAxis?.normalize();
            this.rotAxis?.scale(_direction * _strength);

            _rb.applyTorque(this.rotAxis!);
        }

        private rotateBoneRevolute(_rb: ƒ.ComponentRigidbody, _strengthFlexion: number, _directionFlexion: number): void {
            this.rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
        }

        private rotateBoneUniversal(_rb: ƒ.ComponentRigidbody, _strengthFlexion: number, _directionFlexion: number, _strengthAbduction: number, _directionAbduction: number): void {
            this.rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
            this.rotate(_rb, _strengthAbduction, _directionAbduction, AXIS.ABDUCTION);
        }

        private rotateBoneRagdoll(_rb: ƒ.ComponentRigidbody, _strengthFlexion: number, _directionFlexion: number, _strengthTwist: number, _directionTwist: number): void {
            this.rotate(_rb, _strengthFlexion, _directionFlexion, AXIS.FLEXTION);
            this.rotate(_rb, _strengthTwist, _directionTwist, AXIS.TWIST);
        }

        private rotateBones(_flexStrength: number, _flexDirection: number, _abductStrength: number, _abductDirection: number): void {
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

        public moveModel(): void {
            if (this.movementEnabled) {
                this.rotateBones(this.flexStrength, this.flexDirection, this.abductStrength, this.abductDirection);
            }
        }
    }
}