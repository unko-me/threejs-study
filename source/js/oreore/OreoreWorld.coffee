class OreoreWorld
  constructor: (@world) ->

  setup: ->
    # mesh
    geometry = new THREE.CubeGeometry(10, 10, 10)
    material = new THREE.MeshPhongMaterial({color: '#dd3b6f'})

    @cubes = []

    scene = @world.scene

    for i in [0..100]
      cube = new THREE.Mesh(geometry, material)
      cube.position.set((i % 10) * 15 - 50, Math.floor(i / 10) * 15 - 15 * 5, 10 * 1 - 40)
      scene.add(cube)
      @cubes.push cube


  update: =>
    for cube in @cubes
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01




if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    OreoreWorld
else if typeof exports is "object"
  # CommonJS
  exports.OreoreWorld = OreoreWorld
else
  # Browser global.
  window.OreoreWorld = OreoreWorld
