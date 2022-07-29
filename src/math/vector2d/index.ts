class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    copy(){
        return new Vector2D(this.x, this.y);
    }

    inverse(){
        return new Vector2D(this.x * -1, this.y * -1);
    }

    modulus(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    angleWith(otherVector: Vector2D){
        return Math.acos(this.dotProduct(otherVector) / (this.modulus() + otherVector.modulus()))
    }

    add(vector: Vector2D){
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector: Vector2D){
        return this.add(vector.inverse());
    }

    multiply(n: number){
        return new Vector2D(this.x * n, this.y * n);
    }

    dotProduct(vector: Vector2D){
        return this.x * vector.y + this.y * vector.x;
    }
}

export default Vector2D;
