function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},o=t.parcelRequireb280;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){i[e]=t},t.parcelRequireb280=o);var r=o("eWCmQ"),a=o("9Bkxl"),d=o("eXQeU"),s=o("6Jpgb"),l=o("2ST4D");l=o("2ST4D");const c=document.querySelector(".films"),u=document.querySelector("#js-film-modal");c.addEventListener("click",(async function(t){try{if("UL"===t.target.nodeName)return;const c=t.target.closest("li").dataset.id;f.idFilm=c;const m=await f.getFilmByID();let g=m.genres;if("svg"===t.target.nodeName||"path"===t.target.nodeName){t.target.closest("svg").classList.toggle("active");const v=g[0];(0,l.setFavFilmsToLocalStorage)("favouriteMovies",v,c)}else{let p=(await f.getTrailerById()).results;const y=function(t){if(t)return`https://www.youtube.com/embed/${t.key}`;e(r).Notify.failure("Oops! Trailer did not find...")}(p.map((e=>e)).find((e=>e.name.includes("Trailer")||e.name))),L=(0,s.default)(m);L.movie=y;const w=(0,d.default)(L);u.innerHTML=w;let h=document.querySelector(".trailerShow"),T=document.querySelector(".hidden");function n(){T.classList.toggle("trailer__youtube")}function i(){u.innerHTML="",u.classList.add("is-hidden"),document.removeEventListener("keydown",o),u.removeEventListener("click",a),h.removeEventListener("click",n)}function o(e){"Escape"===e.code&&i()}function a(e){"path"!==e.target.nodeName&&"svg"!==e.target.nodeName||i(),e.target===e.currentTarget&&i(),"watched"===e.target.dataset.name&&(0,l.default)("watchedList",c,L),"queue"===e.target.dataset.name&&(0,l.default)("queueList",c,L)}u.classList.remove("is-hidden"),u.addEventListener("click",a),document.addEventListener("keydown",o),h.addEventListener("click",n),L.movie||(h.disabled=!0,h.classList.add("noHover"))}}catch(b){e(r).Notify.failure("Oops! Something gets wrong!")}}));const f=new(0,a.default);
//# sourceMappingURL=index.83f642ca.js.map