(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9862],{83686:function(e,t,n){"use strict";var o=n(26314);t.Z=void 0;var i=o(n(80984)),r=n(57437),a=(0,i.default)((0,r.jsx)("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"}),"CloudUpload");t.Z=a},29872:function(e,t,n){"use strict";n.d(t,{Z:function(){return Z}});var o=n(20791),i=n(13428),r=n(2265),a=n(57042),l=n(95600),s=n(89975),u=n(35843),styles_getOverlayAlpha=e=>((e<1?5.11916*e**2:4.5*Math.log(e+1)+2)/100).toFixed(2),c=n(87927),d=n(26520),v=n(25702);function getPaperUtilityClass(e){return(0,v.Z)("MuiPaper",e)}(0,d.Z)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var f=n(57437);let h=["className","component","elevation","square","variant"],useUtilityClasses=e=>{let{square:t,elevation:n,variant:o,classes:i}=e,r={root:["root",o,!t&&"rounded","elevation"===o&&`elevation${n}`]};return(0,l.Z)(r,getPaperUtilityClass,i)},m=(0,u.ZP)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,"elevation"===n.variant&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return(0,i.Z)({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},"outlined"===t.variant&&{border:`1px solid ${(e.vars||e).palette.divider}`},"elevation"===t.variant&&(0,i.Z)({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&"dark"===e.palette.mode&&{backgroundImage:`linear-gradient(${(0,s.Fq)("#fff",styles_getOverlayAlpha(t.elevation))}, ${(0,s.Fq)("#fff",styles_getOverlayAlpha(t.elevation))})`},e.vars&&{backgroundImage:null==(n=e.vars.overlays)?void 0:n[t.elevation]}))}),p=r.forwardRef(function(e,t){let n=(0,c.Z)({props:e,name:"MuiPaper"}),{className:r,component:l="div",elevation:s=1,square:u=!1,variant:d="elevation"}=n,v=(0,o.Z)(n,h),p=(0,i.Z)({},n,{component:l,elevation:s,square:u,variant:d}),Z=useUtilityClasses(p);return(0,f.jsx)(m,(0,i.Z)({as:l,ownerState:p,className:(0,a.Z)(Z.root,r),ref:t},v))});var Z=p},6785:function(e,t,n){"use strict";n.d(t,{Z:function(){return Z}});var o=n(13428),i=n(20791),r=n(2265),a=n(57042),l=n(95600),s=n(28702),u=n(87927),c=n(35843),d=n(26520),v=n(25702);function getSvgIconUtilityClass(e){return(0,v.Z)("MuiSvgIcon",e)}(0,d.Z)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var f=n(57437);let h=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],useUtilityClasses=e=>{let{color:t,fontSize:n,classes:o}=e,i={root:["root","inherit"!==t&&`color${(0,s.Z)(t)}`,`fontSize${(0,s.Z)(n)}`]};return(0,l.Z)(i,getSvgIconUtilityClass,o)},m=(0,c.ZP)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,"inherit"!==n.color&&t[`color${(0,s.Z)(n.color)}`],t[`fontSize${(0,s.Z)(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,o,i,r,a,l,s,u,c,d,v,f,h;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(n=e.transitions)||null==(o=n.create)?void 0:o.call(n,"fill",{duration:null==(i=e.transitions)||null==(i=i.duration)?void 0:i.shorter}),fontSize:({inherit:"inherit",small:(null==(r=e.typography)||null==(a=r.pxToRem)?void 0:a.call(r,20))||"1.25rem",medium:(null==(l=e.typography)||null==(s=l.pxToRem)?void 0:s.call(l,24))||"1.5rem",large:(null==(u=e.typography)||null==(c=u.pxToRem)?void 0:c.call(u,35))||"2.1875rem"})[t.fontSize],color:null!=(d=null==(v=(e.vars||e).palette)||null==(v=v[t.color])?void 0:v.main)?d:({action:null==(f=(e.vars||e).palette)||null==(f=f.action)?void 0:f.active,disabled:null==(h=(e.vars||e).palette)||null==(h=h.action)?void 0:h.disabled,inherit:void 0})[t.color]}}),p=r.forwardRef(function(e,t){let n=(0,u.Z)({props:e,name:"MuiSvgIcon"}),{children:l,className:s,color:c="inherit",component:d="svg",fontSize:v="medium",htmlColor:p,inheritViewBox:Z=!1,titleAccess:g,viewBox:y="0 0 24 24"}=n,x=(0,i.Z)(n,h),w=r.isValidElement(l)&&"svg"===l.type,b=(0,o.Z)({},n,{color:c,component:d,fontSize:v,instanceFontSize:e.fontSize,inheritViewBox:Z,viewBox:y,hasSvgAsChild:w}),S={};Z||(S.viewBox=y);let j=useUtilityClasses(b);return(0,f.jsxs)(m,(0,o.Z)({as:d,className:(0,a.Z)(j.root,s),focusable:"false",color:p,"aria-hidden":!g||void 0,role:g?"img":void 0,ref:t},S,x,w&&l.props,{ownerState:b,children:[w?l.props.children:l,g?(0,f.jsx)("title",{children:g}):null]}))});p.muiName="SvgIcon";var Z=p},38173:function(e,t,n){"use strict";n.d(t,{Z:function(){return createSvgIcon}});var o=n(13428),i=n(2265),r=n(6785),a=n(57437);function createSvgIcon(e,t){function Component(n,i){return(0,a.jsx)(r.Z,(0,o.Z)({"data-testid":`${t}Icon`,ref:i},n,{children:e}))}return Component.muiName=r.Z.muiName,i.memo(i.forwardRef(Component))}},80494:function(e,t,n){"use strict";var o=n(78078);t.Z=o.Z},98729:function(e,t,n){"use strict";var o=n(8051);t.Z=o.Z},53931:function(e,t,n){"use strict";var o=n(96278);t.Z=o.Z},26649:function(e,t,n){"use strict";var o=n(88221);t.Z=o.Z},73292:function(e,t,n){"use strict";var o=n(34625);t.Z=o.Z},57613:function(e,t,n){"use strict";var o=n(1091);t.Z=o.Z},62940:function(e,t,n){"use strict";function createChainedFunction(...e){return e.reduce((e,t)=>null==t?e:function(...n){e.apply(this,n),t.apply(this,n)},()=>{})}n.d(t,{Z:function(){return createChainedFunction}})},78078:function(e,t,n){"use strict";function debounce(e,t=166){let n;function debounced(...o){clearTimeout(n),n=setTimeout(()=>{e.apply(this,o)},t)}return debounced.clear=()=>{clearTimeout(n)},debounced}n.d(t,{Z:function(){return debounce}})},8051:function(e,t,n){"use strict";n.d(t,{Z:function(){return isMuiElement}});var o=n(2265);function isMuiElement(e,t){var n,i;return o.isValidElement(e)&&-1!==t.indexOf(null!=(n=e.type.muiName)?n:null==(i=e.type)||null==(i=i._payload)||null==(i=i.value)?void 0:i.muiName)}},96278:function(e,t,n){"use strict";function ownerDocument(e){return e&&e.ownerDocument||document}n.d(t,{Z:function(){return ownerDocument}})},88221:function(e,t,n){"use strict";n.d(t,{Z:function(){return ownerWindow}});var o=n(96278);function ownerWindow(e){let t=(0,o.Z)(e);return t.defaultView||window}},34625:function(e,t,n){"use strict";n.d(t,{Z:function(){return useControlled}});var o=n(2265);function useControlled({controlled:e,default:t,name:n,state:i="value"}){let{current:r}=o.useRef(void 0!==e),[a,l]=o.useState(t),s=r?e:a,u=o.useCallback(e=>{r||l(e)},[]);return[s,u]}},33449:function(e,t,n){"use strict";n.d(t,{Z:function(){return useId}});var o,i=n(2265);let r=0,a=(o||(o=n.t(i,2)))["useId".toString()];function useId(e){if(void 0!==a){let t=a();return null!=e?e:t}return function(e){let[t,n]=i.useState(e),o=e||t;return i.useEffect(()=>{null==t&&(r+=1,n(`mui-${r}`))},[t]),o}(e)}},30951:function(e,t,n){Promise.resolve().then(n.bind(n,50856))},50856:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return page}});var o=n(57437),i=n(2265),r=n(24033),a=n(29872),l=n(43226),s=n(39227),u=n(49050),c=n(83686);let d={display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw"},v={transform:"scale(1.25)"};var ticketCard=e=>{let{name:t,movieName:n,showTime:r,seatNo:f,theaterName:h,qrLink:m,screenName:p,date:Z}=e,g=(0,i.useRef)(null),[y,x]=(0,i.useState)(!1);return(0,o.jsx)("div",{style:d,children:(0,o.jsx)("div",{style:v,ref:g,children:(0,o.jsxs)(a.Z,{elevation:3,sx:{maxWidth:300,margin:"auto",padding:2,backgroundColor:"#80CBC4"},children:[(0,o.jsx)(l.Z,{variant:"h5",component:"h1",sx:{color:"black",textAlign:"center",marginBottom:2},children:"Box Office"}),(0,o.jsx)(l.Z,{variant:"h6",component:"h2",sx:{color:"black",textAlign:"center",marginBottom:2},children:"Ticket"}),(0,o.jsxs)(s.Z,{sx:{color:"black",margin:"2px",textAlign:"center"},children:[(0,o.jsxs)(l.Z,{variant:"body1",children:["Hi ",t,","]}),(0,o.jsx)(l.Z,{variant:"body1",children:"Your ticket for the"}),(0,o.jsxs)(l.Z,{variant:"body1",children:["Movie Name : ",(0,o.jsxs)("span",{style:{fontWeight:"bold"},children:[" ",n]})]}),(0,o.jsxs)(l.Z,{variant:"body1",children:["Screen Name : ",p]}),(0,o.jsxs)(l.Z,{variant:"body1",children:["Date : ",Z]}),(0,o.jsxs)(l.Z,{variant:"body1",children:["Show Time :",(0,o.jsxs)("span",{style:{fontWeight:"bold"},children:[" ",r]})]}),(0,o.jsxs)(l.Z,{variant:"body1",children:["SeatNos :",(0,o.jsxs)("span",{style:{fontWeight:"bold"},children:[" ",f," "]})]}),(0,o.jsxs)(l.Z,{variant:"body1",children:["Theater Name : ",h]}),(0,o.jsx)(l.Z,{variant:"body1",children:"scan this QR at the theater to enjoy your show"})]}),(0,o.jsx)(s.Z,{sx:{display:"flex",justifyContent:"center",marginTop:2,overflow:"visible"},children:(0,o.jsx)("img",{src:m,style:{width:128,height:128,backgroundColor:"#ffffff",color:"#000000"},onLoad:()=>x(!0)})}),(0,o.jsx)(u.Z,{onClick:()=>{window.print()},disabled:!y,startIcon:(0,o.jsx)(c.Z,{}),sx:{color:"white"},children:"Download as PDF"})]})})})},f=n(36661),page=function(){let[e,t]=(0,i.useState)(null),{ticketId:n}=(0,r.useParams)(),[a,l]=(0,i.useState)(!0);return(console.log(n),(0,i.useEffect)(()=>{let fetchTicketDetails=async()=>{if(n){let e=await (0,f.e)("","payment/getTicketData/"+n,"GET"),o=e.data,i={name:o.name,movieName:o.movieName,show_time:o.show_time,seatNo:o.seat_ids.join(" "),theaterName:o.theaterName,qrLink:o.qr_code,screenName:o.screen_id,date:o.show_date.split("T")[0]};t(i)}};fetchTicketDetails()},[n]),e)?(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(ticketCard,{name:e.name,movieName:e.movieName,showTime:e.show_time,seatNo:e.seatNo,theaterName:e.theaterName,qrLink:e.qrLink,screenName:e.screenName,date:e.date})}):(0,o.jsx)("div",{children:"Loading..."})}},36661:function(e,t,n){"use strict";async function handleResponse(e){let t=e.headers.get("Content-Type")||"",n=t.includes("application/json"),o=n?await e.json():await e.text();if(!e.ok){if(n&&null!==o.errors)throw Error(JSON.stringify(o.errors));throw Error(o.message||e.statusText)}return o}async function getDataFromEndPoint(e,t,n){let o="http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/api/"+t,i=e instanceof FormData;if("GET"==n){let e=await fetch(o,{method:n,credentials:"include"});return handleResponse(e).then(e=>e)}let r={method:n,credentials:"include",body:e};i||(r.headers={"Content-Type":"application/json"},r.body=JSON.stringify(e));let a=await fetch(o,r);return handleResponse(a).then(e=>e)}n.d(t,{e:function(){return getDataFromEndPoint}})},24033:function(e,t,n){e.exports=n(50094)}},function(e){e.O(0,[5094,3226,4876,5295,644,2971,2472,1744],function(){return e(e.s=30951)}),_N_E=e.O()}]);