(()=>{var e={};e.id=9862,e.ids=[9862],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},81796:(e,t,a)=>{"use strict";var r=a(92439);t.Z=void 0;var i=r(a(64271)),n=a(30784),s=(0,i.default)((0,n.jsx)("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"}),"CloudUpload");t.Z=s},37561:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>s.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>d,routeModule:()=>h,tree:()=>l});var r=a(67096),i=a(16132),n=a(37284),s=a.n(n),o=a(32564),c={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>o[e]);a.d(t,c);let l=["",{children:["book-ticket",{children:["ticket",{children:["[ticketId]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,64072)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/book-ticket/ticket/[ticketId]/page.tsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,79113)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/book-ticket/ticket/[ticketId]/page.tsx"],p="/book-ticket/ticket/[ticketId]/page",m={require:a,loadChunk:()=>Promise.resolve()},h=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/book-ticket/ticket/[ticketId]/page",pathname:"/book-ticket/ticket/[ticketId]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},67403:(e,t,a)=>{Promise.resolve().then(a.bind(a,51881))},51881:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>page});var r=a(30784),i=a(9885),n=a(57114),s=a(52694),o=a.n(s),c=a(33987),l=a.n(c),d=a(43872),p=a(16614),m=a.n(p),h=a(81796);let u={display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw"},x={transform:"scale(1.25)"},ticketCard=({name:e,movieName:t,showTime:a,seatNo:n,theaterName:s,qrLink:c,screenName:p,date:k})=>{let v=(0,i.useRef)(null),[f,g]=(0,i.useState)(!1);return r.jsx("div",{style:u,children:r.jsx("div",{style:x,ref:v,children:(0,r.jsxs)(o(),{elevation:3,sx:{maxWidth:300,margin:"auto",padding:2,backgroundColor:"#80CBC4"},children:[r.jsx(l(),{variant:"h5",component:"h1",sx:{color:"black",textAlign:"center",marginBottom:2},children:"Box Office"}),r.jsx(l(),{variant:"h6",component:"h2",sx:{color:"black",textAlign:"center",marginBottom:2},children:"Ticket"}),(0,r.jsxs)(d.default,{sx:{color:"black",margin:"2px",textAlign:"center"},children:[(0,r.jsxs)(l(),{variant:"body1",children:["Hi ",e,","]}),r.jsx(l(),{variant:"body1",children:"Your ticket for the"}),(0,r.jsxs)(l(),{variant:"body1",children:["Movie Name : ",(0,r.jsxs)("span",{style:{fontWeight:"bold"},children:[" ",t]})]}),(0,r.jsxs)(l(),{variant:"body1",children:["Screen Name : ",p]}),(0,r.jsxs)(l(),{variant:"body1",children:["Date : ",k]}),(0,r.jsxs)(l(),{variant:"body1",children:["Show Time :",(0,r.jsxs)("span",{style:{fontWeight:"bold"},children:[" ",a]})]}),(0,r.jsxs)(l(),{variant:"body1",children:["SeatNos :",(0,r.jsxs)("span",{style:{fontWeight:"bold"},children:[" ",n," "]})]}),(0,r.jsxs)(l(),{variant:"body1",children:["Theater Name : ",s]}),r.jsx(l(),{variant:"body1",children:"scan this QR at the theater to enjoy your show"})]}),r.jsx(d.default,{sx:{display:"flex",justifyContent:"center",marginTop:2,overflow:"visible"},children:r.jsx("img",{src:c,style:{width:128,height:128,backgroundColor:"#ffffff",color:"#000000"},onLoad:()=>g(!0)})}),r.jsx(m(),{onClick:()=>{window.print()},disabled:!f,startIcon:r.jsx(h.Z,{}),sx:{color:"white"},children:"Download as PDF"})]})})})};var k=a(15050);let page=function(){let[e,t]=(0,i.useState)(null),{ticketId:a}=(0,n.useParams)(),[s,o]=(0,i.useState)(!0);return(console.log(a),(0,i.useEffect)(()=>{let fetchTicketDetails=async()=>{if(a){let e=await (0,k.e)("","payment/getTicketData/"+a,"GET"),r=e.data,i={name:r.name,movieName:r.movieName,show_time:r.show_time,seatNo:r.seat_ids.join(" "),theaterName:r.theaterName,qrLink:r.qr_code,screenName:r.screen_id,date:r.show_date.split("T")[0]};t(i)}};fetchTicketDetails()},[a]),e)?r.jsx(r.Fragment,{children:r.jsx(ticketCard,{name:e.name,movieName:e.movieName,showTime:e.show_time,seatNo:e.seatNo,theaterName:e.theaterName,qrLink:e.qrLink,screenName:e.screenName,date:e.date})}):r.jsx("div",{children:"Loading..."})}},64072:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>s,__esModule:()=>n,default:()=>c});var r=a(95153);let i=(0,r.createProxy)(String.raw`/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/book-ticket/ticket/[ticketId]/page.tsx`),{__esModule:n,$$typeof:s}=i,o=i.default,c=o},73881:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var r=a(31323);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,r.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}}};var t=require("../../../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),a=t.X(0,[2958,1323,3508],()=>__webpack_exec__(37561));module.exports=a})();