(()=>{var e={};e.id=3427,e.ids=[3427],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},83688:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>c,pages:()=>u,routeModule:()=>h,tree:()=>d});var a=t(67096),s=t(16132),n=t(37284),i=t.n(n),l=t(32564),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);t.d(r,o);let d=["",{children:["personal_profile",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,35716)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/personal_profile/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,79113)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/personal_profile/page.tsx"],c="/personal_profile/page",p={require:t,loadChunk:()=>Promise.resolve()},h=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/personal_profile/page",pathname:"/personal_profile",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},16964:(e,r,t)=>{Promise.resolve().then(t.bind(t,50569))},50569:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>Profile});var a=t(30784),s=t(9885),n=t.n(s),i=t(62450),l=t(66558),o=t(83894),d=t(19098),u=t(33987),c=t.n(u),p=t(21971),h=t.n(p),m=t(92870),g=t.n(m),x=t(58111),f=t.n(x),j=t(97445),v=t.n(j),y=t(51892),b=t.n(y),_=t(88707),C=t.n(_),P=t(43872),w=t(95843),k=t.n(w),A=t(16614),S=t.n(A),E=t(71026),I=t(64763),L=t(81796),M=t(65656),O=t(52694),Z=t.n(O),q=t(34550),D=t.n(q),F=t(15922),N=t(52121),W=t(82173),T=t(6176),z=t.n(T),G=t(43610),Q=t.n(G),U=t(83689),B=t.n(U),R=t(51949),V=t.n(R),H=t(23458),X=t(15050);let Y=d.Ry({email:d.Z_().email({message:"Invalid email address"}),fullName:d.Z_().min(1,{message:"Full name is required"}),phoneNumber:d.Z_().min(10,{message:"Invalid phone number"}),dateOfBirth:d.Yj(),gender:d.Z_().min(1,{message:"Gender is required"}),address1:d.Z_().min(1,{message:"Address1 is required"}),address2:d.Z_().optional(),city:d.Z_().min(1,{message:"City is required"}),state:d.Z_().min(1,{message:"State is required"}),country:d.Z_().min(1,{message:"Country is required"}),zipCode:d.Z_().min(1,{message:"Zip Code is required"}),genres:d.IX(d.Z_()).nonempty("Select atleast one genre"),favoriteCast:d.IX(d.Z_()).nonempty("Select atleast one artist"),favoriteCrew:d.IX(d.Z_()).nonempty("Select atleast one crew"),preferredLanguages:d.IX(d.Z_()).nonempty("Select atleast one language")}),$=["Action","Drama","Comedy","Science Fiction","Horror","Romance","Fantasy","Thriller","Adventure","Mystery"],K=["English","Spanish","French","German","Mandarin Chinese","Hindi","Japanese","Korean","Italian","Russian","Portuguese","Arabic","Turkish","Persian","Swedish","Danish","Norwegian","Finnish","Dutch","Greek","Polish","Hungarian","Czech","Thai","Hebrew","Tamil","Telugu","Bengali"];function Profile(){let[e,r]=n().useState(null),[t,d]=n().useState(""),[u,p]=(0,s.useState)([]),[m,x]=(0,s.useState)([]),[j,y]=(0,s.useState)(!1),_=(0,H.Z)(),[w,A]=(0,s.useState)(""),[O,q]=(0,s.useState)(!1),[T,G]=(0,s.useState)({}),{register:U,control:R,formState:{errors:J},getValues:ee,trigger:er,setValue:et}=(0,l.cI)({resolver:(0,o.F)(Y)});n().useEffect(()=>{let e=_.user.user_id,fetchProfileDetails=async()=>{try{let r=await fetch(`http://localhost:8080/user/profileDetails/${e}`),t=await r.json(),a=t.data;G(a),et("email",a.email),et("fullName",a.fullname),et("phoneNumber",a.mobile),et("dateOfBirth",B()(a.dob)),et("gender",a.gender),et("address1",a.address1),d(a.address1),et("address2",a.address2),et("city",a.city),et("state",a.state),et("country",a.country),et("zipCode",a.zipcode),et("preferredLanguages",a.preferred_languages[0].split(", ")),et("genres",a.genres[0].split(", ")),a.favourite_artists.length>0&&et("favoriteCast",a.favourite_artists[0].split(",")),a.favourite_crew.length>0&&et("favoriteCrew",a.favourite_crew[0].split(",")),A(a.profile_url)}catch(e){console.error("Failed to fetch data:",e)}},fetchArtistData=async()=>{try{let e=await (0,X.e)("","artist/all","GET");x(e.Crew),p(e.Cast),fetchProfileDetails()}catch(e){console.error("Failed to fetch data:",e)}};fetchArtistData()},[]);let handleSelect=async e=>{let r=await (0,W.NU)(e),t=r[0].address_components,getAddressComponent=e=>t.find(r=>r.types.includes(e))?.long_name||"",a=getAddressComponent("route"),s=getAddressComponent("street_number"),n=`${s} ${a}`;d(n),et("address1",n),et("city",getAddressComponent("locality")),et("state",getAddressComponent("administrative_area_level_1")),et("country",getAddressComponent("country")),et("zipCode",getAddressComponent("postal_code"))},getErrorMessage=e=>e&&"string"==typeof e.message?e.message:"";async function submitData(){if(er(),0==Object.keys(J).length){let e=new FormData;Object.entries(ee()).forEach(([r,t])=>{"selectedFile"==r?e.append("file",t):Array.isArray(t)?e.append(r,t.join(", ")):e.append(r,t)}),e.append("id",T.user_id),await (0,X.e)(e,"user/updateProfile","POST"),q(!1)}}return(0,a.jsxs)("div",{style:{display:"block",width:"50%",margin:"auto",paddingTop:"60px"},children:[a.jsx(V(),{src:"https://maps.googleapis.com/maps/api/js?key=AIzaSyAH_4KikoUaqV41Fq09gBEsXzADYU1xM8w&libraries=places",strategy:"afterInteractive",onLoad:()=>{y(!0),console.log("Google Maps script loaded successfully.")}}),a.jsx("form",{children:a.jsx(i.Z,{title:"Hi..",children:(0,a.jsxs)(Z(),{elevation:3,sx:{padding:3,marginBottom:3},children:[(0,a.jsxs)(P.default,{sx:{display:"flex",justifyContent:"space-between"},children:[a.jsx(c(),{variant:"h6",gutterBottom:!0,children:"Personal Details"}),!O&&a.jsx(S(),{startIcon:a.jsx(F.Z,{}),onClick:()=>q(!0)})]}),(0,a.jsxs)(h(),{container:!0,spacing:3,children:[(0,a.jsxs)(h(),{item:!0,xs:12,children:[a.jsx(P.default,{sx:{display:"flex",justifyContent:"center"},children:a.jsx(k(),{sx:{width:100,height:100},src:e?URL.createObjectURL(e):w})}),O&&a.jsx(P.default,{sx:{display:"flex",justifyContent:"center",mt:1},children:(0,a.jsxs)(S(),{sx:{width:200},component:"label",variant:"contained",startIcon:a.jsx(L.Z,{}),children:["Upload file",a.jsx("input",{type:"file",hidden:!0,onChange:t=>{let a=t.target.files;if(a&&a.length>0){let t=a[0];r(t),A(URL.createObjectURL(e))}}})]})})]}),a.jsx(h(),{item:!0,xs:6,children:a.jsx(l.Qr,{name:"email",control:R,render:({field:e})=>a.jsx(g(),{...e,error:!!J.email,helperText:getErrorMessage(J.email),id:"email",name:"email",inputProps:{readOnly:!0},label:"Email ID",fullWidth:!0,variant:"standard",InputLabelProps:{shrink:!!e.value}})})}),a.jsx(h(),{item:!0,xs:6,children:a.jsx(l.Qr,{name:"fullName",control:R,render:({field:e})=>a.jsx(g(),{...e,error:!!J.fullName,helperText:getErrorMessage(J.fullName),id:"fullName",name:"fullName",inputProps:{readOnly:!O},label:"Full Name",fullWidth:!0,variant:"standard",InputLabelProps:{shrink:!!e.value}})})}),a.jsx(h(),{item:!0,xs:6,children:a.jsx(l.Qr,{name:"phoneNumber",control:R,render:({field:e})=>a.jsx(g(),{...e,error:!!J.phoneNumber,helperText:getErrorMessage(J.phoneNumber),id:"phoneNumber",name:"phoneNumber",label:"Phone Number",inputProps:{readOnly:!O},fullWidth:!0,variant:"standard",InputLabelProps:{shrink:!!e.value}})})}),a.jsx(h(),{item:!0,xs:3,children:a.jsx(l.Qr,{name:"dateOfBirth",control:R,defaultValue:null,render:({field:e})=>a.jsx(I.LocalizationProvider,{dateAdapter:M.y,children:O?a.jsx(E.DatePicker,{sx:{width:"100%"},label:"Date of Birth",...e}):a.jsx(g(),{...e,label:"SelectDate",value:e.value?B()(e.value).format("MM/DD/YYYY"):"",disabled:!O,fullWidth:!0,variant:"outlined",InputLabelProps:{shrink:!!e.value}})})})}),a.jsx(h(),{item:!0,xs:3,children:(0,a.jsxs)(f(),{fullWidth:!0,children:[a.jsx(v(),{id:"gender-label",children:"Gender"}),a.jsx(l.Qr,{name:"gender",control:R,defaultValue:"",render:({field:e})=>(0,a.jsxs)(b(),{...e,labelId:"gender-label",inputProps:{readOnly:!O},label:"Gender",variant:"standard",error:!!J.gender,children:[a.jsx(C(),{value:"male",children:"Male"}),a.jsx(C(),{value:"female",children:"Female"}),a.jsx(C(),{value:"other",children:"Other"})]})}),a.jsx(c(),{variant:"inherit",color:"textSecondary",children:getErrorMessage(J.gender)})]})})]}),a.jsx(c(),{sx:{mt:5},variant:"h6",gutterBottom:!0,children:"Address Details"}),(0,a.jsxs)(h(),{container:!0,spacing:3,children:[a.jsx(h(),{item:!0,xs:6,children:j&&a.jsx(W.ZP,{value:t,onChange:d,onSelect:handleSelect,children:({getInputProps:e,suggestions:r,getSuggestionItemProps:t,loading:n})=>(0,a.jsxs)(P.default,{children:[a.jsx(g(),{...e({label:"Address1"}),variant:"standard",fullWidth:!0,inputProps:{readOnly:!O},error:!!J.address1,helperText:getErrorMessage(J.address1)}),n&&a.jsx("div",{children:"Loading..."}),a.jsx(z(),{sx:{position:"absolute",zIndex:1,width:"100%"},children:r.map(e=>(0,s.createElement)(Q(),{...t(e),sx:{backgroundColor:e.active?"#b9d2fa":"#ffffff",cursor:"pointer"},key:e.placeId},e.description))})]})})}),a.jsx(h(),{item:!0,xs:6,children:a.jsx(l.Qr,{name:"address2",control:R,render:({field:e})=>a.jsx(g(),{...e,error:!!J.address2,helperText:getErrorMessage(J.address2),id:"address2",inputProps:{readOnly:!O},name:"address2",label:"Address line 2",fullWidth:!0,variant:"standard",InputLabelProps:{shrink:!!e.value}})})}),a.jsx(h(),{item:!0,xs:6,children:a.jsx(l.Qr,{name:"city",control:R,render:({field:e})=>a.jsx(g(),{...e,error:!!J.city,helperText:getErrorMessage(J.city),id:"city",name:"city",inputProps:{readOnly:!O},label:"City",fullWidth:!0,variant:"standard",InputLabelProps:{shrink:!!e.value}})})}),a.jsx(h(),{item:!0,xs:6,children:a.jsx(l.Qr,{name:"state",control:R,render:({field:e})=>a.jsx(g(),{...e,error:!!J.state,helperText:getErrorMessage(J.state),id:"state",name:"state",inputProps:{readOnly:!O},label:"State/Province/Region",fullWidth:!0,variant:"standard",InputLabelProps:{shrink:!!e.value}})})}),a.jsx(h(),{item:!0,xs:6,children:a.jsx(l.Qr,{name:"country",control:R,render:({field:e})=>a.jsx(g(),{...e,error:!!J.country,helperText:getErrorMessage(J.country),id:"country",name:"country",label:"Country",inputProps:{readOnly:!O},fullWidth:!0,variant:"standard",InputLabelProps:{shrink:!!e.value}})})}),a.jsx(h(),{item:!0,xs:6,children:a.jsx(l.Qr,{name:"zipCode",control:R,render:({field:e})=>a.jsx(g(),{...e,error:!!J.zipCode,helperText:getErrorMessage(J.zipCode),id:"zipCode",name:"zipCode",inputProps:{readOnly:!O},label:"Zip / Postal code",fullWidth:!0,variant:"standard",InputLabelProps:{shrink:!!e.value}})})})]}),a.jsx(c(),{sx:{mt:5},variant:"h6",gutterBottom:!0,children:"Additional Details"}),(0,a.jsxs)(f(),{fullWidth:!0,margin:"normal",children:[a.jsx(v(),{htmlFor:"genres",children:"Genres"}),a.jsx(l.Qr,{name:"genres",control:R,defaultValue:[],render:({field:e})=>(0,a.jsxs)("div",{children:[a.jsx(b(),{multiple:!0,value:e.value,inputProps:{readOnly:!O},fullWidth:!0,onChange:r=>e.onChange(r.target.value),error:!!J.genres,label:"Genres",children:$.map(e=>a.jsx(C(),{value:e,children:e},e))}),a.jsx(D(),{error:!!J.genres,children:getErrorMessage(J.genres)})]})})]}),(0,a.jsxs)(f(),{fullWidth:!0,margin:"normal",children:[a.jsx(v(),{htmlFor:"favoriteCast",children:"Favorite Cast"}),a.jsx(l.Qr,{name:"favoriteCast",control:R,defaultValue:[],render:({field:e})=>(0,a.jsxs)("div",{children:[a.jsx(b(),{multiple:!0,value:e.value,inputProps:{readOnly:!O},fullWidth:!0,onChange:r=>e.onChange(r.target.value),error:!!J.favoriteCast,label:"Favorite Casr",children:u.map(e=>a.jsx(C(),{value:e.id,children:e.name},e.id))}),a.jsx(D(),{error:!!J.favoriteCast,children:getErrorMessage(J.favoriteCast)})]})})]}),(0,a.jsxs)(f(),{fullWidth:!0,margin:"normal",children:[a.jsx(v(),{htmlFor:"favoriteCrew",children:"Favorite Crew"}),a.jsx(l.Qr,{name:"favoriteCrew",control:R,defaultValue:[],render:({field:e})=>(0,a.jsxs)("div",{children:[a.jsx(b(),{multiple:!0,value:e.value,fullWidth:!0,inputProps:{readOnly:!O},onChange:r=>e.onChange(r.target.value),error:!!J.favoriteCrew,label:"Favorite Crew",children:m.map(e=>a.jsx(C(),{value:e.id,children:e.name},e.id))}),a.jsx(D(),{error:!!J.favoriteCrew,children:getErrorMessage(J.favoriteCrew)})]})})]}),(0,a.jsxs)(f(),{fullWidth:!0,margin:"normal",children:[a.jsx(v(),{htmlFor:"preferredLanguages",children:"Preferred Languages"}),a.jsx(l.Qr,{name:"preferredLanguages",control:R,defaultValue:[],render:({field:e})=>(0,a.jsxs)("div",{children:[a.jsx(b(),{multiple:!0,value:e.value,fullWidth:!0,inputProps:{readOnly:!O},onChange:r=>e.onChange(r.target.value),error:!!J.preferredLanguages,label:"Preferred Languages",children:K.map(e=>a.jsx(C(),{value:e,children:e},e))}),a.jsx(D(),{error:!!J.preferredLanguages,children:getErrorMessage(J.preferredLanguages)})]})})]}),O&&(0,a.jsxs)(P.default,{sx:{display:"flex",justifyContent:"center"},children:[a.jsx(S(),{onClick:()=>submitData(),variant:"contained",endIcon:a.jsx(N.Z,{}),sx:{mt:2,mr:5},children:"Submit"}),a.jsx(S(),{onClick:()=>void(et("email",T.email),et("fullName",T.fullname),et("phoneNumber",T.mobile),et("dateOfBirth",B()(T.dob)),et("gender",T.gender),et("address1",T.address1),d(T.address1),et("address2",T.address2),et("city",T.city),et("state",T.state),et("country",T.country),et("zipCode",T.zipcode),et("preferredLanguages",T.preferred_languages[0].split(", ")),et("genres",T.genres[0].split(", ")),T.favourite_artists.length>0&&et("favoriteCast",T.favourite_artists[0].split(",")),T.favourite_crew.length>0&&et("favoriteCrew",T.favourite_crew[0].split(",")),r(null),A(T.profile_url),q(!1)),variant:"outlined",sx:{mt:2},children:"Cancel"})]})]})})})]})}},35716:(e,r,t)=>{"use strict";t.r(r),t.d(r,{$$typeof:()=>i,__esModule:()=>n,default:()=>o});var a=t(95153);let s=(0,a.createProxy)(String.raw`/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/personal_profile/page.tsx`),{__esModule:n,$$typeof:i}=s,l=s.default,o=l}};var r=require("../../webpack-runtime.js");r.C(e);var __webpack_exec__=e=>r(r.s=e),t=r.X(0,[2958,1323,938,1276,9904,3508,884],()=>__webpack_exec__(83688));module.exports=t})();