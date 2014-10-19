(function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}},o={}.hasOwnProperty,n=function(t,e){function n(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};t=function(t){function o(){this.stop=e(this.stop,this),this.play=e(this.play,this),this.togglePlay=e(this.togglePlay,this),this._setupAnalyser=e(this._setupAnalyser,this),this.setup=e(this.setup,this)}var i;return n(o,t),i=0,o.prototype._isPlay=!1,o.prototype.context=null,o.prototype.analyser=null,Object.defineProperties(o.prototype,{isPlay:{get:function(){return this._isPlay}}}),o.prototype.setup=function(t,e){return window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.msAudioContext,this.context=new AudioContext,this._setupAnalyser(e),this._load(t)},o.prototype._load=function(t){return this.loader=new AudioLoader(t,function(t){return function(e){return console.log("end",e),t.emit("load")}}(this))},o.prototype._setupAnalyser=function(t){return this.analyser=this.context.createAnalyser(),this.analyser.fftSize=t},o.prototype._setupOSC=function(){var t,e;return e=this.context.createOscillator(),t=this.context.createGain(),t.gain.value=.5,e.connect(t),t.connect(this.context.destination)},o.prototype.togglePlay=function(){return this._isPlay?this.stop():this.play(),this._isPlay=!this._isPlay},o.prototype.play=function(){var t;return t=this.context.createBufferSource(),t.buffer=this.loader.audioBuffer,t.playbackRate.value=1,t.loop=!0,this.analyser&&t.connect(this.analyser),t.connect(this.context.destination),t.start(0),this.source=t},o.prototype.stop=function(){return this.source&&this.source.stop(0),this.source=null},o}(EventEmitter2),"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof exports?exports.SimpleAudioPlayer=t:window.SimpleAudioPlayer=t}).call(this);