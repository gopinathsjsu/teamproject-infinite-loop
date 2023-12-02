(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9504],{11865:function(e,t,n){Promise.resolve().then(n.bind(n,23734))},23734:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return Screen}});var i=n(57437),r=n(2265),s=n(24033),a=n(63955),o=n(3857),c=n(28874),l=n(43226),d=n(49050),m=n(39227),u=n(47827),h=n(26931),x=n(39350),g=n(72261),p=n(98075),f=n(84081),j=n(50819),Z=n(10654),v=n(65507),b=n(45550),y=n(55594),S=n(13391),w=n(46446),_=n(634),P=n(26398),k=n(36661),C=n(61865),M=n(38110),I=n(74578),T=n(16896);let E={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},R=I.Ry({movie:I.Z_().min(1,"Movie is required"),ticketPrice:I.Z_().min(1,"ticket price is required")});function Screen(){let e=(0,s.useRouter)(),t=(0,T.Z)(),{theaterId:n}=(0,s.useParams)(),[I,A]=(0,r.useState)([]),[D,O]=r.useState(!1),[U,L]=(0,r.useState)([]),[z,W]=(0,r.useState)(null),handleClose=()=>O(!1),{handleSubmit:q,control:N,formState:{errors:B}}=(0,C.cI)({resolver:(0,M.F)(R)});(0,r.useEffect)(()=>{let fetchScreenData=async()=>{let e=String(n),t=await (0,k.e)("","screen/"+e,"GET"),i=t.data;console.log(i);let r=i.map(e=>({id:e.id,name:e.name,timings:e.show_timings,maxCapacity:e.seating_capacity,imageUrl:e.movie_image,format:e.format,currentMovie:e.movie_name,runtime:e.run_time,cost:e.cost,movieId:e.movie_id,columns:e.columns,seatDetails:e.seating_arrangement,rows:e.rows}));A(r)},fetchMovieData=async()=>{let e=await (0,k.e)("","movie/all","GET"),t=e.movies,n=t.map(e=>({id:e.id,name:e.title}));console.log(n),L(n)};fetchScreenData(),fetchMovieData()},[]);let getErrorMessage=e=>e&&"string"==typeof e.message?e.message:"";async function deleteScreen(e){if(null===e.currentMovie||""===e.currentMovie)return;let t={id:e.id},i=await (0,k.e)(t,"screen/deleteScreen","POST");if(null!=i){let e=await (0,k.e)("","screen/".concat(n),"GET"),t=e.data,i=t.map(e=>({id:e.id,name:e.name,timings:e.show_timings,maxCapacity:e.seating_capacity,imageUrl:e.movie_image,format:e.format,currentMovie:e.movie_name,runtime:e.run_time,cost:e.cost,movieId:e.movie_id,columns:e.columns,seatDetails:e.seating_arrangement,rows:e.rows}));A(i)}}async function onSubmit(e){e.theater_id=n,e.screen_id=z;try{await (0,k.e)(e,"screen/addMovie","POST");let t=await (0,k.e)("","screen/"+n,"GET"),i=t.data,r=i.map(e=>({id:e.id,name:e.name,timings:e.show_timings,maxCapacity:e.seating_capacity,imageUrl:e.movie_image,format:e.screen_type,currentMovie:e.movie_name,runtime:String(e.run_time),cost:e.cost,movieId:e.movie_id}));A(r),handleClose()}catch(e){console.log(e)}}let handleOpenModal=e=>{console.log(e),W(e),O(!D)},F=t.isAdmin,redirectToBuy=(t,i)=>{e.push("/movie/".concat(t.movieId,"/buyTicket?theater=").concat(n,"&screen=").concat(t.id,"&time=").concat(i))},G={width:"650px",height:"500px"};return(0,i.jsxs)(r.Fragment,{children:[(0,i.jsx)(o.ZP,{}),(0,i.jsx)(a.Z,{maxWidth:"xl",children:(0,i.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,i.jsxs)(c.ZP,{container:!0,sx:{mb:2,marginTop:10,justifyContent:"space-between"},children:[(0,i.jsx)(l.Z,{variant:"h4",children:"Screens"}),F&&(0,i.jsx)(d.Z,{variant:"contained",startIcon:(0,i.jsx)(_.Z,{}),onClick:()=>{e.push("/theater/"+n+"/addScreen")},children:"Add Screen"})]}),(0,i.jsx)(c.ZP,{item:!0,xs:12,container:!0,children:(0,i.jsx)(c.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"left",children:I.map((r,s)=>null!=r.currentMovie&&""!=r.currentMovie||t.isAdmin?(0,i.jsx)(c.ZP,{item:!0,sx:G,children:(0,i.jsxs)(m.Z,{sx:{bgcolor:"white",p:3,borderRadius:2,boxShadow:3,display:"flex",flexDirection:{xs:"column",md:"row"},alignItems:"center",height:"100%"},children:[(0,i.jsx)("img",{src:r.imageUrl,alt:"screeb",style:{marginBottom:16,marginRight:24,width:192,borderRadius:8}}),(0,i.jsxs)(m.Z,{sx:{flex:1},children:[(0,i.jsxs)(c.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{mb:3},children:[(0,i.jsx)(l.Z,{variant:"h6",component:"h3",sx:{mb:1,fontWeight:"medium",fontSize:"2rem"},style:{},color:"#01579B",children:r.name}),(0,i.jsxs)(m.Z,{children:[F&&(0,i.jsx)(d.Z,{startIcon:(0,i.jsx)(S.Z,{}),sx:{mb:1,fontSize:"1rem"},onClick:()=>{localStorage.setItem("screenDetails",JSON.stringify(r)),e.push("/theater/".concat(n,"/editScreen"))}}),F&&(0,i.jsx)(d.Z,{startIcon:(0,i.jsx)(w.Z,{}),sx:{mb:1,fontSize:"1rem"},onClick:()=>deleteScreen(r)})]})]}),F&&(0,i.jsx)(d.Z,{sx:{mb:1,fontSize:"1rem"},onClick:()=>handleOpenModal(r.id),children:"Add/Change Movie"}),(0,i.jsxs)(m.Z,{sx:{px:1,py:.5,borderRadius:1,mr:1,mb:1,fontSize:"1rem"},children:["Current Movie: ",r.currentMovie]}),(0,i.jsxs)(m.Z,{sx:{px:1,py:.5,borderRadius:1,mr:1,mb:1,fontSize:"1rem"},children:["Run time: ",r.runtime," min"]}),(0,i.jsxs)(m.Z,{sx:{px:1,py:.5,borderRadius:1,mr:1,mb:1,fontSize:"1rem"},children:["Price: ",r.cost,"$"]}),(0,i.jsxs)(m.Z,{sx:{display:"flex",flexWrap:"wrap",alignItems:"center",mb:2},children:[(0,i.jsx)(m.Z,{sx:{ml:1},children:"Timings:"}),(0,i.jsx)(c.ZP,{container:!0,spacing:2,sx:{mt:1},children:(0,i.jsx)(m.Z,{sx:{ml:1},children:r.timings.map((e,t)=>(0,i.jsx)(u.Z,{sx:{ml:1},label:e,onClick:()=>redirectToBuy(r,e)},t))})})]}),(0,i.jsx)(d.Z,{onClick:()=>{console.log(r),e.push("/movie/".concat(r.movieId,"/buyTicket"))},variant:"contained",children:"Book Ticket"})]})]})},s):null)})})]})}),(0,i.jsx)(h.Z,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:D,onClose:handleClose,closeAfterTransition:!0,slots:{backdrop:x.Z},slotProps:{backdrop:{timeout:500}},children:(0,i.jsx)(g.Z,{in:D,children:(0,i.jsx)(m.Z,{sx:{...E,display:"flex",justifyContent:"center",alignItems:"center",width:"600px",maxWidth:"1000px"},children:(0,i.jsx)(p.Z,{direction:"column",spacing:2,sx:{width:"100%",maxWidth:"900px"},children:(0,i.jsxs)("form",{action:"/screen/addMovie",onSubmit:q(onSubmit),children:[(0,i.jsxs)(c.ZP,{container:!0,spacing:2,children:[(0,i.jsx)(c.ZP,{item:!0,xs:12,md:12,lg:6,children:(0,i.jsx)(C.Qr,{name:"movie",control:N,defaultValue:"",render:e=>{let{field:t}=e;return(0,i.jsxs)(f.Z,{fullWidth:!0,margin:"normal",error:!!B.format,children:[(0,i.jsx)(j.Z,{children:"Add Movie"}),(0,i.jsx)(Z.Z,{...t,label:"Add Movie",children:U.map(e=>(0,i.jsx)(v.Z,{value:e.id,children:e.name},e.id))}),(0,i.jsx)(b.Z,{id:"component-error-text",children:getErrorMessage(B.format)})]})}})}),(0,i.jsx)(c.ZP,{item:!0,xs:12,md:12,lg:6,children:(0,i.jsx)(C.Qr,{name:"ticketPrice",control:N,defaultValue:"",render:e=>{let{field:t}=e;return(0,i.jsx)(y.Z,{...t,InputProps:{inputProps:{min:5,max:10}},type:"number",label:"Ticket Price",error:!!B.ticketPrice,helperText:getErrorMessage(B.ticketPrice),fullWidth:!0,margin:"normal"})}})})]}),(0,i.jsx)(d.Z,{variant:"contained",endIcon:(0,i.jsx)(P.Z,{}),type:"submit",children:"Add Movie"})]})})})})})]})}},36661:function(e,t,n){"use strict";async function handleResponse(e){let t=e.headers.get("Content-Type")||"",n=t.includes("application/json"),i=n?await e.json():await e.text();if(!e.ok){if(n&&null!==i.errors)throw Error(JSON.stringify(i.errors));throw Error(i.message||e.statusText)}return i}async function getDataFromEndPoint(e,t,n){let i="http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/api/"+t,r=e instanceof FormData;if("GET"==n){let e=await fetch(i,{method:n,credentials:"include"});return handleResponse(e).then(e=>e)}let s={method:n,credentials:"include",body:e};r||(s.headers={"Content-Type":"application/json"},s.body=JSON.stringify(e));let a=await fetch(i,s);return handleResponse(a).then(e=>e)}n.d(t,{e:function(){return getDataFromEndPoint}})},16896:function(e,t,n){"use strict";var i=n(94660),r=n(74810);let s=(0,i.Ue)((0,r.tJ)(e=>({authUser:null,isLoggedIn:!1,requestLoading:!1,user:null,pincode:null,isAdmin:!1,setIsAdmin:t=>e(e=>({...e,isAdmin:t})),setUser:t=>e(e=>({...e,user:t})),setLoggedIn:()=>e(e=>({...e,isLoggedIn:!0})),setLoggedOut:()=>e(e=>({...e,isLoggedIn:!1})),setAuthUser:t=>e(e=>({...e,authUser:t})),setPinCode:t=>e(e=>({...e,pincode:t})),setRequestLoading:t=>e(e=>({...e,requestLoading:t})),reset:()=>e({authUser:null,requestLoading:!1})}),{name:"user-storage"}));t.Z=s}},function(e){e.O(0,[5094,3226,4876,5295,8874,1444,2171,8500,5594,644,5166,7827,329,5860,2971,2472,1744],function(){return e(e.s=11865)}),_N_E=e.O()}]);