(()=>{var e={};e.id=1401,e.ids=[1401],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},5609:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var i=a(67096),s=a(16132),r=a(37284),n=a.n(r),l=a(32564),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);a.d(t,o);let d=["",{children:["movies",{children:["all",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,77369)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/movies/all/page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,79113)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/movies/all/page.tsx"],u="/movies/all/page",p={require:a,loadChunk:()=>Promise.resolve()},m=new i.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/movies/all/page",pathname:"/movies/all",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},64207:(e,t,a)=>{Promise.resolve().then(a.bind(a,83425))},83425:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var i=a(30784),s=a(9885),r=a(57114);a(25404),a(66332);var n=a(23458),l=a(94414),o=a(51892),d=a.n(o),c=a(76267),u=a.n(c),p=a(23282),m=a.n(p),x=a(1853),h=a.n(x),v=a(33987),g=a.n(v),_=a(16614),f=a.n(_),j=a(43872),P=a(88707),y=a.n(P),A=a(21971),C=a.n(A),b=a(39966),E=a.n(b),w=a(15922),k=a(30237),M=a(15050);let T=(0,l.ZP)(d())({margin:"8px",minWidth:"120px"}),MovieCard=({movie:e,onImageClick:t})=>{let a=(0,r.useRouter)(),s=(0,n.Z)(),l=s.isAdmin,editMovie=e=>{a.push(`/movie/${e}/edit`)};async function deleteMovie(e){let t=await (0,M.e)({id:e},"movie/deleteMovie","POST");null!=t&&a.refresh()}return(0,i.jsxs)(u(),{sx:{width:200,height:400,m:1,boxShadow:3},children:[i.jsx(m(),{component:"img",sx:{width:200,height:300,objectFit:"cover",cursor:"pointer"},image:e.banner_url,alt:e.title,onClick:()=>t(e.id)}),(0,i.jsxs)(h(),{children:[i.jsx(g(),{gutterBottom:!0,variant:"subtitle2",component:"div",children:e.title}),i.jsx(g(),{variant:"body2",color:"text.secondary",children:e.format}),l&&i.jsx(f(),{startIcon:i.jsx(w.Z,{}),onClick:()=>{editMovie(e.id)}}),l&&i.jsx(f(),{startIcon:i.jsx(k.Z,{}),onClick:()=>{deleteMovie(e.id)}})]})]})},__WEBPACK_DEFAULT_EXPORT__=()=>{let[e,t]=(0,s.useState)([]),[a,l]=(0,s.useState)([]),[o,d]=(0,s.useState)(""),[c,u]=(0,s.useState)("All"),[p,m]=(0,s.useState)("All");(0,s.useEffect)(()=>{let fetchData=async()=>{try{let e=await (0,M.e)("","movie/all","GET"),a=e.movies.map(e=>(e.genres=e.genres[0].split(",  "),e));t(a),l(a)}catch(e){console.error("Failed to fetch data:",e)}};fetchData()},[]),(0,s.useEffect)(()=>{let t=e.filter(e=>(""===o||e.genres&&e.genres.includes(o))&&("All"===c||e.languages.includes(c))&&("All"===p||e.format.includes(p)));l(t)},[c,p,e]);let x=(0,r.useRouter)(),h=(0,n.Z)(),v=h.isAdmin,handleCardClick=e=>{console.log(`Clicked on ${e}`),x.push(`/movie/${e}`)};return(0,i.jsxs)(E(),{maxWidth:!1,sx:{my:5},children:[(0,i.jsxs)(j.default,{sx:{display:"flex",justifyContent:"space-between",mb:2},children:[i.jsx(g(),{variant:"h6",sx:{mb:2},children:"Recommended Movies"}),v&&i.jsx(f(),{variant:"contained",sx:{paddingLeft:2,mb:2},onClick:()=>{x.push("/movie/add")},children:"Add Movie"}),(0,i.jsxs)(j.default,{sx:{display:"flex"},children:[(0,i.jsxs)(T,{value:c,onChange:(e,t)=>{u(e.target.value)},displayEmpty:!0,children:[i.jsx(y(),{value:"All",children:"All Languages"}),["English","Spanish","French","German","Mandarin Chinese","Hindi","Japanese","Korean","Italian","Russian","Portuguese","Arabic","Turkish","Persian","Swedish","Danish","Norwegian","Finnish","Dutch","Greek","Polish","Hungarian","Czech","Thai","Hebrew","Tamil","Telugu","Bengali"].map(e=>i.jsx(y(),{value:e,children:e},e))]}),(0,i.jsxs)(T,{value:p,onChange:(e,t)=>{m(e.target.value)},displayEmpty:!0,children:[i.jsx(y(),{value:"All",children:"All Formats"}),["SD","3D","4DX","IMAX 70mm"].map(e=>i.jsx(y(),{value:e,children:e},e))]})]})]}),i.jsx(C(),{container:!0,spacing:2,sx:{justifyContent:"start"},children:a.map((e,t)=>i.jsx(C(),{item:!0,sx:{width:"20%",flexGrow:1},children:i.jsx(MovieCard,{movie:e,onImageClick:handleCardClick})},t))})]})}},77369:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>n,__esModule:()=>r,default:()=>o});var i=a(95153);let s=(0,i.createProxy)(String.raw`/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/movies/all/page.tsx`),{__esModule:r,$$typeof:n}=s,l=s.default,o=l},73881:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var i=a(31323);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,i.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}},66332:()=>{},25404:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),a=t.X(0,[2958,1323,6267,1853,3282,6715,4414,3508],()=>__webpack_exec__(5609));module.exports=a})();