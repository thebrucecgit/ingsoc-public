"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[4006],{31194:function(e,t,r){var n=r(63696),i=r(83051),a=r(468),l=r(74437),c=r(20641),o=r(11545),u=r(3973),s=r(1224),p=r(63548),f=r(98804),y=r(55522),d=r(32640),m=["url","children","trackRef"],v=["title","url","type","isLive"];function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},b.apply(null,arguments)}function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){O(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function O(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function P(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.includes(n))continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.includes(r)||{}.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var k={video:"playback-avkx:play",audio:"content-types:audio"},w=(0,i.default)("span",{target:"efy7ugc4",label:"LivePulseContainer"})({name:"1bmnxg7",styles:"white-space:nowrap"}),E=(0,i.default)("div",{target:"efy7ugc3",label:"IconContainer"})("height:",(0,a.A)(16),";width:",(0,a.A)(16),";display:inline-block;position:relative;top:",(0,a.A)(2),";color:",(e=>{var{theme:t}=e;return t.colourPalette.primary}),";"),j=(0,i.default)("a",{target:"efy7ugc2",label:"StyledLink"})("display:block;padding:calc(",l.SPACING_3," / 2) 0;text-decoration:none;color:",(e=>{var{theme:t}=e;return t.colourPalette.primary}),";cursor:pointer;>:first-child{margin-right:",l.SPACING_2,";}&:hover,&:focus{text-decoration:underline;color:",(e=>{var{theme:t}=e;return t.colourPalette.hyperlink}),";}"),A=(0,i.default)("li",{target:"efy7ugc1",label:"StyledAdditionalLink"})(c.NP," ",o.K1," width:fit-content;:first-child{margin-top:calc(",l.SPACING_3," / -2);}:last-child{margin-bottom:calc(",l.SPACING_3," / -2);}"),L=e=>{var{className:t}=e;return n.createElement("svg",{viewBox:"0 0 32 32",width:"1em",height:"1em",focusable:"false","aria-hidden":"true",className:t},n.createElement("path",{d:"M12 12h 8v 8h-8Z"}))},_=(0,i.default)(L,{target:"efy7ugc0",label:"StyledBulletIcon"})({name:"a1du9p",styles:"display:block;height:100%;width:100%;fill:currentcolor"}),S=(e,t)=>t?"live":"video"===e||"audio"===e?e:"article",x=e=>{var{type:t,isLive:r}=e;switch(S(t,r)){case"live":return n.createElement(w,null,n.createElement(d.A,null));case"video":case"audio":return n.createElement(E,null,n.createElement(y.A,{type:k[t]}));default:return n.createElement(E,null,n.createElement(_,null))}},D=e=>{var{url:t,children:r,trackRef:i}=e,a=P(e,m);return n.createElement(A,a,n.createElement(j,{href:t,ref:i},n.createElement(x,a),r))};t.Ay=e=>{var{links:t,tracking:r={},experimentTracking:i={}}=e;return t?n.createElement(u.A,{spacing:0,as:"ul"},t.map(((e,t)=>{var{title:a,url:l,type:c,isLive:o}=e,u=P(e,v);return n.createElement(s.C,b({key:"".concat(a,"-").concat(t)},(e=>{var{tracking:t,title:r,index:n,url:i,type:a,isLive:l,experimentTracking:c}=e;return h({trackView:!1,stopPropagation:!0,tracking:(0,p.D9)(h(h({},t),{},{entityName:"subitem",subitemType:"additional link",subitemText:r,subitemPosition:t.additionalLinksPosition+n,subitemLink:i,subitemMediaType:S(a,l)}))},(0,f.l)(c))})({tracking:r,title:a,index:t,url:l,type:c,isLive:o,experimentTracking:i})),(e=>{var{trackRef:t}=e;return n.createElement(D,b({trackRef:t,url:l,type:c,isLive:o},u),a)}))}))):null}}}]);