function Bn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function cl(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ko(t) {
  let e, n, i;
  t.length !== 2 ? (e = Bn, n = (s, c) => Bn(t(s), c), i = (s, c) => t(s) - c) : (e = t === Bn || t === cl ? t : fl, n = t, i = t);
  function r(s, c, f = 0, u = s.length) {
    if (f < u) {
      if (e(c, c) !== 0) return u;
      do {
        const m = f + u >>> 1;
        n(s[m], c) < 0 ? f = m + 1 : u = m;
      } while (f < u);
    }
    return f;
  }
  function a(s, c, f = 0, u = s.length) {
    if (f < u) {
      if (e(c, c) !== 0) return u;
      do {
        const m = f + u >>> 1;
        n(s[m], c) <= 0 ? f = m + 1 : u = m;
      } while (f < u);
    }
    return f;
  }
  function o(s, c, f = 0, u = s.length) {
    const m = r(s, c, f, u - 1);
    return m > f && i(s[m - 1], c) > -i(s[m], c) ? m - 1 : m;
  }
  return { left: r, center: o, right: a };
}
function fl() {
  return 0;
}
function ul(t) {
  return t === null ? NaN : +t;
}
const hl = ko(Bn), dl = hl.right;
ko(ul).center;
const pl = Math.sqrt(50), _l = Math.sqrt(10), ml = Math.sqrt(2);
function Xn(t, e, n) {
  const i = (e - t) / Math.max(0, n), r = Math.floor(Math.log10(i)), a = i / Math.pow(10, r), o = a >= pl ? 10 : a >= _l ? 5 : a >= ml ? 2 : 1;
  let s, c, f;
  return r < 0 ? (f = Math.pow(10, -r) / o, s = Math.round(t * f), c = Math.round(e * f), s / f < t && ++s, c / f > e && --c, f = -f) : (f = Math.pow(10, r) * o, s = Math.round(t / f), c = Math.round(e / f), s * f < t && ++s, c * f > e && --c), c < s && 0.5 <= n && n < 2 ? Xn(t, e, n * 2) : [s, c, f];
}
function gl(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const i = e < t, [r, a, o] = i ? Xn(e, t, n) : Xn(t, e, n);
  if (!(a >= r)) return [];
  const s = a - r + 1, c = new Array(s);
  if (i)
    if (o < 0) for (let f = 0; f < s; ++f) c[f] = (a - f) / -o;
    else for (let f = 0; f < s; ++f) c[f] = (a - f) * o;
  else if (o < 0) for (let f = 0; f < s; ++f) c[f] = (r + f) / -o;
  else for (let f = 0; f < s; ++f) c[f] = (r + f) * o;
  return c;
}
function Yi(t, e, n) {
  return e = +e, t = +t, n = +n, Xn(t, e, n)[2];
}
function wl(t, e, n) {
  e = +e, t = +t, n = +n;
  const i = e < t, r = i ? Yi(e, t, n) : Yi(t, e, n);
  return (i ? -1 : 1) * (r < 0 ? 1 / -r : r);
}
function vl(t) {
  return t;
}
var Un = 1, vi = 2, Xi = 3, An = 4, Hr = 1e-6;
function yl(t) {
  return "translate(" + t + ",0)";
}
function bl(t) {
  return "translate(0," + t + ")";
}
function xl(t) {
  return (e) => +t(e);
}
function kl(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Tl() {
  return !this.__axis;
}
function To(t, e) {
  var n = [], i = null, r = null, a = 6, o = 6, s = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = t === Un || t === An ? -1 : 1, u = t === An || t === vi ? "x" : "y", m = t === Un || t === Xi ? yl : bl;
  function d(p) {
    var y = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), O = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : vl), D = Math.max(a, 0) + s, S = e.range(), x = +S[0] + c, k = +S[S.length - 1] + c, w = (e.bandwidth ? kl : xl)(e.copy(), c), N = p.selection ? p.selection() : p, I = N.selectAll(".domain").data([null]), A = N.selectAll(".tick").data(y, e).order(), F = A.exit(), H = A.enter().append("g").attr("class", "tick"), C = A.select("line"), v = A.select("text");
    I = I.merge(I.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), A = A.merge(H), C = C.merge(H.append("line").attr("stroke", "currentColor").attr(u + "2", f * a)), v = v.merge(H.append("text").attr("fill", "currentColor").attr(u, f * D).attr("dy", t === Un ? "0em" : t === Xi ? "0.71em" : "0.32em")), p !== N && (I = I.transition(p), A = A.transition(p), C = C.transition(p), v = v.transition(p), F = F.transition(p).attr("opacity", Hr).attr("transform", function(z) {
      return isFinite(z = w(z)) ? m(z + c) : this.getAttribute("transform");
    }), H.attr("opacity", Hr).attr("transform", function(z) {
      var P = this.parentNode.__axis;
      return m((P && isFinite(P = P(z)) ? P : w(z)) + c);
    })), F.remove(), I.attr("d", t === An || t === vi ? o ? "M" + f * o + "," + x + "H" + c + "V" + k + "H" + f * o : "M" + c + "," + x + "V" + k : o ? "M" + x + "," + f * o + "V" + c + "H" + k + "V" + f * o : "M" + x + "," + c + "H" + k), A.attr("opacity", 1).attr("transform", function(z) {
      return m(w(z) + c);
    }), C.attr(u + "2", f * a), v.attr(u, f * D).text(O), N.filter(Tl).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === vi ? "start" : t === An ? "end" : "middle"), N.each(function() {
      this.__axis = w;
    });
  }
  return d.scale = function(p) {
    return arguments.length ? (e = p, d) : e;
  }, d.ticks = function() {
    return n = Array.from(arguments), d;
  }, d.tickArguments = function(p) {
    return arguments.length ? (n = p == null ? [] : Array.from(p), d) : n.slice();
  }, d.tickValues = function(p) {
    return arguments.length ? (i = p == null ? null : Array.from(p), d) : i && i.slice();
  }, d.tickFormat = function(p) {
    return arguments.length ? (r = p, d) : r;
  }, d.tickSize = function(p) {
    return arguments.length ? (a = o = +p, d) : a;
  }, d.tickSizeInner = function(p) {
    return arguments.length ? (a = +p, d) : a;
  }, d.tickSizeOuter = function(p) {
    return arguments.length ? (o = +p, d) : o;
  }, d.tickPadding = function(p) {
    return arguments.length ? (s = +p, d) : s;
  }, d.offset = function(p) {
    return arguments.length ? (c = +p, d) : c;
  }, d;
}
function Br(t) {
  return To(Un, t);
}
function El(t) {
  return To(Xi, t);
}
var Al = { value: () => {
} };
function Eo() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new Vn(n);
}
function Vn(t) {
  this._ = t;
}
function Sl(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
Vn.prototype = Eo.prototype = {
  constructor: Vn,
  on: function(t, e) {
    var n = this._, i = Sl(t + "", n), r, a = -1, o = i.length;
    if (arguments.length < 2) {
      for (; ++a < o; ) if ((r = (t = i[a]).type) && (r = Nl(n[r], t.name))) return r;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++a < o; )
      if (r = (t = i[a]).type) n[r] = Ur(n[r], t.name, e);
      else if (e == null) for (r in n) n[r] = Ur(n[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Vn(t);
  },
  call: function(t, e) {
    if ((r = arguments.length - 2) > 0) for (var n = new Array(r), i = 0, r, a; i < r; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (a = this._[t], i = 0, r = a.length; i < r; ++i) a[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], r = 0, a = i.length; r < a; ++r) i[r].value.apply(e, n);
  }
};
function Nl(t, e) {
  for (var n = 0, i = t.length, r; n < i; ++n)
    if ((r = t[n]).name === e)
      return r.value;
}
function Ur(t, e, n) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === e) {
      t[i] = Al, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ki = "http://www.w3.org/1999/xhtml";
const Vr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ki,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function fi(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Vr.hasOwnProperty(e) ? { space: Vr[e], local: t } : t;
}
function Rl(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ki && e.documentElement.namespaceURI === Ki ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Il(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Ao(t) {
  var e = fi(t);
  return (e.local ? Il : Rl)(e);
}
function Dl() {
}
function mr(t) {
  return t == null ? Dl : function() {
    return this.querySelector(t);
  };
}
function $l(t) {
  typeof t != "function" && (t = mr(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], o = a.length, s = i[r] = new Array(o), c, f, u = 0; u < o; ++u)
      (c = a[u]) && (f = t.call(c, c.__data__, u, a)) && ("__data__" in c && (f.__data__ = c.__data__), s[u] = f);
  return new te(i, this._parents);
}
function So(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ml() {
  return [];
}
function No(t) {
  return t == null ? Ml : function() {
    return this.querySelectorAll(t);
  };
}
function Ol(t) {
  return function() {
    return So(t.apply(this, arguments));
  };
}
function Ll(t) {
  typeof t == "function" ? t = Ol(t) : t = No(t);
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var o = e[a], s = o.length, c, f = 0; f < s; ++f)
      (c = o[f]) && (i.push(t.call(c, c.__data__, f, o)), r.push(c));
  return new te(i, r);
}
function Ro(t) {
  return function() {
    return this.matches(t);
  };
}
function Io(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Cl = Array.prototype.find;
function Fl(t) {
  return function() {
    return Cl.call(this.children, t);
  };
}
function zl() {
  return this.firstElementChild;
}
function Pl(t) {
  return this.select(t == null ? zl : Fl(typeof t == "function" ? t : Io(t)));
}
var Hl = Array.prototype.filter;
function Bl() {
  return Array.from(this.children);
}
function Ul(t) {
  return function() {
    return Hl.call(this.children, t);
  };
}
function Vl(t) {
  return this.selectAll(t == null ? Bl : Ul(typeof t == "function" ? t : Io(t)));
}
function Gl(t) {
  typeof t != "function" && (t = Ro(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], o = a.length, s = i[r] = [], c, f = 0; f < o; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && s.push(c);
  return new te(i, this._parents);
}
function Do(t) {
  return new Array(t.length);
}
function ql() {
  return new te(this._enter || this._groups.map(Do), this._parents);
}
function Kn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Kn.prototype = {
  constructor: Kn,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Zl(t) {
  return function() {
    return t;
  };
}
function Wl(t, e, n, i, r, a) {
  for (var o = 0, s, c = e.length, f = a.length; o < f; ++o)
    (s = e[o]) ? (s.__data__ = a[o], i[o] = s) : n[o] = new Kn(t, a[o]);
  for (; o < c; ++o)
    (s = e[o]) && (r[o] = s);
}
function Yl(t, e, n, i, r, a, o) {
  var s, c, f = /* @__PURE__ */ new Map(), u = e.length, m = a.length, d = new Array(u), p;
  for (s = 0; s < u; ++s)
    (c = e[s]) && (d[s] = p = o.call(c, c.__data__, s, e) + "", f.has(p) ? r[s] = c : f.set(p, c));
  for (s = 0; s < m; ++s)
    p = o.call(t, a[s], s, a) + "", (c = f.get(p)) ? (i[s] = c, c.__data__ = a[s], f.delete(p)) : n[s] = new Kn(t, a[s]);
  for (s = 0; s < u; ++s)
    (c = e[s]) && f.get(d[s]) === c && (r[s] = c);
}
function Xl(t) {
  return t.__data__;
}
function Kl(t, e) {
  if (!arguments.length) return Array.from(this, Xl);
  var n = e ? Yl : Wl, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Zl(t));
  for (var a = r.length, o = new Array(a), s = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var u = i[f], m = r[f], d = m.length, p = Jl(t.call(u, u && u.__data__, f, i)), y = p.length, O = s[f] = new Array(y), D = o[f] = new Array(y), S = c[f] = new Array(d);
    n(u, m, O, D, S, p, e);
    for (var x = 0, k = 0, w, N; x < y; ++x)
      if (w = O[x]) {
        for (x >= k && (k = x + 1); !(N = D[k]) && ++k < y; ) ;
        w._next = N || null;
      }
  }
  return o = new te(o, i), o._enter = s, o._exit = c, o;
}
function Jl(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ql() {
  return new te(this._exit || this._groups.map(Do), this._parents);
}
function jl(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function tc(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, a = i.length, o = Math.min(r, a), s = new Array(r), c = 0; c < o; ++c)
    for (var f = n[c], u = i[c], m = f.length, d = s[c] = new Array(m), p, y = 0; y < m; ++y)
      (p = f[y] || u[y]) && (d[y] = p);
  for (; c < r; ++c)
    s[c] = n[c];
  return new te(s, this._parents);
}
function ec() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], o; --r >= 0; )
      (o = i[r]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function nc(t) {
  t || (t = ic);
  function e(m, d) {
    return m && d ? t(m.__data__, d.__data__) : !m - !d;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var o = n[a], s = o.length, c = r[a] = new Array(s), f, u = 0; u < s; ++u)
      (f = o[u]) && (c[u] = f);
    c.sort(e);
  }
  return new te(r, this._parents).order();
}
function ic(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function rc() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ac() {
  return Array.from(this);
}
function oc() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var o = i[r];
      if (o) return o;
    }
  return null;
}
function sc() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function lc() {
  return !this.node();
}
function cc(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, o = r.length, s; a < o; ++a)
      (s = r[a]) && t.call(s, s.__data__, a, r);
  return this;
}
function fc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function uc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function hc(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function dc(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function pc(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function _c(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function mc(t, e) {
  var n = fi(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? uc : fc : typeof e == "function" ? n.local ? _c : pc : n.local ? dc : hc)(n, e));
}
function $o(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function gc(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function wc(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function vc(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function yc(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? gc : typeof e == "function" ? vc : wc)(t, e, n ?? "")) : je(this.node(), t);
}
function je(t, e) {
  return t.style.getPropertyValue(e) || $o(t).getComputedStyle(t, null).getPropertyValue(e);
}
function bc(t) {
  return function() {
    delete this[t];
  };
}
function xc(t, e) {
  return function() {
    this[t] = e;
  };
}
function kc(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Tc(t, e) {
  return arguments.length > 1 ? this.each((e == null ? bc : typeof e == "function" ? kc : xc)(t, e)) : this.node()[t];
}
function Mo(t) {
  return t.trim().split(/^|\s+/);
}
function gr(t) {
  return t.classList || new Oo(t);
}
function Oo(t) {
  this._node = t, this._names = Mo(t.getAttribute("class") || "");
}
Oo.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Lo(t, e) {
  for (var n = gr(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Co(t, e) {
  for (var n = gr(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Ec(t) {
  return function() {
    Lo(this, t);
  };
}
function Ac(t) {
  return function() {
    Co(this, t);
  };
}
function Sc(t, e) {
  return function() {
    (e.apply(this, arguments) ? Lo : Co)(this, t);
  };
}
function Nc(t, e) {
  var n = Mo(t + "");
  if (arguments.length < 2) {
    for (var i = gr(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Sc : e ? Ec : Ac)(n, e));
}
function Rc() {
  this.textContent = "";
}
function Ic(t) {
  return function() {
    this.textContent = t;
  };
}
function Dc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function $c(t) {
  return arguments.length ? this.each(t == null ? Rc : (typeof t == "function" ? Dc : Ic)(t)) : this.node().textContent;
}
function Mc() {
  this.innerHTML = "";
}
function Oc(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Lc(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Cc(t) {
  return arguments.length ? this.each(t == null ? Mc : (typeof t == "function" ? Lc : Oc)(t)) : this.node().innerHTML;
}
function Fc() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function zc() {
  return this.each(Fc);
}
function Pc() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Hc() {
  return this.each(Pc);
}
function Bc(t) {
  var e = typeof t == "function" ? t : Ao(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Uc() {
  return null;
}
function Vc(t, e) {
  var n = typeof t == "function" ? t : Ao(t), i = e == null ? Uc : typeof e == "function" ? e : mr(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Gc() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function qc() {
  return this.each(Gc);
}
function Zc() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wc() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Yc(t) {
  return this.select(t ? Wc : Zc);
}
function Xc(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Kc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Jc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function Qc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function jc(t, e, n) {
  return function() {
    var i = this.__on, r, a = Kc(e);
    if (i) {
      for (var o = 0, s = i.length; o < s; ++o)
        if ((r = i[o]).type === t.type && r.name === t.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = a, r.options = n), r.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), r = { type: t.type, name: t.name, value: e, listener: a, options: n }, i ? i.push(r) : this.__on = [r];
  };
}
function tf(t, e, n) {
  var i = Jc(t + ""), r, a = i.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var c = 0, f = s.length, u; c < f; ++c)
        for (r = 0, u = s[c]; r < a; ++r)
          if ((o = i[r]).type === u.type && o.name === u.name)
            return u.value;
    }
    return;
  }
  for (s = e ? jc : Qc, r = 0; r < a; ++r) this.each(s(i[r], e, n));
  return this;
}
function Fo(t, e, n) {
  var i = $o(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function ef(t, e) {
  return function() {
    return Fo(this, t, e);
  };
}
function nf(t, e) {
  return function() {
    return Fo(this, t, e.apply(this, arguments));
  };
}
function rf(t, e) {
  return this.each((typeof e == "function" ? nf : ef)(t, e));
}
function* af() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length, o; r < a; ++r)
      (o = i[r]) && (yield o);
}
var wr = [null];
function te(t, e) {
  this._groups = t, this._parents = e;
}
function Ge() {
  return new te([[document.documentElement]], wr);
}
function of() {
  return this;
}
te.prototype = Ge.prototype = {
  constructor: te,
  select: $l,
  selectAll: Ll,
  selectChild: Pl,
  selectChildren: Vl,
  filter: Gl,
  data: Kl,
  enter: ql,
  exit: Ql,
  join: jl,
  merge: tc,
  selection: of,
  order: ec,
  sort: nc,
  call: rc,
  nodes: ac,
  node: oc,
  size: sc,
  empty: lc,
  each: cc,
  attr: mc,
  style: yc,
  property: Tc,
  classed: Nc,
  text: $c,
  html: Cc,
  raise: zc,
  lower: Hc,
  append: Bc,
  insert: Vc,
  remove: qc,
  clone: Yc,
  datum: Xc,
  on: tf,
  dispatch: rf,
  [Symbol.iterator]: af
};
function Zt(t) {
  return typeof t == "string" ? new te([[document.querySelector(t)]], [document.documentElement]) : new te([[t]], wr);
}
function Ji(t) {
  return typeof t == "string" ? new te([document.querySelectorAll(t)], [document.documentElement]) : new te([So(t)], wr);
}
function vr(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function zo(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function En() {
}
var yn = 0.7, Jn = 1 / yn, Je = "\\s*([+-]?\\d+)\\s*", bn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ve = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", sf = /^#([0-9a-f]{3,8})$/, lf = new RegExp(`^rgb\\(${Je},${Je},${Je}\\)$`), cf = new RegExp(`^rgb\\(${ve},${ve},${ve}\\)$`), ff = new RegExp(`^rgba\\(${Je},${Je},${Je},${bn}\\)$`), uf = new RegExp(`^rgba\\(${ve},${ve},${ve},${bn}\\)$`), hf = new RegExp(`^hsl\\(${bn},${ve},${ve}\\)$`), df = new RegExp(`^hsla\\(${bn},${ve},${ve},${bn}\\)$`), Gr = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
vr(En, He, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: qr,
  // Deprecated! Use color.formatHex.
  formatHex: qr,
  formatHex8: pf,
  formatHsl: _f,
  formatRgb: Zr,
  toString: Zr
});
function qr() {
  return this.rgb().formatHex();
}
function pf() {
  return this.rgb().formatHex8();
}
function _f() {
  return Po(this).formatHsl();
}
function Zr() {
  return this.rgb().formatRgb();
}
function He(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = sf.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Wr(e) : n === 3 ? new re(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Sn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Sn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = lf.exec(t)) ? new re(e[1], e[2], e[3], 1) : (e = cf.exec(t)) ? new re(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ff.exec(t)) ? Sn(e[1], e[2], e[3], e[4]) : (e = uf.exec(t)) ? Sn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = hf.exec(t)) ? Kr(e[1], e[2] / 100, e[3] / 100, 1) : (e = df.exec(t)) ? Kr(e[1], e[2] / 100, e[3] / 100, e[4]) : Gr.hasOwnProperty(t) ? Wr(Gr[t]) : t === "transparent" ? new re(NaN, NaN, NaN, 0) : null;
}
function Wr(t) {
  return new re(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Sn(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new re(t, e, n, i);
}
function mf(t) {
  return t instanceof En || (t = He(t)), t ? (t = t.rgb(), new re(t.r, t.g, t.b, t.opacity)) : new re();
}
function Qi(t, e, n, i) {
  return arguments.length === 1 ? mf(t) : new re(t, e, n, i ?? 1);
}
function re(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
vr(re, Qi, zo(En, {
  brighter(t) {
    return t = t == null ? Jn : Math.pow(Jn, t), new re(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? yn : Math.pow(yn, t), new re(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new re(ze(this.r), ze(this.g), ze(this.b), Qn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Yr,
  // Deprecated! Use color.formatHex.
  formatHex: Yr,
  formatHex8: gf,
  formatRgb: Xr,
  toString: Xr
}));
function Yr() {
  return `#${Ce(this.r)}${Ce(this.g)}${Ce(this.b)}`;
}
function gf() {
  return `#${Ce(this.r)}${Ce(this.g)}${Ce(this.b)}${Ce((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Xr() {
  const t = Qn(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ze(this.r)}, ${ze(this.g)}, ${ze(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Qn(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ze(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Ce(t) {
  return t = ze(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Kr(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new me(t, e, n, i);
}
function Po(t) {
  if (t instanceof me) return new me(t.h, t.s, t.l, t.opacity);
  if (t instanceof En || (t = He(t)), !t) return new me();
  if (t instanceof me) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), a = Math.max(e, n, i), o = NaN, s = a - r, c = (a + r) / 2;
  return s ? (e === a ? o = (n - i) / s + (n < i) * 6 : n === a ? o = (i - e) / s + 2 : o = (e - n) / s + 4, s /= c < 0.5 ? a + r : 2 - a - r, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new me(o, s, c, t.opacity);
}
function wf(t, e, n, i) {
  return arguments.length === 1 ? Po(t) : new me(t, e, n, i ?? 1);
}
function me(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
vr(me, wf, zo(En, {
  brighter(t) {
    return t = t == null ? Jn : Math.pow(Jn, t), new me(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? yn : Math.pow(yn, t), new me(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new re(
      yi(t >= 240 ? t - 240 : t + 120, r, i),
      yi(t, r, i),
      yi(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new me(Jr(this.h), Nn(this.s), Nn(this.l), Qn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Qn(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Jr(this.h)}, ${Nn(this.s) * 100}%, ${Nn(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Jr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Nn(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function yi(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const yr = (t) => () => t;
function vf(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function yf(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function bf(t) {
  return (t = +t) == 1 ? Ho : function(e, n) {
    return n - e ? yf(e, n, t) : yr(isNaN(e) ? n : e);
  };
}
function Ho(t, e) {
  var n = e - t;
  return n ? vf(t, n) : yr(isNaN(t) ? e : t);
}
const jn = function t(e) {
  var n = bf(e);
  function i(r, a) {
    var o = n((r = Qi(r)).r, (a = Qi(a)).r), s = n(r.g, a.g), c = n(r.b, a.b), f = Ho(r.opacity, a.opacity);
    return function(u) {
      return r.r = o(u), r.g = s(u), r.b = c(u), r.opacity = f(u), r + "";
    };
  }
  return i.gamma = t, i;
}(1);
function xf(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, i = e.slice(), r;
  return function(a) {
    for (r = 0; r < n; ++r) i[r] = t[r] * (1 - a) + e[r] * a;
    return i;
  };
}
function kf(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Tf(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, r = new Array(i), a = new Array(n), o;
  for (o = 0; o < i; ++o) r[o] = br(t[o], e[o]);
  for (; o < n; ++o) a[o] = e[o];
  return function(s) {
    for (o = 0; o < i; ++o) a[o] = r[o](s);
    return a;
  };
}
function Ef(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function _e(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Af(t, e) {
  var n = {}, i = {}, r;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (r in e)
    r in t ? n[r] = br(t[r], e[r]) : i[r] = e[r];
  return function(a) {
    for (r in n) i[r] = n[r](a);
    return i;
  };
}
var ji = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, bi = new RegExp(ji.source, "g");
function Sf(t) {
  return function() {
    return t;
  };
}
function Nf(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Bo(t, e) {
  var n = ji.lastIndex = bi.lastIndex = 0, i, r, a, o = -1, s = [], c = [];
  for (t = t + "", e = e + ""; (i = ji.exec(t)) && (r = bi.exec(e)); )
    (a = r.index) > n && (a = e.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (i = i[0]) === (r = r[0]) ? s[o] ? s[o] += r : s[++o] = r : (s[++o] = null, c.push({ i: o, x: _e(i, r) })), n = bi.lastIndex;
  return n < e.length && (a = e.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? Nf(c[0].x) : Sf(e) : (e = c.length, function(f) {
    for (var u = 0, m; u < e; ++u) s[(m = c[u]).i] = m.x(f);
    return s.join("");
  });
}
function br(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? yr(e) : (n === "number" ? _e : n === "string" ? (i = He(e)) ? (e = i, jn) : Bo : e instanceof He ? jn : e instanceof Date ? Ef : kf(e) ? xf : Array.isArray(e) ? Tf : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Af : _e)(t, e);
}
function Rf(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var Qr = 180 / Math.PI, tr = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Uo(t, e, n, i, r, a) {
  var o, s, c;
  return (o = Math.sqrt(t * t + e * e)) && (t /= o, e /= o), (c = t * n + e * i) && (n -= t * c, i -= e * c), (s = Math.sqrt(n * n + i * i)) && (n /= s, i /= s, c /= s), t * i < e * n && (t = -t, e = -e, c = -c, o = -o), {
    translateX: r,
    translateY: a,
    rotate: Math.atan2(e, t) * Qr,
    skewX: Math.atan(c) * Qr,
    scaleX: o,
    scaleY: s
  };
}
var Rn;
function If(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? tr : Uo(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Df(t) {
  return t == null || (Rn || (Rn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Rn.setAttribute("transform", t), !(t = Rn.transform.baseVal.consolidate())) ? tr : (t = t.matrix, Uo(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Vo(t, e, n, i) {
  function r(f) {
    return f.length ? f.pop() + " " : "";
  }
  function a(f, u, m, d, p, y) {
    if (f !== m || u !== d) {
      var O = p.push("translate(", null, e, null, n);
      y.push({ i: O - 4, x: _e(f, m) }, { i: O - 2, x: _e(u, d) });
    } else (m || d) && p.push("translate(" + m + e + d + n);
  }
  function o(f, u, m, d) {
    f !== u ? (f - u > 180 ? u += 360 : u - f > 180 && (f += 360), d.push({ i: m.push(r(m) + "rotate(", null, i) - 2, x: _e(f, u) })) : u && m.push(r(m) + "rotate(" + u + i);
  }
  function s(f, u, m, d) {
    f !== u ? d.push({ i: m.push(r(m) + "skewX(", null, i) - 2, x: _e(f, u) }) : u && m.push(r(m) + "skewX(" + u + i);
  }
  function c(f, u, m, d, p, y) {
    if (f !== m || u !== d) {
      var O = p.push(r(p) + "scale(", null, ",", null, ")");
      y.push({ i: O - 4, x: _e(f, m) }, { i: O - 2, x: _e(u, d) });
    } else (m !== 1 || d !== 1) && p.push(r(p) + "scale(" + m + "," + d + ")");
  }
  return function(f, u) {
    var m = [], d = [];
    return f = t(f), u = t(u), a(f.translateX, f.translateY, u.translateX, u.translateY, m, d), o(f.rotate, u.rotate, m, d), s(f.skewX, u.skewX, m, d), c(f.scaleX, f.scaleY, u.scaleX, u.scaleY, m, d), f = u = null, function(p) {
      for (var y = -1, O = d.length, D; ++y < O; ) m[(D = d[y]).i] = D.x(p);
      return m.join("");
    };
  };
}
var $f = Vo(If, "px, ", "px)", "deg)"), Mf = Vo(Df, ", ", ")", ")"), tn = 0, pn = 0, on = 0, Go = 1e3, ti, _n, ei = 0, Be = 0, ui = 0, xn = typeof performance == "object" && performance.now ? performance : Date, qo = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function xr() {
  return Be || (qo(Of), Be = xn.now() + ui);
}
function Of() {
  Be = 0;
}
function ni() {
  this._call = this._time = this._next = null;
}
ni.prototype = Zo.prototype = {
  constructor: ni,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? xr() : +n) + (e == null ? 0 : +e), !this._next && _n !== this && (_n ? _n._next = this : ti = this, _n = this), this._call = t, this._time = n, er();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, er());
  }
};
function Zo(t, e, n) {
  var i = new ni();
  return i.restart(t, e, n), i;
}
function Lf() {
  xr(), ++tn;
  for (var t = ti, e; t; )
    (e = Be - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --tn;
}
function jr() {
  Be = (ei = xn.now()) + ui, tn = pn = 0;
  try {
    Lf();
  } finally {
    tn = 0, Ff(), Be = 0;
  }
}
function Cf() {
  var t = xn.now(), e = t - ei;
  e > Go && (ui -= e, ei = t);
}
function Ff() {
  for (var t, e = ti, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ti = n);
  _n = t, er(i);
}
function er(t) {
  if (!tn) {
    pn && (pn = clearTimeout(pn));
    var e = t - Be;
    e > 24 ? (t < 1 / 0 && (pn = setTimeout(jr, t - xn.now() - ui)), on && (on = clearInterval(on))) : (on || (ei = xn.now(), on = setInterval(Cf, Go)), tn = 1, qo(jr));
  }
}
function ta(t, e, n) {
  var i = new ni();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var zf = Eo("start", "end", "cancel", "interrupt"), Pf = [], Wo = 0, ea = 1, nr = 2, Gn = 3, na = 4, ir = 5, qn = 6;
function hi(t, e, n, i, r, a) {
  var o = t.__transition;
  if (!o) t.__transition = {};
  else if (n in o) return;
  Hf(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: zf,
    tween: Pf,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: Wo
  });
}
function kr(t, e) {
  var n = ge(t, e);
  if (n.state > Wo) throw new Error("too late; already scheduled");
  return n;
}
function ye(t, e) {
  var n = ge(t, e);
  if (n.state > Gn) throw new Error("too late; already running");
  return n;
}
function ge(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Hf(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = Zo(a, 0, n.time);
  function a(f) {
    n.state = ea, n.timer.restart(o, n.delay, n.time), n.delay <= f && o(f - n.delay);
  }
  function o(f) {
    var u, m, d, p;
    if (n.state !== ea) return c();
    for (u in i)
      if (p = i[u], p.name === n.name) {
        if (p.state === Gn) return ta(o);
        p.state === na ? (p.state = qn, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete i[u]) : +u < e && (p.state = qn, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete i[u]);
      }
    if (ta(function() {
      n.state === Gn && (n.state = na, n.timer.restart(s, n.delay, n.time), s(f));
    }), n.state = nr, n.on.call("start", t, t.__data__, n.index, n.group), n.state === nr) {
      for (n.state = Gn, r = new Array(d = n.tween.length), u = 0, m = -1; u < d; ++u)
        (p = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++m] = p);
      r.length = m + 1;
    }
  }
  function s(f) {
    for (var u = f < n.duration ? n.ease.call(null, f / n.duration) : (n.timer.restart(c), n.state = ir, 1), m = -1, d = r.length; ++m < d; )
      r[m].call(t, u);
    n.state === ir && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = qn, n.timer.stop(), delete i[e];
    for (var f in i) return;
    delete t.__transition;
  }
}
function Bf(t, e) {
  var n = t.__transition, i, r, a = !0, o;
  if (n) {
    e = e == null ? null : e + "";
    for (o in n) {
      if ((i = n[o]).name !== e) {
        a = !1;
        continue;
      }
      r = i.state > nr && i.state < ir, i.state = qn, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[o];
    }
    a && delete t.__transition;
  }
}
function Uf(t) {
  return this.each(function() {
    Bf(this, t);
  });
}
function Vf(t, e) {
  var n, i;
  return function() {
    var r = ye(this, t), a = r.tween;
    if (a !== n) {
      i = n = a;
      for (var o = 0, s = i.length; o < s; ++o)
        if (i[o].name === e) {
          i = i.slice(), i.splice(o, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function Gf(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = ye(this, t), o = a.tween;
    if (o !== i) {
      r = (i = o).slice();
      for (var s = { name: e, value: n }, c = 0, f = r.length; c < f; ++c)
        if (r[c].name === e) {
          r[c] = s;
          break;
        }
      c === f && r.push(s);
    }
    a.tween = r;
  };
}
function qf(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = ge(this.node(), n).tween, r = 0, a = i.length, o; r < a; ++r)
      if ((o = i[r]).name === t)
        return o.value;
    return null;
  }
  return this.each((e == null ? Vf : Gf)(n, t, e));
}
function Tr(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = ye(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return ge(r, i).value[e];
  };
}
function Yo(t, e) {
  var n;
  return (typeof e == "number" ? _e : e instanceof He ? jn : (n = He(e)) ? (e = n, jn) : Bo)(t, e);
}
function Zf(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Wf(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Yf(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var o = this.getAttribute(t);
    return o === r ? null : o === i ? a : a = e(i = o, n);
  };
}
function Xf(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var o = this.getAttributeNS(t.space, t.local);
    return o === r ? null : o === i ? a : a = e(i = o, n);
  };
}
function Kf(t, e, n) {
  var i, r, a;
  return function() {
    var o, s = n(this), c;
    return s == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), c = s + "", o === c ? null : o === i && c === r ? a : (r = c, a = e(i = o, s)));
  };
}
function Jf(t, e, n) {
  var i, r, a;
  return function() {
    var o, s = n(this), c;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), c = s + "", o === c ? null : o === i && c === r ? a : (r = c, a = e(i = o, s)));
  };
}
function Qf(t, e) {
  var n = fi(t), i = n === "transform" ? Mf : Yo;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Jf : Kf)(n, i, Tr(this, "attr." + t, e)) : e == null ? (n.local ? Wf : Zf)(n) : (n.local ? Xf : Yf)(n, i, e));
}
function jf(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function tu(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function eu(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && tu(t, a)), n;
  }
  return r._value = e, r;
}
function nu(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && jf(t, a)), n;
  }
  return r._value = e, r;
}
function iu(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = fi(t);
  return this.tween(n, (i.local ? eu : nu)(i, e));
}
function ru(t, e) {
  return function() {
    kr(this, t).delay = +e.apply(this, arguments);
  };
}
function au(t, e) {
  return e = +e, function() {
    kr(this, t).delay = e;
  };
}
function ou(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ru : au)(e, t)) : ge(this.node(), e).delay;
}
function su(t, e) {
  return function() {
    ye(this, t).duration = +e.apply(this, arguments);
  };
}
function lu(t, e) {
  return e = +e, function() {
    ye(this, t).duration = e;
  };
}
function cu(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? su : lu)(e, t)) : ge(this.node(), e).duration;
}
function fu(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ye(this, t).ease = e;
  };
}
function uu(t) {
  var e = this._id;
  return arguments.length ? this.each(fu(e, t)) : ge(this.node(), e).ease;
}
function hu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ye(this, t).ease = n;
  };
}
function du(t) {
  if (typeof t != "function") throw new Error();
  return this.each(hu(this._id, t));
}
function pu(t) {
  typeof t != "function" && (t = Ro(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], o = a.length, s = i[r] = [], c, f = 0; f < o; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && s.push(c);
  return new Ae(i, this._parents, this._name, this._id);
}
function _u(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), o = new Array(i), s = 0; s < a; ++s)
    for (var c = e[s], f = n[s], u = c.length, m = o[s] = new Array(u), d, p = 0; p < u; ++p)
      (d = c[p] || f[p]) && (m[p] = d);
  for (; s < i; ++s)
    o[s] = e[s];
  return new Ae(o, this._parents, this._name, this._id);
}
function mu(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function gu(t, e, n) {
  var i, r, a = mu(e) ? kr : ye;
  return function() {
    var o = a(this, t), s = o.on;
    s !== i && (r = (i = s).copy()).on(e, n), o.on = r;
  };
}
function wu(t, e) {
  var n = this._id;
  return arguments.length < 2 ? ge(this.node(), n).on.on(t) : this.each(gu(n, t, e));
}
function vu(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function yu() {
  return this.on("end.remove", vu(this._id));
}
function bu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = mr(t));
  for (var i = this._groups, r = i.length, a = new Array(r), o = 0; o < r; ++o)
    for (var s = i[o], c = s.length, f = a[o] = new Array(c), u, m, d = 0; d < c; ++d)
      (u = s[d]) && (m = t.call(u, u.__data__, d, s)) && ("__data__" in u && (m.__data__ = u.__data__), f[d] = m, hi(f[d], e, n, d, f, ge(u, n)));
  return new Ae(a, this._parents, e, n);
}
function xu(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = No(t));
  for (var i = this._groups, r = i.length, a = [], o = [], s = 0; s < r; ++s)
    for (var c = i[s], f = c.length, u, m = 0; m < f; ++m)
      if (u = c[m]) {
        for (var d = t.call(u, u.__data__, m, c), p, y = ge(u, n), O = 0, D = d.length; O < D; ++O)
          (p = d[O]) && hi(p, e, n, O, d, y);
        a.push(d), o.push(u);
      }
  return new Ae(a, o, e, n);
}
var ku = Ge.prototype.constructor;
function Tu() {
  return new ku(this._groups, this._parents);
}
function Eu(t, e) {
  var n, i, r;
  return function() {
    var a = je(this, t), o = (this.style.removeProperty(t), je(this, t));
    return a === o ? null : a === n && o === i ? r : r = e(n = a, i = o);
  };
}
function Xo(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Au(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var o = je(this, t);
    return o === r ? null : o === i ? a : a = e(i = o, n);
  };
}
function Su(t, e, n) {
  var i, r, a;
  return function() {
    var o = je(this, t), s = n(this), c = s + "";
    return s == null && (c = s = (this.style.removeProperty(t), je(this, t))), o === c ? null : o === i && c === r ? a : (r = c, a = e(i = o, s));
  };
}
function Nu(t, e) {
  var n, i, r, a = "style." + e, o = "end." + a, s;
  return function() {
    var c = ye(this, t), f = c.on, u = c.value[a] == null ? s || (s = Xo(e)) : void 0;
    (f !== n || r !== u) && (i = (n = f).copy()).on(o, r = u), c.on = i;
  };
}
function Ru(t, e, n) {
  var i = (t += "") == "transform" ? $f : Yo;
  return e == null ? this.styleTween(t, Eu(t, i)).on("end.style." + t, Xo(t)) : typeof e == "function" ? this.styleTween(t, Su(t, i, Tr(this, "style." + t, e))).each(Nu(this._id, t)) : this.styleTween(t, Au(t, i, e), n).on("end.style." + t, null);
}
function Iu(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function Du(t, e, n) {
  var i, r;
  function a() {
    var o = e.apply(this, arguments);
    return o !== r && (i = (r = o) && Iu(t, o, n)), i;
  }
  return a._value = e, a;
}
function $u(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, Du(t, e, n ?? ""));
}
function Mu(t) {
  return function() {
    this.textContent = t;
  };
}
function Ou(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Lu(t) {
  return this.tween("text", typeof t == "function" ? Ou(Tr(this, "text", t)) : Mu(t == null ? "" : t + ""));
}
function Cu(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Fu(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && Cu(r)), e;
  }
  return i._value = t, i;
}
function zu(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Fu(t));
}
function Pu() {
  for (var t = this._name, e = this._id, n = Ko(), i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var o = i[a], s = o.length, c, f = 0; f < s; ++f)
      if (c = o[f]) {
        var u = ge(c, e);
        hi(c, t, n, f, o, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new Ae(i, this._parents, t, n);
}
function Hu() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(a, o) {
    var s = { value: o }, c = { value: function() {
      --r === 0 && a();
    } };
    n.each(function() {
      var f = ye(this, i), u = f.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(c)), f.on = e;
    }), r === 0 && a();
  });
}
var Bu = 0;
function Ae(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function Ko() {
  return ++Bu;
}
var xe = Ge.prototype;
Ae.prototype = {
  constructor: Ae,
  select: bu,
  selectAll: xu,
  selectChild: xe.selectChild,
  selectChildren: xe.selectChildren,
  filter: pu,
  merge: _u,
  selection: Tu,
  transition: Pu,
  call: xe.call,
  nodes: xe.nodes,
  node: xe.node,
  size: xe.size,
  empty: xe.empty,
  each: xe.each,
  on: wu,
  attr: Qf,
  attrTween: iu,
  style: Ru,
  styleTween: $u,
  text: Lu,
  textTween: zu,
  remove: yu,
  tween: qf,
  delay: ou,
  duration: cu,
  ease: uu,
  easeVarying: du,
  end: Hu,
  [Symbol.iterator]: xe[Symbol.iterator]
};
function Uu(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Vu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Uu
};
function Gu(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function qu(t) {
  var e, n;
  t instanceof Ae ? (e = t._id, t = t._name) : (e = Ko(), (n = Vu).time = xr(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var o = i[a], s = o.length, c, f = 0; f < s; ++f)
      (c = o[f]) && hi(c, t, e, f, o, n || Gu(c, e));
  return new Ae(i, this._parents, t, e);
}
Ge.prototype.interrupt = Uf;
Ge.prototype.transition = qu;
const rr = Math.PI, ar = 2 * rr, Le = 1e-6, Zu = ar - Le;
function Jo(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Wu(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return Jo;
  const n = 10 ** e;
  return function(i) {
    this._ += i[0];
    for (let r = 1, a = i.length; r < a; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class Yu {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Jo : Wu(e);
  }
  moveTo(e, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, n) {
    this._append`L${this._x1 = +e},${this._y1 = +n}`;
  }
  quadraticCurveTo(e, n, i, r) {
    this._append`Q${+e},${+n},${this._x1 = +i},${this._y1 = +r}`;
  }
  bezierCurveTo(e, n, i, r, a, o) {
    this._append`C${+e},${+n},${+i},${+r},${this._x1 = +a},${this._y1 = +o}`;
  }
  arcTo(e, n, i, r, a) {
    if (e = +e, n = +n, i = +i, r = +r, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let o = this._x1, s = this._y1, c = i - e, f = r - n, u = o - e, m = s - n, d = u * u + m * m;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (d > Le) if (!(Math.abs(m * c - f * u) > Le) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let p = i - o, y = r - s, O = c * c + f * f, D = p * p + y * y, S = Math.sqrt(O), x = Math.sqrt(d), k = a * Math.tan((rr - Math.acos((O + d - D) / (2 * S * x))) / 2), w = k / x, N = k / S;
      Math.abs(w - 1) > Le && this._append`L${e + w * u},${n + w * m}`, this._append`A${a},${a},0,0,${+(m * p > u * y)},${this._x1 = e + N * c},${this._y1 = n + N * f}`;
    }
  }
  arc(e, n, i, r, a, o) {
    if (e = +e, n = +n, i = +i, o = !!o, i < 0) throw new Error(`negative radius: ${i}`);
    let s = i * Math.cos(r), c = i * Math.sin(r), f = e + s, u = n + c, m = 1 ^ o, d = o ? r - a : a - r;
    this._x1 === null ? this._append`M${f},${u}` : (Math.abs(this._x1 - f) > Le || Math.abs(this._y1 - u) > Le) && this._append`L${f},${u}`, i && (d < 0 && (d = d % ar + ar), d > Zu ? this._append`A${i},${i},0,1,${m},${e - s},${n - c}A${i},${i},0,1,${m},${this._x1 = f},${this._y1 = u}` : d > Le && this._append`A${i},${i},0,${+(d >= rr)},${m},${this._x1 = e + i * Math.cos(a)},${this._y1 = n + i * Math.sin(a)}`);
  }
  rect(e, n, i, r) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function Xu(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function ii(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, i = t.slice(0, n);
  return [
    i.length > 1 ? i[0] + i.slice(2) : i,
    +t.slice(n + 1)
  ];
}
function en(t) {
  return t = ii(Math.abs(t)), t ? t[1] : NaN;
}
function Ku(t, e) {
  return function(n, i) {
    for (var r = n.length, a = [], o = 0, s = t[0], c = 0; r > 0 && s > 0 && (c + s + 1 > i && (s = Math.max(1, i - c)), a.push(n.substring(r -= s, r + s)), !((c += s + 1) > i)); )
      s = t[o = (o + 1) % t.length];
    return a.reverse().join(e);
  };
}
function Ju(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var Qu = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ri(t) {
  if (!(e = Qu.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Er({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
ri.prototype = Er.prototype;
function Er(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Er.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function ju(t) {
  t: for (var e = t.length, n = 1, i = -1, r; n < e; ++n)
    switch (t[n]) {
      case ".":
        i = r = n;
        break;
      case "0":
        i === 0 && (i = n), r = n;
        break;
      default:
        if (!+t[n]) break t;
        i > 0 && (i = 0);
        break;
    }
  return i > 0 ? t.slice(0, i) + t.slice(r + 1) : t;
}
var Qo;
function th(t, e) {
  var n = ii(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1], a = r - (Qo = Math.max(-8, Math.min(8, Math.floor(r / 3))) * 3) + 1, o = i.length;
  return a === o ? i : a > o ? i + new Array(a - o + 1).join("0") : a > 0 ? i.slice(0, a) + "." + i.slice(a) : "0." + new Array(1 - a).join("0") + ii(t, Math.max(0, e + a - 1))[0];
}
function ia(t, e) {
  var n = ii(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1];
  return r < 0 ? "0." + new Array(-r).join("0") + i : i.length > r + 1 ? i.slice(0, r + 1) + "." + i.slice(r + 1) : i + new Array(r - i.length + 2).join("0");
}
const ra = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: Xu,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => ia(t * 100, e),
  r: ia,
  s: th,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function aa(t) {
  return t;
}
var oa = Array.prototype.map, sa = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function eh(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? aa : Ku(oa.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? aa : Ju(oa.call(t.numerals, String)), o = t.percent === void 0 ? "%" : t.percent + "", s = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function f(m) {
    m = ri(m);
    var d = m.fill, p = m.align, y = m.sign, O = m.symbol, D = m.zero, S = m.width, x = m.comma, k = m.precision, w = m.trim, N = m.type;
    N === "n" ? (x = !0, N = "g") : ra[N] || (k === void 0 && (k = 12), w = !0, N = "g"), (D || d === "0" && p === "=") && (D = !0, d = "0", p = "=");
    var I = O === "$" ? n : O === "#" && /[boxX]/.test(N) ? "0" + N.toLowerCase() : "", A = O === "$" ? i : /[%p]/.test(N) ? o : "", F = ra[N], H = /[defgprs%]/.test(N);
    k = k === void 0 ? 6 : /[gprs]/.test(N) ? Math.max(1, Math.min(21, k)) : Math.max(0, Math.min(20, k));
    function C(v) {
      var z = I, P = A, Y, j, gt;
      if (N === "c")
        P = F(v) + P, v = "";
      else {
        v = +v;
        var X = v < 0 || 1 / v < 0;
        if (v = isNaN(v) ? c : F(Math.abs(v), k), w && (v = ju(v)), X && +v == 0 && y !== "+" && (X = !1), z = (X ? y === "(" ? y : s : y === "-" || y === "(" ? "" : y) + z, P = (N === "s" ? sa[8 + Qo / 3] : "") + P + (X && y === "(" ? ")" : ""), H) {
          for (Y = -1, j = v.length; ++Y < j; )
            if (gt = v.charCodeAt(Y), 48 > gt || gt > 57) {
              P = (gt === 46 ? r + v.slice(Y + 1) : v.slice(Y)) + P, v = v.slice(0, Y);
              break;
            }
        }
      }
      x && !D && (v = e(v, 1 / 0));
      var nt = z.length + v.length + P.length, Q = nt < S ? new Array(S - nt + 1).join(d) : "";
      switch (x && D && (v = e(Q + v, Q.length ? S - P.length : 1 / 0), Q = ""), p) {
        case "<":
          v = z + v + P + Q;
          break;
        case "=":
          v = z + Q + v + P;
          break;
        case "^":
          v = Q.slice(0, nt = Q.length >> 1) + z + v + P + Q.slice(nt);
          break;
        default:
          v = Q + z + v + P;
          break;
      }
      return a(v);
    }
    return C.toString = function() {
      return m + "";
    }, C;
  }
  function u(m, d) {
    var p = f((m = ri(m), m.type = "f", m)), y = Math.max(-8, Math.min(8, Math.floor(en(d) / 3))) * 3, O = Math.pow(10, -y), D = sa[8 + y / 3];
    return function(S) {
      return p(O * S) + D;
    };
  }
  return {
    format: f,
    formatPrefix: u
  };
}
var In, jo, ts;
nh({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function nh(t) {
  return In = eh(t), jo = In.format, ts = In.formatPrefix, In;
}
function ih(t) {
  return Math.max(0, -en(Math.abs(t)));
}
function rh(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(en(e) / 3))) * 3 - en(Math.abs(t)));
}
function ah(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, en(e) - en(t)) + 1;
}
function oh(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
function sh(t) {
  return function() {
    return t;
  };
}
function lh(t) {
  return +t;
}
var la = [0, 1];
function Ke(t) {
  return t;
}
function or(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : sh(isNaN(e) ? NaN : 0.5);
}
function ch(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(i) {
    return Math.max(t, Math.min(e, i));
  };
}
function fh(t, e, n) {
  var i = t[0], r = t[1], a = e[0], o = e[1];
  return r < i ? (i = or(r, i), a = n(o, a)) : (i = or(i, r), a = n(a, o)), function(s) {
    return a(i(s));
  };
}
function uh(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, r = new Array(i), a = new Array(i), o = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++o < i; )
    r[o] = or(t[o], t[o + 1]), a[o] = n(e[o], e[o + 1]);
  return function(s) {
    var c = dl(t, s, 1, i) - 1;
    return a[c](r[c](s));
  };
}
function hh(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function dh() {
  var t = la, e = la, n = br, i, r, a, o = Ke, s, c, f;
  function u() {
    var d = Math.min(t.length, e.length);
    return o !== Ke && (o = ch(t[0], t[d - 1])), s = d > 2 ? uh : fh, c = f = null, m;
  }
  function m(d) {
    return d == null || isNaN(d = +d) ? a : (c || (c = s(t.map(i), e, n)))(i(o(d)));
  }
  return m.invert = function(d) {
    return o(r((f || (f = s(e, t.map(i), _e)))(d)));
  }, m.domain = function(d) {
    return arguments.length ? (t = Array.from(d, lh), u()) : t.slice();
  }, m.range = function(d) {
    return arguments.length ? (e = Array.from(d), u()) : e.slice();
  }, m.rangeRound = function(d) {
    return e = Array.from(d), n = Rf, u();
  }, m.clamp = function(d) {
    return arguments.length ? (o = d ? !0 : Ke, u()) : o !== Ke;
  }, m.interpolate = function(d) {
    return arguments.length ? (n = d, u()) : n;
  }, m.unknown = function(d) {
    return arguments.length ? (a = d, m) : a;
  }, function(d, p) {
    return i = d, r = p, u();
  };
}
function ph() {
  return dh()(Ke, Ke);
}
function _h(t, e, n, i) {
  var r = wl(t, e, n), a;
  switch (i = ri(i ?? ",f"), i.type) {
    case "s": {
      var o = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(a = rh(r, o)) && (i.precision = a), ts(i, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(a = ah(r, Math.max(Math.abs(t), Math.abs(e)))) && (i.precision = a - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(a = ih(r)) && (i.precision = a - (i.type === "%") * 2);
      break;
    }
  }
  return jo(i);
}
function mh(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var i = e();
    return gl(i[0], i[i.length - 1], n ?? 10);
  }, t.tickFormat = function(n, i) {
    var r = e();
    return _h(r[0], r[r.length - 1], n ?? 10, i);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var i = e(), r = 0, a = i.length - 1, o = i[r], s = i[a], c, f, u = 10;
    for (s < o && (f = o, o = s, s = f, f = r, r = a, a = f); u-- > 0; ) {
      if (f = Yi(o, s, n), f === c)
        return i[r] = o, i[a] = s, e(i);
      if (f > 0)
        o = Math.floor(o / f) * f, s = Math.ceil(s / f) * f;
      else if (f < 0)
        o = Math.ceil(o * f) / f, s = Math.floor(s * f) / f;
      else
        break;
      c = f;
    }
    return t;
  }, t;
}
function Re() {
  var t = ph();
  return t.copy = function() {
    return hh(t, Re());
  }, oh.apply(t, arguments), mh(t);
}
function Dn(t) {
  return function() {
    return t;
  };
}
const Ar = Math.sqrt, es = Math.PI, gh = 2 * es;
function wh(t) {
  let e = 3;
  return t.digits = function(n) {
    if (!arguments.length) return e;
    if (n == null)
      e = null;
    else {
      const i = Math.floor(n);
      if (!(i >= 0)) throw new RangeError(`invalid digits: ${n}`);
      e = i;
    }
    return t;
  }, () => new Yu(e);
}
const vh = {
  draw(t, e) {
    const n = Ar(e / es);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, gh);
  }
}, xi = Ar(3), ns = {
  draw(t, e) {
    const n = -Ar(e / (xi * 3));
    t.moveTo(0, n * 2), t.lineTo(-xi * n, -n), t.lineTo(xi * n, -n), t.closePath();
  }
};
function is(t, e) {
  let n = null, i = wh(r);
  t = typeof t == "function" ? t : Dn(t || vh), e = typeof e == "function" ? e : Dn(e === void 0 ? 64 : +e);
  function r() {
    let a;
    if (n || (n = a = i()), t.apply(this, arguments).draw(n, +e.apply(this, arguments)), a) return n = null, a + "" || null;
  }
  return r.type = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Dn(a), r) : t;
  }, r.size = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Dn(+a), r) : e;
  }, r.context = function(a) {
    return arguments.length ? (n = a ?? null, r) : n;
  }, r;
}
function mn(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
mn.prototype = {
  constructor: mn,
  scale: function(t) {
    return t === 1 ? this : new mn(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new mn(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
mn.prototype;
function Sr(t, e, n) {
  let i = 0, r, a;
  if (t.length == 0)
    i = 1;
  else {
    for (let o = 1; o < t.length; o++) {
      for (const s of t[o]) {
        const [c, f] = s.split(":");
        if (n < +c || e > +f)
          a = 1;
        else {
          a = 0;
          break;
        }
      }
      if (a) {
        r = 1, i = o;
        break;
      }
    }
    r || (i = t.length);
  }
  return i;
}
function rs(t, e) {
  let n = -1, i = -1;
  for (const r of t) {
    const a = r.children;
    a && a.forEach((o) => {
      e.includes(o.type) && ((n < 0 || o.fmin < n) && (n = o.fmin), (i < 0 || o.fmax > i) && (i = o.fmax));
    });
  }
  return {
    fmin: n,
    fmax: i
  };
}
function di(t) {
  const n = t.attr("class").split(" "), i = `.${n[0]}.${n[1]} .track`, r = Ji(i).nodes();
  let a = 0;
  return r.forEach((o) => {
    a += o.getBoundingClientRect().height + 1;
  }), a;
}
function Nr(t, e) {
  var r;
  const n = ((r = e.node()) == null ? void 0 : r.getBBox().height) ?? 0;
  e.selectAll(
    ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
  ).filter((a) => {
    var s;
    let o = !1;
    return (s = a.alleles) != null && s.length && (a.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((f) => {
      t.includes(f) && (o = !0);
    }), a.alleles.forEach((f) => {
      t.includes(f) && (o = !0);
    })), o;
  }).datum((a) => (a.selected = "true", a)).style("stroke", "black").each(function() {
    let a = Zt(this).attr("x"), o = +Zt(this).attr("width");
    (o === 0 || Number.isNaN(o)) && (o = 3, a = String(+a - o / 2)), e.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", a).attr("width", o).attr("height", n).attr("fill", "yellow").attr("opacity", 0.8).lower();
  });
}
const yh = [
  "mRNA",
  "ncRNA",
  "piRNA",
  "lincRNA",
  "miRNA",
  "pre_miRNA",
  "snoRNA",
  "lnc_RNA",
  "tRNA",
  "snRNA",
  "rRNA",
  "ARS",
  "antisense_RNA",
  "C_gene_segment",
  "V_gene_segment",
  "pseudogene_attribute",
  "snoRNA_gene",
  "polypeptide_region",
  "mature_protein_region"
], bh = [
  "point_mutation",
  "MNV",
  "Deletion",
  "Insertion",
  "Delins"
];
function gn(t) {
  return t.replace(/\|/g, " ").replace(/"/g, "").replace(/^\[/, "").replace(/\]$/, "").trim();
}
const Zn = {
  transcript_ablation: {
    impact: "HIGH",
    color: "#ff0000"
  },
  splice_acceptor_variant: {
    impact: "HIGH",
    color: "#ff581a"
  },
  splice_donor_variant: {
    impact: "HIGH",
    color: "#ff581a"
  },
  stop_gained: {
    impact: "HIGH",
    color: "#ff0000"
  },
  frameshift_variant: {
    impact: "HIGH",
    color: "#9400D3"
  },
  stop_lost: {
    impact: "HIGH",
    color: "#ff0000"
  },
  start_lost: {
    impact: "HIGH",
    color: "#ffd700"
  },
  transcript_amplification: {
    impact: "HIGH",
    color: "#ff69b4"
  },
  inframe_insertion: {
    impact: "MODERATE",
    color: "#ff69b4"
  },
  inframe_deletion: {
    impact: "MODERATE",
    color: "#ff69b4"
  },
  missense_variant: {
    impact: "MODERATE",
    color: "#ffd700"
  },
  protein_altering_variant: {
    impact: "MODERATE",
    color: "#ff0080"
  },
  splice_region_variant: {
    impact: "LOW",
    color: "#ff7f50"
  },
  incomplete_terminal_codon_variant: {
    impact: "LOW",
    color: "#ff00ff"
  },
  start_retained_variant: {
    impact: "LOW",
    color: "#76ee00"
  },
  stop_retained_variant: {
    impact: "LOW",
    color: "#76ee00"
  },
  synonymous_variant: {
    impact: "LOW",
    color: "#76ee00"
  },
  coding_sequence_variant: {
    impact: "MODIFIER",
    color: "#458b00"
  },
  mature_miRNA_variant: {
    impact: "MODIFIER",
    color: "#458b00"
  },
  five_prime_UTR_variant: {
    impact: "MODIFIER",
    color: "#7ac5cd"
  },
  three_prime_UTR_variant: {
    impact: "MODIFIER",
    color: "#7ac5cd"
  },
  non_coding_transcript_exon_variant: {
    impact: "MODIFIER",
    color: "#32cd32"
  },
  intron_variant: {
    impact: "MODIFIER",
    color: "#02599c"
  },
  NMD_transcript_variant: {
    impact: "MODIFIER",
    color: "#ff4500"
  },
  non_coding_transcript_variant: {
    impact: "MODIFIER",
    color: "#32cd32"
  },
  upstream_gene_variant: {
    impact: "MODIFIER",
    color: "#a2b5cd"
  },
  downstream_gene_variant: {
    impact: "MODIFIER",
    color: "#a2b5cd"
  },
  TFBS_ablation: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  TFBS_amplification: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  TF_binding_site_variant: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  regulatory_region_ablation: {
    impact: "MODERATE",
    color: "#a52a2a"
  },
  regulatory_region_amplification: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  feature_elongation: {
    impact: "MODIFIER",
    color: "#7f7f7f"
  },
  regulatory_region_variant: {
    impact: "MODIFIER",
    color: "#a52a2a"
  },
  feature_truncation: {
    impact: "MODIFIER",
    color: "#7f7f7f"
  },
  intergenic_variant: {
    impact: "MODIFIER",
    color: "#636363"
  }
};
function as(t) {
  if (!t)
    return "black";
  const e = gn(t);
  if (e.split(" ").length > 1 || e.split("|").length > 1) {
    const i = e.includes("|") ? e.split("|")[0].trim() : e.split(" ")[0].trim();
    return as(i);
  }
  if (e === "UNKNOWN")
    return "gray";
  const n = Zn[e];
  return n ? n.color : e === "5_prime_UTR_variant" ? Zn.five_prime_UTR_variant.color : e === "3_prime_UTR_variant" ? Zn.three_prime_UTR_variant.color : "#f0f";
}
const Pe = 10, Ne = 10;
function Rr(t) {
  return `${t},${Pe} ${t + Ne / 2},${Pe / 2} ${t},0 ${t - Ne / 2},${Pe / 2}`;
}
function os(t) {
  return `${t - Ne / 2},${Pe} ${t},0 ${t + Ne / 2},${Pe}`;
}
function ss(t) {
  return `${t - Ne / 2},${Pe} ${t + Ne / 2},${Pe} ${t - Ne / 2},0 ${t + Ne / 2},0`;
}
function xh(t) {
  const e = Object.keys(t).length;
  return {
    descriptionWidth: Math.max(
      ...Object.entries(t).map((i) => {
        var r;
        return ((r = i[1]) == null ? void 0 : r.length) ?? 0;
      })
    ),
    descriptionHeight: e
  };
}
function kh(t, e, n) {
  const { fmax: i, fmin: r, type: a } = e;
  return t.findIndex((o) => {
    const s = o.fmin + n, c = o.fmax - n;
    return a !== o.type ? !1 : s <= r && c >= r || c <= i && c >= i || s >= r && c <= i;
  });
}
function ls(t, e) {
  const n = [];
  return t.forEach((i) => {
    const r = hs(i), { type: a, fmax: o, fmin: s } = i, c = kh(
      n,
      i,
      e
    );
    if (c >= 0 && a != "deletion") {
      const f = n[c], u = f.variantSet ? f.variantSet.findIndex(
        (m) => m.type === a && m.consequence === r
      ) : -1;
      if (u >= 0) {
        const m = Math.min(
          f.variantSet[u].fmin,
          s
        ), d = Math.max(
          f.variantSet[u].fmax,
          o
        );
        f.fmin = m, f.fmax = d, f.variantSet[u].fmin = m, f.variantSet[u].fmax = d, f.variantSet[u].variants.push(i);
      } else {
        const m = Math.min(f.fmin, s), d = Math.max(f.fmax, o);
        f.fmin = m, f.fmax = d, f.variantSet.push({
          variants: [i],
          type: a,
          consequence: r,
          fmin: s,
          fmax: o
        });
      }
      f.variants.push(i), f.fmin = Math.min(s, f.fmin), f.fmax = Math.max(o, f.fmax), n[c] = f;
    } else
      n.push({
        fmin: s,
        fmax: o,
        type: a,
        consequence: r,
        variantSet: [
          // @ts-expect-error
          {
            variants: [i],
            type: a,
            consequence: r,
            fmin: s,
            fmax: o
          }
        ],
        variants: [i]
      });
  }), n;
}
function cs(t) {
  if (t.length === 1) {
    let e = '<div style="margin-top: 30px;">';
    return e += ca(t[0]), e += "</div>", e;
  } else if (t.length > 1) {
    let e = '<ul style="list-style-type: none; margin-top: 30px;">';
    for (const n of t)
      e += `<li style="border-bottom: solid 1px black;">${ca(n)}</li>`;
    return e += "</ul>", e;
  } else
    return "No data available";
}
function ca(t) {
  const { descriptionWidth: e } = xh(t);
  let n = "";
  const i = t.location, [r, a] = i.split(":")[1].split("..");
  let o = t.alternative_alleles, s = t.reference_allele, c;
  if (t.type === "SNV")
    c = "1bp";
  else if (t.type === "deletion")
    c = `${s.length - 1}bp deleted`;
  else if (t.type === "insertion")
    o === "ALT_MISSING" ? (c = "unknown length inserted", o = "n+") : c = `${o.length - 1}bp inserted`;
  else if (t.type === "MNV")
    c = `${s.length}bp`;
  else if (t.type === "delins") {
    const u = `${s.length - 1}bp deleted`;
    let m;
    o === "ALT_MISSING" ? (m = "unknown length inserted", o = "n+") : m = `${o.length - 1}bp inserted`, c = `${u}; ${m}`;
  } else
    c = `${+a - +r}bp`;
  s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (o = o.toUpperCase(), s = s.toUpperCase());
  let f = "";
  return t.type === "insertion" ? f = `ins: ${o}` : t.type === "deletion" ? f = `del: ${s}` : f = `${s}->${o}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td>${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${c}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td>${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${f}</td></tr>`), n += "</tbody></table>", n;
}
function fs(t) {
  return (t.variants ?? []).map((n) => {
    const i = Th(n);
    return {
      ...i,
      consequence: i.consequence || "UNKNOWN"
    };
  });
}
function sr(t) {
  return (t.variants ?? []).flatMap((e) => {
    var r, a;
    const n = (a = (r = e.allele_ids) == null ? void 0 : r.values) == null ? void 0 : a[0];
    if (!n) return [];
    if (n.startsWith("[") && n.endsWith("]"))
      try {
        const o = JSON.parse(n);
        return (Array.isArray(o) ? o : [o]).map(String);
      } catch {
      }
    const i = n.replace(/"/g, "");
    return i == null ? void 0 : i.split(",").map((o) => o.replace(/\[|\]| /g, ""));
  }).filter((e) => !!e);
}
function us(t) {
  return t.map((e) => as(e.consequence));
}
function hs(t) {
  var n;
  if ((n = t.geneLevelConsequence) != null && n.values && t.geneLevelConsequence.values.length > 0)
    return gn(t.geneLevelConsequence.values[0]);
  if (t.consequence && typeof t.consequence == "string")
    return gn(t.consequence);
  if (Array.isArray(t.consequence) && t.consequence.length > 0)
    return gn(t.consequence[0]);
  const e = t.variants ?? [];
  if (e.length > 0) {
    for (const i of e)
      if (i.consequence && typeof i.consequence == "string")
        return gn(i.consequence);
  }
  return "UNKNOWN";
}
function $n(t) {
  return (Array.isArray(t == null ? void 0 : t.values) ? t.values.join(" ") : t == null ? void 0 : t.values) ?? "";
}
function Th(t) {
  var e, n;
  return {
    symbol: pi(t),
    symbolDetail: ds(t),
    location: `${t.seqId}:${t.fmin}..${t.fmax}`,
    consequence: hs(t),
    type: t.type,
    name: t.name,
    description: t.description,
    reference_allele: t.reference_allele,
    geneId: (e = t.allele_of_gene_ids) == null ? void 0 : e.values[0].replace(/"/g, ""),
    geneSymbol: (n = t.allele_of_gene_symbols) == null ? void 0 : n.values[0].replace(/"/g, ""),
    allele_of_genes: $n(t.allele_of_genes),
    allele_ids: $n(t.allele_ids),
    alternative_alleles: $n(t.alternative_alleles),
    impact: $n(t.impact)
  };
}
function ds(t) {
  var e, n, i;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : ds(t.variants[0]);
  if ((e = t.allele_symbols) != null && e.values)
    if (t.allele_symbols.values[0].split(",").length > 1)
      try {
        const r = [], a = t.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          ""
        ), o = ((n = t.allele_ids) == null ? void 0 : n.values[0].replace(/"|\[|\]/g, "")) ?? "", s = a.split(","), c = o.split(",");
        for (let f = 0; f < c.length; f++)
          r.push(
            `${s[f].trim()} (${c[f].trim()})`
          );
        return r.join(", ");
      } catch {
        return `${t.allele_symbols.values[0].split(",").length}`;
      }
    else
      return `${t.allele_symbols.values[0].replace(/"/g, "")}(${(i = t.allele_ids) == null ? void 0 : i.values[0].replace(
        /"|\[|\]/g,
        ""
      )})`;
  return "";
}
function pi(t) {
  var e;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : pi(t.variants[0]);
  if ((e = t.allele_symbols_text) != null && e.values) {
    const n = t.allele_symbols_text.values[0].split(",");
    return n.length > 1 ? `${n.length}` : t.allele_symbols_text.values[0].replace(/"/g, "");
  }
  return "";
}
function lr(t, e) {
  return `<svg width="15" top="3" viewBox="0 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><rect fill="${t}" stroke="none" height="10" width="10"></svg>${e}</polygons></svg>`;
}
function Vt(t) {
  return t == "unknown" ? lr("grey", t.replace(/_/g, " ")) : lr(
    Zn[t].color,
    t.replace(/_/g, " ")
  );
}
function Eh() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${Rr(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${lr("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${os(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ss(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Vt("transcript_ablation")}</li>`, t += `<li>${Vt("splice_acceptor_variant")}</li>`, t += `<li>${Vt("splice_donor_variant")}</li>`, t += `<li>${Vt("stop_gained")}</li>`, t += `<li>${Vt("frameshift_variant")}</li>`, t += `<li>${Vt("stop_lost")}</li>`, t += `<li>${Vt("start_lost")}</li>`, t += `<li>${Vt("inframe_insertion")}</li>`, t += `<li>${Vt("inframe_deletion")}</li>`, t += `<li>${Vt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Vt("protein_altering_variant")}</li>`, t += `<li>${Vt("splice_region_variant")}</li>`, t += `<li>${Vt("start_retained_variant")}</li>`, t += `<li>${Vt("stop_retained_variant")}</li>`, t += `<li>${Vt("synonymous_variant")}</li>`, t += `<li>${Vt("coding_sequence_variant")}</li>`, t += `<li>${Vt("five_prime_UTR_variant")}</li>`, t += `<li>${Vt("three_prime_UTR_variant")}</li>`, t += `<li>${Vt("intron_variant")}</li>`, t += `<li>${Vt("non_coding_transcript_variant")}</li>`, t += `<li>${Vt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
/*! @license DOMPurify 3.2.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.6/LICENSE */
const {
  entries: ps,
  setPrototypeOf: fa,
  isFrozen: Ah,
  getPrototypeOf: Sh,
  getOwnPropertyDescriptor: Nh
} = Object;
let {
  freeze: ee,
  seal: ue,
  create: _s
} = Object, {
  apply: cr,
  construct: fr
} = typeof Reflect < "u" && Reflect;
ee || (ee = function(e) {
  return e;
});
ue || (ue = function(e) {
  return e;
});
cr || (cr = function(e, n, i) {
  return e.apply(n, i);
});
fr || (fr = function(e, n) {
  return new e(...n);
});
const Mn = ne(Array.prototype.forEach), Rh = ne(Array.prototype.lastIndexOf), ua = ne(Array.prototype.pop), sn = ne(Array.prototype.push), Ih = ne(Array.prototype.splice), Wn = ne(String.prototype.toLowerCase), ki = ne(String.prototype.toString), ha = ne(String.prototype.match), ln = ne(String.prototype.replace), Dh = ne(String.prototype.indexOf), $h = ne(String.prototype.trim), pe = ne(Object.prototype.hasOwnProperty), jt = ne(RegExp.prototype.test), cn = Mh(TypeError);
function ne(t) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
      i[r - 1] = arguments[r];
    return cr(t, e, i);
  };
}
function Mh(t) {
  return function() {
    for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++)
      n[i] = arguments[i];
    return fr(t, n);
  };
}
function xt(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Wn;
  fa && fa(t, null);
  let i = e.length;
  for (; i--; ) {
    let r = e[i];
    if (typeof r == "string") {
      const a = n(r);
      a !== r && (Ah(e) || (e[i] = a), r = a);
    }
    t[r] = !0;
  }
  return t;
}
function Oh(t) {
  for (let e = 0; e < t.length; e++)
    pe(t, e) || (t[e] = null);
  return t;
}
function Te(t) {
  const e = _s(null);
  for (const [n, i] of ps(t))
    pe(t, n) && (Array.isArray(i) ? e[n] = Oh(i) : i && typeof i == "object" && i.constructor === Object ? e[n] = Te(i) : e[n] = i);
  return e;
}
function fn(t, e) {
  for (; t !== null; ) {
    const i = Nh(t, e);
    if (i) {
      if (i.get)
        return ne(i.get);
      if (typeof i.value == "function")
        return ne(i.value);
    }
    t = Sh(t);
  }
  function n() {
    return null;
  }
  return n;
}
const da = ee(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Ti = ee(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Ei = ee(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Lh = ee(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), Ai = ee(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Ch = ee(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), pa = ee(["#text"]), _a = ee(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), Si = ee(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), ma = ee(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), On = ee(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Fh = ue(/\{\{[\w\W]*|[\w\W]*\}\}/gm), zh = ue(/<%[\w\W]*|[\w\W]*%>/gm), Ph = ue(/\$\{[\w\W]*/gm), Hh = ue(/^data-[\-\w.\u00B7-\uFFFF]+$/), Bh = ue(/^aria-[\-\w]+$/), ms = ue(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Uh = ue(/^(?:\w+script|data):/i), Vh = ue(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), gs = ue(/^html$/i), Gh = ue(/^[a-z][.\w]*(-[.\w]+)+$/i);
var ga = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Bh,
  ATTR_WHITESPACE: Vh,
  CUSTOM_ELEMENT: Gh,
  DATA_ATTR: Hh,
  DOCTYPE_NAME: gs,
  ERB_EXPR: zh,
  IS_ALLOWED_URI: ms,
  IS_SCRIPT_OR_DATA: Uh,
  MUSTACHE_EXPR: Fh,
  TMPLIT_EXPR: Ph
});
const un = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, qh = function() {
  return typeof window > "u" ? null : window;
}, Zh = function(e, n) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let i = null;
  const r = "data-tt-policy-suffix";
  n && n.hasAttribute(r) && (i = n.getAttribute(r));
  const a = "dompurify" + (i ? "#" + i : "");
  try {
    return e.createPolicy(a, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + a + " could not be created."), null;
  }
}, wa = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function ws() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : qh();
  const e = (ut) => ws(ut);
  if (e.version = "3.2.6", e.removed = [], !t || !t.document || t.document.nodeType !== un.document || !t.Element)
    return e.isSupported = !1, e;
  let {
    document: n
  } = t;
  const i = n, r = i.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: o,
    Node: s,
    Element: c,
    NodeFilter: f,
    NamedNodeMap: u = t.NamedNodeMap || t.MozNamedAttrMap,
    HTMLFormElement: m,
    DOMParser: d,
    trustedTypes: p
  } = t, y = c.prototype, O = fn(y, "cloneNode"), D = fn(y, "remove"), S = fn(y, "nextSibling"), x = fn(y, "childNodes"), k = fn(y, "parentNode");
  if (typeof o == "function") {
    const ut = n.createElement("template");
    ut.content && ut.content.ownerDocument && (n = ut.content.ownerDocument);
  }
  let w, N = "";
  const {
    implementation: I,
    createNodeIterator: A,
    createDocumentFragment: F,
    getElementsByTagName: H
  } = n, {
    importNode: C
  } = i;
  let v = wa();
  e.isSupported = typeof ps == "function" && typeof k == "function" && I && I.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: z,
    ERB_EXPR: P,
    TMPLIT_EXPR: Y,
    DATA_ATTR: j,
    ARIA_ATTR: gt,
    IS_SCRIPT_OR_DATA: X,
    ATTR_WHITESPACE: nt,
    CUSTOM_ELEMENT: Q
  } = ga;
  let {
    IS_ALLOWED_URI: at
  } = ga, yt = null;
  const tt = xt({}, [...da, ...Ti, ...Ei, ...Ai, ...pa]);
  let ot = null;
  const Et = xt({}, [..._a, ...Si, ...ma, ...On]);
  let ht = Object.seal(_s(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), lt = null, pt = null, et = !0, wt = !0, Rt = !1, Nt = !0, ft = !1, G = !0, vt = !1, It = !1, dt = !1, mt = !1, q = !1, kt = !1, Wt = !0, Mt = !1;
  const Ft = "user-content-";
  let Kt = !0, rt = !1, At = {}, Dt = null;
  const _t = xt({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let $t = null;
  const zt = xt({}, ["audio", "video", "img", "source", "image", "track"]);
  let Pt = null;
  const g = xt({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), B = "http://www.w3.org/1998/Math/MathML", U = "http://www.w3.org/2000/svg", W = "http://www.w3.org/1999/xhtml";
  let T = W, L = !1, h = null;
  const V = xt({}, [B, U, W], ki);
  let ct = xt({}, ["mi", "mo", "mn", "ms", "mtext"]), l = xt({}, ["annotation-xml"]);
  const $ = xt({}, ["title", "style", "font", "a", "script"]);
  let M = null;
  const _ = ["application/xhtml+xml", "text/html"], b = "text/html";
  let R = null, it = null;
  const K = n.createElement("form"), J = function(E) {
    return E instanceof RegExp || E instanceof Function;
  }, bt = function() {
    let E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(it && it === E)) {
      if ((!E || typeof E != "object") && (E = {}), E = Te(E), M = // eslint-disable-next-line unicorn/prefer-includes
      _.indexOf(E.PARSER_MEDIA_TYPE) === -1 ? b : E.PARSER_MEDIA_TYPE, R = M === "application/xhtml+xml" ? ki : Wn, yt = pe(E, "ALLOWED_TAGS") ? xt({}, E.ALLOWED_TAGS, R) : tt, ot = pe(E, "ALLOWED_ATTR") ? xt({}, E.ALLOWED_ATTR, R) : Et, h = pe(E, "ALLOWED_NAMESPACES") ? xt({}, E.ALLOWED_NAMESPACES, ki) : V, Pt = pe(E, "ADD_URI_SAFE_ATTR") ? xt(Te(g), E.ADD_URI_SAFE_ATTR, R) : g, $t = pe(E, "ADD_DATA_URI_TAGS") ? xt(Te(zt), E.ADD_DATA_URI_TAGS, R) : zt, Dt = pe(E, "FORBID_CONTENTS") ? xt({}, E.FORBID_CONTENTS, R) : _t, lt = pe(E, "FORBID_TAGS") ? xt({}, E.FORBID_TAGS, R) : Te({}), pt = pe(E, "FORBID_ATTR") ? xt({}, E.FORBID_ATTR, R) : Te({}), At = pe(E, "USE_PROFILES") ? E.USE_PROFILES : !1, et = E.ALLOW_ARIA_ATTR !== !1, wt = E.ALLOW_DATA_ATTR !== !1, Rt = E.ALLOW_UNKNOWN_PROTOCOLS || !1, Nt = E.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ft = E.SAFE_FOR_TEMPLATES || !1, G = E.SAFE_FOR_XML !== !1, vt = E.WHOLE_DOCUMENT || !1, mt = E.RETURN_DOM || !1, q = E.RETURN_DOM_FRAGMENT || !1, kt = E.RETURN_TRUSTED_TYPE || !1, dt = E.FORCE_BODY || !1, Wt = E.SANITIZE_DOM !== !1, Mt = E.SANITIZE_NAMED_PROPS || !1, Kt = E.KEEP_CONTENT !== !1, rt = E.IN_PLACE || !1, at = E.ALLOWED_URI_REGEXP || ms, T = E.NAMESPACE || W, ct = E.MATHML_TEXT_INTEGRATION_POINTS || ct, l = E.HTML_INTEGRATION_POINTS || l, ht = E.CUSTOM_ELEMENT_HANDLING || {}, E.CUSTOM_ELEMENT_HANDLING && J(E.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (ht.tagNameCheck = E.CUSTOM_ELEMENT_HANDLING.tagNameCheck), E.CUSTOM_ELEMENT_HANDLING && J(E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (ht.attributeNameCheck = E.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), E.CUSTOM_ELEMENT_HANDLING && typeof E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (ht.allowCustomizedBuiltInElements = E.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ft && (wt = !1), q && (mt = !0), At && (yt = xt({}, pa), ot = [], At.html === !0 && (xt(yt, da), xt(ot, _a)), At.svg === !0 && (xt(yt, Ti), xt(ot, Si), xt(ot, On)), At.svgFilters === !0 && (xt(yt, Ei), xt(ot, Si), xt(ot, On)), At.mathMl === !0 && (xt(yt, Ai), xt(ot, ma), xt(ot, On))), E.ADD_TAGS && (yt === tt && (yt = Te(yt)), xt(yt, E.ADD_TAGS, R)), E.ADD_ATTR && (ot === Et && (ot = Te(ot)), xt(ot, E.ADD_ATTR, R)), E.ADD_URI_SAFE_ATTR && xt(Pt, E.ADD_URI_SAFE_ATTR, R), E.FORBID_CONTENTS && (Dt === _t && (Dt = Te(Dt)), xt(Dt, E.FORBID_CONTENTS, R)), Kt && (yt["#text"] = !0), vt && xt(yt, ["html", "head", "body"]), yt.table && (xt(yt, ["tbody"]), delete lt.tbody), E.TRUSTED_TYPES_POLICY) {
        if (typeof E.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw cn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof E.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw cn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        w = E.TRUSTED_TYPES_POLICY, N = w.createHTML("");
      } else
        w === void 0 && (w = Zh(p, r)), w !== null && typeof N == "string" && (N = w.createHTML(""));
      ee && ee(E), it = E;
    }
  }, se = xt({}, [...Ti, ...Ei, ...Lh]), Ot = xt({}, [...Ai, ...Ch]), Tt = function(E) {
    let Z = k(E);
    (!Z || !Z.tagName) && (Z = {
      namespaceURI: T,
      tagName: "template"
    });
    const st = Wn(E.tagName), Lt = Wn(Z.tagName);
    return h[E.namespaceURI] ? E.namespaceURI === U ? Z.namespaceURI === W ? st === "svg" : Z.namespaceURI === B ? st === "svg" && (Lt === "annotation-xml" || ct[Lt]) : !!se[st] : E.namespaceURI === B ? Z.namespaceURI === W ? st === "math" : Z.namespaceURI === U ? st === "math" && l[Lt] : !!Ot[st] : E.namespaceURI === W ? Z.namespaceURI === U && !l[Lt] || Z.namespaceURI === B && !ct[Lt] ? !1 : !Ot[st] && ($[st] || !se[st]) : !!(M === "application/xhtml+xml" && h[E.namespaceURI]) : !1;
  }, St = function(E) {
    sn(e.removed, {
      element: E
    });
    try {
      k(E).removeChild(E);
    } catch {
      D(E);
    }
  }, Ht = function(E, Z) {
    try {
      sn(e.removed, {
        attribute: Z.getAttributeNode(E),
        from: Z
      });
    } catch {
      sn(e.removed, {
        attribute: null,
        from: Z
      });
    }
    if (Z.removeAttribute(E), E === "is")
      if (mt || q)
        try {
          St(Z);
        } catch {
        }
      else
        try {
          Z.setAttribute(E, "");
        } catch {
        }
  }, Xt = function(E) {
    let Z = null, st = null;
    if (dt)
      E = "<remove></remove>" + E;
    else {
      const Yt = ha(E, /^[\r\n\t ]+/);
      st = Yt && Yt[0];
    }
    M === "application/xhtml+xml" && T === W && (E = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + E + "</body></html>");
    const Lt = w ? w.createHTML(E) : E;
    if (T === W)
      try {
        Z = new d().parseFromString(Lt, M);
      } catch {
      }
    if (!Z || !Z.documentElement) {
      Z = I.createDocument(T, "template", null);
      try {
        Z.documentElement.innerHTML = L ? N : Lt;
      } catch {
      }
    }
    const Jt = Z.body || Z.documentElement;
    return E && st && Jt.insertBefore(n.createTextNode(st), Jt.childNodes[0] || null), T === W ? H.call(Z, vt ? "html" : "body")[0] : vt ? Z.documentElement : Jt;
  }, De = function(E) {
    return A.call(
      E.ownerDocument || E,
      E,
      // eslint-disable-next-line no-bitwise
      f.SHOW_ELEMENT | f.SHOW_COMMENT | f.SHOW_TEXT | f.SHOW_PROCESSING_INSTRUCTION | f.SHOW_CDATA_SECTION,
      null
    );
  }, Se = function(E) {
    return E instanceof m && (typeof E.nodeName != "string" || typeof E.textContent != "string" || typeof E.removeChild != "function" || !(E.attributes instanceof u) || typeof E.removeAttribute != "function" || typeof E.setAttribute != "function" || typeof E.namespaceURI != "string" || typeof E.insertBefore != "function" || typeof E.hasChildNodes != "function");
  }, Bt = function(E) {
    return typeof s == "function" && E instanceof s;
  };
  function Ut(ut, E, Z) {
    Mn(ut, (st) => {
      st.call(e, E, Z, it);
    });
  }
  const Gt = function(E) {
    let Z = null;
    if (Ut(v.beforeSanitizeElements, E, null), Se(E))
      return St(E), !0;
    const st = R(E.nodeName);
    if (Ut(v.uponSanitizeElement, E, {
      tagName: st,
      allowedTags: yt
    }), G && E.hasChildNodes() && !Bt(E.firstElementChild) && jt(/<[/\w!]/g, E.innerHTML) && jt(/<[/\w!]/g, E.textContent) || E.nodeType === un.progressingInstruction || G && E.nodeType === un.comment && jt(/<[/\w]/g, E.data))
      return St(E), !0;
    if (!yt[st] || lt[st]) {
      if (!lt[st] && ae(st) && (ht.tagNameCheck instanceof RegExp && jt(ht.tagNameCheck, st) || ht.tagNameCheck instanceof Function && ht.tagNameCheck(st)))
        return !1;
      if (Kt && !Dt[st]) {
        const Lt = k(E) || E.parentNode, Jt = x(E) || E.childNodes;
        if (Jt && Lt) {
          const Yt = Jt.length;
          for (let ie = Yt - 1; ie >= 0; --ie) {
            const be = O(Jt[ie], !0);
            be.__removalCount = (E.__removalCount || 0) + 1, Lt.insertBefore(be, S(E));
          }
        }
      }
      return St(E), !0;
    }
    return E instanceof c && !Tt(E) || (st === "noscript" || st === "noembed" || st === "noframes") && jt(/<\/no(script|embed|frames)/i, E.innerHTML) ? (St(E), !0) : (ft && E.nodeType === un.text && (Z = E.textContent, Mn([z, P, Y], (Lt) => {
      Z = ln(Z, Lt, " ");
    }), E.textContent !== Z && (sn(e.removed, {
      element: E.cloneNode()
    }), E.textContent = Z)), Ut(v.afterSanitizeElements, E, null), !1);
  }, le = function(E, Z, st) {
    if (Wt && (Z === "id" || Z === "name") && (st in n || st in K))
      return !1;
    if (!(wt && !pt[Z] && jt(j, Z))) {
      if (!(et && jt(gt, Z))) {
        if (!ot[Z] || pt[Z]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(ae(E) && (ht.tagNameCheck instanceof RegExp && jt(ht.tagNameCheck, E) || ht.tagNameCheck instanceof Function && ht.tagNameCheck(E)) && (ht.attributeNameCheck instanceof RegExp && jt(ht.attributeNameCheck, Z) || ht.attributeNameCheck instanceof Function && ht.attributeNameCheck(Z)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            Z === "is" && ht.allowCustomizedBuiltInElements && (ht.tagNameCheck instanceof RegExp && jt(ht.tagNameCheck, st) || ht.tagNameCheck instanceof Function && ht.tagNameCheck(st)))
          ) return !1;
        } else if (!Pt[Z]) {
          if (!jt(at, ln(st, nt, ""))) {
            if (!((Z === "src" || Z === "xlink:href" || Z === "href") && E !== "script" && Dh(st, "data:") === 0 && $t[E])) {
              if (!(Rt && !jt(X, ln(st, nt, "")))) {
                if (st)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, ae = function(E) {
    return E !== "annotation-xml" && ha(E, Q);
  }, rn = function(E) {
    Ut(v.beforeSanitizeAttributes, E, null);
    const {
      attributes: Z
    } = E;
    if (!Z || Se(E))
      return;
    const st = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: ot,
      forceKeepAttr: void 0
    };
    let Lt = Z.length;
    for (; Lt--; ) {
      const Jt = Z[Lt], {
        name: Yt,
        namespaceURI: ie,
        value: be
      } = Jt, an = R(Yt), wi = be;
      let Qt = Yt === "value" ? wi : $h(wi);
      if (st.attrName = an, st.attrValue = Qt, st.keepAttr = !0, st.forceKeepAttr = void 0, Ut(v.uponSanitizeAttribute, E, st), Qt = st.attrValue, Mt && (an === "id" || an === "name") && (Ht(Yt, E), Qt = Ft + Qt), G && jt(/((--!?|])>)|<\/(style|title)/i, Qt)) {
        Ht(Yt, E);
        continue;
      }
      if (st.forceKeepAttr)
        continue;
      if (!st.keepAttr) {
        Ht(Yt, E);
        continue;
      }
      if (!Nt && jt(/\/>/i, Qt)) {
        Ht(Yt, E);
        continue;
      }
      ft && Mn([z, P, Y], (Pr) => {
        Qt = ln(Qt, Pr, " ");
      });
      const zr = R(E.nodeName);
      if (!le(zr, an, Qt)) {
        Ht(Yt, E);
        continue;
      }
      if (w && typeof p == "object" && typeof p.getAttributeType == "function" && !ie)
        switch (p.getAttributeType(zr, an)) {
          case "TrustedHTML": {
            Qt = w.createHTML(Qt);
            break;
          }
          case "TrustedScriptURL": {
            Qt = w.createScriptURL(Qt);
            break;
          }
        }
      if (Qt !== wi)
        try {
          ie ? E.setAttributeNS(ie, Yt, Qt) : E.setAttribute(Yt, Qt), Se(E) ? St(E) : ua(e.removed);
        } catch {
          Ht(Yt, E);
        }
    }
    Ut(v.afterSanitizeAttributes, E, null);
  }, ll = function ut(E) {
    let Z = null;
    const st = De(E);
    for (Ut(v.beforeSanitizeShadowDOM, E, null); Z = st.nextNode(); )
      Ut(v.uponSanitizeShadowNode, Z, null), Gt(Z), rn(Z), Z.content instanceof a && ut(Z.content);
    Ut(v.afterSanitizeShadowDOM, E, null);
  };
  return e.sanitize = function(ut) {
    let E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, Z = null, st = null, Lt = null, Jt = null;
    if (L = !ut, L && (ut = "<!-->"), typeof ut != "string" && !Bt(ut))
      if (typeof ut.toString == "function") {
        if (ut = ut.toString(), typeof ut != "string")
          throw cn("dirty is not a string, aborting");
      } else
        throw cn("toString is not a function");
    if (!e.isSupported)
      return ut;
    if (It || bt(E), e.removed = [], typeof ut == "string" && (rt = !1), rt) {
      if (ut.nodeName) {
        const be = R(ut.nodeName);
        if (!yt[be] || lt[be])
          throw cn("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (ut instanceof s)
      Z = Xt("<!---->"), st = Z.ownerDocument.importNode(ut, !0), st.nodeType === un.element && st.nodeName === "BODY" || st.nodeName === "HTML" ? Z = st : Z.appendChild(st);
    else {
      if (!mt && !ft && !vt && // eslint-disable-next-line unicorn/prefer-includes
      ut.indexOf("<") === -1)
        return w && kt ? w.createHTML(ut) : ut;
      if (Z = Xt(ut), !Z)
        return mt ? null : kt ? N : "";
    }
    Z && dt && St(Z.firstChild);
    const Yt = De(rt ? ut : Z);
    for (; Lt = Yt.nextNode(); )
      Gt(Lt), rn(Lt), Lt.content instanceof a && ll(Lt.content);
    if (rt)
      return ut;
    if (mt) {
      if (q)
        for (Jt = F.call(Z.ownerDocument); Z.firstChild; )
          Jt.appendChild(Z.firstChild);
      else
        Jt = Z;
      return (ot.shadowroot || ot.shadowrootmode) && (Jt = C.call(i, Jt, !0)), Jt;
    }
    let ie = vt ? Z.outerHTML : Z.innerHTML;
    return vt && yt["!doctype"] && Z.ownerDocument && Z.ownerDocument.doctype && Z.ownerDocument.doctype.name && jt(gs, Z.ownerDocument.doctype.name) && (ie = "<!DOCTYPE " + Z.ownerDocument.doctype.name + `>
` + ie), ft && Mn([z, P, Y], (be) => {
      ie = ln(ie, be, " ");
    }), w && kt ? w.createHTML(ie) : ie;
  }, e.setConfig = function() {
    let ut = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    bt(ut), It = !0;
  }, e.clearConfig = function() {
    it = null, It = !1;
  }, e.isValidAttribute = function(ut, E, Z) {
    it || bt({});
    const st = R(ut), Lt = R(E);
    return le(st, Lt, Z);
  }, e.addHook = function(ut, E) {
    typeof E == "function" && sn(v[ut], E);
  }, e.removeHook = function(ut, E) {
    if (E !== void 0) {
      const Z = Rh(v[ut], E);
      return Z === -1 ? void 0 : Ih(v[ut], Z, 1)[0];
    }
    return ua(v[ut]);
  }, e.removeHooks = function(ut) {
    v[ut] = [];
  }, e.removeAllHooks = function() {
    v = wa();
  }, e;
}
var Wh = ws();
function Yh(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function qt(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${Yh(t.strand)})</td></tr>`, e += "</tbody></table>", e;
}
function vs(t, e, n, i) {
  let r = "";
  if (t === "FlyBase")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FDrosophila%20melanogaster&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "MGI")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FMus%20musculus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "WormBase")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FCaenorhabditis%20elegans&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "ZFIN")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FDanio%20rerio&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "SGD")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FSaccharomyces%20cerevisiae&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "RGD")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FRattus%20norvegicus&tracks=Variants%2CAll%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else if (t === "human")
    r = `https://alliancegenome.org/jbrowse/?data=data%2FHomo%20sapiens&tracks=All%20Genes&highlight=&loc=${e}%3A${n}..${i}`;
  else
    return console.warn("no source found", t), "Maximum features displayed.  See full view for more.";
  return `<a href="${r}">Maximum features displayed.  See full view for more.</a>`;
}
class Xh {
  constructor() {
    this.placedVariants = [], this.MAX_VARIANT_ROWS = 10, this.bufferConfig = {
      deletion: 2,
      // Minimal buffer for rectangles
      SNV: 8,
      // Account for diamond width
      insertion: 8,
      // Account for triangle width
      delins: 10,
      // Account for hexagon width
      mnv: 10,
      // Account for MNV width
      point_mutation: 8,
      // Same as SNV
      substitution: 10,
      // Same as delins
      indel: 10
      // Same as delins
    };
  }
  getVariantRow(e, n) {
    const i = n(e.fmin), r = n(e.fmax), a = this.normalizeVariantType(e.type), o = this.bufferConfig[a] || 5, s = a === "deletion" ? i : i - o, c = a === "deletion" ? r : r + o;
    return this.findAvailableRow(s, c);
  }
  normalizeVariantType(e) {
    const n = e.toLowerCase();
    return n === "snv" || n === "point_mutation" ? "SNV" : n === "delins" || n === "substitution" || n === "indel" ? "delins" : n;
  }
  findAvailableRow(e, n) {
    let i = 0, r = !1;
    for (; !r && i < this.MAX_VARIANT_ROWS; ) {
      r = !0;
      for (const a of this.placedVariants.filter((o) => o.row === i))
        if (!(n < a.fmin || e > a.fmax)) {
          r = !1;
          break;
        }
      r || i++;
    }
    return i;
  }
  addPlacedVariant(e, n, i) {
    const r = this.normalizeVariantType(e.type), a = this.bufferConfig[r] || 5;
    this.placedVariants.push({
      fmin: i(e.fmin) - a,
      fmax: i(e.fmax) + a,
      row: n,
      type: r,
      glyphWidth: a * 2,
      buffer: a
    });
  }
  getMaxRow() {
    return Math.max(...this.placedVariants.map((e) => e.row), -1);
  }
  isOverflowRow(e) {
    return e >= this.MAX_VARIANT_ROWS;
  }
  reset() {
    this.placedVariants = [];
  }
}
class Kh {
  constructor() {
    this.VARIANT_HEIGHT = 12, this.ROW_SPACING = 8, this.SECTION_PADDING = 20;
  }
  renderAllVariants(e, n, i, r, a, o, s, c) {
    const f = e.append("g").attr("class", "unified-variants track").attr("transform", `translate(0, ${this.SECTION_PADDING})`), u = this.consolidateVariants(n), m = ls(
      u,
      (r.domain()[1] - r.domain()[0]) * 0.01
    ), d = new Xh();
    m.sort((S, x) => S.fmin - x.fmin);
    const p = /* @__PURE__ */ new Map();
    m.forEach((S) => {
      const x = sr(S);
      p.set(S, x);
    });
    let y = 0;
    if (m.forEach((S) => {
      const x = d.getVariantRow(S, r);
      if (d.isOverflowRow(x)) {
        y++;
        return;
      }
      d.addPlacedVariant(S, x, r);
      const k = x * (this.VARIANT_HEIGHT + this.ROW_SPACING);
      this.renderVariantByType(
        f,
        S,
        r,
        k,
        a,
        p.get(S) || [],
        o,
        s,
        c
      );
    }), y > 0) {
      const x = (d.getMaxRow() + 1) * (this.VARIANT_HEIGHT + this.ROW_SPACING);
      f.append("text").attr("class", "overflow-indicator").attr("x", 10).attr("y", x + this.VARIANT_HEIGHT).attr("fill", "red").attr("font-size", "12px").text(`+${y} more variants...`);
    }
    return (d.getMaxRow() + 1) * (this.VARIANT_HEIGHT + this.ROW_SPACING) + this.SECTION_PADDING * 2;
  }
  consolidateVariants(e) {
    const n = /* @__PURE__ */ new Map();
    return e.forEach((i) => {
      const r = sr(i).join(","), o = `${i.strand || "0"}-${i.fmin}-${i.fmax}-${i.type}-${r}`;
      if (n.has(o)) {
        const s = n.get(o);
        i.name && !s.sources.includes(i.name) && s.sources.push(i.name);
      } else
        n.set(o, {
          ...i,
          sources: i.name ? [i.name] : []
        });
    }), Array.from(n.values());
  }
  renderVariantByType(e, n, i, r, a, o, s, c, f) {
    const { type: u, fmin: m, fmax: d } = n, p = fs(n), y = us(p)[0], O = cs(p), D = {
      fmin: m,
      fmax: d,
      alleles: o,
      selected: "false"
    }, S = (x) => {
      f(s, O, c, x);
    };
    switch (u.toLowerCase()) {
      case "deletion":
      case "mnv":
        e.append("rect").attr("class", "variant-deletion").attr("x", i(m)).attr("y", r).attr("width", Math.max(i(d) - i(m), 2)).attr("height", this.VARIANT_HEIGHT).attr("fill", y).on("click", S).datum(D);
        break;
      case "snv":
      case "point_mutation":
        e.append("polygon").attr("class", "variant-SNV").attr("points", Rr(i(m))).attr("transform", `translate(0, ${r})`).attr("fill", y).on("click", S).datum(D);
        break;
      case "insertion":
        e.append("polygon").attr("class", "variant-insertion").attr("points", os(i(m))).attr("transform", `translate(0, ${r})`).attr("fill", y).on("click", S).datum(D);
        break;
      case "delins":
      case "substitution":
      case "indel":
        e.append("polygon").attr("class", "variant-delins").attr("points", ss(i(m))).attr("transform", `translate(0, ${r})`).attr("fill", y).on("click", S).datum(D);
        break;
    }
    if (a) {
      const x = pi(n);
      if (x) {
        const k = x.length || 1;
        e.append("text").attr("class", "variantLabel").attr("fill", y).attr("opacity", 0.8).attr("transform", `translate(${i(m) - k * 3}, ${r - 2})`).attr("font-size", "10px").text(x).on("click", S).datum({ fmin: m });
      }
    }
  }
}
class Jh {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    variantTypes: a,
    showVariantLabel: o,
    variantFilter: s,
    binRatio: c,
    isoformFilter: f,
    initialHighlight: u,
    trackData: m,
    variantData: d
  }) {
    this.trackData = m ?? [], this.variantData = d ?? [], this.viewer = e, this.width = i, this.variantFilter = s, this.isoformFilter = f, this.initialHighlight = u, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.binRatio = c, this.showVariantLabel = o ?? !0;
  }
  DrawTrack() {
    const e = this.isoformFilter;
    let n = this.trackData;
    const i = this.initialHighlight, r = this.filterVariantData(
      this.variantData,
      this.variantFilter
    ), a = this.viewer, o = this.width;
    this.binRatio;
    const s = this.showVariantLabel, c = this.trackData[0].source, f = this.trackData[0].seqId, u = e.length === 0 ? 9 : 30, m = ["UTR", "five_prime_UTR", "three_prime_UTR"], d = ["CDS"], p = ["exon"], y = this.transcriptTypes, O = rs(n, y), D = O.fmin, S = O.fmax, x = 10, k = 10, w = 40, N = 20, I = 0, A = 10, F = 4, H = 20, C = 10, v = `0,0 0,${H} ${C},${C}`, z = Re().domain([D, S]).range([0, o]);
    let P = Zt("body").select("div.gfc-tooltip");
    P.empty() ? P = Zt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0) : (P.selectAll("*").remove(), P.style("visibility", "visible").style("opacity", 0));
    const Y = () => {
      P.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, j = this.renderTooltipDescription, X = new Kh().renderAllVariants(
      a,
      r,
      o,
      z,
      s,
      P,
      Y,
      j
    ), nt = {};
    for (let et = 0, wt = m.length; et < wt; et++)
      nt[m[et]] = 200;
    for (let et = 0, wt = d.length; et < wt; et++)
      nt[d[et]] = 1e3;
    for (let et = 0, wt = p.length; et < wt; et++)
      nt[p[et]] = 100;
    const Q = {};
    n = n.sort((et, wt) => et.selected && !wt.selected ? -1 : !et.selected && wt.selected ? 1 : et.name.localeCompare(wt.name));
    let at = 0;
    const yt = X + 10, tt = a.append("g").attr("transform", `translate(0,${yt})`).attr("class", "track");
    let ot = 0;
    const Et = [];
    let ht = -1, lt = -1;
    const pt = [];
    for (let et = 0; et < n.length && ot < u; et++) {
      const wt = n[et];
      let Rt = wt.children;
      if (Rt) {
        const Nt = wt.selected;
        Rt = Rt.sort(
          (G, vt) => G.name.localeCompare(vt.name)
        );
        let ft = !1;
        Rt.forEach((G) => {
          var It;
          if (!(e.includes(G.id) || e.includes(G.name)) && e.length !== 0 || pt.includes(G.id))
            return;
          pt.push(G.id);
          const vt = G.type;
          if (y.includes(vt)) {
            let dt = Sr(
              Et,
              z(G.fmin),
              z(G.fmax)
            );
            if (ot < u) {
              let mt = "", q, kt = !1;
              const Wt = wt.name;
              Object.keys(Q).includes(Wt) || (at += N, kt = !0, Q[Wt] = "Green");
              const Mt = tt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ot * w + 10 + at})`
              );
              kt && (mt = Wt, q = Mt.append("text").attr("class", "geneLabel").attr("fill", Nt ? "sandybrown" : "black").attr("height", I).attr(
                "transform",
                `translate(${z(G.fmin)},-${N})`
              ).text(mt).on("click", (rt) => {
                j(
                  P,
                  qt(wt),
                  Y,
                  rt
                );
              }).datum({
                fmin: G.fmin
              })), Mt.append("polygon").datum(() => ({
                fmin: G.fmin,
                fmax: G.fmax,
                strand: wt.strand
              })).attr("class", "transArrow").attr("points", v).attr(
                "transform",
                (rt) => wt.strand > 0 ? `translate(${Number(z(rt.fmax))},0)` : `translate(${Number(z(rt.fmin))},${H}) rotate(180)`
              ).on("click", (rt) => {
                j(
                  P,
                  qt(G),
                  Y,
                  rt
                );
              }), Mt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + I).attr("height", F).attr("transform", `translate(${z(G.fmin)},0)`).attr("width", z(G.fmax) - z(G.fmin)).on("click", (rt) => {
                j(
                  P,
                  qt(G),
                  Y,
                  rt
                );
              }).datum({
                fmin: G.fmin,
                fmax: G.fmax
              }), mt = G.name, q = Mt.append("text").attr("class", "transcriptLabel").attr("fill", Nt ? "sandybrown" : "gray").attr("opacity", Nt ? 1 : 0.5).attr("height", I).attr("transform", `translate(${z(G.fmin)},0)`).text(mt).on("click", (rt) => {
                j(
                  P,
                  qt(G),
                  Y,
                  rt
                );
              }).datum({
                fmin: G.fmin
              });
              let Ft = mt.length * 2;
              try {
                Ft = ((It = q.node()) == null ? void 0 : It.getBBox().width) ?? 0;
              } catch {
              }
              Number(Ft + z(G.fmin)) > o;
              const Kt = Ft > z(G.fmax) - z(G.fmin) ? z(G.fmin) + Ft : z(G.fmax);
              if (Et[dt]) {
                const rt = Et[dt];
                rt.push(`${z(G.fmin)}:${Kt}`), Et[dt] = rt;
              } else
                Et[dt] = [
                  `${z(G.fmin)}:${Kt}`
                ];
              (ht < 0 || ht > G.fmin) && (ht = G.fmin), (lt < 0 || lt < G.fmax) && (lt = G.fmax), G.children && (G.children = G.children.sort((rt, At) => {
                const Dt = nt[rt.type], _t = nt[At.type];
                return typeof Dt == "number" && typeof _t == "number" ? Dt - _t : typeof Dt == "number" && typeof _t != "number" ? -1 : typeof Dt != "number" && typeof _t == "number" ? 1 : rt.type.localeCompare(At.type);
              }), G.children.forEach((rt) => {
                const At = rt.type;
                p.includes(At) ? Mt.append("rect").attr("class", "exon").attr("x", z(rt.fmin)).attr(
                  "transform",
                  `translate(0,${x - F})`
                ).attr("height", x).attr("z-index", 10).attr("width", z(rt.fmax) - z(rt.fmin)).on("click", (Dt) => {
                  j(
                    P,
                    qt(G),
                    Y,
                    Dt
                  );
                }).datum({ fmin: rt.fmin, fmax: rt.fmax }) : d.includes(At) ? Mt.append("rect").attr("class", "CDS").attr("x", z(rt.fmin)).attr(
                  "transform",
                  `translate(0,${k - F})`
                ).attr("z-index", 20).attr("height", k).attr("width", z(rt.fmax) - z(rt.fmin)).on("click", (Dt) => {
                  j(
                    P,
                    qt(G),
                    Y,
                    Dt
                  );
                }).datum({ fmin: rt.fmin, fmax: rt.fmax }) : m.includes(At) && Mt.append("rect").attr("class", "UTR").attr("x", z(rt.fmin)).attr(
                  "transform",
                  `translate(0,${A - F})`
                ).attr("z-index", 20).attr("height", A).attr("width", z(rt.fmax) - z(rt.fmin)).on("click", (Dt) => {
                  j(
                    P,
                    qt(G),
                    Y,
                    Dt
                  );
                }).datum({ fmin: rt.fmin, fmax: rt.fmax });
              })), ot += 1;
            }
            if (ot === u && !ft) {
              const mt = vs(c, f, D, S);
              ++dt, ft = !0, tt.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${ot * w + 20 + at})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", I).html(mt);
            }
          }
        });
      }
    }
    return i && Nr(i, a), ot === 0 && tt.append("text").attr("x", 30).attr("y", I + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), X + yt + ot * w + at;
  }
  filterVariantData(e, n) {
    return n.length === 0 ? e : e.filter((i) => {
      var a, o, s, c;
      let r = !1;
      try {
        (n.includes(i.name) || (a = i.allele_symbols) != null && a.values && n.includes(
          i.allele_symbols.values[0].replace(/"/g, "")
        ) || (o = i.symbol) != null && o.values && n.includes(i.symbol.values[0].replace(/"/g, "")) || (s = i.symbol_text) != null && s.values && n.includes(i.symbol_text.values[0].replace(/"/g, ""))) && (r = !0), (((c = i.allele_ids) == null ? void 0 : c.values[0].replace(/"|\[|\]| /g, "").split(",")) ?? []).forEach((u) => {
          n.includes(u) && (r = !0);
        });
      } catch (f) {
        console.error(
          "error processing filter with so returning anyway",
          n,
          i,
          f
        ), r = !0;
      }
      return r;
    });
  }
  renderTooltipDescription(e, n, i, r) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible");
    const a = r || void 0 || {
      pageX: window.innerWidth / 2,
      pageY: window.innerHeight / 2
    };
    e.selectAll("*").remove();
    const o = Wh.sanitize(n, {
      ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "br", "p", "div", "span"],
      ALLOWED_ATTR: ["href", "target", "rel", "class"]
    });
    e.html(o).style("left", `${a.pageX + 10}px`).style("top", `${a.pageY + 10}px`), e.append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").text("×").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
  cleanup() {
    Zt("body").select("div.gfc-tooltip").remove();
  }
  setInitialHighlight(e, n) {
    var r;
    (r = n.node()) == null || r.getBBox().height;
    const i = n.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((a) => {
      let o = !1;
      return a.alleles && (a.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((c) => {
        e.includes(c) && (o = !0);
      }), a.alleles.forEach((c) => {
        e.includes(c) && (o = !0);
      })), o;
    }).datum((a) => (a.selected = "true", a)).style("stroke", "black");
    i.style("stroke", "black").style("stroke-width", "2px").style("filter", "drop-shadow(0 0 3px yellow)"), i.each(function() {
      Zt(this);
      const o = this.getBBox(), s = 3, c = this.parentNode;
      Zt(c).insert("rect", () => this).attr("class", "highlight").attr("x", o.x - s).attr("y", o.y - s).attr("width", o.width + s * 2).attr("height", o.height + s * 2).attr("fill", "yellow").attr("opacity", 0.5);
    });
  }
}
class Qh {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    variantTypes: a,
    showVariantLabel: o,
    variantFilter: s,
    initialHighlight: c,
    trackData: f,
    variantData: u
  }) {
    this.trackData = f ?? [], this.variantData = u ?? [], this.viewer = e, this.width = i, this.variantFilter = s, this.initialHighlight = c, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.showVariantLabel = o ?? !0;
  }
  DrawTrack() {
    const e = this.variantData;
    let i = this.trackData;
    const r = this.filterVariantData(
      e,
      this.variantFilter
    ), a = ls(
      r,
      1
      // Colin NOTE: made up value
    ), o = /* @__PURE__ */ new Map();
    a.forEach((G) => {
      const vt = sr(G);
      o.set(G, vt);
    });
    const s = this.viewer, c = this.width, f = this.showVariantLabel, u = ["UTR", "five_prime_UTR", "three_prime_UTR"], m = ["CDS"], d = ["exon"], p = this.transcriptTypes, y = rs(i, p), O = y.fmin, D = y.fmax, S = 10, x = 10, k = 10, w = 40, N = 20, I = 2, A = 0, F = 10, H = 10, C = 20, v = 4, z = 20, P = 10, Y = `0,0 0,${z} ${P},${P}`, j = 10, gt = 10, X = (G) => `${G - gt / 2},${j} ${G},0 ${G + gt / 2},${j}`, nt = (G) => `${G - gt / 2},${j} ${G + gt / 2},${j} ${G - gt / 2},0 ${G + gt / 2},0`, Q = (G) => `${G},${j} ${G + gt / 2},${j / 2} ${G},0 ${G - gt / 2},${j / 2}`, at = Re().domain([O, D]).range([0, c]), yt = di(this.viewer), tt = s.append("g").attr("transform", `translate(0,${yt})`).attr("class", "track"), ot = {};
    for (const G of u)
      ot[G] = 200;
    for (const G of m)
      ot[G] = 1e3;
    for (const G of d)
      ot[G] = 100;
    const Et = {};
    i = i.sort((G, vt) => G.selected && !vt.selected ? -1 : !G.selected && vt.selected ? 1 : G.name - vt.name);
    let ht = 0;
    const lt = Zt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), pt = () => {
      lt.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let et = 0;
    const wt = [];
    let Rt = -1, Nt = -1;
    const ft = this.renderTooltipDescription;
    for (let G = 0; G < i.length && et < S; G++) {
      const vt = i[G];
      let It = vt.children;
      if (It) {
        const dt = vt.selected;
        It = It.sort((q, kt) => q.name < kt.name ? -1 : q.name > kt.name ? 1 : q - kt);
        let mt = !1;
        It.forEach((q) => {
          const kt = q.type;
          if (p.includes(kt)) {
            let Wt = Sr(
              wt,
              at(q.fmin),
              at(q.fmax)
            );
            if (et < S) {
              let Mt, Ft, Kt = !1;
              Object.keys(Et).includes(vt.name) || (ht += N, Kt = !0, Et[vt.name] = "Green");
              const rt = tt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${et * w + 10 + ht})`
              );
              Kt && (Mt = vt.name, Ft = rt.append("text").attr("class", "geneLabel").attr("fill", dt ? "sandybrown" : "black").attr("height", A).attr(
                "transform",
                `translate(${at(q.fmin)},-${N})`
              ).text(Mt).on("click", () => {
                ft(
                  lt,
                  qt(vt),
                  pt
                );
              }).datum({ fmin: q.fmin })), rt.append("polygon").datum(() => ({
                fmin: q.fmin,
                fmax: q.fmax,
                strand: vt.strand
              })).attr("class", "transArrow").attr("points", Y).attr("transform", (_t) => vt.strand > 0 ? `translate(${Number(at(_t.fmax))},0)` : `translate(${Number(at(_t.fmin))},${z}) rotate(180)`).on("click", () => {
                ft(
                  lt,
                  qt(q),
                  pt
                );
              }), rt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + A).attr("height", v).attr("transform", `translate(${at(q.fmin)},0)`).attr("width", at(q.fmax) - at(q.fmin)).on("click", () => {
                ft(
                  lt,
                  qt(q),
                  pt
                );
              }).datum({ fmin: q.fmin, fmax: q.fmax }), Mt = q.name, Ft = rt.append("text").attr("class", "transcriptLabel").attr("fill", dt ? "sandybrown" : "gray").attr("opacity", dt ? 1 : 0.5).attr("height", A).attr("transform", `translate(${at(q.fmin)},0)`).text(Mt).on("click", () => {
                ft(
                  lt,
                  qt(q),
                  pt
                );
              }).datum({ fmin: q.fmin });
              let At = Mt.length * 2;
              try {
                At = Ft.node().getBBox().width;
              } catch {
              }
              Number(At + at(q.fmin)) > c;
              const Dt = At > at(q.fmax) - at(q.fmin) ? at(q.fmin) + At : at(q.fmax);
              if (wt[Wt]) {
                const _t = wt[Wt];
                _t.push(`${at(q.fmin)}:${Dt}`), wt[Wt] = _t;
              } else
                wt[Wt] = [
                  `${at(q.fmin)}:${Dt}`
                ];
              (Rt < 0 || Rt > q.fmin) && (Rt = q.fmin), (Nt < 0 || Nt < q.fmax) && (Nt = q.fmax), q.children && (q.children = q.children.sort((_t, $t) => {
                const zt = ot[_t.type], Pt = ot[$t.type];
                return typeof zt == "number" && typeof Pt == "number" ? zt - Pt : typeof zt == "number" && typeof Pt != "number" ? -1 : typeof zt != "number" && typeof Pt == "number" ? 1 : _t.type - $t.type;
              }), q.children.forEach((_t) => {
                const $t = _t.type;
                let zt = !1;
                d.includes($t) ? (zt = !0, rt.append("rect").attr("class", "exon").attr("x", at(_t.fmin)).attr(
                  "transform",
                  `translate(0,${x - v})`
                ).attr("height", x).attr("z-index", 10).attr("width", at(_t.fmax) - at(_t.fmin)).on("click", () => {
                  ft(
                    lt,
                    qt(q),
                    pt
                  );
                }).datum({ fmin: _t.fmin, fmax: _t.fmax })) : m.includes($t) ? (zt = !0, rt.append("rect").attr("class", "CDS").attr("x", at(_t.fmin)).attr(
                  "transform",
                  `translate(0,${k - v})`
                ).attr("z-index", 20).attr("height", k).attr("width", at(_t.fmax) - at(_t.fmin)).on("click", () => {
                  ft(
                    lt,
                    qt(q),
                    pt
                  );
                }).datum({ fmin: _t.fmin, fmax: _t.fmax })) : u.includes($t) && (zt = !0, rt.append("rect").attr("class", "UTR").attr("x", at(_t.fmin)).attr(
                  "transform",
                  `translate(0,${F - v})`
                ).attr("z-index", 20).attr("height", F).attr("width", at(_t.fmax) - at(_t.fmin)).on("click", () => {
                  ft(
                    lt,
                    qt(q),
                    pt
                  );
                }).datum({ fmin: _t.fmin, fmax: _t.fmax })), zt && a.forEach((Pt) => {
                  const { type: g, fmax: B, fmin: U } = Pt;
                  if (U < _t.fmin && B > _t.fmin || B > _t.fmax && U < _t.fmax || B <= _t.fmax && U >= _t.fmin) {
                    let T = !0;
                    const L = fs(Pt), h = us(L)[0], V = cs(L), ct = Math.max(
                      Math.ceil(at(B) - at(U)),
                      I
                    );
                    if (g.toLowerCase() === "deletion" || g.toLowerCase() === "mnv" ? rt.append("rect").attr("class", "variant-deletion").attr("x", at(U)).attr(
                      "transform",
                      `translate(0,${C - v})`
                    ).attr("z-index", 30).attr("fill", h).attr("height", H).attr("width", ct).on("click", () => {
                      ft(
                        lt,
                        V,
                        pt
                      );
                    }).datum({
                      fmin: U,
                      fmax: B,
                      alleles: o.get(Pt) || []
                    }) : g.toLowerCase() === "snv" || g.toLowerCase() === "point_mutation" ? rt.append("polygon").attr("class", "variant-SNV").attr("points", Q(at(U))).attr("fill", h).attr("x", at(U)).attr(
                      "transform",
                      `translate(0,${C - v})`
                    ).attr("z-index", 30).on("click", () => {
                      ft(
                        lt,
                        V,
                        pt
                      );
                    }).datum({
                      fmin: U,
                      fmax: B,
                      alleles: o.get(Pt) || []
                    }) : g.toLowerCase() === "insertion" ? rt.append("polygon").attr("class", "variant-insertion").attr("points", X(at(U))).attr("fill", h).attr("x", at(U)).attr(
                      "transform",
                      `translate(0,${C - v})`
                    ).attr("z-index", 30).on("click", () => {
                      ft(
                        lt,
                        V,
                        pt
                      );
                    }).datum({
                      fmin: U,
                      fmax: B,
                      alleles: o.get(Pt) || []
                    }) : g.toLowerCase() === "delins" || g.toLowerCase() === "substitution" || g.toLowerCase() === "indel" ? rt.append("polygon").attr("class", "variant-delins").attr("points", nt(at(U))).attr("x", at(U)).attr(
                      "transform",
                      `translate(0,${C - v})`
                    ).attr("fill", h).attr("z-index", 30).on("click", () => {
                      ft(
                        lt,
                        V,
                        pt
                      );
                    }).datum({
                      fmin: U,
                      fmax: B,
                      alleles: o.get(Pt) || []
                    }) : T = !1, T && f) {
                      const l = pi(Pt), $ = l.length || 1;
                      rt.append("text").attr("class", "variantLabel").attr(
                        "fill",
                        dt ? "sandybrown" : h
                      ).attr("opacity", dt ? 1 : 0.5).attr("height", A).attr(
                        "transform",
                        `translate(${at(U - $ / 2 * 100)},${C * 2.2 - v})`
                      ).html(l).on("click", () => {
                        ft(
                          lt,
                          V,
                          pt
                        );
                      }).datum({ fmin: q.fmin });
                    }
                  }
                });
              })), et += 1;
            }
            et === S && !mt && (++Wt, mt = !0, tt.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${et * w + 20 + ht})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", A).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    if (et === 0 && tt.append("text").attr("x", 30).attr("y", A + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), Array.from(o.entries()).filter(([G, vt]) => vt.length > 0).map(([G, vt]) => ({
      variantName: G.name,
      alleles: vt,
      type: G.type
    })), this.initialHighlight)
      try {
        Nr(this.initialHighlight, this.viewer);
      } catch {
      }
    return et * w + ht;
  }
  filterVariantData(e, n) {
    if (n.length === 0)
      return e;
    const i = new Set(n);
    return e.filter((a, o) => {
      var c, f, u, m, d;
      let s = !1;
      try {
        if (i.has(a.name) && (s = !0), (c = a.allele_symbols) != null && c.values) {
          const y = a.allele_symbols.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(y) && (s = !0);
        }
        if ((f = a.symbol) != null && f.values) {
          const y = a.symbol.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(y) && (s = !0);
        }
        if ((u = a.symbol_text) != null && u.values) {
          const y = a.symbol_text.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(y) && (s = !0);
        }
        const p = (d = (m = a.allele_ids) == null ? void 0 : m.values) == null ? void 0 : d[0];
        if (p) {
          let y = [];
          if (p.startsWith("[") && p.endsWith("]"))
            try {
              const O = JSON.parse(p);
              y = (Array.isArray(O) ? O : [O]).map(String);
            } catch {
              y = p.replace(/"|\\[|\\]| /g, "").split(",");
            }
          else
            y = p.replace(/"|\\[|\\]| /g, "").split(",");
          for (const O of y)
            if (i.has(O)) {
              s = !0;
              break;
            }
        }
      } catch {
        s = !0;
      }
      return s;
    });
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
}
class jh {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    htpVariant: a,
    trackData: o,
    region: s,
    genome: c
  }) {
    this.trackData = o ?? [], this.viewer = e, this.width = i, this.height = n, this.transcriptTypes = r, this.htpVariant = a, this.region = s, this.genome = c;
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
  DrawTrack() {
    var X;
    let e = this.trackData;
    const n = this.htpVariant, i = this.viewer, r = this.width, a = this.genome, o = (X = e[0]) == null ? void 0 : X.seqId, s = 10, c = ["UTR", "five_prime_UTR", "three_prime_UTR"], f = ["CDS"], u = ["exon"], m = this.transcriptTypes, d = 10, p = 10, y = 40, O = 0, D = 10, S = 4, x = 20, k = 10, w = `0,0 0,${x} ${k},${k}`, N = this.renderTooltipDescription, I = Re().domain([this.region.start, this.region.end]).range([0, r]), A = {};
    for (let nt = 0, Q = c.length; nt < Q; nt++)
      A[c[nt]] = 200;
    for (let nt = 0, Q = f.length; nt < Q; nt++)
      A[f[nt]] = 1e3;
    for (let nt = 0, Q = u.length; nt < Q; nt++)
      A[u[nt]] = 100;
    e = e.sort((nt, Q) => nt.selected && !Q.selected ? -1 : !nt.selected && Q.selected ? 1 : nt.name - Q.name);
    const F = Zt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), H = () => {
      F.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const nt = i.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, Q] = n.split(":");
      nt.append("polygon").attr("class", "variant-SNV").attr("points", Rr(I(+Q))).attr("fill", "red").attr("x", I(+Q)).attr("z-index", 30);
    }
    const C = di(this.viewer), v = i.append("g").attr("transform", `translate(0,${C})`).attr("class", "track");
    let z = 0;
    const P = [];
    let Y = -1, j = -1;
    const gt = [];
    for (let nt = 0; nt < e.length && z < s; nt++) {
      const Q = e[nt];
      let at = Q.children;
      if (at) {
        const yt = Q.selected;
        at = at.sort((tt, ot) => tt.name < ot.name ? -1 : tt.name > ot.name ? 1 : 0), at.forEach((tt) => {
          var Et, ht;
          const ot = tt.type;
          if (!gt.includes(tt.id) && (gt.push(tt.id), m.includes(ot))) {
            let lt = Sr(
              P,
              I(tt.fmin),
              I(tt.fmax)
            );
            if (z < s) {
              const pt = v.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${z * y + 10})`
              ), et = Math.max(I(tt.fmin), 0), wt = Math.min(I(tt.fmax), this.width);
              pt.append("polygon").datum(() => ({
                strand: Q.strand
              })).attr("class", "transArrow").attr("points", w).attr(
                "transform",
                () => Q.strand > 0 ? `translate(${wt},0)` : `translate(${et},${x}) rotate(180)`
              ).on("click", () => {
                N(
                  F,
                  qt(tt),
                  H
                );
              }), pt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + O).attr("height", S).attr("transform", `translate(${et},0)`).attr("width", wt - et).datum({
                fmin: tt.fmin,
                fmax: tt.fmax
              }).on("click", () => {
                N(
                  F,
                  qt(tt),
                  H
                );
              });
              let Rt = tt.name;
              Q.name !== tt.name && (Rt += ` (${Q.name})`);
              let Nt = Math.max(I(tt.fmin), 0);
              const ft = pt.append("svg:text").attr("class", "transcriptLabel").attr("fill", yt ? "sandybrown" : "gray").attr("opacity", yt ? 1 : 0.5).attr("height", O).attr("transform", `translate(${Nt},0)`).text(Rt).datum({
                fmin: tt.fmin
              }).on("click", () => {
                N(
                  F,
                  qt(tt),
                  H
                );
              });
              let G = 100;
              try {
                G = ((Et = ft.node()) == null ? void 0 : Et.getBBox().width) ?? 0;
              } catch {
              }
              if (G + Nt > this.width) {
                const dt = G + Nt - this.width;
                Nt -= dt, ft.attr("transform", `translate(${Nt},0)`);
              }
              let vt = Rt.length * 2;
              try {
                vt = ((ht = ft.node()) == null ? void 0 : ht.getBBox().width) ?? 0;
              } catch (dt) {
                console.error("Not yet rendered", dt);
              }
              Number(vt + I(tt.fmin)) > r;
              const It = vt > I(tt.fmax) - I(tt.fmin) ? I(tt.fmin) + vt : I(tt.fmax);
              if (P[lt]) {
                const dt = P[lt];
                dt.push(`${I(tt.fmin)}:${It}`), P[lt] = dt;
              } else
                P[lt] = [`${I(tt.fmin)}:${It}`];
              (Y < 0 || Y > tt.fmin) && (Y = tt.fmin), (j < 0 || j < tt.fmax) && (j = tt.fmax), tt.children && (tt.children = tt.children.sort(
                function(dt, mt) {
                  const q = A[dt.type], kt = A[mt.type];
                  return typeof q == "number" && typeof kt == "number" ? q - kt : typeof q == "number" && typeof kt != "number" ? -1 : typeof q != "number" && typeof kt == "number" ? 1 : dt.type.localeCompare(mt.type);
                }
              ), tt.children.forEach((dt) => {
                const mt = dt.type;
                if (I(dt.fmin) > this.width || I(dt.fmax) < 0)
                  return;
                const q = Math.max(I(dt.fmin), 0), kt = Math.min(I(dt.fmax), this.width);
                u.includes(mt) ? pt.append("rect").attr("class", "exon").attr("x", q).attr(
                  "transform",
                  `translate(0,${d - S})`
                ).attr("height", d).attr("z-index", 10).attr("width", kt - q).datum({
                  fmin: dt.fmin,
                  fmax: dt.fmax
                }).on("click", () => {
                  N(
                    F,
                    qt(tt),
                    H
                  );
                }) : f.includes(mt) ? pt.append("rect").attr("class", "CDS").attr("x", q).attr(
                  "transform",
                  `translate(0,${p - S})`
                ).attr("z-index", 20).attr("height", p).attr("width", kt - q).datum({
                  fmin: dt.fmin,
                  fmax: dt.fmax
                }).on("click", () => {
                  N(
                    F,
                    qt(tt),
                    H
                  );
                }) : c.includes(mt) && pt.append("rect").attr("class", "UTR").attr("x", q).attr(
                  "transform",
                  `translate(0,${D - S})`
                ).attr("z-index", 20).attr("height", D).attr("width", kt - q).datum({
                  fmin: dt.fmin,
                  fmax: dt.fmax
                }).on("click", () => {
                  N(
                    F,
                    qt(tt),
                    H
                  );
                });
              })), z += 1;
            }
            if (z === s) {
              const pt = vs(
                a,
                o,
                this.region.start,
                this.region.end
              );
              ++lt, v.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${z * y + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", O).html(pt);
            }
          }
        });
      }
    }
    return z === 0 && v.append("text").attr("x", 30).attr("y", O + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), z * y;
  }
}
class td {
  constructor({ viewer: e, track: n, height: i, width: r }) {
    this.refSeq = "", this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, i = Re().domain([this.track.start, this.track.end + 1]).range(this.track.range), r = El(i).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((c, f) => n[f]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), o = Br(i).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(r), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(o);
    const s = Ji(".x-local-numerical .tick text");
    s.first().attr("text-anchor", "start"), s.last().attr("text-anchor", "end"), Ji(".x-local-axis .tick text").each(function() {
      const f = Zt(this).text();
      let u = "nucleotide nt-a";
      f === "T" ? u = "nucleotide nt-t" : f === "C" ? u = "nucleotide nt-c" : f === "G" && (u = "nucleotide nt-g"), Zt(this.parentNode).append("rect").attr("class", u).attr("transform", "translate(-8,8)");
    });
  }
  DrawOverviewTrack() {
    const e = this.viewer, n = this.track.start, i = this.track.end, r = this.width, a = Re().domain([n, i]).range(this.track.range), o = Br(a).ticks(8, "s").tickSize(8);
    e.append("g").attr("class", "axis track").attr("width", r).attr("height", 20).attr("transform", "translate(0,20)").call(o);
  }
  _getRefTick(e, n, i) {
    return i ? new Array(Math.ceil((n - e + 1) / 10)).fill(0).map((r, a) => e + a * 10) : new Array(n - e + 1).fill(0).map((r, a) => e + a);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTrackData() {
  }
}
const hn = {
  ISOFORM_EMBEDDED_VARIANT: "ISOFORM_EMBEDDED_VARIANT",
  ISOFORM_AND_VARIANT: "ISOFORM_AND_VARIANT",
  ISOFORM: "ISOFORM",
  VARIANT: "VARIANT",
  VARIANT_GLOBAL: "VARIANT_GLOBAL"
};
var fe = "$";
function ai() {
}
ai.prototype = Ir.prototype = {
  constructor: ai,
  has: function(t) {
    return fe + t in this;
  },
  get: function(t) {
    return this[fe + t];
  },
  set: function(t, e) {
    return this[fe + t] = e, this;
  },
  remove: function(t) {
    var e = fe + t;
    return e in this && delete this[e];
  },
  clear: function() {
    for (var t in this) t[0] === fe && delete this[t];
  },
  keys: function() {
    var t = [];
    for (var e in this) e[0] === fe && t.push(e.slice(1));
    return t;
  },
  values: function() {
    var t = [];
    for (var e in this) e[0] === fe && t.push(this[e]);
    return t;
  },
  entries: function() {
    var t = [];
    for (var e in this) e[0] === fe && t.push({ key: e.slice(1), value: this[e] });
    return t;
  },
  size: function() {
    var t = 0;
    for (var e in this) e[0] === fe && ++t;
    return t;
  },
  empty: function() {
    for (var t in this) if (t[0] === fe) return !1;
    return !0;
  },
  each: function(t) {
    for (var e in this) e[0] === fe && t(this[e], e.slice(1), this);
  }
};
function Ir(t, e) {
  var n = new ai();
  if (t instanceof ai) t.each(function(s, c) {
    n.set(c, s);
  });
  else if (Array.isArray(t)) {
    var i = -1, r = t.length, a;
    if (e == null) for (; ++i < r; ) n.set(i, t[i]);
    else for (; ++i < r; ) n.set(e(a = t[i], i, t), a);
  } else if (t) for (var o in t) n.set(o, t[o]);
  return n;
}
function va() {
}
var $e = Ir.prototype;
va.prototype = {
  constructor: va,
  has: $e.has,
  add: function(t) {
    return t += "", this[fe + t] = t, this;
  },
  remove: $e.remove,
  clear: $e.clear,
  values: $e.keys,
  size: $e.size,
  empty: $e.empty,
  each: $e.each
};
var ur = "http://www.w3.org/1999/xhtml";
const ya = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ur,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ys(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), ya.hasOwnProperty(e) ? { space: ya[e], local: t } : t;
}
function ed(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === ur && e.documentElement.namespaceURI === ur ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function nd(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function bs(t) {
  var e = ys(t);
  return (e.local ? nd : ed)(e);
}
function id() {
}
function xs(t) {
  return t == null ? id : function() {
    return this.querySelector(t);
  };
}
function rd(t) {
  typeof t != "function" && (t = xs(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], o = a.length, s = i[r] = new Array(o), c, f, u = 0; u < o; ++u)
      (c = a[u]) && (f = t.call(c, c.__data__, u, a)) && ("__data__" in c && (f.__data__ = c.__data__), s[u] = f);
  return new oe(i, this._parents);
}
function ad() {
  return [];
}
function od(t) {
  return t == null ? ad : function() {
    return this.querySelectorAll(t);
  };
}
function sd(t) {
  typeof t != "function" && (t = od(t));
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var o = e[a], s = o.length, c, f = 0; f < s; ++f)
      (c = o[f]) && (i.push(t.call(c, c.__data__, f, o)), r.push(c));
  return new oe(i, r);
}
function ld(t) {
  return function() {
    return this.matches(t);
  };
}
function cd(t) {
  typeof t != "function" && (t = ld(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], o = a.length, s = i[r] = [], c, f = 0; f < o; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && s.push(c);
  return new oe(i, this._parents);
}
function ks(t) {
  return new Array(t.length);
}
function fd() {
  return new oe(this._enter || this._groups.map(ks), this._parents);
}
function oi(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
oi.prototype = {
  constructor: oi,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function ud(t) {
  return function() {
    return t;
  };
}
var ba = "$";
function hd(t, e, n, i, r, a) {
  for (var o = 0, s, c = e.length, f = a.length; o < f; ++o)
    (s = e[o]) ? (s.__data__ = a[o], i[o] = s) : n[o] = new oi(t, a[o]);
  for (; o < c; ++o)
    (s = e[o]) && (r[o] = s);
}
function dd(t, e, n, i, r, a, o) {
  var s, c, f = {}, u = e.length, m = a.length, d = new Array(u), p;
  for (s = 0; s < u; ++s)
    (c = e[s]) && (d[s] = p = ba + o.call(c, c.__data__, s, e), p in f ? r[s] = c : f[p] = c);
  for (s = 0; s < m; ++s)
    p = ba + o.call(t, a[s], s, a), (c = f[p]) ? (i[s] = c, c.__data__ = a[s], f[p] = null) : n[s] = new oi(t, a[s]);
  for (s = 0; s < u; ++s)
    (c = e[s]) && f[d[s]] === c && (r[s] = c);
}
function pd(t, e) {
  if (!t)
    return p = new Array(this.size()), f = -1, this.each(function(I) {
      p[++f] = I;
    }), p;
  var n = e ? dd : hd, i = this._parents, r = this._groups;
  typeof t != "function" && (t = ud(t));
  for (var a = r.length, o = new Array(a), s = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var u = i[f], m = r[f], d = m.length, p = t.call(u, u && u.__data__, f, i), y = p.length, O = s[f] = new Array(y), D = o[f] = new Array(y), S = c[f] = new Array(d);
    n(u, m, O, D, S, p, e);
    for (var x = 0, k = 0, w, N; x < y; ++x)
      if (w = O[x]) {
        for (x >= k && (k = x + 1); !(N = D[k]) && ++k < y; ) ;
        w._next = N || null;
      }
  }
  return o = new oe(o, i), o._enter = s, o._exit = c, o;
}
function _d() {
  return new oe(this._exit || this._groups.map(ks), this._parents);
}
function md(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return i = typeof t == "function" ? t(i) : i.append(t + ""), e != null && (r = e(r)), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function gd(t) {
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), o = new Array(i), s = 0; s < a; ++s)
    for (var c = e[s], f = n[s], u = c.length, m = o[s] = new Array(u), d, p = 0; p < u; ++p)
      (d = c[p] || f[p]) && (m[p] = d);
  for (; s < i; ++s)
    o[s] = e[s];
  return new oe(o, this._parents);
}
function wd() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], o; --r >= 0; )
      (o = i[r]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
  return this;
}
function vd(t) {
  t || (t = yd);
  function e(m, d) {
    return m && d ? t(m.__data__, d.__data__) : !m - !d;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var o = n[a], s = o.length, c = r[a] = new Array(s), f, u = 0; u < s; ++u)
      (f = o[u]) && (c[u] = f);
    c.sort(e);
  }
  return new oe(r, this._parents).order();
}
function yd(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function bd() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function xd() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function kd() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var o = i[r];
      if (o) return o;
    }
  return null;
}
function Td() {
  var t = 0;
  return this.each(function() {
    ++t;
  }), t;
}
function Ed() {
  return !this.node();
}
function Ad(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, o = r.length, s; a < o; ++a)
      (s = r[a]) && t.call(s, s.__data__, a, r);
  return this;
}
function Sd(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Nd(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Rd(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Id(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Dd(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function $d(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Md(t, e) {
  var n = ys(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Nd : Sd : typeof e == "function" ? n.local ? $d : Dd : n.local ? Id : Rd)(n, e));
}
function Ts(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Od(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ld(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Cd(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function Fd(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Od : typeof e == "function" ? Cd : Ld)(t, e, n ?? "")) : zd(this.node(), t);
}
function zd(t, e) {
  return t.style.getPropertyValue(e) || Ts(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Pd(t) {
  return function() {
    delete this[t];
  };
}
function Hd(t, e) {
  return function() {
    this[t] = e;
  };
}
function Bd(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Ud(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Pd : typeof e == "function" ? Bd : Hd)(t, e)) : this.node()[t];
}
function Es(t) {
  return t.trim().split(/^|\s+/);
}
function Dr(t) {
  return t.classList || new As(t);
}
function As(t) {
  this._node = t, this._names = Es(t.getAttribute("class") || "");
}
As.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Ss(t, e) {
  for (var n = Dr(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Ns(t, e) {
  for (var n = Dr(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Vd(t) {
  return function() {
    Ss(this, t);
  };
}
function Gd(t) {
  return function() {
    Ns(this, t);
  };
}
function qd(t, e) {
  return function() {
    (e.apply(this, arguments) ? Ss : Ns)(this, t);
  };
}
function Zd(t, e) {
  var n = Es(t + "");
  if (arguments.length < 2) {
    for (var i = Dr(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? qd : e ? Vd : Gd)(n, e));
}
function Wd() {
  this.textContent = "";
}
function Yd(t) {
  return function() {
    this.textContent = t;
  };
}
function Xd(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Kd(t) {
  return arguments.length ? this.each(t == null ? Wd : (typeof t == "function" ? Xd : Yd)(t)) : this.node().textContent;
}
function Jd() {
  this.innerHTML = "";
}
function Qd(t) {
  return function() {
    this.innerHTML = t;
  };
}
function jd(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function t0(t) {
  return arguments.length ? this.each(t == null ? Jd : (typeof t == "function" ? jd : Qd)(t)) : this.node().innerHTML;
}
function e0() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function n0() {
  return this.each(e0);
}
function i0() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function r0() {
  return this.each(i0);
}
function a0(t) {
  var e = typeof t == "function" ? t : bs(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function o0() {
  return null;
}
function s0(t, e) {
  var n = typeof t == "function" ? t : bs(t), i = e == null ? o0 : typeof e == "function" ? e : xs(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function l0() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function c0() {
  return this.each(l0);
}
function f0() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function u0() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function h0(t) {
  return this.select(t ? u0 : f0);
}
function d0(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var Rs = {};
if (typeof document < "u") {
  var p0 = document.documentElement;
  "onmouseenter" in p0 || (Rs = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function _0(t, e, n) {
  return t = Is(t, e, n), function(i) {
    var r = i.relatedTarget;
    (!r || r !== this && !(r.compareDocumentPosition(this) & 8)) && t.call(this, i);
  };
}
function Is(t, e, n) {
  return function(i) {
    try {
      t.call(this, this.__data__, e, n);
    } finally {
    }
  };
}
function m0(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function g0(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.capture) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function w0(t, e, n) {
  var i = Rs.hasOwnProperty(t.type) ? _0 : Is;
  return function(r, a, o) {
    var s = this.__on, c, f = i(e, a, o);
    if (s) {
      for (var u = 0, m = s.length; u < m; ++u)
        if ((c = s[u]).type === t.type && c.name === t.name) {
          this.removeEventListener(c.type, c.listener, c.capture), this.addEventListener(c.type, c.listener = f, c.capture = n), c.value = e;
          return;
        }
    }
    this.addEventListener(t.type, f, n), c = { type: t.type, name: t.name, value: e, listener: f, capture: n }, s ? s.push(c) : this.__on = [c];
  };
}
function v0(t, e, n) {
  var i = m0(t + ""), r, a = i.length, o;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var c = 0, f = s.length, u; c < f; ++c)
        for (r = 0, u = s[c]; r < a; ++r)
          if ((o = i[r]).type === u.type && o.name === u.name)
            return u.value;
    }
    return;
  }
  for (s = e ? w0 : g0, n == null && (n = !1), r = 0; r < a; ++r) this.each(s(i[r], e, n));
  return this;
}
function Ds(t, e, n) {
  var i = Ts(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function y0(t, e) {
  return function() {
    return Ds(this, t, e);
  };
}
function b0(t, e) {
  return function() {
    return Ds(this, t, e.apply(this, arguments));
  };
}
function x0(t, e) {
  return this.each((typeof e == "function" ? b0 : y0)(t, e));
}
var $s = [null];
function oe(t, e) {
  this._groups = t, this._parents = e;
}
function hr() {
  return new oe([[document.documentElement]], $s);
}
oe.prototype = hr.prototype = {
  constructor: oe,
  select: rd,
  selectAll: sd,
  filter: cd,
  data: pd,
  enter: fd,
  exit: _d,
  join: md,
  merge: gd,
  order: wd,
  sort: vd,
  call: bd,
  nodes: xd,
  node: kd,
  size: Td,
  empty: Ed,
  each: Ad,
  attr: Md,
  style: Fd,
  property: Ud,
  classed: Zd,
  text: Kd,
  html: t0,
  raise: n0,
  lower: r0,
  append: a0,
  insert: s0,
  remove: c0,
  clone: h0,
  datum: d0,
  on: v0,
  dispatch: x0
};
function xa(t) {
  return typeof t == "string" ? new oe([[document.querySelector(t)]], [document.documentElement]) : new oe([[t]], $s);
}
function k0() {
  var t = f, e = u, n = m, i = document.body, r = I(), a = null, o = null, s = null;
  function c(v) {
    a = A(v), a && (o = a.createSVGPoint(), i.appendChild(r));
  }
  c.show = function() {
    var v = Array.prototype.slice.call(arguments);
    v[v.length - 1] instanceof SVGElement && (s = v.pop());
    var z = n.apply(this, v), P = e.apply(this, v), Y = t.apply(this, v), j = F(), gt = p.length, X, nt = document.documentElement.scrollTop || i.scrollTop, Q = document.documentElement.scrollLeft || i.scrollLeft;
    for (j.html(z).style("opacity", 1).style("pointer-events", "all"); gt--; ) j.classed(p[gt], !1);
    return X = d.get(Y).apply(this), j.classed(Y, !0).style("top", X.top + P[0] + nt + "px").style("left", X.left + P[1] + Q + "px"), c;
  }, c.hide = function() {
    var v = F();
    return v.style("opacity", 0).style("pointer-events", "none"), c;
  }, c.attr = function(v, z) {
    if (arguments.length < 2 && typeof v == "string")
      return F().attr(v);
    var P = Array.prototype.slice.call(arguments);
    return hr.prototype.attr.apply(F(), P), c;
  }, c.style = function(v, z) {
    if (arguments.length < 2 && typeof v == "string")
      return F().style(v);
    var P = Array.prototype.slice.call(arguments);
    return hr.prototype.style.apply(F(), P), c;
  }, c.direction = function(v) {
    return arguments.length ? (t = v == null ? v : C(v), c) : t;
  }, c.offset = function(v) {
    return arguments.length ? (e = v == null ? v : C(v), c) : e;
  }, c.html = function(v) {
    return arguments.length ? (n = v == null ? v : C(v), c) : n;
  }, c.rootElement = function(v) {
    return arguments.length ? (i = v == null ? v : C(v), c) : i;
  }, c.destroy = function() {
    return r && (F().remove(), r = null), c;
  };
  function f() {
    return "n";
  }
  function u() {
    return [0, 0];
  }
  function m() {
    return " ";
  }
  var d = Ir({
    n: y,
    s: O,
    e: D,
    w: S,
    nw: x,
    ne: k,
    sw: w,
    se: N
  }), p = d.keys();
  function y() {
    var v = H(this);
    return {
      top: v.n.y - r.offsetHeight,
      left: v.n.x - r.offsetWidth / 2
    };
  }
  function O() {
    var v = H(this);
    return {
      top: v.s.y,
      left: v.s.x - r.offsetWidth / 2
    };
  }
  function D() {
    var v = H(this);
    return {
      top: v.e.y - r.offsetHeight / 2,
      left: v.e.x
    };
  }
  function S() {
    var v = H(this);
    return {
      top: v.w.y - r.offsetHeight / 2,
      left: v.w.x - r.offsetWidth
    };
  }
  function x() {
    var v = H(this);
    return {
      top: v.nw.y - r.offsetHeight,
      left: v.nw.x - r.offsetWidth
    };
  }
  function k() {
    var v = H(this);
    return {
      top: v.ne.y - r.offsetHeight,
      left: v.ne.x
    };
  }
  function w() {
    var v = H(this);
    return {
      top: v.sw.y,
      left: v.sw.x - r.offsetWidth
    };
  }
  function N() {
    var v = H(this);
    return {
      top: v.se.y,
      left: v.se.x
    };
  }
  function I() {
    var v = xa(document.createElement("div"));
    return v.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), v.node();
  }
  function A(v) {
    var z = v.node();
    return z ? z.tagName.toLowerCase() === "svg" ? z : z.ownerSVGElement : null;
  }
  function F() {
    return r == null && (r = I(), i.appendChild(r)), xa(r);
  }
  function H(v) {
    for (var z = s || v; z.getScreenCTM == null && z.parentNode != null; )
      z = z.parentNode;
    var P = {}, Y = z.getScreenCTM(), j = z.getBBox(), gt = j.width, X = j.height, nt = j.x, Q = j.y;
    return o.x = nt, o.y = Q, P.nw = o.matrixTransform(Y), o.x += gt, P.ne = o.matrixTransform(Y), o.y += X, P.se = o.matrixTransform(Y), o.x -= gt, P.sw = o.matrixTransform(Y), o.y -= X / 2, P.w = o.matrixTransform(Y), o.x += gt, P.e = o.matrixTransform(Y), o.x -= gt / 2, o.y -= X / 2, P.n = o.matrixTransform(Y), o.y += X, P.s = o.matrixTransform(Y), P;
  }
  function C(v) {
    return typeof v == "function" ? v : function() {
      return v;
    };
  }
  return c;
}
class T0 {
  constructor({
    region: e,
    viewer: n,
    height: i,
    width: r,
    range: a
  }) {
    this.variants = [], this.viewer = n, this.width = r, this.height = i, this.region = e, this.range = a;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, i = Re().domain([this.region.start, this.region.end + 1]).range(this.range), r = is().type(ns).size(20), a = k0();
    a.attr("class", "d3-tip").html(
      // @ts-expect-error
      (m) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${m.position}</td></tr><tr><td>Mutation</td> <td>${m.ref} > ${m.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(a);
    const o = 20, s = di(this.viewer), c = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
    c.append("rect").attr("height", o).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), c.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (m) => `translate(${i(m.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const u = Zt("#viewer2").append("g").attr("transform", `translate(25,${s})`).attr("class", "track-label");
    u.append("line").attr("x1", 75).attr("y1", 0).attr("x2", 75).attr("y2", o).attr("stroke-width", 3).attr("stroke", "#609C9C"), u.append("text").text(this.track.label.toUpperCase()).attr("y", 12);
  }
  /* Method to get reference label */
  async getTrackData() {
  }
}
class E0 {
  constructor({
    viewer: e,
    track: n,
    height: i,
    width: r,
    region: a
  }) {
    this.variants = [], this.region = a, this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawTrack() {
    const e = this.viewer, n = this.variants, i = Re().domain([this.region.start, this.region.end]).range(this.track.range), r = is().type(ns).size(20), a = 20, o = di(this.viewer), s = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    s.append("rect").attr("height", a).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), s.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (c) => `translate(${i(c.position)},10)`);
  }
  async getTrackData() {
  }
}
function $r(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ni, ka;
function A0() {
  if (ka) return Ni;
  ka = 1;
  class t {
    constructor(n = {}) {
      if (!(n.maxSize && n.maxSize > 0))
        throw new TypeError("`maxSize` must be a number greater than 0");
      this.maxSize = n.maxSize, this.cache = /* @__PURE__ */ new Map(), this.oldCache = /* @__PURE__ */ new Map(), this._size = 0;
    }
    _set(n, i) {
      this.cache.set(n, i), this._size++, this._size >= this.maxSize && (this._size = 0, this.oldCache = this.cache, this.cache = /* @__PURE__ */ new Map());
    }
    get(n) {
      if (this.cache.has(n))
        return this.cache.get(n);
      if (this.oldCache.has(n)) {
        const i = this.oldCache.get(n);
        return this.oldCache.delete(n), this._set(n, i), i;
      }
    }
    set(n, i) {
      return this.cache.has(n) ? this.cache.set(n, i) : this._set(n, i), this;
    }
    has(n) {
      return this.cache.has(n) || this.oldCache.has(n);
    }
    peek(n) {
      if (this.cache.has(n))
        return this.cache.get(n);
      if (this.oldCache.has(n))
        return this.oldCache.get(n);
    }
    delete(n) {
      const i = this.cache.delete(n);
      return i && this._size--, this.oldCache.delete(n) || i;
    }
    clear() {
      this.cache.clear(), this.oldCache.clear(), this._size = 0;
    }
    *keys() {
      for (const [n] of this)
        yield n;
    }
    *values() {
      for (const [, n] of this)
        yield n;
    }
    *[Symbol.iterator]() {
      for (const n of this.cache)
        yield n;
      for (const n of this.oldCache) {
        const [i] = n;
        this.cache.has(i) || (yield n);
      }
    }
    get size() {
      let n = 0;
      for (const i of this.oldCache.keys())
        this.cache.has(i) || n++;
      return this._size + n;
    }
  }
  return Ni = t, Ni;
}
var S0 = A0();
const _i = /* @__PURE__ */ $r(S0);
class N0 {
}
class R0 {
  constructor() {
    this.signals = /* @__PURE__ */ new Set(), this.abortController = new AbortController();
  }
  /**
   * @param {AbortSignal} [signal] optional AbortSignal to add. if falsy,
   *  will be treated as a null-signal, and this abortcontroller will no
   *  longer be abortable.
   */
  //@ts-ignore
  addSignal(e = new N0()) {
    if (this.signal.aborted)
      throw new Error("cannot add a signal, already aborted!");
    this.signals.add(e), e.aborted ? this.handleAborted(e) : typeof e.addEventListener == "function" && e.addEventListener("abort", () => {
      this.handleAborted(e);
    });
  }
  handleAborted(e) {
    this.signals.delete(e), this.signals.size === 0 && this.abortController.abort();
  }
  get signal() {
    return this.abortController.signal;
  }
  abort() {
    this.abortController.abort();
  }
}
class I0 {
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set();
  }
  addCallback(e = () => {
  }) {
    this.callbacks.add(e), this.currentMessage && e(this.currentMessage);
  }
  callback(e) {
    this.currentMessage = e;
    for (const n of this.callbacks)
      n(e);
  }
}
class Ue {
  constructor({ fill: e, cache: n }) {
    if (typeof e != "function")
      throw new TypeError("must pass a fill function");
    if (typeof n != "object")
      throw new TypeError("must pass a cache object");
    if (typeof n.get != "function" || typeof n.set != "function" || typeof n.delete != "function")
      throw new TypeError("cache must implement get(key), set(key, val), and and delete(key)");
    this.cache = n, this.fillCallback = e;
  }
  static isAbortException(e) {
    return (
      // DOMException
      e.name === "AbortError" || // standard-ish non-DOM abort exception
      //@ts-ignore
      e.code === "ERR_ABORTED" || // stringified DOMException
      e.message === "AbortError: aborted" || // stringified standard-ish exception
      e.message === "Error: aborted"
    );
  }
  evict(e, n) {
    this.cache.get(e) === n && this.cache.delete(e);
  }
  fill(e, n, i, r) {
    const a = new R0(), o = new I0();
    o.addCallback(r);
    const s = {
      aborter: a,
      promise: this.fillCallback(n, a.signal, (c) => {
        o.callback(c);
      }),
      settled: !1,
      statusReporter: o,
      get aborted() {
        return this.aborter.signal.aborted;
      }
    };
    s.aborter.addSignal(i), s.aborter.signal.addEventListener("abort", () => {
      s.settled || this.evict(e, s);
    }), s.promise.then(() => {
      s.settled = !0;
    }, () => {
      s.settled = !0, this.evict(e, s);
    }).catch((c) => {
      throw console.error(c), c;
    }), this.cache.set(e, s);
  }
  static checkSinglePromise(e, n) {
    function i() {
      if (n != null && n.aborted)
        throw Object.assign(new Error("aborted"), { code: "ERR_ABORTED" });
    }
    return e.then((r) => (i(), r), (r) => {
      throw i(), r;
    });
  }
  has(e) {
    return this.cache.has(e);
  }
  /**
   * Callback for getting status of the pending async
   *
   * @callback statusCallback
   * @param {any} status, current status string or message object
   */
  /**
   * @param {any} key cache key to use for this request
   * @param {any} data data passed as the first argument to the fill callback
   * @param {AbortSignal} [signal] optional AbortSignal object that aborts the request
   * @param {statusCallback} a callback to get the current status of a pending async operation
   */
  get(e, n, i, r) {
    if (!i && n instanceof AbortSignal)
      throw new TypeError("second get argument appears to be an AbortSignal, perhaps you meant to pass `null` for the fill data?");
    const a = this.cache.get(e);
    return a ? a.aborted && !a.settled ? (this.evict(e, a), this.get(e, n, i, r)) : a.settled ? a.promise : (a.aborter.addSignal(i), a.statusReporter.addCallback(r), Ue.checkSinglePromise(a.promise, i)) : (this.fill(e, n, i, r), Ue.checkSinglePromise(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.cache.get(e).promise,
      i
    ));
  }
  /**
   * delete the given entry from the cache. if it exists and its fill request has
   * not yet settled, the fill will be signaled to abort.
   *
   * @param {any} key
   */
  delete(e) {
    const n = this.cache.get(e);
    n && (n.settled || n.aborter.abort(), this.cache.delete(e));
  }
  /**
   * Clear all requests from the cache. Aborts any that have not settled.
   * @returns {number} count of entries deleted
   */
  clear() {
    const e = this.cache.keys();
    let n = 0;
    for (let i = e.next(); !i.done; i = e.next())
      this.delete(i.value), n += 1;
    return n;
  }
}
var Yn = { exports: {} }, D0 = Yn.exports, Ta;
function $0() {
  return Ta || (Ta = 1, function(t, e) {
    (function(n, i) {
      t.exports = i();
    })(D0, function() {
      const n = /^[\w+.-]+:\/\//, i = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, r = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      function a(x) {
        return n.test(x);
      }
      function o(x) {
        return x.startsWith("//");
      }
      function s(x) {
        return x.startsWith("/");
      }
      function c(x) {
        return x.startsWith("file:");
      }
      function f(x) {
        return /^[.?#]/.test(x);
      }
      function u(x) {
        const k = i.exec(x);
        return d(k[1], k[2] || "", k[3], k[4] || "", k[5] || "/", k[6] || "", k[7] || "");
      }
      function m(x) {
        const k = r.exec(x), w = k[2];
        return d("file:", "", k[1] || "", "", s(w) ? w : "/" + w, k[3] || "", k[4] || "");
      }
      function d(x, k, w, N, I, A, F) {
        return {
          scheme: x,
          user: k,
          host: w,
          port: N,
          path: I,
          query: A,
          hash: F,
          type: 7
        };
      }
      function p(x) {
        if (o(x)) {
          const w = u("http:" + x);
          return w.scheme = "", w.type = 6, w;
        }
        if (s(x)) {
          const w = u("http://foo.com" + x);
          return w.scheme = "", w.host = "", w.type = 5, w;
        }
        if (c(x))
          return m(x);
        if (a(x))
          return u(x);
        const k = u("http://foo.com/" + x);
        return k.scheme = "", k.host = "", k.type = x ? x.startsWith("?") ? 3 : x.startsWith("#") ? 2 : 4 : 1, k;
      }
      function y(x) {
        if (x.endsWith("/.."))
          return x;
        const k = x.lastIndexOf("/");
        return x.slice(0, k + 1);
      }
      function O(x, k) {
        D(k, k.type), x.path === "/" ? x.path = k.path : x.path = y(k.path) + x.path;
      }
      function D(x, k) {
        const w = k <= 4, N = x.path.split("/");
        let I = 1, A = 0, F = !1;
        for (let C = 1; C < N.length; C++) {
          const v = N[C];
          if (!v) {
            F = !0;
            continue;
          }
          if (F = !1, v !== ".") {
            if (v === "..") {
              A ? (F = !0, A--, I--) : w && (N[I++] = v);
              continue;
            }
            N[I++] = v, A++;
          }
        }
        let H = "";
        for (let C = 1; C < I; C++)
          H += "/" + N[C];
        (!H || F && !H.endsWith("/..")) && (H += "/"), x.path = H;
      }
      function S(x, k) {
        if (!x && !k)
          return "";
        const w = p(x);
        let N = w.type;
        if (k && N !== 7) {
          const A = p(k), F = A.type;
          switch (N) {
            case 1:
              w.hash = A.hash;
            // fall through
            case 2:
              w.query = A.query;
            // fall through
            case 3:
            case 4:
              O(w, A);
            // fall through
            case 5:
              w.user = A.user, w.host = A.host, w.port = A.port;
            // fall through
            case 6:
              w.scheme = A.scheme;
          }
          F > N && (N = F);
        }
        D(w, N);
        const I = w.query + w.hash;
        switch (N) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return I;
          case 4: {
            const A = w.path.slice(1);
            return A ? f(k || x) && !f(A) ? "./" + A + I : A + I : I || ".";
          }
          case 5:
            return w.path + I;
          default:
            return w.scheme + "//" + w.user + w.host + w.port + w.path + I;
        }
      }
      return S;
    });
  }(Yn)), Yn.exports;
}
var M0 = $0();
const O0 = /* @__PURE__ */ $r(M0);
async function Mr(t, e, n = {}) {
  const { defaultContent: i = {} } = n;
  try {
    const r = await e(t, { encoding: "utf8" }), a = new TextDecoder("utf8");
    return JSON.parse(a.decode(r));
  } catch (r) {
    if (r.code === "ENOENT" || r.status === 404 || r.message.includes("404") || r.message.includes("ENOENT"))
      return i;
    throw r;
  }
}
function Or(t, e = ".") {
  return O0(t, e);
}
class L0 {
  constructor({ readFile: e, cacheSize: n = 100 }) {
    if (this.topList = [], this.chunkCache = new Ue({
      cache: new _i({ maxSize: n }),
      fill: this.readChunkItems.bind(this)
    }), this.readFile = e, !this.readFile)
      throw new Error('must provide a "readFile" function');
  }
  importExisting(e, n, i, r, a) {
    this.topList = e, this.attrs = n, this.start = n.makeFastGetter("Start"), this.end = n.makeFastGetter("End"), this.lazyClass = a, this.baseURL = i, this.lazyUrlTemplate = r;
  }
  binarySearch(e, n, i) {
    let r = -1, a = e.length, o;
    for (; a - r > 1; )
      o = r + a >>> 1, i(e[o]) >= n ? a = o : r = o;
    return i === this.end ? a : r;
  }
  readChunkItems(e) {
    const n = Or(this.lazyUrlTemplate.replaceAll(/\{Chunk\}/gi, e), this.baseURL);
    return Mr(n, this.readFile, { defaultContent: [] });
  }
  async *iterateSublist(e, n, i, r, a, o, s) {
    const c = this.attrs.makeGetter("Chunk"), f = this.attrs.makeGetter("Sublist"), u = [];
    for (let m = this.binarySearch(e, n, a); m < e.length && m >= 0 && r * o(e[m]) < r * i; m += r) {
      if (e[m][0] === this.lazyClass) {
        const p = c(e[m]), y = this.chunkCache.get(p, p).then((O) => [O, p]);
        u.push(y);
      } else
        yield [e[m], s.concat(m)];
      const d = f(e[m]);
      d && (yield* this.iterateSublist(d, n, i, r, a, o, s.concat(m)));
    }
    for (const m of u) {
      const [d, p] = await m;
      d && (yield* this.iterateSublist(d, n, i, r, a, o, [
        ...s,
        p
      ]));
    }
  }
  async *iterate(e, n) {
    const i = e > n ? -1 : 1, r = e > n ? this.start : this.end, a = e > n ? this.end : this.start;
    this.topList.length > 0 && (yield* this.iterateSublist(this.topList, e, n, i, r, a, [0]));
  }
  async histogram(e, n, i) {
    const r = new Array(i);
    r.fill(0);
    const a = (n - e) / i;
    for await (const o of this.iterate(e, n)) {
      const s = Math.max(0, (this.start(o) - e) / a | 0), c = Math.min(i, (this.end(o) - e) / a | 0);
      for (let f = s; f <= c; f += 1)
        r[f] += 1;
    }
    return r;
  }
}
class C0 {
  constructor(e) {
    this.classes = e, this.fields = [];
    for (let n = 0; n < e.length; n += 1) {
      this.fields[n] = {};
      for (let i = 0; i < e[n].attributes.length; i += 1)
        this.fields[n][e[n].attributes[i]] = i + 1;
      e[n].proto === void 0 && (e[n].proto = {}), e[n].isArrayAttr === void 0 && (e[n].isArrayAttr = {});
    }
  }
  /**
   * @private
   */
  attrIndices(e) {
    return this.classes.map((n) => n.attributes.indexOf(e) + 1 || n.attributes.indexOf(e.toLowerCase()) + 1 || void 0);
  }
  get(e, n) {
    if (n in this.fields[e[0]])
      return e[this.fields[e[0]][n]];
    const i = n.toLowerCase();
    if (i in this.fields[e[0]])
      return e[this.fields[e[0]][i]];
    const r = this.classes[e[0]].attributes.length + 1;
    return r >= e.length || !(n in e[r]) ? n in this.classes[e[0]].proto ? this.classes[e[0]].proto[n] : void 0 : e[r][n];
  }
  makeSetter(e) {
    return (n, i) => {
      this.set(n, e, i);
    };
  }
  makeGetter(e) {
    return (n) => this.get(n, e);
  }
  makeFastGetter(e) {
    const n = this.attrIndices(e);
    return function(r) {
      if (n[r[0]] !== void 0)
        return r[n[r[0]]];
    };
  }
  // construct(self, obj, klass) {
  //   const result = new Array(self.classes[klass].length)
  //   Object.keys(obj).forEach(attr => {
  //     this.set(result, attr, obj[attr])
  //   })
  //   return result
  // }
  /**
   * Returns fast pre-compiled getter and setter functions for use with
   * Arrays that use this representation.
   * When the returned <code>get</code> and <code>set</code> functions are
   * added as methods to an Array that contains data in this
   * representation, they provide fast access by name to the data.
   *
   * @returns {Object} <code>{ get: function() {...}, set: function(val) {...} }</code>
   *
   * @example
   * var accessors = attrs.accessors();
   * var feature = get_feature_from_someplace();
   * feature.get = accessors.get;
   * // print out the feature start and end
   * console.log( feature.get('start') + ',' + feature.get('end') );
   */
  accessors() {
    return this._accessors || (this._accessors = this._makeAccessors()), this._accessors;
  }
  /**
   * @private
   */
  _makeAccessors() {
    const e = {}, n = {
      get(r) {
        const a = this.get.field_accessors[r.toLowerCase()];
        if (a)
          return a.call(this);
      },
      set(r, a) {
        const o = this.set.field_accessors[r];
        if (o)
          return o.call(this, a);
      },
      tags() {
        return i[this[0]] || [];
      }
    };
    n.get.field_accessors = {}, n.set.field_accessors = {}, this.classes.forEach((r, a) => {
      (r.attributes || []).forEach((o, s) => {
        e[o] = e[o] || [], e[o][a] = s + 1, o = o.toLowerCase(), e[o] = e[o] || [], e[o][a] = s + 1;
      });
    });
    const i = this.classes.map((r) => r.attributes);
    return Object.keys(e).forEach((r) => {
      const a = e[r];
      n.get.field_accessors[r] = a ? function() {
        return this[a[this[0]]];
      } : function() {
      };
    }), n;
  }
}
class F0 {
  constructor({ urlTemplate: e, chunkSize: n, length: i, cacheSize: r = 100, readFile: a }, o) {
    if (this.urlTemplate = e, this.chunkSize = n, this.length = i, this.baseUrl = o === void 0 ? "" : o, this.readFile = a, !a)
      throw new Error("must provide readFile callback");
    this.chunkCache = new Ue({
      cache: new _i({ maxSize: r }),
      fill: this.getChunk.bind(this)
    });
  }
  /**
   * call the callback on one element of the array
   * @param i index
   * @param callback callback, gets called with (i, value, param)
   * @param param (optional) callback will get this as its last parameter
   */
  index(e, n, i) {
    this.range(e, e, n, void 0, i);
  }
  /**
   * async generator for the elements in the range [start,end]
   *
   * @param start index of first element to call the callback on
   * @param end index of last element to call the callback on
   */
  async *range(e, n) {
    e = Math.max(0, e), n = Math.min(n, this.length - 1);
    const i = Math.floor(e / this.chunkSize), r = Math.floor(n / this.chunkSize), a = [];
    for (let o = i; o <= r; o += 1)
      a.push(this.chunkCache.get(o, o));
    for (const o of a) {
      const [s, c] = await o;
      yield* this.filterChunkData(e, n, s, c);
    }
  }
  async getChunk(e) {
    let n = this.urlTemplate.replaceAll(/\{Chunk\}/gi, e);
    this.baseUrl && (n = Or(n, this.baseUrl));
    const i = await Mr(n, this.readFile);
    return [e, i];
  }
  *filterChunkData(e, n, i, r) {
    const a = i * this.chunkSize, o = Math.max(0, e - a), s = Math.min(n - a, this.chunkSize - 1);
    for (let c = o; c <= s; c += 1)
      yield [c + a, r[c]];
  }
}
function z0() {
  return this._uniqueID;
}
function P0() {
  return this._parent;
}
function H0() {
  return this.get("subfeatures");
}
class B0 {
  constructor({ baseUrl: e, urlTemplate: n, readFile: i, cacheSize: r = 10 }) {
    if (this.baseUrl = e, this.urlTemplates = { root: n }, this.readFile = i, !this.readFile)
      throw new Error('must provide a "readFile" function argument');
    this.dataRootCache = new Ue({
      cache: new _i({ maxSize: r }),
      fill: this.fetchDataRoot.bind(this)
    });
  }
  makeNCList() {
    return new L0({ readFile: this.readFile });
  }
  loadNCList(e, n, i) {
    e.nclist.importExisting(n.intervals.nclist, e.attrs, i, n.intervals.urlTemplate, n.intervals.lazyClass);
  }
  getDataRoot(e) {
    return this.dataRootCache.get(e, e);
  }
  fetchDataRoot(e) {
    const n = Or(this.urlTemplates.root.replaceAll(/{\s*refseq\s*}/g, e), this.baseUrl);
    return Mr(n, this.readFile).then((i) => (
      // trackInfo = JSON.parse( trackInfo );
      this.parseTrackInfo(i, n)
    ));
  }
  parseTrackInfo(e, n) {
    const i = {
      nclist: this.makeNCList(),
      stats: {
        featureCount: e.featureCount || 0
      }
    };
    e.intervals && (i.attrs = new C0(e.intervals.classes), this.loadNCList(i, e, n));
    const { histograms: r } = e;
    if (r != null && r.meta) {
      for (let a = 0; a < r.meta.length; a += 1)
        r.meta[a].lazyArray = new F0({ ...r.meta[a].arrayParams, readFile: this.readFile }, n);
      i._histograms = r;
    }
    return i._histograms && Object.keys(i._histograms).forEach((a) => {
      i._histograms[a].forEach((s) => {
        Object.keys(s).forEach((c) => {
          typeof s[c] == "string" && String(Number(s[c])) === s[c] && (s[c] = Number(s[c]));
        });
      });
    }), i;
  }
  async getRegionStats(e) {
    return (await this.getDataRoot(e.ref)).stats;
  }
  /**
   * fetch binned counts of feature coverage in the given region.
   *
   * @param {object} query
   * @param {string} query.refName reference sequence name
   * @param {number} query.start region start
   * @param {number} query.end region end
   * @param {number} query.numBins number of bins desired in the feature counts
   * @param {number} query.basesPerBin number of bp desired in each feature counting bin
   * @returns {object} as:
   *    `{ bins: hist, stats: statEntry }`
   */
  async getRegionFeatureDensities({ refName: e, start: n, end: i, numBins: r, basesPerBin: a }) {
    const o = await this.getDataRoot(e);
    if (r)
      a = (i - n) / r;
    else if (a)
      r = Math.ceil((i - n) / a);
    else
      throw new TypeError("numBins or basesPerBin arg required for getRegionFeatureDensities");
    const c = (o._histograms.stats || []).find((d) => d.basesPerBin >= a);
    let f = o._histograms.meta[0];
    for (let d = 0; d < o._histograms.meta.length; d += 1)
      a >= o._histograms.meta[d].basesPerBin && (f = o._histograms.meta[d]);
    let u = a / f.basesPerBin;
    if (u > 0.9 && Math.abs(u - Math.round(u)) < 1e-4) {
      const d = Math.floor(n / f.basesPerBin);
      u = Math.round(u);
      const p = [];
      for (let y = 0; y < r; y += 1)
        p[y] = 0;
      for await (const [y, O] of f.lazyArray.range(d, d + u * r - 1))
        p[Math.floor((y - d) / u)] += O;
      return { bins: p, stats: c };
    }
    return { bins: await o.nclist.histogram(n, i, r), stats: c };
  }
  /**
   * Fetch features in a given region. This method is an asynchronous generator
   * yielding feature objects.
   *
   * @param {object} args
   * @param {string} args.refName reference sequence name
   * @param {number} args.start start of region. 0-based half-open.
   * @param {number} args.end end of region. 0-based half-open.
   * @yields {object}
   */
  async *getFeatures({ refName: e, start: n, end: i }) {
    var o;
    const r = await this.getDataRoot(e), a = (o = r.attrs) == null ? void 0 : o.accessors();
    for await (const [s, c] of r.nclist.iterate(n, i)) {
      if (!s.decorated) {
        const f = c.join(",");
        this.decorateFeature(a, s, `${e},${f}`);
      }
      yield s;
    }
  }
  // helper method to recursively add .get and .tags methods to a feature and its
  // subfeatures
  decorateFeature(e, n, i, r) {
    n.get = e.get, n.tags = e.tags, n._uniqueID = i, n.id = z0, n._parent = r, n.parent = P0, n.children = H0, (n.get("subfeatures") || []).forEach((a, o) => {
      this.decorateFeature(e, a, `${i}-${o}`, n);
    }), n.decorated = !0;
  }
}
function nn(t) {
  let e = t.length;
  for (; --e >= 0; )
    t[e] = 0;
}
const U0 = 3, V0 = 258, Ms = 29, G0 = 256, q0 = G0 + 1 + Ms, Os = 30, Z0 = 512, W0 = new Array((q0 + 2) * 2);
nn(W0);
const Y0 = new Array(Os * 2);
nn(Y0);
const X0 = new Array(Z0);
nn(X0);
const K0 = new Array(V0 - U0 + 1);
nn(K0);
const J0 = new Array(Ms);
nn(J0);
const Q0 = new Array(Os);
nn(Q0);
const j0 = (t, e, n, i) => {
  let r = t & 65535 | 0, a = t >>> 16 & 65535 | 0, o = 0;
  for (; n !== 0; ) {
    o = n > 2e3 ? 2e3 : n, n -= o;
    do
      r = r + e[i++] | 0, a = a + r | 0;
    while (--o);
    r %= 65521, a %= 65521;
  }
  return r | a << 16 | 0;
};
var dr = j0;
const tp = () => {
  let t, e = [];
  for (var n = 0; n < 256; n++) {
    t = n;
    for (var i = 0; i < 8; i++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    e[n] = t;
  }
  return e;
}, ep = new Uint32Array(tp()), np = (t, e, n, i) => {
  const r = ep, a = i + n;
  t ^= -1;
  for (let o = i; o < a; o++)
    t = t >>> 8 ^ r[(t ^ e[o]) & 255];
  return t ^ -1;
};
var we = np, pr = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, Ls = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
const ip = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
var rp = function(t) {
  const e = Array.prototype.slice.call(arguments, 1);
  for (; e.length; ) {
    const n = e.shift();
    if (n) {
      if (typeof n != "object")
        throw new TypeError(n + "must be non-object");
      for (const i in n)
        ip(n, i) && (t[i] = n[i]);
    }
  }
  return t;
}, ap = (t) => {
  let e = 0;
  for (let i = 0, r = t.length; i < r; i++)
    e += t[i].length;
  const n = new Uint8Array(e);
  for (let i = 0, r = 0, a = t.length; i < a; i++) {
    let o = t[i];
    n.set(o, r), r += o.length;
  }
  return n;
}, Cs = {
  assign: rp,
  flattenChunks: ap
};
let Fs = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Fs = !1;
}
const kn = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  kn[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
kn[254] = kn[254] = 1;
var op = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let e, n, i, r, a, o = t.length, s = 0;
  for (r = 0; r < o; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < o && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (e = new Uint8Array(s), a = 0, r = 0; a < s; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < o && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), n < 128 ? e[a++] = n : n < 2048 ? (e[a++] = 192 | n >>> 6, e[a++] = 128 | n & 63) : n < 65536 ? (e[a++] = 224 | n >>> 12, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63) : (e[a++] = 240 | n >>> 18, e[a++] = 128 | n >>> 12 & 63, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63);
  return e;
};
const sp = (t, e) => {
  if (e < 65534 && t.subarray && Fs)
    return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
  let n = "";
  for (let i = 0; i < e; i++)
    n += String.fromCharCode(t[i]);
  return n;
};
var lp = (t, e) => {
  const n = e || t.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(t.subarray(0, e));
  let i, r;
  const a = new Array(n * 2);
  for (r = 0, i = 0; i < n; ) {
    let o = t[i++];
    if (o < 128) {
      a[r++] = o;
      continue;
    }
    let s = kn[o];
    if (s > 4) {
      a[r++] = 65533, i += s - 1;
      continue;
    }
    for (o &= s === 2 ? 31 : s === 3 ? 15 : 7; s > 1 && i < n; )
      o = o << 6 | t[i++] & 63, s--;
    if (s > 1) {
      a[r++] = 65533;
      continue;
    }
    o < 65536 ? a[r++] = o : (o -= 65536, a[r++] = 55296 | o >> 10 & 1023, a[r++] = 56320 | o & 1023);
  }
  return sp(a, r);
}, cp = (t, e) => {
  e = e || t.length, e > t.length && (e = t.length);
  let n = e - 1;
  for (; n >= 0 && (t[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? e : n + kn[t[n]] > e ? n : e;
}, _r = {
  string2buf: op,
  buf2string: lp,
  utf8border: cp
};
function fp() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var up = fp;
const Ln = 16209, hp = 16191;
var dp = function(e, n) {
  let i, r, a, o, s, c, f, u, m, d, p, y, O, D, S, x, k, w, N, I, A, F, H, C;
  const v = e.state;
  i = e.next_in, H = e.input, r = i + (e.avail_in - 5), a = e.next_out, C = e.output, o = a - (n - e.avail_out), s = a + (e.avail_out - 257), c = v.dmax, f = v.wsize, u = v.whave, m = v.wnext, d = v.window, p = v.hold, y = v.bits, O = v.lencode, D = v.distcode, S = (1 << v.lenbits) - 1, x = (1 << v.distbits) - 1;
  t:
    do {
      y < 15 && (p += H[i++] << y, y += 8, p += H[i++] << y, y += 8), k = O[p & S];
      e:
        for (; ; ) {
          if (w = k >>> 24, p >>>= w, y -= w, w = k >>> 16 & 255, w === 0)
            C[a++] = k & 65535;
          else if (w & 16) {
            N = k & 65535, w &= 15, w && (y < w && (p += H[i++] << y, y += 8), N += p & (1 << w) - 1, p >>>= w, y -= w), y < 15 && (p += H[i++] << y, y += 8, p += H[i++] << y, y += 8), k = D[p & x];
            n:
              for (; ; ) {
                if (w = k >>> 24, p >>>= w, y -= w, w = k >>> 16 & 255, w & 16) {
                  if (I = k & 65535, w &= 15, y < w && (p += H[i++] << y, y += 8, y < w && (p += H[i++] << y, y += 8)), I += p & (1 << w) - 1, I > c) {
                    e.msg = "invalid distance too far back", v.mode = Ln;
                    break t;
                  }
                  if (p >>>= w, y -= w, w = a - o, I > w) {
                    if (w = I - w, w > u && v.sane) {
                      e.msg = "invalid distance too far back", v.mode = Ln;
                      break t;
                    }
                    if (A = 0, F = d, m === 0) {
                      if (A += f - w, w < N) {
                        N -= w;
                        do
                          C[a++] = d[A++];
                        while (--w);
                        A = a - I, F = C;
                      }
                    } else if (m < w) {
                      if (A += f + m - w, w -= m, w < N) {
                        N -= w;
                        do
                          C[a++] = d[A++];
                        while (--w);
                        if (A = 0, m < N) {
                          w = m, N -= w;
                          do
                            C[a++] = d[A++];
                          while (--w);
                          A = a - I, F = C;
                        }
                      }
                    } else if (A += m - w, w < N) {
                      N -= w;
                      do
                        C[a++] = d[A++];
                      while (--w);
                      A = a - I, F = C;
                    }
                    for (; N > 2; )
                      C[a++] = F[A++], C[a++] = F[A++], C[a++] = F[A++], N -= 3;
                    N && (C[a++] = F[A++], N > 1 && (C[a++] = F[A++]));
                  } else {
                    A = a - I;
                    do
                      C[a++] = C[A++], C[a++] = C[A++], C[a++] = C[A++], N -= 3;
                    while (N > 2);
                    N && (C[a++] = C[A++], N > 1 && (C[a++] = C[A++]));
                  }
                } else if ((w & 64) === 0) {
                  k = D[(k & 65535) + (p & (1 << w) - 1)];
                  continue n;
                } else {
                  e.msg = "invalid distance code", v.mode = Ln;
                  break t;
                }
                break;
              }
          } else if ((w & 64) === 0) {
            k = O[(k & 65535) + (p & (1 << w) - 1)];
            continue e;
          } else if (w & 32) {
            v.mode = hp;
            break t;
          } else {
            e.msg = "invalid literal/length code", v.mode = Ln;
            break t;
          }
          break;
        }
    } while (i < r && a < s);
  N = y >> 3, i -= N, y -= N << 3, p &= (1 << y) - 1, e.next_in = i, e.next_out = a, e.avail_in = i < r ? 5 + (r - i) : 5 - (i - r), e.avail_out = a < s ? 257 + (s - a) : 257 - (a - s), v.hold = p, v.bits = y;
};
const Ze = 15, Ea = 852, Aa = 592, Sa = 0, Ri = 1, Na = 2, pp = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]), _p = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]), mp = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]), gp = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]), wp = (t, e, n, i, r, a, o, s) => {
  const c = s.bits;
  let f = 0, u = 0, m = 0, d = 0, p = 0, y = 0, O = 0, D = 0, S = 0, x = 0, k, w, N, I, A, F = null, H;
  const C = new Uint16Array(Ze + 1), v = new Uint16Array(Ze + 1);
  let z = null, P, Y, j;
  for (f = 0; f <= Ze; f++)
    C[f] = 0;
  for (u = 0; u < i; u++)
    C[e[n + u]]++;
  for (p = c, d = Ze; d >= 1 && C[d] === 0; d--)
    ;
  if (p > d && (p = d), d === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, s.bits = 1, 0;
  for (m = 1; m < d && C[m] === 0; m++)
    ;
  for (p < m && (p = m), D = 1, f = 1; f <= Ze; f++)
    if (D <<= 1, D -= C[f], D < 0)
      return -1;
  if (D > 0 && (t === Sa || d !== 1))
    return -1;
  for (v[1] = 0, f = 1; f < Ze; f++)
    v[f + 1] = v[f] + C[f];
  for (u = 0; u < i; u++)
    e[n + u] !== 0 && (o[v[e[n + u]]++] = u);
  if (t === Sa ? (F = z = o, H = 20) : t === Ri ? (F = pp, z = _p, H = 257) : (F = mp, z = gp, H = 0), x = 0, u = 0, f = m, A = a, y = p, O = 0, N = -1, S = 1 << p, I = S - 1, t === Ri && S > Ea || t === Na && S > Aa)
    return 1;
  for (; ; ) {
    P = f - O, o[u] + 1 < H ? (Y = 0, j = o[u]) : o[u] >= H ? (Y = z[o[u] - H], j = F[o[u] - H]) : (Y = 96, j = 0), k = 1 << f - O, w = 1 << y, m = w;
    do
      w -= k, r[A + (x >> O) + w] = P << 24 | Y << 16 | j | 0;
    while (w !== 0);
    for (k = 1 << f - 1; x & k; )
      k >>= 1;
    if (k !== 0 ? (x &= k - 1, x += k) : x = 0, u++, --C[f] === 0) {
      if (f === d)
        break;
      f = e[n + o[u]];
    }
    if (f > p && (x & I) !== N) {
      for (O === 0 && (O = p), A += m, y = f - O, D = 1 << y; y + O < d && (D -= C[y + O], !(D <= 0)); )
        y++, D <<= 1;
      if (S += 1 << y, t === Ri && S > Ea || t === Na && S > Aa)
        return 1;
      N = x & I, r[N] = p << 24 | y << 16 | A - a | 0;
    }
  }
  return x !== 0 && (r[A + x] = f - O << 24 | 64 << 16 | 0), s.bits = p, 0;
};
var vn = wp;
const vp = 0, zs = 1, Ps = 2, {
  Z_FINISH: Ra,
  Z_BLOCK: yp,
  Z_TREES: Cn,
  Z_OK: Ve,
  Z_STREAM_END: bp,
  Z_NEED_DICT: xp,
  Z_STREAM_ERROR: he,
  Z_DATA_ERROR: Hs,
  Z_MEM_ERROR: Bs,
  Z_BUF_ERROR: kp,
  Z_DEFLATED: Ia
} = Ls, mi = 16180, Da = 16181, $a = 16182, Ma = 16183, Oa = 16184, La = 16185, Ca = 16186, Fa = 16187, za = 16188, Pa = 16189, si = 16190, ke = 16191, Ii = 16192, Ha = 16193, Di = 16194, Ba = 16195, Ua = 16196, Va = 16197, Ga = 16198, Fn = 16199, zn = 16200, qa = 16201, Za = 16202, Wa = 16203, Ya = 16204, Xa = 16205, $i = 16206, Ka = 16207, Ja = 16208, Ct = 16209, Us = 16210, Vs = 16211, Tp = 852, Ep = 592, Ap = 15, Sp = Ap, Qa = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function Np() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const qe = (t) => {
  if (!t)
    return 1;
  const e = t.state;
  return !e || e.strm !== t || e.mode < mi || e.mode > Vs ? 1 : 0;
}, Gs = (t) => {
  if (qe(t))
    return he;
  const e = t.state;
  return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = e.wrap & 1), e.mode = mi, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(Tp), e.distcode = e.distdyn = new Int32Array(Ep), e.sane = 1, e.back = -1, Ve;
}, qs = (t) => {
  if (qe(t))
    return he;
  const e = t.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, Gs(t);
}, Zs = (t, e) => {
  let n;
  if (qe(t))
    return he;
  const i = t.state;
  return e < 0 ? (n = 0, e = -e) : (n = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? he : (i.window !== null && i.wbits !== e && (i.window = null), i.wrap = n, i.wbits = e, qs(t));
}, Ws = (t, e) => {
  if (!t)
    return he;
  const n = new Np();
  t.state = n, n.strm = t, n.window = null, n.mode = mi;
  const i = Zs(t, e);
  return i !== Ve && (t.state = null), i;
}, Rp = (t) => Ws(t, Sp);
let ja = !0, Mi, Oi;
const Ip = (t) => {
  if (ja) {
    Mi = new Int32Array(512), Oi = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      t.lens[e++] = 8;
    for (; e < 256; )
      t.lens[e++] = 9;
    for (; e < 280; )
      t.lens[e++] = 7;
    for (; e < 288; )
      t.lens[e++] = 8;
    for (vn(zs, t.lens, 0, 288, Mi, 0, t.work, { bits: 9 }), e = 0; e < 32; )
      t.lens[e++] = 5;
    vn(Ps, t.lens, 0, 32, Oi, 0, t.work, { bits: 5 }), ja = !1;
  }
  t.lencode = Mi, t.lenbits = 9, t.distcode = Oi, t.distbits = 5;
}, Ys = (t, e, n, i) => {
  let r;
  const a = t.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), i >= a.wsize ? (a.window.set(e.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (r = a.wsize - a.wnext, r > i && (r = i), a.window.set(e.subarray(n - i, n - i + r), a.wnext), i -= r, i ? (a.window.set(e.subarray(n - i, n), 0), a.wnext = i, a.whave = a.wsize) : (a.wnext += r, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))), 0;
}, Dp = (t, e) => {
  let n, i, r, a, o, s, c, f, u, m, d, p, y, O, D = 0, S, x, k, w, N, I, A, F;
  const H = new Uint8Array(4);
  let C, v;
  const z = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (qe(t) || !t.output || !t.input && t.avail_in !== 0)
    return he;
  n = t.state, n.mode === ke && (n.mode = Ii), o = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, s = t.avail_in, f = n.hold, u = n.bits, m = s, d = c, F = Ve;
  t:
    for (; ; )
      switch (n.mode) {
        case mi:
          if (n.wrap === 0) {
            n.mode = Ii;
            break;
          }
          for (; u < 16; ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          if (n.wrap & 2 && f === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, H[0] = f & 255, H[1] = f >>> 8 & 255, n.check = we(n.check, H, 2, 0), f = 0, u = 0, n.mode = Da;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((f & 255) << 8) + (f >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = Ct;
            break;
          }
          if ((f & 15) !== Ia) {
            t.msg = "unknown compression method", n.mode = Ct;
            break;
          }
          if (f >>>= 4, u -= 4, A = (f & 15) + 8, n.wbits === 0 && (n.wbits = A), A > 15 || A > n.wbits) {
            t.msg = "invalid window size", n.mode = Ct;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = f & 512 ? Pa : ke, f = 0, u = 0;
          break;
        case Da:
          for (; u < 16; ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          if (n.flags = f, (n.flags & 255) !== Ia) {
            t.msg = "unknown compression method", n.mode = Ct;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = Ct;
            break;
          }
          n.head && (n.head.text = f >> 8 & 1), n.flags & 512 && n.wrap & 4 && (H[0] = f & 255, H[1] = f >>> 8 & 255, n.check = we(n.check, H, 2, 0)), f = 0, u = 0, n.mode = $a;
        /* falls through */
        case $a:
          for (; u < 32; ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          n.head && (n.head.time = f), n.flags & 512 && n.wrap & 4 && (H[0] = f & 255, H[1] = f >>> 8 & 255, H[2] = f >>> 16 & 255, H[3] = f >>> 24 & 255, n.check = we(n.check, H, 4, 0)), f = 0, u = 0, n.mode = Ma;
        /* falls through */
        case Ma:
          for (; u < 16; ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          n.head && (n.head.xflags = f & 255, n.head.os = f >> 8), n.flags & 512 && n.wrap & 4 && (H[0] = f & 255, H[1] = f >>> 8 & 255, n.check = we(n.check, H, 2, 0)), f = 0, u = 0, n.mode = Oa;
        /* falls through */
        case Oa:
          if (n.flags & 1024) {
            for (; u < 16; ) {
              if (s === 0)
                break t;
              s--, f += i[a++] << u, u += 8;
            }
            n.length = f, n.head && (n.head.extra_len = f), n.flags & 512 && n.wrap & 4 && (H[0] = f & 255, H[1] = f >>> 8 & 255, n.check = we(n.check, H, 2, 0)), f = 0, u = 0;
          } else n.head && (n.head.extra = null);
          n.mode = La;
        /* falls through */
        case La:
          if (n.flags & 1024 && (p = n.length, p > s && (p = s), p && (n.head && (A = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            i.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + p
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            A
          )), n.flags & 512 && n.wrap & 4 && (n.check = we(n.check, i, p, a)), s -= p, a += p, n.length -= p), n.length))
            break t;
          n.length = 0, n.mode = Ca;
        /* falls through */
        case Ca:
          if (n.flags & 2048) {
            if (s === 0)
              break t;
            p = 0;
            do
              A = i[a + p++], n.head && A && n.length < 65536 && (n.head.name += String.fromCharCode(A));
            while (A && p < s);
            if (n.flags & 512 && n.wrap & 4 && (n.check = we(n.check, i, p, a)), s -= p, a += p, A)
              break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Fa;
        /* falls through */
        case Fa:
          if (n.flags & 4096) {
            if (s === 0)
              break t;
            p = 0;
            do
              A = i[a + p++], n.head && A && n.length < 65536 && (n.head.comment += String.fromCharCode(A));
            while (A && p < s);
            if (n.flags & 512 && n.wrap & 4 && (n.check = we(n.check, i, p, a)), s -= p, a += p, A)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = za;
        /* falls through */
        case za:
          if (n.flags & 512) {
            for (; u < 16; ) {
              if (s === 0)
                break t;
              s--, f += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && f !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = Ct;
              break;
            }
            f = 0, u = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = ke;
          break;
        case Pa:
          for (; u < 32; ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          t.adler = n.check = Qa(f), f = 0, u = 0, n.mode = si;
        /* falls through */
        case si:
          if (n.havedict === 0)
            return t.next_out = o, t.avail_out = c, t.next_in = a, t.avail_in = s, n.hold = f, n.bits = u, xp;
          t.adler = n.check = 1, n.mode = ke;
        /* falls through */
        case ke:
          if (e === yp || e === Cn)
            break t;
        /* falls through */
        case Ii:
          if (n.last) {
            f >>>= u & 7, u -= u & 7, n.mode = $i;
            break;
          }
          for (; u < 3; ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          switch (n.last = f & 1, f >>>= 1, u -= 1, f & 3) {
            case 0:
              n.mode = Ha;
              break;
            case 1:
              if (Ip(n), n.mode = Fn, e === Cn) {
                f >>>= 2, u -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = Ua;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = Ct;
          }
          f >>>= 2, u -= 2;
          break;
        case Ha:
          for (f >>>= u & 7, u -= u & 7; u < 32; ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          if ((f & 65535) !== (f >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = Ct;
            break;
          }
          if (n.length = f & 65535, f = 0, u = 0, n.mode = Di, e === Cn)
            break t;
        /* falls through */
        case Di:
          n.mode = Ba;
        /* falls through */
        case Ba:
          if (p = n.length, p) {
            if (p > s && (p = s), p > c && (p = c), p === 0)
              break t;
            r.set(i.subarray(a, a + p), o), s -= p, a += p, c -= p, o += p, n.length -= p;
            break;
          }
          n.mode = ke;
          break;
        case Ua:
          for (; u < 14; ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          if (n.nlen = (f & 31) + 257, f >>>= 5, u -= 5, n.ndist = (f & 31) + 1, f >>>= 5, u -= 5, n.ncode = (f & 15) + 4, f >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = Ct;
            break;
          }
          n.have = 0, n.mode = Va;
        /* falls through */
        case Va:
          for (; n.have < n.ncode; ) {
            for (; u < 3; ) {
              if (s === 0)
                break t;
              s--, f += i[a++] << u, u += 8;
            }
            n.lens[z[n.have++]] = f & 7, f >>>= 3, u -= 3;
          }
          for (; n.have < 19; )
            n.lens[z[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, C = { bits: n.lenbits }, F = vn(vp, n.lens, 0, 19, n.lencode, 0, n.work, C), n.lenbits = C.bits, F) {
            t.msg = "invalid code lengths set", n.mode = Ct;
            break;
          }
          n.have = 0, n.mode = Ga;
        /* falls through */
        case Ga:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; D = n.lencode[f & (1 << n.lenbits) - 1], S = D >>> 24, x = D >>> 16 & 255, k = D & 65535, !(S <= u); ) {
              if (s === 0)
                break t;
              s--, f += i[a++] << u, u += 8;
            }
            if (k < 16)
              f >>>= S, u -= S, n.lens[n.have++] = k;
            else {
              if (k === 16) {
                for (v = S + 2; u < v; ) {
                  if (s === 0)
                    break t;
                  s--, f += i[a++] << u, u += 8;
                }
                if (f >>>= S, u -= S, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = Ct;
                  break;
                }
                A = n.lens[n.have - 1], p = 3 + (f & 3), f >>>= 2, u -= 2;
              } else if (k === 17) {
                for (v = S + 3; u < v; ) {
                  if (s === 0)
                    break t;
                  s--, f += i[a++] << u, u += 8;
                }
                f >>>= S, u -= S, A = 0, p = 3 + (f & 7), f >>>= 3, u -= 3;
              } else {
                for (v = S + 7; u < v; ) {
                  if (s === 0)
                    break t;
                  s--, f += i[a++] << u, u += 8;
                }
                f >>>= S, u -= S, A = 0, p = 11 + (f & 127), f >>>= 7, u -= 7;
              }
              if (n.have + p > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = Ct;
                break;
              }
              for (; p--; )
                n.lens[n.have++] = A;
            }
          }
          if (n.mode === Ct)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = Ct;
            break;
          }
          if (n.lenbits = 9, C = { bits: n.lenbits }, F = vn(zs, n.lens, 0, n.nlen, n.lencode, 0, n.work, C), n.lenbits = C.bits, F) {
            t.msg = "invalid literal/lengths set", n.mode = Ct;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, C = { bits: n.distbits }, F = vn(Ps, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, C), n.distbits = C.bits, F) {
            t.msg = "invalid distances set", n.mode = Ct;
            break;
          }
          if (n.mode = Fn, e === Cn)
            break t;
        /* falls through */
        case Fn:
          n.mode = zn;
        /* falls through */
        case zn:
          if (s >= 6 && c >= 258) {
            t.next_out = o, t.avail_out = c, t.next_in = a, t.avail_in = s, n.hold = f, n.bits = u, dp(t, d), o = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, s = t.avail_in, f = n.hold, u = n.bits, n.mode === ke && (n.back = -1);
            break;
          }
          for (n.back = 0; D = n.lencode[f & (1 << n.lenbits) - 1], S = D >>> 24, x = D >>> 16 & 255, k = D & 65535, !(S <= u); ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          if (x && (x & 240) === 0) {
            for (w = S, N = x, I = k; D = n.lencode[I + ((f & (1 << w + N) - 1) >> w)], S = D >>> 24, x = D >>> 16 & 255, k = D & 65535, !(w + S <= u); ) {
              if (s === 0)
                break t;
              s--, f += i[a++] << u, u += 8;
            }
            f >>>= w, u -= w, n.back += w;
          }
          if (f >>>= S, u -= S, n.back += S, n.length = k, x === 0) {
            n.mode = Xa;
            break;
          }
          if (x & 32) {
            n.back = -1, n.mode = ke;
            break;
          }
          if (x & 64) {
            t.msg = "invalid literal/length code", n.mode = Ct;
            break;
          }
          n.extra = x & 15, n.mode = qa;
        /* falls through */
        case qa:
          if (n.extra) {
            for (v = n.extra; u < v; ) {
              if (s === 0)
                break t;
              s--, f += i[a++] << u, u += 8;
            }
            n.length += f & (1 << n.extra) - 1, f >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = Za;
        /* falls through */
        case Za:
          for (; D = n.distcode[f & (1 << n.distbits) - 1], S = D >>> 24, x = D >>> 16 & 255, k = D & 65535, !(S <= u); ) {
            if (s === 0)
              break t;
            s--, f += i[a++] << u, u += 8;
          }
          if ((x & 240) === 0) {
            for (w = S, N = x, I = k; D = n.distcode[I + ((f & (1 << w + N) - 1) >> w)], S = D >>> 24, x = D >>> 16 & 255, k = D & 65535, !(w + S <= u); ) {
              if (s === 0)
                break t;
              s--, f += i[a++] << u, u += 8;
            }
            f >>>= w, u -= w, n.back += w;
          }
          if (f >>>= S, u -= S, n.back += S, x & 64) {
            t.msg = "invalid distance code", n.mode = Ct;
            break;
          }
          n.offset = k, n.extra = x & 15, n.mode = Wa;
        /* falls through */
        case Wa:
          if (n.extra) {
            for (v = n.extra; u < v; ) {
              if (s === 0)
                break t;
              s--, f += i[a++] << u, u += 8;
            }
            n.offset += f & (1 << n.extra) - 1, f >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = Ct;
            break;
          }
          n.mode = Ya;
        /* falls through */
        case Ya:
          if (c === 0)
            break t;
          if (p = d - c, n.offset > p) {
            if (p = n.offset - p, p > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = Ct;
              break;
            }
            p > n.wnext ? (p -= n.wnext, y = n.wsize - p) : y = n.wnext - p, p > n.length && (p = n.length), O = n.window;
          } else
            O = r, y = o - n.offset, p = n.length;
          p > c && (p = c), c -= p, n.length -= p;
          do
            r[o++] = O[y++];
          while (--p);
          n.length === 0 && (n.mode = zn);
          break;
        case Xa:
          if (c === 0)
            break t;
          r[o++] = n.length, c--, n.mode = zn;
          break;
        case $i:
          if (n.wrap) {
            for (; u < 32; ) {
              if (s === 0)
                break t;
              s--, f |= i[a++] << u, u += 8;
            }
            if (d -= c, t.total_out += d, n.total += d, n.wrap & 4 && d && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? we(n.check, r, d, o - d) : dr(n.check, r, d, o - d)), d = c, n.wrap & 4 && (n.flags ? f : Qa(f)) !== n.check) {
              t.msg = "incorrect data check", n.mode = Ct;
              break;
            }
            f = 0, u = 0;
          }
          n.mode = Ka;
        /* falls through */
        case Ka:
          if (n.wrap && n.flags) {
            for (; u < 32; ) {
              if (s === 0)
                break t;
              s--, f += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && f !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = Ct;
              break;
            }
            f = 0, u = 0;
          }
          n.mode = Ja;
        /* falls through */
        case Ja:
          F = bp;
          break t;
        case Ct:
          F = Hs;
          break t;
        case Us:
          return Bs;
        case Vs:
        /* falls through */
        default:
          return he;
      }
  return t.next_out = o, t.avail_out = c, t.next_in = a, t.avail_in = s, n.hold = f, n.bits = u, (n.wsize || d !== t.avail_out && n.mode < Ct && (n.mode < $i || e !== Ra)) && Ys(t, t.output, t.next_out, d - t.avail_out), m -= t.avail_in, d -= t.avail_out, t.total_in += m, t.total_out += d, n.total += d, n.wrap & 4 && d && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? we(n.check, r, d, t.next_out - d) : dr(n.check, r, d, t.next_out - d)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === ke ? 128 : 0) + (n.mode === Fn || n.mode === Di ? 256 : 0), (m === 0 && d === 0 || e === Ra) && F === Ve && (F = kp), F;
}, $p = (t) => {
  if (qe(t))
    return he;
  let e = t.state;
  return e.window && (e.window = null), t.state = null, Ve;
}, Mp = (t, e) => {
  if (qe(t))
    return he;
  const n = t.state;
  return (n.wrap & 2) === 0 ? he : (n.head = e, e.done = !1, Ve);
}, Op = (t, e) => {
  const n = e.length;
  let i, r, a;
  return qe(t) || (i = t.state, i.wrap !== 0 && i.mode !== si) ? he : i.mode === si && (r = 1, r = dr(r, e, n, 0), r !== i.check) ? Hs : (a = Ys(t, e, n, n), a ? (i.mode = Us, Bs) : (i.havedict = 1, Ve));
};
var Lp = qs, Cp = Zs, Fp = Gs, zp = Rp, Pp = Ws, Hp = Dp, Bp = $p, Up = Mp, Vp = Op, Gp = "pako inflate (from Nodeca project)", Ee = {
  inflateReset: Lp,
  inflateReset2: Cp,
  inflateResetKeep: Fp,
  inflateInit: zp,
  inflateInit2: Pp,
  inflate: Hp,
  inflateEnd: Bp,
  inflateGetHeader: Up,
  inflateSetDictionary: Vp,
  inflateInfo: Gp
};
function qp() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Zp = qp;
const Xs = Object.prototype.toString, {
  Z_NO_FLUSH: Wp,
  Z_FINISH: Yp,
  Z_OK: Tn,
  Z_STREAM_END: Li,
  Z_NEED_DICT: Ci,
  Z_STREAM_ERROR: Xp,
  Z_DATA_ERROR: to,
  Z_MEM_ERROR: Kp
} = Ls;
function gi(t) {
  this.options = Cs.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new up(), this.strm.avail_out = 0;
  let n = Ee.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (n !== Tn)
    throw new Error(pr[n]);
  if (this.header = new Zp(), Ee.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = _r.string2buf(e.dictionary) : Xs.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = Ee.inflateSetDictionary(this.strm, e.dictionary), n !== Tn)))
    throw new Error(pr[n]);
}
gi.prototype.push = function(t, e) {
  const n = this.strm, i = this.options.chunkSize, r = this.options.dictionary;
  let a, o, s;
  if (this.ended) return !1;
  for (e === ~~e ? o = e : o = e === !0 ? Yp : Wp, Xs.call(t) === "[object ArrayBuffer]" ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length; ; ) {
    for (n.avail_out === 0 && (n.output = new Uint8Array(i), n.next_out = 0, n.avail_out = i), a = Ee.inflate(n, o), a === Ci && r && (a = Ee.inflateSetDictionary(n, r), a === Tn ? a = Ee.inflate(n, o) : a === to && (a = Ci)); n.avail_in > 0 && a === Li && n.state.wrap > 0 && t[n.next_in] !== 0; )
      Ee.inflateReset(n), a = Ee.inflate(n, o);
    switch (a) {
      case Xp:
      case to:
      case Ci:
      case Kp:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (s = n.avail_out, n.next_out && (n.avail_out === 0 || a === Li))
      if (this.options.to === "string") {
        let c = _r.utf8border(n.output, n.next_out), f = n.next_out - c, u = _r.buf2string(n.output, c);
        n.next_out = f, n.avail_out = i - f, f && n.output.set(n.output.subarray(c, c + f), 0), this.onData(u);
      } else
        this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
    if (!(a === Tn && s === 0)) {
      if (a === Li)
        return a = Ee.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (n.avail_in === 0) break;
    }
  }
  return !0;
};
gi.prototype.onData = function(t) {
  this.chunks.push(t);
};
gi.prototype.onEnd = function(t) {
  t === Tn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Cs.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function Jp(t, e) {
  const n = new gi(e);
  if (n.push(t), n.err) throw n.msg || pr[n.err];
  return n.result;
}
var Qp = Jp, jp = {
  inflate: Qp
};
const { inflate: t_ } = jp;
var e_ = t_;
const n_ = { refName: "seq_id" }, i_ = { seq_id: "refName" };
class li {
  constructor(e, n, i) {
    this.ncFeature = e, this.uniqueId = i || e.id(), this.parentHandle = n;
  }
  jb2TagToJb1Tag(e) {
    return (n_[e] || e).toLowerCase();
  }
  jb1TagToJb2Tag(e) {
    const n = e.toLowerCase();
    return i_[n] || n;
  }
  get(e) {
    const n = this.ncFeature.get(this.jb2TagToJb1Tag(e));
    return n && e === "subfeatures" ? n.map((i) => new li(i, this)) : n;
  }
  /**
   * Get an array listing which data keys are present in this feature.
   */
  tags() {
    return this.ncFeature.tags().map((e) => this.jb1TagToJb2Tag(e));
  }
  /**
   * Get the unique ID of this feature.
   */
  id() {
    return this.uniqueId;
  }
  /**
   * Get this feature's parent feature, or undefined if none.
   */
  parent() {
    return this.parentHandle;
  }
  /**
   * Get an array of child features, or undefined if none.
   */
  children() {
    return this.get("subfeatures");
  }
  toJSON() {
    const e = { uniqueId: this.id(), subfeatures: [] };
    return this.ncFeature.tags().forEach((n) => {
      const i = this.jb1TagToJb2Tag(n), r = this.ncFeature.get(n);
      i === "subfeatures" ? e.children = (r || []).map(
        (a) => new li(a, this).toJSON()
      ) : e[i] = r;
    }), {
      ...e,
      fmin: e.start,
      fmax: e.end,
      seqId: e.refName
    };
  }
}
function r_(t) {
  return t[0] === 31 && t[1] === 139 && t[2] === 8;
}
async function a_(t) {
  const e = await fetch(t);
  if (!e.ok)
    throw new Error(`HTTP ${e.status} fetching ${t}`);
  const n = await e.arrayBuffer();
  return r_(new Uint8Array(n)) ? e_(n) : n;
}
async function V_({
  urlTemplate: t,
  baseUrl: e,
  region: n
}) {
  const i = new B0({
    urlTemplate: t,
    baseUrl: e,
    readFile: a_
  }), r = [];
  for await (const a of i.getFeatures({
    refName: n.chromosome,
    start: n.start,
    end: n.end
  }))
    r.push(new li(a).toJSON());
  return r;
}
async function G_({
  region: t,
  baseUrl: e,
  genome: n,
  track: i,
  extra: r = ".json?ignoreCache=true&flatten=false"
}) {
  const a = `${t.chromosome}:${t.start}..${t.end}`, o = `${e}/${encodeURI(n)}/${encodeURI(i)}/${encodeURIComponent(a)}${r}`, s = await fetch(o);
  if (!s.ok)
    throw new Error(`HTTP ${s.status} fetching ${o}`);
  return s.json();
}
const Pn = {};
function eo(t) {
  return (typeof t == "object" && t !== null && "message" in t ? t.message : `${t}`).replace(/\.$/, "");
}
class Fe {
  constructor(e, n = {}) {
    this.baseOverrides = {}, this.url = e;
    const i = n.fetch || globalThis.fetch.bind(globalThis);
    n.overrides && (this.baseOverrides = n.overrides), this.fetchImplementation = i;
  }
  async fetch(e, n) {
    let i;
    try {
      i = await this.fetchImplementation(e, n);
    } catch (r) {
      if (`${r}`.includes("Failed to fetch")) {
        console.warn(`generic-filehandle: refetching ${e} to attempt to work around chrome CORS header caching bug`);
        try {
          i = await this.fetchImplementation(e, {
            ...n,
            cache: "reload"
          });
        } catch (a) {
          throw new Error(`${eo(a)} fetching ${e}`, { cause: a });
        }
      } else
        throw new Error(`${eo(r)} fetching ${e}`, { cause: r });
    }
    return i;
  }
  async read(e, n, i = {}) {
    const { headers: r = {}, signal: a, overrides: o = {} } = i;
    e < 1 / 0 ? r.range = `bytes=${n}-${n + e}` : e === 1 / 0 && n !== 0 && (r.range = `bytes=${n}-`);
    const s = await this.fetch(this.url, {
      ...this.baseOverrides,
      ...o,
      headers: {
        ...r,
        ...o.headers,
        ...this.baseOverrides.headers
      },
      method: "GET",
      redirect: "follow",
      mode: "cors",
      signal: a
    });
    if (!s.ok)
      throw new Error(`HTTP ${s.status} fetching ${this.url}`);
    if (s.status === 200 && n === 0 || s.status === 206) {
      const c = await s.arrayBuffer(), f = s.headers.get("content-range"), u = /\/(\d+)$/.exec(f || "");
      return u != null && u[1] && (this._stat = {
        size: parseInt(u[1], 10)
      }), new Uint8Array(c.slice(0, e));
    }
    throw s.status === 200 ? new Error(`${this.url} fetch returned status 200, expected 206`) : new Error(`HTTP ${s.status} fetching ${this.url}`);
  }
  async readFile(e = {}) {
    let n, i;
    typeof e == "string" ? (n = e, i = {}) : (n = e.encoding, i = e, delete i.encoding);
    const { headers: r = {}, signal: a, overrides: o = {} } = i, s = await this.fetch(this.url, {
      headers: r,
      method: "GET",
      redirect: "follow",
      mode: "cors",
      signal: a,
      ...this.baseOverrides,
      ...o
    });
    if (s.status !== 200)
      throw new Error(`HTTP ${s.status} fetching ${this.url}`);
    if (n === "utf8")
      return s.text();
    if (n)
      throw new Error(`unsupported encoding: ${n}`);
    return new Uint8Array(await s.arrayBuffer());
  }
  async stat() {
    if (!this._stat && (await this.read(10, 0), !this._stat))
      throw new Error(`unable to determine size of file at ${this.url}`);
    return this._stat;
  }
  async close() {
  }
}
var Fi = {}, no;
function Ie() {
  return no || (no = 1, function(t) {
    var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    function n(a, o) {
      return Object.prototype.hasOwnProperty.call(a, o);
    }
    t.assign = function(a) {
      for (var o = Array.prototype.slice.call(arguments, 1); o.length; ) {
        var s = o.shift();
        if (s) {
          if (typeof s != "object")
            throw new TypeError(s + "must be non-object");
          for (var c in s)
            n(s, c) && (a[c] = s[c]);
        }
      }
      return a;
    }, t.shrinkBuf = function(a, o) {
      return a.length === o ? a : a.subarray ? a.subarray(0, o) : (a.length = o, a);
    };
    var i = {
      arraySet: function(a, o, s, c, f) {
        if (o.subarray && a.subarray) {
          a.set(o.subarray(s, s + c), f);
          return;
        }
        for (var u = 0; u < c; u++)
          a[f + u] = o[s + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var o, s, c, f, u, m;
        for (c = 0, o = 0, s = a.length; o < s; o++)
          c += a[o].length;
        for (m = new Uint8Array(c), f = 0, o = 0, s = a.length; o < s; o++)
          u = a[o], m.set(u, f), f += u.length;
        return m;
      }
    }, r = {
      arraySet: function(a, o, s, c, f) {
        for (var u = 0; u < c; u++)
          a[f + u] = o[s + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        return [].concat.apply([], a);
      }
    };
    t.setTyped = function(a) {
      a ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, i)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, r));
    }, t.setTyped(e);
  }(Fi)), Fi;
}
var We = {}, de = {}, Me = {}, io;
function o_() {
  if (io) return Me;
  io = 1;
  var t = Ie(), e = 4, n = 0, i = 1, r = 2;
  function a(g) {
    for (var B = g.length; --B >= 0; )
      g[B] = 0;
  }
  var o = 0, s = 1, c = 2, f = 3, u = 258, m = 29, d = 256, p = d + 1 + m, y = 30, O = 19, D = 2 * p + 1, S = 15, x = 16, k = 7, w = 256, N = 16, I = 17, A = 18, F = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), H = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), C = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), v = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = 512, P = new Array((p + 2) * 2);
  a(P);
  var Y = new Array(y * 2);
  a(Y);
  var j = new Array(z);
  a(j);
  var gt = new Array(u - f + 1);
  a(gt);
  var X = new Array(m);
  a(X);
  var nt = new Array(y);
  a(nt);
  function Q(g, B, U, W, T) {
    this.static_tree = g, this.extra_bits = B, this.extra_base = U, this.elems = W, this.max_length = T, this.has_stree = g && g.length;
  }
  var at, yt, tt;
  function ot(g, B) {
    this.dyn_tree = g, this.max_code = 0, this.stat_desc = B;
  }
  function Et(g) {
    return g < 256 ? j[g] : j[256 + (g >>> 7)];
  }
  function ht(g, B) {
    g.pending_buf[g.pending++] = B & 255, g.pending_buf[g.pending++] = B >>> 8 & 255;
  }
  function lt(g, B, U) {
    g.bi_valid > x - U ? (g.bi_buf |= B << g.bi_valid & 65535, ht(g, g.bi_buf), g.bi_buf = B >> x - g.bi_valid, g.bi_valid += U - x) : (g.bi_buf |= B << g.bi_valid & 65535, g.bi_valid += U);
  }
  function pt(g, B, U) {
    lt(
      g,
      U[B * 2],
      U[B * 2 + 1]
      /*.Len*/
    );
  }
  function et(g, B) {
    var U = 0;
    do
      U |= g & 1, g >>>= 1, U <<= 1;
    while (--B > 0);
    return U >>> 1;
  }
  function wt(g) {
    g.bi_valid === 16 ? (ht(g, g.bi_buf), g.bi_buf = 0, g.bi_valid = 0) : g.bi_valid >= 8 && (g.pending_buf[g.pending++] = g.bi_buf & 255, g.bi_buf >>= 8, g.bi_valid -= 8);
  }
  function Rt(g, B) {
    var U = B.dyn_tree, W = B.max_code, T = B.stat_desc.static_tree, L = B.stat_desc.has_stree, h = B.stat_desc.extra_bits, V = B.stat_desc.extra_base, ct = B.stat_desc.max_length, l, $, M, _, b, R, it = 0;
    for (_ = 0; _ <= S; _++)
      g.bl_count[_] = 0;
    for (U[g.heap[g.heap_max] * 2 + 1] = 0, l = g.heap_max + 1; l < D; l++)
      $ = g.heap[l], _ = U[U[$ * 2 + 1] * 2 + 1] + 1, _ > ct && (_ = ct, it++), U[$ * 2 + 1] = _, !($ > W) && (g.bl_count[_]++, b = 0, $ >= V && (b = h[$ - V]), R = U[$ * 2], g.opt_len += R * (_ + b), L && (g.static_len += R * (T[$ * 2 + 1] + b)));
    if (it !== 0) {
      do {
        for (_ = ct - 1; g.bl_count[_] === 0; )
          _--;
        g.bl_count[_]--, g.bl_count[_ + 1] += 2, g.bl_count[ct]--, it -= 2;
      } while (it > 0);
      for (_ = ct; _ !== 0; _--)
        for ($ = g.bl_count[_]; $ !== 0; )
          M = g.heap[--l], !(M > W) && (U[M * 2 + 1] !== _ && (g.opt_len += (_ - U[M * 2 + 1]) * U[M * 2], U[M * 2 + 1] = _), $--);
    }
  }
  function Nt(g, B, U) {
    var W = new Array(S + 1), T = 0, L, h;
    for (L = 1; L <= S; L++)
      W[L] = T = T + U[L - 1] << 1;
    for (h = 0; h <= B; h++) {
      var V = g[h * 2 + 1];
      V !== 0 && (g[h * 2] = et(W[V]++, V));
    }
  }
  function ft() {
    var g, B, U, W, T, L = new Array(S + 1);
    for (U = 0, W = 0; W < m - 1; W++)
      for (X[W] = U, g = 0; g < 1 << F[W]; g++)
        gt[U++] = W;
    for (gt[U - 1] = W, T = 0, W = 0; W < 16; W++)
      for (nt[W] = T, g = 0; g < 1 << H[W]; g++)
        j[T++] = W;
    for (T >>= 7; W < y; W++)
      for (nt[W] = T << 7, g = 0; g < 1 << H[W] - 7; g++)
        j[256 + T++] = W;
    for (B = 0; B <= S; B++)
      L[B] = 0;
    for (g = 0; g <= 143; )
      P[g * 2 + 1] = 8, g++, L[8]++;
    for (; g <= 255; )
      P[g * 2 + 1] = 9, g++, L[9]++;
    for (; g <= 279; )
      P[g * 2 + 1] = 7, g++, L[7]++;
    for (; g <= 287; )
      P[g * 2 + 1] = 8, g++, L[8]++;
    for (Nt(P, p + 1, L), g = 0; g < y; g++)
      Y[g * 2 + 1] = 5, Y[g * 2] = et(g, 5);
    at = new Q(P, F, d + 1, p, S), yt = new Q(Y, H, 0, y, S), tt = new Q(new Array(0), C, 0, O, k);
  }
  function G(g) {
    var B;
    for (B = 0; B < p; B++)
      g.dyn_ltree[B * 2] = 0;
    for (B = 0; B < y; B++)
      g.dyn_dtree[B * 2] = 0;
    for (B = 0; B < O; B++)
      g.bl_tree[B * 2] = 0;
    g.dyn_ltree[w * 2] = 1, g.opt_len = g.static_len = 0, g.last_lit = g.matches = 0;
  }
  function vt(g) {
    g.bi_valid > 8 ? ht(g, g.bi_buf) : g.bi_valid > 0 && (g.pending_buf[g.pending++] = g.bi_buf), g.bi_buf = 0, g.bi_valid = 0;
  }
  function It(g, B, U, W) {
    vt(g), ht(g, U), ht(g, ~U), t.arraySet(g.pending_buf, g.window, B, U, g.pending), g.pending += U;
  }
  function dt(g, B, U, W) {
    var T = B * 2, L = U * 2;
    return g[T] < g[L] || g[T] === g[L] && W[B] <= W[U];
  }
  function mt(g, B, U) {
    for (var W = g.heap[U], T = U << 1; T <= g.heap_len && (T < g.heap_len && dt(B, g.heap[T + 1], g.heap[T], g.depth) && T++, !dt(B, W, g.heap[T], g.depth)); )
      g.heap[U] = g.heap[T], U = T, T <<= 1;
    g.heap[U] = W;
  }
  function q(g, B, U) {
    var W, T, L = 0, h, V;
    if (g.last_lit !== 0)
      do
        W = g.pending_buf[g.d_buf + L * 2] << 8 | g.pending_buf[g.d_buf + L * 2 + 1], T = g.pending_buf[g.l_buf + L], L++, W === 0 ? pt(g, T, B) : (h = gt[T], pt(g, h + d + 1, B), V = F[h], V !== 0 && (T -= X[h], lt(g, T, V)), W--, h = Et(W), pt(g, h, U), V = H[h], V !== 0 && (W -= nt[h], lt(g, W, V)));
      while (L < g.last_lit);
    pt(g, w, B);
  }
  function kt(g, B) {
    var U = B.dyn_tree, W = B.stat_desc.static_tree, T = B.stat_desc.has_stree, L = B.stat_desc.elems, h, V, ct = -1, l;
    for (g.heap_len = 0, g.heap_max = D, h = 0; h < L; h++)
      U[h * 2] !== 0 ? (g.heap[++g.heap_len] = ct = h, g.depth[h] = 0) : U[h * 2 + 1] = 0;
    for (; g.heap_len < 2; )
      l = g.heap[++g.heap_len] = ct < 2 ? ++ct : 0, U[l * 2] = 1, g.depth[l] = 0, g.opt_len--, T && (g.static_len -= W[l * 2 + 1]);
    for (B.max_code = ct, h = g.heap_len >> 1; h >= 1; h--)
      mt(g, U, h);
    l = L;
    do
      h = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[
        1
        /*SMALLEST*/
      ] = g.heap[g.heap_len--], mt(
        g,
        U,
        1
        /*SMALLEST*/
      ), V = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[--g.heap_max] = h, g.heap[--g.heap_max] = V, U[l * 2] = U[h * 2] + U[V * 2], g.depth[l] = (g.depth[h] >= g.depth[V] ? g.depth[h] : g.depth[V]) + 1, U[h * 2 + 1] = U[V * 2 + 1] = l, g.heap[
        1
        /*SMALLEST*/
      ] = l++, mt(
        g,
        U,
        1
        /*SMALLEST*/
      );
    while (g.heap_len >= 2);
    g.heap[--g.heap_max] = g.heap[
      1
      /*SMALLEST*/
    ], Rt(g, B), Nt(U, ct, g.bl_count);
  }
  function Wt(g, B, U) {
    var W, T = -1, L, h = B[0 * 2 + 1], V = 0, ct = 7, l = 4;
    for (h === 0 && (ct = 138, l = 3), B[(U + 1) * 2 + 1] = 65535, W = 0; W <= U; W++)
      L = h, h = B[(W + 1) * 2 + 1], !(++V < ct && L === h) && (V < l ? g.bl_tree[L * 2] += V : L !== 0 ? (L !== T && g.bl_tree[L * 2]++, g.bl_tree[N * 2]++) : V <= 10 ? g.bl_tree[I * 2]++ : g.bl_tree[A * 2]++, V = 0, T = L, h === 0 ? (ct = 138, l = 3) : L === h ? (ct = 6, l = 3) : (ct = 7, l = 4));
  }
  function Mt(g, B, U) {
    var W, T = -1, L, h = B[0 * 2 + 1], V = 0, ct = 7, l = 4;
    for (h === 0 && (ct = 138, l = 3), W = 0; W <= U; W++)
      if (L = h, h = B[(W + 1) * 2 + 1], !(++V < ct && L === h)) {
        if (V < l)
          do
            pt(g, L, g.bl_tree);
          while (--V !== 0);
        else L !== 0 ? (L !== T && (pt(g, L, g.bl_tree), V--), pt(g, N, g.bl_tree), lt(g, V - 3, 2)) : V <= 10 ? (pt(g, I, g.bl_tree), lt(g, V - 3, 3)) : (pt(g, A, g.bl_tree), lt(g, V - 11, 7));
        V = 0, T = L, h === 0 ? (ct = 138, l = 3) : L === h ? (ct = 6, l = 3) : (ct = 7, l = 4);
      }
  }
  function Ft(g) {
    var B;
    for (Wt(g, g.dyn_ltree, g.l_desc.max_code), Wt(g, g.dyn_dtree, g.d_desc.max_code), kt(g, g.bl_desc), B = O - 1; B >= 3 && g.bl_tree[v[B] * 2 + 1] === 0; B--)
      ;
    return g.opt_len += 3 * (B + 1) + 5 + 5 + 4, B;
  }
  function Kt(g, B, U, W) {
    var T;
    for (lt(g, B - 257, 5), lt(g, U - 1, 5), lt(g, W - 4, 4), T = 0; T < W; T++)
      lt(g, g.bl_tree[v[T] * 2 + 1], 3);
    Mt(g, g.dyn_ltree, B - 1), Mt(g, g.dyn_dtree, U - 1);
  }
  function rt(g) {
    var B = 4093624447, U;
    for (U = 0; U <= 31; U++, B >>>= 1)
      if (B & 1 && g.dyn_ltree[U * 2] !== 0)
        return n;
    if (g.dyn_ltree[9 * 2] !== 0 || g.dyn_ltree[10 * 2] !== 0 || g.dyn_ltree[13 * 2] !== 0)
      return i;
    for (U = 32; U < d; U++)
      if (g.dyn_ltree[U * 2] !== 0)
        return i;
    return n;
  }
  var At = !1;
  function Dt(g) {
    At || (ft(), At = !0), g.l_desc = new ot(g.dyn_ltree, at), g.d_desc = new ot(g.dyn_dtree, yt), g.bl_desc = new ot(g.bl_tree, tt), g.bi_buf = 0, g.bi_valid = 0, G(g);
  }
  function _t(g, B, U, W) {
    lt(g, (o << 1) + (W ? 1 : 0), 3), It(g, B, U);
  }
  function $t(g) {
    lt(g, s << 1, 3), pt(g, w, P), wt(g);
  }
  function zt(g, B, U, W) {
    var T, L, h = 0;
    g.level > 0 ? (g.strm.data_type === r && (g.strm.data_type = rt(g)), kt(g, g.l_desc), kt(g, g.d_desc), h = Ft(g), T = g.opt_len + 3 + 7 >>> 3, L = g.static_len + 3 + 7 >>> 3, L <= T && (T = L)) : T = L = U + 5, U + 4 <= T && B !== -1 ? _t(g, B, U, W) : g.strategy === e || L === T ? (lt(g, (s << 1) + (W ? 1 : 0), 3), q(g, P, Y)) : (lt(g, (c << 1) + (W ? 1 : 0), 3), Kt(g, g.l_desc.max_code + 1, g.d_desc.max_code + 1, h + 1), q(g, g.dyn_ltree, g.dyn_dtree)), G(g), W && vt(g);
  }
  function Pt(g, B, U) {
    return g.pending_buf[g.d_buf + g.last_lit * 2] = B >>> 8 & 255, g.pending_buf[g.d_buf + g.last_lit * 2 + 1] = B & 255, g.pending_buf[g.l_buf + g.last_lit] = U & 255, g.last_lit++, B === 0 ? g.dyn_ltree[U * 2]++ : (g.matches++, B--, g.dyn_ltree[(gt[U] + d + 1) * 2]++, g.dyn_dtree[Et(B) * 2]++), g.last_lit === g.lit_bufsize - 1;
  }
  return Me._tr_init = Dt, Me._tr_stored_block = _t, Me._tr_flush_block = zt, Me._tr_tally = Pt, Me._tr_align = $t, Me;
}
var zi, ro;
function Ks() {
  if (ro) return zi;
  ro = 1;
  function t(e, n, i, r) {
    for (var a = e & 65535 | 0, o = e >>> 16 & 65535 | 0, s = 0; i !== 0; ) {
      s = i > 2e3 ? 2e3 : i, i -= s;
      do
        a = a + n[r++] | 0, o = o + a | 0;
      while (--s);
      a %= 65521, o %= 65521;
    }
    return a | o << 16 | 0;
  }
  return zi = t, zi;
}
var Pi, ao;
function Js() {
  if (ao) return Pi;
  ao = 1;
  function t() {
    for (var i, r = [], a = 0; a < 256; a++) {
      i = a;
      for (var o = 0; o < 8; o++)
        i = i & 1 ? 3988292384 ^ i >>> 1 : i >>> 1;
      r[a] = i;
    }
    return r;
  }
  var e = t();
  function n(i, r, a, o) {
    var s = e, c = o + a;
    i ^= -1;
    for (var f = o; f < c; f++)
      i = i >>> 8 ^ s[(i ^ r[f]) & 255];
    return i ^ -1;
  }
  return Pi = n, Pi;
}
var Hi, oo;
function Lr() {
  return oo || (oo = 1, Hi = {
    2: "need dictionary",
    /* Z_NEED_DICT       2  */
    1: "stream end",
    /* Z_STREAM_END      1  */
    0: "",
    /* Z_OK              0  */
    "-1": "file error",
    /* Z_ERRNO         (-1) */
    "-2": "stream error",
    /* Z_STREAM_ERROR  (-2) */
    "-3": "data error",
    /* Z_DATA_ERROR    (-3) */
    "-4": "insufficient memory",
    /* Z_MEM_ERROR     (-4) */
    "-5": "buffer error",
    /* Z_BUF_ERROR     (-5) */
    "-6": "incompatible version"
    /* Z_VERSION_ERROR (-6) */
  }), Hi;
}
var so;
function s_() {
  if (so) return de;
  so = 1;
  var t = Ie(), e = o_(), n = Ks(), i = Js(), r = Lr(), a = 0, o = 1, s = 3, c = 4, f = 5, u = 0, m = 1, d = -2, p = -3, y = -5, O = -1, D = 1, S = 2, x = 3, k = 4, w = 0, N = 2, I = 8, A = 9, F = 15, H = 8, C = 29, v = 256, z = v + 1 + C, P = 30, Y = 19, j = 2 * z + 1, gt = 15, X = 3, nt = 258, Q = nt + X + 1, at = 32, yt = 42, tt = 69, ot = 73, Et = 91, ht = 103, lt = 113, pt = 666, et = 1, wt = 2, Rt = 3, Nt = 4, ft = 3;
  function G(l, $) {
    return l.msg = r[$], $;
  }
  function vt(l) {
    return (l << 1) - (l > 4 ? 9 : 0);
  }
  function It(l) {
    for (var $ = l.length; --$ >= 0; )
      l[$] = 0;
  }
  function dt(l) {
    var $ = l.state, M = $.pending;
    M > l.avail_out && (M = l.avail_out), M !== 0 && (t.arraySet(l.output, $.pending_buf, $.pending_out, M, l.next_out), l.next_out += M, $.pending_out += M, l.total_out += M, l.avail_out -= M, $.pending -= M, $.pending === 0 && ($.pending_out = 0));
  }
  function mt(l, $) {
    e._tr_flush_block(l, l.block_start >= 0 ? l.block_start : -1, l.strstart - l.block_start, $), l.block_start = l.strstart, dt(l.strm);
  }
  function q(l, $) {
    l.pending_buf[l.pending++] = $;
  }
  function kt(l, $) {
    l.pending_buf[l.pending++] = $ >>> 8 & 255, l.pending_buf[l.pending++] = $ & 255;
  }
  function Wt(l, $, M, _) {
    var b = l.avail_in;
    return b > _ && (b = _), b === 0 ? 0 : (l.avail_in -= b, t.arraySet($, l.input, l.next_in, b, M), l.state.wrap === 1 ? l.adler = n(l.adler, $, b, M) : l.state.wrap === 2 && (l.adler = i(l.adler, $, b, M)), l.next_in += b, l.total_in += b, b);
  }
  function Mt(l, $) {
    var M = l.max_chain_length, _ = l.strstart, b, R, it = l.prev_length, K = l.nice_match, J = l.strstart > l.w_size - Q ? l.strstart - (l.w_size - Q) : 0, bt = l.window, se = l.w_mask, Ot = l.prev, Tt = l.strstart + nt, St = bt[_ + it - 1], Ht = bt[_ + it];
    l.prev_length >= l.good_match && (M >>= 2), K > l.lookahead && (K = l.lookahead);
    do
      if (b = $, !(bt[b + it] !== Ht || bt[b + it - 1] !== St || bt[b] !== bt[_] || bt[++b] !== bt[_ + 1])) {
        _ += 2, b++;
        do
          ;
        while (bt[++_] === bt[++b] && bt[++_] === bt[++b] && bt[++_] === bt[++b] && bt[++_] === bt[++b] && bt[++_] === bt[++b] && bt[++_] === bt[++b] && bt[++_] === bt[++b] && bt[++_] === bt[++b] && _ < Tt);
        if (R = nt - (Tt - _), _ = Tt - nt, R > it) {
          if (l.match_start = $, it = R, R >= K)
            break;
          St = bt[_ + it - 1], Ht = bt[_ + it];
        }
      }
    while (($ = Ot[$ & se]) > J && --M !== 0);
    return it <= l.lookahead ? it : l.lookahead;
  }
  function Ft(l) {
    var $ = l.w_size, M, _, b, R, it;
    do {
      if (R = l.window_size - l.lookahead - l.strstart, l.strstart >= $ + ($ - Q)) {
        t.arraySet(l.window, l.window, $, $, 0), l.match_start -= $, l.strstart -= $, l.block_start -= $, _ = l.hash_size, M = _;
        do
          b = l.head[--M], l.head[M] = b >= $ ? b - $ : 0;
        while (--_);
        _ = $, M = _;
        do
          b = l.prev[--M], l.prev[M] = b >= $ ? b - $ : 0;
        while (--_);
        R += $;
      }
      if (l.strm.avail_in === 0)
        break;
      if (_ = Wt(l.strm, l.window, l.strstart + l.lookahead, R), l.lookahead += _, l.lookahead + l.insert >= X)
        for (it = l.strstart - l.insert, l.ins_h = l.window[it], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[it + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[it + X - 1]) & l.hash_mask, l.prev[it & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = it, it++, l.insert--, !(l.lookahead + l.insert < X)); )
          ;
    } while (l.lookahead < Q && l.strm.avail_in !== 0);
  }
  function Kt(l, $) {
    var M = 65535;
    for (M > l.pending_buf_size - 5 && (M = l.pending_buf_size - 5); ; ) {
      if (l.lookahead <= 1) {
        if (Ft(l), l.lookahead === 0 && $ === a)
          return et;
        if (l.lookahead === 0)
          break;
      }
      l.strstart += l.lookahead, l.lookahead = 0;
      var _ = l.block_start + M;
      if ((l.strstart === 0 || l.strstart >= _) && (l.lookahead = l.strstart - _, l.strstart = _, mt(l, !1), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - Q && (mt(l, !1), l.strm.avail_out === 0))
        return et;
    }
    return l.insert = 0, $ === c ? (mt(l, !0), l.strm.avail_out === 0 ? Rt : Nt) : (l.strstart > l.block_start && (mt(l, !1), l.strm.avail_out === 0), et);
  }
  function rt(l, $) {
    for (var M, _; ; ) {
      if (l.lookahead < Q) {
        if (Ft(l), l.lookahead < Q && $ === a)
          return et;
        if (l.lookahead === 0)
          break;
      }
      if (M = 0, l.lookahead >= X && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + X - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), M !== 0 && l.strstart - M <= l.w_size - Q && (l.match_length = Mt(l, M)), l.match_length >= X)
        if (_ = e._tr_tally(l, l.strstart - l.match_start, l.match_length - X), l.lookahead -= l.match_length, l.match_length <= l.max_lazy_match && l.lookahead >= X) {
          l.match_length--;
          do
            l.strstart++, l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + X - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart;
          while (--l.match_length !== 0);
          l.strstart++;
        } else
          l.strstart += l.match_length, l.match_length = 0, l.ins_h = l.window[l.strstart], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + 1]) & l.hash_mask;
      else
        _ = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++;
      if (_ && (mt(l, !1), l.strm.avail_out === 0))
        return et;
    }
    return l.insert = l.strstart < X - 1 ? l.strstart : X - 1, $ === c ? (mt(l, !0), l.strm.avail_out === 0 ? Rt : Nt) : l.last_lit && (mt(l, !1), l.strm.avail_out === 0) ? et : wt;
  }
  function At(l, $) {
    for (var M, _, b; ; ) {
      if (l.lookahead < Q) {
        if (Ft(l), l.lookahead < Q && $ === a)
          return et;
        if (l.lookahead === 0)
          break;
      }
      if (M = 0, l.lookahead >= X && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + X - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = X - 1, M !== 0 && l.prev_length < l.max_lazy_match && l.strstart - M <= l.w_size - Q && (l.match_length = Mt(l, M), l.match_length <= 5 && (l.strategy === D || l.match_length === X && l.strstart - l.match_start > 4096) && (l.match_length = X - 1)), l.prev_length >= X && l.match_length <= l.prev_length) {
        b = l.strstart + l.lookahead - X, _ = e._tr_tally(l, l.strstart - 1 - l.prev_match, l.prev_length - X), l.lookahead -= l.prev_length - 1, l.prev_length -= 2;
        do
          ++l.strstart <= b && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + X - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart);
        while (--l.prev_length !== 0);
        if (l.match_available = 0, l.match_length = X - 1, l.strstart++, _ && (mt(l, !1), l.strm.avail_out === 0))
          return et;
      } else if (l.match_available) {
        if (_ = e._tr_tally(l, 0, l.window[l.strstart - 1]), _ && mt(l, !1), l.strstart++, l.lookahead--, l.strm.avail_out === 0)
          return et;
      } else
        l.match_available = 1, l.strstart++, l.lookahead--;
    }
    return l.match_available && (_ = e._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < X - 1 ? l.strstart : X - 1, $ === c ? (mt(l, !0), l.strm.avail_out === 0 ? Rt : Nt) : l.last_lit && (mt(l, !1), l.strm.avail_out === 0) ? et : wt;
  }
  function Dt(l, $) {
    for (var M, _, b, R, it = l.window; ; ) {
      if (l.lookahead <= nt) {
        if (Ft(l), l.lookahead <= nt && $ === a)
          return et;
        if (l.lookahead === 0)
          break;
      }
      if (l.match_length = 0, l.lookahead >= X && l.strstart > 0 && (b = l.strstart - 1, _ = it[b], _ === it[++b] && _ === it[++b] && _ === it[++b])) {
        R = l.strstart + nt;
        do
          ;
        while (_ === it[++b] && _ === it[++b] && _ === it[++b] && _ === it[++b] && _ === it[++b] && _ === it[++b] && _ === it[++b] && _ === it[++b] && b < R);
        l.match_length = nt - (R - b), l.match_length > l.lookahead && (l.match_length = l.lookahead);
      }
      if (l.match_length >= X ? (M = e._tr_tally(l, 1, l.match_length - X), l.lookahead -= l.match_length, l.strstart += l.match_length, l.match_length = 0) : (M = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++), M && (mt(l, !1), l.strm.avail_out === 0))
        return et;
    }
    return l.insert = 0, $ === c ? (mt(l, !0), l.strm.avail_out === 0 ? Rt : Nt) : l.last_lit && (mt(l, !1), l.strm.avail_out === 0) ? et : wt;
  }
  function _t(l, $) {
    for (var M; ; ) {
      if (l.lookahead === 0 && (Ft(l), l.lookahead === 0)) {
        if ($ === a)
          return et;
        break;
      }
      if (l.match_length = 0, M = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++, M && (mt(l, !1), l.strm.avail_out === 0))
        return et;
    }
    return l.insert = 0, $ === c ? (mt(l, !0), l.strm.avail_out === 0 ? Rt : Nt) : l.last_lit && (mt(l, !1), l.strm.avail_out === 0) ? et : wt;
  }
  function $t(l, $, M, _, b) {
    this.good_length = l, this.max_lazy = $, this.nice_length = M, this.max_chain = _, this.func = b;
  }
  var zt;
  zt = [
    /*      good lazy nice chain */
    new $t(0, 0, 0, 0, Kt),
    /* 0 store only */
    new $t(4, 4, 8, 4, rt),
    /* 1 max speed, no lazy matches */
    new $t(4, 5, 16, 8, rt),
    /* 2 */
    new $t(4, 6, 32, 32, rt),
    /* 3 */
    new $t(4, 4, 16, 16, At),
    /* 4 lazy matches */
    new $t(8, 16, 32, 32, At),
    /* 5 */
    new $t(8, 16, 128, 128, At),
    /* 6 */
    new $t(8, 32, 128, 256, At),
    /* 7 */
    new $t(32, 128, 258, 1024, At),
    /* 8 */
    new $t(32, 258, 258, 4096, At)
    /* 9 max compression */
  ];
  function Pt(l) {
    l.window_size = 2 * l.w_size, It(l.head), l.max_lazy_match = zt[l.level].max_lazy, l.good_match = zt[l.level].good_length, l.nice_match = zt[l.level].nice_length, l.max_chain_length = zt[l.level].max_chain, l.strstart = 0, l.block_start = 0, l.lookahead = 0, l.insert = 0, l.match_length = l.prev_length = X - 1, l.match_available = 0, l.ins_h = 0;
  }
  function g() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = I, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(j * 2), this.dyn_dtree = new t.Buf16((2 * P + 1) * 2), this.bl_tree = new t.Buf16((2 * Y + 1) * 2), It(this.dyn_ltree), It(this.dyn_dtree), It(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(gt + 1), this.heap = new t.Buf16(2 * z + 1), It(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * z + 1), It(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function B(l) {
    var $;
    return !l || !l.state ? G(l, d) : (l.total_in = l.total_out = 0, l.data_type = N, $ = l.state, $.pending = 0, $.pending_out = 0, $.wrap < 0 && ($.wrap = -$.wrap), $.status = $.wrap ? yt : lt, l.adler = $.wrap === 2 ? 0 : 1, $.last_flush = a, e._tr_init($), u);
  }
  function U(l) {
    var $ = B(l);
    return $ === u && Pt(l.state), $;
  }
  function W(l, $) {
    return !l || !l.state || l.state.wrap !== 2 ? d : (l.state.gzhead = $, u);
  }
  function T(l, $, M, _, b, R) {
    if (!l)
      return d;
    var it = 1;
    if ($ === O && ($ = 6), _ < 0 ? (it = 0, _ = -_) : _ > 15 && (it = 2, _ -= 16), b < 1 || b > A || M !== I || _ < 8 || _ > 15 || $ < 0 || $ > 9 || R < 0 || R > k)
      return G(l, d);
    _ === 8 && (_ = 9);
    var K = new g();
    return l.state = K, K.strm = l, K.wrap = it, K.gzhead = null, K.w_bits = _, K.w_size = 1 << K.w_bits, K.w_mask = K.w_size - 1, K.hash_bits = b + 7, K.hash_size = 1 << K.hash_bits, K.hash_mask = K.hash_size - 1, K.hash_shift = ~~((K.hash_bits + X - 1) / X), K.window = new t.Buf8(K.w_size * 2), K.head = new t.Buf16(K.hash_size), K.prev = new t.Buf16(K.w_size), K.lit_bufsize = 1 << b + 6, K.pending_buf_size = K.lit_bufsize * 4, K.pending_buf = new t.Buf8(K.pending_buf_size), K.d_buf = 1 * K.lit_bufsize, K.l_buf = 3 * K.lit_bufsize, K.level = $, K.strategy = R, K.method = M, U(l);
  }
  function L(l, $) {
    return T(l, $, I, F, H, w);
  }
  function h(l, $) {
    var M, _, b, R;
    if (!l || !l.state || $ > f || $ < 0)
      return l ? G(l, d) : d;
    if (_ = l.state, !l.output || !l.input && l.avail_in !== 0 || _.status === pt && $ !== c)
      return G(l, l.avail_out === 0 ? y : d);
    if (_.strm = l, M = _.last_flush, _.last_flush = $, _.status === yt)
      if (_.wrap === 2)
        l.adler = 0, q(_, 31), q(_, 139), q(_, 8), _.gzhead ? (q(
          _,
          (_.gzhead.text ? 1 : 0) + (_.gzhead.hcrc ? 2 : 0) + (_.gzhead.extra ? 4 : 0) + (_.gzhead.name ? 8 : 0) + (_.gzhead.comment ? 16 : 0)
        ), q(_, _.gzhead.time & 255), q(_, _.gzhead.time >> 8 & 255), q(_, _.gzhead.time >> 16 & 255), q(_, _.gzhead.time >> 24 & 255), q(_, _.level === 9 ? 2 : _.strategy >= S || _.level < 2 ? 4 : 0), q(_, _.gzhead.os & 255), _.gzhead.extra && _.gzhead.extra.length && (q(_, _.gzhead.extra.length & 255), q(_, _.gzhead.extra.length >> 8 & 255)), _.gzhead.hcrc && (l.adler = i(l.adler, _.pending_buf, _.pending, 0)), _.gzindex = 0, _.status = tt) : (q(_, 0), q(_, 0), q(_, 0), q(_, 0), q(_, 0), q(_, _.level === 9 ? 2 : _.strategy >= S || _.level < 2 ? 4 : 0), q(_, ft), _.status = lt);
      else {
        var it = I + (_.w_bits - 8 << 4) << 8, K = -1;
        _.strategy >= S || _.level < 2 ? K = 0 : _.level < 6 ? K = 1 : _.level === 6 ? K = 2 : K = 3, it |= K << 6, _.strstart !== 0 && (it |= at), it += 31 - it % 31, _.status = lt, kt(_, it), _.strstart !== 0 && (kt(_, l.adler >>> 16), kt(_, l.adler & 65535)), l.adler = 1;
      }
    if (_.status === tt)
      if (_.gzhead.extra) {
        for (b = _.pending; _.gzindex < (_.gzhead.extra.length & 65535) && !(_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > b && (l.adler = i(l.adler, _.pending_buf, _.pending - b, b)), dt(l), b = _.pending, _.pending === _.pending_buf_size)); )
          q(_, _.gzhead.extra[_.gzindex] & 255), _.gzindex++;
        _.gzhead.hcrc && _.pending > b && (l.adler = i(l.adler, _.pending_buf, _.pending - b, b)), _.gzindex === _.gzhead.extra.length && (_.gzindex = 0, _.status = ot);
      } else
        _.status = ot;
    if (_.status === ot)
      if (_.gzhead.name) {
        b = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > b && (l.adler = i(l.adler, _.pending_buf, _.pending - b, b)), dt(l), b = _.pending, _.pending === _.pending_buf_size)) {
            R = 1;
            break;
          }
          _.gzindex < _.gzhead.name.length ? R = _.gzhead.name.charCodeAt(_.gzindex++) & 255 : R = 0, q(_, R);
        } while (R !== 0);
        _.gzhead.hcrc && _.pending > b && (l.adler = i(l.adler, _.pending_buf, _.pending - b, b)), R === 0 && (_.gzindex = 0, _.status = Et);
      } else
        _.status = Et;
    if (_.status === Et)
      if (_.gzhead.comment) {
        b = _.pending;
        do {
          if (_.pending === _.pending_buf_size && (_.gzhead.hcrc && _.pending > b && (l.adler = i(l.adler, _.pending_buf, _.pending - b, b)), dt(l), b = _.pending, _.pending === _.pending_buf_size)) {
            R = 1;
            break;
          }
          _.gzindex < _.gzhead.comment.length ? R = _.gzhead.comment.charCodeAt(_.gzindex++) & 255 : R = 0, q(_, R);
        } while (R !== 0);
        _.gzhead.hcrc && _.pending > b && (l.adler = i(l.adler, _.pending_buf, _.pending - b, b)), R === 0 && (_.status = ht);
      } else
        _.status = ht;
    if (_.status === ht && (_.gzhead.hcrc ? (_.pending + 2 > _.pending_buf_size && dt(l), _.pending + 2 <= _.pending_buf_size && (q(_, l.adler & 255), q(_, l.adler >> 8 & 255), l.adler = 0, _.status = lt)) : _.status = lt), _.pending !== 0) {
      if (dt(l), l.avail_out === 0)
        return _.last_flush = -1, u;
    } else if (l.avail_in === 0 && vt($) <= vt(M) && $ !== c)
      return G(l, y);
    if (_.status === pt && l.avail_in !== 0)
      return G(l, y);
    if (l.avail_in !== 0 || _.lookahead !== 0 || $ !== a && _.status !== pt) {
      var J = _.strategy === S ? _t(_, $) : _.strategy === x ? Dt(_, $) : zt[_.level].func(_, $);
      if ((J === Rt || J === Nt) && (_.status = pt), J === et || J === Rt)
        return l.avail_out === 0 && (_.last_flush = -1), u;
      if (J === wt && ($ === o ? e._tr_align(_) : $ !== f && (e._tr_stored_block(_, 0, 0, !1), $ === s && (It(_.head), _.lookahead === 0 && (_.strstart = 0, _.block_start = 0, _.insert = 0))), dt(l), l.avail_out === 0))
        return _.last_flush = -1, u;
    }
    return $ !== c ? u : _.wrap <= 0 ? m : (_.wrap === 2 ? (q(_, l.adler & 255), q(_, l.adler >> 8 & 255), q(_, l.adler >> 16 & 255), q(_, l.adler >> 24 & 255), q(_, l.total_in & 255), q(_, l.total_in >> 8 & 255), q(_, l.total_in >> 16 & 255), q(_, l.total_in >> 24 & 255)) : (kt(_, l.adler >>> 16), kt(_, l.adler & 65535)), dt(l), _.wrap > 0 && (_.wrap = -_.wrap), _.pending !== 0 ? u : m);
  }
  function V(l) {
    var $;
    return !l || !l.state ? d : ($ = l.state.status, $ !== yt && $ !== tt && $ !== ot && $ !== Et && $ !== ht && $ !== lt && $ !== pt ? G(l, d) : (l.state = null, $ === lt ? G(l, p) : u));
  }
  function ct(l, $) {
    var M = $.length, _, b, R, it, K, J, bt, se;
    if (!l || !l.state || (_ = l.state, it = _.wrap, it === 2 || it === 1 && _.status !== yt || _.lookahead))
      return d;
    for (it === 1 && (l.adler = n(l.adler, $, M, 0)), _.wrap = 0, M >= _.w_size && (it === 0 && (It(_.head), _.strstart = 0, _.block_start = 0, _.insert = 0), se = new t.Buf8(_.w_size), t.arraySet(se, $, M - _.w_size, _.w_size, 0), $ = se, M = _.w_size), K = l.avail_in, J = l.next_in, bt = l.input, l.avail_in = M, l.next_in = 0, l.input = $, Ft(_); _.lookahead >= X; ) {
      b = _.strstart, R = _.lookahead - (X - 1);
      do
        _.ins_h = (_.ins_h << _.hash_shift ^ _.window[b + X - 1]) & _.hash_mask, _.prev[b & _.w_mask] = _.head[_.ins_h], _.head[_.ins_h] = b, b++;
      while (--R);
      _.strstart = b, _.lookahead = X - 1, Ft(_);
    }
    return _.strstart += _.lookahead, _.block_start = _.strstart, _.insert = _.lookahead, _.lookahead = 0, _.match_length = _.prev_length = X - 1, _.match_available = 0, l.next_in = J, l.input = bt, l.avail_in = K, _.wrap = it, u;
  }
  return de.deflateInit = L, de.deflateInit2 = T, de.deflateReset = U, de.deflateResetKeep = B, de.deflateSetHeader = W, de.deflate = h, de.deflateEnd = V, de.deflateSetDictionary = ct, de.deflateInfo = "pako deflate (from Nodeca project)", de;
}
var Oe = {}, lo;
function Qs() {
  if (lo) return Oe;
  lo = 1;
  var t = Ie(), e = !0, n = !0;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch {
    e = !1;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    n = !1;
  }
  for (var i = new t.Buf8(256), r = 0; r < 256; r++)
    i[r] = r >= 252 ? 6 : r >= 248 ? 5 : r >= 240 ? 4 : r >= 224 ? 3 : r >= 192 ? 2 : 1;
  i[254] = i[254] = 1, Oe.string2buf = function(o) {
    var s, c, f, u, m, d = o.length, p = 0;
    for (u = 0; u < d; u++)
      c = o.charCodeAt(u), (c & 64512) === 55296 && u + 1 < d && (f = o.charCodeAt(u + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), u++)), p += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    for (s = new t.Buf8(p), m = 0, u = 0; m < p; u++)
      c = o.charCodeAt(u), (c & 64512) === 55296 && u + 1 < d && (f = o.charCodeAt(u + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), u++)), c < 128 ? s[m++] = c : c < 2048 ? (s[m++] = 192 | c >>> 6, s[m++] = 128 | c & 63) : c < 65536 ? (s[m++] = 224 | c >>> 12, s[m++] = 128 | c >>> 6 & 63, s[m++] = 128 | c & 63) : (s[m++] = 240 | c >>> 18, s[m++] = 128 | c >>> 12 & 63, s[m++] = 128 | c >>> 6 & 63, s[m++] = 128 | c & 63);
    return s;
  };
  function a(o, s) {
    if (s < 65534 && (o.subarray && n || !o.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(o, s));
    for (var c = "", f = 0; f < s; f++)
      c += String.fromCharCode(o[f]);
    return c;
  }
  return Oe.buf2binstring = function(o) {
    return a(o, o.length);
  }, Oe.binstring2buf = function(o) {
    for (var s = new t.Buf8(o.length), c = 0, f = s.length; c < f; c++)
      s[c] = o.charCodeAt(c);
    return s;
  }, Oe.buf2string = function(o, s) {
    var c, f, u, m, d = s || o.length, p = new Array(d * 2);
    for (f = 0, c = 0; c < d; ) {
      if (u = o[c++], u < 128) {
        p[f++] = u;
        continue;
      }
      if (m = i[u], m > 4) {
        p[f++] = 65533, c += m - 1;
        continue;
      }
      for (u &= m === 2 ? 31 : m === 3 ? 15 : 7; m > 1 && c < d; )
        u = u << 6 | o[c++] & 63, m--;
      if (m > 1) {
        p[f++] = 65533;
        continue;
      }
      u < 65536 ? p[f++] = u : (u -= 65536, p[f++] = 55296 | u >> 10 & 1023, p[f++] = 56320 | u & 1023);
    }
    return a(p, f);
  }, Oe.utf8border = function(o, s) {
    var c;
    for (s = s || o.length, s > o.length && (s = o.length), c = s - 1; c >= 0 && (o[c] & 192) === 128; )
      c--;
    return c < 0 || c === 0 ? s : c + i[o[c]] > s ? c : s;
  }, Oe;
}
var Bi, co;
function js() {
  if (co) return Bi;
  co = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return Bi = t, Bi;
}
var fo;
function l_() {
  if (fo) return We;
  fo = 1;
  var t = s_(), e = Ie(), n = Qs(), i = Lr(), r = js(), a = Object.prototype.toString, o = 0, s = 4, c = 0, f = 1, u = 2, m = -1, d = 0, p = 8;
  function y(x) {
    if (!(this instanceof y)) return new y(x);
    this.options = e.assign({
      level: m,
      method: p,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: d,
      to: ""
    }, x || {});
    var k = this.options;
    k.raw && k.windowBits > 0 ? k.windowBits = -k.windowBits : k.gzip && k.windowBits > 0 && k.windowBits < 16 && (k.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new r(), this.strm.avail_out = 0;
    var w = t.deflateInit2(
      this.strm,
      k.level,
      k.method,
      k.windowBits,
      k.memLevel,
      k.strategy
    );
    if (w !== c)
      throw new Error(i[w]);
    if (k.header && t.deflateSetHeader(this.strm, k.header), k.dictionary) {
      var N;
      if (typeof k.dictionary == "string" ? N = n.string2buf(k.dictionary) : a.call(k.dictionary) === "[object ArrayBuffer]" ? N = new Uint8Array(k.dictionary) : N = k.dictionary, w = t.deflateSetDictionary(this.strm, N), w !== c)
        throw new Error(i[w]);
      this._dict_set = !0;
    }
  }
  y.prototype.push = function(x, k) {
    var w = this.strm, N = this.options.chunkSize, I, A;
    if (this.ended)
      return !1;
    A = k === ~~k ? k : k === !0 ? s : o, typeof x == "string" ? w.input = n.string2buf(x) : a.call(x) === "[object ArrayBuffer]" ? w.input = new Uint8Array(x) : w.input = x, w.next_in = 0, w.avail_in = w.input.length;
    do {
      if (w.avail_out === 0 && (w.output = new e.Buf8(N), w.next_out = 0, w.avail_out = N), I = t.deflate(w, A), I !== f && I !== c)
        return this.onEnd(I), this.ended = !0, !1;
      (w.avail_out === 0 || w.avail_in === 0 && (A === s || A === u)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(w.output, w.next_out))) : this.onData(e.shrinkBuf(w.output, w.next_out)));
    } while ((w.avail_in > 0 || w.avail_out === 0) && I !== f);
    return A === s ? (I = t.deflateEnd(this.strm), this.onEnd(I), this.ended = !0, I === c) : (A === u && (this.onEnd(c), w.avail_out = 0), !0);
  }, y.prototype.onData = function(x) {
    this.chunks.push(x);
  }, y.prototype.onEnd = function(x) {
    x === c && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = x, this.msg = this.strm.msg;
  };
  function O(x, k) {
    var w = new y(k);
    if (w.push(x, !0), w.err)
      throw w.msg || i[w.err];
    return w.result;
  }
  function D(x, k) {
    return k = k || {}, k.raw = !0, O(x, k);
  }
  function S(x, k) {
    return k = k || {}, k.gzip = !0, O(x, k);
  }
  return We.Deflate = y, We.deflate = O, We.deflateRaw = D, We.gzip = S, We;
}
var Ye = {}, ce = {}, Ui, uo;
function c_() {
  if (uo) return Ui;
  uo = 1;
  var t = 30, e = 12;
  return Ui = function(i, r) {
    var a, o, s, c, f, u, m, d, p, y, O, D, S, x, k, w, N, I, A, F, H, C, v, z, P;
    a = i.state, o = i.next_in, z = i.input, s = o + (i.avail_in - 5), c = i.next_out, P = i.output, f = c - (r - i.avail_out), u = c + (i.avail_out - 257), m = a.dmax, d = a.wsize, p = a.whave, y = a.wnext, O = a.window, D = a.hold, S = a.bits, x = a.lencode, k = a.distcode, w = (1 << a.lenbits) - 1, N = (1 << a.distbits) - 1;
    t:
      do {
        S < 15 && (D += z[o++] << S, S += 8, D += z[o++] << S, S += 8), I = x[D & w];
        e:
          for (; ; ) {
            if (A = I >>> 24, D >>>= A, S -= A, A = I >>> 16 & 255, A === 0)
              P[c++] = I & 65535;
            else if (A & 16) {
              F = I & 65535, A &= 15, A && (S < A && (D += z[o++] << S, S += 8), F += D & (1 << A) - 1, D >>>= A, S -= A), S < 15 && (D += z[o++] << S, S += 8, D += z[o++] << S, S += 8), I = k[D & N];
              n:
                for (; ; ) {
                  if (A = I >>> 24, D >>>= A, S -= A, A = I >>> 16 & 255, A & 16) {
                    if (H = I & 65535, A &= 15, S < A && (D += z[o++] << S, S += 8, S < A && (D += z[o++] << S, S += 8)), H += D & (1 << A) - 1, H > m) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break t;
                    }
                    if (D >>>= A, S -= A, A = c - f, H > A) {
                      if (A = H - A, A > p && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break t;
                      }
                      if (C = 0, v = O, y === 0) {
                        if (C += d - A, A < F) {
                          F -= A;
                          do
                            P[c++] = O[C++];
                          while (--A);
                          C = c - H, v = P;
                        }
                      } else if (y < A) {
                        if (C += d + y - A, A -= y, A < F) {
                          F -= A;
                          do
                            P[c++] = O[C++];
                          while (--A);
                          if (C = 0, y < F) {
                            A = y, F -= A;
                            do
                              P[c++] = O[C++];
                            while (--A);
                            C = c - H, v = P;
                          }
                        }
                      } else if (C += y - A, A < F) {
                        F -= A;
                        do
                          P[c++] = O[C++];
                        while (--A);
                        C = c - H, v = P;
                      }
                      for (; F > 2; )
                        P[c++] = v[C++], P[c++] = v[C++], P[c++] = v[C++], F -= 3;
                      F && (P[c++] = v[C++], F > 1 && (P[c++] = v[C++]));
                    } else {
                      C = c - H;
                      do
                        P[c++] = P[C++], P[c++] = P[C++], P[c++] = P[C++], F -= 3;
                      while (F > 2);
                      F && (P[c++] = P[C++], F > 1 && (P[c++] = P[C++]));
                    }
                  } else if ((A & 64) === 0) {
                    I = k[(I & 65535) + (D & (1 << A) - 1)];
                    continue n;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((A & 64) === 0) {
              I = x[(I & 65535) + (D & (1 << A) - 1)];
              continue e;
            } else if (A & 32) {
              a.mode = e;
              break t;
            } else {
              i.msg = "invalid literal/length code", a.mode = t;
              break t;
            }
            break;
          }
      } while (o < s && c < u);
    F = S >> 3, o -= F, S -= F << 3, D &= (1 << S) - 1, i.next_in = o, i.next_out = c, i.avail_in = o < s ? 5 + (s - o) : 5 - (o - s), i.avail_out = c < u ? 257 + (u - c) : 257 - (c - u), a.hold = D, a.bits = S;
  }, Ui;
}
var Vi, ho;
function f_() {
  if (ho) return Vi;
  ho = 1;
  var t = Ie(), e = 15, n = 852, i = 592, r = 0, a = 1, o = 2, s = [
    /* Length codes 257..285 base */
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
  ], c = [
    /* Length codes 257..285 extra */
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
  ], f = [
    /* Distance codes 0..29 base */
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
  ], u = [
    /* Distance codes 0..29 extra */
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
  ];
  return Vi = function(d, p, y, O, D, S, x, k) {
    var w = k.bits, N = 0, I = 0, A = 0, F = 0, H = 0, C = 0, v = 0, z = 0, P = 0, Y = 0, j, gt, X, nt, Q, at = null, yt = 0, tt, ot = new t.Buf16(e + 1), Et = new t.Buf16(e + 1), ht = null, lt = 0, pt, et, wt;
    for (N = 0; N <= e; N++)
      ot[N] = 0;
    for (I = 0; I < O; I++)
      ot[p[y + I]]++;
    for (H = w, F = e; F >= 1 && ot[F] === 0; F--)
      ;
    if (H > F && (H = F), F === 0)
      return D[S++] = 1 << 24 | 64 << 16 | 0, D[S++] = 1 << 24 | 64 << 16 | 0, k.bits = 1, 0;
    for (A = 1; A < F && ot[A] === 0; A++)
      ;
    for (H < A && (H = A), z = 1, N = 1; N <= e; N++)
      if (z <<= 1, z -= ot[N], z < 0)
        return -1;
    if (z > 0 && (d === r || F !== 1))
      return -1;
    for (Et[1] = 0, N = 1; N < e; N++)
      Et[N + 1] = Et[N] + ot[N];
    for (I = 0; I < O; I++)
      p[y + I] !== 0 && (x[Et[p[y + I]]++] = I);
    if (d === r ? (at = ht = x, tt = 19) : d === a ? (at = s, yt -= 257, ht = c, lt -= 257, tt = 256) : (at = f, ht = u, tt = -1), Y = 0, I = 0, N = A, Q = S, C = H, v = 0, X = -1, P = 1 << H, nt = P - 1, d === a && P > n || d === o && P > i)
      return 1;
    for (; ; ) {
      pt = N - v, x[I] < tt ? (et = 0, wt = x[I]) : x[I] > tt ? (et = ht[lt + x[I]], wt = at[yt + x[I]]) : (et = 96, wt = 0), j = 1 << N - v, gt = 1 << C, A = gt;
      do
        gt -= j, D[Q + (Y >> v) + gt] = pt << 24 | et << 16 | wt | 0;
      while (gt !== 0);
      for (j = 1 << N - 1; Y & j; )
        j >>= 1;
      if (j !== 0 ? (Y &= j - 1, Y += j) : Y = 0, I++, --ot[N] === 0) {
        if (N === F)
          break;
        N = p[y + x[I]];
      }
      if (N > H && (Y & nt) !== X) {
        for (v === 0 && (v = H), Q += A, C = N - v, z = 1 << C; C + v < F && (z -= ot[C + v], !(z <= 0)); )
          C++, z <<= 1;
        if (P += 1 << C, d === a && P > n || d === o && P > i)
          return 1;
        X = Y & nt, D[X] = H << 24 | C << 16 | Q - S | 0;
      }
    }
    return Y !== 0 && (D[Q + Y] = N - v << 24 | 64 << 16 | 0), k.bits = H, 0;
  }, Vi;
}
var po;
function u_() {
  if (po) return ce;
  po = 1;
  var t = Ie(), e = Ks(), n = Js(), i = c_(), r = f_(), a = 0, o = 1, s = 2, c = 4, f = 5, u = 6, m = 0, d = 1, p = 2, y = -2, O = -3, D = -4, S = -5, x = 8, k = 1, w = 2, N = 3, I = 4, A = 5, F = 6, H = 7, C = 8, v = 9, z = 10, P = 11, Y = 12, j = 13, gt = 14, X = 15, nt = 16, Q = 17, at = 18, yt = 19, tt = 20, ot = 21, Et = 22, ht = 23, lt = 24, pt = 25, et = 26, wt = 27, Rt = 28, Nt = 29, ft = 30, G = 31, vt = 32, It = 852, dt = 592, mt = 15, q = mt;
  function kt(T) {
    return (T >>> 24 & 255) + (T >>> 8 & 65280) + ((T & 65280) << 8) + ((T & 255) << 24);
  }
  function Wt() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function Mt(T) {
    var L;
    return !T || !T.state ? y : (L = T.state, T.total_in = T.total_out = L.total = 0, T.msg = "", L.wrap && (T.adler = L.wrap & 1), L.mode = k, L.last = 0, L.havedict = 0, L.dmax = 32768, L.head = null, L.hold = 0, L.bits = 0, L.lencode = L.lendyn = new t.Buf32(It), L.distcode = L.distdyn = new t.Buf32(dt), L.sane = 1, L.back = -1, m);
  }
  function Ft(T) {
    var L;
    return !T || !T.state ? y : (L = T.state, L.wsize = 0, L.whave = 0, L.wnext = 0, Mt(T));
  }
  function Kt(T, L) {
    var h, V;
    return !T || !T.state || (V = T.state, L < 0 ? (h = 0, L = -L) : (h = (L >> 4) + 1, L < 48 && (L &= 15)), L && (L < 8 || L > 15)) ? y : (V.window !== null && V.wbits !== L && (V.window = null), V.wrap = h, V.wbits = L, Ft(T));
  }
  function rt(T, L) {
    var h, V;
    return T ? (V = new Wt(), T.state = V, V.window = null, h = Kt(T, L), h !== m && (T.state = null), h) : y;
  }
  function At(T) {
    return rt(T, q);
  }
  var Dt = !0, _t, $t;
  function zt(T) {
    if (Dt) {
      var L;
      for (_t = new t.Buf32(512), $t = new t.Buf32(32), L = 0; L < 144; )
        T.lens[L++] = 8;
      for (; L < 256; )
        T.lens[L++] = 9;
      for (; L < 280; )
        T.lens[L++] = 7;
      for (; L < 288; )
        T.lens[L++] = 8;
      for (r(o, T.lens, 0, 288, _t, 0, T.work, { bits: 9 }), L = 0; L < 32; )
        T.lens[L++] = 5;
      r(s, T.lens, 0, 32, $t, 0, T.work, { bits: 5 }), Dt = !1;
    }
    T.lencode = _t, T.lenbits = 9, T.distcode = $t, T.distbits = 5;
  }
  function Pt(T, L, h, V) {
    var ct, l = T.state;
    return l.window === null && (l.wsize = 1 << l.wbits, l.wnext = 0, l.whave = 0, l.window = new t.Buf8(l.wsize)), V >= l.wsize ? (t.arraySet(l.window, L, h - l.wsize, l.wsize, 0), l.wnext = 0, l.whave = l.wsize) : (ct = l.wsize - l.wnext, ct > V && (ct = V), t.arraySet(l.window, L, h - V, ct, l.wnext), V -= ct, V ? (t.arraySet(l.window, L, h - V, V, 0), l.wnext = V, l.whave = l.wsize) : (l.wnext += ct, l.wnext === l.wsize && (l.wnext = 0), l.whave < l.wsize && (l.whave += ct))), 0;
  }
  function g(T, L) {
    var h, V, ct, l, $, M, _, b, R, it, K, J, bt, se, Ot = 0, Tt, St, Ht, Xt, De, Se, Bt, Ut, Gt = new t.Buf8(4), le, ae, rn = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!T || !T.state || !T.output || !T.input && T.avail_in !== 0)
      return y;
    h = T.state, h.mode === Y && (h.mode = j), $ = T.next_out, ct = T.output, _ = T.avail_out, l = T.next_in, V = T.input, M = T.avail_in, b = h.hold, R = h.bits, it = M, K = _, Ut = m;
    t:
      for (; ; )
        switch (h.mode) {
          case k:
            if (h.wrap === 0) {
              h.mode = j;
              break;
            }
            for (; R < 16; ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            if (h.wrap & 2 && b === 35615) {
              h.check = 0, Gt[0] = b & 255, Gt[1] = b >>> 8 & 255, h.check = n(h.check, Gt, 2, 0), b = 0, R = 0, h.mode = w;
              break;
            }
            if (h.flags = 0, h.head && (h.head.done = !1), !(h.wrap & 1) || /* check if zlib header allowed */
            (((b & 255) << 8) + (b >> 8)) % 31) {
              T.msg = "incorrect header check", h.mode = ft;
              break;
            }
            if ((b & 15) !== x) {
              T.msg = "unknown compression method", h.mode = ft;
              break;
            }
            if (b >>>= 4, R -= 4, Bt = (b & 15) + 8, h.wbits === 0)
              h.wbits = Bt;
            else if (Bt > h.wbits) {
              T.msg = "invalid window size", h.mode = ft;
              break;
            }
            h.dmax = 1 << Bt, T.adler = h.check = 1, h.mode = b & 512 ? z : Y, b = 0, R = 0;
            break;
          case w:
            for (; R < 16; ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            if (h.flags = b, (h.flags & 255) !== x) {
              T.msg = "unknown compression method", h.mode = ft;
              break;
            }
            if (h.flags & 57344) {
              T.msg = "unknown header flags set", h.mode = ft;
              break;
            }
            h.head && (h.head.text = b >> 8 & 1), h.flags & 512 && (Gt[0] = b & 255, Gt[1] = b >>> 8 & 255, h.check = n(h.check, Gt, 2, 0)), b = 0, R = 0, h.mode = N;
          /* falls through */
          case N:
            for (; R < 32; ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            h.head && (h.head.time = b), h.flags & 512 && (Gt[0] = b & 255, Gt[1] = b >>> 8 & 255, Gt[2] = b >>> 16 & 255, Gt[3] = b >>> 24 & 255, h.check = n(h.check, Gt, 4, 0)), b = 0, R = 0, h.mode = I;
          /* falls through */
          case I:
            for (; R < 16; ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            h.head && (h.head.xflags = b & 255, h.head.os = b >> 8), h.flags & 512 && (Gt[0] = b & 255, Gt[1] = b >>> 8 & 255, h.check = n(h.check, Gt, 2, 0)), b = 0, R = 0, h.mode = A;
          /* falls through */
          case A:
            if (h.flags & 1024) {
              for (; R < 16; ) {
                if (M === 0)
                  break t;
                M--, b += V[l++] << R, R += 8;
              }
              h.length = b, h.head && (h.head.extra_len = b), h.flags & 512 && (Gt[0] = b & 255, Gt[1] = b >>> 8 & 255, h.check = n(h.check, Gt, 2, 0)), b = 0, R = 0;
            } else h.head && (h.head.extra = null);
            h.mode = F;
          /* falls through */
          case F:
            if (h.flags & 1024 && (J = h.length, J > M && (J = M), J && (h.head && (Bt = h.head.extra_len - h.length, h.head.extra || (h.head.extra = new Array(h.head.extra_len)), t.arraySet(
              h.head.extra,
              V,
              l,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              J,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Bt
            )), h.flags & 512 && (h.check = n(h.check, V, J, l)), M -= J, l += J, h.length -= J), h.length))
              break t;
            h.length = 0, h.mode = H;
          /* falls through */
          case H:
            if (h.flags & 2048) {
              if (M === 0)
                break t;
              J = 0;
              do
                Bt = V[l + J++], h.head && Bt && h.length < 65536 && (h.head.name += String.fromCharCode(Bt));
              while (Bt && J < M);
              if (h.flags & 512 && (h.check = n(h.check, V, J, l)), M -= J, l += J, Bt)
                break t;
            } else h.head && (h.head.name = null);
            h.length = 0, h.mode = C;
          /* falls through */
          case C:
            if (h.flags & 4096) {
              if (M === 0)
                break t;
              J = 0;
              do
                Bt = V[l + J++], h.head && Bt && h.length < 65536 && (h.head.comment += String.fromCharCode(Bt));
              while (Bt && J < M);
              if (h.flags & 512 && (h.check = n(h.check, V, J, l)), M -= J, l += J, Bt)
                break t;
            } else h.head && (h.head.comment = null);
            h.mode = v;
          /* falls through */
          case v:
            if (h.flags & 512) {
              for (; R < 16; ) {
                if (M === 0)
                  break t;
                M--, b += V[l++] << R, R += 8;
              }
              if (b !== (h.check & 65535)) {
                T.msg = "header crc mismatch", h.mode = ft;
                break;
              }
              b = 0, R = 0;
            }
            h.head && (h.head.hcrc = h.flags >> 9 & 1, h.head.done = !0), T.adler = h.check = 0, h.mode = Y;
            break;
          case z:
            for (; R < 32; ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            T.adler = h.check = kt(b), b = 0, R = 0, h.mode = P;
          /* falls through */
          case P:
            if (h.havedict === 0)
              return T.next_out = $, T.avail_out = _, T.next_in = l, T.avail_in = M, h.hold = b, h.bits = R, p;
            T.adler = h.check = 1, h.mode = Y;
          /* falls through */
          case Y:
            if (L === f || L === u)
              break t;
          /* falls through */
          case j:
            if (h.last) {
              b >>>= R & 7, R -= R & 7, h.mode = wt;
              break;
            }
            for (; R < 3; ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            switch (h.last = b & 1, b >>>= 1, R -= 1, b & 3) {
              case 0:
                h.mode = gt;
                break;
              case 1:
                if (zt(h), h.mode = tt, L === u) {
                  b >>>= 2, R -= 2;
                  break t;
                }
                break;
              case 2:
                h.mode = Q;
                break;
              case 3:
                T.msg = "invalid block type", h.mode = ft;
            }
            b >>>= 2, R -= 2;
            break;
          case gt:
            for (b >>>= R & 7, R -= R & 7; R < 32; ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            if ((b & 65535) !== (b >>> 16 ^ 65535)) {
              T.msg = "invalid stored block lengths", h.mode = ft;
              break;
            }
            if (h.length = b & 65535, b = 0, R = 0, h.mode = X, L === u)
              break t;
          /* falls through */
          case X:
            h.mode = nt;
          /* falls through */
          case nt:
            if (J = h.length, J) {
              if (J > M && (J = M), J > _ && (J = _), J === 0)
                break t;
              t.arraySet(ct, V, l, J, $), M -= J, l += J, _ -= J, $ += J, h.length -= J;
              break;
            }
            h.mode = Y;
            break;
          case Q:
            for (; R < 14; ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            if (h.nlen = (b & 31) + 257, b >>>= 5, R -= 5, h.ndist = (b & 31) + 1, b >>>= 5, R -= 5, h.ncode = (b & 15) + 4, b >>>= 4, R -= 4, h.nlen > 286 || h.ndist > 30) {
              T.msg = "too many length or distance symbols", h.mode = ft;
              break;
            }
            h.have = 0, h.mode = at;
          /* falls through */
          case at:
            for (; h.have < h.ncode; ) {
              for (; R < 3; ) {
                if (M === 0)
                  break t;
                M--, b += V[l++] << R, R += 8;
              }
              h.lens[rn[h.have++]] = b & 7, b >>>= 3, R -= 3;
            }
            for (; h.have < 19; )
              h.lens[rn[h.have++]] = 0;
            if (h.lencode = h.lendyn, h.lenbits = 7, le = { bits: h.lenbits }, Ut = r(a, h.lens, 0, 19, h.lencode, 0, h.work, le), h.lenbits = le.bits, Ut) {
              T.msg = "invalid code lengths set", h.mode = ft;
              break;
            }
            h.have = 0, h.mode = yt;
          /* falls through */
          case yt:
            for (; h.have < h.nlen + h.ndist; ) {
              for (; Ot = h.lencode[b & (1 << h.lenbits) - 1], Tt = Ot >>> 24, St = Ot >>> 16 & 255, Ht = Ot & 65535, !(Tt <= R); ) {
                if (M === 0)
                  break t;
                M--, b += V[l++] << R, R += 8;
              }
              if (Ht < 16)
                b >>>= Tt, R -= Tt, h.lens[h.have++] = Ht;
              else {
                if (Ht === 16) {
                  for (ae = Tt + 2; R < ae; ) {
                    if (M === 0)
                      break t;
                    M--, b += V[l++] << R, R += 8;
                  }
                  if (b >>>= Tt, R -= Tt, h.have === 0) {
                    T.msg = "invalid bit length repeat", h.mode = ft;
                    break;
                  }
                  Bt = h.lens[h.have - 1], J = 3 + (b & 3), b >>>= 2, R -= 2;
                } else if (Ht === 17) {
                  for (ae = Tt + 3; R < ae; ) {
                    if (M === 0)
                      break t;
                    M--, b += V[l++] << R, R += 8;
                  }
                  b >>>= Tt, R -= Tt, Bt = 0, J = 3 + (b & 7), b >>>= 3, R -= 3;
                } else {
                  for (ae = Tt + 7; R < ae; ) {
                    if (M === 0)
                      break t;
                    M--, b += V[l++] << R, R += 8;
                  }
                  b >>>= Tt, R -= Tt, Bt = 0, J = 11 + (b & 127), b >>>= 7, R -= 7;
                }
                if (h.have + J > h.nlen + h.ndist) {
                  T.msg = "invalid bit length repeat", h.mode = ft;
                  break;
                }
                for (; J--; )
                  h.lens[h.have++] = Bt;
              }
            }
            if (h.mode === ft)
              break;
            if (h.lens[256] === 0) {
              T.msg = "invalid code -- missing end-of-block", h.mode = ft;
              break;
            }
            if (h.lenbits = 9, le = { bits: h.lenbits }, Ut = r(o, h.lens, 0, h.nlen, h.lencode, 0, h.work, le), h.lenbits = le.bits, Ut) {
              T.msg = "invalid literal/lengths set", h.mode = ft;
              break;
            }
            if (h.distbits = 6, h.distcode = h.distdyn, le = { bits: h.distbits }, Ut = r(s, h.lens, h.nlen, h.ndist, h.distcode, 0, h.work, le), h.distbits = le.bits, Ut) {
              T.msg = "invalid distances set", h.mode = ft;
              break;
            }
            if (h.mode = tt, L === u)
              break t;
          /* falls through */
          case tt:
            h.mode = ot;
          /* falls through */
          case ot:
            if (M >= 6 && _ >= 258) {
              T.next_out = $, T.avail_out = _, T.next_in = l, T.avail_in = M, h.hold = b, h.bits = R, i(T, K), $ = T.next_out, ct = T.output, _ = T.avail_out, l = T.next_in, V = T.input, M = T.avail_in, b = h.hold, R = h.bits, h.mode === Y && (h.back = -1);
              break;
            }
            for (h.back = 0; Ot = h.lencode[b & (1 << h.lenbits) - 1], Tt = Ot >>> 24, St = Ot >>> 16 & 255, Ht = Ot & 65535, !(Tt <= R); ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            if (St && (St & 240) === 0) {
              for (Xt = Tt, De = St, Se = Ht; Ot = h.lencode[Se + ((b & (1 << Xt + De) - 1) >> Xt)], Tt = Ot >>> 24, St = Ot >>> 16 & 255, Ht = Ot & 65535, !(Xt + Tt <= R); ) {
                if (M === 0)
                  break t;
                M--, b += V[l++] << R, R += 8;
              }
              b >>>= Xt, R -= Xt, h.back += Xt;
            }
            if (b >>>= Tt, R -= Tt, h.back += Tt, h.length = Ht, St === 0) {
              h.mode = et;
              break;
            }
            if (St & 32) {
              h.back = -1, h.mode = Y;
              break;
            }
            if (St & 64) {
              T.msg = "invalid literal/length code", h.mode = ft;
              break;
            }
            h.extra = St & 15, h.mode = Et;
          /* falls through */
          case Et:
            if (h.extra) {
              for (ae = h.extra; R < ae; ) {
                if (M === 0)
                  break t;
                M--, b += V[l++] << R, R += 8;
              }
              h.length += b & (1 << h.extra) - 1, b >>>= h.extra, R -= h.extra, h.back += h.extra;
            }
            h.was = h.length, h.mode = ht;
          /* falls through */
          case ht:
            for (; Ot = h.distcode[b & (1 << h.distbits) - 1], Tt = Ot >>> 24, St = Ot >>> 16 & 255, Ht = Ot & 65535, !(Tt <= R); ) {
              if (M === 0)
                break t;
              M--, b += V[l++] << R, R += 8;
            }
            if ((St & 240) === 0) {
              for (Xt = Tt, De = St, Se = Ht; Ot = h.distcode[Se + ((b & (1 << Xt + De) - 1) >> Xt)], Tt = Ot >>> 24, St = Ot >>> 16 & 255, Ht = Ot & 65535, !(Xt + Tt <= R); ) {
                if (M === 0)
                  break t;
                M--, b += V[l++] << R, R += 8;
              }
              b >>>= Xt, R -= Xt, h.back += Xt;
            }
            if (b >>>= Tt, R -= Tt, h.back += Tt, St & 64) {
              T.msg = "invalid distance code", h.mode = ft;
              break;
            }
            h.offset = Ht, h.extra = St & 15, h.mode = lt;
          /* falls through */
          case lt:
            if (h.extra) {
              for (ae = h.extra; R < ae; ) {
                if (M === 0)
                  break t;
                M--, b += V[l++] << R, R += 8;
              }
              h.offset += b & (1 << h.extra) - 1, b >>>= h.extra, R -= h.extra, h.back += h.extra;
            }
            if (h.offset > h.dmax) {
              T.msg = "invalid distance too far back", h.mode = ft;
              break;
            }
            h.mode = pt;
          /* falls through */
          case pt:
            if (_ === 0)
              break t;
            if (J = K - _, h.offset > J) {
              if (J = h.offset - J, J > h.whave && h.sane) {
                T.msg = "invalid distance too far back", h.mode = ft;
                break;
              }
              J > h.wnext ? (J -= h.wnext, bt = h.wsize - J) : bt = h.wnext - J, J > h.length && (J = h.length), se = h.window;
            } else
              se = ct, bt = $ - h.offset, J = h.length;
            J > _ && (J = _), _ -= J, h.length -= J;
            do
              ct[$++] = se[bt++];
            while (--J);
            h.length === 0 && (h.mode = ot);
            break;
          case et:
            if (_ === 0)
              break t;
            ct[$++] = h.length, _--, h.mode = ot;
            break;
          case wt:
            if (h.wrap) {
              for (; R < 32; ) {
                if (M === 0)
                  break t;
                M--, b |= V[l++] << R, R += 8;
              }
              if (K -= _, T.total_out += K, h.total += K, K && (T.adler = h.check = /*UPDATE(state.check, put - _out, _out);*/
              h.flags ? n(h.check, ct, K, $ - K) : e(h.check, ct, K, $ - K)), K = _, (h.flags ? b : kt(b)) !== h.check) {
                T.msg = "incorrect data check", h.mode = ft;
                break;
              }
              b = 0, R = 0;
            }
            h.mode = Rt;
          /* falls through */
          case Rt:
            if (h.wrap && h.flags) {
              for (; R < 32; ) {
                if (M === 0)
                  break t;
                M--, b += V[l++] << R, R += 8;
              }
              if (b !== (h.total & 4294967295)) {
                T.msg = "incorrect length check", h.mode = ft;
                break;
              }
              b = 0, R = 0;
            }
            h.mode = Nt;
          /* falls through */
          case Nt:
            Ut = d;
            break t;
          case ft:
            Ut = O;
            break t;
          case G:
            return D;
          case vt:
          /* falls through */
          default:
            return y;
        }
    return T.next_out = $, T.avail_out = _, T.next_in = l, T.avail_in = M, h.hold = b, h.bits = R, (h.wsize || K !== T.avail_out && h.mode < ft && (h.mode < wt || L !== c)) && Pt(T, T.output, T.next_out, K - T.avail_out), it -= T.avail_in, K -= T.avail_out, T.total_in += it, T.total_out += K, h.total += K, h.wrap && K && (T.adler = h.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    h.flags ? n(h.check, ct, K, T.next_out - K) : e(h.check, ct, K, T.next_out - K)), T.data_type = h.bits + (h.last ? 64 : 0) + (h.mode === Y ? 128 : 0) + (h.mode === tt || h.mode === X ? 256 : 0), (it === 0 && K === 0 || L === c) && Ut === m && (Ut = S), Ut;
  }
  function B(T) {
    if (!T || !T.state)
      return y;
    var L = T.state;
    return L.window && (L.window = null), T.state = null, m;
  }
  function U(T, L) {
    var h;
    return !T || !T.state || (h = T.state, (h.wrap & 2) === 0) ? y : (h.head = L, L.done = !1, m);
  }
  function W(T, L) {
    var h = L.length, V, ct, l;
    return !T || !T.state || (V = T.state, V.wrap !== 0 && V.mode !== P) ? y : V.mode === P && (ct = 1, ct = e(ct, L, h, 0), ct !== V.check) ? O : (l = Pt(T, L, h, h), l ? (V.mode = G, D) : (V.havedict = 1, m));
  }
  return ce.inflateReset = Ft, ce.inflateReset2 = Kt, ce.inflateResetKeep = Mt, ce.inflateInit = At, ce.inflateInit2 = rt, ce.inflate = g, ce.inflateEnd = B, ce.inflateGetHeader = U, ce.inflateSetDictionary = W, ce.inflateInfo = "pako inflate (from Nodeca project)", ce;
}
var Gi, _o;
function tl() {
  return _o || (_o = 1, Gi = {
    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    //Z_MEM_ERROR:     -4,
    Z_BUF_ERROR: -5,
    //Z_VERSION_ERROR: -6,
    /* compression levels */
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY: 0,
    Z_TEXT: 1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN: 2,
    /* The deflate compression method */
    Z_DEFLATED: 8
    //Z_NULL:                 null // Use -1 or null inline, depending on var type
  }), Gi;
}
var qi, mo;
function h_() {
  if (mo) return qi;
  mo = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return qi = t, qi;
}
var go;
function d_() {
  if (go) return Ye;
  go = 1;
  var t = u_(), e = Ie(), n = Qs(), i = tl(), r = Lr(), a = js(), o = h_(), s = Object.prototype.toString;
  function c(m) {
    if (!(this instanceof c)) return new c(m);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, m || {});
    var d = this.options;
    d.raw && d.windowBits >= 0 && d.windowBits < 16 && (d.windowBits = -d.windowBits, d.windowBits === 0 && (d.windowBits = -15)), d.windowBits >= 0 && d.windowBits < 16 && !(m && m.windowBits) && (d.windowBits += 32), d.windowBits > 15 && d.windowBits < 48 && (d.windowBits & 15) === 0 && (d.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var p = t.inflateInit2(
      this.strm,
      d.windowBits
    );
    if (p !== i.Z_OK)
      throw new Error(r[p]);
    if (this.header = new o(), t.inflateGetHeader(this.strm, this.header), d.dictionary && (typeof d.dictionary == "string" ? d.dictionary = n.string2buf(d.dictionary) : s.call(d.dictionary) === "[object ArrayBuffer]" && (d.dictionary = new Uint8Array(d.dictionary)), d.raw && (p = t.inflateSetDictionary(this.strm, d.dictionary), p !== i.Z_OK)))
      throw new Error(r[p]);
  }
  c.prototype.push = function(m, d) {
    var p = this.strm, y = this.options.chunkSize, O = this.options.dictionary, D, S, x, k, w, N = !1;
    if (this.ended)
      return !1;
    S = d === ~~d ? d : d === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof m == "string" ? p.input = n.binstring2buf(m) : s.call(m) === "[object ArrayBuffer]" ? p.input = new Uint8Array(m) : p.input = m, p.next_in = 0, p.avail_in = p.input.length;
    do {
      if (p.avail_out === 0 && (p.output = new e.Buf8(y), p.next_out = 0, p.avail_out = y), D = t.inflate(p, i.Z_NO_FLUSH), D === i.Z_NEED_DICT && O && (D = t.inflateSetDictionary(this.strm, O)), D === i.Z_BUF_ERROR && N === !0 && (D = i.Z_OK, N = !1), D !== i.Z_STREAM_END && D !== i.Z_OK)
        return this.onEnd(D), this.ended = !0, !1;
      p.next_out && (p.avail_out === 0 || D === i.Z_STREAM_END || p.avail_in === 0 && (S === i.Z_FINISH || S === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (x = n.utf8border(p.output, p.next_out), k = p.next_out - x, w = n.buf2string(p.output, x), p.next_out = k, p.avail_out = y - k, k && e.arraySet(p.output, p.output, x, k, 0), this.onData(w)) : this.onData(e.shrinkBuf(p.output, p.next_out))), p.avail_in === 0 && p.avail_out === 0 && (N = !0);
    } while ((p.avail_in > 0 || p.avail_out === 0) && D !== i.Z_STREAM_END);
    return D === i.Z_STREAM_END && (S = i.Z_FINISH), S === i.Z_FINISH ? (D = t.inflateEnd(this.strm), this.onEnd(D), this.ended = !0, D === i.Z_OK) : (S === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), p.avail_out = 0), !0);
  }, c.prototype.onData = function(m) {
    this.chunks.push(m);
  }, c.prototype.onEnd = function(m) {
    m === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg;
  };
  function f(m, d) {
    var p = new c(d);
    if (p.push(m, !0), p.err)
      throw p.msg || r[p.err];
    return p.result;
  }
  function u(m, d) {
    return d = d || {}, d.raw = !0, f(m, d);
  }
  return Ye.Inflate = c, Ye.inflate = f, Ye.inflateRaw = u, Ye.ungzip = f, Ye;
}
var Zi, wo;
function p_() {
  if (wo) return Zi;
  wo = 1;
  var t = Ie().assign, e = l_(), n = d_(), i = tl(), r = {};
  return t(r, e, n, i), Zi = r, Zi;
}
var __ = p_();
const m_ = /* @__PURE__ */ $r(__);
function g_(t) {
  let e = 0;
  for (const n of t)
    e += n.length;
  return e;
}
function el(t) {
  const e = new Uint8Array(g_(t));
  let n = 0;
  for (const i of t)
    e.set(i, n), n += i.length;
  return e;
}
const { Z_SYNC_FLUSH: nl, Inflate: il } = m_;
async function Cr(t) {
  try {
    let e, n = 0, i;
    const r = [];
    do {
      const a = t.subarray(n);
      if (i = new il(), { strm: e } = i, i.push(a, nl), i.err)
        throw new Error(i.msg);
      n += e.next_in, r.push(i.result);
    } while (e.avail_in);
    return el(r);
  } catch (e) {
    throw /incorrect header check/.exec(`${e}`) ? new Error("problem decompressing block: incorrect gzip header check") : e;
  }
}
async function w_(t, e) {
  try {
    let n;
    const { minv: i, maxv: r } = e;
    let a = i.blockPosition, o = i.dataPosition;
    const s = [], c = [], f = [];
    let u = 0;
    do {
      const m = t.subarray(a - i.blockPosition), d = new il();
      if ({ strm: n } = d, d.push(m, nl), d.err)
        throw new Error(d.msg);
      const p = d.result;
      s.push(p);
      let y = p.length;
      c.push(a), f.push(o), s.length === 1 && i.dataPosition && (s[0] = s[0].subarray(i.dataPosition), y = s[0].length);
      const O = a;
      if (a += n.next_in, o += y, O >= r.blockPosition) {
        s[u] = s[u].subarray(0, r.blockPosition === i.blockPosition ? r.dataPosition - i.dataPosition + 1 : r.dataPosition + 1), c.push(a), f.push(o);
        break;
      }
      u++;
    } while (n.avail_in);
    return {
      buffer: el(s),
      cpositions: c,
      dpositions: f
    };
  } catch (n) {
    throw /incorrect header check/.exec(`${n}`) ? new Error("problem decompressing block: incorrect gzip header check") : n;
  }
}
class ci {
  constructor(e, n, i, r = void 0) {
    this.minv = e, this.maxv = n, this.bin = i, this._fetchedSize = r;
  }
  toUniqueString() {
    return `${this.minv}..${this.maxv} (bin ${this.bin}, fetchedSize ${this.fetchedSize()})`;
  }
  toString() {
    return this.toUniqueString();
  }
  compareTo(e) {
    return this.minv.compareTo(e.minv) || this.maxv.compareTo(e.maxv) || this.bin - e.bin;
  }
  fetchedSize() {
    return this._fetchedSize !== void 0 ? this._fetchedSize : this.maxv.blockPosition + 65536 - this.minv.blockPosition;
  }
}
class rl {
  constructor({ filehandle: e, renameRefSeqs: n = (i) => i }) {
    this.filehandle = e, this.renameRefSeq = n;
  }
  async getMetadata(e = {}) {
    const { indices: n, ...i } = await this.parse(e);
    return i;
  }
  _findFirstData(e, n) {
    return e ? e.compareTo(n) > 0 ? n : e : n;
  }
  async parse(e = {}) {
    return this.parseP || (this.parseP = this._parse(e).catch((n) => {
      throw this.parseP = void 0, n;
    })), this.parseP;
  }
  async hasRefSeq(e, n = {}) {
    var r;
    return !!((r = (await this.parse(n)).indices[e]) != null && r.binIndex);
  }
}
const vo = 65536, v_ = vo * vo;
function al(t, e = 0) {
  const n = t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24;
  return ((t[e + 4] | t[e + 5] << 8 | t[e + 6] << 16 | t[e + 7] << 24) >>> 0) * v_ + (n >>> 0);
}
class y_ extends Error {
}
function wn(t) {
  if (t && t.aborted) {
    if (typeof DOMException < "u")
      throw new DOMException("aborted", "AbortError");
    {
      const e = new y_("aborted");
      throw e.code = "ERR_ABORTED", e;
    }
  }
}
function b_(t, e) {
  return e.minv.blockPosition - t.maxv.blockPosition < 65e3 && e.maxv.blockPosition - t.minv.blockPosition < 5e6;
}
function ol(t, e) {
  const n = [];
  let i = null;
  return t.length === 0 ? t : (t.sort(function(r, a) {
    const o = r.minv.blockPosition - a.minv.blockPosition;
    return o !== 0 ? o : r.minv.dataPosition - a.minv.dataPosition;
  }), t.forEach((r) => {
    (!e || r.maxv.compareTo(e) > 0) && (i === null ? (n.push(r), i = r) : b_(i, r) ? r.maxv.compareTo(i.maxv) > 0 && (i.maxv = r.maxv) : (n.push(r), i = r));
  }), n);
}
class Fr {
  constructor(e, n) {
    this.blockPosition = e, this.dataPosition = n;
  }
  toString() {
    return `${this.blockPosition}:${this.dataPosition}`;
  }
  compareTo(e) {
    return this.blockPosition - e.blockPosition || this.dataPosition - e.dataPosition;
  }
}
function Qe(t, e = 0) {
  return new Fr(t[e + 7] * 1099511627776 + t[e + 6] * 4294967296 + t[e + 5] * 16777216 + t[e + 4] * 65536 + t[e + 3] * 256 + t[e + 2], t[e + 1] << 8 | t[e]);
}
const x_ = 21582659, k_ = 38359875, T_ = {
  0: "generic",
  1: "SAM",
  2: "VCF"
};
function E_(t, e) {
  return t * 2 ** e;
}
function yo(t, e) {
  return Math.floor(t / 2 ** e);
}
class Wi extends rl {
  constructor(e) {
    super(e), this.maxBinNumber = 0, this.depth = 0, this.minShift = 0;
  }
  async lineCount(e, n = {}) {
    const i = await this.parse(n), r = i.refNameToId[e];
    if (r === void 0 || !i.indices[r])
      return -1;
    const { stats: o } = i.indices[r];
    return o ? o.lineCount : -1;
  }
  indexCov() {
    throw new Error("CSI indexes do not support indexcov");
  }
  parseAuxData(e, n) {
    const i = new DataView(e.buffer), r = i.getInt32(n, !0), a = r & 65536 ? "zero-based-half-open" : "1-based-closed", o = T_[r & 15];
    if (!o)
      throw new Error(`invalid Tabix preset format flags ${r}`);
    const s = {
      ref: i.getInt32(n + 4, !0),
      start: i.getInt32(n + 8, !0),
      end: i.getInt32(n + 12, !0)
    }, c = i.getInt32(n + 16, !0), f = c ? String.fromCharCode(c) : null, u = i.getInt32(n + 20, !0), m = i.getInt32(n + 24, !0), { refIdToName: d, refNameToId: p } = this._parseNameBytes(e.subarray(n + 28, n + 28 + m));
    return {
      refIdToName: d,
      refNameToId: p,
      skipLines: u,
      metaChar: f,
      columnNumbers: s,
      format: o,
      coordinateType: a
    };
  }
  _parseNameBytes(e) {
    let n = 0, i = 0;
    const r = [], a = {}, o = new TextDecoder("utf8");
    for (let s = 0; s < e.length; s += 1)
      if (!e[s]) {
        if (i < s) {
          const c = this.renameRefSeq(o.decode(e.subarray(i, s)));
          r[n] = c, a[c] = n;
        }
        i = s + 1, n += 1;
      }
    return {
      refNameToId: a,
      refIdToName: r
    };
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await Cr(await this.filehandle.readFile(e)), i = new DataView(n.buffer);
    let r;
    if (i.getUint32(0, !0) === x_)
      r = 1;
    else if (i.getUint32(0, !0) === k_)
      r = 2;
    else
      throw new Error("Not a CSI file");
    this.minShift = i.getInt32(4, !0), this.depth = i.getInt32(8, !0), this.maxBinNumber = ((1 << (this.depth + 1) * 3) - 1) / 7;
    const a = 2 ** (this.minShift + this.depth * 3), o = i.getInt32(12, !0), s = o && o >= 30 ? this.parseAuxData(n, 16) : {
      refIdToName: [],
      refNameToId: {},
      metaChar: null,
      columnNumbers: { ref: 0, start: 1, end: 2 },
      coordinateType: "zero-based-half-open",
      format: "generic"
    }, c = i.getInt32(16 + o, !0);
    let f, u = 16 + o + 4;
    const m = new Array(c).fill(0).map(() => {
      const d = i.getInt32(u, !0);
      u += 4;
      const p = {};
      let y;
      for (let O = 0; O < d; O += 1) {
        const D = i.getUint32(u, !0);
        if (D > this.maxBinNumber)
          y = this.parsePseudoBin(n, u + 4), u += 48;
        else {
          const S = Qe(n, u + 4);
          f = this._findFirstData(f, S);
          const x = i.getInt32(u + 12, !0);
          u += 16;
          const k = new Array(x);
          for (let w = 0; w < x; w += 1) {
            const N = Qe(n, u), I = Qe(n, u + 8);
            u += 16, k[w] = new ci(N, I, D);
          }
          p[D] = k;
        }
      }
      return { binIndex: p, stats: y };
    });
    return {
      ...s,
      csi: !0,
      refCount: c,
      maxBlockSize: 65536,
      firstDataLine: f,
      csiVersion: r,
      indices: m,
      depth: this.depth,
      maxBinNumber: this.maxBinNumber,
      maxRefLength: a
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: al(e, n + 28)
    };
  }
  async blocksForRange(e, n, i, r = {}) {
    n < 0 && (n = 0);
    const a = await this.parse(r), o = a.refNameToId[e];
    if (o === void 0)
      return [];
    const s = a.indices[o];
    if (!s)
      return [];
    const c = this.reg2bins(n, i), f = [];
    for (const [u, m] of c)
      for (let d = u; d <= m; d++)
        if (s.binIndex[d])
          for (const p of s.binIndex[d])
            f.push(new ci(p.minv, p.maxv, d));
    return ol(f, new Fr(0, 0));
  }
  /**
   * calculate the list of bins that may overlap with region [beg,end) (zero-based half-open)
   */
  reg2bins(e, n) {
    e -= 1, e < 1 && (e = 1), n > 2 ** 50 && (n = 2 ** 34), n -= 1;
    let i = 0, r = 0, a = this.minShift + this.depth * 3;
    const o = [];
    for (; i <= this.depth; a -= 3, r += E_(1, i * 3), i += 1) {
      const s = r + yo(e, a), c = r + yo(n, a);
      if (c - s + o.length > this.maxBinNumber)
        throw new Error(`query ${e}-${n} is too large for current binning scheme (shift ${this.minShift}, depth ${this.depth}), try a smaller query or a coarser index binning scheme`);
      o.push([s, c]);
    }
    return o;
  }
}
const A_ = 21578324, bo = 14;
function S_(t, e) {
  return t += 1, e -= 1, [
    [0, 0],
    [1 + (t >> 26), 1 + (e >> 26)],
    [9 + (t >> 23), 9 + (e >> 23)],
    [73 + (t >> 20), 73 + (e >> 20)],
    [585 + (t >> 17), 585 + (e >> 17)],
    [4681 + (t >> 14), 4681 + (e >> 14)]
  ];
}
class dn extends rl {
  async lineCount(e, n = {}) {
    var o;
    const i = await this.parse(n), r = i.refNameToId[e];
    return r === void 0 || !i.indices[r] ? -1 : ((o = i.indices[r].stats) == null ? void 0 : o.lineCount) ?? -1;
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await this.filehandle.readFile(e), i = await Cr(n);
    wn(e.signal);
    const r = new DataView(i.buffer);
    if (r.getUint32(0, !0) !== A_)
      throw new Error("Not a TBI file");
    const o = r.getUint32(4, !0), s = r.getUint32(8, !0), c = s & 65536 ? "zero-based-half-open" : "1-based-closed", u = {
      0: "generic",
      1: "SAM",
      2: "VCF"
    }[s & 15];
    if (!u)
      throw new Error(`invalid Tabix preset format flags ${s}`);
    const m = {
      ref: r.getInt32(12, !0),
      start: r.getInt32(16, !0),
      end: r.getInt32(20, !0)
    }, d = r.getInt32(24, !0), p = 5, y = ((1 << (p + 1) * 3) - 1) / 7, O = 2 ** (14 + p * 3), D = d ? String.fromCharCode(d) : null, S = r.getInt32(28, !0), x = r.getInt32(32, !0), { refNameToId: k, refIdToName: w } = this._parseNameBytes(i.slice(36, 36 + x));
    let N = 36 + x, I;
    return {
      indices: new Array(o).fill(0).map(() => {
        const F = r.getInt32(N, !0);
        N += 4;
        const H = {};
        let C;
        for (let P = 0; P < F; P += 1) {
          const Y = r.getUint32(N, !0);
          if (N += 4, Y > y + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (Y === y + 1) {
            const j = r.getInt32(N, !0);
            N += 4, j === 2 && (C = this.parsePseudoBin(i, N)), N += 16 * j;
          } else {
            const j = r.getInt32(N, !0);
            N += 4;
            const gt = new Array(j);
            for (let X = 0; X < j; X += 1) {
              const nt = Qe(i, N), Q = Qe(i, N + 8);
              N += 16, I = this._findFirstData(I, nt), gt[X] = new ci(nt, Q, Y);
            }
            H[Y] = gt;
          }
        }
        const v = r.getInt32(N, !0);
        N += 4;
        const z = new Array(v);
        for (let P = 0; P < v; P += 1)
          z[P] = Qe(i, N), N += 8, I = this._findFirstData(I, z[P]);
        return {
          binIndex: H,
          linearIndex: z,
          stats: C
        };
      }),
      metaChar: D,
      maxBinNumber: y,
      maxRefLength: O,
      skipLines: S,
      firstDataLine: I,
      columnNumbers: m,
      coordinateType: c,
      format: u,
      refIdToName: w,
      refNameToId: k,
      maxBlockSize: 65536
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: al(e, n + 16)
    };
  }
  _parseNameBytes(e) {
    let n = 0, i = 0;
    const r = [], a = {}, o = new TextDecoder("utf8");
    for (let s = 0; s < e.length; s += 1)
      if (!e[s]) {
        if (i < s) {
          const c = this.renameRefSeq(o.decode(e.subarray(i, s)));
          r[n] = c, a[c] = n;
        }
        i = s + 1, n += 1;
      }
    return {
      refNameToId: a,
      refIdToName: r
    };
  }
  async blocksForRange(e, n, i, r = {}) {
    n < 0 && (n = 0);
    const a = await this.parse(r), o = a.refNameToId[e];
    if (o === void 0)
      return [];
    const s = a.indices[o];
    if (!s)
      return [];
    (s.linearIndex.length ? s.linearIndex[n >> bo >= s.linearIndex.length ? s.linearIndex.length - 1 : n >> bo] : new Fr(0, 0)) || console.warn("querying outside of possible tabix range");
    const f = S_(n, i), u = [];
    for (const [O, D] of f)
      for (let S = O; S <= D; S++)
        if (s.binIndex[S])
          for (const x of s.binIndex[S])
            u.push(new ci(x.minv, x.maxv, S));
    const m = s.linearIndex.length;
    let d = null;
    const p = Math.min(n >> 14, m - 1), y = Math.min(i >> 14, m - 1);
    for (let O = p; O <= y; ++O) {
      const D = s.linearIndex[O];
      D && (!d || D.compareTo(d) < 0) && (d = D);
    }
    return ol(u, d);
  }
}
function N_(t) {
  return /^[\u0000-\u007F]*$/.test(t);
}
class R_ {
  /**
   * @param {object} args
   *
   * @param {string} [args.path]
   *
   * @param {filehandle} [args.filehandle]
   *
   * @param {string} [args.tbiPath]
   *
   * @param {filehandle} [args.tbiFilehandle]
   *
   * @param {string} [args.csiPath]
   *
   * @param {filehandle} [args.csiFilehandle]
   *
   * @param {url} [args.url]
   *
   * @param {csiUrl} [args.csiUrl]
   *
   * @param {tbiUrl} [args.tbiUrl]
   *
   * @param {function} [args.renameRefSeqs] optional function with sig `string
   * => string` to transform reference sequence names for the purpose of
   * indexing and querying. note that the data that is returned is not altered,
   * just the names of the reference sequences that are used for querying.
   */
  constructor({ path: e, filehandle: n, url: i, tbiPath: r, tbiUrl: a, tbiFilehandle: o, csiPath: s, csiUrl: c, csiFilehandle: f, renameRefSeqs: u = (d) => d, chunkCacheSize: m = 5 * 2 ** 20 }) {
    if (n)
      this.filehandle = n;
    else if (e)
      this.filehandle = new Pn(e);
    else if (i)
      this.filehandle = new Fe(i);
    else
      throw new TypeError("must provide either filehandle or path");
    if (o)
      this.index = new dn({
        filehandle: o,
        renameRefSeqs: u
      });
    else if (f)
      this.index = new Wi({
        filehandle: f,
        renameRefSeqs: u
      });
    else if (r)
      this.index = new dn({
        filehandle: new Pn(r),
        renameRefSeqs: u
      });
    else if (s)
      this.index = new Wi({
        filehandle: new Pn(s),
        renameRefSeqs: u
      });
    else if (e)
      this.index = new dn({
        filehandle: new Pn(`${e}.tbi`),
        renameRefSeqs: u
      });
    else if (c)
      this.index = new Wi({
        filehandle: new Fe(c)
      });
    else if (a)
      this.index = new dn({
        filehandle: new Fe(a)
      });
    else if (i)
      this.index = new dn({
        filehandle: new Fe(`${i}.tbi`)
      });
    else
      throw new TypeError("must provide one of tbiFilehandle, tbiPath, csiFilehandle, csiPath, tbiUrl, csiUrl");
    this.renameRefSeq = u, this.chunkCache = new Ue({
      cache: new _i({ maxSize: Math.floor(m / 65536) }),
      fill: (d, p) => this.readChunk(d, { signal: p })
    });
  }
  /**
   * @param refName name of the reference sequence
   *
   * @param start start of the region (in 0-based half-open coordinates)
   *
   * @param end end of the region (in 0-based half-open coordinates)
   *
   * @param opts callback called for each line in the region. can also pass a
   * object param containing obj.lineCallback, obj.signal, etc
   *
   * @returns promise that is resolved when the whole read is finished,
   * rejected on error
   */
  async getLines(e, n, i, r) {
    let a, o = {}, s;
    typeof r == "function" ? s = r : (o = r, s = r.lineCallback, a = r.signal);
    const c = await this.index.getMetadata(o);
    wn(a);
    const f = n ?? 0, u = i ?? c.maxRefLength;
    if (!(f <= u))
      throw new TypeError("invalid start and end coordinates. start must be less than or equal to end");
    if (f === u)
      return;
    const m = await this.index.blocksForRange(e, f, u, o);
    wn(a);
    const d = new TextDecoder("utf8");
    for (const p of m) {
      const { buffer: y, cpositions: O, dpositions: D } = await this.chunkCache.get(p.toString(), p, a);
      wn(a);
      let S = 0, x = 0;
      const k = d.decode(y), w = N_(k);
      for (; S < k.length; ) {
        let N, I;
        if (w) {
          if (I = k.indexOf(`
`, S), I === -1)
            break;
          N = k.slice(S, I);
        } else {
          if (I = y.indexOf(10, S), I === -1)
            break;
          const H = y.slice(S, I);
          N = d.decode(H);
        }
        if (D) {
          for (; S + p.minv.dataPosition >= D[x++]; )
            ;
          x--;
        }
        const { startCoordinate: A, overlaps: F } = this.checkLine(c, e, f, u, N);
        if (F)
          s(
            N,
            // cpositions[pos] refers to actual file offset of a bgzip block
            // boundaries
            //
            // we multiply by (1 <<8) in order to make sure each block has a
            // "unique" address space so that data in that block could never
            // overlap
            //
            // then the blockStart-dpositions is an uncompressed file offset
            // from that bgzip block boundary, and since the cpositions are
            // multiplied by (1 << 8) these uncompressed offsets get a unique
            // space
            O[x] * 256 + (S - D[x]) + p.minv.dataPosition + 1
          );
        else if (A !== void 0 && A >= u)
          return;
        S = I + 1;
      }
    }
  }
  async getMetadata(e = {}) {
    return this.index.getMetadata(e);
  }
  /**
   * get a buffer containing the "header" region of the file, which are the
   * bytes up to the first non-meta line
   */
  async getHeaderBuffer(e = {}) {
    const { firstDataLine: n, metaChar: i, maxBlockSize: r } = await this.getMetadata(e);
    wn(e.signal);
    const a = ((n == null ? void 0 : n.blockPosition) || 0) + r, o = await this.filehandle.read(a, 0, e), s = await Cr(o);
    if (i) {
      let c = -1;
      const f = 10, u = i.charCodeAt(0);
      for (let m = 0; m < s.length && !(m === c + 1 && s[m] !== u); m += 1)
        s[m] === f && (c = m);
      return s.subarray(0, c + 1);
    }
    return s;
  }
  /**
   * get a string containing the "header" region of the file, is the portion up
   * to the first non-meta line
   *
   * @returns {Promise} for a string
   */
  async getHeader(e = {}) {
    const n = new TextDecoder("utf8"), i = await this.getHeaderBuffer(e);
    return n.decode(i);
  }
  /**
   * get an array of reference sequence names, in the order in which they occur
   * in the file. reference sequence renaming is not applied to these names.
   */
  async getReferenceSequenceNames(e = {}) {
    return (await this.getMetadata(e)).refIdToName;
  }
  /**
   * @param {object} metadata metadata object from the parsed index, containing
   * columnNumbers, metaChar, and format
   *
   * @param {string} regionRefName
   *
   * @param {number} regionStart region start coordinate (0-based-half-open)
   *
   * @param {number} regionEnd region end coordinate (0-based-half-open)
   *
   * @param {array[string]} line
   *
   * @returns {object} like `{startCoordinate, overlaps}`. overlaps is boolean,
   * true if line is a data line that overlaps the given region
   */
  checkLine(e, n, i, r, a) {
    const { columnNumbers: o, metaChar: s, coordinateType: c, format: f } = e;
    if (s && a.startsWith(s))
      return { overlaps: !1 };
    let { ref: u, start: m, end: d } = o;
    u || (u = 0), m || (m = 0), d || (d = 0), f === "VCF" && (d = 8);
    const p = Math.max(u, m, d);
    let y = 1, O = 0, D = "", S = -1 / 0;
    const x = a.length;
    for (let k = 0; k < x + 1; k++)
      if (a[k] === "	" || k === x) {
        if (y === u) {
          if (this.renameRefSeq(a.slice(O, k)) !== n)
            return {
              overlaps: !1
            };
        } else if (y === m) {
          if (S = parseInt(a.slice(O, k), 10), c === "1-based-closed" && (S -= 1), S >= r)
            return {
              startCoordinate: S,
              overlaps: !1
            };
          if ((d === 0 || d === m) && S + 1 <= i)
            return {
              startCoordinate: S,
              overlaps: !1
            };
        } else if (f === "VCF" && y === 4)
          D = a.slice(O, k);
        else if (y === d && (f === "VCF" ? this._getVcfEnd(S, D, a.slice(O, k)) : Number.parseInt(a.slice(O, k), 10)) <= i)
          return {
            overlaps: !1
          };
        if (O = k + 1, y += 1, y > p)
          break;
      }
    return {
      startCoordinate: S,
      overlaps: !0
    };
  }
  _getVcfEnd(e, n, i) {
    let r = e + n.length;
    const a = i.includes("SVTYPE=TRA");
    if (i[0] !== "." && !a) {
      let o = ";";
      for (let s = 0; s < i.length; s += 1) {
        if (o === ";" && i.slice(s, s + 4) === "END=") {
          let c = i.indexOf(";", s);
          c === -1 && (c = i.length), r = parseInt(i.slice(s + 4, c), 10);
          break;
        }
        o = i[s];
      }
    } else if (a)
      return e + 1;
    return r;
  }
  /**
   * return the approximate number of data lines in the given reference
   * sequence
   *
   * @param refSeq reference sequence name
   *
   * @returns number of data lines present on that reference sequence
   */
  async lineCount(e, n = {}) {
    return this.index.lineCount(e, n);
  }
  /**
   * read and uncompress the data in a chunk (composed of one or more
   * contiguous bgzip blocks) of the file
   */
  async readChunk(e, n = {}) {
    const i = await this.filehandle.read(e.fetchedSize(), e.minv.blockPosition, n);
    return w_(i, e);
  }
}
function I_(t, e, n) {
  const i = e.split("	"), r = {};
  let a = 0;
  if (t.includes("GT")) {
    const o = t.split(":");
    if (o.length === 1)
      for (const s of n)
        r[s] = i[a++];
    else {
      const s = o.indexOf("GT");
      if (s === 0)
        for (const c of n) {
          const f = i[a++], u = f.indexOf(":");
          r[c] = u !== -1 ? f.slice(0, u) : f;
        }
      else
        for (const c of n) {
          const f = i[a++].split(":");
          r[c] = f[s];
        }
    }
  }
  return r;
}
function D_(t) {
  const e = [];
  let n = "", i = !1, r = !1;
  for (const a of t)
    a === '"' ? (i = !i, n += a) : a === "[" ? (r = !0, n += a) : a === "]" ? (r = !1, n += a) : a === "," && !i && !r ? (e.push(n.trim()), n = "") : n += a;
  return n && e.push(n.trim()), e;
}
function $_(t, e) {
  const n = t.indexOf(e);
  return [t.slice(0, n), t.slice(n + 1)];
}
function M_(t) {
  const e = t.replace(/^<|>$/g, "");
  return Object.fromEntries(D_(e).map((n) => {
    const [i, r] = $_(n, "=");
    return r && r.startsWith("[") && r.endsWith("]") ? [
      i,
      r.slice(1, -1).split(",").map((a) => a.trim())
    ] : r && r.startsWith('"') && r.endsWith('"') ? [i, r.slice(1, -1)] : [i, r == null ? void 0 : r.replaceAll(/^"|"$/g, "")];
  }));
}
const Hn = {
  // INFO fields
  InfoFields: {
    // from the VCF4.3 spec, https://samtools.github.io/hts-specs/VCFv4.3.pdf
    AA: { Number: 1, Type: "String", Description: "Ancestral allele" },
    AC: {
      Number: "A",
      Type: "Integer",
      Description: "Allele count in genotypes, for each ALT allele, in the same order as listed"
    },
    AD: {
      Number: "R",
      Type: "Integer",
      Description: "Total read depth for each allele"
    },
    ADF: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele on the forward strand"
    },
    ADR: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele on the reverse strand"
    },
    AF: {
      Number: "A",
      Type: "Float",
      Description: "Allele frequency for each ALT allele in the same order as listed (estimated from primary data, not called genotypes)"
    },
    AN: {
      Number: 1,
      Type: "Integer",
      Description: "Total number of alleles in called genotypes"
    },
    BQ: {
      Number: 1,
      Type: "Float",
      Description: "RMS base quality"
    },
    CIGAR: {
      Number: 1,
      Type: "Float",
      Description: "Cigar string describing how to align an alternate allele to the reference allele"
    },
    DB: {
      Number: 0,
      Type: "Flag",
      Description: "dbSNP membership"
    },
    DP: {
      Number: 1,
      Type: "Integer",
      Description: "combined depth across samples"
    },
    END: {
      Number: 1,
      Type: "Integer",
      Description: "End position (for use with symbolic alleles)"
    },
    H2: {
      Number: 0,
      Type: "Flag",
      Description: "HapMap2 membership"
    },
    H3: {
      Number: 0,
      Type: "Flag",
      Description: "HapMap3 membership"
    },
    MQ: {
      Number: 1,
      Type: null,
      Description: "RMS mapping quality"
    },
    MQ0: {
      Number: 1,
      Type: "Integer",
      Description: "Number of MAPQ == 0 reads"
    },
    NS: {
      Number: 1,
      Type: "Integer",
      Description: "Number of samples with data"
    },
    SB: {
      Number: 4,
      Type: "Integer",
      Description: "Strand bias"
    },
    SOMATIC: {
      Number: 0,
      Type: "Flag",
      Description: "Somatic mutation (for cancer genomics)"
    },
    VALIDATED: {
      Number: 0,
      Type: "Flag",
      Description: "Validated by follow-up experiment"
    },
    "1000G": {
      Number: 0,
      Type: "Flag",
      Description: "1000 Genomes membership"
    },
    // specifically for structural variants
    IMPRECISE: {
      Number: 0,
      Type: "Flag",
      Description: "Imprecise structural variation"
    },
    NOVEL: {
      Number: 0,
      Type: "Flag",
      Description: "Indicates a novel structural variation"
    },
    // For precise variants, END is POS + length of REF allele - 1,
    // and the for imprecise variants the corresponding best estimate.
    SVTYPE: {
      Number: 1,
      Type: "String",
      Description: "Type of structural variant"
    },
    // Value should be one of DEL, INS, DUP, INV, CNV, BND. This key can
    // be derived from the REF/ALT fields but is useful for filtering.
    SVLEN: {
      Number: null,
      Type: "Integer",
      Description: "Difference in length between REF and ALT alleles"
    },
    // One value for each ALT allele. Longer ALT alleles (e.g. insertions)
    // have positive values, shorter ALT alleles (e.g. deletions)
    // have negative values.
    CIPOS: {
      Number: 2,
      Type: "Integer",
      Description: "Confidence interval around POS for imprecise variants"
    },
    CIEND: {
      Number: 2,
      Type: "Integer",
      Description: "Confidence interval around END for imprecise variants"
    },
    HOMLEN: {
      Type: "Integer",
      Description: "Length of base pair identical micro-homology at event breakpoints"
    },
    HOMSEQ: {
      Type: "String",
      Description: "Sequence of base pair identical micro-homology at event breakpoints"
    },
    BKPTID: {
      Type: "String",
      Description: "ID of the assembled alternate allele in the assembly file"
    },
    // For precise variants, the consensus sequence the alternate allele assembly
    // is derivable from the REF and ALT fields. However, the alternate allele
    // assembly file may contain additional information about the characteristics
    // of the alt allele contigs.
    MEINFO: {
      Number: 4,
      Type: "String",
      Description: "Mobile element info of the form NAME,START,END,POLARITY"
    },
    METRANS: {
      Number: 4,
      Type: "String",
      Description: "Mobile element transduction info of the form CHR,START,END,POLARITY"
    },
    DGVID: {
      Number: 1,
      Type: "String",
      Description: "ID of this element in Database of Genomic Variation"
    },
    DBVARID: {
      Number: 1,
      Type: "String",
      Description: "ID of this element in DBVAR"
    },
    DBRIPID: {
      Number: 1,
      Type: "String",
      Description: "ID of this element in DBRIP"
    },
    MATEID: {
      Number: null,
      Type: "String",
      Description: "ID of mate breakends"
    },
    PARID: {
      Number: 1,
      Type: "String",
      Description: "ID of partner breakend"
    },
    EVENT: {
      Number: 1,
      Type: "String",
      Description: "ID of event associated to breakend"
    },
    CILEN: {
      Number: 2,
      Type: "Integer",
      Description: "Confidence interval around the inserted material between breakend"
    },
    DPADJ: { Type: "Integer", Description: "Read Depth of adjacency" },
    CN: {
      Number: 1,
      Type: "Integer",
      Description: "Copy number of segment containing breakend"
    },
    CNADJ: {
      Number: null,
      Type: "Integer",
      Description: "Copy number of adjacency"
    },
    CICN: {
      Number: 2,
      Type: "Integer",
      Description: "Confidence interval around copy number for the segment"
    },
    CICNADJ: {
      Number: null,
      Type: "Integer",
      Description: "Confidence interval around copy number for the adjacency"
    }
  },
  // FORMAT fields
  GenotypeFields: {
    // from the VCF4.3 spec, https://samtools.github.io/hts-specs/VCFv4.3.pdf
    AD: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele"
    },
    ADF: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele on the forward strand"
    },
    ADR: {
      Number: "R",
      Type: "Integer",
      Description: "Read depth for each allele on the reverse strand"
    },
    DP: {
      Number: 1,
      Type: "Integer",
      Description: "Read depth"
    },
    EC: {
      Number: "A",
      Type: "Integer",
      Description: "Expected alternate allele counts"
    },
    FT: {
      Number: 1,
      Type: "String",
      Description: 'Filter indicating if this genotype was "called"'
    },
    GL: {
      Number: "G",
      Type: "Float",
      Description: "Genotype likelihoods"
    },
    GP: {
      Number: "G",
      Type: "Float",
      Description: "Genotype posterior probabilities"
    },
    GQ: {
      Number: 1,
      Type: "Integer",
      Description: "Conditional genotype quality"
    },
    GT: {
      Number: 1,
      Type: "String",
      Description: "Genotype"
    },
    HQ: {
      Number: 2,
      Type: "Integer",
      Description: "Haplotype quality"
    },
    MQ: {
      Number: 1,
      Type: "Integer",
      Description: "RMS mapping quality"
    },
    PL: {
      Number: "G",
      Type: "Integer",
      Description: "Phred-scaled genotype likelihoods rounded to the closest integer"
    },
    PQ: {
      Number: 1,
      Type: "Integer",
      Description: "Phasing quality"
    },
    PS: {
      Number: 1,
      Type: "Integer",
      Description: "Phase set"
    }
  },
  // ALT fields
  AltTypes: {
    DEL: {
      Description: "Deletion relative to the reference"
    },
    INS: {
      Description: "Insertion of novel sequence relative to the reference"
    },
    DUP: {
      Description: "Region of elevated copy number relative to the reference"
    },
    INV: {
      Description: "Inversion of reference sequence"
    },
    CNV: {
      Description: "Copy number variable region (may be both deletion and duplication)"
    },
    "DUP:TANDEM": {
      Description: "Tandem duplication"
    },
    "DEL:ME": {
      Description: "Deletion of mobile element relative to the reference"
    },
    "INS:ME": {
      Description: "Insertion of a mobile element relative to the reference"
    },
    NON_REF: {
      Description: "Represents any possible alternative allele at this location"
    },
    "*": {
      Description: "Represents any possible alternative allele at this location"
    }
  },
  // FILTER fields
  FilterTypes: {
    PASS: {
      Description: "Passed all filters"
    }
  }
};
function O_(t) {
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}
class L_ {
  constructor({ header: e = "", strict: n = !0 }) {
    if (!e.length)
      throw new Error("empty header received");
    const i = e.split(/[\r\n]+/).filter(Boolean);
    if (!i.length)
      throw new Error("no non-empty header lines specified");
    this.strict = n, this.metadata = JSON.parse(JSON.stringify({
      INFO: Hn.InfoFields,
      FORMAT: Hn.GenotypeFields,
      ALT: Hn.AltTypes,
      FILTER: Hn.FilterTypes
    }));
    let r;
    if (i.forEach((c) => {
      if (c.startsWith("#"))
        c.startsWith("##") ? this.parseMetadata(c) : r = c;
      else throw new Error(`Bad line in header:
${c}`);
    }), !r)
      throw new Error("No format line found in header");
    const a = r.trim().split("	"), o = a.slice(0, 8), s = [
      "#CHROM",
      "POS",
      "ID",
      "REF",
      "ALT",
      "QUAL",
      "FILTER",
      "INFO"
    ];
    if (a.length < 8)
      throw new Error(`VCF header missing columns:
${r}`);
    if (o.length !== s.length || !o.every((c, f) => c === s[f]))
      throw new Error(`VCF column headers not correct:
${r}`);
    this.samples = a.slice(9);
  }
  parseSamples(e, n) {
    const i = {};
    if (e) {
      const r = n.split("	"), a = e.split(":"), o = a.map((s) => {
        const c = this.getMetadata("FORMAT", s, "Type");
        return c === "Integer" || c === "Float";
      });
      for (let s = 0; s < this.samples.length; s++) {
        const c = this.samples[s];
        i[c] = {};
        const f = r[s].split(":");
        for (let u = 0; u < f.length; u++) {
          const m = f[u];
          i[c][a[u]] = m === "" || m === "." ? void 0 : m.split(",").map((d) => d === "." ? void 0 : o[u] ? +d : d);
        }
      }
    }
    return i;
  }
  /**
   * Parse a VCF metadata line (i.e. a line that starts with "##") and add its
   * properties to the object.
   *
   * @param {string} line - A line from the VCF. Supports both LF and CRLF
   * newlines.
   */
  parseMetadata(e) {
    const n = /^##(.+?)=(.*)/.exec(e.trim());
    if (!n)
      throw new Error(`Line is not a valid metadata line: ${e}`);
    const [i, r] = n.slice(1, 3), a = i;
    if (r != null && r.startsWith("<")) {
      a in this.metadata || (this.metadata[a] = {});
      const [o, s] = this.parseStructuredMetaVal(r);
      o ? this.metadata[a][o] = s : this.metadata[a] = s;
    } else
      this.metadata[a] = r;
  }
  /**
   * Parse a VCF header structured meta string (i.e. a meta value that starts
   * with "<ID=...")
   *
   * @param {string} metaVal - The VCF metadata value
   *
   * @returns {Array} - Array with two entries, 1) a string of the metadata ID
   * and 2) an object with the other key-value pairs in the metadata
   */
  parseStructuredMetaVal(e) {
    const n = M_(e), i = n.ID;
    return delete n.ID, "Number" in n && (Number.isNaN(Number(n.Number)) || (n.Number = Number(n.Number))), [i, n];
  }
  /**
   * Get metadata filtered by the elements in args. For example, can pass
   * ('INFO', 'DP') to only get info on an metadata tag that was like
   * "##INFO=<ID=DP,...>"
   *
   * @param  {...string} args - List of metadata filter strings.
   *
   * @returns {any} An object, string, or number, depending on the filtering
   */
  getMetadata(...e) {
    let n = this.metadata;
    for (const i of e)
      if (n = n[i], !n)
        return n;
    return n;
  }
  /**
   * Parse a VCF line into an object like
   *
   * ```typescript
   * {
   *   CHROM: 'contigA',
   *   POS: 3000,
   *   ID: ['rs17883296'],
   *   REF: 'G',
   *   ALT: ['T', 'A'],
   *   QUAL: 100,
   *   FILTER: 'PASS',
   *   INFO: {
   *     NS: [3],
   *     DP: [14],
   *     AF: [0.5],
   *     DB: true,
   *     XYZ: ['5'],
   *   },
   *   SAMPLES: () => ({
   *     HG00096: {
   *       GT: ['0|0'],
   *       AP: ['0.000', '0.000'],
   *     }
   *   }),
   *   GENOTYPES: () => ({
   *     HG00096: '0|0'
   *   })
   * }
   * ```
   *
   * SAMPLES and GENOTYPES methods are functions instead of static data fields
   * because it avoids parsing the potentially long list of samples from e.g.
   * 1000 genotypes data unless requested.
   *
   * The SAMPLES function gives all info about the samples
   *
   * The GENOTYPES function only extracts the raw GT string if it exists, for
   * potentially optimized parsing by programs that need it
   *
   * @param {string} line - A string of a line from a VCF
   */
  parseLine(e) {
    var I;
    let n = 0;
    for (let A = 0; n < e.length && (e[n] === "	" && (A += 1), A !== 9); n += 1)
      ;
    const i = e.slice(0, n).split("	"), r = e.slice(n + 1), [a, o, s, c, f, u, m] = i, d = a, p = +o, y = s === "." ? void 0 : s.split(";"), O = c, D = f === "." ? void 0 : f.split(","), S = u === "." ? void 0 : +u, x = m === "." ? void 0 : m.split(";"), k = i[8];
    if (this.strict && !i[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const w = (I = i[7]) == null ? void 0 : I.includes("%"), N = i[7] === void 0 || i[7] === "." ? {} : Object.fromEntries(i[7].split(";").map((A) => {
      const [F, H] = A.split("="), C = H == null ? void 0 : H.split(",").map((z) => z === "." ? void 0 : z).map((z) => z && w ? O_(z) : z), v = this.getMetadata("INFO", F, "Type");
      return v === "Integer" || v === "Float" ? [
        F,
        C == null ? void 0 : C.map((z) => z === void 0 ? void 0 : Number(z))
      ] : v === "Flag" ? [F, !0] : [F, C ?? !0];
    }));
    return {
      CHROM: d,
      POS: p,
      ALT: D,
      INFO: N,
      REF: O,
      FILTER: x && x.length === 1 && x[0] === "PASS" ? "PASS" : x,
      ID: y,
      QUAL: S,
      FORMAT: k,
      SAMPLES: () => this.parseSamples(i[8] ?? "", r),
      GENOTYPES: () => I_(i[8] ?? "", r, this.samples)
    };
  }
}
function C_(t) {
  const e = t.split(/[[\]]/);
  if (e.length > 1) {
    const n = t.includes("[") ? "right" : "left";
    let i, r, a;
    for (const o of e)
      o && (o.includes(":") ? (a = o, i = r ? "right" : "left") : r = o);
    if (!(a && i && r))
      throw new Error(`Invalid breakend: ${t}`);
    return { MatePosition: a, Join: i, Replacement: r, MateDirection: n };
  } else {
    if (t.startsWith("."))
      return {
        Join: "left",
        SingleBreakend: !0,
        Replacement: t.slice(1)
      };
    if (t.endsWith("."))
      return {
        Join: "right",
        SingleBreakend: !0,
        Replacement: t.slice(0, -1)
      };
    if (t.startsWith("<")) {
      const n = /<(.*)>(.*)/.exec(t);
      if (!n)
        throw new Error(`failed to parse ${t}`);
      const i = n[2];
      return i ? {
        Join: "left",
        Replacement: i,
        MateDirection: "right",
        MatePosition: `<${n[1]}>:1`
      } : void 0;
    } else if (t.includes("<")) {
      const n = /(.*)<(.*)>/.exec(t);
      if (!n)
        throw new Error(`failed to parse ${t}`);
      const i = n[1];
      return i ? {
        Join: "right",
        Replacement: i,
        MateDirection: "right",
        MatePosition: `<${n[2]}>:1`
      } : void 0;
    }
  }
}
const F_ = {
  DEL: "deletion",
  INS: "insertion",
  DUP: "duplication",
  INV: "inversion",
  INVDUP: "inverted_duplication",
  CNV: "copy_number_variation",
  TRA: "translocation",
  "DUP:TANDEM": "tandem_duplication",
  NON_REF: "sequence_variant",
  "*": "sequence_variant"
};
function z_(t, e, n) {
  if (!e || e.length === 0)
    return ["remark", "no alternative alleles"];
  const i = /* @__PURE__ */ new Set();
  let r = /* @__PURE__ */ new Set();
  if (e.forEach((a) => {
    let [o, s] = sl(a, n);
    o || ([o, s] = P_(t, a)), o && s && (i.add(o), r.add(s));
  }), r.size > 1) {
    const a = [...r], o = new Set(
      a.map((s) => {
        const c = s.split("->");
        return c[1] ? c[0] : s;
      }).filter((s) => !!s)
    );
    r = new Set(
      [...o].map((s) => s.trim()).map((s) => {
        const c = a.map((f) => f.split("->").map((u) => u.trim())).map((f) => f[1] && f[0] === s ? f[1] : "").filter((f) => !!f);
        return c.length ? `${s} -> ${c.join(",")}` : s;
      })
    );
  }
  return i.size ? [[...i].join(","), [...r].join(",")] : [];
}
function sl(t, e) {
  if (typeof t == "string" && !t.startsWith("<"))
    return [];
  let n = F_[t];
  if (!n && e.getMetadata("ALT", t) && (n = "sequence_variant"), n)
    return [n, t];
  const i = t.split(":");
  return i.length > 1 ? sl(`<${i.slice(0, -1).join(":")}>`, e) : [];
}
function P_(t, e) {
  if (C_(e))
    return ["breakend", e];
  if (t.length === 1 && e.length === 1)
    return ["SNV", Xe("SNV", t, e)];
  if (e === "<INS>")
    return ["insertion", e];
  if (e === "<DEL>")
    return ["deletion", e];
  if (e === "<DUP>")
    return ["duplication", e];
  if (e === "<CNV>")
    return ["cnv", e];
  if (e === "<INV>")
    return ["inversion", e];
  if (e === "<TRA>")
    return ["translocation", e];
  if (e.includes("<"))
    return ["sv", e];
  if (t.length === e.length)
    return t.split("").reverse().join("") === e ? ["inversion", Xe("inversion", t, e)] : ["substitution", Xe("substitution", t, e)];
  if (t.length <= e.length) {
    const i = e.length - t.length, r = i.toLocaleString("en-US");
    return [
      "insertion",
      i > 5 ? `${r}bp INS` : Xe("insertion", t, e)
    ];
  }
  if (t.length > e.length) {
    const i = t.length - e.length, r = i.toLocaleString("en-US");
    return [
      "deletion",
      i > 5 ? `${r}bp DEL` : Xe("deletion", t, e)
    ];
  }
  return ["indel", Xe("indel", t, e)];
}
function Xe(t, e, n) {
  return `${t} ${e} -> ${n}`;
}
function H_(t, e) {
  const { REF: n = "", ALT: i, POS: r, CHROM: a, ID: o } = t, s = r - 1, [c, f] = z_(n, i, e);
  return {
    refName: a,
    start: s,
    end: B_(t),
    description: f,
    type: c,
    name: o == null ? void 0 : o.join(","),
    aliases: o && o.length > 1 ? o.slice(1) : void 0
  };
}
function B_(t) {
  const { POS: e, REF: n = "", ALT: i } = t, r = i == null ? void 0 : i.includes("<TRA>"), a = e - 1;
  if (i == null ? void 0 : i.some((s) => s.includes("<"))) {
    const s = t.INFO;
    if (s.END && !r)
      return +s.END[0];
  }
  return a + n.length;
}
class U_ {
  constructor(e) {
    this.variant = e.variant, this.parser = e.parser, this.data = H_(this.variant, this.parser), this._id = e.id;
  }
  get(e) {
    return e === "samples" ? this.variant.SAMPLES() : e === "genotypes" ? this.variant.GENOTYPES() : this.data[e] ?? this.variant[e];
  }
  parent() {
  }
  children() {
  }
  id() {
    return this._id;
  }
  toJSON() {
    const { SAMPLES: e, GENOTYPES: n, ...i } = this.variant;
    return {
      uniqueId: this._id,
      ...i,
      ...this.data,
      samples: this.variant.SAMPLES()
    };
  }
}
async function q_({
  url: t,
  indexUrl: e,
  indexType: n = "TBI",
  region: i
}) {
  const r = e ?? t + (n === "TBI" ? ".tbi" : ".csi"), a = new R_({
    tbiFilehandle: n === "TBI" ? new Fe(r) : void 0,
    csiFilehandle: n === "CSI" ? new Fe(r) : void 0,
    filehandle: new Fe(t)
  }), o = new L_({
    header: await a.getHeader()
  }), s = [];
  let c = 0;
  return await a.getLines(i.chromosome, i.start, i.end, {
    lineCallback: (f) => {
      const u = o.parseLine(f), m = new U_({
        variant: u,
        parser: o,
        id: `${c++}`
      }), d = m.get("INFO");
      s.push({
        id: m.get("ID"),
        reference_allele: m.get("REF"),
        alternative_alleles: { values: m.get("ALT") },
        name: m.get("name"),
        seqId: m.get("refName"),
        fmin: m.get("start"),
        fmax: m.get("end"),
        strand: 1,
        source: "",
        type: xo(d.soTerm[0]) ?? m.get("type"),
        ...Object.fromEntries(
          Object.entries(d).map(([p, y]) => [
            p,
            {
              values: [JSON.stringify(y.map((O) => xo(O)))]
            }
          ])
        )
      });
    }
  }), s;
}
function xo(t) {
  return t == null ? void 0 : t.replace(/['"]+/g, "");
}
function Z_(t) {
  const [e, n] = t.split(":"), [i, r] = n.split("..");
  return {
    chromosome: e,
    start: +i,
    end: +r
  };
}
Ge.prototype.first = function() {
  return Zt(this.nodes()[0]);
};
Ge.prototype.last = function() {
  return Zt(this.nodes()[this.size() - 1]);
};
class W_ {
  constructor(e, n, i, r) {
    this.height = r, this.width = i, this.config = e, this.svg_target = n, this.viewer = this._initViewer(n), this.draw();
  }
  generateLegend() {
    return Eh();
  }
  get tracks() {
    return this.config.tracks ?? [];
  }
  get genome() {
    return this.config.genome;
  }
  closeModal() {
    for (const e of document.getElementsByClassName("gfc-tooltip"))
      e.style.visibility = "hidden";
  }
  setSelectedAlleles(e, n) {
    const i = Zt(n);
    i.selectAll(".highlight").remove(), i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ), i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((r) => r.selected === "true").style("stroke", null).datum((r) => (r.selected = "false", r)), Nr(e, i);
  }
  _initViewer(e) {
    Zt(e).selectAll("*").remove();
    const n = Zt(e), r = `${e.replace("#", "")} main-view`, a = {
      top: 8,
      right: 30,
      bottom: 30,
      left: 40
    };
    return n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${a.left},${a.top})`).attr("class", r), this.width = this.width - a.left - a.right, this.height = this.height - a.top - a.bottom, Zt(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    const e = this.width, n = this.config.transcriptTypes ?? yh, i = this.config.variantTypes ?? bh, r = this.config.binRatio ?? 0.01, a = this.config.region, o = this._configureRange(
      a.start,
      a.end,
      e
    ), s = o.range, c = a.chromosome, f = this.config.variantFilter ?? [], u = this.config.isoformFilter ?? [], m = this.config.htpVariant ?? "", d = o.start, p = o.end;
    new td({
      viewer: this.viewer,
      track: {
        chromosome: c,
        start: d,
        end: p,
        range: o.range
      },
      height: this.height,
      width: e
    }).DrawOverviewTrack();
    let D = 100;
    const S = this.config.showVariantLabel ?? !0, { viewer: x, genome: k, height: w, tracks: N } = this;
    N.map((I) => {
      const { variantData: A, trackData: F } = I;
      if (I.type === hn.ISOFORM_AND_VARIANT) {
        const H = new Jh({
          viewer: x,
          height: w,
          width: e,
          transcriptTypes: n,
          variantTypes: i,
          showVariantLabel: S,
          trackData: F,
          variantData: A,
          variantFilter: f,
          binRatio: r,
          isoformFilter: u
        });
        D += H.DrawTrack();
      } else if (I.type === hn.ISOFORM_EMBEDDED_VARIANT) {
        const H = new Qh({
          viewer: x,
          height: w,
          width: e,
          transcriptTypes: n,
          variantData: A,
          trackData: F,
          variantTypes: i,
          showVariantLabel: S,
          variantFilter: f
        });
        D += H.DrawTrack();
      } else if (I.type === hn.ISOFORM) {
        const H = new jh({
          region: a,
          viewer: x,
          height: w,
          width: e,
          genome: k,
          trackData: F,
          transcriptTypes: n,
          htpVariant: m
        });
        D += H.DrawTrack();
      } else I.type === hn.VARIANT ? new T0({
        region: a,
        viewer: x,
        range: s,
        height: w,
        width: e
      }).DrawTrack() : I.type === hn.VARIANT_GLOBAL ? new E0({
        region: a,
        viewer: x,
        track: {
          ...I,
          range: s
        },
        height: w,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${I.type}`);
      Zt(this.svg_target).attr("height", D);
    });
  }
  // Configure the range for our tracks two use cases
  //    1. Entered with a position
  //    2. TODO: Entered with a range start at 0?
  //    3. Are we in overview or scrollable?
  _configureRange(e, n, i) {
    let r = null;
    const a = 17;
    let o = 0, s = [0, 0];
    if (e === n) {
      r = 300, o = a * r, e = e - r / 2 - 1, n = n + r / 2;
      const c = (
        // @ts-expect-error
        Zt("#clip-rect").node().getBoundingClientRect().width / 2 + 100
      );
      s = [
        c - o / 2,
        c + o / 2
      ];
    } else
      return {
        range: [0, i],
        start: e,
        end: n
      };
    return {
      range: s,
      start: e,
      end: n
    };
  }
}
export {
  W_ as GenomeFeatureViewer,
  G_ as fetchApolloAPIData,
  V_ as fetchNCListData,
  q_ as fetchTabixVcfData,
  Z_ as parseLocString
};
