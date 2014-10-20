#= require StatsInit
#= require core/BaseWorld
#= require lib/three/loaders/ColladaLoader

class DaeWC extends BaseWorld
  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )

  _setup: ->
    @_loadModel()
    @_addLight()

  _addLight: ->
    @camera.position.x = 0
    @camera.position.y -=400
#    @renderer.shadowMapEnabled = true
#    @_directionalLight.caastShadow = true

    spotLight = new THREE.SpotLight(0xffffff, 0.5, 0, Math.PI / 6 , 10)
    @scene.add spotLight
    spotLight.position.set(-600, 800, 100)
    spotLight.castShadow = true
    spotLight.shadowMapWidth  = 150
    spotLight.shadowMapHeight = 150
    lightHelper = new THREE.SpotLightHelper(spotLight)
    @scene.add lightHelper


    spotLight = new THREE.SpotLight(0xffffff, 0.3, 0, Math.PI / 6 , 10)
    @scene.add spotLight
    spotLight.position.set(-600, 300, -400)
    lightHelper = new THREE.SpotLightHelper(spotLight)
    @scene.add lightHelper

    spotLight = new THREE.SpotLight(0xffffff, 0.3, 0, Math.PI / 6 , 10)
    @scene.add spotLight
    spotLight.position.set(600, 300, -400)
    lightHelper = new THREE.SpotLightHelper(spotLight)
    @scene.add lightHelper



    @scene.add new THREE.GridHelper(1000, 100)

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

      dae.add new THREE.AxisHelper(100)

#      init()
#      animate()

      dae.position.set(0, 0, 0)
      @scene.add dae



    )



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