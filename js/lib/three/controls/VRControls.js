THREE.VRControls=function(t,i){this._camera=t,this._init=function(){function t(t){for(var n,a,o=0;o<t.length;++o)if(t[o]instanceof PositionSensorVRDevice){n=t[o],e._vrInput=n;break}i&&(n||(a="HMD not available"),i(a))}var e=this;return navigator.mozGetVRDevices||navigator.getVRDevices?void(navigator.getVRDevices?navigator.getVRDevices().then(t):navigator.mozGetVRDevices(t)):void(i&&i("Your browser is not VR Ready"))},this._init(),this.update=function(){var t=this._camera,i=this.getVRState();i&&t&&t.quaternion.fromArray(i.hmd.rotation)},this.getVRState=function(){var t,i,e=this._vrInput;return e?(t=e.getState().orientation,i={hmd:{rotation:[t.x,t.y,t.z,t.w]}}):null}};