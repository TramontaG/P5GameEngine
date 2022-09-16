import Vector2D from "../../math/vector2d";

export const resultingForce = (forces: Vector2D[]) => {
    return forces.reduce((resulting, force) => {
        return resulting.add(force);
    }, new Vector2D(0,0));
}