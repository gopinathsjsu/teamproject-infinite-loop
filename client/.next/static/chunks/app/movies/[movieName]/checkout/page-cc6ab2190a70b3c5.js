(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3138],{27106:function(e,t,r){"use strict";r.d(t,{J:function(){return loadStripe}});var n="https://js.stripe.com/v3",i=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,findScript=function(){for(var e=document.querySelectorAll('script[src^="'.concat(n,'"]')),t=0;t<e.length;t++){var r=e[t];if(i.test(r.src))return r}return null},injectScript=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",r=document.createElement("script");r.src="".concat(n).concat(t);var i=document.head||document.body;if(!i)throw Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return i.appendChild(r),r},registerWrapper=function(e,t){e&&e._registerWrapper&&e._registerWrapper({name:"stripe-js",version:"2.2.0",startTime:t})},o=null,initStripe=function(e,t,r){if(null===e)return null;var n=e.apply(void 0,t);return registerWrapper(n,r),n},s=Promise.resolve().then(function(){return null!==o?o:o=new Promise(function(e,t){if("undefined"==typeof window||"undefined"==typeof document){e(null);return}if(window.Stripe,window.Stripe){e(window.Stripe);return}try{var r=findScript();r||(r=injectScript(null)),r.addEventListener("load",function(){window.Stripe?e(window.Stripe):t(Error("Stripe.js not available"))}),r.addEventListener("error",function(){t(Error("Failed to load Stripe.js"))})}catch(e){t(e);return}})}),u=!1;s.catch(function(e){u||console.warn(e)});var loadStripe=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];u=!0;var n=Date.now();return s.then(function(e){return initStripe(e,t,n)})}},62601:function(e,t,r){"use strict";var n,i;e.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(i=r.g.process)?void 0:i.env)?r.g.process:r(58960)},12515:function(e,t,r){Promise.resolve().then(r.bind(r,53527))},32701:function(e,t,r){var n=r(62601);r(90472);var i=r(2265),o=i&&"object"==typeof i&&"default"in i?i:{default:i};function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var s=void 0!==n&&n.env&&!0,isString=function(e){return"[object String]"===Object.prototype.toString.call(e)},u=function(){function StyleSheet(e){var t=void 0===e?{}:e,r=t.name,n=void 0===r?"stylesheet":r,i=t.optimizeForSpeed,o=void 0===i?s:i;invariant$1(isString(n),"`name` must be a string"),this._name=n,this._deletedRulePlaceholder="#"+n+"-deleted-rule____{}",invariant$1("boolean"==typeof o,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=o,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var u=document.querySelector('meta[property="csp-nonce"]');this._nonce=u?u.getAttribute("content"):null}var e,t=StyleSheet.prototype;return t.setOptimizeForSpeed=function(e){invariant$1("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),invariant$1(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},t.isOptimizeForSpeed=function(){return this._optimizeForSpeed},t.inject=function(){var e=this;if(invariant$1(!this._injected,"sheet already injected"),this._injected=!0,this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(s||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},t.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},t.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},t.insertRule=function(e,t){if(invariant$1(isString(e),"`insertRule` accepts only strings"),this._optimizeForSpeed){var r=this.getSheet();"number"!=typeof t&&(t=r.cssRules.length);try{r.insertRule(e,t)}catch(t){return s||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var n=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,n))}return this._rulesCount++},t.replaceRule=function(e,t){if(this._optimizeForSpeed){var r=this.getSheet();if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(n){s||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}}else{var n=this._tags[e];invariant$1(n,"old rule at index `"+e+"` not found"),n.textContent=t}return e},t.deleteRule=function(e){if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];invariant$1(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},t.flush=function(){this._injected=!1,this._rulesCount=0,this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]},t.cssRules=function(){var e=this;return this._tags.reduce(function(t,r){return r?t=t.concat(Array.prototype.map.call(e.getSheetForTag(r).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},t.makeStyleTag=function(e,t,r){t&&invariant$1(isString(t),"makeStyleTag accepts only strings as second parameter");var n=document.createElement("style");this._nonce&&n.setAttribute("nonce",this._nonce),n.type="text/css",n.setAttribute("data-"+e,""),t&&n.appendChild(document.createTextNode(t));var i=document.head||document.getElementsByTagName("head")[0];return r?i.insertBefore(n,r):i.appendChild(n),n},_defineProperties(StyleSheet.prototype,[{key:"length",get:function(){return this._rulesCount}}]),e&&_defineProperties(StyleSheet,e),StyleSheet}();function invariant$1(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var stringHash=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},a={};function computeId(e,t){if(!t)return"jsx-"+e;var r=String(t),n=e+r;return a[n]||(a[n]="jsx-"+stringHash(e+"-"+r)),a[n]}function computeSelector(e,t){var r=e+t;return a[r]||(a[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),a[r]}var c=function(){function StyleSheetRegistry(e){var t=void 0===e?{}:e,r=t.styleSheet,n=void 0===r?null:r,i=t.optimizeForSpeed,o=void 0!==i&&i;this._sheet=n||new u({name:"styled-jsx",optimizeForSpeed:o}),this._sheet.inject(),n&&"boolean"==typeof o&&(this._sheet.setOptimizeForSpeed(o),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var e=StyleSheetRegistry.prototype;return e.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer||(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var r=this.getIdAndRules(e),n=r.styleId,i=r.rules;if(n in this._instancesCounts){this._instancesCounts[n]+=1;return}var o=i.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[n]=o,this._instancesCounts[n]=1},e.remove=function(e){var t=this,r=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(r in this._instancesCounts,"styleId: `"+r+"` not found"),this._instancesCounts[r]-=1,this._instancesCounts[r]<1){var n=this._fromServer&&this._fromServer[r];n?(n.parentNode.removeChild(n),delete this._fromServer[r]):(this._indices[r].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[r]),delete this._instancesCounts[r]}},e.update=function(e,t){this.add(t),this.remove(e)},e.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},e.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],r=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return r[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},e.styles=function(e){var t,r;return t=this.cssRules(),void 0===(r=e)&&(r={}),t.map(function(e){var t=e[0],n=e[1];return o.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:r.nonce?r.nonce:void 0,dangerouslySetInnerHTML:{__html:n}})})},e.getIdAndRules=function(e){var t=e.children,r=e.dynamic,n=e.id;if(r){var i=computeId(n,r);return{styleId:i,rules:Array.isArray(t)?t.map(function(e){return computeSelector(i,e)}):[computeSelector(i,t)]}}return{styleId:computeId(n),rules:Array.isArray(t)?t:[t]}},e.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},StyleSheetRegistry}(),l=i.createContext(null);l.displayName="StyleSheetContext";var d=o.default.useInsertionEffect||o.default.useLayoutEffect,f=new c;function JSXStyle(e){var t=f||i.useContext(l);return t&&d(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)]),null}JSXStyle.dynamic=function(e){return e.map(function(e){return computeId(e[0],e[1])}).join(" ")},t.style=JSXStyle},29738:function(e,t,r){"use strict";e.exports=r(32701).style},53527:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return PreviewPage}});var n=r(57437),i=r(29738),o=r.n(i),s=r(2265);function PreviewPage(){return s.useEffect(()=>{let e=new URLSearchParams(window.location.search);e.get("success")&&console.log("Order placed! You will receive an email confirmation."),e.get("canceled")&&console.log("Order canceled -- continue to shop around and checkout when you’re ready.")},[]),(0,n.jsxs)("form",{action:"http://localhost:8080/payment/checkout_sessions",method:"POST",className:"jsx-2ddabaf94d25f34",children:[(0,n.jsx)("section",{className:"jsx-2ddabaf94d25f34",children:(0,n.jsx)("button",{type:"submit",role:"link",className:"jsx-2ddabaf94d25f34",children:"Checkout"})}),(0,n.jsx)(o(),{id:"2ddabaf94d25f34",children:"section.jsx-2ddabaf94d25f34{background:#fff;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-ms-flex-direction:column;flex-direction:column;width:400px;height:112px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}button.jsx-2ddabaf94d25f34{height:36px;background:#556cd6;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;color:white;border:0;font-weight:600;cursor:pointer;-webkit-transition:all.2s ease;-moz-transition:all.2s ease;-o-transition:all.2s ease;transition:all.2s ease;-webkit-box-shadow:0px 4px 5.5px 0px rgba(0,0,0,.07);-moz-box-shadow:0px 4px 5.5px 0px rgba(0,0,0,.07);box-shadow:0px 4px 5.5px 0px rgba(0,0,0,.07)}button.jsx-2ddabaf94d25f34:hover{opacity:.8}"})]})}(0,r(27106).J)("pk_test_51OEgQqA475w0fpJudMi36tfpe04jdRxLTraIo1nwDrPcvgdEhXz77lWWfloifqjrI7UsggP5JppqQvU1fg6hZsuB00ibyRUIcB")},90472:function(){},58960:function(e){!function(){var t={229:function(e){var t,r,n,i=e.exports={};function defaultSetTimout(){throw Error("setTimeout has not been defined")}function defaultClearTimeout(){throw Error("clearTimeout has not been defined")}function runTimeout(e){if(t===setTimeout)return setTimeout(e,0);if((t===defaultSetTimout||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){t=defaultSetTimout}try{r="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){r=defaultClearTimeout}}();var o=[],s=!1,u=-1;function cleanUpNextTick(){s&&n&&(s=!1,n.length?o=n.concat(o):u=-1,o.length&&drainQueue())}function drainQueue(){if(!s){var e=runTimeout(cleanUpNextTick);s=!0;for(var t=o.length;t;){for(n=o,o=[];++u<t;)n&&n[u].run();u=-1,t=o.length}n=null,s=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===defaultClearTimeout||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];o.push(new Item(e,t)),1!==o.length||s||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=noop,i.addListener=noop,i.once=noop,i.off=noop,i.removeListener=noop,i.removeAllListeners=noop,i.emit=noop,i.prependListener=noop,i.prependOnceListener=noop,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},r={};function __nccwpck_require__(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}},o=!0;try{t[e](i,i.exports,__nccwpck_require__),o=!1}finally{o&&delete r[e]}return i.exports}__nccwpck_require__.ab="//";var n=__nccwpck_require__(229);e.exports=n}()},30622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2265),i=Symbol.for("react.element"),o=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,u=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,r){var n,o={},c=null,l=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(l=t.ref),t)s.call(t,n)&&!a.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===o[n]&&(o[n]=t[n]);return{$$typeof:i,type:e,key:c,ref:l,props:o,_owner:u.current}}t.Fragment=o,t.jsx=q,t.jsxs=q},57437:function(e,t,r){"use strict";e.exports=r(30622)}},function(e){e.O(0,[2971,2472,1744],function(){return e(e.s=12515)}),_N_E=e.O()}]);