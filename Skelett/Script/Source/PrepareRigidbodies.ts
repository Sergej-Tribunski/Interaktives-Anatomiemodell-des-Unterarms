namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("PrepareRigidbodies running!");
    export class PrepareRigidbodies {

        private scene: ƒ.Node;

        constructor(_scene: ƒ.Node, _physicsController: PhysicsController) {
            this.scene = _scene;

            this.defineRigidbodies();
        }

        private defineRigidbodies(): void {
            for (let node of this.scene.getIterator(false)) {
                if (!node.name.includes("Primitive") && !node.name.includes("Scene")) {
                    let cmpRigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(1, ƒ.BODY_TYPE.STATIC, ƒ.COLLIDER_TYPE.SPHERE);
                    cmpRigidbody.mtxPivot.scale(new ƒ.Vector3(0.005, 0.005, 0.005));
                    cmpRigidbody.effectGravity = 1;
                    cmpRigidbody.dampRotation = 10;
                    cmpRigidbody.dampTranslation = 10;
                    node.addComponent(cmpRigidbody);
                }
            }
        }
    }
}