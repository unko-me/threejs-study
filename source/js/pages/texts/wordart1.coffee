#= require StatsInit
#= require lib/fonts/helvetiker_regular.typeface.js
#= _require lib/fonts/tanuki_permanent_marker_regular.typeface.js
#= require lib/fonts/pixelmplus12_regular.typeface.js

#= require oreore/ThreeWorld
#= require  ./WordArtWorld




world = new ThreeWorld()
oreoreWorld = new WordArtWorld(world)

oreoreWorld.setup()

control = new THREE.TrackballControls(world.camera)

# update / rendering
render = =>
  requestAnimationFrame(render)

  control.update()

  oreoreWorld.update()
  world.render()





render()