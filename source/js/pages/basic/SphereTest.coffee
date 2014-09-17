class TestData
  constructor: (args) ->

  angle: 23.5
  depth: 10



class SphereTest
  _angle: 0

  constructor: (@world) ->

  setup: ->
    @_setupGUI()
#    @_setupAxisHelper()
    @_setupSphere()
    @_setupLines()

    @world.camera.position.x += 100
    @world.camera.position.y += 100
#    @world.camera.lookAt(@plane.position)

  update: =>
#    @sphere.rotation.x += 0.01
    @sphere.rotation.y += 0.02

  _setupGUI: ->
    gui = new dat.GUI()
    @_data = new TestData()
    gui.add @_data, 'angle', 1, 100
    gui.add @_data, 'depth', 1, 100


  _setupSphere: ->
    texture = THREE.ImageUtils.loadTexture( "../../img/katapad/yes_02.png" )
#    texture.wrapS = THREE.RepeatWrapping
#    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set( 2, 1 )

    geometry = new THREE.SphereGeometry(30, 32, 32)
    material = new THREE.MeshPhongMaterial(
      map: texture
#      map: THREE.ImageUtils.loadTexture('../../img/katapad/yes_02.png')
      side: THREE.BackSide
    )



    @sphere = new THREE.Mesh(geometry, material)
    @world.scene.add @sphere

  _setupLines: ->
    geometry = new THREE.Geometry()
    geometry.vertices.push new THREE.Vector3( 0, 0, 0)
    geometry.vertices.push new THREE.Vector3(50, 50, 0)
    geometry.vertices.push new THREE.Vector3(50, 80, -100)
    line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x990000} ) )
    @world.scene.add line


  _setupAxisHelper: ->
    axis = new THREE.AxisHelper(1000)
    @world.scene.add axis



if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    SphereTest
else if typeof exports is "object"
  # CommonJS
  exports.SphereTest = SphereTest
else
  # Browser global.
  window.SphereTest = SphereTest
