(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1401],{46446:function(e,t,i){"use strict";var n=i(26314);t.Z=void 0;var s=n(i(80984)),a=i(57437),r=(0,s.default)((0,a.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=r},13391:function(e,t,i){"use strict";var n=i(26314);t.Z=void 0;var s=n(i(80984)),a=i(57437),r=(0,s.default)((0,a.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.Z=r},63955:function(e,t,i){"use strict";var n=i(37014),s=i(28702),a=i(35843),r=i(87927);let o=(0,n.Z)({createStyledComponent:(0,a.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.root,t[`maxWidth${(0,s.Z)(String(i.maxWidth))}`],i.fixed&&t.fixed,i.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,r.Z)({props:e,name:"MuiContainer"})});t.Z=o},37014:function(e,t,i){"use strict";i.d(t,{Z:function(){return createContainer}});var n=i(20791),s=i(13428),a=i(2265),r=i(57042),o=i(61380),l=i(25702),d=i(95600),u=i(48153),c=i(39190),h=i(27796),m=i(57437);let p=["className","component","disableGutters","fixed","maxWidth","classes"],x=(0,h.Z)(),g=(0,c.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.root,t[`maxWidth${(0,o.Z)(String(i.maxWidth))}`],i.fixed&&t.fixed,i.disableGutters&&t.disableGutters]}}),useThemePropsDefault=e=>(0,u.Z)({props:e,name:"MuiContainer",defaultTheme:x}),useUtilityClasses=(e,t)=>{let{classes:i,fixed:n,disableGutters:s,maxWidth:a}=e,r={root:["root",a&&`maxWidth${(0,o.Z)(String(a))}`,n&&"fixed",s&&"disableGutters"]};return(0,d.Z)(r,e=>(0,l.Z)(t,e),i)};function createContainer(e={}){let{createStyledComponent:t=g,useThemeProps:i=useThemePropsDefault,componentName:o="MuiContainer"}=e,l=t(({theme:e,ownerState:t})=>(0,s.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}}),({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce((t,i)=>{let n=e.breakpoints.values[i];return 0!==n&&(t[e.breakpoints.up(i)]={maxWidth:`${n}${e.breakpoints.unit}`}),t},{}),({theme:e,ownerState:t})=>(0,s.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}})),d=a.forwardRef(function(e,t){let a=i(e),{className:d,component:u="div",disableGutters:c=!1,fixed:h=!1,maxWidth:x="lg"}=a,g=(0,n.Z)(a,p),f=(0,s.Z)({},a,{component:u,disableGutters:c,fixed:h,maxWidth:x}),v=useUtilityClasses(f,o);return(0,m.jsx)(l,(0,s.Z)({as:u,ownerState:f,className:(0,r.Z)(v.root,d),ref:t},g))});return d}},16516:function(e,t,i){Promise.resolve().then(i.bind(i,61098))},61098:function(e,t,i){"use strict";i.r(t);var n=i(57437),s=i(2265),a=i(24033);i(98520),i(9499);var r=i(16896),o=i(35843),l=i(10654),d=i(15133),u=i(45461),c=i(88469),h=i(43226),m=i(49050),p=i(39227),x=i(65507),g=i(28874),f=i(63955),v=i(13391),Z=i(46446),b=i(36661);let j=(0,o.ZP)(l.Z)({margin:"8px",minWidth:"120px"}),MovieCard=e=>{let{movie:t,onImageClick:i}=e,s=(0,a.useRouter)(),o=(0,r.Z)(),l=o.isAdmin,editMovie=e=>{s.push("/movies/".concat(e,"/edit"))};async function deleteMovie(e){let t=await (0,b.e)({id:e},"movie/deleteMovie","POST");null!=t&&s.refresh()}return(0,n.jsxs)(d.Z,{sx:{width:200,height:400,m:1,boxShadow:3},children:[(0,n.jsx)(u.Z,{component:"img",sx:{width:200,height:300,objectFit:"cover",cursor:"pointer"},image:t.banner_url,alt:t.title,onClick:()=>i(t.id)}),(0,n.jsxs)(c.Z,{children:[(0,n.jsx)(h.Z,{gutterBottom:!0,variant:"subtitle2",component:"div",children:t.title}),(0,n.jsx)(h.Z,{variant:"body2",color:"text.secondary",children:t.format}),l&&(0,n.jsx)(m.Z,{startIcon:(0,n.jsx)(v.Z,{}),onClick:()=>{editMovie(t.id)}}),l&&(0,n.jsx)(m.Z,{startIcon:(0,n.jsx)(Z.Z,{}),onClick:()=>{deleteMovie(t.id)}})]})]})};t.default=()=>{let[e,t]=(0,s.useState)([]),[i,o]=(0,s.useState)([]),[l,d]=(0,s.useState)(""),[u,c]=(0,s.useState)("All"),[v,Z]=(0,s.useState)("All");(0,s.useEffect)(()=>{let fetchData=async()=>{try{let e=await (0,b.e)("","movie/all","GET"),i=e.movies.map(e=>(e.genres=e.genres[0].split(",  "),e));t(i),o(i)}catch(e){console.error("Failed to fetch data:",e)}};fetchData()},[]),(0,s.useEffect)(()=>{let t=e.filter(e=>(""===l||e.genres&&e.genres.includes(l))&&("All"===u||e.languages.includes(u))&&("All"===v||e.format.includes(v)));o(t)},[u,v,e]);let C=(0,a.useRouter)(),k=(0,r.Z)(),y=k.isAdmin,handleCardClick=e=>{console.log("Clicked on ".concat(e)),C.push("/movies/".concat(e))};return(0,n.jsxs)(f.Z,{maxWidth:!1,sx:{my:5},children:[(0,n.jsxs)(p.Z,{sx:{display:"flex",justifyContent:"space-between",mb:2},children:[(0,n.jsx)(h.Z,{variant:"h6",sx:{mb:2},children:"Recommended Movies"}),y&&(0,n.jsx)(m.Z,{variant:"contained",sx:{paddingLeft:2,mb:2},onClick:()=>{C.push("/movies/add")},children:"Add Movie"}),(0,n.jsxs)(p.Z,{sx:{display:"flex"},children:[(0,n.jsxs)(j,{value:u,onChange:(e,t)=>{c(e.target.value)},displayEmpty:!0,children:[(0,n.jsx)(x.Z,{value:"All",children:"All Languages"}),["English","Spanish","French","German","Mandarin Chinese","Hindi","Japanese","Korean","Italian","Russian","Portuguese","Arabic","Turkish","Persian","Swedish","Danish","Norwegian","Finnish","Dutch","Greek","Polish","Hungarian","Czech","Thai","Hebrew","Tamil","Telugu","Bengali"].map(e=>(0,n.jsx)(x.Z,{value:e,children:e},e))]}),(0,n.jsxs)(j,{value:v,onChange:(e,t)=>{Z(e.target.value)},displayEmpty:!0,children:[(0,n.jsx)(x.Z,{value:"All",children:"All Formats"}),["SD","3D","4DX","IMAX 70mm"].map(e=>(0,n.jsx)(x.Z,{value:e,children:e},e))]})]})]}),(0,n.jsx)(g.ZP,{container:!0,spacing:2,sx:{justifyContent:"start"},children:i.map((e,t)=>(0,n.jsx)(g.ZP,{item:!0,sx:{width:"20%",flexGrow:1},children:(0,n.jsx)(MovieCard,{movie:e,onImageClick:handleCardClick})},t))})]})}},36661:function(e,t,i){"use strict";async function handleResponse(e){let t=e.headers.get("Content-Type")||"",i=t.includes("application/json"),n=i?await e.json():await e.text();if(!e.ok){if(i&&null!==n.errors)throw Error(JSON.stringify(n.errors));throw Error(n.message||e.statusText)}return n}async function getDataFromEndPoint(e,t,i){let n="http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/api/"+t,s=e instanceof FormData;if("GET"==i){let e=await fetch(n,{method:i,credentials:"include"});return handleResponse(e).then(e=>e)}let a={method:i,credentials:"include",body:e};s||(a.headers={"Content-Type":"application/json"},a.body=JSON.stringify(e));let r=await fetch(n,a);return handleResponse(r).then(e=>e)}i.d(t,{e:function(){return getDataFromEndPoint}})},16896:function(e,t,i){"use strict";var n=i(94660),s=i(74810);let a=(0,n.Ue)((0,s.tJ)(e=>({authUser:null,isLoggedIn:!1,requestLoading:!1,user:null,pincode:null,isAdmin:!1,setIsAdmin:t=>e(e=>({...e,isAdmin:t})),setUser:t=>e(e=>({...e,user:t})),setLoggedIn:()=>e(e=>({...e,isLoggedIn:!0})),setLoggedOut:()=>e(e=>({...e,isLoggedIn:!1})),setAuthUser:t=>e(e=>({...e,authUser:t})),setPinCode:t=>e(e=>({...e,pincode:t})),setRequestLoading:t=>e(e=>({...e,requestLoading:t})),reset:()=>e({authUser:null,requestLoading:!1})}),{name:"user-storage"}));t.Z=a}},function(e){e.O(0,[5094,3226,4876,5295,8874,1444,2171,8500,644,5166,9785,2971,2472,1744],function(){return e(e.s=16516)}),_N_E=e.O()}]);