class GroundTest

  constructor: (@world) ->

  setup: ->

    @_setupAxisHelper()
    @_setupGround()

  update: =>

  _setupGround: ->
    geometry = new THREE.PlaneGeometry(300, 300)
    material = new THREE.MeshLambertMaterial(color: 0x009988, side: THREE.DoubleSide)
    plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = 90 * Math.PI / 180
    @world.scene.add plane




  _setupAxisHelper: ->
    axis = new THREE.AxisHelper(1000)
    @world.scene.add axis



if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    GroundTest
else if typeof exports is "object"
  # CommonJS
  exports.GroundTest = GroundTest
else
  # Browser global.
  window.GroundTest = GroundTest
