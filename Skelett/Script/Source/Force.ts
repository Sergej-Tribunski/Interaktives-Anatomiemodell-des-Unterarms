namespace Script {
  import ƒ = FudgeCore;

  export function positionForce(_posClient: ƒ.Vector2) {
    force.activate(false);
    let picks: ƒ.Pick[] = ƒ.Picker.pickViewport(viewport, _posClient);
    if (!picks.length)
      return;

    let pick: ƒ.Pick = picks[0];
    force.mtxLocal.translation = pick.posWorld;
    force.mtxLocal.lookAt(ƒ.Vector3.SUM(pick.posWorld, pick.normal));
    force.activate(true);
    // let gizmo: ƒ.Gizmo = {
    //   drawGizmos = (viewport.camera, false): void => { };
    // }
    // // ƒ.Gizmos.draw(_gizmos: ƒ.Gizmo[], viewport.camera);
    // ƒ.Gizmos.drawArrow(pick.posWorld, ƒ.Color.CSS("blue"), pick.normal, ƒ.Vector3.Y(), 1, 1, 1, ƒ.MeshPyramid, 0);
  }
}