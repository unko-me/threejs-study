#= require StatsInit
#= require oreore/ThreeWorld
#= require ./GroundTest



world = new ThreeWorld()
oreoreWorld = new GroundTest(world)

oreoreWorld.setup()
#control = new THREE.TrackballControls(world.camera)

# update / rendering
render = =>
  requestAnimationFrame(render)

#  control.update()
  oreoreWorld.update()
  world.render()





render()