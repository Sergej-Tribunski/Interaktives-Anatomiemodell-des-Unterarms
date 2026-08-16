namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("PhysicsController running!");
    export class PhysicsController {
        
        public onRbTypeChanged: ((_rb: ƒ.ComponentRigidbody) => void) | null = null;

        public changeBodyType(_rb: ƒ.ComponentRigidbody): void {
            if (_rb.node?.name.includes("Humerus")) return;

            if (_rb.typeBody === ƒ.BODY_TYPE.DYNAMIC) {
                _rb.typeBody = ƒ.BODY_TYPE.STATIC;
            } else
                if (_rb.typeBody === ƒ.BODY_TYPE.STATIC) {
                    _rb.typeBody = ƒ.BODY_TYPE.DYNAMIC;
                }

            this.onRbTypeChanged?.(_rb);
        }
    }
}