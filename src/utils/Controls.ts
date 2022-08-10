import Vector2D from "../math/vector2d";
import GameObject from "../gameObject";
import Game from "../game";

export const WASD = (gameObject: GameObject) => ({
    w: (_: Game["canvas"]) => gameObject.position = gameObject.position.add(new Vector2D(0, -1)),
    a: (_: Game["canvas"]) => gameObject.position = gameObject.position.add(new Vector2D(-1, 0)),
    s: (_: Game["canvas"]) => gameObject.position = gameObject.position.add(new Vector2D(0, 1)),
    d: (_: Game["canvas"]) => gameObject.position = gameObject.position.add(new Vector2D(1, 0)),
})
