#= require StatsInit
#= require core/BaseWorld


class SensorsText extends BaseWorld
  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )


  _setupCameraPos: ->
    @camera.position.set(0, 0, 300)
  _setup: ->
    @_setupText()
    @_startAnimation()


  _amp: 0
  _startAnimation: ->
#    TweenMax.to(@, 1.0, {_amp: 10, onUpdate: @_updateAnim})
    @_kobetuAnim()
    $(window).on('click', =>
      @_kobetuAnim()
    )


  _kobetuAnim: =>
    animTime = 102.0
    animTime = 2.0
    zoomAnimTime = animTime + 1.0
    #    TweenMax.fromTo(@_text.position, zoomAnimTime, {z: 600}, {z: 0, ease: 'easeOutQuint'})



    radius = 100
    box = @textGeometry.boundingBox
    height =  box.max.y - box.min.y
    centerY = (box.max.y - box.min.y) >> 1
    centerY -= 15

    console.log box.max.y, box.min.y, height, centerY

    ease = 'easeOutCubic'
    targetAmp = Math.PI * 4
    PI_Half = Math.PI / 2
    _.each(@_text.geometry.vertices, (vertex, i)=>
      originVertex = @originalBox.vertices[i]

      delay = Math.floor(vertex.x / 10) / 100
      delayZ = delay + Math.floor(vertex.y / 10) / 100

      obj = {amp: 0, ampZ: 0, radius: 0}

      radius = Math.abs(originVertex.y - centerY)
      radius = Math.pow(radius, 2) / 26
      #      if radius < 2
      #        radius = 2
      obj.radius = radius


      if vertex.y < centerY
        alpha = Math.PI
      else
        alpha = 0


      TweenMax.to(obj, animTime, {
        amp: targetAmp
        delay: delay
        ease: ease
        onUpdate: ->
          vertex.y = originVertex.y + Math.sin(obj.amp + alpha) * obj.radius
      });

      TweenMax.to(obj, animTime, {
        ampZ: targetAmp
        delay: delayZ
        ease: ease
        onUpdate: ->
          vertex.z = originVertex.z + Math.cos(obj.ampZ + PI_Half + alpha ) * obj.radius
      })
    )


  _kobetuAnim2: =>
    radius = 100
    for vertex, i in @_text.geometry.vertices
      originVertex = @originalBox.vertices[i]
      #      delay = (vertex.x % 50) / 100
      delay = Math.floor(vertex.x / 10) / 100
      do ->
        TweenMax.to(vertex, 0.5, {
          y: originVertex.y + 100,
        #        z: originVertex.z + 100,
          yoyo: true, repeat: 3, delay: delay})


  _updateAnim: =>
    radius = 100
    for vertex, i in @_text.geometry.vertices
      originVertex = @originalBox.vertices[i]

      delay = vertex.x % 50

      vertex.y = originVertex.y + Math.sin(@_amp + delay) * radius
      vertex.z = originVertex.z + Math.cos(@_amp + delay) * radius

    #      vertex.z = originVertex.z + Math.sin(@_amp) * 10
    @_text.geometry.verticesNeedUpdate = true




  _setupText: ->
    theText = 'SENSORS'
    theText = 'セ・リーグ'
    theText = 'あ'
    @textGeometry = new THREE.TextGeometry(theText,
      size: 80
      height: 0
      curveSegments: 1
#      font: "helvetiker"
      font: "pixelmplus12"
    )

    @textGeometry.mergeVertices()

    for vertex in @textGeometry.vertices
      console.log 'vertex:', vertex


    @textGeometry.computeBoundingBox()
    centerOffset = -0.5 * (@textGeometry.boundingBox.max.x - @textGeometry.boundingBox.min.x)
    #    textMaterial = new THREE.MeshBasicMaterial(
    #      color: Math.random() * 0xffffff + 0xFFFF
    #      overdraw: 0.5
    #      wireframe: true
    #    )
    @textMaterial = new THREE.MeshBasicMaterial(
      color: 0xffffff
      shading: THREE.FlatShading
      vertexColors: THREE.VertexColors
      wireframe: true
    )
    @_setVertexColor()




    text = new THREE.Mesh(@textGeometry, @textMaterial)

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
#        if(Math.random()<0.5)
#          color.setHSL( Math.random(), 1.0, 0.5 );
        color.setHSL( Math.random(), 1, 0.5 );

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
#    @_update_yurayura()
    @_text.geometry.verticesNeedUpdate = true


  _update_yurayura: ->
    if @_yuragi > 0.1
      @_yuragi += (0 - @_yuragi) * 0.039
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
    SensorsText
else if typeof exports is "object"
  exports.SensorsText = SensorsText
else
  window.SensorsText = SensorsText

new SensorsText().startLoop()