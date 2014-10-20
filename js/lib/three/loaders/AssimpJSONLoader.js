THREE.AssimpJSONLoader=function(e){this.manager=void 0!==e?e:THREE.DefaultLoadingManager},THREE.AssimpJSONLoader.prototype={constructor:THREE.AssimpJSONLoader,texturePath:"",load:function(e,r,a,t,n){var s=this;this.texturePath=n&&"string"==typeof n?n:this.extractUrlBase(e);var i=new THREE.XHRLoader(this.manager);i.setCrossOrigin(this.crossOrigin),i.load(e,function(e){var a=s.parse(JSON.parse(e));r(a)})},setCrossOrigin:function(e){this.crossOrigin=e},extractUrlBase:function(e){var r=e.split("/");return r.pop(),(r.length<1?".":r.join("/"))+"/"},parse:function(e){var r=this.parseList(e.meshes,this.parseMesh),a=this.parseList(e.materials,this.parseMaterial);return this.parseObject(e,e.rootnode,r,a)},parseList:function(e,r){for(var a=new Array(e.length),t=0;t<e.length;++t)a[t]=r.call(this,e[t]);return a},parseMesh:function(e){function r(e,r,a){var t,n,s,i,o,c;for(t=0,n=r.length;n>t;++t)s=r[t],i=2*s.a,o=2*s.b,c=2*s.c,a.push([new THREE.Vector2(e[i],e[i+1]),new THREE.Vector2(e[o],e[o+1]),new THREE.Vector2(e[c],e[c+1])])}function a(e,r){var a,t,n,s,i,o;for(a=0,t=r.length;t>a;++a)n=r[a],s=3*n.a,i=3*n.b,o=3*n.c,n.vertexNormals=[new THREE.Vector3(e[s],e[s+1],e[s+2]),new THREE.Vector3(e[i],e[i+1],e[i+2]),new THREE.Vector3(e[o],e[o+1],e[o+2])]}function t(e,r){function a(){var e=new THREE.Color;return e.setRGB(arr[0],arr[1],arr[2]),e}var t,n,s,i,o,c;for(t=0,n=r.length;n>t;++t)s=r[t],i=4*s.a,o=4*s.b,c=4*s.c,s.vertexColors=[a(i),a(o),a(c)]}var n,s,i,o,c;for(n=new THREE.Geometry,o=e.vertices,s=0,i=o.length;i>s;)n.vertices.push(new THREE.Vector3(o[s++],o[s++],o[s++]));for(o=e.faces,s=0,i=o.length;i>s;++s)face=new THREE.Face3,c=o[s],face.a=c[0],face.b=c[1],face.c=c[2],face.materialIndex=0,n.faces.push(face);for(e.texturecoords=e.texturecoords||[],s=0,i=e.texturecoords.length;i>s;++s)r(e.texturecoords[s],n.faces,n.faceVertexUvs[s]);return e.normals&&a(e.normals,n.faces),e.colors&&e.colors[0]&&t(e.colors[0],n.faces),n.computeBoundingSphere(),n},parseMaterial:function(e){function r(e){var r=new THREE.Color;return r.setRGB(e[0],e[1],e[2]),r}function a(){var e=new Image;return e.width=1,e.height=1,new THREE.Texture(e)}var t,n,s=null,i=this,o=[],c={shading:THREE.SmoothShading};for(var t in e.properties)n=e.properties[t],"$tex.file"===n.key?(1===n.semantic||5===n.semantic||6===n.semantic||2===n.semantic)&&!function(e){var r,a=new THREE.TextureLoader(i.manager);1===e?r="map":5===e?r="bumpMap":6===e?r="normalMap":2===e&&(r="specularMap"),o.push(r),a.setCrossOrigin(this.crossOrigin);var t=i.texturePath+"/"+n.value;t=t.replace(/\\/g,"/"),a.load(t,function(e){e&&(e.wrapS=e.wrapT=THREE.RepeatWrapping,s[r]=e,s.needsUpdate=!0)})}(n.semantic):"?mat.name"===n.key?c.name=n.value:"$clr.diffuse"===n.key?c.color=r(n.value):"$clr.specular"===n.key?c.specular=r(n.value):"$clr.ambient"===n.key?c.ambient=r(n.value):"$clr.emissive"===n.key?c.emissive=r(n.value):"$mat.shadingm"===n.key?1===n.value&&(c.shading=THREE.FlatShading):"$mat.shininess"===n.key&&(c.shininess=n.value);if(c.ambient||(c.ambient=c.color),o.length)for(t=o.length-1;t>=0;--t)c[o[t]]=a();return s=new THREE.MeshPhongMaterial(c)},parseObject:function(e,r,a,t){var n,s,i=new THREE.Object3D;for(i.name=r.name||"",i.matrix=(new THREE.Matrix4).fromArray(r.transformation).transpose(),i.matrix.decompose(i.position,i.quaternion,i.scale),n=0;r.meshes&&n<r.meshes.length;++n)s=r.meshes[n],i.add(new THREE.Mesh(a[s],t[e.meshes[s].materialindex]));for(n=0;r.children&&n<r.children.length;++n)i.add(this.parseObject(e,r.children[n],a,t));return i}};