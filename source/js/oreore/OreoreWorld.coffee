class OreoreWorld


  constructor: (@world) ->

  setup: ->

    @_setupSkybox()
    @_setupCubes()

  update: =>
    @_updateCubes()









  _setupSkybox: ->
    urls = ['HN1A.gif', 'HNC1B.gif', 'aiko7N.gif', 'chiyoko1N.gif', 'kumikoN1A.gif', 'kumikoN1AA.gif']

    materials = []
    for url in urls
      materials.push new THREE.MeshBasicMaterial(
        map: THREE.ImageUtils.loadTexture('/img/uni/' + url)
        side: THREE.BackSide
      )
    skyBox = new THREE.Mesh(new THREE.BoxGeometry(500, 500, 500), new THREE.MeshFaceMaterial(materials))
    @world.scene.add skyBox




  _setupCubes: ->
    geometry = new THREE.BoxGeometry(10, 10, 10)
    @originalBox = geometry.clone()
    material = new THREE.MeshPhongMaterial({color: '#dd3b6f'})
    scene = @world.scene

    @cubes = []

    for i in [0...100]
      cube = new THREE.Mesh(geometry, material)
      cube.position.set((i % 10) * 15 - 50, Math.floor(i / 10) * 15 - 15 * 5, 10 * 1 - 40)
      scene.add(cube)
      @cubes.push cube

  _updateCubes: ->
    for cube in @cubes
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

    cube = @cubes[0]
    for vertex, i in cube.geometry.vertices
      originVertex = @originalBox.vertices[i]

      vertex.x += (originVertex.x - (vertex.x + (Math.random() * 4 - 2))) * 0.7
      vertex.y += (originVertex.y - (vertex.y + (Math.random() * 4 - 2))) * 0.7
      vertex.z += (originVertex.z - (vertex.z + (Math.random() * 4 - 2))) * 0.7
    cube.geometry.verticesNeedUpdate = true



    return




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
