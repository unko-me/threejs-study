#= require StatsInit
#= require core/BaseWorld
#= require lib/three/loaders/DDSLoader
#= require lib/three/loaders/MTLLoader
#= require lib/three/loaders/OBJMTLLoader
#= require lib/three/loaders/OBJLoader

class Sidonia extends BaseWorld

  __debug = true

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
    @camera.position.y = 200
    @camera.position.z = 800
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
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    @_loadModelObj('../../model/sidonia/tanikaze/KS10010101000', (obj)=>
      @tabukaze = obj
    )
#    @_loadModelObj('../../model/sidonia/izana/KS10030101000', (obj)=>
#      obj.position.x = 300
#      @izana = obj
#    )
#
#    @_loadModelObj('../../model/sidonia/hoshijiro/KS10020101000', (obj)=>
#      obj.position.x = -300
#      @hoshijiro = obj
#    )

  _loadModelObj: (path, onLoad)->
    loader = new THREE.OBJMTLLoader()
    loader.load( path + '.obj', path + '.mtl', ( object )=>
      console.log 'object:', object
      scale = 20
      object.scale.set(scale, scale, scale)
      @scene.add object
      onLoad?(object)
    )






  _amp1: 0
  _amp2: 0
  _update: ->
#    @camera.lookAt(@mizuno.position)
    if @tanikaze
      @tanikaze.rotation.x += 0.2
    if @hoshijiro
      @hoshijiro.rotation.y += 0.2

    if @izana
      @izana.rotation.z += Math.sin(@_amp1 += 0.01)
      @izana.rotation.x += Math.sin(@_amp2 += 0.02) * 0.3


if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    Sidonia
else if typeof exports is "object"
  # CommonJS
  exports.Sidonia = Sidonia
else
  # Browser global.
  window.Sidonia = Sidonia