THREE.OculusControls=function(t){function e(t,e){return function(){e.apply(t,arguments)}}this.object=t,this.target=new THREE.Vector3(0,0,0),this.headquat=new THREE.Quaternion,this.freeze=!1,this.loadAjaxJSON=function(t,e){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState===n.DONE&&(200===n.status||0===n.status)&&n.responseText){var t=JSON.parse(n.responseText);e(t)}},n.open("GET",t,!0),n.withCredentials=!1,n.send(null)},this.gotCoordinates=function(t){this.headquat.set(t.quat.x,t.quat.y,t.quat.z,t.quat.w),this.queuePoll()},this.pollOnce=function(){this.loadAjaxJSON("http://localhost:50000",e(this,this.gotCoordinates))},this.queuePoll=function(){setTimeout(e(this,this.pollOnce),10)},this.update=function(){this.freeze||this.object.quaternion.multiply(this.headquat)},this.connect=function(){this.queuePoll()}};