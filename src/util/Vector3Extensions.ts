import {Vector3} from "three";

export function polarAngle(v: Vector3): number {
    if (v.z === 0) {
        return 0
    }
    else return Math.atan2(Math.hypot(v.x, v.y) , v.z)
}

export function azimuthalAngle(v: Vector3): number {
    if (v.x === 0) {
        return 0
    }
    else return Math.atan2(v.y , v.x)
}