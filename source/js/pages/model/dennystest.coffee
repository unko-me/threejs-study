#= require StatsInit
#= require oreore/ThreeWorld


class TestData
  constructor: () ->

  angle: 1
  depth: 0
  segments: 10



class DennysTest
  NUM_FLAGS = 30
  _SEGMENT_X = 30
  _SEGMENT_Y = 20
  _currentSegment: 0
  _angle: 0
  _list: null
  _planes: null
  _flock: null

  constructor: (@world) ->

  setup: ->
    @_list = new Array(_SEGMENT_X + 1)


    @_setupGUI()
    @_setupDennys()
    @_setupGround()

    @world.scene.add(new THREE.AmbientLight())
    @world.camera.position.x = 400
    @world.camera.position.y = 900
    @world.camera.position.z = 800
    @world.camera.lookAt(new THREE.Vector3())


    @_data.segments = _SEGMENT_X + 1


  _ang: -0.15
  update: =>
    if @dennys

      @_ang += 0.0005
      if @_ang > 0.6
        @_ang =  0.6
      @dennys.rotation.y += @_ang
#      @dennys.rotation.y += @_data.angle * Math.PI / 180 / 5
#      if @_data.depth > 0
#        @dennys.rotation.x += @_data.depth * Math.PI / 180 / 5
#        @dennys.rotation.z += @_data.depth * Math.PI / 180 / 5

  _setupGUI: ->
    gui = new dat.GUI()
    @_data = new TestData()
    gui.add @_data, 'angle', 1, 100
    gui.add @_data, 'depth', 0, 100
#    gui.add(@_data, 'segments', 1, 100).step(1)


  _setupDennys: ->

    loader = new THREE.JSONLoader()
    loader.load( '../../model/dennys/dennys.js', ( geometry, materials ) =>

      poleHeight = 500

      faceMaterial = new THREE.MeshFaceMaterial( materials )
      dennysMesh = new THREE.Mesh( geometry, faceMaterial )
      dennysMesh.position.set( 0, poleHeight + 80,0);
      dennysMesh.scale.set( 50, 50, 50 );

      mc = new THREE.Object3D()
      mc.add dennysMesh

      material = new THREE.MeshPhongMaterial(
        color: 0xFFFFFF
#        wireframe: true
      )
      geometry = new THREE.CylinderGeometry( 20, 20, poleHeight, 10 )
      poleMesh = new THREE.Mesh(geometry, material)
      mc.add poleMesh
      poleMesh.position.y = poleHeight / 2


      @world.scene.add( mc )


      @dennys = mc
    )

  _setupGround: ->
    material = new THREE.MeshBasicMaterial(
      side: THREE.DoubleSide
      wireframe: true
    )
    geometry = new THREE.PlaneGeometry(600, 286, _SEGMENT_X, _SEGMENT_Y)
    mesh = new THREE.Mesh(geometry, material)
    @world.scene.add(mesh)

    mesh.rotation.x = 90 * Math.PI / 180




  _setupAxisHelper: ->
    axis = new THREE.AxisHelper(1000)
    @world.scene.add axis



if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    DennysTest
else if typeof exports is "object"
  # CommonJS
  exports.DennysTest = DennysTest
else
  # Browser global.
  window.DennysTest = DennysTest






do ->
  world = new ThreeWorld()
  oreoreWorld = new DennysTest(world)

  oreoreWorld.setup()
  control = new THREE.TrackballControls(world.camera)

  # update / rendering
  render = =>
    requestAnimationFrame(render)

    control.update()
    oreoreWorld.update()
    world.render()





  render()
