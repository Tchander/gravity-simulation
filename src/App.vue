<template>
    <div>
        <canvas class="canvas" ref="canvas"></canvas>
    </div>
</template>

<script>
import Canvas from '@/helpers/canvas';
import AstroObject from '@/helpers/astroObject';
import Vector from '@/helpers/vector';
import { G, DISTANCE_MULTIPLY } from '@/const';

export default {
    name: 'App',
    data() {
        return {
            canvas: null,
            astroObjects: [],
            sun: {
                speedX: 0,
                speedY: 0,
                radius: 50,
                mass: 332950 / DISTANCE_MULTIPLY,
                drawSpeed: false,
                drawForce: false,
                color: '#dbc33e',
            },
            earth: {
                speedX: -0.2,
                speedY: -0.5,
                radius: 5,
                mass: 1 / DISTANCE_MULTIPLY,
                drawSpeed: false,
                drawForce: false,
                color: '#3e98d3',
            },
        };
    },

    mounted() {
        this.canvas = new Canvas(this.$refs.canvas);
        this.pushObjects();
        this.canvas.add(...this.astroObjects);
        requestAnimationFrame(this.tick);
    },

    methods: {
        pushObjects() {
            this.astroObjects.push(
                new AstroObject({
                    positionX: this.canvas.view.width / 2,
                    positionY: this.canvas.view.height / 2,
                    ...this.sun,
                }),
            );
            this.astroObjects.push(
                new AstroObject({
                    positionX: this.canvas.view.width / 2 + 250,
                    positionY: this.canvas.view.height / 2,
                    ...this.earth,
                }),
            );
        },

        tick() {
            requestAnimationFrame(this.tick);

            for (const astroObject of this.astroObjects) {
                astroObject.forces = [];
            }

            for (let i = 0; i < this.astroObjects.length - 1; i++) {
                const ctrlObject = this.astroObjects[i];

                for (let j = i + 1; j < this.astroObjects.length; j++) {
                    const currentObject = this.astroObjects[j];

                    const force = Vector.getDifference(
                        ctrlObject.position,
                        currentObject.position,
                    );

                    const forceNumber =
                        (G * ctrlObject.mass * currentObject.mass) /
                        Math.max(force.length ** 2, 0.0000001);

                    force.multiply(forceNumber);

                    ctrlObject.forces.push(force.getNegative());
                    currentObject.forces.push(force);
                }
            }

            for (const astroObject of this.astroObjects) {
                const force = astroObject.force;

                astroObject.acceleration = new Vector(
                    force.x / astroObject.mass,
                    force.y / astroObject.mass,
                );
            }

            for (const astroObject of this.astroObjects) {
                astroObject.speed.add(astroObject.acceleration);
                astroObject.position.add(astroObject.speed);
            }

            this.canvas.clear();
            this.canvas.draw();
        },
    },
};
</script>

<style>
@import 'assets/global.scss';
</style>

<style lang="scss">
.canvas {
    background-color: #000;
}
</style>
