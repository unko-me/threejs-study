#= require StatsInit
#= require core/BaseWorld
#= require ./AudioLoader
#= require ./SimpleAudioPlayer


class SimpleVisualizer extends BaseWorld
  FFT_SIZE = 1024

  _isPlay: false
  _mouseXFactor: 0.5
  constructor: () ->
    super()

#  setupControl: ->
#    @control = new THREE.OrbitControls(@camera, @render.domElement)
#    @control = new THREE.FlyControls(@camera, @render.domElement)
#    @control.dragToLook = true;
#    @control.movementSpeed = 5;
#    @control.rollSpeed = 0.5;


  _setup: ->
    y = 300
#    @control.disableStopEvent = true
    @control.update()
    @camera.position.set(0, y, 800)
    @camera.lookAt(new THREE.Vector3(0, 300, 0))
    @_setupAudio()
    @_setupLine()
    @_setupMouseMove()

#    if HandEvent.supportTouch
#      alert('タップすると音が出ます。')


  _setupMouseMove: =>
    if HandEvent.supportTouch
      document.addEventListener(HandEvent.TOUCH_START, @_onMoveStart)
      document.addEventListener(HandEvent.TOUCH_MOVE, @_onTouchMove, true)
    else
      document.addEventListener(HandEvent.TOUCH_MOVE, @_onMove)

  _onMoveEnd: (e)=>
#    document.removeEventListener(HandEvent.TOUCH_MOVE, @_onTouchMove)
    document.removeEventListener(HandEvent.TOUCH_END, @_onMoveEnd)
    document.addEventListener(HandEvent.TOUCH_START, @_onMoveStart)

  _onMoveStart: (e)=>
#    document.addEventListener(HandEvent.TOUCH_MOVE, @_onMove)
    document.addEventListener(HandEvent.TOUCH_END, @_onMoveEnd)

  _onTouchMove: (e)=>
    @_mouseXFactor = e.touches[0].pageX / window.innerWidth

  _onMove: (e)=>
    @_mouseXFactor = e.clientX / window.innerWidth

  _setupAudio: ->
    @player = new SimpleAudioPlayer()
    @player.on('load', =>
      unless HandEvent.supportTouch
        @togglePlay()
    )
    @player.setup('../../sound/hakatanosio.mp3', FFT_SIZE)

    @context = @player.context


    $(document).on(HandEvent.TOUCH_START, =>
#      osc.start(0)
      if @player.loader.audioBuffer
        @togglePlay()
    )

    $(document).on(HandEvent.TOUCH_END, =>
#      osc.stop(0)
    )


  togglePlay: =>
    @player.togglePlay()



  _setupLine: ->
    @lineGeometry = new THREE.Geometry()
    colors = []
    max = FFT_SIZE  / 4
    w = (window.innerWidth) / max
    for i in [0...max]
      point = new THREE.Vector3( i * w - max * 0.5 * w, 0, 0)
      @lineGeometry.vertices.push point

      color = new THREE.Color( 0xffffff )
      colors[i] = color
      colors[ i ].setHSL( i / max, .6, .6 )

    @lineGeometry.colors = colors

    material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1, linewidth: 1, vertexColors: THREE.VertexColors } )
    @line = new THREE.Line( @lineGeometry, material )
    @scene.add @line

    @_addPoint()

  _addPoint: ->
    @particleMaterial = new THREE.PointCloudMaterial( {
#      size: 10, color: 0xffffffff, transparent: true, depthTest: true, alpha:1
      map: THREE.ImageUtils.loadTexture('../../img/katapad/yes_02.png')
      transparent: true
      blending: THREE.AdditiveBlending
      size: 30
    })
    @particleGeo = @lineGeometry.clone()
    @particle = new THREE.PointCloud(@particleGeo, @particleMaterial)
    @particle.sortParticles = false
    @scene.add @particle

  _update: ->
    if @player.isPlay
      data = @_getData()
      @_renderLine(data)

      if @player.source?
        @player.source.playbackRate.value = @_mouseXFactor * 1 + 0.5

    @camera.lookAt(new THREE.Vector3(0, 300, 0))

    rotate = -0.003
    @line.rotation.y += rotate
    @particle.rotation.y += rotate




  _getData: ->
    analyser = @player.analyser
    unless analyser
      return
    data = new Uint8Array(analyser.frequencyBinCount / 2)
    analyser.getByteFrequencyData(data)
    return data

  _renderLine: (data)->
    h = 5
    sum = 0
    for value, i in data
      @lineGeometry.vertices[i].y = value * h
      @particleGeo.vertices[i].y  = value * h
      sum += value

    @lineGeometry.verticesNeedUpdate = true
    @particleGeo.verticesNeedUpdate = true

    # particle size
    @particleMaterial.size = sum / data.length * 0.3



if typeof define is "function" and define.amd
  define ->
    SimpleVisualizer
else if typeof exports is "object"
  exports.SimpleVisualizer = SimpleVisualizer
else
  window.SimpleVisualizer = SimpleVisualizer

