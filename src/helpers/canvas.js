export default class Canvas {
    constructor(canvas) {
        this.view = canvas;
        this.context = this.view.getContext('2d');

        this.container = [];

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.view.width = window.innerWidth;
        this.view.height = window.innerHeight;
    }

    clear() {
        this.view.width |= this.view.width;
    }

    draw(color) {
        for (const item of this.container) {
            item.draw(this, color);
        }
    }

    drawCircle(param) {
        this.context.beginPath();
        this.context.arc(param.x, param.y, param.r, 0, 2 * Math.PI);

        if (param.fillStyle) {
            this.context.fillStyle = param.fillStyle;
            this.context.fill();
        }

        if (param.strokeStyle) {
            this.context.strokeStyle = param.strokeStyle;
            this.context.stroke();
        }
    }

    drawLine(param) {
        this.context.beginPath();
        this.context.moveTo(param.x1, param.y1);
        this.context.lineTo(param.x2, param.y2);
        this.context.lineWidth = param.lineWidth;

        if (param.strokeStyle) {
            this.context.strokeStyle = param.strokeStyle;
            this.context.stroke();
        }
    }

    add(...items) {
        for (const item of items) {
            if (!this.container.includes(item)) {
                this.container.push(item);
            }
        }
    }

    remove(...items) {
        for (const item of items) {
            if (this.container.includes(item)) {
                const index = this.container.indexOf(item);
                this.context.splice(index, 1);
            }
        }
    }
}
