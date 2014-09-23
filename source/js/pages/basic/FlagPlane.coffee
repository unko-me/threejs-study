

class FlagPlane extends THREE.Mesh

  constructor: (geometory, material) ->
    THREE.Mesh.call(@, geometory, material)
    @_init()

  _init: ->
    @rotation.y = 180 * Math.PI / 180
    @originalGeometry = @geometry.clone()
    @_segmentsW = @geometry.parameters.widthSegments + 1
    @_list = new Array(@_segmentsW)
    @_angle = 0


  updateYurayura: (amp = 0.24, @depth = 20)->
    @_angle += amp
    angle = Math.sin(@_angle)
    # listにpush
    @_list.unshift angle
    if @_list.length > @_maxSegment
      @_list.pop()

    @_updateVertex()


  _updateVertex: ->
    for vertex, i in @geometry.vertices
      originVertex = @originalGeometry.vertices[i]

      a = @_list[(i % @_segmentsW)]
      sin = Math.sin a
      if sin
        vertex.z = originVertex.z + sin * @depth
      else
        vertex.z = originVertex.z

    @geometry.verticesNeedUpdate = true






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

