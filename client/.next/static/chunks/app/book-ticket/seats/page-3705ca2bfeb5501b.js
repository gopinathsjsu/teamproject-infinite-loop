(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1217],{91178:function(e,t,s){Promise.resolve().then(s.bind(s,80570))},18071:function(e,t,s){"use strict";s.d(t,{_:function(){return a}});let a=[{id:1,name:"Avengers: Endgame(INOX)",language:"English",ticketCost:200,rows:20,cols:6,seats:{A:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],B:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],C:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],D:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],E:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],F:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],G:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},{id:2,name:"Uri: The Surgical Strike(PVR)",language:"Hindi",ticketCost:200,rows:20,cols:6,seats:{A:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],B:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],C:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],D:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],E:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],F:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],G:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},{id:3,name:"KGF: Chapter 1(Cinepolis)",language:"Kannada",ticketCost:200,rows:20,cols:6,seats:{A:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],B:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],C:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],D:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],E:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],F:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],G:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},{id:4,name:"Master(PVR)",language:"Tamil",ticketCost:200,rows:20,cols:6,seats:{A:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],B:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],C:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],D:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],E:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],F:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],G:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},{id:5,name:"Bahubali: The beginning(INOX)",language:"Telugu",ticketCost:200,rows:20,cols:6,seats:{A:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],B:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],C:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],D:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],E:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],F:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],G:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}}]},80570:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return page}});var a=s(57437),n=s(83574),c=s.n(n),l=s(61396),o=s.n(l),r=s(24033),i=s(2265),d=s(96471),_=s.n(d),u=s(18071),m=i.createContext({movies:u._}),page=()=>{let{movies:e}=(0,i.useContext)(m);(0,r.useSearchParams)();let t=[],s=e.find(e=>e.id===parseInt("3")),[n,l]=(0,i.useState)((null==s?void 0:s.seats)||{});(0,i.useEffect)(()=>{clearSelectedSeats()},[]);let clearSelectedSeats=()=>{let e={...n};for(let e in n)n[e].forEach((t,s)=>{2===t&&(n[e][s]=0)});l(e)},onSeatClick=(e,t,s)=>{if(n){if(1===e||3===e)return;0===e?n[s][t]=2:n[s][t]=0}l({...n})},getClassNameForSeats=e=>{let t;return t=0===e?_().seatNotBooked:1===e?_().seatBooked:2===e?_().seatSelected:_().seatBlocked,"".concat(_().seats," ").concat(t)};return s?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c(),{children:(0,a.jsx)("title",{children:"Seats"})}),(0,a.jsxs)("div",{className:_().seatsContainer,children:[(0,a.jsx)("h1",{children:s.name}),n&&(0,a.jsx)(()=>{let e=[];for(let t in n){let s=n[t].map((e,s)=>(0,a.jsxs)("span",{className:_().seatsHolder,children:[0===s&&(0,a.jsx)("span",{className:_().colName,children:t}),(0,a.jsx)("span",{className:getClassNameForSeats(e),onClick:()=>onSeatClick(e,s,t),children:s+1}),n&&s===n[t].length-1&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("br",{}),(0,a.jsx)("br",{})]})]},"".concat(t,".").concat(s)));e.push(s)}return(0,a.jsx)("div",{className:_().seatsLeafContainer,children:e})},{}),(0,a.jsx)("div",{className:_().cont_screen,children:(0,a.jsx)("div",{className:_().screen})}),(0,a.jsx)(()=>{for(let e in t=[],n)n[e].forEach((s,a)=>{2===s&&t.push("".concat(e).concat(a+1))});return t.length?(0,a.jsx)(o(),{href:{pathname:"/payment",query:{movieId:null==s?void 0:s.id,seatDetails:JSON.stringify(n)}},children:(0,a.jsx)("div",{className:_().paymentButtonContainer,children:(0,a.jsx)("button",{type:"submit",className:"btn btn-block",children:(0,a.jsxs)("span",{children:["Pay Rs.",t.length*((null==s?void 0:s.ticketCost)||0)]})})})}):(0,a.jsx)(a.Fragment,{})},{})]})]}):(0,a.jsx)("div",{children:"loading..."})}},96471:function(e){e.exports={seatsContainer:"Seats_seatsContainer__K8SDZ",seatsHolder:"Seats_seatsHolder__Og1ED",seatsLeafContainer:"Seats_seatsLeafContainer__v39vG",seats:"Seats_seats____M2V",colName:"Seats_colName__Q8mff",seatSelected0:"Seats_seatSelected0__953HV",seatBlocked:"Seats_seatBlocked__e3jDN",seatBooked:"Seats_seatBooked__SK_6p",seatSelected:"Seats_seatSelected__aRSxz",paymentButton:"Seats_paymentButton__ACowR",paymentButtonContainer:"Seats_paymentButtonContainer__520x_",cont_screen:"Seats_cont_screen__0By3L",screen:"Seats_screen__ssVTo"}}},function(e){e.O(0,[3862,2971,2472,1744],function(){return e(e.s=91178)}),_N_E=e.O()}]);