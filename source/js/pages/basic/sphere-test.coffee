#= require StatsInit
#= require oreore/ThreeWorld
#= require ./SphereTest



world = new ThreeWorld()
oreoreWorld = new SphereTest(world)

oreoreWorld.setup()
control = new THREE.TrackballControls(world.camera)

# update / rendering
render = =>
  requestAnimationFrame(render)

  control.update()
  oreoreWorld.update()
  world.render()

readFile = (file)=>
  reader = new FileReader()
  reader.onload = (e)=>
    console.log 'file read!!'
    reader = e.target
#    img = new Image()
#    img.src = reader.result
#    $('.test-controls').append(img)
    oreoreWorld.loadImage(reader.result)

  reader.readAsDataURL(file)


$ ->
  $('input[type="file"]').on('change', (e)->
    file = e.target.files[0]
    unless file.type.match(/^image/)
      console.log 'NG IMAGE'
      return
    console.log 'OK', file
    readFile(file)
  )


render()