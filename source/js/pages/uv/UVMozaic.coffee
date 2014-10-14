#= require StatsInit
#= require core/BaseWorld


class UVMozaic extends BaseWorld

  NUM_CUBES = 100

  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )


  _setup: ->
    @camera.position.set(0, 0, 50)
    @_setupCubes()
    @_setupLight()

  _setupLight: ->
    spotLight = new THREE.SpotLight(0xffffff, 0.5, 0, Math.PI / 6 , 10)
    @scene.add spotLight
    spotLight.position.set(-100, 200, 300)
    spotLight.castShadow = true
    spotLight.shadowMapWidth  = 150
    spotLight.shadowMapHeight = 150
#    lightHelper = new THREE.SpotLightHelper(spotLight)
#    @scene.add lightHelper


  _setupCubes: ->
    width = 10

    geometry = new THREE.BoxGeometry(width, width, width)
    @originalBox = geometry.clone()

    texture = THREE.ImageUtils.loadTexture('../../img/uni/HN1A.gif')
#    texture = THREE.ImageUtils.loadTexture('../../img/sofmap/sofmap-assets/sofmap_512.png')
    material = new THREE.MeshLambertMaterial(
      color: '#dd3b6f'
      map: texture
    )

    @cubes = []

    rotation = 0.05
    for i in [0...NUM_CUBES]
      cube = new THREE.Mesh(geometry, material)
      cube.position.set((i % 10) * width - 50, Math.floor(i / 10) * width - width * 5, 10 * 1 - 40)
      @scene.add(cube)
      @cubes.push cube

      if Math.floor(i / 10) % 2 == 0
        rotate = rotation
      else
        rotate = -1 * rotation
      cube.userData = {rotate: rotate}
#      cube.userData = {rotate: Math.random() * 0.2}

  _update: ->
    @_rotateCube()

  _rotateCube: ->
    for cube in @cubes
      cube.rotation.y += cube.userData.rotate



if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    UVMozaic
else if typeof exports is "object"
  # CommonJS
  exports.UVMozaic = UVMozaic
else
  # Browser global.
  window.UVMozaic = UVMozaic