#= require '../../lib/boids/index.js'
#= require StatsInit
#= require oreore/ThreeWorld
#////#= require lib/fonts/helvetiker_regular.typeface.js
#= require ../basic/FlagParlinPlane



class TestData
  constructor: () ->

  angle: 30
  depth: 19
  segments: 10



class Flag1
  NUM_FLAGS = 9
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
    @_setupGround()

    @world.camera.position.z += 200
    @world.camera.lookAt(new THREE.Vector3())


    @_data.segments = _SEGMENT_X + 1


  update: =>
#    for plane in @_planes
#      plane.updateYurayura(@_data.angle * 0.001, @_data.depth)
    @_planes[0].updateYurayura(@_data.angle * 0.001, @_data.depth)



  _setupGUI: ->
    gui = new dat.GUI()
    @_data = new TestData()
    gui.add @_data, 'angle', 1, 100
    gui.add @_data, 'depth', 1, 100
#    gui.add(@_data, 'segments', 1, 100).step(1)


  _setupGround: ->

    text3d = new THREE.TextGeometry('UNKO',
      size: 80
      height: 0
      curveSegments: 2
      font: "helvetiker"
    )

    fontMat = new THREE.MeshBasicMaterial(
      wireframe: true
    )
    textMesh = new THREE.Mesh(text3d, fontMat)
    @world.scene.add textMesh
    text3d.computeBoundingBox()
    centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x)
    textMesh.position.x = centerOffset



    scale = 0.03
    geometry = new THREE.PlaneGeometry(600 * scale, 286 * scale, _SEGMENT_X, _SEGMENT_Y)
    material = new THREE.MeshBasicMaterial(
      map: THREE.ImageUtils.loadTexture('../../img/yozawa/1000000.jpg')
      side: THREE.DoubleSide
    )

    @_planes = []
    for i in [0...NUM_FLAGS]
      vertex = text3d.vertices[i]

#      geometry = new THREE.PlaneGeometry(600 * 0.03, 286 * 0.03, _SEGMENT_X, _SEGMENT_Y)
      plane = new FlagParlinPlane(geometry, material)
#      plane.position.z = i * 10
      @_planes.push plane
      @world.scene.add plane
#      @world.scene.add( new THREE.FaceNormalsHelper( plane, 100 ) );
#      @world.scene.add( new THREE.VertexNormalsHelper( plane, 100 ) );

      if vertex
        plane.position.x = vertex.x + centerOffset
        plane.position.y = vertex.y



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
