function Boids(t,e){if(!(this instanceof Boids))return new Boids(t,e);t=t||{},e=e||function(){},this.speedLimitRoot=t.speedLimit||0,this.accelerationLimitRoot=t.accelerationLimit||1,this.speedLimit=Math.pow(this.speedLimitRoot,2),this.accelerationLimit=Math.pow(this.accelerationLimitRoot,2),this.separationDistance=Math.pow(t.separationDistance||60,2),this.alignmentDistance=Math.pow(t.alignmentDistance||180,2),this.cohesionDistance=Math.pow(t.cohesionDistance||180,2),this.separationForce=t.separationForce||.15,this.cohesionForce=t.cohesionForce||.1,this.alignmentForce=t.alignmentForce||t.alignment||.25,this.attractors=t.attractors||[];for(var n=this.boids=[],i=0,o=void 0===t.boids?50:t.boids;o>i;i+=1)n[i]=[25*Math.random(),25*Math.random(),0,0,0,0]}var sqrt=Math.sqrt,POSITIONX=0,POSITIONY=1,SPEEDX=2,SPEEDY=3,ACCELERATIONX=4,ACCELERATIONY=5;Boids.prototype.tick=function(){for(var t,e,n,i,o,r,s,a,p,c,h,d,l=this.boids,u=this.separationDistance,f=this.separationForce,m=this.cohesionDistance,E=this.cohesionForce,y=this.alignmentDistance,g=this.alignmentForce,w=this.speedLimit,x=this.accelerationLimit,C=this.accelerationLimitRoot,v=this.speedLimitRoot,T=l.length,_=T,R=this.attractors,A=R.length;_--;){for(t=0,e=0,n=0,i=0,o=0,r=0,c=l[_],d=A;d--;)attractor=R[d],s=c[0]-attractor[0],a=c[1]-attractor[1],p=s*s+a*a,p<attractor[2]*attractor[2]&&(h=sqrt(s*s+a*a),l[_][SPEEDX]-=attractor[3]*s/h||0,l[_][SPEEDY]-=attractor[3]*a/h||0);for(d=T;d--;)d!==_&&(s=c[0]-l[d][0],a=c[1]-l[d][1],p=s*s+a*a,u>p?(t+=s,e+=a):(m>p&&(n+=s,i+=a),y>p&&(o+=l[d][SPEEDX],r+=l[d][SPEEDY])));h=sqrt(t*t+e*e),l[_][ACCELERATIONX]+=f*t/h||0,l[_][ACCELERATIONY]+=f*e/h||0,h=sqrt(n*n+i*i),l[_][ACCELERATIONX]-=E*n/h||0,l[_][ACCELERATIONY]-=E*i/h||0,h=sqrt(o*o+r*r),l[_][ACCELERATIONX]-=g*o/h||0,l[_][ACCELERATIONY]-=g*r/h||0}for(_=T;_--;)x&&(p=l[_][ACCELERATIONX]*l[_][ACCELERATIONX]+l[_][ACCELERATIONY]*l[_][ACCELERATIONY],p>x&&(ratio=C/sqrt(p),l[_][ACCELERATIONX]*=ratio,l[_][ACCELERATIONY]*=ratio)),l[_][SPEEDX]+=l[_][ACCELERATIONX],l[_][SPEEDY]+=l[_][ACCELERATIONY],w&&(p=l[_][SPEEDX]*l[_][SPEEDX]+l[_][SPEEDY]*l[_][SPEEDY],p>w&&(ratio=v/sqrt(p),l[_][SPEEDX]*=ratio,l[_][SPEEDY]*=ratio)),l[_][POSITIONX]+=l[_][SPEEDX],l[_][POSITIONY]+=l[_][SPEEDY]},window.Boids=Boids;var Stats=function(){var t=Date.now(),e=t,n=0,i=1/0,o=0,r=0,s=1/0,a=0,p=0,c=0,h=document.createElement("div");h.id="stats",h.addEventListener("mousedown",function(t){t.preventDefault(),g(++c%2)},!1),h.style.cssText="width:80px;opacity:0.9;cursor:pointer";var d=document.createElement("div");d.id="fps",d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002",h.appendChild(d);var l=document.createElement("div");l.id="fpsText",l.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",l.innerHTML="FPS",d.appendChild(l);var u=document.createElement("div");for(u.id="fpsGraph",u.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff",d.appendChild(u);74>u.children.length;){var f=document.createElement("span");f.style.cssText="width:1px;height:30px;float:left;background-color:#113",u.appendChild(f)}var m=document.createElement("div");m.id="ms",m.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",h.appendChild(m);var E=document.createElement("div");E.id="msText",E.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",E.innerHTML="MS",m.appendChild(E);var y=document.createElement("div");for(y.id="msGraph",y.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",m.appendChild(y);74>y.children.length;)f=document.createElement("span"),f.style.cssText="width:1px;height:30px;float:left;background-color:#131",y.appendChild(f);var g=function(t){switch(c=t){case 0:d.style.display="block",m.style.display="none";break;case 1:d.style.display="none",m.style.display="block"}};return{REVISION:11,domElement:h,setMode:g,begin:function(){t=Date.now()},end:function(){var c=Date.now();n=c-t,i=Math.min(i,n),o=Math.max(o,n),E.textContent=n+" MS ("+i+"-"+o+")";var h=Math.min(30,30-30*(n/200));return y.appendChild(y.firstChild).style.height=h+"px",p++,c>e+1e3&&(r=Math.round(1e3*p/(c-e)),s=Math.min(s,r),a=Math.max(a,r),l.textContent=r+" FPS ("+s+"-"+a+")",h=Math.min(30,30-30*(r/100)),u.appendChild(u.firstChild).style.height=h+"px",e=c,p=0),c},update:function(){t=this.end()}}};(function(){!function(){var t;return t=new Stats,t.domElement.style.position="absolute",t.domElement.style.left="0px",t.domElement.style.top="0px",document.body.appendChild(t.domElement),setInterval(function(){t.begin(),t.end()},1e3/60)}()}).call(this),function(){var t;t=function(){function t(){}return t.canWebGL=function(){var t;try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(e){return t=e,!1}},t}(),"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof exports?exports.CanvasDetector=t:window.CanvasDetector=t}.call(this),function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}};t=function(){function t(){this.render=e(this.render,this),this.onWindowResize=e(this.onWindowResize,this),this.setup=e(this.setup,this),this.scene=new THREE.Scene,this.setup()}return t.prototype.scene=null,t.prototype.camera=null,t.prototype.setup=function(){return this.setupCamera(),this.setupRenderer(),this.setupLight()},t.prototype.setupCamera=function(){return this.camera=new THREE.PerspectiveCamera(75,1.5,1,2e3),this.camera.position.set(0,0,70)},t.prototype.setupRenderer=function(){return this.renderer=Modernizr.webgl?new THREE.WebGLRenderer:new THREE.CanvasRenderer,this.onWindowResize(),this.renderer.setClearColor(0),$(window).on("resize",this.onWindowResize),this.onWindowResize(),document.getElementById("renderer").appendChild(this.renderer.domElement)},t.prototype.setupLight=function(){var t;return t=new THREE.DirectionalLight("#ffffff",1),t.position.set(0,1300,10),this.scene.add(t)},t.prototype.onWindowResize=function(){return this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},t.prototype.render=function(){return this.renderer.render(this.scene,this.camera)},t}(),"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof exports?exports.ThreeWorld=t:window.ThreeWorld=t}.call(this),function(){var t,e={}.hasOwnProperty,n=function(t,n){function i(){this.constructor=t}for(var o in n)e.call(n,o)&&(t[o]=n[o]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};t=function(t){function e(t,e){THREE.Mesh.call(this,t,e),this._init()}return n(e,t),e.prototype._init=function(){return this.rotation.y=180*Math.PI/180,this.originalGeometry=this.geometry.clone(),this._segmentsW=this.geometry.parameters.widthSegments+1,this._list=new Array(this._segmentsW),this._angle=0,this._seed=Math.ceil(65536*Math.random())},e.prototype.updateYurayura=function(t,e){var n,i;return null==t&&(t=.24),this.depth=null!=e?e:20,this._angle+=t,i=2*Math.sin(this._angle),n=2*noise.simplex2(this._angle,this._seed)+i,this._list.unshift(n),this._list.length>this._maxSegment&&this._list.pop(),this._updateVertex()},e.prototype.update=function(){return this._updateVertex()},e.prototype._updateVertex=function(){var t,e,n,i,o,r,s,a;for(a=this.geometry.vertices,e=r=0,s=a.length;s>r;e=++r)o=a[e],n=this.originalGeometry.vertices[e],t=this._list[e%this._segmentsW],i=Math.sin(t),o.z=i?n.z+i*this.depth:n.z;return this.geometry.verticesNeedUpdate=!0},e}(THREE.Mesh),"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof exports?exports.FlagParlinPlane=t:window.FlagParlinPlane=t}.call(this),function(){var t,e,n=function(t,e){return function(){return t.apply(e,arguments)}};e=function(){function t(){}return t.prototype.angle=30,t.prototype.depth=19,t.prototype.segments=10,t}(),t=function(){function t(t){this.world=t,this._setupFlock=n(this._setupFlock,this),this.update=n(this.update,this)}var i,o,r;return i=30,o=30,r=20,t.prototype._currentSegment=0,t.prototype._angle=0,t.prototype._list=null,t.prototype._planes=null,t.prototype._flock=null,t.prototype.setup=function(){return this._list=new Array(o+1),this._setupGUI(),this._setupGround(),this._setupFlock(),this.world.camera.position.z-=1e3,this.world.camera.lookAt(new THREE.Vector3),this._data.segments=o+1},t.prototype.update=function(){var t,e,n,i,o,r,s,a,p,c;for(a=this._planes,i=0,r=a.length;r>i;i++)n=a[i],n.updateYurayura(.001*this._data.angle,this._data.depth);for(this._flock.tick(),p=this._flock.boids,c=[],e=o=0,s=p.length;s>o;e=++o)t=p[e],n=this._planes[e],n.position.x=t[0],c.push(n.position.y=t[1]);return c},t.prototype._setupGUI=function(){var t;return t=new dat.GUI,this._data=new e,t.add(this._data,"angle",1,100),t.add(this._data,"depth",1,100)},t.prototype._setupGround=function(){var t,e,n,s,a,p;for(n=new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture("../../img/yozawa/1000000.jpg"),side:THREE.DoubleSide}),this._planes=[],p=[],e=a=0;i>=0?i>a:a>i;e=i>=0?++a:--a)t=new THREE.PlaneGeometry(300,143,o,r),s=new FlagParlinPlane(t,n),s.position.z=10*e,this._planes.push(s),p.push(this.world.scene.add(s));return p},t.prototype._setupFlock=function(){return this._flock=Boids({boids:i,speedLimit:0,accelerationLimit:.15,separationDistance:.01,alignmentDistance:10,choesionDistance:180,separationForce:.15,alignmentForce:.75,choesionForce:.7,attractors:[]})},t.prototype._setupAxisHelper=function(){var t;return t=new THREE.AxisHelper(1e3),this.world.scene.add(t)},t}(),"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof exports?exports.Flag1=t:window.Flag1=t,function(){var e,n,i,o;return o=new ThreeWorld,n=new t(o),n.setup(),e=new THREE.TrackballControls(o.camera),(i=function(){return function(){return requestAnimationFrame(i),e.update(),n.update(),o.render()}}(this))()}()}.call(this);