import Vector2D from "../vector2d"

export const vectorToRadians = (v: Vector2D) => {
    const {x, y} = v;
    return Math.atan2(y, x);
}