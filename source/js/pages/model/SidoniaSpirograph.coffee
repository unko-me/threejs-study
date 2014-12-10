#= require StatsInit
#= require core/BaseWorld
#= require lib/three/loaders/DDSLoader
#= require lib/three/loaders/MTLLoader
#= require lib/three/loaders/OBJMTLLoader
#= require lib/three/loaders/OBJLoader

class SidoniaSpirograph extends BaseWorld

  __debug = true

  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )

  _setup: ->
    @_loadModel()
    @_addLight()
    @_data =
      p1r: 1
      p2r: 1
    @_setupGUI()

  _setupGUI: ->
    gui = new dat.GUI()
    gui.add @_data, 'p1r', 1, 100
    gui.add @_data, 'p2r', 0, 100


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
      @tanikaze = obj
    )

  _loadModelObj: (path, onLoad)->
    loader = new THREE.OBJMTLLoader()
    loader.load( path + '.obj', path + '.mtl', ( object )=>
      console.log 'object:', object
      scale = 20
      object.scale.set(scale, scale, scale)
      @scene.add object
      onLoad?(object)
    )

  _update: ->


if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    SidoniaSpirograph
else if typeof exports is "object"
  # CommonJS
  exports.SidoniaSpirograph = SidoniaSpirograph
else
  # Browser global.
  window.SidoniaSpirograph = SidoniaSpirograph