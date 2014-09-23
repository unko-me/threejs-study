var Stats=function(){var e=Date.now(),t=e,n=0,r=1/0,i=0,o=0,s=1/0,a=0,d=0,p=0,c=document.createElement("div");c.id="stats",c.addEventListener("mousedown",function(e){e.preventDefault(),y(++p%2)},!1),c.style.cssText="width:80px;opacity:0.9;cursor:pointer";var l=document.createElement("div");l.id="fps",l.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002",c.appendChild(l);var h=document.createElement("div");h.id="fpsText",h.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",h.innerHTML="FPS",l.appendChild(h);var u=document.createElement("div");for(u.id="fpsGraph",u.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff",l.appendChild(u);74>u.children.length;){var f=document.createElement("span");f.style.cssText="width:1px;height:30px;float:left;background-color:#113",u.appendChild(f)}var m=document.createElement("div");m.id="ms",m.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",c.appendChild(m);var w=document.createElement("div");w.id="msText",w.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",w.innerHTML="MS",m.appendChild(w);var E=document.createElement("div");for(E.id="msGraph",E.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",m.appendChild(E);74>E.children.length;)f=document.createElement("span"),f.style.cssText="width:1px;height:30px;float:left;background-color:#131",E.appendChild(f);var y=function(e){switch(p=e){case 0:l.style.display="block",m.style.display="none";break;case 1:l.style.display="none",m.style.display="block"}};return{REVISION:11,domElement:c,setMode:y,begin:function(){e=Date.now()},end:function(){var p=Date.now();n=p-e,r=Math.min(r,n),i=Math.max(i,n),w.textContent=n+" MS ("+r+"-"+i+")";var c=Math.min(30,30-30*(n/200));return E.appendChild(E.firstChild).style.height=c+"px",d++,p>t+1e3&&(o=Math.round(1e3*d/(p-t)),s=Math.min(s,o),a=Math.max(a,o),h.textContent=o+" FPS ("+s+"-"+a+")",c=Math.min(30,30-30*(o/100)),u.appendChild(u.firstChild).style.height=c+"px",t=p,d=0),p},update:function(){e=this.end()}}};(function(){!function(){var e;return e=new Stats,e.domElement.style.position="absolute",e.domElement.style.left="0px",e.domElement.style.top="0px",document.body.appendChild(e.domElement),setInterval(function(){e.begin(),e.end()},1e3/60)}()}).call(this),function(){var e;e=function(){function e(){}return e.canWebGL=function(){var e;try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(t){return e=t,!1}},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.CanvasDetector=e:window.CanvasDetector=e}.call(this),function(){var e,t=function(e,t){return function(){return e.apply(t,arguments)}};e=function(){function e(){this.render=t(this.render,this),this.onWindowResize=t(this.onWindowResize,this),this.setup=t(this.setup,this),this.scene=new THREE.Scene,this.setup()}return e.prototype.scene=null,e.prototype.camera=null,e.prototype.setup=function(){return this.setupCamera(),this.setupRenderer(),this.setupLight()},e.prototype.setupCamera=function(){return this.camera=new THREE.PerspectiveCamera(75,1.5,1,2e3),this.camera.position.set(0,0,70)},e.prototype.setupRenderer=function(){return this.renderer=Modernizr.webgl?new THREE.WebGLRenderer:new THREE.CanvasRenderer,this.onWindowResize(),console.log($(window).width(),$(window).height()),this.renderer.setClearColor(0),$(window).on("resize",this.onWindowResize),this.onWindowResize(),document.getElementById("renderer").appendChild(this.renderer.domElement)},e.prototype.setupLight=function(){var e;return e=new THREE.DirectionalLight("#ffffff",1),e.position.set(0,7,10),this.scene.add(e)},e.prototype.onWindowResize=function(){return this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},e.prototype.render=function(){return this.renderer.render(this.scene,this.camera)},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.ThreeWorld=e:window.ThreeWorld=e}.call(this),function(){var e,t,n=function(e,t){return function(){return e.apply(t,arguments)}};t=function(){function e(){}return e.prototype.angle=23.5,e.prototype.depth=10,e}(),e=function(){function e(e){this.world=e,this.update=n(this.update,this)}return e.prototype._angle=0,e.prototype.setup=function(){return this._setupSphere(),this._setupLines(),this._setupParticle(),this.world.camera.position.x+=100,this.world.camera.position.y+=100},e.prototype.update=function(){return this.sphere.rotation.y+=.02,this.cylinder.rotation.y-=.01},e.prototype._setupGUI=function(){var e;return e=new dat.GUI,this._data=new t,e.add(this._data,"angle",1,100),e.add(this._data,"depth",1,100)},e.prototype._setupSphere=function(){var e,t,n,r;return r=THREE.ImageUtils.loadTexture("../../img/katapad/yes_02.png"),r.wrapS=THREE.RepeatWrapping,r.wrapT=THREE.RepeatWrapping,r.repeat.set(3,1),t=new THREE.SphereGeometry(30,32,32),n=new THREE.MeshPhongMaterial({map:r}),this.sphere=new THREE.Mesh(t,n),this.world.scene.add(this.sphere),e=new THREE.CylinderGeometry(50,100,10,32,10),this.cylinder=new THREE.Mesh(e,n),this.world.scene.add(this.cylinder),this.cylinder.z-=200},e.prototype._setupLines=function(){var e,t;return e=new THREE.Geometry,e.vertices.push(new THREE.Vector3(0,0,0)),e.vertices.push(new THREE.Vector3(50,50,0)),e.vertices.push(new THREE.Vector3(50,80,-100)),t=new THREE.Line(e,new THREE.LineBasicMaterial({color:10027008})),this.world.scene.add(t)},e.prototype._setupParticle=function(){var e,t,n,r,i,o,s,a,d;for(e=new THREE.Geometry,i=3e3,t=d=0;i>=0?i>=d:d>=i;t=i>=0?++d:--d)o=1e3*Math.random()-500,s=1e3*Math.random()-500,a=1e3*Math.random()-500,e.vertices.push(new THREE.Vector3(o,s,a));return n=new THREE.ParticleBasicMaterial({map:THREE.ImageUtils.loadTexture("../../img/katapad/yes_02.png"),size:80}),r=new THREE.ParticleSystem(e,n),r.sortParticles=!1,this.world.scene.add(r)},e.prototype._setupAxisHelper=function(){var e;return e=new THREE.AxisHelper(1e3),this.world.scene.add(e)},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.SphereTest=e:window.SphereTest=e}.call(this),function(){var e,t,n,r;r=new ThreeWorld,t=new SphereTest(r),t.setup(),e=new THREE.TrackballControls(r.camera),(n=function(){return function(){return requestAnimationFrame(n),e.update(),t.update(),r.render()}}(this))()}.call(this);