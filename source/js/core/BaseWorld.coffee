#= require ../com/katapad/util/CanvasDetector

class BaseWorld
  scene: null
  camera: null

  ###*
  option
  option.clearColor
  option.clearAlpha
  ###
  constructor: (@option) ->
    @scene = new THREE.Scene()
    @setup()

  setup: =>
    @setupCamera()
    @setupRenderer()
    @setupLights()
    @setupControl()
    @_setup()


  setupCamera: ->
    @camera = new THREE.PerspectiveCamera(75, 600 / 400, 1, 2000)
    @_setupCameraPos()

  _setupCameraPos: ->
    @camera.position.set(400, 1200, 700)
    @camera.lookAt(new THREE.Vector3())

  setupRenderer: ->
#    if (CanvasDetector.canWebGL())
    if (Modernizr.webgl)
      @renderer = new THREE.WebGLRenderer()
    else
      @renderer = new THREE.CanvasRenderer()

    @onWindowResize()

    $(window).on('resize', @onWindowResize)
    @onWindowResize()

    @_setupClearColor()
    document.getElementById('renderer').appendChild(@renderer.domElement)

  _setupClearColor: ->
    clearColor = @option?.clearColor || 0
    clearAlpha = @option?.clearAlpha || 0
    @renderer.setClearColor(clearColor, clearAlpha)


  setupLights: ->
    @_setupDirectionalLight()
    @_setupAmbientLight()

  _setupAmbientLight: ()->
    if @option?.amibientLight
      @scene.add(new THREE.AmbientLight(@option?.amibientLight.color))

  _setupDirectionalLight: ->
    @_directionalLight = new THREE.DirectionalLight('#ffffff', 1)
    @_directionalLight.position.set(0, 1300, -10)
    @scene.add(@_directionalLight)

  setupControl: ->
    @control = new THREE.TrackballControls(@camera)


  onWindowResize: =>
    @camera.aspect = window.innerWidth / window.innerHeight;
    @camera.updateProjectionMatrix();

    @renderer.setSize( window.innerWidth, window.innerHeight );


  render: =>
    @renderer.render(@scene, @camera)


  update: =>
    @control?.update()
    @_update()
    @render()

    requestAnimationFrame(@update)

  _update: ->


  startLoop: ->
    @update()




if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    BaseWorld
else if typeof exports is "object"
  # CommonJS
  exports.BaseWorld = BaseWorld
else
  # Browser global.
  window.BaseWorld = BaseWorld