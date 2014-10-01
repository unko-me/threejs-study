#= require StatsInit
#= require oreore/ThreeWorld


class TestData
  constructor: () ->

  angle: 1
  depth: 0
  segments: 10



class DennysTest
  _MAX = 120 * 3
  _angle: 0
  _list: null
  _planes: null
  _flock: null

  constructor: (@world) ->

  setup: ->

    @_setupShader()
    @_setupGUI()
    @_setupDennys()
    @_setupGround()

    @world.scene.add(new THREE.AmbientLight(0x333333))
    @world.camera.position.x = 400
    @world.camera.position.y = 1200
    @world.camera.position.z = 700
    @world.camera.lookAt(new THREE.Vector3())


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

    @_updateParticle()

  _updateParticle: ->
    @particles.material.uniforms.time.value = (Date.now() - @_startTime)/300
#    @particles.material.uniforms.time.value = (Date.now() - @_startTime)/1000

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
    material = new THREE.MeshLambertMaterial(
      color: 0x333333
#      side: THREE.DoubleSide
#      wireframe: true
    )
    geometry = new THREE.PlaneGeometry(6000, 6000, 10, 10)
    mesh = new THREE.Mesh(geometry, material)
    @world.scene.add(mesh)

    mesh.rotation.x = -90 * Math.PI / 180

  ###*
  @see http://blog.project-nya.jp/1669
  ###
  _setupShader: ->
    @_startTime = Date.now()

    vertexShader = document.getElementById("vertexshader").textContent
    fragmentShader = document.getElementById("fragmentshader").textContent
    texture = THREE.ImageUtils.loadTexture("../../img/particle/particle.png")
    uniforms =
      time:
        type: "f"
        value: 0

      size:
        type: "f"
        value: 120

      startColor:
        type: "c"
        value: new THREE.Color(0xff0000)

      offsetColor:
        type: "c"
        value: new THREE.Color(0xffff00)

      texture:
        type: "t"
        value: texture

    attributes =
      lifetime:
        type: "f"
        value: []

      shift:
        type: "f"
        value: []

    material = new THREE.ShaderMaterial(
      vertexShader: vertexShader
      fragmentShader: fragmentShader
      uniforms: uniforms
      attributes: attributes
      blending: THREE.AdditiveBlending
      transparent: true
      depthTest: false
    )
    geometry = new THREE.Geometry()
    attributes = material.attributes
    n = 0

    while n < _MAX
      vertex = new THREE.Vector3((Math.random() - 0.5) * 1200, 500 + (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 1200)
      geometry.vertices.push vertex
      uniforms.size.value = 60 + Math.random() * 30
      uniforms.startColor.value.r = 0.8 + Math.random() * 0.24
      uniforms.startColor.value.g = 0.24 + Math.random() * 0.12
      uniforms.offsetColor.value.r = (0.8 + Math.random() * 0.24) - uniforms.startColor.value.r
      uniforms.offsetColor.value.g = (0.24 + Math.random() * 0.12) - uniforms.startColor.value.g
      attributes.lifetime.value.push 2.4
      attributes.shift.value.push Math.random() * 2.4
      n++
    particles = new THREE.PointCloud(geometry, material)
    particles.sortParticles = false
#    particles.position.y = -140
    @world.scene.add particles

    @particles = particles

    return


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
