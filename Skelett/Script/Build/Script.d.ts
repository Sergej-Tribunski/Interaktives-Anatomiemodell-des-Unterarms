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
        private scene;
        private simulatedBones;
        constructor(_scene: ƒ.Node);
        private updateSimulatedBonesList;
        onSimulatedBonesChanged: ((boneName: string, _isInList: boolean) => void) | null;
        changeBodyType(_rb: ƒ.ComponentRigidbody): void;
        changeAllBodiesToStatic(): void;
        changeAllBodiesToDynamic(): void;
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
        getAnchoringJoint(): Map<ƒ.ComponentRigidbody, ƒ.Joint>;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PrepareRigidbodies {
        private scene;
        constructor(_scene: ƒ.Node);
        private defineRigidbodies;
        onRbCreated: ((_rb: ƒ.ComponentRigidbody) => void) | null;
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
declare namespace Script {
    import ƒ = FudgeCore;
    class SelectionController {
        private scene;
        private selectedBones;
        constructor(_scene: ƒ.Node);
        private updateSelectedBonesList;
        onSelectedBonesChanged: ((boneName: string, _isInList: boolean) => void) | null;
        selectBone(_rb: ƒ.ComponentRigidbody): void;
        deselectBone(_rb: ƒ.ComponentRigidbody): void;
        selectAllBones(): void;
        deselectAllBones(): void;
    }
}
declare namespace Script {
    class UIController {
        private addBoneToList;
        private removeBoneFromList;
        updateSimulatedBonesList(_boneName: string, _isInList: boolean): void;
        updateSelectedBonesList(_boneName: string, _isInList: boolean): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class UserInputHandler {
        private viewport;
        constructor(_viewport: ƒ.Viewport);
    }
}
