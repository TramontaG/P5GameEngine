import Game from "../game";

export type SceneRenderFn = (canvas: Game["canvas"]) => any;
export type RenderEvent = (canvas: Game["canvas"]) => any;
