namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("UIController running!");
    export class UIController {

        private addBoneToList(_boneName: string, _list: HTMLUListElement): void {
            const item = document.createElement("li");
            item.textContent = _boneName;
            item.dataset.boneName = _boneName;
            _list.appendChild(item);
        }

        private removeBoneFromList(_boneName: string, _list: HTMLUListElement): void {
            const escapedBoneName = CSS.escape(_boneName);
            const selector = `li[data-bone-name="${escapedBoneName}"]`;
            const listItem = _list.querySelector(selector);
            if (listItem) {
                listItem.remove();
            }
        }

        constructor() {
            document.getElementById("controlsPanelsContainer")!.style.display = "block";
            document.getElementById("listPanelsContainer")!.style.display = "block";
        }

        public updateSimulatedBonesList(_boneName: string, _isInList: boolean): void {
            const list = document.getElementById("simulatedBonesList") as HTMLUListElement;
            if (_isInList) {
                this.addBoneToList(_boneName, list);
            } else {
                this.removeBoneFromList(_boneName, list);
            }
        }

        public updateSelectedBonesList(_boneName: string, _isInList: boolean): void {
            const list: HTMLUListElement = document.getElementById("selectedBonesList") as HTMLUListElement;
            if (_isInList) {
                this.addBoneToList(_boneName, list);
            } else {
                this.removeBoneFromList(_boneName, list);
            }
        }

        public updateMovementButton(_movementEnabled: boolean): void {
            const toggleButton = document.getElementById("toggleMovement") as HTMLButtonElement;
            toggleButton.textContent = _movementEnabled ? "Stop Movement" : "Start Movement";
        }

        public togglePanel(_header: HTMLElement): void {
            const panelContent = _header.nextElementSibling as HTMLElement;
            const isCollapsed = panelContent.classList.contains("collapsed");

            if (isCollapsed) {
                panelContent.classList.remove("collapsed");
            } else {
                panelContent.classList.add("collapsed");
            }
        }
    }
}