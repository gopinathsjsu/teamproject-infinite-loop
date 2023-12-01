(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8801],{1067:function(e,t,s){Promise.resolve().then(s.bind(s,66213))},66213:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return AddScreen}});var n=s(57437),r=s(2265),a=s(24033),i=s(61865),l=s(38110),o=s(74578),c=s(36661),d=s(3857),m=s(63955),u=s(39227),h=s(43226),x=s(28874),p=s(55594),g=s(84081),_=s(50819),j=s(10654),f=s(65507),C=s(45550),S=s(49050),Z=s(45284),N=s.n(Z);let y=o.Ry({screenName:o.Z_().min(1,"Screen Name is required"),timing:o.IX(o.Z_()).min(1,"Select at least one timing"),format:o.Z_().min(1,"Format is required")}),b={rows:20,cols:6,seats:{A:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],B:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],C:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],D:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],E:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],F:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],G:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}};function AddScreen(){let e=(0,a.useRouter)(),[t,s]=(0,r.useState)((null==b?void 0:b.seats)||{}),{theaterId:o}=(0,a.useParams)(),[Z,v]=(0,r.useState)((null==b?void 0:b.rows)||0),[E,P]=(0,r.useState)((null==b?void 0:b.cols)||0),[w,k]=(0,r.useState)(!1);(0,r.useEffect)(()=>{clearSelectedSeats()},[]),(0,r.useEffect)(()=>{handleSeatSubmit()},[Z,E]);let handleSeatSubmit=()=>{let e,n={};for(let s=0;s<E;s++){if(s<26)e=String.fromCharCode(65+s);else{let t=String.fromCharCode(64+s/25);e="".concat(t).concat(String.fromCharCode(64+s%25))}n[e]=Array(Z).fill(0).map((s,n)=>t&&t[e]&&t[e][n]?t[e][n]:0)}console.log(t),s(n)},clearSelectedSeats=()=>{let e={...t};for(let e in t)t[e].forEach((s,n)=>{3===s&&(t[e][n]=0)});return e},changeEditable=()=>{k(!w)},onSeatClick=(e,n,r)=>{if(t){if(1===e)return;0===e?t[r][n]=3:t[r][n]=0}s({...t})},getClassNameForSeats=e=>{let t;return t=0===e?N().seatNotBooked:1===e?N().seatBooked:2===e?N().seatSelected:N().seatBlocked,"".concat(N().seats," ").concat(t)},{handleSubmit:z,control:F,formState:{errors:B}}=(0,i.cI)({resolver:(0,l.F)(y)}),getErrorMessage=e=>e&&"string"==typeof e.message?e.message:"";async function onSubmit(s){e.push("/theater/"+o+"/screens/"),s.rows=Z,s.col=E,s.seats=t,s.theater_id=o;let n="screen/addScreen";console.log(n);try{await (0,c.e)(s,n,"POST")}catch(e){console.log(e)}}return(0,n.jsxs)(r.Fragment,{children:[(0,n.jsx)(d.ZP,{}),(0,n.jsxs)(m.Z,{maxWidth:"xl",style:{marginLeft:"0px",marginRight:"0px",marginTop:"6%"},children:[(0,n.jsxs)("form",{action:"/screen/addScreen",onSubmit:z(onSubmit),children:[(0,n.jsx)(u.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,n.jsx)(h.Z,{variant:"h4",children:"Add New Screen"})}),(0,n.jsxs)(x.ZP,{container:!0,spacing:2,children:[(0,n.jsx)(x.ZP,{item:!0,xs:12,md:12,lg:4,children:(0,n.jsx)(i.Qr,{name:"screenName",control:F,defaultValue:"",render:e=>{let{field:t}=e;return(0,n.jsx)(p.Z,{...t,label:"Screen Name",error:!!B.screenName,helperText:getErrorMessage(B.screenName),fullWidth:!0,margin:"normal"})}})}),(0,n.jsx)(x.ZP,{item:!0,xs:12,md:12,lg:4,children:(0,n.jsx)(i.Qr,{name:"timing",control:F,defaultValue:[],render:e=>{let{field:t}=e;return(0,n.jsxs)(g.Z,{fullWidth:!0,margin:"normal",error:!!B.timing,children:[(0,n.jsx)(_.Z,{children:"Timing"}),(0,n.jsx)(j.Z,{...t,multiple:!0,label:"Timing",children:["9:00 am","1:00 pm","6:00 pm","10:00 pm"].map(e=>(0,n.jsx)(f.Z,{value:e,children:e},e))}),(0,n.jsx)(C.Z,{id:"component-error-text",children:getErrorMessage(B.timing)})]})}})}),(0,n.jsx)(x.ZP,{item:!0,xs:12,md:12,lg:4,children:(0,n.jsx)(i.Qr,{name:"format",control:F,defaultValue:"",render:e=>{let{field:t}=e;return(0,n.jsxs)(g.Z,{fullWidth:!0,margin:"normal",error:!!B.format,children:[(0,n.jsx)(_.Z,{children:"Format"}),(0,n.jsx)(j.Z,{...t,label:"Format",children:["2D","3D"].map(e=>(0,n.jsx)(f.Z,{value:e,children:e},e))}),(0,n.jsx)(C.Z,{id:"component-error-text",children:getErrorMessage(B.format)})]})}})})]}),(0,n.jsx)(x.ZP,{sx:{flexGrow:1},container:!0,spacing:2,children:(0,n.jsx)(x.ZP,{item:!0,xs:12,lg:12,children:(0,n.jsxs)(x.ZP,{container:!0,justifyContent:"center",spacing:2,children:[(0,n.jsx)(x.ZP,{item:!0,xs:12,md:12,lg:4,children:(0,n.jsx)(p.Z,{disabled:!w,InputProps:{inputProps:{min:5,max:25}},value:Z,onChange:e=>v(parseInt(e.target.value)||0),type:"number",label:"Rows",error:!!B.rows,helperText:getErrorMessage(B.rows),fullWidth:!0})}),(0,n.jsx)(x.ZP,{item:!0,xs:12,md:12,lg:4,children:(0,n.jsx)(p.Z,{disabled:!w,InputProps:{inputProps:{min:5,max:12}},value:E,onChange:e=>P(parseInt(e.target.value)||0),type:"number",label:"Columns",error:!!B.columns,helperText:getErrorMessage(B.columns),fullWidth:!0})})]})})}),(0,n.jsx)(x.ZP,{sx:{flexGrow:1},container:!0,spacing:2,children:(0,n.jsx)(x.ZP,{item:!0,xs:12,lg:12,children:(0,n.jsx)(x.ZP,{container:!0,justifyContent:"center",spacing:2,children:w?(0,n.jsxs)(u.Z,{gap:2,my:4,children:[(0,n.jsx)(S.Z,{variant:"contained",onClick:changeEditable,children:"Show Preview"}),(0,n.jsx)(S.Z,{variant:"outlined",onClick:clearSelectedSeats,children:"Reset Layout"})]}):(0,n.jsxs)(u.Z,{gap:2,my:4,children:[(0,n.jsx)(S.Z,{style:{marginRight:"5px"},variant:"outlined",onClick:changeEditable,children:"Edit Layout"}),(0,n.jsx)(S.Z,{variant:"contained",type:"submit",children:"Submit"})]})})})})]}),(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:N().seatsContainer,children:[(0,n.jsxs)("p",{className:N().header,children:["Select Seats to be ",(0,n.jsx)("b",{className:N().headerBlockedText,children:"Removed"})]}),t&&w&&(0,n.jsx)(()=>{let e=[];for(let s in t){let r=t[s].map((e,r)=>(0,n.jsxs)("span",{className:N().seatsHolder,children:[0===r&&(0,n.jsx)("span",{className:N().colName,children:s}),(0,n.jsx)("span",{className:getClassNameForSeats(e),onClick:()=>onSeatClick(e,r,s),children:r+1}),t&&r===t[s].length-1&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("br",{}),(0,n.jsx)("br",{})]})]},"".concat(s,".").concat(r)));e.push(r)}return(0,n.jsx)("div",{className:N().seatsLeafContainer,children:e})},{}),t&&!w&&(0,n.jsx)(()=>{let e=[];for(let s in t){let r=0,a=t[s].map((e,a)=>(0,n.jsxs)("span",{className:N().seatsHolder,children:[0===a&&(0,n.jsx)("span",{className:N().colName,children:s}),3!==e?(0,n.jsx)("span",{className:getClassNameForSeats(e),children:r+=1}):(0,n.jsx)("span",{className:getClassNameForSeats(1),children:a+1}),t&&a===t[s].length-1&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("br",{}),(0,n.jsx)("br",{})]})]},"".concat(s,".").concat(a)));e.push(a)}return(0,n.jsx)("div",{className:N().seatsLeafContainer,children:e})},{}),(0,n.jsx)("div",{className:N().cont_screen,children:(0,n.jsx)("div",{className:N().screen,children:(0,n.jsx)("span",{className:N().screen_text,children:"SCREEN"})})})]})})]})]})}},36661:function(e,t,s){"use strict";async function handleResponse(e){let t=e.headers.get("Content-Type")||"",s=t.includes("application/json"),n=s?await e.json():await e.text();if(!e.ok){if(s&&null!==n.errors)throw Error(JSON.stringify(n.errors));throw Error(n.message||e.statusText)}return n}async function getDataFromEndPoint(e,t,s){let n="http://ec2-3-101-12-15.us-west-1.compute.amazonaws.com/api/"+t,r=e instanceof FormData;if("GET"==s){let e=await fetch(n,{method:s,credentials:"include"});return handleResponse(e).then(e=>e)}let a={method:s,credentials:"include",body:e};r||(a.headers={"Content-Type":"application/json"},a.body=JSON.stringify(e));let i=await fetch(n,a);return handleResponse(i).then(e=>e)}s.d(t,{e:function(){return getDataFromEndPoint}})},45284:function(e){e.exports={seatsContainer:"Customize_seatsContainer__ClRBP",seatsHolder:"Customize_seatsHolder__TgBnR",seatsLeafContainer:"Customize_seatsLeafContainer__98f_0",seats:"Customize_seats__85rE3",colName:"Customize_colName__O7gSL",seatSelected0:"Customize_seatSelected0__NFCg_",seatBooked:"Customize_seatBooked__phi0h",seatSelected:"Customize_seatSelected__yjdM2",seatBlocked:"Customize_seatBlocked__sgK9H",paymentButton:"Customize_paymentButton___oUZC",paymentButtonContainer:"Customize_paymentButtonContainer__jl8ZK",inputContainer:"Customize_inputContainer__CKnpW",inputHolder:"Customize_inputHolder__iN2uj",inputField:"Customize_inputField__Ho7rQ",saveSetUpButton:"Customize_saveSetUpButton__CYnaD",header:"Customize_header__SsfQS",headerBlockedText:"Customize_headerBlockedText__mZ8j1",cont_screen:"Customize_cont_screen__PHJgJ",screen:"Customize_screen__MXuqH",screen_text:"Customize_screen_text__5nFID"}}},function(e){e.O(0,[5094,3226,4876,5295,8874,1444,2171,8500,5594,329,1947,2971,2472,1744],function(){return e(e.s=1067)}),_N_E=e.O()}]);