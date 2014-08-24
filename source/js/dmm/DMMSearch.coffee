class DMMSearch
  constructor: (args) ->


  search: (query)->
    console.log 'under construction : ' , query
    return query


if typeof define is "function" and define.amd
  # AMD. Register as an anonymous module.
  define ->
    DMMSearch
else if typeof exports is "object"
  # CommonJS
  exports.DMMSearch = DMMSearch
else
  # Browser global.
  window.DMMSearch = DMMSearch