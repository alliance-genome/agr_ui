function vn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ho(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function La(t) {
  let e, n, i;
  t.length !== 2 ? (e = vn, n = (o, f) => vn(t(o), f), i = (o, f) => t(o) - f) : (e = t === vn || t === ho ? t : po, n = t, i = t);
  function r(o, f, c = 0, u = o.length) {
    if (c < u) {
      if (e(f, f) !== 0) return u;
      do {
        const m = c + u >>> 1;
        n(o[m], f) < 0 ? c = m + 1 : u = m;
      } while (c < u);
    }
    return c;
  }
  function a(o, f, c = 0, u = o.length) {
    if (c < u) {
      if (e(f, f) !== 0) return u;
      do {
        const m = c + u >>> 1;
        n(o[m], f) <= 0 ? c = m + 1 : u = m;
      } while (c < u);
    }
    return c;
  }
  function s(o, f, c = 0, u = o.length) {
    const m = r(o, f, c, u - 1);
    return m > c && i(o[m - 1], f) > -i(o[m], f) ? m - 1 : m;
  }
  return { left: r, center: s, right: a };
}
function po() {
  return 0;
}
function _o(t) {
  return t === null ? NaN : +t;
}
const go = La(vn), mo = go.right;
La(_o).center;
const vo = Math.sqrt(50), wo = Math.sqrt(10), yo = Math.sqrt(2);
function En(t, e, n) {
  const i = (e - t) / Math.max(0, n), r = Math.floor(Math.log10(i)), a = i / Math.pow(10, r), s = a >= vo ? 10 : a >= wo ? 5 : a >= yo ? 2 : 1;
  let o, f, c;
  return r < 0 ? (c = Math.pow(10, -r) / s, o = Math.round(t * c), f = Math.round(e * c), o / c < t && ++o, f / c > e && --f, c = -c) : (c = Math.pow(10, r) * s, o = Math.round(t / c), f = Math.round(e / c), o * c < t && ++o, f * c > e && --f), f < o && 0.5 <= n && n < 2 ? En(t, e, n * 2) : [o, f, c];
}
function bo(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const i = e < t, [r, a, s] = i ? En(e, t, n) : En(t, e, n);
  if (!(a >= r)) return [];
  const o = a - r + 1, f = new Array(o);
  if (i)
    if (s < 0) for (let c = 0; c < o; ++c) f[c] = (a - c) / -s;
    else for (let c = 0; c < o; ++c) f[c] = (a - c) * s;
  else if (s < 0) for (let c = 0; c < o; ++c) f[c] = (r + c) / -s;
  else for (let c = 0; c < o; ++c) f[c] = (r + c) * s;
  return f;
}
function gi(t, e, n) {
  return e = +e, t = +t, n = +n, En(t, e, n)[2];
}
function xo(t, e, n) {
  e = +e, t = +t, n = +n;
  const i = e < t, r = i ? gi(e, t, n) : gi(t, e, n);
  return (i ? -1 : 1) * (r < 0 ? 1 / -r : r);
}
function ko(t) {
  return t;
}
var wn = 1, Gn = 2, mi = 3, an = 4, or = 1e-6;
function To(t) {
  return "translate(" + t + ",0)";
}
function Eo(t) {
  return "translate(0," + t + ")";
}
function So(t) {
  return (e) => +t(e);
}
function Ao(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function $o() {
  return !this.__axis;
}
function Ca(t, e) {
  var n = [], i = null, r = null, a = 6, s = 6, o = 3, f = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, c = t === wn || t === an ? -1 : 1, u = t === an || t === Gn ? "x" : "y", m = t === wn || t === mi ? To : Eo;
  function d(_) {
    var x = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), L = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : ko), I = Math.max(a, 0) + o, A = e.range(), E = +A[0] + f, k = +A[A.length - 1] + f, b = (e.bandwidth ? Ao : So)(e.copy(), f), S = _.selection ? _.selection() : _, $ = S.selectAll(".domain").data([null]), T = S.selectAll(".tick").data(x, e).order(), H = T.exit(), z = T.enter().append("g").attr("class", "tick"), F = T.select("line"), y = T.select("text");
    $ = $.merge($.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), T = T.merge(z), F = F.merge(z.append("line").attr("stroke", "currentColor").attr(u + "2", c * a)), y = y.merge(z.append("text").attr("fill", "currentColor").attr(u, c * I).attr("dy", t === wn ? "0em" : t === mi ? "0.71em" : "0.32em")), _ !== S && ($ = $.transition(_), T = T.transition(_), F = F.transition(_), y = y.transition(_), H = H.transition(_).attr("opacity", or).attr("transform", function(U) {
      return isFinite(U = b(U)) ? m(U + f) : this.getAttribute("transform");
    }), z.attr("opacity", or).attr("transform", function(U) {
      var P = this.parentNode.__axis;
      return m((P && isFinite(P = P(U)) ? P : b(U)) + f);
    })), H.remove(), $.attr("d", t === an || t === Gn ? s ? "M" + c * s + "," + E + "H" + f + "V" + k + "H" + c * s : "M" + f + "," + E + "V" + k : s ? "M" + E + "," + c * s + "V" + f + "H" + k + "V" + c * s : "M" + E + "," + f + "H" + k), T.attr("opacity", 1).attr("transform", function(U) {
      return m(b(U) + f);
    }), F.attr(u + "2", c * a), y.attr(u, c * I).text(L), S.filter($o).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Gn ? "start" : t === an ? "end" : "middle"), S.each(function() {
      this.__axis = b;
    });
  }
  return d.scale = function(_) {
    return arguments.length ? (e = _, d) : e;
  }, d.ticks = function() {
    return n = Array.from(arguments), d;
  }, d.tickArguments = function(_) {
    return arguments.length ? (n = _ == null ? [] : Array.from(_), d) : n.slice();
  }, d.tickValues = function(_) {
    return arguments.length ? (i = _ == null ? null : Array.from(_), d) : i && i.slice();
  }, d.tickFormat = function(_) {
    return arguments.length ? (r = _, d) : r;
  }, d.tickSize = function(_) {
    return arguments.length ? (a = s = +_, d) : a;
  }, d.tickSizeInner = function(_) {
    return arguments.length ? (a = +_, d) : a;
  }, d.tickSizeOuter = function(_) {
    return arguments.length ? (s = +_, d) : s;
  }, d.tickPadding = function(_) {
    return arguments.length ? (o = +_, d) : o;
  }, d.offset = function(_) {
    return arguments.length ? (f = +_, d) : f;
  }, d;
}
function lr(t) {
  return Ca(wn, t);
}
function No(t) {
  return Ca(mi, t);
}
var Io = { value: () => {
} };
function Fa() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new yn(n);
}
function yn(t) {
  this._ = t;
}
function Do(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
yn.prototype = Fa.prototype = {
  constructor: yn,
  on: function(t, e) {
    var n = this._, i = Do(t + "", n), r, a = -1, s = i.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((r = (t = i[a]).type) && (r = Ro(n[r], t.name))) return r;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++a < s; )
      if (r = (t = i[a]).type) n[r] = cr(n[r], t.name, e);
      else if (e == null) for (r in n) n[r] = cr(n[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new yn(t);
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
function Ro(t, e) {
  for (var n = 0, i = t.length, r; n < i; ++n)
    if ((r = t[n]).name === e)
      return r.value;
}
function cr(t, e, n) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === e) {
      t[i] = Io, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var vi = "http://www.w3.org/1999/xhtml";
const fr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: vi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Hn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), fr.hasOwnProperty(e) ? { space: fr[e], local: t } : t;
}
function Mo(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === vi && e.documentElement.namespaceURI === vi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Oo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function za(t) {
  var e = Hn(t);
  return (e.local ? Oo : Mo)(e);
}
function Lo() {
}
function zi(t) {
  return t == null ? Lo : function() {
    return this.querySelector(t);
  };
}
function Co(t) {
  typeof t != "function" && (t = zi(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), f, c, u = 0; u < s; ++u)
      (f = a[u]) && (c = t.call(f, f.__data__, u, a)) && ("__data__" in f && (c.__data__ = f.__data__), o[u] = c);
  return new Vt(i, this._parents);
}
function Ba(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Fo() {
  return [];
}
function Ha(t) {
  return t == null ? Fo : function() {
    return this.querySelectorAll(t);
  };
}
function zo(t) {
  return function() {
    return Ba(t.apply(this, arguments));
  };
}
function Bo(t) {
  typeof t == "function" ? t = zo(t) : t = Ha(t);
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, f, c = 0; c < o; ++c)
      (f = s[c]) && (i.push(t.call(f, f.__data__, c, s)), r.push(f));
  return new Vt(i, r);
}
function Pa(t) {
  return function() {
    return this.matches(t);
  };
}
function Va(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Ho = Array.prototype.find;
function Po(t) {
  return function() {
    return Ho.call(this.children, t);
  };
}
function Vo() {
  return this.firstElementChild;
}
function Uo(t) {
  return this.select(t == null ? Vo : Po(typeof t == "function" ? t : Va(t)));
}
var Zo = Array.prototype.filter;
function qo() {
  return Array.from(this.children);
}
function Go(t) {
  return function() {
    return Zo.call(this.children, t);
  };
}
function Wo(t) {
  return this.selectAll(t == null ? qo : Go(typeof t == "function" ? t : Va(t)));
}
function Xo(t) {
  typeof t != "function" && (t = Pa(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], f, c = 0; c < s; ++c)
      (f = a[c]) && t.call(f, f.__data__, c, a) && o.push(f);
  return new Vt(i, this._parents);
}
function Ua(t) {
  return new Array(t.length);
}
function Yo() {
  return new Vt(this._enter || this._groups.map(Ua), this._parents);
}
function Sn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Sn.prototype = {
  constructor: Sn,
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
function Ko(t) {
  return function() {
    return t;
  };
}
function Jo(t, e, n, i, r, a) {
  for (var s = 0, o, f = e.length, c = a.length; s < c; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Sn(t, a[s]);
  for (; s < f; ++s)
    (o = e[s]) && (r[s] = o);
}
function Qo(t, e, n, i, r, a, s) {
  var o, f, c = /* @__PURE__ */ new Map(), u = e.length, m = a.length, d = new Array(u), _;
  for (o = 0; o < u; ++o)
    (f = e[o]) && (d[o] = _ = s.call(f, f.__data__, o, e) + "", c.has(_) ? r[o] = f : c.set(_, f));
  for (o = 0; o < m; ++o)
    _ = s.call(t, a[o], o, a) + "", (f = c.get(_)) ? (i[o] = f, f.__data__ = a[o], c.delete(_)) : n[o] = new Sn(t, a[o]);
  for (o = 0; o < u; ++o)
    (f = e[o]) && c.get(d[o]) === f && (r[o] = f);
}
function jo(t) {
  return t.__data__;
}
function tl(t, e) {
  if (!arguments.length) return Array.from(this, jo);
  var n = e ? Qo : Jo, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Ko(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), f = new Array(a), c = 0; c < a; ++c) {
    var u = i[c], m = r[c], d = m.length, _ = el(t.call(u, u && u.__data__, c, i)), x = _.length, L = o[c] = new Array(x), I = s[c] = new Array(x), A = f[c] = new Array(d);
    n(u, m, L, I, A, _, e);
    for (var E = 0, k = 0, b, S; E < x; ++E)
      if (b = L[E]) {
        for (E >= k && (k = E + 1); !(S = I[k]) && ++k < x; ) ;
        b._next = S || null;
      }
  }
  return s = new Vt(s, i), s._enter = o, s._exit = f, s;
}
function el(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function nl() {
  return new Vt(this._exit || this._groups.map(Ua), this._parents);
}
function il(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function rl(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, a = i.length, s = Math.min(r, a), o = new Array(r), f = 0; f < s; ++f)
    for (var c = n[f], u = i[f], m = c.length, d = o[f] = new Array(m), _, x = 0; x < m; ++x)
      (_ = c[x] || u[x]) && (d[x] = _);
  for (; f < r; ++f)
    o[f] = n[f];
  return new Vt(o, this._parents);
}
function al() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function sl(t) {
  t || (t = ol);
  function e(m, d) {
    return m && d ? t(m.__data__, d.__data__) : !m - !d;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, f = r[a] = new Array(o), c, u = 0; u < o; ++u)
      (c = s[u]) && (f[u] = c);
    f.sort(e);
  }
  return new Vt(r, this._parents).order();
}
function ol(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ll() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function cl() {
  return Array.from(this);
}
function fl() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function ul() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function hl() {
  return !this.node();
}
function dl(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, s = r.length, o; a < s; ++a)
      (o = r[a]) && t.call(o, o.__data__, a, r);
  return this;
}
function pl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function _l(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function gl(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ml(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function vl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function wl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function yl(t, e) {
  var n = Hn(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? _l : pl : typeof e == "function" ? n.local ? wl : vl : n.local ? ml : gl)(n, e));
}
function Za(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function bl(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function xl(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function kl(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function Tl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? bl : typeof e == "function" ? kl : xl)(t, e, n ?? "")) : Le(this.node(), t);
}
function Le(t, e) {
  return t.style.getPropertyValue(e) || Za(t).getComputedStyle(t, null).getPropertyValue(e);
}
function El(t) {
  return function() {
    delete this[t];
  };
}
function Sl(t, e) {
  return function() {
    this[t] = e;
  };
}
function Al(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function $l(t, e) {
  return arguments.length > 1 ? this.each((e == null ? El : typeof e == "function" ? Al : Sl)(t, e)) : this.node()[t];
}
function qa(t) {
  return t.trim().split(/^|\s+/);
}
function Bi(t) {
  return t.classList || new Ga(t);
}
function Ga(t) {
  this._node = t, this._names = qa(t.getAttribute("class") || "");
}
Ga.prototype = {
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
function Wa(t, e) {
  for (var n = Bi(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Xa(t, e) {
  for (var n = Bi(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Nl(t) {
  return function() {
    Wa(this, t);
  };
}
function Il(t) {
  return function() {
    Xa(this, t);
  };
}
function Dl(t, e) {
  return function() {
    (e.apply(this, arguments) ? Wa : Xa)(this, t);
  };
}
function Rl(t, e) {
  var n = qa(t + "");
  if (arguments.length < 2) {
    for (var i = Bi(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Dl : e ? Nl : Il)(n, e));
}
function Ml() {
  this.textContent = "";
}
function Ol(t) {
  return function() {
    this.textContent = t;
  };
}
function Ll(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Cl(t) {
  return arguments.length ? this.each(t == null ? Ml : (typeof t == "function" ? Ll : Ol)(t)) : this.node().textContent;
}
function Fl() {
  this.innerHTML = "";
}
function zl(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Bl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Hl(t) {
  return arguments.length ? this.each(t == null ? Fl : (typeof t == "function" ? Bl : zl)(t)) : this.node().innerHTML;
}
function Pl() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Vl() {
  return this.each(Pl);
}
function Ul() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Zl() {
  return this.each(Ul);
}
function ql(t) {
  var e = typeof t == "function" ? t : za(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Gl() {
  return null;
}
function Wl(t, e) {
  var n = typeof t == "function" ? t : za(t), i = e == null ? Gl : typeof e == "function" ? e : zi(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Xl() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Yl() {
  return this.each(Xl);
}
function Kl() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Jl() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Ql(t) {
  return this.select(t ? Jl : Kl);
}
function jl(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function tc(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ec(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function nc(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function ic(t, e, n) {
  return function() {
    var i = this.__on, r, a = tc(e);
    if (i) {
      for (var s = 0, o = i.length; s < o; ++s)
        if ((r = i[s]).type === t.type && r.name === t.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = a, r.options = n), r.value = e;
          return;
        }
    }
    this.addEventListener(t.type, a, n), r = { type: t.type, name: t.name, value: e, listener: a, options: n }, i ? i.push(r) : this.__on = [r];
  };
}
function rc(t, e, n) {
  var i = ec(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var f = 0, c = o.length, u; f < c; ++f)
        for (r = 0, u = o[f]; r < a; ++r)
          if ((s = i[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? ic : nc, r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Ya(t, e, n) {
  var i = Za(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function ac(t, e) {
  return function() {
    return Ya(this, t, e);
  };
}
function sc(t, e) {
  return function() {
    return Ya(this, t, e.apply(this, arguments));
  };
}
function oc(t, e) {
  return this.each((typeof e == "function" ? sc : ac)(t, e));
}
function* lc() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length, s; r < a; ++r)
      (s = i[r]) && (yield s);
}
var Hi = [null];
function Vt(t, e) {
  this._groups = t, this._parents = e;
}
function Se() {
  return new Vt([[document.documentElement]], Hi);
}
function cc() {
  return this;
}
Vt.prototype = Se.prototype = {
  constructor: Vt,
  select: Co,
  selectAll: Bo,
  selectChild: Uo,
  selectChildren: Wo,
  filter: Xo,
  data: tl,
  enter: Yo,
  exit: nl,
  join: il,
  merge: rl,
  selection: cc,
  order: al,
  sort: sl,
  call: ll,
  nodes: cl,
  node: fl,
  size: ul,
  empty: hl,
  each: dl,
  attr: yl,
  style: Tl,
  property: $l,
  classed: Rl,
  text: Cl,
  html: Hl,
  raise: Vl,
  lower: Zl,
  append: ql,
  insert: Wl,
  remove: Yl,
  clone: Ql,
  datum: jl,
  on: rc,
  dispatch: oc,
  [Symbol.iterator]: lc
};
function At(t) {
  return typeof t == "string" ? new Vt([[document.querySelector(t)]], [document.documentElement]) : new Vt([[t]], Hi);
}
function Jt(t) {
  return typeof t == "string" ? new Vt([document.querySelectorAll(t)], [document.documentElement]) : new Vt([Ba(t)], Hi);
}
function Pi(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Ka(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function en() {
}
var Ye = 0.7, An = 1 / Ye, Me = "\\s*([+-]?\\d+)\\s*", Ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ie = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", fc = /^#([0-9a-f]{3,8})$/, uc = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), hc = new RegExp(`^rgb\\(${ie},${ie},${ie}\\)$`), dc = new RegExp(`^rgba\\(${Me},${Me},${Me},${Ke}\\)$`), pc = new RegExp(`^rgba\\(${ie},${ie},${ie},${Ke}\\)$`), _c = new RegExp(`^hsl\\(${Ke},${ie},${ie}\\)$`), gc = new RegExp(`^hsla\\(${Ke},${ie},${ie},${Ke}\\)$`), ur = {
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
Pi(en, xe, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: hr,
  // Deprecated! Use color.formatHex.
  formatHex: hr,
  formatHex8: mc,
  formatHsl: vc,
  formatRgb: dr,
  toString: dr
});
function hr() {
  return this.rgb().formatHex();
}
function mc() {
  return this.rgb().formatHex8();
}
function vc() {
  return Ja(this).formatHsl();
}
function dr() {
  return this.rgb().formatRgb();
}
function xe(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = fc.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? pr(e) : n === 3 ? new Zt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? sn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? sn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = uc.exec(t)) ? new Zt(e[1], e[2], e[3], 1) : (e = hc.exec(t)) ? new Zt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = dc.exec(t)) ? sn(e[1], e[2], e[3], e[4]) : (e = pc.exec(t)) ? sn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = _c.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, 1) : (e = gc.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, e[4]) : ur.hasOwnProperty(t) ? pr(ur[t]) : t === "transparent" ? new Zt(NaN, NaN, NaN, 0) : null;
}
function pr(t) {
  return new Zt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function sn(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new Zt(t, e, n, i);
}
function wc(t) {
  return t instanceof en || (t = xe(t)), t ? (t = t.rgb(), new Zt(t.r, t.g, t.b, t.opacity)) : new Zt();
}
function wi(t, e, n, i) {
  return arguments.length === 1 ? wc(t) : new Zt(t, e, n, i ?? 1);
}
function Zt(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
Pi(Zt, wi, Ka(en, {
  brighter(t) {
    return t = t == null ? An : Math.pow(An, t), new Zt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ye : Math.pow(Ye, t), new Zt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Zt(ye(this.r), ye(this.g), ye(this.b), $n(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: _r,
  // Deprecated! Use color.formatHex.
  formatHex: _r,
  formatHex8: yc,
  formatRgb: gr,
  toString: gr
}));
function _r() {
  return `#${ve(this.r)}${ve(this.g)}${ve(this.b)}`;
}
function yc() {
  return `#${ve(this.r)}${ve(this.g)}${ve(this.b)}${ve((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function gr() {
  const t = $n(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ye(this.r)}, ${ye(this.g)}, ${ye(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function $n(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ye(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ve(t) {
  return t = ye(t), (t < 16 ? "0" : "") + t.toString(16);
}
function mr(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new jt(t, e, n, i);
}
function Ja(t) {
  if (t instanceof jt) return new jt(t.h, t.s, t.l, t.opacity);
  if (t instanceof en || (t = xe(t)), !t) return new jt();
  if (t instanceof jt) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), a = Math.max(e, n, i), s = NaN, o = a - r, f = (a + r) / 2;
  return o ? (e === a ? s = (n - i) / o + (n < i) * 6 : n === a ? s = (i - e) / o + 2 : s = (e - n) / o + 4, o /= f < 0.5 ? a + r : 2 - a - r, s *= 60) : o = f > 0 && f < 1 ? 0 : s, new jt(s, o, f, t.opacity);
}
function bc(t, e, n, i) {
  return arguments.length === 1 ? Ja(t) : new jt(t, e, n, i ?? 1);
}
function jt(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
Pi(jt, bc, Ka(en, {
  brighter(t) {
    return t = t == null ? An : Math.pow(An, t), new jt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Ye : Math.pow(Ye, t), new jt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new Zt(
      Wn(t >= 240 ? t - 240 : t + 120, r, i),
      Wn(t, r, i),
      Wn(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new jt(vr(this.h), on(this.s), on(this.l), $n(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = $n(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${vr(this.h)}, ${on(this.s) * 100}%, ${on(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function vr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function on(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Wn(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Vi = (t) => () => t;
function xc(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function kc(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function Tc(t) {
  return (t = +t) == 1 ? Qa : function(e, n) {
    return n - e ? kc(e, n, t) : Vi(isNaN(e) ? n : e);
  };
}
function Qa(t, e) {
  var n = e - t;
  return n ? xc(t, n) : Vi(isNaN(t) ? e : t);
}
const Nn = function t(e) {
  var n = Tc(e);
  function i(r, a) {
    var s = n((r = wi(r)).r, (a = wi(a)).r), o = n(r.g, a.g), f = n(r.b, a.b), c = Qa(r.opacity, a.opacity);
    return function(u) {
      return r.r = s(u), r.g = o(u), r.b = f(u), r.opacity = c(u), r + "";
    };
  }
  return i.gamma = t, i;
}(1);
function Ec(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, i = e.slice(), r;
  return function(a) {
    for (r = 0; r < n; ++r) i[r] = t[r] * (1 - a) + e[r] * a;
    return i;
  };
}
function Sc(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Ac(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, r = new Array(i), a = new Array(n), s;
  for (s = 0; s < i; ++s) r[s] = Ui(t[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(o) {
    for (s = 0; s < i; ++s) a[s] = r[s](o);
    return a;
  };
}
function $c(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function Qt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Nc(t, e) {
  var n = {}, i = {}, r;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (r in e)
    r in t ? n[r] = Ui(t[r], e[r]) : i[r] = e[r];
  return function(a) {
    for (r in n) i[r] = n[r](a);
    return i;
  };
}
var yi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Xn = new RegExp(yi.source, "g");
function Ic(t) {
  return function() {
    return t;
  };
}
function Dc(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ja(t, e) {
  var n = yi.lastIndex = Xn.lastIndex = 0, i, r, a, s = -1, o = [], f = [];
  for (t = t + "", e = e + ""; (i = yi.exec(t)) && (r = Xn.exec(e)); )
    (a = r.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (i = i[0]) === (r = r[0]) ? o[s] ? o[s] += r : o[++s] = r : (o[++s] = null, f.push({ i: s, x: Qt(i, r) })), n = Xn.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? f[0] ? Dc(f[0].x) : Ic(e) : (e = f.length, function(c) {
    for (var u = 0, m; u < e; ++u) o[(m = f[u]).i] = m.x(c);
    return o.join("");
  });
}
function Ui(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? Vi(e) : (n === "number" ? Qt : n === "string" ? (i = xe(e)) ? (e = i, Nn) : ja : e instanceof xe ? Nn : e instanceof Date ? $c : Sc(e) ? Ec : Array.isArray(e) ? Ac : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Nc : Qt)(t, e);
}
function Rc(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var wr = 180 / Math.PI, bi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ts(t, e, n, i, r, a) {
  var s, o, f;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (f = t * n + e * i) && (n -= t * f, i -= e * f), (o = Math.sqrt(n * n + i * i)) && (n /= o, i /= o, f /= o), t * i < e * n && (t = -t, e = -e, f = -f, s = -s), {
    translateX: r,
    translateY: a,
    rotate: Math.atan2(e, t) * wr,
    skewX: Math.atan(f) * wr,
    scaleX: s,
    scaleY: o
  };
}
var ln;
function Mc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? bi : ts(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Oc(t) {
  return t == null || (ln || (ln = document.createElementNS("http://www.w3.org/2000/svg", "g")), ln.setAttribute("transform", t), !(t = ln.transform.baseVal.consolidate())) ? bi : (t = t.matrix, ts(t.a, t.b, t.c, t.d, t.e, t.f));
}
function es(t, e, n, i) {
  function r(c) {
    return c.length ? c.pop() + " " : "";
  }
  function a(c, u, m, d, _, x) {
    if (c !== m || u !== d) {
      var L = _.push("translate(", null, e, null, n);
      x.push({ i: L - 4, x: Qt(c, m) }, { i: L - 2, x: Qt(u, d) });
    } else (m || d) && _.push("translate(" + m + e + d + n);
  }
  function s(c, u, m, d) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), d.push({ i: m.push(r(m) + "rotate(", null, i) - 2, x: Qt(c, u) })) : u && m.push(r(m) + "rotate(" + u + i);
  }
  function o(c, u, m, d) {
    c !== u ? d.push({ i: m.push(r(m) + "skewX(", null, i) - 2, x: Qt(c, u) }) : u && m.push(r(m) + "skewX(" + u + i);
  }
  function f(c, u, m, d, _, x) {
    if (c !== m || u !== d) {
      var L = _.push(r(_) + "scale(", null, ",", null, ")");
      x.push({ i: L - 4, x: Qt(c, m) }, { i: L - 2, x: Qt(u, d) });
    } else (m !== 1 || d !== 1) && _.push(r(_) + "scale(" + m + "," + d + ")");
  }
  return function(c, u) {
    var m = [], d = [];
    return c = t(c), u = t(u), a(c.translateX, c.translateY, u.translateX, u.translateY, m, d), s(c.rotate, u.rotate, m, d), o(c.skewX, u.skewX, m, d), f(c.scaleX, c.scaleY, u.scaleX, u.scaleY, m, d), c = u = null, function(_) {
      for (var x = -1, L = d.length, I; ++x < L; ) m[(I = d[x]).i] = I.x(_);
      return m.join("");
    };
  };
}
var Lc = es(Mc, "px, ", "px)", "deg)"), Cc = es(Oc, ", ", ")", ")"), Ce = 0, Ue = 0, He = 0, ns = 1e3, In, Ze, Dn = 0, ke = 0, Pn = 0, Je = typeof performance == "object" && performance.now ? performance : Date, is = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Zi() {
  return ke || (is(Fc), ke = Je.now() + Pn);
}
function Fc() {
  ke = 0;
}
function Rn() {
  this._call = this._time = this._next = null;
}
Rn.prototype = rs.prototype = {
  constructor: Rn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Zi() : +n) + (e == null ? 0 : +e), !this._next && Ze !== this && (Ze ? Ze._next = this : In = this, Ze = this), this._call = t, this._time = n, xi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, xi());
  }
};
function rs(t, e, n) {
  var i = new Rn();
  return i.restart(t, e, n), i;
}
function zc() {
  Zi(), ++Ce;
  for (var t = In, e; t; )
    (e = ke - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ce;
}
function yr() {
  ke = (Dn = Je.now()) + Pn, Ce = Ue = 0;
  try {
    zc();
  } finally {
    Ce = 0, Hc(), ke = 0;
  }
}
function Bc() {
  var t = Je.now(), e = t - Dn;
  e > ns && (Pn -= e, Dn = t);
}
function Hc() {
  for (var t, e = In, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : In = n);
  Ze = t, xi(i);
}
function xi(t) {
  if (!Ce) {
    Ue && (Ue = clearTimeout(Ue));
    var e = t - ke;
    e > 24 ? (t < 1 / 0 && (Ue = setTimeout(yr, t - Je.now() - Pn)), He && (He = clearInterval(He))) : (He || (Dn = Je.now(), He = setInterval(Bc, ns)), Ce = 1, is(yr));
  }
}
function br(t, e, n) {
  var i = new Rn();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var Pc = Fa("start", "end", "cancel", "interrupt"), Vc = [], as = 0, xr = 1, ki = 2, bn = 3, kr = 4, Ti = 5, xn = 6;
function Vn(t, e, n, i, r, a) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Uc(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Pc,
    tween: Vc,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: as
  });
}
function qi(t, e) {
  var n = te(t, e);
  if (n.state > as) throw new Error("too late; already scheduled");
  return n;
}
function re(t, e) {
  var n = te(t, e);
  if (n.state > bn) throw new Error("too late; already running");
  return n;
}
function te(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Uc(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = rs(a, 0, n.time);
  function a(c) {
    n.state = xr, n.timer.restart(s, n.delay, n.time), n.delay <= c && s(c - n.delay);
  }
  function s(c) {
    var u, m, d, _;
    if (n.state !== xr) return f();
    for (u in i)
      if (_ = i[u], _.name === n.name) {
        if (_.state === bn) return br(s);
        _.state === kr ? (_.state = xn, _.timer.stop(), _.on.call("interrupt", t, t.__data__, _.index, _.group), delete i[u]) : +u < e && (_.state = xn, _.timer.stop(), _.on.call("cancel", t, t.__data__, _.index, _.group), delete i[u]);
      }
    if (br(function() {
      n.state === bn && (n.state = kr, n.timer.restart(o, n.delay, n.time), o(c));
    }), n.state = ki, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ki) {
      for (n.state = bn, r = new Array(d = n.tween.length), u = 0, m = -1; u < d; ++u)
        (_ = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++m] = _);
      r.length = m + 1;
    }
  }
  function o(c) {
    for (var u = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(f), n.state = Ti, 1), m = -1, d = r.length; ++m < d; )
      r[m].call(t, u);
    n.state === Ti && (n.on.call("end", t, t.__data__, n.index, n.group), f());
  }
  function f() {
    n.state = xn, n.timer.stop(), delete i[e];
    for (var c in i) return;
    delete t.__transition;
  }
}
function Zc(t, e) {
  var n = t.__transition, i, r, a = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((i = n[s]).name !== e) {
        a = !1;
        continue;
      }
      r = i.state > ki && i.state < Ti, i.state = xn, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[s];
    }
    a && delete t.__transition;
  }
}
function qc(t) {
  return this.each(function() {
    Zc(this, t);
  });
}
function Gc(t, e) {
  var n, i;
  return function() {
    var r = re(this, t), a = r.tween;
    if (a !== n) {
      i = n = a;
      for (var s = 0, o = i.length; s < o; ++s)
        if (i[s].name === e) {
          i = i.slice(), i.splice(s, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function Wc(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = re(this, t), s = a.tween;
    if (s !== i) {
      r = (i = s).slice();
      for (var o = { name: e, value: n }, f = 0, c = r.length; f < c; ++f)
        if (r[f].name === e) {
          r[f] = o;
          break;
        }
      f === c && r.push(o);
    }
    a.tween = r;
  };
}
function Xc(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = te(this.node(), n).tween, r = 0, a = i.length, s; r < a; ++r)
      if ((s = i[r]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Gc : Wc)(n, t, e));
}
function Gi(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = re(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return te(r, i).value[e];
  };
}
function ss(t, e) {
  var n;
  return (typeof e == "number" ? Qt : e instanceof xe ? Nn : (n = xe(e)) ? (e = n, Nn) : ja)(t, e);
}
function Yc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Kc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Jc(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = this.getAttribute(t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function Qc(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function jc(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), f;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), f = o + "", s === f ? null : s === i && f === r ? a : (r = f, a = e(i = s, o)));
  };
}
function tf(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), f;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), f = o + "", s === f ? null : s === i && f === r ? a : (r = f, a = e(i = s, o)));
  };
}
function ef(t, e) {
  var n = Hn(t), i = n === "transform" ? Cc : ss;
  return this.attrTween(t, typeof e == "function" ? (n.local ? tf : jc)(n, i, Gi(this, "attr." + t, e)) : e == null ? (n.local ? Kc : Yc)(n) : (n.local ? Qc : Jc)(n, i, e));
}
function nf(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function rf(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function af(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && rf(t, a)), n;
  }
  return r._value = e, r;
}
function sf(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && nf(t, a)), n;
  }
  return r._value = e, r;
}
function of(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = Hn(t);
  return this.tween(n, (i.local ? af : sf)(i, e));
}
function lf(t, e) {
  return function() {
    qi(this, t).delay = +e.apply(this, arguments);
  };
}
function cf(t, e) {
  return e = +e, function() {
    qi(this, t).delay = e;
  };
}
function ff(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? lf : cf)(e, t)) : te(this.node(), e).delay;
}
function uf(t, e) {
  return function() {
    re(this, t).duration = +e.apply(this, arguments);
  };
}
function hf(t, e) {
  return e = +e, function() {
    re(this, t).duration = e;
  };
}
function df(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? uf : hf)(e, t)) : te(this.node(), e).duration;
}
function pf(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    re(this, t).ease = e;
  };
}
function _f(t) {
  var e = this._id;
  return arguments.length ? this.each(pf(e, t)) : te(this.node(), e).ease;
}
function gf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    re(this, t).ease = n;
  };
}
function mf(t) {
  if (typeof t != "function") throw new Error();
  return this.each(gf(this._id, t));
}
function vf(t) {
  typeof t != "function" && (t = Pa(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], f, c = 0; c < s; ++c)
      (f = a[c]) && t.call(f, f.__data__, c, a) && o.push(f);
  return new fe(i, this._parents, this._name, this._id);
}
function wf(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var f = e[o], c = n[o], u = f.length, m = s[o] = new Array(u), d, _ = 0; _ < u; ++_)
      (d = f[_] || c[_]) && (m[_] = d);
  for (; o < i; ++o)
    s[o] = e[o];
  return new fe(s, this._parents, this._name, this._id);
}
function yf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function bf(t, e, n) {
  var i, r, a = yf(e) ? qi : re;
  return function() {
    var s = a(this, t), o = s.on;
    o !== i && (r = (i = o).copy()).on(e, n), s.on = r;
  };
}
function xf(t, e) {
  var n = this._id;
  return arguments.length < 2 ? te(this.node(), n).on.on(t) : this.each(bf(n, t, e));
}
function kf(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Tf() {
  return this.on("end.remove", kf(this._id));
}
function Ef(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = zi(t));
  for (var i = this._groups, r = i.length, a = new Array(r), s = 0; s < r; ++s)
    for (var o = i[s], f = o.length, c = a[s] = new Array(f), u, m, d = 0; d < f; ++d)
      (u = o[d]) && (m = t.call(u, u.__data__, d, o)) && ("__data__" in u && (m.__data__ = u.__data__), c[d] = m, Vn(c[d], e, n, d, c, te(u, n)));
  return new fe(a, this._parents, e, n);
}
function Sf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ha(t));
  for (var i = this._groups, r = i.length, a = [], s = [], o = 0; o < r; ++o)
    for (var f = i[o], c = f.length, u, m = 0; m < c; ++m)
      if (u = f[m]) {
        for (var d = t.call(u, u.__data__, m, f), _, x = te(u, n), L = 0, I = d.length; L < I; ++L)
          (_ = d[L]) && Vn(_, e, n, L, d, x);
        a.push(d), s.push(u);
      }
  return new fe(a, s, e, n);
}
var Af = Se.prototype.constructor;
function $f() {
  return new Af(this._groups, this._parents);
}
function Nf(t, e) {
  var n, i, r;
  return function() {
    var a = Le(this, t), s = (this.style.removeProperty(t), Le(this, t));
    return a === s ? null : a === n && s === i ? r : r = e(n = a, i = s);
  };
}
function os(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function If(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = Le(this, t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function Df(t, e, n) {
  var i, r, a;
  return function() {
    var s = Le(this, t), o = n(this), f = o + "";
    return o == null && (f = o = (this.style.removeProperty(t), Le(this, t))), s === f ? null : s === i && f === r ? a : (r = f, a = e(i = s, o));
  };
}
function Rf(t, e) {
  var n, i, r, a = "style." + e, s = "end." + a, o;
  return function() {
    var f = re(this, t), c = f.on, u = f.value[a] == null ? o || (o = os(e)) : void 0;
    (c !== n || r !== u) && (i = (n = c).copy()).on(s, r = u), f.on = i;
  };
}
function Mf(t, e, n) {
  var i = (t += "") == "transform" ? Lc : ss;
  return e == null ? this.styleTween(t, Nf(t, i)).on("end.style." + t, os(t)) : typeof e == "function" ? this.styleTween(t, Df(t, i, Gi(this, "style." + t, e))).each(Rf(this._id, t)) : this.styleTween(t, If(t, i, e), n).on("end.style." + t, null);
}
function Of(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function Lf(t, e, n) {
  var i, r;
  function a() {
    var s = e.apply(this, arguments);
    return s !== r && (i = (r = s) && Of(t, s, n)), i;
  }
  return a._value = e, a;
}
function Cf(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, Lf(t, e, n ?? ""));
}
function Ff(t) {
  return function() {
    this.textContent = t;
  };
}
function zf(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Bf(t) {
  return this.tween("text", typeof t == "function" ? zf(Gi(this, "text", t)) : Ff(t == null ? "" : t + ""));
}
function Hf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Pf(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && Hf(r)), e;
  }
  return i._value = t, i;
}
function Vf(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Pf(t));
}
function Uf() {
  for (var t = this._name, e = this._id, n = ls(), i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, f, c = 0; c < o; ++c)
      if (f = s[c]) {
        var u = te(f, e);
        Vn(f, t, n, c, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new fe(i, this._parents, t, n);
}
function Zf() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, f = { value: function() {
      --r === 0 && a();
    } };
    n.each(function() {
      var c = re(this, i), u = c.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(f)), c.on = e;
    }), r === 0 && a();
  });
}
var qf = 0;
function fe(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function ls() {
  return ++qf;
}
var oe = Se.prototype;
fe.prototype = {
  constructor: fe,
  select: Ef,
  selectAll: Sf,
  selectChild: oe.selectChild,
  selectChildren: oe.selectChildren,
  filter: vf,
  merge: wf,
  selection: $f,
  transition: Uf,
  call: oe.call,
  nodes: oe.nodes,
  node: oe.node,
  size: oe.size,
  empty: oe.empty,
  each: oe.each,
  on: xf,
  attr: ef,
  attrTween: of,
  style: Mf,
  styleTween: Cf,
  text: Bf,
  textTween: Vf,
  remove: Tf,
  tween: Xc,
  delay: ff,
  duration: df,
  ease: _f,
  easeVarying: mf,
  end: Zf,
  [Symbol.iterator]: oe[Symbol.iterator]
};
function Gf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Wf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Gf
};
function Xf(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Yf(t) {
  var e, n;
  t instanceof fe ? (e = t._id, t = t._name) : (e = ls(), (n = Wf).time = Zi(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, f, c = 0; c < o; ++c)
      (f = s[c]) && Vn(f, t, e, c, s, n || Xf(f, e));
  return new fe(i, this._parents, t, e);
}
Se.prototype.interrupt = qc;
Se.prototype.transition = Yf;
const Ei = Math.PI, Si = 2 * Ei, me = 1e-6, Kf = Si - me;
function cs(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Jf(t) {
  let e = Math.floor(t);
  if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
  if (e > 15) return cs;
  const n = 10 ** e;
  return function(i) {
    this._ += i[0];
    for (let r = 1, a = i.length; r < a; ++r)
      this._ += Math.round(arguments[r] * n) / n + i[r];
  };
}
class Qf {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? cs : Jf(e);
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
  bezierCurveTo(e, n, i, r, a, s) {
    this._append`C${+e},${+n},${+i},${+r},${this._x1 = +a},${this._y1 = +s}`;
  }
  arcTo(e, n, i, r, a) {
    if (e = +e, n = +n, i = +i, r = +r, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let s = this._x1, o = this._y1, f = i - e, c = r - n, u = s - e, m = o - n, d = u * u + m * m;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (d > me) if (!(Math.abs(m * f - c * u) > me) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let _ = i - s, x = r - o, L = f * f + c * c, I = _ * _ + x * x, A = Math.sqrt(L), E = Math.sqrt(d), k = a * Math.tan((Ei - Math.acos((L + d - I) / (2 * A * E))) / 2), b = k / E, S = k / A;
      Math.abs(b - 1) > me && this._append`L${e + b * u},${n + b * m}`, this._append`A${a},${a},0,0,${+(m * _ > u * x)},${this._x1 = e + S * f},${this._y1 = n + S * c}`;
    }
  }
  arc(e, n, i, r, a, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let o = i * Math.cos(r), f = i * Math.sin(r), c = e + o, u = n + f, m = 1 ^ s, d = s ? r - a : a - r;
    this._x1 === null ? this._append`M${c},${u}` : (Math.abs(this._x1 - c) > me || Math.abs(this._y1 - u) > me) && this._append`L${c},${u}`, i && (d < 0 && (d = d % Si + Si), d > Kf ? this._append`A${i},${i},0,1,${m},${e - o},${n - f}A${i},${i},0,1,${m},${this._x1 = c},${this._y1 = u}` : d > me && this._append`A${i},${i},0,${+(d >= Ei)},${m},${this._x1 = e + i * Math.cos(a)},${this._y1 = n + i * Math.sin(a)}`);
  }
  rect(e, n, i, r) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function jf(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Mn(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, i = t.slice(0, n);
  return [
    i.length > 1 ? i[0] + i.slice(2) : i,
    +t.slice(n + 1)
  ];
}
function Fe(t) {
  return t = Mn(Math.abs(t)), t ? t[1] : NaN;
}
function tu(t, e) {
  return function(n, i) {
    for (var r = n.length, a = [], s = 0, o = t[0], f = 0; r > 0 && o > 0 && (f + o + 1 > i && (o = Math.max(1, i - f)), a.push(n.substring(r -= o, r + o)), !((f += o + 1) > i)); )
      o = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function eu(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var nu = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function On(t) {
  if (!(e = nu.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Wi({
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
On.prototype = Wi.prototype;
function Wi(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Wi.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function iu(t) {
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
var fs;
function ru(t, e) {
  var n = Mn(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1], a = r - (fs = Math.max(-8, Math.min(8, Math.floor(r / 3))) * 3) + 1, s = i.length;
  return a === s ? i : a > s ? i + new Array(a - s + 1).join("0") : a > 0 ? i.slice(0, a) + "." + i.slice(a) : "0." + new Array(1 - a).join("0") + Mn(t, Math.max(0, e + a - 1))[0];
}
function Tr(t, e) {
  var n = Mn(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1];
  return r < 0 ? "0." + new Array(-r).join("0") + i : i.length > r + 1 ? i.slice(0, r + 1) + "." + i.slice(r + 1) : i + new Array(r - i.length + 2).join("0");
}
const Er = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: jf,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Tr(t * 100, e),
  r: Tr,
  s: ru,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Sr(t) {
  return t;
}
var Ar = Array.prototype.map, $r = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function au(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Sr : tu(Ar.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Sr : eu(Ar.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", f = t.nan === void 0 ? "NaN" : t.nan + "";
  function c(m) {
    m = On(m);
    var d = m.fill, _ = m.align, x = m.sign, L = m.symbol, I = m.zero, A = m.width, E = m.comma, k = m.precision, b = m.trim, S = m.type;
    S === "n" ? (E = !0, S = "g") : Er[S] || (k === void 0 && (k = 12), b = !0, S = "g"), (I || d === "0" && _ === "=") && (I = !0, d = "0", _ = "=");
    var $ = L === "$" ? n : L === "#" && /[boxX]/.test(S) ? "0" + S.toLowerCase() : "", T = L === "$" ? i : /[%p]/.test(S) ? s : "", H = Er[S], z = /[defgprs%]/.test(S);
    k = k === void 0 ? 6 : /[gprs]/.test(S) ? Math.max(1, Math.min(21, k)) : Math.max(0, Math.min(20, k));
    function F(y) {
      var U = $, P = T, K, nt, ct;
      if (S === "c")
        P = H(y) + P, y = "";
      else {
        y = +y;
        var W = y < 0 || 1 / y < 0;
        if (y = isNaN(y) ? f : H(Math.abs(y), k), b && (y = iu(y)), W && +y == 0 && x !== "+" && (W = !1), U = (W ? x === "(" ? x : o : x === "-" || x === "(" ? "" : x) + U, P = (S === "s" ? $r[8 + fs / 3] : "") + P + (W && x === "(" ? ")" : ""), z) {
          for (K = -1, nt = y.length; ++K < nt; )
            if (ct = y.charCodeAt(K), 48 > ct || ct > 57) {
              P = (ct === 46 ? r + y.slice(K + 1) : y.slice(K)) + P, y = y.slice(0, K);
              break;
            }
        }
      }
      E && !I && (y = e(y, 1 / 0));
      var j = U.length + y.length + P.length, V = j < A ? new Array(A - j + 1).join(d) : "";
      switch (E && I && (y = e(V + y, V.length ? A - P.length : 1 / 0), V = ""), _) {
        case "<":
          y = U + y + P + V;
          break;
        case "=":
          y = U + V + y + P;
          break;
        case "^":
          y = V.slice(0, j = V.length >> 1) + U + y + P + V.slice(j);
          break;
        default:
          y = V + U + y + P;
          break;
      }
      return a(y);
    }
    return F.toString = function() {
      return m + "";
    }, F;
  }
  function u(m, d) {
    var _ = c((m = On(m), m.type = "f", m)), x = Math.max(-8, Math.min(8, Math.floor(Fe(d) / 3))) * 3, L = Math.pow(10, -x), I = $r[8 + x / 3];
    return function(A) {
      return _(L * A) + I;
    };
  }
  return {
    format: c,
    formatPrefix: u
  };
}
var cn, us, hs;
su({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function su(t) {
  return cn = au(t), us = cn.format, hs = cn.formatPrefix, cn;
}
function ou(t) {
  return Math.max(0, -Fe(Math.abs(t)));
}
function lu(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Fe(e) / 3))) * 3 - Fe(Math.abs(t)));
}
function cu(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Fe(e) - Fe(t)) + 1;
}
function fu(t, e) {
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
function uu(t) {
  return function() {
    return t;
  };
}
function hu(t) {
  return +t;
}
var Nr = [0, 1];
function Re(t) {
  return t;
}
function Ai(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : uu(isNaN(e) ? NaN : 0.5);
}
function du(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(i) {
    return Math.max(t, Math.min(e, i));
  };
}
function pu(t, e, n) {
  var i = t[0], r = t[1], a = e[0], s = e[1];
  return r < i ? (i = Ai(r, i), a = n(s, a)) : (i = Ai(i, r), a = n(a, s)), function(o) {
    return a(i(o));
  };
}
function _u(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, r = new Array(i), a = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    r[s] = Ai(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var f = mo(t, o, 1, i) - 1;
    return a[f](r[f](o));
  };
}
function gu(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function mu() {
  var t = Nr, e = Nr, n = Ui, i, r, a, s = Re, o, f, c;
  function u() {
    var d = Math.min(t.length, e.length);
    return s !== Re && (s = du(t[0], t[d - 1])), o = d > 2 ? _u : pu, f = c = null, m;
  }
  function m(d) {
    return d == null || isNaN(d = +d) ? a : (f || (f = o(t.map(i), e, n)))(i(s(d)));
  }
  return m.invert = function(d) {
    return s(r((c || (c = o(e, t.map(i), Qt)))(d)));
  }, m.domain = function(d) {
    return arguments.length ? (t = Array.from(d, hu), u()) : t.slice();
  }, m.range = function(d) {
    return arguments.length ? (e = Array.from(d), u()) : e.slice();
  }, m.rangeRound = function(d) {
    return e = Array.from(d), n = Rc, u();
  }, m.clamp = function(d) {
    return arguments.length ? (s = d ? !0 : Re, u()) : s !== Re;
  }, m.interpolate = function(d) {
    return arguments.length ? (n = d, u()) : n;
  }, m.unknown = function(d) {
    return arguments.length ? (a = d, m) : a;
  }, function(d, _) {
    return i = d, r = _, u();
  };
}
function vu() {
  return mu()(Re, Re);
}
function wu(t, e, n, i) {
  var r = xo(t, e, n), a;
  switch (i = On(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(a = lu(r, s)) && (i.precision = a), hs(i, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(a = cu(r, Math.max(Math.abs(t), Math.abs(e)))) && (i.precision = a - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(a = ou(r)) && (i.precision = a - (i.type === "%") * 2);
      break;
    }
  }
  return us(i);
}
function yu(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var i = e();
    return bo(i[0], i[i.length - 1], n ?? 10);
  }, t.tickFormat = function(n, i) {
    var r = e();
    return wu(r[0], r[r.length - 1], n ?? 10, i);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var i = e(), r = 0, a = i.length - 1, s = i[r], o = i[a], f, c, u = 10;
    for (o < s && (c = s, s = o, o = c, c = r, r = a, a = c); u-- > 0; ) {
      if (c = gi(s, o, n), c === f)
        return i[r] = s, i[a] = o, e(i);
      if (c > 0)
        s = Math.floor(s / c) * c, o = Math.ceil(o / c) * c;
      else if (c < 0)
        s = Math.ceil(s * c) / c, o = Math.floor(o * c) / c;
      else
        break;
      f = c;
    }
    return t;
  }, t;
}
function he() {
  var t = vu();
  return t.copy = function() {
    return gu(t, he());
  }, fu.apply(t, arguments), yu(t);
}
function fn(t) {
  return function() {
    return t;
  };
}
const Xi = Math.sqrt, ds = Math.PI, bu = 2 * ds;
function xu(t) {
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
  }, () => new Qf(e);
}
const ku = {
  draw(t, e) {
    const n = Xi(e / ds);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, bu);
  }
}, Yn = Xi(3), ps = {
  draw(t, e) {
    const n = -Xi(e / (Yn * 3));
    t.moveTo(0, n * 2), t.lineTo(-Yn * n, -n), t.lineTo(Yn * n, -n), t.closePath();
  }
};
function _s(t, e) {
  let n = null, i = xu(r);
  t = typeof t == "function" ? t : fn(t || ku), e = typeof e == "function" ? e : fn(e === void 0 ? 64 : +e);
  function r() {
    let a;
    if (n || (n = a = i()), t.apply(this, arguments).draw(n, +e.apply(this, arguments)), a) return n = null, a + "" || null;
  }
  return r.type = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : fn(a), r) : t;
  }, r.size = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : fn(+a), r) : e;
  }, r.context = function(a) {
    return arguments.length ? (n = a ?? null, r) : n;
  }, r;
}
function qe(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
qe.prototype = {
  constructor: qe,
  scale: function(t) {
    return t === 1 ? this : new qe(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new qe(this.k, this.x + this.k * t, this.y + this.k * e);
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
qe.prototype;
function Yi(t, e, n) {
  let i = 0, r, a;
  if (t.length == 0)
    i = 1;
  else {
    for (let s = 1; s < t.length; s++) {
      for (const o of t[s]) {
        const [f, c] = o.split(":");
        if (n < +f || e > +c)
          a = 1;
        else {
          a = 0;
          break;
        }
      }
      if (a) {
        r = 1, i = s;
        break;
      }
    }
    r || (i = t.length);
  }
  return i;
}
function gs(t, e) {
  let n = -1, i = -1;
  for (const r of t) {
    const a = r.children;
    a && a.forEach((s) => {
      e.includes(s.type) && ((n < 0 || s.fmin < n) && (n = s.fmin), (i < 0 || s.fmax > i) && (i = s.fmax));
    });
  }
  return {
    fmin: n,
    fmax: i
  };
}
function ze(t) {
  const n = t.attr("class").split(" "), i = `.${n[0]}.${n[1]} .track`, r = Jt(i).nodes();
  let a = 0;
  return r.forEach((s) => {
    a += s.getBoundingClientRect().height + 1;
  }), a;
}
function Ki(t, e) {
  var r;
  const n = ((r = e.node()) == null ? void 0 : r.getBBox().height) ?? 0;
  e.selectAll(
    ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
  ).filter((a) => {
    var o;
    let s = !1;
    return (o = a.alleles) != null && o.length && (a.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((c) => {
      t.includes(c) && (s = !0);
    }), a.alleles.forEach((c) => {
      t.includes(c) && (s = !0);
    })), s;
  }).datum((a) => (a.selected = "true", a)).style("stroke", "black").each(function() {
    let a = At(this).attr("x"), s = +At(this).attr("width");
    (s === 0 || Number.isNaN(s)) && (s = 3, a = String(+a - s / 2)), e.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", a).attr("width", s).attr("height", n).attr("fill", "yellow").attr("opacity", 0.8).lower();
  });
}
const Tu = [
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
], Eu = [
  "point_mutation",
  "MNV",
  "Deletion",
  "Insertion",
  "Delins"
];
function Ge(t) {
  return t.replace(/\|/g, " ").replace(/"/g, "").replace(/^\[/, "").replace(/\]$/, "").trim();
}
const kn = {
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
function ms(t) {
  if (!t)
    return "black";
  const e = Ge(t);
  if (e.split(" ").length > 1 || e.split("|").length > 1) {
    const i = e.includes("|") ? e.split("|")[0].trim() : e.split(" ")[0].trim();
    return ms(i);
  }
  if (e === "UNKNOWN")
    return "gray";
  const n = kn[e];
  return n ? n.color : e === "5_prime_UTR_variant" ? kn.five_prime_UTR_variant.color : e === "3_prime_UTR_variant" ? kn.three_prime_UTR_variant.color : "#f0f";
}
const be = 10, ue = 10;
function Ji(t) {
  return `${t},${be} ${t + ue / 2},${be / 2} ${t},0 ${t - ue / 2},${be / 2}`;
}
function vs(t) {
  return `${t - ue / 2},${be} ${t},0 ${t + ue / 2},${be}`;
}
function Ir(t, e, n) {
  if (t.length == 0)
    return 0;
  {
    let i = !0, r = 0;
    return t.sort((a, s) => a.row > s.row ? 1 : -1), t.every((a) => r != a.row && i ? !1 : (r != a.row && (r = a.row, i = !0), a.fmin > e && a.fmin > n || a.fmax < n && a.fmax < e || (i = !1), !0)), i ? r : r + 1;
  }
}
function ws(t) {
  return `${t - ue / 2},${be} ${t + ue / 2},${be} ${t - ue / 2},0 ${t + ue / 2},0`;
}
function Su(t) {
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
function Au(t, e, n) {
  const { fmax: i, fmin: r, type: a } = e;
  return t.findIndex((s) => {
    const o = s.fmin + n, f = s.fmax - n;
    return a !== s.type ? !1 : o <= r && f >= r || f <= i && f >= i || o >= r && f <= i;
  });
}
function ys(t, e) {
  const n = [];
  return t.forEach((i) => {
    const r = bs(i), { type: a, fmax: s, fmin: o } = i, f = Au(
      n,
      i,
      e
    );
    if (f >= 0 && a != "deletion") {
      const c = n[f], u = c.variantSet ? c.variantSet.findIndex(
        (m) => m.type === a && m.consequence === r
      ) : -1;
      if (u >= 0) {
        const m = Math.min(
          c.variantSet[u].fmin,
          o
        ), d = Math.max(
          c.variantSet[u].fmax,
          s
        );
        c.fmin = m, c.fmax = d, c.variantSet[u].fmin = m, c.variantSet[u].fmax = d, c.variantSet[u].variants.push(i);
      } else {
        const m = Math.min(c.fmin, o), d = Math.max(c.fmax, s);
        c.fmin = m, c.fmax = d, c.variantSet.push({
          variants: [i],
          type: a,
          consequence: r,
          fmin: o,
          fmax: s
        });
      }
      c.variants.push(i), c.fmin = Math.min(o, c.fmin), c.fmax = Math.max(s, c.fmax), n[f] = c;
    } else
      n.push({
        fmin: o,
        fmax: s,
        type: a,
        consequence: r,
        variantSet: [
          // @ts-expect-error
          {
            variants: [i],
            type: a,
            consequence: r,
            fmin: o,
            fmax: s
          }
        ],
        variants: [i]
      });
  }), n;
}
function $i(t) {
  if (t.length === 1) {
    let e = '<div style="margin-top: 30px;">';
    return e += Dr(t[0]), e += "</div>", e;
  } else if (t.length > 1) {
    let e = '<ul style="list-style-type: none; margin-top: 30px;">';
    for (const n of t)
      e += `<li style="border-bottom: solid 1px black;">${Dr(n)}</li>`;
    return e += "</ul>", e;
  } else
    return "No data available";
}
function Dr(t) {
  const { descriptionWidth: e } = Su(t);
  let n = "";
  const i = t.location, [r, a] = i.split(":")[1].split("..");
  let s = t.alternative_alleles, o = t.reference_allele, f;
  if (t.type === "SNV")
    f = "1bp";
  else if (t.type === "deletion")
    f = `${o.length - 1}bp deleted`;
  else if (t.type === "insertion")
    s === "ALT_MISSING" ? (f = "unknown length inserted", s = "n+") : f = `${s.length - 1}bp inserted`;
  else if (t.type === "MNV")
    f = `${o.length}bp`;
  else if (t.type === "delins") {
    const u = `${o.length - 1}bp deleted`;
    let m;
    s === "ALT_MISSING" ? (m = "unknown length inserted", s = "n+") : m = `${s.length - 1}bp inserted`, f = `${u}; ${m}`;
  } else
    f = `${+a - +r}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let c = "";
  return t.type === "insertion" ? c = `ins: ${s}` : t.type === "deletion" ? c = `del: ${o}` : c = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td>${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${f}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td>${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${c}</td></tr>`), n += "</tbody></table>", n;
}
function Ni(t) {
  return (t.variants ?? []).map((n) => {
    const i = $u(n);
    return {
      ...i,
      consequence: i.consequence || "UNKNOWN"
    };
  });
}
function Ii(t) {
  return (t.variants ?? []).flatMap((e) => {
    var r, a;
    const n = (a = (r = e.allele_ids) == null ? void 0 : r.values) == null ? void 0 : a[0];
    if (!n) return [];
    if (n.startsWith("[") && n.endsWith("]"))
      try {
        const s = JSON.parse(n);
        return (Array.isArray(s) ? s : [s]).map(String);
      } catch {
      }
    const i = n.replace(/"/g, "");
    return i == null ? void 0 : i.split(",").map((s) => s.replace(/\[|\]| /g, ""));
  }).filter((e) => !!e);
}
function Di(t) {
  return t.map((e) => ms(e.consequence));
}
function bs(t) {
  var n;
  if ((n = t.geneLevelConsequence) != null && n.values && t.geneLevelConsequence.values.length > 0)
    return Ge(t.geneLevelConsequence.values[0]);
  if (t.consequence && typeof t.consequence == "string")
    return Ge(t.consequence);
  if (Array.isArray(t.consequence) && t.consequence.length > 0)
    return Ge(t.consequence[0]);
  const e = t.variants ?? [];
  if (e.length > 0) {
    for (const i of e)
      if (i.consequence && typeof i.consequence == "string")
        return Ge(i.consequence);
  }
  return "UNKNOWN";
}
function un(t) {
  return (Array.isArray(t == null ? void 0 : t.values) ? t.values.join(" ") : t == null ? void 0 : t.values) ?? "";
}
function $u(t) {
  var e, n;
  return {
    symbol: Qe(t),
    symbolDetail: xs(t),
    location: `${t.seqId}:${t.fmin}..${t.fmax}`,
    consequence: bs(t),
    type: t.type,
    name: t.name,
    description: t.description,
    reference_allele: t.reference_allele,
    geneId: (e = t.allele_of_gene_ids) == null ? void 0 : e.values[0].replace(/"/g, ""),
    geneSymbol: (n = t.allele_of_gene_symbols) == null ? void 0 : n.values[0].replace(/"/g, ""),
    allele_of_genes: un(t.allele_of_genes),
    allele_ids: un(t.allele_ids),
    alternative_alleles: un(t.alternative_alleles),
    impact: un(t.impact)
  };
}
function xs(t) {
  var e, n, i;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : xs(t.variants[0]);
  if ((e = t.allele_symbols) != null && e.values)
    if (t.allele_symbols.values[0].split(",").length > 1)
      try {
        const r = [], a = t.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          ""
        ), s = ((n = t.allele_ids) == null ? void 0 : n.values[0].replace(/"|\[|\]/g, "")) ?? "", o = a.split(","), f = s.split(",");
        for (let c = 0; c < f.length; c++)
          r.push(
            `${o[c].trim()} (${f[c].trim()})`
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
function Qe(t) {
  var e;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : Qe(t.variants[0]);
  if ((e = t.allele_symbols_text) != null && e.values) {
    const n = t.allele_symbols_text.values[0].split(",");
    return n.length > 1 ? `${n.length}` : t.allele_symbols_text.values[0].replace(/"/g, "");
  }
  return "";
}
function Nu(t) {
  const e = [];
  for (const n of t)
    n.type.toLowerCase() === "deletion" || (n.type.toLowerCase() === "snv" || n.type.toLowerCase() === "point_mutation" ? e.push("snv") : n.type.toLowerCase() === "insertion" ? e.push("insertion") : (n.type.toLowerCase() === "delins" || n.type.toLowerCase() === "substitution" || n.type.toLowerCase() === "indel" || n.type.toLowerCase() === "mnv") && e.push("delins"));
  return [...new Set(e)].sort();
}
function Ri(t, e) {
  return `<svg width="15" top="3" viewBox="0 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><rect fill="${t}" stroke="none" height="10" width="10"></svg>${e}</polygons></svg>`;
}
function Ot(t) {
  return t == "unknown" ? Ri("grey", t.replace(/_/g, " ")) : Ri(
    kn[t].color,
    t.replace(/_/g, " ")
  );
}
function Iu() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${Ji(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Ri("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${vs(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ws(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Ot("transcript_ablation")}</li>`, t += `<li>${Ot("splice_acceptor_variant")}</li>`, t += `<li>${Ot("splice_donor_variant")}</li>`, t += `<li>${Ot("stop_gained")}</li>`, t += `<li>${Ot("frameshift_variant")}</li>`, t += `<li>${Ot("stop_lost")}</li>`, t += `<li>${Ot("start_lost")}</li>`, t += `<li>${Ot("inframe_insertion")}</li>`, t += `<li>${Ot("inframe_deletion")}</li>`, t += `<li>${Ot("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Ot("protein_altering_variant")}</li>`, t += `<li>${Ot("splice_region_variant")}</li>`, t += `<li>${Ot("start_retained_variant")}</li>`, t += `<li>${Ot("stop_retained_variant")}</li>`, t += `<li>${Ot("synonymous_variant")}</li>`, t += `<li>${Ot("coding_sequence_variant")}</li>`, t += `<li>${Ot("five_prime_UTR_variant")}</li>`, t += `<li>${Ot("three_prime_UTR_variant")}</li>`, t += `<li>${Ot("intron_variant")}</li>`, t += `<li>${Ot("non_coding_transcript_variant")}</li>`, t += `<li>${Ot("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
function Du(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function Ct(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${Du(t.strand)})</td></tr>`, e += "</tbody></table>", e;
}
function ks(t, e, n, i) {
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
class Ru {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    variantTypes: a,
    showVariantLabel: s,
    variantFilter: o,
    binRatio: f,
    isoformFilter: c,
    initialHighlight: u,
    trackData: m,
    variantData: d
  }) {
    this.trackData = m ?? [], this.variantData = d ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.isoformFilter = c, this.initialHighlight = u, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.binRatio = f, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.isoformFilter;
    let n = this.trackData;
    const i = this.initialHighlight, r = this.filterVariantData(
      this.variantData,
      this.variantFilter
    ), a = this.viewer, s = this.width, o = this.binRatio, f = Nu(r), c = f.length, u = this.trackData[0].source, m = this.trackData[0].seqId, d = e.length === 0 ? 9 : 30, _ = ["UTR", "five_prime_UTR", "three_prime_UTR"], x = ["CDS"], L = ["exon"], I = this.transcriptTypes, A = gs(n, I), E = A.fmin, k = A.fmax, b = 10, S = 10, $ = 40, T = 20, H = 2, z = 0, F = 10, y = 10, U = 4, P = 20, K = 10, nt = `0,0 0,${P} ${K},${K}`, ct = 10, W = 40, j = 22.5, V = he().domain([E, k]).range([0, s]), rt = a.append("g").attr("class", "deletions track").attr("transform", "translate(0,22.5)"), Rt = a.append("g").attr("class", "label"), J = {};
    for (let st = 0, pt = _.length; st < pt; st++)
      J[_[st]] = 200;
    for (let st = 0, pt = x.length; st < pt; st++)
      J[x[st]] = 1e3;
    for (let st = 0, pt = L.length; st < pt; st++)
      J[L[st]] = 100;
    const gt = {};
    n = n.sort((st, pt) => st.selected && !pt.selected ? -1 : !st.selected && pt.selected ? 1 : st.name.localeCompare(pt.name));
    let Et = 0;
    const dt = At("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), Q = () => {
      dt.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, lt = ys(
      r,
      (k - E) * o
    ), ft = lt.filter((st) => st.type === "deletion"), Tt = lt.filter((st) => st.type !== "deletion"), Nt = [];
    ft.forEach((st) => {
      var B;
      const { fmax: pt, fmin: ht } = st, ut = this.width, Ft = Qe(st), q = Ni(st), yt = Ii(st), bt = $i(q), kt = Di(q)[0];
      Nt.push({
        fmin: ht,
        fmax: pt,
        row: Ir(Nt, ht, pt)
      });
      const g = Math.max(Math.ceil(V(pt) - V(ht)), H);
      rt.append("rect").attr("class", "variant-deletion").attr("id", `variant-${ht}`).attr("x", V(ht)).attr(
        "transform",
        `translate(0,${y * Ir(Nt, ht, pt)})`
      ).attr("z-index", 30).attr("fill", kt).attr("height", y).attr("width", g).on("click", () => {
        St(dt, bt, Q);
      }).on("mouseover", (C) => {
        const G = C.variant;
        Jt(
          ".variant-deletion"
        ).filter((v) => v.variant === G).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((v) => v.variant === G).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-deletion").filter((C) => C.selected !== "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ht,
        fmax: pt,
        variant: Ft + ht,
        alleles: yt
      });
      {
        let C = 0;
        C = V(ht);
        const G = y * c + j, v = Rt.append("text").attr("class", "variantLabel").attr("fill", kt).attr("opacity", 0).attr("height", z).attr("transform", `translate(${C},${G})`).text(Ft).on("click", () => {
          St(dt, bt, Q);
        }).datum({ fmin: ht, variant: Ft + ht }), R = ((B = v.node()) == null ? void 0 : B.getBBox().width) ?? 0;
        if (R + C > ut) {
          const h = R + C - ut;
          C -= h, v.attr(
            "transform",
            `translate(${C},${G})`
          );
        }
      }
    });
    const $t = ze(this.viewer), ot = a.append("g").attr("class", "variants track").attr("transform", `translate(0,${$t})`);
    Tt.forEach((st) => {
      var G;
      const { type: pt, fmax: ht, fmin: ut } = st;
      let Ft = !0, q = !1;
      const yt = this.width, bt = Qe(st), kt = Ni(st), g = Ii(st), B = $i(kt), C = Di(kt)[0];
      if (pt.toLowerCase() === "snv" || pt.toLowerCase() === "point_mutation" ? (q = !0, ot.append("polygon").attr("class", "variant-SNV").attr("id", `variant-${ut}`).attr("points", Ji(V(ut))).attr("fill", C).attr("x", V(ut)).attr(
        "transform",
        `translate(0,${y * f.indexOf("snv")})`
      ).attr("z-index", 30).on("click", () => {
        St(dt, B, Q);
      }).on("mouseover", function(v) {
        const R = v.variant;
        Jt(
          ".variant-SNV"
        ).filter((h) => h.variant === R).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((h) => h.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-SNV").filter((v) => v.selected != "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ht,
        variant: bt + ut,
        alleles: g
      })) : pt.toLowerCase() === "insertion" ? (q = !0, ot.append("polygon").attr("class", "variant-insertion").attr("id", `variant-${ut}`).attr("points", vs(V(ut))).attr("fill", C).attr("x", V(ut)).attr(
        "transform",
        `translate(0,${y * f.indexOf("insertion")})`
      ).attr("z-index", 30).on("click", () => {
        St(dt, B, Q);
      }).on("mouseover", (v) => {
        const R = v.variant;
        Jt(
          ".variant-insertion"
        ).filter((h) => h.variant === R).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((h) => h.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(
          ".variant-insertion"
        ).filter((v) => v.selected != "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ht,
        variant: bt + ut,
        alleles: g
      })) : pt.toLowerCase() === "delins" || pt.toLowerCase() === "substitution" || pt.toLowerCase() === "indel" || pt.toLowerCase() === "mnv" ? (q = !0, ot.append("polygon").attr("class", "variant-delins").attr("id", `variant-${ut}`).attr("points", ws(V(ut))).attr("x", V(ut)).attr(
        "transform",
        `translate(0,${y * f.indexOf("delins")})`
      ).attr("fill", C).attr("z-index", 30).on("click", () => {
        St(dt, B, Q);
      }).on("mouseover", (v) => {
        const R = v.variant;
        Jt(
          ".variant-delins"
        ).filter((h) => h.variant === R).style("stroke", "black"), At(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((h) => h.variant === R).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-delins").filter((v) => v.selected != "true").style("stroke", null), At(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ut,
        fmax: ht,
        variant: bt + ut,
        alleles: g
      })) : (console.warn("type not found", pt, st), Ft = !1), Ft) {
        let v = 0;
        v = q ? V(ut) - ct / 2 : V(ut);
        const R = y * c + j, h = Rt.append("text").attr("class", "variantLabel").attr("fill", C).attr("opacity", 0).attr("height", z).attr("transform", `translate(${v},${R})`).text(bt).on("click", () => {
          St(dt, B, Q);
        }).datum({ fmin: ut, variant: bt + ut }), M = ((G = h.node()) == null ? void 0 : G.getBBox().width) ?? 0;
        if (M + v > yt) {
          const tt = M + v - yt;
          v -= tt, h.attr("transform", `translate(${v},35)`);
        }
      }
    });
    const it = $t;
    Rt.attr("transform", `translate(0,${it})`);
    const vt = ze(this.viewer) + j, It = a.append("g").attr("transform", `translate(0,${vt})`).attr("class", "track");
    let at = 0;
    const _t = [];
    let Z = -1, xt = -1;
    const St = this.renderTooltipDescription, Bt = [];
    for (let st = 0; st < n.length && at < d; st++) {
      const pt = n[st];
      let ht = pt.children;
      if (ht) {
        const ut = pt.selected;
        ht = ht.sort(
          (q, yt) => q.name.localeCompare(yt.name)
        );
        let Ft = !1;
        ht.forEach((q) => {
          var bt;
          if (!(e.includes(q.id) || e.includes(q.name)) && e.length !== 0 || Bt.includes(q.id))
            return;
          Bt.push(q.id);
          const yt = q.type;
          if (I.includes(yt)) {
            let kt = Yi(
              _t,
              V(q.fmin),
              V(q.fmax)
            );
            if (at < d) {
              let g = "", B, C = !1;
              const G = pt.name;
              Object.keys(gt).includes(G) || (Et += T, C = !0, gt[G] = "Green");
              const v = It.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${at * $ + 10 + Et})`
              );
              C && (g = G, B = v.append("text").attr("class", "geneLabel").attr("fill", ut ? "sandybrown" : "black").attr("height", z).attr(
                "transform",
                `translate(${V(q.fmin)},-${T})`
              ).text(g).on("click", () => {
                St(
                  dt,
                  Ct(pt),
                  Q
                );
              }).datum({
                fmin: q.fmin
              })), v.append("polygon").datum(() => ({
                fmin: q.fmin,
                fmax: q.fmax,
                strand: pt.strand
              })).attr("class", "transArrow").attr("points", nt).attr(
                "transform",
                (M) => pt.strand > 0 ? `translate(${Number(V(M.fmax))},0)` : `translate(${Number(V(M.fmin))},${P}) rotate(180)`
              ).on("click", () => {
                St(
                  dt,
                  Ct(q),
                  Q
                );
              }), v.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + z).attr("height", U).attr("transform", `translate(${V(q.fmin)},0)`).attr("width", V(q.fmax) - V(q.fmin)).on("click", () => {
                St(
                  dt,
                  Ct(q),
                  Q
                );
              }).datum({
                fmin: q.fmin,
                fmax: q.fmax
              }), g = q.name, B = v.append("text").attr("class", "transcriptLabel").attr("fill", ut ? "sandybrown" : "gray").attr("opacity", ut ? 1 : 0.5).attr("height", z).attr("transform", `translate(${V(q.fmin)},0)`).text(g).on("click", () => {
                St(
                  dt,
                  Ct(q),
                  Q
                );
              }).datum({
                fmin: q.fmin
              });
              let R = g.length * 2;
              try {
                R = ((bt = B.node()) == null ? void 0 : bt.getBBox().width) ?? 0;
              } catch {
              }
              Number(R + V(q.fmin)) > s;
              const h = R > V(q.fmax) - V(q.fmin) ? V(q.fmin) + R : V(q.fmax);
              if (_t[kt]) {
                const M = _t[kt];
                M.push(`${V(q.fmin)}:${h}`), _t[kt] = M;
              } else
                _t[kt] = [
                  `${V(q.fmin)}:${h}`
                ];
              (Z < 0 || Z > q.fmin) && (Z = q.fmin), (xt < 0 || xt < q.fmax) && (xt = q.fmax), q.children && (q.children = q.children.sort((M, tt) => {
                const l = J[M.type], D = J[tt.type];
                return typeof l == "number" && typeof D == "number" ? l - D : typeof l == "number" && typeof D != "number" ? -1 : typeof l != "number" && typeof D == "number" ? 1 : M.type.localeCompare(tt.type);
              }), q.children.forEach((M) => {
                const tt = M.type;
                L.includes(tt) ? v.append("rect").attr("class", "exon").attr("x", V(M.fmin)).attr(
                  "transform",
                  `translate(0,${b - U})`
                ).attr("height", b).attr("z-index", 10).attr("width", V(M.fmax) - V(M.fmin)).on("click", () => {
                  St(
                    dt,
                    Ct(q),
                    Q
                  );
                }).datum({ fmin: M.fmin, fmax: M.fmax }) : x.includes(tt) ? v.append("rect").attr("class", "CDS").attr("x", V(M.fmin)).attr(
                  "transform",
                  `translate(0,${S - U})`
                ).attr("z-index", 20).attr("height", S).attr("width", V(M.fmax) - V(M.fmin)).on("click", () => {
                  St(
                    dt,
                    Ct(q),
                    Q
                  );
                }).datum({ fmin: M.fmin, fmax: M.fmax }) : _.includes(tt) && v.append("rect").attr("class", "UTR").attr("x", V(M.fmin)).attr(
                  "transform",
                  `translate(0,${F - U})`
                ).attr("z-index", 20).attr("height", F).attr("width", V(M.fmax) - V(M.fmin)).on("click", () => {
                  St(
                    dt,
                    Ct(q),
                    Q
                  );
                }).datum({ fmin: M.fmin, fmax: M.fmax });
              })), at += 1;
            }
            if (at === d && !Ft) {
              const g = ks(u, m, E, k);
              ++kt, Ft = !0, It.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${at * $ + 20 + Et})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", z).html(g);
            }
          }
        });
      }
    }
    return i && Ki(i, a), at === 0 && It.append("text").attr("x", 30).attr("y", z + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), at * $ + Et + W;
  }
  filterVariantData(e, n) {
    return n.length === 0 ? e : e.filter((i) => {
      var a, s, o, f;
      let r = !1;
      try {
        (n.includes(i.name) || (a = i.allele_symbols) != null && a.values && n.includes(
          i.allele_symbols.values[0].replace(/"/g, "")
        ) || (s = i.symbol) != null && s.values && n.includes(i.symbol.values[0].replace(/"/g, "")) || (o = i.symbol_text) != null && o.values && n.includes(i.symbol_text.values[0].replace(/"/g, ""))) && (r = !0), (((f = i.allele_ids) == null ? void 0 : f.values[0].replace(/"|\[|\]| /g, "").split(",")) ?? []).forEach((u) => {
          n.includes(u) && (r = !0);
        });
      } catch (c) {
        console.error(
          "error processing filter with so returning anyway",
          n,
          i,
          c
        ), r = !0;
      }
      return r;
    });
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
  setInitialHighlight(e, n) {
    var a;
    const i = ((a = n.node()) == null ? void 0 : a.getBBox().height) ?? 0;
    n.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((s) => {
      let o = !1;
      return s.alleles && (s.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((c) => {
        e.includes(c) && (o = !0);
      }), s.alleles.forEach((c) => {
        e.includes(c) && (o = !0);
      })), o;
    }).datum((s) => (s.selected = "true", s)).style("stroke", "black").each(function() {
      const s = +(At(this).attr("width") || 3), o = +At(this).attr("x") - s / 2;
      n.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", o).attr("width", s).attr("height", i).attr("fill", "yellow").attr("opacity", 0.8).lower();
    });
  }
}
class Mu {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    variantTypes: a,
    showVariantLabel: s,
    variantFilter: o,
    initialHighlight: f,
    trackData: c,
    variantData: u
  }) {
    this.trackData = c ?? [], this.variantData = u ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.initialHighlight = f, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.variantData;
    let i = this.trackData;
    const r = this.filterVariantData(
      e,
      this.variantFilter
    ), a = ys(
      r,
      1
      // Colin NOTE: made up value
    ), s = /* @__PURE__ */ new Map();
    a.forEach((it) => {
      const vt = Ii(it);
      s.set(it, vt);
    });
    const o = this.viewer, f = this.width, c = this.showVariantLabel, u = ["UTR", "five_prime_UTR", "three_prime_UTR"], m = ["CDS"], d = ["exon"], _ = this.transcriptTypes, x = gs(i, _), L = x.fmin, I = x.fmax, A = 10, E = 10, k = 10, b = 40, S = 20, $ = 2, T = 0, H = 10, z = 10, F = 20, y = 4, U = 20, P = 10, K = `0,0 0,${U} ${P},${P}`, nt = 10, ct = 10, W = (it) => `${it - ct / 2},${nt} ${it},0 ${it + ct / 2},${nt}`, j = (it) => `${it - ct / 2},${nt} ${it + ct / 2},${nt} ${it - ct / 2},0 ${it + ct / 2},0`, V = (it) => `${it},${nt} ${it + ct / 2},${nt / 2} ${it},0 ${it - ct / 2},${nt / 2}`, rt = he().domain([L, I]).range([0, f]), Rt = ze(this.viewer), J = o.append("g").attr("transform", `translate(0,${Rt})`).attr("class", "track"), gt = {};
    for (const it of u)
      gt[it] = 200;
    for (const it of m)
      gt[it] = 1e3;
    for (const it of d)
      gt[it] = 100;
    const Et = {};
    i = i.sort((it, vt) => it.selected && !vt.selected ? -1 : !it.selected && vt.selected ? 1 : it.name - vt.name);
    let dt = 0;
    const Q = At("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), lt = () => {
      Q.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let ft = 0;
    const Tt = [];
    let Nt = -1, $t = -1;
    const ot = this.renderTooltipDescription;
    for (let it = 0; it < i.length && ft < A; it++) {
      const vt = i[it];
      let It = vt.children;
      if (It) {
        const at = vt.selected;
        It = It.sort((Z, xt) => Z.name < xt.name ? -1 : Z.name > xt.name ? 1 : Z - xt);
        let _t = !1;
        It.forEach((Z) => {
          const xt = Z.type;
          if (_.includes(xt)) {
            let St = Yi(
              Tt,
              rt(Z.fmin),
              rt(Z.fmax)
            );
            if (ft < A) {
              let Bt, st, pt = !1;
              Object.keys(Et).includes(vt.name) || (dt += S, pt = !0, Et[vt.name] = "Green");
              const ht = J.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ft * b + 10 + dt})`
              );
              pt && (Bt = vt.name, st = ht.append("text").attr("class", "geneLabel").attr("fill", at ? "sandybrown" : "black").attr("height", T).attr(
                "transform",
                `translate(${rt(Z.fmin)},-${S})`
              ).text(Bt).on("click", () => {
                ot(
                  Q,
                  Ct(vt),
                  lt
                );
              }).datum({ fmin: Z.fmin })), ht.append("polygon").datum(() => ({
                fmin: Z.fmin,
                fmax: Z.fmax,
                strand: vt.strand
              })).attr("class", "transArrow").attr("points", K).attr("transform", (q) => vt.strand > 0 ? `translate(${Number(rt(q.fmax))},0)` : `translate(${Number(rt(q.fmin))},${U}) rotate(180)`).on("click", () => {
                ot(
                  Q,
                  Ct(Z),
                  lt
                );
              }), ht.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + T).attr("height", y).attr("transform", `translate(${rt(Z.fmin)},0)`).attr("width", rt(Z.fmax) - rt(Z.fmin)).on("click", () => {
                ot(
                  Q,
                  Ct(Z),
                  lt
                );
              }).datum({ fmin: Z.fmin, fmax: Z.fmax }), Bt = Z.name, st = ht.append("text").attr("class", "transcriptLabel").attr("fill", at ? "sandybrown" : "gray").attr("opacity", at ? 1 : 0.5).attr("height", T).attr("transform", `translate(${rt(Z.fmin)},0)`).text(Bt).on("click", () => {
                ot(
                  Q,
                  Ct(Z),
                  lt
                );
              }).datum({ fmin: Z.fmin });
              let ut = Bt.length * 2;
              try {
                ut = st.node().getBBox().width;
              } catch {
              }
              Number(ut + rt(Z.fmin)) > f;
              const Ft = ut > rt(Z.fmax) - rt(Z.fmin) ? rt(Z.fmin) + ut : rt(Z.fmax);
              if (Tt[St]) {
                const q = Tt[St];
                q.push(`${rt(Z.fmin)}:${Ft}`), Tt[St] = q;
              } else
                Tt[St] = [
                  `${rt(Z.fmin)}:${Ft}`
                ];
              (Nt < 0 || Nt > Z.fmin) && (Nt = Z.fmin), ($t < 0 || $t < Z.fmax) && ($t = Z.fmax), Z.children && (Z.children = Z.children.sort((q, yt) => {
                const bt = gt[q.type], kt = gt[yt.type];
                return typeof bt == "number" && typeof kt == "number" ? bt - kt : typeof bt == "number" && typeof kt != "number" ? -1 : typeof bt != "number" && typeof kt == "number" ? 1 : q.type - yt.type;
              }), Z.children.forEach((q) => {
                const yt = q.type;
                let bt = !1;
                d.includes(yt) ? (bt = !0, ht.append("rect").attr("class", "exon").attr("x", rt(q.fmin)).attr(
                  "transform",
                  `translate(0,${E - y})`
                ).attr("height", E).attr("z-index", 10).attr("width", rt(q.fmax) - rt(q.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ct(Z),
                    lt
                  );
                }).datum({ fmin: q.fmin, fmax: q.fmax })) : m.includes(yt) ? (bt = !0, ht.append("rect").attr("class", "CDS").attr("x", rt(q.fmin)).attr(
                  "transform",
                  `translate(0,${k - y})`
                ).attr("z-index", 20).attr("height", k).attr("width", rt(q.fmax) - rt(q.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ct(Z),
                    lt
                  );
                }).datum({ fmin: q.fmin, fmax: q.fmax })) : u.includes(yt) && (bt = !0, ht.append("rect").attr("class", "UTR").attr("x", rt(q.fmin)).attr(
                  "transform",
                  `translate(0,${H - y})`
                ).attr("z-index", 20).attr("height", H).attr("width", rt(q.fmax) - rt(q.fmin)).on("click", () => {
                  ot(
                    Q,
                    Ct(Z),
                    lt
                  );
                }).datum({ fmin: q.fmin, fmax: q.fmax })), bt && a.forEach((kt) => {
                  const { type: g, fmax: B, fmin: C } = kt;
                  if (C < q.fmin && B > q.fmin || B > q.fmax && C < q.fmax || B <= q.fmax && C >= q.fmin) {
                    let v = !0;
                    const R = Ni(kt), h = Di(R)[0], M = $i(R), tt = Math.max(
                      Math.ceil(rt(B) - rt(C)),
                      $
                    );
                    if (g.toLowerCase() === "deletion" || g.toLowerCase() === "mnv" ? ht.append("rect").attr("class", "variant-deletion").attr("x", rt(C)).attr(
                      "transform",
                      `translate(0,${F - y})`
                    ).attr("z-index", 30).attr("fill", h).attr("height", z).attr("width", tt).on("click", () => {
                      ot(
                        Q,
                        M,
                        lt
                      );
                    }).datum({
                      fmin: C,
                      fmax: B,
                      alleles: s.get(kt) || []
                    }) : g.toLowerCase() === "snv" || g.toLowerCase() === "point_mutation" ? ht.append("polygon").attr("class", "variant-SNV").attr("points", V(rt(C))).attr("fill", h).attr("x", rt(C)).attr(
                      "transform",
                      `translate(0,${F - y})`
                    ).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        M,
                        lt
                      );
                    }).datum({
                      fmin: C,
                      fmax: B,
                      alleles: s.get(kt) || []
                    }) : g.toLowerCase() === "insertion" ? ht.append("polygon").attr("class", "variant-insertion").attr("points", W(rt(C))).attr("fill", h).attr("x", rt(C)).attr(
                      "transform",
                      `translate(0,${F - y})`
                    ).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        M,
                        lt
                      );
                    }).datum({
                      fmin: C,
                      fmax: B,
                      alleles: s.get(kt) || []
                    }) : g.toLowerCase() === "delins" || g.toLowerCase() === "substitution" || g.toLowerCase() === "indel" ? ht.append("polygon").attr("class", "variant-delins").attr("points", j(rt(C))).attr("x", rt(C)).attr(
                      "transform",
                      `translate(0,${F - y})`
                    ).attr("fill", h).attr("z-index", 30).on("click", () => {
                      ot(
                        Q,
                        M,
                        lt
                      );
                    }).datum({
                      fmin: C,
                      fmax: B,
                      alleles: s.get(kt) || []
                    }) : v = !1, v && c) {
                      const l = Qe(kt), D = l.length || 1;
                      ht.append("text").attr("class", "variantLabel").attr(
                        "fill",
                        at ? "sandybrown" : h
                      ).attr("opacity", at ? 1 : 0.5).attr("height", T).attr(
                        "transform",
                        `translate(${rt(C - D / 2 * 100)},${F * 2.2 - y})`
                      ).html(l).on("click", () => {
                        ot(
                          Q,
                          M,
                          lt
                        );
                      }).datum({ fmin: Z.fmin });
                    }
                  }
                });
              })), ft += 1;
            }
            ft === A && !_t && (++St, _t = !0, J.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${ft * b + 20 + dt})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", T).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    if (ft === 0 && J.append("text").attr("x", 30).attr("y", T + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), Array.from(s.entries()).filter(([it, vt]) => vt.length > 0).map(([it, vt]) => ({
      variantName: it.name,
      alleles: vt,
      type: it.type
    })), this.initialHighlight)
      try {
        Ki(this.initialHighlight, this.viewer);
      } catch {
      }
    return ft * b + dt;
  }
  filterVariantData(e, n) {
    if (n.length === 0)
      return e;
    const i = new Set(n);
    return e.filter((a, s) => {
      var f, c, u, m, d;
      let o = !1;
      try {
        if (i.has(a.name) && (o = !0), (f = a.allele_symbols) != null && f.values) {
          const x = a.allele_symbols.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(x) && (o = !0);
        }
        if ((c = a.symbol) != null && c.values) {
          const x = a.symbol.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(x) && (o = !0);
        }
        if ((u = a.symbol_text) != null && u.values) {
          const x = a.symbol_text.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(x) && (o = !0);
        }
        const _ = (d = (m = a.allele_ids) == null ? void 0 : m.values) == null ? void 0 : d[0];
        if (_) {
          let x = [];
          if (_.startsWith("[") && _.endsWith("]"))
            try {
              const L = JSON.parse(_);
              x = (Array.isArray(L) ? L : [L]).map(String);
            } catch {
              x = _.replace(/"|\\[|\\]| /g, "").split(",");
            }
          else
            x = _.replace(/"|\\[|\\]| /g, "").split(",");
          for (const L of x)
            if (i.has(L)) {
              o = !0;
              break;
            }
        }
      } catch {
        o = !0;
      }
      return o;
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
class Ou {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    htpVariant: a,
    trackData: s,
    region: o,
    genome: f
  }) {
    this.trackData = s ?? [], this.viewer = e, this.width = i, this.height = n, this.transcriptTypes = r, this.htpVariant = a, this.region = o, this.genome = f;
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
  DrawTrack() {
    var W;
    let e = this.trackData;
    const n = this.htpVariant, i = this.viewer, r = this.width, a = this.genome, s = (W = e[0]) == null ? void 0 : W.seqId, o = 10, f = ["UTR", "five_prime_UTR", "three_prime_UTR"], c = ["CDS"], u = ["exon"], m = this.transcriptTypes, d = 10, _ = 10, x = 40, L = 0, I = 10, A = 4, E = 20, k = 10, b = `0,0 0,${E} ${k},${k}`, S = this.renderTooltipDescription, $ = he().domain([this.region.start, this.region.end]).range([0, r]), T = {};
    for (let j = 0, V = f.length; j < V; j++)
      T[f[j]] = 200;
    for (let j = 0, V = c.length; j < V; j++)
      T[c[j]] = 1e3;
    for (let j = 0, V = u.length; j < V; j++)
      T[u[j]] = 100;
    e = e.sort((j, V) => j.selected && !V.selected ? -1 : !j.selected && V.selected ? 1 : j.name - V.name);
    const H = At("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), z = () => {
      H.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const j = i.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, V] = n.split(":");
      j.append("polygon").attr("class", "variant-SNV").attr("points", Ji($(+V))).attr("fill", "red").attr("x", $(+V)).attr("z-index", 30);
    }
    const F = ze(this.viewer), y = i.append("g").attr("transform", `translate(0,${F})`).attr("class", "track");
    let U = 0;
    const P = [];
    let K = -1, nt = -1;
    const ct = [];
    for (let j = 0; j < e.length && U < o; j++) {
      const V = e[j];
      let rt = V.children;
      if (rt) {
        const Rt = V.selected;
        rt = rt.sort((J, gt) => J.name < gt.name ? -1 : J.name > gt.name ? 1 : 0), rt.forEach((J) => {
          var Et, dt;
          const gt = J.type;
          if (!ct.includes(J.id) && (ct.push(J.id), m.includes(gt))) {
            let Q = Yi(
              P,
              $(J.fmin),
              $(J.fmax)
            );
            if (U < o) {
              const lt = y.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${U * x + 10})`
              ), ft = Math.max($(J.fmin), 0), Tt = Math.min($(J.fmax), this.width);
              lt.append("polygon").datum(() => ({
                strand: V.strand
              })).attr("class", "transArrow").attr("points", b).attr(
                "transform",
                () => V.strand > 0 ? `translate(${Tt},0)` : `translate(${ft},${E}) rotate(180)`
              ).on("click", () => {
                S(
                  H,
                  Ct(J),
                  z
                );
              }), lt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + L).attr("height", A).attr("transform", `translate(${ft},0)`).attr("width", Tt - ft).datum({
                fmin: J.fmin,
                fmax: J.fmax
              }).on("click", () => {
                S(
                  H,
                  Ct(J),
                  z
                );
              });
              let Nt = J.name;
              V.name !== J.name && (Nt += ` (${V.name})`);
              let $t = Math.max($(J.fmin), 0);
              const ot = lt.append("svg:text").attr("class", "transcriptLabel").attr("fill", Rt ? "sandybrown" : "gray").attr("opacity", Rt ? 1 : 0.5).attr("height", L).attr("transform", `translate(${$t},0)`).text(Nt).datum({
                fmin: J.fmin
              }).on("click", () => {
                S(
                  H,
                  Ct(J),
                  z
                );
              });
              let it = 100;
              try {
                it = ((Et = ot.node()) == null ? void 0 : Et.getBBox().width) ?? 0;
              } catch {
              }
              if (it + $t > this.width) {
                const at = it + $t - this.width;
                $t -= at, ot.attr("transform", `translate(${$t},0)`);
              }
              let vt = Nt.length * 2;
              try {
                vt = ((dt = ot.node()) == null ? void 0 : dt.getBBox().width) ?? 0;
              } catch (at) {
                console.error("Not yet rendered", at);
              }
              Number(vt + $(J.fmin)) > r;
              const It = vt > $(J.fmax) - $(J.fmin) ? $(J.fmin) + vt : $(J.fmax);
              if (P[Q]) {
                const at = P[Q];
                at.push(`${$(J.fmin)}:${It}`), P[Q] = at;
              } else
                P[Q] = [`${$(J.fmin)}:${It}`];
              (K < 0 || K > J.fmin) && (K = J.fmin), (nt < 0 || nt < J.fmax) && (nt = J.fmax), J.children && (J.children = J.children.sort(
                function(at, _t) {
                  const Z = T[at.type], xt = T[_t.type];
                  return typeof Z == "number" && typeof xt == "number" ? Z - xt : typeof Z == "number" && typeof xt != "number" ? -1 : typeof Z != "number" && typeof xt == "number" ? 1 : at.type.localeCompare(_t.type);
                }
              ), J.children.forEach((at) => {
                const _t = at.type;
                if ($(at.fmin) > this.width || $(at.fmax) < 0)
                  return;
                const Z = Math.max($(at.fmin), 0), xt = Math.min($(at.fmax), this.width);
                u.includes(_t) ? lt.append("rect").attr("class", "exon").attr("x", Z).attr(
                  "transform",
                  `translate(0,${d - A})`
                ).attr("height", d).attr("z-index", 10).attr("width", xt - Z).datum({
                  fmin: at.fmin,
                  fmax: at.fmax
                }).on("click", () => {
                  S(
                    H,
                    Ct(J),
                    z
                  );
                }) : c.includes(_t) ? lt.append("rect").attr("class", "CDS").attr("x", Z).attr(
                  "transform",
                  `translate(0,${_ - A})`
                ).attr("z-index", 20).attr("height", _).attr("width", xt - Z).datum({
                  fmin: at.fmin,
                  fmax: at.fmax
                }).on("click", () => {
                  S(
                    H,
                    Ct(J),
                    z
                  );
                }) : f.includes(_t) && lt.append("rect").attr("class", "UTR").attr("x", Z).attr(
                  "transform",
                  `translate(0,${I - A})`
                ).attr("z-index", 20).attr("height", I).attr("width", xt - Z).datum({
                  fmin: at.fmin,
                  fmax: at.fmax
                }).on("click", () => {
                  S(
                    H,
                    Ct(J),
                    z
                  );
                });
              })), U += 1;
            }
            if (U === o) {
              const lt = ks(
                a,
                s,
                this.region.start,
                this.region.end
              );
              ++Q, y.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${U * x + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", L).html(lt);
            }
          }
        });
      }
    }
    return U === 0 && y.append("text").attr("x", 30).attr("y", L + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), U * x;
  }
}
class Lu {
  constructor({ viewer: e, track: n, height: i, width: r }) {
    this.refSeq = "", this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, i = he().domain([this.track.start, this.track.end + 1]).range(this.track.range), r = No(i).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((f, c) => n[c]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), s = lr(i).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(r), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = Jt(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), Jt(".x-local-axis .tick text").each(function() {
      const c = At(this).text();
      let u = "nucleotide nt-a";
      c === "T" ? u = "nucleotide nt-t" : c === "C" ? u = "nucleotide nt-c" : c === "G" && (u = "nucleotide nt-g"), At(this.parentNode).append("rect").attr("class", u).attr("transform", "translate(-8,8)");
    });
  }
  DrawOverviewTrack() {
    const e = this.viewer, n = this.track.start, i = this.track.end, r = this.width, a = he().domain([n, i]).range(this.track.range), s = lr(a).ticks(8, "s").tickSize(8);
    e.append("g").attr("class", "axis track").attr("width", r).attr("height", 20).attr("transform", "translate(0,20)").call(s);
  }
  _getRefTick(e, n, i) {
    return i ? new Array(Math.ceil((n - e + 1) / 10)).fill(0).map((r, a) => e + a * 10) : new Array(n - e + 1).fill(0).map((r, a) => e + a);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTrackData() {
  }
}
const Pe = {
  ISOFORM_EMBEDDED_VARIANT: "ISOFORM_EMBEDDED_VARIANT",
  ISOFORM_AND_VARIANT: "ISOFORM_AND_VARIANT",
  ISOFORM: "ISOFORM",
  VARIANT: "VARIANT",
  VARIANT_GLOBAL: "VARIANT_GLOBAL"
};
var Xt = "$";
function Ln() {
}
Ln.prototype = Qi.prototype = {
  constructor: Ln,
  has: function(t) {
    return Xt + t in this;
  },
  get: function(t) {
    return this[Xt + t];
  },
  set: function(t, e) {
    return this[Xt + t] = e, this;
  },
  remove: function(t) {
    var e = Xt + t;
    return e in this && delete this[e];
  },
  clear: function() {
    for (var t in this) t[0] === Xt && delete this[t];
  },
  keys: function() {
    var t = [];
    for (var e in this) e[0] === Xt && t.push(e.slice(1));
    return t;
  },
  values: function() {
    var t = [];
    for (var e in this) e[0] === Xt && t.push(this[e]);
    return t;
  },
  entries: function() {
    var t = [];
    for (var e in this) e[0] === Xt && t.push({ key: e.slice(1), value: this[e] });
    return t;
  },
  size: function() {
    var t = 0;
    for (var e in this) e[0] === Xt && ++t;
    return t;
  },
  empty: function() {
    for (var t in this) if (t[0] === Xt) return !1;
    return !0;
  },
  each: function(t) {
    for (var e in this) e[0] === Xt && t(this[e], e.slice(1), this);
  }
};
function Qi(t, e) {
  var n = new Ln();
  if (t instanceof Ln) t.each(function(o, f) {
    n.set(f, o);
  });
  else if (Array.isArray(t)) {
    var i = -1, r = t.length, a;
    if (e == null) for (; ++i < r; ) n.set(i, t[i]);
    else for (; ++i < r; ) n.set(e(a = t[i], i, t), a);
  } else if (t) for (var s in t) n.set(s, t[s]);
  return n;
}
function Rr() {
}
var pe = Qi.prototype;
Rr.prototype = {
  constructor: Rr,
  has: pe.has,
  add: function(t) {
    return t += "", this[Xt + t] = t, this;
  },
  remove: pe.remove,
  clear: pe.clear,
  values: pe.keys,
  size: pe.size,
  empty: pe.empty,
  each: pe.each
};
var Mi = "http://www.w3.org/1999/xhtml";
const Mr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Mi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ts(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Mr.hasOwnProperty(e) ? { space: Mr[e], local: t } : t;
}
function Cu(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Mi && e.documentElement.namespaceURI === Mi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Fu(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Es(t) {
  var e = Ts(t);
  return (e.local ? Fu : Cu)(e);
}
function zu() {
}
function Ss(t) {
  return t == null ? zu : function() {
    return this.querySelector(t);
  };
}
function Bu(t) {
  typeof t != "function" && (t = Ss(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), f, c, u = 0; u < s; ++u)
      (f = a[u]) && (c = t.call(f, f.__data__, u, a)) && ("__data__" in f && (c.__data__ = f.__data__), o[u] = c);
  return new qt(i, this._parents);
}
function Hu() {
  return [];
}
function Pu(t) {
  return t == null ? Hu : function() {
    return this.querySelectorAll(t);
  };
}
function Vu(t) {
  typeof t != "function" && (t = Pu(t));
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, f, c = 0; c < o; ++c)
      (f = s[c]) && (i.push(t.call(f, f.__data__, c, s)), r.push(f));
  return new qt(i, r);
}
function Uu(t) {
  return function() {
    return this.matches(t);
  };
}
function Zu(t) {
  typeof t != "function" && (t = Uu(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], f, c = 0; c < s; ++c)
      (f = a[c]) && t.call(f, f.__data__, c, a) && o.push(f);
  return new qt(i, this._parents);
}
function As(t) {
  return new Array(t.length);
}
function qu() {
  return new qt(this._enter || this._groups.map(As), this._parents);
}
function Cn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Cn.prototype = {
  constructor: Cn,
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
function Gu(t) {
  return function() {
    return t;
  };
}
var Or = "$";
function Wu(t, e, n, i, r, a) {
  for (var s = 0, o, f = e.length, c = a.length; s < c; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Cn(t, a[s]);
  for (; s < f; ++s)
    (o = e[s]) && (r[s] = o);
}
function Xu(t, e, n, i, r, a, s) {
  var o, f, c = {}, u = e.length, m = a.length, d = new Array(u), _;
  for (o = 0; o < u; ++o)
    (f = e[o]) && (d[o] = _ = Or + s.call(f, f.__data__, o, e), _ in c ? r[o] = f : c[_] = f);
  for (o = 0; o < m; ++o)
    _ = Or + s.call(t, a[o], o, a), (f = c[_]) ? (i[o] = f, f.__data__ = a[o], c[_] = null) : n[o] = new Cn(t, a[o]);
  for (o = 0; o < u; ++o)
    (f = e[o]) && c[d[o]] === f && (r[o] = f);
}
function Yu(t, e) {
  if (!t)
    return _ = new Array(this.size()), c = -1, this.each(function($) {
      _[++c] = $;
    }), _;
  var n = e ? Xu : Wu, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Gu(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), f = new Array(a), c = 0; c < a; ++c) {
    var u = i[c], m = r[c], d = m.length, _ = t.call(u, u && u.__data__, c, i), x = _.length, L = o[c] = new Array(x), I = s[c] = new Array(x), A = f[c] = new Array(d);
    n(u, m, L, I, A, _, e);
    for (var E = 0, k = 0, b, S; E < x; ++E)
      if (b = L[E]) {
        for (E >= k && (k = E + 1); !(S = I[k]) && ++k < x; ) ;
        b._next = S || null;
      }
  }
  return s = new qt(s, i), s._enter = o, s._exit = f, s;
}
function Ku() {
  return new qt(this._exit || this._groups.map(As), this._parents);
}
function Ju(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return i = typeof t == "function" ? t(i) : i.append(t + ""), e != null && (r = e(r)), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function Qu(t) {
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var f = e[o], c = n[o], u = f.length, m = s[o] = new Array(u), d, _ = 0; _ < u; ++_)
      (d = f[_] || c[_]) && (m[_] = d);
  for (; o < i; ++o)
    s[o] = e[o];
  return new qt(s, this._parents);
}
function ju() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function th(t) {
  t || (t = eh);
  function e(m, d) {
    return m && d ? t(m.__data__, d.__data__) : !m - !d;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, f = r[a] = new Array(o), c, u = 0; u < o; ++u)
      (c = s[u]) && (f[u] = c);
    f.sort(e);
  }
  return new qt(r, this._parents).order();
}
function eh(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function nh() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ih() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function rh() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function ah() {
  var t = 0;
  return this.each(function() {
    ++t;
  }), t;
}
function sh() {
  return !this.node();
}
function oh(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, s = r.length, o; a < s; ++a)
      (o = r[a]) && t.call(o, o.__data__, a, r);
  return this;
}
function lh(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ch(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function fh(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function uh(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function hh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function dh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function ph(t, e) {
  var n = Ts(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? ch : lh : typeof e == "function" ? n.local ? dh : hh : n.local ? uh : fh)(n, e));
}
function $s(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function _h(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function gh(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function mh(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function vh(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? _h : typeof e == "function" ? mh : gh)(t, e, n ?? "")) : wh(this.node(), t);
}
function wh(t, e) {
  return t.style.getPropertyValue(e) || $s(t).getComputedStyle(t, null).getPropertyValue(e);
}
function yh(t) {
  return function() {
    delete this[t];
  };
}
function bh(t, e) {
  return function() {
    this[t] = e;
  };
}
function xh(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function kh(t, e) {
  return arguments.length > 1 ? this.each((e == null ? yh : typeof e == "function" ? xh : bh)(t, e)) : this.node()[t];
}
function Ns(t) {
  return t.trim().split(/^|\s+/);
}
function ji(t) {
  return t.classList || new Is(t);
}
function Is(t) {
  this._node = t, this._names = Ns(t.getAttribute("class") || "");
}
Is.prototype = {
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
function Ds(t, e) {
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Rs(t, e) {
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Th(t) {
  return function() {
    Ds(this, t);
  };
}
function Eh(t) {
  return function() {
    Rs(this, t);
  };
}
function Sh(t, e) {
  return function() {
    (e.apply(this, arguments) ? Ds : Rs)(this, t);
  };
}
function Ah(t, e) {
  var n = Ns(t + "");
  if (arguments.length < 2) {
    for (var i = ji(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Sh : e ? Th : Eh)(n, e));
}
function $h() {
  this.textContent = "";
}
function Nh(t) {
  return function() {
    this.textContent = t;
  };
}
function Ih(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Dh(t) {
  return arguments.length ? this.each(t == null ? $h : (typeof t == "function" ? Ih : Nh)(t)) : this.node().textContent;
}
function Rh() {
  this.innerHTML = "";
}
function Mh(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Oh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Lh(t) {
  return arguments.length ? this.each(t == null ? Rh : (typeof t == "function" ? Oh : Mh)(t)) : this.node().innerHTML;
}
function Ch() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Fh() {
  return this.each(Ch);
}
function zh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Bh() {
  return this.each(zh);
}
function Hh(t) {
  var e = typeof t == "function" ? t : Es(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Ph() {
  return null;
}
function Vh(t, e) {
  var n = typeof t == "function" ? t : Es(t), i = e == null ? Ph : typeof e == "function" ? e : Ss(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Uh() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Zh() {
  return this.each(Uh);
}
function qh() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Gh() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wh(t) {
  return this.select(t ? Gh : qh);
}
function Xh(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var Ms = {};
if (typeof document < "u") {
  var Yh = document.documentElement;
  "onmouseenter" in Yh || (Ms = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function Kh(t, e, n) {
  return t = Os(t, e, n), function(i) {
    var r = i.relatedTarget;
    (!r || r !== this && !(r.compareDocumentPosition(this) & 8)) && t.call(this, i);
  };
}
function Os(t, e, n) {
  return function(i) {
    try {
      t.call(this, this.__data__, e, n);
    } finally {
    }
  };
}
function Jh(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function Qh(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.capture) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function jh(t, e, n) {
  var i = Ms.hasOwnProperty(t.type) ? Kh : Os;
  return function(r, a, s) {
    var o = this.__on, f, c = i(e, a, s);
    if (o) {
      for (var u = 0, m = o.length; u < m; ++u)
        if ((f = o[u]).type === t.type && f.name === t.name) {
          this.removeEventListener(f.type, f.listener, f.capture), this.addEventListener(f.type, f.listener = c, f.capture = n), f.value = e;
          return;
        }
    }
    this.addEventListener(t.type, c, n), f = { type: t.type, name: t.name, value: e, listener: c, capture: n }, o ? o.push(f) : this.__on = [f];
  };
}
function td(t, e, n) {
  var i = Jh(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var f = 0, c = o.length, u; f < c; ++f)
        for (r = 0, u = o[f]; r < a; ++r)
          if ((s = i[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? jh : Qh, n == null && (n = !1), r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Ls(t, e, n) {
  var i = $s(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function ed(t, e) {
  return function() {
    return Ls(this, t, e);
  };
}
function nd(t, e) {
  return function() {
    return Ls(this, t, e.apply(this, arguments));
  };
}
function id(t, e) {
  return this.each((typeof e == "function" ? nd : ed)(t, e));
}
var Cs = [null];
function qt(t, e) {
  this._groups = t, this._parents = e;
}
function Oi() {
  return new qt([[document.documentElement]], Cs);
}
qt.prototype = Oi.prototype = {
  constructor: qt,
  select: Bu,
  selectAll: Vu,
  filter: Zu,
  data: Yu,
  enter: qu,
  exit: Ku,
  join: Ju,
  merge: Qu,
  order: ju,
  sort: th,
  call: nh,
  nodes: ih,
  node: rh,
  size: ah,
  empty: sh,
  each: oh,
  attr: ph,
  style: vh,
  property: kh,
  classed: Ah,
  text: Dh,
  html: Lh,
  raise: Fh,
  lower: Bh,
  append: Hh,
  insert: Vh,
  remove: Zh,
  clone: Wh,
  datum: Xh,
  on: td,
  dispatch: id
};
function Lr(t) {
  return typeof t == "string" ? new qt([[document.querySelector(t)]], [document.documentElement]) : new qt([[t]], Cs);
}
function rd() {
  var t = c, e = u, n = m, i = document.body, r = $(), a = null, s = null, o = null;
  function f(y) {
    a = T(y), a && (s = a.createSVGPoint(), i.appendChild(r));
  }
  f.show = function() {
    var y = Array.prototype.slice.call(arguments);
    y[y.length - 1] instanceof SVGElement && (o = y.pop());
    var U = n.apply(this, y), P = e.apply(this, y), K = t.apply(this, y), nt = H(), ct = _.length, W, j = document.documentElement.scrollTop || i.scrollTop, V = document.documentElement.scrollLeft || i.scrollLeft;
    for (nt.html(U).style("opacity", 1).style("pointer-events", "all"); ct--; ) nt.classed(_[ct], !1);
    return W = d.get(K).apply(this), nt.classed(K, !0).style("top", W.top + P[0] + j + "px").style("left", W.left + P[1] + V + "px"), f;
  }, f.hide = function() {
    var y = H();
    return y.style("opacity", 0).style("pointer-events", "none"), f;
  }, f.attr = function(y, U) {
    if (arguments.length < 2 && typeof y == "string")
      return H().attr(y);
    var P = Array.prototype.slice.call(arguments);
    return Oi.prototype.attr.apply(H(), P), f;
  }, f.style = function(y, U) {
    if (arguments.length < 2 && typeof y == "string")
      return H().style(y);
    var P = Array.prototype.slice.call(arguments);
    return Oi.prototype.style.apply(H(), P), f;
  }, f.direction = function(y) {
    return arguments.length ? (t = y == null ? y : F(y), f) : t;
  }, f.offset = function(y) {
    return arguments.length ? (e = y == null ? y : F(y), f) : e;
  }, f.html = function(y) {
    return arguments.length ? (n = y == null ? y : F(y), f) : n;
  }, f.rootElement = function(y) {
    return arguments.length ? (i = y == null ? y : F(y), f) : i;
  }, f.destroy = function() {
    return r && (H().remove(), r = null), f;
  };
  function c() {
    return "n";
  }
  function u() {
    return [0, 0];
  }
  function m() {
    return " ";
  }
  var d = Qi({
    n: x,
    s: L,
    e: I,
    w: A,
    nw: E,
    ne: k,
    sw: b,
    se: S
  }), _ = d.keys();
  function x() {
    var y = z(this);
    return {
      top: y.n.y - r.offsetHeight,
      left: y.n.x - r.offsetWidth / 2
    };
  }
  function L() {
    var y = z(this);
    return {
      top: y.s.y,
      left: y.s.x - r.offsetWidth / 2
    };
  }
  function I() {
    var y = z(this);
    return {
      top: y.e.y - r.offsetHeight / 2,
      left: y.e.x
    };
  }
  function A() {
    var y = z(this);
    return {
      top: y.w.y - r.offsetHeight / 2,
      left: y.w.x - r.offsetWidth
    };
  }
  function E() {
    var y = z(this);
    return {
      top: y.nw.y - r.offsetHeight,
      left: y.nw.x - r.offsetWidth
    };
  }
  function k() {
    var y = z(this);
    return {
      top: y.ne.y - r.offsetHeight,
      left: y.ne.x
    };
  }
  function b() {
    var y = z(this);
    return {
      top: y.sw.y,
      left: y.sw.x - r.offsetWidth
    };
  }
  function S() {
    var y = z(this);
    return {
      top: y.se.y,
      left: y.se.x
    };
  }
  function $() {
    var y = Lr(document.createElement("div"));
    return y.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), y.node();
  }
  function T(y) {
    var U = y.node();
    return U ? U.tagName.toLowerCase() === "svg" ? U : U.ownerSVGElement : null;
  }
  function H() {
    return r == null && (r = $(), i.appendChild(r)), Lr(r);
  }
  function z(y) {
    for (var U = o || y; U.getScreenCTM == null && U.parentNode != null; )
      U = U.parentNode;
    var P = {}, K = U.getScreenCTM(), nt = U.getBBox(), ct = nt.width, W = nt.height, j = nt.x, V = nt.y;
    return s.x = j, s.y = V, P.nw = s.matrixTransform(K), s.x += ct, P.ne = s.matrixTransform(K), s.y += W, P.se = s.matrixTransform(K), s.x -= ct, P.sw = s.matrixTransform(K), s.y -= W / 2, P.w = s.matrixTransform(K), s.x += ct, P.e = s.matrixTransform(K), s.x -= ct / 2, s.y -= W / 2, P.n = s.matrixTransform(K), s.y += W, P.s = s.matrixTransform(K), P;
  }
  function F(y) {
    return typeof y == "function" ? y : function() {
      return y;
    };
  }
  return f;
}
class ad {
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
    const e = this.viewer, n = this.variants, i = he().domain([this.region.start, this.region.end + 1]).range(this.range), r = _s().type(ps).size(20), a = rd();
    a.attr("class", "d3-tip").html(
      // @ts-expect-error
      (m) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${m.position}</td></tr><tr><td>Mutation</td> <td>${m.ref} > ${m.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(a);
    const s = 20, o = ze(this.viewer), f = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    f.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), f.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (m) => `translate(${i(m.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const u = At("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
    u.append("line").attr("x1", 75).attr("y1", 0).attr("x2", 75).attr("y2", s).attr("stroke-width", 3).attr("stroke", "#609C9C"), u.append("text").text(this.track.label.toUpperCase()).attr("y", 12);
  }
  /* Method to get reference label */
  async getTrackData() {
  }
}
class sd {
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
    const e = this.viewer, n = this.variants, i = he().domain([this.region.start, this.region.end]).range(this.track.range), r = _s().type(ps).size(20), a = 20, s = ze(this.viewer), o = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
    o.append("rect").attr("height", a).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), o.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (f) => `translate(${i(f.position)},10)`);
  }
  async getTrackData() {
  }
}
function tr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Kn, Cr;
function od() {
  if (Cr) return Kn;
  Cr = 1;
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
  return Kn = t, Kn;
}
var ld = od();
const Un = /* @__PURE__ */ tr(ld);
class cd {
}
class fd {
  constructor() {
    this.signals = /* @__PURE__ */ new Set(), this.abortController = new AbortController();
  }
  /**
   * @param {AbortSignal} [signal] optional AbortSignal to add. if falsy,
   *  will be treated as a null-signal, and this abortcontroller will no
   *  longer be abortable.
   */
  //@ts-ignore
  addSignal(e = new cd()) {
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
class ud {
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
class Te {
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
    const a = new fd(), s = new ud();
    s.addCallback(r);
    const o = {
      aborter: a,
      promise: this.fillCallback(n, a.signal, (f) => {
        s.callback(f);
      }),
      settled: !1,
      statusReporter: s,
      get aborted() {
        return this.aborter.signal.aborted;
      }
    };
    o.aborter.addSignal(i), o.aborter.signal.addEventListener("abort", () => {
      o.settled || this.evict(e, o);
    }), o.promise.then(() => {
      o.settled = !0;
    }, () => {
      o.settled = !0, this.evict(e, o);
    }).catch((f) => {
      throw console.error(f), f;
    }), this.cache.set(e, o);
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
    return a ? a.aborted && !a.settled ? (this.evict(e, a), this.get(e, n, i, r)) : a.settled ? a.promise : (a.aborter.addSignal(i), a.statusReporter.addCallback(r), Te.checkSinglePromise(a.promise, i)) : (this.fill(e, n, i, r), Te.checkSinglePromise(
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
var Tn = { exports: {} }, hd = Tn.exports, Fr;
function dd() {
  return Fr || (Fr = 1, function(t, e) {
    (function(n, i) {
      t.exports = i();
    })(hd, function() {
      const n = /^[\w+.-]+:\/\//, i = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, r = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      function a(E) {
        return n.test(E);
      }
      function s(E) {
        return E.startsWith("//");
      }
      function o(E) {
        return E.startsWith("/");
      }
      function f(E) {
        return E.startsWith("file:");
      }
      function c(E) {
        return /^[.?#]/.test(E);
      }
      function u(E) {
        const k = i.exec(E);
        return d(k[1], k[2] || "", k[3], k[4] || "", k[5] || "/", k[6] || "", k[7] || "");
      }
      function m(E) {
        const k = r.exec(E), b = k[2];
        return d("file:", "", k[1] || "", "", o(b) ? b : "/" + b, k[3] || "", k[4] || "");
      }
      function d(E, k, b, S, $, T, H) {
        return {
          scheme: E,
          user: k,
          host: b,
          port: S,
          path: $,
          query: T,
          hash: H,
          type: 7
        };
      }
      function _(E) {
        if (s(E)) {
          const b = u("http:" + E);
          return b.scheme = "", b.type = 6, b;
        }
        if (o(E)) {
          const b = u("http://foo.com" + E);
          return b.scheme = "", b.host = "", b.type = 5, b;
        }
        if (f(E))
          return m(E);
        if (a(E))
          return u(E);
        const k = u("http://foo.com/" + E);
        return k.scheme = "", k.host = "", k.type = E ? E.startsWith("?") ? 3 : E.startsWith("#") ? 2 : 4 : 1, k;
      }
      function x(E) {
        if (E.endsWith("/.."))
          return E;
        const k = E.lastIndexOf("/");
        return E.slice(0, k + 1);
      }
      function L(E, k) {
        I(k, k.type), E.path === "/" ? E.path = k.path : E.path = x(k.path) + E.path;
      }
      function I(E, k) {
        const b = k <= 4, S = E.path.split("/");
        let $ = 1, T = 0, H = !1;
        for (let F = 1; F < S.length; F++) {
          const y = S[F];
          if (!y) {
            H = !0;
            continue;
          }
          if (H = !1, y !== ".") {
            if (y === "..") {
              T ? (H = !0, T--, $--) : b && (S[$++] = y);
              continue;
            }
            S[$++] = y, T++;
          }
        }
        let z = "";
        for (let F = 1; F < $; F++)
          z += "/" + S[F];
        (!z || H && !z.endsWith("/..")) && (z += "/"), E.path = z;
      }
      function A(E, k) {
        if (!E && !k)
          return "";
        const b = _(E);
        let S = b.type;
        if (k && S !== 7) {
          const T = _(k), H = T.type;
          switch (S) {
            case 1:
              b.hash = T.hash;
            // fall through
            case 2:
              b.query = T.query;
            // fall through
            case 3:
            case 4:
              L(b, T);
            // fall through
            case 5:
              b.user = T.user, b.host = T.host, b.port = T.port;
            // fall through
            case 6:
              b.scheme = T.scheme;
          }
          H > S && (S = H);
        }
        I(b, S);
        const $ = b.query + b.hash;
        switch (S) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return $;
          case 4: {
            const T = b.path.slice(1);
            return T ? c(k || E) && !c(T) ? "./" + T + $ : T + $ : $ || ".";
          }
          case 5:
            return b.path + $;
          default:
            return b.scheme + "//" + b.user + b.host + b.port + b.path + $;
        }
      }
      return A;
    });
  }(Tn)), Tn.exports;
}
var pd = dd();
const _d = /* @__PURE__ */ tr(pd);
async function er(t, e, n = {}) {
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
function nr(t, e = ".") {
  return _d(t, e);
}
class gd {
  constructor({ readFile: e, cacheSize: n = 100 }) {
    if (this.topList = [], this.chunkCache = new Te({
      cache: new Un({ maxSize: n }),
      fill: this.readChunkItems.bind(this)
    }), this.readFile = e, !this.readFile)
      throw new Error('must provide a "readFile" function');
  }
  importExisting(e, n, i, r, a) {
    this.topList = e, this.attrs = n, this.start = n.makeFastGetter("Start"), this.end = n.makeFastGetter("End"), this.lazyClass = a, this.baseURL = i, this.lazyUrlTemplate = r;
  }
  binarySearch(e, n, i) {
    let r = -1, a = e.length, s;
    for (; a - r > 1; )
      s = r + a >>> 1, i(e[s]) >= n ? a = s : r = s;
    return i === this.end ? a : r;
  }
  readChunkItems(e) {
    const n = nr(this.lazyUrlTemplate.replaceAll(/\{Chunk\}/gi, e), this.baseURL);
    return er(n, this.readFile, { defaultContent: [] });
  }
  async *iterateSublist(e, n, i, r, a, s, o) {
    const f = this.attrs.makeGetter("Chunk"), c = this.attrs.makeGetter("Sublist"), u = [];
    for (let m = this.binarySearch(e, n, a); m < e.length && m >= 0 && r * s(e[m]) < r * i; m += r) {
      if (e[m][0] === this.lazyClass) {
        const _ = f(e[m]), x = this.chunkCache.get(_, _).then((L) => [L, _]);
        u.push(x);
      } else
        yield [e[m], o.concat(m)];
      const d = c(e[m]);
      d && (yield* this.iterateSublist(d, n, i, r, a, s, o.concat(m)));
    }
    for (const m of u) {
      const [d, _] = await m;
      d && (yield* this.iterateSublist(d, n, i, r, a, s, [
        ...o,
        _
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
    for await (const s of this.iterate(e, n)) {
      const o = Math.max(0, (this.start(s) - e) / a | 0), f = Math.min(i, (this.end(s) - e) / a | 0);
      for (let c = o; c <= f; c += 1)
        r[c] += 1;
    }
    return r;
  }
}
class md {
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
        const s = this.set.field_accessors[r];
        if (s)
          return s.call(this, a);
      },
      tags() {
        return i[this[0]] || [];
      }
    };
    n.get.field_accessors = {}, n.set.field_accessors = {}, this.classes.forEach((r, a) => {
      (r.attributes || []).forEach((s, o) => {
        e[s] = e[s] || [], e[s][a] = o + 1, s = s.toLowerCase(), e[s] = e[s] || [], e[s][a] = o + 1;
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
class vd {
  constructor({ urlTemplate: e, chunkSize: n, length: i, cacheSize: r = 100, readFile: a }, s) {
    if (this.urlTemplate = e, this.chunkSize = n, this.length = i, this.baseUrl = s === void 0 ? "" : s, this.readFile = a, !a)
      throw new Error("must provide readFile callback");
    this.chunkCache = new Te({
      cache: new Un({ maxSize: r }),
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
    for (let s = i; s <= r; s += 1)
      a.push(this.chunkCache.get(s, s));
    for (const s of a) {
      const [o, f] = await s;
      yield* this.filterChunkData(e, n, o, f);
    }
  }
  async getChunk(e) {
    let n = this.urlTemplate.replaceAll(/\{Chunk\}/gi, e);
    this.baseUrl && (n = nr(n, this.baseUrl));
    const i = await er(n, this.readFile);
    return [e, i];
  }
  *filterChunkData(e, n, i, r) {
    const a = i * this.chunkSize, s = Math.max(0, e - a), o = Math.min(n - a, this.chunkSize - 1);
    for (let f = s; f <= o; f += 1)
      yield [f + a, r[f]];
  }
}
function wd() {
  return this._uniqueID;
}
function yd() {
  return this._parent;
}
function bd() {
  return this.get("subfeatures");
}
class xd {
  constructor({ baseUrl: e, urlTemplate: n, readFile: i, cacheSize: r = 10 }) {
    if (this.baseUrl = e, this.urlTemplates = { root: n }, this.readFile = i, !this.readFile)
      throw new Error('must provide a "readFile" function argument');
    this.dataRootCache = new Te({
      cache: new Un({ maxSize: r }),
      fill: this.fetchDataRoot.bind(this)
    });
  }
  makeNCList() {
    return new gd({ readFile: this.readFile });
  }
  loadNCList(e, n, i) {
    e.nclist.importExisting(n.intervals.nclist, e.attrs, i, n.intervals.urlTemplate, n.intervals.lazyClass);
  }
  getDataRoot(e) {
    return this.dataRootCache.get(e, e);
  }
  fetchDataRoot(e) {
    const n = nr(this.urlTemplates.root.replaceAll(/{\s*refseq\s*}/g, e), this.baseUrl);
    return er(n, this.readFile).then((i) => (
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
    e.intervals && (i.attrs = new md(e.intervals.classes), this.loadNCList(i, e, n));
    const { histograms: r } = e;
    if (r != null && r.meta) {
      for (let a = 0; a < r.meta.length; a += 1)
        r.meta[a].lazyArray = new vd({ ...r.meta[a].arrayParams, readFile: this.readFile }, n);
      i._histograms = r;
    }
    return i._histograms && Object.keys(i._histograms).forEach((a) => {
      i._histograms[a].forEach((o) => {
        Object.keys(o).forEach((f) => {
          typeof o[f] == "string" && String(Number(o[f])) === o[f] && (o[f] = Number(o[f]));
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
    const s = await this.getDataRoot(e);
    if (r)
      a = (i - n) / r;
    else if (a)
      r = Math.ceil((i - n) / a);
    else
      throw new TypeError("numBins or basesPerBin arg required for getRegionFeatureDensities");
    const f = (s._histograms.stats || []).find((d) => d.basesPerBin >= a);
    let c = s._histograms.meta[0];
    for (let d = 0; d < s._histograms.meta.length; d += 1)
      a >= s._histograms.meta[d].basesPerBin && (c = s._histograms.meta[d]);
    let u = a / c.basesPerBin;
    if (u > 0.9 && Math.abs(u - Math.round(u)) < 1e-4) {
      const d = Math.floor(n / c.basesPerBin);
      u = Math.round(u);
      const _ = [];
      for (let x = 0; x < r; x += 1)
        _[x] = 0;
      for await (const [x, L] of c.lazyArray.range(d, d + u * r - 1))
        _[Math.floor((x - d) / u)] += L;
      return { bins: _, stats: f };
    }
    return { bins: await s.nclist.histogram(n, i, r), stats: f };
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
    var s;
    const r = await this.getDataRoot(e), a = (s = r.attrs) == null ? void 0 : s.accessors();
    for await (const [o, f] of r.nclist.iterate(n, i)) {
      if (!o.decorated) {
        const c = f.join(",");
        this.decorateFeature(a, o, `${e},${c}`);
      }
      yield o;
    }
  }
  // helper method to recursively add .get and .tags methods to a feature and its
  // subfeatures
  decorateFeature(e, n, i, r) {
    n.get = e.get, n.tags = e.tags, n._uniqueID = i, n.id = wd, n._parent = r, n.parent = yd, n.children = bd, (n.get("subfeatures") || []).forEach((a, s) => {
      this.decorateFeature(e, a, `${i}-${s}`, n);
    }), n.decorated = !0;
  }
}
function Be(t) {
  let e = t.length;
  for (; --e >= 0; )
    t[e] = 0;
}
const kd = 3, Td = 258, Fs = 29, Ed = 256, Sd = Ed + 1 + Fs, zs = 30, Ad = 512, $d = new Array((Sd + 2) * 2);
Be($d);
const Nd = new Array(zs * 2);
Be(Nd);
const Id = new Array(Ad);
Be(Id);
const Dd = new Array(Td - kd + 1);
Be(Dd);
const Rd = new Array(Fs);
Be(Rd);
const Md = new Array(zs);
Be(Md);
const Od = (t, e, n, i) => {
  let r = t & 65535 | 0, a = t >>> 16 & 65535 | 0, s = 0;
  for (; n !== 0; ) {
    s = n > 2e3 ? 2e3 : n, n -= s;
    do
      r = r + e[i++] | 0, a = a + r | 0;
    while (--s);
    r %= 65521, a %= 65521;
  }
  return r | a << 16 | 0;
};
var Li = Od;
const Ld = () => {
  let t, e = [];
  for (var n = 0; n < 256; n++) {
    t = n;
    for (var i = 0; i < 8; i++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    e[n] = t;
  }
  return e;
}, Cd = new Uint32Array(Ld()), Fd = (t, e, n, i) => {
  const r = Cd, a = i + n;
  t ^= -1;
  for (let s = i; s < a; s++)
    t = t >>> 8 ^ r[(t ^ e[s]) & 255];
  return t ^ -1;
};
var ne = Fd, Ci = {
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
}, Bs = {
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
const zd = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
var Bd = function(t) {
  const e = Array.prototype.slice.call(arguments, 1);
  for (; e.length; ) {
    const n = e.shift();
    if (n) {
      if (typeof n != "object")
        throw new TypeError(n + "must be non-object");
      for (const i in n)
        zd(n, i) && (t[i] = n[i]);
    }
  }
  return t;
}, Hd = (t) => {
  let e = 0;
  for (let i = 0, r = t.length; i < r; i++)
    e += t[i].length;
  const n = new Uint8Array(e);
  for (let i = 0, r = 0, a = t.length; i < a; i++) {
    let s = t[i];
    n.set(s, r), r += s.length;
  }
  return n;
}, Hs = {
  assign: Bd,
  flattenChunks: Hd
};
let Ps = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Ps = !1;
}
const je = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  je[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
je[254] = je[254] = 1;
var Pd = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let e, n, i, r, a, s = t.length, o = 0;
  for (r = 0; r < s; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < s && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), o += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (e = new Uint8Array(o), a = 0, r = 0; a < o; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < s && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), n < 128 ? e[a++] = n : n < 2048 ? (e[a++] = 192 | n >>> 6, e[a++] = 128 | n & 63) : n < 65536 ? (e[a++] = 224 | n >>> 12, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63) : (e[a++] = 240 | n >>> 18, e[a++] = 128 | n >>> 12 & 63, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63);
  return e;
};
const Vd = (t, e) => {
  if (e < 65534 && t.subarray && Ps)
    return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
  let n = "";
  for (let i = 0; i < e; i++)
    n += String.fromCharCode(t[i]);
  return n;
};
var Ud = (t, e) => {
  const n = e || t.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
    return new TextDecoder().decode(t.subarray(0, e));
  let i, r;
  const a = new Array(n * 2);
  for (r = 0, i = 0; i < n; ) {
    let s = t[i++];
    if (s < 128) {
      a[r++] = s;
      continue;
    }
    let o = je[s];
    if (o > 4) {
      a[r++] = 65533, i += o - 1;
      continue;
    }
    for (s &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && i < n; )
      s = s << 6 | t[i++] & 63, o--;
    if (o > 1) {
      a[r++] = 65533;
      continue;
    }
    s < 65536 ? a[r++] = s : (s -= 65536, a[r++] = 55296 | s >> 10 & 1023, a[r++] = 56320 | s & 1023);
  }
  return Vd(a, r);
}, Zd = (t, e) => {
  e = e || t.length, e > t.length && (e = t.length);
  let n = e - 1;
  for (; n >= 0 && (t[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? e : n + je[t[n]] > e ? n : e;
}, Fi = {
  string2buf: Pd,
  buf2string: Ud,
  utf8border: Zd
};
function qd() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var Gd = qd;
const hn = 16209, Wd = 16191;
var Xd = function(e, n) {
  let i, r, a, s, o, f, c, u, m, d, _, x, L, I, A, E, k, b, S, $, T, H, z, F;
  const y = e.state;
  i = e.next_in, z = e.input, r = i + (e.avail_in - 5), a = e.next_out, F = e.output, s = a - (n - e.avail_out), o = a + (e.avail_out - 257), f = y.dmax, c = y.wsize, u = y.whave, m = y.wnext, d = y.window, _ = y.hold, x = y.bits, L = y.lencode, I = y.distcode, A = (1 << y.lenbits) - 1, E = (1 << y.distbits) - 1;
  t:
    do {
      x < 15 && (_ += z[i++] << x, x += 8, _ += z[i++] << x, x += 8), k = L[_ & A];
      e:
        for (; ; ) {
          if (b = k >>> 24, _ >>>= b, x -= b, b = k >>> 16 & 255, b === 0)
            F[a++] = k & 65535;
          else if (b & 16) {
            S = k & 65535, b &= 15, b && (x < b && (_ += z[i++] << x, x += 8), S += _ & (1 << b) - 1, _ >>>= b, x -= b), x < 15 && (_ += z[i++] << x, x += 8, _ += z[i++] << x, x += 8), k = I[_ & E];
            n:
              for (; ; ) {
                if (b = k >>> 24, _ >>>= b, x -= b, b = k >>> 16 & 255, b & 16) {
                  if ($ = k & 65535, b &= 15, x < b && (_ += z[i++] << x, x += 8, x < b && (_ += z[i++] << x, x += 8)), $ += _ & (1 << b) - 1, $ > f) {
                    e.msg = "invalid distance too far back", y.mode = hn;
                    break t;
                  }
                  if (_ >>>= b, x -= b, b = a - s, $ > b) {
                    if (b = $ - b, b > u && y.sane) {
                      e.msg = "invalid distance too far back", y.mode = hn;
                      break t;
                    }
                    if (T = 0, H = d, m === 0) {
                      if (T += c - b, b < S) {
                        S -= b;
                        do
                          F[a++] = d[T++];
                        while (--b);
                        T = a - $, H = F;
                      }
                    } else if (m < b) {
                      if (T += c + m - b, b -= m, b < S) {
                        S -= b;
                        do
                          F[a++] = d[T++];
                        while (--b);
                        if (T = 0, m < S) {
                          b = m, S -= b;
                          do
                            F[a++] = d[T++];
                          while (--b);
                          T = a - $, H = F;
                        }
                      }
                    } else if (T += m - b, b < S) {
                      S -= b;
                      do
                        F[a++] = d[T++];
                      while (--b);
                      T = a - $, H = F;
                    }
                    for (; S > 2; )
                      F[a++] = H[T++], F[a++] = H[T++], F[a++] = H[T++], S -= 3;
                    S && (F[a++] = H[T++], S > 1 && (F[a++] = H[T++]));
                  } else {
                    T = a - $;
                    do
                      F[a++] = F[T++], F[a++] = F[T++], F[a++] = F[T++], S -= 3;
                    while (S > 2);
                    S && (F[a++] = F[T++], S > 1 && (F[a++] = F[T++]));
                  }
                } else if ((b & 64) === 0) {
                  k = I[(k & 65535) + (_ & (1 << b) - 1)];
                  continue n;
                } else {
                  e.msg = "invalid distance code", y.mode = hn;
                  break t;
                }
                break;
              }
          } else if ((b & 64) === 0) {
            k = L[(k & 65535) + (_ & (1 << b) - 1)];
            continue e;
          } else if (b & 32) {
            y.mode = Wd;
            break t;
          } else {
            e.msg = "invalid literal/length code", y.mode = hn;
            break t;
          }
          break;
        }
    } while (i < r && a < o);
  S = x >> 3, i -= S, x -= S << 3, _ &= (1 << x) - 1, e.next_in = i, e.next_out = a, e.avail_in = i < r ? 5 + (r - i) : 5 - (i - r), e.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), y.hold = _, y.bits = x;
};
const $e = 15, zr = 852, Br = 592, Hr = 0, Jn = 1, Pr = 2, Yd = new Uint16Array([
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
]), Kd = new Uint8Array([
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
]), Jd = new Uint16Array([
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
]), Qd = new Uint8Array([
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
]), jd = (t, e, n, i, r, a, s, o) => {
  const f = o.bits;
  let c = 0, u = 0, m = 0, d = 0, _ = 0, x = 0, L = 0, I = 0, A = 0, E = 0, k, b, S, $, T, H = null, z;
  const F = new Uint16Array($e + 1), y = new Uint16Array($e + 1);
  let U = null, P, K, nt;
  for (c = 0; c <= $e; c++)
    F[c] = 0;
  for (u = 0; u < i; u++)
    F[e[n + u]]++;
  for (_ = f, d = $e; d >= 1 && F[d] === 0; d--)
    ;
  if (_ > d && (_ = d), d === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (m = 1; m < d && F[m] === 0; m++)
    ;
  for (_ < m && (_ = m), I = 1, c = 1; c <= $e; c++)
    if (I <<= 1, I -= F[c], I < 0)
      return -1;
  if (I > 0 && (t === Hr || d !== 1))
    return -1;
  for (y[1] = 0, c = 1; c < $e; c++)
    y[c + 1] = y[c] + F[c];
  for (u = 0; u < i; u++)
    e[n + u] !== 0 && (s[y[e[n + u]]++] = u);
  if (t === Hr ? (H = U = s, z = 20) : t === Jn ? (H = Yd, U = Kd, z = 257) : (H = Jd, U = Qd, z = 0), E = 0, u = 0, c = m, T = a, x = _, L = 0, S = -1, A = 1 << _, $ = A - 1, t === Jn && A > zr || t === Pr && A > Br)
    return 1;
  for (; ; ) {
    P = c - L, s[u] + 1 < z ? (K = 0, nt = s[u]) : s[u] >= z ? (K = U[s[u] - z], nt = H[s[u] - z]) : (K = 96, nt = 0), k = 1 << c - L, b = 1 << x, m = b;
    do
      b -= k, r[T + (E >> L) + b] = P << 24 | K << 16 | nt | 0;
    while (b !== 0);
    for (k = 1 << c - 1; E & k; )
      k >>= 1;
    if (k !== 0 ? (E &= k - 1, E += k) : E = 0, u++, --F[c] === 0) {
      if (c === d)
        break;
      c = e[n + s[u]];
    }
    if (c > _ && (E & $) !== S) {
      for (L === 0 && (L = _), T += m, x = c - L, I = 1 << x; x + L < d && (I -= F[x + L], !(I <= 0)); )
        x++, I <<= 1;
      if (A += 1 << x, t === Jn && A > zr || t === Pr && A > Br)
        return 1;
      S = E & $, r[S] = _ << 24 | x << 16 | T - a | 0;
    }
  }
  return E !== 0 && (r[T + E] = c - L << 24 | 64 << 16 | 0), o.bits = _, 0;
};
var Xe = jd;
const t0 = 0, Vs = 1, Us = 2, {
  Z_FINISH: Vr,
  Z_BLOCK: e0,
  Z_TREES: dn,
  Z_OK: Ee,
  Z_STREAM_END: n0,
  Z_NEED_DICT: i0,
  Z_STREAM_ERROR: Yt,
  Z_DATA_ERROR: Zs,
  Z_MEM_ERROR: qs,
  Z_BUF_ERROR: r0,
  Z_DEFLATED: Ur
} = Bs, Zn = 16180, Zr = 16181, qr = 16182, Gr = 16183, Wr = 16184, Xr = 16185, Yr = 16186, Kr = 16187, Jr = 16188, Qr = 16189, Fn = 16190, le = 16191, Qn = 16192, jr = 16193, jn = 16194, ta = 16195, ea = 16196, na = 16197, ia = 16198, pn = 16199, _n = 16200, ra = 16201, aa = 16202, sa = 16203, oa = 16204, la = 16205, ti = 16206, ca = 16207, fa = 16208, Dt = 16209, Gs = 16210, Ws = 16211, a0 = 852, s0 = 592, o0 = 15, l0 = o0, ua = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function c0() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Ae = (t) => {
  if (!t)
    return 1;
  const e = t.state;
  return !e || e.strm !== t || e.mode < Zn || e.mode > Ws ? 1 : 0;
}, Xs = (t) => {
  if (Ae(t))
    return Yt;
  const e = t.state;
  return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = e.wrap & 1), e.mode = Zn, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(a0), e.distcode = e.distdyn = new Int32Array(s0), e.sane = 1, e.back = -1, Ee;
}, Ys = (t) => {
  if (Ae(t))
    return Yt;
  const e = t.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, Xs(t);
}, Ks = (t, e) => {
  let n;
  if (Ae(t))
    return Yt;
  const i = t.state;
  return e < 0 ? (n = 0, e = -e) : (n = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Yt : (i.window !== null && i.wbits !== e && (i.window = null), i.wrap = n, i.wbits = e, Ys(t));
}, Js = (t, e) => {
  if (!t)
    return Yt;
  const n = new c0();
  t.state = n, n.strm = t, n.window = null, n.mode = Zn;
  const i = Ks(t, e);
  return i !== Ee && (t.state = null), i;
}, f0 = (t) => Js(t, l0);
let ha = !0, ei, ni;
const u0 = (t) => {
  if (ha) {
    ei = new Int32Array(512), ni = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      t.lens[e++] = 8;
    for (; e < 256; )
      t.lens[e++] = 9;
    for (; e < 280; )
      t.lens[e++] = 7;
    for (; e < 288; )
      t.lens[e++] = 8;
    for (Xe(Vs, t.lens, 0, 288, ei, 0, t.work, { bits: 9 }), e = 0; e < 32; )
      t.lens[e++] = 5;
    Xe(Us, t.lens, 0, 32, ni, 0, t.work, { bits: 5 }), ha = !1;
  }
  t.lencode = ei, t.lenbits = 9, t.distcode = ni, t.distbits = 5;
}, Qs = (t, e, n, i) => {
  let r;
  const a = t.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), i >= a.wsize ? (a.window.set(e.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (r = a.wsize - a.wnext, r > i && (r = i), a.window.set(e.subarray(n - i, n - i + r), a.wnext), i -= r, i ? (a.window.set(e.subarray(n - i, n), 0), a.wnext = i, a.whave = a.wsize) : (a.wnext += r, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))), 0;
}, h0 = (t, e) => {
  let n, i, r, a, s, o, f, c, u, m, d, _, x, L, I = 0, A, E, k, b, S, $, T, H;
  const z = new Uint8Array(4);
  let F, y;
  const U = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Ae(t) || !t.output || !t.input && t.avail_in !== 0)
    return Yt;
  n = t.state, n.mode === le && (n.mode = Qn), s = t.next_out, r = t.output, f = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, c = n.hold, u = n.bits, m = o, d = f, H = Ee;
  t:
    for (; ; )
      switch (n.mode) {
        case Zn:
          if (n.wrap === 0) {
            n.mode = Qn;
            break;
          }
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if (n.wrap & 2 && c === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, z[0] = c & 255, z[1] = c >>> 8 & 255, n.check = ne(n.check, z, 2, 0), c = 0, u = 0, n.mode = Zr;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((c & 255) << 8) + (c >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = Dt;
            break;
          }
          if ((c & 15) !== Ur) {
            t.msg = "unknown compression method", n.mode = Dt;
            break;
          }
          if (c >>>= 4, u -= 4, T = (c & 15) + 8, n.wbits === 0 && (n.wbits = T), T > 15 || T > n.wbits) {
            t.msg = "invalid window size", n.mode = Dt;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = c & 512 ? Qr : le, c = 0, u = 0;
          break;
        case Zr:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if (n.flags = c, (n.flags & 255) !== Ur) {
            t.msg = "unknown compression method", n.mode = Dt;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = Dt;
            break;
          }
          n.head && (n.head.text = c >> 8 & 1), n.flags & 512 && n.wrap & 4 && (z[0] = c & 255, z[1] = c >>> 8 & 255, n.check = ne(n.check, z, 2, 0)), c = 0, u = 0, n.mode = qr;
        /* falls through */
        case qr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          n.head && (n.head.time = c), n.flags & 512 && n.wrap & 4 && (z[0] = c & 255, z[1] = c >>> 8 & 255, z[2] = c >>> 16 & 255, z[3] = c >>> 24 & 255, n.check = ne(n.check, z, 4, 0)), c = 0, u = 0, n.mode = Gr;
        /* falls through */
        case Gr:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          n.head && (n.head.xflags = c & 255, n.head.os = c >> 8), n.flags & 512 && n.wrap & 4 && (z[0] = c & 255, z[1] = c >>> 8 & 255, n.check = ne(n.check, z, 2, 0)), c = 0, u = 0, n.mode = Wr;
        /* falls through */
        case Wr:
          if (n.flags & 1024) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            n.length = c, n.head && (n.head.extra_len = c), n.flags & 512 && n.wrap & 4 && (z[0] = c & 255, z[1] = c >>> 8 & 255, n.check = ne(n.check, z, 2, 0)), c = 0, u = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Xr;
        /* falls through */
        case Xr:
          if (n.flags & 1024 && (_ = n.length, _ > o && (_ = o), _ && (n.head && (T = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            i.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + _
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            T
          )), n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, _, a)), o -= _, a += _, n.length -= _), n.length))
            break t;
          n.length = 0, n.mode = Yr;
        /* falls through */
        case Yr:
          if (n.flags & 2048) {
            if (o === 0)
              break t;
            _ = 0;
            do
              T = i[a + _++], n.head && T && n.length < 65536 && (n.head.name += String.fromCharCode(T));
            while (T && _ < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, _, a)), o -= _, a += _, T)
              break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Kr;
        /* falls through */
        case Kr:
          if (n.flags & 4096) {
            if (o === 0)
              break t;
            _ = 0;
            do
              T = i[a + _++], n.head && T && n.length < 65536 && (n.head.comment += String.fromCharCode(T));
            while (T && _ < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, _, a)), o -= _, a += _, T)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = Jr;
        /* falls through */
        case Jr:
          if (n.flags & 512) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && c !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = Dt;
              break;
            }
            c = 0, u = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = le;
          break;
        case Qr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          t.adler = n.check = ua(c), c = 0, u = 0, n.mode = Fn;
        /* falls through */
        case Fn:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = f, t.next_in = a, t.avail_in = o, n.hold = c, n.bits = u, i0;
          t.adler = n.check = 1, n.mode = le;
        /* falls through */
        case le:
          if (e === e0 || e === dn)
            break t;
        /* falls through */
        case Qn:
          if (n.last) {
            c >>>= u & 7, u -= u & 7, n.mode = ti;
            break;
          }
          for (; u < 3; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          switch (n.last = c & 1, c >>>= 1, u -= 1, c & 3) {
            case 0:
              n.mode = jr;
              break;
            case 1:
              if (u0(n), n.mode = pn, e === dn) {
                c >>>= 2, u -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = ea;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = Dt;
          }
          c >>>= 2, u -= 2;
          break;
        case jr:
          for (c >>>= u & 7, u -= u & 7; u < 32; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if ((c & 65535) !== (c >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = Dt;
            break;
          }
          if (n.length = c & 65535, c = 0, u = 0, n.mode = jn, e === dn)
            break t;
        /* falls through */
        case jn:
          n.mode = ta;
        /* falls through */
        case ta:
          if (_ = n.length, _) {
            if (_ > o && (_ = o), _ > f && (_ = f), _ === 0)
              break t;
            r.set(i.subarray(a, a + _), s), o -= _, a += _, f -= _, s += _, n.length -= _;
            break;
          }
          n.mode = le;
          break;
        case ea:
          for (; u < 14; ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if (n.nlen = (c & 31) + 257, c >>>= 5, u -= 5, n.ndist = (c & 31) + 1, c >>>= 5, u -= 5, n.ncode = (c & 15) + 4, c >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = Dt;
            break;
          }
          n.have = 0, n.mode = na;
        /* falls through */
        case na:
          for (; n.have < n.ncode; ) {
            for (; u < 3; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            n.lens[U[n.have++]] = c & 7, c >>>= 3, u -= 3;
          }
          for (; n.have < 19; )
            n.lens[U[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, F = { bits: n.lenbits }, H = Xe(t0, n.lens, 0, 19, n.lencode, 0, n.work, F), n.lenbits = F.bits, H) {
            t.msg = "invalid code lengths set", n.mode = Dt;
            break;
          }
          n.have = 0, n.mode = ia;
        /* falls through */
        case ia:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; I = n.lencode[c & (1 << n.lenbits) - 1], A = I >>> 24, E = I >>> 16 & 255, k = I & 65535, !(A <= u); ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            if (k < 16)
              c >>>= A, u -= A, n.lens[n.have++] = k;
            else {
              if (k === 16) {
                for (y = A + 2; u < y; ) {
                  if (o === 0)
                    break t;
                  o--, c += i[a++] << u, u += 8;
                }
                if (c >>>= A, u -= A, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = Dt;
                  break;
                }
                T = n.lens[n.have - 1], _ = 3 + (c & 3), c >>>= 2, u -= 2;
              } else if (k === 17) {
                for (y = A + 3; u < y; ) {
                  if (o === 0)
                    break t;
                  o--, c += i[a++] << u, u += 8;
                }
                c >>>= A, u -= A, T = 0, _ = 3 + (c & 7), c >>>= 3, u -= 3;
              } else {
                for (y = A + 7; u < y; ) {
                  if (o === 0)
                    break t;
                  o--, c += i[a++] << u, u += 8;
                }
                c >>>= A, u -= A, T = 0, _ = 11 + (c & 127), c >>>= 7, u -= 7;
              }
              if (n.have + _ > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = Dt;
                break;
              }
              for (; _--; )
                n.lens[n.have++] = T;
            }
          }
          if (n.mode === Dt)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = Dt;
            break;
          }
          if (n.lenbits = 9, F = { bits: n.lenbits }, H = Xe(Vs, n.lens, 0, n.nlen, n.lencode, 0, n.work, F), n.lenbits = F.bits, H) {
            t.msg = "invalid literal/lengths set", n.mode = Dt;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, F = { bits: n.distbits }, H = Xe(Us, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, F), n.distbits = F.bits, H) {
            t.msg = "invalid distances set", n.mode = Dt;
            break;
          }
          if (n.mode = pn, e === dn)
            break t;
        /* falls through */
        case pn:
          n.mode = _n;
        /* falls through */
        case _n:
          if (o >= 6 && f >= 258) {
            t.next_out = s, t.avail_out = f, t.next_in = a, t.avail_in = o, n.hold = c, n.bits = u, Xd(t, d), s = t.next_out, r = t.output, f = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, c = n.hold, u = n.bits, n.mode === le && (n.back = -1);
            break;
          }
          for (n.back = 0; I = n.lencode[c & (1 << n.lenbits) - 1], A = I >>> 24, E = I >>> 16 & 255, k = I & 65535, !(A <= u); ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if (E && (E & 240) === 0) {
            for (b = A, S = E, $ = k; I = n.lencode[$ + ((c & (1 << b + S) - 1) >> b)], A = I >>> 24, E = I >>> 16 & 255, k = I & 65535, !(b + A <= u); ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            c >>>= b, u -= b, n.back += b;
          }
          if (c >>>= A, u -= A, n.back += A, n.length = k, E === 0) {
            n.mode = la;
            break;
          }
          if (E & 32) {
            n.back = -1, n.mode = le;
            break;
          }
          if (E & 64) {
            t.msg = "invalid literal/length code", n.mode = Dt;
            break;
          }
          n.extra = E & 15, n.mode = ra;
        /* falls through */
        case ra:
          if (n.extra) {
            for (y = n.extra; u < y; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            n.length += c & (1 << n.extra) - 1, c >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = aa;
        /* falls through */
        case aa:
          for (; I = n.distcode[c & (1 << n.distbits) - 1], A = I >>> 24, E = I >>> 16 & 255, k = I & 65535, !(A <= u); ) {
            if (o === 0)
              break t;
            o--, c += i[a++] << u, u += 8;
          }
          if ((E & 240) === 0) {
            for (b = A, S = E, $ = k; I = n.distcode[$ + ((c & (1 << b + S) - 1) >> b)], A = I >>> 24, E = I >>> 16 & 255, k = I & 65535, !(b + A <= u); ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            c >>>= b, u -= b, n.back += b;
          }
          if (c >>>= A, u -= A, n.back += A, E & 64) {
            t.msg = "invalid distance code", n.mode = Dt;
            break;
          }
          n.offset = k, n.extra = E & 15, n.mode = sa;
        /* falls through */
        case sa:
          if (n.extra) {
            for (y = n.extra; u < y; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            n.offset += c & (1 << n.extra) - 1, c >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = Dt;
            break;
          }
          n.mode = oa;
        /* falls through */
        case oa:
          if (f === 0)
            break t;
          if (_ = d - f, n.offset > _) {
            if (_ = n.offset - _, _ > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = Dt;
              break;
            }
            _ > n.wnext ? (_ -= n.wnext, x = n.wsize - _) : x = n.wnext - _, _ > n.length && (_ = n.length), L = n.window;
          } else
            L = r, x = s - n.offset, _ = n.length;
          _ > f && (_ = f), f -= _, n.length -= _;
          do
            r[s++] = L[x++];
          while (--_);
          n.length === 0 && (n.mode = _n);
          break;
        case la:
          if (f === 0)
            break t;
          r[s++] = n.length, f--, n.mode = _n;
          break;
        case ti:
          if (n.wrap) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, c |= i[a++] << u, u += 8;
            }
            if (d -= f, t.total_out += d, n.total += d, n.wrap & 4 && d && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? ne(n.check, r, d, s - d) : Li(n.check, r, d, s - d)), d = f, n.wrap & 4 && (n.flags ? c : ua(c)) !== n.check) {
              t.msg = "incorrect data check", n.mode = Dt;
              break;
            }
            c = 0, u = 0;
          }
          n.mode = ca;
        /* falls through */
        case ca:
          if (n.wrap && n.flags) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, c += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && c !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = Dt;
              break;
            }
            c = 0, u = 0;
          }
          n.mode = fa;
        /* falls through */
        case fa:
          H = n0;
          break t;
        case Dt:
          H = Zs;
          break t;
        case Gs:
          return qs;
        case Ws:
        /* falls through */
        default:
          return Yt;
      }
  return t.next_out = s, t.avail_out = f, t.next_in = a, t.avail_in = o, n.hold = c, n.bits = u, (n.wsize || d !== t.avail_out && n.mode < Dt && (n.mode < ti || e !== Vr)) && Qs(t, t.output, t.next_out, d - t.avail_out), m -= t.avail_in, d -= t.avail_out, t.total_in += m, t.total_out += d, n.total += d, n.wrap & 4 && d && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? ne(n.check, r, d, t.next_out - d) : Li(n.check, r, d, t.next_out - d)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === le ? 128 : 0) + (n.mode === pn || n.mode === jn ? 256 : 0), (m === 0 && d === 0 || e === Vr) && H === Ee && (H = r0), H;
}, d0 = (t) => {
  if (Ae(t))
    return Yt;
  let e = t.state;
  return e.window && (e.window = null), t.state = null, Ee;
}, p0 = (t, e) => {
  if (Ae(t))
    return Yt;
  const n = t.state;
  return (n.wrap & 2) === 0 ? Yt : (n.head = e, e.done = !1, Ee);
}, _0 = (t, e) => {
  const n = e.length;
  let i, r, a;
  return Ae(t) || (i = t.state, i.wrap !== 0 && i.mode !== Fn) ? Yt : i.mode === Fn && (r = 1, r = Li(r, e, n, 0), r !== i.check) ? Zs : (a = Qs(t, e, n, n), a ? (i.mode = Gs, qs) : (i.havedict = 1, Ee));
};
var g0 = Ys, m0 = Ks, v0 = Xs, w0 = f0, y0 = Js, b0 = h0, x0 = d0, k0 = p0, T0 = _0, E0 = "pako inflate (from Nodeca project)", ce = {
  inflateReset: g0,
  inflateReset2: m0,
  inflateResetKeep: v0,
  inflateInit: w0,
  inflateInit2: y0,
  inflate: b0,
  inflateEnd: x0,
  inflateGetHeader: k0,
  inflateSetDictionary: T0,
  inflateInfo: E0
};
function S0() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var A0 = S0;
const js = Object.prototype.toString, {
  Z_NO_FLUSH: $0,
  Z_FINISH: N0,
  Z_OK: tn,
  Z_STREAM_END: ii,
  Z_NEED_DICT: ri,
  Z_STREAM_ERROR: I0,
  Z_DATA_ERROR: da,
  Z_MEM_ERROR: D0
} = Bs;
function qn(t) {
  this.options = Hs.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Gd(), this.strm.avail_out = 0;
  let n = ce.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (n !== tn)
    throw new Error(Ci[n]);
  if (this.header = new A0(), ce.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = Fi.string2buf(e.dictionary) : js.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = ce.inflateSetDictionary(this.strm, e.dictionary), n !== tn)))
    throw new Error(Ci[n]);
}
qn.prototype.push = function(t, e) {
  const n = this.strm, i = this.options.chunkSize, r = this.options.dictionary;
  let a, s, o;
  if (this.ended) return !1;
  for (e === ~~e ? s = e : s = e === !0 ? N0 : $0, js.call(t) === "[object ArrayBuffer]" ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length; ; ) {
    for (n.avail_out === 0 && (n.output = new Uint8Array(i), n.next_out = 0, n.avail_out = i), a = ce.inflate(n, s), a === ri && r && (a = ce.inflateSetDictionary(n, r), a === tn ? a = ce.inflate(n, s) : a === da && (a = ri)); n.avail_in > 0 && a === ii && n.state.wrap > 0 && t[n.next_in] !== 0; )
      ce.inflateReset(n), a = ce.inflate(n, s);
    switch (a) {
      case I0:
      case da:
      case ri:
      case D0:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (o = n.avail_out, n.next_out && (n.avail_out === 0 || a === ii))
      if (this.options.to === "string") {
        let f = Fi.utf8border(n.output, n.next_out), c = n.next_out - f, u = Fi.buf2string(n.output, f);
        n.next_out = c, n.avail_out = i - c, c && n.output.set(n.output.subarray(f, f + c), 0), this.onData(u);
      } else
        this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
    if (!(a === tn && o === 0)) {
      if (a === ii)
        return a = ce.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (n.avail_in === 0) break;
    }
  }
  return !0;
};
qn.prototype.onData = function(t) {
  this.chunks.push(t);
};
qn.prototype.onEnd = function(t) {
  t === tn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Hs.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function R0(t, e) {
  const n = new qn(e);
  if (n.push(t), n.err) throw n.msg || Ci[n.err];
  return n.result;
}
var M0 = R0, O0 = {
  inflate: M0
};
const { inflate: L0 } = O0;
var C0 = L0;
const F0 = { refName: "seq_id" }, z0 = { seq_id: "refName" };
class zn {
  constructor(e, n, i) {
    this.ncFeature = e, this.uniqueId = i || e.id(), this.parentHandle = n;
  }
  jb2TagToJb1Tag(e) {
    return (F0[e] || e).toLowerCase();
  }
  jb1TagToJb2Tag(e) {
    const n = e.toLowerCase();
    return z0[n] || n;
  }
  get(e) {
    const n = this.ncFeature.get(this.jb2TagToJb1Tag(e));
    return n && e === "subfeatures" ? n.map((i) => new zn(i, this)) : n;
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
        (a) => new zn(a, this).toJSON()
      ) : e[i] = r;
    }), {
      ...e,
      fmin: e.start,
      fmax: e.end,
      seqId: e.refName
    };
  }
}
function B0(t) {
  return t[0] === 31 && t[1] === 139 && t[2] === 8;
}
async function H0(t) {
  const e = await fetch(t);
  if (!e.ok)
    throw new Error(`HTTP ${e.status} fetching ${t}`);
  const n = await e.arrayBuffer();
  return B0(new Uint8Array(n)) ? C0(n) : n;
}
async function Tp({
  urlTemplate: t,
  baseUrl: e,
  region: n
}) {
  const i = new xd({
    urlTemplate: t,
    baseUrl: e,
    readFile: H0
  }), r = [];
  for await (const a of i.getFeatures({
    refName: n.chromosome,
    start: n.start,
    end: n.end
  }))
    r.push(new zn(a).toJSON());
  return r;
}
async function Ep({
  region: t,
  baseUrl: e,
  genome: n,
  track: i,
  extra: r = ".json?ignoreCache=true&flatten=false"
}) {
  const a = `${t.chromosome}:${t.start}..${t.end}`, s = `${e}/${encodeURI(n)}/${encodeURI(i)}/${encodeURIComponent(a)}${r}`, o = await fetch(s);
  if (!o.ok)
    throw new Error(`HTTP ${o.status} fetching ${s}`);
  return o.json();
}
const gn = {};
function pa(t) {
  return (typeof t == "object" && t !== null && "message" in t ? t.message : `${t}`).replace(/\.$/, "");
}
class we {
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
          throw new Error(`${pa(a)} fetching ${e}`, { cause: a });
        }
      } else
        throw new Error(`${pa(r)} fetching ${e}`, { cause: r });
    }
    return i;
  }
  async read(e, n, i = {}) {
    const { headers: r = {}, signal: a, overrides: s = {} } = i;
    e < 1 / 0 ? r.range = `bytes=${n}-${n + e}` : e === 1 / 0 && n !== 0 && (r.range = `bytes=${n}-`);
    const o = await this.fetch(this.url, {
      ...this.baseOverrides,
      ...s,
      headers: {
        ...r,
        ...s.headers,
        ...this.baseOverrides.headers
      },
      method: "GET",
      redirect: "follow",
      mode: "cors",
      signal: a
    });
    if (!o.ok)
      throw new Error(`HTTP ${o.status} fetching ${this.url}`);
    if (o.status === 200 && n === 0 || o.status === 206) {
      const f = await o.arrayBuffer(), c = o.headers.get("content-range"), u = /\/(\d+)$/.exec(c || "");
      return u != null && u[1] && (this._stat = {
        size: parseInt(u[1], 10)
      }), new Uint8Array(f.slice(0, e));
    }
    throw o.status === 200 ? new Error(`${this.url} fetch returned status 200, expected 206`) : new Error(`HTTP ${o.status} fetching ${this.url}`);
  }
  async readFile(e = {}) {
    let n, i;
    typeof e == "string" ? (n = e, i = {}) : (n = e.encoding, i = e, delete i.encoding);
    const { headers: r = {}, signal: a, overrides: s = {} } = i, o = await this.fetch(this.url, {
      headers: r,
      method: "GET",
      redirect: "follow",
      mode: "cors",
      signal: a,
      ...this.baseOverrides,
      ...s
    });
    if (o.status !== 200)
      throw new Error(`HTTP ${o.status} fetching ${this.url}`);
    if (n === "utf8")
      return o.text();
    if (n)
      throw new Error(`unsupported encoding: ${n}`);
    return new Uint8Array(await o.arrayBuffer());
  }
  async stat() {
    if (!this._stat && (await this.read(10, 0), !this._stat))
      throw new Error(`unable to determine size of file at ${this.url}`);
    return this._stat;
  }
  async close() {
  }
}
var ai = {}, _a;
function de() {
  return _a || (_a = 1, function(t) {
    var e = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    function n(a, s) {
      return Object.prototype.hasOwnProperty.call(a, s);
    }
    t.assign = function(a) {
      for (var s = Array.prototype.slice.call(arguments, 1); s.length; ) {
        var o = s.shift();
        if (o) {
          if (typeof o != "object")
            throw new TypeError(o + "must be non-object");
          for (var f in o)
            n(o, f) && (a[f] = o[f]);
        }
      }
      return a;
    }, t.shrinkBuf = function(a, s) {
      return a.length === s ? a : a.subarray ? a.subarray(0, s) : (a.length = s, a);
    };
    var i = {
      arraySet: function(a, s, o, f, c) {
        if (s.subarray && a.subarray) {
          a.set(s.subarray(o, o + f), c);
          return;
        }
        for (var u = 0; u < f; u++)
          a[c + u] = s[o + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var s, o, f, c, u, m;
        for (f = 0, s = 0, o = a.length; s < o; s++)
          f += a[s].length;
        for (m = new Uint8Array(f), c = 0, s = 0, o = a.length; s < o; s++)
          u = a[s], m.set(u, c), c += u.length;
        return m;
      }
    }, r = {
      arraySet: function(a, s, o, f, c) {
        for (var u = 0; u < f; u++)
          a[c + u] = s[o + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        return [].concat.apply([], a);
      }
    };
    t.setTyped = function(a) {
      a ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, i)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, r));
    }, t.setTyped(e);
  }(ai)), ai;
}
var Ne = {}, Kt = {}, _e = {}, ga;
function P0() {
  if (ga) return _e;
  ga = 1;
  var t = de(), e = 4, n = 0, i = 1, r = 2;
  function a(g) {
    for (var B = g.length; --B >= 0; )
      g[B] = 0;
  }
  var s = 0, o = 1, f = 2, c = 3, u = 258, m = 29, d = 256, _ = d + 1 + m, x = 30, L = 19, I = 2 * _ + 1, A = 15, E = 16, k = 7, b = 256, S = 16, $ = 17, T = 18, H = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), z = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), F = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], U = 512, P = new Array((_ + 2) * 2);
  a(P);
  var K = new Array(x * 2);
  a(K);
  var nt = new Array(U);
  a(nt);
  var ct = new Array(u - c + 1);
  a(ct);
  var W = new Array(m);
  a(W);
  var j = new Array(x);
  a(j);
  function V(g, B, C, G, v) {
    this.static_tree = g, this.extra_bits = B, this.extra_base = C, this.elems = G, this.max_length = v, this.has_stree = g && g.length;
  }
  var rt, Rt, J;
  function gt(g, B) {
    this.dyn_tree = g, this.max_code = 0, this.stat_desc = B;
  }
  function Et(g) {
    return g < 256 ? nt[g] : nt[256 + (g >>> 7)];
  }
  function dt(g, B) {
    g.pending_buf[g.pending++] = B & 255, g.pending_buf[g.pending++] = B >>> 8 & 255;
  }
  function Q(g, B, C) {
    g.bi_valid > E - C ? (g.bi_buf |= B << g.bi_valid & 65535, dt(g, g.bi_buf), g.bi_buf = B >> E - g.bi_valid, g.bi_valid += C - E) : (g.bi_buf |= B << g.bi_valid & 65535, g.bi_valid += C);
  }
  function lt(g, B, C) {
    Q(
      g,
      C[B * 2],
      C[B * 2 + 1]
      /*.Len*/
    );
  }
  function ft(g, B) {
    var C = 0;
    do
      C |= g & 1, g >>>= 1, C <<= 1;
    while (--B > 0);
    return C >>> 1;
  }
  function Tt(g) {
    g.bi_valid === 16 ? (dt(g, g.bi_buf), g.bi_buf = 0, g.bi_valid = 0) : g.bi_valid >= 8 && (g.pending_buf[g.pending++] = g.bi_buf & 255, g.bi_buf >>= 8, g.bi_valid -= 8);
  }
  function Nt(g, B) {
    var C = B.dyn_tree, G = B.max_code, v = B.stat_desc.static_tree, R = B.stat_desc.has_stree, h = B.stat_desc.extra_bits, M = B.stat_desc.extra_base, tt = B.stat_desc.max_length, l, D, O, p, w, N, et = 0;
    for (p = 0; p <= A; p++)
      g.bl_count[p] = 0;
    for (C[g.heap[g.heap_max] * 2 + 1] = 0, l = g.heap_max + 1; l < I; l++)
      D = g.heap[l], p = C[C[D * 2 + 1] * 2 + 1] + 1, p > tt && (p = tt, et++), C[D * 2 + 1] = p, !(D > G) && (g.bl_count[p]++, w = 0, D >= M && (w = h[D - M]), N = C[D * 2], g.opt_len += N * (p + w), R && (g.static_len += N * (v[D * 2 + 1] + w)));
    if (et !== 0) {
      do {
        for (p = tt - 1; g.bl_count[p] === 0; )
          p--;
        g.bl_count[p]--, g.bl_count[p + 1] += 2, g.bl_count[tt]--, et -= 2;
      } while (et > 0);
      for (p = tt; p !== 0; p--)
        for (D = g.bl_count[p]; D !== 0; )
          O = g.heap[--l], !(O > G) && (C[O * 2 + 1] !== p && (g.opt_len += (p - C[O * 2 + 1]) * C[O * 2], C[O * 2 + 1] = p), D--);
    }
  }
  function $t(g, B, C) {
    var G = new Array(A + 1), v = 0, R, h;
    for (R = 1; R <= A; R++)
      G[R] = v = v + C[R - 1] << 1;
    for (h = 0; h <= B; h++) {
      var M = g[h * 2 + 1];
      M !== 0 && (g[h * 2] = ft(G[M]++, M));
    }
  }
  function ot() {
    var g, B, C, G, v, R = new Array(A + 1);
    for (C = 0, G = 0; G < m - 1; G++)
      for (W[G] = C, g = 0; g < 1 << H[G]; g++)
        ct[C++] = G;
    for (ct[C - 1] = G, v = 0, G = 0; G < 16; G++)
      for (j[G] = v, g = 0; g < 1 << z[G]; g++)
        nt[v++] = G;
    for (v >>= 7; G < x; G++)
      for (j[G] = v << 7, g = 0; g < 1 << z[G] - 7; g++)
        nt[256 + v++] = G;
    for (B = 0; B <= A; B++)
      R[B] = 0;
    for (g = 0; g <= 143; )
      P[g * 2 + 1] = 8, g++, R[8]++;
    for (; g <= 255; )
      P[g * 2 + 1] = 9, g++, R[9]++;
    for (; g <= 279; )
      P[g * 2 + 1] = 7, g++, R[7]++;
    for (; g <= 287; )
      P[g * 2 + 1] = 8, g++, R[8]++;
    for ($t(P, _ + 1, R), g = 0; g < x; g++)
      K[g * 2 + 1] = 5, K[g * 2] = ft(g, 5);
    rt = new V(P, H, d + 1, _, A), Rt = new V(K, z, 0, x, A), J = new V(new Array(0), F, 0, L, k);
  }
  function it(g) {
    var B;
    for (B = 0; B < _; B++)
      g.dyn_ltree[B * 2] = 0;
    for (B = 0; B < x; B++)
      g.dyn_dtree[B * 2] = 0;
    for (B = 0; B < L; B++)
      g.bl_tree[B * 2] = 0;
    g.dyn_ltree[b * 2] = 1, g.opt_len = g.static_len = 0, g.last_lit = g.matches = 0;
  }
  function vt(g) {
    g.bi_valid > 8 ? dt(g, g.bi_buf) : g.bi_valid > 0 && (g.pending_buf[g.pending++] = g.bi_buf), g.bi_buf = 0, g.bi_valid = 0;
  }
  function It(g, B, C, G) {
    vt(g), dt(g, C), dt(g, ~C), t.arraySet(g.pending_buf, g.window, B, C, g.pending), g.pending += C;
  }
  function at(g, B, C, G) {
    var v = B * 2, R = C * 2;
    return g[v] < g[R] || g[v] === g[R] && G[B] <= G[C];
  }
  function _t(g, B, C) {
    for (var G = g.heap[C], v = C << 1; v <= g.heap_len && (v < g.heap_len && at(B, g.heap[v + 1], g.heap[v], g.depth) && v++, !at(B, G, g.heap[v], g.depth)); )
      g.heap[C] = g.heap[v], C = v, v <<= 1;
    g.heap[C] = G;
  }
  function Z(g, B, C) {
    var G, v, R = 0, h, M;
    if (g.last_lit !== 0)
      do
        G = g.pending_buf[g.d_buf + R * 2] << 8 | g.pending_buf[g.d_buf + R * 2 + 1], v = g.pending_buf[g.l_buf + R], R++, G === 0 ? lt(g, v, B) : (h = ct[v], lt(g, h + d + 1, B), M = H[h], M !== 0 && (v -= W[h], Q(g, v, M)), G--, h = Et(G), lt(g, h, C), M = z[h], M !== 0 && (G -= j[h], Q(g, G, M)));
      while (R < g.last_lit);
    lt(g, b, B);
  }
  function xt(g, B) {
    var C = B.dyn_tree, G = B.stat_desc.static_tree, v = B.stat_desc.has_stree, R = B.stat_desc.elems, h, M, tt = -1, l;
    for (g.heap_len = 0, g.heap_max = I, h = 0; h < R; h++)
      C[h * 2] !== 0 ? (g.heap[++g.heap_len] = tt = h, g.depth[h] = 0) : C[h * 2 + 1] = 0;
    for (; g.heap_len < 2; )
      l = g.heap[++g.heap_len] = tt < 2 ? ++tt : 0, C[l * 2] = 1, g.depth[l] = 0, g.opt_len--, v && (g.static_len -= G[l * 2 + 1]);
    for (B.max_code = tt, h = g.heap_len >> 1; h >= 1; h--)
      _t(g, C, h);
    l = R;
    do
      h = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[
        1
        /*SMALLEST*/
      ] = g.heap[g.heap_len--], _t(
        g,
        C,
        1
        /*SMALLEST*/
      ), M = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[--g.heap_max] = h, g.heap[--g.heap_max] = M, C[l * 2] = C[h * 2] + C[M * 2], g.depth[l] = (g.depth[h] >= g.depth[M] ? g.depth[h] : g.depth[M]) + 1, C[h * 2 + 1] = C[M * 2 + 1] = l, g.heap[
        1
        /*SMALLEST*/
      ] = l++, _t(
        g,
        C,
        1
        /*SMALLEST*/
      );
    while (g.heap_len >= 2);
    g.heap[--g.heap_max] = g.heap[
      1
      /*SMALLEST*/
    ], Nt(g, B), $t(C, tt, g.bl_count);
  }
  function St(g, B, C) {
    var G, v = -1, R, h = B[0 * 2 + 1], M = 0, tt = 7, l = 4;
    for (h === 0 && (tt = 138, l = 3), B[(C + 1) * 2 + 1] = 65535, G = 0; G <= C; G++)
      R = h, h = B[(G + 1) * 2 + 1], !(++M < tt && R === h) && (M < l ? g.bl_tree[R * 2] += M : R !== 0 ? (R !== v && g.bl_tree[R * 2]++, g.bl_tree[S * 2]++) : M <= 10 ? g.bl_tree[$ * 2]++ : g.bl_tree[T * 2]++, M = 0, v = R, h === 0 ? (tt = 138, l = 3) : R === h ? (tt = 6, l = 3) : (tt = 7, l = 4));
  }
  function Bt(g, B, C) {
    var G, v = -1, R, h = B[0 * 2 + 1], M = 0, tt = 7, l = 4;
    for (h === 0 && (tt = 138, l = 3), G = 0; G <= C; G++)
      if (R = h, h = B[(G + 1) * 2 + 1], !(++M < tt && R === h)) {
        if (M < l)
          do
            lt(g, R, g.bl_tree);
          while (--M !== 0);
        else R !== 0 ? (R !== v && (lt(g, R, g.bl_tree), M--), lt(g, S, g.bl_tree), Q(g, M - 3, 2)) : M <= 10 ? (lt(g, $, g.bl_tree), Q(g, M - 3, 3)) : (lt(g, T, g.bl_tree), Q(g, M - 11, 7));
        M = 0, v = R, h === 0 ? (tt = 138, l = 3) : R === h ? (tt = 6, l = 3) : (tt = 7, l = 4);
      }
  }
  function st(g) {
    var B;
    for (St(g, g.dyn_ltree, g.l_desc.max_code), St(g, g.dyn_dtree, g.d_desc.max_code), xt(g, g.bl_desc), B = L - 1; B >= 3 && g.bl_tree[y[B] * 2 + 1] === 0; B--)
      ;
    return g.opt_len += 3 * (B + 1) + 5 + 5 + 4, B;
  }
  function pt(g, B, C, G) {
    var v;
    for (Q(g, B - 257, 5), Q(g, C - 1, 5), Q(g, G - 4, 4), v = 0; v < G; v++)
      Q(g, g.bl_tree[y[v] * 2 + 1], 3);
    Bt(g, g.dyn_ltree, B - 1), Bt(g, g.dyn_dtree, C - 1);
  }
  function ht(g) {
    var B = 4093624447, C;
    for (C = 0; C <= 31; C++, B >>>= 1)
      if (B & 1 && g.dyn_ltree[C * 2] !== 0)
        return n;
    if (g.dyn_ltree[9 * 2] !== 0 || g.dyn_ltree[10 * 2] !== 0 || g.dyn_ltree[13 * 2] !== 0)
      return i;
    for (C = 32; C < d; C++)
      if (g.dyn_ltree[C * 2] !== 0)
        return i;
    return n;
  }
  var ut = !1;
  function Ft(g) {
    ut || (ot(), ut = !0), g.l_desc = new gt(g.dyn_ltree, rt), g.d_desc = new gt(g.dyn_dtree, Rt), g.bl_desc = new gt(g.bl_tree, J), g.bi_buf = 0, g.bi_valid = 0, it(g);
  }
  function q(g, B, C, G) {
    Q(g, (s << 1) + (G ? 1 : 0), 3), It(g, B, C);
  }
  function yt(g) {
    Q(g, o << 1, 3), lt(g, b, P), Tt(g);
  }
  function bt(g, B, C, G) {
    var v, R, h = 0;
    g.level > 0 ? (g.strm.data_type === r && (g.strm.data_type = ht(g)), xt(g, g.l_desc), xt(g, g.d_desc), h = st(g), v = g.opt_len + 3 + 7 >>> 3, R = g.static_len + 3 + 7 >>> 3, R <= v && (v = R)) : v = R = C + 5, C + 4 <= v && B !== -1 ? q(g, B, C, G) : g.strategy === e || R === v ? (Q(g, (o << 1) + (G ? 1 : 0), 3), Z(g, P, K)) : (Q(g, (f << 1) + (G ? 1 : 0), 3), pt(g, g.l_desc.max_code + 1, g.d_desc.max_code + 1, h + 1), Z(g, g.dyn_ltree, g.dyn_dtree)), it(g), G && vt(g);
  }
  function kt(g, B, C) {
    return g.pending_buf[g.d_buf + g.last_lit * 2] = B >>> 8 & 255, g.pending_buf[g.d_buf + g.last_lit * 2 + 1] = B & 255, g.pending_buf[g.l_buf + g.last_lit] = C & 255, g.last_lit++, B === 0 ? g.dyn_ltree[C * 2]++ : (g.matches++, B--, g.dyn_ltree[(ct[C] + d + 1) * 2]++, g.dyn_dtree[Et(B) * 2]++), g.last_lit === g.lit_bufsize - 1;
  }
  return _e._tr_init = Ft, _e._tr_stored_block = q, _e._tr_flush_block = bt, _e._tr_tally = kt, _e._tr_align = yt, _e;
}
var si, ma;
function to() {
  if (ma) return si;
  ma = 1;
  function t(e, n, i, r) {
    for (var a = e & 65535 | 0, s = e >>> 16 & 65535 | 0, o = 0; i !== 0; ) {
      o = i > 2e3 ? 2e3 : i, i -= o;
      do
        a = a + n[r++] | 0, s = s + a | 0;
      while (--o);
      a %= 65521, s %= 65521;
    }
    return a | s << 16 | 0;
  }
  return si = t, si;
}
var oi, va;
function eo() {
  if (va) return oi;
  va = 1;
  function t() {
    for (var i, r = [], a = 0; a < 256; a++) {
      i = a;
      for (var s = 0; s < 8; s++)
        i = i & 1 ? 3988292384 ^ i >>> 1 : i >>> 1;
      r[a] = i;
    }
    return r;
  }
  var e = t();
  function n(i, r, a, s) {
    var o = e, f = s + a;
    i ^= -1;
    for (var c = s; c < f; c++)
      i = i >>> 8 ^ o[(i ^ r[c]) & 255];
    return i ^ -1;
  }
  return oi = n, oi;
}
var li, wa;
function ir() {
  return wa || (wa = 1, li = {
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
  }), li;
}
var ya;
function V0() {
  if (ya) return Kt;
  ya = 1;
  var t = de(), e = P0(), n = to(), i = eo(), r = ir(), a = 0, s = 1, o = 3, f = 4, c = 5, u = 0, m = 1, d = -2, _ = -3, x = -5, L = -1, I = 1, A = 2, E = 3, k = 4, b = 0, S = 2, $ = 8, T = 9, H = 15, z = 8, F = 29, y = 256, U = y + 1 + F, P = 30, K = 19, nt = 2 * U + 1, ct = 15, W = 3, j = 258, V = j + W + 1, rt = 32, Rt = 42, J = 69, gt = 73, Et = 91, dt = 103, Q = 113, lt = 666, ft = 1, Tt = 2, Nt = 3, $t = 4, ot = 3;
  function it(l, D) {
    return l.msg = r[D], D;
  }
  function vt(l) {
    return (l << 1) - (l > 4 ? 9 : 0);
  }
  function It(l) {
    for (var D = l.length; --D >= 0; )
      l[D] = 0;
  }
  function at(l) {
    var D = l.state, O = D.pending;
    O > l.avail_out && (O = l.avail_out), O !== 0 && (t.arraySet(l.output, D.pending_buf, D.pending_out, O, l.next_out), l.next_out += O, D.pending_out += O, l.total_out += O, l.avail_out -= O, D.pending -= O, D.pending === 0 && (D.pending_out = 0));
  }
  function _t(l, D) {
    e._tr_flush_block(l, l.block_start >= 0 ? l.block_start : -1, l.strstart - l.block_start, D), l.block_start = l.strstart, at(l.strm);
  }
  function Z(l, D) {
    l.pending_buf[l.pending++] = D;
  }
  function xt(l, D) {
    l.pending_buf[l.pending++] = D >>> 8 & 255, l.pending_buf[l.pending++] = D & 255;
  }
  function St(l, D, O, p) {
    var w = l.avail_in;
    return w > p && (w = p), w === 0 ? 0 : (l.avail_in -= w, t.arraySet(D, l.input, l.next_in, w, O), l.state.wrap === 1 ? l.adler = n(l.adler, D, w, O) : l.state.wrap === 2 && (l.adler = i(l.adler, D, w, O)), l.next_in += w, l.total_in += w, w);
  }
  function Bt(l, D) {
    var O = l.max_chain_length, p = l.strstart, w, N, et = l.prev_length, X = l.nice_match, Y = l.strstart > l.w_size - V ? l.strstart - (l.w_size - V) : 0, mt = l.window, ae = l.w_mask, Mt = l.prev, wt = l.strstart + j, zt = mt[p + et - 1], Pt = mt[p + et];
    l.prev_length >= l.good_match && (O >>= 2), X > l.lookahead && (X = l.lookahead);
    do
      if (w = D, !(mt[w + et] !== Pt || mt[w + et - 1] !== zt || mt[w] !== mt[p] || mt[++w] !== mt[p + 1])) {
        p += 2, w++;
        do
          ;
        while (mt[++p] === mt[++w] && mt[++p] === mt[++w] && mt[++p] === mt[++w] && mt[++p] === mt[++w] && mt[++p] === mt[++w] && mt[++p] === mt[++w] && mt[++p] === mt[++w] && mt[++p] === mt[++w] && p < wt);
        if (N = j - (wt - p), p = wt - j, N > et) {
          if (l.match_start = D, et = N, N >= X)
            break;
          zt = mt[p + et - 1], Pt = mt[p + et];
        }
      }
    while ((D = Mt[D & ae]) > Y && --O !== 0);
    return et <= l.lookahead ? et : l.lookahead;
  }
  function st(l) {
    var D = l.w_size, O, p, w, N, et;
    do {
      if (N = l.window_size - l.lookahead - l.strstart, l.strstart >= D + (D - V)) {
        t.arraySet(l.window, l.window, D, D, 0), l.match_start -= D, l.strstart -= D, l.block_start -= D, p = l.hash_size, O = p;
        do
          w = l.head[--O], l.head[O] = w >= D ? w - D : 0;
        while (--p);
        p = D, O = p;
        do
          w = l.prev[--O], l.prev[O] = w >= D ? w - D : 0;
        while (--p);
        N += D;
      }
      if (l.strm.avail_in === 0)
        break;
      if (p = St(l.strm, l.window, l.strstart + l.lookahead, N), l.lookahead += p, l.lookahead + l.insert >= W)
        for (et = l.strstart - l.insert, l.ins_h = l.window[et], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[et + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[et + W - 1]) & l.hash_mask, l.prev[et & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = et, et++, l.insert--, !(l.lookahead + l.insert < W)); )
          ;
    } while (l.lookahead < V && l.strm.avail_in !== 0);
  }
  function pt(l, D) {
    var O = 65535;
    for (O > l.pending_buf_size - 5 && (O = l.pending_buf_size - 5); ; ) {
      if (l.lookahead <= 1) {
        if (st(l), l.lookahead === 0 && D === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      l.strstart += l.lookahead, l.lookahead = 0;
      var p = l.block_start + O;
      if ((l.strstart === 0 || l.strstart >= p) && (l.lookahead = l.strstart - p, l.strstart = p, _t(l, !1), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - V && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = 0, D === f ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : (l.strstart > l.block_start && (_t(l, !1), l.strm.avail_out === 0), ft);
  }
  function ht(l, D) {
    for (var O, p; ; ) {
      if (l.lookahead < V) {
        if (st(l), l.lookahead < V && D === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      if (O = 0, l.lookahead >= W && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, O = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), O !== 0 && l.strstart - O <= l.w_size - V && (l.match_length = Bt(l, O)), l.match_length >= W)
        if (p = e._tr_tally(l, l.strstart - l.match_start, l.match_length - W), l.lookahead -= l.match_length, l.match_length <= l.max_lazy_match && l.lookahead >= W) {
          l.match_length--;
          do
            l.strstart++, l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, O = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart;
          while (--l.match_length !== 0);
          l.strstart++;
        } else
          l.strstart += l.match_length, l.match_length = 0, l.ins_h = l.window[l.strstart], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + 1]) & l.hash_mask;
      else
        p = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++;
      if (p && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = l.strstart < W - 1 ? l.strstart : W - 1, D === f ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : Tt;
  }
  function ut(l, D) {
    for (var O, p, w; ; ) {
      if (l.lookahead < V) {
        if (st(l), l.lookahead < V && D === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      if (O = 0, l.lookahead >= W && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, O = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = W - 1, O !== 0 && l.prev_length < l.max_lazy_match && l.strstart - O <= l.w_size - V && (l.match_length = Bt(l, O), l.match_length <= 5 && (l.strategy === I || l.match_length === W && l.strstart - l.match_start > 4096) && (l.match_length = W - 1)), l.prev_length >= W && l.match_length <= l.prev_length) {
        w = l.strstart + l.lookahead - W, p = e._tr_tally(l, l.strstart - 1 - l.prev_match, l.prev_length - W), l.lookahead -= l.prev_length - 1, l.prev_length -= 2;
        do
          ++l.strstart <= w && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + W - 1]) & l.hash_mask, O = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart);
        while (--l.prev_length !== 0);
        if (l.match_available = 0, l.match_length = W - 1, l.strstart++, p && (_t(l, !1), l.strm.avail_out === 0))
          return ft;
      } else if (l.match_available) {
        if (p = e._tr_tally(l, 0, l.window[l.strstart - 1]), p && _t(l, !1), l.strstart++, l.lookahead--, l.strm.avail_out === 0)
          return ft;
      } else
        l.match_available = 1, l.strstart++, l.lookahead--;
    }
    return l.match_available && (p = e._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < W - 1 ? l.strstart : W - 1, D === f ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : Tt;
  }
  function Ft(l, D) {
    for (var O, p, w, N, et = l.window; ; ) {
      if (l.lookahead <= j) {
        if (st(l), l.lookahead <= j && D === a)
          return ft;
        if (l.lookahead === 0)
          break;
      }
      if (l.match_length = 0, l.lookahead >= W && l.strstart > 0 && (w = l.strstart - 1, p = et[w], p === et[++w] && p === et[++w] && p === et[++w])) {
        N = l.strstart + j;
        do
          ;
        while (p === et[++w] && p === et[++w] && p === et[++w] && p === et[++w] && p === et[++w] && p === et[++w] && p === et[++w] && p === et[++w] && w < N);
        l.match_length = j - (N - w), l.match_length > l.lookahead && (l.match_length = l.lookahead);
      }
      if (l.match_length >= W ? (O = e._tr_tally(l, 1, l.match_length - W), l.lookahead -= l.match_length, l.strstart += l.match_length, l.match_length = 0) : (O = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++), O && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = 0, D === f ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : Tt;
  }
  function q(l, D) {
    for (var O; ; ) {
      if (l.lookahead === 0 && (st(l), l.lookahead === 0)) {
        if (D === a)
          return ft;
        break;
      }
      if (l.match_length = 0, O = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++, O && (_t(l, !1), l.strm.avail_out === 0))
        return ft;
    }
    return l.insert = 0, D === f ? (_t(l, !0), l.strm.avail_out === 0 ? Nt : $t) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ft : Tt;
  }
  function yt(l, D, O, p, w) {
    this.good_length = l, this.max_lazy = D, this.nice_length = O, this.max_chain = p, this.func = w;
  }
  var bt;
  bt = [
    /*      good lazy nice chain */
    new yt(0, 0, 0, 0, pt),
    /* 0 store only */
    new yt(4, 4, 8, 4, ht),
    /* 1 max speed, no lazy matches */
    new yt(4, 5, 16, 8, ht),
    /* 2 */
    new yt(4, 6, 32, 32, ht),
    /* 3 */
    new yt(4, 4, 16, 16, ut),
    /* 4 lazy matches */
    new yt(8, 16, 32, 32, ut),
    /* 5 */
    new yt(8, 16, 128, 128, ut),
    /* 6 */
    new yt(8, 32, 128, 256, ut),
    /* 7 */
    new yt(32, 128, 258, 1024, ut),
    /* 8 */
    new yt(32, 258, 258, 4096, ut)
    /* 9 max compression */
  ];
  function kt(l) {
    l.window_size = 2 * l.w_size, It(l.head), l.max_lazy_match = bt[l.level].max_lazy, l.good_match = bt[l.level].good_length, l.nice_match = bt[l.level].nice_length, l.max_chain_length = bt[l.level].max_chain, l.strstart = 0, l.block_start = 0, l.lookahead = 0, l.insert = 0, l.match_length = l.prev_length = W - 1, l.match_available = 0, l.ins_h = 0;
  }
  function g() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = $, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(nt * 2), this.dyn_dtree = new t.Buf16((2 * P + 1) * 2), this.bl_tree = new t.Buf16((2 * K + 1) * 2), It(this.dyn_ltree), It(this.dyn_dtree), It(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(ct + 1), this.heap = new t.Buf16(2 * U + 1), It(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * U + 1), It(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function B(l) {
    var D;
    return !l || !l.state ? it(l, d) : (l.total_in = l.total_out = 0, l.data_type = S, D = l.state, D.pending = 0, D.pending_out = 0, D.wrap < 0 && (D.wrap = -D.wrap), D.status = D.wrap ? Rt : Q, l.adler = D.wrap === 2 ? 0 : 1, D.last_flush = a, e._tr_init(D), u);
  }
  function C(l) {
    var D = B(l);
    return D === u && kt(l.state), D;
  }
  function G(l, D) {
    return !l || !l.state || l.state.wrap !== 2 ? d : (l.state.gzhead = D, u);
  }
  function v(l, D, O, p, w, N) {
    if (!l)
      return d;
    var et = 1;
    if (D === L && (D = 6), p < 0 ? (et = 0, p = -p) : p > 15 && (et = 2, p -= 16), w < 1 || w > T || O !== $ || p < 8 || p > 15 || D < 0 || D > 9 || N < 0 || N > k)
      return it(l, d);
    p === 8 && (p = 9);
    var X = new g();
    return l.state = X, X.strm = l, X.wrap = et, X.gzhead = null, X.w_bits = p, X.w_size = 1 << X.w_bits, X.w_mask = X.w_size - 1, X.hash_bits = w + 7, X.hash_size = 1 << X.hash_bits, X.hash_mask = X.hash_size - 1, X.hash_shift = ~~((X.hash_bits + W - 1) / W), X.window = new t.Buf8(X.w_size * 2), X.head = new t.Buf16(X.hash_size), X.prev = new t.Buf16(X.w_size), X.lit_bufsize = 1 << w + 6, X.pending_buf_size = X.lit_bufsize * 4, X.pending_buf = new t.Buf8(X.pending_buf_size), X.d_buf = 1 * X.lit_bufsize, X.l_buf = 3 * X.lit_bufsize, X.level = D, X.strategy = N, X.method = O, C(l);
  }
  function R(l, D) {
    return v(l, D, $, H, z, b);
  }
  function h(l, D) {
    var O, p, w, N;
    if (!l || !l.state || D > c || D < 0)
      return l ? it(l, d) : d;
    if (p = l.state, !l.output || !l.input && l.avail_in !== 0 || p.status === lt && D !== f)
      return it(l, l.avail_out === 0 ? x : d);
    if (p.strm = l, O = p.last_flush, p.last_flush = D, p.status === Rt)
      if (p.wrap === 2)
        l.adler = 0, Z(p, 31), Z(p, 139), Z(p, 8), p.gzhead ? (Z(
          p,
          (p.gzhead.text ? 1 : 0) + (p.gzhead.hcrc ? 2 : 0) + (p.gzhead.extra ? 4 : 0) + (p.gzhead.name ? 8 : 0) + (p.gzhead.comment ? 16 : 0)
        ), Z(p, p.gzhead.time & 255), Z(p, p.gzhead.time >> 8 & 255), Z(p, p.gzhead.time >> 16 & 255), Z(p, p.gzhead.time >> 24 & 255), Z(p, p.level === 9 ? 2 : p.strategy >= A || p.level < 2 ? 4 : 0), Z(p, p.gzhead.os & 255), p.gzhead.extra && p.gzhead.extra.length && (Z(p, p.gzhead.extra.length & 255), Z(p, p.gzhead.extra.length >> 8 & 255)), p.gzhead.hcrc && (l.adler = i(l.adler, p.pending_buf, p.pending, 0)), p.gzindex = 0, p.status = J) : (Z(p, 0), Z(p, 0), Z(p, 0), Z(p, 0), Z(p, 0), Z(p, p.level === 9 ? 2 : p.strategy >= A || p.level < 2 ? 4 : 0), Z(p, ot), p.status = Q);
      else {
        var et = $ + (p.w_bits - 8 << 4) << 8, X = -1;
        p.strategy >= A || p.level < 2 ? X = 0 : p.level < 6 ? X = 1 : p.level === 6 ? X = 2 : X = 3, et |= X << 6, p.strstart !== 0 && (et |= rt), et += 31 - et % 31, p.status = Q, xt(p, et), p.strstart !== 0 && (xt(p, l.adler >>> 16), xt(p, l.adler & 65535)), l.adler = 1;
      }
    if (p.status === J)
      if (p.gzhead.extra) {
        for (w = p.pending; p.gzindex < (p.gzhead.extra.length & 65535) && !(p.pending === p.pending_buf_size && (p.gzhead.hcrc && p.pending > w && (l.adler = i(l.adler, p.pending_buf, p.pending - w, w)), at(l), w = p.pending, p.pending === p.pending_buf_size)); )
          Z(p, p.gzhead.extra[p.gzindex] & 255), p.gzindex++;
        p.gzhead.hcrc && p.pending > w && (l.adler = i(l.adler, p.pending_buf, p.pending - w, w)), p.gzindex === p.gzhead.extra.length && (p.gzindex = 0, p.status = gt);
      } else
        p.status = gt;
    if (p.status === gt)
      if (p.gzhead.name) {
        w = p.pending;
        do {
          if (p.pending === p.pending_buf_size && (p.gzhead.hcrc && p.pending > w && (l.adler = i(l.adler, p.pending_buf, p.pending - w, w)), at(l), w = p.pending, p.pending === p.pending_buf_size)) {
            N = 1;
            break;
          }
          p.gzindex < p.gzhead.name.length ? N = p.gzhead.name.charCodeAt(p.gzindex++) & 255 : N = 0, Z(p, N);
        } while (N !== 0);
        p.gzhead.hcrc && p.pending > w && (l.adler = i(l.adler, p.pending_buf, p.pending - w, w)), N === 0 && (p.gzindex = 0, p.status = Et);
      } else
        p.status = Et;
    if (p.status === Et)
      if (p.gzhead.comment) {
        w = p.pending;
        do {
          if (p.pending === p.pending_buf_size && (p.gzhead.hcrc && p.pending > w && (l.adler = i(l.adler, p.pending_buf, p.pending - w, w)), at(l), w = p.pending, p.pending === p.pending_buf_size)) {
            N = 1;
            break;
          }
          p.gzindex < p.gzhead.comment.length ? N = p.gzhead.comment.charCodeAt(p.gzindex++) & 255 : N = 0, Z(p, N);
        } while (N !== 0);
        p.gzhead.hcrc && p.pending > w && (l.adler = i(l.adler, p.pending_buf, p.pending - w, w)), N === 0 && (p.status = dt);
      } else
        p.status = dt;
    if (p.status === dt && (p.gzhead.hcrc ? (p.pending + 2 > p.pending_buf_size && at(l), p.pending + 2 <= p.pending_buf_size && (Z(p, l.adler & 255), Z(p, l.adler >> 8 & 255), l.adler = 0, p.status = Q)) : p.status = Q), p.pending !== 0) {
      if (at(l), l.avail_out === 0)
        return p.last_flush = -1, u;
    } else if (l.avail_in === 0 && vt(D) <= vt(O) && D !== f)
      return it(l, x);
    if (p.status === lt && l.avail_in !== 0)
      return it(l, x);
    if (l.avail_in !== 0 || p.lookahead !== 0 || D !== a && p.status !== lt) {
      var Y = p.strategy === A ? q(p, D) : p.strategy === E ? Ft(p, D) : bt[p.level].func(p, D);
      if ((Y === Nt || Y === $t) && (p.status = lt), Y === ft || Y === Nt)
        return l.avail_out === 0 && (p.last_flush = -1), u;
      if (Y === Tt && (D === s ? e._tr_align(p) : D !== c && (e._tr_stored_block(p, 0, 0, !1), D === o && (It(p.head), p.lookahead === 0 && (p.strstart = 0, p.block_start = 0, p.insert = 0))), at(l), l.avail_out === 0))
        return p.last_flush = -1, u;
    }
    return D !== f ? u : p.wrap <= 0 ? m : (p.wrap === 2 ? (Z(p, l.adler & 255), Z(p, l.adler >> 8 & 255), Z(p, l.adler >> 16 & 255), Z(p, l.adler >> 24 & 255), Z(p, l.total_in & 255), Z(p, l.total_in >> 8 & 255), Z(p, l.total_in >> 16 & 255), Z(p, l.total_in >> 24 & 255)) : (xt(p, l.adler >>> 16), xt(p, l.adler & 65535)), at(l), p.wrap > 0 && (p.wrap = -p.wrap), p.pending !== 0 ? u : m);
  }
  function M(l) {
    var D;
    return !l || !l.state ? d : (D = l.state.status, D !== Rt && D !== J && D !== gt && D !== Et && D !== dt && D !== Q && D !== lt ? it(l, d) : (l.state = null, D === Q ? it(l, _) : u));
  }
  function tt(l, D) {
    var O = D.length, p, w, N, et, X, Y, mt, ae;
    if (!l || !l.state || (p = l.state, et = p.wrap, et === 2 || et === 1 && p.status !== Rt || p.lookahead))
      return d;
    for (et === 1 && (l.adler = n(l.adler, D, O, 0)), p.wrap = 0, O >= p.w_size && (et === 0 && (It(p.head), p.strstart = 0, p.block_start = 0, p.insert = 0), ae = new t.Buf8(p.w_size), t.arraySet(ae, D, O - p.w_size, p.w_size, 0), D = ae, O = p.w_size), X = l.avail_in, Y = l.next_in, mt = l.input, l.avail_in = O, l.next_in = 0, l.input = D, st(p); p.lookahead >= W; ) {
      w = p.strstart, N = p.lookahead - (W - 1);
      do
        p.ins_h = (p.ins_h << p.hash_shift ^ p.window[w + W - 1]) & p.hash_mask, p.prev[w & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = w, w++;
      while (--N);
      p.strstart = w, p.lookahead = W - 1, st(p);
    }
    return p.strstart += p.lookahead, p.block_start = p.strstart, p.insert = p.lookahead, p.lookahead = 0, p.match_length = p.prev_length = W - 1, p.match_available = 0, l.next_in = Y, l.input = mt, l.avail_in = X, p.wrap = et, u;
  }
  return Kt.deflateInit = R, Kt.deflateInit2 = v, Kt.deflateReset = C, Kt.deflateResetKeep = B, Kt.deflateSetHeader = G, Kt.deflate = h, Kt.deflateEnd = M, Kt.deflateSetDictionary = tt, Kt.deflateInfo = "pako deflate (from Nodeca project)", Kt;
}
var ge = {}, ba;
function no() {
  if (ba) return ge;
  ba = 1;
  var t = de(), e = !0, n = !0;
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
  i[254] = i[254] = 1, ge.string2buf = function(s) {
    var o, f, c, u, m, d = s.length, _ = 0;
    for (u = 0; u < d; u++)
      f = s.charCodeAt(u), (f & 64512) === 55296 && u + 1 < d && (c = s.charCodeAt(u + 1), (c & 64512) === 56320 && (f = 65536 + (f - 55296 << 10) + (c - 56320), u++)), _ += f < 128 ? 1 : f < 2048 ? 2 : f < 65536 ? 3 : 4;
    for (o = new t.Buf8(_), m = 0, u = 0; m < _; u++)
      f = s.charCodeAt(u), (f & 64512) === 55296 && u + 1 < d && (c = s.charCodeAt(u + 1), (c & 64512) === 56320 && (f = 65536 + (f - 55296 << 10) + (c - 56320), u++)), f < 128 ? o[m++] = f : f < 2048 ? (o[m++] = 192 | f >>> 6, o[m++] = 128 | f & 63) : f < 65536 ? (o[m++] = 224 | f >>> 12, o[m++] = 128 | f >>> 6 & 63, o[m++] = 128 | f & 63) : (o[m++] = 240 | f >>> 18, o[m++] = 128 | f >>> 12 & 63, o[m++] = 128 | f >>> 6 & 63, o[m++] = 128 | f & 63);
    return o;
  };
  function a(s, o) {
    if (o < 65534 && (s.subarray && n || !s.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(s, o));
    for (var f = "", c = 0; c < o; c++)
      f += String.fromCharCode(s[c]);
    return f;
  }
  return ge.buf2binstring = function(s) {
    return a(s, s.length);
  }, ge.binstring2buf = function(s) {
    for (var o = new t.Buf8(s.length), f = 0, c = o.length; f < c; f++)
      o[f] = s.charCodeAt(f);
    return o;
  }, ge.buf2string = function(s, o) {
    var f, c, u, m, d = o || s.length, _ = new Array(d * 2);
    for (c = 0, f = 0; f < d; ) {
      if (u = s[f++], u < 128) {
        _[c++] = u;
        continue;
      }
      if (m = i[u], m > 4) {
        _[c++] = 65533, f += m - 1;
        continue;
      }
      for (u &= m === 2 ? 31 : m === 3 ? 15 : 7; m > 1 && f < d; )
        u = u << 6 | s[f++] & 63, m--;
      if (m > 1) {
        _[c++] = 65533;
        continue;
      }
      u < 65536 ? _[c++] = u : (u -= 65536, _[c++] = 55296 | u >> 10 & 1023, _[c++] = 56320 | u & 1023);
    }
    return a(_, c);
  }, ge.utf8border = function(s, o) {
    var f;
    for (o = o || s.length, o > s.length && (o = s.length), f = o - 1; f >= 0 && (s[f] & 192) === 128; )
      f--;
    return f < 0 || f === 0 ? o : f + i[s[f]] > o ? f : o;
  }, ge;
}
var ci, xa;
function io() {
  if (xa) return ci;
  xa = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return ci = t, ci;
}
var ka;
function U0() {
  if (ka) return Ne;
  ka = 1;
  var t = V0(), e = de(), n = no(), i = ir(), r = io(), a = Object.prototype.toString, s = 0, o = 4, f = 0, c = 1, u = 2, m = -1, d = 0, _ = 8;
  function x(E) {
    if (!(this instanceof x)) return new x(E);
    this.options = e.assign({
      level: m,
      method: _,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: d,
      to: ""
    }, E || {});
    var k = this.options;
    k.raw && k.windowBits > 0 ? k.windowBits = -k.windowBits : k.gzip && k.windowBits > 0 && k.windowBits < 16 && (k.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new r(), this.strm.avail_out = 0;
    var b = t.deflateInit2(
      this.strm,
      k.level,
      k.method,
      k.windowBits,
      k.memLevel,
      k.strategy
    );
    if (b !== f)
      throw new Error(i[b]);
    if (k.header && t.deflateSetHeader(this.strm, k.header), k.dictionary) {
      var S;
      if (typeof k.dictionary == "string" ? S = n.string2buf(k.dictionary) : a.call(k.dictionary) === "[object ArrayBuffer]" ? S = new Uint8Array(k.dictionary) : S = k.dictionary, b = t.deflateSetDictionary(this.strm, S), b !== f)
        throw new Error(i[b]);
      this._dict_set = !0;
    }
  }
  x.prototype.push = function(E, k) {
    var b = this.strm, S = this.options.chunkSize, $, T;
    if (this.ended)
      return !1;
    T = k === ~~k ? k : k === !0 ? o : s, typeof E == "string" ? b.input = n.string2buf(E) : a.call(E) === "[object ArrayBuffer]" ? b.input = new Uint8Array(E) : b.input = E, b.next_in = 0, b.avail_in = b.input.length;
    do {
      if (b.avail_out === 0 && (b.output = new e.Buf8(S), b.next_out = 0, b.avail_out = S), $ = t.deflate(b, T), $ !== c && $ !== f)
        return this.onEnd($), this.ended = !0, !1;
      (b.avail_out === 0 || b.avail_in === 0 && (T === o || T === u)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(b.output, b.next_out))) : this.onData(e.shrinkBuf(b.output, b.next_out)));
    } while ((b.avail_in > 0 || b.avail_out === 0) && $ !== c);
    return T === o ? ($ = t.deflateEnd(this.strm), this.onEnd($), this.ended = !0, $ === f) : (T === u && (this.onEnd(f), b.avail_out = 0), !0);
  }, x.prototype.onData = function(E) {
    this.chunks.push(E);
  }, x.prototype.onEnd = function(E) {
    E === f && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = E, this.msg = this.strm.msg;
  };
  function L(E, k) {
    var b = new x(k);
    if (b.push(E, !0), b.err)
      throw b.msg || i[b.err];
    return b.result;
  }
  function I(E, k) {
    return k = k || {}, k.raw = !0, L(E, k);
  }
  function A(E, k) {
    return k = k || {}, k.gzip = !0, L(E, k);
  }
  return Ne.Deflate = x, Ne.deflate = L, Ne.deflateRaw = I, Ne.gzip = A, Ne;
}
var Ie = {}, Wt = {}, fi, Ta;
function Z0() {
  if (Ta) return fi;
  Ta = 1;
  var t = 30, e = 12;
  return fi = function(i, r) {
    var a, s, o, f, c, u, m, d, _, x, L, I, A, E, k, b, S, $, T, H, z, F, y, U, P;
    a = i.state, s = i.next_in, U = i.input, o = s + (i.avail_in - 5), f = i.next_out, P = i.output, c = f - (r - i.avail_out), u = f + (i.avail_out - 257), m = a.dmax, d = a.wsize, _ = a.whave, x = a.wnext, L = a.window, I = a.hold, A = a.bits, E = a.lencode, k = a.distcode, b = (1 << a.lenbits) - 1, S = (1 << a.distbits) - 1;
    t:
      do {
        A < 15 && (I += U[s++] << A, A += 8, I += U[s++] << A, A += 8), $ = E[I & b];
        e:
          for (; ; ) {
            if (T = $ >>> 24, I >>>= T, A -= T, T = $ >>> 16 & 255, T === 0)
              P[f++] = $ & 65535;
            else if (T & 16) {
              H = $ & 65535, T &= 15, T && (A < T && (I += U[s++] << A, A += 8), H += I & (1 << T) - 1, I >>>= T, A -= T), A < 15 && (I += U[s++] << A, A += 8, I += U[s++] << A, A += 8), $ = k[I & S];
              n:
                for (; ; ) {
                  if (T = $ >>> 24, I >>>= T, A -= T, T = $ >>> 16 & 255, T & 16) {
                    if (z = $ & 65535, T &= 15, A < T && (I += U[s++] << A, A += 8, A < T && (I += U[s++] << A, A += 8)), z += I & (1 << T) - 1, z > m) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break t;
                    }
                    if (I >>>= T, A -= T, T = f - c, z > T) {
                      if (T = z - T, T > _ && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break t;
                      }
                      if (F = 0, y = L, x === 0) {
                        if (F += d - T, T < H) {
                          H -= T;
                          do
                            P[f++] = L[F++];
                          while (--T);
                          F = f - z, y = P;
                        }
                      } else if (x < T) {
                        if (F += d + x - T, T -= x, T < H) {
                          H -= T;
                          do
                            P[f++] = L[F++];
                          while (--T);
                          if (F = 0, x < H) {
                            T = x, H -= T;
                            do
                              P[f++] = L[F++];
                            while (--T);
                            F = f - z, y = P;
                          }
                        }
                      } else if (F += x - T, T < H) {
                        H -= T;
                        do
                          P[f++] = L[F++];
                        while (--T);
                        F = f - z, y = P;
                      }
                      for (; H > 2; )
                        P[f++] = y[F++], P[f++] = y[F++], P[f++] = y[F++], H -= 3;
                      H && (P[f++] = y[F++], H > 1 && (P[f++] = y[F++]));
                    } else {
                      F = f - z;
                      do
                        P[f++] = P[F++], P[f++] = P[F++], P[f++] = P[F++], H -= 3;
                      while (H > 2);
                      H && (P[f++] = P[F++], H > 1 && (P[f++] = P[F++]));
                    }
                  } else if ((T & 64) === 0) {
                    $ = k[($ & 65535) + (I & (1 << T) - 1)];
                    continue n;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((T & 64) === 0) {
              $ = E[($ & 65535) + (I & (1 << T) - 1)];
              continue e;
            } else if (T & 32) {
              a.mode = e;
              break t;
            } else {
              i.msg = "invalid literal/length code", a.mode = t;
              break t;
            }
            break;
          }
      } while (s < o && f < u);
    H = A >> 3, s -= H, A -= H << 3, I &= (1 << A) - 1, i.next_in = s, i.next_out = f, i.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), i.avail_out = f < u ? 257 + (u - f) : 257 - (f - u), a.hold = I, a.bits = A;
  }, fi;
}
var ui, Ea;
function q0() {
  if (Ea) return ui;
  Ea = 1;
  var t = de(), e = 15, n = 852, i = 592, r = 0, a = 1, s = 2, o = [
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
  ], f = [
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
  ], c = [
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
  return ui = function(d, _, x, L, I, A, E, k) {
    var b = k.bits, S = 0, $ = 0, T = 0, H = 0, z = 0, F = 0, y = 0, U = 0, P = 0, K = 0, nt, ct, W, j, V, rt = null, Rt = 0, J, gt = new t.Buf16(e + 1), Et = new t.Buf16(e + 1), dt = null, Q = 0, lt, ft, Tt;
    for (S = 0; S <= e; S++)
      gt[S] = 0;
    for ($ = 0; $ < L; $++)
      gt[_[x + $]]++;
    for (z = b, H = e; H >= 1 && gt[H] === 0; H--)
      ;
    if (z > H && (z = H), H === 0)
      return I[A++] = 1 << 24 | 64 << 16 | 0, I[A++] = 1 << 24 | 64 << 16 | 0, k.bits = 1, 0;
    for (T = 1; T < H && gt[T] === 0; T++)
      ;
    for (z < T && (z = T), U = 1, S = 1; S <= e; S++)
      if (U <<= 1, U -= gt[S], U < 0)
        return -1;
    if (U > 0 && (d === r || H !== 1))
      return -1;
    for (Et[1] = 0, S = 1; S < e; S++)
      Et[S + 1] = Et[S] + gt[S];
    for ($ = 0; $ < L; $++)
      _[x + $] !== 0 && (E[Et[_[x + $]]++] = $);
    if (d === r ? (rt = dt = E, J = 19) : d === a ? (rt = o, Rt -= 257, dt = f, Q -= 257, J = 256) : (rt = c, dt = u, J = -1), K = 0, $ = 0, S = T, V = A, F = z, y = 0, W = -1, P = 1 << z, j = P - 1, d === a && P > n || d === s && P > i)
      return 1;
    for (; ; ) {
      lt = S - y, E[$] < J ? (ft = 0, Tt = E[$]) : E[$] > J ? (ft = dt[Q + E[$]], Tt = rt[Rt + E[$]]) : (ft = 96, Tt = 0), nt = 1 << S - y, ct = 1 << F, T = ct;
      do
        ct -= nt, I[V + (K >> y) + ct] = lt << 24 | ft << 16 | Tt | 0;
      while (ct !== 0);
      for (nt = 1 << S - 1; K & nt; )
        nt >>= 1;
      if (nt !== 0 ? (K &= nt - 1, K += nt) : K = 0, $++, --gt[S] === 0) {
        if (S === H)
          break;
        S = _[x + E[$]];
      }
      if (S > z && (K & j) !== W) {
        for (y === 0 && (y = z), V += T, F = S - y, U = 1 << F; F + y < H && (U -= gt[F + y], !(U <= 0)); )
          F++, U <<= 1;
        if (P += 1 << F, d === a && P > n || d === s && P > i)
          return 1;
        W = K & j, I[W] = z << 24 | F << 16 | V - A | 0;
      }
    }
    return K !== 0 && (I[V + K] = S - y << 24 | 64 << 16 | 0), k.bits = z, 0;
  }, ui;
}
var Sa;
function G0() {
  if (Sa) return Wt;
  Sa = 1;
  var t = de(), e = to(), n = eo(), i = Z0(), r = q0(), a = 0, s = 1, o = 2, f = 4, c = 5, u = 6, m = 0, d = 1, _ = 2, x = -2, L = -3, I = -4, A = -5, E = 8, k = 1, b = 2, S = 3, $ = 4, T = 5, H = 6, z = 7, F = 8, y = 9, U = 10, P = 11, K = 12, nt = 13, ct = 14, W = 15, j = 16, V = 17, rt = 18, Rt = 19, J = 20, gt = 21, Et = 22, dt = 23, Q = 24, lt = 25, ft = 26, Tt = 27, Nt = 28, $t = 29, ot = 30, it = 31, vt = 32, It = 852, at = 592, _t = 15, Z = _t;
  function xt(v) {
    return (v >>> 24 & 255) + (v >>> 8 & 65280) + ((v & 65280) << 8) + ((v & 255) << 24);
  }
  function St() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function Bt(v) {
    var R;
    return !v || !v.state ? x : (R = v.state, v.total_in = v.total_out = R.total = 0, v.msg = "", R.wrap && (v.adler = R.wrap & 1), R.mode = k, R.last = 0, R.havedict = 0, R.dmax = 32768, R.head = null, R.hold = 0, R.bits = 0, R.lencode = R.lendyn = new t.Buf32(It), R.distcode = R.distdyn = new t.Buf32(at), R.sane = 1, R.back = -1, m);
  }
  function st(v) {
    var R;
    return !v || !v.state ? x : (R = v.state, R.wsize = 0, R.whave = 0, R.wnext = 0, Bt(v));
  }
  function pt(v, R) {
    var h, M;
    return !v || !v.state || (M = v.state, R < 0 ? (h = 0, R = -R) : (h = (R >> 4) + 1, R < 48 && (R &= 15)), R && (R < 8 || R > 15)) ? x : (M.window !== null && M.wbits !== R && (M.window = null), M.wrap = h, M.wbits = R, st(v));
  }
  function ht(v, R) {
    var h, M;
    return v ? (M = new St(), v.state = M, M.window = null, h = pt(v, R), h !== m && (v.state = null), h) : x;
  }
  function ut(v) {
    return ht(v, Z);
  }
  var Ft = !0, q, yt;
  function bt(v) {
    if (Ft) {
      var R;
      for (q = new t.Buf32(512), yt = new t.Buf32(32), R = 0; R < 144; )
        v.lens[R++] = 8;
      for (; R < 256; )
        v.lens[R++] = 9;
      for (; R < 280; )
        v.lens[R++] = 7;
      for (; R < 288; )
        v.lens[R++] = 8;
      for (r(s, v.lens, 0, 288, q, 0, v.work, { bits: 9 }), R = 0; R < 32; )
        v.lens[R++] = 5;
      r(o, v.lens, 0, 32, yt, 0, v.work, { bits: 5 }), Ft = !1;
    }
    v.lencode = q, v.lenbits = 9, v.distcode = yt, v.distbits = 5;
  }
  function kt(v, R, h, M) {
    var tt, l = v.state;
    return l.window === null && (l.wsize = 1 << l.wbits, l.wnext = 0, l.whave = 0, l.window = new t.Buf8(l.wsize)), M >= l.wsize ? (t.arraySet(l.window, R, h - l.wsize, l.wsize, 0), l.wnext = 0, l.whave = l.wsize) : (tt = l.wsize - l.wnext, tt > M && (tt = M), t.arraySet(l.window, R, h - M, tt, l.wnext), M -= tt, M ? (t.arraySet(l.window, R, h - M, M, 0), l.wnext = M, l.whave = l.wsize) : (l.wnext += tt, l.wnext === l.wsize && (l.wnext = 0), l.whave < l.wsize && (l.whave += tt))), 0;
  }
  function g(v, R) {
    var h, M, tt, l, D, O, p, w, N, et, X, Y, mt, ae, Mt = 0, wt, zt, Pt, Ut, nn, rn, Lt, Gt, Ht = new t.Buf8(4), se, ee, sr = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!v || !v.state || !v.output || !v.input && v.avail_in !== 0)
      return x;
    h = v.state, h.mode === K && (h.mode = nt), D = v.next_out, tt = v.output, p = v.avail_out, l = v.next_in, M = v.input, O = v.avail_in, w = h.hold, N = h.bits, et = O, X = p, Gt = m;
    t:
      for (; ; )
        switch (h.mode) {
          case k:
            if (h.wrap === 0) {
              h.mode = nt;
              break;
            }
            for (; N < 16; ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            if (h.wrap & 2 && w === 35615) {
              h.check = 0, Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, h.check = n(h.check, Ht, 2, 0), w = 0, N = 0, h.mode = b;
              break;
            }
            if (h.flags = 0, h.head && (h.head.done = !1), !(h.wrap & 1) || /* check if zlib header allowed */
            (((w & 255) << 8) + (w >> 8)) % 31) {
              v.msg = "incorrect header check", h.mode = ot;
              break;
            }
            if ((w & 15) !== E) {
              v.msg = "unknown compression method", h.mode = ot;
              break;
            }
            if (w >>>= 4, N -= 4, Lt = (w & 15) + 8, h.wbits === 0)
              h.wbits = Lt;
            else if (Lt > h.wbits) {
              v.msg = "invalid window size", h.mode = ot;
              break;
            }
            h.dmax = 1 << Lt, v.adler = h.check = 1, h.mode = w & 512 ? U : K, w = 0, N = 0;
            break;
          case b:
            for (; N < 16; ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            if (h.flags = w, (h.flags & 255) !== E) {
              v.msg = "unknown compression method", h.mode = ot;
              break;
            }
            if (h.flags & 57344) {
              v.msg = "unknown header flags set", h.mode = ot;
              break;
            }
            h.head && (h.head.text = w >> 8 & 1), h.flags & 512 && (Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, h.check = n(h.check, Ht, 2, 0)), w = 0, N = 0, h.mode = S;
          /* falls through */
          case S:
            for (; N < 32; ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            h.head && (h.head.time = w), h.flags & 512 && (Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, Ht[2] = w >>> 16 & 255, Ht[3] = w >>> 24 & 255, h.check = n(h.check, Ht, 4, 0)), w = 0, N = 0, h.mode = $;
          /* falls through */
          case $:
            for (; N < 16; ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            h.head && (h.head.xflags = w & 255, h.head.os = w >> 8), h.flags & 512 && (Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, h.check = n(h.check, Ht, 2, 0)), w = 0, N = 0, h.mode = T;
          /* falls through */
          case T:
            if (h.flags & 1024) {
              for (; N < 16; ) {
                if (O === 0)
                  break t;
                O--, w += M[l++] << N, N += 8;
              }
              h.length = w, h.head && (h.head.extra_len = w), h.flags & 512 && (Ht[0] = w & 255, Ht[1] = w >>> 8 & 255, h.check = n(h.check, Ht, 2, 0)), w = 0, N = 0;
            } else h.head && (h.head.extra = null);
            h.mode = H;
          /* falls through */
          case H:
            if (h.flags & 1024 && (Y = h.length, Y > O && (Y = O), Y && (h.head && (Lt = h.head.extra_len - h.length, h.head.extra || (h.head.extra = new Array(h.head.extra_len)), t.arraySet(
              h.head.extra,
              M,
              l,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              Y,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Lt
            )), h.flags & 512 && (h.check = n(h.check, M, Y, l)), O -= Y, l += Y, h.length -= Y), h.length))
              break t;
            h.length = 0, h.mode = z;
          /* falls through */
          case z:
            if (h.flags & 2048) {
              if (O === 0)
                break t;
              Y = 0;
              do
                Lt = M[l + Y++], h.head && Lt && h.length < 65536 && (h.head.name += String.fromCharCode(Lt));
              while (Lt && Y < O);
              if (h.flags & 512 && (h.check = n(h.check, M, Y, l)), O -= Y, l += Y, Lt)
                break t;
            } else h.head && (h.head.name = null);
            h.length = 0, h.mode = F;
          /* falls through */
          case F:
            if (h.flags & 4096) {
              if (O === 0)
                break t;
              Y = 0;
              do
                Lt = M[l + Y++], h.head && Lt && h.length < 65536 && (h.head.comment += String.fromCharCode(Lt));
              while (Lt && Y < O);
              if (h.flags & 512 && (h.check = n(h.check, M, Y, l)), O -= Y, l += Y, Lt)
                break t;
            } else h.head && (h.head.comment = null);
            h.mode = y;
          /* falls through */
          case y:
            if (h.flags & 512) {
              for (; N < 16; ) {
                if (O === 0)
                  break t;
                O--, w += M[l++] << N, N += 8;
              }
              if (w !== (h.check & 65535)) {
                v.msg = "header crc mismatch", h.mode = ot;
                break;
              }
              w = 0, N = 0;
            }
            h.head && (h.head.hcrc = h.flags >> 9 & 1, h.head.done = !0), v.adler = h.check = 0, h.mode = K;
            break;
          case U:
            for (; N < 32; ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            v.adler = h.check = xt(w), w = 0, N = 0, h.mode = P;
          /* falls through */
          case P:
            if (h.havedict === 0)
              return v.next_out = D, v.avail_out = p, v.next_in = l, v.avail_in = O, h.hold = w, h.bits = N, _;
            v.adler = h.check = 1, h.mode = K;
          /* falls through */
          case K:
            if (R === c || R === u)
              break t;
          /* falls through */
          case nt:
            if (h.last) {
              w >>>= N & 7, N -= N & 7, h.mode = Tt;
              break;
            }
            for (; N < 3; ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            switch (h.last = w & 1, w >>>= 1, N -= 1, w & 3) {
              case 0:
                h.mode = ct;
                break;
              case 1:
                if (bt(h), h.mode = J, R === u) {
                  w >>>= 2, N -= 2;
                  break t;
                }
                break;
              case 2:
                h.mode = V;
                break;
              case 3:
                v.msg = "invalid block type", h.mode = ot;
            }
            w >>>= 2, N -= 2;
            break;
          case ct:
            for (w >>>= N & 7, N -= N & 7; N < 32; ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            if ((w & 65535) !== (w >>> 16 ^ 65535)) {
              v.msg = "invalid stored block lengths", h.mode = ot;
              break;
            }
            if (h.length = w & 65535, w = 0, N = 0, h.mode = W, R === u)
              break t;
          /* falls through */
          case W:
            h.mode = j;
          /* falls through */
          case j:
            if (Y = h.length, Y) {
              if (Y > O && (Y = O), Y > p && (Y = p), Y === 0)
                break t;
              t.arraySet(tt, M, l, Y, D), O -= Y, l += Y, p -= Y, D += Y, h.length -= Y;
              break;
            }
            h.mode = K;
            break;
          case V:
            for (; N < 14; ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            if (h.nlen = (w & 31) + 257, w >>>= 5, N -= 5, h.ndist = (w & 31) + 1, w >>>= 5, N -= 5, h.ncode = (w & 15) + 4, w >>>= 4, N -= 4, h.nlen > 286 || h.ndist > 30) {
              v.msg = "too many length or distance symbols", h.mode = ot;
              break;
            }
            h.have = 0, h.mode = rt;
          /* falls through */
          case rt:
            for (; h.have < h.ncode; ) {
              for (; N < 3; ) {
                if (O === 0)
                  break t;
                O--, w += M[l++] << N, N += 8;
              }
              h.lens[sr[h.have++]] = w & 7, w >>>= 3, N -= 3;
            }
            for (; h.have < 19; )
              h.lens[sr[h.have++]] = 0;
            if (h.lencode = h.lendyn, h.lenbits = 7, se = { bits: h.lenbits }, Gt = r(a, h.lens, 0, 19, h.lencode, 0, h.work, se), h.lenbits = se.bits, Gt) {
              v.msg = "invalid code lengths set", h.mode = ot;
              break;
            }
            h.have = 0, h.mode = Rt;
          /* falls through */
          case Rt:
            for (; h.have < h.nlen + h.ndist; ) {
              for (; Mt = h.lencode[w & (1 << h.lenbits) - 1], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(wt <= N); ) {
                if (O === 0)
                  break t;
                O--, w += M[l++] << N, N += 8;
              }
              if (Pt < 16)
                w >>>= wt, N -= wt, h.lens[h.have++] = Pt;
              else {
                if (Pt === 16) {
                  for (ee = wt + 2; N < ee; ) {
                    if (O === 0)
                      break t;
                    O--, w += M[l++] << N, N += 8;
                  }
                  if (w >>>= wt, N -= wt, h.have === 0) {
                    v.msg = "invalid bit length repeat", h.mode = ot;
                    break;
                  }
                  Lt = h.lens[h.have - 1], Y = 3 + (w & 3), w >>>= 2, N -= 2;
                } else if (Pt === 17) {
                  for (ee = wt + 3; N < ee; ) {
                    if (O === 0)
                      break t;
                    O--, w += M[l++] << N, N += 8;
                  }
                  w >>>= wt, N -= wt, Lt = 0, Y = 3 + (w & 7), w >>>= 3, N -= 3;
                } else {
                  for (ee = wt + 7; N < ee; ) {
                    if (O === 0)
                      break t;
                    O--, w += M[l++] << N, N += 8;
                  }
                  w >>>= wt, N -= wt, Lt = 0, Y = 11 + (w & 127), w >>>= 7, N -= 7;
                }
                if (h.have + Y > h.nlen + h.ndist) {
                  v.msg = "invalid bit length repeat", h.mode = ot;
                  break;
                }
                for (; Y--; )
                  h.lens[h.have++] = Lt;
              }
            }
            if (h.mode === ot)
              break;
            if (h.lens[256] === 0) {
              v.msg = "invalid code -- missing end-of-block", h.mode = ot;
              break;
            }
            if (h.lenbits = 9, se = { bits: h.lenbits }, Gt = r(s, h.lens, 0, h.nlen, h.lencode, 0, h.work, se), h.lenbits = se.bits, Gt) {
              v.msg = "invalid literal/lengths set", h.mode = ot;
              break;
            }
            if (h.distbits = 6, h.distcode = h.distdyn, se = { bits: h.distbits }, Gt = r(o, h.lens, h.nlen, h.ndist, h.distcode, 0, h.work, se), h.distbits = se.bits, Gt) {
              v.msg = "invalid distances set", h.mode = ot;
              break;
            }
            if (h.mode = J, R === u)
              break t;
          /* falls through */
          case J:
            h.mode = gt;
          /* falls through */
          case gt:
            if (O >= 6 && p >= 258) {
              v.next_out = D, v.avail_out = p, v.next_in = l, v.avail_in = O, h.hold = w, h.bits = N, i(v, X), D = v.next_out, tt = v.output, p = v.avail_out, l = v.next_in, M = v.input, O = v.avail_in, w = h.hold, N = h.bits, h.mode === K && (h.back = -1);
              break;
            }
            for (h.back = 0; Mt = h.lencode[w & (1 << h.lenbits) - 1], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(wt <= N); ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            if (zt && (zt & 240) === 0) {
              for (Ut = wt, nn = zt, rn = Pt; Mt = h.lencode[rn + ((w & (1 << Ut + nn) - 1) >> Ut)], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(Ut + wt <= N); ) {
                if (O === 0)
                  break t;
                O--, w += M[l++] << N, N += 8;
              }
              w >>>= Ut, N -= Ut, h.back += Ut;
            }
            if (w >>>= wt, N -= wt, h.back += wt, h.length = Pt, zt === 0) {
              h.mode = ft;
              break;
            }
            if (zt & 32) {
              h.back = -1, h.mode = K;
              break;
            }
            if (zt & 64) {
              v.msg = "invalid literal/length code", h.mode = ot;
              break;
            }
            h.extra = zt & 15, h.mode = Et;
          /* falls through */
          case Et:
            if (h.extra) {
              for (ee = h.extra; N < ee; ) {
                if (O === 0)
                  break t;
                O--, w += M[l++] << N, N += 8;
              }
              h.length += w & (1 << h.extra) - 1, w >>>= h.extra, N -= h.extra, h.back += h.extra;
            }
            h.was = h.length, h.mode = dt;
          /* falls through */
          case dt:
            for (; Mt = h.distcode[w & (1 << h.distbits) - 1], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(wt <= N); ) {
              if (O === 0)
                break t;
              O--, w += M[l++] << N, N += 8;
            }
            if ((zt & 240) === 0) {
              for (Ut = wt, nn = zt, rn = Pt; Mt = h.distcode[rn + ((w & (1 << Ut + nn) - 1) >> Ut)], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(Ut + wt <= N); ) {
                if (O === 0)
                  break t;
                O--, w += M[l++] << N, N += 8;
              }
              w >>>= Ut, N -= Ut, h.back += Ut;
            }
            if (w >>>= wt, N -= wt, h.back += wt, zt & 64) {
              v.msg = "invalid distance code", h.mode = ot;
              break;
            }
            h.offset = Pt, h.extra = zt & 15, h.mode = Q;
          /* falls through */
          case Q:
            if (h.extra) {
              for (ee = h.extra; N < ee; ) {
                if (O === 0)
                  break t;
                O--, w += M[l++] << N, N += 8;
              }
              h.offset += w & (1 << h.extra) - 1, w >>>= h.extra, N -= h.extra, h.back += h.extra;
            }
            if (h.offset > h.dmax) {
              v.msg = "invalid distance too far back", h.mode = ot;
              break;
            }
            h.mode = lt;
          /* falls through */
          case lt:
            if (p === 0)
              break t;
            if (Y = X - p, h.offset > Y) {
              if (Y = h.offset - Y, Y > h.whave && h.sane) {
                v.msg = "invalid distance too far back", h.mode = ot;
                break;
              }
              Y > h.wnext ? (Y -= h.wnext, mt = h.wsize - Y) : mt = h.wnext - Y, Y > h.length && (Y = h.length), ae = h.window;
            } else
              ae = tt, mt = D - h.offset, Y = h.length;
            Y > p && (Y = p), p -= Y, h.length -= Y;
            do
              tt[D++] = ae[mt++];
            while (--Y);
            h.length === 0 && (h.mode = gt);
            break;
          case ft:
            if (p === 0)
              break t;
            tt[D++] = h.length, p--, h.mode = gt;
            break;
          case Tt:
            if (h.wrap) {
              for (; N < 32; ) {
                if (O === 0)
                  break t;
                O--, w |= M[l++] << N, N += 8;
              }
              if (X -= p, v.total_out += X, h.total += X, X && (v.adler = h.check = /*UPDATE(state.check, put - _out, _out);*/
              h.flags ? n(h.check, tt, X, D - X) : e(h.check, tt, X, D - X)), X = p, (h.flags ? w : xt(w)) !== h.check) {
                v.msg = "incorrect data check", h.mode = ot;
                break;
              }
              w = 0, N = 0;
            }
            h.mode = Nt;
          /* falls through */
          case Nt:
            if (h.wrap && h.flags) {
              for (; N < 32; ) {
                if (O === 0)
                  break t;
                O--, w += M[l++] << N, N += 8;
              }
              if (w !== (h.total & 4294967295)) {
                v.msg = "incorrect length check", h.mode = ot;
                break;
              }
              w = 0, N = 0;
            }
            h.mode = $t;
          /* falls through */
          case $t:
            Gt = d;
            break t;
          case ot:
            Gt = L;
            break t;
          case it:
            return I;
          case vt:
          /* falls through */
          default:
            return x;
        }
    return v.next_out = D, v.avail_out = p, v.next_in = l, v.avail_in = O, h.hold = w, h.bits = N, (h.wsize || X !== v.avail_out && h.mode < ot && (h.mode < Tt || R !== f)) && kt(v, v.output, v.next_out, X - v.avail_out), et -= v.avail_in, X -= v.avail_out, v.total_in += et, v.total_out += X, h.total += X, h.wrap && X && (v.adler = h.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    h.flags ? n(h.check, tt, X, v.next_out - X) : e(h.check, tt, X, v.next_out - X)), v.data_type = h.bits + (h.last ? 64 : 0) + (h.mode === K ? 128 : 0) + (h.mode === J || h.mode === W ? 256 : 0), (et === 0 && X === 0 || R === f) && Gt === m && (Gt = A), Gt;
  }
  function B(v) {
    if (!v || !v.state)
      return x;
    var R = v.state;
    return R.window && (R.window = null), v.state = null, m;
  }
  function C(v, R) {
    var h;
    return !v || !v.state || (h = v.state, (h.wrap & 2) === 0) ? x : (h.head = R, R.done = !1, m);
  }
  function G(v, R) {
    var h = R.length, M, tt, l;
    return !v || !v.state || (M = v.state, M.wrap !== 0 && M.mode !== P) ? x : M.mode === P && (tt = 1, tt = e(tt, R, h, 0), tt !== M.check) ? L : (l = kt(v, R, h, h), l ? (M.mode = it, I) : (M.havedict = 1, m));
  }
  return Wt.inflateReset = st, Wt.inflateReset2 = pt, Wt.inflateResetKeep = Bt, Wt.inflateInit = ut, Wt.inflateInit2 = ht, Wt.inflate = g, Wt.inflateEnd = B, Wt.inflateGetHeader = C, Wt.inflateSetDictionary = G, Wt.inflateInfo = "pako inflate (from Nodeca project)", Wt;
}
var hi, Aa;
function ro() {
  return Aa || (Aa = 1, hi = {
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
  }), hi;
}
var di, $a;
function W0() {
  if ($a) return di;
  $a = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return di = t, di;
}
var Na;
function X0() {
  if (Na) return Ie;
  Na = 1;
  var t = G0(), e = de(), n = no(), i = ro(), r = ir(), a = io(), s = W0(), o = Object.prototype.toString;
  function f(m) {
    if (!(this instanceof f)) return new f(m);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, m || {});
    var d = this.options;
    d.raw && d.windowBits >= 0 && d.windowBits < 16 && (d.windowBits = -d.windowBits, d.windowBits === 0 && (d.windowBits = -15)), d.windowBits >= 0 && d.windowBits < 16 && !(m && m.windowBits) && (d.windowBits += 32), d.windowBits > 15 && d.windowBits < 48 && (d.windowBits & 15) === 0 && (d.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var _ = t.inflateInit2(
      this.strm,
      d.windowBits
    );
    if (_ !== i.Z_OK)
      throw new Error(r[_]);
    if (this.header = new s(), t.inflateGetHeader(this.strm, this.header), d.dictionary && (typeof d.dictionary == "string" ? d.dictionary = n.string2buf(d.dictionary) : o.call(d.dictionary) === "[object ArrayBuffer]" && (d.dictionary = new Uint8Array(d.dictionary)), d.raw && (_ = t.inflateSetDictionary(this.strm, d.dictionary), _ !== i.Z_OK)))
      throw new Error(r[_]);
  }
  f.prototype.push = function(m, d) {
    var _ = this.strm, x = this.options.chunkSize, L = this.options.dictionary, I, A, E, k, b, S = !1;
    if (this.ended)
      return !1;
    A = d === ~~d ? d : d === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof m == "string" ? _.input = n.binstring2buf(m) : o.call(m) === "[object ArrayBuffer]" ? _.input = new Uint8Array(m) : _.input = m, _.next_in = 0, _.avail_in = _.input.length;
    do {
      if (_.avail_out === 0 && (_.output = new e.Buf8(x), _.next_out = 0, _.avail_out = x), I = t.inflate(_, i.Z_NO_FLUSH), I === i.Z_NEED_DICT && L && (I = t.inflateSetDictionary(this.strm, L)), I === i.Z_BUF_ERROR && S === !0 && (I = i.Z_OK, S = !1), I !== i.Z_STREAM_END && I !== i.Z_OK)
        return this.onEnd(I), this.ended = !0, !1;
      _.next_out && (_.avail_out === 0 || I === i.Z_STREAM_END || _.avail_in === 0 && (A === i.Z_FINISH || A === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (E = n.utf8border(_.output, _.next_out), k = _.next_out - E, b = n.buf2string(_.output, E), _.next_out = k, _.avail_out = x - k, k && e.arraySet(_.output, _.output, E, k, 0), this.onData(b)) : this.onData(e.shrinkBuf(_.output, _.next_out))), _.avail_in === 0 && _.avail_out === 0 && (S = !0);
    } while ((_.avail_in > 0 || _.avail_out === 0) && I !== i.Z_STREAM_END);
    return I === i.Z_STREAM_END && (A = i.Z_FINISH), A === i.Z_FINISH ? (I = t.inflateEnd(this.strm), this.onEnd(I), this.ended = !0, I === i.Z_OK) : (A === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), _.avail_out = 0), !0);
  }, f.prototype.onData = function(m) {
    this.chunks.push(m);
  }, f.prototype.onEnd = function(m) {
    m === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg;
  };
  function c(m, d) {
    var _ = new f(d);
    if (_.push(m, !0), _.err)
      throw _.msg || r[_.err];
    return _.result;
  }
  function u(m, d) {
    return d = d || {}, d.raw = !0, c(m, d);
  }
  return Ie.Inflate = f, Ie.inflate = c, Ie.inflateRaw = u, Ie.ungzip = c, Ie;
}
var pi, Ia;
function Y0() {
  if (Ia) return pi;
  Ia = 1;
  var t = de().assign, e = U0(), n = X0(), i = ro(), r = {};
  return t(r, e, n, i), pi = r, pi;
}
var K0 = Y0();
const J0 = /* @__PURE__ */ tr(K0);
function Q0(t) {
  let e = 0;
  for (const n of t)
    e += n.length;
  return e;
}
function ao(t) {
  const e = new Uint8Array(Q0(t));
  let n = 0;
  for (const i of t)
    e.set(i, n), n += i.length;
  return e;
}
const { Z_SYNC_FLUSH: so, Inflate: oo } = J0;
async function rr(t) {
  try {
    let e, n = 0, i;
    const r = [];
    do {
      const a = t.subarray(n);
      if (i = new oo(), { strm: e } = i, i.push(a, so), i.err)
        throw new Error(i.msg);
      n += e.next_in, r.push(i.result);
    } while (e.avail_in);
    return ao(r);
  } catch (e) {
    throw /incorrect header check/.exec(`${e}`) ? new Error("problem decompressing block: incorrect gzip header check") : e;
  }
}
async function j0(t, e) {
  try {
    let n;
    const { minv: i, maxv: r } = e;
    let a = i.blockPosition, s = i.dataPosition;
    const o = [], f = [], c = [];
    let u = 0;
    do {
      const m = t.subarray(a - i.blockPosition), d = new oo();
      if ({ strm: n } = d, d.push(m, so), d.err)
        throw new Error(d.msg);
      const _ = d.result;
      o.push(_);
      let x = _.length;
      f.push(a), c.push(s), o.length === 1 && i.dataPosition && (o[0] = o[0].subarray(i.dataPosition), x = o[0].length);
      const L = a;
      if (a += n.next_in, s += x, L >= r.blockPosition) {
        o[u] = o[u].subarray(0, r.blockPosition === i.blockPosition ? r.dataPosition - i.dataPosition + 1 : r.dataPosition + 1), f.push(a), c.push(s);
        break;
      }
      u++;
    } while (n.avail_in);
    return {
      buffer: ao(o),
      cpositions: f,
      dpositions: c
    };
  } catch (n) {
    throw /incorrect header check/.exec(`${n}`) ? new Error("problem decompressing block: incorrect gzip header check") : n;
  }
}
class Bn {
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
class lo {
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
const Da = 65536, tp = Da * Da;
function co(t, e = 0) {
  const n = t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24;
  return ((t[e + 4] | t[e + 5] << 8 | t[e + 6] << 16 | t[e + 7] << 24) >>> 0) * tp + (n >>> 0);
}
class ep extends Error {
}
function We(t) {
  if (t && t.aborted) {
    if (typeof DOMException < "u")
      throw new DOMException("aborted", "AbortError");
    {
      const e = new ep("aborted");
      throw e.code = "ERR_ABORTED", e;
    }
  }
}
function np(t, e) {
  return e.minv.blockPosition - t.maxv.blockPosition < 65e3 && e.maxv.blockPosition - t.minv.blockPosition < 5e6;
}
function fo(t, e) {
  const n = [];
  let i = null;
  return t.length === 0 ? t : (t.sort(function(r, a) {
    const s = r.minv.blockPosition - a.minv.blockPosition;
    return s !== 0 ? s : r.minv.dataPosition - a.minv.dataPosition;
  }), t.forEach((r) => {
    (!e || r.maxv.compareTo(e) > 0) && (i === null ? (n.push(r), i = r) : np(i, r) ? r.maxv.compareTo(i.maxv) > 0 && (i.maxv = r.maxv) : (n.push(r), i = r));
  }), n);
}
class ar {
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
function Oe(t, e = 0) {
  return new ar(t[e + 7] * 1099511627776 + t[e + 6] * 4294967296 + t[e + 5] * 16777216 + t[e + 4] * 65536 + t[e + 3] * 256 + t[e + 2], t[e + 1] << 8 | t[e]);
}
const ip = 21582659, rp = 38359875, ap = {
  0: "generic",
  1: "SAM",
  2: "VCF"
};
function sp(t, e) {
  return t * 2 ** e;
}
function Ra(t, e) {
  return Math.floor(t / 2 ** e);
}
class _i extends lo {
  constructor(e) {
    super(e), this.maxBinNumber = 0, this.depth = 0, this.minShift = 0;
  }
  async lineCount(e, n = {}) {
    const i = await this.parse(n), r = i.refNameToId[e];
    if (r === void 0 || !i.indices[r])
      return -1;
    const { stats: s } = i.indices[r];
    return s ? s.lineCount : -1;
  }
  indexCov() {
    throw new Error("CSI indexes do not support indexcov");
  }
  parseAuxData(e, n) {
    const i = new DataView(e.buffer), r = i.getInt32(n, !0), a = r & 65536 ? "zero-based-half-open" : "1-based-closed", s = ap[r & 15];
    if (!s)
      throw new Error(`invalid Tabix preset format flags ${r}`);
    const o = {
      ref: i.getInt32(n + 4, !0),
      start: i.getInt32(n + 8, !0),
      end: i.getInt32(n + 12, !0)
    }, f = i.getInt32(n + 16, !0), c = f ? String.fromCharCode(f) : null, u = i.getInt32(n + 20, !0), m = i.getInt32(n + 24, !0), { refIdToName: d, refNameToId: _ } = this._parseNameBytes(e.subarray(n + 28, n + 28 + m));
    return {
      refIdToName: d,
      refNameToId: _,
      skipLines: u,
      metaChar: c,
      columnNumbers: o,
      format: s,
      coordinateType: a
    };
  }
  _parseNameBytes(e) {
    let n = 0, i = 0;
    const r = [], a = {}, s = new TextDecoder("utf8");
    for (let o = 0; o < e.length; o += 1)
      if (!e[o]) {
        if (i < o) {
          const f = this.renameRefSeq(s.decode(e.subarray(i, o)));
          r[n] = f, a[f] = n;
        }
        i = o + 1, n += 1;
      }
    return {
      refNameToId: a,
      refIdToName: r
    };
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await rr(await this.filehandle.readFile(e)), i = new DataView(n.buffer);
    let r;
    if (i.getUint32(0, !0) === ip)
      r = 1;
    else if (i.getUint32(0, !0) === rp)
      r = 2;
    else
      throw new Error("Not a CSI file");
    this.minShift = i.getInt32(4, !0), this.depth = i.getInt32(8, !0), this.maxBinNumber = ((1 << (this.depth + 1) * 3) - 1) / 7;
    const a = 2 ** (this.minShift + this.depth * 3), s = i.getInt32(12, !0), o = s && s >= 30 ? this.parseAuxData(n, 16) : {
      refIdToName: [],
      refNameToId: {},
      metaChar: null,
      columnNumbers: { ref: 0, start: 1, end: 2 },
      coordinateType: "zero-based-half-open",
      format: "generic"
    }, f = i.getInt32(16 + s, !0);
    let c, u = 16 + s + 4;
    const m = new Array(f).fill(0).map(() => {
      const d = i.getInt32(u, !0);
      u += 4;
      const _ = {};
      let x;
      for (let L = 0; L < d; L += 1) {
        const I = i.getUint32(u, !0);
        if (I > this.maxBinNumber)
          x = this.parsePseudoBin(n, u + 4), u += 48;
        else {
          const A = Oe(n, u + 4);
          c = this._findFirstData(c, A);
          const E = i.getInt32(u + 12, !0);
          u += 16;
          const k = new Array(E);
          for (let b = 0; b < E; b += 1) {
            const S = Oe(n, u), $ = Oe(n, u + 8);
            u += 16, k[b] = new Bn(S, $, I);
          }
          _[I] = k;
        }
      }
      return { binIndex: _, stats: x };
    });
    return {
      ...o,
      csi: !0,
      refCount: f,
      maxBlockSize: 65536,
      firstDataLine: c,
      csiVersion: r,
      indices: m,
      depth: this.depth,
      maxBinNumber: this.maxBinNumber,
      maxRefLength: a
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: co(e, n + 28)
    };
  }
  async blocksForRange(e, n, i, r = {}) {
    n < 0 && (n = 0);
    const a = await this.parse(r), s = a.refNameToId[e];
    if (s === void 0)
      return [];
    const o = a.indices[s];
    if (!o)
      return [];
    const f = this.reg2bins(n, i), c = [];
    for (const [u, m] of f)
      for (let d = u; d <= m; d++)
        if (o.binIndex[d])
          for (const _ of o.binIndex[d])
            c.push(new Bn(_.minv, _.maxv, d));
    return fo(c, new ar(0, 0));
  }
  /**
   * calculate the list of bins that may overlap with region [beg,end) (zero-based half-open)
   */
  reg2bins(e, n) {
    e -= 1, e < 1 && (e = 1), n > 2 ** 50 && (n = 2 ** 34), n -= 1;
    let i = 0, r = 0, a = this.minShift + this.depth * 3;
    const s = [];
    for (; i <= this.depth; a -= 3, r += sp(1, i * 3), i += 1) {
      const o = r + Ra(e, a), f = r + Ra(n, a);
      if (f - o + s.length > this.maxBinNumber)
        throw new Error(`query ${e}-${n} is too large for current binning scheme (shift ${this.minShift}, depth ${this.depth}), try a smaller query or a coarser index binning scheme`);
      s.push([o, f]);
    }
    return s;
  }
}
const op = 21578324, Ma = 14;
function lp(t, e) {
  return t += 1, e -= 1, [
    [0, 0],
    [1 + (t >> 26), 1 + (e >> 26)],
    [9 + (t >> 23), 9 + (e >> 23)],
    [73 + (t >> 20), 73 + (e >> 20)],
    [585 + (t >> 17), 585 + (e >> 17)],
    [4681 + (t >> 14), 4681 + (e >> 14)]
  ];
}
class Ve extends lo {
  async lineCount(e, n = {}) {
    var s;
    const i = await this.parse(n), r = i.refNameToId[e];
    return r === void 0 || !i.indices[r] ? -1 : ((s = i.indices[r].stats) == null ? void 0 : s.lineCount) ?? -1;
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await this.filehandle.readFile(e), i = await rr(n);
    We(e.signal);
    const r = new DataView(i.buffer);
    if (r.getUint32(0, !0) !== op)
      throw new Error("Not a TBI file");
    const s = r.getUint32(4, !0), o = r.getUint32(8, !0), f = o & 65536 ? "zero-based-half-open" : "1-based-closed", u = {
      0: "generic",
      1: "SAM",
      2: "VCF"
    }[o & 15];
    if (!u)
      throw new Error(`invalid Tabix preset format flags ${o}`);
    const m = {
      ref: r.getInt32(12, !0),
      start: r.getInt32(16, !0),
      end: r.getInt32(20, !0)
    }, d = r.getInt32(24, !0), _ = 5, x = ((1 << (_ + 1) * 3) - 1) / 7, L = 2 ** (14 + _ * 3), I = d ? String.fromCharCode(d) : null, A = r.getInt32(28, !0), E = r.getInt32(32, !0), { refNameToId: k, refIdToName: b } = this._parseNameBytes(i.slice(36, 36 + E));
    let S = 36 + E, $;
    return {
      indices: new Array(s).fill(0).map(() => {
        const H = r.getInt32(S, !0);
        S += 4;
        const z = {};
        let F;
        for (let P = 0; P < H; P += 1) {
          const K = r.getUint32(S, !0);
          if (S += 4, K > x + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (K === x + 1) {
            const nt = r.getInt32(S, !0);
            S += 4, nt === 2 && (F = this.parsePseudoBin(i, S)), S += 16 * nt;
          } else {
            const nt = r.getInt32(S, !0);
            S += 4;
            const ct = new Array(nt);
            for (let W = 0; W < nt; W += 1) {
              const j = Oe(i, S), V = Oe(i, S + 8);
              S += 16, $ = this._findFirstData($, j), ct[W] = new Bn(j, V, K);
            }
            z[K] = ct;
          }
        }
        const y = r.getInt32(S, !0);
        S += 4;
        const U = new Array(y);
        for (let P = 0; P < y; P += 1)
          U[P] = Oe(i, S), S += 8, $ = this._findFirstData($, U[P]);
        return {
          binIndex: z,
          linearIndex: U,
          stats: F
        };
      }),
      metaChar: I,
      maxBinNumber: x,
      maxRefLength: L,
      skipLines: A,
      firstDataLine: $,
      columnNumbers: m,
      coordinateType: f,
      format: u,
      refIdToName: b,
      refNameToId: k,
      maxBlockSize: 65536
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: co(e, n + 16)
    };
  }
  _parseNameBytes(e) {
    let n = 0, i = 0;
    const r = [], a = {}, s = new TextDecoder("utf8");
    for (let o = 0; o < e.length; o += 1)
      if (!e[o]) {
        if (i < o) {
          const f = this.renameRefSeq(s.decode(e.subarray(i, o)));
          r[n] = f, a[f] = n;
        }
        i = o + 1, n += 1;
      }
    return {
      refNameToId: a,
      refIdToName: r
    };
  }
  async blocksForRange(e, n, i, r = {}) {
    n < 0 && (n = 0);
    const a = await this.parse(r), s = a.refNameToId[e];
    if (s === void 0)
      return [];
    const o = a.indices[s];
    if (!o)
      return [];
    (o.linearIndex.length ? o.linearIndex[n >> Ma >= o.linearIndex.length ? o.linearIndex.length - 1 : n >> Ma] : new ar(0, 0)) || console.warn("querying outside of possible tabix range");
    const c = lp(n, i), u = [];
    for (const [L, I] of c)
      for (let A = L; A <= I; A++)
        if (o.binIndex[A])
          for (const E of o.binIndex[A])
            u.push(new Bn(E.minv, E.maxv, A));
    const m = o.linearIndex.length;
    let d = null;
    const _ = Math.min(n >> 14, m - 1), x = Math.min(i >> 14, m - 1);
    for (let L = _; L <= x; ++L) {
      const I = o.linearIndex[L];
      I && (!d || I.compareTo(d) < 0) && (d = I);
    }
    return fo(u, d);
  }
}
function cp(t) {
  return /^[\u0000-\u007F]*$/.test(t);
}
class fp {
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
  constructor({ path: e, filehandle: n, url: i, tbiPath: r, tbiUrl: a, tbiFilehandle: s, csiPath: o, csiUrl: f, csiFilehandle: c, renameRefSeqs: u = (d) => d, chunkCacheSize: m = 5 * 2 ** 20 }) {
    if (n)
      this.filehandle = n;
    else if (e)
      this.filehandle = new gn(e);
    else if (i)
      this.filehandle = new we(i);
    else
      throw new TypeError("must provide either filehandle or path");
    if (s)
      this.index = new Ve({
        filehandle: s,
        renameRefSeqs: u
      });
    else if (c)
      this.index = new _i({
        filehandle: c,
        renameRefSeqs: u
      });
    else if (r)
      this.index = new Ve({
        filehandle: new gn(r),
        renameRefSeqs: u
      });
    else if (o)
      this.index = new _i({
        filehandle: new gn(o),
        renameRefSeqs: u
      });
    else if (e)
      this.index = new Ve({
        filehandle: new gn(`${e}.tbi`),
        renameRefSeqs: u
      });
    else if (f)
      this.index = new _i({
        filehandle: new we(f)
      });
    else if (a)
      this.index = new Ve({
        filehandle: new we(a)
      });
    else if (i)
      this.index = new Ve({
        filehandle: new we(`${i}.tbi`)
      });
    else
      throw new TypeError("must provide one of tbiFilehandle, tbiPath, csiFilehandle, csiPath, tbiUrl, csiUrl");
    this.renameRefSeq = u, this.chunkCache = new Te({
      cache: new Un({ maxSize: Math.floor(m / 65536) }),
      fill: (d, _) => this.readChunk(d, { signal: _ })
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
    let a, s = {}, o;
    typeof r == "function" ? o = r : (s = r, o = r.lineCallback, a = r.signal);
    const f = await this.index.getMetadata(s);
    We(a);
    const c = n ?? 0, u = i ?? f.maxRefLength;
    if (!(c <= u))
      throw new TypeError("invalid start and end coordinates. start must be less than or equal to end");
    if (c === u)
      return;
    const m = await this.index.blocksForRange(e, c, u, s);
    We(a);
    const d = new TextDecoder("utf8");
    for (const _ of m) {
      const { buffer: x, cpositions: L, dpositions: I } = await this.chunkCache.get(_.toString(), _, a);
      We(a);
      let A = 0, E = 0;
      const k = d.decode(x), b = cp(k);
      for (; A < k.length; ) {
        let S, $;
        if (b) {
          if ($ = k.indexOf(`
`, A), $ === -1)
            break;
          S = k.slice(A, $);
        } else {
          if ($ = x.indexOf(10, A), $ === -1)
            break;
          const z = x.slice(A, $);
          S = d.decode(z);
        }
        if (I) {
          for (; A + _.minv.dataPosition >= I[E++]; )
            ;
          E--;
        }
        const { startCoordinate: T, overlaps: H } = this.checkLine(f, e, c, u, S);
        if (H)
          o(
            S,
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
            L[E] * 256 + (A - I[E]) + _.minv.dataPosition + 1
          );
        else if (T !== void 0 && T >= u)
          return;
        A = $ + 1;
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
    We(e.signal);
    const a = ((n == null ? void 0 : n.blockPosition) || 0) + r, s = await this.filehandle.read(a, 0, e), o = await rr(s);
    if (i) {
      let f = -1;
      const c = 10, u = i.charCodeAt(0);
      for (let m = 0; m < o.length && !(m === f + 1 && o[m] !== u); m += 1)
        o[m] === c && (f = m);
      return o.subarray(0, f + 1);
    }
    return o;
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
    const { columnNumbers: s, metaChar: o, coordinateType: f, format: c } = e;
    if (o && a.startsWith(o))
      return { overlaps: !1 };
    let { ref: u, start: m, end: d } = s;
    u || (u = 0), m || (m = 0), d || (d = 0), c === "VCF" && (d = 8);
    const _ = Math.max(u, m, d);
    let x = 1, L = 0, I = "", A = -1 / 0;
    const E = a.length;
    for (let k = 0; k < E + 1; k++)
      if (a[k] === "	" || k === E) {
        if (x === u) {
          if (this.renameRefSeq(a.slice(L, k)) !== n)
            return {
              overlaps: !1
            };
        } else if (x === m) {
          if (A = parseInt(a.slice(L, k), 10), f === "1-based-closed" && (A -= 1), A >= r)
            return {
              startCoordinate: A,
              overlaps: !1
            };
          if ((d === 0 || d === m) && A + 1 <= i)
            return {
              startCoordinate: A,
              overlaps: !1
            };
        } else if (c === "VCF" && x === 4)
          I = a.slice(L, k);
        else if (x === d && (c === "VCF" ? this._getVcfEnd(A, I, a.slice(L, k)) : Number.parseInt(a.slice(L, k), 10)) <= i)
          return {
            overlaps: !1
          };
        if (L = k + 1, x += 1, x > _)
          break;
      }
    return {
      startCoordinate: A,
      overlaps: !0
    };
  }
  _getVcfEnd(e, n, i) {
    let r = e + n.length;
    const a = i.includes("SVTYPE=TRA");
    if (i[0] !== "." && !a) {
      let s = ";";
      for (let o = 0; o < i.length; o += 1) {
        if (s === ";" && i.slice(o, o + 4) === "END=") {
          let f = i.indexOf(";", o);
          f === -1 && (f = i.length), r = parseInt(i.slice(o + 4, f), 10);
          break;
        }
        s = i[o];
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
    return j0(i, e);
  }
}
function up(t, e, n) {
  const i = e.split("	"), r = {};
  let a = 0;
  if (t.includes("GT")) {
    const s = t.split(":");
    if (s.length === 1)
      for (const o of n)
        r[o] = i[a++];
    else {
      const o = s.indexOf("GT");
      if (o === 0)
        for (const f of n) {
          const c = i[a++], u = c.indexOf(":");
          r[f] = u !== -1 ? c.slice(0, u) : c;
        }
      else
        for (const f of n) {
          const c = i[a++].split(":");
          r[f] = c[o];
        }
    }
  }
  return r;
}
function hp(t) {
  const e = [];
  let n = "", i = !1, r = !1;
  for (const a of t)
    a === '"' ? (i = !i, n += a) : a === "[" ? (r = !0, n += a) : a === "]" ? (r = !1, n += a) : a === "," && !i && !r ? (e.push(n.trim()), n = "") : n += a;
  return n && e.push(n.trim()), e;
}
function dp(t, e) {
  const n = t.indexOf(e);
  return [t.slice(0, n), t.slice(n + 1)];
}
function pp(t) {
  const e = t.replace(/^<|>$/g, "");
  return Object.fromEntries(hp(e).map((n) => {
    const [i, r] = dp(n, "=");
    return r && r.startsWith("[") && r.endsWith("]") ? [
      i,
      r.slice(1, -1).split(",").map((a) => a.trim())
    ] : r && r.startsWith('"') && r.endsWith('"') ? [i, r.slice(1, -1)] : [i, r == null ? void 0 : r.replaceAll(/^"|"$/g, "")];
  }));
}
const mn = {
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
function _p(t) {
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}
class gp {
  constructor({ header: e = "", strict: n = !0 }) {
    if (!e.length)
      throw new Error("empty header received");
    const i = e.split(/[\r\n]+/).filter(Boolean);
    if (!i.length)
      throw new Error("no non-empty header lines specified");
    this.strict = n, this.metadata = JSON.parse(JSON.stringify({
      INFO: mn.InfoFields,
      FORMAT: mn.GenotypeFields,
      ALT: mn.AltTypes,
      FILTER: mn.FilterTypes
    }));
    let r;
    if (i.forEach((f) => {
      if (f.startsWith("#"))
        f.startsWith("##") ? this.parseMetadata(f) : r = f;
      else throw new Error(`Bad line in header:
${f}`);
    }), !r)
      throw new Error("No format line found in header");
    const a = r.trim().split("	"), s = a.slice(0, 8), o = [
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
    if (s.length !== o.length || !s.every((f, c) => f === o[c]))
      throw new Error(`VCF column headers not correct:
${r}`);
    this.samples = a.slice(9);
  }
  parseSamples(e, n) {
    const i = {};
    if (e) {
      const r = n.split("	"), a = e.split(":"), s = a.map((o) => {
        const f = this.getMetadata("FORMAT", o, "Type");
        return f === "Integer" || f === "Float";
      });
      for (let o = 0; o < this.samples.length; o++) {
        const f = this.samples[o];
        i[f] = {};
        const c = r[o].split(":");
        for (let u = 0; u < c.length; u++) {
          const m = c[u];
          i[f][a[u]] = m === "" || m === "." ? void 0 : m.split(",").map((d) => d === "." ? void 0 : s[u] ? +d : d);
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
      const [s, o] = this.parseStructuredMetaVal(r);
      s ? this.metadata[a][s] = o : this.metadata[a] = o;
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
    const n = pp(e), i = n.ID;
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
    var $;
    let n = 0;
    for (let T = 0; n < e.length && (e[n] === "	" && (T += 1), T !== 9); n += 1)
      ;
    const i = e.slice(0, n).split("	"), r = e.slice(n + 1), [a, s, o, f, c, u, m] = i, d = a, _ = +s, x = o === "." ? void 0 : o.split(";"), L = f, I = c === "." ? void 0 : c.split(","), A = u === "." ? void 0 : +u, E = m === "." ? void 0 : m.split(";"), k = i[8];
    if (this.strict && !i[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const b = ($ = i[7]) == null ? void 0 : $.includes("%"), S = i[7] === void 0 || i[7] === "." ? {} : Object.fromEntries(i[7].split(";").map((T) => {
      const [H, z] = T.split("="), F = z == null ? void 0 : z.split(",").map((U) => U === "." ? void 0 : U).map((U) => U && b ? _p(U) : U), y = this.getMetadata("INFO", H, "Type");
      return y === "Integer" || y === "Float" ? [
        H,
        F == null ? void 0 : F.map((U) => U === void 0 ? void 0 : Number(U))
      ] : y === "Flag" ? [H, !0] : [H, F ?? !0];
    }));
    return {
      CHROM: d,
      POS: _,
      ALT: I,
      INFO: S,
      REF: L,
      FILTER: E && E.length === 1 && E[0] === "PASS" ? "PASS" : E,
      ID: x,
      QUAL: A,
      FORMAT: k,
      SAMPLES: () => this.parseSamples(i[8] ?? "", r),
      GENOTYPES: () => up(i[8] ?? "", r, this.samples)
    };
  }
}
function mp(t) {
  const e = t.split(/[[\]]/);
  if (e.length > 1) {
    const n = t.includes("[") ? "right" : "left";
    let i, r, a;
    for (const s of e)
      s && (s.includes(":") ? (a = s, i = r ? "right" : "left") : r = s);
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
const vp = {
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
function wp(t, e, n) {
  if (!e || e.length === 0)
    return ["remark", "no alternative alleles"];
  const i = /* @__PURE__ */ new Set();
  let r = /* @__PURE__ */ new Set();
  if (e.forEach((a) => {
    let [s, o] = uo(a, n);
    s || ([s, o] = yp(t, a)), s && o && (i.add(s), r.add(o));
  }), r.size > 1) {
    const a = [...r], s = new Set(
      a.map((o) => {
        const f = o.split("->");
        return f[1] ? f[0] : o;
      }).filter((o) => !!o)
    );
    r = new Set(
      [...s].map((o) => o.trim()).map((o) => {
        const f = a.map((c) => c.split("->").map((u) => u.trim())).map((c) => c[1] && c[0] === o ? c[1] : "").filter((c) => !!c);
        return f.length ? `${o} -> ${f.join(",")}` : o;
      })
    );
  }
  return i.size ? [[...i].join(","), [...r].join(",")] : [];
}
function uo(t, e) {
  if (typeof t == "string" && !t.startsWith("<"))
    return [];
  let n = vp[t];
  if (!n && e.getMetadata("ALT", t) && (n = "sequence_variant"), n)
    return [n, t];
  const i = t.split(":");
  return i.length > 1 ? uo(`<${i.slice(0, -1).join(":")}>`, e) : [];
}
function yp(t, e) {
  if (mp(e))
    return ["breakend", e];
  if (t.length === 1 && e.length === 1)
    return ["SNV", De("SNV", t, e)];
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
    return t.split("").reverse().join("") === e ? ["inversion", De("inversion", t, e)] : ["substitution", De("substitution", t, e)];
  if (t.length <= e.length) {
    const i = e.length - t.length, r = i.toLocaleString("en-US");
    return [
      "insertion",
      i > 5 ? `${r}bp INS` : De("insertion", t, e)
    ];
  }
  if (t.length > e.length) {
    const i = t.length - e.length, r = i.toLocaleString("en-US");
    return [
      "deletion",
      i > 5 ? `${r}bp DEL` : De("deletion", t, e)
    ];
  }
  return ["indel", De("indel", t, e)];
}
function De(t, e, n) {
  return `${t} ${e} -> ${n}`;
}
function bp(t, e) {
  const { REF: n = "", ALT: i, POS: r, CHROM: a, ID: s } = t, o = r - 1, [f, c] = wp(n, i, e);
  return {
    refName: a,
    start: o,
    end: xp(t),
    description: c,
    type: f,
    name: s == null ? void 0 : s.join(","),
    aliases: s && s.length > 1 ? s.slice(1) : void 0
  };
}
function xp(t) {
  const { POS: e, REF: n = "", ALT: i } = t, r = i == null ? void 0 : i.includes("<TRA>"), a = e - 1;
  if (i == null ? void 0 : i.some((o) => o.includes("<"))) {
    const o = t.INFO;
    if (o.END && !r)
      return +o.END[0];
  }
  return a + n.length;
}
class kp {
  constructor(e) {
    this.variant = e.variant, this.parser = e.parser, this.data = bp(this.variant, this.parser), this._id = e.id;
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
async function Sp({
  url: t,
  indexUrl: e,
  indexType: n = "TBI",
  region: i
}) {
  const r = e ?? t + (n === "TBI" ? ".tbi" : ".csi"), a = new fp({
    tbiFilehandle: n === "TBI" ? new we(r) : void 0,
    csiFilehandle: n === "CSI" ? new we(r) : void 0,
    filehandle: new we(t)
  }), s = new gp({
    header: await a.getHeader()
  }), o = [];
  let f = 0;
  return await a.getLines(i.chromosome, i.start, i.end, {
    lineCallback: (c) => {
      const u = s.parseLine(c), m = new kp({
        variant: u,
        parser: s,
        id: `${f++}`
      }), d = m.get("INFO");
      o.push({
        id: m.get("ID"),
        reference_allele: m.get("REF"),
        alternative_alleles: { values: m.get("ALT") },
        name: m.get("name"),
        seqId: m.get("refName"),
        fmin: m.get("start"),
        fmax: m.get("end"),
        strand: 1,
        source: "",
        type: Oa(d.soTerm[0]) ?? m.get("type"),
        ...Object.fromEntries(
          Object.entries(d).map(([_, x]) => [
            _,
            {
              values: [JSON.stringify(x.map((L) => Oa(L)))]
            }
          ])
        )
      });
    }
  }), o;
}
function Oa(t) {
  return t == null ? void 0 : t.replace(/['"]+/g, "");
}
function Ap(t) {
  const [e, n] = t.split(":"), [i, r] = n.split("..");
  return {
    chromosome: e,
    start: +i,
    end: +r
  };
}
Se.prototype.first = function() {
  return At(this.nodes()[0]);
};
Se.prototype.last = function() {
  return At(this.nodes()[this.size() - 1]);
};
class $p {
  constructor(e, n, i, r) {
    this.height = r, this.width = i, this.config = e, this.svg_target = n, this.viewer = this._initViewer(n), this.draw();
  }
  generateLegend() {
    return Iu();
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
    const i = At(n);
    i.selectAll(".highlight").remove(), i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ), i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((r) => r.selected === "true").style("stroke", null).datum((r) => (r.selected = "false", r)), Ki(e, i);
  }
  _initViewer(e) {
    At(e).selectAll("*").remove();
    const n = At(e), r = `${e.replace("#", "")} main-view`, a = {
      top: 8,
      right: 30,
      bottom: 30,
      left: 40
    };
    return n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${a.left},${a.top})`).attr("class", r), this.width = this.width - a.left - a.right, this.height = this.height - a.top - a.bottom, At(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    const e = this.width, n = this.config.transcriptTypes ?? Tu, i = this.config.variantTypes ?? Eu, r = this.config.binRatio ?? 0.01, a = this.config.region, s = this._configureRange(
      a.start,
      a.end,
      e
    ), o = s.range, f = a.chromosome, c = this.config.variantFilter ?? [], u = this.config.isoformFilter ?? [], m = this.config.htpVariant ?? "", d = s.start, _ = s.end;
    new Lu({
      viewer: this.viewer,
      track: {
        chromosome: f,
        start: d,
        end: _,
        range: s.range
      },
      height: this.height,
      width: e
    }).DrawOverviewTrack();
    let I = 100;
    const A = this.config.showVariantLabel ?? !0, { viewer: E, genome: k, height: b, tracks: S } = this;
    S.map(($) => {
      const { variantData: T, trackData: H } = $;
      if ($.type === Pe.ISOFORM_AND_VARIANT) {
        const z = new Ru({
          viewer: E,
          height: b,
          width: e,
          transcriptTypes: n,
          variantTypes: i,
          showVariantLabel: A,
          trackData: H,
          variantData: T,
          variantFilter: c,
          binRatio: r,
          isoformFilter: u
        });
        I += z.DrawTrack();
      } else if ($.type === Pe.ISOFORM_EMBEDDED_VARIANT) {
        const z = new Mu({
          viewer: E,
          height: b,
          width: e,
          transcriptTypes: n,
          variantData: T,
          trackData: H,
          variantTypes: i,
          showVariantLabel: A,
          variantFilter: c
        });
        I += z.DrawTrack();
      } else if ($.type === Pe.ISOFORM) {
        const z = new Ou({
          region: a,
          viewer: E,
          height: b,
          width: e,
          genome: k,
          trackData: H,
          transcriptTypes: n,
          htpVariant: m
        });
        I += z.DrawTrack();
      } else $.type === Pe.VARIANT ? new ad({
        region: a,
        viewer: E,
        range: o,
        height: b,
        width: e
      }).DrawTrack() : $.type === Pe.VARIANT_GLOBAL ? new sd({
        region: a,
        viewer: E,
        track: {
          ...$,
          range: o
        },
        height: b,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${$.type}`);
      At(this.svg_target).attr("height", I);
    });
  }
  // Configure the range for our tracks two use cases
  //    1. Entered with a position
  //    2. TODO: Entered with a range start at 0?
  //    3. Are we in overview or scrollable?
  _configureRange(e, n, i) {
    let r = null;
    const a = 17;
    let s = 0, o = [0, 0];
    if (e === n) {
      r = 300, s = a * r, e = e - r / 2 - 1, n = n + r / 2;
      const f = (
        // @ts-expect-error
        At("#clip-rect").node().getBoundingClientRect().width / 2 + 100
      );
      o = [
        f - s / 2,
        f + s / 2
      ];
    } else
      return {
        range: [0, i],
        start: e,
        end: n
      };
    return {
      range: o,
      start: e,
      end: n
    };
  }
}
export {
  $p as GenomeFeatureViewer,
  Ep as fetchApolloAPIData,
  Tp as fetchNCListData,
  Sp as fetchTabixVcfData,
  Ap as parseLocString
};
