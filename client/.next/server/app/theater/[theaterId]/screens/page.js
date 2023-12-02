(()=>{var e={};e.id=9504,e.ids=[9504],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},16947:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>d,routeModule:()=>p,tree:()=>l});var i=r(67096),n=r(16132),a=r(37284),s=r.n(a),o=r(32564),c={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>o[e]);r.d(t,c);let l=["",{children:["theater",{children:["[theaterId]",{children:["screens",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,19287)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/theater/[theaterId]/screens/page.tsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,79113)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/theater/[theaterId]/screens/page.tsx"],m="/theater/[theaterId]/screens/page",u={require:r,loadChunk:()=>Promise.resolve()},p=new i.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/theater/[theaterId]/screens/page",pathname:"/theater/[theaterId]/screens",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},46322:(e,t,r)=>{Promise.resolve().then(r.bind(r,47718))},47718:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Screen});var i=r(30784),n=r(9885),a=r.n(n),s=r(57114),o=r(39966),c=r.n(o),l=r(98331),d=r(21971),m=r.n(d),u=r(33987),p=r.n(u),x=r(16614),h=r.n(x),g=r(43872),f=r(92133),v=r.n(f),_=r(89440),j=r.n(_),b=r(55981),y=r.n(b),S=r(53602),w=r(16854),P=r(58111),k=r.n(P),M=r(97445),I=r.n(M),C=r(51892),T=r.n(C),E=r(88707),A=r.n(E),q=r(34550),R=r.n(q),D=r(92870),G=r.n(D),U=r(15922),$=r(30237),W=r(59853),z=r(52121),O=r(15050),Z=r(66558),B=r(83894),F=r(19098),X=r(23458);let K={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},L=F.Ry({movie:F.Z_().min(1,"Movie is required"),ticketPrice:F.Z_().min(1,"ticket price is required")});function Screen(){let e=(0,s.useRouter)(),t=(0,X.Z)(),{theaterId:r}=(0,s.useParams)(),[o,d]=(0,n.useState)([]),[u,x]=a().useState(!1),[f,_]=(0,n.useState)([]),[b,P]=(0,n.useState)(null),handleClose=()=>x(!1),{handleSubmit:M,control:C,formState:{errors:E}}=(0,Z.cI)({resolver:(0,B.F)(L)});(0,n.useEffect)(()=>{let fetchScreenData=async()=>{let e=String(r),t=await (0,O.e)("","screen/"+e,"GET"),i=t.data;console.log(i);let n=i.map(e=>({id:e.id,name:e.name,timings:e.show_timings,maxCapacity:e.seating_capacity,imageUrl:e.movie_image,format:e.format,currentMovie:e.movie_name,runtime:e.run_time,cost:e.cost,movieId:e.movie_id,columns:e.columns,seatDetails:e.seating_arrangement,rows:e.rows}));d(n)},fetchMovieData=async()=>{let e=await (0,O.e)("","movie/all","GET"),t=e.movies,r=t.map(e=>({id:e.id,name:e.title}));console.log(r),_(r)};fetchScreenData(),fetchMovieData()},[]);let getErrorMessage=e=>e&&"string"==typeof e.message?e.message:"";async function deleteScreen(e){if(null===e.currentMovie||""===e.currentMovie)return;let t={id:e.id},i=await (0,O.e)(t,"screen/deleteScreen","POST");if(null!=i){let e=await (0,O.e)("",`screen/${r}`,"GET"),t=e.data,i=t.map(e=>({id:e.id,name:e.name,timings:e.show_timings,maxCapacity:e.seating_capacity,imageUrl:e.movie_image,format:e.format,currentMovie:e.movie_name,runtime:e.run_time,cost:e.cost,movieId:e.movie_id,columns:e.columns,seatDetails:e.seating_arrangement,rows:e.rows}));d(i)}}async function onSubmit(e){e.theater_id=r,e.screen_id=b;try{await (0,O.e)(e,"screen/addMovie","POST");let t=await (0,O.e)("","screen/"+r,"GET"),i=t.data,n=i.map(e=>({id:e.id,name:e.name,timings:e.show_timings,maxCapacity:e.seating_capacity,imageUrl:e.movie_image,format:e.screen_type,currentMovie:e.movie_name,runtime:String(e.run_time),cost:e.cost,movieId:e.movie_id}));d(n),handleClose()}catch(e){console.log(e)}}let handleOpenModal=e=>{console.log(e),P(e),x(!u)},q=t.isAdmin,redirectToBuy=(t,i)=>{e.push(`/movies/${t.movieId}/buyTicket?theater=${r}&screen=${t.id}&time=${i}`)},D={width:"650px",height:"500px"};return(0,i.jsxs)(a().Fragment,{children:[i.jsx(l.Z,{}),i.jsx(c(),{maxWidth:"xl",children:(0,i.jsxs)(m(),{container:!0,spacing:2,children:[(0,i.jsxs)(m(),{container:!0,sx:{mb:2,marginTop:10,justifyContent:"space-between"},children:[i.jsx(p(),{variant:"h4",children:"Screens"}),q&&i.jsx(h(),{variant:"contained",startIcon:i.jsx(W.Z,{}),onClick:()=>{e.push("/theater/"+r+"/addScreen")},children:"Add Screen"})]}),i.jsx(m(),{item:!0,xs:12,container:!0,children:i.jsx(m(),{container:!0,spacing:2,alignItems:"center",justifyContent:"left",children:o.map((n,a)=>null!=n.currentMovie&&""!=n.currentMovie||t.isAdmin?i.jsx(m(),{item:!0,sx:D,children:(0,i.jsxs)(g.default,{sx:{bgcolor:"white",p:3,borderRadius:2,boxShadow:3,display:"flex",flexDirection:{xs:"column",md:"row"},alignItems:"center",height:"100%"},children:[i.jsx("img",{src:n.imageUrl,alt:"screeb",style:{marginBottom:16,marginRight:24,width:192,borderRadius:8}}),(0,i.jsxs)(g.default,{sx:{flex:1},children:[(0,i.jsxs)(m(),{container:!0,justifyContent:"space-between",alignItems:"center",sx:{mb:3},children:[i.jsx(p(),{variant:"h6",component:"h3",sx:{mb:1,fontWeight:"medium",fontSize:"2rem"},style:{},color:"#01579B",children:n.name}),(0,i.jsxs)(g.default,{children:[q&&i.jsx(h(),{startIcon:i.jsx(U.Z,{}),sx:{mb:1,fontSize:"1rem"},onClick:()=>{localStorage.setItem("screenDetails",JSON.stringify(n)),e.push(`/theater/${r}/editScreen`)}}),q&&i.jsx(h(),{startIcon:i.jsx($.Z,{}),sx:{mb:1,fontSize:"1rem"},onClick:()=>deleteScreen(n)})]})]}),q&&i.jsx(h(),{sx:{mb:1,fontSize:"1rem"},onClick:()=>handleOpenModal(n.id),children:"Add/Change Movie"}),(0,i.jsxs)(g.default,{sx:{px:1,py:.5,borderRadius:1,mr:1,mb:1,fontSize:"1rem"},children:["Current Movie: ",n.currentMovie]}),(0,i.jsxs)(g.default,{sx:{px:1,py:.5,borderRadius:1,mr:1,mb:1,fontSize:"1rem"},children:["Run time: ",n.runtime," min"]}),(0,i.jsxs)(g.default,{sx:{px:1,py:.5,borderRadius:1,mr:1,mb:1,fontSize:"1rem"},children:["Price: ",n.cost,"$"]}),(0,i.jsxs)(g.default,{sx:{display:"flex",flexWrap:"wrap",alignItems:"center",mb:2},children:[i.jsx(g.default,{sx:{ml:1},children:"Timings:"}),i.jsx(m(),{container:!0,spacing:2,sx:{mt:1},children:i.jsx(g.default,{sx:{ml:1},children:n.timings.map((e,t)=>i.jsx(v(),{sx:{ml:1},label:e,onClick:()=>redirectToBuy(n,e)},t))})})]}),i.jsx(h(),{onClick:()=>{console.log(n),e.push(`/movies/${n.movieId}/buyTicket`)},variant:"contained",children:"Book Ticket"})]})]})},a):null)})})]})}),i.jsx(j(),{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:u,onClose:handleClose,closeAfterTransition:!0,slots:{backdrop:y()},slotProps:{backdrop:{timeout:500}},children:i.jsx(S.default,{in:u,children:i.jsx(g.default,{sx:{...K,display:"flex",justifyContent:"center",alignItems:"center",width:"600px",maxWidth:"1000px"},children:i.jsx(w.default,{direction:"column",spacing:2,sx:{width:"100%",maxWidth:"900px"},children:(0,i.jsxs)("form",{action:"/screen/addMovie",onSubmit:M(onSubmit),children:[(0,i.jsxs)(m(),{container:!0,spacing:2,children:[i.jsx(m(),{item:!0,xs:12,md:12,lg:6,children:i.jsx(Z.Qr,{name:"movie",control:C,defaultValue:"",render:({field:e})=>(0,i.jsxs)(k(),{fullWidth:!0,margin:"normal",error:!!E.format,children:[i.jsx(I(),{children:"Add Movie"}),i.jsx(T(),{...e,label:"Add Movie",children:f.map(e=>i.jsx(A(),{value:e.id,children:e.name},e.id))}),i.jsx(R(),{id:"component-error-text",children:getErrorMessage(E.format)})]})})}),i.jsx(m(),{item:!0,xs:12,md:12,lg:6,children:i.jsx(Z.Qr,{name:"ticketPrice",control:C,defaultValue:"",render:({field:e})=>i.jsx(G(),{...e,InputProps:{inputProps:{min:5,max:10}},type:"number",label:"Ticket Price",error:!!E.ticketPrice,helperText:getErrorMessage(E.ticketPrice),fullWidth:!0,margin:"normal"})})})]}),i.jsx(h(),{variant:"contained",endIcon:i.jsx(z.Z,{}),type:"submit",children:"Add Movie"})]})})})})})]})}},19287:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>s,__esModule:()=>a,default:()=>c});var i=r(95153);let n=(0,i.createProxy)(String.raw`/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/theater/[theaterId]/screens/page.tsx`),{__esModule:a,$$typeof:s}=n,o=n.default,c=o},73881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var i=r(31323);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,i.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}}};var t=require("../../../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[2958,1323,6854,6715,9532,3508],()=>__webpack_exec__(16947));module.exports=r})();