!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Sweetalert2 = t()
}(this, function() {
    "use strict";
    function e() {
        if (void 0 === arguments[0])
            return console.error("sweetAlert2 expects at least 1 attribute!"),
            !1;
        var e = c({}, N);
        switch (typeof arguments[0]) {
        case "string":
            e.title = arguments[0],
            e.text = arguments[1] || "",
            e.type = arguments[2] || "";
            break;
        case "object":
            c(e, arguments[0]),
            e.extraParams = arguments[0].extraParams,
            "email" === e.input && null === e.inputValidator && (e.inputValidator = function(e) {
                return new Promise(function(t, n) {
                    var o = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                    o.test(e) ? t() : n("Invalid email address")
                }
                )
            }
            );
            break;
        default:
            return console.error('Unexpected type of argument! Expected "string" or "object", got ' + typeof arguments[0]),
            !1
        }
        O(e),
        H(),
        V(e.animation);
        var o = f();
        return new Promise(function(r) {
            function a(e, t) {
                for (var n = 0; n < M.length; n++)
                    if (e += t,
                    e === M.length ? e = 0 : -1 === e && (e = M.length - 1),
                    M[e].offsetWidth || M[e].offsetHeight || M[e].getClientRects().length)
                        return void M[e].focus()
            }
            function l(n) {
                var o = n || window.event
                  , i = o.keyCode || o.which;
                if (-1 !== [9, 13, 32, 27].indexOf(i)) {
                    for (var l = o.target || o.srcElement, c = -1, s = 0; s < M.length; s++)
                        if (l === M[s]) {
                            c = s;
                            break
                        }
                    9 === i ? (o.shiftKey ? a(c, -1) : a(c, 1),
                    T(o)) : 13 === i || 32 === i ? -1 === c && fireClick(q, o) : 27 === i && e.allowEscapeKey === !0 && (t.closeModal(),
                    r(void 0))
                }
            }
            e.timer && (o.timeout = setTimeout(function() {
                t.closeModal(),
                r(void 0)
            }, e.timer));
            var c = function() {
                switch (e.input) {
                case "select":
                    return C(o, i.select);
                case "radio":
                    return o.querySelector("." + i.radio + " input:checked") || o.querySelector("." + i.radio + " input:first-child");
                case "checkbox":
                    return o.querySelector("#" + i.checkbox);
                case "textarea":
                    return C(o, i.textarea);
                default:
                    return C(o, i.input)
                }
            }
              , u = function() {
                var t = c();
                switch (e.input) {
                case "checkbox":
                    return t.checked ? 1 : 0;
                case "radio":
                    return t.checked ? t.value : null ;
                case "file":
                    return t.files.length ? t.files[0] : null ;
                default:
                    return e.inputAutoTrim ? t.value.trim() : t.value
                }
            }
            ;
            e.input && setTimeout(function() {
                var e = c();
                e && g(e)
            }, 0);
            var p, f = function(n) {
                e.showLoaderOnConfirm && t.showLoading(),
                e.preConfirm ? e.preConfirm(n, e.extraParams).then(function(e) {
                    r(e || n),
                    t.closeModal()
                }, function() {
                    t.hideLoading()
                }) : (r(n),
                t.closeModal())
            }
            , B = function(n) {
                var a = n || window.event
                  , l = a.target || a.srcElement
                  , c = h(l, i.confirm)
                  , d = h(l, i.cancel)
                  , p = h(o, "visible");
                switch (a.type) {
                case "mouseover":
                case "mouseup":
                case "focus":
                    e.buttonsStyling && (c ? l.style.backgroundColor = s(e.confirmButtonColor, -.1) : d && (l.style.backgroundColor = s(e.cancelButtonColor, -.1)));
                    break;
                case "mouseout":
                case "blur":
                    e.buttonsStyling && (c ? l.style.backgroundColor = e.confirmButtonColor : d && (l.style.backgroundColor = e.cancelButtonColor));
                    break;
                case "mousedown":
                    e.buttonsStyling && (c ? l.style.backgroundColor = s(e.confirmButtonColor, -.2) : d && (l.style.backgroundColor = s(e.cancelButtonColor, -.2)));
                    break;
                case "click":
                    if (c && p)
                        if (e.input) {
                            var m = u();
                            e.inputValidator ? (t.disableInput(),
                            e.inputValidator(m, e.extraParams).then(function() {
                                t.enableInput(),
                                f(m)
                            }, function(e) {
                                t.enableInput(),
                                t.showValidationError(e)
                            })) : f(m)
                        } else
                            f(!0);
                    else
                        d && p && (t.closeModal(),
                        r(!1))
                }
            }
            , L = o.querySelectorAll("button");
            for (p = 0; p < L.length; p++)
                L[p].onclick = B,
                L[p].onmouseover = B,
                L[p].onmouseout = B,
                L[p].onmousedown = B;
            d.previousDocumentClick = document.onclick,
            document.onclick = function(n) {
                var o = n || window.event
                  , a = o.target || o.srcElement;
                (h(a, i.close) || a === m() && e.allowOutsideClick) && (t.closeModal(),
                r(void 0))
            }
            ;
            var q = y()
              , A = v()
              , M = [q, A].concat(Array.prototype.slice.call(o.querySelectorAll("button:not([class^=" + n + "]), input:not([type=hidden]), textarea, select")));
            for (p = 0; p < M.length; p++)
                M[p].onfocus = B,
                M[p].onblur = B;
            e.reverseButtons && q.parentNode.insertBefore(A, q),
            a(-1, 1),
            d.previousWindowKeyDown = window.onkeydown,
            window.onkeydown = l,
            e.buttonsStyling && (q.style.borderLeftColor = e.confirmButtonColor,
            q.style.borderRightColor = e.confirmButtonColor),
            t.showLoading = t.enableLoading = function() {
                b(q, "loading"),
                b(o, "loading"),
                A.disabled = !0
            }
            ,
            t.hideLoading = t.disableLoading = function() {
                w(q, "loading"),
                w(o, "loading"),
                A.disabled = !1
            }
            ,
            t.enableButtons = function() {
                q.disabled = !1,
                A.disabled = !1
            }
            ,
            t.disableButtons = function() {
                q.disabled = !0,
                A.disabled = !0
            }
            ,
            t.enableInput = function() {
                var e = c();
                if ("radio" === e.type)
                    for (var t = e.parentNode.parentNode, n = t.querySelectorAll("input"), o = 0; o < n.length; o++)
                        n[o].disabled = !1;
                else
                    e.disabled = !1
            }
            ,
            t.disableInput = function() {
                var e = c();
                if ("radio" === e.type)
                    for (var t = e.parentNode.parentNode, n = t.querySelectorAll("input"), o = 0; o < n.length; o++)
                        n[o].disabled = !0;
                else
                    e.disabled = !0
            }
            ,
            t.showValidationError = function(e) {
                var t = o.querySelector("." + i.validationerror);
                t.innerHTML = e,
                x(t);
                var n = c();
                g(n),
                b(n, "error")
            }
            ,
            t.resetValidationError = function() {
                var e = o.querySelector("." + i.validationerror);
                S(e);
                var t = c();
                t && w(t, "error")
            }
            ,
            t.enableButtons(),
            t.hideLoading(),
            t.resetValidationError();
            var P, N = ["input", "select", "radio", "checkbox", "textarea"];
            for (p = 0; p < N.length; p++) {
                var O = i[N[p]];
                for (P = C(o, O); P.attributes.length > 0; )
                    P.removeAttribute(P.attributes[0].name);
                for (var V in e.inputAttributes)
                    P.setAttribute(V, e.inputAttributes[V]);
                P.className = O,
                e.inputClass && b(P, e.inputClass),
                E(P)
            }
            var H;
            switch (e.input) {
            case "text":
            case "email":
            case "password":
            case "file":
                P = C(o, i.input),
                P.value = e.inputValue,
                P.placeholder = e.inputPlaceholder,
                P.type = e.input,
                k(P);
                break;
            case "select":
                var D = C(o, i.select);
                if (D.innerHTML = "",
                e.inputPlaceholder) {
                    var I = document.createElement("option");
                    I.innerHTML = e.inputPlaceholder,
                    I.value = "",
                    I.disabled = !0,
                    I.selected = !0,
                    D.appendChild(I)
                }
                H = function(t) {
                    for (var n in t) {
                        var o = document.createElement("option");
                        o.value = n,
                        o.innerHTML = t[n],
                        e.inputValue === n && (o.selected = !0),
                        D.appendChild(o)
                    }
                    k(D),
                    D.focus()
                }
                ;
                break;
            case "radio":
                var j = C(o, i.radio);
                j.innerHTML = "",
                H = function(t) {
                    for (var n in t) {
                        var o = 1
                          , r = document.createElement("input")
                          , a = document.createElement("label")
                          , l = document.createElement("span");
                        r.type = "radio",
                        r.name = i.radio,
                        r.value = n,
                        r.id = i.radio + "-" + o++,
                        e.inputValue === n && (r.checked = !0),
                        l.innerHTML = t[n],
                        a.appendChild(r),
                        a.appendChild(l),
                        a["for"] = r.id,
                        j.appendChild(a)
                    }
                    k(j);
                    var c = j.querySelectorAll("input");
                    c.length && c[0].focus()
                }
                ;
                break;
            case "checkbox":
                var K = C(o, i.checkbox)
                  , W = o.querySelector("#" + i.checkbox);
                W.value = 1,
                W.checked = Boolean(e.inputValue);
                var U = K.getElementsByTagName("span");
                U.length && K.removeChild(U[0]),
                U = document.createElement("span"),
                U.innerHTML = e.inputPlaceholder,
                K.appendChild(U),
                k(K);
                break;
            case "textarea":
                var z = C(o, i.textarea);
                z.value = e.inputValue,
                z.placeholder = e.inputPlaceholder,
                k(z);
                break;
            case null :
                break;
            default:
                console.error('Unexpected type of input! Expected "text" or "email" or "password", "select", "checkbox", "textarea" or "file", got ' + typeof arguments[0])
            }
            "select" !== e.input && "radio" !== e.input || (e.inputOptions instanceof Promise ? (t.showLoading(),
            e.inputOptions.then(function(e) {
                t.hideLoading(),
                H(e)
            })) : "object" == typeof e.inputOptions ? H(e.inputOptions) : console.error("Unexpected type of inputOptions! Expected object or Promise, got " + e.inputOptions))
        }
        )
    }
    function t() {
        var n = arguments
          , o = f();
        return null === o && (t.init(),
        o = f()),
        h(o, "visible") && P(),
        e.apply(this, n)
    }
    var n = "swal2-"
      , o = function(e) {
        var t = {};
        for (var o in e)
            t[e[o]] = n + e[o];
        return t
    }
      , i = o(["container", "modal", "overlay", "close", "content", "spacer", "confirm", "cancel", "icon", "image", "input", "select", "radio", "checkbox", "textarea", "validationerror"])
      , r = o(["success", "warning", "info", "question", "error"])
      , a = {
        title: "",
        text: "",
        html: "",
        type: null ,
        animation: !0,
        allowOutsideClick: !0,
        allowEscapeKey: !0,
        showConfirmButton: !0,
        showCancelButton: !1,
        preConfirm: null ,
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
        confirmButtonClass: null ,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#aaa",
        cancelButtonClass: null ,
        buttonsStyling: !0,
        reverseButtons: !1,
        showCloseButton: !1,
        showLoaderOnConfirm: !1,
        imageUrl: null ,
        imageWidth: null ,
        imageHeight: null ,
        imageClass: null ,
        timer: null ,
        width: 500,
        padding: 20,
        background: "#fff",
        input: null ,
        inputPlaceholder: "",
        inputValue: "",
        inputOptions: {},
        inputAutoTrim: !0,
        inputClass: null ,
        inputAttributes: {},
        inputValidator: null
    }
      , l = '<div class="' + i.overlay + '" tabIndex="-1"></div><div class="' + i.modal + '" style="display: none" tabIndex="-1"><div class="' + i.icon + " " + r.error + '"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="' + i.icon + " " + r.question + '">?</div><div class="' + i.icon + " " + r.warning + '">!</div><div class="' + i.icon + " " + r.info + '">i</div><div class="' + i.icon + " " + r.success + '"><span class="line tip"></span> <span class="line long"></span><div class="placeholder"></div> <div class="fix"></div></div><img class="' + i.image + '"><h2></h2><div class="' + i.content + '"></div><input class="' + i.input + '"><select class="' + i.select + '"></select><div class="' + i.radio + '"></div><label for="' + i.checkbox + '" class="' + i.checkbox + '"><input type="checkbox" id="' + i.checkbox + '"></label><textarea class="' + i.textarea + '"></textarea><div class="' + i.validationerror + '"></div><hr class="' + i.spacer + '"><button class="' + i.confirm + '">OK</button><button class="' + i.cancel + '">Cancel</button><span class="' + i.close + '">&times;</span></div>'
      , c = function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }
      , s = function(e, t) {
        e = String(e).replace(/[^0-9a-f]/gi, ""),
        e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
        t = t || 0;
        for (var n = "#", o = 0; 3 > o; o++) {
            var i = parseInt(e.substr(2 * o, 2), 16);
            i = Math.round(Math.min(Math.max(0, i + i * t), 255)).toString(16),
            n += ("00" + i).substr(i.length)
        }
        return n
    }
      , u = n + "mediaquery"
      , d = {
        previousDocumentClick: null ,
        previousWindowKeyDown: null ,
        previousActiveElement: null
    }
      , p = function(e) {
        return document.querySelector("." + e)
    }
      , f = function() {
        return p(i.modal)
    }
      , m = function() {
        return p(i.overlay)
    }
      , y = function() {
        return p(i.confirm)
    }
      , v = function() {
        return p(i.cancel)
    }
      , h = function(e, t) {
        return new RegExp(" " + t + " ").test(" " + e.className + " ")
    }
      , g = function(e) {
        e.focus();
        var t = e.value;
        e.value = "",
        e.value = t
    }
      , b = function(e, t) {
        t && !h(e, t) && (e.className += " " + t)
    }
      , w = function(e, t) {
        var n = " " + e.className.replace(/[\t\r\n]/g, " ") + " ";
        if (h(e, t)) {
            for (; n.indexOf(" " + t + " ") >= 0; )
                n = n.replace(" " + t + " ", " ");
            e.className = n.replace(/^\s+|\s+$/g, "")
        }
    }
      , C = function(e, t) {
        for (var n = 0; n < e.childNodes.length; n++)
            if (e.childNodes[n].classList.contains(t))
                return e.childNodes[n]
    }
      , k = function(e) {
        e.style.opacity = "",
        e.style.display = "block"
    }
      , x = function(e) {
        if (e && !e.length)
            return k(e);
        for (var t = 0; t < e.length; ++t)
            k(e[t])
    }
      , E = function(e) {
        e.style.opacity = "",
        e.style.display = "none"
    }
      , S = function(e) {
        if (e && !e.length)
            return E(e);
        for (var t = 0; t < e.length; ++t)
            E(e[t])
    }
      , B = function(e, t) {
        e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(t)
    }
      , L = function(e) {
        e.style.left = "-9999px",
        e.style.display = "block";
        var t = e.clientHeight
          , n = parseInt(getComputedStyle(e).getPropertyValue("padding-top"), 10);
        return e.style.left = "",
        e.style.display = "none",
        "-" + parseInt(t / 2 + n, 10) + "px"
    }
      , q = function(e, t) {
        if (+e.style.opacity < 1) {
            t = t || 16,
            e.style.opacity = 0,
            e.style.display = "block";
            var n = +new Date
              , o = function() {
                var i = +e.style.opacity + (new Date - n) / 100;
                e.style.opacity = i > 1 ? 1 : i,
                n = +new Date,
                +e.style.opacity < 1 && setTimeout(o, t)
            }
            ;
            o()
        }
    }
      , A = function(e, t) {
        if (+e.style.opacity > 0) {
            t = t || 16;
            var n = e.style.opacity
              , o = +new Date
              , i = function() {
                var r = new Date - o
                  , a = +e.style.opacity - r / (100 * n);
                e.style.opacity = a,
                o = +new Date,
                +e.style.opacity > 0 ? setTimeout(i, t) : E(e)
            }
            ;
            i()
        }
    }
      , T = function(e) {
        "function" == typeof e.stopPropagation ? (e.stopPropagation(),
        e.preventDefault()) : window.event && window.event.hasOwnProperty("cancelBubble") && (window.event.cancelBubble = !0)
    }
      , M = function() {
        var e = document.createElement("div")
          , t = {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd oanimationend",
            msAnimation: "MSAnimationEnd",
            animation: "animationend"
        };
        for (var n in t)
            if (t.hasOwnProperty(n) && void 0 !== e.style[n])
                return t[n];
        return !1
    }()
      , P = function() {
        var e = f();
        window.onkeydown = d.previousWindowKeyDown,
        document.onclick = d.previousDocumentClick,
        d.previousActiveElement && d.previousActiveElement.focus(),
        clearTimeout(e.timeout);
        var t = document.getElementsByTagName("head")[0]
          , n = document.getElementById(u);
        n && t.removeChild(n)
    }
      , N = c({}, a)
      , O = function(e) {
        var t, n = f();
        n.style.width = e.width + "px",
        n.style.padding = e.padding + "px",
        n.style.marginLeft = -e.width / 2 + "px",
        n.style.background = e.background;
        var o = document.getElementsByTagName("head")[0]
          , a = document.createElement("style");
        a.type = "text/css",
        a.id = u;
        var l = 5
          , c = e.width + parseInt(e.width * (l / 100) * 2, 10);
        a.innerHTML = "@media screen and (max-width: " + c + "px) {." + i.modal + " {width: auto !important;left: " + l + "% !important;right: " + l + "% !important;margin-left: 0 !important;}}",
        o.appendChild(a);
        var s = n.querySelector("h2")
          , d = n.querySelector("." + i.content)
          , p = y()
          , m = v()
          , h = n.querySelector("." + i.spacer)
          , g = n.querySelector("." + i.close);
        if (s.innerHTML = e.title.split("\n").join("<br>"),
        e.text || e.html) {
            if ("object" == typeof e.html)
                if (d.innerHTML = "",
                0 in e.html)
                    for (t = 0; t in e.html; t++)
                        d.appendChild(e.html[t]);
                else
                    d.appendChild(e.html);
            else
                d.innerHTML = e.html || e.text.split("\n").join("<br>");
            x(d)
        } else
            S(d);
        if (e.showCloseButton ? x(g) : S(g),
        n.className = i.modal,
        e.customClass && b(n, e.customClass),
        S(n.querySelectorAll("." + i.icon)),
        e.type) {
            var C = !1;
            for (var k in r)
                if (e.type === k) {
                    C = !0;
                    break
                }
            if (!C)
                return console.error("Unknown alert type: " + e.type),
                !1;
            var E = n.querySelector("." + i.icon + "." + r[e.type]);
            switch (x(E),
            e.type) {
            case "success":
                b(E, "animate"),
                b(E.querySelector(".tip"), "animate-success-tip"),
                b(E.querySelector(".long"), "animate-success-long");
                break;
            case "error":
                b(E, "animate-error-icon"),
                b(E.querySelector(".x-mark"), "animate-x-mark");
                break;
            case "warning":
                b(E, "pulse-warning")
            }
        }
        var L = n.querySelector("." + i.image);
        e.imageUrl ? (L.setAttribute("src", e.imageUrl),
        x(L),
        e.imageWidth && L.setAttribute("width", e.imageWidth),
        e.imageHeight && L.setAttribute("height", e.imageHeight),
        e.imageClass && b(L, e.imageClass)) : S(L),
        e.showCancelButton ? m.style.display = "inline-block" : S(m),
        e.showConfirmButton ? B(p, "display") : S(p),
        e.showConfirmButton || e.showCancelButton ? x(h) : S(h),
        p.innerHTML = e.confirmButtonText,
        m.innerHTML = e.cancelButtonText,
        e.buttonsStyling && (p.style.backgroundColor = e.confirmButtonColor,
        m.style.backgroundColor = e.cancelButtonColor),
        p.className = i.confirm,
        b(p, e.confirmButtonClass),
        m.className = i.cancel,
        b(m, e.cancelButtonClass),
        e.buttonsStyling ? (b(p, "styled"),
        b(m, "styled")) : (w(p, "styled"),
        w(m, "styled"),
        p.style.backgroundColor = p.style.borderLeftColor = p.style.borderRightColor = "",
        m.style.backgroundColor = m.style.borderLeftColor = m.style.borderRightColor = ""),
        e.animation === !0 ? w(n, "no-animation") : b(n, "no-animation")
    }
      , V = function(e) {
        var t = f();
        e ? (q(m(), 10),
        b(t, "show-swal2"),
        w(t, "hide-swal2")) : x(m()),
        x(t),
        d.previousActiveElement = document.activeElement,
        b(t, "visible")
    }
      , H = function() {
        var e = f();
        e.style.marginTop = L(e)
    }
    ;
    return t.queue = function(e) {
        return new Promise(function(n, o) {
            !function i(r, a) {
                r < e.length ? t(e[r]).then(function(e) {
                    e ? i(r + 1, a) : o()
                }) : n()
            }(0)
        }
        )
    }
    ,
    t.close = t.closeModal = function() {
        var e = f();
        w(e, "show-swal2"),
        b(e, "hide-swal2"),
        w(e, "visible");
        var t = e.querySelector("." + i.icon + "." + r.success);
        w(t, "animate"),
        w(t.querySelector(".tip"), "animate-success-tip"),
        w(t.querySelector(".long"), "animate-success-long");
        var n = e.querySelector("." + i.icon + "." + r.error);
        w(n, "animate-error-icon"),
        w(n.querySelector(".x-mark"), "animate-x-mark");
        var o = e.querySelector("." + i.icon + "." + r.warning);
        w(o, "pulse-warning"),
        P(),
        M && !h(e, "no-animation") ? e.addEventListener(M, function a() {
            e.removeEventListener(M, a),
            h(e, "hide-swal2") && (E(e),
            A(m(), 0))
        }) : (E(e),
        E(m()))
    }
    ,
    t.clickConfirm = function() {
        y().click()
    }
    ,
    t.clickCancel = function() {
        v().click()
    }
    ,
    t.init = function() {
        if ("undefined" == typeof document)
            return void console.log("SweetAlert2 requires document to initialize");
        if (!document.getElementsByClassName(i.container).length) {
            var e = document.createElement("div");
            e.className = i.container,
            e.innerHTML = l,
            document.body.appendChild(e);
            var n = f()
              , o = C(n, i.input)
              , r = C(n, i.select)
              , a = n.querySelector("#" + i.checkbox)
              , c = C(n, i.textarea);
            o.oninput = function() {
                t.resetValidationError()
            }
            ,
            o.onkeyup = function(e) {
                e.stopPropagation(),
                13 === e.keyCode && t.clickConfirm()
            }
            ,
            r.onchange = function() {
                t.resetValidationError()
            }
            ,
            a.onchange = function() {
                t.resetValidationError()
            }
            ,
            c.onchange = function() {
                t.resetValidationError()
            }
        }
    }
    ,
    t.setDefaults = function(e) {
        if (!e)
            throw new Error("userParams is required");
        if ("object" != typeof e)
            throw new Error("userParams has to be a object");
        c(N, e)
    }
    ,
    t.resetDefaults = function() {
        N = c({}, a)
    }
    ,
    t.version = "3.3.8",
    window.sweetAlert = window.swal = t,
    function() {
        "complete" === document.readyState || "interactive" === document.readyState && document.body ? t.init() : document.addEventListener("DOMContentLoaded", function e() {
            document.removeEventListener("DOMContentLoaded", e, !1),
            t.init()
        }, !1)
    }(),
    t
});
