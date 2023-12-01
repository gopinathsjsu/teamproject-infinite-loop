"use strict";exports.id=5819,exports.ids=[5819],exports.modules={35847:(r,e,s)=>{s.d(e,{NI:()=>apiLoginUser,y4:()=>apiRegisterUser});let i="http://localhost:8080";async function handleResponse(r){let e=r.headers.get("Content-Type")||"",s=e.includes("application/json"),i=s?await r.json():await r.text();if(!r.ok){if(s&&null!==i.errors)throw Error(JSON.stringify(i.errors));throw Error(i.message||r.statusText)}return i}async function apiRegisterUser(r){let e=await fetch(`${i}/user/signup`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:r});return handleResponse(e).then(r=>r.message)}async function apiLoginUser(r){let e=await fetch(`${i}/user/login`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:r});return console.log(e),handleResponse(e).then(r=>r.data)}},24511:(r,e,s)=>{s.d(e,{zG:()=>handleApiError}),s(29282);var i=s(10345);function handleApiError(r){try{let e;try{e=JSON.parse(r.message)}catch(e){i.ZP.error(r.message);return}if("object"==typeof e&&null!==e&&"fieldErrors"in e){let r=e.fieldErrors;Object.keys(r).forEach(e=>{let s=r[e];if(s.length>0){let r=s[0];i.ZP.error(r)}})}}catch(r){i.ZP.error(r)}}},85525:(r,e,s)=>{s.d(e,{V:()=>t,_:()=>a});var i=s(19098);let a=i.z.object({name:i.z.string({required_error:"Name is required"}).min(1,"Full name is required"),email:i.z.string({required_error:"Email is required"}).min(1,"Email is required").email("Email is invalid"),password:i.z.string({required_error:"Password is required"}).min(1,"Password is required").min(8,"Password must be more than 8 characters").max(32,"Password must be less than 32 characters"),confirmPassword:i.z.string({required_error:"Confirm your password"}).min(1,"Confirm your password")}).refine(r=>r.password===r.confirmPassword,{path:["confirmPassword"],message:"Passwords do not match"}),t=i.z.object({email:i.z.string({required_error:"Email is required"}).min(1,"Email is required").email("Email is invalid"),password:i.z.string({required_error:"Password is required"}).min(1,"Password is required").min(8,"Password must be at least 8 characters")})},73881:(r,e,s)=>{s.r(e),s.d(e,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var i=s(31323);let __WEBPACK_DEFAULT_EXPORT__=r=>{let e=(0,i.fillMetadataSegment)(".",r.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:e+""}]}}};