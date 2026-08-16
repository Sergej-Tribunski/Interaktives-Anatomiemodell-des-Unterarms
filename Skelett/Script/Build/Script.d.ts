declare namespace Script {
    import ƒ = FudgeCore;
    enum JOINT_TYPE {
        REVOLUTE = 0,
        UNIVERSAL = 1,
        RAGDOLL = 2,
        WELDING = 3
    }
    class Joint extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        jointType: JOINT_TYPE;
        bodyAnchor: ƒ.Node | string | undefined;
        bodyTied: ƒ.Node | string | undefined;
        flexInLimit: number;
        flexOutLimit: number;
        abductLeftLimit: number;
        abductRightLimit: number;
        twistClockwiseLimit: number;
        twistCounterClockwiseLimit: number;
        constructor();
        hndEvent: (_event: Event) => void;
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace Script {
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PhysicsController {
        private branch;
        constructor(_branch: ƒ.Node);
        changeBodyType(_rb: ƒ.ComponentRigidbody): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PrepareJoints {
        private branch;
        private jointContainer;
        private anchoringJoint;
        private scene;
        constructor(_branch: ƒ.Node);
        private defineJoints;
        private defineJoint;
        private resolveJoint;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PrepareRigidbodies {
        private scene;
        constructor(_scene: ƒ.Node, _physicsController: PhysicsController);
        private defineRigidbodies;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PrepareVisuals {
        private branch;
        private material;
        constructor(_branch: ƒ.Node);
        private prepareShaders;
        private prepareNodeVisibility;
    }
}
