<script setup lang="ts">
import { useRenderLoop } from "@tresjs/core";
import * as THREE from "three";
import { shallowRef, toRefs } from "vue";

const props = defineProps<{
  progress: number;
}>();

const { progress } = toRefs(props);
const planet = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshBasicMaterial({ color: 0xffff00 }),
);
planet.receiveShadow = true;
// const planet = nodes["Planet"] as TresObject3D;
const planetRef = shallowRef();
// const clouds = Object.values(nodes).filter((node) =>
//   node.name.includes("Cloud"),
// );
// const cloudsRef = shallowRef();

const { onLoop } = useRenderLoop();

onLoop(({ delta }) => {
  if (!planet) return;
  // planet.rotation.y -= delta * 0.004;
  // planet.rotation.z -= delta * 0.002;
  // planet.rotation.x -= delta * 0.005;
  planet.updateMatrixWorld();
  // :rotation="[progress * 10, 0, 0]"
  planetRef.value.rotation.x = progress.value * 10;

  /* if(cloudsRef.value) {
    cloudsRef.value.forEach((cloud: TresObject3D) => {
      cloud.rotation.x = -progress.value * 2
    })
  } */
});
</script>

<template>
  <!-- <Box :scale="0.5" :color="0xff00ff" ref="planetRef" :position="[-1, 1, 0]" /> -->

  <TresGroup :position="[-2, 2, 0]">
    <primitive ref="planetRef" :object="planet" />
    <!-- <TresGroup :rotation="[0, -progress, 0]">
      <primitive
        v-for="cloud in clouds"
        :key="cloud.id"
        ref="cloudsRef"
        :object="cloud"
      />
    </TresGroup> -->
  </TresGroup>
</template>
