THREE.MTLLoader=function(t,r,e){this.baseUrl=t,this.options=r,this.crossOrigin=e},THREE.MTLLoader.prototype={constructor:THREE.MTLLoader,load:function(t,r){var e=this,a=new THREE.XHRLoader;a.setCrossOrigin(this.crossOrigin),a.load(t,function(t){r(e.parse(t))})},parse:function(t){for(var r=t.split("\n"),e={},a=/\s+/,i={},s=0;s<r.length;s++){var o=r[s];if(o=o.trim(),0!==o.length&&"#"!==o.charAt(0)){var n=o.indexOf(" "),h=n>=0?o.substring(0,n):o;h=h.toLowerCase();var p=n>=0?o.substring(n+1):"";if(p=p.trim(),"newmtl"===h)e={name:p},i[p]=e;else if(e)if("ka"===h||"kd"===h||"ks"===h){var l=p.split(a,3);e[h]=[parseFloat(l[0]),parseFloat(l[1]),parseFloat(l[2])]}else e[h]=p}}var E=new THREE.MTLLoader.MaterialCreator(this.baseUrl,this.options);return E.setMaterials(i),E}},THREE.MTLLoader.MaterialCreator=function(t,r){this.baseUrl=t,this.options=r,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.side=this.options&&this.options.side?this.options.side:THREE.FrontSide,this.wrap=this.options&&this.options.wrap?this.options.wrap:THREE.RepeatWrapping},THREE.MTLLoader.MaterialCreator.prototype={constructor:THREE.MTLLoader.MaterialCreator,setMaterials:function(t){this.materialsInfo=this.convert(t),this.materials={},this.materialsArray=[],this.nameLookup={}},convert:function(t){if(!this.options)return t;var r={};for(var e in t){var a=t[e],i={};r[e]=i;for(var s in a){var o=!0,n=a[s],h=s.toLowerCase();switch(h){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(n=[n[0]/255,n[1]/255,n[2]/255]),this.options&&this.options.ignoreZeroRGBs&&0===n[0]&&0===n[1]&&0===n[1]&&(o=!1);break;case"d":this.options&&this.options.invertTransparency&&(n=1-n)}o&&(i[h]=n)}}return r},preload:function(){for(var t in this.materialsInfo)this.create(t)},getIndex:function(t){return this.nameLookup[t]},getAsArray:function(){var t=0;for(var r in this.materialsInfo)this.materialsArray[t]=this.create(r),this.nameLookup[r]=t,t++;return this.materialsArray},create:function(t){return void 0===this.materials[t]&&this.createMaterial_(t),this.materials[t]},createMaterial_:function(t){var r=this.materialsInfo[t],e={name:t,side:this.side};for(var a in r){var i=r[a];switch(a.toLowerCase()){case"kd":e.diffuse=(new THREE.Color).fromArray(i);break;case"ka":e.ambient=(new THREE.Color).fromArray(i);break;case"ks":e.specular=(new THREE.Color).fromArray(i);break;case"map_kd":e.map=this.loadTexture(this.baseUrl+i),e.map.wrapS=this.wrap,e.map.wrapT=this.wrap;break;case"ns":e.shininess=i;break;case"d":1>i&&(e.transparent=!0,e.opacity=i)}}return e.diffuse&&(e.ambient||(e.ambient=e.diffuse),e.color=e.diffuse),this.materials[t]=new THREE.MeshPhongMaterial(e),this.materials[t]},loadTexture:function(t,r,e){var a,i=THREE.Loader.Handlers.get(t);return null!==i?a=i.load(t,e):(a=new THREE.Texture,i=new THREE.ImageLoader,i.crossOrigin=this.crossOrigin,i.load(t,function(t){a.image=THREE.MTLLoader.ensurePowerOfTwo_(t),a.needsUpdate=!0,e&&e(a)})),a.mapping=r,a}},THREE.MTLLoader.ensurePowerOfTwo_=function(t){if(!THREE.Math.isPowerOfTwo(t.width)||!THREE.Math.isPowerOfTwo(t.height)){var r=document.createElement("canvas");r.width=THREE.MTLLoader.nextHighestPowerOfTwo_(t.width),r.height=THREE.MTLLoader.nextHighestPowerOfTwo_(t.height);var e=r.getContext("2d");return e.drawImage(t,0,0,t.width,t.height,0,0,r.width,r.height),r}return t},THREE.MTLLoader.nextHighestPowerOfTwo_=function(t){--t;for(var r=1;32>r;r<<=1)t|=t>>r;return t+1},THREE.EventDispatcher.prototype.apply(THREE.MTLLoader.prototype);