namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("SelectionController running!");
    export class SelectionController {

        private scene: ƒ.Node;
        private selectedBones: ƒ.ComponentRigidbody[] = [];

        constructor(_scene: ƒ.Node) {
            this.scene = _scene;
        }

        private updateSelectedBonesList(_rb: ƒ.ComponentRigidbody, _isSelected: boolean): void {
            if (_isSelected) {
                if (!this.selectedBones.includes(_rb)) {
                    this.selectedBones.push(_rb);
                } else {
                    const rbIndexInArray = this.selectedBones.indexOf(_rb);
                    if (rbIndexInArray !== -1) {
                        this.selectedBones.splice(rbIndexInArray, 1);
                    }
                }
            }
            this.onSelectedBonesChanged?.(_rb.node?.name!, _isSelected);
        }

        public onSelectedBonesChanged: ((boneName: string, _isInList: boolean) => void) | null = null;

        public selectBone(_rb: ƒ.ComponentRigidbody): void {
            this.updateSelectedBonesList(_rb, true);
        }

        public deselectBone(_rb: ƒ.ComponentRigidbody): void {
            this.updateSelectedBonesList(_rb, false);
        }

        public selectAllBones(): void {
            for (let bone of this.scene) {
                this.selectBone(bone.getComponent(ƒ.ComponentRigidbody))
            }
        }

        public deselectAllBones(): void {
            for (let rb of this.selectedBones) {
                this.deselectBone(rb);
            }
        }
    }
}