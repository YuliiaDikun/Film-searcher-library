!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequireb280;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},t.parcelRequireb280=a);var i=a("bpxeT"),o=a("2TvXO"),s=a("iU1Pc"),u=a("lHIzZ"),c=a("2eIIo"),d=a("pWSgs"),l=a("bGg9a"),f=(l=a("bGg9a"),document.querySelector(".films")),g=document.querySelector("#js-film-modal"),m="watchedList",v="queueList",p="favouriteMovies";f.addEventListener("click",(function(e){return L.apply(this,arguments)}));var y=new(0,u.default);function L(){return(L=e(i)(e(o).mark((function t(n){var r,a,i,u,f,L,b,w,h,k,x,T,E,N,q,S,O,_,F,I;return e(o).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(w=function(e){return e.map((function(e){return e})).find((function(e){return e.name.includes("Trailer")||e.name}))},k=function(t){if(t)return"https://www.youtube.com/embed/".concat(t.key);e(s).Notify.failure("Oops! Trailer did not find...")},S=function(){T.movie||(N.disabled=!0,N.classList.add("noHover"))},O=function(){q.classList.toggle("trailer__youtube")},_=function(){g.innerHTML="",g.classList.add("is-hidden"),document.removeEventListener("keydown",F),g.removeEventListener("click",I),N.removeEventListener("click",O)},F=function(e){"Escape"===e.code&&_()},I=function(e){"path"!==e.target.nodeName&&"svg"!==e.target.nodeName||_(),e.target===e.currentTarget&&_(),"watched"===e.target.dataset.name&&(0,l.default)(m,a,T),"queue"===e.target.dataset.name&&(0,l.default)(v,a,T)},t.prev=7,"UL"!==n.target.nodeName){t.next=10;break}return t.abrupt("return");case 10:return r=n.target.closest("li"),a=r.dataset.id,y.idFilm=a,t.next=15,y.getFilmByID();case 15:if(i=t.sent,u=i.genres,"svg"!==n.target.nodeName&&"path"!==n.target.nodeName){t.next=21;break}n.target.closest("svg").classList.toggle("active"),f=u[0],(0,l.setFavFilmsToLocalStorage)(p,f,a),t.next=45;break;case 21:return t.next=23,y.getTrailerById();case 23:L=t.sent,b=L.results,h=w(b),x=k(h),(T=(0,d.default)(i)).movie=x,E=(0,c.default)(T),g.innerHTML=E,N=document.querySelector(".trailerShow"),q=document.querySelector(".hidden"),g.classList.remove("is-hidden"),g.addEventListener("click",I),document.addEventListener("keydown",F),N.addEventListener("click",O),S();case 45:t.next=50;break;case 47:t.prev=47,t.t0=t.catch(7),e(s).Notify.failure("Oops! Something gets wrong!");case 50:case"end":return t.stop()}}),t,null,[[7,47]])})))).apply(this,arguments)}}();
//# sourceMappingURL=index.945c4b9b.js.map
