class TestData
  constructor: (args) ->

  angle: 23.5
  depth: 10



class Flag1
  _SEGMENT_X = 30
  _SEGMENT_Y = 30
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


  update: =>
    @world.camera.position.x += Math.sin(@_angle) * 4
    @world.camera.position.y += Math.sin(@_angle) * 8
    @world.camera.position.z += Math.cos(@_angle) * Math.sin(@_angle)


    @_angle += @_data.angle * 0.01
    angle = Math.sin(@_angle)
    @_list.unshift angle
    if @_list.length > _SEGMENT_X
      @_list.pop()


    for vertex, i in @plane.geometry.vertices
      originVertex = @originalGeometry.vertices[i]
      a = @_list[Math.floor(i / _SEGMENT_X)]
      sin = Math.sin a
      vertex.z = originVertex.z + sin * @_data.depth

    @plane.geometry.verticesNeedUpdate = true

  _setupGUI: ->
    gui = new dat.GUI()
    @_data = new TestData()
    gui.add @_data, 'angle', 1, 100
    gui.add @_data, 'depth', 1, 100


  _setupGround: ->
    geometry = new THREE.PlaneGeometry(300, 500, _SEGMENT_X, _SEGMENT_Y)
    material = new THREE.MeshBasicMaterial(
      map: THREE.ImageUtils.loadTexture('../../img/uni/HN1A.gif')
      side: THREE.DoubleSide
    )
    plane = new THREE.Mesh(geometry, material)
#    plane.rotation.z = 180 * Math.PI / 180
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
