class TestData
  constructor: (args) ->

  angle: 23.5
  depth: 10



class GroundTest
  _angle: 0

  constructor: (@world) ->

  setup: ->
    @_setupGUI()
    @_setupAxisHelper()
    @_setupGround()

    @world.camera.position.x += 100
    @world.camera.position.y += 100
    @world.camera.lookAt(@plane.position)

  update: =>
#    @_angle += @_data.angle * 0.001
    for vertex, i in @plane.geometry.vertices
      originVertex = @originalGeometry.vertices[i]
      vertex.z = originVertex.y + Math.sin(@_angle += @_data.angle * 0.01) * @_data.depth
      vertex.z = originVertex.z + Math.cos(@_angle) * @_data.depth
#      angle = (@_angle * i % 30)
#      vertex.z = originVertex.z + Math.sin(angle) * @_data.depth

    @plane.geometry.verticesNeedUpdate = true

  _setupGUI: ->
    gui = new dat.GUI()
    @_data = new TestData()
    gui.add @_data, 'angle', 1, 100
    gui.add @_data, 'depth', 1, 100


  _setupGround: ->
    geometry = new THREE.PlaneGeometry(300, 300, 30, 30)
    material = new THREE.MeshBasicMaterial(color: 0x009988, wireframe: true)
#    material = new THREE.MeshPhongMaterial(color: 0x009988, side: THREE.DoubleSide)
    plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = 90 * Math.PI / 180
    @plane = plane
    @originalGeometry = geometry.clone()

    @world.scene.add plane




  _setupAxisHelper: ->
    axis = new THREE.AxisHelper(1000)
    @world.scene.add axis



if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    GroundTest
else if typeof exports is "object"
  # CommonJS
  exports.GroundTest = GroundTest
else
  # Browser global.
  window.GroundTest = GroundTest
