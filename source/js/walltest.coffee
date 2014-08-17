#= require StatsInit
#= require_tree ./oreore


world = new ThreeWorld()
oreoreWorld = new OreoreWorld(world)

# Light
world.setupLight()

oreoreWorld.setup()



# update / rendering
render = =>
  requestAnimationFrame(render)
  oreoreWorld.update()
  world.render()





render()