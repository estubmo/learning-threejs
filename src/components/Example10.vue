<script setup lang="ts">
import { OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
import { Color, Vector2 } from "three";

const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.1, 0.1) },
  uFrequency: { value: new Vector2(20, 5) },
};
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="h-96 w-full max-w-xl border">
      <TresCanvas alpha>
        <TresPerspectiveCamera :position="[11, 11, 11]" />
        <OrbitControls />
        <TresMesh ref="blobRef" :position="[0, 4, 0]">
          <TresSphereGeometry :args="[2, 32, 32]" />
          <TresShaderMaterial ref="materialRef" :uniforms="uniforms" />
        </TresMesh>
        <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
          <TresPlaneGeometry :args="[10, 10, 10, 10]" />
          <TresMeshBasicMaterial :color="new Color(0xffffff)" />
        </TresMesh>
      </TresCanvas>
    </div>
  </div>
</template>
