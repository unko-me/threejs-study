#= require '../../lib/boids/index.js'
#= require StatsInit
#= require oreore/ThreeWorld
#= require ../basic/FlagParlinPlane

###
Boidのテスト1
  hughsk/boids
https://github.com/hughsk/boids



###

class TestData
  constructor: () ->

  angle: 30
  depth: 19
  segments: 10



class Flag1
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
    @_setupGround()
    @_setupFlock()

    @world.camera.position.z -= 1000
    @world.camera.lookAt(new THREE.Vector3())


    @_data.segments = _SEGMENT_X + 1


  update: =>
    for plane in @_planes
      plane.updateYurayura(@_data.angle * 0.001, @_data.depth)


    @_flock.tick()
    for boid, i in @_flock.boids
#      if i < 2
#        console.log 'boid:', boid
      plane = @_planes[i]
      plane.position.x = boid[0]
      plane.position.y = boid[1]

  _setupGUI: ->
    gui = new dat.GUI()
    @_data = new TestData()
    gui.add @_data, 'angle', 1, 100
    gui.add @_data, 'depth', 1, 100
#    gui.add(@_data, 'segments', 1, 100).step(1)


  _setupGround: ->
#    geometry = new THREE.PlaneGeometry(600, 286, _SEGMENT_X, _SEGMENT_Y)
    material = new THREE.MeshBasicMaterial(
      map: THREE.ImageUtils.loadTexture('../../img/yozawa/1000000.jpg')
      side: THREE.DoubleSide
    )

    @_planes = []
    for i in [0...NUM_FLAGS]
      geometry = new THREE.PlaneGeometry(600 * 0.5, 286 * 0.5, _SEGMENT_X, _SEGMENT_Y)
      plane = new FlagParlinPlane(geometry, material)
      plane.position.z = i * 10
      @_planes.push plane
      @world.scene.add plane




  _setupFlock: =>
    @_flock = Boids({
      boids: NUM_FLAGS,              # The amount of boids to use
      speedLimit: 0,          # Max steps to take per tick
      accelerationLimit: .15,   # Max acceleration per tick
      separationDistance: 0.01, # Radius at which boids avoid others
      alignmentDistance: 10, # Radius at which boids align with others
      choesionDistance: 180,  # Radius at which boids approach others
      separationForce: 0.15,  # Speed to avoid at
      alignmentForce: 0.75,   # Speed to align with other boids
      choesionForce: 0.7,     # Speed to move towards other boids
      attractors: []
    })
#    @_flock = Boids({
#      boids: NUM_FLAGS,              # The amount of boids to use
#      speedLimit: 0,          # Max steps to take per tick
#      accelerationLimit: 1,   # Max acceleration per tick
#      separationDistance: 60, # Radius at which boids avoid others
#      alignmentDistance: 180, # Radius at which boids align with others
#      choesionDistance: 180,  # Radius at which boids approach others
#      separationForce: 0.15,  # Speed to avoid at
#      alignmentForce: 0.25,   # Speed to align with other boids
#      choesionForce: 0.1,     # Speed to move towards other boids
#      attractors: []
#    })

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
