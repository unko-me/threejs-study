###
@example http://threejs.org/examples/#canvas_geometry_text

###


_DEFAULT_TEXT = 'UNKO'

class BasicText
  constructor: (@world) ->


  setup: ->
    @_setupCamera()
    @_setupText()

    $(window).on('click', =>
      @_invertWire()
      console.log '@textMaterial.wireframe :', @textMaterial.wireframe
    )

  _invertWire: =>
    @textMaterial.wireframe = !@textMaterial.wireframe

  update: =>
    @_yurayura()
    @_updateCamera()
    @textMaterial.color.setHex(Math.random() * 0xFFFFFF)
    if Math.random() < 0.04
      @_invertWire()



  _angle: 0
  _updateCamera: =>
#    @world.camera.position.x += Math.sin(@_angle += 0.2)  * 2
    @world.camera.position.x += Math.sin(@_angle)  * 2
    @world.camera.position.y += Math.cos(@_angle * 0.2)  * 3
#    @_text.rotation.x = Math.sin(@_angle * 0.2 + 0.1)  * 0.3+  30 * (Math.PI / 180)
    @_text.rotation.y = Math.cos(@_angle += 0.03)  * 1.2 +  30 * (Math.PI / 180)


  _yurayura: ->

    for vertex, i in @_text.geometry.vertices
      originVertex = @originalBox.vertices[i]
      vertex.x += (originVertex.x - (vertex.x + (Math.random() * 20 - 10))) * 0.7
      vertex.y += (originVertex.y - (vertex.y + (Math.random() * 20 - 10))) * 0.7
      vertex.z += (originVertex.z - (vertex.z + (Math.random() * 20 - 10))) * 0.7

#      vertex.x += (Math.random() * 4 - 2)
#      vertex.y += (Math.random() * 4 - 2)
#      vertex.z += (Math.random() * 4 - 2)
    @_text.geometry.verticesNeedUpdate = true


  _setupCamera: ->
    @world.camera.position.set(0, 0, 170)



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
      color: Math.random() * 0xffffff + 0xFFFF
      overdraw: 0.5
#      wireframe: true
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
    @world.scene.add group

    @_text = text
    @originalBox = @_text.geometry.clone()



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