class AudioLoader
  constructor: (url, success, error) ->

    @_success = success
    @_error = error

    window.AudioContext =  window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
    @_context = new AudioContext()


    request = new XMLHttpRequest()
    request.responseType = 'arraybuffer'
    request.onload = @_onLoad
    request.open 'GET', url, true
    request.send()


  _onLoad: (e)=>
    @arrayBuffer = e.target.response
    @convert()

  convert: ()->
    @_context.decodeAudioData(@arrayBuffer, (buffer)=>
      @buffer = buffer
      console.log 'buffer end'
      @_success?(buffer)
      @_success = null
      @_error = null
    )










if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    AudioLoader
else if typeof exports is "object"
  # CommonJS
  exports.AudioLoader = AudioLoader
else
  # Browser global.
  window.AudioLoader = AudioLoader