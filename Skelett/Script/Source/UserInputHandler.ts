namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("UserInputHandler running!");
    export class UserInputHandler {
        private viewport: ƒ.Viewport;
        private selectionController: SelectionController;
        private physicsController: PhysicsController;
        private movementController: MovementController;

        constructor(_viewport: ƒ.Viewport,
            _selectionController: SelectionController,
            _physicsController: PhysicsController,
            _movementController: MovementController) {

            this.viewport = _viewport;
            this.selectionController = _selectionController;
            this.physicsController = _physicsController;
            this.movementController = _movementController;

            this.setupEventListeners();
        }

        private setupEventListeners(): void {
            this.viewport.canvas.addEventListener("mousedown", this.hndSelection.bind(this));
            this.viewport.canvas.addEventListener("keydown", this.hndApplyToAllBones.bind(this));

            const flexStrengthInput =
                document.getElementById("flexStrength") as HTMLInputElement;
            flexStrengthInput.addEventListener("input", () => {
                const flexStrength = Number(flexStrengthInput.value);
                this.movementController.setFlexStrength(flexStrength);
            });

            const flexDirectionInput =
                document.getElementById("flexDirection") as HTMLSelectElement;
            flexDirectionInput.addEventListener("change", () => {
                const flexDirection = Number(flexDirectionInput.value);
                this.movementController.setFlexDirection(flexDirection);
            });

            const abductStrengthInput =
                document.getElementById("abductStrength") as HTMLInputElement;
            abductStrengthInput.addEventListener("input", () => {
                const abductStrength = Number(abductStrengthInput.value);
                this.movementController.setAbductStrength(abductStrength);
            });

            const abductDirectionInput =
                document.getElementById("abductDirection") as HTMLSelectElement;
            abductDirectionInput.addEventListener("change", () => {
                const abductDirection = Number(abductDirectionInput.value);
                this.movementController.setAbductDirection(abductDirection);
            });

            const toggleButton =
                document.getElementById("toggleMovement") as HTMLButtonElement;
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

        private hndSelection(_event: MouseEvent): void {
            if (_event.button != 0)
                return;
            let picks: ƒ.Pick[] = ƒ.Picker.pickViewport(this.viewport, new ƒ.Vector2(_event.clientX, _event.clientY));
            if (picks.length == 0)
                return;
            picks.sort((a, b) => a.zBuffer - b.zBuffer);
            let node: ƒ.Node = picks[0].node;
            while (node && !node.getComponent(ƒ.ComponentRigidbody))
                node = node.getParent()!;
            if (!node)
                return;
            let rb: ƒ.ComponentRigidbody = node.getComponent(ƒ.ComponentRigidbody);

            if (_event.shiftKey) {
                this.physicsController.changeBodyType(rb);
            }
            if (_event.ctrlKey) {
                this.selectionController.toggleBoneSelection(rb);
            }
        }

        private hndApplyToAllBones(_event: KeyboardEvent): void {
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
}