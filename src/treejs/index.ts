import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import json from "./sceneTemplate.json"


/*var scene = new THREE.Scene();*/
const scene2 = new THREE.ObjectLoader().parse(json.scene);
/*
console.log(scene)
*/

/*
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
*/
const camera2 = new THREE.ObjectLoader().parse<THREE.PerspectiveCamera>(json.camera);
camera2.aspect = window.innerWidth / window.innerHeight;
camera2.updateProjectionMatrix();/*
camera.position.y = 10;
camera.lookAt(scene.position);*/

const directionalLight = new THREE.DirectionalLight(0x00eedd);
directionalLight.position.set(1, 0, 1).normalize();
/*
scene.add(directionalLight);
*/



const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene2.add(ambientLight);

/*
const pointLight = new THREE.PointLight(0x000000, 0.6);
*/
/*
camera.add(pointLight);
*/

// model
let mesh: any = null;

const mtlLoader = new MTLLoader();
mtlLoader.setPath("http://localhost:3000/models/");
/*mtlLoader.load('untitled.mtl', function (materials) {

    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath("http://localhost:3000/models/");
    objLoader.load('untitled.obj', function (object) {
        mesh = object;
        mesh.position.y = -2;
        mesh.rotation.x = 0.5;
        scene.add(mesh);
    });

});*/

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);/*
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();*/
//renderer.domElement.addEventListener('click', onClick, false);
//renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xccccff);
var dom = document.createElement('div');
dom.appendChild(renderer.domElement);
document.body.appendChild(dom);

var project = json.project;

if ( project.vr !== undefined ) renderer.xr.enabled = project.vr;
if ( project.shadows !== undefined ) renderer.shadowMap.enabled = project.shadows;
if ( project.shadowType !== undefined ) renderer.shadowMap.type = project.shadowType;
if ( project.toneMapping !== undefined ) renderer.toneMapping = project.toneMapping;
if ( project.toneMappingExposure !== undefined ) renderer.toneMappingExposure = project.toneMappingExposure;
if ( project.physicallyCorrectLights !== undefined ) renderer.physicallyCorrectLights = project.physicallyCorrectLights;
renderer.outputEncoding = THREE.sRGBEncoding;

animate();
var counting = 0
var dist = true;

function animate() {

    requestAnimationFrame(animate);

    if (mesh !== null) {
        //mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
    }
    if(dist){
        camera2.position.x += 0.01
        camera2.position.y += 0.01
        camera2.rotateX(-0.001)
        counting++
        if(counting===100)dist = !dist
    } else {
        camera2.position.x -= 0.01
        camera2.position.y -= 0.01
        camera2.rotateX(0.001)
        counting--
        if(counting===0)dist = !dist
    }
    renderer.render(scene2, camera2);

}


/*let INTERSECTED: any;*/
/*
function onClick(event: { preventDefault: () => void; clientX: number; clientY: number; }) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects);
    if (intersects.length > 0) {
        console.log('Intersection:', intersects[0]);
        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();

            INTERSECTED.material.emissive.setHex(0xff0000);

        }

    } else {

        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;

    }
}*/
