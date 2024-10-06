import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useEffect } from "react";
import { EARTHYEAR , EARTHDAY } from './Components/ToolsBar.js';




export default function Main(){


  useEffect(()=>{








// Scene
const scene = new THREE.Scene();
// Camera
var aspect ={
  width: window.innerWidth,
  height: window.innerHeight }
const Camera = new THREE.PerspectiveCamera(75 , aspect.width / aspect.height ,1 , 2000);

const axeshelper = new THREE.AxesHelper(50);
scene.add(Camera);
Camera.position.set(-30,80,-30);
// Renderer
const canvas = document.querySelector("#draw"); //Selecting thr canvas element
const renderer = new THREE.WebGLRenderer({canvas}); //Adding the webGl renderer
renderer.setSize(aspect.width,aspect.height); // Render the size
renderer.render(scene,Camera); //render what camera see in scene


scene.background = new THREE.CubeTextureLoader()
	.load([
				require("./Assets/Image_Editor.png"),
				require("./Assets/Image_Editor.png"),
				require("./Assets/Image_Editor.png"),
        require("./Assets/Image_Editor.png"),
        require("./Assets/Image_Editor.png"),
        require("./Assets/Image_Editor.png"),
]);

// Animation
const controls = new OrbitControls( Camera, renderer.domElement );
function animate() {
  renderer.render(scene,Camera); //render what camera see in scene
  // Camera animation
	requestAnimationFrame( animate );
}
animate();






},[])
////////////////////////////////////////////////////////////

}
