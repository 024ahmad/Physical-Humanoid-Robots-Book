import Pt, { useState as P, useEffect as Le } from "react";
var pe = { exports: {} }, re = {};
var qe;
function vt() {
  if (qe) return re;
  qe = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function n(r, s, i) {
    var o = null;
    if (i !== void 0 && (o = "" + i), s.key !== void 0 && (o = "" + s.key), "key" in s) {
      i = {};
      for (var c in s)
        c !== "key" && (i[c] = s[c]);
    } else i = s;
    return s = i.ref, {
      $$typeof: e,
      type: r,
      key: o,
      ref: s !== void 0 ? s : null,
      props: i
    };
  }
  return re.Fragment = t, re.jsx = n, re.jsxs = n, re;
}
var se = {};
var $e;
function Ft() {
  return $e || ($e = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(u) {
      if (u == null) return null;
      if (typeof u == "function")
        return u.$$typeof === fe ? null : u.displayName || u.name || null;
      if (typeof u == "string") return u;
      switch (u) {
        case m:
          return "Fragment";
        case k:
          return "Profiler";
        case S:
          return "StrictMode";
        case M:
          return "Suspense";
        case j:
          return "SuspenseList";
        case de:
          return "Activity";
      }
      if (typeof u == "object")
        switch (typeof u.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), u.$$typeof) {
          case b:
            return "Portal";
          case C:
            return u.displayName || "Context";
          case A:
            return (u._context.displayName || "Context") + ".Consumer";
          case L:
            var w = u.render;
            return u = u.displayName, u || (u = w.displayName || w.name || "", u = u !== "" ? "ForwardRef(" + u + ")" : "ForwardRef"), u;
          case ee:
            return w = u.displayName || null, w !== null ? w : e(u.type) || "Memo";
          case $:
            w = u._payload, u = u._init;
            try {
              return e(u(w));
            } catch {
            }
        }
      return null;
    }
    function t(u) {
      return "" + u;
    }
    function n(u) {
      try {
        t(u);
        var w = !1;
      } catch {
        w = !0;
      }
      if (w) {
        w = console;
        var R = w.error, T = typeof Symbol == "function" && Symbol.toStringTag && u[Symbol.toStringTag] || u.constructor.name || "Object";
        return R.call(
          w,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          T
        ), t(u);
      }
    }
    function r(u) {
      if (u === m) return "<>";
      if (typeof u == "object" && u !== null && u.$$typeof === $)
        return "<...>";
      try {
        var w = e(u);
        return w ? "<" + w + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function s() {
      var u = H.A;
      return u === null ? null : u.getOwner();
    }
    function i() {
      return Error("react-stack-top-frame");
    }
    function o(u) {
      if (z.call(u, "key")) {
        var w = Object.getOwnPropertyDescriptor(u, "key").get;
        if (w && w.isReactWarning) return !1;
      }
      return u.key !== void 0;
    }
    function c(u, w) {
      function R() {
        U || (U = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          w
        ));
      }
      R.isReactWarning = !0, Object.defineProperty(u, "key", {
        get: R,
        configurable: !0
      });
    }
    function h() {
      var u = e(this.type);
      return te[u] || (te[u] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), u = this.props.ref, u !== void 0 ? u : null;
    }
    function f(u, w, R, T, V, Oe) {
      var _ = R.ref;
      return u = {
        $$typeof: d,
        type: u,
        key: w,
        props: R,
        _owner: T
      }, (_ !== void 0 ? _ : null) !== null ? Object.defineProperty(u, "ref", {
        enumerable: !1,
        get: h
      }) : Object.defineProperty(u, "ref", { enumerable: !1, value: null }), u._store = {}, Object.defineProperty(u._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(u, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(u, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: V
      }), Object.defineProperty(u, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Oe
      }), Object.freeze && (Object.freeze(u.props), Object.freeze(u)), u;
    }
    function l(u, w, R, T, V, Oe) {
      var _ = w.children;
      if (_ !== void 0)
        if (T)
          if (q(_)) {
            for (T = 0; T < _.length; T++)
              p(_[T]);
            Object.freeze && Object.freeze(_);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else p(_);
      if (z.call(w, "key")) {
        _ = e(u);
        var X = Object.keys(w).filter(function(jt) {
          return jt !== "key";
        });
        T = 0 < X.length ? "{key: someKey, " + X.join(": ..., ") + ": ...}" : "{key: someKey}", he[_ + T] || (X = 0 < X.length ? "{" + X.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          T,
          _,
          X,
          _
        ), he[_ + T] = !0);
      }
      if (_ = null, R !== void 0 && (n(R), _ = "" + R), o(w) && (n(w.key), _ = "" + w.key), "key" in w) {
        R = {};
        for (var Ae in w)
          Ae !== "key" && (R[Ae] = w[Ae]);
      } else R = w;
      return _ && c(
        R,
        typeof u == "function" ? u.displayName || u.name || "Unknown" : u
      ), f(
        u,
        _,
        R,
        s(),
        V,
        Oe
      );
    }
    function p(u) {
      g(u) ? u._store && (u._store.validated = 1) : typeof u == "object" && u !== null && u.$$typeof === $ && (u._payload.status === "fulfilled" ? g(u._payload.value) && u._payload.value._store && (u._payload.value._store.validated = 1) : u._store && (u._store.validated = 1));
    }
    function g(u) {
      return typeof u == "object" && u !== null && u.$$typeof === d;
    }
    var x = Pt, d = /* @__PURE__ */ Symbol.for("react.transitional.element"), b = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.fragment"), S = /* @__PURE__ */ Symbol.for("react.strict_mode"), k = /* @__PURE__ */ Symbol.for("react.profiler"), A = /* @__PURE__ */ Symbol.for("react.consumer"), C = /* @__PURE__ */ Symbol.for("react.context"), L = /* @__PURE__ */ Symbol.for("react.forward_ref"), M = /* @__PURE__ */ Symbol.for("react.suspense"), j = /* @__PURE__ */ Symbol.for("react.suspense_list"), ee = /* @__PURE__ */ Symbol.for("react.memo"), $ = /* @__PURE__ */ Symbol.for("react.lazy"), de = /* @__PURE__ */ Symbol.for("react.activity"), fe = /* @__PURE__ */ Symbol.for("react.client.reference"), H = x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = Object.prototype.hasOwnProperty, q = Array.isArray, Y = console.createTask ? console.createTask : function() {
      return null;
    };
    x = {
      react_stack_bottom_frame: function(u) {
        return u();
      }
    };
    var U, te = {}, D = x.react_stack_bottom_frame.bind(
      x,
      i
    )(), ne = Y(r(i)), he = {};
    se.Fragment = m, se.jsx = function(u, w, R) {
      var T = 1e4 > H.recentlyCreatedOwnerStacks++;
      return l(
        u,
        w,
        R,
        !1,
        T ? Error("react-stack-top-frame") : D,
        T ? Y(r(u)) : ne
      );
    }, se.jsxs = function(u, w, R) {
      var T = 1e4 > H.recentlyCreatedOwnerStacks++;
      return l(
        u,
        w,
        R,
        !0,
        T ? Error("react-stack-top-frame") : D,
        T ? Y(r(u)) : ne
      );
    };
  })()), se;
}
var He;
function Lt() {
  return He || (He = 1, process.env.NODE_ENV === "production" ? pe.exports = vt() : pe.exports = Ft()), pe.exports;
}
var y = Lt();
function it(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ut } = Object.prototype, { getPrototypeOf: Ue } = Object, { iterator: Ee, toStringTag: at } = Symbol, xe = /* @__PURE__ */ ((e) => (t) => {
  const n = Ut.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), I = (e) => (e = e.toLowerCase(), (t) => xe(t) === e), Re = (e) => (t) => typeof t === e, { isArray: Q } = Array, G = Re("undefined");
function ie(e) {
  return e !== null && !G(e) && e.constructor !== null && !G(e.constructor) && v(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const ct = I("ArrayBuffer");
function Dt(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && ct(e.buffer), t;
}
const It = Re("string"), v = Re("function"), lt = Re("number"), ae = (e) => e !== null && typeof e == "object", Bt = (e) => e === !0 || e === !1, be = (e) => {
  if (xe(e) !== "object")
    return !1;
  const t = Ue(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(at in e) && !(Ee in e);
}, Mt = (e) => {
  if (!ae(e) || ie(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, qt = I("Date"), $t = I("File"), Ht = I("Blob"), zt = I("FileList"), Vt = (e) => ae(e) && v(e.pipe), Jt = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || v(e.append) && ((t = xe(e)) === "formdata" || // detect form-data instance
  t === "object" && v(e.toString) && e.toString() === "[object FormData]"));
}, Wt = I("URLSearchParams"), [Kt, Yt, Xt, Gt] = ["ReadableStream", "Request", "Response", "Headers"].map(I), Qt = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ce(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), Q(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    if (ie(e))
      return;
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), o = i.length;
    let c;
    for (r = 0; r < o; r++)
      c = i[r], t.call(null, e[c], c, e);
  }
}
function ut(e, t) {
  if (ie(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const J = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, dt = (e) => !G(e) && e !== J;
function ke() {
  const { caseless: e, skipUndefined: t } = dt(this) && this || {}, n = {}, r = (s, i) => {
    const o = e && ut(n, i) || i;
    be(n[o]) && be(s) ? n[o] = ke(n[o], s) : be(s) ? n[o] = ke({}, s) : Q(s) ? n[o] = s.slice() : (!t || !G(s)) && (n[o] = s);
  };
  for (let s = 0, i = arguments.length; s < i; s++)
    arguments[s] && ce(arguments[s], r);
  return n;
}
const Zt = (e, t, n, { allOwnKeys: r } = {}) => (ce(t, (s, i) => {
  n && v(s) ? e[i] = it(s, n) : e[i] = s;
}, { allOwnKeys: r }), e), en = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), tn = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, nn = (e, t, n, r) => {
  let s, i, o;
  const c = {};
  if (t = t || {}, e == null) return t;
  do {
    for (s = Object.getOwnPropertyNames(e), i = s.length; i-- > 0; )
      o = s[i], (!r || r(o, e, t)) && !c[o] && (t[o] = e[o], c[o] = !0);
    e = n !== !1 && Ue(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, rn = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, sn = (e) => {
  if (!e) return null;
  if (Q(e)) return e;
  let t = e.length;
  if (!lt(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, on = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ue(Uint8Array)), an = (e, t) => {
  const r = (e && e[Ee]).call(e);
  let s;
  for (; (s = r.next()) && !s.done; ) {
    const i = s.value;
    t.call(e, i[0], i[1]);
  }
}, cn = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, ln = I("HTMLFormElement"), un = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, s) {
    return r.toUpperCase() + s;
  }
), ze = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), dn = I("RegExp"), ft = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  ce(n, (s, i) => {
    let o;
    (o = t(s, i, e)) !== !1 && (r[i] = o || s);
  }), Object.defineProperties(e, r);
}, fn = (e) => {
  ft(e, (t, n) => {
    if (v(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (v(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, hn = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((i) => {
      n[i] = !0;
    });
  };
  return Q(e) ? r(e) : r(String(e).split(t)), n;
}, pn = () => {
}, mn = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function bn(e) {
  return !!(e && v(e.append) && e[at] === "FormData" && e[Ee]);
}
const yn = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (ae(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (ie(r))
        return r;
      if (!("toJSON" in r)) {
        t[s] = r;
        const i = Q(r) ? [] : {};
        return ce(r, (o, c) => {
          const h = n(o, s + 1);
          !G(h) && (i[c] = h);
        }), t[s] = void 0, i;
      }
    }
    return r;
  };
  return n(e, 0);
}, gn = I("AsyncFunction"), wn = (e) => e && (ae(e) || v(e)) && v(e.then) && v(e.catch), ht = ((e, t) => e ? setImmediate : t ? ((n, r) => (J.addEventListener("message", ({ source: s, data: i }) => {
  s === J && i === n && r.length && r.shift()();
}, !1), (s) => {
  r.push(s), J.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  v(J.postMessage)
), En = typeof queueMicrotask < "u" ? queueMicrotask.bind(J) : typeof process < "u" && process.nextTick || ht, xn = (e) => e != null && v(e[Ee]), a = {
  isArray: Q,
  isArrayBuffer: ct,
  isBuffer: ie,
  isFormData: Jt,
  isArrayBufferView: Dt,
  isString: It,
  isNumber: lt,
  isBoolean: Bt,
  isObject: ae,
  isPlainObject: be,
  isEmptyObject: Mt,
  isReadableStream: Kt,
  isRequest: Yt,
  isResponse: Xt,
  isHeaders: Gt,
  isUndefined: G,
  isDate: qt,
  isFile: $t,
  isBlob: Ht,
  isRegExp: dn,
  isFunction: v,
  isStream: Vt,
  isURLSearchParams: Wt,
  isTypedArray: on,
  isFileList: zt,
  forEach: ce,
  merge: ke,
  extend: Zt,
  trim: Qt,
  stripBOM: en,
  inherits: tn,
  toFlatObject: nn,
  kindOf: xe,
  kindOfTest: I,
  endsWith: rn,
  toArray: sn,
  forEachEntry: an,
  matchAll: cn,
  isHTMLForm: ln,
  hasOwnProperty: ze,
  hasOwnProp: ze,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ft,
  freezeMethods: fn,
  toObjectSet: hn,
  toCamelCase: un,
  noop: pn,
  toFiniteNumber: mn,
  findKey: ut,
  global: J,
  isContextDefined: dt,
  isSpecCompliantForm: bn,
  toJSONObject: yn,
  isAsyncFn: gn,
  isThenable: wn,
  setImmediate: ht,
  asap: En,
  isIterable: xn
};
function E(e, t, n, r, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s, this.status = s.status ? s.status : null);
}
a.inherits(E, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: a.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const pt = E.prototype, mt = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  mt[e] = { value: e };
});
Object.defineProperties(E, mt);
Object.defineProperty(pt, "isAxiosError", { value: !0 });
E.from = (e, t, n, r, s, i) => {
  const o = Object.create(pt);
  a.toFlatObject(e, o, function(l) {
    return l !== Error.prototype;
  }, (f) => f !== "isAxiosError");
  const c = e && e.message ? e.message : "Error", h = t == null && e ? e.code : t;
  return E.call(o, c, h, n, r, s), e && o.cause == null && Object.defineProperty(o, "cause", { value: e, configurable: !0 }), o.name = e && e.name || "Error", i && Object.assign(o, i), o;
};
const Rn = null;
function je(e) {
  return a.isPlainObject(e) || a.isArray(e);
}
function bt(e) {
  return a.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Ve(e, t, n) {
  return e ? e.concat(t).map(function(s, i) {
    return s = bt(s), !n && i ? "[" + s + "]" : s;
  }).join(n ? "." : "") : t;
}
function Sn(e) {
  return a.isArray(e) && !e.some(je);
}
const Tn = a.toFlatObject(a, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Se(e, t, n) {
  if (!a.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = a.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(b, m) {
    return !a.isUndefined(m[b]);
  });
  const r = n.metaTokens, s = n.visitor || l, i = n.dots, o = n.indexes, h = (n.Blob || typeof Blob < "u" && Blob) && a.isSpecCompliantForm(t);
  if (!a.isFunction(s))
    throw new TypeError("visitor must be a function");
  function f(d) {
    if (d === null) return "";
    if (a.isDate(d))
      return d.toISOString();
    if (a.isBoolean(d))
      return d.toString();
    if (!h && a.isBlob(d))
      throw new E("Blob is not supported. Use a Buffer instead.");
    return a.isArrayBuffer(d) || a.isTypedArray(d) ? h && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function l(d, b, m) {
    let S = d;
    if (d && !m && typeof d == "object") {
      if (a.endsWith(b, "{}"))
        b = r ? b : b.slice(0, -2), d = JSON.stringify(d);
      else if (a.isArray(d) && Sn(d) || (a.isFileList(d) || a.endsWith(b, "[]")) && (S = a.toArray(d)))
        return b = bt(b), S.forEach(function(A, C) {
          !(a.isUndefined(A) || A === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Ve([b], C, i) : o === null ? b : b + "[]",
            f(A)
          );
        }), !1;
    }
    return je(d) ? !0 : (t.append(Ve(m, b, i), f(d)), !1);
  }
  const p = [], g = Object.assign(Tn, {
    defaultVisitor: l,
    convertValue: f,
    isVisitable: je
  });
  function x(d, b) {
    if (!a.isUndefined(d)) {
      if (p.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      p.push(d), a.forEach(d, function(S, k) {
        (!(a.isUndefined(S) || S === null) && s.call(
          t,
          S,
          a.isString(k) ? k.trim() : k,
          b,
          g
        )) === !0 && x(S, b ? b.concat(k) : [k]);
      }), p.pop();
    }
  }
  if (!a.isObject(e))
    throw new TypeError("data must be an object");
  return x(e), t;
}
function Je(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function De(e, t) {
  this._pairs = [], e && Se(e, this, t);
}
const yt = De.prototype;
yt.append = function(t, n) {
  this._pairs.push([t, n]);
};
yt.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Je);
  } : Je;
  return this._pairs.map(function(s) {
    return n(s[0]) + "=" + n(s[1]);
  }, "").join("&");
};
function On(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function gt(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || On;
  a.isFunction(n) && (n = {
    serialize: n
  });
  const s = n && n.serialize;
  let i;
  if (s ? i = s(t, n) : i = a.isURLSearchParams(t) ? t.toString() : new De(t, n).toString(r), i) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class We {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    a.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const wt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, An = typeof URLSearchParams < "u" ? URLSearchParams : De, _n = typeof FormData < "u" ? FormData : null, Cn = typeof Blob < "u" ? Blob : null, Nn = {
  isBrowser: !0,
  classes: {
    URLSearchParams: An,
    FormData: _n,
    Blob: Cn
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Ie = typeof window < "u" && typeof document < "u", Pe = typeof navigator == "object" && navigator || void 0, kn = Ie && (!Pe || ["ReactNative", "NativeScript", "NS"].indexOf(Pe.product) < 0), jn = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Pn = Ie && window.location.href || "http://localhost", vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Ie,
  hasStandardBrowserEnv: kn,
  hasStandardBrowserWebWorkerEnv: jn,
  navigator: Pe,
  origin: Pn
}, Symbol.toStringTag, { value: "Module" })), N = {
  ...vn,
  ...Nn
};
function Fn(e, t) {
  return Se(e, new N.classes.URLSearchParams(), {
    visitor: function(n, r, s, i) {
      return N.isNode && a.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Ln(e) {
  return a.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Un(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let i;
  for (r = 0; r < s; r++)
    i = n[r], t[i] = e[i];
  return t;
}
function Et(e) {
  function t(n, r, s, i) {
    let o = n[i++];
    if (o === "__proto__") return !0;
    const c = Number.isFinite(+o), h = i >= n.length;
    return o = !o && a.isArray(s) ? s.length : o, h ? (a.hasOwnProp(s, o) ? s[o] = [s[o], r] : s[o] = r, !c) : ((!s[o] || !a.isObject(s[o])) && (s[o] = []), t(n, r, s[o], i) && a.isArray(s[o]) && (s[o] = Un(s[o])), !c);
  }
  if (a.isFormData(e) && a.isFunction(e.entries)) {
    const n = {};
    return a.forEachEntry(e, (r, s) => {
      t(Ln(r), s, n, 0);
    }), n;
  }
  return null;
}
function Dn(e, t, n) {
  if (a.isString(e))
    try {
      return (t || JSON.parse)(e), a.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const le = {
  transitional: wt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", s = r.indexOf("application/json") > -1, i = a.isObject(t);
    if (i && a.isHTMLForm(t) && (t = new FormData(t)), a.isFormData(t))
      return s ? JSON.stringify(Et(t)) : t;
    if (a.isArrayBuffer(t) || a.isBuffer(t) || a.isStream(t) || a.isFile(t) || a.isBlob(t) || a.isReadableStream(t))
      return t;
    if (a.isArrayBufferView(t))
      return t.buffer;
    if (a.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let c;
    if (i) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Fn(t, this.formSerializer).toString();
      if ((c = a.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const h = this.env && this.env.FormData;
        return Se(
          c ? { "files[]": t } : t,
          h && new h(),
          this.formSerializer
        );
      }
    }
    return i || s ? (n.setContentType("application/json", !1), Dn(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || le.transitional, r = n && n.forcedJSONParsing, s = this.responseType === "json";
    if (a.isResponse(t) || a.isReadableStream(t))
      return t;
    if (t && a.isString(t) && (r && !this.responseType || s)) {
      const o = !(n && n.silentJSONParsing) && s;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (c) {
        if (o)
          throw c.name === "SyntaxError" ? E.from(c, E.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: N.classes.FormData,
    Blob: N.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
a.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  le.headers[e] = {};
});
const In = a.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Bn = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(o) {
    s = o.indexOf(":"), n = o.substring(0, s).trim().toLowerCase(), r = o.substring(s + 1).trim(), !(!n || t[n] && In[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Ke = /* @__PURE__ */ Symbol("internals");
function oe(e) {
  return e && String(e).trim().toLowerCase();
}
function ye(e) {
  return e === !1 || e == null ? e : a.isArray(e) ? e.map(ye) : String(e);
}
function Mn(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const qn = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function _e(e, t, n, r, s) {
  if (a.isFunction(r))
    return r.call(this, t, n);
  if (s && (t = n), !!a.isString(t)) {
    if (a.isString(r))
      return t.indexOf(r) !== -1;
    if (a.isRegExp(r))
      return r.test(t);
  }
}
function $n(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Hn(e, t) {
  const n = a.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(s, i, o) {
        return this[r].call(this, t, s, i, o);
      },
      configurable: !0
    });
  });
}
let F = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function i(c, h, f) {
      const l = oe(h);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const p = a.findKey(s, l);
      (!p || s[p] === void 0 || f === !0 || f === void 0 && s[p] !== !1) && (s[p || h] = ye(c));
    }
    const o = (c, h) => a.forEach(c, (f, l) => i(f, l, h));
    if (a.isPlainObject(t) || t instanceof this.constructor)
      o(t, n);
    else if (a.isString(t) && (t = t.trim()) && !qn(t))
      o(Bn(t), n);
    else if (a.isObject(t) && a.isIterable(t)) {
      let c = {}, h, f;
      for (const l of t) {
        if (!a.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        c[f = l[0]] = (h = c[f]) ? a.isArray(h) ? [...h, l[1]] : [h, l[1]] : l[1];
      }
      o(c, n);
    } else
      t != null && i(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = oe(t), t) {
      const r = a.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n)
          return s;
        if (n === !0)
          return Mn(s);
        if (a.isFunction(n))
          return n.call(this, s, r);
        if (a.isRegExp(n))
          return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = oe(t), t) {
      const r = a.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || _e(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function i(o) {
      if (o = oe(o), o) {
        const c = a.findKey(r, o);
        c && (!n || _e(r, r[c], c, n)) && (delete r[c], s = !0);
      }
    }
    return a.isArray(t) ? t.forEach(i) : i(t), s;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, s = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || _e(this, this[i], i, t, !0)) && (delete this[i], s = !0);
    }
    return s;
  }
  normalize(t) {
    const n = this, r = {};
    return a.forEach(this, (s, i) => {
      const o = a.findKey(r, i);
      if (o) {
        n[o] = ye(s), delete n[i];
        return;
      }
      const c = t ? $n(i) : String(i).trim();
      c !== i && delete n[i], n[c] = ye(s), r[c] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return a.forEach(this, (r, s) => {
      r != null && r !== !1 && (n[s] = t && a.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((s) => r.set(s)), r;
  }
  static accessor(t) {
    const r = (this[Ke] = this[Ke] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function i(o) {
      const c = oe(o);
      r[c] || (Hn(s, o), r[c] = !0);
    }
    return a.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
F.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
a.reduceDescriptors(F.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
a.freezeMethods(F);
function Ce(e, t) {
  const n = this || le, r = t || n, s = F.from(r.headers);
  let i = r.data;
  return a.forEach(e, function(c) {
    i = c.call(n, i, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), i;
}
function xt(e) {
  return !!(e && e.__CANCEL__);
}
function Z(e, t, n) {
  E.call(this, e ?? "canceled", E.ERR_CANCELED, t, n), this.name = "CanceledError";
}
a.inherits(Z, E, {
  __CANCEL__: !0
});
function Rt(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new E(
    "Request failed with status code " + n.status,
    [E.ERR_BAD_REQUEST, E.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function zn(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Vn(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, i = 0, o;
  return t = t !== void 0 ? t : 1e3, function(h) {
    const f = Date.now(), l = r[i];
    o || (o = f), n[s] = h, r[s] = f;
    let p = i, g = 0;
    for (; p !== s; )
      g += n[p++], p = p % e;
    if (s = (s + 1) % e, s === i && (i = (i + 1) % e), f - o < t)
      return;
    const x = l && f - l;
    return x ? Math.round(g * 1e3 / x) : void 0;
  };
}
function Jn(e, t) {
  let n = 0, r = 1e3 / t, s, i;
  const o = (f, l = Date.now()) => {
    n = l, s = null, i && (clearTimeout(i), i = null), e(...f);
  };
  return [(...f) => {
    const l = Date.now(), p = l - n;
    p >= r ? o(f, l) : (s = f, i || (i = setTimeout(() => {
      i = null, o(s);
    }, r - p)));
  }, () => s && o(s)];
}
const we = (e, t, n = 3) => {
  let r = 0;
  const s = Vn(50, 250);
  return Jn((i) => {
    const o = i.loaded, c = i.lengthComputable ? i.total : void 0, h = o - r, f = s(h), l = o <= c;
    r = o;
    const p = {
      loaded: o,
      total: c,
      progress: c ? o / c : void 0,
      bytes: h,
      rate: f || void 0,
      estimated: f && c && l ? (c - o) / f : void 0,
      event: i,
      lengthComputable: c != null,
      [t ? "download" : "upload"]: !0
    };
    e(p);
  }, n);
}, Ye = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, Xe = (e) => (...t) => a.asap(() => e(...t)), Wn = N.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, N.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(N.origin),
  N.navigator && /(msie|trident)/i.test(N.navigator.userAgent)
) : () => !0, Kn = N.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, s, i, o) {
      if (typeof document > "u") return;
      const c = [`${e}=${encodeURIComponent(t)}`];
      a.isNumber(n) && c.push(`expires=${new Date(n).toUTCString()}`), a.isString(r) && c.push(`path=${r}`), a.isString(s) && c.push(`domain=${s}`), i === !0 && c.push("secure"), a.isString(o) && c.push(`SameSite=${o}`), document.cookie = c.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Yn(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Xn(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function St(e, t, n) {
  let r = !Yn(t);
  return e && (r || n == !1) ? Xn(e, t) : t;
}
const Ge = (e) => e instanceof F ? { ...e } : e;
function K(e, t) {
  t = t || {};
  const n = {};
  function r(f, l, p, g) {
    return a.isPlainObject(f) && a.isPlainObject(l) ? a.merge.call({ caseless: g }, f, l) : a.isPlainObject(l) ? a.merge({}, l) : a.isArray(l) ? l.slice() : l;
  }
  function s(f, l, p, g) {
    if (a.isUndefined(l)) {
      if (!a.isUndefined(f))
        return r(void 0, f, p, g);
    } else return r(f, l, p, g);
  }
  function i(f, l) {
    if (!a.isUndefined(l))
      return r(void 0, l);
  }
  function o(f, l) {
    if (a.isUndefined(l)) {
      if (!a.isUndefined(f))
        return r(void 0, f);
    } else return r(void 0, l);
  }
  function c(f, l, p) {
    if (p in t)
      return r(f, l);
    if (p in e)
      return r(void 0, f);
  }
  const h = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: c,
    headers: (f, l, p) => s(Ge(f), Ge(l), p, !0)
  };
  return a.forEach(Object.keys({ ...e, ...t }), function(l) {
    const p = h[l] || s, g = p(e[l], t[l], l);
    a.isUndefined(g) && p !== c || (n[l] = g);
  }), n;
}
const Tt = (e) => {
  const t = K({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: s, xsrfCookieName: i, headers: o, auth: c } = t;
  if (t.headers = o = F.from(o), t.url = gt(St(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), c && o.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  ), a.isFormData(n)) {
    if (N.hasStandardBrowserEnv || N.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if (a.isFunction(n.getHeaders)) {
      const h = n.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(h).forEach(([l, p]) => {
        f.includes(l.toLowerCase()) && o.set(l, p);
      });
    }
  }
  if (N.hasStandardBrowserEnv && (r && a.isFunction(r) && (r = r(t)), r || r !== !1 && Wn(t.url))) {
    const h = s && i && Kn.read(i);
    h && o.set(s, h);
  }
  return t;
}, Gn = typeof XMLHttpRequest < "u", Qn = Gn && function(e) {
  return new Promise(function(n, r) {
    const s = Tt(e);
    let i = s.data;
    const o = F.from(s.headers).normalize();
    let { responseType: c, onUploadProgress: h, onDownloadProgress: f } = s, l, p, g, x, d;
    function b() {
      x && x(), d && d(), s.cancelToken && s.cancelToken.unsubscribe(l), s.signal && s.signal.removeEventListener("abort", l);
    }
    let m = new XMLHttpRequest();
    m.open(s.method.toUpperCase(), s.url, !0), m.timeout = s.timeout;
    function S() {
      if (!m)
        return;
      const A = F.from(
        "getAllResponseHeaders" in m && m.getAllResponseHeaders()
      ), L = {
        data: !c || c === "text" || c === "json" ? m.responseText : m.response,
        status: m.status,
        statusText: m.statusText,
        headers: A,
        config: e,
        request: m
      };
      Rt(function(j) {
        n(j), b();
      }, function(j) {
        r(j), b();
      }, L), m = null;
    }
    "onloadend" in m ? m.onloadend = S : m.onreadystatechange = function() {
      !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(S);
    }, m.onabort = function() {
      m && (r(new E("Request aborted", E.ECONNABORTED, e, m)), m = null);
    }, m.onerror = function(C) {
      const L = C && C.message ? C.message : "Network Error", M = new E(L, E.ERR_NETWORK, e, m);
      M.event = C || null, r(M), m = null;
    }, m.ontimeout = function() {
      let C = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const L = s.transitional || wt;
      s.timeoutErrorMessage && (C = s.timeoutErrorMessage), r(new E(
        C,
        L.clarifyTimeoutError ? E.ETIMEDOUT : E.ECONNABORTED,
        e,
        m
      )), m = null;
    }, i === void 0 && o.setContentType(null), "setRequestHeader" in m && a.forEach(o.toJSON(), function(C, L) {
      m.setRequestHeader(L, C);
    }), a.isUndefined(s.withCredentials) || (m.withCredentials = !!s.withCredentials), c && c !== "json" && (m.responseType = s.responseType), f && ([g, d] = we(f, !0), m.addEventListener("progress", g)), h && m.upload && ([p, x] = we(h), m.upload.addEventListener("progress", p), m.upload.addEventListener("loadend", x)), (s.cancelToken || s.signal) && (l = (A) => {
      m && (r(!A || A.type ? new Z(null, e, m) : A), m.abort(), m = null);
    }, s.cancelToken && s.cancelToken.subscribe(l), s.signal && (s.signal.aborted ? l() : s.signal.addEventListener("abort", l)));
    const k = zn(s.url);
    if (k && N.protocols.indexOf(k) === -1) {
      r(new E("Unsupported protocol " + k + ":", E.ERR_BAD_REQUEST, e));
      return;
    }
    m.send(i || null);
  });
}, Zn = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), s;
    const i = function(f) {
      if (!s) {
        s = !0, c();
        const l = f instanceof Error ? f : this.reason;
        r.abort(l instanceof E ? l : new Z(l instanceof Error ? l.message : l));
      }
    };
    let o = t && setTimeout(() => {
      o = null, i(new E(`timeout ${t} of ms exceeded`, E.ETIMEDOUT));
    }, t);
    const c = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(i) : f.removeEventListener("abort", i);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", i));
    const { signal: h } = r;
    return h.unsubscribe = () => a.asap(c), h;
  }
}, er = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, s;
  for (; r < n; )
    s = r + t, yield e.slice(r, s), r = s;
}, tr = async function* (e, t) {
  for await (const n of nr(e))
    yield* er(n, t);
}, nr = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, Qe = (e, t, n, r) => {
  const s = tr(e, t);
  let i = 0, o, c = (h) => {
    o || (o = !0, r && r(h));
  };
  return new ReadableStream({
    async pull(h) {
      try {
        const { done: f, value: l } = await s.next();
        if (f) {
          c(), h.close();
          return;
        }
        let p = l.byteLength;
        if (n) {
          let g = i += p;
          n(g);
        }
        h.enqueue(new Uint8Array(l));
      } catch (f) {
        throw c(f), f;
      }
    },
    cancel(h) {
      return c(h), s.return();
    }
  }, {
    highWaterMark: 2
  });
}, Ze = 64 * 1024, { isFunction: me } = a, rr = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(a.global), {
  ReadableStream: et,
  TextEncoder: tt
} = a.global, nt = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, sr = (e) => {
  e = a.merge.call({
    skipUndefined: !0
  }, rr, e);
  const { fetch: t, Request: n, Response: r } = e, s = t ? me(t) : typeof fetch == "function", i = me(n), o = me(r);
  if (!s)
    return !1;
  const c = s && me(et), h = s && (typeof tt == "function" ? /* @__PURE__ */ ((d) => (b) => d.encode(b))(new tt()) : async (d) => new Uint8Array(await new n(d).arrayBuffer())), f = i && c && nt(() => {
    let d = !1;
    const b = new n(N.origin, {
      body: new et(),
      method: "POST",
      get duplex() {
        return d = !0, "half";
      }
    }).headers.has("Content-Type");
    return d && !b;
  }), l = o && c && nt(() => a.isReadableStream(new r("").body)), p = {
    stream: l && ((d) => d.body)
  };
  s && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((d) => {
    !p[d] && (p[d] = (b, m) => {
      let S = b && b[d];
      if (S)
        return S.call(b);
      throw new E(`Response type '${d}' is not supported`, E.ERR_NOT_SUPPORT, m);
    });
  });
  const g = async (d) => {
    if (d == null)
      return 0;
    if (a.isBlob(d))
      return d.size;
    if (a.isSpecCompliantForm(d))
      return (await new n(N.origin, {
        method: "POST",
        body: d
      }).arrayBuffer()).byteLength;
    if (a.isArrayBufferView(d) || a.isArrayBuffer(d))
      return d.byteLength;
    if (a.isURLSearchParams(d) && (d = d + ""), a.isString(d))
      return (await h(d)).byteLength;
  }, x = async (d, b) => {
    const m = a.toFiniteNumber(d.getContentLength());
    return m ?? g(b);
  };
  return async (d) => {
    let {
      url: b,
      method: m,
      data: S,
      signal: k,
      cancelToken: A,
      timeout: C,
      onDownloadProgress: L,
      onUploadProgress: M,
      responseType: j,
      headers: ee,
      withCredentials: $ = "same-origin",
      fetchOptions: de
    } = Tt(d), fe = t || fetch;
    j = j ? (j + "").toLowerCase() : "text";
    let H = Zn([k, A && A.toAbortSignal()], C), z = null;
    const q = H && H.unsubscribe && (() => {
      H.unsubscribe();
    });
    let Y;
    try {
      if (M && f && m !== "get" && m !== "head" && (Y = await x(ee, S)) !== 0) {
        let u = new n(b, {
          method: "POST",
          body: S,
          duplex: "half"
        }), w;
        if (a.isFormData(S) && (w = u.headers.get("content-type")) && ee.setContentType(w), u.body) {
          const [R, T] = Ye(
            Y,
            we(Xe(M))
          );
          S = Qe(u.body, Ze, R, T);
        }
      }
      a.isString($) || ($ = $ ? "include" : "omit");
      const U = i && "credentials" in n.prototype, te = {
        ...de,
        signal: H,
        method: m.toUpperCase(),
        headers: ee.normalize().toJSON(),
        body: S,
        duplex: "half",
        credentials: U ? $ : void 0
      };
      z = i && new n(b, te);
      let D = await (i ? fe(z, de) : fe(b, te));
      const ne = l && (j === "stream" || j === "response");
      if (l && (L || ne && q)) {
        const u = {};
        ["status", "statusText", "headers"].forEach((V) => {
          u[V] = D[V];
        });
        const w = a.toFiniteNumber(D.headers.get("content-length")), [R, T] = L && Ye(
          w,
          we(Xe(L), !0)
        ) || [];
        D = new r(
          Qe(D.body, Ze, R, () => {
            T && T(), q && q();
          }),
          u
        );
      }
      j = j || "text";
      let he = await p[a.findKey(p, j) || "text"](D, d);
      return !ne && q && q(), await new Promise((u, w) => {
        Rt(u, w, {
          data: he,
          headers: F.from(D.headers),
          status: D.status,
          statusText: D.statusText,
          config: d,
          request: z
        });
      });
    } catch (U) {
      throw q && q(), U && U.name === "TypeError" && /Load failed|fetch/i.test(U.message) ? Object.assign(
        new E("Network Error", E.ERR_NETWORK, d, z),
        {
          cause: U.cause || U
        }
      ) : E.from(U, U && U.code, d, z);
    }
  };
}, or = /* @__PURE__ */ new Map(), Ot = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: r, Response: s } = t, i = [
    r,
    s,
    n
  ];
  let o = i.length, c = o, h, f, l = or;
  for (; c--; )
    h = i[c], f = l.get(h), f === void 0 && l.set(h, f = c ? /* @__PURE__ */ new Map() : sr(t)), l = f;
  return f;
};
Ot();
const Be = {
  http: Rn,
  xhr: Qn,
  fetch: {
    get: Ot
  }
};
a.forEach(Be, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const rt = (e) => `- ${e}`, ir = (e) => a.isFunction(e) || e === null || e === !1;
function ar(e, t) {
  e = a.isArray(e) ? e : [e];
  const { length: n } = e;
  let r, s;
  const i = {};
  for (let o = 0; o < n; o++) {
    r = e[o];
    let c;
    if (s = r, !ir(r) && (s = Be[(c = String(r)).toLowerCase()], s === void 0))
      throw new E(`Unknown adapter '${c}'`);
    if (s && (a.isFunction(s) || (s = s.get(t))))
      break;
    i[c || "#" + o] = s;
  }
  if (!s) {
    const o = Object.entries(i).map(
      ([h, f]) => `adapter ${h} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let c = n ? o.length > 1 ? `since :
` + o.map(rt).join(`
`) : " " + rt(o[0]) : "as no adapter specified";
    throw new E(
      "There is no suitable adapter to dispatch the request " + c,
      "ERR_NOT_SUPPORT"
    );
  }
  return s;
}
const At = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: ar,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: Be
};
function Ne(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Z(null, e);
}
function st(e) {
  return Ne(e), e.headers = F.from(e.headers), e.data = Ce.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), At.getAdapter(e.adapter || le.adapter, e)(e).then(function(r) {
    return Ne(e), r.data = Ce.call(
      e,
      e.transformResponse,
      r
    ), r.headers = F.from(r.headers), r;
  }, function(r) {
    return xt(r) || (Ne(e), r && r.response && (r.response.data = Ce.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = F.from(r.response.headers))), Promise.reject(r);
  });
}
const _t = "1.13.2", Te = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Te[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const ot = {};
Te.transitional = function(t, n, r) {
  function s(i, o) {
    return "[Axios v" + _t + "] Transitional option '" + i + "'" + o + (r ? ". " + r : "");
  }
  return (i, o, c) => {
    if (t === !1)
      throw new E(
        s(o, " has been removed" + (n ? " in " + n : "")),
        E.ERR_DEPRECATED
      );
    return n && !ot[o] && (ot[o] = !0, console.warn(
      s(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(i, o, c) : !0;
  };
};
Te.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function cr(e, t, n) {
  if (typeof e != "object")
    throw new E("options must be an object", E.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const i = r[s], o = t[i];
    if (o) {
      const c = e[i], h = c === void 0 || o(c, i, e);
      if (h !== !0)
        throw new E("option " + i + " must be " + h, E.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new E("Unknown option " + i, E.ERR_BAD_OPTION);
  }
}
const ge = {
  assertOptions: cr,
  validators: Te
}, B = ge.validators;
let W = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new We(),
      response: new We()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let s = {};
        Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
        const i = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? i && !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + i) : r.stack = i;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = K(this.defaults, n);
    const { transitional: r, paramsSerializer: s, headers: i } = n;
    r !== void 0 && ge.assertOptions(r, {
      silentJSONParsing: B.transitional(B.boolean),
      forcedJSONParsing: B.transitional(B.boolean),
      clarifyTimeoutError: B.transitional(B.boolean)
    }, !1), s != null && (a.isFunction(s) ? n.paramsSerializer = {
      serialize: s
    } : ge.assertOptions(s, {
      encode: B.function,
      serialize: B.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), ge.assertOptions(n, {
      baseUrl: B.spelling("baseURL"),
      withXsrfToken: B.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = i && a.merge(
      i.common,
      i[n.method]
    );
    i && a.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete i[d];
      }
    ), n.headers = F.concat(o, i);
    const c = [];
    let h = !0;
    this.interceptors.request.forEach(function(b) {
      typeof b.runWhen == "function" && b.runWhen(n) === !1 || (h = h && b.synchronous, c.unshift(b.fulfilled, b.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(b) {
      f.push(b.fulfilled, b.rejected);
    });
    let l, p = 0, g;
    if (!h) {
      const d = [st.bind(this), void 0];
      for (d.unshift(...c), d.push(...f), g = d.length, l = Promise.resolve(n); p < g; )
        l = l.then(d[p++], d[p++]);
      return l;
    }
    g = c.length;
    let x = n;
    for (; p < g; ) {
      const d = c[p++], b = c[p++];
      try {
        x = d(x);
      } catch (m) {
        b.call(this, m);
        break;
      }
    }
    try {
      l = st.call(this, x);
    } catch (d) {
      return Promise.reject(d);
    }
    for (p = 0, g = f.length; p < g; )
      l = l.then(f[p++], f[p++]);
    return l;
  }
  getUri(t) {
    t = K(this.defaults, t);
    const n = St(t.baseURL, t.url, t.allowAbsoluteUrls);
    return gt(n, t.params, t.paramsSerializer);
  }
};
a.forEach(["delete", "get", "head", "options"], function(t) {
  W.prototype[t] = function(n, r) {
    return this.request(K(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
a.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(i, o, c) {
      return this.request(K(c || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: o
      }));
    };
  }
  W.prototype[t] = n(), W.prototype[t + "Form"] = n(!0);
});
let lr = class Ct {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(i) {
      n = i;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; )
        r._listeners[i](s);
      r._listeners = null;
    }), this.promise.then = (s) => {
      let i;
      const o = new Promise((c) => {
        r.subscribe(c), i = c;
      }).then(s);
      return o.cancel = function() {
        r.unsubscribe(i);
      }, o;
    }, t(function(i, o, c) {
      r.reason || (r.reason = new Z(i, o, c), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Ct(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
};
function ur(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function dr(e) {
  return a.isObject(e) && e.isAxiosError === !0;
}
const ve = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(ve).forEach(([e, t]) => {
  ve[t] = e;
});
function Nt(e) {
  const t = new W(e), n = it(W.prototype.request, t);
  return a.extend(n, W.prototype, t, { allOwnKeys: !0 }), a.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(s) {
    return Nt(K(e, s));
  }, n;
}
const O = Nt(le);
O.Axios = W;
O.CanceledError = Z;
O.CancelToken = lr;
O.isCancel = xt;
O.VERSION = _t;
O.toFormData = Se;
O.AxiosError = E;
O.Cancel = O.CanceledError;
O.all = function(t) {
  return Promise.all(t);
};
O.spread = ur;
O.isAxiosError = dr;
O.mergeConfig = K;
O.AxiosHeaders = F;
O.formToJSON = (e) => Et(a.isHTMLForm(e) ? new FormData(e) : e);
O.getAdapter = At.getAdapter;
O.HttpStatusCode = ve;
O.default = O;
const {
  Axios: wr,
  AxiosError: Er,
  CanceledError: xr,
  isCancel: Rr,
  CancelToken: Sr,
  VERSION: Tr,
  all: Or,
  Cancel: Ar,
  isAxiosError: _r,
  spread: Cr,
  toFormData: Nr,
  AxiosHeaders: kr,
  HttpStatusCode: jr,
  formToJSON: Pr,
  getAdapter: vr,
  mergeConfig: Fr
} = O, fr = {};
let Fe;
typeof import.meta < "u" && fr ? Fe = "http://localhost:8000" : (Fe = process.env.VITE_BACKEND_URL || "http://localhost:8000", process.env.VITE_ENABLE_TRANSLATION);
const hr = {
  backendUrl: Fe
}, ue = O.create({
  baseURL: hr.backendUrl,
  timeout: 3e4
  // 30 seconds timeout
});
ue.interceptors.request.use(
  (e) => e,
  (e) => Promise.reject(e)
);
ue.interceptors.response.use(
  (e) => e,
  (e) => (console.error("API Error:", e), Promise.reject(e))
);
const Me = async (e) => {
  try {
    return (await ue.post("/api/chat", { query: e })).data;
  } catch (t) {
    throw console.error("Error sending message:", t), t;
  }
}, kt = async (e, t) => {
  try {
    return (await ue.post("/api/chat/selected-text", {
      selected_text: e,
      query: t
    })).data;
  } catch (n) {
    throw console.error("Error sending selected text:", n), n;
  }
}, pr = async (e) => {
  try {
    return console.warn("Translation endpoint not implemented in backend yet"), { translated_text: `Mock translation of: ${e}` };
  } catch (t) {
    throw console.error("Error translating text:", t), t;
  }
}, mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ue,
  sendMessage: Me,
  sendSelectedText: kt,
  translateText: pr
}, Symbol.toStringTag, { value: "Module" })), Lr = () => {
  const [e, t] = P([]), [n, r] = P(""), [s, i] = P(!1), [o, c] = P(null);
  Le(() => {
    t([
      { id: 1, text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics book. How can I help you today?", sender: "bot" }
    ]);
  }, []);
  const h = async () => {
    if (!n.trim() || s) return;
    const l = {
      id: Date.now(),
      text: n,
      sender: "user"
    };
    t((p) => [...p, l]), r(""), i(!0), c(null);
    try {
      const p = await Me(n), g = {
        id: Date.now() + 1,
        text: p.response,
        sender: "bot",
        sources: p.sources || []
      };
      t((x) => [...x, g]);
    } catch (p) {
      console.error("Error sending message:", p), c("Failed to send message. Please try again.");
      const g = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot"
      };
      t((x) => [...x, g]);
    } finally {
      i(!1);
    }
  }, f = (l) => {
    l.key === "Enter" && !l.shiftKey && (l.preventDefault(), h());
  };
  return /* @__PURE__ */ y.jsxs("div", { className: "chatbot-widget", children: [
    /* @__PURE__ */ y.jsx("div", { className: "chatbot-header", children: /* @__PURE__ */ y.jsx("h3", { children: "AI Assistant" }) }),
    /* @__PURE__ */ y.jsxs("div", { className: "chatbot-messages", children: [
      e.map((l) => /* @__PURE__ */ y.jsxs(
        "div",
        {
          className: `message ${l.sender}-message`,
          children: [
            /* @__PURE__ */ y.jsx("div", { className: "message-text", children: l.text }),
            l.sources && l.sources.length > 0 && /* @__PURE__ */ y.jsx("div", { className: "message-sources", children: /* @__PURE__ */ y.jsxs("small", { children: [
              "Sources: ",
              l.sources.join(", ")
            ] }) })
          ]
        },
        l.id
      )),
      s && /* @__PURE__ */ y.jsx("div", { className: "message bot-message", children: /* @__PURE__ */ y.jsx("div", { className: "message-text", children: "..." }) })
    ] }),
    o && /* @__PURE__ */ y.jsx("div", { className: "chatbot-error", children: o }),
    /* @__PURE__ */ y.jsxs("div", { className: "chatbot-input", children: [
      /* @__PURE__ */ y.jsx(
        "textarea",
        {
          value: n,
          onChange: (l) => r(l.target.value),
          onKeyPress: f,
          placeholder: "Ask a question about the book...",
          rows: "3"
        }
      ),
      /* @__PURE__ */ y.jsx(
        "button",
        {
          onClick: h,
          disabled: s || !n.trim(),
          className: "send-button",
          children: s ? "Sending..." : "Send"
        }
      )
    ] })
  ] });
}, Ur = () => {
  const [e, t] = P(!1), [n, r] = P([]), [s, i] = P(""), [o, c] = P(!1), [h, f] = P(null);
  Le(() => {
    e && n.length === 0 && r([
      { id: 1, text: "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics book. How can I help you today?", sender: "bot" }
    ]);
  }, [e, n.length]);
  const l = async () => {
    if (!s.trim() || o) return;
    const d = {
      id: Date.now(),
      text: s,
      sender: "user"
    };
    r((b) => [...b, d]), i(""), c(!0), f(null);
    try {
      const b = await Me(s), m = {
        id: Date.now() + 1,
        text: b.response,
        sender: "bot",
        sources: b.sources || []
      };
      r((S) => [...S, m]);
    } catch (b) {
      console.error("Error sending message:", b), f("Failed to send message. Please try again.");
      const m = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot"
      };
      r((S) => [...S, m]);
    } finally {
      c(!1);
    }
  }, p = (d) => {
    d.key === "Enter" && !d.shiftKey && (d.preventDefault(), l());
  }, g = () => {
    t(!e);
  }, x = () => {
    t(!1);
  };
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsx(
      "button",
      {
        className: "chatbot-toggle-button",
        onClick: g,
        "aria-label": e ? "Close chatbot" : "Open chatbot",
        children: /* @__PURE__ */ y.jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "chatbot-icon",
            children: /* @__PURE__ */ y.jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
          }
        )
      }
    ),
    e && /* @__PURE__ */ y.jsxs("div", { className: "chatbot-widget", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "chatbot-header", children: [
        /* @__PURE__ */ y.jsx("h3", { children: "AI Assistant" }),
        /* @__PURE__ */ y.jsx("button", { className: "chatbot-close-button", onClick: x, "aria-label": "Close chat", children: /* @__PURE__ */ y.jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ y.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
              /* @__PURE__ */ y.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ y.jsxs("div", { className: "chatbot-messages", children: [
        n.map((d) => /* @__PURE__ */ y.jsxs(
          "div",
          {
            className: `message ${d.sender}-message`,
            children: [
              /* @__PURE__ */ y.jsx("div", { className: "message-text", children: d.text }),
              d.sources && d.sources.length > 0 && /* @__PURE__ */ y.jsx("div", { className: "message-sources", children: /* @__PURE__ */ y.jsxs("small", { children: [
                "Sources: ",
                d.sources.join(", ")
              ] }) })
            ]
          },
          d.id
        )),
        o && /* @__PURE__ */ y.jsx("div", { className: "message bot-message", children: /* @__PURE__ */ y.jsx("div", { className: "message-text", children: "..." }) })
      ] }),
      h && /* @__PURE__ */ y.jsx("div", { className: "chatbot-error", children: h }),
      /* @__PURE__ */ y.jsxs("div", { className: "chatbot-input", children: [
        /* @__PURE__ */ y.jsx(
          "textarea",
          {
            value: s,
            onChange: (d) => i(d.target.value),
            onKeyPress: p,
            placeholder: "Ask a question about the book...",
            rows: "3"
          }
        ),
        /* @__PURE__ */ y.jsx(
          "button",
          {
            onClick: l,
            disabled: o || !s.trim(),
            className: "send-button",
            children: o ? "Sending..." : "Send"
          }
        )
      ] })
    ] })
  ] });
}, Dr = () => {
  const [e, t] = P(""), [n, r] = P(""), [s, i] = P(""), [o, c] = P(!1), [h, f] = P(!1);
  Le(() => {
    const g = () => {
      const x = window.getSelection().toString().trim();
      x.length > 0 && t(x);
    };
    return document.addEventListener("mouseup", g), document.addEventListener("touchend", g), () => {
      document.removeEventListener("mouseup", g), document.removeEventListener("touchend", g);
    };
  }, []);
  const l = async () => {
    if (!(!e || !n)) {
      c(!0);
      try {
        const g = await kt(e, n);
        i(g.response), f(!0);
      } catch (g) {
        console.error("Error sending selected text:", g), i("Sorry, I encountered an error. Please try again."), f(!0);
      } finally {
        c(!1);
      }
    }
  }, p = async () => {
    if (e) {
      c(!0);
      try {
        const g = await Promise.resolve().then(() => mr).then((x) => x.translateText(e));
        i(g.translated_text), f(!0);
      } catch (g) {
        console.error("Error translating text:", g), i("Translation failed. Please try again."), f(!0);
      } finally {
        c(!1);
      }
    }
  };
  return /* @__PURE__ */ y.jsxs("div", { className: "selected-text-handler", children: [
    e && /* @__PURE__ */ y.jsxs("div", { className: "context-menu", children: [
      /* @__PURE__ */ y.jsx("button", { onClick: l, disabled: o, children: o ? "Asking..." : "Ask about this" }),
      /* @__PURE__ */ y.jsx("button", { onClick: p, disabled: o, children: "Translate" }),
      /* @__PURE__ */ y.jsx("button", { onClick: () => t(""), children: "Close" })
    ] }),
    h && /* @__PURE__ */ y.jsx("div", { className: "response-modal", children: /* @__PURE__ */ y.jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ y.jsx("h4", { children: "Response" }),
      /* @__PURE__ */ y.jsx("p", { children: s }),
      /* @__PURE__ */ y.jsx("button", { onClick: () => f(!1), children: "Close" })
    ] }) })
  ] });
}, Ir = ({ position: e, onAsk: t, onTranslate: n, onClose: r, selectedText: s }) => {
  if (!e) return null;
  const i = {
    position: "fixed",
    left: e.x,
    top: e.y,
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 1e4,
    padding: "5px 0"
  };
  return /* @__PURE__ */ y.jsxs("div", { className: "context-menu", style: i, children: [
    /* @__PURE__ */ y.jsx(
      "button",
      {
        onClick: () => t(s),
        style: {
          display: "block",
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: "none",
          textAlign: "left",
          cursor: "pointer"
        },
        children: "Ask about this"
      }
    ),
    /* @__PURE__ */ y.jsx(
      "button",
      {
        onClick: () => n(s),
        style: {
          display: "block",
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: "none",
          textAlign: "left",
          cursor: "pointer"
        },
        children: "Translate"
      }
    ),
    /* @__PURE__ */ y.jsx(
      "button",
      {
        onClick: r,
        style: {
          display: "block",
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: "none",
          textAlign: "left",
          cursor: "pointer"
        },
        children: "Close"
      }
    )
  ] });
};
export {
  Lr as ChatbotWidget,
  Ir as ContextMenu,
  Ur as FloatingChatbot,
  Dr as SelectedTextHandler
};
