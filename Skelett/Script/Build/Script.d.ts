declare namespace Script {
    import ƒ = FudgeCore;
    enum JOINT_TYPE {
        REVOLUTE = 0,
        UNIVERSAL = 1
    }
    class Joint extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        jointType: JOINT_TYPE;
        bodyAnchor: string;
        bodyTied: string;
        rotIn: number;
        rotOut: number;
        rotLeft: number;
        rotRight: number;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
}
