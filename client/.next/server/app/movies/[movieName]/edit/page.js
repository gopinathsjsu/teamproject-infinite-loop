(()=>{var e={};e.id=2127,e.ids=[2127],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},28502:(e,t,i)=>{"use strict";i.r(t),i.d(t,{GlobalError:()=>r.a,__next_app__:()=>m,originalPathname:()=>c,pages:()=>p,routeModule:()=>u,tree:()=>d});var a=i(67096),n=i(16132),l=i(37284),r=i.n(l),s=i(32564),o={};for(let e in s)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>s[e]);i.d(t,o);let d=["",{children:["movies",{children:["[movieName]",{children:["edit",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(i.bind(i,5023)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/movies/[movieName]/edit/page.tsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(i.bind(i,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(i.bind(i,79113)),"/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(i.t.bind(i,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(i.bind(i,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],p=["/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/movies/[movieName]/edit/page.tsx"],c="/movies/[movieName]/edit/page",m={require:i,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/movies/[movieName]/edit/page",pathname:"/movies/[movieName]/edit",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},48246:(e,t,i)=>{Promise.resolve().then(i.bind(i,19090))},19090:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>EditMovie});var a=i(30784),n=i(9885),l=i(16614),r=i.n(l),s=i(92870),o=i.n(s),d=i(51892),p=i.n(d),c=i(88707),m=i.n(c),u=i(43872),h=i(92133),x=i.n(h),v=i(97445),g=i.n(v),f=i(47459),j=i.n(f),y=i(58111),b=i.n(y),_=i(52694),w=i.n(_),P=i(33987),C=i.n(P),T=i(85246),A=i.n(T),M=i(95843),S=i.n(M),k=i(15050),D=i(99582),E=i(80676),R=i.n(E),I=i(57114);function EditMovie(){let{movieName:e}=(0,I.useParams)(),[t,i]=(0,n.useState)([]),[l,s]=(0,n.useState)([]),[d,c]=(0,n.useState)([]),[h,v]=(0,n.useState)([]),[f,y]=(0,n.useState)(null),[_,P]=(0,n.useState)({movieName:"",AboutTheMovie:"",movieTrailerLink:"",Runtime:"",genre:[],format:[],endDate:"",releaseDate:"",cast:"",crew:"",certificate:"",languages:""});(0,n.useEffect)(()=>{let fetchMovie=async()=>{try{let t=await (0,k.e)("",`movie/${e}`,"GET");P(()=>({movieName:t.movie.title,AboutTheMovie:t.movie.description,movieTrailerLink:t.movie.trailer_url,Runtime:t.movie.run_time,genre:t.movie.genres[0].split(","),format:t.movie.format.split(","),endDate:t.movie.end_date.split("T")[0],releaseDate:t.movie.release_date.split("T")[0],cast:"",crew:"",certificate:t.movie.certificate,languages:t.movie.languages[0]})),c(t.cast.map(e=>({id:e.id,name:e.name,description:e.description,profession:e.profession,profile_url:e.profile_url}))),v(t.crew.map(e=>({id:e.id,name:e.name,description:e.description,profession:e.profession,profile_url:e.profile_url})))}catch(e){console.error("Failed to fetch data:",e)}},fetchArtsitData=async()=>{try{let e=await (0,k.e)("","artist/all","GET");s(e.Crew),i(e.Cast),fetchMovie()}catch(e){console.error("Failed to fetch data:",e)}};fetchArtsitData()},[]);let T=(0,I.useRouter)(),M={PaperProps:{style:{maxHeight:224,width:250}}};function getStyles(e,t,i){return{fontWeight:-1===t.indexOf(e)?i.typography.fontWeightRegular:i.typography.fontWeightMedium}}let handleInput=e=>{console.log(e.target);let t=e.target.name,i=e.target.value;P(e=>({...e,[t]:i}))},submitForm=async t=>{t.preventDefault(),console.log(_);let i=new FormData;Object.entries(_).forEach(([e,t])=>{"genre"===e||"format"===e?i.append(e,t.join(", ")):i.append(e,t)}),f&&f.forEach((e,t)=>{i.append("movieposter",e)}),i.append("castIds",d.map(e=>e.id).join(",")),console.log(h),i.append("crewIds",h.map(e=>e.id).join(",")),i.append("id",e);let a=await (0,k.e)(i,"movie/updateMovie","POST");null!=a&&T.push("/movies/all")};return(0,a.jsxs)("div",{style:{display:"block",width:"50%",margin:"auto",paddingTop:"100px"},children:[a.jsx(w(),{elevation:3,style:{padding:"2px",textAlign:"center",marginBottom:"30px"},children:a.jsx(C(),{variant:"h4",component:"h1",style:{fontFamily:"Arial, sans-serif",fontSize:"36px",fontWeight:"bold",color:"#333",textTransform:"uppercase",borderBottom:"2px solid #0073e6",padding:"10px 0",textAlign:"center",letterSpacing:"2px",textShadow:"2px 2px 4px rgba(0, 0, 0, 0.2)"},children:"Update Movie"})}),a.jsx("form",{method:"POST",onSubmit:submitForm,children:(0,a.jsxs)(u.default,{component:"div",sx:{backgroundColor:"white",padding:"15px",borderRadius:"1px",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)"},children:[a.jsx("div",{style:{marginBottom:"12px"},children:(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr",gap:"16px"},children:[(0,a.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[a.jsx("div",{style:{flex:1},children:a.jsx(o(),{label:"Movie Name",variant:"outlined",fullWidth:!0,name:"movieName",placeholder:"Movie Name",onChange:handleInput,value:_.movieName})}),a.jsx("div",{style:{flex:1},children:a.jsx(o(),{label:"About the Movie",variant:"outlined",fullWidth:!0,name:"AboutTheMovie",placeholder:"About the Movie",onChange:handleInput,value:_.AboutTheMovie})})]}),(0,a.jsxs)("div",{children:[a.jsx(g(),{htmlFor:"end-date",shrink:!0,children:"Movie Poster"}),a.jsx(o(),{variant:"outlined",fullWidth:!0,name:"movieposter",type:"file",onChange:e=>{let t=e.target.files;if(t&&t.length>0){console.log(t);let e=Array.from(t);y(e)}},inputProps:{multiple:!0}})]}),(0,a.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[a.jsx("div",{style:{flex:1},children:a.jsx(o(),{label:"Movie Trailer Link",variant:"outlined",fullWidth:!0,name:"movieTrailerLink",onChange:handleInput,value:_.movieTrailerLink})}),a.jsx("div",{style:{flex:1},children:a.jsx(o(),{label:"Runtime",variant:"outlined",fullWidth:!0,name:"Runtime",placeholder:"Runtime",onChange:handleInput,value:_.Runtime})})]})]})}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr",gap:"16px"},children:[(0,a.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[a.jsx("div",{children:(0,a.jsxs)(b(),{sx:{m:1,width:300},children:[a.jsx(g(),{id:"demo-multiple-chip-label",children:"Select Genres"}),a.jsx(p(),{labelId:"demo-multiple-chip-label",id:"demo-multiple-chip",multiple:!0,value:_.genre,onChange:e=>{let{target:{value:t}}=e;P(e=>({...e,genre:t}))},input:a.jsx(j(),{id:"select-multiple-chip",label:"Select Genres"}),renderValue:e=>a.jsx(u.default,{sx:{display:"flex",flexWrap:"wrap",gap:.5},children:e.map(e=>a.jsx(x(),{label:e},e))}),MenuProps:M,children:["Action","Drama","Comedy","Science Fiction","Horror","Romance","Fantasy","Thriller","Adventure","Mystery"].map((e,t)=>a.jsx(m(),{value:e,style:getStyles(e,_.genre,D.Z),children:e},e))})]})}),a.jsx("div",{children:(0,a.jsxs)(b(),{sx:{m:1,width:300},children:[a.jsx(g(),{id:"format-multiple-chip-label",children:"Select Format"}),a.jsx(p(),{labelId:"format-multiple-chip-label",id:"format-multiple-chip",multiple:!0,value:_.format,onChange:e=>{let{target:{value:t}}=e;P(e=>({...e,format:t}))},input:a.jsx(j(),{id:"select-multiple-chip-format",label:"Select Format"}),renderValue:e=>a.jsx(u.default,{sx:{display:"flex",flexWrap:"wrap",gap:.5},children:e.map(e=>a.jsx(x(),{label:e},e))}),MenuProps:M,children:["IMAX 70mm","4DX","3D","SD"].map(e=>a.jsx(m(),{value:e,style:getStyles(e,_.format,D.Z),children:e},e))})]})})]}),(0,a.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[a.jsx("div",{children:(0,a.jsxs)(b(),{fullWidth:!0,variant:"outlined",children:[a.jsx(g(),{htmlFor:"Release-date",shrink:!0,children:"Release Date"}),a.jsx(A(),{id:"Release-date",type:"date",name:"releaseDate",value:_.releaseDate,onChange:handleInput})]})}),a.jsx("div",{children:(0,a.jsxs)(b(),{fullWidth:!0,variant:"outlined",children:[a.jsx(g(),{htmlFor:"end-date",shrink:!0,children:"End Date"}),a.jsx(A(),{id:"end-date",type:"date",name:"endDate",value:_.endDate,onChange:handleInput})]})})]}),a.jsx("div",{children:a.jsx(R(),{multiple:!0,id:"tags-outlined",options:t,getOptionLabel:e=>e.name||"",value:d,onChange:(e,t)=>{c(t)},renderOption:(e,t)=>(0,a.jsxs)(u.default,{component:"li",...e,children:[a.jsx(S(),{src:t.profile_url,alt:t.name,sx:{width:30,height:30,marginRight:1}},t.name),t.name]}),renderTags:(e,t)=>e.map((e,i)=>(0,n.createElement)(u.default,{...t({index:i}),component:"div",sx:{display:"flex",alignItems:"center",gap:1},key:i,children:[a.jsx("img",{src:e.profile_url,alt:e.name,style:{width:"30px",height:"30px",borderRadius:"50%"}}),e.name]})),renderInput:e=>a.jsx(o(),{...e,label:"Movie Cast",placeholder:"Cast"})})}),a.jsx("div",{children:a.jsx(R(),{multiple:!0,id:"tags-outlined",options:l,getOptionLabel:e=>e.name||"",value:h,onChange:(e,t)=>{v(t)},renderOption:(e,t)=>(0,a.jsxs)(u.default,{component:"li",...e,children:[a.jsx(S(),{src:t.profile_url,alt:t.name,sx:{width:30,height:30,marginRight:1}},t.name),t.name]}),renderTags:(e,t)=>e.map((e,i)=>(0,n.createElement)(u.default,{...t({index:i}),component:"div",sx:{display:"flex",alignItems:"center",gap:1},key:i,children:[a.jsx("img",{src:e.profile_url,alt:e.name,style:{width:"30px",height:"30px",borderRadius:"50%"}}),e.name]})),renderInput:e=>a.jsx(o(),{...e,label:"Movie Crew",placeholder:"Crew"})})}),(0,a.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[a.jsx("div",{children:(0,a.jsxs)(b(),{variant:"outlined",fullWidth:!0,style:{width:"200px"},children:[a.jsx(g(),{children:"Certificate"}),(0,a.jsxs)(p(),{label:"Certificate",value:_.certificate,onChange:handleInput,name:"certificate",children:[a.jsx(m(),{value:"U",children:"U"},"U"),a.jsx(m(),{value:"U/A",children:"U/A"},"U/A"),a.jsx(m(),{value:"A",children:"A"},"A")]})]})}),a.jsx("div",{children:a.jsx(o(),{select:!0,value:_.languages,onChange:handleInput,variant:"outlined",fullWidth:!0,name:"languages",SelectProps:{native:!0},children:["Select a language","English","Spanish","French","German","Mandarin Chinese","Hindi","Japanese","Korean","Italian","Russian","Portuguese","Arabic","Turkish","Persian","Swedish","Danish","Norwegian","Finnish","Dutch","Greek","Polish","Hungarian","Czech","Thai","Hebrew","Tamil","Telugu","Bengali"].map((e,t)=>a.jsx("option",{value:e,children:e},t))})})]}),a.jsx(r(),{type:"submit",variant:"contained",color:"primary",children:"Submit"})]})]})})]})}},5023:(e,t,i)=>{"use strict";i.r(t),i.d(t,{$$typeof:()=>r,__esModule:()=>l,default:()=>o});var a=i(95153);let n=(0,a.createProxy)(String.raw`/Users/sravankumargorati/teamproject-infinite-loop/client/src/app/movies/[movieName]/edit/page.tsx`),{__esModule:l,$$typeof:r}=n,s=n.default,o=s},73881:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var a=i(31323);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,a.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}}};var t=require("../../../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),i=t.X(0,[2958,1323,3508],()=>__webpack_exec__(28502));module.exports=i})();