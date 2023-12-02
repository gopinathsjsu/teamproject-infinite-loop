(()=>{var e={};e.id=2640,e.ids=[2640],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},28851:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>x,originalPathname:()=>m,pages:()=>c,routeModule:()=>h,tree:()=>o});var a=r(67096),n=r(16132),s=r(37284),i=r.n(s),d=r(32564),l={};for(let e in d)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>d[e]);r.d(t,l);let o=["",{children:["Payment",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,5426)),"/Users/saideekshithkatukojwala/Documents/Code/Projects/box-office/client/src/app/Payment/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,79113)),"/Users/saideekshithkatukojwala/Documents/Code/Projects/box-office/client/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/saideekshithkatukojwala/Documents/Code/Projects/box-office/client/src/app/Payment/page.tsx"],m="/Payment/page",x={require:r,loadChunk:()=>Promise.resolve()},h=new a.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/Payment/page",pathname:"/Payment",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},65737:(e,t,r)=>{Promise.resolve().then(r.bind(r,43872)),Promise.resolve().then(r.bind(r,15084))},15084:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Checkout});var a=r(30784),n=r(98331),s=r(79536),i=r.n(s),d=r(43872),l=r(39966),o=r.n(l),c=r(52694),m=r.n(c),x=r(17292),h=r.n(x),u=r(53751),p=r.n(u),j=r(8507),g=r.n(j),v=r(16614),f=r.n(v),y=r(33987),C=r.n(y),b=r(9885),P=r.n(b),_=r(21971),w=r.n(_),k=r(92870),F=r.n(k),q=r(26017),S=r.n(q),A=r(16061),M=r.n(A);let Card_AddressForm=({onSubmit:e})=>(0,a.jsxs)(b.Fragment,{children:[a.jsx(C(),{variant:"h6",gutterBottom:!0,children:"Shipping address"}),(0,a.jsxs)(w(),{container:!0,spacing:3,children:[a.jsx(w(),{item:!0,xs:12,sm:6,children:a.jsx(F(),{required:!0,id:"firstName",name:"firstName",label:"First name",fullWidth:!0,autoComplete:"given-name",variant:"standard"})}),a.jsx(w(),{item:!0,xs:12,sm:6,children:a.jsx(F(),{required:!0,id:"lastName",name:"lastName",label:"Last name",fullWidth:!0,autoComplete:"family-name",variant:"standard"})}),a.jsx(w(),{item:!0,xs:12,children:a.jsx(F(),{required:!0,id:"address1",name:"address1",label:"Address line 1",fullWidth:!0,autoComplete:"shipping address-line1",variant:"standard"})}),a.jsx(w(),{item:!0,xs:12,children:a.jsx(F(),{id:"address2",name:"address2",label:"Address line 2",fullWidth:!0,autoComplete:"shipping address-line2",variant:"standard"})}),a.jsx(w(),{item:!0,xs:12,sm:6,children:a.jsx(F(),{required:!0,id:"city",name:"city",label:"City",fullWidth:!0,autoComplete:"shipping address-level2",variant:"standard"})}),a.jsx(w(),{item:!0,xs:12,sm:6,children:a.jsx(F(),{id:"state",name:"state",label:"State/Province/Region",fullWidth:!0,variant:"standard"})}),a.jsx(w(),{item:!0,xs:12,sm:6,children:a.jsx(F(),{required:!0,id:"zip",name:"zip",label:"Zip / Postal code",fullWidth:!0,autoComplete:"shipping postal-code",variant:"standard"})}),a.jsx(w(),{item:!0,xs:12,sm:6,children:a.jsx(F(),{required:!0,id:"country",name:"country",label:"Country",fullWidth:!0,autoComplete:"shipping country",variant:"standard"})}),a.jsx(w(),{item:!0,xs:12,children:a.jsx(S(),{control:a.jsx(M(),{color:"secondary",name:"saveAddress",value:"yes"}),label:"Use this address for payment details"})})]})]});var N=r(3683),B=r.n(N),D=r(99124);let Card_PaymentForm=({onSubmit:e})=>{let[t,r]=(0,b.useState)(""),detectCardType=e=>{let t=e.replace(/\D/g,""),r=t[0],a=t.slice(0,2);return"4"===r?"Visa":a>="51"&&a<="55"?"MasterCard":"Unknown"},[n,s]=(0,b.useState)({cardNumber:"",cvv:"",expirationDate:"",cardholderName:""}),formatExpirationDate=e=>4!==e.length||e.includes("/")?e:e.substring(0,2)+"/"+e.substring(2,4),formatCardNumber=e=>{let t=e.replace(/\D/g,"");t=t.substring(0,16);let a=detectCardType(t);return r(a),t.replace(/(.{4})/g,"$1 ").trim()},handleChange=e=>{console.log("here");let{name:t,value:r}=e.target;if("cvv"===t&&r.length>3)return;let a=r;if("cardNumber"===t)a=formatCardNumber(r);else if("expirationDate"===t){if(!/^([0-9]{0,2})\/?([0-9]{0,2})$/.test(r))return;a=formatExpirationDate(r)}s({...n,[t]:a})};return(0,a.jsxs)(P().Fragment,{children:[a.jsx(C(),{variant:"h6",gutterBottom:!0,children:"Payment method"}),(0,a.jsxs)(w(),{container:!0,spacing:3,children:[a.jsx(w(),{item:!0,xs:12,md:6,children:a.jsx(F(),{required:!0,id:"cardName",label:"Name on card",fullWidth:!0,autoComplete:"cc-name",variant:"standard",name:"cardholderName",onChange:handleChange,value:n.cardholderName})}),a.jsx(w(),{item:!0,xs:12,md:6,children:a.jsx(F(),{required:!0,id:"cardNumber",label:"Card number",fullWidth:!0,autoComplete:"cc-number",variant:"standard",name:"cardNumber",onChange:handleChange,value:n.cardNumber,InputProps:{startAdornment:(0,a.jsxs)(B(),{position:"start",children:["Visa"===t&&(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:"25",height:"25",viewBox:"0 0 48 48",children:[a.jsx("path",{fill:"#1565C0",d:"M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"}),a.jsx("path",{fill:"#FFF",d:"M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"}),a.jsx("path",{fill:"#FFC107",d:"M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"})]}),"MasterCard"===t&&(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:"25",height:"25",viewBox:"0 0 48 48",children:[a.jsx("path",{fill:"#3F51B5",d:"M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"}),a.jsx("path",{fill:"#FFC107",d:"M30 14A10 10 0 1 0 30 34A10 10 0 1 0 30 14Z"}),a.jsx("path",{fill:"#FF3D00",d:"M22.014,30c-0.464-0.617-0.863-1.284-1.176-2h5.325c0.278-0.636,0.496-1.304,0.637-2h-6.598C20.07,25.354,20,24.686,20,24h7c0-0.686-0.07-1.354-0.201-2h-6.598c0.142-0.696,0.359-1.364,0.637-2h5.325c-0.313-0.716-0.711-1.383-1.176-2h-2.973c0.437-0.58,0.93-1.122,1.481-1.595C21.747,14.909,19.481,14,17,14c-5.523,0-10,4.477-10,10s4.477,10,10,10c3.269,0,6.162-1.575,7.986-4H22.014z"})]}),"Unknown"===t&&a.jsx(D.Z,{color:"primary"})]})}})}),a.jsx(w(),{item:!0,xs:12,md:6,children:a.jsx(F(),{required:!0,id:"expDate",label:"Expiration Date",fullWidth:!0,autoComplete:"cc-exp",variant:"standard",name:"expirationDate",onChange:handleChange,value:n.expirationDate,placeholder:"YY/MM"})}),a.jsx(w(),{item:!0,xs:12,md:6,children:a.jsx(F(),{required:!0,id:"cvv",label:"CVV",helperText:"Last three digits on signature strip",fullWidth:!0,autoComplete:"cc-csc",variant:"standard",name:"cvv",onChange:handleChange,value:n.cvv,type:"password"})}),a.jsx(w(),{item:!0,xs:12,children:a.jsx(S(),{control:a.jsx(M(),{color:"secondary",name:"saveCard",value:"yes"}),label:"Remember credit card details for next time"})})]})]})};var W=r(6176),E=r.n(W),z=r(43610),U=r.n(z),L=r(93429),T=r.n(L);let R=[{name:"Product 1",desc:"A nice thing",price:"$9.99"},{name:"Product 2",desc:"Another thing",price:"$3.45"},{name:"Product 3",desc:"Something else",price:"$6.51"},{name:"Product 4",desc:"Best thing of all",price:"$14.11"},{name:"Shipping",desc:"",price:"Free"}],V=["1 MUI Drive","Reactville","Anytown","99999","USA"],$=[{name:"Card type",detail:"Visa"},{name:"Card holder",detail:"Mr John Smith"},{name:"Card number",detail:"xxxx-xxxx-xxxx-1234"},{name:"Expiry date",detail:"04/2024"}];function Review(){return(0,a.jsxs)(b.Fragment,{children:[a.jsx(C(),{variant:"h6",gutterBottom:!0,children:"Order summary"}),(0,a.jsxs)(E(),{disablePadding:!0,children:[R.map(e=>(0,a.jsxs)(U(),{sx:{py:1,px:0},children:[a.jsx(T(),{primary:e.name,secondary:e.desc}),a.jsx(C(),{variant:"body2",children:e.price})]},e.name)),(0,a.jsxs)(U(),{sx:{py:1,px:0},children:[a.jsx(T(),{primary:"Total"}),a.jsx(C(),{variant:"subtitle1",sx:{fontWeight:700},children:"$34.06"})]})]}),(0,a.jsxs)(w(),{container:!0,spacing:2,children:[(0,a.jsxs)(w(),{item:!0,xs:12,sm:6,children:[a.jsx(C(),{variant:"h6",gutterBottom:!0,sx:{mt:2},children:"Shipping"}),a.jsx(C(),{gutterBottom:!0,children:"John Smith"}),a.jsx(C(),{gutterBottom:!0,children:V.join(", ")})]}),(0,a.jsxs)(w(),{item:!0,container:!0,direction:"column",xs:12,sm:6,children:[a.jsx(C(),{variant:"h6",gutterBottom:!0,sx:{mt:2},children:"Payment details"}),a.jsx(w(),{container:!0,children:$.map(e=>(0,a.jsxs)(b.Fragment,{children:[a.jsx(w(),{item:!0,xs:6,children:a.jsx(C(),{gutterBottom:!0,children:e.name})}),a.jsx(w(),{item:!0,xs:6,children:a.jsx(C(),{gutterBottom:!0,children:e.detail})})]},e.name))})]})]})]})}r(15050);let G=["Shipping address","Payment details","Review your order"];function Checkout(){let[e,t]=P().useState(0),[r,s]=P().useState(""),[l,c]=P().useState(!1),[x,u]=(0,b.useState)({theater_name:"",description:"",city:"",location_url:"",zipcode:"",phno:"",email:"",address:"",state:""}),handleNext=()=>{t(e+1)};return(0,a.jsxs)(P().Fragment,{children:[a.jsx(n.Z,{}),a.jsx(i(),{position:"absolute",color:"default",elevation:0,sx:{position:"relative",borderBottom:e=>`1px solid ${e.palette.divider}`}}),a.jsx(o(),{component:"main",maxWidth:"sm",sx:{mb:4},children:(0,a.jsxs)(m(),{variant:"outlined",sx:{my:{xs:3,md:6},p:{xs:2,md:3}},children:[a.jsx(C(),{component:"h1",variant:"h4",align:"center",children:"Checkout"}),a.jsx(h(),{activeStep:e,sx:{pt:3,pb:5},children:G.map(e=>a.jsx(p(),{children:a.jsx(g(),{children:e})},e))}),e===G.length?(0,a.jsxs)(P().Fragment,{children:[a.jsx(C(),{variant:"h5",gutterBottom:!0,children:"Thank you for your order."}),a.jsx(C(),{variant:"subtitle1",children:"Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has shipped."})]}):(0,a.jsxs)(P().Fragment,{children:[function(e,t){switch(e){case 0:return a.jsx(Card_AddressForm,{onSubmit:t});case 1:return a.jsx(Card_PaymentForm,{onSubmit:t});case 2:return a.jsx(Review,{});default:throw Error("Unknown step")}}(e,t=>{u(r=>({...r,[G[e].toLowerCase()]:t})),handleNext()}),(0,a.jsxs)(d.default,{sx:{display:"flex",justifyContent:"flex-end"},children:[0!==e&&a.jsx(f(),{onClick:()=>{t(e-1)},sx:{mt:3,ml:1},children:"Back"}),a.jsx(f(),{variant:"contained",onClick:handleNext,sx:{mt:3,ml:1},type:"submit",children:e===G.length-1?"Place order":"Next"})]})]})]})})]})}},5426:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>page});var a=r(4656);r(3542);var n=r(95153);let s=(0,n.createProxy)(String.raw`/Users/saideekshithkatukojwala/Documents/Code/Projects/box-office/client/src/app/components/Card/Checkout.tsx`),{__esModule:i,$$typeof:d}=s,l=s.default;var o=r(67285),c=r.n(o);let page=function(){return a.jsx(c(),{sx:{mt:10},children:a.jsx(l,{})})}},73881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var a=r(31323);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,a.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[2958,1323,6854,7136,6347,6113,9867],()=>__webpack_exec__(28851));module.exports=r})();