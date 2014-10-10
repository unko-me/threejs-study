#= require StatsInit
#= require core/BaseWorld

_MAX = 120 * 3

class ShaderTest1 extends BaseWorld
  constructor: () ->
    super(
      amibientLight:
        color: 0x333333
    )


  _setup: ->
    @camera.position.set(0, 200, 200)
    @_setupShader()


  _setupShader: ->
    @_startTime = Date.now()

    vertexShader = document.getElementById("vertexshader").textContent
    fragmentShader = document.getElementById("fragmentshader").textContent
    texture = THREE.ImageUtils.loadTexture("../../img/particle/particle.png")
    uniforms =
      time:
        type: "f"
        value: 0

      size:
        type: "f"
        value: 120

      startColor:
        type: "c"
        value: new THREE.Color(0xff0000)

      offsetColor:
        type: "c"
        value: new THREE.Color(0xffff00)

      texture:
        type: "t"
        value: texture

    attributes =
      lifetime:
        type: "f"
        value: []

      shift:
        type: "f"
        value: []

    material = new THREE.ShaderMaterial(
      vertexShader: vertexShader
      fragmentShader: fragmentShader
      uniforms: uniforms
      attributes: attributes
      blending: THREE.AdditiveBlending
      transparent: true
      depthTest: false
    )
    geometry = new THREE.Geometry()
    attributes = material.attributes
    n = 0

    while n < _MAX
      vertex = new THREE.Vector3((Math.random() - 0.5) * 1200, 500 + (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 1200)
      geometry.vertices.push vertex
      uniforms.size.value = 60 + Math.random() * 30
      uniforms.startColor.value.r = 0.8 + Math.random() * 0.24
      uniforms.startColor.value.g = 0.24 + Math.random() * 0.12
      uniforms.offsetColor.value.r = (0.8 + Math.random() * 0.24) - uniforms.startColor.value.r
      uniforms.offsetColor.value.g = (0.24 + Math.random() * 0.12) - uniforms.startColor.value.g
      attributes.lifetime.value.push 2.4
      attributes.shift.value.push Math.random() * 2.4
      n++
    particles = new THREE.PointCloud(geometry, material)
    particles.sortParticles = false
    #    particles.position.y = -140
    @scene.add particles

    @particles = particles

    return

  _update: ->
    @_updateParticle()

  _updateParticle: ->
    @particles.material.uniforms.time.value = (Date.now() - @_startTime)/300





new ShaderTest1().startLoop()