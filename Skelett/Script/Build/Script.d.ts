declare namespace Script {
    import ƒ = FudgeCore;
    class Joint extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        bodyAnchor: string;
        bodyTied: string;
        minRotation: number;
        maxRotation: number;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
}
