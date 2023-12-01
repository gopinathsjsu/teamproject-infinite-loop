(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3948],{14756:function(e,t,r){Promise.resolve().then(r.bind(r,99552))},99552:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Theater}});var a=r(57437),n=r(36661),i=r(2265),s=r(24033),o=r(3857),l=r(28874),d=r(43226),c=r(49050),u=r(39227),m=r(25210),h=r(98075),p=r(55594),x=r(13391),g=r(46446),f=r(26931),j=r(39350),b=r(634),Z=r(72261),y=r(83686),T=r(35843),_=r(26398),S=r(36718),w=r(61865),C=r(38110),E=r(74578),v=r(16896),I=r(33973),P=r(85945);let F=E.Ry({theater_name:E.Z_().min(1,"Screen Name is required"),description:E.Z_().min(1,"description is required").max(350,"Must be under 350 chareceters"),city:E.Z_().min(1,"city is required"),location_url:E.Z_().min(1,"locationUrl is required").url("Invalid Url"),address:E.Z_().min(1,"address is required"),zipcode:E.Z_().refine(e=>/^\d{5}$/.test(e),{message:"Invalid ZipCode number. Must be 5 digits."}),email:E.Z_().min(1,"Email is required").email("Email is invalid"),phno:E.Z_().refine(e=>/^\d{10}$/.test(e),{message:"Invalid phone number. Must be 10 digits."}),state:E.Z_().min(1,"state is required")});function Theater(){let e=(0,T.ZP)("input")({clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:1,overflow:"hidden",position:"absolute",bottom:0,left:0,whiteSpace:"nowrap",width:1,accept:"image/*"}),t=(0,v.Z)(),r=(0,s.useRouter)(),[E,U]=(0,i.useState)([]),[z,k]=(0,i.useState)(!1),[W,D]=(0,i.useState)(null),[N,M]=(0,i.useState)(!1),[R,q]=(0,i.useState)(""),[A,L]=i.useState(!1),[O,Q]=i.useState(!1),V=t.isAdmin,{handleSubmit:J,control:G,formState:{errors:B},setValue:$}=(0,w.cI)({resolver:(0,C.F)(F)}),getErrorMessage=e=>e&&"string"==typeof e.message?e.message:"";(0,i.useEffect)(()=>{let fetchData=async()=>{let e=await (0,n.e)("","theater/all","GET"),t=e.data,r=t.map(e=>({name:e.name,description:e.description,locationUrl:e.theater_url,address:e.state,city:e.city,state:e.state,zipcode:e.zipcode,screenDetails:e.screen_ids,imageUrl:e.image_url,nScreens:e.screen_ids.length,email:e.mail,phoneNumber:e.mobile,id:e.id}));U(r)};fetchData()},[]);let getTheaters=async()=>{let e=await (0,n.e)("","theater/all","GET"),t=e.data,r=t.map(e=>({name:e.name,description:e.description,locationUrl:e.theater_url,address:e.state,city:e.city,state:e.state,zipcode:e.zipcode,screenDetails:e.screen_ids,imageUrl:e.image_url,nScreens:e.screen_ids.length,email:e.mail,phoneNumber:e.mobile,id:e.id}));U(r)},updateTheater=async e=>{try{let t=new FormData;W&&t.append("file",W),e.id=R,t.append("data",JSON.stringify(e)),await (0,n.e)(t,"theater/updateTheater","POST"),L(!1),M(!1),q(""),getTheaters()}catch(e){console.log(e)}},onSubmit=async e=>{if(N){updateTheater(e);return}if(W){let t=new FormData;t.append("file",W),t.append("data",JSON.stringify(e));let r=await (0,n.e)(t,"theater/add","POST");200===r.status&&getTheaters(),L(!1),Q(!1)}};async function deleteTheater(e){let t=await (0,n.e)({id:e},"theater/deleteTheater","POST");null!=t&&getTheaters()}let addScreen=e=>{r.push("/theater/"+e+"/screens/")};return(0,a.jsxs)(i.Fragment,{children:[(0,a.jsx)(o.ZP,{}),(0,a.jsxs)(l.ZP,{container:!0,sx:{mt:5},spacing:2,children:[(0,a.jsxs)(l.ZP,{container:!0,sx:{justifyContent:"space-between"},children:[(0,a.jsx)(d.Z,{variant:"h4",children:"Theaters"}),V&&(0,a.jsx)(c.Z,{variant:"contained",startIcon:(0,a.jsx)(b.Z,{}),onClick:()=>L(!0),children:"Add Theater"})]}),(0,a.jsx)(l.ZP,{item:!0,xs:12,container:!0,children:(0,a.jsx)(l.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"left",children:E.map((e,t)=>(0,a.jsx)(l.ZP,{item:!0,xs:12,md:6,lg:6,children:(0,a.jsxs)(u.Z,{sx:{bgcolor:"white",p:3,borderRadius:2,boxShadow:3,display:"flex",flexDirection:{xs:"column",md:"row"},alignItems:"center"},children:[(0,a.jsx)("img",{src:e.imageUrl,alt:"Theater",style:{marginBottom:16,marginRight:24,width:192,borderRadius:8}}),(0,a.jsxs)(u.Z,{sx:{flex:1},children:[(0,a.jsxs)(l.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{mb:3},children:[(0,a.jsx)(m.Z,{href:e.locationUrl,target:"_blank",rel:"noopener noreferrer",underline:"hover",style:{textDecoration:"none"},children:(0,a.jsx)(d.Z,{variant:"h6",component:"h3",sx:{mb:1,fontWeight:"medium",fontSize:"2rem",color:"#01579B"},children:e.name})}),V&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.Z,{startIcon:(0,a.jsx)(x.Z,{}),onClick:()=>{$("theater_name",e.name),$("description",e.description),$("location_url",e.locationUrl),$("city",e.city),$("state",e.state),$("address",e.address),$("zipcode",e.zipcode.toString()),$("email",e.email),$("phno",e.phoneNumber.toString()),L(!0),M(!0),q(e.id)}}),(0,a.jsx)(c.Z,{startIcon:(0,a.jsx)(g.Z,{}),onClick:()=>{deleteTheater(e.id)}})]})]}),(0,a.jsx)(c.Z,{variant:"outlined",sx:{mb:2},onClick:()=>addScreen(e.id),children:"Show Screens"}),(0,a.jsx)(d.Z,{variant:"body2",sx:{ml:"10px",fontSize:"1rem"},children:e.description}),(0,a.jsxs)(u.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",fontSize:"0.875rem",color:"text.secondary",mt:2},children:[(0,a.jsxs)(u.Z,{sx:{display:"flex",alignItems:"center",borderRadius:"8px",padding:"8px 16px",maxWidth:"fit-content","&:hover":{backgroundColor:"#e0e0e0"}},children:[(0,a.jsx)(I.Z,{sx:{marginRight:"8px",color:"#0077b5"}}),(0,a.jsx)(d.Z,{variant:"body1",children:(0,a.jsx)(m.Z,{href:"mailto:".concat(e.email),underline:"none",sx:{color:"#0077b5",fontWeight:"bold"},children:e.email})})]}),(0,a.jsxs)(u.Z,{sx:{display:"flex",alignItems:"center",mt:1,borderRadius:"8px",padding:"8px 16px",maxWidth:"fit-content","&:hover":{backgroundColor:"#e0e0e0"}},children:[(0,a.jsx)(P.Z,{sx:{marginRight:"8px",color:"#0077b5"}}),(0,a.jsx)(d.Z,{variant:"body1",sx:{color:"#333",fontWeight:"bold"},children:e.phoneNumber})]})]})]})]})},t))})})]}),(0,a.jsx)(f.Z,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",open:A,onClose:()=>{L(!1),N&&(M(!1),q(""))},closeAfterTransition:!0,slots:{backdrop:j.Z},slotProps:{backdrop:{timeout:500}},children:(0,a.jsx)(Z.Z,{in:A,children:(0,a.jsx)(u.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4,display:"flex",justifyContent:"center",alignItems:"center",width:"600px",maxWidth:"1000px"},children:(0,a.jsxs)(h.Z,{direction:"column",spacing:2,children:[z?"successs":"",(0,a.jsxs)("form",{encType:"multipart/form-data",action:"/Theater/addtheater",onSubmit:J(onSubmit),children:[(0,a.jsx)(u.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,a.jsxs)(c.Z,{sx:{width:200},component:"label",variant:"contained",startIcon:(0,a.jsx)(y.Z,{}),children:[W?(0,a.jsxs)(a.Fragment,{children:["File Uploaded ",(0,a.jsx)(S.Z,{sx:{ml:1}})]}):"Upload Image",(0,a.jsx)(e,{type:"file",onChange:e=>{e.preventDefault(),Q(!0);let t=e.target.files[0];D(t)}})]})}),(0,a.jsxs)(l.ZP,{container:!0,spacing:2,children:[(0,a.jsxs)(l.ZP,{item:!0,xs:12,md:12,lg:6,children:[(0,a.jsx)(w.Qr,{name:"theater_name",control:G,defaultValue:"",render:e=>{let{field:t}=e;return(0,a.jsx)(p.Z,{...t,margin:"normal",fullWidth:!0,id:"theater_name",label:"Theater Name",autoComplete:"theater",autoFocus:!0,error:!!B.theater_name,helperText:getErrorMessage(B.theater_name)})}}),(0,a.jsx)(w.Qr,{name:"description",control:G,defaultValue:"",render:e=>{let{field:t}=e;return(0,a.jsx)(p.Z,{...t,margin:"normal",fullWidth:!0,id:"description",label:"Description",autoComplete:"description",autoFocus:!0,error:!!B.description,helperText:getErrorMessage(B.description)})}}),(0,a.jsx)(w.Qr,{name:"phno",control:G,defaultValue:"",render:e=>{let{field:t}=e;return(0,a.jsx)(p.Z,{...t,margin:"normal",fullWidth:!0,id:"phno",label:"Phone Number",autoComplete:"phno",autoFocus:!0,error:!!B.phno,helperText:getErrorMessage(B.phno)})}}),(0,a.jsx)(w.Qr,{name:"email",control:G,defaultValue:"",render:e=>{let{field:t}=e;return(0,a.jsx)(p.Z,{...t,margin:"normal",fullWidth:!0,id:"email",label:"Email Address",autoComplete:"email",autoFocus:!0,type:"email",error:!!B.email,helperText:getErrorMessage(B.email)})}})]}),(0,a.jsxs)(l.ZP,{item:!0,xs:12,md:12,lg:6,children:[(0,a.jsx)(w.Qr,{name:"address",control:G,defaultValue:"",render:e=>{let{field:t}=e;return(0,a.jsx)(p.Z,{...t,margin:"normal",fullWidth:!0,id:"address",label:"Address",autoComplete:"address",autoFocus:!0,error:!!B.address,helperText:getErrorMessage(B.address)})}}),(0,a.jsx)(w.Qr,{name:"city",control:G,defaultValue:"",render:e=>{let{field:t}=e;return(0,a.jsx)(p.Z,{...t,margin:"normal",fullWidth:!0,id:"city",label:"City",autoComplete:"city",autoFocus:!0,error:!!B.city,helperText:getErrorMessage(B.city)})}}),(0,a.jsx)(w.Qr,{name:"zipcode",control:G,defaultValue:"",render:e=>{let{field:t}=e;return(0,a.jsx)(p.Z,{...t,margin:"normal",fullWidth:!0,id:"zipcode",label:"Zip Code",name:"zipcode",autoComplete:"zipcode",autoFocus:!0,error:!!B.zipcode,helperText:getErrorMessage(B.zipcode)})}}),(0,a.jsx)(w.Qr,{name:"state",control:G,defaultValue:"",render:e=>{let{field:t}=e;return(0,a.jsx)(p.Z,{...t,margin:"normal",fullWidth:!0,id:"state",label:"State",name:"state",autoComplete:"state",autoFocus:!0,error:!!B.state,helperText:getErrorMessage(B.state)})}})]})]}),(0,a.jsx)(w.Qr,{name:"location_url",control:G,defaultValue:"",render:e=>{let{field:t}=e;return(0,a.jsx)(p.Z,{...t,margin:"normal",fullWidth:!0,id:"location_url",label:"Location Url",autoComplete:"location_url",autoFocus:!0,error:!!B.location_url,helperText:getErrorMessage(B.location_url)})}}),(0,a.jsx)(c.Z,{variant:"contained",endIcon:(0,a.jsx)(_.Z,{}),style:{width:"300px",left:"125px"},type:"submit",children:N?"Update Theate":"Add Theater"})]})]})})})})]})}},36661:function(e,t,r){"use strict";async function handleResponse(e){let t=e.headers.get("Content-Type")||"",r=t.includes("application/json"),a=r?await e.json():await e.text();if(!e.ok){if(r&&null!==a.errors)throw Error(JSON.stringify(a.errors));throw Error(a.message||e.statusText)}return a}async function getDataFromEndPoint(e,t,r){let a="http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/api/"+t,n=e instanceof FormData;if("GET"==r){let e=await fetch(a,{method:r,credentials:"include"});return handleResponse(e).then(e=>e)}let i={method:r,credentials:"include",body:e};n||(i.headers={"Content-Type":"application/json"},i.body=JSON.stringify(e));let s=await fetch(a,i);return handleResponse(s).then(e=>e)}r.d(t,{e:function(){return getDataFromEndPoint}})},16896:function(e,t,r){"use strict";var a=r(94660),n=r(74810);let i=(0,a.Ue)((0,n.tJ)(e=>({authUser:null,isLoggedIn:!1,requestLoading:!1,user:null,pincode:null,isAdmin:!1,setIsAdmin:t=>e(e=>({...e,isAdmin:t})),setUser:t=>e(e=>({...e,user:t})),setLoggedIn:()=>e(e=>({...e,isLoggedIn:!0})),setLoggedOut:()=>e(e=>({...e,isLoggedIn:!1})),setAuthUser:t=>e(e=>({...e,authUser:t})),setPinCode:t=>e(e=>({...e,pincode:t})),setRequestLoading:t=>e(e=>({...e,requestLoading:t})),reset:()=>e({authUser:null,requestLoading:!1})}),{name:"user-storage"}));t.Z=i}},function(e){e.O(0,[5094,3226,4876,5295,8874,1444,2171,8500,5594,644,5166,329,6747,2971,2472,1744],function(){return e(e.s=14756)}),_N_E=e.O()}]);