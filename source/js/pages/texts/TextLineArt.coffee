#= require StatsInit
#= require core/BaseWorld


class TextLineArt extends BaseWorld
  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )


  _setupCameraPos: ->
    @camera.position.set(0, 0, 300)
  _setup: ->
#    @_setupGround()
    @_setupText()




  _setupText: ->
    theText = 'hoge'
    text3d = new THREE.TextGeometry(theText,
      size: 80
      height: 1
      curveSegments: 2
      font: "helvetiker"
    )

    text3d.computeBoundingBox()
    centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x)
    textMaterial = new THREE.MeshBasicMaterial(
      color: Math.random() * 0xffffff + 0xFFFF
      overdraw: 0.5
      wireframe: true
    )
    text = new THREE.Mesh(text3d, textMaterial)

    @textMaterial = textMaterial
    text.position.x = centerOffset
    text.position.y = 0
    text.position.z = 0
    text.rotation.x = 0
    text.rotation.y = Math.PI * 2
    group = new THREE.Object3D()
    group.add text
    @scene.add group

    @_text = text


  _setupGround: ->
    material = new THREE.MeshLambertMaterial(
      color: 0x333333
#      wireframe: true
    )
    geometry = new THREE.PlaneGeometry(6000, 6000, 10, 10)
    mesh = new THREE.Mesh(geometry, material)
    @scene.add(mesh)

    mesh.rotation.x = -90 * Math.PI / 180

  _update: ->




if typeof define is "function" and define.amd
  define ->
    TextLineArt
else if typeof exports is "object"
  exports.TextLineArt = TextLineArt
else
  window.TextLineArt = TextLineArt

new TextLineArt().startLoop()