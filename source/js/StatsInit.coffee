#= require 'stats.js/build/stats.min.js'

# stats
do ->
  stats = new Stats();
  #  stats.setMode(1);
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'
  document.body.appendChild( stats.domElement)
  setInterval (->
    stats.begin()

    # your code goes here
    stats.end()
    return
  ), 1000 / 60
