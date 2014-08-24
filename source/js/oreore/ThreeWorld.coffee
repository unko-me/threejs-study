#= require ../com/katapad/util/CanvasDetector

class ThreeWorld
  scene: null
  camera: null


  constructor: () ->
    @scene = new THREE.Scene()
    @setup()


  setup: =>
    @setupCamera()
    @setupRenderer()
    @setupLight()


  setupCamera: ->
    @camera = new THREE.PerspectiveCamera(75, 600 / 400, 1, 1000)
    @camera.position.set(0, 0, 70)


  setupRenderer: ->
    # render
    if (CanvasDetector.canWebGL())
      @renderer = new THREE.WebGLRenderer()
    else
      @renderer = new THREE.CanvasRenderer()
    @onWindowResize()
#    @renderer.setSize($(window).width(), $(window).height())
#    @renderer.setSize(600, 400)

#    window.addEventListener( 'resize', @onWindowResize, false )
    @renderer.setClearColor(0)
    $(window).on('resize', @onWindowResize)

    document.getElementById('renderer').appendChild(@renderer.domElement)


  setupLight: ->
    directionalLight = new THREE.DirectionalLight('#ffffff', 1)
    directionalLight.position.set(0, 7, 10)
    @scene.add(directionalLight)


  onWindowResize: =>
    #    windowHalfX = window.innerWidth / 2;
#    windowHalfY = window.innerHeight / 2;

    @camera.aspect = window.innerWidth / window.innerHeight;
    @camera.updateProjectionMatrix();

    @renderer.setSize( window.innerWidth, window.innerHeight );

  render: =>
    @renderer.render(@scene, @camera)



if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    ThreeWorld
else if typeof exports is "object"
  # CommonJS
  exports.ThreeWorld = ThreeWorld
else
  # Browser global.
  window.ThreeWorld = ThreeWorld