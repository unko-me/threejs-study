#= require StatsInit
#= require_tree ./oreore


world = new ThreeWorld()
oreoreWorld = new OreoreWorld(world)

oreoreWorld.setup()

control = new THREE.TrackballControls(world.camera)

# update / rendering
render = =>
  requestAnimationFrame(render)

  control.update()

  oreoreWorld.update()
  world.render()





render()