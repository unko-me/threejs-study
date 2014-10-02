var Stats=function(){var e=Date.now(),t=e,n=0,i=1/0,r=0,o=0,s=1/0,a=0,d=0,p=0,l=document.createElement("div");l.id="stats",l.addEventListener("mousedown",function(e){e.preventDefault(),x(++p%2)},!1),l.style.cssText="width:80px;opacity:0.9;cursor:pointer";var c=document.createElement("div");c.id="fps",c.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002",l.appendChild(c);var h=document.createElement("div");h.id="fpsText",h.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",h.innerHTML="FPS",c.appendChild(h);var u=document.createElement("div");for(u.id="fpsGraph",u.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff",c.appendChild(u);74>u.children.length;){var f=document.createElement("span");f.style.cssText="width:1px;height:30px;float:left;background-color:#113",u.appendChild(f)}var m=document.createElement("div");m.id="ms",m.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",l.appendChild(m);var y=document.createElement("div");y.id="msText",y.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",y.innerHTML="MS",m.appendChild(y);var w=document.createElement("div");for(w.id="msGraph",w.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",m.appendChild(w);74>w.children.length;)f=document.createElement("span"),f.style.cssText="width:1px;height:30px;float:left;background-color:#131",w.appendChild(f);var x=function(e){switch(p=e){case 0:c.style.display="block",m.style.display="none";break;case 1:c.style.display="none",m.style.display="block"}};return{REVISION:11,domElement:l,setMode:x,begin:function(){e=Date.now()},end:function(){var p=Date.now();n=p-e,i=Math.min(i,n),r=Math.max(r,n),y.textContent=n+" MS ("+i+"-"+r+")";var l=Math.min(30,30-30*(n/200));return w.appendChild(w.firstChild).style.height=l+"px",d++,p>t+1e3&&(o=Math.round(1e3*d/(p-t)),s=Math.min(s,o),a=Math.max(a,o),h.textContent=o+" FPS ("+s+"-"+a+")",l=Math.min(30,30-30*(o/100)),u.appendChild(u.firstChild).style.height=l+"px",t=p,d=0),p},update:function(){e=this.end()}}};(function(){!function(){var e;return e=new Stats,e.domElement.style.position="absolute",e.domElement.style.left="0px",e.domElement.style.top="0px",document.body.appendChild(e.domElement),setInterval(function(){e.begin(),e.end()},1e3/60)}()}).call(this),function(){var e;e=function(){function e(){}return e.canWebGL=function(){var e;try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(t){return e=t,!1}},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.CanvasDetector=e:window.CanvasDetector=e}.call(this),function(){var e,t=function(e,t){return function(){return e.apply(t,arguments)}};e=function(){function e(){this.render=t(this.render,this),this.onWindowResize=t(this.onWindowResize,this),this.setup=t(this.setup,this),this.scene=new THREE.Scene,this.setup()}return e.prototype.scene=null,e.prototype.camera=null,e.prototype.setup=function(){return this.setupCamera(),this.setupRenderer(),this.setupLight()},e.prototype.setupCamera=function(){return this.camera=new THREE.PerspectiveCamera(75,1.5,1,2e3),this.camera.position.set(0,0,70)},e.prototype.setupRenderer=function(){return this.renderer=Modernizr.webgl?new THREE.WebGLRenderer:new THREE.CanvasRenderer,this.onWindowResize(),this.renderer.setClearColor(0),$(window).on("resize",this.onWindowResize),this.onWindowResize(),document.getElementById("renderer").appendChild(this.renderer.domElement)},e.prototype.setupLight=function(){var e;return e=new THREE.DirectionalLight("#ffffff",1),e.position.set(0,1300,10),this.scene.add(e)},e.prototype.onWindowResize=function(){return this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},e.prototype.render=function(){return this.renderer.render(this.scene,this.camera)},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.ThreeWorld=e:window.ThreeWorld=e}.call(this),function(){var e,t,n=function(e,t){return function(){return e.apply(t,arguments)}};t=function(){function e(){}return e.prototype.angle=23.5,e.prototype.depth=10,e}(),e=function(){function e(e){this.world=e,this.update=n(this.update,this)}return e.prototype._angle=0,e.prototype.setup=function(){return this._setupGUI(),this._setupAxisHelper(),this._setupGround(),this.world.camera.position.x+=100,this.world.camera.position.y+=100,this.world.camera.lookAt(this.plane.position)},e.prototype.update=function(){var e,t,n,i,r,o;for(o=this.plane.geometry.vertices,e=i=0,r=o.length;r>i;e=++i)n=o[e],t=this.originalGeometry.vertices[e],n.z=t.y+Math.sin(this._angle+=.01*this._data.angle)*this._data.depth,n.z=t.z+Math.cos(this._angle)*this._data.depth;return this.plane.geometry.verticesNeedUpdate=!0},e.prototype._setupGUI=function(){var e;return e=new dat.GUI,this._data=new t,e.add(this._data,"angle",1,100),e.add(this._data,"depth",1,100)},e.prototype._setupGround=function(){var e,t,n;return e=new THREE.PlaneGeometry(300,300,30,30),t=new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture("../../img/uni/HN1A.gif"),side:THREE.DoubleSide}),n=new THREE.Mesh(e,t),n.rotation.x=90*Math.PI/180,this.plane=n,this.originalGeometry=e.clone(),this.world.scene.add(n)},e.prototype._setupAxisHelper=function(){var e;return e=new THREE.AxisHelper(1e3),this.world.scene.add(e)},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.GroundTest=e:window.GroundTest=e}.call(this),function(){var e,t,n;n=new ThreeWorld,e=new GroundTest(n),e.setup(),(t=function(){return function(){return requestAnimationFrame(t),e.update(),n.render()}}(this))()}.call(this);