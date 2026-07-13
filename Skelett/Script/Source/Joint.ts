namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export enum JOINT_TYPE {
    REVOLUTE,
    UNIVERSAL,
    RAGDOLL,
    WELDING
  }

  enum twistAxis { FLEXION, ABDUCTION, TWIST };

  export class Joint extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(Joint);
    // Properties may be mutated by users in the editor via the automatically created user interface

    public message: string = "CustomComponentScript added to ";

    @ƒ.type(JOINT_TYPE)
    public jointType: JOINT_TYPE = JOINT_TYPE.WELDING;
    @ƒ.serialize(ƒ.Node)
    public bodyAnchor: ƒ.Node | string | undefined = undefined;
    @ƒ.serialize(ƒ.Node)
    public bodyTied: ƒ.Node | string | undefined = undefined;
    @ƒ.type(Number)
    public flexInLimit: number = 0;
    @ƒ.type(Number)
    public flexOutLimit: number = 0;
    @ƒ.type(Number)
    public abductLeftLimit: number = 0;
    @ƒ.type(Number)
    public abductRightLimit: number = 0;
    @ƒ.type(Number)
    public twistClockwiseLimit: number = 0;
    @ƒ.type(Number)
    public twistCounterClockwiseLimit: number = 0;

    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      this.addEventListener(ƒ.EVENT.MUTATE, (event: any) => {
        console.log("Joint mutated!", event);
      })
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

    protected reduceMutator(_mutator: ƒ.Mutator): void {
      if (_mutator.bodyAnchor instanceof ƒ.Node)
        _mutator.bodyAnchor = _mutator.bodyAnchor.name;
      if (_mutator.bodyTied instanceof ƒ.Node)
        _mutator.bodyTied = _mutator.bodyTied.name;
      if (_mutator.jointType === JOINT_TYPE.WELDING) {
        removeRotationFields(_mutator, twistAxis.FLEXION);
        removeRotationFields(_mutator, twistAxis.ABDUCTION);
        removeRotationFields(_mutator, twistAxis.TWIST);
      }
      if (_mutator.jointType === JOINT_TYPE.REVOLUTE) {
        removeRotationFields(_mutator, twistAxis.ABDUCTION);
        removeRotationFields(_mutator, twistAxis.TWIST);
      }
      if (_mutator.jointType === JOINT_TYPE.UNIVERSAL)
        removeRotationFields(_mutator, twistAxis.TWIST);
      if (_mutator.jointType === JOINT_TYPE.RAGDOLL)
        removeRotationFields(_mutator, twistAxis.ABDUCTION);
      // delete properties that should not be mutated
      // undefined properties and private fields (#) will not be included by default
    }
  }
  function removeRotationFields(_mutator: ƒ.Mutator, _twistAxis: twistAxis) {
    if (_twistAxis === twistAxis.FLEXION) {
      delete _mutator.flexInLimit;
      delete _mutator.flexOutLimit;
    }
    if (_twistAxis === twistAxis.ABDUCTION) {
      delete _mutator.abductRightLimit;
      delete _mutator.abductLeftLimit;
    }
    if (_twistAxis === twistAxis.TWIST) {
      delete _mutator.twistClockwiseLimit;
      delete _mutator.twistCounterClockwiseLimit;
    }
  }
}