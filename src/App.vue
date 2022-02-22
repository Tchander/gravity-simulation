<template>
    <div>
        <canvas class="canvas" ref="canvas"></canvas>
    </div>
</template>

<script>
import Canvas from '@/helpers/canvas';
import AstroObject from '@/helpers/astroObject';

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
                mass: 10,
                drawSpeed: false,
                drawForce: false,
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
        },

        tick() {
            requestAnimationFrame(this.tick);
            this.canvas.clear();
            this.canvas.draw('#dcc770');
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
