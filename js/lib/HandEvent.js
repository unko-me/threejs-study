(function(){var o;o={},function(){return o.supportTouch="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,o.click="click",o.supportTouch?(o.TOUCH_START="touchstart",o.TOUCH_MOVE="touchmove",o.TOUCH_END="touchend"):(o.TOUCH_START="mousedown",o.TOUCH_MOVE="mousemove",o.TOUCH_END="mouseup")}(),"function"==typeof define&&define.amd?define(function(){return o}):"object"==typeof exports?exports.HandEvent=o:window.HandEvent=o}).call(this);