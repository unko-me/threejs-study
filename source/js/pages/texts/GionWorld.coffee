class GionWorld
  constructor: (@world) ->


  setup: ->

  update: =>


if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    GionWorld
else if typeof exports is "object"
  # CommonJS
  exports.GionWorld = GionWorld
else
  # Browser global.
  window.GionWorld = GionWorld