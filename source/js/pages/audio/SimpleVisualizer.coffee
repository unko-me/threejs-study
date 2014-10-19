#= require StatsInit
#= require core/BaseWorld
#= require ./AudioLoader
#= require ./SimpleAudioPlayer


class SimpleVisualizer extends BaseWorld
  FFT_SIZE = 1024

  _isPlay: false
  constructor: () ->
    super()


  _setup: ->

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
    for i in [0...FFT_SIZE  / 4]
      @lineGeometry.vertices.push new THREE.Vector3( i * 4, 0, 0)

    line = new THREE.Line( @lineGeometry, new THREE.LineBasicMaterial( { color: 0x990000} ) )
    @scene.add line

  _update: ->
    @_getData()

  _getData: ->
    analyser = @player.analyser
    unless analyser
      return
    data = new Uint8Array(analyser.frequencyBinCount / 2)
    analyser.getByteFrequencyData(data)
    for value, i in data
      @lineGeometry.vertices[i].y = value * 4

    @lineGeometry.verticesNeedUpdate = true


if typeof define is "function" and define.amd
  define ->
    SimpleVisualizer
else if typeof exports is "object"
  exports.SimpleVisualizer = SimpleVisualizer
else
  window.SimpleVisualizer = SimpleVisualizer

