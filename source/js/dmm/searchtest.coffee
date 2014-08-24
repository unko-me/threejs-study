#= require moment/min/moment.min.js
#= require jquery/dist/jquery.min.js

#= require_tree ./


searcher = new DMMSearch(DMMKey.id)
searcher.search 'hogehoge'
