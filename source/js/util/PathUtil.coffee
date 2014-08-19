class PathUtil
  constructor: () ->

  ###*
  @method パスを返す (github pageに上がってたら、/three-study/をつけて返す)
  ###
  @getImgPath: (path)->
    if location.hostname.indexOf('github.io') > -1
      path = '/threejs-study' + path


if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    PathUtil
else if typeof exports is "object"
  # CommonJS
  exports.PathUtil = PathUtil
else
  # Browser global.
  window.PathUtil = PathUtil