// import './style.css';
import * as THREE from "three";
import { OrbitControls } from '/src/node_modules/three/examples/jsm/controls/OrbitControls.js';
// import { Loader } from '/src/node_modules/three';
import { GLTFLoader } from '/src/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// LIGHT MOUSE Define the standard global variables
var container,
  // scene,
  // camera,
  // renderer,
  plane,
  mouseMesh,
  light;

// Custom global variables
var mouse = {
  x: 0,
  y: 0
};

// Setup

const scene = new THREE.Scene();

const near = 6; const far = 14;
scene.fog = new THREE.Fog(0xb90f0f, near, far); // fog settings

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), alpha: true, antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(3);
camera.position.setY(6);
camera.position.setZ(1);

if (window.innerWidth < 768) {
  camera.position.setX(3);
  camera.position.setY(1.0);
  console.log('your screensize is smaller than 768px');
}

console.log('Rendering for screen size:', window.innerWidth, window.innerHeight, 'and camera position', camera.position);

renderer.render(scene, camera);

// file loader setup
const loader = new GLTFLoader();

// // textures, diffuse map, roughness map
const headstexture = new THREE.TextureLoader().load('src/media/bluemarble.jpg');

const headsmaterial = new THREE.MeshStandardMaterial(
  {
    // map: headstexture,
    color: 0x510061,
    // roughness: 0.1,
    // metalness: 0.7,
    // diffuse: 0,
    // map: headstexture,
    // normalMap: normalTexture,
  });

// load gltf model with textures and add it to the scene
loader.load('src/media/hugo.glb', (gltf) => {
  const hugo = gltf.scene.children[0];
  hugo.material = headsmaterial;
  hugo.map = headstexture;

  hugo.name = 'hugo';
  hugo.scale.set(16, 16, 16);


  hugo.position.setX(0);
  hugo.position.setY(0);
  hugo.position.setZ(-9);
  hugo.rotation.x = -Math.PI / 2;
  hugo.rotation.z = Math.PI;

  if (window.innerWidth < 768) {
    hugo.position.setX(-1.0);
    hugo.position.setY(-1.0);
  }

  console.log('hugo', hugo);
  scene.add(hugo);
});


loader.load('src/media/konrad.glb', (gltf) => {
  const konrad = gltf.scene.children[0];
  konrad.material = headsmaterial;
  konrad.map = headstexture;

  konrad.name = 'konrad';
  konrad.scale.set(13, 13, 13);
  konrad.position.setX(10);
  konrad.position.setY(0);
  konrad.position.setZ(-8);

  if (window.innerWidth < 768) {
    konrad.position.setX(7);
    konrad.position.setY(-3);

  }

  console.log('konrad', konrad);
  scene.add(konrad);
});


// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 8, -7);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Background
// const spaceTexture = new THREE.TextureLoader().load('src/media/space.jpg');
scene.background = null; // must be null for vantajs to work


function animate() {
  requestAnimationFrame(animate);

  // hugo.rotation.x += 0.01;
  const hugo = scene.getObjectByName('hugo');
  // if hugo is not undefined, rotate it
  if (hugo) {
    // hugo.rotation.x += 0.001;
    // hugo.rotation.y += 0.005;
    hugo.rotation.z -= 0.001;
  }

  const konrad = scene.getObjectByName('konrad');
  // if hugo is not undefined, rotate it
  if (konrad) {
    // hugo.rotation.x += 0.001;
    konrad.rotation.y += 0.001;
    // konrad.rotation.z += 0.005;
  }

  // controls.update();

  renderer.render(scene, camera);
}

animate();



// function mouselight() {

// }

// mouselight();





// general helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(100, 0);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(lightHelper, gridHelper, axesHelper)







// // add controls to the scene

// const controls = new OrbitControls(camera, renderer.domElement);

// controls.addEventListener('change', renderer); // use if there is no animation loop
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;
// // controls.update();


// controls.minDistance = 2;
// controls.maxDistance = 10;
// controls.target.set(0, 0, - 0.2);
// controls.update();