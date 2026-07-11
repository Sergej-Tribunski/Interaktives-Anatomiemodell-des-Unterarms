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
