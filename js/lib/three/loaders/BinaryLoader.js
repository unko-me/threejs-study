THREE.BinaryLoader=function(r){THREE.Loader.call(this,r)},THREE.BinaryLoader.prototype=Object.create(THREE.Loader.prototype),THREE.BinaryLoader.prototype.load=function(r,e,t,n){t=t||this.extractUrlBase(r),n=n||this.extractUrlBase(r);var a=this.showProgress?THREE.Loader.prototype.updateProgress:void 0;this.onLoadStart(),this.loadAjaxJSON(this,r,e,t,n,a)},THREE.BinaryLoader.prototype.loadAjaxJSON=function(r,e,t,n,a,o){var E=new XMLHttpRequest;n=n&&"string"==typeof n?n:this.extractUrlBase(e),a=a&&"string"==typeof a?a:this.extractUrlBase(e),E.onreadystatechange=function(){if(4==E.readyState)if(200==E.status||0==E.status){var i=JSON.parse(E.responseText);r.loadAjaxBuffers(i,t,a,n,o)}else console.error("THREE.BinaryLoader: Couldn't load ["+e+"] ["+E.status+"]")},E.open("GET",e,!0),E.send(null)},THREE.BinaryLoader.prototype.loadAjaxBuffers=function(r,e,t,n,a){var o=this,E=new XMLHttpRequest,i=t+r.buffers;E.addEventListener("load",function(){var t=E.response;if(void 0===t&&(t=new Uint8Array(E.responseBody).buffer),0==t.byteLength)for(var t=new ArrayBuffer(E.responseText.length),a=new Uint8Array(t),i=0,s=E.responseText.length;s>i;i++)a[i]=255&E.responseText.charCodeAt(i);o.createBinModel(t,e,n,r.materials)},!1),void 0!==a&&E.addEventListener("progress",function(r){r.lengthComputable&&a(r)},!1),E.addEventListener("error",function(){console.error("THREE.BinaryLoader: Couldn't load ["+i+"] ["+E.status+"]")},!1),E.open("GET",i,!0),E.responseType="arraybuffer",E.overrideMimeType&&E.overrideMimeType("text/plain; charset=x-user-defined"),E.send(null)},THREE.BinaryLoader.prototype.createBinModel=function(r,e,t,n){var a=function(){function e(r){return r%4?4-r%4:0}function t(r,e){var t={signature:n(r,e,12),header_bytes:a(r,e+12),vertex_coordinate_bytes:a(r,e+13),normal_coordinate_bytes:a(r,e+14),uv_coordinate_bytes:a(r,e+15),vertex_index_bytes:a(r,e+16),normal_index_bytes:a(r,e+17),uv_index_bytes:a(r,e+18),material_index_bytes:a(r,e+19),nvertices:o(r,e+20),nnormals:o(r,e+20+4),nuvs:o(r,e+20+8),ntri_flat:o(r,e+20+12),ntri_smooth:o(r,e+20+16),ntri_flat_uv:o(r,e+20+20),ntri_smooth_uv:o(r,e+20+24),nquad_flat:o(r,e+20+28),nquad_smooth:o(r,e+20+32),nquad_flat_uv:o(r,e+20+36),nquad_smooth_uv:o(r,e+20+40)};return t}function n(r,e,t){for(var n=new Uint8Array(r,e,t),a="",o=0;t>o;o++)a+=String.fromCharCode(n[e+o]);return a}function a(r,e){var t=new Uint8Array(r,e,1);return t[0]}function o(r,e){var t=new Uint32Array(r,e,1);return t[0]}function E(e){var t,n,a,o,E=H.nvertices,i=new Float32Array(r,e,3*E);for(t=0;E>t;t++)n=i[3*t],a=i[3*t+1],o=i[3*t+2],G.vertices.push(new THREE.Vector3(n,a,o));return 3*E*Float32Array.BYTES_PER_ELEMENT}function i(e){var t=H.nnormals;if(t){var n,a,o,E,i=new Int8Array(r,e,3*t);for(n=0;t>n;n++)a=i[3*n],o=i[3*n+1],E=i[3*n+2],I.push(a/127,o/127,E/127)}return 3*t*Int8Array.BYTES_PER_ELEMENT}function s(e){var t=H.nuvs;if(t){var n,a,o,E=new Float32Array(r,e,2*t);for(n=0;t>n;n++)a=E[2*n],o=E[2*n+1],X.push(a,o)}return 2*t*Float32Array.BYTES_PER_ELEMENT}function _(e,t){var n,a,o,E,i,s,_,u,f,c,y=new Uint32Array(r,t,3*e);for(n=0;e>n;n++)a=y[3*n],o=y[3*n+1],E=y[3*n+2],i=X[2*a],u=X[2*a+1],s=X[2*o],f=X[2*o+1],_=X[2*E],c=X[2*E+1],G.faceVertexUvs[0].push([new THREE.Vector2(i,u),new THREE.Vector2(s,f),new THREE.Vector2(_,c)])}function u(e,t){var n,a,o,E,i,s,_,u,f,c,y,T,l,v=new Uint32Array(r,t,4*e);for(n=0;e>n;n++)a=v[4*n],o=v[4*n+1],E=v[4*n+2],i=v[4*n+3],s=X[2*a],c=X[2*a+1],_=X[2*o],y=X[2*o+1],u=X[2*E],T=X[2*E+1],f=X[2*i],l=X[2*i+1],G.faceVertexUvs[0].push([new THREE.Vector2(s,c),new THREE.Vector2(_,y),new THREE.Vector2(f,l)]),G.faceVertexUvs[0].push([new THREE.Vector2(_,y),new THREE.Vector2(u,T),new THREE.Vector2(f,l)])}function f(e,t,n){var a,o,E,i,s,_=new Uint32Array(r,t,3*e),u=new Uint16Array(r,n,e);for(a=0;e>a;a++)o=_[3*a],E=_[3*a+1],i=_[3*a+2],s=u[a],G.faces.push(new THREE.Face3(o,E,i,null,null,s))}function c(e,t,n){var a,o,E,i,s,_,u=new Uint32Array(r,t,4*e),f=new Uint16Array(r,n,e);for(a=0;e>a;a++)o=u[4*a],E=u[4*a+1],i=u[4*a+2],s=u[4*a+3],_=f[a],G.faces.push(new THREE.Face3(o,E,s,null,null,_)),G.faces.push(new THREE.Face3(E,i,s,null,null,_))}function y(e,t,n,a){var o,E,i,s,_,u,f,c,y=new Uint32Array(r,t,3*e),T=new Uint32Array(r,n,3*e),l=new Uint16Array(r,a,e);for(o=0;e>o;o++){E=y[3*o],i=y[3*o+1],s=y[3*o+2],u=T[3*o],f=T[3*o+1],c=T[3*o+2],_=l[o];var v=I[3*u],d=I[3*u+1],R=I[3*u+2],h=I[3*f],p=I[3*f+1],w=I[3*f+2],A=I[3*c],H=I[3*c+1],U=I[3*c+2];G.faces.push(new THREE.Face3(E,i,s,[new THREE.Vector3(v,d,R),new THREE.Vector3(h,p,w),new THREE.Vector3(A,H,U)],null,_))}}function T(e,t,n,a){var o,E,i,s,_,u,f,c,y,T,l=new Uint32Array(r,t,4*e),v=new Uint32Array(r,n,4*e),d=new Uint16Array(r,a,e);for(o=0;e>o;o++){E=l[4*o],i=l[4*o+1],s=l[4*o+2],_=l[4*o+3],f=v[4*o],c=v[4*o+1],y=v[4*o+2],T=v[4*o+3],u=d[o];var R=I[3*f],h=I[3*f+1],p=I[3*f+2],w=I[3*c],A=I[3*c+1],H=I[3*c+2],U=I[3*y],m=I[3*y+1],x=I[3*y+2],B=I[3*T],L=I[3*T+1],b=I[3*T+2];G.faces.push(new THREE.Face3(E,i,_,[new THREE.Vector3(R,h,p),new THREE.Vector3(w,A,H),new THREE.Vector3(B,L,b)],null,u)),G.faces.push(new THREE.Face3(i,s,_,[new THREE.Vector3(w,A,H),new THREE.Vector3(U,m,x),new THREE.Vector3(B,L,b)],null,u))}}function l(r){var e=H.ntri_flat;if(e){var t=r+e*Uint32Array.BYTES_PER_ELEMENT*3;f(e,r,t)}}function v(r){var e=H.ntri_flat_uv;if(e){var t=r+e*Uint32Array.BYTES_PER_ELEMENT*3,n=t+e*Uint32Array.BYTES_PER_ELEMENT*3;f(e,r,n),_(e,t)}}function d(r){var e=H.ntri_smooth;if(e){var t=r+e*Uint32Array.BYTES_PER_ELEMENT*3,n=t+e*Uint32Array.BYTES_PER_ELEMENT*3;y(e,r,t,n)}}function R(r){var e=H.ntri_smooth_uv;if(e){var t=r+e*Uint32Array.BYTES_PER_ELEMENT*3,n=t+e*Uint32Array.BYTES_PER_ELEMENT*3,a=n+e*Uint32Array.BYTES_PER_ELEMENT*3;y(e,r,t,a),_(e,n)}}function h(r){var e=H.nquad_flat;if(e){var t=r+e*Uint32Array.BYTES_PER_ELEMENT*4;c(e,r,t)}}function p(r){var e=H.nquad_flat_uv;if(e){var t=r+e*Uint32Array.BYTES_PER_ELEMENT*4,n=t+e*Uint32Array.BYTES_PER_ELEMENT*4;c(e,r,n),u(e,t)}}function w(r){var e=H.nquad_smooth;if(e){var t=r+e*Uint32Array.BYTES_PER_ELEMENT*4,n=t+e*Uint32Array.BYTES_PER_ELEMENT*4;T(e,r,t,n)}}function A(r){var e=H.nquad_smooth_uv;if(e){var t=r+e*Uint32Array.BYTES_PER_ELEMENT*4,n=t+e*Uint32Array.BYTES_PER_ELEMENT*4,a=n+e*Uint32Array.BYTES_PER_ELEMENT*4;T(e,r,t,a),u(e,n)}}var H,U,m,x,B,L,b,M,S,N,V,P,Y,q,g,F,j,C,O,G=this,J=0,I=[],X=[];THREE.Geometry.call(this),H=t(r,J),J+=H.header_bytes,N=3*H.vertex_index_bytes+H.material_index_bytes,V=4*H.vertex_index_bytes+H.material_index_bytes,P=H.ntri_flat*N,Y=H.ntri_smooth*(N+3*H.normal_index_bytes),q=H.ntri_flat_uv*(N+3*H.uv_index_bytes),g=H.ntri_smooth_uv*(N+3*H.normal_index_bytes+3*H.uv_index_bytes),F=H.nquad_flat*V,j=H.nquad_smooth*(V+4*H.normal_index_bytes),C=H.nquad_flat_uv*(V+4*H.uv_index_bytes),O=H.nquad_smooth_uv*(V+4*H.normal_index_bytes+4*H.uv_index_bytes),J+=E(J),J+=i(J),J+=e(3*H.nnormals),J+=s(J),U=J,m=U+P+e(2*H.ntri_flat),x=m+Y+e(2*H.ntri_smooth),B=x+q+e(2*H.ntri_flat_uv),L=B+g+e(2*H.ntri_smooth_uv),b=L+F+e(2*H.nquad_flat),M=b+j+e(2*H.nquad_smooth),S=M+C+e(2*H.nquad_flat_uv),v(x),R(B),p(M),A(S),l(U),d(m),h(L),w(b),this.computeFaceNormals()};a.prototype=Object.create(THREE.Geometry.prototype);var o=new a(t),E=this.initMaterials(n,t);this.needsTangents(E)&&o.computeTangents(),e(o,E)};