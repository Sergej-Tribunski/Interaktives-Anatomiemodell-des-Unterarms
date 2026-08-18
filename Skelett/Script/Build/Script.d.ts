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
    class MovementController {
        private joints;
        private selectionController;
        private uiController;
        private flexStrength;
        private flexDirection;
        private abductStrength;
        private abductDirection;
        private movementEnabled;
        private rotAxis;
        constructor(_joints: PrepareJoints, _selectionController: SelectionController, _uiController: UIController);
        setFlexStrength(_flexStrength: number): void;
        setFlexDirection(_flexDirection: number): void;
        setAbductStrength(_abductStrength: number): void;
        setAbductDirection(_abductDirection: number): void;
        toggleMovement(): void;
        private rotate;
        private rotateBoneRevolute;
        private rotateBoneUniversal;
        private rotateBoneRagdoll;
        private rotateBones;
        moveModel(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PhysicsController {
        private scene;
        private simulatedBones;
        private uiController;
        constructor(_scene: ƒ.Node, _uiController: UIController);
        private updateSimulatedBonesList;
        private onSimulatedBonesChanged;
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
        private physicsController;
        constructor(_scene: ƒ.Node, _physicsController: PhysicsController);
        private defineRigidbodies;
        private onRbCreated;
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
        private uiController;
        constructor(_scene: ƒ.Node, _uiController: UIController);
        private updateSelectedBonesList;
        private onSelectedBonesChanged;
        toggleBoneSelection(_rb: ƒ.ComponentRigidbody): void;
        private selectBone;
        private deselectBone;
        selectAllBones(): void;
        deselectAllBones(): void;
        getSelectedBones(): ƒ.ComponentRigidbody[];
    }
}
declare namespace Script {
    class UIController {
        private addBoneToList;
        private removeBoneFromList;
        updateSimulatedBonesList(_boneName: string, _isInList: boolean): void;
        updateSelectedBonesList(_boneName: string, _isInList: boolean): void;
        updateMovementButton(_movementEnabled: boolean): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class UserInputHandler {
        private viewport;
        private selectionController;
        private physicsController;
        private movementController;
        constructor(_viewport: ƒ.Viewport, _selectionController: SelectionController, _physicsController: PhysicsController, _movementController: MovementController);
        private setupEventListeners;
        private hndSelection;
        private hndApplyToAllBones;
    }
}
