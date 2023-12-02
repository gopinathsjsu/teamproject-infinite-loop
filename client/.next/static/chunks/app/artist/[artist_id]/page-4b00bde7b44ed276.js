(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1279],{3283:function(e,t,r){"use strict";r.d(t,{Z:function(){return b}});var a=r(20791),o=r(13428),i=r(2265),n=r(57042),l=r(95600),s=r(35843),u=r(87927),c=r(38173),d=r(57437),v=(0,c.Z)((0,d.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),f=r(26520),m=r(25702);function getAvatarUtilityClass(e){return(0,m.Z)("MuiAvatar",e)}(0,f.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);let h=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],useUtilityClasses=e=>{let{classes:t,variant:r,colorDefault:a}=e;return(0,l.Z)({root:["root",r,a&&"colorDefault"],img:["img"],fallback:["fallback"]},getAvatarUtilityClass,t)},p=(0,s.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],r.colorDefault&&t.colorDefault]}})(({theme:e,ownerState:t})=>(0,o.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},"square"===t.variant&&{borderRadius:0},t.colorDefault&&(0,o.Z)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[600]}))),g=(0,s.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),x=(0,s.ZP)(v,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"}),Z=i.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiAvatar"}),{alt:l,children:s,className:c,component:v="div",imgProps:f,sizes:m,src:Z,srcSet:b,variant:y="circular"}=r,S=(0,a.Z)(r,h),w=null,C=function({crossOrigin:e,referrerPolicy:t,src:r,srcSet:a}){let[o,n]=i.useState(!1);return i.useEffect(()=>{if(!r&&!a)return;n(!1);let o=!0,i=new Image;return i.onload=()=>{o&&n("loaded")},i.onerror=()=>{o&&n("error")},i.crossOrigin=e,i.referrerPolicy=t,i.src=r,a&&(i.srcset=a),()=>{o=!1}},[e,t,r,a]),o}((0,o.Z)({},f,{src:Z,srcSet:b})),k=Z||b,R=k&&"error"!==C,j=(0,o.Z)({},r,{colorDefault:!R,component:v,variant:y}),P=useUtilityClasses(j);return w=R?(0,d.jsx)(g,(0,o.Z)({alt:l,srcSet:b,src:Z,sizes:m,ownerState:j,className:P.img},f)):null!=s?s:k&&l?l[0]:(0,d.jsx)(x,{ownerState:j,className:P.fallback}),(0,d.jsx)(p,(0,o.Z)({as:v,ownerState:j,className:(0,n.Z)(P.root,c),ref:t},S,{children:w}))});var b=Z},63955:function(e,t,r){"use strict";var a=r(37014),o=r(28702),i=r(35843),n=r(87927);let l=(0,a.Z)({createStyledComponent:(0,i.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`maxWidth${(0,o.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,n.Z)({props:e,name:"MuiContainer"})});t.Z=l},29872:function(e,t,r){"use strict";r.d(t,{Z:function(){return g}});var a=r(20791),o=r(13428),i=r(2265),n=r(57042),l=r(95600),s=r(89975),u=r(35843),styles_getOverlayAlpha=e=>((e<1?5.11916*e**2:4.5*Math.log(e+1)+2)/100).toFixed(2),c=r(87927),d=r(26520),v=r(25702);function getPaperUtilityClass(e){return(0,v.Z)("MuiPaper",e)}(0,d.Z)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var f=r(57437);let m=["className","component","elevation","square","variant"],useUtilityClasses=e=>{let{square:t,elevation:r,variant:a,classes:o}=e,i={root:["root",a,!t&&"rounded","elevation"===a&&`elevation${r}`]};return(0,l.Z)(i,getPaperUtilityClass,o)},h=(0,u.ZP)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],!r.square&&t.rounded,"elevation"===r.variant&&t[`elevation${r.elevation}`]]}})(({theme:e,ownerState:t})=>{var r;return(0,o.Z)({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},"outlined"===t.variant&&{border:`1px solid ${(e.vars||e).palette.divider}`},"elevation"===t.variant&&(0,o.Z)({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&"dark"===e.palette.mode&&{backgroundImage:`linear-gradient(${(0,s.Fq)("#fff",styles_getOverlayAlpha(t.elevation))}, ${(0,s.Fq)("#fff",styles_getOverlayAlpha(t.elevation))})`},e.vars&&{backgroundImage:null==(r=e.vars.overlays)?void 0:r[t.elevation]}))}),p=i.forwardRef(function(e,t){let r=(0,c.Z)({props:e,name:"MuiPaper"}),{className:i,component:l="div",elevation:s=1,square:u=!1,variant:d="elevation"}=r,v=(0,a.Z)(r,m),p=(0,o.Z)({},r,{component:l,elevation:s,square:u,variant:d}),g=useUtilityClasses(p);return(0,f.jsx)(h,(0,o.Z)({as:l,ownerState:p,className:(0,n.Z)(g.root,i),ref:t},v))});var g=p},6785:function(e,t,r){"use strict";r.d(t,{Z:function(){return g}});var a=r(13428),o=r(20791),i=r(2265),n=r(57042),l=r(95600),s=r(28702),u=r(87927),c=r(35843),d=r(26520),v=r(25702);function getSvgIconUtilityClass(e){return(0,v.Z)("MuiSvgIcon",e)}(0,d.Z)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var f=r(57437);let m=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],useUtilityClasses=e=>{let{color:t,fontSize:r,classes:a}=e,o={root:["root","inherit"!==t&&`color${(0,s.Z)(t)}`,`fontSize${(0,s.Z)(r)}`]};return(0,l.Z)(o,getSvgIconUtilityClass,a)},h=(0,c.ZP)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,"inherit"!==r.color&&t[`color${(0,s.Z)(r.color)}`],t[`fontSize${(0,s.Z)(r.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var r,a,o,i,n,l,s,u,c,d,v,f,m;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(r=e.transitions)||null==(a=r.create)?void 0:a.call(r,"fill",{duration:null==(o=e.transitions)||null==(o=o.duration)?void 0:o.shorter}),fontSize:({inherit:"inherit",small:(null==(i=e.typography)||null==(n=i.pxToRem)?void 0:n.call(i,20))||"1.25rem",medium:(null==(l=e.typography)||null==(s=l.pxToRem)?void 0:s.call(l,24))||"1.5rem",large:(null==(u=e.typography)||null==(c=u.pxToRem)?void 0:c.call(u,35))||"2.1875rem"})[t.fontSize],color:null!=(d=null==(v=(e.vars||e).palette)||null==(v=v[t.color])?void 0:v.main)?d:({action:null==(f=(e.vars||e).palette)||null==(f=f.action)?void 0:f.active,disabled:null==(m=(e.vars||e).palette)||null==(m=m.action)?void 0:m.disabled,inherit:void 0})[t.color]}}),p=i.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiSvgIcon"}),{children:l,className:s,color:c="inherit",component:d="svg",fontSize:v="medium",htmlColor:p,inheritViewBox:g=!1,titleAccess:x,viewBox:Z="0 0 24 24"}=r,b=(0,o.Z)(r,m),y=i.isValidElement(l)&&"svg"===l.type,S=(0,a.Z)({},r,{color:c,component:d,fontSize:v,instanceFontSize:e.fontSize,inheritViewBox:g,viewBox:Z,hasSvgAsChild:y}),w={};g||(w.viewBox=Z);let C=useUtilityClasses(S);return(0,f.jsxs)(h,(0,a.Z)({as:d,className:(0,n.Z)(C.root,s),focusable:"false",color:p,"aria-hidden":!x||void 0,role:x?"img":void 0,ref:t},w,b,y&&l.props,{ownerState:S,children:[y?l.props.children:l,x?(0,f.jsx)("title",{children:x}):null]}))});p.muiName="SvgIcon";var g=p},38173:function(e,t,r){"use strict";r.d(t,{Z:function(){return createSvgIcon}});var a=r(13428),o=r(2265),i=r(6785),n=r(57437);function createSvgIcon(e,t){function Component(r,o){return(0,n.jsx)(i.Z,(0,a.Z)({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return Component.muiName=i.Z.muiName,o.memo(o.forwardRef(Component))}},37014:function(e,t,r){"use strict";r.d(t,{Z:function(){return createContainer}});var a=r(20791),o=r(13428),i=r(2265),n=r(57042),l=r(61380),s=r(25702),u=r(95600),c=r(48153),d=r(39190),v=r(27796),f=r(57437);let m=["className","component","disableGutters","fixed","maxWidth","classes"],h=(0,v.Z)(),p=(0,d.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`maxWidth${(0,l.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemePropsDefault=e=>(0,c.Z)({props:e,name:"MuiContainer",defaultTheme:h}),useUtilityClasses=(e,t)=>{let{classes:r,fixed:a,disableGutters:o,maxWidth:i}=e,n={root:["root",i&&`maxWidth${(0,l.Z)(String(i))}`,a&&"fixed",o&&"disableGutters"]};return(0,u.Z)(n,e=>(0,s.Z)(t,e),r)};function createContainer(e={}){let{createStyledComponent:t=p,useThemeProps:r=useThemePropsDefault,componentName:l="MuiContainer"}=e,s=t(({theme:e,ownerState:t})=>(0,o.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}}),({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce((t,r)=>{let a=e.breakpoints.values[r];return 0!==a&&(t[e.breakpoints.up(r)]={maxWidth:`${a}${e.breakpoints.unit}`}),t},{}),({theme:e,ownerState:t})=>(0,o.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}})),u=i.forwardRef(function(e,t){let i=r(e),{className:u,component:c="div",disableGutters:d=!1,fixed:v=!1,maxWidth:h="lg"}=i,p=(0,a.Z)(i,m),g=(0,o.Z)({},i,{component:c,disableGutters:d,fixed:v,maxWidth:h}),x=useUtilityClasses(g,l);return(0,f.jsx)(s,(0,o.Z)({as:c,ownerState:g,className:(0,n.Z)(x.root,u),ref:t},p))});return u}},39190:function(e,t,r){"use strict";var a=r(61047);let o=(0,a.ZP)();t.Z=o},97149:function(e,t,r){Promise.resolve().then(r.bind(r,65135))},65135:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return ArtistDetails}});var a=r(57437),o=r(2265),i=r(24033),n=r(36661),l=r(43226),s=r(63955),u=r(28874),c=r(3283),d=r(29872);function ArtistDetails(){(0,i.useRouter)();let{artist_id:e}=(0,i.useParams)(),[t,r]=(0,o.useState)(null),[v,f]=(0,o.useState)(!0);return((0,o.useEffect)(()=>{let fetchData=async()=>{if("string"==typeof e)try{f(!0);let t=await (0,n.e)("","artist/".concat(e),"GET");r(t.artist)}catch(e){console.error("Failed to fetch data:",e)}finally{f(!1)}};fetchData()},[e]),v)?(0,a.jsx)(l.Z,{children:"Loading..."}):t?(0,a.jsx)(s.Z,{maxWidth:"lg",sx:{mt:4,mb:4},children:(0,a.jsxs)(u.ZP,{container:!0,spacing:0,children:[" ",(0,a.jsx)(u.ZP,{item:!0,xs:6,md:5,lg:4,children:(0,a.jsx)(c.Z,{alt:t.name,src:t.profile_url,variant:"square",sx:{width:"90%",height:"auto"}})}),(0,a.jsx)(u.ZP,{item:!0,xs:14,md:10,lg:8,children:(0,a.jsxs)(d.Z,{sx:{p:4,boxShadow:3},children:[(0,a.jsx)(l.Z,{variant:"h3",component:"h2",sx:{fontWeight:"bold",mb:2},children:t.name}),(0,a.jsx)(l.Z,{variant:"h5",color:"textSecondary",sx:{mb:2},children:t.profession}),(0,a.jsxs)(l.Z,{variant:"h6",color:"textSecondary",sx:{mb:2},children:["Date of Birth: ",t.dob.split("T")[0]]}),(0,a.jsx)(l.Z,{variant:"body1",sx:{mb:2},children:t.description})]})})]})}):(0,a.jsx)(l.Z,{children:"No artist data available"})}},36661:function(e,t,r){"use strict";async function handleResponse(e){let t=e.headers.get("Content-Type")||"",r=t.includes("application/json"),a=r?await e.json():await e.text();if(!e.ok){if(r&&null!==a.errors)throw Error(JSON.stringify(a.errors));throw Error(a.message||e.statusText)}return a}async function getDataFromEndPoint(e,t,r){let a="http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/api/"+t,o=e instanceof FormData;if("GET"==r){let e=await fetch(a,{method:r,credentials:"include"});return handleResponse(e).then(e=>e)}let i={method:r,credentials:"include",body:e};o||(i.headers={"Content-Type":"application/json"},i.body=JSON.stringify(e));let n=await fetch(a,i);return handleResponse(n).then(e=>e)}r.d(t,{e:function(){return getDataFromEndPoint}})},24033:function(e,t,r){e.exports=r(50094)}},function(e){e.O(0,[5094,3226,8874,2971,2472,1744],function(){return e(e.s=97149)}),_N_E=e.O()}]);