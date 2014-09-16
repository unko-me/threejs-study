#= require StatsInit
#= require oreore/ThreeWorld
#= require ./Flag1



world = new ThreeWorld()
oreoreWorld = new Flag1(world)

oreoreWorld.setup()
#control = new THREE.TrackballControls(world.camera)

# update / rendering
render = =>
  requestAnimationFrame(render)

  #  control.update()
  oreoreWorld.update()
  world.render()





render()