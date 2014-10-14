class TestData
  constructor: (args) ->

  angle: 23.5
  depth: 10



class SphereTest
  _angle: 0

  constructor: (@world) ->

  setup: ->
#    @_setupGUI()
#    @_setupAxisHelper()
    @_setupSphere()
    @_setupLines()
    @_setupParticle()

#    width = 1000
#    height = 800
#    @world.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 2000 )
#    @world.scene.add @world.camera
#    @world.camera.position.z -= 1000

    @world.camera.position.x += 100
    @world.camera.position.y += 100
#    @world.camera.lookAt(@plane.position)

  update: =>
#    @sphere.rotation.x += 0.01
    @sphere.rotation.y += 0.02
    @cylinder.rotation.y -= 0.01
    @particle.rotation.y += 0.001

  loadImage: (base64)=>
    texture = THREE.ImageUtils.loadTexture(base64)
    @material.map = texture
    @particleMaterial.map = texture

  _setupGUI: ->
    gui = new dat.GUI()
    @_data = new TestData()
    gui.add @_data, 'angle', 1, 100
    gui.add @_data, 'depth', 1, 100


  _setupSphere: ->
    texture = THREE.ImageUtils.loadTexture( "../../img/katapad/yes_02.png" )
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set( 3, 1 )

    geometry = new THREE.SphereGeometry(30, 32, 32)
    @material = new THREE.MeshPhongMaterial(
      map: texture
#      map: THREE.ImageUtils.loadTexture('../../img/katapad/yes_02.png')
#      side: THREE.BackSide
    )

    @sphere = new THREE.Mesh(geometry, @material)

    @world.scene.add @sphere

    geo2 = new THREE.CylinderGeometry( 50, 100, 10, 32, 10)
    @cylinder = new THREE.Mesh(geo2, @material)
    @world.scene.add @cylinder
    @cylinder.z -= 200


  _setupLines: ->
    geometry = new THREE.Geometry()
    geometry.vertices.push new THREE.Vector3( 0, 0, 0)
    geometry.vertices.push new THREE.Vector3(50, 50, 0)
    geometry.vertices.push new THREE.Vector3(50, 80, -100)
    line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x990000} ) )
    @world.scene.add line

  _setupParticle: ->
    g = new THREE.Geometry()
    numParticles = 3000
    for i in [0..numParticles]
      xx = Math.random() * 1000 - 500
      yy = Math.random() * 1000 - 500
      zz = Math.random() * 1000 - 500
      g.vertices.push(new THREE.Vector3(xx,yy,zz))

    @particleMaterial = new THREE.ParticleBasicMaterial( {
      map: THREE.ImageUtils.loadTexture('../../img/katapad/yes_02.png')
      size: 80
#      size: 2, color: 0xffffffff,transparent: true, depthTest: true, alpha:1
    })

    # ゴゴゴがうまくいかないな
#    @particleMaterial = new THREE.ParticleBasicMaterial( {
#      map: THREE.ImageUtils.loadTexture('../../img/particle/gogogo.png')
#      size: 80
#      transparent: true
#      depthTest: true
#    })

    @particle = new THREE.ParticleSystem(g, @particleMaterial)
##    //@particle.position = new Vector3(0, 0, 0)
    @particle.sortParticles = false
    @world.scene.add(@particle)

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
