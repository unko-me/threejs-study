#= require StatsInit
#= require core/BaseWorld
#= require ./AudioLoader


class SimpleVisualizer extends BaseWorld
  ARRAY_SIZE = 512

  _isPlay: false
  constructor: () ->
    super()


  _setup: ->

    @_setupAudio()
    @_setupAnalyser()
    @_setupLine()

  _setupAudio: ->
    window.AudioContext =  window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
    @context = new AudioContext()

    osc = @context.createOscillator()

    gainNode = @context.createGain()
    gainNode.gain.value = 0.5
    osc.connect(gainNode)
    gainNode.connect(@context.destination)


    @loader = new AudioLoader('../../sound/hakatanosio.mp3', (buffer)=>
      console.log 'end', buffer
      @togglePlay()
    )

    $(document).on(HandEvent.TOUCH_START, =>
#      osc.start(0)
      console.log '@loader.buffer:', @loader.buffer
      if @loader.audioBuffer
        @togglePlay()
    )

    $(document).on(HandEvent.TOUCH_END, =>
#      osc.stop(0)
    )

  _setupAnalyser: =>
    @analyser = @context.createAnalyser()
    @analyser.fftSize = ARRAY_SIZE * 2


  togglePlay: =>
    if @_isPlay
      @_stopSound()
    else
      @_playSound()

    @_isPlay = !@_isPlay

  _stopSound: =>
    if @source
      @source.stop()

    @source = null



  _playSound: =>
    source = @context.createBufferSource()
    source.buffer = @loader.audioBuffer
    source.playbackRate.value = 1
    source.loop = true

    if @analyser
      source.connect @analyser


    lowpass = @context.createBiquadFilter()
    lowpass.type = 2
    lowpass.frequency.value = 12800
    source.connect lowpass
    lowpass.connect @context.destination

#    source.connect(@context.destination)
    source.start(0)
    @source = source


  _setupLine: ->
    @lineGeometry = new THREE.Geometry()
    for i in [0...ARRAY_SIZE  / 2]
      @lineGeometry.vertices.push new THREE.Vector3( i * 4, 0, 0)

    line = new THREE.Line( @lineGeometry, new THREE.LineBasicMaterial( { color: 0x990000} ) )
    @scene.add line

  _update: ->
    @_getData()

  _getData: ->
    data = new Uint8Array(@analyser.frequencyBinCount / 2)
    @analyser.getByteFrequencyData(data)
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

