namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("PrepareVisuals running!");
    export class PrepareVisuals {

        private branch: ƒ.Node;
        private material: ƒ.Material = <ƒ.Material>ƒ.Project.getResourcesByName("MaterialShaderGouraud")[0];

        constructor(_branch: ƒ.Node) {

            this.branch = _branch;

            this.prepareShaders();
            this.prepareNodeVisibility();
        }

        private prepareShaders(): void {
            for (let node of this.branch.getIterator(false))
                if (node.name.endsWith("Primitive0") || node.name.endsWith("Primitive1")) {
                    let cmpMaterial: ƒ.ComponentMaterial = node.getComponent(ƒ.ComponentMaterial);
                    cmpMaterial.material = this.material;
                }
        }

        private prepareNodeVisibility(): void {
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
}