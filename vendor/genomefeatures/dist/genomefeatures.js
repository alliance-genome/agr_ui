function vn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ho(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Oa(t) {
  let e, n, i;
  t.length !== 2 ? (e = vn, n = (o, c) => vn(t(o), c), i = (o, c) => t(o) - c) : (e = t === vn || t === ho ? t : po, n = t, i = t);
  function r(o, c, f = 0, u = o.length) {
    if (f < u) {
      if (e(c, c) !== 0) return u;
      do {
        const m = f + u >>> 1;
        n(o[m], c) < 0 ? f = m + 1 : u = m;
      } while (f < u);
    }
    return f;
  }
  function a(o, c, f = 0, u = o.length) {
    if (f < u) {
      if (e(c, c) !== 0) return u;
      do {
        const m = f + u >>> 1;
        n(o[m], c) <= 0 ? f = m + 1 : u = m;
      } while (f < u);
    }
    return f;
  }
  function s(o, c, f = 0, u = o.length) {
    const m = r(o, c, f, u - 1);
    return m > f && i(o[m - 1], c) > -i(o[m], c) ? m - 1 : m;
  }
  return { left: r, center: s, right: a };
}
function po() {
  return 0;
}
function _o(t) {
  return t === null ? NaN : +t;
}
const go = Oa(vn), mo = go.right;
Oa(_o).center;
const vo = Math.sqrt(50), wo = Math.sqrt(10), yo = Math.sqrt(2);
function En(t, e, n) {
  const i = (e - t) / Math.max(0, n), r = Math.floor(Math.log10(i)), a = i / Math.pow(10, r), s = a >= vo ? 10 : a >= wo ? 5 : a >= yo ? 2 : 1;
  let o, c, f;
  return r < 0 ? (f = Math.pow(10, -r) / s, o = Math.round(t * f), c = Math.round(e * f), o / f < t && ++o, c / f > e && --c, f = -f) : (f = Math.pow(10, r) * s, o = Math.round(t / f), c = Math.round(e / f), o * f < t && ++o, c * f > e && --c), c < o && 0.5 <= n && n < 2 ? En(t, e, n * 2) : [o, c, f];
}
function bo(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const i = e < t, [r, a, s] = i ? En(e, t, n) : En(t, e, n);
  if (!(a >= r)) return [];
  const o = a - r + 1, c = new Array(o);
  if (i)
    if (s < 0) for (let f = 0; f < o; ++f) c[f] = (a - f) / -s;
    else for (let f = 0; f < o; ++f) c[f] = (a - f) * s;
  else if (s < 0) for (let f = 0; f < o; ++f) c[f] = (r + f) / -s;
  else for (let f = 0; f < o; ++f) c[f] = (r + f) * s;
  return c;
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
  var n = [], i = null, r = null, a = 6, s = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = t === wn || t === an ? -1 : 1, u = t === an || t === Gn ? "x" : "y", m = t === wn || t === mi ? To : Eo;
  function p(_) {
    var E = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), z = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : ko), I = Math.max(a, 0) + o, A = e.range(), T = +A[0] + c, x = +A[A.length - 1] + c, b = (e.bandwidth ? Ao : So)(e.copy(), c), S = _.selection ? _.selection() : _, $ = S.selectAll(".domain").data([null]), k = S.selectAll(".tick").data(E, e).order(), B = k.exit(), F = k.enter().append("g").attr("class", "tick"), O = k.select("line"), v = k.select("text");
    $ = $.merge($.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), k = k.merge(F), O = O.merge(F.append("line").attr("stroke", "currentColor").attr(u + "2", f * a)), v = v.merge(F.append("text").attr("fill", "currentColor").attr(u, f * I).attr("dy", t === wn ? "0em" : t === mi ? "0.71em" : "0.32em")), _ !== S && ($ = $.transition(_), k = k.transition(_), O = O.transition(_), v = v.transition(_), B = B.transition(_).attr("opacity", or).attr("transform", function(q) {
      return isFinite(q = b(q)) ? m(q + c) : this.getAttribute("transform");
    }), F.attr("opacity", or).attr("transform", function(q) {
      var P = this.parentNode.__axis;
      return m((P && isFinite(P = P(q)) ? P : b(q)) + c);
    })), B.remove(), $.attr("d", t === an || t === Gn ? s ? "M" + f * s + "," + T + "H" + c + "V" + x + "H" + f * s : "M" + c + "," + T + "V" + x : s ? "M" + T + "," + f * s + "V" + c + "H" + x + "V" + f * s : "M" + T + "," + c + "H" + x), k.attr("opacity", 1).attr("transform", function(q) {
      return m(b(q) + c);
    }), O.attr(u + "2", f * a), v.attr(u, f * I).text(z), S.filter($o).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Gn ? "start" : t === an ? "end" : "middle"), S.each(function() {
      this.__axis = b;
    });
  }
  return p.scale = function(_) {
    return arguments.length ? (e = _, p) : e;
  }, p.ticks = function() {
    return n = Array.from(arguments), p;
  }, p.tickArguments = function(_) {
    return arguments.length ? (n = _ == null ? [] : Array.from(_), p) : n.slice();
  }, p.tickValues = function(_) {
    return arguments.length ? (i = _ == null ? null : Array.from(_), p) : i && i.slice();
  }, p.tickFormat = function(_) {
    return arguments.length ? (r = _, p) : r;
  }, p.tickSize = function(_) {
    return arguments.length ? (a = s = +_, p) : a;
  }, p.tickSizeInner = function(_) {
    return arguments.length ? (a = +_, p) : a;
  }, p.tickSizeOuter = function(_) {
    return arguments.length ? (s = +_, p) : s;
  }, p.tickPadding = function(_) {
    return arguments.length ? (o = +_, p) : o;
  }, p.offset = function(_) {
    return arguments.length ? (c = +_, p) : c;
  }, p;
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
function Lo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function za(t) {
  var e = Hn(t);
  return (e.local ? Lo : Mo)(e);
}
function Oo() {
}
function zi(t) {
  return t == null ? Oo : function() {
    return this.querySelector(t);
  };
}
function Co(t) {
  typeof t != "function" && (t = zi(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, u = 0; u < s; ++u)
      (c = a[u]) && (f = t.call(c, c.__data__, u, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[u] = f);
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
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (i.push(t.call(c, c.__data__, f, s)), r.push(c));
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
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
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
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Sn(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (r[s] = o);
}
function Qo(t, e, n, i, r, a, s) {
  var o, c, f = /* @__PURE__ */ new Map(), u = e.length, m = a.length, p = new Array(u), _;
  for (o = 0; o < u; ++o)
    (c = e[o]) && (p[o] = _ = s.call(c, c.__data__, o, e) + "", f.has(_) ? r[o] = c : f.set(_, c));
  for (o = 0; o < m; ++o)
    _ = s.call(t, a[o], o, a) + "", (c = f.get(_)) ? (i[o] = c, c.__data__ = a[o], f.delete(_)) : n[o] = new Sn(t, a[o]);
  for (o = 0; o < u; ++o)
    (c = e[o]) && f.get(p[o]) === c && (r[o] = c);
}
function jo(t) {
  return t.__data__;
}
function tl(t, e) {
  if (!arguments.length) return Array.from(this, jo);
  var n = e ? Qo : Jo, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Ko(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var u = i[f], m = r[f], p = m.length, _ = el(t.call(u, u && u.__data__, f, i)), E = _.length, z = o[f] = new Array(E), I = s[f] = new Array(E), A = c[f] = new Array(p);
    n(u, m, z, I, A, _, e);
    for (var T = 0, x = 0, b, S; T < E; ++T)
      if (b = z[T]) {
        for (T >= x && (x = T + 1); !(S = I[x]) && ++x < E; ) ;
        b._next = S || null;
      }
  }
  return s = new Vt(s, i), s._enter = o, s._exit = c, s;
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
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, a = i.length, s = Math.min(r, a), o = new Array(r), c = 0; c < s; ++c)
    for (var f = n[c], u = i[c], m = f.length, p = o[c] = new Array(m), _, E = 0; E < m; ++E)
      (_ = f[E] || u[E]) && (p[E] = _);
  for (; c < r; ++c)
    o[c] = n[c];
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
  function e(m, p) {
    return m && p ? t(m.__data__, p.__data__) : !m - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, u = 0; u < o; ++u)
      (f = s[u]) && (c[u] = f);
    c.sort(e);
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
  return arguments.length > 1 ? this.each((e == null ? bl : typeof e == "function" ? kl : xl)(t, e, n ?? "")) : Oe(this.node(), t);
}
function Oe(t, e) {
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
function Ll(t) {
  return function() {
    this.textContent = t;
  };
}
function Ol(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Cl(t) {
  return arguments.length ? this.each(t == null ? Ml : (typeof t == "function" ? Ol : Ll)(t)) : this.node().textContent;
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
      for (var c = 0, f = o.length, u; c < f; ++c)
        for (r = 0, u = o[c]; r < a; ++r)
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
function $t(t) {
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
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), a = Math.max(e, n, i), s = NaN, o = a - r, c = (a + r) / 2;
  return o ? (e === a ? s = (n - i) / o + (n < i) * 6 : n === a ? s = (i - e) / o + 2 : s = (e - n) / o + 4, o /= c < 0.5 ? a + r : 2 - a - r, s *= 60) : o = c > 0 && c < 1 ? 0 : s, new jt(s, o, c, t.opacity);
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
    var s = n((r = wi(r)).r, (a = wi(a)).r), o = n(r.g, a.g), c = n(r.b, a.b), f = Qa(r.opacity, a.opacity);
    return function(u) {
      return r.r = s(u), r.g = o(u), r.b = c(u), r.opacity = f(u), r + "";
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
  var n = yi.lastIndex = Xn.lastIndex = 0, i, r, a, s = -1, o = [], c = [];
  for (t = t + "", e = e + ""; (i = yi.exec(t)) && (r = Xn.exec(e)); )
    (a = r.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (i = i[0]) === (r = r[0]) ? o[s] ? o[s] += r : o[++s] = r : (o[++s] = null, c.push({ i: s, x: Qt(i, r) })), n = Xn.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? c[0] ? Dc(c[0].x) : Ic(e) : (e = c.length, function(f) {
    for (var u = 0, m; u < e; ++u) o[(m = c[u]).i] = m.x(f);
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
  var s, o, c;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (c = t * n + e * i) && (n -= t * c, i -= e * c), (o = Math.sqrt(n * n + i * i)) && (n /= o, i /= o, c /= o), t * i < e * n && (t = -t, e = -e, c = -c, s = -s), {
    translateX: r,
    translateY: a,
    rotate: Math.atan2(e, t) * wr,
    skewX: Math.atan(c) * wr,
    scaleX: s,
    scaleY: o
  };
}
var ln;
function Mc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? bi : ts(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Lc(t) {
  return t == null || (ln || (ln = document.createElementNS("http://www.w3.org/2000/svg", "g")), ln.setAttribute("transform", t), !(t = ln.transform.baseVal.consolidate())) ? bi : (t = t.matrix, ts(t.a, t.b, t.c, t.d, t.e, t.f));
}
function es(t, e, n, i) {
  function r(f) {
    return f.length ? f.pop() + " " : "";
  }
  function a(f, u, m, p, _, E) {
    if (f !== m || u !== p) {
      var z = _.push("translate(", null, e, null, n);
      E.push({ i: z - 4, x: Qt(f, m) }, { i: z - 2, x: Qt(u, p) });
    } else (m || p) && _.push("translate(" + m + e + p + n);
  }
  function s(f, u, m, p) {
    f !== u ? (f - u > 180 ? u += 360 : u - f > 180 && (f += 360), p.push({ i: m.push(r(m) + "rotate(", null, i) - 2, x: Qt(f, u) })) : u && m.push(r(m) + "rotate(" + u + i);
  }
  function o(f, u, m, p) {
    f !== u ? p.push({ i: m.push(r(m) + "skewX(", null, i) - 2, x: Qt(f, u) }) : u && m.push(r(m) + "skewX(" + u + i);
  }
  function c(f, u, m, p, _, E) {
    if (f !== m || u !== p) {
      var z = _.push(r(_) + "scale(", null, ",", null, ")");
      E.push({ i: z - 4, x: Qt(f, m) }, { i: z - 2, x: Qt(u, p) });
    } else (m !== 1 || p !== 1) && _.push(r(_) + "scale(" + m + "," + p + ")");
  }
  return function(f, u) {
    var m = [], p = [];
    return f = t(f), u = t(u), a(f.translateX, f.translateY, u.translateX, u.translateY, m, p), s(f.rotate, u.rotate, m, p), o(f.skewX, u.skewX, m, p), c(f.scaleX, f.scaleY, u.scaleX, u.scaleY, m, p), f = u = null, function(_) {
      for (var E = -1, z = p.length, I; ++E < z; ) m[(I = p[E]).i] = I.x(_);
      return m.join("");
    };
  };
}
var Oc = es(Mc, "px, ", "px)", "deg)"), Cc = es(Lc, ", ", ")", ")"), Ce = 0, Ue = 0, He = 0, ns = 1e3, In, Ze, Dn = 0, ke = 0, Pn = 0, Je = typeof performance == "object" && performance.now ? performance : Date, is = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
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
  function a(f) {
    n.state = xr, n.timer.restart(s, n.delay, n.time), n.delay <= f && s(f - n.delay);
  }
  function s(f) {
    var u, m, p, _;
    if (n.state !== xr) return c();
    for (u in i)
      if (_ = i[u], _.name === n.name) {
        if (_.state === bn) return br(s);
        _.state === kr ? (_.state = xn, _.timer.stop(), _.on.call("interrupt", t, t.__data__, _.index, _.group), delete i[u]) : +u < e && (_.state = xn, _.timer.stop(), _.on.call("cancel", t, t.__data__, _.index, _.group), delete i[u]);
      }
    if (br(function() {
      n.state === bn && (n.state = kr, n.timer.restart(o, n.delay, n.time), o(f));
    }), n.state = ki, n.on.call("start", t, t.__data__, n.index, n.group), n.state === ki) {
      for (n.state = bn, r = new Array(p = n.tween.length), u = 0, m = -1; u < p; ++u)
        (_ = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++m] = _);
      r.length = m + 1;
    }
  }
  function o(f) {
    for (var u = f < n.duration ? n.ease.call(null, f / n.duration) : (n.timer.restart(c), n.state = Ti, 1), m = -1, p = r.length; ++m < p; )
      r[m].call(t, u);
    n.state === Ti && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = xn, n.timer.stop(), delete i[e];
    for (var f in i) return;
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
      for (var o = { name: e, value: n }, c = 0, f = r.length; c < f; ++c)
        if (r[c].name === e) {
          r[c] = o;
          break;
        }
      c === f && r.push(o);
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
    var s, o = n(this), c;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = o + "", s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o)));
  };
}
function tf(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = o + "", s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o)));
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
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new fe(i, this._parents, this._name, this._id);
}
function wf(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], u = c.length, m = s[o] = new Array(u), p, _ = 0; _ < u; ++_)
      (p = c[_] || f[_]) && (m[_] = p);
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
    for (var o = i[s], c = o.length, f = a[s] = new Array(c), u, m, p = 0; p < c; ++p)
      (u = o[p]) && (m = t.call(u, u.__data__, p, o)) && ("__data__" in u && (m.__data__ = u.__data__), f[p] = m, Vn(f[p], e, n, p, f, te(u, n)));
  return new fe(a, this._parents, e, n);
}
function Sf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ha(t));
  for (var i = this._groups, r = i.length, a = [], s = [], o = 0; o < r; ++o)
    for (var c = i[o], f = c.length, u, m = 0; m < f; ++m)
      if (u = c[m]) {
        for (var p = t.call(u, u.__data__, m, c), _, E = te(u, n), z = 0, I = p.length; z < I; ++z)
          (_ = p[z]) && Vn(_, e, n, z, p, E);
        a.push(p), s.push(u);
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
    var a = Oe(this, t), s = (this.style.removeProperty(t), Oe(this, t));
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
    var s = Oe(this, t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function Df(t, e, n) {
  var i, r, a;
  return function() {
    var s = Oe(this, t), o = n(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(t), Oe(this, t))), s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o));
  };
}
function Rf(t, e) {
  var n, i, r, a = "style." + e, s = "end." + a, o;
  return function() {
    var c = re(this, t), f = c.on, u = c.value[a] == null ? o || (o = os(e)) : void 0;
    (f !== n || r !== u) && (i = (n = f).copy()).on(s, r = u), c.on = i;
  };
}
function Mf(t, e, n) {
  var i = (t += "") == "transform" ? Oc : ss;
  return e == null ? this.styleTween(t, Nf(t, i)).on("end.style." + t, os(t)) : typeof e == "function" ? this.styleTween(t, Df(t, i, Gi(this, "style." + t, e))).each(Rf(this._id, t)) : this.styleTween(t, If(t, i, e), n).on("end.style." + t, null);
}
function Lf(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function Of(t, e, n) {
  var i, r;
  function a() {
    var s = e.apply(this, arguments);
    return s !== r && (i = (r = s) && Lf(t, s, n)), i;
  }
  return a._value = e, a;
}
function Cf(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, Of(t, e, n ?? ""));
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
    for (var s = i[a], o = s.length, c, f = 0; f < o; ++f)
      if (c = s[f]) {
        var u = te(c, e);
        Vn(c, t, n, f, s, {
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
    var o = { value: s }, c = { value: function() {
      --r === 0 && a();
    } };
    n.each(function() {
      var f = re(this, i), u = f.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), f.on = e;
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
    for (var s = i[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && Vn(c, t, e, f, s, n || Xf(c, e));
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
    let s = this._x1, o = this._y1, c = i - e, f = r - n, u = s - e, m = o - n, p = u * u + m * m;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (p > me) if (!(Math.abs(m * c - f * u) > me) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let _ = i - s, E = r - o, z = c * c + f * f, I = _ * _ + E * E, A = Math.sqrt(z), T = Math.sqrt(p), x = a * Math.tan((Ei - Math.acos((z + p - I) / (2 * A * T))) / 2), b = x / T, S = x / A;
      Math.abs(b - 1) > me && this._append`L${e + b * u},${n + b * m}`, this._append`A${a},${a},0,0,${+(m * _ > u * E)},${this._x1 = e + S * c},${this._y1 = n + S * f}`;
    }
  }
  arc(e, n, i, r, a, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let o = i * Math.cos(r), c = i * Math.sin(r), f = e + o, u = n + c, m = 1 ^ s, p = s ? r - a : a - r;
    this._x1 === null ? this._append`M${f},${u}` : (Math.abs(this._x1 - f) > me || Math.abs(this._y1 - u) > me) && this._append`L${f},${u}`, i && (p < 0 && (p = p % Si + Si), p > Kf ? this._append`A${i},${i},0,1,${m},${e - o},${n - c}A${i},${i},0,1,${m},${this._x1 = f},${this._y1 = u}` : p > me && this._append`A${i},${i},0,${+(p >= Ei)},${m},${this._x1 = e + i * Math.cos(a)},${this._y1 = n + i * Math.sin(a)}`);
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
    for (var r = n.length, a = [], s = 0, o = t[0], c = 0; r > 0 && o > 0 && (c + o + 1 > i && (o = Math.max(1, i - c)), a.push(n.substring(r -= o, r + o)), !((c += o + 1) > i)); )
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
function Ln(t) {
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
Ln.prototype = Wi.prototype;
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
  var e = t.grouping === void 0 || t.thousands === void 0 ? Sr : tu(Ar.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Sr : eu(Ar.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function f(m) {
    m = Ln(m);
    var p = m.fill, _ = m.align, E = m.sign, z = m.symbol, I = m.zero, A = m.width, T = m.comma, x = m.precision, b = m.trim, S = m.type;
    S === "n" ? (T = !0, S = "g") : Er[S] || (x === void 0 && (x = 12), b = !0, S = "g"), (I || p === "0" && _ === "=") && (I = !0, p = "0", _ = "=");
    var $ = z === "$" ? n : z === "#" && /[boxX]/.test(S) ? "0" + S.toLowerCase() : "", k = z === "$" ? i : /[%p]/.test(S) ? s : "", B = Er[S], F = /[defgprs%]/.test(S);
    x = x === void 0 ? 6 : /[gprs]/.test(S) ? Math.max(1, Math.min(21, x)) : Math.max(0, Math.min(20, x));
    function O(v) {
      var q = $, P = k, J, et, lt;
      if (S === "c")
        P = B(v) + P, v = "";
      else {
        v = +v;
        var U = v < 0 || 1 / v < 0;
        if (v = isNaN(v) ? c : B(Math.abs(v), x), b && (v = iu(v)), U && +v == 0 && E !== "+" && (U = !1), q = (U ? E === "(" ? E : o : E === "-" || E === "(" ? "" : E) + q, P = (S === "s" ? $r[8 + fs / 3] : "") + P + (U && E === "(" ? ")" : ""), F) {
          for (J = -1, et = v.length; ++J < et; )
            if (lt = v.charCodeAt(J), 48 > lt || lt > 57) {
              P = (lt === 46 ? r + v.slice(J + 1) : v.slice(J)) + P, v = v.slice(0, J);
              break;
            }
        }
      }
      T && !I && (v = e(v, 1 / 0));
      var j = q.length + v.length + P.length, G = j < A ? new Array(A - j + 1).join(p) : "";
      switch (T && I && (v = e(G + v, G.length ? A - P.length : 1 / 0), G = ""), _) {
        case "<":
          v = q + v + P + G;
          break;
        case "=":
          v = q + G + v + P;
          break;
        case "^":
          v = G.slice(0, j = G.length >> 1) + q + v + P + G.slice(j);
          break;
        default:
          v = G + q + v + P;
          break;
      }
      return a(v);
    }
    return O.toString = function() {
      return m + "";
    }, O;
  }
  function u(m, p) {
    var _ = f((m = Ln(m), m.type = "f", m)), E = Math.max(-8, Math.min(8, Math.floor(Fe(p) / 3))) * 3, z = Math.pow(10, -E), I = $r[8 + E / 3];
    return function(A) {
      return _(z * A) + I;
    };
  }
  return {
    format: f,
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
    var c = mo(t, o, 1, i) - 1;
    return a[c](r[c](o));
  };
}
function gu(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function mu() {
  var t = Nr, e = Nr, n = Ui, i, r, a, s = Re, o, c, f;
  function u() {
    var p = Math.min(t.length, e.length);
    return s !== Re && (s = du(t[0], t[p - 1])), o = p > 2 ? _u : pu, c = f = null, m;
  }
  function m(p) {
    return p == null || isNaN(p = +p) ? a : (c || (c = o(t.map(i), e, n)))(i(s(p)));
  }
  return m.invert = function(p) {
    return s(r((f || (f = o(e, t.map(i), Qt)))(p)));
  }, m.domain = function(p) {
    return arguments.length ? (t = Array.from(p, hu), u()) : t.slice();
  }, m.range = function(p) {
    return arguments.length ? (e = Array.from(p), u()) : e.slice();
  }, m.rangeRound = function(p) {
    return e = Array.from(p), n = Rc, u();
  }, m.clamp = function(p) {
    return arguments.length ? (s = p ? !0 : Re, u()) : s !== Re;
  }, m.interpolate = function(p) {
    return arguments.length ? (n = p, u()) : n;
  }, m.unknown = function(p) {
    return arguments.length ? (a = p, m) : a;
  }, function(p, _) {
    return i = p, r = _, u();
  };
}
function vu() {
  return mu()(Re, Re);
}
function wu(t, e, n, i) {
  var r = xo(t, e, n), a;
  switch (i = Ln(i ?? ",f"), i.type) {
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
    var i = e(), r = 0, a = i.length - 1, s = i[r], o = i[a], c, f, u = 10;
    for (o < s && (f = s, s = o, o = f, f = r, r = a, a = f); u-- > 0; ) {
      if (f = gi(s, o, n), f === c)
        return i[r] = s, i[a] = o, e(i);
      if (f > 0)
        s = Math.floor(s / f) * f, o = Math.ceil(o / f) * f;
      else if (f < 0)
        s = Math.ceil(s * f) / f, o = Math.floor(o * f) / f;
      else
        break;
      c = f;
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
        const [c, f] = o.split(":");
        if (n < +c || e > +f)
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
  const n = e.node()?.getBBox().height ?? 0;
  e.selectAll(
    ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
  ).filter((r) => {
    let a = !1;
    return r.alleles?.length && (r.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((o) => {
      t.includes(o) && (a = !0);
    }), r.alleles.forEach((o) => {
      t.includes(o) && (a = !0);
    })), a;
  }).datum((r) => (r.selected = "true", r)).style("stroke", "black").each(function() {
    let r = $t(this).attr("x"), a = +$t(this).attr("width");
    (a === 0 || Number.isNaN(a)) && (a = 3, r = String(+r - a / 2)), e.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", r).attr("width", a).attr("height", n).attr("fill", "yellow").attr("opacity", 0.8).lower();
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
      ...Object.entries(t).map((i) => i[1]?.length ?? 0)
    ),
    descriptionHeight: e
  };
}
function Au(t, e, n) {
  const { fmax: i, fmin: r, type: a } = e;
  return t.findIndex((s) => {
    const o = s.fmin + n, c = s.fmax - n;
    return a !== s.type ? !1 : o <= r && c >= r || c <= i && c >= i || o >= r && c <= i;
  });
}
function ys(t, e) {
  const n = [];
  return t.forEach((i) => {
    const r = bs(i), { type: a, fmax: s, fmin: o } = i, c = Au(
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
          o
        ), p = Math.max(
          f.variantSet[u].fmax,
          s
        );
        f.fmin = m, f.fmax = p, f.variantSet[u].fmin = m, f.variantSet[u].fmax = p, f.variantSet[u].variants?.push(
          i
        );
      } else {
        const m = Math.min(f.fmin, o), p = Math.max(f.fmax, s);
        f.fmin = m, f.fmax = p, f.variantSet.push({
          variants: [i],
          type: a,
          consequence: r,
          fmin: o,
          fmax: s
        });
      }
      f.variants?.push(i), f.fmin = Math.min(o, f.fmin), f.fmax = Math.max(s, f.fmax), n[c] = f;
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
  let s = t.alternative_alleles, o = t.reference_allele, c;
  if (t.type === "SNV")
    c = "1bp";
  else if (t.type === "deletion")
    c = `${o.length - 1}bp deleted`;
  else if (t.type === "insertion")
    s === "ALT_MISSING" ? (c = "unknown length inserted", s = "n+") : c = `${s.length - 1}bp inserted`;
  else if (t.type === "MNV")
    c = `${o.length}bp`;
  else if (t.type === "delins") {
    const u = `${o.length - 1}bp deleted`;
    let m;
    s === "ALT_MISSING" ? (m = "unknown length inserted", s = "n+") : m = `${s.length - 1}bp inserted`, c = `${u}; ${m}`;
  } else
    c = `${+a - +r}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let f = "";
  return t.type === "insertion" ? f = `ins: ${s}` : t.type === "deletion" ? f = `del: ${o}` : f = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td>${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${c}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td>${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${f}</td></tr>`), n += "</tbody></table>", n;
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
    const n = e.allele_ids?.values?.[0];
    if (!n)
      return [];
    if (n.startsWith("[") && n.endsWith("]"))
      try {
        const i = JSON.parse(n);
        return (Array.isArray(i) ? i : [i]).map(String);
      } catch {
      }
    return n.replace(/"/g, "").split(",").map((i) => i.replace(/\[|\]| /g, ""));
  }).filter((e) => !!e);
}
function Di(t) {
  return t.map((e) => ms(e.consequence));
}
function bs(t) {
  if (t.geneLevelConsequence?.values && t.geneLevelConsequence.values.length > 0)
    return Ge(t.geneLevelConsequence.values[0]);
  if (t.consequence && typeof t.consequence == "string")
    return Ge(t.consequence);
  if (Array.isArray(t.consequence) && t.consequence.length > 0)
    return Ge(t.consequence[0]);
  const e = t.variants ?? [];
  if (e.length > 0) {
    for (const n of e)
      if (n.consequence && typeof n.consequence == "string")
        return Ge(n.consequence);
  }
  return "UNKNOWN";
}
function un(t) {
  return (Array.isArray(t?.values) ? t.values.join(" ") : t?.values) ?? "";
}
function $u(t) {
  return {
    symbol: Qe(t),
    symbolDetail: xs(t),
    location: `${t.seqId}:${t.fmin}..${t.fmax}`,
    consequence: bs(t),
    type: t.type,
    name: t.name,
    description: t.description,
    reference_allele: t.reference_allele,
    geneId: t.allele_of_gene_ids?.values[0].replace(/"/g, ""),
    geneSymbol: t.allele_of_gene_symbols?.values[0].replace(/"/g, ""),
    allele_of_genes: un(t.allele_of_genes),
    allele_ids: un(t.allele_ids),
    alternative_alleles: un(t.alternative_alleles),
    impact: un(t.impact)
  };
}
function xs(t) {
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : xs(t.variants[0]);
  if (t.allele_symbols?.values)
    if (t.allele_symbols.values[0].split(",").length > 1)
      try {
        const e = [], n = t.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          ""
        ), i = t.allele_ids?.values[0].replace(/"|\[|\]/g, "") ?? "", r = n.split(","), a = i.split(",");
        for (let s = 0; s < a.length; s++)
          e.push(
            `${r[s].trim()} (${a[s].trim()})`
          );
        return e.join(", ");
      } catch {
        return `${t.allele_symbols.values[0].split(",").length}`;
      }
    else
      return `${t.allele_symbols.values[0].replace(/"/g, "")}(${t.allele_ids?.values[0].replace(
        /"|\[|\]/g,
        ""
      )})`;
  return "";
}
function Qe(t) {
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : Qe(t.variants[0]);
  if (t.allele_symbols_text?.values) {
    const e = t.allele_symbols_text.values[0].split(",");
    return e.length > 1 ? `${e.length}` : t.allele_symbols_text.values[0].replace(/"/g, "");
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
function Lt(t) {
  return t == "unknown" ? Ri("grey", t.replace(/_/g, " ")) : Ri(
    kn[t].color,
    t.replace(/_/g, " ")
  );
}
function Iu() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${Ji(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Ri("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${vs(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ws(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("transcript_ablation")}</li>`, t += `<li>${Lt("splice_acceptor_variant")}</li>`, t += `<li>${Lt("splice_donor_variant")}</li>`, t += `<li>${Lt("stop_gained")}</li>`, t += `<li>${Lt("frameshift_variant")}</li>`, t += `<li>${Lt("stop_lost")}</li>`, t += `<li>${Lt("start_lost")}</li>`, t += `<li>${Lt("inframe_insertion")}</li>`, t += `<li>${Lt("inframe_deletion")}</li>`, t += `<li>${Lt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("protein_altering_variant")}</li>`, t += `<li>${Lt("splice_region_variant")}</li>`, t += `<li>${Lt("start_retained_variant")}</li>`, t += `<li>${Lt("stop_retained_variant")}</li>`, t += `<li>${Lt("synonymous_variant")}</li>`, t += `<li>${Lt("coding_sequence_variant")}</li>`, t += `<li>${Lt("five_prime_UTR_variant")}</li>`, t += `<li>${Lt("three_prime_UTR_variant")}</li>`, t += `<li>${Lt("intron_variant")}</li>`, t += `<li>${Lt("non_coding_transcript_variant")}</li>`, t += `<li>${Lt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
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
    binRatio: c,
    isoformFilter: f,
    initialHighlight: u,
    trackData: m,
    variantData: p
  }) {
    this.trackData = m ?? [], this.variantData = p ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.isoformFilter = f, this.initialHighlight = u, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.binRatio = c, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.isoformFilter;
    let n = this.trackData;
    const i = this.initialHighlight, r = this.filterVariantData(
      this.variantData,
      this.variantFilter
    ), a = this.viewer, s = this.width, o = this.binRatio, c = Nu(r), f = c.length, u = this.trackData[0].source, m = this.trackData[0].seqId, p = e.length === 0 ? 9 : 30, _ = ["UTR", "five_prime_UTR", "three_prime_UTR"], E = ["CDS"], z = ["exon"], I = this.transcriptTypes, A = gs(n, I), T = A.fmin, x = A.fmax, b = 10, S = 10, $ = 40, k = 20, B = 2, F = 0, O = 10, v = 10, q = 4, P = 20, J = 10, et = `0,0 0,${P} ${J},${J}`, lt = 10, U = 40, j = 22.5, G = he().domain([T, x]).range([0, s]), rt = a.append("g").attr("class", "deletions track").attr("transform", "translate(0,22.5)"), nt = a.append("g").attr("class", "label"), bt = {};
    for (let at = 0, dt = _.length; at < dt; at++)
      bt[_[at]] = 200;
    for (let at = 0, dt = E.length; at < dt; at++)
      bt[E[at]] = 1e3;
    for (let at = 0, dt = z.length; at < dt; at++)
      bt[z[at]] = 100;
    const pt = {};
    n = n.sort((at, dt) => at.selected && !dt.selected ? -1 : !at.selected && dt.selected ? 1 : at.name.localeCompare(dt.name));
    let xt = 0;
    const ft = $t("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), Q = () => {
      ft.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, ut = ys(
      r,
      (x - T) * o
    ), ot = ut.filter((at) => at.type === "deletion"), St = ut.filter((at) => at.type !== "deletion"), Nt = [];
    ot.forEach((at) => {
      const { fmax: dt, fmin: ht } = at, ct = this.width, Ft = Qe(at), Z = Ni(at), Tt = Ii(at), gt = $i(Z), wt = Di(Z)[0];
      Nt.push({
        fmin: ht,
        fmax: dt,
        row: Ir(Nt, ht, dt)
      });
      const g = Math.max(Math.ceil(G(dt) - G(ht)), B);
      rt.append("rect").attr("class", "variant-deletion").attr("id", `variant-${ht}`).attr("x", G(ht)).attr(
        "transform",
        `translate(0,${v * Ir(Nt, ht, dt)})`
      ).attr("z-index", 30).attr("fill", wt).attr("height", v).attr("width", g).on("click", () => {
        At(ft, gt, Q);
      }).on("mouseover", (L) => {
        const C = L.variant;
        Jt(
          ".variant-deletion"
        ).filter((V) => V.variant === C).style("stroke", "black"), $t(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((V) => V.variant === C).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-deletion").filter((L) => L.selected !== "true").style("stroke", null), $t(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ht,
        fmax: dt,
        variant: Ft + ht,
        alleles: Tt
      });
      {
        let L = 0;
        L = G(ht);
        const C = v * f + j, V = nt.append("text").attr("class", "variantLabel").attr("fill", wt).attr("opacity", 0).attr("height", F).attr("transform", `translate(${L},${C})`).text(Ft).on("click", () => {
          At(ft, gt, Q);
        }).datum({ fmin: ht, variant: Ft + ht }), w = V.node()?.getBBox().width ?? 0;
        if (w + L > ct) {
          const D = w + L - ct;
          L -= D, V.attr(
            "transform",
            `translate(${L},${C})`
          );
        }
      }
    });
    const It = ze(this.viewer), st = a.append("g").attr("class", "variants track").attr("transform", `translate(0,${It})`);
    St.forEach((at) => {
      const { type: dt, fmax: ht, fmin: ct } = at;
      let Ft = !0, Z = !1;
      const Tt = this.width, gt = Qe(at), wt = Ni(at), g = Ii(at), L = $i(wt), C = Di(wt)[0];
      if (dt.toLowerCase() === "snv" || dt.toLowerCase() === "point_mutation" ? (Z = !0, st.append("polygon").attr("class", "variant-SNV").attr("id", `variant-${ct}`).attr("points", Ji(G(ct))).attr("fill", C).attr("x", G(ct)).attr(
        "transform",
        `translate(0,${v * c.indexOf("snv")})`
      ).attr("z-index", 30).on("click", () => {
        At(ft, L, Q);
      }).on("mouseover", function(V) {
        const w = V.variant;
        Jt(
          ".variant-SNV"
        ).filter((D) => D.variant === w).style("stroke", "black"), $t(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((D) => D.variant === w).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-SNV").filter((V) => V.selected != "true").style("stroke", null), $t(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ct,
        fmax: ht,
        variant: gt + ct,
        alleles: g
      })) : dt.toLowerCase() === "insertion" ? (Z = !0, st.append("polygon").attr("class", "variant-insertion").attr("id", `variant-${ct}`).attr("points", vs(G(ct))).attr("fill", C).attr("x", G(ct)).attr(
        "transform",
        `translate(0,${v * c.indexOf("insertion")})`
      ).attr("z-index", 30).on("click", () => {
        At(ft, L, Q);
      }).on("mouseover", (V) => {
        const w = V.variant;
        Jt(
          ".variant-insertion"
        ).filter((D) => D.variant === w).style("stroke", "black"), $t(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((D) => D.variant === w).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(
          ".variant-insertion"
        ).filter((V) => V.selected != "true").style("stroke", null), $t(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ct,
        fmax: ht,
        variant: gt + ct,
        alleles: g
      })) : dt.toLowerCase() === "delins" || dt.toLowerCase() === "substitution" || dt.toLowerCase() === "indel" || dt.toLowerCase() === "mnv" ? (Z = !0, st.append("polygon").attr("class", "variant-delins").attr("id", `variant-${ct}`).attr("points", ws(G(ct))).attr("x", G(ct)).attr(
        "transform",
        `translate(0,${v * c.indexOf("delins")})`
      ).attr("fill", C).attr("z-index", 30).on("click", () => {
        At(ft, L, Q);
      }).on("mouseover", (V) => {
        const w = V.variant;
        Jt(
          ".variant-delins"
        ).filter((D) => D.variant === w).style("stroke", "black"), $t(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((D) => D.variant === w).style("opacity", 1);
      }).on("mouseout", () => {
        Jt(".variant-delins").filter((V) => V.selected != "true").style("stroke", null), $t(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: ct,
        fmax: ht,
        variant: gt + ct,
        alleles: g
      })) : (console.warn("type not found", dt, at), Ft = !1), Ft) {
        let V = 0;
        V = Z ? G(ct) - lt / 2 : G(ct);
        const w = v * f + j, D = nt.append("text").attr("class", "variantLabel").attr("fill", C).attr("opacity", 0).attr("height", F).attr("transform", `translate(${V},${w})`).text(gt).on("click", () => {
          At(ft, L, Q);
        }).datum({ fmin: ct, variant: gt + ct }), h = D.node()?.getBBox().width ?? 0;
        if (h + V > Tt) {
          const H = h + V - Tt;
          V -= H, D.attr("transform", `translate(${V},35)`);
        }
      }
    });
    const X = It;
    nt.attr("transform", `translate(0,${X})`);
    const Et = ze(this.viewer) + j, vt = a.append("g").attr("transform", `translate(0,${Et})`).attr("class", "track");
    let _t = 0;
    const kt = [];
    let W = -1, Rt = -1;
    const At = this.renderTooltipDescription, Bt = [];
    for (let at = 0; at < n.length && _t < p; at++) {
      const dt = n[at];
      let ht = dt.children;
      if (ht) {
        const ct = dt.selected;
        ht = ht.sort(
          (Z, Tt) => Z.name.localeCompare(Tt.name)
        );
        let Ft = !1;
        ht.forEach((Z) => {
          if (!(e.includes(Z.id) || e.includes(Z.name)) && e.length !== 0 || Bt.includes(Z.id))
            return;
          Bt.push(Z.id);
          const Tt = Z.type;
          if (I.includes(Tt)) {
            let gt = Yi(
              kt,
              G(Z.fmin),
              G(Z.fmax)
            );
            if (_t < p) {
              let wt = "", g, L = !1;
              const C = dt.name;
              Object.keys(pt).includes(C) || (xt += k, L = !0, pt[C] = "Green");
              const V = vt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${_t * $ + 10 + xt})`
              );
              L && (wt = C, g = V.append("text").attr("class", "geneLabel").attr("fill", ct ? "sandybrown" : "black").attr("height", F).attr(
                "transform",
                `translate(${G(Z.fmin)},-${k})`
              ).text(wt).on("click", () => {
                At(
                  ft,
                  Ct(dt),
                  Q
                );
              }).datum({
                fmin: Z.fmin
              })), V.append("polygon").datum(() => ({
                fmin: Z.fmin,
                fmax: Z.fmax,
                strand: dt.strand
              })).attr("class", "transArrow").attr("points", et).attr(
                "transform",
                (h) => dt.strand > 0 ? `translate(${Number(G(h.fmax))},0)` : `translate(${Number(G(h.fmin))},${P}) rotate(180)`
              ).on("click", () => {
                At(
                  ft,
                  Ct(Z),
                  Q
                );
              }), V.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + F).attr("height", q).attr("transform", `translate(${G(Z.fmin)},0)`).attr("width", G(Z.fmax) - G(Z.fmin)).on("click", () => {
                At(
                  ft,
                  Ct(Z),
                  Q
                );
              }).datum({
                fmin: Z.fmin,
                fmax: Z.fmax
              }), wt = Z.name, g = V.append("text").attr("class", "transcriptLabel").attr("fill", ct ? "sandybrown" : "gray").attr("opacity", ct ? 1 : 0.5).attr("height", F).attr("transform", `translate(${G(Z.fmin)},0)`).text(wt).on("click", () => {
                At(
                  ft,
                  Ct(Z),
                  Q
                );
              }).datum({
                fmin: Z.fmin
              });
              let w = wt.length * 2;
              try {
                w = g.node()?.getBBox().width ?? 0;
              } catch {
              }
              Number(w + G(Z.fmin)) > s;
              const D = w > G(Z.fmax) - G(Z.fmin) ? G(Z.fmin) + w : G(Z.fmax);
              if (kt[gt]) {
                const h = kt[gt];
                h.push(`${G(Z.fmin)}:${D}`), kt[gt] = h;
              } else
                kt[gt] = [
                  `${G(Z.fmin)}:${D}`
                ];
              (W < 0 || W > Z.fmin) && (W = Z.fmin), (Rt < 0 || Rt < Z.fmax) && (Rt = Z.fmax), Z.children && (Z.children = Z.children.sort((h, H) => {
                const it = bt[h.type], l = bt[H.type];
                return typeof it == "number" && typeof l == "number" ? it - l : typeof it == "number" && typeof l != "number" ? -1 : typeof it != "number" && typeof l == "number" ? 1 : h.type.localeCompare(H.type);
              }), Z.children.forEach((h) => {
                const H = h.type;
                z.includes(H) ? V.append("rect").attr("class", "exon").attr("x", G(h.fmin)).attr(
                  "transform",
                  `translate(0,${b - q})`
                ).attr("height", b).attr("z-index", 10).attr("width", G(h.fmax) - G(h.fmin)).on("click", () => {
                  At(
                    ft,
                    Ct(Z),
                    Q
                  );
                }).datum({ fmin: h.fmin, fmax: h.fmax }) : E.includes(H) ? V.append("rect").attr("class", "CDS").attr("x", G(h.fmin)).attr(
                  "transform",
                  `translate(0,${S - q})`
                ).attr("z-index", 20).attr("height", S).attr("width", G(h.fmax) - G(h.fmin)).on("click", () => {
                  At(
                    ft,
                    Ct(Z),
                    Q
                  );
                }).datum({ fmin: h.fmin, fmax: h.fmax }) : _.includes(H) && V.append("rect").attr("class", "UTR").attr("x", G(h.fmin)).attr(
                  "transform",
                  `translate(0,${O - q})`
                ).attr("z-index", 20).attr("height", O).attr("width", G(h.fmax) - G(h.fmin)).on("click", () => {
                  At(
                    ft,
                    Ct(Z),
                    Q
                  );
                }).datum({ fmin: h.fmin, fmax: h.fmax });
              })), _t += 1;
            }
            if (_t === p && !Ft) {
              const wt = ks(u, m, T, x);
              ++gt, Ft = !0, vt.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${_t * $ + 20 + xt})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", F).html(wt);
            }
          }
        });
      }
    }
    return i && Ki(i, a), _t === 0 && vt.append("text").attr("x", 30).attr("y", F + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), _t * $ + xt + U;
  }
  filterVariantData(e, n) {
    return n.length === 0 ? e : e.filter((i) => {
      let r = !1;
      try {
        (n.includes(i.name) || i.allele_symbols?.values && n.includes(
          i.allele_symbols.values[0].replace(/"/g, "")
        ) || i.symbol?.values && n.includes(i.symbol.values[0].replace(/"/g, "")) || i.symbol_text?.values && n.includes(i.symbol_text.values[0].replace(/"/g, ""))) && (r = !0), (i.allele_ids?.values[0].replace(/"|\[|\]| /g, "").split(",") ?? []).forEach((s) => {
          n.includes(s) && (r = !0);
        });
      } catch (a) {
        console.error(
          "error processing filter with so returning anyway",
          n,
          i,
          a
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
    const i = n.node()?.getBBox().height ?? 0;
    n.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((a) => {
      let s = !1;
      return a.alleles && (a.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((c) => {
        e.includes(c) && (s = !0);
      }), a.alleles.forEach((c) => {
        e.includes(c) && (s = !0);
      })), s;
    }).datum((a) => (a.selected = "true", a)).style("stroke", "black").each(function() {
      const a = +($t(this).attr("width") || 3), s = +$t(this).attr("x") - a / 2;
      n.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", s).attr("width", a).attr("height", i).attr("fill", "yellow").attr("opacity", 0.8).lower();
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
    initialHighlight: c,
    trackData: f,
    variantData: u
  }) {
    this.trackData = f ?? [], this.variantData = u ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.initialHighlight = c, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.showVariantLabel = s ?? !0;
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
    a.forEach((X) => {
      const Et = Ii(X);
      s.set(X, Et);
    });
    const o = this.viewer, c = this.width, f = this.showVariantLabel, u = ["UTR", "five_prime_UTR", "three_prime_UTR"], m = ["CDS"], p = ["exon"], _ = this.transcriptTypes, E = gs(i, _), z = E.fmin, I = E.fmax, A = 10, T = 10, x = 10, b = 40, S = 20, $ = 2, k = 0, B = 10, F = 10, O = 20, v = 4, q = 20, P = 10, J = `0,0 0,${q} ${P},${P}`, et = 10, lt = 10, U = (X) => `${X - lt / 2},${et} ${X},0 ${X + lt / 2},${et}`, j = (X) => `${X - lt / 2},${et} ${X + lt / 2},${et} ${X - lt / 2},0 ${X + lt / 2},0`, G = (X) => `${X},${et} ${X + lt / 2},${et / 2} ${X},0 ${X - lt / 2},${et / 2}`, rt = he().domain([z, I]).range([0, c]), nt = ze(this.viewer), bt = o.append("g").attr("transform", `translate(0,${nt})`).attr("class", "track"), pt = {};
    for (const X of u)
      pt[X] = 200;
    for (const X of m)
      pt[X] = 1e3;
    for (const X of p)
      pt[X] = 100;
    const xt = {};
    i = i.sort((X, Et) => X.selected && !Et.selected ? -1 : !X.selected && Et.selected ? 1 : X.name - Et.name);
    let ft = 0;
    const Q = $t("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), ut = () => {
      Q.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let ot = 0;
    const St = [];
    let Nt = -1, It = -1;
    const st = this.renderTooltipDescription;
    for (let X = 0; X < i.length && ot < A; X++) {
      const Et = i[X];
      let vt = Et.children;
      if (vt) {
        const _t = Et.selected;
        vt = vt.sort((W, Rt) => W.name < Rt.name ? -1 : W.name > Rt.name ? 1 : W - Rt);
        let kt = !1;
        vt.forEach((W) => {
          const Rt = W.type;
          if (_.includes(Rt)) {
            let At = Yi(
              St,
              rt(W.fmin),
              rt(W.fmax)
            );
            if (ot < A) {
              let Bt, at, dt = !1;
              Object.keys(xt).includes(Et.name) || (ft += S, dt = !0, xt[Et.name] = "Green");
              const ht = bt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ot * b + 10 + ft})`
              );
              dt && (Bt = Et.name, at = ht.append("text").attr("class", "geneLabel").attr("fill", _t ? "sandybrown" : "black").attr("height", k).attr(
                "transform",
                `translate(${rt(W.fmin)},-${S})`
              ).text(Bt).on("click", () => {
                st(
                  Q,
                  Ct(Et),
                  ut
                );
              }).datum({ fmin: W.fmin })), ht.append("polygon").datum(() => ({
                fmin: W.fmin,
                fmax: W.fmax,
                strand: Et.strand
              })).attr("class", "transArrow").attr("points", J).attr("transform", (Z) => Et.strand > 0 ? `translate(${Number(rt(Z.fmax))},0)` : `translate(${Number(rt(Z.fmin))},${q}) rotate(180)`).on("click", () => {
                st(
                  Q,
                  Ct(W),
                  ut
                );
              }), ht.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + k).attr("height", v).attr("transform", `translate(${rt(W.fmin)},0)`).attr("width", rt(W.fmax) - rt(W.fmin)).on("click", () => {
                st(
                  Q,
                  Ct(W),
                  ut
                );
              }).datum({ fmin: W.fmin, fmax: W.fmax }), Bt = W.name, at = ht.append("text").attr("class", "transcriptLabel").attr("fill", _t ? "sandybrown" : "gray").attr("opacity", _t ? 1 : 0.5).attr("height", k).attr("transform", `translate(${rt(W.fmin)},0)`).text(Bt).on("click", () => {
                st(
                  Q,
                  Ct(W),
                  ut
                );
              }).datum({ fmin: W.fmin });
              let ct = Bt.length * 2;
              try {
                ct = at.node().getBBox().width;
              } catch {
              }
              Number(ct + rt(W.fmin)) > c;
              const Ft = ct > rt(W.fmax) - rt(W.fmin) ? rt(W.fmin) + ct : rt(W.fmax);
              if (St[At]) {
                const Z = St[At];
                Z.push(`${rt(W.fmin)}:${Ft}`), St[At] = Z;
              } else
                St[At] = [
                  `${rt(W.fmin)}:${Ft}`
                ];
              (Nt < 0 || Nt > W.fmin) && (Nt = W.fmin), (It < 0 || It < W.fmax) && (It = W.fmax), W.children && (W.children = W.children.sort((Z, Tt) => {
                const gt = pt[Z.type], wt = pt[Tt.type];
                return typeof gt == "number" && typeof wt == "number" ? gt - wt : typeof gt == "number" && typeof wt != "number" ? -1 : typeof gt != "number" && typeof wt == "number" ? 1 : Z.type - Tt.type;
              }), W.children.forEach((Z) => {
                const Tt = Z.type;
                let gt = !1;
                p.includes(Tt) ? (gt = !0, ht.append("rect").attr("class", "exon").attr("x", rt(Z.fmin)).attr(
                  "transform",
                  `translate(0,${T - v})`
                ).attr("height", T).attr("z-index", 10).attr("width", rt(Z.fmax) - rt(Z.fmin)).on("click", () => {
                  st(
                    Q,
                    Ct(W),
                    ut
                  );
                }).datum({ fmin: Z.fmin, fmax: Z.fmax })) : m.includes(Tt) ? (gt = !0, ht.append("rect").attr("class", "CDS").attr("x", rt(Z.fmin)).attr(
                  "transform",
                  `translate(0,${x - v})`
                ).attr("z-index", 20).attr("height", x).attr("width", rt(Z.fmax) - rt(Z.fmin)).on("click", () => {
                  st(
                    Q,
                    Ct(W),
                    ut
                  );
                }).datum({ fmin: Z.fmin, fmax: Z.fmax })) : u.includes(Tt) && (gt = !0, ht.append("rect").attr("class", "UTR").attr("x", rt(Z.fmin)).attr(
                  "transform",
                  `translate(0,${B - v})`
                ).attr("z-index", 20).attr("height", B).attr("width", rt(Z.fmax) - rt(Z.fmin)).on("click", () => {
                  st(
                    Q,
                    Ct(W),
                    ut
                  );
                }).datum({ fmin: Z.fmin, fmax: Z.fmax })), gt && a.forEach((wt) => {
                  const { type: g, fmax: L, fmin: C } = wt;
                  if (C < Z.fmin && L > Z.fmin || L > Z.fmax && C < Z.fmax || L <= Z.fmax && C >= Z.fmin) {
                    let w = !0;
                    const D = Ni(wt), h = Di(D)[0], H = $i(D), it = Math.max(
                      Math.ceil(rt(L) - rt(C)),
                      $
                    );
                    if (g.toLowerCase() === "deletion" || g.toLowerCase() === "mnv" ? ht.append("rect").attr("class", "variant-deletion").attr("x", rt(C)).attr(
                      "transform",
                      `translate(0,${O - v})`
                    ).attr("z-index", 30).attr("fill", h).attr("height", F).attr("width", it).on("click", () => {
                      st(
                        Q,
                        H,
                        ut
                      );
                    }).datum({
                      fmin: C,
                      fmax: L,
                      alleles: s.get(wt) ?? []
                    }) : g.toLowerCase() === "snv" || g.toLowerCase() === "point_mutation" ? ht.append("polygon").attr("class", "variant-SNV").attr("points", G(rt(C))).attr("fill", h).attr("x", rt(C)).attr(
                      "transform",
                      `translate(0,${O - v})`
                    ).attr("z-index", 30).on("click", () => {
                      st(
                        Q,
                        H,
                        ut
                      );
                    }).datum({
                      fmin: C,
                      fmax: L,
                      alleles: s.get(wt) ?? []
                    }) : g.toLowerCase() === "insertion" ? ht.append("polygon").attr("class", "variant-insertion").attr("points", U(rt(C))).attr("fill", h).attr("x", rt(C)).attr(
                      "transform",
                      `translate(0,${O - v})`
                    ).attr("z-index", 30).on("click", () => {
                      st(
                        Q,
                        H,
                        ut
                      );
                    }).datum({
                      fmin: C,
                      fmax: L,
                      alleles: s.get(wt) ?? []
                    }) : g.toLowerCase() === "delins" || g.toLowerCase() === "substitution" || g.toLowerCase() === "indel" ? ht.append("polygon").attr("class", "variant-delins").attr("points", j(rt(C))).attr("x", rt(C)).attr(
                      "transform",
                      `translate(0,${O - v})`
                    ).attr("fill", h).attr("z-index", 30).on("click", () => {
                      st(
                        Q,
                        H,
                        ut
                      );
                    }).datum({
                      fmin: C,
                      fmax: L,
                      alleles: s.get(wt) ?? []
                    }) : w = !1, w && f) {
                      const l = Qe(wt), R = l.length || 1;
                      ht.append("text").attr("class", "variantLabel").attr(
                        "fill",
                        _t ? "sandybrown" : h
                      ).attr("opacity", _t ? 1 : 0.5).attr("height", k).attr(
                        "transform",
                        `translate(${rt(C - R / 2 * 100)},${O * 2.2 - v})`
                      ).html(l).on("click", () => {
                        st(
                          Q,
                          H,
                          ut
                        );
                      }).datum({ fmin: W.fmin });
                    }
                  }
                });
              })), ot += 1;
            }
            ot === A && !kt && (++At, kt = !0, bt.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${ot * b + 20 + ft})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", k).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    if (ot === 0 && bt.append("text").attr("x", 30).attr("y", k + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), this.initialHighlight)
      try {
        Ki(this.initialHighlight, this.viewer);
      } catch {
      }
    return ot * b + ft;
  }
  filterVariantData(e, n) {
    if (n.length === 0)
      return e;
    const i = new Set(n);
    return e.filter((a) => {
      let s = !1;
      try {
        if (i.has(a.name) && (s = !0), a.allele_symbols?.values) {
          const c = a.allele_symbols.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          i.has(c) && (s = !0);
        }
        if (a.symbol?.values) {
          const c = a.symbol.values[0].replace(/"|\\[|\\]| /g, "");
          i.has(c) && (s = !0);
        }
        if (a.symbol_text?.values) {
          const c = a.symbol_text.values[0].replace(
            /"|\\[|\\]| /g,
            ""
          );
          i.has(c) && (s = !0);
        }
        const o = a.allele_ids?.values?.[0];
        if (o) {
          let c = [];
          if (o.startsWith("[") && o.endsWith("]"))
            try {
              const f = JSON.parse(o);
              c = (Array.isArray(f) ? f : [f]).map(String);
            } catch {
              c = o.replace(/"|\\[|\\]| /g, "").split(",");
            }
          else
            c = o.replace(/"|\\[|\\]| /g, "").split(",");
          for (const f of c)
            if (i.has(f)) {
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
class Lu {
  constructor({
    viewer: e,
    height: n,
    width: i,
    transcriptTypes: r,
    htpVariant: a,
    trackData: s,
    region: o,
    genome: c
  }) {
    this.trackData = s ?? [], this.viewer = e, this.width = i, this.height = n, this.transcriptTypes = r, this.htpVariant = a, this.region = o, this.genome = c;
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
  DrawTrack() {
    let e = this.trackData;
    const n = this.htpVariant, i = this.viewer, r = this.width, a = this.genome, s = e[0]?.seqId, o = 10, c = ["UTR", "five_prime_UTR", "three_prime_UTR"], f = ["CDS"], u = ["exon"], m = this.transcriptTypes, p = 10, _ = 10, E = 40, z = 0, I = 10, A = 4, T = 20, x = 10, b = `0,0 0,${T} ${x},${x}`, S = this.renderTooltipDescription, $ = he().domain([this.region.start, this.region.end]).range([0, r]), k = {};
    for (let U = 0, j = c.length; U < j; U++)
      k[c[U]] = 200;
    for (let U = 0, j = f.length; U < j; U++)
      k[f[U]] = 1e3;
    for (let U = 0, j = u.length; U < j; U++)
      k[u[U]] = 100;
    e = e.sort((U, j) => U.selected && !j.selected ? -1 : !U.selected && j.selected ? 1 : U.name - j.name);
    const B = $t("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), F = () => {
      B.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const U = i.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, j] = n.split(":");
      U.append("polygon").attr("class", "variant-SNV").attr("points", Ji($(+j))).attr("fill", "red").attr("x", $(+j)).attr("z-index", 30);
    }
    const O = ze(this.viewer), v = i.append("g").attr("transform", `translate(0,${O})`).attr("class", "track");
    let q = 0;
    const P = [];
    let J = -1, et = -1;
    const lt = [];
    for (let U = 0; U < e.length && q < o; U++) {
      const j = e[U];
      let G = j.children;
      if (G) {
        const rt = j.selected;
        G = G.sort((nt, bt) => nt.name < bt.name ? -1 : nt.name > bt.name ? 1 : 0), G.forEach((nt) => {
          const bt = nt.type;
          if (!lt.includes(nt.id) && (lt.push(nt.id), m.includes(bt))) {
            let pt = Yi(
              P,
              $(nt.fmin),
              $(nt.fmax)
            );
            if (q < o) {
              const xt = v.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${q * E + 10})`
              ), ft = Math.max($(nt.fmin), 0), Q = Math.min($(nt.fmax), this.width);
              xt.append("polygon").datum(() => ({
                strand: j.strand
              })).attr("class", "transArrow").attr("points", b).attr(
                "transform",
                () => j.strand > 0 ? `translate(${Q},0)` : `translate(${ft},${T}) rotate(180)`
              ).on("click", () => {
                S(
                  B,
                  Ct(nt),
                  F
                );
              }), xt.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + z).attr("height", A).attr("transform", `translate(${ft},0)`).attr("width", Q - ft).datum({
                fmin: nt.fmin,
                fmax: nt.fmax
              }).on("click", () => {
                S(
                  B,
                  Ct(nt),
                  F
                );
              });
              let ut = nt.name;
              j.name !== nt.name && (ut += ` (${j.name})`);
              let ot = Math.max($(nt.fmin), 0);
              const St = xt.append("svg:text").attr("class", "transcriptLabel").attr("fill", rt ? "sandybrown" : "gray").attr("opacity", rt ? 1 : 0.5).attr("height", z).attr("transform", `translate(${ot},0)`).text(ut).datum({
                fmin: nt.fmin
              }).on("click", () => {
                S(
                  B,
                  Ct(nt),
                  F
                );
              });
              let Nt = 100;
              try {
                Nt = St.node()?.getBBox().width ?? 0;
              } catch {
              }
              if (Nt + ot > this.width) {
                const X = Nt + ot - this.width;
                ot -= X, St.attr("transform", `translate(${ot},0)`);
              }
              let It = ut.length * 2;
              try {
                It = St.node()?.getBBox().width ?? 0;
              } catch (X) {
                console.error("Not yet rendered", X);
              }
              Number(It + $(nt.fmin)) > r;
              const st = It > $(nt.fmax) - $(nt.fmin) ? $(nt.fmin) + It : $(nt.fmax);
              if (P[pt]) {
                const X = P[pt];
                X.push(`${$(nt.fmin)}:${st}`), P[pt] = X;
              } else
                P[pt] = [`${$(nt.fmin)}:${st}`];
              (J < 0 || J > nt.fmin) && (J = nt.fmin), (et < 0 || et < nt.fmax) && (et = nt.fmax), nt.children && (nt.children = nt.children.sort(
                function(X, Et) {
                  const vt = k[X.type], _t = k[Et.type];
                  return typeof vt == "number" && typeof _t == "number" ? vt - _t : typeof vt == "number" && typeof _t != "number" ? -1 : typeof vt != "number" && typeof _t == "number" ? 1 : X.type.localeCompare(Et.type);
                }
              ), nt.children.forEach((X) => {
                const Et = X.type;
                if ($(X.fmin) > this.width || $(X.fmax) < 0)
                  return;
                const vt = Math.max($(X.fmin), 0), _t = Math.min($(X.fmax), this.width);
                u.includes(Et) ? xt.append("rect").attr("class", "exon").attr("x", vt).attr(
                  "transform",
                  `translate(0,${p - A})`
                ).attr("height", p).attr("z-index", 10).attr("width", _t - vt).datum({
                  fmin: X.fmin,
                  fmax: X.fmax
                }).on("click", () => {
                  S(
                    B,
                    Ct(nt),
                    F
                  );
                }) : f.includes(Et) ? xt.append("rect").attr("class", "CDS").attr("x", vt).attr(
                  "transform",
                  `translate(0,${_ - A})`
                ).attr("z-index", 20).attr("height", _).attr("width", _t - vt).datum({
                  fmin: X.fmin,
                  fmax: X.fmax
                }).on("click", () => {
                  S(
                    B,
                    Ct(nt),
                    F
                  );
                }) : c.includes(Et) && xt.append("rect").attr("class", "UTR").attr("x", vt).attr(
                  "transform",
                  `translate(0,${I - A})`
                ).attr("z-index", 20).attr("height", I).attr("width", _t - vt).datum({
                  fmin: X.fmin,
                  fmax: X.fmax
                }).on("click", () => {
                  S(
                    B,
                    Ct(nt),
                    F
                  );
                });
              })), q += 1;
            }
            if (q === o) {
              const xt = ks(
                a,
                s,
                this.region.start,
                this.region.end
              );
              ++pt, v.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${q * E + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", z).html(xt);
            }
          }
        });
      }
    }
    return q === 0 && v.append("text").attr("x", 30).attr("y", z + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), q * E;
  }
}
class Ou {
  constructor({ viewer: e, track: n, height: i, width: r }) {
    this.refSeq = "", this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, i = he().domain([this.track.start, this.track.end + 1]).range(this.track.range), r = No(i).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((c, f) => n[f]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), s = lr(i).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(r), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = Jt(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), Jt(".x-local-axis .tick text").each(function() {
      const f = $t(this).text();
      let u = "nucleotide nt-a";
      f === "T" ? u = "nucleotide nt-t" : f === "C" ? u = "nucleotide nt-c" : f === "G" && (u = "nucleotide nt-g"), $t(this.parentNode).append("rect").attr("class", u).attr("transform", "translate(-8,8)");
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
function On() {
}
On.prototype = Qi.prototype = {
  constructor: On,
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
  var n = new On();
  if (t instanceof On) t.each(function(o, c) {
    n.set(c, o);
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
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, u = 0; u < s; ++u)
      (c = a[u]) && (f = t.call(c, c.__data__, u, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[u] = f);
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
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (i.push(t.call(c, c.__data__, f, s)), r.push(c));
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
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
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
var Lr = "$";
function Wu(t, e, n, i, r, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Cn(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (r[s] = o);
}
function Xu(t, e, n, i, r, a, s) {
  var o, c, f = {}, u = e.length, m = a.length, p = new Array(u), _;
  for (o = 0; o < u; ++o)
    (c = e[o]) && (p[o] = _ = Lr + s.call(c, c.__data__, o, e), _ in f ? r[o] = c : f[_] = c);
  for (o = 0; o < m; ++o)
    _ = Lr + s.call(t, a[o], o, a), (c = f[_]) ? (i[o] = c, c.__data__ = a[o], f[_] = null) : n[o] = new Cn(t, a[o]);
  for (o = 0; o < u; ++o)
    (c = e[o]) && f[p[o]] === c && (r[o] = c);
}
function Yu(t, e) {
  if (!t)
    return _ = new Array(this.size()), f = -1, this.each(function($) {
      _[++f] = $;
    }), _;
  var n = e ? Xu : Wu, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Gu(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var u = i[f], m = r[f], p = m.length, _ = t.call(u, u && u.__data__, f, i), E = _.length, z = o[f] = new Array(E), I = s[f] = new Array(E), A = c[f] = new Array(p);
    n(u, m, z, I, A, _, e);
    for (var T = 0, x = 0, b, S; T < E; ++T)
      if (b = z[T]) {
        for (T >= x && (x = T + 1); !(S = I[x]) && ++x < E; ) ;
        b._next = S || null;
      }
  }
  return s = new qt(s, i), s._enter = o, s._exit = c, s;
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
    for (var c = e[o], f = n[o], u = c.length, m = s[o] = new Array(u), p, _ = 0; _ < u; ++_)
      (p = c[_] || f[_]) && (m[_] = p);
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
  function e(m, p) {
    return m && p ? t(m.__data__, p.__data__) : !m - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, u = 0; u < o; ++u)
      (f = s[u]) && (c[u] = f);
    c.sort(e);
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
function Lh(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Oh(t) {
  return arguments.length ? this.each(t == null ? Rh : (typeof t == "function" ? Lh : Mh)(t)) : this.node().innerHTML;
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
  return t = Ls(t, e, n), function(i) {
    var r = i.relatedTarget;
    (!r || r !== this && !(r.compareDocumentPosition(this) & 8)) && t.call(this, i);
  };
}
function Ls(t, e, n) {
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
  var i = Ms.hasOwnProperty(t.type) ? Kh : Ls;
  return function(r, a, s) {
    var o = this.__on, c, f = i(e, a, s);
    if (o) {
      for (var u = 0, m = o.length; u < m; ++u)
        if ((c = o[u]).type === t.type && c.name === t.name) {
          this.removeEventListener(c.type, c.listener, c.capture), this.addEventListener(c.type, c.listener = f, c.capture = n), c.value = e;
          return;
        }
    }
    this.addEventListener(t.type, f, n), c = { type: t.type, name: t.name, value: e, listener: f, capture: n }, o ? o.push(c) : this.__on = [c];
  };
}
function td(t, e, n) {
  var i = Jh(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, f = o.length, u; c < f; ++c)
        for (r = 0, u = o[c]; r < a; ++r)
          if ((s = i[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? jh : Qh, n == null && (n = !1), r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Os(t, e, n) {
  var i = $s(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function ed(t, e) {
  return function() {
    return Os(this, t, e);
  };
}
function nd(t, e) {
  return function() {
    return Os(this, t, e.apply(this, arguments));
  };
}
function id(t, e) {
  return this.each((typeof e == "function" ? nd : ed)(t, e));
}
var Cs = [null];
function qt(t, e) {
  this._groups = t, this._parents = e;
}
function Li() {
  return new qt([[document.documentElement]], Cs);
}
qt.prototype = Li.prototype = {
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
  html: Oh,
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
function Or(t) {
  return typeof t == "string" ? new qt([[document.querySelector(t)]], [document.documentElement]) : new qt([[t]], Cs);
}
function rd() {
  var t = f, e = u, n = m, i = document.body, r = $(), a = null, s = null, o = null;
  function c(v) {
    a = k(v), a && (s = a.createSVGPoint(), i.appendChild(r));
  }
  c.show = function() {
    var v = Array.prototype.slice.call(arguments);
    v[v.length - 1] instanceof SVGElement && (o = v.pop());
    var q = n.apply(this, v), P = e.apply(this, v), J = t.apply(this, v), et = B(), lt = _.length, U, j = document.documentElement.scrollTop || i.scrollTop, G = document.documentElement.scrollLeft || i.scrollLeft;
    for (et.html(q).style("opacity", 1).style("pointer-events", "all"); lt--; ) et.classed(_[lt], !1);
    return U = p.get(J).apply(this), et.classed(J, !0).style("top", U.top + P[0] + j + "px").style("left", U.left + P[1] + G + "px"), c;
  }, c.hide = function() {
    var v = B();
    return v.style("opacity", 0).style("pointer-events", "none"), c;
  }, c.attr = function(v, q) {
    if (arguments.length < 2 && typeof v == "string")
      return B().attr(v);
    var P = Array.prototype.slice.call(arguments);
    return Li.prototype.attr.apply(B(), P), c;
  }, c.style = function(v, q) {
    if (arguments.length < 2 && typeof v == "string")
      return B().style(v);
    var P = Array.prototype.slice.call(arguments);
    return Li.prototype.style.apply(B(), P), c;
  }, c.direction = function(v) {
    return arguments.length ? (t = v == null ? v : O(v), c) : t;
  }, c.offset = function(v) {
    return arguments.length ? (e = v == null ? v : O(v), c) : e;
  }, c.html = function(v) {
    return arguments.length ? (n = v == null ? v : O(v), c) : n;
  }, c.rootElement = function(v) {
    return arguments.length ? (i = v == null ? v : O(v), c) : i;
  }, c.destroy = function() {
    return r && (B().remove(), r = null), c;
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
  var p = Qi({
    n: E,
    s: z,
    e: I,
    w: A,
    nw: T,
    ne: x,
    sw: b,
    se: S
  }), _ = p.keys();
  function E() {
    var v = F(this);
    return {
      top: v.n.y - r.offsetHeight,
      left: v.n.x - r.offsetWidth / 2
    };
  }
  function z() {
    var v = F(this);
    return {
      top: v.s.y,
      left: v.s.x - r.offsetWidth / 2
    };
  }
  function I() {
    var v = F(this);
    return {
      top: v.e.y - r.offsetHeight / 2,
      left: v.e.x
    };
  }
  function A() {
    var v = F(this);
    return {
      top: v.w.y - r.offsetHeight / 2,
      left: v.w.x - r.offsetWidth
    };
  }
  function T() {
    var v = F(this);
    return {
      top: v.nw.y - r.offsetHeight,
      left: v.nw.x - r.offsetWidth
    };
  }
  function x() {
    var v = F(this);
    return {
      top: v.ne.y - r.offsetHeight,
      left: v.ne.x
    };
  }
  function b() {
    var v = F(this);
    return {
      top: v.sw.y,
      left: v.sw.x - r.offsetWidth
    };
  }
  function S() {
    var v = F(this);
    return {
      top: v.se.y,
      left: v.se.x
    };
  }
  function $() {
    var v = Or(document.createElement("div"));
    return v.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), v.node();
  }
  function k(v) {
    var q = v.node();
    return q ? q.tagName.toLowerCase() === "svg" ? q : q.ownerSVGElement : null;
  }
  function B() {
    return r == null && (r = $(), i.appendChild(r)), Or(r);
  }
  function F(v) {
    for (var q = o || v; q.getScreenCTM == null && q.parentNode != null; )
      q = q.parentNode;
    var P = {}, J = q.getScreenCTM(), et = q.getBBox(), lt = et.width, U = et.height, j = et.x, G = et.y;
    return s.x = j, s.y = G, P.nw = s.matrixTransform(J), s.x += lt, P.ne = s.matrixTransform(J), s.y += U, P.se = s.matrixTransform(J), s.x -= lt, P.sw = s.matrixTransform(J), s.y -= U / 2, P.w = s.matrixTransform(J), s.x += lt, P.e = s.matrixTransform(J), s.x -= lt / 2, s.y -= U / 2, P.n = s.matrixTransform(J), s.y += U, P.s = s.matrixTransform(J), P;
  }
  function O(v) {
    return typeof v == "function" ? v : function() {
      return v;
    };
  }
  return c;
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
    const s = 20, o = ze(this.viewer), c = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    c.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), c.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (m) => `translate(${i(m.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const u = $t("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
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
    o.append("rect").attr("height", a).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), o.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (c) => `translate(${i(c.position)},10)`);
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
      promise: this.fillCallback(n, a.signal, (c) => {
        s.callback(c);
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
    }).catch((c) => {
      throw console.error(c), c;
    }), this.cache.set(e, o);
  }
  static checkSinglePromise(e, n) {
    function i() {
      if (n?.aborted)
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
      function a(T) {
        return n.test(T);
      }
      function s(T) {
        return T.startsWith("//");
      }
      function o(T) {
        return T.startsWith("/");
      }
      function c(T) {
        return T.startsWith("file:");
      }
      function f(T) {
        return /^[.?#]/.test(T);
      }
      function u(T) {
        const x = i.exec(T);
        return p(x[1], x[2] || "", x[3], x[4] || "", x[5] || "/", x[6] || "", x[7] || "");
      }
      function m(T) {
        const x = r.exec(T), b = x[2];
        return p("file:", "", x[1] || "", "", o(b) ? b : "/" + b, x[3] || "", x[4] || "");
      }
      function p(T, x, b, S, $, k, B) {
        return {
          scheme: T,
          user: x,
          host: b,
          port: S,
          path: $,
          query: k,
          hash: B,
          type: 7
        };
      }
      function _(T) {
        if (s(T)) {
          const b = u("http:" + T);
          return b.scheme = "", b.type = 6, b;
        }
        if (o(T)) {
          const b = u("http://foo.com" + T);
          return b.scheme = "", b.host = "", b.type = 5, b;
        }
        if (c(T))
          return m(T);
        if (a(T))
          return u(T);
        const x = u("http://foo.com/" + T);
        return x.scheme = "", x.host = "", x.type = T ? T.startsWith("?") ? 3 : T.startsWith("#") ? 2 : 4 : 1, x;
      }
      function E(T) {
        if (T.endsWith("/.."))
          return T;
        const x = T.lastIndexOf("/");
        return T.slice(0, x + 1);
      }
      function z(T, x) {
        I(x, x.type), T.path === "/" ? T.path = x.path : T.path = E(x.path) + T.path;
      }
      function I(T, x) {
        const b = x <= 4, S = T.path.split("/");
        let $ = 1, k = 0, B = !1;
        for (let O = 1; O < S.length; O++) {
          const v = S[O];
          if (!v) {
            B = !0;
            continue;
          }
          if (B = !1, v !== ".") {
            if (v === "..") {
              k ? (B = !0, k--, $--) : b && (S[$++] = v);
              continue;
            }
            S[$++] = v, k++;
          }
        }
        let F = "";
        for (let O = 1; O < $; O++)
          F += "/" + S[O];
        (!F || B && !F.endsWith("/..")) && (F += "/"), T.path = F;
      }
      function A(T, x) {
        if (!T && !x)
          return "";
        const b = _(T);
        let S = b.type;
        if (x && S !== 7) {
          const k = _(x), B = k.type;
          switch (S) {
            case 1:
              b.hash = k.hash;
            // fall through
            case 2:
              b.query = k.query;
            // fall through
            case 3:
            case 4:
              z(b, k);
            // fall through
            case 5:
              b.user = k.user, b.host = k.host, b.port = k.port;
            // fall through
            case 6:
              b.scheme = k.scheme;
          }
          B > S && (S = B);
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
            const k = b.path.slice(1);
            return k ? f(x || T) && !f(k) ? "./" + k + $ : k + $ : $ || ".";
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
    const c = this.attrs.makeGetter("Chunk"), f = this.attrs.makeGetter("Sublist"), u = [];
    for (let m = this.binarySearch(e, n, a); m < e.length && m >= 0 && r * s(e[m]) < r * i; m += r) {
      if (e[m][0] === this.lazyClass) {
        const _ = c(e[m]), E = this.chunkCache.get(_, _).then((z) => [z, _]);
        u.push(E);
      } else
        yield [e[m], o.concat(m)];
      const p = f(e[m]);
      p && (yield* this.iterateSublist(p, n, i, r, a, s, o.concat(m)));
    }
    for (const m of u) {
      const [p, _] = await m;
      p && (yield* this.iterateSublist(p, n, i, r, a, s, [
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
      const o = Math.max(0, (this.start(s) - e) / a | 0), c = Math.min(i, (this.end(s) - e) / a | 0);
      for (let f = o; f <= c; f += 1)
        r[f] += 1;
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
      const [o, c] = await s;
      yield* this.filterChunkData(e, n, o, c);
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
    for (let c = s; c <= o; c += 1)
      yield [c + a, r[c]];
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
    if (r?.meta) {
      for (let a = 0; a < r.meta.length; a += 1)
        r.meta[a].lazyArray = new vd({ ...r.meta[a].arrayParams, readFile: this.readFile }, n);
      i._histograms = r;
    }
    return i._histograms && Object.keys(i._histograms).forEach((a) => {
      i._histograms[a].forEach((o) => {
        Object.keys(o).forEach((c) => {
          typeof o[c] == "string" && String(Number(o[c])) === o[c] && (o[c] = Number(o[c]));
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
    const c = (s._histograms.stats || []).find((p) => p.basesPerBin >= a);
    let f = s._histograms.meta[0];
    for (let p = 0; p < s._histograms.meta.length; p += 1)
      a >= s._histograms.meta[p].basesPerBin && (f = s._histograms.meta[p]);
    let u = a / f.basesPerBin;
    if (u > 0.9 && Math.abs(u - Math.round(u)) < 1e-4) {
      const p = Math.floor(n / f.basesPerBin);
      u = Math.round(u);
      const _ = [];
      for (let E = 0; E < r; E += 1)
        _[E] = 0;
      for await (const [E, z] of f.lazyArray.range(p, p + u * r - 1))
        _[Math.floor((E - p) / u)] += z;
      return { bins: _, stats: c };
    }
    return { bins: await s.nclist.histogram(n, i, r), stats: c };
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
    const r = await this.getDataRoot(e), a = r.attrs?.accessors();
    for await (const [s, o] of r.nclist.iterate(n, i)) {
      if (!s.decorated) {
        const c = o.join(",");
        this.decorateFeature(a, s, `${e},${c}`);
      }
      yield s;
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
const Ld = (t, e, n, i) => {
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
var Oi = Ld;
const Od = () => {
  let t, e = [];
  for (var n = 0; n < 256; n++) {
    t = n;
    for (var i = 0; i < 8; i++)
      t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
    e[n] = t;
  }
  return e;
}, Cd = new Uint32Array(Od()), Fd = (t, e, n, i) => {
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
  let i, r, a, s, o, c, f, u, m, p, _, E, z, I, A, T, x, b, S, $, k, B, F, O;
  const v = e.state;
  i = e.next_in, F = e.input, r = i + (e.avail_in - 5), a = e.next_out, O = e.output, s = a - (n - e.avail_out), o = a + (e.avail_out - 257), c = v.dmax, f = v.wsize, u = v.whave, m = v.wnext, p = v.window, _ = v.hold, E = v.bits, z = v.lencode, I = v.distcode, A = (1 << v.lenbits) - 1, T = (1 << v.distbits) - 1;
  t:
    do {
      E < 15 && (_ += F[i++] << E, E += 8, _ += F[i++] << E, E += 8), x = z[_ & A];
      e:
        for (; ; ) {
          if (b = x >>> 24, _ >>>= b, E -= b, b = x >>> 16 & 255, b === 0)
            O[a++] = x & 65535;
          else if (b & 16) {
            S = x & 65535, b &= 15, b && (E < b && (_ += F[i++] << E, E += 8), S += _ & (1 << b) - 1, _ >>>= b, E -= b), E < 15 && (_ += F[i++] << E, E += 8, _ += F[i++] << E, E += 8), x = I[_ & T];
            n:
              for (; ; ) {
                if (b = x >>> 24, _ >>>= b, E -= b, b = x >>> 16 & 255, b & 16) {
                  if ($ = x & 65535, b &= 15, E < b && (_ += F[i++] << E, E += 8, E < b && (_ += F[i++] << E, E += 8)), $ += _ & (1 << b) - 1, $ > c) {
                    e.msg = "invalid distance too far back", v.mode = hn;
                    break t;
                  }
                  if (_ >>>= b, E -= b, b = a - s, $ > b) {
                    if (b = $ - b, b > u && v.sane) {
                      e.msg = "invalid distance too far back", v.mode = hn;
                      break t;
                    }
                    if (k = 0, B = p, m === 0) {
                      if (k += f - b, b < S) {
                        S -= b;
                        do
                          O[a++] = p[k++];
                        while (--b);
                        k = a - $, B = O;
                      }
                    } else if (m < b) {
                      if (k += f + m - b, b -= m, b < S) {
                        S -= b;
                        do
                          O[a++] = p[k++];
                        while (--b);
                        if (k = 0, m < S) {
                          b = m, S -= b;
                          do
                            O[a++] = p[k++];
                          while (--b);
                          k = a - $, B = O;
                        }
                      }
                    } else if (k += m - b, b < S) {
                      S -= b;
                      do
                        O[a++] = p[k++];
                      while (--b);
                      k = a - $, B = O;
                    }
                    for (; S > 2; )
                      O[a++] = B[k++], O[a++] = B[k++], O[a++] = B[k++], S -= 3;
                    S && (O[a++] = B[k++], S > 1 && (O[a++] = B[k++]));
                  } else {
                    k = a - $;
                    do
                      O[a++] = O[k++], O[a++] = O[k++], O[a++] = O[k++], S -= 3;
                    while (S > 2);
                    S && (O[a++] = O[k++], S > 1 && (O[a++] = O[k++]));
                  }
                } else if ((b & 64) === 0) {
                  x = I[(x & 65535) + (_ & (1 << b) - 1)];
                  continue n;
                } else {
                  e.msg = "invalid distance code", v.mode = hn;
                  break t;
                }
                break;
              }
          } else if ((b & 64) === 0) {
            x = z[(x & 65535) + (_ & (1 << b) - 1)];
            continue e;
          } else if (b & 32) {
            v.mode = Wd;
            break t;
          } else {
            e.msg = "invalid literal/length code", v.mode = hn;
            break t;
          }
          break;
        }
    } while (i < r && a < o);
  S = E >> 3, i -= S, E -= S << 3, _ &= (1 << E) - 1, e.next_in = i, e.next_out = a, e.avail_in = i < r ? 5 + (r - i) : 5 - (i - r), e.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), v.hold = _, v.bits = E;
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
  const c = o.bits;
  let f = 0, u = 0, m = 0, p = 0, _ = 0, E = 0, z = 0, I = 0, A = 0, T = 0, x, b, S, $, k, B = null, F;
  const O = new Uint16Array($e + 1), v = new Uint16Array($e + 1);
  let q = null, P, J, et;
  for (f = 0; f <= $e; f++)
    O[f] = 0;
  for (u = 0; u < i; u++)
    O[e[n + u]]++;
  for (_ = c, p = $e; p >= 1 && O[p] === 0; p--)
    ;
  if (_ > p && (_ = p), p === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (m = 1; m < p && O[m] === 0; m++)
    ;
  for (_ < m && (_ = m), I = 1, f = 1; f <= $e; f++)
    if (I <<= 1, I -= O[f], I < 0)
      return -1;
  if (I > 0 && (t === Hr || p !== 1))
    return -1;
  for (v[1] = 0, f = 1; f < $e; f++)
    v[f + 1] = v[f] + O[f];
  for (u = 0; u < i; u++)
    e[n + u] !== 0 && (s[v[e[n + u]]++] = u);
  if (t === Hr ? (B = q = s, F = 20) : t === Jn ? (B = Yd, q = Kd, F = 257) : (B = Jd, q = Qd, F = 0), T = 0, u = 0, f = m, k = a, E = _, z = 0, S = -1, A = 1 << _, $ = A - 1, t === Jn && A > zr || t === Pr && A > Br)
    return 1;
  for (; ; ) {
    P = f - z, s[u] + 1 < F ? (J = 0, et = s[u]) : s[u] >= F ? (J = q[s[u] - F], et = B[s[u] - F]) : (J = 96, et = 0), x = 1 << f - z, b = 1 << E, m = b;
    do
      b -= x, r[k + (T >> z) + b] = P << 24 | J << 16 | et | 0;
    while (b !== 0);
    for (x = 1 << f - 1; T & x; )
      x >>= 1;
    if (x !== 0 ? (T &= x - 1, T += x) : T = 0, u++, --O[f] === 0) {
      if (f === p)
        break;
      f = e[n + s[u]];
    }
    if (f > _ && (T & $) !== S) {
      for (z === 0 && (z = _), k += m, E = f - z, I = 1 << E; E + z < p && (I -= O[E + z], !(I <= 0)); )
        E++, I <<= 1;
      if (A += 1 << E, t === Jn && A > zr || t === Pr && A > Br)
        return 1;
      S = T & $, r[S] = _ << 24 | E << 16 | k - a | 0;
    }
  }
  return T !== 0 && (r[k + T] = f - z << 24 | 64 << 16 | 0), o.bits = _, 0;
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
  let n, i, r, a, s, o, c, f, u, m, p, _, E, z, I = 0, A, T, x, b, S, $, k, B;
  const F = new Uint8Array(4);
  let O, v;
  const q = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Ae(t) || !t.output || !t.input && t.avail_in !== 0)
    return Yt;
  n = t.state, n.mode === le && (n.mode = Qn), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, u = n.bits, m = o, p = c, B = Ee;
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
            o--, f += i[a++] << u, u += 8;
          }
          if (n.wrap & 2 && f === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0), f = 0, u = 0, n.mode = Zr;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((f & 255) << 8) + (f >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = Dt;
            break;
          }
          if ((f & 15) !== Ur) {
            t.msg = "unknown compression method", n.mode = Dt;
            break;
          }
          if (f >>>= 4, u -= 4, k = (f & 15) + 8, n.wbits === 0 && (n.wbits = k), k > 15 || k > n.wbits) {
            t.msg = "invalid window size", n.mode = Dt;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = f & 512 ? Qr : le, f = 0, u = 0;
          break;
        case Zr:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (n.flags = f, (n.flags & 255) !== Ur) {
            t.msg = "unknown compression method", n.mode = Dt;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = Dt;
            break;
          }
          n.head && (n.head.text = f >> 8 & 1), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0)), f = 0, u = 0, n.mode = qr;
        /* falls through */
        case qr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          n.head && (n.head.time = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, F[2] = f >>> 16 & 255, F[3] = f >>> 24 & 255, n.check = ne(n.check, F, 4, 0)), f = 0, u = 0, n.mode = Gr;
        /* falls through */
        case Gr:
          for (; u < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          n.head && (n.head.xflags = f & 255, n.head.os = f >> 8), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0)), f = 0, u = 0, n.mode = Wr;
        /* falls through */
        case Wr:
          if (n.flags & 1024) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.length = f, n.head && (n.head.extra_len = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ne(n.check, F, 2, 0)), f = 0, u = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Xr;
        /* falls through */
        case Xr:
          if (n.flags & 1024 && (_ = n.length, _ > o && (_ = o), _ && (n.head && (k = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            i.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + _
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            k
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
              k = i[a + _++], n.head && k && n.length < 65536 && (n.head.name += String.fromCharCode(k));
            while (k && _ < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, _, a)), o -= _, a += _, k)
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
              k = i[a + _++], n.head && k && n.length < 65536 && (n.head.comment += String.fromCharCode(k));
            while (k && _ < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ne(n.check, i, _, a)), o -= _, a += _, k)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = Jr;
        /* falls through */
        case Jr:
          if (n.flags & 512) {
            for (; u < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && f !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = Dt;
              break;
            }
            f = 0, u = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = le;
          break;
        case Qr:
          for (; u < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          t.adler = n.check = ua(f), f = 0, u = 0, n.mode = Fn;
        /* falls through */
        case Fn:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = u, i0;
          t.adler = n.check = 1, n.mode = le;
        /* falls through */
        case le:
          if (e === e0 || e === dn)
            break t;
        /* falls through */
        case Qn:
          if (n.last) {
            f >>>= u & 7, u -= u & 7, n.mode = ti;
            break;
          }
          for (; u < 3; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          switch (n.last = f & 1, f >>>= 1, u -= 1, f & 3) {
            case 0:
              n.mode = jr;
              break;
            case 1:
              if (u0(n), n.mode = pn, e === dn) {
                f >>>= 2, u -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = ea;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = Dt;
          }
          f >>>= 2, u -= 2;
          break;
        case jr:
          for (f >>>= u & 7, u -= u & 7; u < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if ((f & 65535) !== (f >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = Dt;
            break;
          }
          if (n.length = f & 65535, f = 0, u = 0, n.mode = jn, e === dn)
            break t;
        /* falls through */
        case jn:
          n.mode = ta;
        /* falls through */
        case ta:
          if (_ = n.length, _) {
            if (_ > o && (_ = o), _ > c && (_ = c), _ === 0)
              break t;
            r.set(i.subarray(a, a + _), s), o -= _, a += _, c -= _, s += _, n.length -= _;
            break;
          }
          n.mode = le;
          break;
        case ea:
          for (; u < 14; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (n.nlen = (f & 31) + 257, f >>>= 5, u -= 5, n.ndist = (f & 31) + 1, f >>>= 5, u -= 5, n.ncode = (f & 15) + 4, f >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
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
              o--, f += i[a++] << u, u += 8;
            }
            n.lens[q[n.have++]] = f & 7, f >>>= 3, u -= 3;
          }
          for (; n.have < 19; )
            n.lens[q[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, O = { bits: n.lenbits }, B = Xe(t0, n.lens, 0, 19, n.lencode, 0, n.work, O), n.lenbits = O.bits, B) {
            t.msg = "invalid code lengths set", n.mode = Dt;
            break;
          }
          n.have = 0, n.mode = ia;
        /* falls through */
        case ia:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; I = n.lencode[f & (1 << n.lenbits) - 1], A = I >>> 24, T = I >>> 16 & 255, x = I & 65535, !(A <= u); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            if (x < 16)
              f >>>= A, u -= A, n.lens[n.have++] = x;
            else {
              if (x === 16) {
                for (v = A + 2; u < v; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << u, u += 8;
                }
                if (f >>>= A, u -= A, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = Dt;
                  break;
                }
                k = n.lens[n.have - 1], _ = 3 + (f & 3), f >>>= 2, u -= 2;
              } else if (x === 17) {
                for (v = A + 3; u < v; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << u, u += 8;
                }
                f >>>= A, u -= A, k = 0, _ = 3 + (f & 7), f >>>= 3, u -= 3;
              } else {
                for (v = A + 7; u < v; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << u, u += 8;
                }
                f >>>= A, u -= A, k = 0, _ = 11 + (f & 127), f >>>= 7, u -= 7;
              }
              if (n.have + _ > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = Dt;
                break;
              }
              for (; _--; )
                n.lens[n.have++] = k;
            }
          }
          if (n.mode === Dt)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = Dt;
            break;
          }
          if (n.lenbits = 9, O = { bits: n.lenbits }, B = Xe(Vs, n.lens, 0, n.nlen, n.lencode, 0, n.work, O), n.lenbits = O.bits, B) {
            t.msg = "invalid literal/lengths set", n.mode = Dt;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, O = { bits: n.distbits }, B = Xe(Us, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, O), n.distbits = O.bits, B) {
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
          if (o >= 6 && c >= 258) {
            t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = u, Xd(t, p), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, u = n.bits, n.mode === le && (n.back = -1);
            break;
          }
          for (n.back = 0; I = n.lencode[f & (1 << n.lenbits) - 1], A = I >>> 24, T = I >>> 16 & 255, x = I & 65535, !(A <= u); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if (T && (T & 240) === 0) {
            for (b = A, S = T, $ = x; I = n.lencode[$ + ((f & (1 << b + S) - 1) >> b)], A = I >>> 24, T = I >>> 16 & 255, x = I & 65535, !(b + A <= u); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            f >>>= b, u -= b, n.back += b;
          }
          if (f >>>= A, u -= A, n.back += A, n.length = x, T === 0) {
            n.mode = la;
            break;
          }
          if (T & 32) {
            n.back = -1, n.mode = le;
            break;
          }
          if (T & 64) {
            t.msg = "invalid literal/length code", n.mode = Dt;
            break;
          }
          n.extra = T & 15, n.mode = ra;
        /* falls through */
        case ra:
          if (n.extra) {
            for (v = n.extra; u < v; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.length += f & (1 << n.extra) - 1, f >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = aa;
        /* falls through */
        case aa:
          for (; I = n.distcode[f & (1 << n.distbits) - 1], A = I >>> 24, T = I >>> 16 & 255, x = I & 65535, !(A <= u); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << u, u += 8;
          }
          if ((T & 240) === 0) {
            for (b = A, S = T, $ = x; I = n.distcode[$ + ((f & (1 << b + S) - 1) >> b)], A = I >>> 24, T = I >>> 16 & 255, x = I & 65535, !(b + A <= u); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            f >>>= b, u -= b, n.back += b;
          }
          if (f >>>= A, u -= A, n.back += A, T & 64) {
            t.msg = "invalid distance code", n.mode = Dt;
            break;
          }
          n.offset = x, n.extra = T & 15, n.mode = sa;
        /* falls through */
        case sa:
          if (n.extra) {
            for (v = n.extra; u < v; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            n.offset += f & (1 << n.extra) - 1, f >>>= n.extra, u -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = Dt;
            break;
          }
          n.mode = oa;
        /* falls through */
        case oa:
          if (c === 0)
            break t;
          if (_ = p - c, n.offset > _) {
            if (_ = n.offset - _, _ > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = Dt;
              break;
            }
            _ > n.wnext ? (_ -= n.wnext, E = n.wsize - _) : E = n.wnext - _, _ > n.length && (_ = n.length), z = n.window;
          } else
            z = r, E = s - n.offset, _ = n.length;
          _ > c && (_ = c), c -= _, n.length -= _;
          do
            r[s++] = z[E++];
          while (--_);
          n.length === 0 && (n.mode = _n);
          break;
        case la:
          if (c === 0)
            break t;
          r[s++] = n.length, c--, n.mode = _n;
          break;
        case ti:
          if (n.wrap) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, f |= i[a++] << u, u += 8;
            }
            if (p -= c, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? ne(n.check, r, p, s - p) : Oi(n.check, r, p, s - p)), p = c, n.wrap & 4 && (n.flags ? f : ua(f)) !== n.check) {
              t.msg = "incorrect data check", n.mode = Dt;
              break;
            }
            f = 0, u = 0;
          }
          n.mode = ca;
        /* falls through */
        case ca:
          if (n.wrap && n.flags) {
            for (; u < 32; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << u, u += 8;
            }
            if (n.wrap & 4 && f !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = Dt;
              break;
            }
            f = 0, u = 0;
          }
          n.mode = fa;
        /* falls through */
        case fa:
          B = n0;
          break t;
        case Dt:
          B = Zs;
          break t;
        case Gs:
          return qs;
        case Ws:
        /* falls through */
        default:
          return Yt;
      }
  return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = u, (n.wsize || p !== t.avail_out && n.mode < Dt && (n.mode < ti || e !== Vr)) && Qs(t, t.output, t.next_out, p - t.avail_out), m -= t.avail_in, p -= t.avail_out, t.total_in += m, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? ne(n.check, r, p, t.next_out - p) : Oi(n.check, r, p, t.next_out - p)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === le ? 128 : 0) + (n.mode === pn || n.mode === jn ? 256 : 0), (m === 0 && p === 0 || e === Vr) && B === Ee && (B = r0), B;
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
  return Ae(t) || (i = t.state, i.wrap !== 0 && i.mode !== Fn) ? Yt : i.mode === Fn && (r = 1, r = Oi(r, e, n, 0), r !== i.check) ? Zs : (a = Qs(t, e, n, n), a ? (i.mode = Gs, qs) : (i.havedict = 1, Ee));
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
        let c = Fi.utf8border(n.output, n.next_out), f = n.next_out - c, u = Fi.buf2string(n.output, c);
        n.next_out = f, n.avail_out = i - f, f && n.output.set(n.output.subarray(c, c + f), 0), this.onData(u);
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
var M0 = R0, L0 = {
  inflate: M0
};
const { inflate: O0 } = L0;
var C0 = O0;
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
var ai = {}, pa;
function de() {
  return pa || (pa = 1, function(t) {
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
          for (var c in o)
            n(o, c) && (a[c] = o[c]);
        }
      }
      return a;
    }, t.shrinkBuf = function(a, s) {
      return a.length === s ? a : a.subarray ? a.subarray(0, s) : (a.length = s, a);
    };
    var i = {
      arraySet: function(a, s, o, c, f) {
        if (s.subarray && a.subarray) {
          a.set(s.subarray(o, o + c), f);
          return;
        }
        for (var u = 0; u < c; u++)
          a[f + u] = s[o + u];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var s, o, c, f, u, m;
        for (c = 0, s = 0, o = a.length; s < o; s++)
          c += a[s].length;
        for (m = new Uint8Array(c), f = 0, s = 0, o = a.length; s < o; s++)
          u = a[s], m.set(u, f), f += u.length;
        return m;
      }
    }, r = {
      arraySet: function(a, s, o, c, f) {
        for (var u = 0; u < c; u++)
          a[f + u] = s[o + u];
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
var Ne = {}, Kt = {}, _e = {}, _a;
function P0() {
  if (_a) return _e;
  _a = 1;
  var t = de(), e = 4, n = 0, i = 1, r = 2;
  function a(g) {
    for (var L = g.length; --L >= 0; )
      g[L] = 0;
  }
  var s = 0, o = 1, c = 2, f = 3, u = 258, m = 29, p = 256, _ = p + 1 + m, E = 30, z = 19, I = 2 * _ + 1, A = 15, T = 16, x = 7, b = 256, S = 16, $ = 17, k = 18, B = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), F = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), O = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), v = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], q = 512, P = new Array((_ + 2) * 2);
  a(P);
  var J = new Array(E * 2);
  a(J);
  var et = new Array(q);
  a(et);
  var lt = new Array(u - f + 1);
  a(lt);
  var U = new Array(m);
  a(U);
  var j = new Array(E);
  a(j);
  function G(g, L, C, V, w) {
    this.static_tree = g, this.extra_bits = L, this.extra_base = C, this.elems = V, this.max_length = w, this.has_stree = g && g.length;
  }
  var rt, nt, bt;
  function pt(g, L) {
    this.dyn_tree = g, this.max_code = 0, this.stat_desc = L;
  }
  function xt(g) {
    return g < 256 ? et[g] : et[256 + (g >>> 7)];
  }
  function ft(g, L) {
    g.pending_buf[g.pending++] = L & 255, g.pending_buf[g.pending++] = L >>> 8 & 255;
  }
  function Q(g, L, C) {
    g.bi_valid > T - C ? (g.bi_buf |= L << g.bi_valid & 65535, ft(g, g.bi_buf), g.bi_buf = L >> T - g.bi_valid, g.bi_valid += C - T) : (g.bi_buf |= L << g.bi_valid & 65535, g.bi_valid += C);
  }
  function ut(g, L, C) {
    Q(
      g,
      C[L * 2],
      C[L * 2 + 1]
      /*.Len*/
    );
  }
  function ot(g, L) {
    var C = 0;
    do
      C |= g & 1, g >>>= 1, C <<= 1;
    while (--L > 0);
    return C >>> 1;
  }
  function St(g) {
    g.bi_valid === 16 ? (ft(g, g.bi_buf), g.bi_buf = 0, g.bi_valid = 0) : g.bi_valid >= 8 && (g.pending_buf[g.pending++] = g.bi_buf & 255, g.bi_buf >>= 8, g.bi_valid -= 8);
  }
  function Nt(g, L) {
    var C = L.dyn_tree, V = L.max_code, w = L.stat_desc.static_tree, D = L.stat_desc.has_stree, h = L.stat_desc.extra_bits, H = L.stat_desc.extra_base, it = L.stat_desc.max_length, l, R, M, d, y, N, tt = 0;
    for (d = 0; d <= A; d++)
      g.bl_count[d] = 0;
    for (C[g.heap[g.heap_max] * 2 + 1] = 0, l = g.heap_max + 1; l < I; l++)
      R = g.heap[l], d = C[C[R * 2 + 1] * 2 + 1] + 1, d > it && (d = it, tt++), C[R * 2 + 1] = d, !(R > V) && (g.bl_count[d]++, y = 0, R >= H && (y = h[R - H]), N = C[R * 2], g.opt_len += N * (d + y), D && (g.static_len += N * (w[R * 2 + 1] + y)));
    if (tt !== 0) {
      do {
        for (d = it - 1; g.bl_count[d] === 0; )
          d--;
        g.bl_count[d]--, g.bl_count[d + 1] += 2, g.bl_count[it]--, tt -= 2;
      } while (tt > 0);
      for (d = it; d !== 0; d--)
        for (R = g.bl_count[d]; R !== 0; )
          M = g.heap[--l], !(M > V) && (C[M * 2 + 1] !== d && (g.opt_len += (d - C[M * 2 + 1]) * C[M * 2], C[M * 2 + 1] = d), R--);
    }
  }
  function It(g, L, C) {
    var V = new Array(A + 1), w = 0, D, h;
    for (D = 1; D <= A; D++)
      V[D] = w = w + C[D - 1] << 1;
    for (h = 0; h <= L; h++) {
      var H = g[h * 2 + 1];
      H !== 0 && (g[h * 2] = ot(V[H]++, H));
    }
  }
  function st() {
    var g, L, C, V, w, D = new Array(A + 1);
    for (C = 0, V = 0; V < m - 1; V++)
      for (U[V] = C, g = 0; g < 1 << B[V]; g++)
        lt[C++] = V;
    for (lt[C - 1] = V, w = 0, V = 0; V < 16; V++)
      for (j[V] = w, g = 0; g < 1 << F[V]; g++)
        et[w++] = V;
    for (w >>= 7; V < E; V++)
      for (j[V] = w << 7, g = 0; g < 1 << F[V] - 7; g++)
        et[256 + w++] = V;
    for (L = 0; L <= A; L++)
      D[L] = 0;
    for (g = 0; g <= 143; )
      P[g * 2 + 1] = 8, g++, D[8]++;
    for (; g <= 255; )
      P[g * 2 + 1] = 9, g++, D[9]++;
    for (; g <= 279; )
      P[g * 2 + 1] = 7, g++, D[7]++;
    for (; g <= 287; )
      P[g * 2 + 1] = 8, g++, D[8]++;
    for (It(P, _ + 1, D), g = 0; g < E; g++)
      J[g * 2 + 1] = 5, J[g * 2] = ot(g, 5);
    rt = new G(P, B, p + 1, _, A), nt = new G(J, F, 0, E, A), bt = new G(new Array(0), O, 0, z, x);
  }
  function X(g) {
    var L;
    for (L = 0; L < _; L++)
      g.dyn_ltree[L * 2] = 0;
    for (L = 0; L < E; L++)
      g.dyn_dtree[L * 2] = 0;
    for (L = 0; L < z; L++)
      g.bl_tree[L * 2] = 0;
    g.dyn_ltree[b * 2] = 1, g.opt_len = g.static_len = 0, g.last_lit = g.matches = 0;
  }
  function Et(g) {
    g.bi_valid > 8 ? ft(g, g.bi_buf) : g.bi_valid > 0 && (g.pending_buf[g.pending++] = g.bi_buf), g.bi_buf = 0, g.bi_valid = 0;
  }
  function vt(g, L, C, V) {
    Et(g), ft(g, C), ft(g, ~C), t.arraySet(g.pending_buf, g.window, L, C, g.pending), g.pending += C;
  }
  function _t(g, L, C, V) {
    var w = L * 2, D = C * 2;
    return g[w] < g[D] || g[w] === g[D] && V[L] <= V[C];
  }
  function kt(g, L, C) {
    for (var V = g.heap[C], w = C << 1; w <= g.heap_len && (w < g.heap_len && _t(L, g.heap[w + 1], g.heap[w], g.depth) && w++, !_t(L, V, g.heap[w], g.depth)); )
      g.heap[C] = g.heap[w], C = w, w <<= 1;
    g.heap[C] = V;
  }
  function W(g, L, C) {
    var V, w, D = 0, h, H;
    if (g.last_lit !== 0)
      do
        V = g.pending_buf[g.d_buf + D * 2] << 8 | g.pending_buf[g.d_buf + D * 2 + 1], w = g.pending_buf[g.l_buf + D], D++, V === 0 ? ut(g, w, L) : (h = lt[w], ut(g, h + p + 1, L), H = B[h], H !== 0 && (w -= U[h], Q(g, w, H)), V--, h = xt(V), ut(g, h, C), H = F[h], H !== 0 && (V -= j[h], Q(g, V, H)));
      while (D < g.last_lit);
    ut(g, b, L);
  }
  function Rt(g, L) {
    var C = L.dyn_tree, V = L.stat_desc.static_tree, w = L.stat_desc.has_stree, D = L.stat_desc.elems, h, H, it = -1, l;
    for (g.heap_len = 0, g.heap_max = I, h = 0; h < D; h++)
      C[h * 2] !== 0 ? (g.heap[++g.heap_len] = it = h, g.depth[h] = 0) : C[h * 2 + 1] = 0;
    for (; g.heap_len < 2; )
      l = g.heap[++g.heap_len] = it < 2 ? ++it : 0, C[l * 2] = 1, g.depth[l] = 0, g.opt_len--, w && (g.static_len -= V[l * 2 + 1]);
    for (L.max_code = it, h = g.heap_len >> 1; h >= 1; h--)
      kt(g, C, h);
    l = D;
    do
      h = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[
        1
        /*SMALLEST*/
      ] = g.heap[g.heap_len--], kt(
        g,
        C,
        1
        /*SMALLEST*/
      ), H = g.heap[
        1
        /*SMALLEST*/
      ], g.heap[--g.heap_max] = h, g.heap[--g.heap_max] = H, C[l * 2] = C[h * 2] + C[H * 2], g.depth[l] = (g.depth[h] >= g.depth[H] ? g.depth[h] : g.depth[H]) + 1, C[h * 2 + 1] = C[H * 2 + 1] = l, g.heap[
        1
        /*SMALLEST*/
      ] = l++, kt(
        g,
        C,
        1
        /*SMALLEST*/
      );
    while (g.heap_len >= 2);
    g.heap[--g.heap_max] = g.heap[
      1
      /*SMALLEST*/
    ], Nt(g, L), It(C, it, g.bl_count);
  }
  function At(g, L, C) {
    var V, w = -1, D, h = L[1], H = 0, it = 7, l = 4;
    for (h === 0 && (it = 138, l = 3), L[(C + 1) * 2 + 1] = 65535, V = 0; V <= C; V++)
      D = h, h = L[(V + 1) * 2 + 1], !(++H < it && D === h) && (H < l ? g.bl_tree[D * 2] += H : D !== 0 ? (D !== w && g.bl_tree[D * 2]++, g.bl_tree[S * 2]++) : H <= 10 ? g.bl_tree[$ * 2]++ : g.bl_tree[k * 2]++, H = 0, w = D, h === 0 ? (it = 138, l = 3) : D === h ? (it = 6, l = 3) : (it = 7, l = 4));
  }
  function Bt(g, L, C) {
    var V, w = -1, D, h = L[1], H = 0, it = 7, l = 4;
    for (h === 0 && (it = 138, l = 3), V = 0; V <= C; V++)
      if (D = h, h = L[(V + 1) * 2 + 1], !(++H < it && D === h)) {
        if (H < l)
          do
            ut(g, D, g.bl_tree);
          while (--H !== 0);
        else D !== 0 ? (D !== w && (ut(g, D, g.bl_tree), H--), ut(g, S, g.bl_tree), Q(g, H - 3, 2)) : H <= 10 ? (ut(g, $, g.bl_tree), Q(g, H - 3, 3)) : (ut(g, k, g.bl_tree), Q(g, H - 11, 7));
        H = 0, w = D, h === 0 ? (it = 138, l = 3) : D === h ? (it = 6, l = 3) : (it = 7, l = 4);
      }
  }
  function at(g) {
    var L;
    for (At(g, g.dyn_ltree, g.l_desc.max_code), At(g, g.dyn_dtree, g.d_desc.max_code), Rt(g, g.bl_desc), L = z - 1; L >= 3 && g.bl_tree[v[L] * 2 + 1] === 0; L--)
      ;
    return g.opt_len += 3 * (L + 1) + 5 + 5 + 4, L;
  }
  function dt(g, L, C, V) {
    var w;
    for (Q(g, L - 257, 5), Q(g, C - 1, 5), Q(g, V - 4, 4), w = 0; w < V; w++)
      Q(g, g.bl_tree[v[w] * 2 + 1], 3);
    Bt(g, g.dyn_ltree, L - 1), Bt(g, g.dyn_dtree, C - 1);
  }
  function ht(g) {
    var L = 4093624447, C;
    for (C = 0; C <= 31; C++, L >>>= 1)
      if (L & 1 && g.dyn_ltree[C * 2] !== 0)
        return n;
    if (g.dyn_ltree[18] !== 0 || g.dyn_ltree[20] !== 0 || g.dyn_ltree[26] !== 0)
      return i;
    for (C = 32; C < p; C++)
      if (g.dyn_ltree[C * 2] !== 0)
        return i;
    return n;
  }
  var ct = !1;
  function Ft(g) {
    ct || (st(), ct = !0), g.l_desc = new pt(g.dyn_ltree, rt), g.d_desc = new pt(g.dyn_dtree, nt), g.bl_desc = new pt(g.bl_tree, bt), g.bi_buf = 0, g.bi_valid = 0, X(g);
  }
  function Z(g, L, C, V) {
    Q(g, (s << 1) + (V ? 1 : 0), 3), vt(g, L, C);
  }
  function Tt(g) {
    Q(g, o << 1, 3), ut(g, b, P), St(g);
  }
  function gt(g, L, C, V) {
    var w, D, h = 0;
    g.level > 0 ? (g.strm.data_type === r && (g.strm.data_type = ht(g)), Rt(g, g.l_desc), Rt(g, g.d_desc), h = at(g), w = g.opt_len + 3 + 7 >>> 3, D = g.static_len + 3 + 7 >>> 3, D <= w && (w = D)) : w = D = C + 5, C + 4 <= w && L !== -1 ? Z(g, L, C, V) : g.strategy === e || D === w ? (Q(g, (o << 1) + (V ? 1 : 0), 3), W(g, P, J)) : (Q(g, (c << 1) + (V ? 1 : 0), 3), dt(g, g.l_desc.max_code + 1, g.d_desc.max_code + 1, h + 1), W(g, g.dyn_ltree, g.dyn_dtree)), X(g), V && Et(g);
  }
  function wt(g, L, C) {
    return g.pending_buf[g.d_buf + g.last_lit * 2] = L >>> 8 & 255, g.pending_buf[g.d_buf + g.last_lit * 2 + 1] = L & 255, g.pending_buf[g.l_buf + g.last_lit] = C & 255, g.last_lit++, L === 0 ? g.dyn_ltree[C * 2]++ : (g.matches++, L--, g.dyn_ltree[(lt[C] + p + 1) * 2]++, g.dyn_dtree[xt(L) * 2]++), g.last_lit === g.lit_bufsize - 1;
  }
  return _e._tr_init = Ft, _e._tr_stored_block = Z, _e._tr_flush_block = gt, _e._tr_tally = wt, _e._tr_align = Tt, _e;
}
var si, ga;
function to() {
  if (ga) return si;
  ga = 1;
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
var oi, ma;
function eo() {
  if (ma) return oi;
  ma = 1;
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
    var o = e, c = s + a;
    i ^= -1;
    for (var f = s; f < c; f++)
      i = i >>> 8 ^ o[(i ^ r[f]) & 255];
    return i ^ -1;
  }
  return oi = n, oi;
}
var li, va;
function ir() {
  return va || (va = 1, li = {
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
var wa;
function V0() {
  if (wa) return Kt;
  wa = 1;
  var t = de(), e = P0(), n = to(), i = eo(), r = ir(), a = 0, s = 1, o = 3, c = 4, f = 5, u = 0, m = 1, p = -2, _ = -3, E = -5, z = -1, I = 1, A = 2, T = 3, x = 4, b = 0, S = 2, $ = 8, k = 9, B = 15, F = 8, O = 29, v = 256, q = v + 1 + O, P = 30, J = 19, et = 2 * q + 1, lt = 15, U = 3, j = 258, G = j + U + 1, rt = 32, nt = 42, bt = 69, pt = 73, xt = 91, ft = 103, Q = 113, ut = 666, ot = 1, St = 2, Nt = 3, It = 4, st = 3;
  function X(l, R) {
    return l.msg = r[R], R;
  }
  function Et(l) {
    return (l << 1) - (l > 4 ? 9 : 0);
  }
  function vt(l) {
    for (var R = l.length; --R >= 0; )
      l[R] = 0;
  }
  function _t(l) {
    var R = l.state, M = R.pending;
    M > l.avail_out && (M = l.avail_out), M !== 0 && (t.arraySet(l.output, R.pending_buf, R.pending_out, M, l.next_out), l.next_out += M, R.pending_out += M, l.total_out += M, l.avail_out -= M, R.pending -= M, R.pending === 0 && (R.pending_out = 0));
  }
  function kt(l, R) {
    e._tr_flush_block(l, l.block_start >= 0 ? l.block_start : -1, l.strstart - l.block_start, R), l.block_start = l.strstart, _t(l.strm);
  }
  function W(l, R) {
    l.pending_buf[l.pending++] = R;
  }
  function Rt(l, R) {
    l.pending_buf[l.pending++] = R >>> 8 & 255, l.pending_buf[l.pending++] = R & 255;
  }
  function At(l, R, M, d) {
    var y = l.avail_in;
    return y > d && (y = d), y === 0 ? 0 : (l.avail_in -= y, t.arraySet(R, l.input, l.next_in, y, M), l.state.wrap === 1 ? l.adler = n(l.adler, R, y, M) : l.state.wrap === 2 && (l.adler = i(l.adler, R, y, M)), l.next_in += y, l.total_in += y, y);
  }
  function Bt(l, R) {
    var M = l.max_chain_length, d = l.strstart, y, N, tt = l.prev_length, Y = l.nice_match, K = l.strstart > l.w_size - G ? l.strstart - (l.w_size - G) : 0, mt = l.window, ae = l.w_mask, Mt = l.prev, yt = l.strstart + j, zt = mt[d + tt - 1], Pt = mt[d + tt];
    l.prev_length >= l.good_match && (M >>= 2), Y > l.lookahead && (Y = l.lookahead);
    do
      if (y = R, !(mt[y + tt] !== Pt || mt[y + tt - 1] !== zt || mt[y] !== mt[d] || mt[++y] !== mt[d + 1])) {
        d += 2, y++;
        do
          ;
        while (mt[++d] === mt[++y] && mt[++d] === mt[++y] && mt[++d] === mt[++y] && mt[++d] === mt[++y] && mt[++d] === mt[++y] && mt[++d] === mt[++y] && mt[++d] === mt[++y] && mt[++d] === mt[++y] && d < yt);
        if (N = j - (yt - d), d = yt - j, N > tt) {
          if (l.match_start = R, tt = N, N >= Y)
            break;
          zt = mt[d + tt - 1], Pt = mt[d + tt];
        }
      }
    while ((R = Mt[R & ae]) > K && --M !== 0);
    return tt <= l.lookahead ? tt : l.lookahead;
  }
  function at(l) {
    var R = l.w_size, M, d, y, N, tt;
    do {
      if (N = l.window_size - l.lookahead - l.strstart, l.strstart >= R + (R - G)) {
        t.arraySet(l.window, l.window, R, R, 0), l.match_start -= R, l.strstart -= R, l.block_start -= R, d = l.hash_size, M = d;
        do
          y = l.head[--M], l.head[M] = y >= R ? y - R : 0;
        while (--d);
        d = R, M = d;
        do
          y = l.prev[--M], l.prev[M] = y >= R ? y - R : 0;
        while (--d);
        N += R;
      }
      if (l.strm.avail_in === 0)
        break;
      if (d = At(l.strm, l.window, l.strstart + l.lookahead, N), l.lookahead += d, l.lookahead + l.insert >= U)
        for (tt = l.strstart - l.insert, l.ins_h = l.window[tt], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[tt + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[tt + U - 1]) & l.hash_mask, l.prev[tt & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = tt, tt++, l.insert--, !(l.lookahead + l.insert < U)); )
          ;
    } while (l.lookahead < G && l.strm.avail_in !== 0);
  }
  function dt(l, R) {
    var M = 65535;
    for (M > l.pending_buf_size - 5 && (M = l.pending_buf_size - 5); ; ) {
      if (l.lookahead <= 1) {
        if (at(l), l.lookahead === 0 && R === a)
          return ot;
        if (l.lookahead === 0)
          break;
      }
      l.strstart += l.lookahead, l.lookahead = 0;
      var d = l.block_start + M;
      if ((l.strstart === 0 || l.strstart >= d) && (l.lookahead = l.strstart - d, l.strstart = d, kt(l, !1), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - G && (kt(l, !1), l.strm.avail_out === 0))
        return ot;
    }
    return l.insert = 0, R === c ? (kt(l, !0), l.strm.avail_out === 0 ? Nt : It) : (l.strstart > l.block_start && (kt(l, !1), l.strm.avail_out === 0), ot);
  }
  function ht(l, R) {
    for (var M, d; ; ) {
      if (l.lookahead < G) {
        if (at(l), l.lookahead < G && R === a)
          return ot;
        if (l.lookahead === 0)
          break;
      }
      if (M = 0, l.lookahead >= U && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + U - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), M !== 0 && l.strstart - M <= l.w_size - G && (l.match_length = Bt(l, M)), l.match_length >= U)
        if (d = e._tr_tally(l, l.strstart - l.match_start, l.match_length - U), l.lookahead -= l.match_length, l.match_length <= l.max_lazy_match && l.lookahead >= U) {
          l.match_length--;
          do
            l.strstart++, l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + U - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart;
          while (--l.match_length !== 0);
          l.strstart++;
        } else
          l.strstart += l.match_length, l.match_length = 0, l.ins_h = l.window[l.strstart], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + 1]) & l.hash_mask;
      else
        d = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++;
      if (d && (kt(l, !1), l.strm.avail_out === 0))
        return ot;
    }
    return l.insert = l.strstart < U - 1 ? l.strstart : U - 1, R === c ? (kt(l, !0), l.strm.avail_out === 0 ? Nt : It) : l.last_lit && (kt(l, !1), l.strm.avail_out === 0) ? ot : St;
  }
  function ct(l, R) {
    for (var M, d, y; ; ) {
      if (l.lookahead < G) {
        if (at(l), l.lookahead < G && R === a)
          return ot;
        if (l.lookahead === 0)
          break;
      }
      if (M = 0, l.lookahead >= U && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + U - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = U - 1, M !== 0 && l.prev_length < l.max_lazy_match && l.strstart - M <= l.w_size - G && (l.match_length = Bt(l, M), l.match_length <= 5 && (l.strategy === I || l.match_length === U && l.strstart - l.match_start > 4096) && (l.match_length = U - 1)), l.prev_length >= U && l.match_length <= l.prev_length) {
        y = l.strstart + l.lookahead - U, d = e._tr_tally(l, l.strstart - 1 - l.prev_match, l.prev_length - U), l.lookahead -= l.prev_length - 1, l.prev_length -= 2;
        do
          ++l.strstart <= y && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + U - 1]) & l.hash_mask, M = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart);
        while (--l.prev_length !== 0);
        if (l.match_available = 0, l.match_length = U - 1, l.strstart++, d && (kt(l, !1), l.strm.avail_out === 0))
          return ot;
      } else if (l.match_available) {
        if (d = e._tr_tally(l, 0, l.window[l.strstart - 1]), d && kt(l, !1), l.strstart++, l.lookahead--, l.strm.avail_out === 0)
          return ot;
      } else
        l.match_available = 1, l.strstart++, l.lookahead--;
    }
    return l.match_available && (d = e._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < U - 1 ? l.strstart : U - 1, R === c ? (kt(l, !0), l.strm.avail_out === 0 ? Nt : It) : l.last_lit && (kt(l, !1), l.strm.avail_out === 0) ? ot : St;
  }
  function Ft(l, R) {
    for (var M, d, y, N, tt = l.window; ; ) {
      if (l.lookahead <= j) {
        if (at(l), l.lookahead <= j && R === a)
          return ot;
        if (l.lookahead === 0)
          break;
      }
      if (l.match_length = 0, l.lookahead >= U && l.strstart > 0 && (y = l.strstart - 1, d = tt[y], d === tt[++y] && d === tt[++y] && d === tt[++y])) {
        N = l.strstart + j;
        do
          ;
        while (d === tt[++y] && d === tt[++y] && d === tt[++y] && d === tt[++y] && d === tt[++y] && d === tt[++y] && d === tt[++y] && d === tt[++y] && y < N);
        l.match_length = j - (N - y), l.match_length > l.lookahead && (l.match_length = l.lookahead);
      }
      if (l.match_length >= U ? (M = e._tr_tally(l, 1, l.match_length - U), l.lookahead -= l.match_length, l.strstart += l.match_length, l.match_length = 0) : (M = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++), M && (kt(l, !1), l.strm.avail_out === 0))
        return ot;
    }
    return l.insert = 0, R === c ? (kt(l, !0), l.strm.avail_out === 0 ? Nt : It) : l.last_lit && (kt(l, !1), l.strm.avail_out === 0) ? ot : St;
  }
  function Z(l, R) {
    for (var M; ; ) {
      if (l.lookahead === 0 && (at(l), l.lookahead === 0)) {
        if (R === a)
          return ot;
        break;
      }
      if (l.match_length = 0, M = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++, M && (kt(l, !1), l.strm.avail_out === 0))
        return ot;
    }
    return l.insert = 0, R === c ? (kt(l, !0), l.strm.avail_out === 0 ? Nt : It) : l.last_lit && (kt(l, !1), l.strm.avail_out === 0) ? ot : St;
  }
  function Tt(l, R, M, d, y) {
    this.good_length = l, this.max_lazy = R, this.nice_length = M, this.max_chain = d, this.func = y;
  }
  var gt;
  gt = [
    /*      good lazy nice chain */
    new Tt(0, 0, 0, 0, dt),
    /* 0 store only */
    new Tt(4, 4, 8, 4, ht),
    /* 1 max speed, no lazy matches */
    new Tt(4, 5, 16, 8, ht),
    /* 2 */
    new Tt(4, 6, 32, 32, ht),
    /* 3 */
    new Tt(4, 4, 16, 16, ct),
    /* 4 lazy matches */
    new Tt(8, 16, 32, 32, ct),
    /* 5 */
    new Tt(8, 16, 128, 128, ct),
    /* 6 */
    new Tt(8, 32, 128, 256, ct),
    /* 7 */
    new Tt(32, 128, 258, 1024, ct),
    /* 8 */
    new Tt(32, 258, 258, 4096, ct)
    /* 9 max compression */
  ];
  function wt(l) {
    l.window_size = 2 * l.w_size, vt(l.head), l.max_lazy_match = gt[l.level].max_lazy, l.good_match = gt[l.level].good_length, l.nice_match = gt[l.level].nice_length, l.max_chain_length = gt[l.level].max_chain, l.strstart = 0, l.block_start = 0, l.lookahead = 0, l.insert = 0, l.match_length = l.prev_length = U - 1, l.match_available = 0, l.ins_h = 0;
  }
  function g() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = $, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(et * 2), this.dyn_dtree = new t.Buf16((2 * P + 1) * 2), this.bl_tree = new t.Buf16((2 * J + 1) * 2), vt(this.dyn_ltree), vt(this.dyn_dtree), vt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(lt + 1), this.heap = new t.Buf16(2 * q + 1), vt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * q + 1), vt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function L(l) {
    var R;
    return !l || !l.state ? X(l, p) : (l.total_in = l.total_out = 0, l.data_type = S, R = l.state, R.pending = 0, R.pending_out = 0, R.wrap < 0 && (R.wrap = -R.wrap), R.status = R.wrap ? nt : Q, l.adler = R.wrap === 2 ? 0 : 1, R.last_flush = a, e._tr_init(R), u);
  }
  function C(l) {
    var R = L(l);
    return R === u && wt(l.state), R;
  }
  function V(l, R) {
    return !l || !l.state || l.state.wrap !== 2 ? p : (l.state.gzhead = R, u);
  }
  function w(l, R, M, d, y, N) {
    if (!l)
      return p;
    var tt = 1;
    if (R === z && (R = 6), d < 0 ? (tt = 0, d = -d) : d > 15 && (tt = 2, d -= 16), y < 1 || y > k || M !== $ || d < 8 || d > 15 || R < 0 || R > 9 || N < 0 || N > x)
      return X(l, p);
    d === 8 && (d = 9);
    var Y = new g();
    return l.state = Y, Y.strm = l, Y.wrap = tt, Y.gzhead = null, Y.w_bits = d, Y.w_size = 1 << Y.w_bits, Y.w_mask = Y.w_size - 1, Y.hash_bits = y + 7, Y.hash_size = 1 << Y.hash_bits, Y.hash_mask = Y.hash_size - 1, Y.hash_shift = ~~((Y.hash_bits + U - 1) / U), Y.window = new t.Buf8(Y.w_size * 2), Y.head = new t.Buf16(Y.hash_size), Y.prev = new t.Buf16(Y.w_size), Y.lit_bufsize = 1 << y + 6, Y.pending_buf_size = Y.lit_bufsize * 4, Y.pending_buf = new t.Buf8(Y.pending_buf_size), Y.d_buf = 1 * Y.lit_bufsize, Y.l_buf = 3 * Y.lit_bufsize, Y.level = R, Y.strategy = N, Y.method = M, C(l);
  }
  function D(l, R) {
    return w(l, R, $, B, F, b);
  }
  function h(l, R) {
    var M, d, y, N;
    if (!l || !l.state || R > f || R < 0)
      return l ? X(l, p) : p;
    if (d = l.state, !l.output || !l.input && l.avail_in !== 0 || d.status === ut && R !== c)
      return X(l, l.avail_out === 0 ? E : p);
    if (d.strm = l, M = d.last_flush, d.last_flush = R, d.status === nt)
      if (d.wrap === 2)
        l.adler = 0, W(d, 31), W(d, 139), W(d, 8), d.gzhead ? (W(
          d,
          (d.gzhead.text ? 1 : 0) + (d.gzhead.hcrc ? 2 : 0) + (d.gzhead.extra ? 4 : 0) + (d.gzhead.name ? 8 : 0) + (d.gzhead.comment ? 16 : 0)
        ), W(d, d.gzhead.time & 255), W(d, d.gzhead.time >> 8 & 255), W(d, d.gzhead.time >> 16 & 255), W(d, d.gzhead.time >> 24 & 255), W(d, d.level === 9 ? 2 : d.strategy >= A || d.level < 2 ? 4 : 0), W(d, d.gzhead.os & 255), d.gzhead.extra && d.gzhead.extra.length && (W(d, d.gzhead.extra.length & 255), W(d, d.gzhead.extra.length >> 8 & 255)), d.gzhead.hcrc && (l.adler = i(l.adler, d.pending_buf, d.pending, 0)), d.gzindex = 0, d.status = bt) : (W(d, 0), W(d, 0), W(d, 0), W(d, 0), W(d, 0), W(d, d.level === 9 ? 2 : d.strategy >= A || d.level < 2 ? 4 : 0), W(d, st), d.status = Q);
      else {
        var tt = $ + (d.w_bits - 8 << 4) << 8, Y = -1;
        d.strategy >= A || d.level < 2 ? Y = 0 : d.level < 6 ? Y = 1 : d.level === 6 ? Y = 2 : Y = 3, tt |= Y << 6, d.strstart !== 0 && (tt |= rt), tt += 31 - tt % 31, d.status = Q, Rt(d, tt), d.strstart !== 0 && (Rt(d, l.adler >>> 16), Rt(d, l.adler & 65535)), l.adler = 1;
      }
    if (d.status === bt)
      if (d.gzhead.extra) {
        for (y = d.pending; d.gzindex < (d.gzhead.extra.length & 65535) && !(d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), _t(l), y = d.pending, d.pending === d.pending_buf_size)); )
          W(d, d.gzhead.extra[d.gzindex] & 255), d.gzindex++;
        d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), d.gzindex === d.gzhead.extra.length && (d.gzindex = 0, d.status = pt);
      } else
        d.status = pt;
    if (d.status === pt)
      if (d.gzhead.name) {
        y = d.pending;
        do {
          if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), _t(l), y = d.pending, d.pending === d.pending_buf_size)) {
            N = 1;
            break;
          }
          d.gzindex < d.gzhead.name.length ? N = d.gzhead.name.charCodeAt(d.gzindex++) & 255 : N = 0, W(d, N);
        } while (N !== 0);
        d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), N === 0 && (d.gzindex = 0, d.status = xt);
      } else
        d.status = xt;
    if (d.status === xt)
      if (d.gzhead.comment) {
        y = d.pending;
        do {
          if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), _t(l), y = d.pending, d.pending === d.pending_buf_size)) {
            N = 1;
            break;
          }
          d.gzindex < d.gzhead.comment.length ? N = d.gzhead.comment.charCodeAt(d.gzindex++) & 255 : N = 0, W(d, N);
        } while (N !== 0);
        d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), N === 0 && (d.status = ft);
      } else
        d.status = ft;
    if (d.status === ft && (d.gzhead.hcrc ? (d.pending + 2 > d.pending_buf_size && _t(l), d.pending + 2 <= d.pending_buf_size && (W(d, l.adler & 255), W(d, l.adler >> 8 & 255), l.adler = 0, d.status = Q)) : d.status = Q), d.pending !== 0) {
      if (_t(l), l.avail_out === 0)
        return d.last_flush = -1, u;
    } else if (l.avail_in === 0 && Et(R) <= Et(M) && R !== c)
      return X(l, E);
    if (d.status === ut && l.avail_in !== 0)
      return X(l, E);
    if (l.avail_in !== 0 || d.lookahead !== 0 || R !== a && d.status !== ut) {
      var K = d.strategy === A ? Z(d, R) : d.strategy === T ? Ft(d, R) : gt[d.level].func(d, R);
      if ((K === Nt || K === It) && (d.status = ut), K === ot || K === Nt)
        return l.avail_out === 0 && (d.last_flush = -1), u;
      if (K === St && (R === s ? e._tr_align(d) : R !== f && (e._tr_stored_block(d, 0, 0, !1), R === o && (vt(d.head), d.lookahead === 0 && (d.strstart = 0, d.block_start = 0, d.insert = 0))), _t(l), l.avail_out === 0))
        return d.last_flush = -1, u;
    }
    return R !== c ? u : d.wrap <= 0 ? m : (d.wrap === 2 ? (W(d, l.adler & 255), W(d, l.adler >> 8 & 255), W(d, l.adler >> 16 & 255), W(d, l.adler >> 24 & 255), W(d, l.total_in & 255), W(d, l.total_in >> 8 & 255), W(d, l.total_in >> 16 & 255), W(d, l.total_in >> 24 & 255)) : (Rt(d, l.adler >>> 16), Rt(d, l.adler & 65535)), _t(l), d.wrap > 0 && (d.wrap = -d.wrap), d.pending !== 0 ? u : m);
  }
  function H(l) {
    var R;
    return !l || !l.state ? p : (R = l.state.status, R !== nt && R !== bt && R !== pt && R !== xt && R !== ft && R !== Q && R !== ut ? X(l, p) : (l.state = null, R === Q ? X(l, _) : u));
  }
  function it(l, R) {
    var M = R.length, d, y, N, tt, Y, K, mt, ae;
    if (!l || !l.state || (d = l.state, tt = d.wrap, tt === 2 || tt === 1 && d.status !== nt || d.lookahead))
      return p;
    for (tt === 1 && (l.adler = n(l.adler, R, M, 0)), d.wrap = 0, M >= d.w_size && (tt === 0 && (vt(d.head), d.strstart = 0, d.block_start = 0, d.insert = 0), ae = new t.Buf8(d.w_size), t.arraySet(ae, R, M - d.w_size, d.w_size, 0), R = ae, M = d.w_size), Y = l.avail_in, K = l.next_in, mt = l.input, l.avail_in = M, l.next_in = 0, l.input = R, at(d); d.lookahead >= U; ) {
      y = d.strstart, N = d.lookahead - (U - 1);
      do
        d.ins_h = (d.ins_h << d.hash_shift ^ d.window[y + U - 1]) & d.hash_mask, d.prev[y & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = y, y++;
      while (--N);
      d.strstart = y, d.lookahead = U - 1, at(d);
    }
    return d.strstart += d.lookahead, d.block_start = d.strstart, d.insert = d.lookahead, d.lookahead = 0, d.match_length = d.prev_length = U - 1, d.match_available = 0, l.next_in = K, l.input = mt, l.avail_in = Y, d.wrap = tt, u;
  }
  return Kt.deflateInit = D, Kt.deflateInit2 = w, Kt.deflateReset = C, Kt.deflateResetKeep = L, Kt.deflateSetHeader = V, Kt.deflate = h, Kt.deflateEnd = H, Kt.deflateSetDictionary = it, Kt.deflateInfo = "pako deflate (from Nodeca project)", Kt;
}
var ge = {}, ya;
function no() {
  if (ya) return ge;
  ya = 1;
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
    var o, c, f, u, m, p = s.length, _ = 0;
    for (u = 0; u < p; u++)
      c = s.charCodeAt(u), (c & 64512) === 55296 && u + 1 < p && (f = s.charCodeAt(u + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), u++)), _ += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    for (o = new t.Buf8(_), m = 0, u = 0; m < _; u++)
      c = s.charCodeAt(u), (c & 64512) === 55296 && u + 1 < p && (f = s.charCodeAt(u + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), u++)), c < 128 ? o[m++] = c : c < 2048 ? (o[m++] = 192 | c >>> 6, o[m++] = 128 | c & 63) : c < 65536 ? (o[m++] = 224 | c >>> 12, o[m++] = 128 | c >>> 6 & 63, o[m++] = 128 | c & 63) : (o[m++] = 240 | c >>> 18, o[m++] = 128 | c >>> 12 & 63, o[m++] = 128 | c >>> 6 & 63, o[m++] = 128 | c & 63);
    return o;
  };
  function a(s, o) {
    if (o < 65534 && (s.subarray && n || !s.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(s, o));
    for (var c = "", f = 0; f < o; f++)
      c += String.fromCharCode(s[f]);
    return c;
  }
  return ge.buf2binstring = function(s) {
    return a(s, s.length);
  }, ge.binstring2buf = function(s) {
    for (var o = new t.Buf8(s.length), c = 0, f = o.length; c < f; c++)
      o[c] = s.charCodeAt(c);
    return o;
  }, ge.buf2string = function(s, o) {
    var c, f, u, m, p = o || s.length, _ = new Array(p * 2);
    for (f = 0, c = 0; c < p; ) {
      if (u = s[c++], u < 128) {
        _[f++] = u;
        continue;
      }
      if (m = i[u], m > 4) {
        _[f++] = 65533, c += m - 1;
        continue;
      }
      for (u &= m === 2 ? 31 : m === 3 ? 15 : 7; m > 1 && c < p; )
        u = u << 6 | s[c++] & 63, m--;
      if (m > 1) {
        _[f++] = 65533;
        continue;
      }
      u < 65536 ? _[f++] = u : (u -= 65536, _[f++] = 55296 | u >> 10 & 1023, _[f++] = 56320 | u & 1023);
    }
    return a(_, f);
  }, ge.utf8border = function(s, o) {
    var c;
    for (o = o || s.length, o > s.length && (o = s.length), c = o - 1; c >= 0 && (s[c] & 192) === 128; )
      c--;
    return c < 0 || c === 0 ? o : c + i[s[c]] > o ? c : o;
  }, ge;
}
var ci, ba;
function io() {
  if (ba) return ci;
  ba = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return ci = t, ci;
}
var xa;
function U0() {
  if (xa) return Ne;
  xa = 1;
  var t = V0(), e = de(), n = no(), i = ir(), r = io(), a = Object.prototype.toString, s = 0, o = 4, c = 0, f = 1, u = 2, m = -1, p = 0, _ = 8;
  function E(T) {
    if (!(this instanceof E)) return new E(T);
    this.options = e.assign({
      level: m,
      method: _,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: p,
      to: ""
    }, T || {});
    var x = this.options;
    x.raw && x.windowBits > 0 ? x.windowBits = -x.windowBits : x.gzip && x.windowBits > 0 && x.windowBits < 16 && (x.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new r(), this.strm.avail_out = 0;
    var b = t.deflateInit2(
      this.strm,
      x.level,
      x.method,
      x.windowBits,
      x.memLevel,
      x.strategy
    );
    if (b !== c)
      throw new Error(i[b]);
    if (x.header && t.deflateSetHeader(this.strm, x.header), x.dictionary) {
      var S;
      if (typeof x.dictionary == "string" ? S = n.string2buf(x.dictionary) : a.call(x.dictionary) === "[object ArrayBuffer]" ? S = new Uint8Array(x.dictionary) : S = x.dictionary, b = t.deflateSetDictionary(this.strm, S), b !== c)
        throw new Error(i[b]);
      this._dict_set = !0;
    }
  }
  E.prototype.push = function(T, x) {
    var b = this.strm, S = this.options.chunkSize, $, k;
    if (this.ended)
      return !1;
    k = x === ~~x ? x : x === !0 ? o : s, typeof T == "string" ? b.input = n.string2buf(T) : a.call(T) === "[object ArrayBuffer]" ? b.input = new Uint8Array(T) : b.input = T, b.next_in = 0, b.avail_in = b.input.length;
    do {
      if (b.avail_out === 0 && (b.output = new e.Buf8(S), b.next_out = 0, b.avail_out = S), $ = t.deflate(b, k), $ !== f && $ !== c)
        return this.onEnd($), this.ended = !0, !1;
      (b.avail_out === 0 || b.avail_in === 0 && (k === o || k === u)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(b.output, b.next_out))) : this.onData(e.shrinkBuf(b.output, b.next_out)));
    } while ((b.avail_in > 0 || b.avail_out === 0) && $ !== f);
    return k === o ? ($ = t.deflateEnd(this.strm), this.onEnd($), this.ended = !0, $ === c) : (k === u && (this.onEnd(c), b.avail_out = 0), !0);
  }, E.prototype.onData = function(T) {
    this.chunks.push(T);
  }, E.prototype.onEnd = function(T) {
    T === c && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = T, this.msg = this.strm.msg;
  };
  function z(T, x) {
    var b = new E(x);
    if (b.push(T, !0), b.err)
      throw b.msg || i[b.err];
    return b.result;
  }
  function I(T, x) {
    return x = x || {}, x.raw = !0, z(T, x);
  }
  function A(T, x) {
    return x = x || {}, x.gzip = !0, z(T, x);
  }
  return Ne.Deflate = E, Ne.deflate = z, Ne.deflateRaw = I, Ne.gzip = A, Ne;
}
var Ie = {}, Wt = {}, fi, ka;
function Z0() {
  if (ka) return fi;
  ka = 1;
  var t = 30, e = 12;
  return fi = function(i, r) {
    var a, s, o, c, f, u, m, p, _, E, z, I, A, T, x, b, S, $, k, B, F, O, v, q, P;
    a = i.state, s = i.next_in, q = i.input, o = s + (i.avail_in - 5), c = i.next_out, P = i.output, f = c - (r - i.avail_out), u = c + (i.avail_out - 257), m = a.dmax, p = a.wsize, _ = a.whave, E = a.wnext, z = a.window, I = a.hold, A = a.bits, T = a.lencode, x = a.distcode, b = (1 << a.lenbits) - 1, S = (1 << a.distbits) - 1;
    t:
      do {
        A < 15 && (I += q[s++] << A, A += 8, I += q[s++] << A, A += 8), $ = T[I & b];
        e:
          for (; ; ) {
            if (k = $ >>> 24, I >>>= k, A -= k, k = $ >>> 16 & 255, k === 0)
              P[c++] = $ & 65535;
            else if (k & 16) {
              B = $ & 65535, k &= 15, k && (A < k && (I += q[s++] << A, A += 8), B += I & (1 << k) - 1, I >>>= k, A -= k), A < 15 && (I += q[s++] << A, A += 8, I += q[s++] << A, A += 8), $ = x[I & S];
              n:
                for (; ; ) {
                  if (k = $ >>> 24, I >>>= k, A -= k, k = $ >>> 16 & 255, k & 16) {
                    if (F = $ & 65535, k &= 15, A < k && (I += q[s++] << A, A += 8, A < k && (I += q[s++] << A, A += 8)), F += I & (1 << k) - 1, F > m) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break t;
                    }
                    if (I >>>= k, A -= k, k = c - f, F > k) {
                      if (k = F - k, k > _ && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break t;
                      }
                      if (O = 0, v = z, E === 0) {
                        if (O += p - k, k < B) {
                          B -= k;
                          do
                            P[c++] = z[O++];
                          while (--k);
                          O = c - F, v = P;
                        }
                      } else if (E < k) {
                        if (O += p + E - k, k -= E, k < B) {
                          B -= k;
                          do
                            P[c++] = z[O++];
                          while (--k);
                          if (O = 0, E < B) {
                            k = E, B -= k;
                            do
                              P[c++] = z[O++];
                            while (--k);
                            O = c - F, v = P;
                          }
                        }
                      } else if (O += E - k, k < B) {
                        B -= k;
                        do
                          P[c++] = z[O++];
                        while (--k);
                        O = c - F, v = P;
                      }
                      for (; B > 2; )
                        P[c++] = v[O++], P[c++] = v[O++], P[c++] = v[O++], B -= 3;
                      B && (P[c++] = v[O++], B > 1 && (P[c++] = v[O++]));
                    } else {
                      O = c - F;
                      do
                        P[c++] = P[O++], P[c++] = P[O++], P[c++] = P[O++], B -= 3;
                      while (B > 2);
                      B && (P[c++] = P[O++], B > 1 && (P[c++] = P[O++]));
                    }
                  } else if ((k & 64) === 0) {
                    $ = x[($ & 65535) + (I & (1 << k) - 1)];
                    continue n;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((k & 64) === 0) {
              $ = T[($ & 65535) + (I & (1 << k) - 1)];
              continue e;
            } else if (k & 32) {
              a.mode = e;
              break t;
            } else {
              i.msg = "invalid literal/length code", a.mode = t;
              break t;
            }
            break;
          }
      } while (s < o && c < u);
    B = A >> 3, s -= B, A -= B << 3, I &= (1 << A) - 1, i.next_in = s, i.next_out = c, i.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), i.avail_out = c < u ? 257 + (u - c) : 257 - (c - u), a.hold = I, a.bits = A;
  }, fi;
}
var ui, Ta;
function q0() {
  if (Ta) return ui;
  Ta = 1;
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
  return ui = function(p, _, E, z, I, A, T, x) {
    var b = x.bits, S = 0, $ = 0, k = 0, B = 0, F = 0, O = 0, v = 0, q = 0, P = 0, J = 0, et, lt, U, j, G, rt = null, nt = 0, bt, pt = new t.Buf16(e + 1), xt = new t.Buf16(e + 1), ft = null, Q = 0, ut, ot, St;
    for (S = 0; S <= e; S++)
      pt[S] = 0;
    for ($ = 0; $ < z; $++)
      pt[_[E + $]]++;
    for (F = b, B = e; B >= 1 && pt[B] === 0; B--)
      ;
    if (F > B && (F = B), B === 0)
      return I[A++] = 1 << 24 | 64 << 16 | 0, I[A++] = 1 << 24 | 64 << 16 | 0, x.bits = 1, 0;
    for (k = 1; k < B && pt[k] === 0; k++)
      ;
    for (F < k && (F = k), q = 1, S = 1; S <= e; S++)
      if (q <<= 1, q -= pt[S], q < 0)
        return -1;
    if (q > 0 && (p === r || B !== 1))
      return -1;
    for (xt[1] = 0, S = 1; S < e; S++)
      xt[S + 1] = xt[S] + pt[S];
    for ($ = 0; $ < z; $++)
      _[E + $] !== 0 && (T[xt[_[E + $]]++] = $);
    if (p === r ? (rt = ft = T, bt = 19) : p === a ? (rt = o, nt -= 257, ft = c, Q -= 257, bt = 256) : (rt = f, ft = u, bt = -1), J = 0, $ = 0, S = k, G = A, O = F, v = 0, U = -1, P = 1 << F, j = P - 1, p === a && P > n || p === s && P > i)
      return 1;
    for (; ; ) {
      ut = S - v, T[$] < bt ? (ot = 0, St = T[$]) : T[$] > bt ? (ot = ft[Q + T[$]], St = rt[nt + T[$]]) : (ot = 96, St = 0), et = 1 << S - v, lt = 1 << O, k = lt;
      do
        lt -= et, I[G + (J >> v) + lt] = ut << 24 | ot << 16 | St | 0;
      while (lt !== 0);
      for (et = 1 << S - 1; J & et; )
        et >>= 1;
      if (et !== 0 ? (J &= et - 1, J += et) : J = 0, $++, --pt[S] === 0) {
        if (S === B)
          break;
        S = _[E + T[$]];
      }
      if (S > F && (J & j) !== U) {
        for (v === 0 && (v = F), G += k, O = S - v, q = 1 << O; O + v < B && (q -= pt[O + v], !(q <= 0)); )
          O++, q <<= 1;
        if (P += 1 << O, p === a && P > n || p === s && P > i)
          return 1;
        U = J & j, I[U] = F << 24 | O << 16 | G - A | 0;
      }
    }
    return J !== 0 && (I[G + J] = S - v << 24 | 64 << 16 | 0), x.bits = F, 0;
  }, ui;
}
var Ea;
function G0() {
  if (Ea) return Wt;
  Ea = 1;
  var t = de(), e = to(), n = eo(), i = Z0(), r = q0(), a = 0, s = 1, o = 2, c = 4, f = 5, u = 6, m = 0, p = 1, _ = 2, E = -2, z = -3, I = -4, A = -5, T = 8, x = 1, b = 2, S = 3, $ = 4, k = 5, B = 6, F = 7, O = 8, v = 9, q = 10, P = 11, J = 12, et = 13, lt = 14, U = 15, j = 16, G = 17, rt = 18, nt = 19, bt = 20, pt = 21, xt = 22, ft = 23, Q = 24, ut = 25, ot = 26, St = 27, Nt = 28, It = 29, st = 30, X = 31, Et = 32, vt = 852, _t = 592, kt = 15, W = kt;
  function Rt(w) {
    return (w >>> 24 & 255) + (w >>> 8 & 65280) + ((w & 65280) << 8) + ((w & 255) << 24);
  }
  function At() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function Bt(w) {
    var D;
    return !w || !w.state ? E : (D = w.state, w.total_in = w.total_out = D.total = 0, w.msg = "", D.wrap && (w.adler = D.wrap & 1), D.mode = x, D.last = 0, D.havedict = 0, D.dmax = 32768, D.head = null, D.hold = 0, D.bits = 0, D.lencode = D.lendyn = new t.Buf32(vt), D.distcode = D.distdyn = new t.Buf32(_t), D.sane = 1, D.back = -1, m);
  }
  function at(w) {
    var D;
    return !w || !w.state ? E : (D = w.state, D.wsize = 0, D.whave = 0, D.wnext = 0, Bt(w));
  }
  function dt(w, D) {
    var h, H;
    return !w || !w.state || (H = w.state, D < 0 ? (h = 0, D = -D) : (h = (D >> 4) + 1, D < 48 && (D &= 15)), D && (D < 8 || D > 15)) ? E : (H.window !== null && H.wbits !== D && (H.window = null), H.wrap = h, H.wbits = D, at(w));
  }
  function ht(w, D) {
    var h, H;
    return w ? (H = new At(), w.state = H, H.window = null, h = dt(w, D), h !== m && (w.state = null), h) : E;
  }
  function ct(w) {
    return ht(w, W);
  }
  var Ft = !0, Z, Tt;
  function gt(w) {
    if (Ft) {
      var D;
      for (Z = new t.Buf32(512), Tt = new t.Buf32(32), D = 0; D < 144; )
        w.lens[D++] = 8;
      for (; D < 256; )
        w.lens[D++] = 9;
      for (; D < 280; )
        w.lens[D++] = 7;
      for (; D < 288; )
        w.lens[D++] = 8;
      for (r(s, w.lens, 0, 288, Z, 0, w.work, { bits: 9 }), D = 0; D < 32; )
        w.lens[D++] = 5;
      r(o, w.lens, 0, 32, Tt, 0, w.work, { bits: 5 }), Ft = !1;
    }
    w.lencode = Z, w.lenbits = 9, w.distcode = Tt, w.distbits = 5;
  }
  function wt(w, D, h, H) {
    var it, l = w.state;
    return l.window === null && (l.wsize = 1 << l.wbits, l.wnext = 0, l.whave = 0, l.window = new t.Buf8(l.wsize)), H >= l.wsize ? (t.arraySet(l.window, D, h - l.wsize, l.wsize, 0), l.wnext = 0, l.whave = l.wsize) : (it = l.wsize - l.wnext, it > H && (it = H), t.arraySet(l.window, D, h - H, it, l.wnext), H -= it, H ? (t.arraySet(l.window, D, h - H, H, 0), l.wnext = H, l.whave = l.wsize) : (l.wnext += it, l.wnext === l.wsize && (l.wnext = 0), l.whave < l.wsize && (l.whave += it))), 0;
  }
  function g(w, D) {
    var h, H, it, l, R, M, d, y, N, tt, Y, K, mt, ae, Mt = 0, yt, zt, Pt, Ut, nn, rn, Ot, Gt, Ht = new t.Buf8(4), se, ee, sr = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!w || !w.state || !w.output || !w.input && w.avail_in !== 0)
      return E;
    h = w.state, h.mode === J && (h.mode = et), R = w.next_out, it = w.output, d = w.avail_out, l = w.next_in, H = w.input, M = w.avail_in, y = h.hold, N = h.bits, tt = M, Y = d, Gt = m;
    t:
      for (; ; )
        switch (h.mode) {
          case x:
            if (h.wrap === 0) {
              h.mode = et;
              break;
            }
            for (; N < 16; ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            if (h.wrap & 2 && y === 35615) {
              h.check = 0, Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, h.check = n(h.check, Ht, 2, 0), y = 0, N = 0, h.mode = b;
              break;
            }
            if (h.flags = 0, h.head && (h.head.done = !1), !(h.wrap & 1) || /* check if zlib header allowed */
            (((y & 255) << 8) + (y >> 8)) % 31) {
              w.msg = "incorrect header check", h.mode = st;
              break;
            }
            if ((y & 15) !== T) {
              w.msg = "unknown compression method", h.mode = st;
              break;
            }
            if (y >>>= 4, N -= 4, Ot = (y & 15) + 8, h.wbits === 0)
              h.wbits = Ot;
            else if (Ot > h.wbits) {
              w.msg = "invalid window size", h.mode = st;
              break;
            }
            h.dmax = 1 << Ot, w.adler = h.check = 1, h.mode = y & 512 ? q : J, y = 0, N = 0;
            break;
          case b:
            for (; N < 16; ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            if (h.flags = y, (h.flags & 255) !== T) {
              w.msg = "unknown compression method", h.mode = st;
              break;
            }
            if (h.flags & 57344) {
              w.msg = "unknown header flags set", h.mode = st;
              break;
            }
            h.head && (h.head.text = y >> 8 & 1), h.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, h.check = n(h.check, Ht, 2, 0)), y = 0, N = 0, h.mode = S;
          /* falls through */
          case S:
            for (; N < 32; ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            h.head && (h.head.time = y), h.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, Ht[2] = y >>> 16 & 255, Ht[3] = y >>> 24 & 255, h.check = n(h.check, Ht, 4, 0)), y = 0, N = 0, h.mode = $;
          /* falls through */
          case $:
            for (; N < 16; ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            h.head && (h.head.xflags = y & 255, h.head.os = y >> 8), h.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, h.check = n(h.check, Ht, 2, 0)), y = 0, N = 0, h.mode = k;
          /* falls through */
          case k:
            if (h.flags & 1024) {
              for (; N < 16; ) {
                if (M === 0)
                  break t;
                M--, y += H[l++] << N, N += 8;
              }
              h.length = y, h.head && (h.head.extra_len = y), h.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, h.check = n(h.check, Ht, 2, 0)), y = 0, N = 0;
            } else h.head && (h.head.extra = null);
            h.mode = B;
          /* falls through */
          case B:
            if (h.flags & 1024 && (K = h.length, K > M && (K = M), K && (h.head && (Ot = h.head.extra_len - h.length, h.head.extra || (h.head.extra = new Array(h.head.extra_len)), t.arraySet(
              h.head.extra,
              H,
              l,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              K,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Ot
            )), h.flags & 512 && (h.check = n(h.check, H, K, l)), M -= K, l += K, h.length -= K), h.length))
              break t;
            h.length = 0, h.mode = F;
          /* falls through */
          case F:
            if (h.flags & 2048) {
              if (M === 0)
                break t;
              K = 0;
              do
                Ot = H[l + K++], h.head && Ot && h.length < 65536 && (h.head.name += String.fromCharCode(Ot));
              while (Ot && K < M);
              if (h.flags & 512 && (h.check = n(h.check, H, K, l)), M -= K, l += K, Ot)
                break t;
            } else h.head && (h.head.name = null);
            h.length = 0, h.mode = O;
          /* falls through */
          case O:
            if (h.flags & 4096) {
              if (M === 0)
                break t;
              K = 0;
              do
                Ot = H[l + K++], h.head && Ot && h.length < 65536 && (h.head.comment += String.fromCharCode(Ot));
              while (Ot && K < M);
              if (h.flags & 512 && (h.check = n(h.check, H, K, l)), M -= K, l += K, Ot)
                break t;
            } else h.head && (h.head.comment = null);
            h.mode = v;
          /* falls through */
          case v:
            if (h.flags & 512) {
              for (; N < 16; ) {
                if (M === 0)
                  break t;
                M--, y += H[l++] << N, N += 8;
              }
              if (y !== (h.check & 65535)) {
                w.msg = "header crc mismatch", h.mode = st;
                break;
              }
              y = 0, N = 0;
            }
            h.head && (h.head.hcrc = h.flags >> 9 & 1, h.head.done = !0), w.adler = h.check = 0, h.mode = J;
            break;
          case q:
            for (; N < 32; ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            w.adler = h.check = Rt(y), y = 0, N = 0, h.mode = P;
          /* falls through */
          case P:
            if (h.havedict === 0)
              return w.next_out = R, w.avail_out = d, w.next_in = l, w.avail_in = M, h.hold = y, h.bits = N, _;
            w.adler = h.check = 1, h.mode = J;
          /* falls through */
          case J:
            if (D === f || D === u)
              break t;
          /* falls through */
          case et:
            if (h.last) {
              y >>>= N & 7, N -= N & 7, h.mode = St;
              break;
            }
            for (; N < 3; ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            switch (h.last = y & 1, y >>>= 1, N -= 1, y & 3) {
              case 0:
                h.mode = lt;
                break;
              case 1:
                if (gt(h), h.mode = bt, D === u) {
                  y >>>= 2, N -= 2;
                  break t;
                }
                break;
              case 2:
                h.mode = G;
                break;
              case 3:
                w.msg = "invalid block type", h.mode = st;
            }
            y >>>= 2, N -= 2;
            break;
          case lt:
            for (y >>>= N & 7, N -= N & 7; N < 32; ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            if ((y & 65535) !== (y >>> 16 ^ 65535)) {
              w.msg = "invalid stored block lengths", h.mode = st;
              break;
            }
            if (h.length = y & 65535, y = 0, N = 0, h.mode = U, D === u)
              break t;
          /* falls through */
          case U:
            h.mode = j;
          /* falls through */
          case j:
            if (K = h.length, K) {
              if (K > M && (K = M), K > d && (K = d), K === 0)
                break t;
              t.arraySet(it, H, l, K, R), M -= K, l += K, d -= K, R += K, h.length -= K;
              break;
            }
            h.mode = J;
            break;
          case G:
            for (; N < 14; ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            if (h.nlen = (y & 31) + 257, y >>>= 5, N -= 5, h.ndist = (y & 31) + 1, y >>>= 5, N -= 5, h.ncode = (y & 15) + 4, y >>>= 4, N -= 4, h.nlen > 286 || h.ndist > 30) {
              w.msg = "too many length or distance symbols", h.mode = st;
              break;
            }
            h.have = 0, h.mode = rt;
          /* falls through */
          case rt:
            for (; h.have < h.ncode; ) {
              for (; N < 3; ) {
                if (M === 0)
                  break t;
                M--, y += H[l++] << N, N += 8;
              }
              h.lens[sr[h.have++]] = y & 7, y >>>= 3, N -= 3;
            }
            for (; h.have < 19; )
              h.lens[sr[h.have++]] = 0;
            if (h.lencode = h.lendyn, h.lenbits = 7, se = { bits: h.lenbits }, Gt = r(a, h.lens, 0, 19, h.lencode, 0, h.work, se), h.lenbits = se.bits, Gt) {
              w.msg = "invalid code lengths set", h.mode = st;
              break;
            }
            h.have = 0, h.mode = nt;
          /* falls through */
          case nt:
            for (; h.have < h.nlen + h.ndist; ) {
              for (; Mt = h.lencode[y & (1 << h.lenbits) - 1], yt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(yt <= N); ) {
                if (M === 0)
                  break t;
                M--, y += H[l++] << N, N += 8;
              }
              if (Pt < 16)
                y >>>= yt, N -= yt, h.lens[h.have++] = Pt;
              else {
                if (Pt === 16) {
                  for (ee = yt + 2; N < ee; ) {
                    if (M === 0)
                      break t;
                    M--, y += H[l++] << N, N += 8;
                  }
                  if (y >>>= yt, N -= yt, h.have === 0) {
                    w.msg = "invalid bit length repeat", h.mode = st;
                    break;
                  }
                  Ot = h.lens[h.have - 1], K = 3 + (y & 3), y >>>= 2, N -= 2;
                } else if (Pt === 17) {
                  for (ee = yt + 3; N < ee; ) {
                    if (M === 0)
                      break t;
                    M--, y += H[l++] << N, N += 8;
                  }
                  y >>>= yt, N -= yt, Ot = 0, K = 3 + (y & 7), y >>>= 3, N -= 3;
                } else {
                  for (ee = yt + 7; N < ee; ) {
                    if (M === 0)
                      break t;
                    M--, y += H[l++] << N, N += 8;
                  }
                  y >>>= yt, N -= yt, Ot = 0, K = 11 + (y & 127), y >>>= 7, N -= 7;
                }
                if (h.have + K > h.nlen + h.ndist) {
                  w.msg = "invalid bit length repeat", h.mode = st;
                  break;
                }
                for (; K--; )
                  h.lens[h.have++] = Ot;
              }
            }
            if (h.mode === st)
              break;
            if (h.lens[256] === 0) {
              w.msg = "invalid code -- missing end-of-block", h.mode = st;
              break;
            }
            if (h.lenbits = 9, se = { bits: h.lenbits }, Gt = r(s, h.lens, 0, h.nlen, h.lencode, 0, h.work, se), h.lenbits = se.bits, Gt) {
              w.msg = "invalid literal/lengths set", h.mode = st;
              break;
            }
            if (h.distbits = 6, h.distcode = h.distdyn, se = { bits: h.distbits }, Gt = r(o, h.lens, h.nlen, h.ndist, h.distcode, 0, h.work, se), h.distbits = se.bits, Gt) {
              w.msg = "invalid distances set", h.mode = st;
              break;
            }
            if (h.mode = bt, D === u)
              break t;
          /* falls through */
          case bt:
            h.mode = pt;
          /* falls through */
          case pt:
            if (M >= 6 && d >= 258) {
              w.next_out = R, w.avail_out = d, w.next_in = l, w.avail_in = M, h.hold = y, h.bits = N, i(w, Y), R = w.next_out, it = w.output, d = w.avail_out, l = w.next_in, H = w.input, M = w.avail_in, y = h.hold, N = h.bits, h.mode === J && (h.back = -1);
              break;
            }
            for (h.back = 0; Mt = h.lencode[y & (1 << h.lenbits) - 1], yt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(yt <= N); ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            if (zt && (zt & 240) === 0) {
              for (Ut = yt, nn = zt, rn = Pt; Mt = h.lencode[rn + ((y & (1 << Ut + nn) - 1) >> Ut)], yt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(Ut + yt <= N); ) {
                if (M === 0)
                  break t;
                M--, y += H[l++] << N, N += 8;
              }
              y >>>= Ut, N -= Ut, h.back += Ut;
            }
            if (y >>>= yt, N -= yt, h.back += yt, h.length = Pt, zt === 0) {
              h.mode = ot;
              break;
            }
            if (zt & 32) {
              h.back = -1, h.mode = J;
              break;
            }
            if (zt & 64) {
              w.msg = "invalid literal/length code", h.mode = st;
              break;
            }
            h.extra = zt & 15, h.mode = xt;
          /* falls through */
          case xt:
            if (h.extra) {
              for (ee = h.extra; N < ee; ) {
                if (M === 0)
                  break t;
                M--, y += H[l++] << N, N += 8;
              }
              h.length += y & (1 << h.extra) - 1, y >>>= h.extra, N -= h.extra, h.back += h.extra;
            }
            h.was = h.length, h.mode = ft;
          /* falls through */
          case ft:
            for (; Mt = h.distcode[y & (1 << h.distbits) - 1], yt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(yt <= N); ) {
              if (M === 0)
                break t;
              M--, y += H[l++] << N, N += 8;
            }
            if ((zt & 240) === 0) {
              for (Ut = yt, nn = zt, rn = Pt; Mt = h.distcode[rn + ((y & (1 << Ut + nn) - 1) >> Ut)], yt = Mt >>> 24, zt = Mt >>> 16 & 255, Pt = Mt & 65535, !(Ut + yt <= N); ) {
                if (M === 0)
                  break t;
                M--, y += H[l++] << N, N += 8;
              }
              y >>>= Ut, N -= Ut, h.back += Ut;
            }
            if (y >>>= yt, N -= yt, h.back += yt, zt & 64) {
              w.msg = "invalid distance code", h.mode = st;
              break;
            }
            h.offset = Pt, h.extra = zt & 15, h.mode = Q;
          /* falls through */
          case Q:
            if (h.extra) {
              for (ee = h.extra; N < ee; ) {
                if (M === 0)
                  break t;
                M--, y += H[l++] << N, N += 8;
              }
              h.offset += y & (1 << h.extra) - 1, y >>>= h.extra, N -= h.extra, h.back += h.extra;
            }
            if (h.offset > h.dmax) {
              w.msg = "invalid distance too far back", h.mode = st;
              break;
            }
            h.mode = ut;
          /* falls through */
          case ut:
            if (d === 0)
              break t;
            if (K = Y - d, h.offset > K) {
              if (K = h.offset - K, K > h.whave && h.sane) {
                w.msg = "invalid distance too far back", h.mode = st;
                break;
              }
              K > h.wnext ? (K -= h.wnext, mt = h.wsize - K) : mt = h.wnext - K, K > h.length && (K = h.length), ae = h.window;
            } else
              ae = it, mt = R - h.offset, K = h.length;
            K > d && (K = d), d -= K, h.length -= K;
            do
              it[R++] = ae[mt++];
            while (--K);
            h.length === 0 && (h.mode = pt);
            break;
          case ot:
            if (d === 0)
              break t;
            it[R++] = h.length, d--, h.mode = pt;
            break;
          case St:
            if (h.wrap) {
              for (; N < 32; ) {
                if (M === 0)
                  break t;
                M--, y |= H[l++] << N, N += 8;
              }
              if (Y -= d, w.total_out += Y, h.total += Y, Y && (w.adler = h.check = /*UPDATE(state.check, put - _out, _out);*/
              h.flags ? n(h.check, it, Y, R - Y) : e(h.check, it, Y, R - Y)), Y = d, (h.flags ? y : Rt(y)) !== h.check) {
                w.msg = "incorrect data check", h.mode = st;
                break;
              }
              y = 0, N = 0;
            }
            h.mode = Nt;
          /* falls through */
          case Nt:
            if (h.wrap && h.flags) {
              for (; N < 32; ) {
                if (M === 0)
                  break t;
                M--, y += H[l++] << N, N += 8;
              }
              if (y !== (h.total & 4294967295)) {
                w.msg = "incorrect length check", h.mode = st;
                break;
              }
              y = 0, N = 0;
            }
            h.mode = It;
          /* falls through */
          case It:
            Gt = p;
            break t;
          case st:
            Gt = z;
            break t;
          case X:
            return I;
          case Et:
          /* falls through */
          default:
            return E;
        }
    return w.next_out = R, w.avail_out = d, w.next_in = l, w.avail_in = M, h.hold = y, h.bits = N, (h.wsize || Y !== w.avail_out && h.mode < st && (h.mode < St || D !== c)) && wt(w, w.output, w.next_out, Y - w.avail_out), tt -= w.avail_in, Y -= w.avail_out, w.total_in += tt, w.total_out += Y, h.total += Y, h.wrap && Y && (w.adler = h.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    h.flags ? n(h.check, it, Y, w.next_out - Y) : e(h.check, it, Y, w.next_out - Y)), w.data_type = h.bits + (h.last ? 64 : 0) + (h.mode === J ? 128 : 0) + (h.mode === bt || h.mode === U ? 256 : 0), (tt === 0 && Y === 0 || D === c) && Gt === m && (Gt = A), Gt;
  }
  function L(w) {
    if (!w || !w.state)
      return E;
    var D = w.state;
    return D.window && (D.window = null), w.state = null, m;
  }
  function C(w, D) {
    var h;
    return !w || !w.state || (h = w.state, (h.wrap & 2) === 0) ? E : (h.head = D, D.done = !1, m);
  }
  function V(w, D) {
    var h = D.length, H, it, l;
    return !w || !w.state || (H = w.state, H.wrap !== 0 && H.mode !== P) ? E : H.mode === P && (it = 1, it = e(it, D, h, 0), it !== H.check) ? z : (l = wt(w, D, h, h), l ? (H.mode = X, I) : (H.havedict = 1, m));
  }
  return Wt.inflateReset = at, Wt.inflateReset2 = dt, Wt.inflateResetKeep = Bt, Wt.inflateInit = ct, Wt.inflateInit2 = ht, Wt.inflate = g, Wt.inflateEnd = L, Wt.inflateGetHeader = C, Wt.inflateSetDictionary = V, Wt.inflateInfo = "pako inflate (from Nodeca project)", Wt;
}
var hi, Sa;
function ro() {
  return Sa || (Sa = 1, hi = {
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
var di, Aa;
function W0() {
  if (Aa) return di;
  Aa = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return di = t, di;
}
var $a;
function X0() {
  if ($a) return Ie;
  $a = 1;
  var t = G0(), e = de(), n = no(), i = ro(), r = ir(), a = io(), s = W0(), o = Object.prototype.toString;
  function c(m) {
    if (!(this instanceof c)) return new c(m);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, m || {});
    var p = this.options;
    p.raw && p.windowBits >= 0 && p.windowBits < 16 && (p.windowBits = -p.windowBits, p.windowBits === 0 && (p.windowBits = -15)), p.windowBits >= 0 && p.windowBits < 16 && !(m && m.windowBits) && (p.windowBits += 32), p.windowBits > 15 && p.windowBits < 48 && (p.windowBits & 15) === 0 && (p.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var _ = t.inflateInit2(
      this.strm,
      p.windowBits
    );
    if (_ !== i.Z_OK)
      throw new Error(r[_]);
    if (this.header = new s(), t.inflateGetHeader(this.strm, this.header), p.dictionary && (typeof p.dictionary == "string" ? p.dictionary = n.string2buf(p.dictionary) : o.call(p.dictionary) === "[object ArrayBuffer]" && (p.dictionary = new Uint8Array(p.dictionary)), p.raw && (_ = t.inflateSetDictionary(this.strm, p.dictionary), _ !== i.Z_OK)))
      throw new Error(r[_]);
  }
  c.prototype.push = function(m, p) {
    var _ = this.strm, E = this.options.chunkSize, z = this.options.dictionary, I, A, T, x, b, S = !1;
    if (this.ended)
      return !1;
    A = p === ~~p ? p : p === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof m == "string" ? _.input = n.binstring2buf(m) : o.call(m) === "[object ArrayBuffer]" ? _.input = new Uint8Array(m) : _.input = m, _.next_in = 0, _.avail_in = _.input.length;
    do {
      if (_.avail_out === 0 && (_.output = new e.Buf8(E), _.next_out = 0, _.avail_out = E), I = t.inflate(_, i.Z_NO_FLUSH), I === i.Z_NEED_DICT && z && (I = t.inflateSetDictionary(this.strm, z)), I === i.Z_BUF_ERROR && S === !0 && (I = i.Z_OK, S = !1), I !== i.Z_STREAM_END && I !== i.Z_OK)
        return this.onEnd(I), this.ended = !0, !1;
      _.next_out && (_.avail_out === 0 || I === i.Z_STREAM_END || _.avail_in === 0 && (A === i.Z_FINISH || A === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (T = n.utf8border(_.output, _.next_out), x = _.next_out - T, b = n.buf2string(_.output, T), _.next_out = x, _.avail_out = E - x, x && e.arraySet(_.output, _.output, T, x, 0), this.onData(b)) : this.onData(e.shrinkBuf(_.output, _.next_out))), _.avail_in === 0 && _.avail_out === 0 && (S = !0);
    } while ((_.avail_in > 0 || _.avail_out === 0) && I !== i.Z_STREAM_END);
    return I === i.Z_STREAM_END && (A = i.Z_FINISH), A === i.Z_FINISH ? (I = t.inflateEnd(this.strm), this.onEnd(I), this.ended = !0, I === i.Z_OK) : (A === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), _.avail_out = 0), !0);
  }, c.prototype.onData = function(m) {
    this.chunks.push(m);
  }, c.prototype.onEnd = function(m) {
    m === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg;
  };
  function f(m, p) {
    var _ = new c(p);
    if (_.push(m, !0), _.err)
      throw _.msg || r[_.err];
    return _.result;
  }
  function u(m, p) {
    return p = p || {}, p.raw = !0, f(m, p);
  }
  return Ie.Inflate = c, Ie.inflate = f, Ie.inflateRaw = u, Ie.ungzip = f, Ie;
}
var pi, Na;
function Y0() {
  if (Na) return pi;
  Na = 1;
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
    const o = [], c = [], f = [];
    let u = 0;
    do {
      const m = t.subarray(a - i.blockPosition), p = new oo();
      if ({ strm: n } = p, p.push(m, so), p.err)
        throw new Error(p.msg);
      const _ = p.result;
      o.push(_);
      let E = _.length;
      c.push(a), f.push(s), o.length === 1 && i.dataPosition && (o[0] = o[0].subarray(i.dataPosition), E = o[0].length);
      const z = a;
      if (a += n.next_in, s += E, z >= r.blockPosition) {
        o[u] = o[u].subarray(0, r.blockPosition === i.blockPosition ? r.dataPosition - i.dataPosition + 1 : r.dataPosition + 1), c.push(a), f.push(s);
        break;
      }
      u++;
    } while (n.avail_in);
    return {
      buffer: ao(o),
      cpositions: c,
      dpositions: f
    };
  } catch (n) {
    throw /incorrect header check/.exec(`${n}`) ? new Error("problem decompressing block: incorrect gzip header check") : n;
  }
}
function Ia(t) {
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
          throw new Error(`${Ia(a)} fetching ${e}`, { cause: a });
        }
      } else
        throw new Error(`${Ia(r)} fetching ${e}`, { cause: r });
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
      const c = await o.arrayBuffer(), f = o.headers.get("content-range"), u = /\/(\d+)$/.exec(f || "");
      return u?.[1] && (this._stat = {
        size: parseInt(u[1], 10)
      }), new Uint8Array(c.slice(0, e));
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
class gn {
  readFile() {
    throw new Error("unimplemented");
  }
  read() {
    throw new Error("unimplemented");
  }
  close() {
    throw new Error("unimplemented");
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
    return !!(await this.parse(n)).indices[e]?.binIndex;
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
function Le(t, e = 0) {
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
    }, c = i.getInt32(n + 16, !0), f = c ? String.fromCharCode(c) : null, u = i.getInt32(n + 20, !0), m = i.getInt32(n + 24, !0), { refIdToName: p, refNameToId: _ } = this._parseNameBytes(e.subarray(n + 28, n + 28 + m));
    return {
      refIdToName: p,
      refNameToId: _,
      skipLines: u,
      metaChar: f,
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
          const c = this.renameRefSeq(s.decode(e.subarray(i, o)));
          r[n] = c, a[c] = n;
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
    }, c = i.getInt32(16 + s, !0);
    let f, u = 16 + s + 4;
    const m = new Array(c).fill(0).map(() => {
      const p = i.getInt32(u, !0);
      u += 4;
      const _ = {};
      let E;
      for (let z = 0; z < p; z += 1) {
        const I = i.getUint32(u, !0);
        if (I > this.maxBinNumber)
          E = this.parsePseudoBin(n, u + 4), u += 48;
        else {
          const A = Le(n, u + 4);
          f = this._findFirstData(f, A);
          const T = i.getInt32(u + 12, !0);
          u += 16;
          const x = new Array(T);
          for (let b = 0; b < T; b += 1) {
            const S = Le(n, u), $ = Le(n, u + 8);
            u += 16, x[b] = new Bn(S, $, I);
          }
          _[I] = x;
        }
      }
      return { binIndex: _, stats: E };
    });
    return {
      ...o,
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
    const c = this.reg2bins(n, i), f = [];
    for (const [u, m] of c)
      for (let p = u; p <= m; p++)
        if (o.binIndex[p])
          for (const _ of o.binIndex[p])
            f.push(new Bn(_.minv, _.maxv, p));
    return fo(f, new ar(0, 0));
  }
  /**
   * calculate the list of bins that may overlap with region [beg,end) (zero-based half-open)
   */
  reg2bins(e, n) {
    e -= 1, e < 1 && (e = 1), n > 2 ** 50 && (n = 2 ** 34), n -= 1;
    let i = 0, r = 0, a = this.minShift + this.depth * 3;
    const s = [];
    for (; i <= this.depth; a -= 3, r += sp(1, i * 3), i += 1) {
      const o = r + Ra(e, a), c = r + Ra(n, a);
      if (c - o + s.length > this.maxBinNumber)
        throw new Error(`query ${e}-${n} is too large for current binning scheme (shift ${this.minShift}, depth ${this.depth}), try a smaller query or a coarser index binning scheme`);
      s.push([o, c]);
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
    const i = await this.parse(n), r = i.refNameToId[e];
    return r === void 0 || !i.indices[r] ? -1 : i.indices[r].stats?.lineCount ?? -1;
  }
  // fetch and parse the index
  async _parse(e = {}) {
    const n = await this.filehandle.readFile(e), i = await rr(n);
    We(e.signal);
    const r = new DataView(i.buffer);
    if (r.getUint32(0, !0) !== op)
      throw new Error("Not a TBI file");
    const s = r.getUint32(4, !0), o = r.getUint32(8, !0), c = o & 65536 ? "zero-based-half-open" : "1-based-closed", u = {
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
    }, p = r.getInt32(24, !0), _ = 5, E = ((1 << (_ + 1) * 3) - 1) / 7, z = 2 ** (14 + _ * 3), I = p ? String.fromCharCode(p) : null, A = r.getInt32(28, !0), T = r.getInt32(32, !0), { refNameToId: x, refIdToName: b } = this._parseNameBytes(i.slice(36, 36 + T));
    let S = 36 + T, $;
    return {
      indices: new Array(s).fill(0).map(() => {
        const B = r.getInt32(S, !0);
        S += 4;
        const F = {};
        let O;
        for (let P = 0; P < B; P += 1) {
          const J = r.getUint32(S, !0);
          if (S += 4, J > E + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (J === E + 1) {
            const et = r.getInt32(S, !0);
            S += 4, et === 2 && (O = this.parsePseudoBin(i, S)), S += 16 * et;
          } else {
            const et = r.getInt32(S, !0);
            S += 4;
            const lt = new Array(et);
            for (let U = 0; U < et; U += 1) {
              const j = Le(i, S), G = Le(i, S + 8);
              S += 16, $ = this._findFirstData($, j), lt[U] = new Bn(j, G, J);
            }
            F[J] = lt;
          }
        }
        const v = r.getInt32(S, !0);
        S += 4;
        const q = new Array(v);
        for (let P = 0; P < v; P += 1)
          q[P] = Le(i, S), S += 8, $ = this._findFirstData($, q[P]);
        return {
          binIndex: F,
          linearIndex: q,
          stats: O
        };
      }),
      metaChar: I,
      maxBinNumber: E,
      maxRefLength: z,
      skipLines: A,
      firstDataLine: $,
      columnNumbers: m,
      coordinateType: c,
      format: u,
      refIdToName: b,
      refNameToId: x,
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
          const c = this.renameRefSeq(s.decode(e.subarray(i, o)));
          r[n] = c, a[c] = n;
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
    const f = lp(n, i), u = [];
    for (const [z, I] of f)
      for (let A = z; A <= I; A++)
        if (o.binIndex[A])
          for (const T of o.binIndex[A])
            u.push(new Bn(T.minv, T.maxv, A));
    const m = o.linearIndex.length;
    let p = null;
    const _ = Math.min(n >> 14, m - 1), E = Math.min(i >> 14, m - 1);
    for (let z = _; z <= E; ++z) {
      const I = o.linearIndex[z];
      I && (!p || I.compareTo(p) < 0) && (p = I);
    }
    return fo(u, p);
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
  constructor({ path: e, filehandle: n, url: i, tbiPath: r, tbiUrl: a, tbiFilehandle: s, csiPath: o, csiUrl: c, csiFilehandle: f, renameRefSeqs: u = (p) => p, chunkCacheSize: m = 5 * 2 ** 20 }) {
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
    else if (f)
      this.index = new _i({
        filehandle: f,
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
    else if (c)
      this.index = new _i({
        filehandle: new we(c)
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
      fill: (p, _) => this.readChunk(p, { signal: _ })
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
    const c = await this.index.getMetadata(s);
    We(a);
    const f = n ?? 0, u = i ?? c.maxRefLength;
    if (!(f <= u))
      throw new TypeError("invalid start and end coordinates. start must be less than or equal to end");
    if (f === u)
      return;
    const m = await this.index.blocksForRange(e, f, u, s);
    We(a);
    const p = new TextDecoder("utf8");
    for (const _ of m) {
      const { buffer: E, cpositions: z, dpositions: I } = await this.chunkCache.get(_.toString(), _, a);
      We(a);
      let A = 0, T = 0;
      const x = p.decode(E), b = cp(x);
      for (; A < x.length; ) {
        let S, $;
        if (b) {
          if ($ = x.indexOf(`
`, A), $ === -1)
            break;
          S = x.slice(A, $);
        } else {
          if ($ = E.indexOf(10, A), $ === -1)
            break;
          const F = E.slice(A, $);
          S = p.decode(F);
        }
        if (I) {
          for (; A + _.minv.dataPosition >= I[T++]; )
            ;
          T--;
        }
        const { startCoordinate: k, overlaps: B } = this.checkLine(c, e, f, u, S);
        if (B)
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
            z[T] * 256 + (A - I[T]) + _.minv.dataPosition + 1
          );
        else if (k !== void 0 && k >= u)
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
    const a = (n?.blockPosition || 0) + r, s = await this.filehandle.read(a, 0, e), o = await rr(s);
    if (i) {
      let c = -1;
      const f = 10, u = i.charCodeAt(0);
      for (let m = 0; m < o.length && !(m === c + 1 && o[m] !== u); m += 1)
        o[m] === f && (c = m);
      return o.subarray(0, c + 1);
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
    const { columnNumbers: s, metaChar: o, coordinateType: c, format: f } = e;
    if (o && a.startsWith(o))
      return { overlaps: !1 };
    let { ref: u, start: m, end: p } = s;
    u || (u = 0), m || (m = 0), p || (p = 0), f === "VCF" && (p = 8);
    const _ = Math.max(u, m, p);
    let E = 1, z = 0, I = "", A = -1 / 0;
    const T = a.length;
    for (let x = 0; x < T + 1; x++)
      if (a[x] === "	" || x === T) {
        if (E === u) {
          if (this.renameRefSeq(a.slice(z, x)) !== n)
            return {
              overlaps: !1
            };
        } else if (E === m) {
          if (A = parseInt(a.slice(z, x), 10), c === "1-based-closed" && (A -= 1), A >= r)
            return {
              startCoordinate: A,
              overlaps: !1
            };
          if ((p === 0 || p === m) && A + 1 <= i)
            return {
              startCoordinate: A,
              overlaps: !1
            };
        } else if (f === "VCF" && E === 4)
          I = a.slice(z, x);
        else if (E === p && (f === "VCF" ? this._getVcfEnd(A, I, a.slice(z, x)) : Number.parseInt(a.slice(z, x), 10)) <= i)
          return {
            overlaps: !1
          };
        if (z = x + 1, E += 1, E > _)
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
          let c = i.indexOf(";", o);
          c === -1 && (c = i.length), r = parseInt(i.slice(o + 4, c), 10);
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
        for (const c of n) {
          const f = i[a++], u = f.indexOf(":");
          r[c] = u !== -1 ? f.slice(0, u) : f;
        }
      else
        for (const c of n) {
          const f = i[a++].split(":");
          r[c] = f[o];
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
    ] : r && r.startsWith('"') && r.endsWith('"') ? [i, r.slice(1, -1)] : [i, r?.replaceAll(/^"|"$/g, "")];
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
    if (i.forEach((c) => {
      if (c.startsWith("#"))
        c.startsWith("##") ? this.parseMetadata(c) : r = c;
      else throw new Error(`Bad line in header:
${c}`);
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
    if (s.length !== o.length || !s.every((c, f) => c === o[f]))
      throw new Error(`VCF column headers not correct:
${r}`);
    this.samples = a.slice(9);
  }
  parseSamples(e, n) {
    const i = {};
    if (e) {
      const r = n.split("	"), a = e.split(":"), s = a.map((o) => {
        const c = this.getMetadata("FORMAT", o, "Type");
        return c === "Integer" || c === "Float";
      });
      for (let o = 0; o < this.samples.length; o++) {
        const c = this.samples[o];
        i[c] = {};
        const f = r[o].split(":");
        for (let u = 0; u < f.length; u++) {
          const m = f[u];
          i[c][a[u]] = m === "" || m === "." ? void 0 : m.split(",").map((p) => p === "." ? void 0 : s[u] ? +p : p);
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
    if (r?.startsWith("<")) {
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
    let n = 0;
    for (let $ = 0; n < e.length && (e[n] === "	" && ($ += 1), $ !== 9); n += 1)
      ;
    const i = e.slice(0, n).split("	"), r = e.slice(n + 1), [a, s, o, c, f, u, m] = i, p = a, _ = +s, E = o === "." ? void 0 : o.split(";"), z = c, I = f === "." ? void 0 : f.split(","), A = u === "." ? void 0 : +u, T = m === "." ? void 0 : m.split(";"), x = i[8];
    if (this.strict && !i[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const b = i[7]?.includes("%"), S = i[7] === void 0 || i[7] === "." ? {} : Object.fromEntries(i[7].split(";").map(($) => {
      const [k, B] = $.split("="), F = B?.split(",").map((v) => v === "." ? void 0 : v).map((v) => v && b ? _p(v) : v), O = this.getMetadata("INFO", k, "Type");
      return O === "Integer" || O === "Float" ? [
        k,
        F?.map((v) => v === void 0 ? void 0 : Number(v))
      ] : O === "Flag" ? [k, !0] : [k, F ?? !0];
    }));
    return {
      CHROM: p,
      POS: _,
      ALT: I,
      INFO: S,
      REF: z,
      FILTER: T && T.length === 1 && T[0] === "PASS" ? "PASS" : T,
      ID: E,
      QUAL: A,
      FORMAT: x,
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
        const c = o.split("->");
        return c[1] ? c[0] : o;
      }).filter((o) => !!o)
    );
    r = new Set(
      [...s].map((o) => o.trim()).map((o) => {
        const c = a.map((f) => f.split("->").map((u) => u.trim())).map((f) => f[1] && f[0] === o ? f[1] : "").filter((f) => !!f);
        return c.length ? `${o} -> ${c.join(",")}` : o;
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
  const { REF: n = "", ALT: i, POS: r, CHROM: a, ID: s } = t, o = r - 1, [c, f] = wp(n, i, e);
  return {
    refName: a,
    start: o,
    end: xp(t),
    description: f,
    type: c,
    name: s?.join(","),
    aliases: s && s.length > 1 ? s.slice(1) : void 0
  };
}
function xp(t) {
  const { POS: e, REF: n = "", ALT: i } = t, r = i?.includes("<TRA>"), a = e - 1;
  if (i?.some((o) => o.includes("<"))) {
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
  let c = 0;
  return await a.getLines(i.chromosome, i.start, i.end, {
    lineCallback: (f) => {
      const u = s.parseLine(f), m = new kp({
        variant: u,
        parser: s,
        id: `${c++}`
      }), p = m.get("INFO");
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
        type: La(p.soTerm[0]) ?? m.get("type"),
        ...Object.fromEntries(
          Object.entries(p).map(([_, E]) => [
            _,
            {
              values: [JSON.stringify(E.map((z) => La(z)))]
            }
          ])
        )
      });
    }
  }), o;
}
function La(t) {
  return t?.replace(/['"]+/g, "");
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
  return $t(this.nodes()[0]);
};
Se.prototype.last = function() {
  return $t(this.nodes()[this.size() - 1]);
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
    const i = $t(n);
    i.selectAll(".highlight").remove(), i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((r) => r.selected === "true").style("stroke", null).datum((r) => (r.selected = "false", r)), Ki(e, i);
  }
  _initViewer(e) {
    $t(e).selectAll("*").remove();
    const n = $t(e), r = `${e.replace("#", "")} main-view`, a = {
      top: 8,
      right: 30,
      bottom: 30,
      left: 40
    };
    return n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${a.left},${a.top})`).attr("class", r), this.width = this.width - a.left - a.right, this.height = this.height - a.top - a.bottom, $t(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    const e = this.width, n = this.config.transcriptTypes ?? Tu, i = this.config.variantTypes ?? Eu, r = this.config.binRatio ?? 0.01, a = this.config.region, s = this._configureRange(
      a.start,
      a.end,
      e
    ), o = s.range, c = a.chromosome, f = this.config.variantFilter ?? [], u = this.config.isoformFilter ?? [], m = this.config.htpVariant ?? "", p = s.start, _ = s.end;
    new Ou({
      viewer: this.viewer,
      track: {
        chromosome: c,
        start: p,
        end: _,
        range: s.range
      },
      height: this.height,
      width: e
    }).DrawOverviewTrack();
    let I = 100;
    const A = this.config.showVariantLabel ?? !0, { viewer: T, genome: x, height: b, tracks: S } = this;
    S.map(($) => {
      const { variantData: k, trackData: B } = $;
      if ($.type === Pe.ISOFORM_AND_VARIANT) {
        const F = new Ru({
          viewer: T,
          height: b,
          width: e,
          transcriptTypes: n,
          variantTypes: i,
          showVariantLabel: A,
          trackData: B,
          variantData: k,
          variantFilter: f,
          binRatio: r,
          isoformFilter: u
        });
        I += F.DrawTrack();
      } else if ($.type === Pe.ISOFORM_EMBEDDED_VARIANT) {
        const F = new Mu({
          viewer: T,
          height: b,
          width: e,
          transcriptTypes: n,
          variantData: k,
          trackData: B,
          variantTypes: i,
          showVariantLabel: A,
          variantFilter: f
        });
        I += F.DrawTrack();
      } else if ($.type === Pe.ISOFORM) {
        const F = new Lu({
          region: a,
          viewer: T,
          height: b,
          width: e,
          genome: x,
          trackData: B,
          transcriptTypes: n,
          htpVariant: m
        });
        I += F.DrawTrack();
      } else $.type === Pe.VARIANT ? new ad({
        region: a,
        viewer: T,
        range: o,
        height: b,
        width: e
      }).DrawTrack() : $.type === Pe.VARIANT_GLOBAL ? new sd({
        region: a,
        viewer: T,
        track: {
          ...$,
          range: o
        },
        height: b,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${$.type}`);
      $t(this.svg_target).attr("height", I);
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
      const c = (
        // @ts-expect-error
        $t("#clip-rect").node().getBoundingClientRect().width / 2 + 100
      );
      o = [
        c - s / 2,
        c + s / 2
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
