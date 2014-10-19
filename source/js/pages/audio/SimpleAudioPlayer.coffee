class SimpleAudioPlayer
  ARRAY_SIZE = 0

  _isPlay: false
  context: null
  analyser: null

  constructor: () ->

  Object.defineProperties @prototype,
    isPlay:
      get: ->
        @_isPlay




  setup: (src, fftSize)=>
    window.AudioContext =  window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
    @context = new AudioContext()
#    @_setupOSC()

    @_setupAnalyser(fftSize)
    @_load(src)


  _load: (src)->
    @loader = new AudioLoader(src, (buffer)=>
      console.log 'end', buffer
      @togglePlay()
    )


  _setupAnalyser: (fftSize)=>
    @analyser = @context.createAnalyser()
    @analyser.fftSize = fftSize


  _setupOSC: ->
    osc = @context.createOscillator()

    gainNode = @context.createGain()
    gainNode.gain.value = 0.5
    osc.connect(gainNode)
    gainNode.connect(@context.destination)

  togglePlay: =>
    if @_isPlay
      @stop()
    else
      @play()

    @_isPlay = !@_isPlay

  play: =>
    source = @context.createBufferSource()
    source.buffer = @loader.audioBuffer
    source.playbackRate.value = 1
    source.loop = true

    if @analyser
      source.connect @analyser


#    lowpass = @context.createBiquadFilter()
#    lowpass.type = 2
#    lowpass.frequency.value = 12800
#    source.connect lowpass
#    lowpass.connect @context.destination

    source.connect(@context.destination)
    source.start(0)
    @source = source

  stop: =>
    if @source
      @source.stop()

    @source = null


if typeof define is "function" and define.amd
  define ->
    SimpleAudioPlayer
else if typeof exports is "object"
  exports.SimpleAudioPlayer = SimpleAudioPlayer
else
  window.SimpleAudioPlayer = SimpleAudioPlayer