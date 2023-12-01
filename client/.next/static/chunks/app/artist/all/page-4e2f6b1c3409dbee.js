(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8913],{94289:function(e,t,r){Promise.resolve().then(r.bind(r,90061))},90061:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Contact}});var s=r(57437),a=r(2265),i=r(3283),n=r(39227),l=r(26931),o=r(72261),d=r(49050),c=r(43226),h=r(98075),u=r(26398),p=r(55594),f=r(74548),x=r.n(f),g=r(92750),m=r(74124),b=r(31678),j=r(90923),y=r(50819),Z=r(65507),C=r(84081),w=r(10654),v=r(47827),S=r(83686),A=r(35843),k=r(63955),O=r(28874),I=r(36661),P=r(48217),T=r(13391),E=r(46446),F=r(24033),D=r(16896);let R={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},W=["Director","Producer","Music Director","Screenwriter","Cinematographer","Editor","Art Director"],L=["Actor","Actress","Other Actors"],M={PaperProps:{style:{maxHeight:224,width:250}}},_=(0,A.ZP)("input")({clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:1,overflow:"hidden",position:"absolute",whiteSpace:"nowrap",width:1});function getStyles(e,t,r){return{fontWeight:-1===t.indexOf(e)?r.typography.fontWeightRegular:r.typography.fontWeightMedium}}function Contact(){let[e,t]=(0,a.useState)([]),[r,f]=(0,a.useState)([]),[A,U]=(0,a.useState)(!1),[G,B]=(0,a.useState)(""),[N,q]=(0,a.useState)(!1),z=(0,D.Z)(),J=z.isAdmin,[H,V]=(0,a.useState)(null),[K,Q]=(0,a.useState)("/broken-image.jpg"),[X,Y]=(0,a.useState)(!1),[$,ee]=(0,a.useState)({}),handleClose=()=>{q(!1),X&&(Y(!1),Q("/broken-image.jpg"),ee({}))},et=(0,F.useRouter)(),[er,es]=(0,a.useState)({fullname:"",dateOfBirth:"",gender:"",category:"",profession:[],about:""});(0,a.useEffect)(()=>{let fetchData=async()=>{try{let e=await (0,I.e)("","artist/all","GET");t(e.Cast),f(e.Crew)}catch(e){console.error("Failed to fetch data:",e)}};fetchData()},[]);let handleArtistClick=e=>{et.push("/artist/".concat(e))},submitForm=async s=>{s.preventDefault();let a=new FormData;if(H&&a.append("image",H),Object.entries(er).forEach(e=>{let[t,r]=e;"profession"===t?a.append(t,r.join(", ")):a.append(t,r)}),X){a.append("id",$.id);let e=await (0,I.e)(a,"artist/updateArtist","POST");if(null!=e){let e=await (0,I.e)("","artist/all","GET");t(e.Cast),f(e.Crew)}}else{let s=await (0,I.e)(a,"artist/add","POST");200===s.status&&("Crew"===er.category?f([...r,s.artist]):"Cast"===er.category&&t([...e,s.artist]))}handleClose()},handleInput=e=>{let{name:t,value:r}=e.target;es(e=>({...e,[t]:r}))},deleteArtist=async e=>{let r={id:e.id},s=await (0,I.e)(r,"artist/deleteArtist","POST");if(null!=s){let e=await (0,I.e)("","artist/all","GET");t(e.Cast),f(e.Crew)}},editCast=async e=>{Y(!0);try{let t=await (0,I.e)("","artist/".concat(e.id),"GET");ee(t.artist),es(()=>({fullname:t.artist.name,dateOfBirth:x()(t.artist.dob),gender:t.artist.gender,category:"Cast",profession:[t.artist.profession],about:t.artist.description})),Q(t.artist.profile_url),q(!0)}catch(e){console.error("Failed to fetch data:",e)}},editCrew=async e=>{Y(!0);try{let t=await (0,I.e)("","artist/".concat(e.id),"GET");ee(t.artist),es(()=>({fullname:t.artist.name,dateOfBirth:x()(t.artist.dob),gender:t.artist.gender,category:"Crew",profession:[t.artist.profession],about:t.artist.description})),Q(t.artist.profile_url),q(!0)}catch(e){console.error("Failed to fetch data:",e)}};return(0,s.jsxs)("div",{children:[J&&(0,s.jsx)(d.Z,{sx:{paddingTop:2,paddingRight:0,fontWeight:"bold"},onClick:()=>q(!0),children:"Add Artist"}),(0,s.jsx)(l.Z,{open:N,onClose:handleClose,closeAfterTransition:!0,"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",children:(0,s.jsx)(o.Z,{in:N,children:(0,s.jsx)(n.Z,{sx:R,children:(0,s.jsx)("form",{onSubmit:submitForm,encType:"multipart/form-data",children:(0,s.jsxs)(h.Z,{direction:"column",spacing:2,children:[(0,s.jsx)(n.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,s.jsx)(i.Z,{sx:{width:100,height:100},src:H?URL.createObjectURL(H):K})}),(0,s.jsx)(n.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,s.jsxs)(d.Z,{sx:{width:200},component:"label",variant:"contained",startIcon:(0,s.jsx)(S.Z,{}),children:["Upload file",(0,s.jsx)(_,{type:"file",name:"file",onChange:e=>{let t=e.target.files;if(t&&t.length>0){let e=t[0];V(e)}}})]})}),(0,s.jsx)(p.Z,{sx:{width:330},label:"Full Name",required:!0,name:"fullname",variant:"outlined",onChange:handleInput,value:er.fullname}),(0,s.jsx)(p.Z,{sx:{width:330},label:"About",name:"about",required:!0,variant:"outlined",onChange:handleInput,value:er.about}),(0,s.jsx)(m._,{dateAdapter:g.y,children:(0,s.jsx)(b.M,{sx:{width:330},label:"Date of Birth",value:er.dateOfBirth,onChange:e=>es({...er,dateOfBirth:null!=e?e:""})})}),(0,s.jsxs)(C.Z,{sx:{m:1,width:330},children:[(0,s.jsx)(y.Z,{id:"gender-select-label",children:"Gender"}),(0,s.jsxs)(w.Z,{labelId:"gender-select-label",id:"gender-select",value:er.gender,name:"gender",label:"Gender",onChange:handleInput,children:[(0,s.jsx)(Z.Z,{value:"Male",children:"Male"}),(0,s.jsx)(Z.Z,{value:"Female",children:"Female"}),(0,s.jsx)(Z.Z,{value:"Other",children:"Other"})]})]}),(0,s.jsxs)(C.Z,{sx:{m:1,width:330},children:[(0,s.jsx)(y.Z,{id:"category-select-label",children:"Artist Category"}),(0,s.jsxs)(w.Z,{labelId:"category-select-label",id:"category-select",value:er.category,name:"category",label:"Artist Category",onChange:handleInput,children:[(0,s.jsx)(Z.Z,{value:"Crew",children:"Crew"}),(0,s.jsx)(Z.Z,{value:"Cast",children:"Cast"}),(0,s.jsx)(Z.Z,{value:"Other",children:"Other"})]})]}),(0,s.jsxs)(C.Z,{sx:{m:1,width:330},children:[(0,s.jsx)(y.Z,{id:"profession-select-label",children:"Profession"}),(0,s.jsxs)(w.Z,{labelId:"profession-select-label",id:"profession-select",multiple:!0,name:"profession",value:er.profession,onChange:handleInput,input:(0,s.jsx)(j.Z,{id:"select-multiple-chip",label:"Profession"}),renderValue:e=>(0,s.jsx)(n.Z,{sx:{display:"flex",flexWrap:"wrap",gap:.5},children:e.map(e=>(0,s.jsx)(v.Z,{label:e},e))}),MenuProps:M,children:["Crew"===er.category&&W.map(e=>(0,s.jsx)(Z.Z,{value:e,style:getStyles(e,er.profession,P.Z),children:e},e)),"Cast"===er.category&&L.map(e=>(0,s.jsx)(Z.Z,{value:e,style:getStyles(e,er.profession,P.Z),children:e},e))]})]}),(0,s.jsx)(d.Z,{variant:"contained",endIcon:(0,s.jsx)(u.Z,{}),type:"submit",sx:{mt:2},children:"Submit"}),A&&(0,s.jsx)(n.Z,{sx:{mt:2},children:(0,s.jsx)(c.Z,{color:"green",children:G})})]})})})})}),(0,s.jsxs)(k.Z,{maxWidth:"lg",sx:{borderRadius:2,overflow:"hidden",mt:2,mb:4},children:[(0,s.jsx)(c.Z,{variant:"h5",component:"div",sx:{fontWeight:"bold",mb:2},children:"Cast"}),(0,s.jsx)(O.ZP,{container:!0,spacing:1,children:e.map((e,t)=>(0,s.jsxs)(O.ZP,{item:!0,xs:6,sm:4,md:3,lg:2,children:[(0,s.jsxs)(n.Z,{sx:{position:"relative",justifyContent:"space-between",display:"flex",top:30},children:[J&&(0,s.jsx)(d.Z,{startIcon:(0,s.jsx)(T.Z,{}),onClick:()=>{editCast(e)}}),J&&(0,s.jsx)(d.Z,{startIcon:(0,s.jsx)(E.Z,{}),onClick:()=>{deleteArtist(e)}})]}),(0,s.jsxs)(n.Z,{sx:{textAlign:"center",p:1},children:[(0,s.jsx)(i.Z,{alt:e.name,src:e.profile_url,sx:{width:120,height:120,margin:"auto",mb:1,cursor:"pointer"},onClick:()=>handleArtistClick(e.id)}),(0,s.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:"bold"},children:e.name}),(0,s.jsx)(c.Z,{variant:"body2",children:e.profession})]})]},"member-".concat(t)))})]}),(0,s.jsxs)(k.Z,{maxWidth:"lg",sx:{borderRadius:2,overflow:"hidden",mt:2,mb:4},children:[(0,s.jsx)(c.Z,{variant:"h5",component:"div",sx:{fontWeight:"bold",mb:2},children:"Crew"}),(0,s.jsx)(O.ZP,{container:!0,spacing:1,children:r.map((e,t)=>(0,s.jsxs)(O.ZP,{item:!0,xs:6,sm:4,md:3,lg:2,children:[(0,s.jsxs)(n.Z,{sx:{position:"relative",justifyContent:"space-between",display:"flex",top:30},children:[J&&(0,s.jsx)(d.Z,{startIcon:(0,s.jsx)(T.Z,{}),onClick:()=>{editCrew(e)}}),J&&(0,s.jsx)(d.Z,{startIcon:(0,s.jsx)(E.Z,{}),onClick:()=>{deleteArtist(e)}})]}),(0,s.jsxs)(n.Z,{sx:{textAlign:"center",p:1},children:[(0,s.jsx)(i.Z,{alt:e.name,src:e.profile_url,sx:{width:120,height:120,margin:"auto",mb:1,cursor:"pointer"},onClick:()=>handleArtistClick(e.id)}),(0,s.jsx)(c.Z,{variant:"subtitle1",sx:{fontWeight:"bold"},children:e.name}),(0,s.jsx)(c.Z,{variant:"body2",children:e.profession})]})]},"member-".concat(t)))})]})]})}},48217:function(e,t,r){"use strict";var s=r(98595);let a=(0,s.Z)({palette:{primary:{main:"#009688",light:"#52c7b8",dark:"#00675b",contrastText:"#fff"},secondary:{main:"#ff9800",light:"#ffb74d",dark:"#f57c00",contrastText:"#000"},background:{default:"#f5f5f5",paper:"#fff"},text:{primary:"#212121",secondary:"#757575"}},typography:{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',fontSize:14,h1:{fontSize:"2.5rem",fontWeight:500}},components:{MuiDrawer:{styleOverrides:{paper:{backgroundColor:"#424242",color:"#fff"}}},MuiTooltip:{styleOverrides:{tooltip:{backgroundColor:"#333",color:"#fff",fontSize:"0.875em"}}},MuiAvatar:{styleOverrides:{root:{border:"2px solid #fff",boxShadow:"0 2px 10px rgba(0,0,0,0.2)"}}},MuiSnackbar:{styleOverrides:{root:{backgroundColor:"#009688"}}}}});t.Z=a},36661:function(e,t,r){"use strict";async function handleResponse(e){let t=e.headers.get("Content-Type")||"",r=t.includes("application/json"),s=r?await e.json():await e.text();if(!e.ok){if(r&&null!==s.errors)throw Error(JSON.stringify(s.errors));throw Error(s.message||e.statusText)}return s}async function getDataFromEndPoint(e,t,r){let s="http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/api/"+t,a=e instanceof FormData;if("GET"==r){let e=await fetch(s,{method:r,credentials:"include"});return handleResponse(e).then(e=>e)}let i={method:r,credentials:"include",body:e};a||(i.headers={"Content-Type":"application/json"},i.body=JSON.stringify(e));let n=await fetch(s,i);return handleResponse(n).then(e=>e)}r.d(t,{e:function(){return getDataFromEndPoint}})},16896:function(e,t,r){"use strict";var s=r(94660),a=r(74810);let i=(0,s.Ue)((0,a.tJ)(e=>({authUser:null,isLoggedIn:!1,requestLoading:!1,user:null,pincode:null,isAdmin:!1,setIsAdmin:t=>e(e=>({...e,isAdmin:t})),setUser:t=>e(e=>({...e,user:t})),setLoggedIn:()=>e(e=>({...e,isLoggedIn:!0})),setLoggedOut:()=>e(e=>({...e,isLoggedIn:!1})),setAuthUser:t=>e(e=>({...e,authUser:t})),setPinCode:t=>e(e=>({...e,pincode:t})),setRequestLoading:t=>e(e=>({...e,requestLoading:t})),reset:()=>e({authUser:null,requestLoading:!1})}),{name:"user-storage"}));t.Z=i}},function(e){e.O(0,[5094,3226,4876,5295,8874,1444,2171,8500,5594,644,5166,7827,9858,1518,1434,1260,6285,2971,2472,1744],function(){return e(e.s=94289)}),_N_E=e.O()}]);