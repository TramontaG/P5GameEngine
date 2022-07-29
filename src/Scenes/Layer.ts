import { RenderEvent, SceneRenderFn } from "../Models/Scenes"
import { emptyRender, emptyRenderEvent } from "../utils/Scenes";

type LayerConstructorProps = {
    setup?: SceneRenderFn,
    render?: SceneRenderFn,
    objects?: any[];
    shouldRender?: boolean;
    beforeRender?: RenderEvent;
    afterRender?: RenderEvent;
    beforeDestroy?: RenderEvent;
    afterDestroy?: RenderEvent;
}


class Layer {
    shouldRender: boolean;
    setup: SceneRenderFn;
    render: SceneRenderFn;
    beforeRender: RenderEvent;
    afterRender: RenderEvent;
    beforeDestroy: RenderEvent;
    afterDestroy: RenderEvent;
    objects: any[];

    constructor(props: LayerConstructorProps){
        this.shouldRender = props.shouldRender || true;
        this.setup = props.setup || emptyRender;
        this.render = props.render || emptyRender;
        this.objects = props.objects || [];
        this.beforeRender = props.beforeRender || emptyRenderEvent;
        this.afterRender = props.afterRender || emptyRenderEvent;
        this.beforeDestroy = props.beforeDestroy || emptyRenderEvent;
        this.afterDestroy = props.afterDestroy || emptyRender;
    }
}

export default Layer;
