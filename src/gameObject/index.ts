import Vector2D from '../math/vector2d';
import Game from '../game';
import { KeyCallbackMap } from '../eventManagers/keyPressed/models';
import { KeyEvents } from '../eventManagers/keyPressed';
import Hitbox from './hitbox';
import { checkCollisionBetween, collideSquareWithPoint, CollisionSides } from '../physics/collision';
import { Class } from '../utils/Models';
import { resultingForce } from '../physics/forces';

type initOptions = {
	keyCallbackMap?: {
		[key in KeyEvents]?: KeyCallbackMap;
	};
};

class GameObject {
	protected gameInstance: Game;

	hitboxes: Hitbox[];
	forces: {
		[key: string]: Vector2D;
	};

	public _keyCallbackMap: {
		[key in KeyEvents]: KeyCallbackMap;
	};

	position: Vector2D;
	private _velocity;
	private _rotationAngle: Vector2D;
	private _velocityVector: Vector2D;
	private _bouncynessCoeficient: number;
	protected disableMovement: boolean;

	id: string;

	constructor(gameInstance: Game, options?: initOptions) {
		this.gameInstance = gameInstance;

		this._rotationAngle = new Vector2D(0, -1);
		this._velocity = 0;
		this._velocityVector = new Vector2D(0, 0);
		this.position = new Vector2D(0, 0);

		this._keyCallbackMap = {
			[KeyEvents.KeyDown]: {},
			[KeyEvents.KeyHeld]: {},
			[KeyEvents.KeyUp]: {},
			...options?.keyCallbackMap
		};

		this.id = Math.round(Math.random() * 0xffffffff).toString(16);

		this.hitboxes = [];
		this.forces = {};
		this._bouncynessCoeficient = 1;
		this.disableMovement = false;
	}

	set keyCallbackMap(map: {
		[key in KeyEvents]?: KeyCallbackMap;
	}) {
		this._keyCallbackMap = {
			...this._keyCallbackMap,
			...map
		};
	}

	set rotationAngle(angleInRadians: number) {
		const x = Math.cos(angleInRadians);
		const y = Math.sin(angleInRadians);
		this._rotationAngle = new Vector2D(x, y);
		this._velocityVector = this._rotationAngle.toUnitary().multiply(this._velocity);
	}
	get rotationAngle() {
		const { x, y } = this._rotationAngle;
		return Math.atan2(y, x);
	}

	set velocity(v: number) {
		this._velocity = v;
		this._velocityVector = this._rotationAngle.toUnitary().multiply(v);
	}
	get velocity() {
		return this._velocity;
	}
	get velocityAsVector() {
		return this._velocityVector;
	}
	set velocityAsVector(v: Vector2D) {
		this._velocityVector = v;
	}

	public upsertForce(key: string, force: Vector2D) {
		this.forces[key] = force;
	}

	protected setGravity(mag: number) {
		this.upsertForce('__GRAVITY__', new Vector2D(0, 1).setMag(mag / 10));
	}

	protected getCurrentScene() {
		return this.gameInstance.sceneManager;
	}
	get myLayer() {
		return this.getCurrentScene().getLayersWithGameObject(this)[0];
	}

	protected get otherGameObjects() {
		const allGameObjects = { ...this.myLayer.gameObjects };
		delete allGameObjects[this.id];
		return Object.values(allGameObjects);
	}

	protected forEveryHitbox(cb: (hb: Hitbox) => any) {
		this.hitboxes.forEach(cb);
	}

	public is(gameObjectType: Class) {
		return this instanceof gameObjectType;
	}

	_update() {
		if (!this.disableMovement) {
			this.position = this.position.add(this._velocityVector);
		}

		if (!this.checkCollision())
			if (!this.disableMovement) {
				this.velocityAsVector = this.velocityAsVector.add(resultingForce(Object.values(this.forces)));
			}

		this.update();
		this.checkOutOfScreen();
		this.disableMovement = false;
	}

	private checkCollision() {
		const activatedCbs: (() => boolean)[] = [];

		this.forEveryHitbox((hb1) => {
			this.otherGameObjects.forEach((go) => {
				go.forEveryHitbox((hb2) => {
					const collides = checkCollisionBetween(hb1, hb2);
					if (collides) activatedCbs.push(() => this.handleCollision(hb2.belongsTo, collides));
				});
			});
		});

		return activatedCbs.reduce((shouldStopMovement, cb) => {
			return shouldStopMovement || cb();
		}, false);
	}
	update() {}

	bounce(sides: CollisionSides, bouncynessCoeficient = this._bouncynessCoeficient) {
		if (sides.down) {
			this.velocityAsVector = new Vector2D(
				this.velocityAsVector.x,
				this.velocityAsVector.y * bouncynessCoeficient * -1
			);
			return true;
		}
		return false;
	}

	private checkOutOfScreen() {
		const gameScreen = new Vector2D(this.gameInstance.canvas.width, this.gameInstance.canvas.height);

		if (
			this.position.x > gameScreen.x ||
			this.position.y > gameScreen.y ||
			this.position.x < 0 ||
			this.position.y < 0
		) {
			this.handleExitScreen();
		}
	}

	_render(canvas: Game['canvas']) {
		canvas.push();
		canvas.translate(this.position.x, this.position.y);
		canvas.rotate(this.rotationAngle);

		this.render(canvas);
		this.hitboxes.forEach((hb) => hb.render(canvas));
		canvas.pop();
	}

	protected delete() {
		if (this.myLayer.gameObjects[this.id]) this.myLayer.unregisterGameObject(this.id);
	}

	render(canvas: Game['canvas']) {}
	beforeRender(canvas: Game['canvas']) {}

	handleCollision(other: GameObject, sides: CollisionSides) {
		return false;
	}
	handleExitScreen() {}

	spawn(gameObject: GameObject) {
		const myLayer = this.getCurrentScene().getLayersWithGameObject(this)[0];
		myLayer.registerGameObject(gameObject.id, gameObject);
	}

	protected isMouseOnMe(mousePos: Vector2D) {
		return this.hitboxes.reduce((collided, hb) => {
			return collideSquareWithPoint(hb, mousePos) || collided;
		}, false);
	}

	onLeftMouseButtonDown(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {}
	onLeftMouseButtonHeld(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {}
	onLeftMouseButtonUp(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {}
	onRightMouseButtonDown(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {}
	onRightMouseButtonHeld(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {}
	onRightMouseButtonUp(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {}

	_onLeftDragMe(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {
		if (this.isMouseOnMe(mousePos)) {
			this.onLeftDragMe(canvas, mousePos, e);
		}
	}
	onLeftDragMe(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {}

	_onRightDragMe(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {
		if (this.isMouseOnMe(mousePos)) {
			this.onRightDragMe(canvas, mousePos, e);
		}
	}
	onRightDragMe(canvas: Game['canvas'], mousePos: Vector2D, e?: MouseEvent) {}
}

export default GameObject;
