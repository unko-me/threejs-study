#= require_tree .
#= require com/katapad/util/CanvasDetector
#= require 'stats.js/build/stats.min.js'
#= require 'threejs/build/three.min.js'

console.info 'hello middleman-scaffold :)'

# stats
do ->
  stats = new Stats();
#  stats.setMode(1);
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'
  document.body.appendChild( stats.domElement)
  setInterval (->
    stats.begin()

    # your code goes here
    stats.end()
    return
  ), 1000 / 60




# scene camera
scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(75, 600 / 400, 1, 1000)
camera.position.set(0, 0, 70)

# render
#if (window.WebGLRenderingContext)
if (CanvasDetector.canWebGL())
  renderer = new THREE.WebGLRenderer()

else
  renderer = new THREE.CanvasRenderer()
renderer.setSize(600, 400)

document.body.appendChild(renderer.domElement)


# Light
directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(0, 7, 10)
scene.add(directionalLight)

# mesh
geometry = new THREE.CubeGeometry(10, 10, 10)
material = new THREE.MeshPhongMaterial({color: '#dd3b6f'})

cubes = []

for i in [0..100]

  cube = new THREE.Mesh(geometry, material)
  cube.position.set((i % 10) * 15 - 50, Math.floor(i / 10) * 15 - 15 * 5, 10 * 1 - 40)
  scene.add(cube)
  cubes.push cube



# update / rendering
render = =>
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  for cube in cubes

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01



render()