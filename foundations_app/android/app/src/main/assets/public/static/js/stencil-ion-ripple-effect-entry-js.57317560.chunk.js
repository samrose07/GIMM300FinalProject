(this.webpackJsonpfoundations_app=this.webpackJsonpfoundations_app||[]).push([[36],{165:function(t,n,i){"use strict";i.r(n),i.d(n,"ion_ripple_effect",(function(){return u}));var a=i(16),e=i(2),o=i.n(e),r=i(5),s=i(7),c=i(8),f=i(20),l=i(17),u=function(){function t(n){Object(s.a)(this,t),Object(f.l)(this,n),this.type="bounded"}return Object(c.a)(t,[{key:"addRipple",value:function(){var t=Object(r.a)(o.a.mark((function t(n,i){var a=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){Object(f.h)((function(){var e=a.el.getBoundingClientRect(),o=e.width,r=e.height,s=Math.sqrt(o*o+r*r),c=Math.max(r,o),l=a.unbounded?c:s+d,u=Math.floor(c*p),b=l/u,w=n-e.left,h=i-e.top;a.unbounded&&(w=.5*o,h=.5*r);var k=w-.5*u,y=h-.5*u,v=.5*o-w,g=.5*r-h;Object(f.n)((function(){var n=document.createElement("div");n.classList.add("ripple-effect");var i=n.style;i.top=y+"px",i.left=k+"px",i.width=i.height=u+"px",i.setProperty("--final-scale","".concat(b)),i.setProperty("--translate-end","".concat(v,"px, ").concat(g,"px")),(a.el.shadowRoot||a.el).appendChild(n),setTimeout((function(){t((function(){m(n)}))}),325)}))}))})));case 1:case"end":return t.stop()}}),t)})));return function(n,i){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t,n=Object(l.b)(this);return Object(f.j)(f.b,{role:"presentation",class:(t={},Object(a.a)(t,n,!0),Object(a.a)(t,"unbounded",this.unbounded),t)})}},{key:"unbounded",get:function(){return"unbounded"===this.type}},{key:"el",get:function(){return Object(f.g)(this)}}]),t}(),m=function(t){t.classList.add("fade-out"),setTimeout((function(){t.remove()}),200)},d=10,p=.5;u.style=":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}:host(.unbounded){contain:layout size style}.ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;will-change:transform, opacity;pointer-events:none}.fade-out{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1));-webkit-animation:150ms fadeOutAnimation forwards;animation:150ms fadeOutAnimation forwards}@-webkit-keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@-webkit-keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@-webkit-keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}@keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}"}}]);
//# sourceMappingURL=stencil-ion-ripple-effect-entry-js.57317560.chunk.js.map