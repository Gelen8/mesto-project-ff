(()=>{"use strict";function e(e,t,n,r,o,c,a,u,i,s){var l=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),p=l.querySelector(".card__image"),d=l.querySelector(".card__title"),f=l.querySelector(".card__likes-counter");p.src=e.link,p.alt=e.name,d.textContent=e.name,f.textContent=e.likes.length;var _=i===e.owner._id,m=l.querySelector(".card__delete-button");_||m.remove(),m.addEventListener("click",(function(){return t(n,s,l)}));var y=l.querySelector(".card__like-button");return r(e.likes,i)&&y.classList.add("card__like-button_is-active"),y.addEventListener("click",(function(){return o(y,a,s,f,u)})),p.addEventListener("click",(function(){return c(e.link,e.name)})),l}function t(e,t,n){e(t).catch((function(e){console.log(e)})),n.remove()}function n(e,t,n,r,o){e.classList.contains("card__like-button_is-active")?(o(n).then((function(e){r.textContent=e.likes.length})).catch((function(e){console.log(e)})),e.classList.remove("card__like-button_is-active")):(t(n).then((function(e){r.textContent=e.likes.length})).catch((function(e){console.log(e)})),e.classList.add("card__like-button_is-active"))}function r(e,t){return e.some((function(e){return e._id===t}))}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function a(e){e.target.classList.contains("popup")&&c(e.target)}function u(e){e.querySelector(".popup__close").addEventListener("click",(function(){return c(e)}))}function i(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var s=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""},l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))},p=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t.inputErrorClass,t.errorClass)})),l(n,r,t.inactiveButtonClass)},d={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-35",headers:{authorization:"11f4d9df-4568-4bdf-a413-e907581f4a6d","Content-Type":"application/json"}},f=function(e){return fetch("".concat(d.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:d.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},_=function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:d.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},m=function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:d.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))};function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var v=document.querySelector(".places__list"),h=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),b=document.querySelector(".profile__image");Promise.all([fetch("".concat(d.baseUrl,"/users/me"),{method:"GET",headers:d.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(d.baseUrl,"/cards"),{method:"GET",headers:d.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(o){var c,a,u=(a=2,function(e){if(Array.isArray(e))return e}(c=o)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(c,a)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(c,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=u[0],s=u[1];h.textContent=i.name,S.textContent=i.about,b.style.backgroundImage="url(".concat(i.avatar,")"),s.forEach((function(o){var c=e(o,t,f,r,n,M,_,m,i._id,o._id);v.append(c)}))})).catch((function(e){console.log(e)}));var q,k={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};q=k,Array.from(document.querySelectorAll(q.formSelector)).forEach((function(e){!function(e,t,n,r,o,c){var a=Array.from(e.querySelectorAll(t)),u=e.querySelector(n);a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n),c.textContent=o,c.classList.add(r)}(e,t,n,r,t.validationMessage)}(e,t,o,c),l(a,u,r)}))}))}(e,q.inputSelector,q.submitButtonSelector,q.inactiveButtonClass,q.inputErrorClass,q.errorClass)}));var E=document.querySelector(".popup_type_avatar");b.addEventListener("click",(function(){return o(E)})),u(E),E.addEventListener("click",a);var L=document.querySelector(".popup_type_avatar .popup__form"),g=L.querySelector(".popup__input_type_avatar"),C=L.querySelector(".popup__button");L.addEventListener("submit",(function(e){var t;e.preventDefault(),N(!0,C),(t=g.value,fetch("".concat(d.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:d.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){b.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){console.log(e)})).finally((function(){return N(!1,C)})),c(E)}));var j=document.querySelector(".popup_type_edit");document.querySelector(".profile__edit-button").addEventListener("click",(function(){p(x,k),o(j),function(e){var t=e.querySelector(".popup__input_type_name"),n=e.querySelector(".popup__input_type_description");t.value=h.textContent,n.value=S.textContent}(j)})),u(j),j.addEventListener("click",a);var x=document.querySelector(".popup_type_edit .popup__form"),A=x.querySelector(".popup__input_type_name"),P=x.querySelector(".popup__input_type_description"),U=x.querySelector(".popup__button");x.addEventListener("submit",(function(e){var t,n;e.preventDefault(),N(!0,U),(t=A.value,n=P.value,fetch("".concat(d.baseUrl,"/users/me"),{method:"PATCH",headers:d.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){h.textContent=e.name,S.textContent=e.about})).catch((function(e){console.log(e)})).finally((function(){return N(!1,U)})),c(j)}));var w=document.querySelector(".popup_type_new-card");document.querySelector(".profile__add-button").addEventListener("click",(function(){return o(w)})),u(w),w.addEventListener("click",a);var T=document.querySelector(".popup_type_new-card .popup__form"),O=T.querySelector(".popup__input_type_card-name"),B=T.querySelector(".popup__input_type_url"),D=T.querySelector(".popup__button");T.addEventListener("submit",(function(o){var a,u;o.preventDefault(),N(!0,D),(a=O.value,u=B.value,fetch("".concat(d.baseUrl,"/cards"),{method:"POST",headers:d.headers,body:JSON.stringify({name:a,link:u})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(o){v.prepend(e(o,t,f,r,n,M,_,m,o.owner._id,o._id))})).catch((function(e){console.log(e)})).finally((function(){return N(!1,D)})),T.reset(),p(T,k),c(w)}));var I=document.querySelector(".popup_type_image");function M(e,t){o(I);var n=I.querySelector(".popup__image"),r=I.querySelector(".popup__caption");n.src=e,n.alt=t,r.textContent=t}function N(e,t){t.textContent=e?"Сохранение...":"Сохранить"}u(I),I.addEventListener("click",a)})();