import Vector from '@/helpers/vector';

export default class AstroObject {
    constructor(params = {}) {
        this.position = new Vector(params.positionX ?? 0, params.positionY ?? 0);
        this.speed = new Vector(params.speedX ?? 0, params.speedY ?? 0);
        this.acceleration = new Vector(0, 0);

        this.radius = params.radius ?? 1;
        this.mass = params.mass ?? 1;

        this.forces = [];

        // this.canvas = canvas;

        this.drawSpeed = params.drawSpeed ?? true;
        this.drawForce = params.drawForce ?? true;
    }

    get force() {
        return Vector.get().add(...this.forces);
    }

    draw(canvas, color) {
        canvas.drawCircle({
            x: this.position.x,
            y: this.position.y,
            r: this.radius,
            fillStyle: color,
        });

        if (this.drawSpeed) {
            canvas.drawLine({
                x1: this.position.x,
                y1: this.position.y,
                x2: this.position.x + this.speed.x,
                y2: this.position.y + this.speed.y,
                lineWidth: 1,
                strokeStyle: 'blue',
            });
        }

        if (this.drawForce) {
            const force = this.force;

            canvas.drawLine({
                x1: this.position.x,
                y1: this.position.y,
                x2: this.position.x + force.x,
                y2: this.position.y + force.y,
                lineWidth: 1,
                strokeStyle: 'red',
            });
        }
    }
}
