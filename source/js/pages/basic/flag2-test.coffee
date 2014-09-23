#= require StatsInit
#= require oreore/ThreeWorld
#= require ./FlagPlane



class TestData
  constructor: () ->

  angle: 30
  depth: 19
  segments: 10



class Flag1
  _SEGMENT_X = 30
  _SEGMENT_Y = 20
  _currentSegment: 0
  _angle: 0
  _list: null
  _planes: null

  constructor: (@world) ->

  setup: ->
    @_list = new Array(_SEGMENT_X + 1)
    @_setupGUI()
#    @_setupAxisHelper()
    @_setupGround()

    @world.camera.position.y += 100
    @world.camera.position.z -= 900
#    @world.camera.lookAt(@plane.position)
    @world.camera.lookAt(new THREE.Vector3())


    @_data.segments = _SEGMENT_X + 1


  update: =>
    for plane in @_planes
      plane.updateYurayura(@_data.angle * 0.01, @_data.depth)


  _setupGUI: ->
    gui = new dat.GUI()
    @_data = new TestData()
    gui.add @_data, 'angle', 1, 100
    gui.add @_data, 'depth', 1, 100
#    gui.add(@_data, 'segments', 1, 100).step(1)


  _setupGround: ->
    geometry = new THREE.PlaneGeometry(600, 286, _SEGMENT_X, _SEGMENT_Y)
    material = new THREE.MeshBasicMaterial(
      map: THREE.ImageUtils.loadTexture('../../img/yozawa/1000000.jpg')
      side: THREE.DoubleSide
    )

    @_planes = []
    for i in [0...100]
      plane = new FlagPlane(geometry, material)
      @_planes.push plane
      @world.scene.add plane
      plane.position.x = 5 * i
      plane.position.y = 5 * i
      plane.position.z = 8 * i
      plane.rotation.z += i * 3.5 * Math.PI / 180
#      plane.rotation.x += i * 2.5 * Math.PI / 180
#      plane.rotation.y += i * Math.PI / 180




  _setupAxisHelper: ->
    axis = new THREE.AxisHelper(1000)
    @world.scene.add axis



if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    Flag1
else if typeof exports is "object"
  # CommonJS
  exports.Flag1 = Flag1
else
  # Browser global.
  window.Flag1 = Flag1






do ->
  world = new ThreeWorld()
  oreoreWorld = new Flag1(world)

  oreoreWorld.setup()
  control = new THREE.TrackballControls(world.camera)

  # update / rendering
  render = =>
    requestAnimationFrame(render)

    control.update()
    oreoreWorld.update()
    world.render()





  render()
