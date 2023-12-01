(()=>{var e={};e.id=5030,e.ids=[5030],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},4141:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>x,tree:()=>l});var s=r(67096),a=r(16132),i=r(37284),n=r.n(i),o=r(32564),c={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>o[e]);r.d(t,c);let l=["",{children:["purchases",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,58857)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/purchases/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,79113)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/purchases/page.tsx"],u="/purchases/page",p={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/purchases/page",pathname:"/purchases",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},2970:(e,t,r)=>{Promise.resolve().then(r.bind(r,44762))},44762:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var s=r(30784),a=r(9885),i=r(62450),n=r(23458);r(48451);var o=r(21971),c=r.n(o),l=r(76267),d=r.n(l),u=r(23282),p=r.n(u),x=r(1853),h=r.n(x),m=r(33987),_=r.n(m),g=r(16614),j=r.n(g),f=r(43872),v=r(92133),y=r.n(v),P=r(62969),b=r.n(P),k=r(42153),w=r.n(k),C=r(16856),q=r.n(C),E=r(95915),T=r.n(E),S=r(19659),A=r(15050),G=r(57114);let TicketCard=({ticket:e,refresh:t})=>{let r=e.qr_url;(0,G.useRouter)();let[i,n]=(0,a.useState)(!1),handleCloseModal=()=>{t(),n(!1)},handleYes=async()=>{await (0,A.e)(e,"user/cancelTicket","POST"),n(!1),t()};return(0,s.jsxs)(d(),{sx:{m:2,boxShadow:3,width:"500px",height:"400px",padding:"0px 0px"},children:[s.jsx(p(),{component:"img",height:"140",image:e.movie.poster_url,alt:`${e.movie.name} Poster`}),(0,s.jsxs)(c(),{container:!0,spacing:2,children:[s.jsx(c(),{item:!0,xs:8,children:(0,s.jsxs)(h(),{children:[s.jsx(_(),{gutterBottom:!0,variant:"h5",component:"div",children:e.movie.name}),s.jsx(_(),{variant:"body2",color:"text.secondary",children:e.theater}),(0,s.jsxs)(_(),{variant:"body2",color:"text.secondary",children:[new Date(e.details.show_date).toLocaleDateString()," • ",e.details.show_time]}),(0,s.jsxs)(_(),{variant:"body2",color:"text.secondary",children:["Screen: ",e.details.screen_id]}),(0,s.jsxs)(_(),{variant:"body2",color:"text.secondary",children:["Seats: ",e.details.seat_ids?e.details.seat_ids.join(", "):"No seats available"]}),(0,s.jsxs)(_(),{variant:"body2",color:"text.secondary",children:["Price: $",e.details.price]})]})}),(0,s.jsxs)(c(),{item:!0,xs:4,children:[(0,s.jsxs)(S.Stack,{direction:"column",spacing:2,children:[e.details.refund_requested?"":s.jsx("img",{src:r,alt:"QR Code",style:{maxWidth:"100%",maxHeight:"100%",height:"auto"}}),e.details.refund_requested?"":s.jsx(j(),{sx:{color:"red"},onClick:()=>{n(!0)},children:"Cancel"})]}),s.jsx(f.default,{mt:5,children:s.jsx(_(),{variant:"subtitle1",children:e.details.refund_requested?s.jsx(y(),{label:"Cancelled",color:"error"}):""})})]}),(0,s.jsxs)(b(),{open:i,onClose:handleCloseModal,children:[s.jsx(w(),{children:"Confirmation"}),s.jsx(q(),{children:"Are you sure you want to cancel?"}),(0,s.jsxs)(T(),{children:[s.jsx(j(),{onClick:handleCloseModal,color:"primary",children:"No"}),s.jsx(j(),{onClick:handleYes,sx:{color:"red"},children:"Yes"})]})]})]})]})},__WEBPACK_DEFAULT_EXPORT__=()=>{let[e,t]=(0,a.useState)([]),[r,o]=(0,a.useState)(!0),[l,d]=(0,a.useState)(null),[u,p]=(0,a.useState)(!1),x=(0,n.Z)(),fetchTickets=async()=>{try{let e=await (0,A.e)("",`user/getPurchaseHistory/${x.user?.user_id}`,"GET");if(!e||!Array.isArray(e.data))throw Error("Data is not in the expected format");t(e.data),o(!1)}catch(e){console.error("Fetching tickets failed: ",e),d(e.message),o(!1)}};if((0,a.useEffect)(()=>{x.user?.user_id?fetchTickets():(d("User ID is not available."),o(!1))},[]),r)return s.jsx("div",{children:"Loading..."});if(l)return(0,s.jsxs)("div",{children:["Error: ",l]});function refresh(){fetchTickets()}return s.jsx(c(),{item:!0,xs:4,sx:{paddingLeft:"90px"},children:s.jsx(i.Z,{title:"Purchases",children:(0,s.jsxs)("div",{className:"container mx-auto px-4 py-6",children:[s.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-6",children:"Your Tickets"}),s.jsx("div",{className:"ticket-grid",children:e.map((e,t)=>s.jsx(TicketCard,{ticket:e,refresh:refresh},t))})]})})})}},58857:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>i,default:()=>c});var s=r(95153);let a=(0,s.createProxy)(String.raw`/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/purchases/page.tsx`),{__esModule:i,$$typeof:n}=a,o=a.default,c=o},48451:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[2958,1323,6267,1853,938,3282,2153,3508,884],()=>__webpack_exec__(4141));module.exports=r})();