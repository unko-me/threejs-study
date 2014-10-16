HandEvent = {}
do ->

  supportTouch = ("ontouchstart" of window) or window.DocumentTouch and document instanceof DocumentTouch
  HandEvent.click = 'click'

  if supportTouch
    HandEvent.TOUCH_START = 'touchstart'
    HandEvent.TOUCH_MOVE = 'touchmove'
    HandEvent.TOUCH_END = 'touchend'
  else
    HandEvent.TOUCH_START = 'mousedown'
    HandEvent.TOUCH_MOVE = 'mousemove'
    HandEvent.TOUCH_END = 'mouseup'


if typeof define is "function" and define.amd
  define ->
    HandEvent
else if typeof exports is "object"
  exports.HandEvent = HandEvent
else
  window.HandEvent = HandEvent