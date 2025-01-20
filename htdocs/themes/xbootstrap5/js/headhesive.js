/*!
 * headhesive v1.1.1 - An on-demand sticky header
 * Url: http://markgoodyear.com/labs/headhesive
 * Copyright (c) Mark Goodyear — @markgdyr — http://markgoodyear.com
 * License: MIT
 */
!function (t, s, e) {
    "use strict";
    function i(t) {
        for (var s = 0; t;)s += t.offsetTop, t = t.offsetParent;
        return s
    }

    var o = function (t, s) {
        for (var e in s)s.hasOwnProperty(e) && (t[e] = "object" == typeof s[e] ? o(t[e], s[e]) : s[e]);
        return t
    }, n = function (t, s) {
        var e, i, o, n = Date.now || function () {
                return (new Date).getTime()
            }, l = null, c = 0, h = function () {
            c = n(), l = null, o = t.apply(e, i), e = i = null
        };
        return function () {
            var r = n(), f = s - (r - c);
            return e = this, i = arguments, 0 >= f ? (clearTimeout(l), l = null, c = r, o = t.apply(e, i), e = i = null) : l || (l = setTimeout(h, f)), o
        }
    }, l = function () {
        return t.pageYOffset !== e ? t.pageYOffset : (s.documentElement || s.body.parentNode || s.body).scrollTop
    }, c = function (e, i) {
        "querySelector" in s && "addEventListener" in t && (this.visible = !1, this.options = {
            offset: 300, classes: {clone: "headhesive", stick: "headhesive--stick", unstick: "headhesive--unstick"}, throttle: 250, onInit: function () {
            }, onStick: function () {
            }, onUnstick: function () {
            }, onDestroy: function () {
            }
        }, this.elem = "string" == typeof e ? s.querySelector(e) : e, this.options = o(this.options, i), this.init())
    };
    c.prototype = {
        constructor: c, init: function () {
            if (this.clonedElem = this.elem.cloneNode(!0), this.clonedElem.className += " " + this.options.classes.clone, s.body.insertBefore(this.clonedElem, s.body.firstChild), "number" == typeof this.options.offset) this.scrollOffset = this.options.offset; else {
                if ("string" != typeof this.options.offset)throw new Error("Invalid offset: " + this.options.offset);
                this.scrollOffset = i(s.querySelector(this.options.offset))
            }
            this._throttleUpdate = n(this.update.bind(this), this.options.throttle), t.addEventListener("scroll", this._throttleUpdate, !1), this.options.onInit.call(this)
        }, destroy: function () {
            s.body.removeChild(this.clonedElem), t.removeEventListener("scroll", this._throttleUpdate), this.options.onDestroy.call(this)
        }, stick: function () {
            this.visible || (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.stick, this.visible = !0, this.options.onStick.call(this))
        }, unstick: function () {
            this.visible && (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.unstick, this.visible = !1, this.options.onUnstick.call(this))
        }, update: function () {
            l() > this.scrollOffset ? this.stick() : this.unstick()
        }
    }, t.Headhesive = c
}(window, document);
