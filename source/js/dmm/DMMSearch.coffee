###
  @see https://affiliate.dmm.com/api/reference/r18/all/

  http://affiliate-api.dmm.com/?api_id=[APIID]&affiliate_id=[アフィリエイトID]&operation=ItemList&version=2.00&timestamp=2012-01-13%2014%3A08%3A16&site=DMM.co.jp&keyword=%B5%F0%C6%FD
  api_id=[APIID]
  affiliate_id=[アフィリエイトID]
  operation=ItemList
  version=2.00
  timestamp=2012-01-13%2014%3A08%3A16
  site=DMM.co.jp
  keyword=%B5%F0%C6%FD

###


_URL = 'https://affiliate.dmm.com/api/reference/r18/all/'
class DMMSearch
  constructor: (@apiId) ->


  ###
  YYYY-MM-DD hh:mm:ss
  2012-01-13 14:08:16  
  ###
  timestamp: ->
    now = moment()
    now.format("YYYY-MM-DD hh:mm:ss")


  search: (query)->
    console.log '@timestamp():', @timestamp()
    param =
      api_id: @apiId
      affiliate_id: @apiId + '999'
      operation: 'ItemList'
      version: '2.00'
      timestamp: @timestamp()
      site: 'DMM.co.jp'
      keyword: query

    console.log 'under construction : ' , param

    $.ajax(
      url: _URL
      data: param
      dataType: 'xml'
    )
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