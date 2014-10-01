#= require StatsInit
#= require core/BaseWorld


class BaseWorldTest extends BaseWorld
  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )


  _setup: ->
    @_setupGround()

    geometry = new THREE.BoxGeometry(200, 200, 200)
    material = new THREE.MeshPhongMaterial({color: '#dd3b6f'})
    cube = new THREE.Mesh(geometry, material)
    @scene.add cube

  _setupGround: ->
    material = new THREE.MeshLambertMaterial(
      color: 0x333333b
#      wireframe: true
    )
    geometry = new THREE.PlaneGeometry(6000, 6000, 10, 10)
    mesh = new THREE.Mesh(geometry, material)
    @scene.add(mesh)

    mesh.rotation.x = -90 * Math.PI / 180

  _update: ->




if typeof define is "function" and define.amd
  define ->
    BaseWorldTest
else if typeof exports is "object"
  exports.BaseWorldTest = BaseWorldTest
else
  window.BaseWorldTest = BaseWorldTest

new BaseWorldTest().startLoop()