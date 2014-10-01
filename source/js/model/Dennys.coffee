class Dennys
  constructor: (args) ->


  init: ->
    loader = new THREE.JSONLoader()
    loader.load( '../../model/dennys/dennys.js', ( geometry, materials ) =>

      poleHeight = 500

      faceMaterial = new THREE.MeshFaceMaterial( materials )
      dennysMesh = new THREE.Mesh( geometry, faceMaterial )
      dennysMesh.position.set( 0, poleHeight + 80,0);
      dennysMesh.scale.set( 50, 50, 50 );

      mc = new THREE.Object3D()
      mc.add dennysMesh

      material = new THREE.MeshPhongMaterial(
        color: 0xFFFFFF
#        wireframe: true
      )
      geometry = new THREE.CylinderGeometry( 20, 20, poleHeight, 10 )
      poleMesh = new THREE.Mesh(geometry, material)
      mc.add poleMesh
      poleMesh.position.y = poleHeight / 2


      @world.scene.add( mc )


      @dennys = mc
    )


if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    Dennys
else if typeof exports is "object"
  # CommonJS
  exports.Dennys = Dennys
else
  # Browser global.
  window.Dennys = Dennys