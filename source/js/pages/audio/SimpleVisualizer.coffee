#= require StatsInit
#= require core/BaseWorld
#= require ./AudioLoader


class SimpleVisualizer extends BaseWorld
  ARRAY_SIZE = 256
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
      @_playSound()
    )

    $(document).on(HandEvent.TOUCH_START, =>
#      osc.start(0)
      console.log '@loader.buffer:', @loader.buffer
      if @loader.buffer
        @_playSound()
    )

    $(document).on(HandEvent.TOUCH_END, =>
#      osc.stop(0)
    )

  _setupAnalyser: =>
    @analyser = @context.createAnalyser()
    @analyser.fftSize = 1024


  _playSound: =>
    source = @context.createBufferSource()
    source.buffer = @loader.buffer
    source.playbackRate.value = 0.8
    source.loop = true

    if @analyser
      source.connect @analyser


#    lowpass = @context.createBiquadFilter()
#    lowpass.type = 0
#    lowpass.frequency.value = 800
#    source.connect lowpass
#    lowpass.connect @context.destination


    source.connect(@context.destination)
    source.start(0)


  _setupLine: ->
    @lineGeometry = new THREE.Geometry()
    for i in [0...ARRAY_SIZE]
      @lineGeometry.vertices.push new THREE.Vector3( i * 4, 0, 0)

    line = new THREE.Line( @lineGeometry, new THREE.LineBasicMaterial( { color: 0x990000} ) )
    @scene.add line

  _update: ->
    @_getData()

  _getData: ->
    data = new Uint8Array(ARRAY_SIZE)
    @analyser.getByteFrequencyData(data)
    for value, i in data
      @lineGeometry.vertices[i].y = value * 4

    @lineGeometry.verticesNeedUpdate = true


if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    SimpleVisualizer
else if typeof exports is "object"
  # CommonJS
  exports.SimpleVisualizer = SimpleVisualizer
else
  # Browser global.
  window.SimpleVisualizer = SimpleVisualizer

