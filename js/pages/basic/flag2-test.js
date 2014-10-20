var Stats=function(){var e=Date.now(),t=e,n=0,i=1/0,r=0,o=0,s=1/0,a=0,p=0,d=0,l=document.createElement("div");l.id="stats",l.addEventListener("mousedown",function(e){e.preventDefault(),w(++d%2)},!1),l.style.cssText="width:80px;opacity:0.9;cursor:pointer";var u=document.createElement("div");u.id="fps",u.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002",l.appendChild(u);var h=document.createElement("div");h.id="fpsText",h.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",h.innerHTML="FPS",u.appendChild(h);var c=document.createElement("div");for(c.id="fpsGraph",c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff",u.appendChild(c);74>c.children.length;){var f=document.createElement("span");f.style.cssText="width:1px;height:30px;float:left;background-color:#113",c.appendChild(f)}var m=document.createElement("div");m.id="ms",m.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",l.appendChild(m);var y=document.createElement("div");y.id="msText",y.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",y.innerHTML="MS",m.appendChild(y);var g=document.createElement("div");for(g.id="msGraph",g.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",m.appendChild(g);74>g.children.length;)f=document.createElement("span"),f.style.cssText="width:1px;height:30px;float:left;background-color:#131",g.appendChild(f);var w=function(e){switch(d=e){case 0:u.style.display="block",m.style.display="none";break;case 1:u.style.display="none",m.style.display="block"}};return{REVISION:11,domElement:l,setMode:w,begin:function(){e=Date.now()},end:function(){var d=Date.now();n=d-e,i=Math.min(i,n),r=Math.max(r,n),y.textContent=n+" MS ("+i+"-"+r+")";var l=Math.min(30,30-30*(n/200));return g.appendChild(g.firstChild).style.height=l+"px",p++,d>t+1e3&&(o=Math.round(1e3*p/(d-t)),s=Math.min(s,o),a=Math.max(a,o),h.textContent=o+" FPS ("+s+"-"+a+")",l=Math.min(30,30-30*(o/100)),c.appendChild(c.firstChild).style.height=l+"px",t=d,p=0),d},update:function(){e=this.end()}}};(function(){!function(){var e;return e=new Stats,e.domElement.style.position="absolute",e.domElement.style.left="0px",e.domElement.style.top="0px",document.body.appendChild(e.domElement),setInterval(function(){e.begin(),e.end()},1e3/60)}()}).call(this),function(){var e;e=function(){function e(){}return e.canWebGL=function(){var e;try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(t){return e=t,!1}},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.CanvasDetector=e:window.CanvasDetector=e}.call(this),function(){var e,t=function(e,t){return function(){return e.apply(t,arguments)}};e=function(){function e(){this.render=t(this.render,this),this.onWindowResize=t(this.onWindowResize,this),this.setup=t(this.setup,this),this.scene=new THREE.Scene,this.setup()}return e.prototype.scene=null,e.prototype.camera=null,e.prototype.setup=function(){return this.setupCamera(),this.setupRenderer(),this.setupLight()},e.prototype.setupCamera=function(){return this.camera=new THREE.PerspectiveCamera(75,1.5,1,2e3),this.camera.position.set(0,0,70)},e.prototype.setupRenderer=function(){return this.renderer=Modernizr.webgl?new THREE.WebGLRenderer:new THREE.CanvasRenderer,this.onWindowResize(),this.renderer.setClearColor(0),$(window).on("resize",this.onWindowResize),this.onWindowResize(),document.getElementById("renderer").appendChild(this.renderer.domElement)},e.prototype.setupLight=function(){var e;return e=new THREE.DirectionalLight("#ffffff",1),e.position.set(0,1300,10),this.scene.add(e)},e.prototype.onWindowResize=function(){return this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},e.prototype.render=function(){return this.renderer.render(this.scene,this.camera)},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.ThreeWorld=e:window.ThreeWorld=e}.call(this),function(){var e,t={}.hasOwnProperty,n=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};e=function(e){function t(e,t){THREE.Mesh.call(this,e,t),this._init()}return n(t,e),t.prototype._init=function(){return this.rotation.y=180*Math.PI/180,this.originalGeometry=this.geometry.clone(),this._segmentsW=this.geometry.parameters.widthSegments+1,this._list=new Array(this._segmentsW),this._angle=0},t.prototype.updateYurayura=function(e,t){var n;return null==e&&(e=.24),this.depth=null!=t?t:20,this._angle+=e,n=Math.sin(this._angle),this._list.unshift(n),this._list.length>this._maxSegment&&this._list.pop(),this._updateVertex()},t.prototype._updateVertex=function(){var e,t,n,i,r,o,s,a;for(a=this.geometry.vertices,t=o=0,s=a.length;s>o;t=++o)r=a[t],n=this.originalGeometry.vertices[t],e=this._list[t%this._segmentsW],i=Math.sin(e),r.z=i?n.z+i*this.depth:n.z;return this.geometry.verticesNeedUpdate=!0},t}(THREE.Mesh),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.FlagPlane=e:window.FlagPlane=e}.call(this),function(){var e,t,n=function(e,t){return function(){return e.apply(t,arguments)}};t=function(){function e(){}return e.prototype.angle=30,e.prototype.depth=19,e.prototype.segments=10,e}(),e=function(){function e(e){this.world=e,this.update=n(this.update,this)}var i,r;return i=30,r=20,e.prototype._currentSegment=0,e.prototype._angle=0,e.prototype._list=null,e.prototype._planes=null,e.prototype.setup=function(){return this._list=new Array(i+1),this._setupGUI(),this._setupGround(),this.world.camera.position.y+=100,this.world.camera.position.z-=900,this.world.camera.lookAt(new THREE.Vector3),this._data.segments=i+1},e.prototype.update=function(){var e,t,n,i,r;for(i=this._planes,r=[],t=0,n=i.length;n>t;t++)e=i[t],r.push(e.updateYurayura(.01*this._data.angle,this._data.depth));return r},e.prototype._setupGUI=function(){var e;return e=new dat.GUI,this._data=new t,e.add(this._data,"angle",1,100),e.add(this._data,"depth",1,100)},e.prototype._setupGround=function(){var e,t,n,o,s,a;for(e=new THREE.PlaneGeometry(600,286,i,r),n=new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture("../../img/yozawa/1000000.jpg"),side:THREE.DoubleSide}),this._planes=[],a=[],t=s=0;100>s;t=++s)o=new FlagPlane(e,n),this._planes.push(o),this.world.scene.add(o),o.position.x=5*t,o.position.y=5*t,o.position.z=8*t,a.push(o.rotation.z+=3.5*t*Math.PI/180);return a},e.prototype._setupAxisHelper=function(){var e;return e=new THREE.AxisHelper(1e3),this.world.scene.add(e)},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.Flag1=e:window.Flag1=e,function(){var t,n,i,r;return r=new ThreeWorld,n=new e(r),n.setup(),t=new THREE.TrackballControls(r.camera),(i=function(){return function(){return requestAnimationFrame(i),t.update(),n.update(),r.render()}}(this))()}()}.call(this);