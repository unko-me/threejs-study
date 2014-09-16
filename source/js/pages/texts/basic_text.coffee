#= require StatsInit
#= require lib/fonts/helvetiker_regular.typeface.js
#= require oreore/ThreeWorld
#= require  ./BasicText




world = new ThreeWorld()
oreoreWorld = new BasicText(world)

oreoreWorld.setup()

control = new THREE.TrackballControls(world.camera)

# update / rendering
render = =>
  requestAnimationFrame(render)

  control.update()

  oreoreWorld.update()
  world.render()





render()