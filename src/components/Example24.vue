<script setup lang="ts">
import { ScrollControls, Sky, useProgress } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
import { BasicShadowMap, Color, NoToneMapping, SRGBColorSpace } from "three";
import { ref } from "vue";
import Cloud from "./Cloud.vue";
import Mars from "./Mars.vue";
import Moon from "./Moon.vue";

const scRef = ref();
const cameraRef = ref();
const progress = ref(0);

const gl = {
  clearColor: "#0F4866",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

const { progress: prog, hasFinishLoading } = await useProgress();
</script>

<template>
  <div class="w-full h-[100vh] relative scroll-smooth px-2 text-zinc-200">
    <main>
      <section class="min-h-screen container flex justify-end items-center">
        <div class="w-1/2 text-right">
          <h2 class="text-4xl text-light font-extrabold">
            Hi! 👋 I'm <span class="text-primary">Eirik Mo</span>
          </h2>
        </div>
      </section>
      <section class="min-h-screen container flex justify-end items-center">
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">
            I'm trying out <span class="text-primary">TresJS</span>
          </h2>
          <p class="font-italic">A cool 3D solution for Vue</p>
        </div>
      </section>
      <section class="min-h-screen container flex justify-end items-center">
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">This has been fun!</h2>
          <p class="font-italic">Take it to the 🌕 🚀</p>
        </div>
      </section>
    </main>
    <Transition
      name="fade-overlay"
      enter-active-class="opacity-1 transition-opacity duration-200"
      leave-active-class="opacity-0 transition-opacity duration-200"
    >
      <div
        v-show="!hasFinishLoading"
        class="fixed bg-amber-800 text-white top-0 left-0 w-full h-full z-80 flex justify-center items-center font-mono"
      >
        {{ prog }}
      </div>
    </Transition>

    <TresCanvas class="h-[100vh]" v-bind="gl" window-size>
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, 5]" />
      <Sky :elevation="-progress * 2" :distance="50000" :azimuth="180" />
      <Suspense>
        <Mars :progress="progress" />
      </Suspense>
      <ScrollControls
        ref="scRef"
        v-model="progress"
        :distance="10"
        :smooth-scroll="0.2"
        html-scroll
      >
        <Suspense>
          <Cloud :progress="progress" />
        </Suspense>
        <Suspense>
          <Moon :progress="progress" />
        </Suspense>
      </ScrollControls>
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
