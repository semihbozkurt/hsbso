
 //panzoom:
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Panzoom=e()}(this,(function(){"use strict";var t=function(){return(t=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function e(t,e,n){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object");"private setter"===n?e.add(t):e.set(t,n)}function n(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}function r(t,e){return n(t,e,e.get(t))}function o(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n}var i=new WeakMap,a=new WeakMap,s=new WeakMap,c=new WeakMap,l=new WeakMap;function u(t){return t.ownerDocument.defaultView}function h(t){return t.style.cursor="grab"}function p(t){t.style.cursor="grabbing"}function f(t){return!!t&&(t instanceof u(t).SVGElement||"svg"===t.nodeName.toLowerCase())}function d(t,e,n){var r=u(t).getComputedStyle(t).getPropertyValue(e);return n?parseFloat(r):r}function g(t,e){return d(t,e,!0)}function m(t){return u(t).getComputedStyle(t).transform}function v(t){return"none"===m(t)?"":m(t)}function y(t,e){var n=e.x,r=e.y,o=e.scale,i=e.isSVG,a=void 0!==i&&i,s="matrix(".concat(o,", 0, 0, ").concat(o,", ").concat(n,", ").concat(r,")");if(a)t.setAttribute("transform",s);else{var c=v(t);t.style.transform=c?c+" "+s:s}}function b(t){var e=t.clientX,n=t.clientY;return{x:e,y:n}}function x(t,e){return{x:t.x-e.x,y:t.y-e.y}}function w(t){return"pointerId"in t}function E(t){return"touches"in t}function S(t){return!!t.parentElement}function O(t,e,n,r){var o=n-t,i=r-e;return Math.sqrt(o*o+i*i)}function j(t){if(E(t))return Math.max(1,t.touches.length);if(w(t))return 1;return 0}function P(t){if(E(t))return Array.from(t.touches).map((function(t){return{clientX:t.clientX,clientY:t.clientY}}));return[t]}function C(t){return P(t).reduce((function(t,e){return t.clientX+=e.clientX,t.clientY+=e.clientY,t}),{clientX:0,clientY:0})}function T(t,e){if(E(t)){if(2!==t.touches.length)return 0;var n=t.touches;return O(n[0].clientX,n[0].clientY,n[1].clientX,n[1].clientY)}if(w(t)&&Array.isArray(e)&&2===e.length)return O(e[0].clientX,e[0].clientY,e[1].clientX,e[1].clientY);return 0}function M(t,e){var n=t.getBoundingClientRect(),r=n.left,o=n.top,i=u(t);return{clientX:(e.clientX-r)/i.devicePixelRatio,clientY:(e.clientY-o)/i.devicePixelRatio}}var z={animate:!1,canvas:!1,cursor:"reveal",disablePan:!1,disableZoom:!1,disableXAxis:!1,disableYAxis:!1,duration:200,easing:"ease-in-out",exclude:[],excludeClass:"panzoom-exclude",handleStartEvent:function(t){t.preventDefault(),t.stopPropagation()},maxScale:4,minScale:.125,overflow:"hidden",panOnlyWhenZoomed:!1,relative:!1,setTransform:y,startX:0,startY:0,startScale:1,step:.3,touchAction:"none"};return function(){function n(t,r){var u=this;e(this,i,void 0),e(this,a,void 0),e(this,s,void 0),e(this,c,void 0),e(this,l,void 0),o(this,i,t),o(this,a,Object.assign(Object.assign({},z),r));var v=f(t);o(this,s,v),o(this,c,v?t.ownerSVGElement:t.parentElement);var b=r||{},w=b.startX,E=b.startY,O=b.startScale;o(this,l,{x:void 0!==w?w:u.getOptions().startX,y:void 0!==E?E:u.getOptions().startY,scale:void 0!==O?O:u.getOptions().startScale}),"reveal"===this.getOptions().cursor&&h(t),this.setStyle("touch-action",this.getOptions().touchAction),this.setStyle("user-select","none"),this.setStyle("backface-visibility","hidden"),this.setStyle("transform-origin",this.getOptions().relative?"0 0":"center"),this.setTransform(this.getOptions().startX,this.getOptions().startY,this.getOptions().startScale,{animate:!1})}return n.prototype.getOptions=function(){return r(this,a)},n.prototype.setOptions=function(t){o(this,a,Object.assign(Object.assign({},this.getOptions()),t))},n.prototype.getPan=function(){return{x:r(this,l).x,y:r(this,l).y}},n.prototype.getScale=function(){return r(this,l).scale},n.prototype.setStyle=function(t,e){return function(t,e,n){t.style[e]=n}(r(this,i),t,e)},n.prototype.reset=function(e){var n=t(t({},this.getOptions()),e);return this.setTransform(n.startX,n.startY,n.startScale,n)},n.prototype.setTransform=function(e,n,o,i){var a=this,s=t(t({},this.getOptions()),i);if(!s.disablePan||!s.disableZoom){if(o=Math.min(Math.max(o,s.minScale),s.maxScale),s.disablePan&&(e=r(this,l).x,n=r(this,l).y),s.disableZoom&&(o=r(this,l).scale),!s.disableXAxis||!s.disableYAxis){if(s.disableXAxis?e=r(this,l).x:s.disableYAxis&&(n=r(this,l).y),s.animate){var c=r(this,i);c.style.transition="transform ".concat(s.duration,"ms ").concat(s.easing)}var u=function(){s.animate&&(r(a,i).style.transition="none")};s.animate&&s.duration>0&&r(this,i).addEventListener("transitionend",u,{once:!0}),r(this,l).x=e,r(this,l).y=n,r(this,l).scale=o,this.getOptions().setTransform(r(this,i),{x:e,y:n,scale:o,isSVG:r(this,s)},s)}}},n.prototype.pan=function(e,n,o){var i=t(t({},this.getOptions()),o);if(!i.disablePan){var a=r(this,l).x+(i.relative?e:e/r(this,l).scale),s=r(this,l).y+(i.relative?n:n/r(this,l).scale);this.setTransform(a,s,r(this,l).scale,i)}},n.prototype.zoom=function(e,n){var r=t(t({},this.getOptions()),n);if(!r.disableZoom){var o=r.relative?r.startScale*e:e;o=Math.min(Math.max(o,r.minScale),r.maxScale);var i=this.getOptions().startX,a=this.getOptions().startY;if(r.focal){var s=r.focal,c=s.clientX,l=s.clientY,u=M(this.getOptions().canvas?this.getOptions().canvas:this.getOptions().parent,s);c=u.clientX,l=u.clientY;var h=this.getScale();i=this.getPan().x+(c/o-c/h),a=this.getPan().y+(l/o-l/h)}this.setTransform(i,a,o,r)}},n.prototype.zoomWithWheel=function(e,n){var r=t(t(t({},this.getOptions()),{animate:!1}),n);if(!r.disableZoom){var o=Math.abs(e.deltaY),i=e.deltaY<0?1:-1,a=r.maxScale,s=r.minScale,c=this.getScale(),l=c*Math.pow(1+r.step,i);l=Math.min(Math.max(l,s),a),this.zoom(l,t(t({},r),{focal:e}))}},n}()}));

 
 
// Wrap your code to wait for the document to be ready
document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('map-container');
    const viewport = document.getElementById('map-viewport');

    // Double check if element exists
    if (!mapElement) {
        console.error("Map container not found!");
        return;
    }

    // Initialize Panzoom
    const pz = Panzoom(mapElement, {
        maxScale: 5,
        minScale: 0.1,
        step: 0.3,
        contain: 'outside'
    });

    // Use a small timeout to let the library "settle" before zooming
    setTimeout(() => {
        pz.zoom(0.8, { animate: false });
    }, 50);

    // Zoom with wheel
    viewport.addEventListener('wheel', (event) => {
        if (event.ctrlKey) event.preventDefault();
        pz.zoomWithWheel(event);
    }, { passive: false });

    // Handle clicks for info-panel
    const regions = document.querySelectorAll('#svg1 path');
    const panel = document.getElementById('info-panel');

    regions.forEach(region => {
        region.addEventListener('click', (e) => {
            console.log("Clicked:", region.id);
            panel.classList.add('open');
            // Zoom to clicked area
            pz.zoom(2, { animate: true, focal: e });
        });
    });
});
