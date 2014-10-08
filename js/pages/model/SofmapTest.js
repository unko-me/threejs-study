var Stats=function(){var t=Date.now(),e=t,n=0,i=1/0,o=0,r=0,a=1/0,s=0,p=0,d=0,h=document.createElement("div");h.id="stats",h.addEventListener("mousedown",function(t){t.preventDefault(),E(++d%2)},!1),h.style.cssText="width:80px;opacity:0.9;cursor:pointer";var l=document.createElement("div");l.id="fps",l.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002",h.appendChild(l);var c=document.createElement("div");c.id="fpsText",c.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",c.innerHTML="FPS",l.appendChild(c);var u=document.createElement("div");for(u.id="fpsGraph",u.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff",l.appendChild(u);74>u.children.length;){var f=document.createElement("span");f.style.cssText="width:1px;height:30px;float:left;background-color:#113",u.appendChild(f)}var m=document.createElement("div");m.id="ms",m.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",h.appendChild(m);var y=document.createElement("div");y.id="msText",y.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",y.innerHTML="MS",m.appendChild(y);var w=document.createElement("div");for(w.id="msGraph",w.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",m.appendChild(w);74>w.children.length;)f=document.createElement("span"),f.style.cssText="width:1px;height:30px;float:left;background-color:#131",w.appendChild(f);var E=function(t){switch(d=t){case 0:l.style.display="block",m.style.display="none";break;case 1:l.style.display="none",m.style.display="block"}};return{REVISION:11,domElement:h,setMode:E,begin:function(){t=Date.now()},end:function(){var d=Date.now();n=d-t,i=Math.min(i,n),o=Math.max(o,n),y.textContent=n+" MS ("+i+"-"+o+")";var h=Math.min(30,30-30*(n/200));return w.appendChild(w.firstChild).style.height=h+"px",p++,d>e+1e3&&(r=Math.round(1e3*p/(d-e)),a=Math.min(a,r),s=Math.max(s,r),c.textContent=r+" FPS ("+a+"-"+s+")",h=Math.min(30,30-30*(r/100)),u.appendChild(u.firstChild).style.height=h+"px",e=d,p=0),d},update:function(){t=this.end()}}};(function(){!function(){var t;return t=new Stats,t.domElement.style.position="absolute",t.domElement.style.left="0px",t.domElement.style.top="0px",document.body.appendChild(t.domElement),setInterval(function(){t.begin(),t.end()},1e3/60)}()}).call(this),function(){var t;t=function(){function t(){}return t.canWebGL=function(){var t;try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(e){return t=e,!1}},t}(),"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof exports?exports.CanvasDetector=t:window.CanvasDetector=t}.call(this),function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}};t=function(){function t(t){this.option=t,this.update=e(this.update,this),this.render=e(this.render,this),this.onWindowResize=e(this.onWindowResize,this),this.setup=e(this.setup,this),this.scene=new THREE.Scene,this.setup()}return t.prototype.scene=null,t.prototype.camera=null,t.prototype.setup=function(){return this.setupCamera(),this.setupRenderer(),this.setupLights(),this.setupControl(),this._setup()},t.prototype.setupCamera=function(){return this.camera=new THREE.PerspectiveCamera(75,1.5,1,5e3),this._setupCameraPos(),this._setupCameraLookAt()},t.prototype._setupCameraLookAt=function(){return this.camera.lookAt(new THREE.Vector3)},t.prototype._setupCameraPos=function(){return this.camera.position.set(400,1200,700)},t.prototype.setupRenderer=function(){return this.renderer=Modernizr.webgl?new THREE.WebGLRenderer:new THREE.CanvasRenderer,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this._setupClearColor(),document.getElementById("renderer").appendChild(this.renderer.domElement)},t.prototype._setupClearColor=function(){var t,e,n,i,o,r;return e=(null!=(n=this.option)&&null!=(i=n.clear)?i.color:void 0)||0,t=(null!=(o=this.option)&&null!=(r=o.clear)?r.alpha:void 0)||0,this.renderer.setClearColor(e,t)},t.prototype.setupLights=function(){return this._setupDirectionalLight(),this._setupAmbientLight()},t.prototype._setupAmbientLight=function(){var t,e;return(null!=(t=this.option)?t.amibientLight:void 0)?this.scene.add(new THREE.AmbientLight(null!=(e=this.option)?e.amibientLight.color:void 0)):void 0},t.prototype._setupDirectionalLight=function(){return this._directionalLight=new THREE.DirectionalLight(16777215,2),this._directionalLight.position.set(0,300,100),this.scene.add(this._directionalLight)},t.prototype.setupControl=function(){return this.control=new THREE.TrackballControls(this.camera)},t.prototype.onWindowResize=function(){return this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},t.prototype.render=function(){return this.renderer.render(this.scene,this.camera)},t.prototype.update=function(){var t;return null!=(t=this.control)&&t.update(),this._update(),this.render(),requestAnimationFrame(this.update)},t.prototype._update=function(){},t.prototype.startLoop=function(){return this.update()},t}(),"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof exports?exports.BaseWorld=t:window.BaseWorld=t}.call(this),function(){var t,e,n,i=function(t,e){return function(){return t.apply(e,arguments)}},o={}.hasOwnProperty,r=function(t,e){function n(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};e=30,n=20,t=function(t){function o(){this.update=i(this.update,this),THREE.Object3D.call(this),this._init()}return r(o,t),o.prototype._init=function(){var t,i,o,r,a;return i=400,t=424,o=new THREE.PlaneGeometry(i,t,e,n),a=THREE.ImageUtils.loadTexture("../../img/sofmap/sofmap-assets/sofmap_512.png"),r=new THREE.MeshLambertMaterial({map:a,side:THREE.DoubleSide}),a.wrapS=a.wrapT=THREE.RepeatWrapping,a.repeat.set(3,6),r.needsUpdate=!0,o=new THREE.PlaneGeometry(i,t,e,n),o.applyMatrix((new THREE.Matrix4).makeTranslation(-200,0,0)),this.planeLeft=new THREE.Mesh(o,r),o=new THREE.PlaneGeometry(i,t,e,n),o.applyMatrix((new THREE.Matrix4).makeTranslation(200,0,0)),this.planeRight=new THREE.Mesh(o,r),this.planeRight.rotation.y=-75*Math.PI/180,this.planeLeft.position.y=this.planeRight.position.y=t>>1,this.add(this.planeLeft),this.add(this.planeRight),this.planeLeft.castShadow=this.planeRight.castShadow=!0},o.prototype.update=function(){var t;return t=Date.now(),this.planeLeft.rotation.y=.31*Math.cos(t/100%60)-.31*Math.sin(t/100%10),this.planeRight.rotation.y=.25*Math.sin(t/200%70)-.11*Math.cos(t/100)-75*Math.PI/180},o}(THREE.Object3D),"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof exports?exports.Sofmap=t:window.Sofmap=t}.call(this),function(){var t,e={}.hasOwnProperty,n=function(t,n){function i(){this.constructor=t}for(var o in n)e.call(n,o)&&(t[o]=n[o]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};t=function(t){function e(){e.__super__.constructor.call(this,{amibientLight:{color:3355443}})}return n(e,t),e.prototype._update=function(){return this.sofmap.update()},e.prototype._setup=function(){var t,e;return this.camera.position.x-=1e3,this.camera.position.y-=400,this.renderer.shadowMapEnabled=!0,this._directionalLight.caastShadow=!0,e=new THREE.SpotLight(16777215,.5,0,Math.PI/6,10),this.scene.add(e),e.position.set(-600,1e3,1200),e.castShadow=!0,e.shadowMapWidth=150,e.shadowMapHeight=150,t=new THREE.SpotLightHelper(e),this.scene.add(t),this._setupSofmapBoard(),this._setupGround()},e.prototype._setupSofmapBoard=function(){return this.sofmap=new Sofmap,this.scene.add(this.sofmap)},e.prototype._setupGround=function(){var t,e,n;return e=new THREE.MeshLambertMaterial({color:3355443}),t=new THREE.PlaneGeometry(6e3,6e3,10,10),n=new THREE.Mesh(t,e),n.receiveShadow=!0,this.scene.add(n),n.rotation.x=-90*Math.PI/180},e}(BaseWorld),(new t).startLoop()}.call(this);