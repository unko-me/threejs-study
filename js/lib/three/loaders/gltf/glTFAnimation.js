THREE.glTFAnimator=function(){var t=[];return{add:function(i){t.push(i)},remove:function(i){var s=t.indexOf(i);-1!==s&&t.splice(s,1)},update:function(){for(i=0;i<t.length;i++)t[i].update()}}}(),THREE.glTFAnimation=function(t){this.running=!1,this.loop=!1,this.duration=0,this.startTime=0,this.interps=[],t&&this.createInterpolators(t)},THREE.glTFAnimation.prototype.createInterpolators=function(t){var i,s=t.length;for(i=0;s>i;i++){var e=new THREE.glTFInterpolator(t[i]);this.interps.push(e),this.duration=Math.max(this.duration,e.duration)}},THREE.glTFAnimation.prototype.play=function(){this.running||(this.startTime=Date.now(),this.running=!0,THREE.glTFAnimator.add(this))},THREE.glTFAnimation.prototype.stop=function(){this.running=!1,THREE.glTFAnimator.remove(this)},THREE.glTFAnimation.prototype.update=function(){if(this.running){var t=Date.now(),i=(t-this.startTime)/1e3,s=i%this.duration,e=Math.floor(i/this.duration);if(e>=1&&!this.loop){this.running=!1;var a,h=this.interps.length;for(a=0;h>a;a++)this.interps[a].interp(this.duration);return void this.stop()}var a,h=this.interps.length;for(a=0;h>a;a++)this.interps[a].interp(s)}},THREE.glTFInterpolator=function(t){this.keys=t.keys,this.values=t.values,this.count=t.count,this.type=t.type,this.path=t.path,this.isRot=!1;var i=t.target;switch(i.updateMatrix(),i.matrixAutoUpdate=!0,this.targetNode=i,t.path){case"translation":this.target=i.position,this.originalValue=i.position.clone();break;case"rotation":this.target=i.quaternion,this.originalValue=i.quaternion.clone(),this.isRot=!0;break;case"scale":this.target=i.scale,this.originalValue=i.scale.clone()}this.duration=this.keys[this.count-1],this.vec1=new THREE.Vector3,this.vec2=new THREE.Vector3,this.vec3=new THREE.Vector3,this.quat1=new THREE.Quaternion,this.quat2=new THREE.Quaternion,this.quat3=new THREE.Quaternion},THREE.glTFInterpolator.prototype.interp=function(t){var i;if(t==this.keys[0])this.isRot?this.quat3.set(this.values[0],this.values[1],this.values[2],this.values[3]):this.vec3.set(this.values[0],this.values[1],this.values[2]);else if(t<this.keys[0])this.isRot?(this.quat1.set(this.originalValue.x,this.originalValue.y,this.originalValue.z,this.originalValue.w),this.quat2.set(this.values[0],this.values[1],this.values[2],this.values[3]),THREE.Quaternion.slerp(this.quat1,this.quat2,this.quat3,t/this.keys[0])):(this.vec3.set(this.originalValue.x,this.originalValue.y,this.originalValue.z),this.vec2.set(this.values[0],this.values[1],this.values[2]),this.vec3.lerp(this.vec2,t/this.keys[0]));else if(t>=this.keys[this.count-1])this.isRot?this.quat3.set(this.values[4*(this.count-1)],this.values[4*(this.count-1)+1],this.values[4*(this.count-1)+2],this.values[4*(this.count-1)+3]):this.vec3.set(this.values[3*(this.count-1)],this.values[3*(this.count-1)+1],this.values[3*(this.count-1)+2]);else for(i=0;i<this.count-1;i++){var s=this.keys[i],e=this.keys[i+1];t>=s&&e>=t&&(this.isRot?(this.quat1.set(this.values[4*i],this.values[4*i+1],this.values[4*i+2],this.values[4*i+3]),this.quat2.set(this.values[4*(i+1)],this.values[4*(i+1)+1],this.values[4*(i+1)+2],this.values[4*(i+1)+3]),THREE.Quaternion.slerp(this.quat1,this.quat2,this.quat3,(t-s)/(e-s))):(this.vec3.set(this.values[3*i],this.values[3*i+1],this.values[3*i+2]),this.vec2.set(this.values[3*(i+1)],this.values[3*(i+1)+1],this.values[3*(i+1)+2]),this.vec3.lerp(this.vec2,(t-s)/(e-s))))}this.target&&this.copyValue(this.target)},THREE.glTFInterpolator.prototype.copyValue=function(t){t.copy(this.isRot?this.quat3:this.vec3)};