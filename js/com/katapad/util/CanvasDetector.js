(function(){var e;e=function(){function e(){}return e.canWebGL=function(){var e;try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(n){return e=n,!1}},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.CanvasDetector=e:window.CanvasDetector=e}).call(this);