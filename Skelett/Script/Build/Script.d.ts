declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        node0: ƒ.Node | undefined;
        node1: ƒ.Node | undefined;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    function positionForce(_posClient: ƒ.Vector2): void;
}
declare namespace Script {
    import ƒ = FudgeCore;
    let viewport: ƒ.Viewport;
    let vecMouse: ƒ.Vector2;
    let force: ƒ.Node;
}
