import gsap from "gsap";
import * as THREE from "three";

const canvas = document.querySelector<HTMLDivElement>("#canvas-container")!;
const playAgainButton = document.getElementById("play-animation-button")!;

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
);
camera.position.set(0, 1, 4);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setClearAlpha(0);

// canvas
canvas.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
const spotLight = new THREE.SpotLight("skyblue");
spotLight.position.set(0, 4, 0);
spotLight.intensity = 5;
scene.add(spotLight);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshPhongMaterial({ color: 0xffffff }),
);

spotLight.lookAt(cube1.position);
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 2, 1),
  new THREE.MeshPhongMaterial({ color: "grey" }),
);
const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 2, 1),
  new THREE.MeshPhongMaterial({ color: "grey" }),
);
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(5, 0.1, 1),
  new THREE.MeshPhongMaterial({ color: "grey" }),
);

scene.add(cube1);
scene.add(leftWall);
scene.add(rightWall);
scene.add(floor);

leftWall.position.x = -2.55;
leftWall.position.y = 0.4;
rightWall.position.x = 2.55;
rightWall.position.y = 0.4;
floor.position.y = -0.55;

function animation() {
  gsap.to(cube1.position, {
    x: 2,
    duration: 1,
    delay: 1,
    ease: "bounce",
  });

  gsap.to(cube1.position, {
    x: -2,
    duration: 2,
    delay: 2,
    ease: "bounce",
  });

  gsap.to(cube1.position, {
    x: 0,
    duration: 1,
    delay: 4,
    ease: "circ",
  });
}

animation();

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.render(scene, camera);
}

playAgainButton.onclick = function PlayAnimation() {
  if (cube1.position.x !== 0) return;
  else animation();
};
