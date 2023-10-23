<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useRenderLoop } from "@tresjs/core";
import { ref, shallowRef, toRefs } from "vue";

const props = defineProps<{
  progress: number;
}>();

const { progress } = toRefs(props);
const path = "/models/moon.glb";

const { scene } = await useGLTF(path, { draco: true });
scene.scale.set(0.1, 0.1, 0.1);
function normalize(val: number, min: number, max: number) {
  if (min < 0) {
    max += 0 - min;
    val += 0 - min;
    min = 0;
  }
  val = val - min;
  max = max - min;
  return Math.max(0, Math.min(1, val / max));
}

function lerp(start: number, end: number, t: number) {
  return (1 - t) * start + t * end;
}
const parentRef = ref();
const modelRef = shallowRef();

const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  if (!scene) return;
  scene.rotation.x = Math.sin(elapsed) * 0.02 - 89.5;
  scene.rotation.y = Math.sin(elapsed * 1.5) * 0.03 - 0.03;
  scene.position.y = Math.sin(elapsed) * 0.02 - 0.4;

  const normalizedWindowWidth = normalize(window.innerWidth, 0, 1920);
  const parentScale = Math.min(Math.max(normalizedWindowWidth, 0.6), 0.9);
  parentRef.value.scale.set(parentScale, parentScale, parentScale);
  if (progress.value > 0.65) {
    const t = normalize(progress.value, 0.7, 1);
    parentRef.value.position.z = lerp(-5, 0, t);
    parentRef.value.position.x = lerp(10, 1, t);
  } else {
    parentRef.value.position.x = 10;
  }
});
</script>

<template>
  <TresGroup ref="parentRef" :position="[0, 0.25, 0]">
    <primitive ref="modelRef" :object="scene" />
  </TresGroup>
</template>
