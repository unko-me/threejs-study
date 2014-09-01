#= require StatsInit
#= require oreore/ThreeWorld
#= require ./SphereTest



world = new ThreeWorld()
oreoreWorld = new SphereTest(world)

oreoreWorld.setup()
control = new THREE.TrackballControls(world.camera)

# update / rendering
render = =>
  requestAnimationFrame(render)

  control.update()
  oreoreWorld.update()
  world.render()





render()