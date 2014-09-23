

class FlagPlane extends THREE.Mesh

  constructor: (geometory, material) ->
    THREE.Mesh.call(@, geometory, material)
    @_init()

  _init: ->
    @rotation.y = 180 * Math.PI / 180



if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    FlagPlane
else if typeof exports is "object"
  # CommonJS
  exports.FlagPlane = FlagPlane
else
  # Browser global.
  window.FlagPlane = FlagPlane

