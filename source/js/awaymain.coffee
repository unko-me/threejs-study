###
HTML5とJavaScriptではじめる3D表現 | Away3D TypeScriptで立方体を回してみる | Away3D Workshop
http://goo.gl/RQx4S0
###


#= require com/katapad/util/CanvasDetector
#= require 'stats.js/build/stats.min.js'
#= require './lib/awayjs-core.next.min.js'
#= require './lib/stagegl-context.next.min.js'
#= require './lib/stagegl-renderer.next.min.js'



view = undefined
mesh = undefined
timer = undefined
cubes = []

initialize = ->
  directionalLight = createDirectionalLight(0.25, 0x00FFFF)
  view = createView(240, 180, 0x0)
  mesh = createCube(400, 400, 400, directionalLight)
  view.scene.addChild mesh

#  plain = createPlane(100, 100, directionalLight, null, 0, view.scene)
  timer = new away.utils.RequestAnimationFrame(rotate)
  timer.start()
  return

createView = (width, height, backgroundColor) ->
  defaultRenderer = new away.render.DefaultRenderer()
  view = new away.containers.View(defaultRenderer)
  view.width = width
  view.height = height
  view.backgroundColor = backgroundColor
  view

createCube = (width, height, depth, light) ->
  defaultTexture = away.materials.DefaultMaterialManager.getDefaultTexture()
  material = new away.materials.TriangleMaterial(defaultTexture)
  mesh = new away.prefabs.PrimitiveCubePrefab(width, height, depth).getNewObject()
  mesh.material = material
  material.lightPicker = new away.materials.StaticLightPicker([light])
  mesh

createDirectionalLight = (ambient, color) ->
  light = new away.entities.DirectionalLight()
  light.direction = new away.geom.Vector3D(0, -1, 1)
  light.ambient = ambient
  light.color = color
  light

createPlane = (width, height, light, specular, y, scene) ->
  material = new away.materials.TriangleMaterial()
#  mesh = new away.prefabs.PrimitivePlanePrefab(width, height).getNewObject()
#  material.materialMode = away.materials.TriangleMaterialMode.MULTI_PASS
#  mesh.material = material
#  lightPicker = new away.materials.StaticLightPicker([light])
#  material.lightPicker = lightPicker
#  material.repeat = true
#  material.specular = specular
#  mesh.y = y
#  scene.addChild mesh
#  mesh


rotate = (timeStamp) =>
  mesh.rotationX = (mesh.rotationX + 100) % 360
  mesh.rotationY = (mesh.rotationY + 1) % 360
  view.render()
  return



window.onload = initialize






###
HoverController












###