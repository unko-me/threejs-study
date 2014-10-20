#= require StatsInit
#= require core/BaseWorld
#= require lib/three/loaders/ColladaLoader

class DaeWC extends BaseWorld

  NUM_PARTICLE = 300
  __debug = false

  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )

  _setup: ->
    @_loadModel()
    @_addLight()
    @_addParticle()
    @_addPMizuno()
    @_start()



  _addLight: ->


    @camera.position.x = -200
    @camera.position.y = 430
    @camera.position.z = -200
#    @camera.position.x = 100
    @camera.position.y = 830
    @camera.position.z = 300
    #    @renderer.shadowMapEnabled = true
#    @_directionalLight.caastShadow = true

    spotLight = new THREE.SpotLight(0xffffff, 0.5, 0, Math.PI / 6 , 10)
    @scene.add spotLight
    spotLight.position.set(-600, 800, 100)
    spotLight.castShadow = true
    spotLight.shadowMapWidth  = 150
    spotLight.shadowMapHeight = 150
    @_addLightHelper(spotLight)


    spotLight = new THREE.SpotLight(0xffffff, 0.3, 0, Math.PI / 6 , 10)
    @scene.add spotLight
    spotLight.position.set(-600, 300, -400)
    @_addLightHelper(spotLight)

    spotLight = new THREE.SpotLight(0xffffff, 0.3, 0, Math.PI / 6 , 10)
    @scene.add spotLight
    spotLight.position.set(600, 300, -400)
    @_addLightHelper(spotLight)



    @scene.add new THREE.GridHelper(1000, 100)

  _addLightHelper: (spotLight)->
    if __debug
      lightHelper = new THREE.SpotLightHelper(spotLight)
      @scene.add lightHelper

  _loadModel: ->
    loader = new THREE.ColladaLoader()
    loader.load( '../../model/dae/wc/models/wc.dae', ( collada )=>
      dae = collada.scene
      console.log 'dae:', dae

#      dae.traverse( (child) =>
##          if ( child instanceof THREE.SkinnedMesh )
##            animation = new THREE.Animation( child, child.geometry.animation )
##            animation.play()
#
##        unless child.parent
#        @scene.add child
##
##        console.log 'child:', child
#      )

      for mesh in dae.children
#        console.log 'mesh.geometry:', mesh.geometry
#        mesh.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -2, 0, 0 ) )
        mesh.position.x -= 143
        mesh.position.y -= 40



      dae.scale.x = dae.scale.y = dae.scale.z = 10
      dae.updateMatrix()
      dae.rotation.x = -90 * Math.PI / 180

#      dae.add new THREE.AxisHelper(100)

#      init()
#      animate()

      dae.position.set(0, 0, 0)
      @scene.add dae

    )

  _addParticle: ->
    @particleMaterial = new THREE.PointCloudMaterial( {
#      size: 10, color: 0xffffffff, transparent: true, depthTest: true, alpha:1
      map: THREE.ImageUtils.loadTexture('../../img/particle/drops-assets/drops.png')
      transparent: true
      blending: THREE.AdditiveBlending
#      color: 0x333399ff
      size: 20
    })
    @particleGeo = new THREE.Geometry()
    for i in [0...NUM_PARTICLE]
      point = new THREE.Vector3( 0, 100, -10)
      @particleGeo.vertices.push point


    @particle = new THREE.PointCloud(@particleGeo, @particleMaterial)
#    @particle.sortParticles = true
    @scene.add @particle



  _start: ()=>
    TweenMax.to(@camera.position, 1.0, {
      x: 100,
      y: @camera.position.y - 50,
      z: @camera.position.z - 5,
      delay: 1.6
      ease: 'easeInOutQuint'
      onComplete: =>
        @_startParticle()
        @_rotateNext()
    })

  _rotateNext: =>
    TweenMax.to(@camera.position, 1.0,
      x: -200,
      y: -10,
      z: -130,
      delay: 3.0
      ease: 'easeInOutQuint'
    )

  _startParticle: ->
    for point, i in @particleGeo.vertices
      TweenMax.to(point, 1.0, {
        y: 800,
        x: Math.random() * 100 - 50
        z: Math.random() * 100 - 50 + 200
        ease: 'easeInQuint', delay: 0.01 * i, repeat: -1})

  _addPMizuno: ->
    @_data = {x: 106, y: 542, z: 115, rotationX: -40, rotationY: 0, rotationZ: 0}

    geo = new THREE.PlaneGeometry(301, 218, 10, 10)
    material = new THREE.MeshBasicMaterial(
      map: THREE.ImageUtils.loadTexture('../../img/particle/drops-assets/mizuno.png')
      side: THREE.DoubleSide
#      transparent: true
    )
    @mizuno = new THREE.Mesh(geo, material)


    scale = 2
    @mizuno.scale.set(scale, scale, scale)

    @_updateMizunoPos()

    @scene.add @mizuno

    @control.target = @mizuno.position

    @_setupGUI()


  _updateMizunoPos: =>
    @mizuno.position.set(@_data.x, @_data.y, @_data.z)
    @mizuno.rotation.x = @_data.rotationX * Math.PI / 180
    @mizuno.rotation.y = @_data.rotationY * Math.PI / 180
    @mizuno.rotation.z = @_data.rotationZ * Math.PI / 180

  _setupGUI: ->
    gui = new dat.GUI()
    gui.add @_data, 'x', -1000, 1000
    gui.add @_data, 'y', 1, 1000
    gui.add @_data, 'z', -100, 1000
    gui.add @_data, 'rotationX', 0, 360
    gui.add @_data, 'rotationY', 0, 360
    gui.add @_data, 'rotationZ', 0, 360





  _update: ->
    @particleGeo.verticesNeedUpdate = true
    @_updateMizunoPos()
#    @camera.lookAt(@mizuno.position)


if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    DaeWC
else if typeof exports is "object"
  # CommonJS
  exports.DaeWC = DaeWC
else
  # Browser global.
  window.DaeWC = DaeWC