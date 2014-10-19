#= require StatsInit
#= require core/BaseWorld
#= require ./AudioLoader
#= require ./SimpleAudioPlayer


class SimpleVisualizer extends BaseWorld
  FFT_SIZE = 1024

  _isPlay: false
  constructor: () ->
    super()

  setupControl: ->


  _setup: ->
    y = 300
    @camera.position.set(0, y, 500)
    @camera.lookAt(new THREE.Vector3(0, y, 0))
    @_setupAudio()
    @_setupLine()

  _setupAudio: ->
    @player = new SimpleAudioPlayer()
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
    line = new THREE.Line( @lineGeometry, material )
    @scene.add line

    @_addPoint()

  _addPoint: ->
    @particleMaterial = new THREE.PointCloudMaterial( {
#      size: 10, color: 0xffffffff, transparent: true, depthTest: true, alpha:1
      map: THREE.ImageUtils.loadTexture('../../img/katapad/yes_02.png')
      size: 30
    })
    @particleGeo = @lineGeometry.clone()
    @particle = new THREE.PointCloud(@particleGeo, @particleMaterial)
    @particle.sortParticles = false
    @scene.add @particle

  _update: ->
    if @player._isPlay
      data = @_getData()
      @_renderLine(data)

  _getData: ->
    analyser = @player.analyser
    unless analyser
      return
    data = new Uint8Array(analyser.frequencyBinCount / 2)
    analyser.getByteFrequencyData(data)
    return data

  _renderLine: (data)->
    h = 3
    sum = 0
    for value, i in data
      @lineGeometry.vertices[i].y = value * h
      @particleGeo.vertices[i].y  = value * h
      sum += value

    @lineGeometry.verticesNeedUpdate = true
    @particleGeo.verticesNeedUpdate = true
    @particleMaterial.size = sum / data.length



if typeof define is "function" and define.amd
  define ->
    SimpleVisualizer
else if typeof exports is "object"
  exports.SimpleVisualizer = SimpleVisualizer
else
  window.SimpleVisualizer = SimpleVisualizer

