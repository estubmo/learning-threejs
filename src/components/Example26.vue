<script setup lang="ts">
import { Html, ScrollControls, useProgress } from "@tresjs/cientos";
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import { useWindowScroll, useWindowSize } from "@vueuse/core";
import { BasicShadowMap, Color, NoToneMapping, SRGBColorSpace } from "three";
import { computed, ref, watch } from "vue";

const canvasRef = ref();
const cubeRef = ref();
console.log("🚀 ~ file: Example26.vue:11 ~ cubeRef:", cubeRef);
const sphereRef = ref();
const cameraRef = ref();
const htmlRef = ref();

// helpers
function lerp(start: number, end: number, t: number) {
  return (1 - t) * start + t * end;
}

const { width, height } = useWindowSize();
const { x, y } = useWindowScroll();

const aspectRatio = computed(() => width.value / height.value);

function updateCamera() {
  cameraRef.value.position.y = lerp(2, 20, y.value / 5000);
  cameraRef.value.position.z = lerp(5, 6, y.value / 1000);
  cameraRef.value.updateProjectionMatrix();
  cameraRef.value.lookAt(cubeRef.value.position);
}

// watch(aspectRatio, updateCamera);
watch(x, () => console.log(x.value));
// watch(y, updateCamera);

const gl = {
  clearColor: "#0F4866",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

const { onLoop } = useRenderLoop();

function lookAtPosition(value: any) {
  cameraRef.value.lookAt(value);
}

onLoop(({ elapsed }) => {
  // cameraRef.value.position.x = Math.sin(elapsed);
  cubeRef.value.rotation.y += 0.01;

  // updateCamera();
});
const { progress: prog, hasFinishLoading } = await useProgress();
</script>

<template>
  <div class="w-full h-[100vh] relative scroll-smooth px-2 text-zinc-200">
    <main>
      <section class="min-h-screen container flex justify-end items-center">
        <div class="w-1/2 text-right">
          <h2 class="text-4xl text-light font-extrabold">
            <!-- I made this to learn how to mix TresJS and ThreeJS -->
          </h2>
        </div>
      </section>
      <section class="min-h-screen container flex justify-end items-center">
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">As well as composability</h2>
          <p class="font-italic">And passing functions and props</p>
        </div>
      </section>
      <section class="min-h-screen container flex justify-end items-center">
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">
            Overriding built in ScrollControls
          </h2>
          <p class="font-italic">
            And trying out the Html in a scene component
          </p>
        </div>
      </section>
      <section class="min-h-screen container flex justify-end items-center">
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">And it worked!</h2>
          <p class="font-italic">Woohoo! 🚀</p>
        </div>
      </section>
    </main>

    <TresCanvas class="h-[100vh] -z-30" v-bind="gl" ref="canvasRef" window-size>
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, 5]" />
      <TresGridHelper :size="10" :divisions="10" />
      <!-- <Suspense>
        <MySphere
          ref="sphereRef"
          :lookAtPosition="lookAtPosition"
        />
      </Suspense> -->
      <TresMesh ref="cubeRef" :position="[0, 0, 0]">
        <TresBoxGeometry />

        <TresMeshNormalMaterial />
        <Html
          transform
          :distance-factor="4"
          :position="[0, 0, 0.5001]"
          :scale="[0.75, 0.75, 0.75]"
        >
          <h1 class="bg-white dark:bg-dark text-xs p-1 rounded">
            I'm a Box 📦
          </h1>
        </Html>
      </TresMesh>
      <ScrollControls :distance="20" :smooth-scroll="0.1"> </ScrollControls>

      <TresDirectionalLight
        :intensity="3"
        :color="new Color(0xffffff)"
        :position="[1, 1, 2]"
        :cast-shadow="true"
      />
      <TresAmbientLight :intensity="1" :color="new Color(0xffffff)" />
    </TresCanvas>
  </div>
</template>
