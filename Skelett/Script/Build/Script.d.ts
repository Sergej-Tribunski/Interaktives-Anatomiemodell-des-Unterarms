declare namespace Script {
    import ƒ = FudgeCore;
    class Joint extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        angle: number;
        anchor: ƒ.Node | null;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
}
