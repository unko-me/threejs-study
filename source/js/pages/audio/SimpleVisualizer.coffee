#= require StatsInit
#= require core/BaseWorld
#= require ./AudioLoader


class SimpleVisualizer extends BaseWorld
  constructor: () ->
    super()


  _setup: ->

    @_setupAudio()

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

  _playSound: =>
    source = @context.createBufferSource()
    source.buffer = @loader.buffer
    source.connect(@context.destination)
    source.start(0)


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

