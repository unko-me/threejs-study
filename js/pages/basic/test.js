!function(){"use strict";function e(e,t){if(null==t)return null;null==t.__id__&&(t.__id__=n++);var r;return null==e.hx__closures__?e.hx__closures__={}:r=e.hx__closures__[t.__id__],null==r&&(r=function(){return r.method.apply(r.scope,arguments)},r.scope=e,r.method=t,e.hx__closures__[t.__id__]=r),r}var t=function(){this.posZ=0,this.density=0,this.noiseY=0,this.noiseX=0,this._isStart=!1,this._startCount=0,this._count=0,this.sin_amp=0,this.amp=0,this.PLATE_HEIGHT=1500,this.PLATE_WIDTH=1200,this.SEGY=10,this.SEGX=40};t.prototype={_getNoise:function(e,t){var r=noise.perlin3,i=r(e*this.noiseX,t*this.noiseY,this._count*this.density+this._startCount);return i},start:function(){this._isStart=!0},update:function(e){if(null==e&&(e=!1),this._isStart||e){this.plane.geometry.verticesNeedUpdate=!0;for(var t=[],r=0,i=this.SEGY+1;i>r;){var h=r++;t[h]=this._getNoise(10,h)*this.amp+this.sin_amp*Math.sin(this._count/12)}this._amps.unshift(t),this._amps.pop(),this._count++;for(var n=0,r=0,i=this.SEGX+1;i>r;){for(var h=r++,a=0,s=0,o=this.SEGY+1;o>s;){var T=s++,_=T*(this.SEGX+1)+h%(this.SEGX+1),p=this.plane.geometry.vertices[_];p.z=this._amps[h][T];var c=0;h<=this.SEGX-1&&(this.amp<1&&(this.amp=1),c=Math.abs(this._amps[h][T]-this._amps[h+1][T])/this.amp,c>1&&(c=1)),a=this.SPACE_X*(1-c),p.x=n}h!=this.SEGX&&(n+=a)}this.plane.position.x+=(-n/2-this.plane.position.x)/2,this.plane.position.z=this.posZ,this._controller.update(this._count,this)}},init:function(e){this.SPACE_X=this.PLATE_WIDTH/this.SEGX,this._scene=e,this._startCount=Math.floor(1e3*Math.random());var t=THREE.ImageUtils.loadTexture("img/top/top_image.jpg",new THREE.UVMapping,function(){window.hataReady=!0,window.onloadReady&&window.hataInit()}),i=new THREE.PlaneGeometry(this.PLATE_WIDTH,this.PLATE_HEIGHT,this.SEGX,this.SEGY),h=new THREE.MeshLambertMaterial({map:t});this.plane=new THREE.Mesh(i,h),this._scene.add(this.plane),this.plane.geometry.verticesNeedUpdate=!0,this._amps=[];for(var n=0,a=this.SEGX+1;a>n;){var s=n++;this._amps[s]=[];for(var o=0,T=this.SEGY+1;T>o;){var _=o++;this._amps[s][_]=0}}this._controller=new r;for(var n=0,a=this.SEGX;a>n;){var s=n++;this.update(!0)}}};var r=function(){this._isFirst=!0};r.prototype={update:function(e,t){var r=Math.floor(e/60);r%=30;var i=10,h=0;if(1>r&&this._isFirst)t.amp=0;else if(i>r){this._isFirst=!1;var n=(r-1)/(.5*i);n>1&&(n=1),t.amp+=(100*Math.pow(n,2)-t.amp)/40,t.noiseY+=(.02-t.noiseY)/20,t.density+=(.025-t.density)/20}else h=(r-i)/(30-i),t.amp+=(100+2400*Math.pow(h,1.3)-t.amp)/10,t.noiseY+=(.05-t.noiseY)/20,t.density+=(.025+.03*Math.pow(h,2)-t.density)/50}};var i=function(){this.STG_H=1400,this.STG_W=1e3,this._amp=1860,this._mouseY=0,this._mouseX=0;var t=h.Browser.window;t.startFlag=e(this,this._startFlag),this.initialize(null)};i.main=function(){new i},i.prototype={_run:function(){h.Browser.window.requestAnimationFrame(e(this,this._run)),this._hata.update(),this._renderer.render(this._scene,this._camera)},_startFlag:function(){this._hata.start()},initialize:function(){var e=h.Browser.document.getElementById("hata");if(Detector.webgl){this._scene=new THREE.Scene,this._camera=new THREE.PerspectiveCamera(40,this.STG_W/this.STG_H,100,5e4),this._renderer=new THREE.WebGLRenderer,this._renderer.setClearColorHex(16777215,1),this._renderer.setSize(this.STG_W,this.STG_H),e.appendChild(this._renderer.domElement),this._hata=new t,this._hata.init(this._scene);var r=new THREE.PointLight(16777215,1.9,2e3);r.position.x=-100,r.position.y=180,r.position.z=1e3,this._scene.add(r);var i=new THREE.PointLight(16777215,.4,2e3);i.position.x=-100,i.position.y=-300,i.position.z=900,this._scene.add(i),this._camera.position.x=0,this._camera.position.y=0,this._camera.position.z=this._amp,this._camera.lookAt(new THREE.Vector3(0,0,0)),this._run()}}};var h={};h.Browser=function(){},h.three={},h.three.Face=function(){},h.three.Mapping=function(){},h.three.Renderer=function(){},h.three.Three=function(){},h.three.Three.requestAnimationFrame=function(e){return h.Browser.window.requestAnimationFrame(e)},h.three.Three.cancelAnimationFrame=function(){h.Browser.window.cancelAnimationFrame(id)};var n=0;Math.__name__=["Math"],Math.NaN=Number.NaN,Math.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY,Math.POSITIVE_INFINITY=Number.POSITIVE_INFINITY,Math.isFinite=function(e){return isFinite(e)},Math.isNaN=function(e){return isNaN(e)},h.Browser.window="undefined"!=typeof window?window:null,h.Browser.document="undefined"!=typeof window?window.document:null,h.three.Three.CullFaceNone=0,h.three.Three.CullFaceBack=1,h.three.Three.CullFaceFront=2,h.three.Three.CullFaceFrontBack=3,h.three.Three.FrontFaceDirectionCW=0,h.three.Three.FrontFaceDirectionCCW=1,h.three.Three.BasicShadowMap=0,h.three.Three.PCFShadowMap=1,h.three.Three.PCFSoftShadowMap=2,h.three.Three.FrontSide=0,h.three.Three.BackSide=1,h.three.Three.DoubleSide=2,h.three.Three.NoShading=0,h.three.Three.FlatShading=1,h.three.Three.SmoothShading=2,h.three.Three.NoColors=0,h.three.Three.FaceColors=1,h.three.Three.VertexColors=2,h.three.Three.NoBlending=0,h.three.Three.NormalBlending=1,h.three.Three.AdditiveBlending=2,h.three.Three.SubtractiveBlending=3,h.three.Three.MultiplyBlending=4,h.three.Three.CustomBlending=5,h.three.Three.AddEquation=100,h.three.Three.SubtractEquation=101,h.three.Three.ReverseSubtractEquation=102,h.three.Three.ZeroFactor=200,h.three.Three.OneFactor=201,h.three.Three.SrcColorFactor=202,h.three.Three.OneMinusSrcColorFactor=203,h.three.Three.SrcAlphaFactor=204,h.three.Three.OneMinusSrcAlphaFactor=205,h.three.Three.DstAlphaFactor=206,h.three.Three.OneMinusDstAlphaFactor=207,h.three.Three.DstColorFactor=208,h.three.Three.OneMinusDstColorFactor=209,h.three.Three.SrcAlphaSaturateFactor=210,h.three.Three.MultiplyOperation=0,h.three.Three.MixOperation=1,h.three.Three.AddOperation=2,h.three.Three.RepeatWrapping=1e3,h.three.Three.ClampToEdgeWrapping=1001,h.three.Three.MirroredRepeatWrapping=1002,h.three.Three.NearestFilter=1003,h.three.Three.NearestMipMapNearestFilter=1004,h.three.Three.NearestMipMapLinearFilter=1005,h.three.Three.LinearFilter=1006,h.three.Three.LinearMipMapNearestFilter=1007,h.three.Three.LinearMipMapLinearFilter=1008,h.three.Three.UnsignedByteType=1009,h.three.Three.ByteType=1010,h.three.Three.ShortType=1011,h.three.Three.UnsignedShortType=1012,h.three.Three.IntType=1013,h.three.Three.UnsignedIntType=1014,h.three.Three.FloatType=1015,h.three.Three.UnsignedShort4444Type=1016,h.three.Three.UnsignedShort5551Type=1017,h.three.Three.UnsignedShort565Type=1018,h.three.Three.AlphaFormat=1019,h.three.Three.RGBFormat=1020,h.three.Three.RGBAFormat=1021,h.three.Three.LuminanceFormat=1022,h.three.Three.LuminanceAlphaFormat=1023,h.three.Three.RGB_S3TC_DXT1_Format=2001,h.three.Three.RGBA_S3TC_DXT1_Format=2002,h.three.Three.RGBA_S3TC_DXT3_Format=2003,h.three.Three.RGBA_S3TC_DXT5_Format=2004,h.three.Three.LineStrip=0,h.three.Three.LinePieces=1,i.main()}();