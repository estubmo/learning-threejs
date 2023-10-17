import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector<HTMLDivElement>("#canvas-container")!;

/**
 * debug gui init
 */

const gui = new dat.GUI({
  closed: true,
  width: 400,
});

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
camera.position.set(1, 1, 2);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setClearAlpha(0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// canvas
canvas.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();

// Only three types of lights cast shadows in Three.js:
// DirectionalLight, SpotLight, and PointLight.

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
gui
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("ambientLightIntensity");
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(2, 2, -1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.radius = 10;

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2,
);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera,
);
directionalLightCameraHelper.visible = false;
scene.add(directionalLightCameraHelper);

const directionalLightFolder = gui.addFolder("DirectionalLight");
directionalLightFolder
  .add(directionalLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("directionalLightIntensity");
directionalLightFolder
  .add(directionalLight.position, "x")
  .min(-5)
  .max(5)
  .step(0.001);
directionalLightFolder
  .add(directionalLight.position, "y")
  .min(-5)
  .max(5)
  .step(0.001);
directionalLightFolder
  .add(directionalLight.position, "z")
  .min(-5)
  .max(5)
  .step(0.001);
directionalLightFolder.add(directionalLight, "castShadow");
directionalLightFolder
  .add(directionalLightHelper, "visible")
  .name("directionalLightHelper");
directionalLightFolder
  .add(directionalLightCameraHelper, "visible")
  .name("directionalLightCameraHelper");

scene.add(directionalLight);

// spot light
const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(1024, 1024);
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;
spotLight.position.set(0, 2, 2);

scene.add(spotLight);
scene.add(spotLight.target);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
spotLightHelper.visible = false;
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLightCameraHelper.visible = false;
scene.add(spotLightCameraHelper);
scene.add(spotLightHelper);

const spotLightFolder = gui.addFolder("SpotLight");
spotLightFolder
  .add(spotLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("spotLightIntensity");
spotLightFolder.add(spotLight.position, "x").min(-5).max(5).step(0.001);
spotLightFolder.add(spotLight.position, "y").min(-5).max(5).step(0.001);
spotLightFolder.add(spotLight.position, "z").min(-5).max(5).step(0.001);
spotLightFolder.add(spotLight, "castShadow");
spotLightFolder.add(spotLightHelper, "visible").name("spotLightHelper");
spotLightFolder
  .add(spotLightCameraHelper, "visible")
  .name("spotLightCameraHelper");

// point light
const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.castShadow = true;
pointLight.shadow.mapSize.set(1024, 1024);
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
pointLight.position.set(-1, 1, 0);

scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
pointLightHelper.visible = false;
scene.add(pointLightHelper);

const pointLightFolder = gui.addFolder("PointLight");
pointLightFolder
  .add(pointLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("pointLightIntensity");
pointLightFolder.add(pointLight.position, "x").min(-5).max(5).step(0.001);
pointLightFolder.add(pointLight.position, "y").min(-5).max(5).step(0.001);
pointLightFolder.add(pointLight.position, "z").min(-5).max(5).step(0.001);
pointLightFolder.add(pointLight, "castShadow");
pointLightFolder.add(pointLightHelper, "visible").name("pointLightHelper");

// material
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0xffffff);
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

// sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;

// plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true;

scene.add(sphere, plane);

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

  // Update controls
  controls.update();
}
