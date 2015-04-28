var Stats=function(){var e=Date.now(),t=e,n=0,i=1/0,r=0,o=0,s=1/0,a=0,d=0,l=0,p=document.createElement("div");p.id="stats",p.addEventListener("mousedown",function(e){e.preventDefault(),g(++l%2)},!1),p.style.cssText="width:80px;opacity:0.9;cursor:pointer";var h=document.createElement("div");h.id="fps",h.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002",p.appendChild(h);var c=document.createElement("div");c.id="fpsText",c.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",c.innerHTML="FPS",h.appendChild(c);var u=document.createElement("div");for(u.id="fpsGraph",u.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff",h.appendChild(u);74>u.children.length;){var f=document.createElement("span");f.style.cssText="width:1px;height:30px;float:left;background-color:#113",u.appendChild(f)}var m=document.createElement("div");m.id="ms",m.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",p.appendChild(m);var w=document.createElement("div");w.id="msText",w.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",w.innerHTML="MS",m.appendChild(w);var y=document.createElement("div");for(y.id="msGraph",y.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",m.appendChild(y);74>y.children.length;)f=document.createElement("span"),f.style.cssText="width:1px;height:30px;float:left;background-color:#131",y.appendChild(f);var g=function(e){switch(l=e){case 0:h.style.display="block",m.style.display="none";break;case 1:h.style.display="none",m.style.display="block"}};return{REVISION:11,domElement:p,setMode:g,begin:function(){e=Date.now()},end:function(){var l=Date.now();n=l-e,i=Math.min(i,n),r=Math.max(r,n),w.textContent=n+" MS ("+i+"-"+r+")";var p=Math.min(30,30-30*(n/200));return y.appendChild(y.firstChild).style.height=p+"px",d++,l>t+1e3&&(o=Math.round(1e3*d/(l-t)),s=Math.min(s,o),a=Math.max(a,o),c.textContent=o+" FPS ("+s+"-"+a+")",p=Math.min(30,30-30*(o/100)),u.appendChild(u.firstChild).style.height=p+"px",t=l,d=0),l},update:function(){e=this.end()}}};(function(){!function(){var e;return e=new Stats,e.domElement.style.position="absolute",e.domElement.style.left="0px",e.domElement.style.top="0px",document.body.appendChild(e.domElement),setInterval(function(){e.begin(),e.end()},1e3/60)}()}).call(this),function(){var e;e=function(){function e(){}return e.canWebGL=function(){var e;try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(t){return e=t,!1}},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.CanvasDetector=e:window.CanvasDetector=e}.call(this),function(){window.requestAnimationFrame||(window.requestAnimationFrame=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame)}.call(this),function(){var e,t=function(e,t){return function(){return e.apply(t,arguments)}};e=function(){function e(){this.render=t(this.render,this),this.onWindowResize=t(this.onWindowResize,this),this.setup=t(this.setup,this),this.scene=new THREE.Scene,this.setup()}return e.prototype.scene=null,e.prototype.camera=null,e.prototype.setup=function(){return this.setupCamera(),this.setupRenderer(),this.setupLight()},e.prototype.setupCamera=function(){return this.camera=new THREE.PerspectiveCamera(75,1.5,1,2e3),this.camera.position.set(0,0,70)},e.prototype.setupRenderer=function(){return this.renderer=Modernizr.webgl?new THREE.WebGLRenderer:new THREE.CanvasRenderer,this.onWindowResize(),this.renderer.setClearColor(0),$(window).on("resize",this.onWindowResize),this.onWindowResize(),document.getElementById("renderer").appendChild(this.renderer.domElement)},e.prototype.setupLight=function(){var e;return e=new THREE.DirectionalLight("#ffffff",1),e.position.set(0,1300,10),this.scene.add(e)},e.prototype.onWindowResize=function(){return this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},e.prototype.render=function(){return this.renderer.render(this.scene,this.camera)},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.ThreeWorld=e:window.ThreeWorld=e}.call(this),function(){var e,t,n=function(e,t){return function(){return e.apply(t,arguments)}};t=function(){function e(){}return e.prototype.angle=23.5,e.prototype.depth=10,e}(),e=function(){function e(e){this.world=e,this.update=n(this.update,this)}var i,r;return i=30,r=30,e.prototype._angle=0,e.prototype._list=null,e.prototype.setup=function(){return this._list=new Array(i),this._setupGUI(),this._setupAxisHelper(),this._setupGround(),this.world.camera.position.z-=400,this.world.camera.lookAt(this.plane.position)},e.prototype.update=function(){var e,t,n,r,o,s,a,d,l;for(this.world.camera.position.x+=4*Math.sin(this._angle),this.world.camera.position.y+=8*Math.sin(this._angle),this.world.camera.position.z+=Math.cos(this._angle)*Math.sin(this._angle),this._angle+=.01*this._data.angle,t=Math.sin(this._angle),this._list.unshift(t),this._list.length>i&&this._list.pop(),l=this.plane.geometry.vertices,n=a=0,d=l.length;d>a;n=++a)s=l[n],r=this.originalGeometry.vertices[n],e=this._list[Math.floor(n/i)],o=Math.sin(e),s.z=r.z+o*this._data.depth;return this.plane.geometry.verticesNeedUpdate=!0},e.prototype._setupGUI=function(){var e;return e=new dat.GUI,this._data=new t,e.add(this._data,"angle",1,100),e.add(this._data,"depth",1,100)},e.prototype._setupGround=function(){var e,t,n;return e=new THREE.PlaneGeometry(300,500,i,r),t=new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture("../../img/uni/HN1A.gif"),side:THREE.DoubleSide}),n=new THREE.Mesh(e,t),this.plane=n,this.originalGeometry=e.clone(),this.world.scene.add(n)},e.prototype._setupAxisHelper=function(){var e;return e=new THREE.AxisHelper(1e3),this.world.scene.add(e)},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.Flag1=e:window.Flag1=e}.call(this),function(){var e,t,n;n=new ThreeWorld,e=new Flag1(n),e.setup(),(t=function(){return function(){return requestAnimationFrame(t),e.update(),n.render()}}(this))()}.call(this);