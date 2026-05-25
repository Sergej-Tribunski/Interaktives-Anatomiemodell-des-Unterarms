namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class Joint extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(Joint);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "CustomComponentScript added to ";

    @ƒ.type(String)
    public bodyAnchor: string = "";
    @ƒ.type(String)
    public bodyTied: string = "";
    @ƒ.type(Number)
    public minRotation: number = 0;
    @ƒ.type(Number)
    public maxRotation: number = 0;

    /* private bodyAnchor: string = "Node name string";
    private bodyTied: string = "Node name string";
    private minRotation: number = 0;
    private maxRotation: number = 0;

    get bodyAnchorName(): string {
      return this.bodyAnchor;
    }
    get bodyTiedName(): string {
      return this.bodyTied;
    }
    get minRotationVal(): number{
      return this.minRotation;
    } 
    get maxRotationVal(): number{
      return this.maxRotation;
    } */

    /* @ƒ.type(ƒ.Node)
    public anchor: ƒ.Node | null = null; */

    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          ƒ.Debug.log(this.message, this.node);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}