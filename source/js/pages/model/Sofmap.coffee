_SEGMENT_X = 30
_SEGMENT_Y = 20


class Sofmap extends THREE.Object3D
  constructor: () ->
    THREE.Object3D.call(@)
    @_init()

  _init: ->
    GEO_W = 400
    GEO_H = 212 * 2
    geometry = new THREE.PlaneGeometry(GEO_W, GEO_H, _SEGMENT_X, _SEGMENT_Y)

#    texture = THREE.ImageUtils.loadTexture('../../img/sofmap/sofmap-assets/sofmap_texture.png')
    texture = THREE.ImageUtils.loadTexture('../../img/sofmap/sofmap-assets/sofmap_512.png')
    material = new THREE.MeshLambertMaterial(
      map: texture
      side: THREE.DoubleSide
    )
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set( 3, 3 * 2 )
    material.needsUpdate = true

    geometry = new THREE.PlaneGeometry(GEO_W, GEO_H, _SEGMENT_X, _SEGMENT_Y)
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -200, 0, 0 ) )
    @planeLeft = new THREE.Mesh(geometry, material)

    geometry = new THREE.PlaneGeometry(GEO_W, GEO_H, _SEGMENT_X, _SEGMENT_Y)
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 200, 0, 0 ) )
    @planeRight = new THREE.Mesh(geometry, material)
    @planeRight.rotation.y = -75 * Math.PI / 180

    @planeLeft.position.y = @planeRight.position.y = GEO_H >> 1
    @add @planeLeft
    @add @planeRight

    @planeLeft.castShadow = @planeRight.castShadow = true
#    @castShadow = true


  update: =>
    now = Date.now()
    @planeLeft.rotation.y  = Math.cos((now / 100) % 60) * 0.31 - Math.sin((now / 100) % 10) * 0.31
    @planeRight.rotation.y = Math.sin((now / 200) % 70) * 0.25 - Math.cos((now / 100)) * 0.11 -75 * Math.PI / 180


if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    Sofmap
else if typeof exports is "object"
  # CommonJS
  exports.Sofmap = Sofmap
else
  # Browser global.
  window.Sofmap = Sofmap