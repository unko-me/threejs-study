#= require StatsInit
#= require core/BaseWorld


class SenpukiTest extends BaseWorld
  constructor: () ->
    super()



  _setup: ->
    @_setupSenpuki()
    @_setupGround()

  _setupSenpuki: ->

    loader = new THREE.JSONLoader()
    loader.load( '../../model/senpuki/senpuuki_simple.js', ( geometry, materials ) =>

      faceMaterial = new THREE.MeshFaceMaterial( materials )
      @senpuki = new THREE.Mesh( geometry, faceMaterial )
      @senpuki.scale.set( 50, 50, 50 );



      @scene.add( @senpuki )

      console.log '@senpuki.children:', @senpuki.children
      for child in @senpuki.children
        console.log child
    )

  _setupGround: ->
    material = new THREE.MeshLambertMaterial(
      color: 0x333333
#      wireframe: true
    )
    geometry = new THREE.PlaneGeometry(6000, 6000, 10, 10)
    mesh = new THREE.Mesh(geometry, material)
    @scene.add(mesh)

    mesh.rotation.x = -90 * Math.PI / 180



new SenpukiTest().startLoop()