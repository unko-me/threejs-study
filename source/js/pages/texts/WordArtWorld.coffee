_DEFAULT_TEXT = 'ちょっとだけ　軽い気持ちが　重い罪'


class WordArtWorld
  constructor: (@world) ->


  setup: ->
    @_setupCamera()
    @_setupLight()
    @_setupText()

  update: =>

    @_yurayura()
#    @_updateCamera()


  _angle: 0
  _updateCamera: =>
    @world.camera.position.x += Math.sin(@_angle += 0.2)  * 20
    @world.camera.position.y += Math.cos(@_angle * 0.2)  * 20


  _yurayura: ->

    for vertex, i in @_text.geometry.vertices
      originVertex = @originalBox.vertices[i]
      vertex.x += (originVertex.x - (vertex.x + (Math.random() * 10 - 5))) * 0.1
      vertex.y += (originVertex.y - (vertex.y + (Math.random() * 10 - 5))) * 0.1
      vertex.z += (originVertex.z - (vertex.z + (Math.random() * 10 - 5))) * 0.1

    #      vertex.x += (Math.random() * 4 - 2)
    #      vertex.y += (Math.random() * 4 - 2)
    #      vertex.z += (Math.random() * 4 - 2)
    @_text.geometry.verticesNeedUpdate = true


  _setupLight: ->
    directionalLight = new THREE.AmbientLight('#333333')
    directionalLight.position.set(0, 100, -100)
    @world.scene.add(directionalLight)
  _setupCamera: ->
    @world.camera.position.set(0, 0, 170)



  _setupText: ->
    theText = @_getText()

    text3d = new THREE.TextGeometry(theText,
      size: 80
      height: 20
      curveSegments: 2
#      font: "tanukimagic"
      font: "pixelmplus12"
    )

    ###
{
   "cssFontWeight" : "normal",
   "ascender" : 1228,
   "underlinePosition" : -125,
   "cssFontStyle" : "normal",
   "boundingBox" :
      {
         "yMin" : -277.796875,
         "xMin" : 231.96875,
         "yMax" : 1226.484375,
         "xMax" : 1389
      },
   "resolution" : 1000,
   "original_font_information" :
      {
         "postscript_name" : "PixelMplus12-Regular",
         "version_string" : "Version 2013.0602 ",
         "vendor_url" : "",
         "full_font_name" : "PixelMplus12 Regular",
         "font_family_name" : "PixelMplus12",
         "copyright" : "Copyright (C) 2013 M+ Font Project",
         "description" : "",
         "trademark" : "",
         "designer" : "",
         "designer_url" : "",
         "unique_font_identifier" : "FontForge 2.0 : PixelMplus12 Regular : 2-6-2013",
         "license_url" : "",
         "license_description" : "",
         "manufacturer_name" : "",
         "font_sub_family_name" : "Regular"
      },
   "descender" : -278,
   "familyName" : "PixelMplus12",
   "lineHeight" : 1506,
   "underlineThickness" : 50
}###

    text3d.computeBoundingBox()
    centerOffset = -0.5 * (text3d.boundingBox.max.x - text3d.boundingBox.min.x)
    textMaterial = new THREE.MeshPhongMaterial(
      color: Math.random() * 0xffffff + 0xFFFF
      overdraw: 0.5
#      wireframe: true
    )
    text = new THREE.Mesh(text3d, textMaterial)
    text.position.x = centerOffset
    text.position.y = 0
    text.position.z = 0
    text.rotation.x = 0
    text.rotation.y = Math.PI * 2
    group = new THREE.Object3D()
    group.add text
    @world.scene.add group

    @_text = text
    @originalBox = @_text.geometry.clone()



  _getText: ->
    theText = _DEFAULT_TEXT
    hash = document.location.hash.substr(1)
    theText = hash  if hash.length isnt 0
    return theText




if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    WordArtWorld
else if typeof exports is "object"
  # CommonJS
  exports.WordArtWorld = WordArtWorld
else
  # Browser global.
  window.WordArtWorld = WordArtWorld