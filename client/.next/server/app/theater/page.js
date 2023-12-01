(()=>{var e={};e.id=3948,e.ids=[3948],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},9174:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var a=r(67096),i=r(16132),n=r(37284),s=r.n(n),o=r(32564),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["theater",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,79470)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/theater/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,79113)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/theater/page.tsx"],p="/theater/page",m={require:r,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/theater/page",pathname:"/theater",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},3902:(e,t,r)=>{Promise.resolve().then(r.bind(r,17350))},17350:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Theater});var a=r(30784),i=r(15050),n=r(9885),s=r.n(n),o=r(57114),l=r(98331),d=r(21971),c=r.n(d),p=r(33987),m=r.n(p),u=r(16614),x=r.n(u),h=r(43872),g=r(56995),f=r.n(g),j=r(16854),b=r(92870),_=r.n(b),y=r(15922),v=r(30237),T=r(89440),S=r.n(T),w=r(55981),C=r.n(w),P=r(59853),E=r(53602),Z=r(81796),k=r(83476),q=r(52121),U=r(71998),F=r(66558),M=r(83894),z=r(19098),I=r(23458),W=r(39182),A=r(94855);let D=z.Ry({theater_name:z.Z_().min(1,"Screen Name is required"),description:z.Z_().min(1,"description is required").max(350,"Must be under 350 chareceters"),city:z.Z_().min(1,"city is required"),location_url:z.Z_().min(1,"locationUrl is required").url("Invalid Url"),address:z.Z_().min(1,"address is required"),zipcode:z.Z_().refine(e=>/^\d{5}$/.test(e),{message:"Invalid ZipCode number. Must be 5 digits."}),email:z.Z_().min(1,"Email is required").email("Email is invalid"),phno:z.Z_().refine(e=>/^\d{10}$/.test(e),{message:"Invalid phone number. Must be 10 digits."}),state:z.Z_().min(1,"state is required")});function Theater(){let e=(0,k.styled)("input")({clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:1,overflow:"hidden",position:"absolute",bottom:0,left:0,whiteSpace:"nowrap",width:1,accept:"image/*"}),t=(0,I.Z)(),r=(0,o.useRouter)(),[d,p]=(0,n.useState)([]),[u,g]=(0,n.useState)(!1),[b,T]=(0,n.useState)(null),[w,z]=(0,n.useState)(!1),[R,N]=(0,n.useState)(""),[Q,V]=s().useState(!1),[G,O]=s().useState(!1),$=t.isAdmin,{handleSubmit:B,control:L,formState:{errors:X},setValue:J}=(0,F.cI)({resolver:(0,M.F)(D)}),getErrorMessage=e=>e&&"string"==typeof e.message?e.message:"";(0,n.useEffect)(()=>{let fetchData=async()=>{let e=await (0,i.e)("","theater/all","GET"),t=e.data,r=t.map(e=>({name:e.name,description:e.description,locationUrl:e.theater_url,address:e.state,city:e.city,state:e.state,zipcode:e.zipcode,screenDetails:e.screen_ids,imageUrl:e.image_url,nScreens:e.screen_ids.length,email:e.mail,phoneNumber:e.mobile,id:e.id}));p(r)};fetchData()},[]);let getTheaters=async()=>{let e=await (0,i.e)("","theater/all","GET"),t=e.data,r=t.map(e=>({name:e.name,description:e.description,locationUrl:e.theater_url,address:e.state,city:e.city,state:e.state,zipcode:e.zipcode,screenDetails:e.screen_ids,imageUrl:e.image_url,nScreens:e.screen_ids.length,email:e.mail,phoneNumber:e.mobile,id:e.id}));p(r)},updateTheater=async e=>{try{let t=new FormData;b&&t.append("file",b),e.id=R,t.append("data",JSON.stringify(e)),await (0,i.e)(t,"theater/updateTheater","POST"),V(!1),z(!1),N(""),getTheaters()}catch(e){console.log(e)}},onSubmit=async e=>{if(w){updateTheater(e);return}if(b){let t=new FormData;t.append("file",b),t.append("data",JSON.stringify(e));let r=await (0,i.e)(t,"theater/add","POST");200===r.status&&getTheaters(),V(!1),O(!1)}};async function deleteTheater(e){let t=await (0,i.e)({id:e},"theater/deleteTheater","POST");null!=t&&getTheaters()}let addScreen=e=>{r.push("/theater/"+e+"/screens/")};return(0,a.jsxs)(s().Fragment,{children:[a.jsx(l.Z,{}),(0,a.jsxs)(c(),{container:!0,sx:{mt:5},spacing:2,children:[(0,a.jsxs)(c(),{container:!0,sx:{justifyContent:"space-between"},children:[a.jsx(m(),{variant:"h4",children:"Theaters"}),$&&a.jsx(x(),{variant:"contained",startIcon:a.jsx(P.Z,{}),onClick:()=>V(!0),children:"Add Theater"})]}),a.jsx(c(),{item:!0,xs:12,container:!0,children:a.jsx(c(),{container:!0,spacing:2,alignItems:"center",justifyContent:"left",children:d.map((e,t)=>a.jsx(c(),{item:!0,xs:12,md:6,lg:6,children:(0,a.jsxs)(h.default,{sx:{bgcolor:"white",p:3,borderRadius:2,boxShadow:3,display:"flex",flexDirection:{xs:"column",md:"row"},alignItems:"center"},children:[a.jsx("img",{src:e.imageUrl,alt:"Theater",style:{marginBottom:16,marginRight:24,width:192,borderRadius:8}}),(0,a.jsxs)(h.default,{sx:{flex:1},children:[(0,a.jsxs)(c(),{container:!0,justifyContent:"space-between",alignItems:"center",sx:{mb:3},children:[a.jsx(f(),{href:e.locationUrl,target:"_blank",rel:"noopener noreferrer",underline:"hover",style:{textDecoration:"none"},children:a.jsx(m(),{variant:"h6",component:"h3",sx:{mb:1,fontWeight:"medium",fontSize:"2rem",color:"#01579B"},children:e.name})}),$&&(0,a.jsxs)(a.Fragment,{children:[a.jsx(x(),{startIcon:a.jsx(y.Z,{}),onClick:()=>{J("theater_name",e.name),J("description",e.description),J("location_url",e.locationUrl),J("city",e.city),J("state",e.state),J("address",e.address),J("zipcode",e.zipcode.toString()),J("email",e.email),J("phno",e.phoneNumber.toString()),V(!0),z(!0),N(e.id)}}),a.jsx(x(),{startIcon:a.jsx(v.Z,{}),onClick:()=>{deleteTheater(e.id)}})]})]}),a.jsx(x(),{variant:"outlined",sx:{mb:2},onClick:()=>addScreen(e.id),children:"Show Screens"}),a.jsx(m(),{variant:"body2",sx:{ml:"10px",fontSize:"1rem"},children:e.description}),(0,a.jsxs)(h.default,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",fontSize:"0.875rem",color:"text.secondary",mt:2},children:[(0,a.jsxs)(h.default,{sx:{display:"flex",alignItems:"center",borderRadius:"8px",padding:"8px 16px",maxWidth:"fit-content","&:hover":{backgroundColor:"#e0e0e0"}},children:[a.jsx(W.Z,{sx:{marginRight:"8px",color:"#0077b5"}}),a.jsx(m(),{variant:"body1",children:a.jsx(f(),{href:`mailto:${e.email}`,underline:"none",sx:{color:"#0077b5",fontWeight:"bold"},children:e.email})})]}),(0,a.jsxs)(h.default,{sx:{display:"flex",alignItems:"center",mt:1,borderRadius:"8px",padding:"8px 16px",maxWidth:"fit-content","&:hover":{backgroundColor:"#e0e0e0"}},children:[a.jsx(A.Z,{sx:{marginRight:"8px",color:"#0077b5"}}),a.jsx(m(),{variant:"body1",sx:{color:"#333",fontWeight:"bold"},children:e.phoneNumber})]})]})]})]})},t))})})]}),a.jsx(S(),{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:Q,onClose:()=>{V(!1),w&&(z(!1),N(""))},closeAfterTransition:!0,slots:{backdrop:C()},slotProps:{backdrop:{timeout:500}},children:a.jsx(E.default,{in:Q,children:a.jsx(h.default,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4,display:"flex",justifyContent:"center",alignItems:"center",width:"600px",maxWidth:"1000px"},children:(0,a.jsxs)(j.default,{direction:"column",spacing:2,children:[u?"successs":"",(0,a.jsxs)("form",{encType:"multipart/form-data",action:"/Theater/addtheater",onSubmit:B(onSubmit),children:[a.jsx(h.default,{sx:{display:"flex",justifyContent:"center"},children:(0,a.jsxs)(x(),{sx:{width:200},component:"label",variant:"contained",startIcon:a.jsx(Z.Z,{}),children:[b?(0,a.jsxs)(a.Fragment,{children:["File Uploaded ",a.jsx(U.Z,{sx:{ml:1}})]}):"Upload Image",a.jsx(e,{type:"file",onChange:e=>{e.preventDefault(),O(!0);let t=e.target.files[0];T(t)}})]})}),(0,a.jsxs)(c(),{container:!0,spacing:2,children:[(0,a.jsxs)(c(),{item:!0,xs:12,md:12,lg:6,children:[a.jsx(F.Qr,{name:"theater_name",control:L,defaultValue:"",render:({field:e})=>a.jsx(_(),{...e,margin:"normal",fullWidth:!0,id:"theater_name",label:"Theater Name",autoComplete:"theater",autoFocus:!0,error:!!X.theater_name,helperText:getErrorMessage(X.theater_name)})}),a.jsx(F.Qr,{name:"description",control:L,defaultValue:"",render:({field:e})=>a.jsx(_(),{...e,margin:"normal",fullWidth:!0,id:"description",label:"Description",autoComplete:"description",autoFocus:!0,error:!!X.description,helperText:getErrorMessage(X.description)})}),a.jsx(F.Qr,{name:"phno",control:L,defaultValue:"",render:({field:e})=>a.jsx(_(),{...e,margin:"normal",fullWidth:!0,id:"phno",label:"Phone Number",autoComplete:"phno",autoFocus:!0,error:!!X.phno,helperText:getErrorMessage(X.phno)})}),a.jsx(F.Qr,{name:"email",control:L,defaultValue:"",render:({field:e})=>a.jsx(_(),{...e,margin:"normal",fullWidth:!0,id:"email",label:"Email Address",autoComplete:"email",autoFocus:!0,type:"email",error:!!X.email,helperText:getErrorMessage(X.email)})})]}),(0,a.jsxs)(c(),{item:!0,xs:12,md:12,lg:6,children:[a.jsx(F.Qr,{name:"address",control:L,defaultValue:"",render:({field:e})=>a.jsx(_(),{...e,margin:"normal",fullWidth:!0,id:"address",label:"Address",autoComplete:"address",autoFocus:!0,error:!!X.address,helperText:getErrorMessage(X.address)})}),a.jsx(F.Qr,{name:"city",control:L,defaultValue:"",render:({field:e})=>a.jsx(_(),{...e,margin:"normal",fullWidth:!0,id:"city",label:"City",autoComplete:"city",autoFocus:!0,error:!!X.city,helperText:getErrorMessage(X.city)})}),a.jsx(F.Qr,{name:"zipcode",control:L,defaultValue:"",render:({field:e})=>a.jsx(_(),{...e,margin:"normal",fullWidth:!0,id:"zipcode",label:"Zip Code",name:"zipcode",autoComplete:"zipcode",autoFocus:!0,error:!!X.zipcode,helperText:getErrorMessage(X.zipcode)})}),a.jsx(F.Qr,{name:"state",control:L,defaultValue:"",render:({field:e})=>a.jsx(_(),{...e,margin:"normal",fullWidth:!0,id:"state",label:"State",name:"state",autoComplete:"state",autoFocus:!0,error:!!X.state,helperText:getErrorMessage(X.state)})})]})]}),a.jsx(F.Qr,{name:"location_url",control:L,defaultValue:"",render:({field:e})=>a.jsx(_(),{...e,margin:"normal",fullWidth:!0,id:"location_url",label:"Location Url",autoComplete:"location_url",autoFocus:!0,error:!!X.location_url,helperText:getErrorMessage(X.location_url)})}),a.jsx(x(),{variant:"contained",endIcon:a.jsx(q.Z,{}),style:{width:"300px",left:"125px"},type:"submit",children:w?"Update Theate":"Add Theater"})]})]})})})})]})}},79470:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>s,__esModule:()=>n,default:()=>l});var a=r(95153);let i=(0,a.createProxy)(String.raw`/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/theater/page.tsx`),{__esModule:n,$$typeof:s}=i,o=i.default,l=o},73881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var a=r(31323);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,a.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[2958,1323,6854,6715,9226,5572,3508],()=>__webpack_exec__(9174));module.exports=r})();