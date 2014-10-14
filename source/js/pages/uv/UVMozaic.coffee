#= require StatsInit
#= require core/BaseWorld


class UVMozaic extends BaseWorld
  ROW = 10
  COL = 10
  CUBE_WIDTH = 10

  NUM_CUBES = ROW * COL

  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )


  _setup: ->
    @camera.position.set(0, 0, 50)
    @camera.position.set(0, 0, 10)
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

    texture = THREE.ImageUtils.loadTexture('../../img/uni/HN1A.gif')
#    texture = THREE.ImageUtils.loadTexture('../../img/sofmap/sofmap-assets/sofmap_512.png')
    material = new THREE.MeshLambertMaterial(
      map: texture
    )


    @cubes = []

    rotation = 0.015
    w = 1.0 / COL
    h = 1.0 / ROW

    for i in [0...NUM_CUBES]
      x = (i % 10)
      y = Math.floor(i / 10)
      geometry = @_createGeometry(w, h, x, y)
      console.log 'geometry.faceVertexUvs:', geometry.faceVertexUvs

      cube = new THREE.Mesh(geometry, material)
      cube.position.set(x * CUBE_WIDTH - 50, y * CUBE_WIDTH - CUBE_WIDTH * 5, 10 * 1 - 40)
      @scene.add(cube)
      @cubes.push cube

      if Math.floor(i / 10) % 2 == 0
        rotate = rotation
      else
        rotate = -1 * rotation
      cube.userData = {rotate: rotate}
#      cube.userData = {rotate: Math.random() * 0.2}

  _createGeometry: (w, h, x, y)->
    geometry = new THREE.BoxGeometry(CUBE_WIDTH, CUBE_WIDTH, CUBE_WIDTH)
    for uv, j in geometry.faceVertexUvs[0]
      if j % 2 == 0
        newUV = [
          new THREE.Vector2(0.0, 1.0),
          new THREE.Vector2(0.0, 0.0),
          new THREE.Vector2(1.0, 1.0)
        ]
      else
        newUV = [
          new THREE.Vector2(0.0, 0.0),
          new THREE.Vector2(1.0, 0.0),
          new THREE.Vector2(1.0, 1.0)
        ]
      geometry.faceVertexUvs[0][j] = newUV
    return geometry

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