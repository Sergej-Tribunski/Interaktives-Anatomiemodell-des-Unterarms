namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("PhysicsController running!");
    export class PhysicsController {

        private scene: ƒ.Node;
        private simulatedBones: ƒ.ComponentRigidbody[] = [];

        constructor(_scene: ƒ.Node) {
            this.scene = _scene;
        }

        private updateSimulatedBonesList(_rb: ƒ.ComponentRigidbody, _isDynamic: boolean): void {
            if (_isDynamic) {
                if (!this.simulatedBones.includes(_rb)) {
                    this.simulatedBones.push(_rb);
                } else {
                    const rbIndexInArray = this.simulatedBones.indexOf(_rb);
                    if (rbIndexInArray !== -1) {
                        this.simulatedBones.splice(rbIndexInArray, 1);
                    }
                }
            }
            this.onSimulatedBonesChanged?.(_rb.node?.name!, _isDynamic);
        }

        public onSimulatedBonesChanged: ((boneName: string, _isInList: boolean) => void) | null = null;

        public changeBodyType(_rb: ƒ.ComponentRigidbody): void {
            if (_rb.node?.name.includes("Humerus")) return;

            if (_rb.typeBody === ƒ.BODY_TYPE.DYNAMIC) {
                _rb.typeBody = ƒ.BODY_TYPE.STATIC;
                this.updateSimulatedBonesList?.(_rb, false);
            } else
                if (_rb.typeBody === ƒ.BODY_TYPE.STATIC) {
                    _rb.typeBody = ƒ.BODY_TYPE.DYNAMIC;
                    this.updateSimulatedBonesList?.(_rb, true);
                }
        }

        public changeAllBodiesToStatic(): void {
            for (let node of this.scene?.getChildren()!) {
                let rb = node.getComponent(ƒ.ComponentRigidbody);
                if (!rb) continue;
                if (rb.typeBody === ƒ.BODY_TYPE.DYNAMIC)
                    this.changeBodyType(rb);
            }
        }

        public changeAllBodiesToDynamic(): void {
            for (let node of this.scene?.getChildren()!) {
                let rb = node.getComponent(ƒ.ComponentRigidbody);
                if (!rb || node.name.includes("Humerus")) continue;
                if (rb.typeBody === ƒ.BODY_TYPE.STATIC)
                    this.changeBodyType(rb);
            }
        }
    }
}