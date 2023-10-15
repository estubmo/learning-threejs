import * as THREE from "three";

const canvas = document.querySelector<HTMLDivElement>("#canvas-container")!;
/**
 * cursor
 */

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / window.innerWidth - 0.5;
  cursor.y = -(event.clientY / window.innerHeight - 0.5);
});

// camera
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.set(0, 0, 5);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setClearAlpha(0);

// canvas
canvas.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
const spotLight = new THREE.SpotLight("green");
const spotLight2 = new THREE.SpotLight("blue");
const spotLight3 = new THREE.SpotLight("orange");
spotLight.position.set(0, 4, 0);
spotLight2.position.set(0, 0, 4);
spotLight3.position.set(4, 0, 0);
spotLight.intensity = 10;
spotLight2.intensity = 5;
spotLight3.intensity = 5;
scene.add(spotLight);
scene.add(spotLight2);
scene.add(spotLight3);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshPhongMaterial({ color: 0xffffff }),
);

scene.add(cube1);
spotLight.lookAt(cube1.position);
spotLight2.lookAt(cube1.position);
spotLight3.lookAt(cube1.position);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.render(scene, camera);

  // Update camera
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.y = cursor.y * 10;
  camera.lookAt(cube1.position);
}
