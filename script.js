// ===== Scene Setup =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls for interaction
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// ===== Sun =====
const sunGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// ===== Asteroid =====
const asteroidGeometry = new THREE.SphereGeometry(0.03, 16, 16);
const asteroidMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
scene.add(asteroid);

// ===== Orbital Parameters (Scaled) =====
const scale = 5; // arbitrary scale for display
const a = 1.365 / scale;       // semi-major axis
const e = 0.7763;              // eccentricity
const i = 11.778 * Math.PI/180; // inclination
const omega = 59.28 * Math.PI/180; // argument of perihelion
const Omega = 317.20 * Math.PI/180; // longitude of ascending node

// ===== Orbit Path =====
const orbitPoints = [];
const numPoints = 300;
for(let t=0; t<numPoints; t++){
    const theta = 2*Math.PI*t/numPoints;
    const r = a*(1-e*e)/(1+e*Math.cos(theta));
    const x = r*(Math.cos(Omega)*Math.cos(omega+theta) - Math.sin(Omega)*Math.sin(omega+theta)*Math.cos(i));
    const y = r*(Math.sin(Omega)*Math.cos(omega+theta) + Math.cos(Omega)*Math.sin(omega+theta)*Math.cos(i));
    const z = r*(Math.sin(omega+theta)*Math.sin(i));
    orbitPoints.push(new THREE.Vector3(x, y, z));
}
const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
const orbitLine = new THREE.LineLoop(orbitGeometry, new THREE.LineBasicMaterial({color:0x00ff00}));
scene.add(orbitLine);

// ===== Predicted Trajectory (dashed) =====
const futurePoints = [];
const futureSteps = 100;
for(let t=0; t<futureSteps; t++){
    const theta = 2*Math.PI*t/futureSteps;
    const r = a*(1-e*e)/(1+e*Math.cos(theta));
    const x = r*(Math.cos(Omega)*Math.cos(omega+theta) - Math.sin(Omega)*Math.sin(omega+theta)*Math.cos(i));
    const y = r*(Math.sin(Omega)*Math.cos(omega+theta) + Math.cos(Omega)*Math.sin(omega+theta)*Math.cos(i));
    const z = r*(Math.sin(omega+theta)*Math.sin(i));
    futurePoints.push(new THREE.Vector3(x, y, z));
}
const futureGeometry = new THREE.BufferGeometry().setFromPoints(futurePoints);
const futureLine = new THREE.Line(futureGeometry, new THREE.LineDashedMaterial({
    color:0xff00ff,
    dashSize:0.05,
    gapSize:0.05
}));
futureLine.computeLineDistances();
scene.add(futureLine);

// ===== Camera =====
camera.position.set(2,2,2);
camera.lookAt(0,0,0);

// ===== Animation =====
let angle = 0;
function animate(){
    requestAnimationFrame(animate);

    // Move asteroid along orbit
    const r = a*(1-e*e)/(1+e*Math.cos(angle));
    asteroid.position.set(
        r*(Math.cos(Omega)*Math.cos(omega+angle) - Math.sin(Omega)*Math.sin(omega+angle)*Math.cos(i)),
        r*(Math.sin(Omega)*Math.cos(omega+angle) + Math.cos(Omega)*Math.sin(omega+angle)*Math.cos(i)),
        r*(Math.sin(omega+angle)*Math.sin(i))
    );

    angle += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

// ===== Resize =====
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
