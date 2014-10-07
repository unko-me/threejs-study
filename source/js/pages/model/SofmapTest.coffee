#= require StatsInit
#= require core/BaseWorld
#= require ./Sofmap


class SofmapTest extends BaseWorld
  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )


  _update: ->
    @sofmap.update()



  _setup: ->
    @camera.position.x -=1000
    @camera.position.y -=400
    @renderer.shadowMapEnabled = true
    @_directionalLight.caastShadow = true
    spotLight = new THREE.SpotLight(0xffffff, 0.5, 0, Math.PI / 6 , 10)
    @scene.add spotLight
    spotLight.position.set(-300, 400, 200)
    spotLight.castShadow = true
#    lightHelper = new THREE.SpotLightHelper(spotLight)
#    @scene.add lightHelper

    @_setupSofmapBoard()
    @_setupGround()

  _setupSofmapBoard: ->
    @sofmap = new Sofmap()
    @scene.add @sofmap


  _setupGround: ->
    material = new THREE.MeshLambertMaterial(
      color: 0x333333
#      wireframe: true
    )
    geometry = new THREE.PlaneGeometry(6000, 6000, 10, 10)
    mesh = new THREE.Mesh(geometry, material)

    mesh.receiveShadow = true

    @scene.add(mesh)

    mesh.rotation.x = -90 * Math.PI / 180



new SofmapTest().startLoop()