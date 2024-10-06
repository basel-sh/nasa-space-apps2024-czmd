import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useEffect, useState } from "react";
import { EARTHYEAR, EARTHDAY } from './Components/ToolsBar.js';
import DataFetchingComponent from './DataRendering.js';
import InformationDivBar from './Components/InformationBar.js';
import { SpeedOrbitalRot } from './Components/ToolsBar.js';

import ganymedeImage from './Assets/ganymede.jpg';
import mercuryImage from './Assets/Mercury.jpg';
import uranus from './Assets/uranus.jpg';
import encaldus from './Assets/enceladus.jpg'

export default function StarSystemRendering() {
  const [data, setData] = useState(null);
  const [plsize, setplsize] = useState(5); // Default planet size
  const [selectedPlanet, setSelectedPlanet] = useState(null); // Track the clicked planet

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  useEffect(() => {
    if (data) {
      const FinalData = JSON.stringify(data, null, 2);
      const parsedFinalData = JSON.parse(FinalData);

      const scene = new THREE.Scene();
      const aspect = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      const Camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 1, 2000);
      scene.add(Camera);
      Camera.position.set(80, 80, 80);

      const solarsystem = new THREE.Group();

      // Sun
      const sungeometry = new THREE.SphereGeometry(20, 70);
      const suntexture = new THREE.TextureLoader().load(require("./Assets/Sun.jpg"));
      const sunmaterial = new THREE.MeshBasicMaterial({ map: suntexture, side: THREE.DoubleSide });
      const sun = new THREE.Mesh(sungeometry, sunmaterial);
      sun.customInfo = {
        name: parsedFinalData.hostname,
        atmosphere: "Earth-like",
        temperature: "3000000000°C"
      };
      solarsystem.add(sun);
      scene.add(solarsystem);
      suntexture.flipY = false;

      // Lights
      const pointlight = new THREE.PointLight(0xFFFFFF, 2000, 500);
      scene.add(pointlight);
      const backgroundlight = new THREE.AmbientLight(0xFFFFFF, 0.08, 500);
      scene.add(backgroundlight);

      // Renderer
      const canvas = document.querySelector("#draw");
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(aspect.width, aspect.height);
      renderer.render(scene, Camera);

      scene.background = new THREE.CubeTextureLoader().load([
        require("./Assets/Image_Editor.png"),
        require("./Assets/Image_Editor.png"),
        require("./Assets/Image_Editor.png"),
        require("./Assets/Image_Editor.png"),
        require("./Assets/Image_Editor.png"),
        require("./Assets/Image_Editor.png"),
      ]);

      const controls = new OrbitControls(Camera, renderer.domElement);

      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      window.addEventListener('click', onMouseClick, false);

      function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, Camera);

        let intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          let object = intersects[0].object;
          if (object.customInfo) {
            setSelectedPlanet(object.customInfo); // Set the selected planet information
          }
        }
      }

      if (parsedFinalData.sy_pnum) {
        var distanceFromSun;
        const totalPlanets = parsedFinalData.sy_pnum;
        const planetsArray = [];

        for (let i = 0; i < totalPlanets; i++) {
          const planetData = parsedFinalData.planets[i];
          const Picturesforplanets = [ganymedeImage, mercuryImage,encaldus,uranus];
          const randomValue = Picturesforplanets[Math.floor(Math.random() * Picturesforplanets.length)];
          const planetgemoetry = new THREE.SphereGeometry(planetData.pl_rade * 4 , 70);
          const planettexture = new THREE.TextureLoader().load(randomValue);
          const planetmaterial = new THREE.MeshStandardMaterial({ map: planettexture, side: THREE.DoubleSide });
          const planet = new THREE.Mesh(planetgemoetry, planetmaterial);
          const planetrott = new THREE.Object3D();
          distanceFromSun = planetData.pl_orbsmax * 1500
          planet.customInfo = {
            name: planetData.pl_name,
            pl_name: planetData.pl_name,
            hostname: planetData.hostname,
            disc_year: planetData.disc_year,
            discoverymethod: planetData.discoverymethod,
            snr_value: planetData.snr_value,
            in_habitable_zone: planetData.in_habitable_zone,
            pl_orbper: planetData.pl_orbper,
            pl_orbsmax: planetData.pl_orbsmax,
            pl_rade: planetData.pl_rade,
            pl_bmasse: planetData.pl_bmasse,
            can_separate:  planetData.can_separate,
            potential_magnetic_field:  planetData.potential_magnetic_field,
            suitable_temp:   planetData.suitable_temp,
            suitable_mass:    planetData.suitable_mass,
            suitable_radius:  planetData.suitable_radius,

            
          };

          planettexture.flipY = false;
          planetrott.add(planet);
          solarsystem.add(planetrott);

          const angle = (i / totalPlanets) * Math.PI * 2;
          const x = Math.cos(angle) * distanceFromSun;
          const z = Math.sin(angle) * distanceFromSun;

          planet.position.set(x, 0, z);
          planetsArray.push({ planet, planetrott });
        }

        function animate() {
          renderer.render(scene, Camera);

          sun.rotation.y += EARTHDAY;

          planetsArray.forEach(({ planet, planetrott }) => {
            planet.rotation.y += EARTHDAY * 10;
            planetrott.rotation.y += EARTHYEAR * SpeedOrbitalRot;
          });

          requestAnimationFrame(animate);
        }

        animate();
      }
    }
  }, [data, plsize]);


  return (
    <div className='returningdiv'>
      <InformationDivBar planetInfo={selectedPlanet} />
      <canvas id="draw"></canvas>
      <DataFetchingComponent onDataFetched={handleDataFetched} />
    </div>
  );
}
