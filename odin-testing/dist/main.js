(()=>{"use strict";const e=(e=[0,0])=>{let t=null,r=!1;return{coords:e,get shipRef(){return t},set shipRef(e){t=e},get hit(){return r},set hit(e){r=e},get symbol(){return r?"x":t?t.name.slice(0,1):"."}}},t=(e,t="")=>{let r=0;const n=()=>r>=e;return{length:e,name:t,isPlaced:!1,hit:()=>(r++,!!n()),get isSunk(){return n()}}},r=()=>{const e=(e,t)=>e.map(((e,r)=>e+t[r])),t=(e,t)=>e.map(((e,r)=>e-t[r])),r=(e,t)=>e.map(((e,r)=>e==t[r])),n=e=>e.map((e=>0==e?0:e/Math.abs(e))),o=[[0,1],[1,0],[0,-1],[-1,0]];return{add:e,subtract:t,multiply:(e,t)=>e.map(((e,r)=>e*t[r])),scale:(e,t)=>e.map((e=>e*t)),length:e=>Math.hypot(e[0],e[1]),compare:r,normalize:n,getPointsBetween:(o,s)=>{const a=n(t(s,o)),i=[o];let l=0;for(;!r(i[i.length-1],s).every((e=>1==e))&&l<=1e3;){const t=e(i[i.length-1],a);i.push(t),l++}return i},getDirection:e=>{const t=o[{DOWN:0,RIGHT:1,UP:2,LEFT:3}[e.toUpperCase()]];if(null==t)throw new Error("invalid direction key");return t},directionArray:o}},n=r(),o=()=>{let r=[],o=[t(5,"Carrier"),t(4,"Battleship"),t(3,"Destroyer"),t(3,"Submarine"),t(2,"Patrol Boat")];for(let t=0;t<10;t++){let n=[];for(let r=0;r<10;r++)n.push(e([t,r]));r.push(n)}const s=e=>{const t=o.find((t=>t.name.toLowerCase()==e.toLowerCase()));if(null==t)throw new Error("no ship with that name found.");return t},a=e=>{const t=e[0],n=e[1];return t<0|t>9|n<0|n>9?new Error("requested cell out of bounds"):r[e[0]][e[1]]},i=(e,t,r)=>{const o=[...Array(r).keys()].map((r=>n.add(e,n.scale(t,r)))).map((e=>a(e)));return o.some((e=>e instanceof Error))?new Error("some cells could not be acquired."):o.some((e=>e.shipRef))?new Error("cannot overlap ships"):o.some((e=>e.hit))?new Error("cells have been hit; will result in softlock"):o};return{placeShip:(e,t=[0,1],r="Patrol Boat")=>{const n=s(r);return((e,t)=>{if(e instanceof Error)return e;if(t.isPlaced)throw new Error("ship already been placed, remove first.");for(let r of e)r.shipRef=t;return t.isPlaced=!0,!0})(i(e,t,n.length),n)},checkShipPlace:(e,t=[0,1],r="Patrol Boat")=>{const n=s(r);return!(i(e,t,n.length)instanceof Error)},removeShip:e=>{const t=s(e);if(!t.isPlaced)throw new Error("ship is not placed");return(e=>{const t=r.flat().filter((t=>t.shipRef==e));if(!t)throw new Error("ship cells could not be found");return t})(t).forEach((e=>e.shipRef=null)),t.isPlaced=!1,!0},receiveAttack:e=>{const t=a(e);if(t.hit)throw new Error("cell already hit");return t.hit=!0,t.shipRef&&t.shipRef.hit(),!!t.shipRef},getCell:a,getBoard:()=>r,getHitCount:()=>r.flat().filter((e=>e.hit)).length,ships:o,get isAllSunk(){return o.filter((e=>e.isPlaced)).every((e=>e.isSunk))},get isAllPlaced(){return o.every((e=>e.isPlaced))},print:()=>r.map((e=>e.map((e=>e.symbol)).join(" "))).join("\n")}},s=r(),a=e=>Math.floor(Math.random()*e),i=()=>{const e=o();let t;const r=t=>{for(;!t.isPlaced;){const r=[a(9),a(9)],n=s.directionArray[a(3)];e.checkShipPlace(r,n,t.name)&&e.placeShip(r,n,t.name)}};return{board:e,placeRemainingShips:()=>{const t=e.ships.filter((e=>!e.isPlaced));for(;t.length>0;){const e=t.shift();r(e)}},setEnemy:e=>(t=e,t),attackEnemy:e=>{e||(e=(()=>{const e=t.board.getBoard().flat().filter((e=>!e.hit));return e[a(e.length-1)].coords})()),t.board.receiveAttack(e)}}},l=e=>{const t=r=>{const n=document.createElement("div");return n.classList.add("gamecell"),r.hit&&r.shipRef?n.classList.add("gamecell--hit"):r.hit&&n.classList.add("gamecell--miss"),r.shipRef&&(n.innerText=r.symbol),n.addEventListener("click",(()=>{e.receiveAttack(r.coords),n.replaceWith(t(r))})),console.log(n),n},r=document.createElement("div");r.classList.add("gameboard");const n=e.getBoard().flat().map((e=>t(e)));for(let e of n)r.appendChild(e);return r};console.log("main blah blah"),(()=>{const e=i(),t=i(),r=[e,t];return e.setEnemy(t),t.setEnemy(e),{startGame:()=>{for(let e of r)e.placeRemainingShips(),document.getElementById("main").appendChild(l(e.board))}}})().startGame()})();