namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("SelectionController running!");
    export class SelectionController {

        private scene: ƒ.Node;
        private selectedBones: ƒ.ComponentRigidbody[] = [];
        private uiController: UIController;

        constructor(_scene: ƒ.Node, _uiController: UIController) {
            this.scene = _scene;
            this.uiController = _uiController;
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

        private onSelectedBonesChanged(_boneName: string, _isInList: boolean): void {
            this.uiController.updateSelectedBonesList(_boneName, _isInList);
        }

        public toggleBoneSelection(_rb: ƒ.ComponentRigidbody): void {
            if (this.selectedBones.includes(_rb)) {
                this.deselectBone(_rb);
            } else {
                this.selectBone(_rb);
            }
        }

        private selectBone(_rb: ƒ.ComponentRigidbody): void {
            this.updateSelectedBonesList(_rb, true);
        }

        private deselectBone(_rb: ƒ.ComponentRigidbody): void {
            this.updateSelectedBonesList(_rb, false);
        }

        public selectAllBones(): void {
            for (let bone of this.scene.getChildren()) {
                this.selectBone(bone.getComponent(ƒ.ComponentRigidbody))
            }
        }

        public deselectAllBones(): void {
            for (let rb of this.selectedBones) {
                this.deselectBone(rb);
            }
        }

        public getSelectedBones(): ƒ.ComponentRigidbody[] {
            return this.selectedBones;
        }
    }
}