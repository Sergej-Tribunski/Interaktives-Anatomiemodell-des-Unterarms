namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("PrepareRigidbodies running!");
    export class PrepareRigidbodies {

        private scene: ƒ.Node;
        private physicsController: PhysicsController;

        constructor(_scene: ƒ.Node, _physicsController: PhysicsController) {
            this.scene = _scene;
            this.physicsController = _physicsController;

            this.defineRigidbodies();
        }

        private defineRigidbodies(): void {
            for (let node of this.scene.getIterator(false)) {
                if (!node.name.includes("Primitive") && !node.name.includes("Scene")) {
                    let cmpRb: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
                    cmpRb.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));
                    cmpRb.effectGravity = 1;
                    cmpRb.dampRotation = 10;
                    cmpRb.dampTranslation = 10;
                    node.addComponent(cmpRb);
                    this.onRbCreated?.(cmpRb);
                }
            }
        }

        private onRbCreated(_rb: ƒ.ComponentRigidbody): void {
            this.physicsController.changeBodyType(_rb);
        }
    }
}