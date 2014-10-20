!function(){"use strict";var e=function(e){THREE.MeshBasicMaterial.call(this),this.depthTest=!1,this.depthWrite=!1,this.side=THREE.FrontSide,this.transparent=!0,this.setValues(e),this.oldColor=this.color.clone(),this.oldOpacity=this.opacity,this.highlight=function(e){e?(this.color.setRGB(1,1,0),this.opacity=1):(this.color.copy(this.oldColor),this.opacity=this.oldOpacity)}};e.prototype=Object.create(THREE.MeshBasicMaterial.prototype);var t=function(e){THREE.LineBasicMaterial.call(this),this.depthTest=!1,this.depthWrite=!1,this.transparent=!0,this.linewidth=1,this.setValues(e),this.oldColor=this.color.clone(),this.oldOpacity=this.opacity,this.highlight=function(e){e?(this.color.setRGB(1,1,0),this.opacity=1):(this.color.copy(this.oldColor),this.opacity=this.oldOpacity)}};t.prototype=Object.create(THREE.LineBasicMaterial.prototype),THREE.TransformGizmo=function(){var e=this,t=!1,i=!1;this.init=function(){THREE.Object3D.call(this),this.handles=new THREE.Object3D,this.pickers=new THREE.Object3D,this.planes=new THREE.Object3D,this.add(this.handles),this.add(this.pickers),this.add(this.planes);var e=new THREE.PlaneGeometry(50,50,2,2),t=new THREE.MeshBasicMaterial({wireframe:!0});t.side=THREE.DoubleSide;var i={XY:new THREE.Mesh(e,t),YZ:new THREE.Mesh(e,t),XZ:new THREE.Mesh(e,t),XYZE:new THREE.Mesh(e,t)};this.activePlane=i.XYZE,i.YZ.rotation.set(0,Math.PI/2,0),i.XZ.rotation.set(-Math.PI/2,0,0);for(var a in i)i[a].name=a,this.planes.add(i[a]),this.planes[a]=i[a],i[a].visible=!1;var o=function(e,t){for(var i in e)for(a=e[i].length;a--;){var o=e[i][a][0],n=e[i][a][1],s=e[i][a][2];o.name=i,n&&o.position.set(n[0],n[1],n[2]),s&&o.rotation.set(s[0],s[1],s[2]),t.add(o)}};o(this.handleGizmos,this.handles),o(this.pickerGizmos,this.pickers),this.traverse(function(e){if(e instanceof THREE.Mesh){e.updateMatrix();var t=new THREE.Geometry;t.merge(e.geometry,e.matrix),e.geometry=t,e.position.set(0,0,0),e.rotation.set(0,0,0),e.scale.set(1,1,1)}})},this.hide=function(){this.traverse(function(e){e.visible=!1})},this.show=function(){this.traverse(function(i){i.visible=!0,i.parent==e.pickers&&(i.visible=t),i.parent==e.planes&&(i.visible=!1)}),this.activePlane.visible=i},this.highlight=function(e){this.traverse(function(t){t.material&&t.material.highlight&&t.material.highlight(t.name==e?!0:!1)})}},THREE.TransformGizmo.prototype=Object.create(THREE.Object3D.prototype),THREE.TransformGizmo.prototype.update=function(e,t){var i=new THREE.Vector3(0,0,0),a=new THREE.Vector3(0,1,0),o=new THREE.Matrix4;this.traverse(function(n){-1!=n.name.search("E")?n.quaternion.setFromRotationMatrix(o.lookAt(t,i,a)):(-1!=n.name.search("X")||-1!=n.name.search("Y")||-1!=n.name.search("Z"))&&n.quaternion.setFromEuler(e)})},THREE.TransformGizmoTranslate=function(){THREE.TransformGizmo.call(this);var i=new THREE.Geometry,a=new THREE.Mesh(new THREE.CylinderGeometry(0,.05,.2,12,1,!1));a.position.y=.5,a.updateMatrix(),i.merge(a.geometry,a.matrix);var o=new THREE.Geometry;o.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0));var n=new THREE.Geometry;n.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,1,0));var s=new THREE.Geometry;s.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,1)),this.handleGizmos={X:[[new THREE.Mesh(i,new e({color:16711680})),[.5,0,0],[0,0,-Math.PI/2]],[new THREE.Line(o,new t({color:16711680}))]],Y:[[new THREE.Mesh(i,new e({color:65280})),[0,.5,0]],[new THREE.Line(n,new t({color:65280}))]],Z:[[new THREE.Mesh(i,new e({color:255})),[0,0,.5],[Math.PI/2,0,0]],[new THREE.Line(s,new t({color:255}))]],XYZ:[[new THREE.Mesh(new THREE.OctahedronGeometry(.1,0),new e({color:16777215,opacity:.25})),[0,0,0],[0,0,0]]],XY:[[new THREE.Mesh(new THREE.PlaneGeometry(.29,.29),new e({color:16776960,opacity:.25})),[.15,.15,0]]],YZ:[[new THREE.Mesh(new THREE.PlaneGeometry(.29,.29),new e({color:65535,opacity:.25})),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new THREE.Mesh(new THREE.PlaneGeometry(.29,.29),new e({color:16711935,opacity:.25})),[.15,0,.15],[-Math.PI/2,0,0]]]},this.pickerGizmos={X:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new e({color:16711680,opacity:.25})),[.6,0,0],[0,0,-Math.PI/2]]],Y:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new e({color:65280,opacity:.25})),[0,.6,0]]],Z:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new e({color:255,opacity:.25})),[0,0,.6],[Math.PI/2,0,0]]],XYZ:[[new THREE.Mesh(new THREE.OctahedronGeometry(.2,0),new e({color:16777215,opacity:.25}))]],XY:[[new THREE.Mesh(new THREE.PlaneGeometry(.4,.4),new e({color:16776960,opacity:.25})),[.2,.2,0]]],YZ:[[new THREE.Mesh(new THREE.PlaneGeometry(.4,.4),new e({color:65535,opacity:.25})),[0,.2,.2],[0,Math.PI/2,0]]],XZ:[[new THREE.Mesh(new THREE.PlaneGeometry(.4,.4),new e({color:16711935,opacity:.25})),[.2,0,.2],[-Math.PI/2,0,0]]]},this.setActivePlane=function(e,t){var i=new THREE.Matrix4;t.applyMatrix4(i.getInverse(i.extractRotation(this.planes.XY.matrixWorld))),"X"==e&&(this.activePlane=this.planes.XY,Math.abs(t.y)>Math.abs(t.z)&&(this.activePlane=this.planes.XZ)),"Y"==e&&(this.activePlane=this.planes.XY,Math.abs(t.x)>Math.abs(t.z)&&(this.activePlane=this.planes.YZ)),"Z"==e&&(this.activePlane=this.planes.XZ,Math.abs(t.x)>Math.abs(t.y)&&(this.activePlane=this.planes.YZ)),"XYZ"==e&&(this.activePlane=this.planes.XYZE),"XY"==e&&(this.activePlane=this.planes.XY),"YZ"==e&&(this.activePlane=this.planes.YZ),"XZ"==e&&(this.activePlane=this.planes.XZ),this.hide(),this.show()},this.init()},THREE.TransformGizmoTranslate.prototype=Object.create(THREE.TransformGizmo.prototype),THREE.TransformGizmoRotate=function(){THREE.TransformGizmo.call(this);var i=function(e,t,i){var a=new THREE.Geometry;i=i?i:1;for(var o=0;64*i>=o;++o)"x"==t&&a.vertices.push(new THREE.Vector3(0,Math.cos(o/32*Math.PI),Math.sin(o/32*Math.PI)).multiplyScalar(e)),"y"==t&&a.vertices.push(new THREE.Vector3(Math.cos(o/32*Math.PI),0,Math.sin(o/32*Math.PI)).multiplyScalar(e)),"z"==t&&a.vertices.push(new THREE.Vector3(Math.sin(o/32*Math.PI),Math.cos(o/32*Math.PI),0).multiplyScalar(e));return a};this.handleGizmos={X:[[new THREE.Line(new i(1,"x",.5),new t({color:16711680}))]],Y:[[new THREE.Line(new i(1,"y",.5),new t({color:65280}))]],Z:[[new THREE.Line(new i(1,"z",.5),new t({color:255}))]],E:[[new THREE.Line(new i(1.25,"z",1),new t({color:13421568}))]],XYZE:[[new THREE.Line(new i(1,"z",1),new t({color:7895160}))]]},this.pickerGizmos={X:[[new THREE.Mesh(new THREE.TorusGeometry(1,.12,4,12,Math.PI),new e({color:16711680,opacity:.25})),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new THREE.Mesh(new THREE.TorusGeometry(1,.12,4,12,Math.PI),new e({color:65280,opacity:.25})),[0,0,0],[Math.PI/2,0,0]]],Z:[[new THREE.Mesh(new THREE.TorusGeometry(1,.12,4,12,Math.PI),new e({color:255,opacity:.25})),[0,0,0],[0,0,-Math.PI/2]]],E:[[new THREE.Mesh(new THREE.TorusGeometry(1.25,.12,2,24),new e({color:16776960,opacity:.25}))]],XYZE:[[new THREE.Mesh(new THREE.Geometry)]]},this.setActivePlane=function(e){"E"==e&&(this.activePlane=this.planes.XYZE),"X"==e&&(this.activePlane=this.planes.YZ),"Y"==e&&(this.activePlane=this.planes.XZ),"Z"==e&&(this.activePlane=this.planes.XY),this.hide(),this.show()},this.update=function(e,t){THREE.TransformGizmo.prototype.update.apply(this,arguments);var i=({handles:this.handles,pickers:this.pickers},new THREE.Matrix4),a=new THREE.Euler(0,0,1),o=new THREE.Quaternion,n=new THREE.Vector3(1,0,0),s=new THREE.Vector3(0,1,0),r=new THREE.Vector3(0,0,1),c=new THREE.Quaternion,h=new THREE.Quaternion,E=new THREE.Quaternion,l=t.clone();a.copy(this.planes.XY.rotation),o.setFromEuler(a),i.makeRotationFromQuaternion(o).getInverse(i),l.applyMatrix4(i),this.traverse(function(e){o.setFromEuler(a),"X"==e.name&&(c.setFromAxisAngle(n,Math.atan2(-l.y,l.z)),o.multiplyQuaternions(o,c),e.quaternion.copy(o)),"Y"==e.name&&(h.setFromAxisAngle(s,Math.atan2(l.x,l.z)),o.multiplyQuaternions(o,h),e.quaternion.copy(o)),"Z"==e.name&&(E.setFromAxisAngle(r,Math.atan2(l.y,l.x)),o.multiplyQuaternions(o,E),e.quaternion.copy(o))})},this.init()},THREE.TransformGizmoRotate.prototype=Object.create(THREE.TransformGizmo.prototype),THREE.TransformGizmoScale=function(){THREE.TransformGizmo.call(this);var i=new THREE.Geometry,a=new THREE.Mesh(new THREE.BoxGeometry(.125,.125,.125));a.position.y=.5,a.updateMatrix(),i.merge(a.geometry,a.matrix);var o=new THREE.Geometry;o.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(1,0,0));var n=new THREE.Geometry;n.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,1,0));var s=new THREE.Geometry;s.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,1)),this.handleGizmos={X:[[new THREE.Mesh(i,new e({color:16711680})),[.5,0,0],[0,0,-Math.PI/2]],[new THREE.Line(o,new t({color:16711680}))]],Y:[[new THREE.Mesh(i,new e({color:65280})),[0,.5,0]],[new THREE.Line(n,new t({color:65280}))]],Z:[[new THREE.Mesh(i,new e({color:255})),[0,0,.5],[Math.PI/2,0,0]],[new THREE.Line(s,new t({color:255}))]],XYZ:[[new THREE.Mesh(new THREE.BoxGeometry(.125,.125,.125),new e({color:16777215,opacity:.25}))]]},this.pickerGizmos={X:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new e({color:16711680,opacity:.25})),[.6,0,0],[0,0,-Math.PI/2]]],Y:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new e({color:65280,opacity:.25})),[0,.6,0]]],Z:[[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new e({color:255,opacity:.25})),[0,0,.6],[Math.PI/2,0,0]]],XYZ:[[new THREE.Mesh(new THREE.BoxGeometry(.4,.4,.4),new e({color:16777215,opacity:.25}))]]},this.setActivePlane=function(e,t){var i=new THREE.Matrix4;t.applyMatrix4(i.getInverse(i.extractRotation(this.planes.XY.matrixWorld))),"X"==e&&(this.activePlane=this.planes.XY,Math.abs(t.y)>Math.abs(t.z)&&(this.activePlane=this.planes.XZ)),"Y"==e&&(this.activePlane=this.planes.XY,Math.abs(t.x)>Math.abs(t.z)&&(this.activePlane=this.planes.YZ)),"Z"==e&&(this.activePlane=this.planes.XZ,Math.abs(t.x)>Math.abs(t.y)&&(this.activePlane=this.planes.YZ)),"XYZ"==e&&(this.activePlane=this.planes.XYZE),this.hide(),this.show()},this.init()},THREE.TransformGizmoScale.prototype=Object.create(THREE.TransformGizmo.prototype),THREE.TransformControls=function(e,t){function i(e){if(void 0!==r.object&&c!==!0){e.preventDefault();var t=e.changedTouches?e.changedTouches[0]:e,i=s(t,r.gizmo[h].pickers.children);i?(r.axis=i.object.name,r.update(),r.dispatchEvent(E)):null!==r.axis&&(r.axis=null,r.update(),r.dispatchEvent(E))}}function a(e){if(void 0!==r.object&&c!==!0){e.preventDefault(),e.stopPropagation();var t=e.changedTouches?e.changedTouches[0]:e;if(0===t.button||void 0===t.button){var i=s(t,r.gizmo[h].pickers.children);if(i){r.axis=i.object.name,r.update(),d.copy(O).sub(A).normalize(),r.gizmo[h].setActivePlane(r.axis,d);var a=s(t,[r.gizmo[h].activePlane]);j.copy(r.object.position),Z.copy(r.object.scale),I.extractRotation(r.object.matrix),L.extractRotation(r.object.matrixWorld),V.extractRotation(r.object.parent.matrixWorld),F.setFromMatrixScale(M.getInverse(r.object.parent.matrixWorld)),w.copy(a.point)}}c=!0}}function o(e){if(void 0!==r.object&&null!==r.axis&&c!==!1){e.preventDefault(),e.stopPropagation();var t=e.changedTouches?e.changedTouches[0]:e,i=s(t,[r.gizmo[h].activePlane]);T.copy(i.point),"translate"==h?(T.sub(w),T.multiply(F),"local"==r.space&&(T.applyMatrix4(M.getInverse(L)),-1==r.axis.search("X")&&(T.x=0),-1==r.axis.search("Y")&&(T.y=0),-1==r.axis.search("Z")&&(T.z=0),T.applyMatrix4(I),r.object.position.copy(j),r.object.position.add(T)),("world"==r.space||-1!=r.axis.search("XYZ"))&&(-1==r.axis.search("X")&&(T.x=0),-1==r.axis.search("Y")&&(T.y=0),-1==r.axis.search("Z")&&(T.z=0),T.applyMatrix4(M.getInverse(V)),r.object.position.copy(j),r.object.position.add(T)),null!==r.snap&&(-1!=r.axis.search("X")&&(r.object.position.x=Math.round(r.object.position.x/r.snap)*r.snap),-1!=r.axis.search("Y")&&(r.object.position.y=Math.round(r.object.position.y/r.snap)*r.snap),-1!=r.axis.search("Z")&&(r.object.position.z=Math.round(r.object.position.z/r.snap)*r.snap))):"scale"==h?(T.sub(w),T.multiply(F),"local"==r.space&&("XYZ"==r.axis?(y=1+T.y/50,r.object.scale.x=Z.x*y,r.object.scale.y=Z.y*y,r.object.scale.z=Z.z*y):(T.applyMatrix4(M.getInverse(L)),"X"==r.axis&&(r.object.scale.x=Z.x*(1+T.x/50)),"Y"==r.axis&&(r.object.scale.y=Z.y*(1+T.y/50)),"Z"==r.axis&&(r.object.scale.z=Z.z*(1+T.z/50))))):"rotate"==h&&(T.sub(A),T.multiply(F),x.copy(w).sub(A),x.multiply(F),"E"==r.axis?(T.applyMatrix4(M.getInverse(H)),x.applyMatrix4(M.getInverse(H)),R.set(Math.atan2(T.z,T.y),Math.atan2(T.x,T.z),Math.atan2(T.y,T.x)),u.set(Math.atan2(x.z,x.y),Math.atan2(x.x,x.z),Math.atan2(x.y,x.x)),v.setFromRotationMatrix(M.getInverse(V)),Y.setFromAxisAngle(d,R.z-u.z),f.setFromRotationMatrix(L),v.multiplyQuaternions(v,Y),v.multiplyQuaternions(v,f),r.object.quaternion.copy(v)):"XYZE"==r.axis?(Y.setFromEuler(T.clone().cross(x).normalize()),v.setFromRotationMatrix(M.getInverse(V)),P.setFromAxisAngle(Y,-T.clone().angleTo(x)),f.setFromRotationMatrix(L),v.multiplyQuaternions(v,P),v.multiplyQuaternions(v,f),r.object.quaternion.copy(v)):"local"==r.space?(T.applyMatrix4(M.getInverse(L)),x.applyMatrix4(M.getInverse(L)),R.set(Math.atan2(T.z,T.y),Math.atan2(T.x,T.z),Math.atan2(T.y,T.x)),u.set(Math.atan2(x.z,x.y),Math.atan2(x.x,x.z),Math.atan2(x.y,x.x)),f.setFromRotationMatrix(I),P.setFromAxisAngle(z,R.x-u.x),G.setFromAxisAngle(g,R.y-u.y),X.setFromAxisAngle(b,R.z-u.z),"X"==r.axis&&f.multiplyQuaternions(f,P),"Y"==r.axis&&f.multiplyQuaternions(f,G),"Z"==r.axis&&f.multiplyQuaternions(f,X),r.object.quaternion.copy(f)):"world"==r.space&&(R.set(Math.atan2(T.z,T.y),Math.atan2(T.x,T.z),Math.atan2(T.y,T.x)),u.set(Math.atan2(x.z,x.y),Math.atan2(x.x,x.z),Math.atan2(x.y,x.x)),v.setFromRotationMatrix(M.getInverse(V)),P.setFromAxisAngle(z,R.x-u.x),G.setFromAxisAngle(g,R.y-u.y),X.setFromAxisAngle(b,R.z-u.z),f.setFromRotationMatrix(L),"X"==r.axis&&v.multiplyQuaternions(v,P),"Y"==r.axis&&v.multiplyQuaternions(v,G),"Z"==r.axis&&v.multiplyQuaternions(v,X),v.multiplyQuaternions(v,f),r.object.quaternion.copy(v))),r.update(),r.dispatchEvent(E)}}function n(e){c=!1,i(e)}function s(i,a){var o=t.getBoundingClientRect(),n=(i.clientX-o.left)/o.width,s=(i.clientY-o.top)/o.height;m.set(2*n-1,2*-s+1,.5),p.unprojectVector(m,e),l.set(O,m.sub(O).normalize());var r=l.intersectObjects(a,!0);return r[0]?r[0]:!1}THREE.Object3D.call(this),t=void 0!==t?t:document,this.gizmo={},this.gizmo.translate=new THREE.TransformGizmoTranslate,this.gizmo.rotate=new THREE.TransformGizmoRotate,this.gizmo.scale=new THREE.TransformGizmoScale,this.add(this.gizmo.translate),this.add(this.gizmo.rotate),this.add(this.gizmo.scale),this.gizmo.translate.hide(),this.gizmo.rotate.hide(),this.gizmo.scale.hide(),this.object=void 0,this.snap=null,this.space="world",this.size=1,this.axis=null;var r=this,c=!1,h="translate",E={type:"change"},l=new THREE.Raycaster,p=new THREE.Projector,m=new THREE.Vector3,T=new THREE.Vector3,w=new THREE.Vector3,R=new THREE.Vector3,u=new THREE.Vector3,y=1,H=new THREE.Matrix4,d=new THREE.Vector3,M=new THREE.Matrix4,x=new THREE.Vector3,v=new THREE.Quaternion,z=new THREE.Vector3(1,0,0),g=new THREE.Vector3(0,1,0),b=new THREE.Vector3(0,0,1),f=new THREE.Quaternion,P=new THREE.Quaternion,G=new THREE.Quaternion,X=new THREE.Quaternion,Y=new THREE.Quaternion,j=new THREE.Vector3,Z=new THREE.Vector3,I=new THREE.Matrix4,V=new THREE.Matrix4,F=new THREE.Vector3,A=new THREE.Vector3,Q=new THREE.Euler,L=new THREE.Matrix4,O=new THREE.Vector3,k=new THREE.Euler;t.addEventListener("mousedown",a,!1),t.addEventListener("touchstart",a,!1),t.addEventListener("mousemove",i,!1),t.addEventListener("touchmove",i,!1),t.addEventListener("mousemove",o,!1),t.addEventListener("touchmove",o,!1),t.addEventListener("mouseup",n,!1),t.addEventListener("mouseout",n,!1),t.addEventListener("touchend",n,!1),t.addEventListener("touchcancel",n,!1),t.addEventListener("touchleave",n,!1),this.attach=function(e){r.object=e,this.gizmo.translate.hide(),this.gizmo.rotate.hide(),this.gizmo.scale.hide(),this.gizmo[h].show(),r.update()},this.detach=function(){r.object=void 0,this.axis=void 0,this.gizmo.translate.hide(),this.gizmo.rotate.hide(),this.gizmo.scale.hide()},this.setMode=function(e){h=e?e:h,"scale"==h&&(r.space="local"),this.gizmo.translate.hide(),this.gizmo.rotate.hide(),this.gizmo.scale.hide(),this.gizmo[h].show(),this.update(),r.dispatchEvent(E)},this.setSnap=function(e){r.snap=e},this.setSize=function(e){r.size=e,this.update(),r.dispatchEvent(E)},this.setSpace=function(e){r.space=e,this.update(),r.dispatchEvent(E)},this.update=function(){void 0!==r.object&&(r.object.updateMatrixWorld(),A.setFromMatrixPosition(r.object.matrixWorld),Q.setFromRotationMatrix(M.extractRotation(r.object.matrixWorld)),e.updateMatrixWorld(),O.setFromMatrixPosition(e.matrixWorld),k.setFromRotationMatrix(M.extractRotation(e.matrixWorld)),y=A.distanceTo(O)/6*r.size,this.position.copy(A),this.scale.set(y,y,y),d.copy(O).sub(A).normalize(),"local"==r.space?this.gizmo[h].update(Q,d):"world"==r.space&&this.gizmo[h].update(new THREE.Euler,d),this.gizmo[h].highlight(r.axis))}},THREE.TransformControls.prototype=Object.create(THREE.Object3D.prototype)}();