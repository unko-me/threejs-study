(function(){var t,e,o=function(t,e){return function(){return t.apply(e,arguments)}};e="\u3061\u3087\u3063\u3068\u3060\u3051\u3000\u8efd\u3044\u6c17\u6301\u3061\u304c\u3000\u91cd\u3044\u7f6a",t=function(){function t(t){this.world=t,this._updateCamera=o(this._updateCamera,this),this.update=o(this.update,this)}return t.prototype.setup=function(){return this._setupCamera(),this._setupLight(),this._setupText()},t.prototype.update=function(){return this._yurayura()},t.prototype._angle=0,t.prototype._updateCamera=function(){return this.world.camera.position.x+=20*Math.sin(this._angle+=.2),this.world.camera.position.y+=20*Math.cos(.2*this._angle)},t.prototype._yurayura=function(){var t,e,o,n,r,i;for(i=this._text.geometry.vertices,t=n=0,r=i.length;r>n;t=++n)o=i[t],e=this.originalBox.vertices[t],o.x+=.1*(e.x-(o.x+(10*Math.random()-5))),o.y+=.1*(e.y-(o.y+(10*Math.random()-5))),o.z+=.1*(e.z-(o.z+(10*Math.random()-5)));return this._text.geometry.verticesNeedUpdate=!0},t.prototype._setupLight=function(){var t;return t=new THREE.AmbientLight("#333333"),t.position.set(0,100,-100),this.world.scene.add(t)},t.prototype._setupCamera=function(){return this.world.camera.position.set(0,0,170)},t.prototype._setupText=function(){var t,e,o,n,r,i;/*
      {
         "cssFontWeight" : "normal",
         "ascender" : 1228,
         "underlinePosition" : -125,
         "cssFontStyle" : "normal",
         "boundingBox" :
        {
           "yMin" : -277.796875,
           "xMin" : 231.96875,
           "yMax" : 1226.484375,
           "xMax" : 1389
        },
         "resolution" : 1000,
         "original_font_information" :
        {
           "postscript_name" : "PixelMplus12-Regular",
           "version_string" : "Version 2013.0602 ",
           "vendor_url" : "",
           "full_font_name" : "PixelMplus12 Regular",
           "font_family_name" : "PixelMplus12",
           "copyright" : "Copyright (C) 2013 M+ Font Project",
           "description" : "",
           "trademark" : "",
           "designer" : "",
           "designer_url" : "",
           "unique_font_identifier" : "FontForge 2.0 : PixelMplus12 Regular : 2-6-2013",
           "license_url" : "",
           "license_description" : "",
           "manufacturer_name" : "",
           "font_sub_family_name" : "Regular"
        },
         "descender" : -278,
         "familyName" : "PixelMplus12",
         "lineHeight" : 1506,
         "underlineThickness" : 50
      }
       */
return i=this._getText(),n=new THREE.TextGeometry(i,{size:80,height:20,curveSegments:2,font:"pixelmplus12"}),n.computeBoundingBox(),t=-.5*(n.boundingBox.max.x-n.boundingBox.min.x),r=new THREE.MeshPhongMaterial({color:16777215*Math.random()+65535,overdraw:.5}),o=new THREE.Mesh(n,r),o.position.x=t,o.position.y=0,o.position.z=0,o.rotation.x=0,o.rotation.y=2*Math.PI,e=new THREE.Object3D,e.add(o),this.world.scene.add(e),this._text=o,this.originalBox=this._text.geometry.clone()},t.prototype._getText=function(){var t,o;return o=e,t=document.location.hash.substr(1),0!==t.length&&(o=t),o},t}(),"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof exports?exports.WordArtWorld=t:window.WordArtWorld=t}).call(this);