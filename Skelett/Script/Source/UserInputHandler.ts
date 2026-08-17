namespace Script {
    import ƒ = FudgeCore;
    ƒ.Debug.info("UserInputHandler running!");
    export class UserInputHandler {
        private viewport: ƒ.Viewport;

        constructor(_viewport: ƒ.Viewport) {
            this.viewport = _viewport;
        }
    }
}