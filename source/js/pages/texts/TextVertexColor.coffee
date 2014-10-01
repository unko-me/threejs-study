#= require StatsInit
#= require core/BaseWorld


class TextVertexColor extends BaseWorld
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
    theText = 'SENSORS'
    theText = 'セ・リーグ'
    textGeometry = new THREE.TextGeometry(theText,
      size: 80
      height: 0
      curveSegments: 1
#      font: "helvetiker"
      font: "pixelmplus12"
    )

    @textGeometry = textGeometry

    textGeometry.computeBoundingBox()
    centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x)
#    textMaterial = new THREE.MeshBasicMaterial(
#      color: Math.random() * 0xffffff + 0xFFFF
#      overdraw: 0.5
#      wireframe: true
#    )
    textMaterial = new THREE.MeshBasicMaterial(
      color: 0xffffff
      shading: THREE.FlatShading
      vertexColors: THREE.VertexColors
    )
    @textMaterial = textMaterial
    @_setVertexColor()




    text = new THREE.Mesh(textGeometry, textMaterial)

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
    @originalBox = @_text.geometry.clone()

  _setVertexColor: ->
#    faceIndices = [ 'a', 'b', 'c', 'd' ]
    for face in @textGeometry.faces by 1
      n = if face instanceof THREE.Face3  then 3 else 4
      for j in [0...n]
#        vertexIndex = face[ faceIndices[ j ] ]
#        p = geometry.vertices[ vertexIndex ]
        color = new THREE.Color( 0 )
        if(Math.random()<0.5)
          color.setHSL( Math.random(), 1.0, 0.5 );
#          color.setHSL( Math.random(), 0.4, 0.5 );

        face.vertexColors[ j ] = color

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
    if @_yuragi > 0.1
      @_yuragi += (0 - @_yuragi) * 0.039
#      @_yuragi -= 0.1
#      console.log '@_yuragi:', @_yuragi
      @_yurayura()


      if Math.random() < 0.4
        @_setVertexColor()
        @textGeometry.colorsNeedUpdate = true
    else
      if Math.random() < 0.5
        @_setVertexColor()
        @textGeometry.colorsNeedUpdate = true




  _yuragi: 2000
  _yurayura: ->
    for vertex, i in @_text.geometry.vertices
      originVertex = @originalBox.vertices[i]

      yuragi = Math.random() * @_yuragi - @_yuragi * 0.5
      vertex.x += (originVertex.x - (vertex.x + yuragi)) * 0.7
      vertex.y += (originVertex.y - (vertex.y + yuragi)) * 0.7
#      vertex.z += (originVertex.z - (vertex.z + yuragi)) * 0.7

    #      vertex.x += (Math.random() * 4 - 2)
    #      vertex.y += (Math.random() * 4 - 2)
    #      vertex.z += (Math.random() * 4 - 2)
    @_text.geometry.verticesNeedUpdate = true


if typeof define is "function" and define.amd
  define ->
    TextVertexColor
else if typeof exports is "object"
  exports.TextVertexColor = TextVertexColor
else
  window.TextVertexColor = TextVertexColor

new TextVertexColor().startLoop()