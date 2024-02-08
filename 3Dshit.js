

var container;
var camera, controls, scene, renderer;
var sphere, plane;
var start = Date.now();
init();
animate();

//const loader = new GLTFLoader();




function init() {

    var loader = new THREE.GLTFLoader();

    // print threejs version and gltfloader version
    console.log(THREE.REVISION);
    console.log(loader.REVISION);

    var width = window.innerWidth || 2;
    var height = window.innerHeight || 2;
    container = document.createElement('span');
    // set container to be absolute position top left
    container.style.color = '#fff';
    container.style.position = 'absolute';
    container.style.top = 0;
    container.style.left = 0;
    // put in the back
    container.style.zIndex = -1;
    // set width 200px

    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 500;
    //controls = new THREE.TrackballControls(camera);
    scene = new THREE.Scene();
    var light = new THREE.PointLight(0xffffff);
    light.position.set(500, 500, 500);
    scene.add(light);
    var light = new THREE.PointLight(0xffffff, 0.25);
    light.position.set(-500, -500, -500);
    scene.add(light);
    sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 20, 10), new THREE.MeshLambertMaterial());
    scene.add(sphere);


    // loader.load('./hugo.glb', (gltf) => {
    //     const hugo = gltf.scene.children[0];
    //     hugo.material = headsmaterial;
    //     hugo.map = headstexture;

    //     hugo.name = 'hugo';
    //     hugo.scale.set(16, 16, 16);


    //     hugo.position.setX(0);
    //     hugo.position.setY(0);
    //     hugo.position.setZ(-9);
    //     hugo.rotation.x = -Math.PI / 2;
    //     hugo.rotation.z = Math.PI;

    //     if (window.innerWidth < 768) {
    //         hugo.position.setX(-1.0);
    //         hugo.position.setY(-1.0);
    //     }

    //     console.log('hugo', hugo);
    //     scene.add(hugo);
    // });


    // Plane
    //plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(400, 400), new THREE.MeshBasicMaterial({
    //    color: 0xe0e0e0
    //}));
    //plane.position.y = -200;
    //plane.rotation.x = -Math.PI / 2;
    //scene.add(plane);
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(width, height);
    // container.appendChild( renderer.domElement );
    effect = new THREE.AsciiEffect(renderer);
    effect.setSize(width, height);
    container.appendChild(effect.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
}
//
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var timer = Date.now() - start;
    sphere.position.y = Math.abs(Math.sin(timer * 0.001)) * 250;
    //sphere.rotation.x = timer * 0.0008;
    sphere.rotation.z = timer * 0.0003;
    sphere.rotation.y = timer * 0.0005;
    // move sphere left and right
    sphere.position.x = Math.sin(timer * 0.0005) * 450;
    //controls.update();
    effect.render(scene, camera);
}

