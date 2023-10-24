<script setup lang="ts">
import { useRenderLoop, useTresContext } from "@tresjs/core";
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three";

const { lookAtPosition } = defineProps(["lookAtPosition"]);

const context = useTresContext();
const sphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshBasicMaterial({ color: 0xff0000 }),
);
context.scene.value.add(sphere);

const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  sphere.position.x = Math.cos(elapsed * 0.5);
  lookAtPosition(sphere.position);
});
</script>
