###
@example http://threejs.org/examples/#canvas_geometry_text

###


_DEFAULT_TEXT = 'UNKO.ME 1234'

class BasicText
  constructor: (@world) ->


  setup: ->
    @_setupCamera()
    @_setupText()

  update: =>



  _setupCamera: ->
    @world.camera.position.set(0, 0, 570)



  _setupText: ->
    theText = @_getText()

    text3d = new THREE.TextGeometry(theText,
      size: 80
      height: 20
      curveSegments: 2
      font: "helvetiker"
    )

    text3d.computeBoundingBox()
    centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x)
    textMaterial = new THREE.MeshBasicMaterial(
      color: Math.random() * 0xffffff * 2
#      overdraw: 0.5
      wireframe: true
    )
    text = new THREE.Mesh(text3d, textMaterial)
    text.position.x = centerOffset
    text.position.y = 0
    text.position.z = 0
    text.rotation.x = 0
    text.rotation.y = Math.PI * 2
    group = new THREE.Object3D()
    group.add text
    @world.scene.add group






  _getText: ->
    theText = _DEFAULT_TEXT
    hash = document.location.hash.substr(1)
    theText = hash  if hash.length isnt 0
    return theText



if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    BasicText
else if typeof exports is "object"
  # CommonJS
  exports.BasicText = BasicText
else
  # Browser global.
  window.BasicText = BasicText