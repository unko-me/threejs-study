#= require StatsInit
#= require oreore/ThreeWorld



class TestData
  constructor: () ->

  angle: 23.5
  depth: 10
  segments: 10



class Flag1
  _SEGMENT_X = 30
  _SEGMENT_Y = 20
  _currentSegment: 0
  _angle: 0
  _list: null

  constructor: (@world) ->

  setup: ->
    @_list = new Array(_SEGMENT_X)
    @_setupGUI()
    @_setupAxisHelper()
    @_setupGround()

    #    @world.camera.position.x += 100
    #    @world.camera.position.y += 100
    @world.camera.position.z -= 400
    @world.camera.lookAt(@plane.position)

    @_data.segments = _SEGMENT_X + 1
    @_maxSegment = Math.max(_SEGMENT_X, _SEGMENT_Y) + 3
#    for vertex, i in @plane.geometry.vertices
#      console.log 'x:', vertex.x, 'y:', vertex.y, (i % (@_currentSegment + 1))


  update: =>
    @_angle += @_data.angle * 0.01
    angle = Math.sin(@_angle)
    # listにpush
    @_list.unshift angle
    if @_list.length > @_maxSegment
      @_list.pop()


    for vertex, i in @plane.geometry.vertices
      originVertex = @originalGeometry.vertices[i]

      a = @_list[(i % @_data.segments)]
#      a = @_list[(i % (@_currentSegment + 4))]
#      a = @_list[Math.floor(i / @_currentSegment)]
      sin = Math.sin a
      if sin
        vertex.z = originVertex.z + sin * @_data.depth
      else
        vertex.z = originVertex.z
#        console.log 'vertex.z:', vertex.z, a

    @plane.geometry.verticesNeedUpdate = true

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
    plane = new THREE.Mesh(geometry, material)
    plane.rotation.y = 180 * Math.PI / 180
    @plane = plane
    @originalGeometry = geometry.clone()

    @world.scene.add plane




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
  #control = new THREE.TrackballControls(world.camera)

  # update / rendering
  render = =>
    requestAnimationFrame(render)

    #  control.update()
    oreoreWorld.update()
    world.render()





  render()
