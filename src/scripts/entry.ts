import * as THREE from 'three';

// camera
const camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -100000, 100000);
camera.position.set(0, 0, 1000);
camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

const scene = new THREE.Scene();

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
const canvas = document.querySelector<HTMLDivElement>("#canvas-container")!;
canvas.appendChild(renderer.domElement);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

renderer.setClearAlpha(0);

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.render(scene, camera);
}
