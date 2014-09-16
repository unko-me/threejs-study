(function(){var e;e=function(){function e(){}return e.canWebGL=function(){var e;try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(t){return e=t,!1}},e}(),"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof exports?exports.CanvasDetector=e:window.CanvasDetector=e}).call(this);var Stats=function(){var e=Date.now(),t=e,n=0,i=1/0,o=0,a=0,d=1/0,r=0,l=0,s=0,c=document.createElement("div");c.id="stats",c.addEventListener("mousedown",function(e){e.preventDefault(),E(++s%2)},!1),c.style.cssText="width:80px;opacity:0.9;cursor:pointer";var p=document.createElement("div");p.id="fps",p.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002",c.appendChild(p);var f=document.createElement("div");f.id="fpsText",f.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",f.innerHTML="FPS",p.appendChild(f);var h=document.createElement("div");for(h.id="fpsGraph",h.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff",p.appendChild(h);74>h.children.length;){var u=document.createElement("span");u.style.cssText="width:1px;height:30px;float:left;background-color:#113",h.appendChild(u)}var m=document.createElement("div");m.id="ms",m.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",c.appendChild(m);var x=document.createElement("div");x.id="msText",x.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",x.innerHTML="MS",m.appendChild(x);var v=document.createElement("div");for(v.id="msGraph",v.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",m.appendChild(v);74>v.children.length;)u=document.createElement("span"),u.style.cssText="width:1px;height:30px;float:left;background-color:#131",v.appendChild(u);var E=function(e){switch(s=e){case 0:p.style.display="block",m.style.display="none";break;case 1:p.style.display="none",m.style.display="block"}};return{REVISION:11,domElement:c,setMode:E,begin:function(){e=Date.now()},end:function(){var s=Date.now();n=s-e,i=Math.min(i,n),o=Math.max(o,n),x.textContent=n+" MS ("+i+"-"+o+")";var c=Math.min(30,30-30*(n/200));return v.appendChild(v.firstChild).style.height=c+"px",l++,s>t+1e3&&(a=Math.round(1e3*l/(s-t)),d=Math.min(d,a),r=Math.max(r,a),f.textContent=a+" FPS ("+d+"-"+r+")",c=Math.min(30,30-30*(a/100)),h.appendChild(h.firstChild).style.height=c+"px",t=s,l=0),s},update:function(){e=this.end()}}};(function(){!function(){var e;return e=new Stats,e.domElement.style.position="absolute",e.domElement.style.left="0px",e.domElement.style.top="0px",document.body.appendChild(e.domElement),setInterval(function(){e.begin(),e.end()},1e3/60)}()}).call(this),function(){var e,t,n,i,o,a,d,r,l,s,c;for(console.info("hello middleman-scaffold :)"),s=new THREE.Scene,e=new THREE.PerspectiveCamera(75,1.5,1,1e3),e.position.set(0,0,70),l=CanvasDetector.canWebGL()?new THREE.WebGLRenderer:new THREE.CanvasRenderer,l.setSize(600,400),document.body.appendChild(l.domElement),i=new THREE.DirectionalLight("#ffffff",1),i.position.set(0,7,10),s.add(i),o=new THREE.CubeGeometry(10,10,10),d=new THREE.MeshPhongMaterial({color:"#dd3b6f"}),n=[],a=c=0;100>=c;a=++c)t=new THREE.Mesh(o,d),t.position.set(a%10*15-50,15*Math.floor(a/10)-75,-30),s.add(t),n.push(t);(r=function(){return function(){var i,o,a;for(requestAnimationFrame(r),l.render(s,e),a=[],i=0,o=n.length;o>i;i++)t=n[i],t.rotation.x+=.01,a.push(t.rotation.y+=.01);return a}}(this))()}.call(this);