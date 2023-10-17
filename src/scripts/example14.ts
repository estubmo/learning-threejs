import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

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

// load textures
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");

// camera
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
camera.position.set(0, 0, 5);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setClearAlpha(0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// canvas
canvas.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();

const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;

// text geometry
const fontLoader = new FontLoader(loadingManager);
fontLoader.load("/fonts/fira_code_light_regular.json", (font: Font) => {
  console.log("font loaded");
  const textGeometry = new TextGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  textGeometry.center();
  scene.add(new THREE.Mesh(textGeometry, textMaterial));
});

console.time("donut geometry");

// donut geometry
const donuts: Array<THREE.Mesh> = [];
for (let i = 0; i < 300; i++) {
  const donut = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 20, 45),
    new THREE.MeshMatcapMaterial({ matcap: matcapTexture }),
  );
  donut.position.x = (Math.random() - 0.5) * 20;
  donut.position.y = (Math.random() - 0.5) * 20;
  donut.position.z = (Math.random() - 0.5) * 20;

  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const scale = Math.min(Math.random() * 0.5 + 0.5, 1);
  donut.scale.set(scale, scale, scale);
  donuts.push(donut);
  scene.add(donut);
}
console.timeEnd("donut geometry");
// resize event listener
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
  for (const donut of donuts) {
    if (donut.id % 2 === 0) {
      donut.rotation.y += 0.01;
    } else {
      donut.rotation.y -= 0.01;
    }
  }
  // Update controls
  controls.update();
}
