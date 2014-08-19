(function(){var e;e=function(){function e(){}return e.canWebGL=function(){var e;try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(t){return e=t,!1}},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.CanvasDetector=e:window.CanvasDetector=e}).call(this),function(){var e,t=function(e,t){return function(){return e.apply(t,arguments)}};e=function(){function e(){this.render=t(this.render,this),this.onWindowResize=t(this.onWindowResize,this),this.setup=t(this.setup,this),this.scene=new THREE.Scene,this.setup()}return e.prototype.scene=null,e.prototype.camera=null,e.prototype.setup=function(){return this.setupCamera(),this.setupRenderer(),this.setupLight()},e.prototype.setupCamera=function(){return this.camera=new THREE.PerspectiveCamera(75,1.5,1,1e3),this.camera.position.set(0,0,70)},e.prototype.setupRenderer=function(){return this.renderer=CanvasDetector.canWebGL()?new THREE.WebGLRenderer:new THREE.CanvasRenderer,this.onWindowResize(),$(window).on("resize",this.onWindowResize),document.getElementById("renderer").appendChild(this.renderer.domElement)},e.prototype.setupLight=function(){var e;return e=new THREE.DirectionalLight("#ffffff",1),e.position.set(0,7,10),this.scene.add(e)},e.prototype.onWindowResize=function(){return this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},e.prototype.render=function(){return this.renderer.render(this.scene,this.camera)},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.ThreeWorld=e:window.ThreeWorld=e}.call(this);