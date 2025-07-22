function wn(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ho(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function La(t) {
  let e, n, i;
  t.length !== 2 ? (e = wn, n = (o, c) => wn(t(o), c), i = (o, c) => t(o) - c) : (e = t === wn || t === ho ? t : uo, n = t, i = t);
  function r(o, c, f = 0, h = o.length) {
    if (f < h) {
      if (e(c, c) !== 0) return h;
      do {
        const m = f + h >>> 1;
        n(o[m], c) < 0 ? f = m + 1 : h = m;
      } while (f < h);
    }
    return f;
  }
  function a(o, c, f = 0, h = o.length) {
    if (f < h) {
      if (e(c, c) !== 0) return h;
      do {
        const m = f + h >>> 1;
        n(o[m], c) <= 0 ? f = m + 1 : h = m;
      } while (f < h);
    }
    return f;
  }
  function s(o, c, f = 0, h = o.length) {
    const m = r(o, c, f, h - 1);
    return m > f && i(o[m - 1], c) > -i(o[m], c) ? m - 1 : m;
  }
  return { left: r, center: s, right: a };
}
function uo() {
  return 0;
}
function po(t) {
  return t === null ? NaN : +t;
}
const go = La(wn), _o = go.right;
La(po).center;
const mo = Math.sqrt(50), wo = Math.sqrt(10), vo = Math.sqrt(2);
function En(t, e, n) {
  const i = (e - t) / Math.max(0, n), r = Math.floor(Math.log10(i)), a = i / Math.pow(10, r), s = a >= mo ? 10 : a >= wo ? 5 : a >= vo ? 2 : 1;
  let o, c, f;
  return r < 0 ? (f = Math.pow(10, -r) / s, o = Math.round(t * f), c = Math.round(e * f), o / f < t && ++o, c / f > e && --c, f = -f) : (f = Math.pow(10, r) * s, o = Math.round(t / f), c = Math.round(e / f), o * f < t && ++o, c * f > e && --c), c < o && 0.5 <= n && n < 2 ? En(t, e, n * 2) : [o, c, f];
}
function yo(t, e, n) {
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
function bo(t, e, n) {
  e = +e, t = +t, n = +n;
  const i = e < t, r = i ? gi(e, t, n) : gi(t, e, n);
  return (i ? -1 : 1) * (r < 0 ? 1 / -r : r);
}
function xo(t) {
  return t;
}
var vn = 1, Zn = 2, _i = 3, an = 4, or = 1e-6;
function ko(t) {
  return "translate(" + t + ",0)";
}
function Eo(t) {
  return "translate(0," + t + ")";
}
function To(t) {
  return (e) => +t(e);
}
function So(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Ao() {
  return !this.__axis;
}
function Ca(t, e) {
  var n = [], i = null, r = null, a = 6, s = 6, o = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = t === vn || t === an ? -1 : 1, h = t === an || t === Zn ? "x" : "y", m = t === vn || t === _i ? ko : Eo;
  function p(g) {
    var E = i ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), L = r ?? (e.tickFormat ? e.tickFormat.apply(e, n) : xo), R = Math.max(a, 0) + o, S = e.range(), v = +S[0] + c, k = +S[S.length - 1] + c, x = (e.bandwidth ? So : To)(e.copy(), c), A = g.selection ? g.selection() : g, I = A.selectAll(".domain").data([null]), T = A.selectAll(".tick").data(E, e).order(), z = T.exit(), F = T.enter().append("g").attr("class", "tick"), C = T.select("line"), b = T.select("text");
    I = I.merge(I.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), T = T.merge(F), C = C.merge(F.append("line").attr("stroke", "currentColor").attr(h + "2", f * a)), b = b.merge(F.append("text").attr("fill", "currentColor").attr(h, f * R).attr("dy", t === vn ? "0em" : t === _i ? "0.71em" : "0.32em")), g !== A && (I = I.transition(g), T = T.transition(g), C = C.transition(g), b = b.transition(g), z = z.transition(g).attr("opacity", or).attr("transform", function(G) {
      return isFinite(G = x(G)) ? m(G + c) : this.getAttribute("transform");
    }), F.attr("opacity", or).attr("transform", function(G) {
      var P = this.parentNode.__axis;
      return m((P && isFinite(P = P(G)) ? P : x(G)) + c);
    })), z.remove(), I.attr("d", t === an || t === Zn ? s ? "M" + f * s + "," + v + "H" + c + "V" + k + "H" + f * s : "M" + c + "," + v + "V" + k : s ? "M" + v + "," + f * s + "V" + c + "H" + k + "V" + f * s : "M" + v + "," + c + "H" + k), T.attr("opacity", 1).attr("transform", function(G) {
      return m(x(G) + c);
    }), C.attr(h + "2", f * a), b.attr(h, f * R).text(L), A.filter(Ao).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Zn ? "start" : t === an ? "end" : "middle"), A.each(function() {
      this.__axis = x;
    });
  }
  return p.scale = function(g) {
    return arguments.length ? (e = g, p) : e;
  }, p.ticks = function() {
    return n = Array.from(arguments), p;
  }, p.tickArguments = function(g) {
    return arguments.length ? (n = g == null ? [] : Array.from(g), p) : n.slice();
  }, p.tickValues = function(g) {
    return arguments.length ? (i = g == null ? null : Array.from(g), p) : i && i.slice();
  }, p.tickFormat = function(g) {
    return arguments.length ? (r = g, p) : r;
  }, p.tickSize = function(g) {
    return arguments.length ? (a = s = +g, p) : a;
  }, p.tickSizeInner = function(g) {
    return arguments.length ? (a = +g, p) : a;
  }, p.tickSizeOuter = function(g) {
    return arguments.length ? (s = +g, p) : s;
  }, p.tickPadding = function(g) {
    return arguments.length ? (o = +g, p) : o;
  }, p.offset = function(g) {
    return arguments.length ? (c = +g, p) : c;
  }, p;
}
function lr(t) {
  return Ca(vn, t);
}
function No(t) {
  return Ca(_i, t);
}
var $o = { value: () => {
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
function Io(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", r = n.indexOf(".");
    if (r >= 0 && (i = n.slice(r + 1), n = n.slice(0, r)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
yn.prototype = Fa.prototype = {
  constructor: yn,
  on: function(t, e) {
    var n = this._, i = Io(t + "", n), r, a = -1, s = i.length;
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
      t[i] = $o, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var mi = "http://www.w3.org/1999/xhtml";
const fr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: mi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Bn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), fr.hasOwnProperty(e) ? { space: fr[e], local: t } : t;
}
function Do(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === mi && e.documentElement.namespaceURI === mi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Mo(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function za(t) {
  var e = Bn(t);
  return (e.local ? Mo : Do)(e);
}
function Oo() {
}
function Fi(t) {
  return t == null ? Oo : function() {
    return this.querySelector(t);
  };
}
function Lo(t) {
  typeof t != "function" && (t = Fi(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, h = 0; h < s; ++h)
      (c = a[h]) && (f = t.call(c, c.__data__, h, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[h] = f);
  return new Pt(i, this._parents);
}
function Ba(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Co() {
  return [];
}
function Ha(t) {
  return t == null ? Co : function() {
    return this.querySelectorAll(t);
  };
}
function Fo(t) {
  return function() {
    return Ba(t.apply(this, arguments));
  };
}
function zo(t) {
  typeof t == "function" ? t = Fo(t) : t = Ha(t);
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (i.push(t.call(c, c.__data__, f, s)), r.push(c));
  return new Pt(i, r);
}
function Va(t) {
  return function() {
    return this.matches(t);
  };
}
function Pa(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Bo = Array.prototype.find;
function Ho(t) {
  return function() {
    return Bo.call(this.children, t);
  };
}
function Vo() {
  return this.firstElementChild;
}
function Po(t) {
  return this.select(t == null ? Vo : Ho(typeof t == "function" ? t : Pa(t)));
}
var Uo = Array.prototype.filter;
function Go() {
  return Array.from(this.children);
}
function Zo(t) {
  return function() {
    return Uo.call(this.children, t);
  };
}
function qo(t) {
  return this.selectAll(t == null ? Go : Zo(typeof t == "function" ? t : Pa(t)));
}
function Wo(t) {
  typeof t != "function" && (t = Va(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new Pt(i, this._parents);
}
function Ua(t) {
  return new Array(t.length);
}
function Yo() {
  return new Pt(this._enter || this._groups.map(Ua), this._parents);
}
function Tn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Tn.prototype = {
  constructor: Tn,
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
function Xo(t) {
  return function() {
    return t;
  };
}
function Ko(t, e, n, i, r, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Tn(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (r[s] = o);
}
function Jo(t, e, n, i, r, a, s) {
  var o, c, f = /* @__PURE__ */ new Map(), h = e.length, m = a.length, p = new Array(h), g;
  for (o = 0; o < h; ++o)
    (c = e[o]) && (p[o] = g = s.call(c, c.__data__, o, e) + "", f.has(g) ? r[o] = c : f.set(g, c));
  for (o = 0; o < m; ++o)
    g = s.call(t, a[o], o, a) + "", (c = f.get(g)) ? (i[o] = c, c.__data__ = a[o], f.delete(g)) : n[o] = new Tn(t, a[o]);
  for (o = 0; o < h; ++o)
    (c = e[o]) && f.get(p[o]) === c && (r[o] = c);
}
function Qo(t) {
  return t.__data__;
}
function jo(t, e) {
  if (!arguments.length) return Array.from(this, Qo);
  var n = e ? Jo : Ko, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Xo(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var h = i[f], m = r[f], p = m.length, g = tl(t.call(h, h && h.__data__, f, i)), E = g.length, L = o[f] = new Array(E), R = s[f] = new Array(E), S = c[f] = new Array(p);
    n(h, m, L, R, S, g, e);
    for (var v = 0, k = 0, x, A; v < E; ++v)
      if (x = L[v]) {
        for (v >= k && (k = v + 1); !(A = R[k]) && ++k < E; ) ;
        x._next = A || null;
      }
  }
  return s = new Pt(s, i), s._enter = o, s._exit = c, s;
}
function tl(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function el() {
  return new Pt(this._exit || this._groups.map(Ua), this._parents);
}
function nl(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (r = e(r), r && (r = r.selection())), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function il(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, i = e._groups, r = n.length, a = i.length, s = Math.min(r, a), o = new Array(r), c = 0; c < s; ++c)
    for (var f = n[c], h = i[c], m = f.length, p = o[c] = new Array(m), g, E = 0; E < m; ++E)
      (g = f[E] || h[E]) && (p[E] = g);
  for (; c < r; ++c)
    o[c] = n[c];
  return new Pt(o, this._parents);
}
function rl() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function al(t) {
  t || (t = sl);
  function e(m, p) {
    return m && p ? t(m.__data__, p.__data__) : !m - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, h = 0; h < o; ++h)
      (f = s[h]) && (c[h] = f);
    c.sort(e);
  }
  return new Pt(r, this._parents).order();
}
function sl(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ol() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ll() {
  return Array.from(this);
}
function cl() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function fl() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function hl() {
  return !this.node();
}
function ul(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, s = r.length, o; a < s; ++a)
      (o = r[a]) && t.call(o, o.__data__, a, r);
  return this;
}
function dl(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function pl(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function gl(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function _l(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function ml(t, e) {
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
function vl(t, e) {
  var n = Bn(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? pl : dl : typeof e == "function" ? n.local ? wl : ml : n.local ? _l : gl)(n, e));
}
function Ga(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function yl(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function bl(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function xl(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function kl(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? yl : typeof e == "function" ? xl : bl)(t, e, n ?? "")) : Le(this.node(), t);
}
function Le(t, e) {
  return t.style.getPropertyValue(e) || Ga(t).getComputedStyle(t, null).getPropertyValue(e);
}
function El(t) {
  return function() {
    delete this[t];
  };
}
function Tl(t, e) {
  return function() {
    this[t] = e;
  };
}
function Sl(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Al(t, e) {
  return arguments.length > 1 ? this.each((e == null ? El : typeof e == "function" ? Sl : Tl)(t, e)) : this.node()[t];
}
function Za(t) {
  return t.trim().split(/^|\s+/);
}
function zi(t) {
  return t.classList || new qa(t);
}
function qa(t) {
  this._node = t, this._names = Za(t.getAttribute("class") || "");
}
qa.prototype = {
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
  for (var n = zi(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Ya(t, e) {
  for (var n = zi(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Nl(t) {
  return function() {
    Wa(this, t);
  };
}
function $l(t) {
  return function() {
    Ya(this, t);
  };
}
function Il(t, e) {
  return function() {
    (e.apply(this, arguments) ? Wa : Ya)(this, t);
  };
}
function Rl(t, e) {
  var n = Za(t + "");
  if (arguments.length < 2) {
    for (var i = zi(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Il : e ? Nl : $l)(n, e));
}
function Dl() {
  this.textContent = "";
}
function Ml(t) {
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
function Ll(t) {
  return arguments.length ? this.each(t == null ? Dl : (typeof t == "function" ? Ol : Ml)(t)) : this.node().textContent;
}
function Cl() {
  this.innerHTML = "";
}
function Fl(t) {
  return function() {
    this.innerHTML = t;
  };
}
function zl(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Bl(t) {
  return arguments.length ? this.each(t == null ? Cl : (typeof t == "function" ? zl : Fl)(t)) : this.node().innerHTML;
}
function Hl() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Vl() {
  return this.each(Hl);
}
function Pl() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ul() {
  return this.each(Pl);
}
function Gl(t) {
  var e = typeof t == "function" ? t : za(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Zl() {
  return null;
}
function ql(t, e) {
  var n = typeof t == "function" ? t : za(t), i = e == null ? Zl : typeof e == "function" ? e : Fi(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Wl() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Yl() {
  return this.each(Wl);
}
function Xl() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Kl() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Jl(t) {
  return this.select(t ? Kl : Xl);
}
function Ql(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function jl(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function tc(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function ec(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.options) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function nc(t, e, n) {
  return function() {
    var i = this.__on, r, a = jl(e);
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
function ic(t, e, n) {
  var i = tc(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, f = o.length, h; c < f; ++c)
        for (r = 0, h = o[c]; r < a; ++r)
          if ((s = i[r]).type === h.type && s.name === h.name)
            return h.value;
    }
    return;
  }
  for (o = e ? nc : ec, r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Xa(t, e, n) {
  var i = Ga(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(e, n) : (r = i.document.createEvent("Event"), n ? (r.initEvent(e, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(e, !1, !1)), t.dispatchEvent(r);
}
function rc(t, e) {
  return function() {
    return Xa(this, t, e);
  };
}
function ac(t, e) {
  return function() {
    return Xa(this, t, e.apply(this, arguments));
  };
}
function sc(t, e) {
  return this.each((typeof e == "function" ? ac : rc)(t, e));
}
function* oc() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length, s; r < a; ++r)
      (s = i[r]) && (yield s);
}
var Bi = [null];
function Pt(t, e) {
  this._groups = t, this._parents = e;
}
function Se() {
  return new Pt([[document.documentElement]], Bi);
}
function lc() {
  return this;
}
Pt.prototype = Se.prototype = {
  constructor: Pt,
  select: Lo,
  selectAll: zo,
  selectChild: Po,
  selectChildren: qo,
  filter: Wo,
  data: jo,
  enter: Yo,
  exit: el,
  join: nl,
  merge: il,
  selection: lc,
  order: rl,
  sort: al,
  call: ol,
  nodes: ll,
  node: cl,
  size: fl,
  empty: hl,
  each: ul,
  attr: vl,
  style: kl,
  property: Al,
  classed: Rl,
  text: Ll,
  html: Bl,
  raise: Vl,
  lower: Ul,
  append: Gl,
  insert: ql,
  remove: Yl,
  clone: Jl,
  datum: Ql,
  on: ic,
  dispatch: sc,
  [Symbol.iterator]: oc
};
function Tt(t) {
  return typeof t == "string" ? new Pt([[document.querySelector(t)]], [document.documentElement]) : new Pt([[t]], Bi);
}
function Qt(t) {
  return typeof t == "string" ? new Pt([document.querySelectorAll(t)], [document.documentElement]) : new Pt([Ba(t)], Bi);
}
function Hi(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Ka(t, e) {
  var n = Object.create(t.prototype);
  for (var i in e) n[i] = e[i];
  return n;
}
function en() {
}
var Xe = 0.7, Sn = 1 / Xe, Me = "\\s*([+-]?\\d+)\\s*", Ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", re = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", cc = /^#([0-9a-f]{3,8})$/, fc = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), hc = new RegExp(`^rgb\\(${re},${re},${re}\\)$`), uc = new RegExp(`^rgba\\(${Me},${Me},${Me},${Ke}\\)$`), dc = new RegExp(`^rgba\\(${re},${re},${re},${Ke}\\)$`), pc = new RegExp(`^hsl\\(${Ke},${re},${re}\\)$`), gc = new RegExp(`^hsla\\(${Ke},${re},${re},${Ke}\\)$`), hr = {
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
Hi(en, xe, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ur,
  // Deprecated! Use color.formatHex.
  formatHex: ur,
  formatHex8: _c,
  formatHsl: mc,
  formatRgb: dr,
  toString: dr
});
function ur() {
  return this.rgb().formatHex();
}
function _c() {
  return this.rgb().formatHex8();
}
function mc() {
  return Ja(this).formatHsl();
}
function dr() {
  return this.rgb().formatRgb();
}
function xe(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = cc.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? pr(e) : n === 3 ? new Gt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? sn(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? sn(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = fc.exec(t)) ? new Gt(e[1], e[2], e[3], 1) : (e = hc.exec(t)) ? new Gt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = uc.exec(t)) ? sn(e[1], e[2], e[3], e[4]) : (e = dc.exec(t)) ? sn(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = pc.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, 1) : (e = gc.exec(t)) ? mr(e[1], e[2] / 100, e[3] / 100, e[4]) : hr.hasOwnProperty(t) ? pr(hr[t]) : t === "transparent" ? new Gt(NaN, NaN, NaN, 0) : null;
}
function pr(t) {
  return new Gt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function sn(t, e, n, i) {
  return i <= 0 && (t = e = n = NaN), new Gt(t, e, n, i);
}
function wc(t) {
  return t instanceof en || (t = xe(t)), t ? (t = t.rgb(), new Gt(t.r, t.g, t.b, t.opacity)) : new Gt();
}
function wi(t, e, n, i) {
  return arguments.length === 1 ? wc(t) : new Gt(t, e, n, i ?? 1);
}
function Gt(t, e, n, i) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +i;
}
Hi(Gt, wi, Ka(en, {
  brighter(t) {
    return t = t == null ? Sn : Math.pow(Sn, t), new Gt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Xe : Math.pow(Xe, t), new Gt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Gt(ye(this.r), ye(this.g), ye(this.b), An(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: gr,
  // Deprecated! Use color.formatHex.
  formatHex: gr,
  formatHex8: vc,
  formatRgb: _r,
  toString: _r
}));
function gr() {
  return `#${we(this.r)}${we(this.g)}${we(this.b)}`;
}
function vc() {
  return `#${we(this.r)}${we(this.g)}${we(this.b)}${we((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function _r() {
  const t = An(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${ye(this.r)}, ${ye(this.g)}, ${ye(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function An(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function ye(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function we(t) {
  return t = ye(t), (t < 16 ? "0" : "") + t.toString(16);
}
function mr(t, e, n, i) {
  return i <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new te(t, e, n, i);
}
function Ja(t) {
  if (t instanceof te) return new te(t.h, t.s, t.l, t.opacity);
  if (t instanceof en || (t = xe(t)), !t) return new te();
  if (t instanceof te) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, i = t.b / 255, r = Math.min(e, n, i), a = Math.max(e, n, i), s = NaN, o = a - r, c = (a + r) / 2;
  return o ? (e === a ? s = (n - i) / o + (n < i) * 6 : n === a ? s = (i - e) / o + 2 : s = (e - n) / o + 4, o /= c < 0.5 ? a + r : 2 - a - r, s *= 60) : o = c > 0 && c < 1 ? 0 : s, new te(s, o, c, t.opacity);
}
function yc(t, e, n, i) {
  return arguments.length === 1 ? Ja(t) : new te(t, e, n, i ?? 1);
}
function te(t, e, n, i) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +i;
}
Hi(te, yc, Ka(en, {
  brighter(t) {
    return t = t == null ? Sn : Math.pow(Sn, t), new te(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Xe : Math.pow(Xe, t), new te(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * e, r = 2 * n - i;
    return new Gt(
      qn(t >= 240 ? t - 240 : t + 120, r, i),
      qn(t, r, i),
      qn(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new te(wr(this.h), on(this.s), on(this.l), An(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = An(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${wr(this.h)}, ${on(this.s) * 100}%, ${on(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function wr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function on(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function qn(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Vi = (t) => () => t;
function bc(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function xc(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(i) {
    return Math.pow(t + i * e, n);
  };
}
function kc(t) {
  return (t = +t) == 1 ? Qa : function(e, n) {
    return n - e ? xc(e, n, t) : Vi(isNaN(e) ? n : e);
  };
}
function Qa(t, e) {
  var n = e - t;
  return n ? bc(t, n) : Vi(isNaN(t) ? e : t);
}
const Nn = function t(e) {
  var n = kc(e);
  function i(r, a) {
    var s = n((r = wi(r)).r, (a = wi(a)).r), o = n(r.g, a.g), c = n(r.b, a.b), f = Qa(r.opacity, a.opacity);
    return function(h) {
      return r.r = s(h), r.g = o(h), r.b = c(h), r.opacity = f(h), r + "";
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
function Tc(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Sc(t, e) {
  var n = e ? e.length : 0, i = t ? Math.min(n, t.length) : 0, r = new Array(i), a = new Array(n), s;
  for (s = 0; s < i; ++s) r[s] = Pi(t[s], e[s]);
  for (; s < n; ++s) a[s] = e[s];
  return function(o) {
    for (s = 0; s < i; ++s) a[s] = r[s](o);
    return a;
  };
}
function Ac(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(i) {
    return n.setTime(t * (1 - i) + e * i), n;
  };
}
function jt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Nc(t, e) {
  var n = {}, i = {}, r;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (r in e)
    r in t ? n[r] = Pi(t[r], e[r]) : i[r] = e[r];
  return function(a) {
    for (r in n) i[r] = n[r](a);
    return i;
  };
}
var vi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Wn = new RegExp(vi.source, "g");
function $c(t) {
  return function() {
    return t;
  };
}
function Ic(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ja(t, e) {
  var n = vi.lastIndex = Wn.lastIndex = 0, i, r, a, s = -1, o = [], c = [];
  for (t = t + "", e = e + ""; (i = vi.exec(t)) && (r = Wn.exec(e)); )
    (a = r.index) > n && (a = e.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (i = i[0]) === (r = r[0]) ? o[s] ? o[s] += r : o[++s] = r : (o[++s] = null, c.push({ i: s, x: jt(i, r) })), n = Wn.lastIndex;
  return n < e.length && (a = e.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? c[0] ? Ic(c[0].x) : $c(e) : (e = c.length, function(f) {
    for (var h = 0, m; h < e; ++h) o[(m = c[h]).i] = m.x(f);
    return o.join("");
  });
}
function Pi(t, e) {
  var n = typeof e, i;
  return e == null || n === "boolean" ? Vi(e) : (n === "number" ? jt : n === "string" ? (i = xe(e)) ? (e = i, Nn) : ja : e instanceof xe ? Nn : e instanceof Date ? Ac : Tc(e) ? Ec : Array.isArray(e) ? Sc : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Nc : jt)(t, e);
}
function Rc(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var vr = 180 / Math.PI, yi = {
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
    rotate: Math.atan2(e, t) * vr,
    skewX: Math.atan(c) * vr,
    scaleX: s,
    scaleY: o
  };
}
var ln;
function Dc(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? yi : ts(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Mc(t) {
  return t == null || (ln || (ln = document.createElementNS("http://www.w3.org/2000/svg", "g")), ln.setAttribute("transform", t), !(t = ln.transform.baseVal.consolidate())) ? yi : (t = t.matrix, ts(t.a, t.b, t.c, t.d, t.e, t.f));
}
function es(t, e, n, i) {
  function r(f) {
    return f.length ? f.pop() + " " : "";
  }
  function a(f, h, m, p, g, E) {
    if (f !== m || h !== p) {
      var L = g.push("translate(", null, e, null, n);
      E.push({ i: L - 4, x: jt(f, m) }, { i: L - 2, x: jt(h, p) });
    } else (m || p) && g.push("translate(" + m + e + p + n);
  }
  function s(f, h, m, p) {
    f !== h ? (f - h > 180 ? h += 360 : h - f > 180 && (f += 360), p.push({ i: m.push(r(m) + "rotate(", null, i) - 2, x: jt(f, h) })) : h && m.push(r(m) + "rotate(" + h + i);
  }
  function o(f, h, m, p) {
    f !== h ? p.push({ i: m.push(r(m) + "skewX(", null, i) - 2, x: jt(f, h) }) : h && m.push(r(m) + "skewX(" + h + i);
  }
  function c(f, h, m, p, g, E) {
    if (f !== m || h !== p) {
      var L = g.push(r(g) + "scale(", null, ",", null, ")");
      E.push({ i: L - 4, x: jt(f, m) }, { i: L - 2, x: jt(h, p) });
    } else (m !== 1 || p !== 1) && g.push(r(g) + "scale(" + m + "," + p + ")");
  }
  return function(f, h) {
    var m = [], p = [];
    return f = t(f), h = t(h), a(f.translateX, f.translateY, h.translateX, h.translateY, m, p), s(f.rotate, h.rotate, m, p), o(f.skewX, h.skewX, m, p), c(f.scaleX, f.scaleY, h.scaleX, h.scaleY, m, p), f = h = null, function(g) {
      for (var E = -1, L = p.length, R; ++E < L; ) m[(R = p[E]).i] = R.x(g);
      return m.join("");
    };
  };
}
var Oc = es(Dc, "px, ", "px)", "deg)"), Lc = es(Mc, ", ", ")", ")"), Ce = 0, Ue = 0, He = 0, ns = 1e3, $n, Ge, In = 0, ke = 0, Hn = 0, Je = typeof performance == "object" && performance.now ? performance : Date, is = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ui() {
  return ke || (is(Cc), ke = Je.now() + Hn);
}
function Cc() {
  ke = 0;
}
function Rn() {
  this._call = this._time = this._next = null;
}
Rn.prototype = rs.prototype = {
  constructor: Rn,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ui() : +n) + (e == null ? 0 : +e), !this._next && Ge !== this && (Ge ? Ge._next = this : $n = this, Ge = this), this._call = t, this._time = n, bi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, bi());
  }
};
function rs(t, e, n) {
  var i = new Rn();
  return i.restart(t, e, n), i;
}
function Fc() {
  Ui(), ++Ce;
  for (var t = $n, e; t; )
    (e = ke - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ce;
}
function yr() {
  ke = (In = Je.now()) + Hn, Ce = Ue = 0;
  try {
    Fc();
  } finally {
    Ce = 0, Bc(), ke = 0;
  }
}
function zc() {
  var t = Je.now(), e = t - In;
  e > ns && (Hn -= e, In = t);
}
function Bc() {
  for (var t, e = $n, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : $n = n);
  Ge = t, bi(i);
}
function bi(t) {
  if (!Ce) {
    Ue && (Ue = clearTimeout(Ue));
    var e = t - ke;
    e > 24 ? (t < 1 / 0 && (Ue = setTimeout(yr, t - Je.now() - Hn)), He && (He = clearInterval(He))) : (He || (In = Je.now(), He = setInterval(zc, ns)), Ce = 1, is(yr));
  }
}
function br(t, e, n) {
  var i = new Rn();
  return e = e == null ? 0 : +e, i.restart((r) => {
    i.stop(), t(r + e);
  }, e, n), i;
}
var Hc = Fa("start", "end", "cancel", "interrupt"), Vc = [], as = 0, xr = 1, xi = 2, bn = 3, kr = 4, ki = 5, xn = 6;
function Vn(t, e, n, i, r, a) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Pc(t, n, {
    name: e,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Hc,
    tween: Vc,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: as
  });
}
function Gi(t, e) {
  var n = ee(t, e);
  if (n.state > as) throw new Error("too late; already scheduled");
  return n;
}
function ae(t, e) {
  var n = ee(t, e);
  if (n.state > bn) throw new Error("too late; already running");
  return n;
}
function ee(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Pc(t, e, n) {
  var i = t.__transition, r;
  i[e] = n, n.timer = rs(a, 0, n.time);
  function a(f) {
    n.state = xr, n.timer.restart(s, n.delay, n.time), n.delay <= f && s(f - n.delay);
  }
  function s(f) {
    var h, m, p, g;
    if (n.state !== xr) return c();
    for (h in i)
      if (g = i[h], g.name === n.name) {
        if (g.state === bn) return br(s);
        g.state === kr ? (g.state = xn, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete i[h]) : +h < e && (g.state = xn, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete i[h]);
      }
    if (br(function() {
      n.state === bn && (n.state = kr, n.timer.restart(o, n.delay, n.time), o(f));
    }), n.state = xi, n.on.call("start", t, t.__data__, n.index, n.group), n.state === xi) {
      for (n.state = bn, r = new Array(p = n.tween.length), h = 0, m = -1; h < p; ++h)
        (g = n.tween[h].value.call(t, t.__data__, n.index, n.group)) && (r[++m] = g);
      r.length = m + 1;
    }
  }
  function o(f) {
    for (var h = f < n.duration ? n.ease.call(null, f / n.duration) : (n.timer.restart(c), n.state = ki, 1), m = -1, p = r.length; ++m < p; )
      r[m].call(t, h);
    n.state === ki && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = xn, n.timer.stop(), delete i[e];
    for (var f in i) return;
    delete t.__transition;
  }
}
function Uc(t, e) {
  var n = t.__transition, i, r, a = !0, s;
  if (n) {
    e = e == null ? null : e + "";
    for (s in n) {
      if ((i = n[s]).name !== e) {
        a = !1;
        continue;
      }
      r = i.state > xi && i.state < ki, i.state = xn, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete n[s];
    }
    a && delete t.__transition;
  }
}
function Gc(t) {
  return this.each(function() {
    Uc(this, t);
  });
}
function Zc(t, e) {
  var n, i;
  return function() {
    var r = ae(this, t), a = r.tween;
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
function qc(t, e, n) {
  var i, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = ae(this, t), s = a.tween;
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
function Wc(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = ee(this.node(), n).tween, r = 0, a = i.length, s; r < a; ++r)
      if ((s = i[r]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Zc : qc)(n, t, e));
}
function Zi(t, e, n) {
  var i = t._id;
  return t.each(function() {
    var r = ae(this, i);
    (r.value || (r.value = {}))[e] = n.apply(this, arguments);
  }), function(r) {
    return ee(r, i).value[e];
  };
}
function ss(t, e) {
  var n;
  return (typeof e == "number" ? jt : e instanceof xe ? Nn : (n = xe(e)) ? (e = n, Nn) : ja)(t, e);
}
function Yc(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Xc(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Kc(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = this.getAttribute(t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function Jc(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function Qc(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), c = o + "", s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o)));
  };
}
function jc(t, e, n) {
  var i, r, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), c = o + "", s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o)));
  };
}
function tf(t, e) {
  var n = Bn(t), i = n === "transform" ? Lc : ss;
  return this.attrTween(t, typeof e == "function" ? (n.local ? jc : Qc)(n, i, Zi(this, "attr." + t, e)) : e == null ? (n.local ? Xc : Yc)(n) : (n.local ? Jc : Kc)(n, i, e));
}
function ef(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function nf(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function rf(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && nf(t, a)), n;
  }
  return r._value = e, r;
}
function af(t, e) {
  var n, i;
  function r() {
    var a = e.apply(this, arguments);
    return a !== i && (n = (i = a) && ef(t, a)), n;
  }
  return r._value = e, r;
}
function sf(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var i = Bn(t);
  return this.tween(n, (i.local ? rf : af)(i, e));
}
function of(t, e) {
  return function() {
    Gi(this, t).delay = +e.apply(this, arguments);
  };
}
function lf(t, e) {
  return e = +e, function() {
    Gi(this, t).delay = e;
  };
}
function cf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? of : lf)(e, t)) : ee(this.node(), e).delay;
}
function ff(t, e) {
  return function() {
    ae(this, t).duration = +e.apply(this, arguments);
  };
}
function hf(t, e) {
  return e = +e, function() {
    ae(this, t).duration = e;
  };
}
function uf(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ff : hf)(e, t)) : ee(this.node(), e).duration;
}
function df(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ae(this, t).ease = e;
  };
}
function pf(t) {
  var e = this._id;
  return arguments.length ? this.each(df(e, t)) : ee(this.node(), e).ease;
}
function gf(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ae(this, t).ease = n;
  };
}
function _f(t) {
  if (typeof t != "function") throw new Error();
  return this.each(gf(this._id, t));
}
function mf(t) {
  typeof t != "function" && (t = Va(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new fe(i, this._parents, this._name, this._id);
}
function wf(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], h = c.length, m = s[o] = new Array(h), p, g = 0; g < h; ++g)
      (p = c[g] || f[g]) && (m[g] = p);
  for (; o < i; ++o)
    s[o] = e[o];
  return new fe(s, this._parents, this._name, this._id);
}
function vf(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function yf(t, e, n) {
  var i, r, a = vf(e) ? Gi : ae;
  return function() {
    var s = a(this, t), o = s.on;
    o !== i && (r = (i = o).copy()).on(e, n), s.on = r;
  };
}
function bf(t, e) {
  var n = this._id;
  return arguments.length < 2 ? ee(this.node(), n).on.on(t) : this.each(yf(n, t, e));
}
function xf(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function kf() {
  return this.on("end.remove", xf(this._id));
}
function Ef(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Fi(t));
  for (var i = this._groups, r = i.length, a = new Array(r), s = 0; s < r; ++s)
    for (var o = i[s], c = o.length, f = a[s] = new Array(c), h, m, p = 0; p < c; ++p)
      (h = o[p]) && (m = t.call(h, h.__data__, p, o)) && ("__data__" in h && (m.__data__ = h.__data__), f[p] = m, Vn(f[p], e, n, p, f, ee(h, n)));
  return new fe(a, this._parents, e, n);
}
function Tf(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ha(t));
  for (var i = this._groups, r = i.length, a = [], s = [], o = 0; o < r; ++o)
    for (var c = i[o], f = c.length, h, m = 0; m < f; ++m)
      if (h = c[m]) {
        for (var p = t.call(h, h.__data__, m, c), g, E = ee(h, n), L = 0, R = p.length; L < R; ++L)
          (g = p[L]) && Vn(g, e, n, L, p, E);
        a.push(p), s.push(h);
      }
  return new fe(a, s, e, n);
}
var Sf = Se.prototype.constructor;
function Af() {
  return new Sf(this._groups, this._parents);
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
function $f(t, e, n) {
  var i, r = n + "", a;
  return function() {
    var s = Le(this, t);
    return s === r ? null : s === i ? a : a = e(i = s, n);
  };
}
function If(t, e, n) {
  var i, r, a;
  return function() {
    var s = Le(this, t), o = n(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(t), Le(this, t))), s === c ? null : s === i && c === r ? a : (r = c, a = e(i = s, o));
  };
}
function Rf(t, e) {
  var n, i, r, a = "style." + e, s = "end." + a, o;
  return function() {
    var c = ae(this, t), f = c.on, h = c.value[a] == null ? o || (o = os(e)) : void 0;
    (f !== n || r !== h) && (i = (n = f).copy()).on(s, r = h), c.on = i;
  };
}
function Df(t, e, n) {
  var i = (t += "") == "transform" ? Oc : ss;
  return e == null ? this.styleTween(t, Nf(t, i)).on("end.style." + t, os(t)) : typeof e == "function" ? this.styleTween(t, If(t, i, Zi(this, "style." + t, e))).each(Rf(this._id, t)) : this.styleTween(t, $f(t, i, e), n).on("end.style." + t, null);
}
function Mf(t, e, n) {
  return function(i) {
    this.style.setProperty(t, e.call(this, i), n);
  };
}
function Of(t, e, n) {
  var i, r;
  function a() {
    var s = e.apply(this, arguments);
    return s !== r && (i = (r = s) && Mf(t, s, n)), i;
  }
  return a._value = e, a;
}
function Lf(t, e, n) {
  var i = "style." + (t += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (e == null) return this.tween(i, null);
  if (typeof e != "function") throw new Error();
  return this.tween(i, Of(t, e, n ?? ""));
}
function Cf(t) {
  return function() {
    this.textContent = t;
  };
}
function Ff(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function zf(t) {
  return this.tween("text", typeof t == "function" ? Ff(Zi(this, "text", t)) : Cf(t == null ? "" : t + ""));
}
function Bf(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Hf(t) {
  var e, n;
  function i() {
    var r = t.apply(this, arguments);
    return r !== n && (e = (n = r) && Bf(r)), e;
  }
  return i._value = t, i;
}
function Vf(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Hf(t));
}
function Pf() {
  for (var t = this._name, e = this._id, n = ls(), i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, c, f = 0; f < o; ++f)
      if (c = s[f]) {
        var h = ee(c, e);
        Vn(c, t, n, f, s, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new fe(i, this._parents, t, n);
}
function Uf() {
  var t, e, n = this, i = n._id, r = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, c = { value: function() {
      --r === 0 && a();
    } };
    n.each(function() {
      var f = ae(this, i), h = f.on;
      h !== t && (e = (t = h).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), f.on = e;
    }), r === 0 && a();
  });
}
var Gf = 0;
function fe(t, e, n, i) {
  this._groups = t, this._parents = e, this._name = n, this._id = i;
}
function ls() {
  return ++Gf;
}
var oe = Se.prototype;
fe.prototype = {
  constructor: fe,
  select: Ef,
  selectAll: Tf,
  selectChild: oe.selectChild,
  selectChildren: oe.selectChildren,
  filter: mf,
  merge: wf,
  selection: Af,
  transition: Pf,
  call: oe.call,
  nodes: oe.nodes,
  node: oe.node,
  size: oe.size,
  empty: oe.empty,
  each: oe.each,
  on: bf,
  attr: tf,
  attrTween: sf,
  style: Df,
  styleTween: Lf,
  text: zf,
  textTween: Vf,
  remove: kf,
  tween: Wc,
  delay: cf,
  duration: uf,
  ease: pf,
  easeVarying: _f,
  end: Uf,
  [Symbol.iterator]: oe[Symbol.iterator]
};
function Zf(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var qf = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Zf
};
function Wf(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Yf(t) {
  var e, n;
  t instanceof fe ? (e = t._id, t = t._name) : (e = ls(), (n = qf).time = Ui(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, a = 0; a < r; ++a)
    for (var s = i[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && Vn(c, t, e, f, s, n || Wf(c, e));
  return new fe(i, this._parents, t, e);
}
Se.prototype.interrupt = Gc;
Se.prototype.transition = Yf;
const Ei = Math.PI, Ti = 2 * Ei, me = 1e-6, Xf = Ti - me;
function cs(t) {
  this._ += t[0];
  for (let e = 1, n = t.length; e < n; ++e)
    this._ += arguments[e] + t[e];
}
function Kf(t) {
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
class Jf {
  constructor(e) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = e == null ? cs : Kf(e);
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
    let s = this._x1, o = this._y1, c = i - e, f = r - n, h = s - e, m = o - n, p = h * h + m * m;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = n}`;
    else if (p > me) if (!(Math.abs(m * c - f * h) > me) || !a)
      this._append`L${this._x1 = e},${this._y1 = n}`;
    else {
      let g = i - s, E = r - o, L = c * c + f * f, R = g * g + E * E, S = Math.sqrt(L), v = Math.sqrt(p), k = a * Math.tan((Ei - Math.acos((L + p - R) / (2 * S * v))) / 2), x = k / v, A = k / S;
      Math.abs(x - 1) > me && this._append`L${e + x * h},${n + x * m}`, this._append`A${a},${a},0,0,${+(m * g > h * E)},${this._x1 = e + A * c},${this._y1 = n + A * f}`;
    }
  }
  arc(e, n, i, r, a, s) {
    if (e = +e, n = +n, i = +i, s = !!s, i < 0) throw new Error(`negative radius: ${i}`);
    let o = i * Math.cos(r), c = i * Math.sin(r), f = e + o, h = n + c, m = 1 ^ s, p = s ? r - a : a - r;
    this._x1 === null ? this._append`M${f},${h}` : (Math.abs(this._x1 - f) > me || Math.abs(this._y1 - h) > me) && this._append`L${f},${h}`, i && (p < 0 && (p = p % Ti + Ti), p > Xf ? this._append`A${i},${i},0,1,${m},${e - o},${n - c}A${i},${i},0,1,${m},${this._x1 = f},${this._y1 = h}` : p > me && this._append`A${i},${i},0,${+(p >= Ei)},${m},${this._x1 = e + i * Math.cos(a)},${this._y1 = n + i * Math.sin(a)}`);
  }
  rect(e, n, i, r) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +n}h${i = +i}v${+r}h${-i}Z`;
  }
  toString() {
    return this._;
  }
}
function Qf(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Dn(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, i = t.slice(0, n);
  return [
    i.length > 1 ? i[0] + i.slice(2) : i,
    +t.slice(n + 1)
  ];
}
function Fe(t) {
  return t = Dn(Math.abs(t)), t ? t[1] : NaN;
}
function jf(t, e) {
  return function(n, i) {
    for (var r = n.length, a = [], s = 0, o = t[0], c = 0; r > 0 && o > 0 && (c + o + 1 > i && (o = Math.max(1, i - c)), a.push(n.substring(r -= o, r + o)), !((c += o + 1) > i)); )
      o = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function th(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var eh = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Mn(t) {
  if (!(e = eh.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new qi({
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
Mn.prototype = qi.prototype;
function qi(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
qi.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function nh(t) {
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
function ih(t, e) {
  var n = Dn(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1], a = r - (fs = Math.max(-8, Math.min(8, Math.floor(r / 3))) * 3) + 1, s = i.length;
  return a === s ? i : a > s ? i + new Array(a - s + 1).join("0") : a > 0 ? i.slice(0, a) + "." + i.slice(a) : "0." + new Array(1 - a).join("0") + Dn(t, Math.max(0, e + a - 1))[0];
}
function Er(t, e) {
  var n = Dn(t, e);
  if (!n) return t + "";
  var i = n[0], r = n[1];
  return r < 0 ? "0." + new Array(-r).join("0") + i : i.length > r + 1 ? i.slice(0, r + 1) + "." + i.slice(r + 1) : i + new Array(r - i.length + 2).join("0");
}
const Tr = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: Qf,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Er(t * 100, e),
  r: Er,
  s: ih,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Sr(t) {
  return t;
}
var Ar = Array.prototype.map, Nr = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function rh(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Sr : jf(Ar.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", i = t.currency === void 0 ? "" : t.currency[1] + "", r = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Sr : th(Ar.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function f(m) {
    m = Mn(m);
    var p = m.fill, g = m.align, E = m.sign, L = m.symbol, R = m.zero, S = m.width, v = m.comma, k = m.precision, x = m.trim, A = m.type;
    A === "n" ? (v = !0, A = "g") : Tr[A] || (k === void 0 && (k = 12), x = !0, A = "g"), (R || p === "0" && g === "=") && (R = !0, p = "0", g = "=");
    var I = L === "$" ? n : L === "#" && /[boxX]/.test(A) ? "0" + A.toLowerCase() : "", T = L === "$" ? i : /[%p]/.test(A) ? s : "", z = Tr[A], F = /[defgprs%]/.test(A);
    k = k === void 0 ? 6 : /[gprs]/.test(A) ? Math.max(1, Math.min(21, k)) : Math.max(0, Math.min(20, k));
    function C(b) {
      var G = I, P = T, Q, rt, ht;
      if (A === "c")
        P = z(b) + P, b = "";
      else {
        b = +b;
        var Y = b < 0 || 1 / b < 0;
        if (b = isNaN(b) ? c : z(Math.abs(b), k), x && (b = nh(b)), Y && +b == 0 && E !== "+" && (Y = !1), G = (Y ? E === "(" ? E : o : E === "-" || E === "(" ? "" : E) + G, P = (A === "s" ? Nr[8 + fs / 3] : "") + P + (Y && E === "(" ? ")" : ""), F) {
          for (Q = -1, rt = b.length; ++Q < rt; )
            if (ht = b.charCodeAt(Q), 48 > ht || ht > 57) {
              P = (ht === 46 ? r + b.slice(Q + 1) : b.slice(Q)) + P, b = b.slice(0, Q);
              break;
            }
        }
      }
      v && !R && (b = e(b, 1 / 0));
      var nt = G.length + b.length + P.length, U = nt < S ? new Array(S - nt + 1).join(p) : "";
      switch (v && R && (b = e(U + b, U.length ? S - P.length : 1 / 0), U = ""), g) {
        case "<":
          b = G + b + P + U;
          break;
        case "=":
          b = G + U + b + P;
          break;
        case "^":
          b = U.slice(0, nt = U.length >> 1) + G + b + P + U.slice(nt);
          break;
        default:
          b = U + G + b + P;
          break;
      }
      return a(b);
    }
    return C.toString = function() {
      return m + "";
    }, C;
  }
  function h(m, p) {
    var g = f((m = Mn(m), m.type = "f", m)), E = Math.max(-8, Math.min(8, Math.floor(Fe(p) / 3))) * 3, L = Math.pow(10, -E), R = Nr[8 + E / 3];
    return function(S) {
      return g(L * S) + R;
    };
  }
  return {
    format: f,
    formatPrefix: h
  };
}
var cn, hs, us;
ah({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function ah(t) {
  return cn = rh(t), hs = cn.format, us = cn.formatPrefix, cn;
}
function sh(t) {
  return Math.max(0, -Fe(Math.abs(t)));
}
function oh(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Fe(e) / 3))) * 3 - Fe(Math.abs(t)));
}
function lh(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Fe(e) - Fe(t)) + 1;
}
function ch(t, e) {
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
function fh(t) {
  return function() {
    return t;
  };
}
function hh(t) {
  return +t;
}
var $r = [0, 1];
function De(t) {
  return t;
}
function Si(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : fh(isNaN(e) ? NaN : 0.5);
}
function uh(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(i) {
    return Math.max(t, Math.min(e, i));
  };
}
function dh(t, e, n) {
  var i = t[0], r = t[1], a = e[0], s = e[1];
  return r < i ? (i = Si(r, i), a = n(s, a)) : (i = Si(i, r), a = n(a, s)), function(o) {
    return a(i(o));
  };
}
function ph(t, e, n) {
  var i = Math.min(t.length, e.length) - 1, r = new Array(i), a = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    r[s] = Si(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(o) {
    var c = _o(t, o, 1, i) - 1;
    return a[c](r[c](o));
  };
}
function gh(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function _h() {
  var t = $r, e = $r, n = Pi, i, r, a, s = De, o, c, f;
  function h() {
    var p = Math.min(t.length, e.length);
    return s !== De && (s = uh(t[0], t[p - 1])), o = p > 2 ? ph : dh, c = f = null, m;
  }
  function m(p) {
    return p == null || isNaN(p = +p) ? a : (c || (c = o(t.map(i), e, n)))(i(s(p)));
  }
  return m.invert = function(p) {
    return s(r((f || (f = o(e, t.map(i), jt)))(p)));
  }, m.domain = function(p) {
    return arguments.length ? (t = Array.from(p, hh), h()) : t.slice();
  }, m.range = function(p) {
    return arguments.length ? (e = Array.from(p), h()) : e.slice();
  }, m.rangeRound = function(p) {
    return e = Array.from(p), n = Rc, h();
  }, m.clamp = function(p) {
    return arguments.length ? (s = p ? !0 : De, h()) : s !== De;
  }, m.interpolate = function(p) {
    return arguments.length ? (n = p, h()) : n;
  }, m.unknown = function(p) {
    return arguments.length ? (a = p, m) : a;
  }, function(p, g) {
    return i = p, r = g, h();
  };
}
function mh() {
  return _h()(De, De);
}
function wh(t, e, n, i) {
  var r = bo(t, e, n), a;
  switch (i = Mn(i ?? ",f"), i.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return i.precision == null && !isNaN(a = oh(r, s)) && (i.precision = a), us(i, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      i.precision == null && !isNaN(a = lh(r, Math.max(Math.abs(t), Math.abs(e)))) && (i.precision = a - (i.type === "e"));
      break;
    }
    case "f":
    case "%": {
      i.precision == null && !isNaN(a = sh(r)) && (i.precision = a - (i.type === "%") * 2);
      break;
    }
  }
  return hs(i);
}
function vh(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var i = e();
    return yo(i[0], i[i.length - 1], n ?? 10);
  }, t.tickFormat = function(n, i) {
    var r = e();
    return wh(r[0], r[r.length - 1], n ?? 10, i);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var i = e(), r = 0, a = i.length - 1, s = i[r], o = i[a], c, f, h = 10;
    for (o < s && (f = s, s = o, o = f, f = r, r = a, a = f); h-- > 0; ) {
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
function ue() {
  var t = mh();
  return t.copy = function() {
    return gh(t, ue());
  }, ch.apply(t, arguments), vh(t);
}
function fn(t) {
  return function() {
    return t;
  };
}
const Wi = Math.sqrt, ds = Math.PI, yh = 2 * ds;
function bh(t) {
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
  }, () => new Jf(e);
}
const xh = {
  draw(t, e) {
    const n = Wi(e / ds);
    t.moveTo(n, 0), t.arc(0, 0, n, 0, yh);
  }
}, Yn = Wi(3), ps = {
  draw(t, e) {
    const n = -Wi(e / (Yn * 3));
    t.moveTo(0, n * 2), t.lineTo(-Yn * n, -n), t.lineTo(Yn * n, -n), t.closePath();
  }
};
function gs(t, e) {
  let n = null, i = bh(r);
  t = typeof t == "function" ? t : fn(t || xh), e = typeof e == "function" ? e : fn(e === void 0 ? 64 : +e);
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
function Ze(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
Ze.prototype = {
  constructor: Ze,
  scale: function(t) {
    return t === 1 ? this : new Ze(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Ze(this.k, this.x + this.k * t, this.y + this.k * e);
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
Ze.prototype;
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
function _s(t, e) {
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
  const n = t.attr("class").split(" "), i = `.${n[0]}.${n[1]} .track`, r = Qt(i).nodes();
  let a = 0;
  return r.forEach((s) => {
    a += s.getBoundingClientRect().height + 1;
  }), a;
}
function Xi(t, e) {
  var r;
  console.log("🎨 setHighlights called:", {
    selectedAlleles: t,
    svgTargetNode: e.node(),
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  const n = ((r = e.node()) == null ? void 0 : r.getBBox().height) ?? 0;
  e.selectAll(
    ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
  ).filter((a) => {
    var o;
    console.log("🎨 Filtering variant:", {
      data: a,
      alleles: a.alleles,
      selectedAlleles: t
    });
    let s = !1;
    return (o = a.alleles) != null && o.length && (a.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((f) => {
      t.includes(f) && (s = !0);
    }), a.alleles.forEach((f) => {
      t.includes(f) && (s = !0);
    })), console.log("🎨 Filter result:", {
      returnVal: s,
      alleles: a.alleles
    }), s;
  }).datum((a) => (a.selected = "true", a)).style("stroke", "black").each(function() {
    let a = Tt(this).attr("x"), s = +Tt(this).attr("width");
    (s === 0 || Number.isNaN(s)) && (s = 3, a = String(+a - s / 2)), e.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", a).attr("width", s).attr("height", n).attr("fill", "yellow").attr("opacity", 0.8).lower();
  });
}
const kh = [
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
], Eh = [
  "point_mutation",
  "MNV",
  "Deletion",
  "Insertion",
  "Delins"
], qe = {
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
  if (t.split(" ").length > 1 || t.split("|").length > 1) {
    console.warn("🔍 Multiple consequences detected:", t);
    const n = t.includes("|") ? t.split("|")[0].trim() : t.split(" ")[0].trim();
    return console.warn("🔍 Using first consequence:", n), ms(n);
  }
  if (t === "UNKNOWN")
    return "gray";
  const e = qe[t];
  return e ? e.color : t === "5_prime_UTR_variant" ? qe.five_prime_UTR_variant.color : t === "3_prime_UTR_variant" ? qe.three_prime_UTR_variant.color : (console.warn("🔍 Consequence lookup failed:", {
    consequence: t,
    type: typeof t,
    length: t.length,
    availableKeys: Object.keys(qe).slice(0, 5)
  }), "#f0f");
}
const be = 10, he = 10;
function Ki(t) {
  return `${t},${be} ${t + he / 2},${be / 2} ${t},0 ${t - he / 2},${be / 2}`;
}
function ws(t) {
  return `${t - he / 2},${be} ${t},0 ${t + he / 2},${be}`;
}
function Ir(t, e, n) {
  if (t.length == 0)
    return 0;
  {
    let i = !0, r = 0;
    return t.sort((a, s) => a.row > s.row ? 1 : -1), t.every((a) => r != a.row && i ? !1 : (r != a.row && (r = a.row, i = !0), a.fmin > e && a.fmin > n || a.fmax < n && a.fmax < e || (i = !1), !0)), i ? r : r + 1;
  }
}
function vs(t) {
  return `${t - he / 2},${be} ${t + he / 2},${be} ${t - he / 2},0 ${t + he / 2},0`;
}
function Th(t) {
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
function Sh(t, e, n) {
  const { fmax: i, fmin: r, type: a } = e;
  return t.findIndex((s) => {
    const o = s.fmin + n, c = s.fmax - n;
    return a !== s.type ? !1 : o <= r && c >= r || c <= i && c >= i || o >= r && c <= i;
  });
}
function Ah(t) {
  const e = [];
  return t.forEach((n) => {
    const i = Ji(n), { type: r, fmax: a, fmin: s } = n, o = e.findIndex((c) => {
      const f = c.fmin, h = c.fmax;
      return c.type !== r || c.consequence !== i ? !1 : f <= s && h >= s || h <= a && h >= a || f >= s && h <= a;
    });
    if (o !== -1) {
      const c = e[o], f = e[o].variantSet ? e[o].variantSet.findIndex(
        (h) => h.type === r && h.consequence === i
      ) : -1;
      f >= 0 ? e[f].variantSet.push(n) : e[o].variantSet = [
        // @ts-expect-error
        {
          variants: [n],
          type: r,
          consequence: i
        }
      ], c.variants.push(n), c.fmin = Math.min(s, c.fmin), c.fmax = Math.max(a, c.fmax), e[o] = c;
    } else {
      const c = {
        fmin: s,
        fmax: a,
        type: r,
        consequence: i,
        variantSet: [
          // @ts-expect-error
          {
            variants: [n],
            type: r,
            consequence: i
          }
        ],
        variants: [n]
      };
      e.push(c);
    }
  }), e;
}
function ys(t, e) {
  const n = [];
  return t.forEach((i) => {
    const r = Ji(i), { type: a, fmax: s, fmin: o } = i, c = Sh(
      n,
      i,
      e
    );
    if (c >= 0 && a != "deletion") {
      const f = n[c], h = f.variantSet ? f.variantSet.findIndex(
        (m) => m.type === a && m.consequence === r
      ) : -1;
      if (h >= 0) {
        const m = Math.min(
          f.variantSet[h].fmin,
          o
        ), p = Math.max(
          f.variantSet[h].fmax,
          s
        );
        f.fmin = m, f.fmax = p, f.variantSet[h].fmin = m, f.variantSet[h].fmax = p, f.variantSet[h].variants.push(i);
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
      f.variants.push(i), f.fmin = Math.min(o, f.fmin), f.fmax = Math.max(s, f.fmax), n[c] = f;
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
function Ai(t) {
  if (t.length === 1) {
    let e = '<div style="margin-top: 30px;">';
    return e += Rr(t[0]), e += "</div>", e;
  } else if (t.length > 1) {
    let e = '<ul style="list-style-type: none; margin-top: 30px;">';
    for (const n of t)
      e += `<li style="border-bottom: solid 1px black;">${Rr(n)}</li>`;
    return e += "</ul>", e;
  } else
    return "No data available";
}
function Rr(t) {
  const { descriptionWidth: e } = Th(t);
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
    const h = `${o.length - 1}bp deleted`;
    let m;
    s === "ALT_MISSING" ? (m = "unknown length inserted", s = "n+") : m = `${s.length - 1}bp inserted`, c = `${h}; ${m}`;
  } else
    c = `${+a - +r}bp`;
  o = o.length > 20 ? `${o.slice(0, 1).toLowerCase() + o.slice(1, 8).toUpperCase()}...${o.slice(Math.max(0, o.length - 8)).toUpperCase()}` : o.slice(0, 1).toLowerCase() + o.slice(1).toUpperCase(), s = s.length > 20 ? `${s.slice(0, 1).toLowerCase() + s.slice(1, 8).toUpperCase()}...${s.slice(Math.max(0, s.length - 8)).toUpperCase()}` : s.slice(0, 1).toLowerCase() + s.slice(1).toUpperCase(), (t.type === "SNV" || t.type === "MNV") && (s = s.toUpperCase(), o = o.toUpperCase());
  let f = "";
  return t.type === "insertion" ? f = `ins: ${s}` : t.type === "deletion" ? f = `del: ${o}` : f = `${o}->${s}`, n += '<table class="tooltip-table"><tbody>', n += `<tr><th>Symbol</th><td>${t.symbolDetail}</td></tr>`, n += `<tr><th>Type</th><td>${t.type}</td></tr>`, n += `<tr><th>Consequence</th><td>${t.consequence}</td></tr>`, t.impact && (n += `<tr><th>Impact</th><td>${t.impact.length > e ? t.impact.slice(0, Math.max(0, e)) : t.impact}</td></tr>`), n += `<tr><th>Length</th><td>${c}</td></tr>`, t.name !== t.symbol && (n += `<tr><th>Name</th><td>${t.name}</td></tr>`), t.geneId && t.geneSymbol ? n += `<tr><th>Allele of Genes</th><td> ${t.geneSymbol.length > e ? t.geneSymbol.slice(0, Math.max(0, e)) : t.geneSymbol} (${t.geneId})</td></tr>` : t.allele_of_genes && (n += `<tr><th>Allele of Genes</th><td>${t.allele_of_genes.length > e ? t.allele_of_genes.slice(0, Math.max(0, e)) : t.allele_of_genes}</td></tr>`), t.alternative_alleles && (n += `<tr><th>Sequence Change</th><td>${f}</td></tr>`), n += "</tbody></table>", n;
}
function Ni(t) {
  return t.variants.map((e) => {
    const n = Nh(e);
    return {
      ...n,
      consequence: n.consequence || "UNKNOWN"
    };
  });
}
function $i(t) {
  var e, n, i;
  return t.variants.some((r) => JSON.stringify(r).includes("MGI:6730304")) && console.log("🔍 DEBUG getVariantAlleles - variant structure:", {
    variantBin: t,
    firstVariant: t.variants[0],
    allele_ids: (e = t.variants[0]) == null ? void 0 : e.allele_ids,
    values: (i = (n = t.variants[0]) == null ? void 0 : n.allele_ids) == null ? void 0 : i.values
  }), t.variants.flatMap((r) => {
    var o;
    const a = (o = r.allele_ids) == null ? void 0 : o.values[0];
    if (!a) return [];
    if (a.includes("MGI:6730304") && console.log("🔍 DEBUG getVariantAlleles - parsing:", {
      rawValue: a,
      typeOfRawValue: typeof a
    }), a.startsWith("[") && a.endsWith("]"))
      try {
        const c = JSON.parse(a);
        return a.includes("MGI:6730304") && console.log("🔍 DEBUG getVariantAlleles - parsed JSON:", c), c;
      } catch (c) {
        console.warn("Failed to parse allele_ids as JSON:", a, c);
      }
    const s = a.replace(/"/g, "");
    return s == null ? void 0 : s.split(",").map((c) => c.replace(/\[|\]| /g, ""));
  }).filter((r) => !!r);
}
function Ii(t) {
  return t.map((e) => ms(e.consequence));
}
function Ji(t) {
  var n;
  let e = "UNKNOWN";
  return (n = t.geneLevelConsequence) != null && n.values && t.geneLevelConsequence.values.length > 0 && (e = t.geneLevelConsequence.values[0].replace(/\|/g, " ").replace(/"/g, "")), e;
}
function hn(t) {
  return (Array.isArray(t == null ? void 0 : t.values) ? t.values.join(" ") : t == null ? void 0 : t.values) ?? "";
}
function Nh(t) {
  var e, n;
  return {
    symbol: Qe(t),
    symbolDetail: bs(t),
    location: `${t.seqId}:${t.fmin}..${t.fmax}`,
    consequence: Ji(t),
    type: t.type,
    name: t.name,
    description: t.description,
    reference_allele: t.reference_allele,
    geneId: (e = t.allele_of_gene_ids) == null ? void 0 : e.values[0].replace(/"/g, ""),
    geneSymbol: (n = t.allele_of_gene_symbols) == null ? void 0 : n.values[0].replace(/"/g, ""),
    allele_of_genes: hn(t.allele_of_genes),
    allele_ids: hn(t.allele_ids),
    alternative_alleles: hn(t.alternative_alleles),
    impact: hn(t.impact)
  };
}
function bs(t) {
  var e, n, i;
  if (t.variants)
    return t.variants.length !== 1 ? `${t.variants.length}` : bs(t.variants[0]);
  if ((e = t.allele_symbols) != null && e.values)
    if (t.allele_symbols.values[0].split(",").length > 1)
      try {
        const r = [], a = t.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          ""
        ), s = ((n = t.allele_ids) == null ? void 0 : n.values[0].replace(/"|\[|\]/g, "")) ?? "", o = a.split(","), c = s.split(",");
        for (let f = 0; f < c.length; f++)
          r.push(
            `${o[f].trim()} (${c[f].trim()})`
          );
        return r.join(", ");
      } catch (r) {
        return console.error(r), `${t.allele_symbols.values[0].split(",").length}`;
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
function $h(t) {
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
    qe[t].color,
    t.replace(/_/g, " ")
  );
}
function Ih() {
  let t = "<table><tbody>";
  return t += "<tr>", t += '<td align="center" valign="top"><u><b>Variant types</b></u></td>', t += '<td align="center" valign="top" colspan="2"><u><b>Molecular Consequences</b></u></td>', t += "</tr>", t += "<tr>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${Ki(0)}"></svg>point mutation</polygons></svg></li>`, t += `<li>${Ri("black", "deletion")}</li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${ws(0)}"></svg>insertion</polygons></svg></li>`, t += `<li><svg width="15" top="3" viewBox="-7 -2 15 15" style="display: inline;" xmlns="http://www.w3.org/2000/svg"><polygon stroke="black" fill="black" points="${vs(0)}"></svg>delins/MNV </polygons></svg></li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("transcript_ablation")}</li>`, t += `<li>${Lt("splice_acceptor_variant")}</li>`, t += `<li>${Lt("splice_donor_variant")}</li>`, t += `<li>${Lt("stop_gained")}</li>`, t += `<li>${Lt("frameshift_variant")}</li>`, t += `<li>${Lt("stop_lost")}</li>`, t += `<li>${Lt("start_lost")}</li>`, t += `<li>${Lt("inframe_insertion")}</li>`, t += `<li>${Lt("inframe_deletion")}</li>`, t += `<li>${Lt("missense_variant")}</li>`, t += "</ul></td>", t += '<td valign="top" ><ul style="list-style-type:none;">', t += `<li>${Lt("protein_altering_variant")}</li>`, t += `<li>${Lt("splice_region_variant")}</li>`, t += `<li>${Lt("start_retained_variant")}</li>`, t += `<li>${Lt("stop_retained_variant")}</li>`, t += `<li>${Lt("synonymous_variant")}</li>`, t += `<li>${Lt("coding_sequence_variant")}</li>`, t += `<li>${Lt("five_prime_UTR_variant")}</li>`, t += `<li>${Lt("three_prime_UTR_variant")}</li>`, t += `<li>${Lt("intron_variant")}</li>`, t += `<li>${Lt("non_coding_transcript_variant")}</li>`, t += `<li>${Lt("unknown")}</li>`, t += "</ul></td>", t += "</tr>", t += "<tr>", t += "<td></td>", t += '<td colspan="2"><a href="https://uswest.ensembl.org/info/genome/variation/prediction/predicted_data.html">Source: Ensembl</a></td>', t += "</tr>", t += "</tbody></table>", t;
}
function Rh(t) {
  return t === 1 ? "+" : t === -1 ? "-" : t;
}
function Ft(t) {
  let e = "";
  return e += '<table class="tooltip-table" style="margin-top: 30px;"><tbody>', e += t.id.includes("http") ? `<tr><th>Name</th><td>${t.name}</td></tr>` : `<tr><th>Name</th><td>${t.name} (${t.id})</td></tr>`, e += `<tr><th>Type</th><td>${t.type}</td></tr>`, e += `<tr><th>Source</th><td>${t.source}</td></tr>`, e += `<tr><th>Location</th><td>${t.seqId}:${t.fmin}..${t.fmax} (${Rh(t.strand)})</td></tr>`, e += "</tbody></table>", e;
}
function xs(t, e, n, i) {
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
class Dh {
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
    initialHighlight: h,
    trackData: m,
    variantData: p
  }) {
    this.trackData = m ?? [], this.variantData = p ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.isoformFilter = f, this.initialHighlight = h, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.binRatio = c, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    const e = this.isoformFilter;
    let n = this.trackData;
    const i = this.initialHighlight, r = this.filterVariantData(
      this.variantData,
      this.variantFilter
    ), a = this.viewer, s = this.width, o = this.binRatio, c = $h(r), f = c.length, h = this.trackData[0].source, m = this.trackData[0].seqId, p = e.length === 0 ? 9 : 30, g = ["UTR", "five_prime_UTR", "three_prime_UTR"], E = ["CDS"], L = ["exon"], R = this.transcriptTypes, S = _s(n, R), v = S.fmin, k = S.fmax, x = 10, A = 10, I = 40, T = 20, z = 2, F = 0, C = 10, b = 10, G = 4, P = 20, Q = 10, rt = `0,0 0,${P} ${Q},${Q}`, ht = 10, Y = 40, nt = 22.5, U = ue().domain([v, k]).range([0, s]), st = a.append("g").attr("class", "deletions track").attr("transform", "translate(0,22.5)"), It = a.append("g").attr("class", "label"), j = {};
    for (let it = 0, dt = g.length; it < dt; it++)
      j[g[it]] = 200;
    for (let it = 0, dt = E.length; it < dt; it++)
      j[E[it]] = 1e3;
    for (let it = 0, dt = L.length; it < dt; it++)
      j[L[it]] = 100;
    const mt = {};
    n = n.sort((it, dt) => it.selected && !dt.selected ? -1 : !it.selected && dt.selected ? 1 : it.name.localeCompare(dt.name));
    let kt = 0;
    const gt = Tt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), et = () => {
      gt.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    }, ft = ys(
      r,
      (k - v) * o
    ), ut = ft.filter((it) => it.type === "deletion"), xt = ft.filter((it) => it.type !== "deletion"), At = [];
    ut.forEach((it) => {
      var B;
      const { fmax: dt, fmin: vt } = it, Z = this.width, Dt = Qe(it), tt = Ni(it), yt = $i(it), Et = Ai(tt), Ot = Ii(tt)[0];
      At.push({
        fmin: vt,
        fmax: dt,
        row: Ir(At, vt, dt)
      });
      const _ = Math.max(Math.ceil(U(dt) - U(vt)), z);
      st.append("rect").attr("class", "variant-deletion").attr("id", `variant-${vt}`).attr("x", U(vt)).attr(
        "transform",
        `translate(0,${b * Ir(At, vt, dt)})`
      ).attr("z-index", 30).attr("fill", Ot).attr("height", b).attr("width", _).on("click", () => {
        X(gt, Et, et);
      }).on("mouseover", (V) => {
        const H = V.variant;
        Qt(
          ".variant-deletion"
        ).filter((w) => w.variant === H).style("stroke", "black"), Tt(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((w) => w.variant === H).style("opacity", 1);
      }).on("mouseout", () => {
        Qt(".variant-deletion").filter((V) => V.selected !== "true").style("stroke", null), Tt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: vt,
        fmax: dt,
        variant: Dt + vt,
        alleles: yt
      });
      {
        let V = 0;
        V = U(vt);
        const H = b * f + nt, w = It.append("text").attr("class", "variantLabel").attr("fill", Ot).attr("opacity", 0).attr("height", F).attr("transform", `translate(${V},${H})`).text(Dt).on("click", () => {
          X(gt, Et, et);
        }).datum({ fmin: vt, variant: Dt + vt }), $ = ((B = w.node()) == null ? void 0 : B.getBBox().width) ?? 0;
        if ($ + V > Z) {
          const u = $ + V - Z;
          V -= u, w.attr(
            "transform",
            `translate(${V},${H})`
          );
        }
      }
    });
    const St = ze(this.viewer), lt = a.append("g").attr("class", "variants track").attr("transform", `translate(0,${St})`);
    xt.forEach((it) => {
      var H;
      const { type: dt, fmax: vt, fmin: Z } = it;
      let Dt = !0, tt = !1;
      const yt = this.width, Et = Qe(it), Ot = Ni(it), _ = $i(it), B = Ai(Ot), V = Ii(Ot)[0];
      if (dt.toLowerCase() === "snv" || dt.toLowerCase() === "point_mutation" ? (tt = !0, lt.append("polygon").attr("class", "variant-SNV").attr("id", `variant-${Z}`).attr("points", Ki(U(Z))).attr("fill", V).attr("x", U(Z)).attr(
        "transform",
        `translate(0,${b * c.indexOf("snv")})`
      ).attr("z-index", 30).on("click", () => {
        X(gt, B, et);
      }).on("mouseover", function(w) {
        const $ = w.variant;
        Qt(
          ".variant-SNV"
        ).filter((u) => u.variant === $).style("stroke", "black"), Tt(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((u) => u.variant === $).style("opacity", 1);
      }).on("mouseout", () => {
        Qt(".variant-SNV").filter((w) => w.selected != "true").style("stroke", null), Tt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: Z,
        fmax: vt,
        variant: Et + Z,
        alleles: _
      })) : dt.toLowerCase() === "insertion" ? (tt = !0, lt.append("polygon").attr("class", "variant-insertion").attr("id", `variant-${Z}`).attr("points", ws(U(Z))).attr("fill", V).attr("x", U(Z)).attr(
        "transform",
        `translate(0,${b * c.indexOf("insertion")})`
      ).attr("z-index", 30).on("click", () => {
        X(gt, B, et);
      }).on("mouseover", (w) => {
        const $ = w.variant;
        Qt(
          ".variant-insertion"
        ).filter((u) => u.variant === $).style("stroke", "black"), Tt(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((u) => u.variant === $).style("opacity", 1);
      }).on("mouseout", () => {
        Qt(
          ".variant-insertion"
        ).filter((w) => w.selected != "true").style("stroke", null), Tt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: Z,
        fmax: vt,
        variant: Et + Z,
        alleles: _
      })) : dt.toLowerCase() === "delins" || dt.toLowerCase() === "substitution" || dt.toLowerCase() === "indel" || dt.toLowerCase() === "mnv" ? (tt = !0, lt.append("polygon").attr("class", "variant-delins").attr("id", `variant-${Z}`).attr("points", vs(U(Z))).attr("x", U(Z)).attr(
        "transform",
        `translate(0,${b * c.indexOf("delins")})`
      ).attr("fill", V).attr("z-index", 30).on("click", () => {
        X(gt, B, et);
      }).on("mouseover", (w) => {
        const $ = w.variant;
        Qt(
          ".variant-delins"
        ).filter((u) => u.variant === $).style("stroke", "black"), Tt(".label").selectAll(
          ".variantLabel,.variantLabelBackground"
        ).raise().filter((u) => u.variant === $).style("opacity", 1);
      }).on("mouseout", () => {
        Qt(".variant-delins").filter((w) => w.selected != "true").style("stroke", null), Tt(".label").selectAll(".variantLabel,.variantLabelBackground").style("opacity", 0);
      }).datum({
        fmin: Z,
        fmax: vt,
        variant: Et + Z,
        alleles: _
      })) : (console.warn("type not found", dt, it), Dt = !1), Dt) {
        let w = 0;
        w = tt ? U(Z) - ht / 2 : U(Z);
        const $ = b * f + nt, u = It.append("text").attr("class", "variantLabel").attr("fill", V).attr("opacity", 0).attr("height", F).attr("transform", `translate(${w},${$})`).text(Et).on("click", () => {
          X(gt, B, et);
        }).datum({ fmin: Z, variant: Et + Z }), M = ((H = u.node()) == null ? void 0 : H.getBBox().width) ?? 0;
        if (M + w > yt) {
          const K = M + w - yt;
          w -= K, u.attr("transform", `translate(${w},35)`);
        }
      }
    });
    const $t = St;
    It.attr("transform", `translate(0,${$t})`);
    const Bt = ze(this.viewer) + nt, Rt = a.append("g").attr("transform", `translate(0,${Bt})`).attr("class", "track");
    let ct = 0;
    const _t = [];
    let at = -1, bt = -1;
    const X = this.renderTooltipDescription, pt = [];
    for (let it = 0; it < n.length && ct < p; it++) {
      const dt = n[it];
      let vt = dt.children;
      if (vt) {
        const Z = dt.selected;
        vt = vt.sort(
          (tt, yt) => tt.name.localeCompare(yt.name)
        );
        let Dt = !1;
        vt.forEach((tt) => {
          var Et;
          if (!(e.includes(tt.id) || e.includes(tt.name)) && e.length !== 0 || pt.includes(tt.id))
            return;
          pt.push(tt.id);
          const yt = tt.type;
          if (R.includes(yt)) {
            let Ot = Yi(
              _t,
              U(tt.fmin),
              U(tt.fmax)
            );
            if (ct < p) {
              let _ = "", B, V = !1;
              const H = dt.name;
              Object.keys(mt).includes(H) || (kt += T, V = !0, mt[H] = "Green");
              const w = Rt.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ct * I + 10 + kt})`
              );
              V && (_ = H, B = w.append("text").attr("class", "geneLabel").attr("fill", Z ? "sandybrown" : "black").attr("height", F).attr(
                "transform",
                `translate(${U(tt.fmin)},-${T})`
              ).text(_).on("click", () => {
                X(
                  gt,
                  Ft(dt),
                  et
                );
              }).datum({
                fmin: tt.fmin
              })), w.append("polygon").datum(() => ({
                fmin: tt.fmin,
                fmax: tt.fmax,
                strand: dt.strand
              })).attr("class", "transArrow").attr("points", rt).attr(
                "transform",
                (M) => dt.strand > 0 ? `translate(${Number(U(M.fmax))},0)` : `translate(${Number(U(M.fmin))},${P}) rotate(180)`
              ).on("click", () => {
                X(
                  gt,
                  Ft(tt),
                  et
                );
              }), w.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + F).attr("height", G).attr("transform", `translate(${U(tt.fmin)},0)`).attr("width", U(tt.fmax) - U(tt.fmin)).on("click", () => {
                X(
                  gt,
                  Ft(tt),
                  et
                );
              }).datum({
                fmin: tt.fmin,
                fmax: tt.fmax
              }), _ = tt.name, B = w.append("text").attr("class", "transcriptLabel").attr("fill", Z ? "sandybrown" : "gray").attr("opacity", Z ? 1 : 0.5).attr("height", F).attr("transform", `translate(${U(tt.fmin)},0)`).text(_).on("click", () => {
                X(
                  gt,
                  Ft(tt),
                  et
                );
              }).datum({
                fmin: tt.fmin
              });
              let $ = _.length * 2;
              try {
                $ = ((Et = B.node()) == null ? void 0 : Et.getBBox().width) ?? 0;
              } catch {
              }
              Number($ + U(tt.fmin)) > s;
              const u = $ > U(tt.fmax) - U(tt.fmin) ? U(tt.fmin) + $ : U(tt.fmax);
              if (_t[Ot]) {
                const M = _t[Ot];
                M.push(`${U(tt.fmin)}:${u}`), _t[Ot] = M;
              } else
                _t[Ot] = [
                  `${U(tt.fmin)}:${u}`
                ];
              (at < 0 || at > tt.fmin) && (at = tt.fmin), (bt < 0 || bt < tt.fmax) && (bt = tt.fmax), tt.children && (tt.children = tt.children.sort((M, K) => {
                const l = j[M.type], D = j[K.type];
                return typeof l == "number" && typeof D == "number" ? l - D : typeof l == "number" && typeof D != "number" ? -1 : typeof l != "number" && typeof D == "number" ? 1 : M.type.localeCompare(K.type);
              }), tt.children.forEach((M) => {
                const K = M.type;
                L.includes(K) ? w.append("rect").attr("class", "exon").attr("x", U(M.fmin)).attr(
                  "transform",
                  `translate(0,${x - G})`
                ).attr("height", x).attr("z-index", 10).attr("width", U(M.fmax) - U(M.fmin)).on("click", () => {
                  X(
                    gt,
                    Ft(tt),
                    et
                  );
                }).datum({ fmin: M.fmin, fmax: M.fmax }) : E.includes(K) ? w.append("rect").attr("class", "CDS").attr("x", U(M.fmin)).attr(
                  "transform",
                  `translate(0,${A - G})`
                ).attr("z-index", 20).attr("height", A).attr("width", U(M.fmax) - U(M.fmin)).on("click", () => {
                  X(
                    gt,
                    Ft(tt),
                    et
                  );
                }).datum({ fmin: M.fmin, fmax: M.fmax }) : g.includes(K) && w.append("rect").attr("class", "UTR").attr("x", U(M.fmin)).attr(
                  "transform",
                  `translate(0,${C - G})`
                ).attr("z-index", 20).attr("height", C).attr("width", U(M.fmax) - U(M.fmin)).on("click", () => {
                  X(
                    gt,
                    Ft(tt),
                    et
                  );
                }).datum({ fmin: M.fmin, fmax: M.fmax });
              })), ct += 1;
            }
            if (ct === p && !Dt) {
              const _ = xs(h, m, v, k);
              ++Ot, Dt = !0, Rt.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
                "transform",
                `translate(0,${ct * I + 20 + kt})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", F).html(_);
            }
          }
        });
      }
    }
    return i && Xi(i, a), ct === 0 && Rt.append("text").attr("x", 30).attr("y", F + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), ct * I + kt + Y;
  }
  filterVariantData(e, n) {
    return n.length === 0 ? e : e.filter((i) => {
      var a, s, o, c;
      let r = !1;
      try {
        (n.includes(i.name) || (a = i.allele_symbols) != null && a.values && n.includes(
          i.allele_symbols.values[0].replace(/"/g, "")
        ) || (s = i.symbol) != null && s.values && n.includes(i.symbol.values[0].replace(/"/g, "")) || (o = i.symbol_text) != null && o.values && n.includes(i.symbol_text.values[0].replace(/"/g, ""))) && (r = !0), (((c = i.allele_ids) == null ? void 0 : c.values[0].replace(/"|\[|\]| /g, "").split(",")) ?? []).forEach((h) => {
          n.includes(h) && (r = !0);
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
      return s.alleles && (s.alleles[0].replace(/"|\[|\]| /g, "").split(",").forEach((f) => {
        e.includes(f) && (o = !0);
      }), s.alleles.forEach((f) => {
        e.includes(f) && (o = !0);
      })), o;
    }).datum((s) => (s.selected = "true", s)).style("stroke", "black").each(function() {
      const s = +(Tt(this).attr("width") || 3), o = +Tt(this).attr("x") - s / 2;
      n.select(".deletions.track").append("rect").attr("class", "highlight").attr("x", o).attr("width", s).attr("height", i).attr("fill", "yellow").attr("opacity", 0.8).lower();
    });
  }
}
class Mh {
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
    variantData: h
  }) {
    console.log("🚀 IsoformEmbeddedVariantTrack constructor called with:", {
      dataLength: f == null ? void 0 : f.length,
      variantDataLength: h == null ? void 0 : h.length,
      width: i,
      height: n,
      initialHighlight: c,
      transcriptTypes: r,
      variantTypes: a,
      hasViewer: !!e,
      viewerNode: e == null ? void 0 : e.node()
    }), console.log("🔍🔍 CONSTRUCTOR - variantFilter details:", {
      variantFilter: o,
      variantFilterLength: o == null ? void 0 : o.length,
      variantFilterType: Array.isArray(o) ? "array" : typeof o,
      firstFiveFilters: o == null ? void 0 : o.slice(0, 5)
    }), console.log(
      "📊 CONSTRUCTOR - First 3 variant data with allele_ids:",
      h == null ? void 0 : h.slice(0, 3).map((m, p) => {
        var g, E, L;
        return {
          index: p,
          name: m.name,
          allele_ids_raw: m.allele_ids,
          allele_ids_values: (g = m.allele_ids) == null ? void 0 : g.values,
          allele_ids_first: (L = (E = m.allele_ids) == null ? void 0 : E.values) == null ? void 0 : L[0],
          type: m.type,
          start: m.start,
          end: m.end
        };
      })
    ), this.trackData = f ?? [], this.variantData = h ?? [], this.viewer = e, this.width = i, this.variantFilter = o, this.initialHighlight = c, this.height = n, this.transcriptTypes = r, this.variantTypes = a, this.showVariantLabel = s ?? !0;
  }
  DrawTrack() {
    var Bt, Rt, ct, _t, at, bt;
    console.log("🎨 DrawTrack called for IsoformEmbeddedVariantTrack", {
      hasInitialHighlight: !!this.initialHighlight,
      initialHighlight: this.initialHighlight,
      variantDataLength: (Bt = this.variantData) == null ? void 0 : Bt.length,
      trackDataLength: (Rt = this.trackData) == null ? void 0 : Rt.length
    });
    const e = this.variantData;
    let i = this.trackData;
    console.log("🔍 BEFORE filterVariantData:", {
      variantDataPreLength: e == null ? void 0 : e.length,
      variantFilter: this.variantFilter,
      variantFilterLength: (ct = this.variantFilter) == null ? void 0 : ct.length
    });
    const r = this.filterVariantData(
      e,
      this.variantFilter
    );
    console.log("🔍 AFTER filterVariantData:", {
      inputLength: e == null ? void 0 : e.length,
      outputLength: r == null ? void 0 : r.length,
      filteredOut: ((e == null ? void 0 : e.length) || 0) - ((r == null ? void 0 : r.length) || 0),
      remainingVariants: r == null ? void 0 : r.map((X) => {
        var pt, it;
        return {
          name: X.name,
          allele_ids: (it = (pt = X.allele_ids) == null ? void 0 : pt.values) == null ? void 0 : it[0]
        };
      })
    }), console.log("🔍 BEFORE generateVariantDataBinsAndDataSets:", {
      variantDataLength: r == null ? void 0 : r.length,
      firstThreeVariants: r == null ? void 0 : r.slice(0, 3).map((X) => {
        var pt, it;
        return {
          name: X.name,
          allele_ids: (it = (pt = X.allele_ids) == null ? void 0 : pt.values) == null ? void 0 : it[0]
        };
      })
    });
    const a = ys(
      r,
      1
      // Colin NOTE: made up value
    );
    Ah(r), console.log("🔍 AFTER generateVariantDataBinsAndDataSets:", {
      variantBinsLength: a == null ? void 0 : a.length,
      firstThreeBins: a == null ? void 0 : a.slice(0, 3).map((X) => {
        var pt;
        return {
          name: X.name,
          type: X.type,
          variantsInBin: (pt = X.variants) == null ? void 0 : pt.length
        };
      })
    });
    const s = /* @__PURE__ */ new Map();
    console.log("🔍 Pre-computing alleles for variants:", {
      variantBinsLength: a.length,
      firstVariant: a[0]
    }), a.forEach((X) => {
      const pt = $i(X);
      s.set(X, pt), pt.length > 0 && pt.includes("MGI:6730304") && console.log("🎯 TARGET ALLELE VARIANT:", {
        variantName: X.name,
        alleles: pt,
        variantType: X.type,
        fmin: X.fmin,
        fmax: X.fmax
      });
    }), console.log("📊 Variant alleles map created:", {
      totalVariants: s.size,
      variantsWithAlleles: Array.from(s.values()).filter((X) => X.length > 0).length
    });
    const o = this.viewer, c = this.width, f = this.showVariantLabel, h = ["UTR", "five_prime_UTR", "three_prime_UTR"], m = ["CDS"], p = ["exon"], g = this.transcriptTypes, E = _s(i, g), L = E.fmin, R = E.fmax, S = 10, v = 10, k = 10, x = 40, A = 20, I = 2, T = 0, z = 10, F = 10, C = 20, b = 4, G = 20, P = 10, Q = `0,0 0,${G} ${P},${P}`, rt = 10, ht = 10, Y = (X) => `${X - ht / 2},${rt} ${X},0 ${X + ht / 2},${rt}`, nt = (X) => `${X - ht / 2},${rt} ${X + ht / 2},${rt} ${X - ht / 2},0 ${X + ht / 2},0`, U = (X) => `${X},${rt} ${X + ht / 2},${rt / 2} ${X},0 ${X - ht / 2},${rt / 2}`, st = ue().domain([L, R]).range([0, c]), It = ze(this.viewer), j = o.append("g").attr("transform", `translate(0,${It})`).attr("class", "track"), mt = {};
    for (const X of h)
      mt[X] = 200;
    for (const X of m)
      mt[X] = 1e3;
    for (const X of p)
      mt[X] = 100;
    const kt = {};
    i = i.sort((X, pt) => X.selected && !pt.selected ? -1 : !X.selected && pt.selected ? 1 : X.name - pt.name);
    let gt = 0;
    const et = Tt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), ft = () => {
      et.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    let ut = 0;
    const xt = [];
    let At = -1, St = -1;
    const lt = this.renderTooltipDescription;
    for (let X = 0; X < i.length && ut < S; X++) {
      const pt = i[X];
      let it = pt.children;
      if (it) {
        const dt = pt.selected;
        it = it.sort((Z, Dt) => Z.name < Dt.name ? -1 : Z.name > Dt.name ? 1 : Z - Dt);
        let vt = !1;
        it.forEach((Z) => {
          const Dt = Z.type;
          if (g.includes(Dt)) {
            let tt = Yi(
              xt,
              st(Z.fmin),
              st(Z.fmax)
            );
            if (ut < S) {
              let yt, Et, Ot = !1;
              Object.keys(kt).includes(pt.name) || (gt += A, Ot = !0, kt[pt.name] = "Green");
              const _ = j.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${ut * x + 10 + gt})`
              );
              Ot && (yt = pt.name, Et = _.append("text").attr("class", "geneLabel").attr("fill", dt ? "sandybrown" : "black").attr("height", T).attr(
                "transform",
                `translate(${st(Z.fmin)},-${A})`
              ).text(yt).on("click", () => {
                lt(
                  et,
                  Ft(pt),
                  ft
                );
              }).datum({ fmin: Z.fmin })), _.append("polygon").datum(() => ({
                fmin: Z.fmin,
                fmax: Z.fmax,
                strand: pt.strand
              })).attr("class", "transArrow").attr("points", Q).attr("transform", (H) => pt.strand > 0 ? `translate(${Number(st(H.fmax))},0)` : `translate(${Number(st(H.fmin))},${G}) rotate(180)`).on("click", () => {
                lt(
                  et,
                  Ft(Z),
                  ft
                );
              }), _.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + T).attr("height", b).attr("transform", `translate(${st(Z.fmin)},0)`).attr("width", st(Z.fmax) - st(Z.fmin)).on("click", () => {
                lt(
                  et,
                  Ft(Z),
                  ft
                );
              }).datum({ fmin: Z.fmin, fmax: Z.fmax }), yt = Z.name, Et = _.append("text").attr("class", "transcriptLabel").attr("fill", dt ? "sandybrown" : "gray").attr("opacity", dt ? 1 : 0.5).attr("height", T).attr("transform", `translate(${st(Z.fmin)},0)`).text(yt).on("click", () => {
                lt(
                  et,
                  Ft(Z),
                  ft
                );
              }).datum({ fmin: Z.fmin });
              let B = yt.length * 2;
              try {
                B = Et.node().getBBox().width;
              } catch {
              }
              Number(B + st(Z.fmin)) > c;
              const V = B > st(Z.fmax) - st(Z.fmin) ? st(Z.fmin) + B : st(Z.fmax);
              if (xt[tt]) {
                const H = xt[tt];
                H.push(`${st(Z.fmin)}:${V}`), xt[tt] = H;
              } else
                xt[tt] = [
                  `${st(Z.fmin)}:${V}`
                ];
              (At < 0 || At > Z.fmin) && (At = Z.fmin), (St < 0 || St < Z.fmax) && (St = Z.fmax), Z.children && (Z.children = Z.children.sort((H, w) => {
                const $ = mt[H.type], u = mt[w.type];
                return typeof $ == "number" && typeof u == "number" ? $ - u : typeof $ == "number" && typeof u != "number" ? -1 : typeof $ != "number" && typeof u == "number" ? 1 : H.type - w.type;
              }), Z.children.forEach((H) => {
                const w = H.type;
                let $ = !1;
                p.includes(w) ? ($ = !0, _.append("rect").attr("class", "exon").attr("x", st(H.fmin)).attr(
                  "transform",
                  `translate(0,${v - b})`
                ).attr("height", v).attr("z-index", 10).attr("width", st(H.fmax) - st(H.fmin)).on("click", () => {
                  lt(
                    et,
                    Ft(Z),
                    ft
                  );
                }).datum({ fmin: H.fmin, fmax: H.fmax })) : m.includes(w) ? ($ = !0, _.append("rect").attr("class", "CDS").attr("x", st(H.fmin)).attr(
                  "transform",
                  `translate(0,${k - b})`
                ).attr("z-index", 20).attr("height", k).attr("width", st(H.fmax) - st(H.fmin)).on("click", () => {
                  lt(
                    et,
                    Ft(Z),
                    ft
                  );
                }).datum({ fmin: H.fmin, fmax: H.fmax })) : h.includes(w) && ($ = !0, _.append("rect").attr("class", "UTR").attr("x", st(H.fmin)).attr(
                  "transform",
                  `translate(0,${z - b})`
                ).attr("z-index", 20).attr("height", z).attr("width", st(H.fmax) - st(H.fmin)).on("click", () => {
                  lt(
                    et,
                    Ft(Z),
                    ft
                  );
                }).datum({ fmin: H.fmin, fmax: H.fmax })), $ && a.forEach((u) => {
                  const { type: M, fmax: K, fmin: l } = u, D = l < H.fmin && K > H.fmin || K > H.fmax && l < H.fmax || K <= H.fmax && l >= H.fmin;
                  if ((s.get(u) || []).includes("MGI:6730304") && (D ? console.log("🎯 TARGET VARIANT OVERLAPS:", {
                    variantType: M,
                    variantRange: `${l}-${K}`,
                    featureRange: `${H.fmin}-${H.fmax}`,
                    innerType: w,
                    alleles: s.get(u)
                  }) : console.log("🎯 TARGET VARIANT NO OVERLAP:", {
                    variantType: M,
                    variantRange: `${l}-${K}`,
                    featureRange: `${H.fmin}-${H.fmax}`,
                    innerType: w,
                    alleles: s.get(u)
                  })), D) {
                    let d = !0;
                    const y = Ni(u), N = Ii(y)[0], J = Ai(y), W = Math.max(
                      Math.ceil(st(K) - st(l)),
                      I
                    ), q = (s.get(u) || []).includes("MGI:6730304");
                    if (q && console.log("🎯 ABOUT TO CREATE SVG:", {
                      variantType: M,
                      descriptions: y,
                      consequenceColor: N,
                      descriptionHtml: (J == null ? void 0 : J.length) || 0,
                      width: W,
                      fmin: l,
                      fmax: K
                    }), M.toLowerCase() === "deletion" || M.toLowerCase() === "mnv") {
                      q && console.log("🎯 CREATING DELETION/MNV RECT for target allele");
                      const ot = _.append("rect").attr("class", "variant-deletion").attr("x", st(l)).attr(
                        "transform",
                        `translate(0,${C - b})`
                      ).attr("z-index", 30).attr("fill", N).attr("height", F).attr("width", W).on("click", () => {
                        lt(
                          et,
                          J,
                          ft
                        );
                      }).datum({
                        fmin: l,
                        fmax: K,
                        alleles: s.get(u) || []
                      });
                      q && console.log("🎯 RECT ELEMENT CREATED:", {
                        element: ot.node(),
                        attributes: {
                          class: ot.attr("class"),
                          x: ot.attr("x"),
                          fill: ot.attr("fill"),
                          width: ot.attr("width"),
                          height: ot.attr("height")
                        }
                      });
                    } else if (M.toLowerCase() === "snv" || M.toLowerCase() === "point_mutation") {
                      q && console.log("🎯 CREATING SNV POLYGON for target allele");
                      const ot = _.append("polygon").attr("class", "variant-SNV").attr("points", U(st(l))).attr("fill", N).attr("x", st(l)).attr(
                        "transform",
                        `translate(0,${C - b})`
                      ).attr("z-index", 30).on("click", () => {
                        lt(
                          et,
                          J,
                          ft
                        );
                      }).datum({
                        fmin: l,
                        fmax: K,
                        alleles: s.get(u) || []
                      });
                      q && console.log("🎯 SNV POLYGON ELEMENT CREATED:", ot.node());
                    } else if (M.toLowerCase() === "insertion") {
                      q && console.log("🎯 CREATING INSERTION POLYGON for target allele");
                      const ot = _.append("polygon").attr("class", "variant-insertion").attr("points", Y(st(l))).attr("fill", N).attr("x", st(l)).attr(
                        "transform",
                        `translate(0,${C - b})`
                      ).attr("z-index", 30).on("click", () => {
                        lt(
                          et,
                          J,
                          ft
                        );
                      }).datum({
                        fmin: l,
                        fmax: K,
                        alleles: s.get(u) || []
                      });
                      q && console.log("🎯 INSERTION POLYGON ELEMENT CREATED:", ot.node());
                    } else if (M.toLowerCase() === "delins" || M.toLowerCase() === "substitution" || M.toLowerCase() === "indel") {
                      q && console.log("🎯 CREATING DELINS POLYGON for target allele");
                      const ot = _.append("polygon").attr("class", "variant-delins").attr("points", nt(st(l))).attr("x", st(l)).attr(
                        "transform",
                        `translate(0,${C - b})`
                      ).attr("fill", N).attr("z-index", 30).on("click", () => {
                        lt(
                          et,
                          J,
                          ft
                        );
                      }).datum({
                        fmin: l,
                        fmax: K,
                        alleles: s.get(u) || []
                      });
                      q && console.log("🎯 DELINS POLYGON ELEMENT CREATED:", ot.node());
                    } else
                      console.warn("🎯 VARIANT TYPE NOT FOUND:", M, u), q && console.warn("🎯 TARGET ALLELE VARIANT TYPE NOT MATCHED:", {
                        type: M,
                        typeToLower: M.toLowerCase(),
                        variant: u
                      }), d = !1;
                    if (d && f) {
                      const ot = Qe(u), Kt = ot.length || 1;
                      _.append("text").attr("class", "variantLabel").attr(
                        "fill",
                        dt ? "sandybrown" : N
                      ).attr("opacity", dt ? 1 : 0.5).attr("height", T).attr(
                        "transform",
                        `translate(${st(l - Kt / 2 * 100)},${C * 2.2 - b})`
                      ).html(ot).on("click", () => {
                        lt(
                          et,
                          J,
                          ft
                        );
                      }).datum({ fmin: Z.fmin });
                    }
                  }
                });
              })), ut += 1;
            }
            ut === S && !vt && (++tt, vt = !0, j.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr("y", 10).attr(
              "transform",
              `translate(0,${ut * x + 20 + gt})`
            ).attr("fill", "red").attr("opacity", 1).attr("height", T).text("Maximum features displayed.  See full view for more."));
          }
        });
      }
    }
    ut === 0 && j.append("text").attr("x", 30).attr("y", T + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), console.log("📊📊📊 DrawTrack SUMMARY:", {
      originalVariantCount: (_t = this.variantData) == null ? void 0 : _t.length,
      filteredVariantCount: r == null ? void 0 : r.length,
      variantBinsCount: a == null ? void 0 : a.length,
      variantAllelesMapSize: s.size,
      variantFilter: this.variantFilter,
      initialHighlight: this.initialHighlight,
      transcriptCount: i == null ? void 0 : i.length,
      viewerElement: (at = this.viewer) == null ? void 0 : at.node()
    });
    const $t = Array.from(s.entries()).filter(([X, pt]) => pt.length > 0).map(([X, pt]) => ({
      variantName: X.name,
      alleles: pt,
      type: X.type
    }));
    if (console.log("📊 Variants with alleles:", {
      count: $t.length,
      variants: $t
    }), console.log("🎯 Checking initialHighlight:", {
      hasInitialHighlight: !!this.initialHighlight,
      initialHighlight: this.initialHighlight,
      viewerExists: !!this.viewer,
      viewerNode: (bt = this.viewer) == null ? void 0 : bt.node()
    }), this.initialHighlight) {
      console.log("📍 Calling setHighlights with:", {
        alleles: this.initialHighlight,
        viewer: this.viewer
      });
      try {
        Xi(this.initialHighlight, this.viewer), console.log("✅ setHighlights called successfully");
      } catch (X) {
        console.error("❌ Error calling setHighlights:", X);
      }
    } else
      console.log("⚠️ No initialHighlight provided, skipping setHighlights");
    return ut * x + gt;
  }
  filterVariantData(e, n) {
    if (console.log("🔍🔍🔍 filterVariantData CALLED:", {
      variantDataLength: e.length,
      variantFilterLength: n.length,
      variantFilter: n,
      firstThreeVariants: e.slice(0, 3).map((r) => ({
        name: r.name,
        allele_ids: r.allele_ids,
        allele_symbols: r.allele_symbols,
        symbol: r.symbol
      }))
    }), n.length === 0)
      return console.log("✅ filterVariantData: No filter applied, returning all variants"), e;
    const i = e.filter((r, a) => {
      var o, c, f, h, m, p, g, E, L, R;
      console.log(`
🔍 Processing variant ${a + 1}/${e.length}:`, {
        name: r.name,
        allele_ids: (o = r.allele_ids) == null ? void 0 : o.values,
        allele_symbols: (c = r.allele_symbols) == null ? void 0 : c.values,
        symbol: (f = r.symbol) == null ? void 0 : f.values,
        symbol_text: (h = r.symbol_text) == null ? void 0 : h.values
      });
      let s = !1;
      try {
        if (n.includes(r.name) && (console.log("✅ Match on variant name:", r.name), s = !0), (m = r.allele_symbols) != null && m.values) {
          const v = r.allele_symbols.values[0].replace(/"|\\[|\\]| /g, "");
          console.log("🔍 Checking allele_symbols:", {
            raw: r.allele_symbols.values[0],
            cleaned: v,
            isInFilter: n.includes(v)
          }), n.includes(v) && (console.log("✅ Match on allele_symbols:", v), s = !0);
        }
        if ((p = r.symbol) != null && p.values) {
          const v = r.symbol.values[0].replace(/"|\\[|\\]| /g, "");
          console.log("🔍 Checking symbol:", {
            raw: r.symbol.values[0],
            cleaned: v,
            isInFilter: n.includes(v)
          }), n.includes(v) && (console.log("✅ Match on symbol:", v), s = !0);
        }
        if ((g = r.symbol_text) != null && g.values) {
          const v = r.symbol_text.values[0].replace(/"|\\[|\\]| /g, "");
          console.log("🔍 Checking symbol_text:", {
            raw: r.symbol_text.values[0],
            cleaned: v,
            isInFilter: n.includes(v)
          }), n.includes(v) && (console.log("✅ Match on symbol_text:", v), s = !0);
        }
        const S = (L = (E = r.allele_ids) == null ? void 0 : E.values) == null ? void 0 : L[0];
        if (console.log("🔍 Processing allele_ids:", {
          hasAlleleIds: !!r.allele_ids,
          hasValues: !!((R = r.allele_ids) != null && R.values),
          rawValue: S,
          rawValueType: typeof S
        }), S) {
          let v = [];
          if (S.startsWith("[") && S.endsWith("]")) {
            console.log("🔍 Detected JSON format, attempting to parse...");
            try {
              const k = JSON.parse(S);
              v = Array.isArray(k) ? k : [k], console.log("✅ Successfully parsed JSON allele_ids:", {
                rawValue: S,
                parsed: v,
                variantName: r.name
              });
            } catch (k) {
              console.warn("❌ Failed to parse allele_ids as JSON:", {
                rawValue: S,
                error: k,
                fallingBackTo: "regex parsing"
              }), v = S.replace(/"|\\[|\\]| /g, "").split(","), console.log("🔍 Fallback regex parsing result:", v);
            }
          } else
            console.log("🔍 Using regex parsing for non-JSON format"), v = S.replace(/"|\\[|\\]| /g, "").split(","), console.log("🔍 Regex parsing result:", v);
          console.log("🔍 Checking each allele ID against filter:"), v.forEach((k, x) => {
            const A = n.includes(k);
            console.log(`  - ID ${x + 1}: "${k}" - ${A ? "✅ MATCH!" : "❌ no match"}`), A && (console.log("🎯🎯🎯 FILTER MATCH FOUND!", {
              variantId: r.name,
              matchedAlleleId: k,
              allAlleleIds: v,
              variantFilter: n
            }), s = !0);
          });
        } else
          console.log("⚠️ No allele_ids found for this variant");
      } catch (S) {
        console.error(
          "❌ ERROR processing filter - returning variant anyway",
          {
            variantFilter: n,
            variant: r,
            error: S
          }
        ), s = !0;
      }
      return console.log(`🔍 Variant ${a + 1} result: ${s ? "✅ INCLUDED" : "❌ FILTERED OUT"}`), s;
    });
    return console.log(`
🔍🔍🔍 filterVariantData COMPLETE:`, {
      inputLength: e.length,
      outputLength: i.length,
      filteredOut: e.length - i.length,
      includedVariants: i.map((r) => {
        var a, s;
        return {
          name: r.name,
          allele_ids: (s = (a = r.allele_ids) == null ? void 0 : a.values) == null ? void 0 : s[0]
        };
      })
    }), i;
  }
  renderTooltipDescription(e, n, i) {
    e.transition().duration(200).style("width", "auto").style("height", "auto").style("opacity", 1).style("visibility", "visible"), e.html(n).style("left", `${window.event.pageX + 10}px`).style("top", `${window.event.pageY + 10}px`).append("button").attr("type", "button").text("Close").on("click", () => {
      i();
    }), e.append("button").attr("type", "button").html("&times;").attr("class", "tooltipDivX").on("click", () => {
      i();
    });
  }
}
class Oh {
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
    var Y;
    let e = this.trackData;
    const n = this.htpVariant, i = this.viewer, r = this.width, a = this.genome, s = (Y = e[0]) == null ? void 0 : Y.seqId, o = 10, c = ["UTR", "five_prime_UTR", "three_prime_UTR"], f = ["CDS"], h = ["exon"], m = this.transcriptTypes, p = 10, g = 10, E = 40, L = 0, R = 10, S = 4, v = 20, k = 10, x = `0,0 0,${v} ${k},${k}`, A = this.renderTooltipDescription, I = ue().domain([this.region.start, this.region.end]).range([0, r]), T = {};
    for (let nt = 0, U = c.length; nt < U; nt++)
      T[c[nt]] = 200;
    for (let nt = 0, U = f.length; nt < U; nt++)
      T[f[nt]] = 1e3;
    for (let nt = 0, U = h.length; nt < U; nt++)
      T[h[nt]] = 100;
    e = e.sort((nt, U) => nt.selected && !U.selected ? -1 : !nt.selected && U.selected ? 1 : nt.name - U.name);
    const z = Tt("body").append("div").attr("class", "gfc-tooltip").style("visibility", "visible").style("opacity", 0), F = () => {
      z.transition().duration(100).style("opacity", 10).style("visibility", "hidden");
    };
    if (n) {
      const nt = i.append("g").attr("class", "variants track").attr("transform", "translate(0,22.5)"), [, U] = n.split(":");
      nt.append("polygon").attr("class", "variant-SNV").attr("points", Ki(I(+U))).attr("fill", "red").attr("x", I(+U)).attr("z-index", 30);
    }
    const C = ze(this.viewer), b = i.append("g").attr("transform", `translate(0,${C})`).attr("class", "track");
    let G = 0;
    const P = [];
    let Q = -1, rt = -1;
    const ht = [];
    for (let nt = 0; nt < e.length && G < o; nt++) {
      const U = e[nt];
      let st = U.children;
      if (st) {
        const It = U.selected;
        st = st.sort((j, mt) => j.name < mt.name ? -1 : j.name > mt.name ? 1 : 0), st.forEach((j) => {
          var kt, gt;
          const mt = j.type;
          if (!ht.includes(j.id) && (ht.push(j.id), m.includes(mt))) {
            let et = Yi(
              P,
              I(j.fmin),
              I(j.fmax)
            );
            if (G < o) {
              const ft = b.append("g").attr("class", "isoform").attr(
                "transform",
                `translate(0,${G * E + 10})`
              ), ut = Math.max(I(j.fmin), 0), xt = Math.min(I(j.fmax), this.width);
              ft.append("polygon").datum(() => ({
                strand: U.strand
              })).attr("class", "transArrow").attr("points", x).attr(
                "transform",
                () => U.strand > 0 ? `translate(${xt},0)` : `translate(${ut},${v}) rotate(180)`
              ).on("click", () => {
                A(
                  z,
                  Ft(j),
                  F
                );
              }), ft.append("rect").attr("class", "transcriptBackbone").attr("y", 10 + L).attr("height", S).attr("transform", `translate(${ut},0)`).attr("width", xt - ut).datum({
                fmin: j.fmin,
                fmax: j.fmax
              }).on("click", () => {
                A(
                  z,
                  Ft(j),
                  F
                );
              });
              let At = j.name;
              U.name !== j.name && (At += ` (${U.name})`);
              let St = Math.max(I(j.fmin), 0);
              const lt = ft.append("svg:text").attr("class", "transcriptLabel").attr("fill", It ? "sandybrown" : "gray").attr("opacity", It ? 1 : 0.5).attr("height", L).attr("transform", `translate(${St},0)`).text(At).datum({
                fmin: j.fmin
              }).on("click", () => {
                A(
                  z,
                  Ft(j),
                  F
                );
              });
              let $t = 100;
              try {
                $t = ((kt = lt.node()) == null ? void 0 : kt.getBBox().width) ?? 0;
              } catch {
              }
              if ($t + St > this.width) {
                const ct = $t + St - this.width;
                St -= ct, lt.attr("transform", `translate(${St},0)`);
              }
              let Bt = At.length * 2;
              try {
                Bt = ((gt = lt.node()) == null ? void 0 : gt.getBBox().width) ?? 0;
              } catch (ct) {
                console.error("Not yet rendered", ct);
              }
              Number(Bt + I(j.fmin)) > r;
              const Rt = Bt > I(j.fmax) - I(j.fmin) ? I(j.fmin) + Bt : I(j.fmax);
              if (P[et]) {
                const ct = P[et];
                ct.push(`${I(j.fmin)}:${Rt}`), P[et] = ct;
              } else
                P[et] = [`${I(j.fmin)}:${Rt}`];
              (Q < 0 || Q > j.fmin) && (Q = j.fmin), (rt < 0 || rt < j.fmax) && (rt = j.fmax), j.children && (j.children = j.children.sort(
                function(ct, _t) {
                  const at = T[ct.type], bt = T[_t.type];
                  return typeof at == "number" && typeof bt == "number" ? at - bt : typeof at == "number" && typeof bt != "number" ? -1 : typeof at != "number" && typeof bt == "number" ? 1 : ct.type.localeCompare(_t.type);
                }
              ), j.children.forEach((ct) => {
                const _t = ct.type;
                if (I(ct.fmin) > this.width || I(ct.fmax) < 0)
                  return;
                const at = Math.max(I(ct.fmin), 0), bt = Math.min(I(ct.fmax), this.width);
                h.includes(_t) ? ft.append("rect").attr("class", "exon").attr("x", at).attr(
                  "transform",
                  `translate(0,${p - S})`
                ).attr("height", p).attr("z-index", 10).attr("width", bt - at).datum({
                  fmin: ct.fmin,
                  fmax: ct.fmax
                }).on("click", () => {
                  A(
                    z,
                    Ft(j),
                    F
                  );
                }) : f.includes(_t) ? ft.append("rect").attr("class", "CDS").attr("x", at).attr(
                  "transform",
                  `translate(0,${g - S})`
                ).attr("z-index", 20).attr("height", g).attr("width", bt - at).datum({
                  fmin: ct.fmin,
                  fmax: ct.fmax
                }).on("click", () => {
                  A(
                    z,
                    Ft(j),
                    F
                  );
                }) : c.includes(_t) && ft.append("rect").attr("class", "UTR").attr("x", at).attr(
                  "transform",
                  `translate(0,${R - S})`
                ).attr("z-index", 20).attr("height", R).attr("width", bt - at).datum({
                  fmin: ct.fmin,
                  fmax: ct.fmax
                }).on("click", () => {
                  A(
                    z,
                    Ft(j),
                    F
                  );
                });
              })), G += 1;
            }
            if (G === o) {
              const ft = xs(
                a,
                s,
                this.region.start,
                this.region.end
              );
              ++et, b.append("a").attr("class", "transcriptLabel").attr("xlink:show", "new").append("text").attr("x", 10).attr(
                "transform",
                `translate(0,${G * E + 10})`
              ).attr("fill", "red").attr("opacity", 1).attr("height", L).html(ft);
            }
          }
        });
      }
    }
    return G === 0 && b.append("text").attr("x", 30).attr("y", L + 10).attr("fill", "orange").attr("opacity", 0.6).text(
      "Overview of non-coding genome features unavailable at this time."
    ), G * E;
  }
}
class Lh {
  constructor({ viewer: e, track: n, height: i, width: r }) {
    this.refSeq = "", this.viewer = e, this.width = r, this.height = i, this.track = n;
  }
  DrawScrollableTrack() {
    const e = this.viewer, n = this.refSeq, i = ue().domain([this.track.start, this.track.end + 1]).range(this.track.range), r = No(i).tickValues(this._getRefTick(this.track.start + 1, this.track.end)).tickFormat((c, f) => n[f]).tickSize(8).tickSizeInner(8).tickPadding(6), a = Math.floor(n.length / 10), s = lr(i).ticks(a).tickValues(this._getRefTick(this.track.start + 1, this.track.end, 10));
    e.append("g").attr("class", "axis x-local-axis track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(r), e.append("g").attr("class", "axis x-local-numerical track").attr("width", this.track.range[1]).attr("transform", "translate(0, 20)").call(s);
    const o = Qt(".x-local-numerical .tick text");
    o.first().attr("text-anchor", "start"), o.last().attr("text-anchor", "end"), Qt(".x-local-axis .tick text").each(function() {
      const f = Tt(this).text();
      let h = "nucleotide nt-a";
      f === "T" ? h = "nucleotide nt-t" : f === "C" ? h = "nucleotide nt-c" : f === "G" && (h = "nucleotide nt-g"), Tt(this.parentNode).append("rect").attr("class", h).attr("transform", "translate(-8,8)");
    });
  }
  DrawOverviewTrack() {
    const e = this.viewer, n = this.track.start, i = this.track.end, r = this.width, a = ue().domain([n, i]).range(this.track.range), s = lr(a).ticks(8, "s").tickSize(8);
    e.append("g").attr("class", "axis track").attr("width", r).attr("height", 20).attr("transform", "translate(0,20)").call(s);
  }
  _getRefTick(e, n, i) {
    return i ? new Array(Math.ceil((n - e + 1) / 10)).fill(0).map((r, a) => e + a * 10) : new Array(n - e + 1).fill(0).map((r, a) => e + a);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTrackData() {
  }
}
const Ve = {
  ISOFORM_EMBEDDED_VARIANT: "ISOFORM_EMBEDDED_VARIANT",
  ISOFORM_AND_VARIANT: "ISOFORM_AND_VARIANT",
  ISOFORM: "ISOFORM",
  VARIANT: "VARIANT",
  VARIANT_GLOBAL: "VARIANT_GLOBAL"
};
var Yt = "$";
function On() {
}
On.prototype = Qi.prototype = {
  constructor: On,
  has: function(t) {
    return Yt + t in this;
  },
  get: function(t) {
    return this[Yt + t];
  },
  set: function(t, e) {
    return this[Yt + t] = e, this;
  },
  remove: function(t) {
    var e = Yt + t;
    return e in this && delete this[e];
  },
  clear: function() {
    for (var t in this) t[0] === Yt && delete this[t];
  },
  keys: function() {
    var t = [];
    for (var e in this) e[0] === Yt && t.push(e.slice(1));
    return t;
  },
  values: function() {
    var t = [];
    for (var e in this) e[0] === Yt && t.push(this[e]);
    return t;
  },
  entries: function() {
    var t = [];
    for (var e in this) e[0] === Yt && t.push({ key: e.slice(1), value: this[e] });
    return t;
  },
  size: function() {
    var t = 0;
    for (var e in this) e[0] === Yt && ++t;
    return t;
  },
  empty: function() {
    for (var t in this) if (t[0] === Yt) return !1;
    return !0;
  },
  each: function(t) {
    for (var e in this) e[0] === Yt && t(this[e], e.slice(1), this);
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
function Dr() {
}
var pe = Qi.prototype;
Dr.prototype = {
  constructor: Dr,
  has: pe.has,
  add: function(t) {
    return t += "", this[Yt + t] = t, this;
  },
  remove: pe.remove,
  clear: pe.clear,
  values: pe.keys,
  size: pe.size,
  empty: pe.empty,
  each: pe.each
};
var Di = "http://www.w3.org/1999/xhtml";
const Mr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Di,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function ks(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), Mr.hasOwnProperty(e) ? { space: Mr[e], local: t } : t;
}
function Ch(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Di && e.documentElement.namespaceURI === Di ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Fh(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Es(t) {
  var e = ks(t);
  return (e.local ? Fh : Ch)(e);
}
function zh() {
}
function Ts(t) {
  return t == null ? zh : function() {
    return this.querySelector(t);
  };
}
function Bh(t) {
  typeof t != "function" && (t = Ts(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = new Array(s), c, f, h = 0; h < s; ++h)
      (c = a[h]) && (f = t.call(c, c.__data__, h, a)) && ("__data__" in c && (f.__data__ = c.__data__), o[h] = f);
  return new Zt(i, this._parents);
}
function Hh() {
  return [];
}
function Vh(t) {
  return t == null ? Hh : function() {
    return this.querySelectorAll(t);
  };
}
function Ph(t) {
  typeof t != "function" && (t = Vh(t));
  for (var e = this._groups, n = e.length, i = [], r = [], a = 0; a < n; ++a)
    for (var s = e[a], o = s.length, c, f = 0; f < o; ++f)
      (c = s[f]) && (i.push(t.call(c, c.__data__, f, s)), r.push(c));
  return new Zt(i, r);
}
function Uh(t) {
  return function() {
    return this.matches(t);
  };
}
function Gh(t) {
  typeof t != "function" && (t = Uh(t));
  for (var e = this._groups, n = e.length, i = new Array(n), r = 0; r < n; ++r)
    for (var a = e[r], s = a.length, o = i[r] = [], c, f = 0; f < s; ++f)
      (c = a[f]) && t.call(c, c.__data__, f, a) && o.push(c);
  return new Zt(i, this._parents);
}
function Ss(t) {
  return new Array(t.length);
}
function Zh() {
  return new Zt(this._enter || this._groups.map(Ss), this._parents);
}
function Ln(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Ln.prototype = {
  constructor: Ln,
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
function qh(t) {
  return function() {
    return t;
  };
}
var Or = "$";
function Wh(t, e, n, i, r, a) {
  for (var s = 0, o, c = e.length, f = a.length; s < f; ++s)
    (o = e[s]) ? (o.__data__ = a[s], i[s] = o) : n[s] = new Ln(t, a[s]);
  for (; s < c; ++s)
    (o = e[s]) && (r[s] = o);
}
function Yh(t, e, n, i, r, a, s) {
  var o, c, f = {}, h = e.length, m = a.length, p = new Array(h), g;
  for (o = 0; o < h; ++o)
    (c = e[o]) && (p[o] = g = Or + s.call(c, c.__data__, o, e), g in f ? r[o] = c : f[g] = c);
  for (o = 0; o < m; ++o)
    g = Or + s.call(t, a[o], o, a), (c = f[g]) ? (i[o] = c, c.__data__ = a[o], f[g] = null) : n[o] = new Ln(t, a[o]);
  for (o = 0; o < h; ++o)
    (c = e[o]) && f[p[o]] === c && (r[o] = c);
}
function Xh(t, e) {
  if (!t)
    return g = new Array(this.size()), f = -1, this.each(function(I) {
      g[++f] = I;
    }), g;
  var n = e ? Yh : Wh, i = this._parents, r = this._groups;
  typeof t != "function" && (t = qh(t));
  for (var a = r.length, s = new Array(a), o = new Array(a), c = new Array(a), f = 0; f < a; ++f) {
    var h = i[f], m = r[f], p = m.length, g = t.call(h, h && h.__data__, f, i), E = g.length, L = o[f] = new Array(E), R = s[f] = new Array(E), S = c[f] = new Array(p);
    n(h, m, L, R, S, g, e);
    for (var v = 0, k = 0, x, A; v < E; ++v)
      if (x = L[v]) {
        for (v >= k && (k = v + 1); !(A = R[k]) && ++k < E; ) ;
        x._next = A || null;
      }
  }
  return s = new Zt(s, i), s._enter = o, s._exit = c, s;
}
function Kh() {
  return new Zt(this._exit || this._groups.map(Ss), this._parents);
}
function Jh(t, e, n) {
  var i = this.enter(), r = this, a = this.exit();
  return i = typeof t == "function" ? t(i) : i.append(t + ""), e != null && (r = e(r)), n == null ? a.remove() : n(a), i && r ? i.merge(r).order() : r;
}
function Qh(t) {
  for (var e = this._groups, n = t._groups, i = e.length, r = n.length, a = Math.min(i, r), s = new Array(i), o = 0; o < a; ++o)
    for (var c = e[o], f = n[o], h = c.length, m = s[o] = new Array(h), p, g = 0; g < h; ++g)
      (p = c[g] || f[g]) && (m[g] = p);
  for (; o < i; ++o)
    s[o] = e[o];
  return new Zt(s, this._parents);
}
function jh() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var i = t[e], r = i.length - 1, a = i[r], s; --r >= 0; )
      (s = i[r]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function tu(t) {
  t || (t = eu);
  function e(m, p) {
    return m && p ? t(m.__data__, p.__data__) : !m - !p;
  }
  for (var n = this._groups, i = n.length, r = new Array(i), a = 0; a < i; ++a) {
    for (var s = n[a], o = s.length, c = r[a] = new Array(o), f, h = 0; h < o; ++h)
      (f = s[h]) && (c[h] = f);
    c.sort(e);
  }
  return new Zt(r, this._parents).order();
}
function eu(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function nu() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function iu() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function ru() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var i = t[e], r = 0, a = i.length; r < a; ++r) {
      var s = i[r];
      if (s) return s;
    }
  return null;
}
function au() {
  var t = 0;
  return this.each(function() {
    ++t;
  }), t;
}
function su() {
  return !this.node();
}
function ou(t) {
  for (var e = this._groups, n = 0, i = e.length; n < i; ++n)
    for (var r = e[n], a = 0, s = r.length, o; a < s; ++a)
      (o = r[a]) && t.call(o, o.__data__, a, r);
  return this;
}
function lu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function cu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function fu(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function hu(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function uu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function du(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function pu(t, e) {
  var n = ks(t);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((e == null ? n.local ? cu : lu : typeof e == "function" ? n.local ? du : uu : n.local ? hu : fu)(n, e));
}
function As(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function gu(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function _u(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function mu(t, e, n) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, n);
  };
}
function wu(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? gu : typeof e == "function" ? mu : _u)(t, e, n ?? "")) : vu(this.node(), t);
}
function vu(t, e) {
  return t.style.getPropertyValue(e) || As(t).getComputedStyle(t, null).getPropertyValue(e);
}
function yu(t) {
  return function() {
    delete this[t];
  };
}
function bu(t, e) {
  return function() {
    this[t] = e;
  };
}
function xu(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ku(t, e) {
  return arguments.length > 1 ? this.each((e == null ? yu : typeof e == "function" ? xu : bu)(t, e)) : this.node()[t];
}
function Ns(t) {
  return t.trim().split(/^|\s+/);
}
function ji(t) {
  return t.classList || new $s(t);
}
function $s(t) {
  this._node = t, this._names = Ns(t.getAttribute("class") || "");
}
$s.prototype = {
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
function Is(t, e) {
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.add(e[i]);
}
function Rs(t, e) {
  for (var n = ji(t), i = -1, r = e.length; ++i < r; ) n.remove(e[i]);
}
function Eu(t) {
  return function() {
    Is(this, t);
  };
}
function Tu(t) {
  return function() {
    Rs(this, t);
  };
}
function Su(t, e) {
  return function() {
    (e.apply(this, arguments) ? Is : Rs)(this, t);
  };
}
function Au(t, e) {
  var n = Ns(t + "");
  if (arguments.length < 2) {
    for (var i = ji(this.node()), r = -1, a = n.length; ++r < a; ) if (!i.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Su : e ? Eu : Tu)(n, e));
}
function Nu() {
  this.textContent = "";
}
function $u(t) {
  return function() {
    this.textContent = t;
  };
}
function Iu(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ru(t) {
  return arguments.length ? this.each(t == null ? Nu : (typeof t == "function" ? Iu : $u)(t)) : this.node().textContent;
}
function Du() {
  this.innerHTML = "";
}
function Mu(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ou(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Lu(t) {
  return arguments.length ? this.each(t == null ? Du : (typeof t == "function" ? Ou : Mu)(t)) : this.node().innerHTML;
}
function Cu() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Fu() {
  return this.each(Cu);
}
function zu() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Bu() {
  return this.each(zu);
}
function Hu(t) {
  var e = typeof t == "function" ? t : Es(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Vu() {
  return null;
}
function Pu(t, e) {
  var n = typeof t == "function" ? t : Es(t), i = e == null ? Vu : typeof e == "function" ? e : Ts(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Uu() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Gu() {
  return this.each(Uu);
}
function Zu() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function qu() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wu(t) {
  return this.select(t ? qu : Zu);
}
function Yu(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var Ds = {};
if (typeof document < "u") {
  var Xu = document.documentElement;
  "onmouseenter" in Xu || (Ds = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function Ku(t, e, n) {
  return t = Ms(t, e, n), function(i) {
    var r = i.relatedTarget;
    (!r || r !== this && !(r.compareDocumentPosition(this) & 8)) && t.call(this, i);
  };
}
function Ms(t, e, n) {
  return function(i) {
    try {
      t.call(this, this.__data__, e, n);
    } finally {
    }
  };
}
function Ju(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", i = e.indexOf(".");
    return i >= 0 && (n = e.slice(i + 1), e = e.slice(0, i)), { type: e, name: n };
  });
}
function Qu(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, i = -1, r = e.length, a; n < r; ++n)
        a = e[n], (!t.type || a.type === t.type) && a.name === t.name ? this.removeEventListener(a.type, a.listener, a.capture) : e[++i] = a;
      ++i ? e.length = i : delete this.__on;
    }
  };
}
function ju(t, e, n) {
  var i = Ds.hasOwnProperty(t.type) ? Ku : Ms;
  return function(r, a, s) {
    var o = this.__on, c, f = i(e, a, s);
    if (o) {
      for (var h = 0, m = o.length; h < m; ++h)
        if ((c = o[h]).type === t.type && c.name === t.name) {
          this.removeEventListener(c.type, c.listener, c.capture), this.addEventListener(c.type, c.listener = f, c.capture = n), c.value = e;
          return;
        }
    }
    this.addEventListener(t.type, f, n), c = { type: t.type, name: t.name, value: e, listener: f, capture: n }, o ? o.push(c) : this.__on = [c];
  };
}
function td(t, e, n) {
  var i = Ju(t + ""), r, a = i.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, f = o.length, h; c < f; ++c)
        for (r = 0, h = o[c]; r < a; ++r)
          if ((s = i[r]).type === h.type && s.name === h.name)
            return h.value;
    }
    return;
  }
  for (o = e ? ju : Qu, n == null && (n = !1), r = 0; r < a; ++r) this.each(o(i[r], e, n));
  return this;
}
function Os(t, e, n) {
  var i = As(t), r = i.CustomEvent;
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
var Ls = [null];
function Zt(t, e) {
  this._groups = t, this._parents = e;
}
function Mi() {
  return new Zt([[document.documentElement]], Ls);
}
Zt.prototype = Mi.prototype = {
  constructor: Zt,
  select: Bh,
  selectAll: Ph,
  filter: Gh,
  data: Xh,
  enter: Zh,
  exit: Kh,
  join: Jh,
  merge: Qh,
  order: jh,
  sort: tu,
  call: nu,
  nodes: iu,
  node: ru,
  size: au,
  empty: su,
  each: ou,
  attr: pu,
  style: wu,
  property: ku,
  classed: Au,
  text: Ru,
  html: Lu,
  raise: Fu,
  lower: Bu,
  append: Hu,
  insert: Pu,
  remove: Gu,
  clone: Wu,
  datum: Yu,
  on: td,
  dispatch: id
};
function Lr(t) {
  return typeof t == "string" ? new Zt([[document.querySelector(t)]], [document.documentElement]) : new Zt([[t]], Ls);
}
function rd() {
  var t = f, e = h, n = m, i = document.body, r = I(), a = null, s = null, o = null;
  function c(b) {
    a = T(b), a && (s = a.createSVGPoint(), i.appendChild(r));
  }
  c.show = function() {
    var b = Array.prototype.slice.call(arguments);
    b[b.length - 1] instanceof SVGElement && (o = b.pop());
    var G = n.apply(this, b), P = e.apply(this, b), Q = t.apply(this, b), rt = z(), ht = g.length, Y, nt = document.documentElement.scrollTop || i.scrollTop, U = document.documentElement.scrollLeft || i.scrollLeft;
    for (rt.html(G).style("opacity", 1).style("pointer-events", "all"); ht--; ) rt.classed(g[ht], !1);
    return Y = p.get(Q).apply(this), rt.classed(Q, !0).style("top", Y.top + P[0] + nt + "px").style("left", Y.left + P[1] + U + "px"), c;
  }, c.hide = function() {
    var b = z();
    return b.style("opacity", 0).style("pointer-events", "none"), c;
  }, c.attr = function(b, G) {
    if (arguments.length < 2 && typeof b == "string")
      return z().attr(b);
    var P = Array.prototype.slice.call(arguments);
    return Mi.prototype.attr.apply(z(), P), c;
  }, c.style = function(b, G) {
    if (arguments.length < 2 && typeof b == "string")
      return z().style(b);
    var P = Array.prototype.slice.call(arguments);
    return Mi.prototype.style.apply(z(), P), c;
  }, c.direction = function(b) {
    return arguments.length ? (t = b == null ? b : C(b), c) : t;
  }, c.offset = function(b) {
    return arguments.length ? (e = b == null ? b : C(b), c) : e;
  }, c.html = function(b) {
    return arguments.length ? (n = b == null ? b : C(b), c) : n;
  }, c.rootElement = function(b) {
    return arguments.length ? (i = b == null ? b : C(b), c) : i;
  }, c.destroy = function() {
    return r && (z().remove(), r = null), c;
  };
  function f() {
    return "n";
  }
  function h() {
    return [0, 0];
  }
  function m() {
    return " ";
  }
  var p = Qi({
    n: E,
    s: L,
    e: R,
    w: S,
    nw: v,
    ne: k,
    sw: x,
    se: A
  }), g = p.keys();
  function E() {
    var b = F(this);
    return {
      top: b.n.y - r.offsetHeight,
      left: b.n.x - r.offsetWidth / 2
    };
  }
  function L() {
    var b = F(this);
    return {
      top: b.s.y,
      left: b.s.x - r.offsetWidth / 2
    };
  }
  function R() {
    var b = F(this);
    return {
      top: b.e.y - r.offsetHeight / 2,
      left: b.e.x
    };
  }
  function S() {
    var b = F(this);
    return {
      top: b.w.y - r.offsetHeight / 2,
      left: b.w.x - r.offsetWidth
    };
  }
  function v() {
    var b = F(this);
    return {
      top: b.nw.y - r.offsetHeight,
      left: b.nw.x - r.offsetWidth
    };
  }
  function k() {
    var b = F(this);
    return {
      top: b.ne.y - r.offsetHeight,
      left: b.ne.x
    };
  }
  function x() {
    var b = F(this);
    return {
      top: b.sw.y,
      left: b.sw.x - r.offsetWidth
    };
  }
  function A() {
    var b = F(this);
    return {
      top: b.se.y,
      left: b.se.x
    };
  }
  function I() {
    var b = Lr(document.createElement("div"));
    return b.style("position", "absolute").style("top", 0).style("opacity", 0).style("pointer-events", "none").style("box-sizing", "border-box"), b.node();
  }
  function T(b) {
    var G = b.node();
    return G ? G.tagName.toLowerCase() === "svg" ? G : G.ownerSVGElement : null;
  }
  function z() {
    return r == null && (r = I(), i.appendChild(r)), Lr(r);
  }
  function F(b) {
    for (var G = o || b; G.getScreenCTM == null && G.parentNode != null; )
      G = G.parentNode;
    var P = {}, Q = G.getScreenCTM(), rt = G.getBBox(), ht = rt.width, Y = rt.height, nt = rt.x, U = rt.y;
    return s.x = nt, s.y = U, P.nw = s.matrixTransform(Q), s.x += ht, P.ne = s.matrixTransform(Q), s.y += Y, P.se = s.matrixTransform(Q), s.x -= ht, P.sw = s.matrixTransform(Q), s.y -= Y / 2, P.w = s.matrixTransform(Q), s.x += ht, P.e = s.matrixTransform(Q), s.x -= ht / 2, s.y -= Y / 2, P.n = s.matrixTransform(Q), s.y += Y, P.s = s.matrixTransform(Q), P;
  }
  function C(b) {
    return typeof b == "function" ? b : function() {
      return b;
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
    const e = this.viewer, n = this.variants, i = ue().domain([this.region.start, this.region.end + 1]).range(this.range), r = gs().type(ps).size(20), a = rd();
    a.attr("class", "d3-tip").html(
      // @ts-expect-error
      (m) => `<table><th colspan="2">${"Case Variant".toUpperCase()}</th><tr><td>Position</td> <td>${m.position}</td></tr><tr><td>Mutation</td> <td>${m.ref} > ${m.mutant}</td></tr></table>`
    ).offset([10, 0]).direction("s"), e.call(a);
    const s = 20, o = ze(this.viewer), c = e.append("g").attr("transform", `translate(0,${o})`).attr("class", "track");
    c.append("rect").attr("height", s).attr("width", -this.range[0] + this.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0).attr("transform", `translate(${this.range[0]},0)`), c.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "case-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (m) => `translate(${i(m.position)},10)`).on("mouseenter", a.show).on("mouseout", a.hide);
    const h = Tt("#viewer2").append("g").attr("transform", `translate(25,${o})`).attr("class", "track-label");
    h.append("line").attr("x1", 75).attr("y1", 0).attr("x2", 75).attr("y2", s).attr("stroke-width", 3).attr("stroke", "#609C9C"), h.append("text").text(this.track.label.toUpperCase()).attr("y", 12);
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
    const e = this.viewer, n = this.variants, i = ue().domain([this.region.start, this.region.end]).range(this.track.range), r = gs().type(ps).size(20), a = 20, s = ze(this.viewer), o = e.append("g").attr("transform", `translate(0,${s})`).attr("class", "track");
    o.append("rect").attr("height", a).attr("width", -this.track.range[0] + this.track.range[1]).attr("fill-opacity", 0.1).attr("fill", "rgb(148, 140, 140)").attr("stroke-width", 0).attr("stroke-opacity", 0), o.selectAll("path").data(n).enter().append("path").attr("d", r).attr("class", "global-variant").attr("stroke", "red").attr("fill", "red").attr("transform", (c) => `translate(${i(c.position)},10)`);
  }
  async getTrackData() {
  }
}
function tr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Xn, Cr;
function od() {
  if (Cr) return Xn;
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
  return Xn = t, Xn;
}
var ld = od();
const Pn = /* @__PURE__ */ tr(ld);
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
class hd {
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
class Ee {
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
    const a = new fd(), s = new hd();
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
    return a ? a.aborted && !a.settled ? (this.evict(e, a), this.get(e, n, i, r)) : a.settled ? a.promise : (a.aborter.addSignal(i), a.statusReporter.addCallback(r), Ee.checkSinglePromise(a.promise, i)) : (this.fill(e, n, i, r), Ee.checkSinglePromise(
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
var kn = { exports: {} }, ud = kn.exports, Fr;
function dd() {
  return Fr || (Fr = 1, function(t, e) {
    (function(n, i) {
      t.exports = i();
    })(ud, function() {
      const n = /^[\w+.-]+:\/\//, i = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/, r = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
      function a(v) {
        return n.test(v);
      }
      function s(v) {
        return v.startsWith("//");
      }
      function o(v) {
        return v.startsWith("/");
      }
      function c(v) {
        return v.startsWith("file:");
      }
      function f(v) {
        return /^[.?#]/.test(v);
      }
      function h(v) {
        const k = i.exec(v);
        return p(k[1], k[2] || "", k[3], k[4] || "", k[5] || "/", k[6] || "", k[7] || "");
      }
      function m(v) {
        const k = r.exec(v), x = k[2];
        return p("file:", "", k[1] || "", "", o(x) ? x : "/" + x, k[3] || "", k[4] || "");
      }
      function p(v, k, x, A, I, T, z) {
        return {
          scheme: v,
          user: k,
          host: x,
          port: A,
          path: I,
          query: T,
          hash: z,
          type: 7
        };
      }
      function g(v) {
        if (s(v)) {
          const x = h("http:" + v);
          return x.scheme = "", x.type = 6, x;
        }
        if (o(v)) {
          const x = h("http://foo.com" + v);
          return x.scheme = "", x.host = "", x.type = 5, x;
        }
        if (c(v))
          return m(v);
        if (a(v))
          return h(v);
        const k = h("http://foo.com/" + v);
        return k.scheme = "", k.host = "", k.type = v ? v.startsWith("?") ? 3 : v.startsWith("#") ? 2 : 4 : 1, k;
      }
      function E(v) {
        if (v.endsWith("/.."))
          return v;
        const k = v.lastIndexOf("/");
        return v.slice(0, k + 1);
      }
      function L(v, k) {
        R(k, k.type), v.path === "/" ? v.path = k.path : v.path = E(k.path) + v.path;
      }
      function R(v, k) {
        const x = k <= 4, A = v.path.split("/");
        let I = 1, T = 0, z = !1;
        for (let C = 1; C < A.length; C++) {
          const b = A[C];
          if (!b) {
            z = !0;
            continue;
          }
          if (z = !1, b !== ".") {
            if (b === "..") {
              T ? (z = !0, T--, I--) : x && (A[I++] = b);
              continue;
            }
            A[I++] = b, T++;
          }
        }
        let F = "";
        for (let C = 1; C < I; C++)
          F += "/" + A[C];
        (!F || z && !F.endsWith("/..")) && (F += "/"), v.path = F;
      }
      function S(v, k) {
        if (!v && !k)
          return "";
        const x = g(v);
        let A = x.type;
        if (k && A !== 7) {
          const T = g(k), z = T.type;
          switch (A) {
            case 1:
              x.hash = T.hash;
            // fall through
            case 2:
              x.query = T.query;
            // fall through
            case 3:
            case 4:
              L(x, T);
            // fall through
            case 5:
              x.user = T.user, x.host = T.host, x.port = T.port;
            // fall through
            case 6:
              x.scheme = T.scheme;
          }
          z > A && (A = z);
        }
        R(x, A);
        const I = x.query + x.hash;
        switch (A) {
          // This is impossible, because of the empty checks at the start of the function.
          // case UrlType.Empty:
          case 2:
          case 3:
            return I;
          case 4: {
            const T = x.path.slice(1);
            return T ? f(k || v) && !f(T) ? "./" + T + I : T + I : I || ".";
          }
          case 5:
            return x.path + I;
          default:
            return x.scheme + "//" + x.user + x.host + x.port + x.path + I;
        }
      }
      return S;
    });
  }(kn)), kn.exports;
}
var pd = dd();
const gd = /* @__PURE__ */ tr(pd);
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
  return gd(t, e);
}
class _d {
  constructor({ readFile: e, cacheSize: n = 100 }) {
    if (this.topList = [], this.chunkCache = new Ee({
      cache: new Pn({ maxSize: n }),
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
    const c = this.attrs.makeGetter("Chunk"), f = this.attrs.makeGetter("Sublist"), h = [];
    for (let m = this.binarySearch(e, n, a); m < e.length && m >= 0 && r * s(e[m]) < r * i; m += r) {
      if (e[m][0] === this.lazyClass) {
        const g = c(e[m]), E = this.chunkCache.get(g, g).then((L) => [L, g]);
        h.push(E);
      } else
        yield [e[m], o.concat(m)];
      const p = f(e[m]);
      p && (yield* this.iterateSublist(p, n, i, r, a, s, o.concat(m)));
    }
    for (const m of h) {
      const [p, g] = await m;
      p && (yield* this.iterateSublist(p, n, i, r, a, s, [
        ...o,
        g
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
class wd {
  constructor({ urlTemplate: e, chunkSize: n, length: i, cacheSize: r = 100, readFile: a }, s) {
    if (this.urlTemplate = e, this.chunkSize = n, this.length = i, this.baseUrl = s === void 0 ? "" : s, this.readFile = a, !a)
      throw new Error("must provide readFile callback");
    this.chunkCache = new Ee({
      cache: new Pn({ maxSize: r }),
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
function vd() {
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
    this.dataRootCache = new Ee({
      cache: new Pn({ maxSize: r }),
      fill: this.fetchDataRoot.bind(this)
    });
  }
  makeNCList() {
    return new _d({ readFile: this.readFile });
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
        r.meta[a].lazyArray = new wd({ ...r.meta[a].arrayParams, readFile: this.readFile }, n);
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
    let h = a / f.basesPerBin;
    if (h > 0.9 && Math.abs(h - Math.round(h)) < 1e-4) {
      const p = Math.floor(n / f.basesPerBin);
      h = Math.round(h);
      const g = [];
      for (let E = 0; E < r; E += 1)
        g[E] = 0;
      for await (const [E, L] of f.lazyArray.range(p, p + h * r - 1))
        g[Math.floor((E - p) / h)] += L;
      return { bins: g, stats: c };
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
    var s;
    const r = await this.getDataRoot(e), a = (s = r.attrs) == null ? void 0 : s.accessors();
    for await (const [o, c] of r.nclist.iterate(n, i)) {
      if (!o.decorated) {
        const f = c.join(",");
        this.decorateFeature(a, o, `${e},${f}`);
      }
      yield o;
    }
  }
  // helper method to recursively add .get and .tags methods to a feature and its
  // subfeatures
  decorateFeature(e, n, i, r) {
    n.get = e.get, n.tags = e.tags, n._uniqueID = i, n.id = vd, n._parent = r, n.parent = yd, n.children = bd, (n.get("subfeatures") || []).forEach((a, s) => {
      this.decorateFeature(e, a, `${i}-${s}`, n);
    }), n.decorated = !0;
  }
}
function Be(t) {
  let e = t.length;
  for (; --e >= 0; )
    t[e] = 0;
}
const kd = 3, Ed = 258, Cs = 29, Td = 256, Sd = Td + 1 + Cs, Fs = 30, Ad = 512, Nd = new Array((Sd + 2) * 2);
Be(Nd);
const $d = new Array(Fs * 2);
Be($d);
const Id = new Array(Ad);
Be(Id);
const Rd = new Array(Ed - kd + 1);
Be(Rd);
const Dd = new Array(Cs);
Be(Dd);
const Md = new Array(Fs);
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
var Oi = Od;
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
var ie = Fd, Li = {
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
}, zs = {
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
}, Bs = {
  assign: Bd,
  flattenChunks: Hd
};
let Hs = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Hs = !1;
}
const je = new Uint8Array(256);
for (let t = 0; t < 256; t++)
  je[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
je[254] = je[254] = 1;
var Vd = (t) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode)
    return new TextEncoder().encode(t);
  let e, n, i, r, a, s = t.length, o = 0;
  for (r = 0; r < s; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < s && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), o += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
  for (e = new Uint8Array(o), a = 0, r = 0; a < o; r++)
    n = t.charCodeAt(r), (n & 64512) === 55296 && r + 1 < s && (i = t.charCodeAt(r + 1), (i & 64512) === 56320 && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++)), n < 128 ? e[a++] = n : n < 2048 ? (e[a++] = 192 | n >>> 6, e[a++] = 128 | n & 63) : n < 65536 ? (e[a++] = 224 | n >>> 12, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63) : (e[a++] = 240 | n >>> 18, e[a++] = 128 | n >>> 12 & 63, e[a++] = 128 | n >>> 6 & 63, e[a++] = 128 | n & 63);
  return e;
};
const Pd = (t, e) => {
  if (e < 65534 && t.subarray && Hs)
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
  return Pd(a, r);
}, Gd = (t, e) => {
  e = e || t.length, e > t.length && (e = t.length);
  let n = e - 1;
  for (; n >= 0 && (t[n] & 192) === 128; )
    n--;
  return n < 0 || n === 0 ? e : n + je[t[n]] > e ? n : e;
}, Ci = {
  string2buf: Vd,
  buf2string: Ud,
  utf8border: Gd
};
function Zd() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var qd = Zd;
const un = 16209, Wd = 16191;
var Yd = function(e, n) {
  let i, r, a, s, o, c, f, h, m, p, g, E, L, R, S, v, k, x, A, I, T, z, F, C;
  const b = e.state;
  i = e.next_in, F = e.input, r = i + (e.avail_in - 5), a = e.next_out, C = e.output, s = a - (n - e.avail_out), o = a + (e.avail_out - 257), c = b.dmax, f = b.wsize, h = b.whave, m = b.wnext, p = b.window, g = b.hold, E = b.bits, L = b.lencode, R = b.distcode, S = (1 << b.lenbits) - 1, v = (1 << b.distbits) - 1;
  t:
    do {
      E < 15 && (g += F[i++] << E, E += 8, g += F[i++] << E, E += 8), k = L[g & S];
      e:
        for (; ; ) {
          if (x = k >>> 24, g >>>= x, E -= x, x = k >>> 16 & 255, x === 0)
            C[a++] = k & 65535;
          else if (x & 16) {
            A = k & 65535, x &= 15, x && (E < x && (g += F[i++] << E, E += 8), A += g & (1 << x) - 1, g >>>= x, E -= x), E < 15 && (g += F[i++] << E, E += 8, g += F[i++] << E, E += 8), k = R[g & v];
            n:
              for (; ; ) {
                if (x = k >>> 24, g >>>= x, E -= x, x = k >>> 16 & 255, x & 16) {
                  if (I = k & 65535, x &= 15, E < x && (g += F[i++] << E, E += 8, E < x && (g += F[i++] << E, E += 8)), I += g & (1 << x) - 1, I > c) {
                    e.msg = "invalid distance too far back", b.mode = un;
                    break t;
                  }
                  if (g >>>= x, E -= x, x = a - s, I > x) {
                    if (x = I - x, x > h && b.sane) {
                      e.msg = "invalid distance too far back", b.mode = un;
                      break t;
                    }
                    if (T = 0, z = p, m === 0) {
                      if (T += f - x, x < A) {
                        A -= x;
                        do
                          C[a++] = p[T++];
                        while (--x);
                        T = a - I, z = C;
                      }
                    } else if (m < x) {
                      if (T += f + m - x, x -= m, x < A) {
                        A -= x;
                        do
                          C[a++] = p[T++];
                        while (--x);
                        if (T = 0, m < A) {
                          x = m, A -= x;
                          do
                            C[a++] = p[T++];
                          while (--x);
                          T = a - I, z = C;
                        }
                      }
                    } else if (T += m - x, x < A) {
                      A -= x;
                      do
                        C[a++] = p[T++];
                      while (--x);
                      T = a - I, z = C;
                    }
                    for (; A > 2; )
                      C[a++] = z[T++], C[a++] = z[T++], C[a++] = z[T++], A -= 3;
                    A && (C[a++] = z[T++], A > 1 && (C[a++] = z[T++]));
                  } else {
                    T = a - I;
                    do
                      C[a++] = C[T++], C[a++] = C[T++], C[a++] = C[T++], A -= 3;
                    while (A > 2);
                    A && (C[a++] = C[T++], A > 1 && (C[a++] = C[T++]));
                  }
                } else if ((x & 64) === 0) {
                  k = R[(k & 65535) + (g & (1 << x) - 1)];
                  continue n;
                } else {
                  e.msg = "invalid distance code", b.mode = un;
                  break t;
                }
                break;
              }
          } else if ((x & 64) === 0) {
            k = L[(k & 65535) + (g & (1 << x) - 1)];
            continue e;
          } else if (x & 32) {
            b.mode = Wd;
            break t;
          } else {
            e.msg = "invalid literal/length code", b.mode = un;
            break t;
          }
          break;
        }
    } while (i < r && a < o);
  A = E >> 3, i -= A, E -= A << 3, g &= (1 << E) - 1, e.next_in = i, e.next_out = a, e.avail_in = i < r ? 5 + (r - i) : 5 - (i - r), e.avail_out = a < o ? 257 + (o - a) : 257 - (a - o), b.hold = g, b.bits = E;
};
const Ne = 15, zr = 852, Br = 592, Hr = 0, Kn = 1, Vr = 2, Xd = new Uint16Array([
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
  let f = 0, h = 0, m = 0, p = 0, g = 0, E = 0, L = 0, R = 0, S = 0, v = 0, k, x, A, I, T, z = null, F;
  const C = new Uint16Array(Ne + 1), b = new Uint16Array(Ne + 1);
  let G = null, P, Q, rt;
  for (f = 0; f <= Ne; f++)
    C[f] = 0;
  for (h = 0; h < i; h++)
    C[e[n + h]]++;
  for (g = c, p = Ne; p >= 1 && C[p] === 0; p--)
    ;
  if (g > p && (g = p), p === 0)
    return r[a++] = 1 << 24 | 64 << 16 | 0, r[a++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (m = 1; m < p && C[m] === 0; m++)
    ;
  for (g < m && (g = m), R = 1, f = 1; f <= Ne; f++)
    if (R <<= 1, R -= C[f], R < 0)
      return -1;
  if (R > 0 && (t === Hr || p !== 1))
    return -1;
  for (b[1] = 0, f = 1; f < Ne; f++)
    b[f + 1] = b[f] + C[f];
  for (h = 0; h < i; h++)
    e[n + h] !== 0 && (s[b[e[n + h]]++] = h);
  if (t === Hr ? (z = G = s, F = 20) : t === Kn ? (z = Xd, G = Kd, F = 257) : (z = Jd, G = Qd, F = 0), v = 0, h = 0, f = m, T = a, E = g, L = 0, A = -1, S = 1 << g, I = S - 1, t === Kn && S > zr || t === Vr && S > Br)
    return 1;
  for (; ; ) {
    P = f - L, s[h] + 1 < F ? (Q = 0, rt = s[h]) : s[h] >= F ? (Q = G[s[h] - F], rt = z[s[h] - F]) : (Q = 96, rt = 0), k = 1 << f - L, x = 1 << E, m = x;
    do
      x -= k, r[T + (v >> L) + x] = P << 24 | Q << 16 | rt | 0;
    while (x !== 0);
    for (k = 1 << f - 1; v & k; )
      k >>= 1;
    if (k !== 0 ? (v &= k - 1, v += k) : v = 0, h++, --C[f] === 0) {
      if (f === p)
        break;
      f = e[n + s[h]];
    }
    if (f > g && (v & I) !== A) {
      for (L === 0 && (L = g), T += m, E = f - L, R = 1 << E; E + L < p && (R -= C[E + L], !(R <= 0)); )
        E++, R <<= 1;
      if (S += 1 << E, t === Kn && S > zr || t === Vr && S > Br)
        return 1;
      A = v & I, r[A] = g << 24 | E << 16 | T - a | 0;
    }
  }
  return v !== 0 && (r[T + v] = f - L << 24 | 64 << 16 | 0), o.bits = g, 0;
};
var Ye = jd;
const t0 = 0, Vs = 1, Ps = 2, {
  Z_FINISH: Pr,
  Z_BLOCK: e0,
  Z_TREES: dn,
  Z_OK: Te,
  Z_STREAM_END: n0,
  Z_NEED_DICT: i0,
  Z_STREAM_ERROR: Xt,
  Z_DATA_ERROR: Us,
  Z_MEM_ERROR: Gs,
  Z_BUF_ERROR: r0,
  Z_DEFLATED: Ur
} = zs, Un = 16180, Gr = 16181, Zr = 16182, qr = 16183, Wr = 16184, Yr = 16185, Xr = 16186, Kr = 16187, Jr = 16188, Qr = 16189, Cn = 16190, le = 16191, Jn = 16192, jr = 16193, Qn = 16194, ta = 16195, ea = 16196, na = 16197, ia = 16198, pn = 16199, gn = 16200, ra = 16201, aa = 16202, sa = 16203, oa = 16204, la = 16205, jn = 16206, ca = 16207, fa = 16208, Nt = 16209, Zs = 16210, qs = 16211, a0 = 852, s0 = 592, o0 = 15, l0 = o0, ha = (t) => (t >>> 24 & 255) + (t >>> 8 & 65280) + ((t & 65280) << 8) + ((t & 255) << 24);
function c0() {
  this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Ae = (t) => {
  if (!t)
    return 1;
  const e = t.state;
  return !e || e.strm !== t || e.mode < Un || e.mode > qs ? 1 : 0;
}, Ws = (t) => {
  if (Ae(t))
    return Xt;
  const e = t.state;
  return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = e.wrap & 1), e.mode = Un, e.last = 0, e.havedict = 0, e.flags = -1, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(a0), e.distcode = e.distdyn = new Int32Array(s0), e.sane = 1, e.back = -1, Te;
}, Ys = (t) => {
  if (Ae(t))
    return Xt;
  const e = t.state;
  return e.wsize = 0, e.whave = 0, e.wnext = 0, Ws(t);
}, Xs = (t, e) => {
  let n;
  if (Ae(t))
    return Xt;
  const i = t.state;
  return e < 0 ? (n = 0, e = -e) : (n = (e >> 4) + 5, e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Xt : (i.window !== null && i.wbits !== e && (i.window = null), i.wrap = n, i.wbits = e, Ys(t));
}, Ks = (t, e) => {
  if (!t)
    return Xt;
  const n = new c0();
  t.state = n, n.strm = t, n.window = null, n.mode = Un;
  const i = Xs(t, e);
  return i !== Te && (t.state = null), i;
}, f0 = (t) => Ks(t, l0);
let ua = !0, ti, ei;
const h0 = (t) => {
  if (ua) {
    ti = new Int32Array(512), ei = new Int32Array(32);
    let e = 0;
    for (; e < 144; )
      t.lens[e++] = 8;
    for (; e < 256; )
      t.lens[e++] = 9;
    for (; e < 280; )
      t.lens[e++] = 7;
    for (; e < 288; )
      t.lens[e++] = 8;
    for (Ye(Vs, t.lens, 0, 288, ti, 0, t.work, { bits: 9 }), e = 0; e < 32; )
      t.lens[e++] = 5;
    Ye(Ps, t.lens, 0, 32, ei, 0, t.work, { bits: 5 }), ua = !1;
  }
  t.lencode = ti, t.lenbits = 9, t.distcode = ei, t.distbits = 5;
}, Js = (t, e, n, i) => {
  let r;
  const a = t.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), i >= a.wsize ? (a.window.set(e.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (r = a.wsize - a.wnext, r > i && (r = i), a.window.set(e.subarray(n - i, n - i + r), a.wnext), i -= r, i ? (a.window.set(e.subarray(n - i, n), 0), a.wnext = i, a.whave = a.wsize) : (a.wnext += r, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))), 0;
}, u0 = (t, e) => {
  let n, i, r, a, s, o, c, f, h, m, p, g, E, L, R = 0, S, v, k, x, A, I, T, z;
  const F = new Uint8Array(4);
  let C, b;
  const G = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (Ae(t) || !t.output || !t.input && t.avail_in !== 0)
    return Xt;
  n = t.state, n.mode === le && (n.mode = Jn), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, h = n.bits, m = o, p = c, z = Te;
  t:
    for (; ; )
      switch (n.mode) {
        case Un:
          if (n.wrap === 0) {
            n.mode = Jn;
            break;
          }
          for (; h < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if (n.wrap & 2 && f === 35615) {
            n.wbits === 0 && (n.wbits = 15), n.check = 0, F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ie(n.check, F, 2, 0), f = 0, h = 0, n.mode = Gr;
            break;
          }
          if (n.head && (n.head.done = !1), !(n.wrap & 1) || /* check if zlib header allowed */
          (((f & 255) << 8) + (f >> 8)) % 31) {
            t.msg = "incorrect header check", n.mode = Nt;
            break;
          }
          if ((f & 15) !== Ur) {
            t.msg = "unknown compression method", n.mode = Nt;
            break;
          }
          if (f >>>= 4, h -= 4, T = (f & 15) + 8, n.wbits === 0 && (n.wbits = T), T > 15 || T > n.wbits) {
            t.msg = "invalid window size", n.mode = Nt;
            break;
          }
          n.dmax = 1 << n.wbits, n.flags = 0, t.adler = n.check = 1, n.mode = f & 512 ? Qr : le, f = 0, h = 0;
          break;
        case Gr:
          for (; h < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if (n.flags = f, (n.flags & 255) !== Ur) {
            t.msg = "unknown compression method", n.mode = Nt;
            break;
          }
          if (n.flags & 57344) {
            t.msg = "unknown header flags set", n.mode = Nt;
            break;
          }
          n.head && (n.head.text = f >> 8 & 1), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ie(n.check, F, 2, 0)), f = 0, h = 0, n.mode = Zr;
        /* falls through */
        case Zr:
          for (; h < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          n.head && (n.head.time = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, F[2] = f >>> 16 & 255, F[3] = f >>> 24 & 255, n.check = ie(n.check, F, 4, 0)), f = 0, h = 0, n.mode = qr;
        /* falls through */
        case qr:
          for (; h < 16; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          n.head && (n.head.xflags = f & 255, n.head.os = f >> 8), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ie(n.check, F, 2, 0)), f = 0, h = 0, n.mode = Wr;
        /* falls through */
        case Wr:
          if (n.flags & 1024) {
            for (; h < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            n.length = f, n.head && (n.head.extra_len = f), n.flags & 512 && n.wrap & 4 && (F[0] = f & 255, F[1] = f >>> 8 & 255, n.check = ie(n.check, F, 2, 0)), f = 0, h = 0;
          } else n.head && (n.head.extra = null);
          n.mode = Yr;
        /* falls through */
        case Yr:
          if (n.flags & 1024 && (g = n.length, g > o && (g = o), g && (n.head && (T = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(
            i.subarray(
              a,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              a + g
            ),
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            T
          )), n.flags & 512 && n.wrap & 4 && (n.check = ie(n.check, i, g, a)), o -= g, a += g, n.length -= g), n.length))
            break t;
          n.length = 0, n.mode = Xr;
        /* falls through */
        case Xr:
          if (n.flags & 2048) {
            if (o === 0)
              break t;
            g = 0;
            do
              T = i[a + g++], n.head && T && n.length < 65536 && (n.head.name += String.fromCharCode(T));
            while (T && g < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ie(n.check, i, g, a)), o -= g, a += g, T)
              break t;
          } else n.head && (n.head.name = null);
          n.length = 0, n.mode = Kr;
        /* falls through */
        case Kr:
          if (n.flags & 4096) {
            if (o === 0)
              break t;
            g = 0;
            do
              T = i[a + g++], n.head && T && n.length < 65536 && (n.head.comment += String.fromCharCode(T));
            while (T && g < o);
            if (n.flags & 512 && n.wrap & 4 && (n.check = ie(n.check, i, g, a)), o -= g, a += g, T)
              break t;
          } else n.head && (n.head.comment = null);
          n.mode = Jr;
        /* falls through */
        case Jr:
          if (n.flags & 512) {
            for (; h < 16; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            if (n.wrap & 4 && f !== (n.check & 65535)) {
              t.msg = "header crc mismatch", n.mode = Nt;
              break;
            }
            f = 0, h = 0;
          }
          n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), t.adler = n.check = 0, n.mode = le;
          break;
        case Qr:
          for (; h < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          t.adler = n.check = ha(f), f = 0, h = 0, n.mode = Cn;
        /* falls through */
        case Cn:
          if (n.havedict === 0)
            return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = h, i0;
          t.adler = n.check = 1, n.mode = le;
        /* falls through */
        case le:
          if (e === e0 || e === dn)
            break t;
        /* falls through */
        case Jn:
          if (n.last) {
            f >>>= h & 7, h -= h & 7, n.mode = jn;
            break;
          }
          for (; h < 3; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          switch (n.last = f & 1, f >>>= 1, h -= 1, f & 3) {
            case 0:
              n.mode = jr;
              break;
            case 1:
              if (h0(n), n.mode = pn, e === dn) {
                f >>>= 2, h -= 2;
                break t;
              }
              break;
            case 2:
              n.mode = ea;
              break;
            case 3:
              t.msg = "invalid block type", n.mode = Nt;
          }
          f >>>= 2, h -= 2;
          break;
        case jr:
          for (f >>>= h & 7, h -= h & 7; h < 32; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if ((f & 65535) !== (f >>> 16 ^ 65535)) {
            t.msg = "invalid stored block lengths", n.mode = Nt;
            break;
          }
          if (n.length = f & 65535, f = 0, h = 0, n.mode = Qn, e === dn)
            break t;
        /* falls through */
        case Qn:
          n.mode = ta;
        /* falls through */
        case ta:
          if (g = n.length, g) {
            if (g > o && (g = o), g > c && (g = c), g === 0)
              break t;
            r.set(i.subarray(a, a + g), s), o -= g, a += g, c -= g, s += g, n.length -= g;
            break;
          }
          n.mode = le;
          break;
        case ea:
          for (; h < 14; ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if (n.nlen = (f & 31) + 257, f >>>= 5, h -= 5, n.ndist = (f & 31) + 1, f >>>= 5, h -= 5, n.ncode = (f & 15) + 4, f >>>= 4, h -= 4, n.nlen > 286 || n.ndist > 30) {
            t.msg = "too many length or distance symbols", n.mode = Nt;
            break;
          }
          n.have = 0, n.mode = na;
        /* falls through */
        case na:
          for (; n.have < n.ncode; ) {
            for (; h < 3; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            n.lens[G[n.have++]] = f & 7, f >>>= 3, h -= 3;
          }
          for (; n.have < 19; )
            n.lens[G[n.have++]] = 0;
          if (n.lencode = n.lendyn, n.lenbits = 7, C = { bits: n.lenbits }, z = Ye(t0, n.lens, 0, 19, n.lencode, 0, n.work, C), n.lenbits = C.bits, z) {
            t.msg = "invalid code lengths set", n.mode = Nt;
            break;
          }
          n.have = 0, n.mode = ia;
        /* falls through */
        case ia:
          for (; n.have < n.nlen + n.ndist; ) {
            for (; R = n.lencode[f & (1 << n.lenbits) - 1], S = R >>> 24, v = R >>> 16 & 255, k = R & 65535, !(S <= h); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            if (k < 16)
              f >>>= S, h -= S, n.lens[n.have++] = k;
            else {
              if (k === 16) {
                for (b = S + 2; h < b; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << h, h += 8;
                }
                if (f >>>= S, h -= S, n.have === 0) {
                  t.msg = "invalid bit length repeat", n.mode = Nt;
                  break;
                }
                T = n.lens[n.have - 1], g = 3 + (f & 3), f >>>= 2, h -= 2;
              } else if (k === 17) {
                for (b = S + 3; h < b; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << h, h += 8;
                }
                f >>>= S, h -= S, T = 0, g = 3 + (f & 7), f >>>= 3, h -= 3;
              } else {
                for (b = S + 7; h < b; ) {
                  if (o === 0)
                    break t;
                  o--, f += i[a++] << h, h += 8;
                }
                f >>>= S, h -= S, T = 0, g = 11 + (f & 127), f >>>= 7, h -= 7;
              }
              if (n.have + g > n.nlen + n.ndist) {
                t.msg = "invalid bit length repeat", n.mode = Nt;
                break;
              }
              for (; g--; )
                n.lens[n.have++] = T;
            }
          }
          if (n.mode === Nt)
            break;
          if (n.lens[256] === 0) {
            t.msg = "invalid code -- missing end-of-block", n.mode = Nt;
            break;
          }
          if (n.lenbits = 9, C = { bits: n.lenbits }, z = Ye(Vs, n.lens, 0, n.nlen, n.lencode, 0, n.work, C), n.lenbits = C.bits, z) {
            t.msg = "invalid literal/lengths set", n.mode = Nt;
            break;
          }
          if (n.distbits = 6, n.distcode = n.distdyn, C = { bits: n.distbits }, z = Ye(Ps, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, C), n.distbits = C.bits, z) {
            t.msg = "invalid distances set", n.mode = Nt;
            break;
          }
          if (n.mode = pn, e === dn)
            break t;
        /* falls through */
        case pn:
          n.mode = gn;
        /* falls through */
        case gn:
          if (o >= 6 && c >= 258) {
            t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = h, Yd(t, p), s = t.next_out, r = t.output, c = t.avail_out, a = t.next_in, i = t.input, o = t.avail_in, f = n.hold, h = n.bits, n.mode === le && (n.back = -1);
            break;
          }
          for (n.back = 0; R = n.lencode[f & (1 << n.lenbits) - 1], S = R >>> 24, v = R >>> 16 & 255, k = R & 65535, !(S <= h); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if (v && (v & 240) === 0) {
            for (x = S, A = v, I = k; R = n.lencode[I + ((f & (1 << x + A) - 1) >> x)], S = R >>> 24, v = R >>> 16 & 255, k = R & 65535, !(x + S <= h); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            f >>>= x, h -= x, n.back += x;
          }
          if (f >>>= S, h -= S, n.back += S, n.length = k, v === 0) {
            n.mode = la;
            break;
          }
          if (v & 32) {
            n.back = -1, n.mode = le;
            break;
          }
          if (v & 64) {
            t.msg = "invalid literal/length code", n.mode = Nt;
            break;
          }
          n.extra = v & 15, n.mode = ra;
        /* falls through */
        case ra:
          if (n.extra) {
            for (b = n.extra; h < b; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            n.length += f & (1 << n.extra) - 1, f >>>= n.extra, h -= n.extra, n.back += n.extra;
          }
          n.was = n.length, n.mode = aa;
        /* falls through */
        case aa:
          for (; R = n.distcode[f & (1 << n.distbits) - 1], S = R >>> 24, v = R >>> 16 & 255, k = R & 65535, !(S <= h); ) {
            if (o === 0)
              break t;
            o--, f += i[a++] << h, h += 8;
          }
          if ((v & 240) === 0) {
            for (x = S, A = v, I = k; R = n.distcode[I + ((f & (1 << x + A) - 1) >> x)], S = R >>> 24, v = R >>> 16 & 255, k = R & 65535, !(x + S <= h); ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            f >>>= x, h -= x, n.back += x;
          }
          if (f >>>= S, h -= S, n.back += S, v & 64) {
            t.msg = "invalid distance code", n.mode = Nt;
            break;
          }
          n.offset = k, n.extra = v & 15, n.mode = sa;
        /* falls through */
        case sa:
          if (n.extra) {
            for (b = n.extra; h < b; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            n.offset += f & (1 << n.extra) - 1, f >>>= n.extra, h -= n.extra, n.back += n.extra;
          }
          if (n.offset > n.dmax) {
            t.msg = "invalid distance too far back", n.mode = Nt;
            break;
          }
          n.mode = oa;
        /* falls through */
        case oa:
          if (c === 0)
            break t;
          if (g = p - c, n.offset > g) {
            if (g = n.offset - g, g > n.whave && n.sane) {
              t.msg = "invalid distance too far back", n.mode = Nt;
              break;
            }
            g > n.wnext ? (g -= n.wnext, E = n.wsize - g) : E = n.wnext - g, g > n.length && (g = n.length), L = n.window;
          } else
            L = r, E = s - n.offset, g = n.length;
          g > c && (g = c), c -= g, n.length -= g;
          do
            r[s++] = L[E++];
          while (--g);
          n.length === 0 && (n.mode = gn);
          break;
        case la:
          if (c === 0)
            break t;
          r[s++] = n.length, c--, n.mode = gn;
          break;
        case jn:
          if (n.wrap) {
            for (; h < 32; ) {
              if (o === 0)
                break t;
              o--, f |= i[a++] << h, h += 8;
            }
            if (p -= c, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
            n.flags ? ie(n.check, r, p, s - p) : Oi(n.check, r, p, s - p)), p = c, n.wrap & 4 && (n.flags ? f : ha(f)) !== n.check) {
              t.msg = "incorrect data check", n.mode = Nt;
              break;
            }
            f = 0, h = 0;
          }
          n.mode = ca;
        /* falls through */
        case ca:
          if (n.wrap && n.flags) {
            for (; h < 32; ) {
              if (o === 0)
                break t;
              o--, f += i[a++] << h, h += 8;
            }
            if (n.wrap & 4 && f !== (n.total & 4294967295)) {
              t.msg = "incorrect length check", n.mode = Nt;
              break;
            }
            f = 0, h = 0;
          }
          n.mode = fa;
        /* falls through */
        case fa:
          z = n0;
          break t;
        case Nt:
          z = Us;
          break t;
        case Zs:
          return Gs;
        case qs:
        /* falls through */
        default:
          return Xt;
      }
  return t.next_out = s, t.avail_out = c, t.next_in = a, t.avail_in = o, n.hold = f, n.bits = h, (n.wsize || p !== t.avail_out && n.mode < Nt && (n.mode < jn || e !== Pr)) && Js(t, t.output, t.next_out, p - t.avail_out), m -= t.avail_in, p -= t.avail_out, t.total_in += m, t.total_out += p, n.total += p, n.wrap & 4 && p && (t.adler = n.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
  n.flags ? ie(n.check, r, p, t.next_out - p) : Oi(n.check, r, p, t.next_out - p)), t.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === le ? 128 : 0) + (n.mode === pn || n.mode === Qn ? 256 : 0), (m === 0 && p === 0 || e === Pr) && z === Te && (z = r0), z;
}, d0 = (t) => {
  if (Ae(t))
    return Xt;
  let e = t.state;
  return e.window && (e.window = null), t.state = null, Te;
}, p0 = (t, e) => {
  if (Ae(t))
    return Xt;
  const n = t.state;
  return (n.wrap & 2) === 0 ? Xt : (n.head = e, e.done = !1, Te);
}, g0 = (t, e) => {
  const n = e.length;
  let i, r, a;
  return Ae(t) || (i = t.state, i.wrap !== 0 && i.mode !== Cn) ? Xt : i.mode === Cn && (r = 1, r = Oi(r, e, n, 0), r !== i.check) ? Us : (a = Js(t, e, n, n), a ? (i.mode = Zs, Gs) : (i.havedict = 1, Te));
};
var _0 = Ys, m0 = Xs, w0 = Ws, v0 = f0, y0 = Ks, b0 = u0, x0 = d0, k0 = p0, E0 = g0, T0 = "pako inflate (from Nodeca project)", ce = {
  inflateReset: _0,
  inflateReset2: m0,
  inflateResetKeep: w0,
  inflateInit: v0,
  inflateInit2: y0,
  inflate: b0,
  inflateEnd: x0,
  inflateGetHeader: k0,
  inflateSetDictionary: E0,
  inflateInfo: T0
};
function S0() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var A0 = S0;
const Qs = Object.prototype.toString, {
  Z_NO_FLUSH: N0,
  Z_FINISH: $0,
  Z_OK: tn,
  Z_STREAM_END: ni,
  Z_NEED_DICT: ii,
  Z_STREAM_ERROR: I0,
  Z_DATA_ERROR: da,
  Z_MEM_ERROR: R0
} = zs;
function Gn(t) {
  this.options = Bs.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, t || {});
  const e = this.options;
  e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, e.windowBits === 0 && (e.windowBits = -15)), e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits) && (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && (e.windowBits & 15) === 0 && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new qd(), this.strm.avail_out = 0;
  let n = ce.inflateInit2(
    this.strm,
    e.windowBits
  );
  if (n !== tn)
    throw new Error(Li[n]);
  if (this.header = new A0(), ce.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary == "string" ? e.dictionary = Ci.string2buf(e.dictionary) : Qs.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (n = ce.inflateSetDictionary(this.strm, e.dictionary), n !== tn)))
    throw new Error(Li[n]);
}
Gn.prototype.push = function(t, e) {
  const n = this.strm, i = this.options.chunkSize, r = this.options.dictionary;
  let a, s, o;
  if (this.ended) return !1;
  for (e === ~~e ? s = e : s = e === !0 ? $0 : N0, Qs.call(t) === "[object ArrayBuffer]" ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length; ; ) {
    for (n.avail_out === 0 && (n.output = new Uint8Array(i), n.next_out = 0, n.avail_out = i), a = ce.inflate(n, s), a === ii && r && (a = ce.inflateSetDictionary(n, r), a === tn ? a = ce.inflate(n, s) : a === da && (a = ii)); n.avail_in > 0 && a === ni && n.state.wrap > 0 && t[n.next_in] !== 0; )
      ce.inflateReset(n), a = ce.inflate(n, s);
    switch (a) {
      case I0:
      case da:
      case ii:
      case R0:
        return this.onEnd(a), this.ended = !0, !1;
    }
    if (o = n.avail_out, n.next_out && (n.avail_out === 0 || a === ni))
      if (this.options.to === "string") {
        let c = Ci.utf8border(n.output, n.next_out), f = n.next_out - c, h = Ci.buf2string(n.output, c);
        n.next_out = f, n.avail_out = i - f, f && n.output.set(n.output.subarray(c, c + f), 0), this.onData(h);
      } else
        this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out));
    if (!(a === tn && o === 0)) {
      if (a === ni)
        return a = ce.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
      if (n.avail_in === 0) break;
    }
  }
  return !0;
};
Gn.prototype.onData = function(t) {
  this.chunks.push(t);
};
Gn.prototype.onEnd = function(t) {
  t === tn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Bs.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
};
function D0(t, e) {
  const n = new Gn(e);
  if (n.push(t), n.err) throw n.msg || Li[n.err];
  return n.result;
}
var M0 = D0, O0 = {
  inflate: M0
};
const { inflate: L0 } = O0;
var C0 = L0;
const F0 = { refName: "seq_id" }, z0 = { seq_id: "refName" };
class Fn {
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
    return n && e === "subfeatures" ? n.map((i) => new Fn(i, this)) : n;
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
        (a) => new Fn(a, this).toJSON()
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
async function Ep({
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
    r.push(new Fn(a).toJSON());
  return r;
}
async function Tp({
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
const _n = {};
function pa(t) {
  return (typeof t == "object" && t !== null && "message" in t ? t.message : `${t}`).replace(/\.$/, "");
}
class ve {
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
      const c = await o.arrayBuffer(), f = o.headers.get("content-range"), h = /\/(\d+)$/.exec(f || "");
      return h != null && h[1] && (this._stat = {
        size: parseInt(h[1], 10)
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
var ri = {}, ga;
function de() {
  return ga || (ga = 1, function(t) {
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
        for (var h = 0; h < c; h++)
          a[f + h] = s[o + h];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        var s, o, c, f, h, m;
        for (c = 0, s = 0, o = a.length; s < o; s++)
          c += a[s].length;
        for (m = new Uint8Array(c), f = 0, s = 0, o = a.length; s < o; s++)
          h = a[s], m.set(h, f), f += h.length;
        return m;
      }
    }, r = {
      arraySet: function(a, s, o, c, f) {
        for (var h = 0; h < c; h++)
          a[f + h] = s[o + h];
      },
      // Join array of chunks to single array.
      flattenChunks: function(a) {
        return [].concat.apply([], a);
      }
    };
    t.setTyped = function(a) {
      a ? (t.Buf8 = Uint8Array, t.Buf16 = Uint16Array, t.Buf32 = Int32Array, t.assign(t, i)) : (t.Buf8 = Array, t.Buf16 = Array, t.Buf32 = Array, t.assign(t, r));
    }, t.setTyped(e);
  }(ri)), ri;
}
var $e = {}, Jt = {}, ge = {}, _a;
function V0() {
  if (_a) return ge;
  _a = 1;
  var t = de(), e = 4, n = 0, i = 1, r = 2;
  function a(_) {
    for (var B = _.length; --B >= 0; )
      _[B] = 0;
  }
  var s = 0, o = 1, c = 2, f = 3, h = 258, m = 29, p = 256, g = p + 1 + m, E = 30, L = 19, R = 2 * g + 1, S = 15, v = 16, k = 7, x = 256, A = 16, I = 17, T = 18, z = (
    /* extra bits for each length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
  ), F = (
    /* extra bits for each distance code */
    [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
  ), C = (
    /* extra bits for each bit length code */
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
  ), b = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], G = 512, P = new Array((g + 2) * 2);
  a(P);
  var Q = new Array(E * 2);
  a(Q);
  var rt = new Array(G);
  a(rt);
  var ht = new Array(h - f + 1);
  a(ht);
  var Y = new Array(m);
  a(Y);
  var nt = new Array(E);
  a(nt);
  function U(_, B, V, H, w) {
    this.static_tree = _, this.extra_bits = B, this.extra_base = V, this.elems = H, this.max_length = w, this.has_stree = _ && _.length;
  }
  var st, It, j;
  function mt(_, B) {
    this.dyn_tree = _, this.max_code = 0, this.stat_desc = B;
  }
  function kt(_) {
    return _ < 256 ? rt[_] : rt[256 + (_ >>> 7)];
  }
  function gt(_, B) {
    _.pending_buf[_.pending++] = B & 255, _.pending_buf[_.pending++] = B >>> 8 & 255;
  }
  function et(_, B, V) {
    _.bi_valid > v - V ? (_.bi_buf |= B << _.bi_valid & 65535, gt(_, _.bi_buf), _.bi_buf = B >> v - _.bi_valid, _.bi_valid += V - v) : (_.bi_buf |= B << _.bi_valid & 65535, _.bi_valid += V);
  }
  function ft(_, B, V) {
    et(
      _,
      V[B * 2],
      V[B * 2 + 1]
      /*.Len*/
    );
  }
  function ut(_, B) {
    var V = 0;
    do
      V |= _ & 1, _ >>>= 1, V <<= 1;
    while (--B > 0);
    return V >>> 1;
  }
  function xt(_) {
    _.bi_valid === 16 ? (gt(_, _.bi_buf), _.bi_buf = 0, _.bi_valid = 0) : _.bi_valid >= 8 && (_.pending_buf[_.pending++] = _.bi_buf & 255, _.bi_buf >>= 8, _.bi_valid -= 8);
  }
  function At(_, B) {
    var V = B.dyn_tree, H = B.max_code, w = B.stat_desc.static_tree, $ = B.stat_desc.has_stree, u = B.stat_desc.extra_bits, M = B.stat_desc.extra_base, K = B.stat_desc.max_length, l, D, O, d, y, N, J = 0;
    for (d = 0; d <= S; d++)
      _.bl_count[d] = 0;
    for (V[_.heap[_.heap_max] * 2 + 1] = 0, l = _.heap_max + 1; l < R; l++)
      D = _.heap[l], d = V[V[D * 2 + 1] * 2 + 1] + 1, d > K && (d = K, J++), V[D * 2 + 1] = d, !(D > H) && (_.bl_count[d]++, y = 0, D >= M && (y = u[D - M]), N = V[D * 2], _.opt_len += N * (d + y), $ && (_.static_len += N * (w[D * 2 + 1] + y)));
    if (J !== 0) {
      do {
        for (d = K - 1; _.bl_count[d] === 0; )
          d--;
        _.bl_count[d]--, _.bl_count[d + 1] += 2, _.bl_count[K]--, J -= 2;
      } while (J > 0);
      for (d = K; d !== 0; d--)
        for (D = _.bl_count[d]; D !== 0; )
          O = _.heap[--l], !(O > H) && (V[O * 2 + 1] !== d && (_.opt_len += (d - V[O * 2 + 1]) * V[O * 2], V[O * 2 + 1] = d), D--);
    }
  }
  function St(_, B, V) {
    var H = new Array(S + 1), w = 0, $, u;
    for ($ = 1; $ <= S; $++)
      H[$] = w = w + V[$ - 1] << 1;
    for (u = 0; u <= B; u++) {
      var M = _[u * 2 + 1];
      M !== 0 && (_[u * 2] = ut(H[M]++, M));
    }
  }
  function lt() {
    var _, B, V, H, w, $ = new Array(S + 1);
    for (V = 0, H = 0; H < m - 1; H++)
      for (Y[H] = V, _ = 0; _ < 1 << z[H]; _++)
        ht[V++] = H;
    for (ht[V - 1] = H, w = 0, H = 0; H < 16; H++)
      for (nt[H] = w, _ = 0; _ < 1 << F[H]; _++)
        rt[w++] = H;
    for (w >>= 7; H < E; H++)
      for (nt[H] = w << 7, _ = 0; _ < 1 << F[H] - 7; _++)
        rt[256 + w++] = H;
    for (B = 0; B <= S; B++)
      $[B] = 0;
    for (_ = 0; _ <= 143; )
      P[_ * 2 + 1] = 8, _++, $[8]++;
    for (; _ <= 255; )
      P[_ * 2 + 1] = 9, _++, $[9]++;
    for (; _ <= 279; )
      P[_ * 2 + 1] = 7, _++, $[7]++;
    for (; _ <= 287; )
      P[_ * 2 + 1] = 8, _++, $[8]++;
    for (St(P, g + 1, $), _ = 0; _ < E; _++)
      Q[_ * 2 + 1] = 5, Q[_ * 2] = ut(_, 5);
    st = new U(P, z, p + 1, g, S), It = new U(Q, F, 0, E, S), j = new U(new Array(0), C, 0, L, k);
  }
  function $t(_) {
    var B;
    for (B = 0; B < g; B++)
      _.dyn_ltree[B * 2] = 0;
    for (B = 0; B < E; B++)
      _.dyn_dtree[B * 2] = 0;
    for (B = 0; B < L; B++)
      _.bl_tree[B * 2] = 0;
    _.dyn_ltree[x * 2] = 1, _.opt_len = _.static_len = 0, _.last_lit = _.matches = 0;
  }
  function Bt(_) {
    _.bi_valid > 8 ? gt(_, _.bi_buf) : _.bi_valid > 0 && (_.pending_buf[_.pending++] = _.bi_buf), _.bi_buf = 0, _.bi_valid = 0;
  }
  function Rt(_, B, V, H) {
    Bt(_), gt(_, V), gt(_, ~V), t.arraySet(_.pending_buf, _.window, B, V, _.pending), _.pending += V;
  }
  function ct(_, B, V, H) {
    var w = B * 2, $ = V * 2;
    return _[w] < _[$] || _[w] === _[$] && H[B] <= H[V];
  }
  function _t(_, B, V) {
    for (var H = _.heap[V], w = V << 1; w <= _.heap_len && (w < _.heap_len && ct(B, _.heap[w + 1], _.heap[w], _.depth) && w++, !ct(B, H, _.heap[w], _.depth)); )
      _.heap[V] = _.heap[w], V = w, w <<= 1;
    _.heap[V] = H;
  }
  function at(_, B, V) {
    var H, w, $ = 0, u, M;
    if (_.last_lit !== 0)
      do
        H = _.pending_buf[_.d_buf + $ * 2] << 8 | _.pending_buf[_.d_buf + $ * 2 + 1], w = _.pending_buf[_.l_buf + $], $++, H === 0 ? ft(_, w, B) : (u = ht[w], ft(_, u + p + 1, B), M = z[u], M !== 0 && (w -= Y[u], et(_, w, M)), H--, u = kt(H), ft(_, u, V), M = F[u], M !== 0 && (H -= nt[u], et(_, H, M)));
      while ($ < _.last_lit);
    ft(_, x, B);
  }
  function bt(_, B) {
    var V = B.dyn_tree, H = B.stat_desc.static_tree, w = B.stat_desc.has_stree, $ = B.stat_desc.elems, u, M, K = -1, l;
    for (_.heap_len = 0, _.heap_max = R, u = 0; u < $; u++)
      V[u * 2] !== 0 ? (_.heap[++_.heap_len] = K = u, _.depth[u] = 0) : V[u * 2 + 1] = 0;
    for (; _.heap_len < 2; )
      l = _.heap[++_.heap_len] = K < 2 ? ++K : 0, V[l * 2] = 1, _.depth[l] = 0, _.opt_len--, w && (_.static_len -= H[l * 2 + 1]);
    for (B.max_code = K, u = _.heap_len >> 1; u >= 1; u--)
      _t(_, V, u);
    l = $;
    do
      u = _.heap[
        1
        /*SMALLEST*/
      ], _.heap[
        1
        /*SMALLEST*/
      ] = _.heap[_.heap_len--], _t(
        _,
        V,
        1
        /*SMALLEST*/
      ), M = _.heap[
        1
        /*SMALLEST*/
      ], _.heap[--_.heap_max] = u, _.heap[--_.heap_max] = M, V[l * 2] = V[u * 2] + V[M * 2], _.depth[l] = (_.depth[u] >= _.depth[M] ? _.depth[u] : _.depth[M]) + 1, V[u * 2 + 1] = V[M * 2 + 1] = l, _.heap[
        1
        /*SMALLEST*/
      ] = l++, _t(
        _,
        V,
        1
        /*SMALLEST*/
      );
    while (_.heap_len >= 2);
    _.heap[--_.heap_max] = _.heap[
      1
      /*SMALLEST*/
    ], At(_, B), St(V, K, _.bl_count);
  }
  function X(_, B, V) {
    var H, w = -1, $, u = B[0 * 2 + 1], M = 0, K = 7, l = 4;
    for (u === 0 && (K = 138, l = 3), B[(V + 1) * 2 + 1] = 65535, H = 0; H <= V; H++)
      $ = u, u = B[(H + 1) * 2 + 1], !(++M < K && $ === u) && (M < l ? _.bl_tree[$ * 2] += M : $ !== 0 ? ($ !== w && _.bl_tree[$ * 2]++, _.bl_tree[A * 2]++) : M <= 10 ? _.bl_tree[I * 2]++ : _.bl_tree[T * 2]++, M = 0, w = $, u === 0 ? (K = 138, l = 3) : $ === u ? (K = 6, l = 3) : (K = 7, l = 4));
  }
  function pt(_, B, V) {
    var H, w = -1, $, u = B[0 * 2 + 1], M = 0, K = 7, l = 4;
    for (u === 0 && (K = 138, l = 3), H = 0; H <= V; H++)
      if ($ = u, u = B[(H + 1) * 2 + 1], !(++M < K && $ === u)) {
        if (M < l)
          do
            ft(_, $, _.bl_tree);
          while (--M !== 0);
        else $ !== 0 ? ($ !== w && (ft(_, $, _.bl_tree), M--), ft(_, A, _.bl_tree), et(_, M - 3, 2)) : M <= 10 ? (ft(_, I, _.bl_tree), et(_, M - 3, 3)) : (ft(_, T, _.bl_tree), et(_, M - 11, 7));
        M = 0, w = $, u === 0 ? (K = 138, l = 3) : $ === u ? (K = 6, l = 3) : (K = 7, l = 4);
      }
  }
  function it(_) {
    var B;
    for (X(_, _.dyn_ltree, _.l_desc.max_code), X(_, _.dyn_dtree, _.d_desc.max_code), bt(_, _.bl_desc), B = L - 1; B >= 3 && _.bl_tree[b[B] * 2 + 1] === 0; B--)
      ;
    return _.opt_len += 3 * (B + 1) + 5 + 5 + 4, B;
  }
  function dt(_, B, V, H) {
    var w;
    for (et(_, B - 257, 5), et(_, V - 1, 5), et(_, H - 4, 4), w = 0; w < H; w++)
      et(_, _.bl_tree[b[w] * 2 + 1], 3);
    pt(_, _.dyn_ltree, B - 1), pt(_, _.dyn_dtree, V - 1);
  }
  function vt(_) {
    var B = 4093624447, V;
    for (V = 0; V <= 31; V++, B >>>= 1)
      if (B & 1 && _.dyn_ltree[V * 2] !== 0)
        return n;
    if (_.dyn_ltree[9 * 2] !== 0 || _.dyn_ltree[10 * 2] !== 0 || _.dyn_ltree[13 * 2] !== 0)
      return i;
    for (V = 32; V < p; V++)
      if (_.dyn_ltree[V * 2] !== 0)
        return i;
    return n;
  }
  var Z = !1;
  function Dt(_) {
    Z || (lt(), Z = !0), _.l_desc = new mt(_.dyn_ltree, st), _.d_desc = new mt(_.dyn_dtree, It), _.bl_desc = new mt(_.bl_tree, j), _.bi_buf = 0, _.bi_valid = 0, $t(_);
  }
  function tt(_, B, V, H) {
    et(_, (s << 1) + (H ? 1 : 0), 3), Rt(_, B, V);
  }
  function yt(_) {
    et(_, o << 1, 3), ft(_, x, P), xt(_);
  }
  function Et(_, B, V, H) {
    var w, $, u = 0;
    _.level > 0 ? (_.strm.data_type === r && (_.strm.data_type = vt(_)), bt(_, _.l_desc), bt(_, _.d_desc), u = it(_), w = _.opt_len + 3 + 7 >>> 3, $ = _.static_len + 3 + 7 >>> 3, $ <= w && (w = $)) : w = $ = V + 5, V + 4 <= w && B !== -1 ? tt(_, B, V, H) : _.strategy === e || $ === w ? (et(_, (o << 1) + (H ? 1 : 0), 3), at(_, P, Q)) : (et(_, (c << 1) + (H ? 1 : 0), 3), dt(_, _.l_desc.max_code + 1, _.d_desc.max_code + 1, u + 1), at(_, _.dyn_ltree, _.dyn_dtree)), $t(_), H && Bt(_);
  }
  function Ot(_, B, V) {
    return _.pending_buf[_.d_buf + _.last_lit * 2] = B >>> 8 & 255, _.pending_buf[_.d_buf + _.last_lit * 2 + 1] = B & 255, _.pending_buf[_.l_buf + _.last_lit] = V & 255, _.last_lit++, B === 0 ? _.dyn_ltree[V * 2]++ : (_.matches++, B--, _.dyn_ltree[(ht[V] + p + 1) * 2]++, _.dyn_dtree[kt(B) * 2]++), _.last_lit === _.lit_bufsize - 1;
  }
  return ge._tr_init = Dt, ge._tr_stored_block = tt, ge._tr_flush_block = Et, ge._tr_tally = Ot, ge._tr_align = yt, ge;
}
var ai, ma;
function js() {
  if (ma) return ai;
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
  return ai = t, ai;
}
var si, wa;
function to() {
  if (wa) return si;
  wa = 1;
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
  return si = n, si;
}
var oi, va;
function ir() {
  return va || (va = 1, oi = {
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
  }), oi;
}
var ya;
function P0() {
  if (ya) return Jt;
  ya = 1;
  var t = de(), e = V0(), n = js(), i = to(), r = ir(), a = 0, s = 1, o = 3, c = 4, f = 5, h = 0, m = 1, p = -2, g = -3, E = -5, L = -1, R = 1, S = 2, v = 3, k = 4, x = 0, A = 2, I = 8, T = 9, z = 15, F = 8, C = 29, b = 256, G = b + 1 + C, P = 30, Q = 19, rt = 2 * G + 1, ht = 15, Y = 3, nt = 258, U = nt + Y + 1, st = 32, It = 42, j = 69, mt = 73, kt = 91, gt = 103, et = 113, ft = 666, ut = 1, xt = 2, At = 3, St = 4, lt = 3;
  function $t(l, D) {
    return l.msg = r[D], D;
  }
  function Bt(l) {
    return (l << 1) - (l > 4 ? 9 : 0);
  }
  function Rt(l) {
    for (var D = l.length; --D >= 0; )
      l[D] = 0;
  }
  function ct(l) {
    var D = l.state, O = D.pending;
    O > l.avail_out && (O = l.avail_out), O !== 0 && (t.arraySet(l.output, D.pending_buf, D.pending_out, O, l.next_out), l.next_out += O, D.pending_out += O, l.total_out += O, l.avail_out -= O, D.pending -= O, D.pending === 0 && (D.pending_out = 0));
  }
  function _t(l, D) {
    e._tr_flush_block(l, l.block_start >= 0 ? l.block_start : -1, l.strstart - l.block_start, D), l.block_start = l.strstart, ct(l.strm);
  }
  function at(l, D) {
    l.pending_buf[l.pending++] = D;
  }
  function bt(l, D) {
    l.pending_buf[l.pending++] = D >>> 8 & 255, l.pending_buf[l.pending++] = D & 255;
  }
  function X(l, D, O, d) {
    var y = l.avail_in;
    return y > d && (y = d), y === 0 ? 0 : (l.avail_in -= y, t.arraySet(D, l.input, l.next_in, y, O), l.state.wrap === 1 ? l.adler = n(l.adler, D, y, O) : l.state.wrap === 2 && (l.adler = i(l.adler, D, y, O)), l.next_in += y, l.total_in += y, y);
  }
  function pt(l, D) {
    var O = l.max_chain_length, d = l.strstart, y, N, J = l.prev_length, W = l.nice_match, q = l.strstart > l.w_size - U ? l.strstart - (l.w_size - U) : 0, ot = l.window, Kt = l.w_mask, Mt = l.prev, wt = l.strstart + nt, zt = ot[d + J - 1], Vt = ot[d + J];
    l.prev_length >= l.good_match && (O >>= 2), W > l.lookahead && (W = l.lookahead);
    do
      if (y = D, !(ot[y + J] !== Vt || ot[y + J - 1] !== zt || ot[y] !== ot[d] || ot[++y] !== ot[d + 1])) {
        d += 2, y++;
        do
          ;
        while (ot[++d] === ot[++y] && ot[++d] === ot[++y] && ot[++d] === ot[++y] && ot[++d] === ot[++y] && ot[++d] === ot[++y] && ot[++d] === ot[++y] && ot[++d] === ot[++y] && ot[++d] === ot[++y] && d < wt);
        if (N = nt - (wt - d), d = wt - nt, N > J) {
          if (l.match_start = D, J = N, N >= W)
            break;
          zt = ot[d + J - 1], Vt = ot[d + J];
        }
      }
    while ((D = Mt[D & Kt]) > q && --O !== 0);
    return J <= l.lookahead ? J : l.lookahead;
  }
  function it(l) {
    var D = l.w_size, O, d, y, N, J;
    do {
      if (N = l.window_size - l.lookahead - l.strstart, l.strstart >= D + (D - U)) {
        t.arraySet(l.window, l.window, D, D, 0), l.match_start -= D, l.strstart -= D, l.block_start -= D, d = l.hash_size, O = d;
        do
          y = l.head[--O], l.head[O] = y >= D ? y - D : 0;
        while (--d);
        d = D, O = d;
        do
          y = l.prev[--O], l.prev[O] = y >= D ? y - D : 0;
        while (--d);
        N += D;
      }
      if (l.strm.avail_in === 0)
        break;
      if (d = X(l.strm, l.window, l.strstart + l.lookahead, N), l.lookahead += d, l.lookahead + l.insert >= Y)
        for (J = l.strstart - l.insert, l.ins_h = l.window[J], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[J + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[J + Y - 1]) & l.hash_mask, l.prev[J & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = J, J++, l.insert--, !(l.lookahead + l.insert < Y)); )
          ;
    } while (l.lookahead < U && l.strm.avail_in !== 0);
  }
  function dt(l, D) {
    var O = 65535;
    for (O > l.pending_buf_size - 5 && (O = l.pending_buf_size - 5); ; ) {
      if (l.lookahead <= 1) {
        if (it(l), l.lookahead === 0 && D === a)
          return ut;
        if (l.lookahead === 0)
          break;
      }
      l.strstart += l.lookahead, l.lookahead = 0;
      var d = l.block_start + O;
      if ((l.strstart === 0 || l.strstart >= d) && (l.lookahead = l.strstart - d, l.strstart = d, _t(l, !1), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - U && (_t(l, !1), l.strm.avail_out === 0))
        return ut;
    }
    return l.insert = 0, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? At : St) : (l.strstart > l.block_start && (_t(l, !1), l.strm.avail_out === 0), ut);
  }
  function vt(l, D) {
    for (var O, d; ; ) {
      if (l.lookahead < U) {
        if (it(l), l.lookahead < U && D === a)
          return ut;
        if (l.lookahead === 0)
          break;
      }
      if (O = 0, l.lookahead >= Y && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + Y - 1]) & l.hash_mask, O = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), O !== 0 && l.strstart - O <= l.w_size - U && (l.match_length = pt(l, O)), l.match_length >= Y)
        if (d = e._tr_tally(l, l.strstart - l.match_start, l.match_length - Y), l.lookahead -= l.match_length, l.match_length <= l.max_lazy_match && l.lookahead >= Y) {
          l.match_length--;
          do
            l.strstart++, l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + Y - 1]) & l.hash_mask, O = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart;
          while (--l.match_length !== 0);
          l.strstart++;
        } else
          l.strstart += l.match_length, l.match_length = 0, l.ins_h = l.window[l.strstart], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + 1]) & l.hash_mask;
      else
        d = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++;
      if (d && (_t(l, !1), l.strm.avail_out === 0))
        return ut;
    }
    return l.insert = l.strstart < Y - 1 ? l.strstart : Y - 1, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? At : St) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ut : xt;
  }
  function Z(l, D) {
    for (var O, d, y; ; ) {
      if (l.lookahead < U) {
        if (it(l), l.lookahead < U && D === a)
          return ut;
        if (l.lookahead === 0)
          break;
      }
      if (O = 0, l.lookahead >= Y && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + Y - 1]) & l.hash_mask, O = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = Y - 1, O !== 0 && l.prev_length < l.max_lazy_match && l.strstart - O <= l.w_size - U && (l.match_length = pt(l, O), l.match_length <= 5 && (l.strategy === R || l.match_length === Y && l.strstart - l.match_start > 4096) && (l.match_length = Y - 1)), l.prev_length >= Y && l.match_length <= l.prev_length) {
        y = l.strstart + l.lookahead - Y, d = e._tr_tally(l, l.strstart - 1 - l.prev_match, l.prev_length - Y), l.lookahead -= l.prev_length - 1, l.prev_length -= 2;
        do
          ++l.strstart <= y && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + Y - 1]) & l.hash_mask, O = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart);
        while (--l.prev_length !== 0);
        if (l.match_available = 0, l.match_length = Y - 1, l.strstart++, d && (_t(l, !1), l.strm.avail_out === 0))
          return ut;
      } else if (l.match_available) {
        if (d = e._tr_tally(l, 0, l.window[l.strstart - 1]), d && _t(l, !1), l.strstart++, l.lookahead--, l.strm.avail_out === 0)
          return ut;
      } else
        l.match_available = 1, l.strstart++, l.lookahead--;
    }
    return l.match_available && (d = e._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < Y - 1 ? l.strstart : Y - 1, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? At : St) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ut : xt;
  }
  function Dt(l, D) {
    for (var O, d, y, N, J = l.window; ; ) {
      if (l.lookahead <= nt) {
        if (it(l), l.lookahead <= nt && D === a)
          return ut;
        if (l.lookahead === 0)
          break;
      }
      if (l.match_length = 0, l.lookahead >= Y && l.strstart > 0 && (y = l.strstart - 1, d = J[y], d === J[++y] && d === J[++y] && d === J[++y])) {
        N = l.strstart + nt;
        do
          ;
        while (d === J[++y] && d === J[++y] && d === J[++y] && d === J[++y] && d === J[++y] && d === J[++y] && d === J[++y] && d === J[++y] && y < N);
        l.match_length = nt - (N - y), l.match_length > l.lookahead && (l.match_length = l.lookahead);
      }
      if (l.match_length >= Y ? (O = e._tr_tally(l, 1, l.match_length - Y), l.lookahead -= l.match_length, l.strstart += l.match_length, l.match_length = 0) : (O = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++), O && (_t(l, !1), l.strm.avail_out === 0))
        return ut;
    }
    return l.insert = 0, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? At : St) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ut : xt;
  }
  function tt(l, D) {
    for (var O; ; ) {
      if (l.lookahead === 0 && (it(l), l.lookahead === 0)) {
        if (D === a)
          return ut;
        break;
      }
      if (l.match_length = 0, O = e._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++, O && (_t(l, !1), l.strm.avail_out === 0))
        return ut;
    }
    return l.insert = 0, D === c ? (_t(l, !0), l.strm.avail_out === 0 ? At : St) : l.last_lit && (_t(l, !1), l.strm.avail_out === 0) ? ut : xt;
  }
  function yt(l, D, O, d, y) {
    this.good_length = l, this.max_lazy = D, this.nice_length = O, this.max_chain = d, this.func = y;
  }
  var Et;
  Et = [
    /*      good lazy nice chain */
    new yt(0, 0, 0, 0, dt),
    /* 0 store only */
    new yt(4, 4, 8, 4, vt),
    /* 1 max speed, no lazy matches */
    new yt(4, 5, 16, 8, vt),
    /* 2 */
    new yt(4, 6, 32, 32, vt),
    /* 3 */
    new yt(4, 4, 16, 16, Z),
    /* 4 lazy matches */
    new yt(8, 16, 32, 32, Z),
    /* 5 */
    new yt(8, 16, 128, 128, Z),
    /* 6 */
    new yt(8, 32, 128, 256, Z),
    /* 7 */
    new yt(32, 128, 258, 1024, Z),
    /* 8 */
    new yt(32, 258, 258, 4096, Z)
    /* 9 max compression */
  ];
  function Ot(l) {
    l.window_size = 2 * l.w_size, Rt(l.head), l.max_lazy_match = Et[l.level].max_lazy, l.good_match = Et[l.level].good_length, l.nice_match = Et[l.level].nice_length, l.max_chain_length = Et[l.level].max_chain, l.strstart = 0, l.block_start = 0, l.lookahead = 0, l.insert = 0, l.match_length = l.prev_length = Y - 1, l.match_available = 0, l.ins_h = 0;
  }
  function _() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = I, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(rt * 2), this.dyn_dtree = new t.Buf16((2 * P + 1) * 2), this.bl_tree = new t.Buf16((2 * Q + 1) * 2), Rt(this.dyn_ltree), Rt(this.dyn_dtree), Rt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(ht + 1), this.heap = new t.Buf16(2 * G + 1), Rt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * G + 1), Rt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function B(l) {
    var D;
    return !l || !l.state ? $t(l, p) : (l.total_in = l.total_out = 0, l.data_type = A, D = l.state, D.pending = 0, D.pending_out = 0, D.wrap < 0 && (D.wrap = -D.wrap), D.status = D.wrap ? It : et, l.adler = D.wrap === 2 ? 0 : 1, D.last_flush = a, e._tr_init(D), h);
  }
  function V(l) {
    var D = B(l);
    return D === h && Ot(l.state), D;
  }
  function H(l, D) {
    return !l || !l.state || l.state.wrap !== 2 ? p : (l.state.gzhead = D, h);
  }
  function w(l, D, O, d, y, N) {
    if (!l)
      return p;
    var J = 1;
    if (D === L && (D = 6), d < 0 ? (J = 0, d = -d) : d > 15 && (J = 2, d -= 16), y < 1 || y > T || O !== I || d < 8 || d > 15 || D < 0 || D > 9 || N < 0 || N > k)
      return $t(l, p);
    d === 8 && (d = 9);
    var W = new _();
    return l.state = W, W.strm = l, W.wrap = J, W.gzhead = null, W.w_bits = d, W.w_size = 1 << W.w_bits, W.w_mask = W.w_size - 1, W.hash_bits = y + 7, W.hash_size = 1 << W.hash_bits, W.hash_mask = W.hash_size - 1, W.hash_shift = ~~((W.hash_bits + Y - 1) / Y), W.window = new t.Buf8(W.w_size * 2), W.head = new t.Buf16(W.hash_size), W.prev = new t.Buf16(W.w_size), W.lit_bufsize = 1 << y + 6, W.pending_buf_size = W.lit_bufsize * 4, W.pending_buf = new t.Buf8(W.pending_buf_size), W.d_buf = 1 * W.lit_bufsize, W.l_buf = 3 * W.lit_bufsize, W.level = D, W.strategy = N, W.method = O, V(l);
  }
  function $(l, D) {
    return w(l, D, I, z, F, x);
  }
  function u(l, D) {
    var O, d, y, N;
    if (!l || !l.state || D > f || D < 0)
      return l ? $t(l, p) : p;
    if (d = l.state, !l.output || !l.input && l.avail_in !== 0 || d.status === ft && D !== c)
      return $t(l, l.avail_out === 0 ? E : p);
    if (d.strm = l, O = d.last_flush, d.last_flush = D, d.status === It)
      if (d.wrap === 2)
        l.adler = 0, at(d, 31), at(d, 139), at(d, 8), d.gzhead ? (at(
          d,
          (d.gzhead.text ? 1 : 0) + (d.gzhead.hcrc ? 2 : 0) + (d.gzhead.extra ? 4 : 0) + (d.gzhead.name ? 8 : 0) + (d.gzhead.comment ? 16 : 0)
        ), at(d, d.gzhead.time & 255), at(d, d.gzhead.time >> 8 & 255), at(d, d.gzhead.time >> 16 & 255), at(d, d.gzhead.time >> 24 & 255), at(d, d.level === 9 ? 2 : d.strategy >= S || d.level < 2 ? 4 : 0), at(d, d.gzhead.os & 255), d.gzhead.extra && d.gzhead.extra.length && (at(d, d.gzhead.extra.length & 255), at(d, d.gzhead.extra.length >> 8 & 255)), d.gzhead.hcrc && (l.adler = i(l.adler, d.pending_buf, d.pending, 0)), d.gzindex = 0, d.status = j) : (at(d, 0), at(d, 0), at(d, 0), at(d, 0), at(d, 0), at(d, d.level === 9 ? 2 : d.strategy >= S || d.level < 2 ? 4 : 0), at(d, lt), d.status = et);
      else {
        var J = I + (d.w_bits - 8 << 4) << 8, W = -1;
        d.strategy >= S || d.level < 2 ? W = 0 : d.level < 6 ? W = 1 : d.level === 6 ? W = 2 : W = 3, J |= W << 6, d.strstart !== 0 && (J |= st), J += 31 - J % 31, d.status = et, bt(d, J), d.strstart !== 0 && (bt(d, l.adler >>> 16), bt(d, l.adler & 65535)), l.adler = 1;
      }
    if (d.status === j)
      if (d.gzhead.extra) {
        for (y = d.pending; d.gzindex < (d.gzhead.extra.length & 65535) && !(d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), ct(l), y = d.pending, d.pending === d.pending_buf_size)); )
          at(d, d.gzhead.extra[d.gzindex] & 255), d.gzindex++;
        d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), d.gzindex === d.gzhead.extra.length && (d.gzindex = 0, d.status = mt);
      } else
        d.status = mt;
    if (d.status === mt)
      if (d.gzhead.name) {
        y = d.pending;
        do {
          if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), ct(l), y = d.pending, d.pending === d.pending_buf_size)) {
            N = 1;
            break;
          }
          d.gzindex < d.gzhead.name.length ? N = d.gzhead.name.charCodeAt(d.gzindex++) & 255 : N = 0, at(d, N);
        } while (N !== 0);
        d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), N === 0 && (d.gzindex = 0, d.status = kt);
      } else
        d.status = kt;
    if (d.status === kt)
      if (d.gzhead.comment) {
        y = d.pending;
        do {
          if (d.pending === d.pending_buf_size && (d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), ct(l), y = d.pending, d.pending === d.pending_buf_size)) {
            N = 1;
            break;
          }
          d.gzindex < d.gzhead.comment.length ? N = d.gzhead.comment.charCodeAt(d.gzindex++) & 255 : N = 0, at(d, N);
        } while (N !== 0);
        d.gzhead.hcrc && d.pending > y && (l.adler = i(l.adler, d.pending_buf, d.pending - y, y)), N === 0 && (d.status = gt);
      } else
        d.status = gt;
    if (d.status === gt && (d.gzhead.hcrc ? (d.pending + 2 > d.pending_buf_size && ct(l), d.pending + 2 <= d.pending_buf_size && (at(d, l.adler & 255), at(d, l.adler >> 8 & 255), l.adler = 0, d.status = et)) : d.status = et), d.pending !== 0) {
      if (ct(l), l.avail_out === 0)
        return d.last_flush = -1, h;
    } else if (l.avail_in === 0 && Bt(D) <= Bt(O) && D !== c)
      return $t(l, E);
    if (d.status === ft && l.avail_in !== 0)
      return $t(l, E);
    if (l.avail_in !== 0 || d.lookahead !== 0 || D !== a && d.status !== ft) {
      var q = d.strategy === S ? tt(d, D) : d.strategy === v ? Dt(d, D) : Et[d.level].func(d, D);
      if ((q === At || q === St) && (d.status = ft), q === ut || q === At)
        return l.avail_out === 0 && (d.last_flush = -1), h;
      if (q === xt && (D === s ? e._tr_align(d) : D !== f && (e._tr_stored_block(d, 0, 0, !1), D === o && (Rt(d.head), d.lookahead === 0 && (d.strstart = 0, d.block_start = 0, d.insert = 0))), ct(l), l.avail_out === 0))
        return d.last_flush = -1, h;
    }
    return D !== c ? h : d.wrap <= 0 ? m : (d.wrap === 2 ? (at(d, l.adler & 255), at(d, l.adler >> 8 & 255), at(d, l.adler >> 16 & 255), at(d, l.adler >> 24 & 255), at(d, l.total_in & 255), at(d, l.total_in >> 8 & 255), at(d, l.total_in >> 16 & 255), at(d, l.total_in >> 24 & 255)) : (bt(d, l.adler >>> 16), bt(d, l.adler & 65535)), ct(l), d.wrap > 0 && (d.wrap = -d.wrap), d.pending !== 0 ? h : m);
  }
  function M(l) {
    var D;
    return !l || !l.state ? p : (D = l.state.status, D !== It && D !== j && D !== mt && D !== kt && D !== gt && D !== et && D !== ft ? $t(l, p) : (l.state = null, D === et ? $t(l, g) : h));
  }
  function K(l, D) {
    var O = D.length, d, y, N, J, W, q, ot, Kt;
    if (!l || !l.state || (d = l.state, J = d.wrap, J === 2 || J === 1 && d.status !== It || d.lookahead))
      return p;
    for (J === 1 && (l.adler = n(l.adler, D, O, 0)), d.wrap = 0, O >= d.w_size && (J === 0 && (Rt(d.head), d.strstart = 0, d.block_start = 0, d.insert = 0), Kt = new t.Buf8(d.w_size), t.arraySet(Kt, D, O - d.w_size, d.w_size, 0), D = Kt, O = d.w_size), W = l.avail_in, q = l.next_in, ot = l.input, l.avail_in = O, l.next_in = 0, l.input = D, it(d); d.lookahead >= Y; ) {
      y = d.strstart, N = d.lookahead - (Y - 1);
      do
        d.ins_h = (d.ins_h << d.hash_shift ^ d.window[y + Y - 1]) & d.hash_mask, d.prev[y & d.w_mask] = d.head[d.ins_h], d.head[d.ins_h] = y, y++;
      while (--N);
      d.strstart = y, d.lookahead = Y - 1, it(d);
    }
    return d.strstart += d.lookahead, d.block_start = d.strstart, d.insert = d.lookahead, d.lookahead = 0, d.match_length = d.prev_length = Y - 1, d.match_available = 0, l.next_in = q, l.input = ot, l.avail_in = W, d.wrap = J, h;
  }
  return Jt.deflateInit = $, Jt.deflateInit2 = w, Jt.deflateReset = V, Jt.deflateResetKeep = B, Jt.deflateSetHeader = H, Jt.deflate = u, Jt.deflateEnd = M, Jt.deflateSetDictionary = K, Jt.deflateInfo = "pako deflate (from Nodeca project)", Jt;
}
var _e = {}, ba;
function eo() {
  if (ba) return _e;
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
  i[254] = i[254] = 1, _e.string2buf = function(s) {
    var o, c, f, h, m, p = s.length, g = 0;
    for (h = 0; h < p; h++)
      c = s.charCodeAt(h), (c & 64512) === 55296 && h + 1 < p && (f = s.charCodeAt(h + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), h++)), g += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
    for (o = new t.Buf8(g), m = 0, h = 0; m < g; h++)
      c = s.charCodeAt(h), (c & 64512) === 55296 && h + 1 < p && (f = s.charCodeAt(h + 1), (f & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (f - 56320), h++)), c < 128 ? o[m++] = c : c < 2048 ? (o[m++] = 192 | c >>> 6, o[m++] = 128 | c & 63) : c < 65536 ? (o[m++] = 224 | c >>> 12, o[m++] = 128 | c >>> 6 & 63, o[m++] = 128 | c & 63) : (o[m++] = 240 | c >>> 18, o[m++] = 128 | c >>> 12 & 63, o[m++] = 128 | c >>> 6 & 63, o[m++] = 128 | c & 63);
    return o;
  };
  function a(s, o) {
    if (o < 65534 && (s.subarray && n || !s.subarray && e))
      return String.fromCharCode.apply(null, t.shrinkBuf(s, o));
    for (var c = "", f = 0; f < o; f++)
      c += String.fromCharCode(s[f]);
    return c;
  }
  return _e.buf2binstring = function(s) {
    return a(s, s.length);
  }, _e.binstring2buf = function(s) {
    for (var o = new t.Buf8(s.length), c = 0, f = o.length; c < f; c++)
      o[c] = s.charCodeAt(c);
    return o;
  }, _e.buf2string = function(s, o) {
    var c, f, h, m, p = o || s.length, g = new Array(p * 2);
    for (f = 0, c = 0; c < p; ) {
      if (h = s[c++], h < 128) {
        g[f++] = h;
        continue;
      }
      if (m = i[h], m > 4) {
        g[f++] = 65533, c += m - 1;
        continue;
      }
      for (h &= m === 2 ? 31 : m === 3 ? 15 : 7; m > 1 && c < p; )
        h = h << 6 | s[c++] & 63, m--;
      if (m > 1) {
        g[f++] = 65533;
        continue;
      }
      h < 65536 ? g[f++] = h : (h -= 65536, g[f++] = 55296 | h >> 10 & 1023, g[f++] = 56320 | h & 1023);
    }
    return a(g, f);
  }, _e.utf8border = function(s, o) {
    var c;
    for (o = o || s.length, o > s.length && (o = s.length), c = o - 1; c >= 0 && (s[c] & 192) === 128; )
      c--;
    return c < 0 || c === 0 ? o : c + i[s[c]] > o ? c : o;
  }, _e;
}
var li, xa;
function no() {
  if (xa) return li;
  xa = 1;
  function t() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
  }
  return li = t, li;
}
var ka;
function U0() {
  if (ka) return $e;
  ka = 1;
  var t = P0(), e = de(), n = eo(), i = ir(), r = no(), a = Object.prototype.toString, s = 0, o = 4, c = 0, f = 1, h = 2, m = -1, p = 0, g = 8;
  function E(v) {
    if (!(this instanceof E)) return new E(v);
    this.options = e.assign({
      level: m,
      method: g,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: p,
      to: ""
    }, v || {});
    var k = this.options;
    k.raw && k.windowBits > 0 ? k.windowBits = -k.windowBits : k.gzip && k.windowBits > 0 && k.windowBits < 16 && (k.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new r(), this.strm.avail_out = 0;
    var x = t.deflateInit2(
      this.strm,
      k.level,
      k.method,
      k.windowBits,
      k.memLevel,
      k.strategy
    );
    if (x !== c)
      throw new Error(i[x]);
    if (k.header && t.deflateSetHeader(this.strm, k.header), k.dictionary) {
      var A;
      if (typeof k.dictionary == "string" ? A = n.string2buf(k.dictionary) : a.call(k.dictionary) === "[object ArrayBuffer]" ? A = new Uint8Array(k.dictionary) : A = k.dictionary, x = t.deflateSetDictionary(this.strm, A), x !== c)
        throw new Error(i[x]);
      this._dict_set = !0;
    }
  }
  E.prototype.push = function(v, k) {
    var x = this.strm, A = this.options.chunkSize, I, T;
    if (this.ended)
      return !1;
    T = k === ~~k ? k : k === !0 ? o : s, typeof v == "string" ? x.input = n.string2buf(v) : a.call(v) === "[object ArrayBuffer]" ? x.input = new Uint8Array(v) : x.input = v, x.next_in = 0, x.avail_in = x.input.length;
    do {
      if (x.avail_out === 0 && (x.output = new e.Buf8(A), x.next_out = 0, x.avail_out = A), I = t.deflate(x, T), I !== f && I !== c)
        return this.onEnd(I), this.ended = !0, !1;
      (x.avail_out === 0 || x.avail_in === 0 && (T === o || T === h)) && (this.options.to === "string" ? this.onData(n.buf2binstring(e.shrinkBuf(x.output, x.next_out))) : this.onData(e.shrinkBuf(x.output, x.next_out)));
    } while ((x.avail_in > 0 || x.avail_out === 0) && I !== f);
    return T === o ? (I = t.deflateEnd(this.strm), this.onEnd(I), this.ended = !0, I === c) : (T === h && (this.onEnd(c), x.avail_out = 0), !0);
  }, E.prototype.onData = function(v) {
    this.chunks.push(v);
  }, E.prototype.onEnd = function(v) {
    v === c && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = v, this.msg = this.strm.msg;
  };
  function L(v, k) {
    var x = new E(k);
    if (x.push(v, !0), x.err)
      throw x.msg || i[x.err];
    return x.result;
  }
  function R(v, k) {
    return k = k || {}, k.raw = !0, L(v, k);
  }
  function S(v, k) {
    return k = k || {}, k.gzip = !0, L(v, k);
  }
  return $e.Deflate = E, $e.deflate = L, $e.deflateRaw = R, $e.gzip = S, $e;
}
var Ie = {}, Wt = {}, ci, Ea;
function G0() {
  if (Ea) return ci;
  Ea = 1;
  var t = 30, e = 12;
  return ci = function(i, r) {
    var a, s, o, c, f, h, m, p, g, E, L, R, S, v, k, x, A, I, T, z, F, C, b, G, P;
    a = i.state, s = i.next_in, G = i.input, o = s + (i.avail_in - 5), c = i.next_out, P = i.output, f = c - (r - i.avail_out), h = c + (i.avail_out - 257), m = a.dmax, p = a.wsize, g = a.whave, E = a.wnext, L = a.window, R = a.hold, S = a.bits, v = a.lencode, k = a.distcode, x = (1 << a.lenbits) - 1, A = (1 << a.distbits) - 1;
    t:
      do {
        S < 15 && (R += G[s++] << S, S += 8, R += G[s++] << S, S += 8), I = v[R & x];
        e:
          for (; ; ) {
            if (T = I >>> 24, R >>>= T, S -= T, T = I >>> 16 & 255, T === 0)
              P[c++] = I & 65535;
            else if (T & 16) {
              z = I & 65535, T &= 15, T && (S < T && (R += G[s++] << S, S += 8), z += R & (1 << T) - 1, R >>>= T, S -= T), S < 15 && (R += G[s++] << S, S += 8, R += G[s++] << S, S += 8), I = k[R & A];
              n:
                for (; ; ) {
                  if (T = I >>> 24, R >>>= T, S -= T, T = I >>> 16 & 255, T & 16) {
                    if (F = I & 65535, T &= 15, S < T && (R += G[s++] << S, S += 8, S < T && (R += G[s++] << S, S += 8)), F += R & (1 << T) - 1, F > m) {
                      i.msg = "invalid distance too far back", a.mode = t;
                      break t;
                    }
                    if (R >>>= T, S -= T, T = c - f, F > T) {
                      if (T = F - T, T > g && a.sane) {
                        i.msg = "invalid distance too far back", a.mode = t;
                        break t;
                      }
                      if (C = 0, b = L, E === 0) {
                        if (C += p - T, T < z) {
                          z -= T;
                          do
                            P[c++] = L[C++];
                          while (--T);
                          C = c - F, b = P;
                        }
                      } else if (E < T) {
                        if (C += p + E - T, T -= E, T < z) {
                          z -= T;
                          do
                            P[c++] = L[C++];
                          while (--T);
                          if (C = 0, E < z) {
                            T = E, z -= T;
                            do
                              P[c++] = L[C++];
                            while (--T);
                            C = c - F, b = P;
                          }
                        }
                      } else if (C += E - T, T < z) {
                        z -= T;
                        do
                          P[c++] = L[C++];
                        while (--T);
                        C = c - F, b = P;
                      }
                      for (; z > 2; )
                        P[c++] = b[C++], P[c++] = b[C++], P[c++] = b[C++], z -= 3;
                      z && (P[c++] = b[C++], z > 1 && (P[c++] = b[C++]));
                    } else {
                      C = c - F;
                      do
                        P[c++] = P[C++], P[c++] = P[C++], P[c++] = P[C++], z -= 3;
                      while (z > 2);
                      z && (P[c++] = P[C++], z > 1 && (P[c++] = P[C++]));
                    }
                  } else if ((T & 64) === 0) {
                    I = k[(I & 65535) + (R & (1 << T) - 1)];
                    continue n;
                  } else {
                    i.msg = "invalid distance code", a.mode = t;
                    break t;
                  }
                  break;
                }
            } else if ((T & 64) === 0) {
              I = v[(I & 65535) + (R & (1 << T) - 1)];
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
      } while (s < o && c < h);
    z = S >> 3, s -= z, S -= z << 3, R &= (1 << S) - 1, i.next_in = s, i.next_out = c, i.avail_in = s < o ? 5 + (o - s) : 5 - (s - o), i.avail_out = c < h ? 257 + (h - c) : 257 - (c - h), a.hold = R, a.bits = S;
  }, ci;
}
var fi, Ta;
function Z0() {
  if (Ta) return fi;
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
  ], h = [
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
  return fi = function(p, g, E, L, R, S, v, k) {
    var x = k.bits, A = 0, I = 0, T = 0, z = 0, F = 0, C = 0, b = 0, G = 0, P = 0, Q = 0, rt, ht, Y, nt, U, st = null, It = 0, j, mt = new t.Buf16(e + 1), kt = new t.Buf16(e + 1), gt = null, et = 0, ft, ut, xt;
    for (A = 0; A <= e; A++)
      mt[A] = 0;
    for (I = 0; I < L; I++)
      mt[g[E + I]]++;
    for (F = x, z = e; z >= 1 && mt[z] === 0; z--)
      ;
    if (F > z && (F = z), z === 0)
      return R[S++] = 1 << 24 | 64 << 16 | 0, R[S++] = 1 << 24 | 64 << 16 | 0, k.bits = 1, 0;
    for (T = 1; T < z && mt[T] === 0; T++)
      ;
    for (F < T && (F = T), G = 1, A = 1; A <= e; A++)
      if (G <<= 1, G -= mt[A], G < 0)
        return -1;
    if (G > 0 && (p === r || z !== 1))
      return -1;
    for (kt[1] = 0, A = 1; A < e; A++)
      kt[A + 1] = kt[A] + mt[A];
    for (I = 0; I < L; I++)
      g[E + I] !== 0 && (v[kt[g[E + I]]++] = I);
    if (p === r ? (st = gt = v, j = 19) : p === a ? (st = o, It -= 257, gt = c, et -= 257, j = 256) : (st = f, gt = h, j = -1), Q = 0, I = 0, A = T, U = S, C = F, b = 0, Y = -1, P = 1 << F, nt = P - 1, p === a && P > n || p === s && P > i)
      return 1;
    for (; ; ) {
      ft = A - b, v[I] < j ? (ut = 0, xt = v[I]) : v[I] > j ? (ut = gt[et + v[I]], xt = st[It + v[I]]) : (ut = 96, xt = 0), rt = 1 << A - b, ht = 1 << C, T = ht;
      do
        ht -= rt, R[U + (Q >> b) + ht] = ft << 24 | ut << 16 | xt | 0;
      while (ht !== 0);
      for (rt = 1 << A - 1; Q & rt; )
        rt >>= 1;
      if (rt !== 0 ? (Q &= rt - 1, Q += rt) : Q = 0, I++, --mt[A] === 0) {
        if (A === z)
          break;
        A = g[E + v[I]];
      }
      if (A > F && (Q & nt) !== Y) {
        for (b === 0 && (b = F), U += T, C = A - b, G = 1 << C; C + b < z && (G -= mt[C + b], !(G <= 0)); )
          C++, G <<= 1;
        if (P += 1 << C, p === a && P > n || p === s && P > i)
          return 1;
        Y = Q & nt, R[Y] = F << 24 | C << 16 | U - S | 0;
      }
    }
    return Q !== 0 && (R[U + Q] = A - b << 24 | 64 << 16 | 0), k.bits = F, 0;
  }, fi;
}
var Sa;
function q0() {
  if (Sa) return Wt;
  Sa = 1;
  var t = de(), e = js(), n = to(), i = G0(), r = Z0(), a = 0, s = 1, o = 2, c = 4, f = 5, h = 6, m = 0, p = 1, g = 2, E = -2, L = -3, R = -4, S = -5, v = 8, k = 1, x = 2, A = 3, I = 4, T = 5, z = 6, F = 7, C = 8, b = 9, G = 10, P = 11, Q = 12, rt = 13, ht = 14, Y = 15, nt = 16, U = 17, st = 18, It = 19, j = 20, mt = 21, kt = 22, gt = 23, et = 24, ft = 25, ut = 26, xt = 27, At = 28, St = 29, lt = 30, $t = 31, Bt = 32, Rt = 852, ct = 592, _t = 15, at = _t;
  function bt(w) {
    return (w >>> 24 & 255) + (w >>> 8 & 65280) + ((w & 65280) << 8) + ((w & 255) << 24);
  }
  function X() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function pt(w) {
    var $;
    return !w || !w.state ? E : ($ = w.state, w.total_in = w.total_out = $.total = 0, w.msg = "", $.wrap && (w.adler = $.wrap & 1), $.mode = k, $.last = 0, $.havedict = 0, $.dmax = 32768, $.head = null, $.hold = 0, $.bits = 0, $.lencode = $.lendyn = new t.Buf32(Rt), $.distcode = $.distdyn = new t.Buf32(ct), $.sane = 1, $.back = -1, m);
  }
  function it(w) {
    var $;
    return !w || !w.state ? E : ($ = w.state, $.wsize = 0, $.whave = 0, $.wnext = 0, pt(w));
  }
  function dt(w, $) {
    var u, M;
    return !w || !w.state || (M = w.state, $ < 0 ? (u = 0, $ = -$) : (u = ($ >> 4) + 1, $ < 48 && ($ &= 15)), $ && ($ < 8 || $ > 15)) ? E : (M.window !== null && M.wbits !== $ && (M.window = null), M.wrap = u, M.wbits = $, it(w));
  }
  function vt(w, $) {
    var u, M;
    return w ? (M = new X(), w.state = M, M.window = null, u = dt(w, $), u !== m && (w.state = null), u) : E;
  }
  function Z(w) {
    return vt(w, at);
  }
  var Dt = !0, tt, yt;
  function Et(w) {
    if (Dt) {
      var $;
      for (tt = new t.Buf32(512), yt = new t.Buf32(32), $ = 0; $ < 144; )
        w.lens[$++] = 8;
      for (; $ < 256; )
        w.lens[$++] = 9;
      for (; $ < 280; )
        w.lens[$++] = 7;
      for (; $ < 288; )
        w.lens[$++] = 8;
      for (r(s, w.lens, 0, 288, tt, 0, w.work, { bits: 9 }), $ = 0; $ < 32; )
        w.lens[$++] = 5;
      r(o, w.lens, 0, 32, yt, 0, w.work, { bits: 5 }), Dt = !1;
    }
    w.lencode = tt, w.lenbits = 9, w.distcode = yt, w.distbits = 5;
  }
  function Ot(w, $, u, M) {
    var K, l = w.state;
    return l.window === null && (l.wsize = 1 << l.wbits, l.wnext = 0, l.whave = 0, l.window = new t.Buf8(l.wsize)), M >= l.wsize ? (t.arraySet(l.window, $, u - l.wsize, l.wsize, 0), l.wnext = 0, l.whave = l.wsize) : (K = l.wsize - l.wnext, K > M && (K = M), t.arraySet(l.window, $, u - M, K, l.wnext), M -= K, M ? (t.arraySet(l.window, $, u - M, M, 0), l.wnext = M, l.whave = l.wsize) : (l.wnext += K, l.wnext === l.wsize && (l.wnext = 0), l.whave < l.wsize && (l.whave += K))), 0;
  }
  function _(w, $) {
    var u, M, K, l, D, O, d, y, N, J, W, q, ot, Kt, Mt = 0, wt, zt, Vt, Ut, nn, rn, Ct, qt, Ht = new t.Buf8(4), se, ne, sr = (
      /* permutation of code lengths */
      [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
    );
    if (!w || !w.state || !w.output || !w.input && w.avail_in !== 0)
      return E;
    u = w.state, u.mode === Q && (u.mode = rt), D = w.next_out, K = w.output, d = w.avail_out, l = w.next_in, M = w.input, O = w.avail_in, y = u.hold, N = u.bits, J = O, W = d, qt = m;
    t:
      for (; ; )
        switch (u.mode) {
          case k:
            if (u.wrap === 0) {
              u.mode = rt;
              break;
            }
            for (; N < 16; ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            if (u.wrap & 2 && y === 35615) {
              u.check = 0, Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0), y = 0, N = 0, u.mode = x;
              break;
            }
            if (u.flags = 0, u.head && (u.head.done = !1), !(u.wrap & 1) || /* check if zlib header allowed */
            (((y & 255) << 8) + (y >> 8)) % 31) {
              w.msg = "incorrect header check", u.mode = lt;
              break;
            }
            if ((y & 15) !== v) {
              w.msg = "unknown compression method", u.mode = lt;
              break;
            }
            if (y >>>= 4, N -= 4, Ct = (y & 15) + 8, u.wbits === 0)
              u.wbits = Ct;
            else if (Ct > u.wbits) {
              w.msg = "invalid window size", u.mode = lt;
              break;
            }
            u.dmax = 1 << Ct, w.adler = u.check = 1, u.mode = y & 512 ? G : Q, y = 0, N = 0;
            break;
          case x:
            for (; N < 16; ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            if (u.flags = y, (u.flags & 255) !== v) {
              w.msg = "unknown compression method", u.mode = lt;
              break;
            }
            if (u.flags & 57344) {
              w.msg = "unknown header flags set", u.mode = lt;
              break;
            }
            u.head && (u.head.text = y >> 8 & 1), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0)), y = 0, N = 0, u.mode = A;
          /* falls through */
          case A:
            for (; N < 32; ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            u.head && (u.head.time = y), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, Ht[2] = y >>> 16 & 255, Ht[3] = y >>> 24 & 255, u.check = n(u.check, Ht, 4, 0)), y = 0, N = 0, u.mode = I;
          /* falls through */
          case I:
            for (; N < 16; ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            u.head && (u.head.xflags = y & 255, u.head.os = y >> 8), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0)), y = 0, N = 0, u.mode = T;
          /* falls through */
          case T:
            if (u.flags & 1024) {
              for (; N < 16; ) {
                if (O === 0)
                  break t;
                O--, y += M[l++] << N, N += 8;
              }
              u.length = y, u.head && (u.head.extra_len = y), u.flags & 512 && (Ht[0] = y & 255, Ht[1] = y >>> 8 & 255, u.check = n(u.check, Ht, 2, 0)), y = 0, N = 0;
            } else u.head && (u.head.extra = null);
            u.mode = z;
          /* falls through */
          case z:
            if (u.flags & 1024 && (q = u.length, q > O && (q = O), q && (u.head && (Ct = u.head.extra_len - u.length, u.head.extra || (u.head.extra = new Array(u.head.extra_len)), t.arraySet(
              u.head.extra,
              M,
              l,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              q,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              Ct
            )), u.flags & 512 && (u.check = n(u.check, M, q, l)), O -= q, l += q, u.length -= q), u.length))
              break t;
            u.length = 0, u.mode = F;
          /* falls through */
          case F:
            if (u.flags & 2048) {
              if (O === 0)
                break t;
              q = 0;
              do
                Ct = M[l + q++], u.head && Ct && u.length < 65536 && (u.head.name += String.fromCharCode(Ct));
              while (Ct && q < O);
              if (u.flags & 512 && (u.check = n(u.check, M, q, l)), O -= q, l += q, Ct)
                break t;
            } else u.head && (u.head.name = null);
            u.length = 0, u.mode = C;
          /* falls through */
          case C:
            if (u.flags & 4096) {
              if (O === 0)
                break t;
              q = 0;
              do
                Ct = M[l + q++], u.head && Ct && u.length < 65536 && (u.head.comment += String.fromCharCode(Ct));
              while (Ct && q < O);
              if (u.flags & 512 && (u.check = n(u.check, M, q, l)), O -= q, l += q, Ct)
                break t;
            } else u.head && (u.head.comment = null);
            u.mode = b;
          /* falls through */
          case b:
            if (u.flags & 512) {
              for (; N < 16; ) {
                if (O === 0)
                  break t;
                O--, y += M[l++] << N, N += 8;
              }
              if (y !== (u.check & 65535)) {
                w.msg = "header crc mismatch", u.mode = lt;
                break;
              }
              y = 0, N = 0;
            }
            u.head && (u.head.hcrc = u.flags >> 9 & 1, u.head.done = !0), w.adler = u.check = 0, u.mode = Q;
            break;
          case G:
            for (; N < 32; ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            w.adler = u.check = bt(y), y = 0, N = 0, u.mode = P;
          /* falls through */
          case P:
            if (u.havedict === 0)
              return w.next_out = D, w.avail_out = d, w.next_in = l, w.avail_in = O, u.hold = y, u.bits = N, g;
            w.adler = u.check = 1, u.mode = Q;
          /* falls through */
          case Q:
            if ($ === f || $ === h)
              break t;
          /* falls through */
          case rt:
            if (u.last) {
              y >>>= N & 7, N -= N & 7, u.mode = xt;
              break;
            }
            for (; N < 3; ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            switch (u.last = y & 1, y >>>= 1, N -= 1, y & 3) {
              case 0:
                u.mode = ht;
                break;
              case 1:
                if (Et(u), u.mode = j, $ === h) {
                  y >>>= 2, N -= 2;
                  break t;
                }
                break;
              case 2:
                u.mode = U;
                break;
              case 3:
                w.msg = "invalid block type", u.mode = lt;
            }
            y >>>= 2, N -= 2;
            break;
          case ht:
            for (y >>>= N & 7, N -= N & 7; N < 32; ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            if ((y & 65535) !== (y >>> 16 ^ 65535)) {
              w.msg = "invalid stored block lengths", u.mode = lt;
              break;
            }
            if (u.length = y & 65535, y = 0, N = 0, u.mode = Y, $ === h)
              break t;
          /* falls through */
          case Y:
            u.mode = nt;
          /* falls through */
          case nt:
            if (q = u.length, q) {
              if (q > O && (q = O), q > d && (q = d), q === 0)
                break t;
              t.arraySet(K, M, l, q, D), O -= q, l += q, d -= q, D += q, u.length -= q;
              break;
            }
            u.mode = Q;
            break;
          case U:
            for (; N < 14; ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            if (u.nlen = (y & 31) + 257, y >>>= 5, N -= 5, u.ndist = (y & 31) + 1, y >>>= 5, N -= 5, u.ncode = (y & 15) + 4, y >>>= 4, N -= 4, u.nlen > 286 || u.ndist > 30) {
              w.msg = "too many length or distance symbols", u.mode = lt;
              break;
            }
            u.have = 0, u.mode = st;
          /* falls through */
          case st:
            for (; u.have < u.ncode; ) {
              for (; N < 3; ) {
                if (O === 0)
                  break t;
                O--, y += M[l++] << N, N += 8;
              }
              u.lens[sr[u.have++]] = y & 7, y >>>= 3, N -= 3;
            }
            for (; u.have < 19; )
              u.lens[sr[u.have++]] = 0;
            if (u.lencode = u.lendyn, u.lenbits = 7, se = { bits: u.lenbits }, qt = r(a, u.lens, 0, 19, u.lencode, 0, u.work, se), u.lenbits = se.bits, qt) {
              w.msg = "invalid code lengths set", u.mode = lt;
              break;
            }
            u.have = 0, u.mode = It;
          /* falls through */
          case It:
            for (; u.have < u.nlen + u.ndist; ) {
              for (; Mt = u.lencode[y & (1 << u.lenbits) - 1], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Vt = Mt & 65535, !(wt <= N); ) {
                if (O === 0)
                  break t;
                O--, y += M[l++] << N, N += 8;
              }
              if (Vt < 16)
                y >>>= wt, N -= wt, u.lens[u.have++] = Vt;
              else {
                if (Vt === 16) {
                  for (ne = wt + 2; N < ne; ) {
                    if (O === 0)
                      break t;
                    O--, y += M[l++] << N, N += 8;
                  }
                  if (y >>>= wt, N -= wt, u.have === 0) {
                    w.msg = "invalid bit length repeat", u.mode = lt;
                    break;
                  }
                  Ct = u.lens[u.have - 1], q = 3 + (y & 3), y >>>= 2, N -= 2;
                } else if (Vt === 17) {
                  for (ne = wt + 3; N < ne; ) {
                    if (O === 0)
                      break t;
                    O--, y += M[l++] << N, N += 8;
                  }
                  y >>>= wt, N -= wt, Ct = 0, q = 3 + (y & 7), y >>>= 3, N -= 3;
                } else {
                  for (ne = wt + 7; N < ne; ) {
                    if (O === 0)
                      break t;
                    O--, y += M[l++] << N, N += 8;
                  }
                  y >>>= wt, N -= wt, Ct = 0, q = 11 + (y & 127), y >>>= 7, N -= 7;
                }
                if (u.have + q > u.nlen + u.ndist) {
                  w.msg = "invalid bit length repeat", u.mode = lt;
                  break;
                }
                for (; q--; )
                  u.lens[u.have++] = Ct;
              }
            }
            if (u.mode === lt)
              break;
            if (u.lens[256] === 0) {
              w.msg = "invalid code -- missing end-of-block", u.mode = lt;
              break;
            }
            if (u.lenbits = 9, se = { bits: u.lenbits }, qt = r(s, u.lens, 0, u.nlen, u.lencode, 0, u.work, se), u.lenbits = se.bits, qt) {
              w.msg = "invalid literal/lengths set", u.mode = lt;
              break;
            }
            if (u.distbits = 6, u.distcode = u.distdyn, se = { bits: u.distbits }, qt = r(o, u.lens, u.nlen, u.ndist, u.distcode, 0, u.work, se), u.distbits = se.bits, qt) {
              w.msg = "invalid distances set", u.mode = lt;
              break;
            }
            if (u.mode = j, $ === h)
              break t;
          /* falls through */
          case j:
            u.mode = mt;
          /* falls through */
          case mt:
            if (O >= 6 && d >= 258) {
              w.next_out = D, w.avail_out = d, w.next_in = l, w.avail_in = O, u.hold = y, u.bits = N, i(w, W), D = w.next_out, K = w.output, d = w.avail_out, l = w.next_in, M = w.input, O = w.avail_in, y = u.hold, N = u.bits, u.mode === Q && (u.back = -1);
              break;
            }
            for (u.back = 0; Mt = u.lencode[y & (1 << u.lenbits) - 1], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Vt = Mt & 65535, !(wt <= N); ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            if (zt && (zt & 240) === 0) {
              for (Ut = wt, nn = zt, rn = Vt; Mt = u.lencode[rn + ((y & (1 << Ut + nn) - 1) >> Ut)], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Vt = Mt & 65535, !(Ut + wt <= N); ) {
                if (O === 0)
                  break t;
                O--, y += M[l++] << N, N += 8;
              }
              y >>>= Ut, N -= Ut, u.back += Ut;
            }
            if (y >>>= wt, N -= wt, u.back += wt, u.length = Vt, zt === 0) {
              u.mode = ut;
              break;
            }
            if (zt & 32) {
              u.back = -1, u.mode = Q;
              break;
            }
            if (zt & 64) {
              w.msg = "invalid literal/length code", u.mode = lt;
              break;
            }
            u.extra = zt & 15, u.mode = kt;
          /* falls through */
          case kt:
            if (u.extra) {
              for (ne = u.extra; N < ne; ) {
                if (O === 0)
                  break t;
                O--, y += M[l++] << N, N += 8;
              }
              u.length += y & (1 << u.extra) - 1, y >>>= u.extra, N -= u.extra, u.back += u.extra;
            }
            u.was = u.length, u.mode = gt;
          /* falls through */
          case gt:
            for (; Mt = u.distcode[y & (1 << u.distbits) - 1], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Vt = Mt & 65535, !(wt <= N); ) {
              if (O === 0)
                break t;
              O--, y += M[l++] << N, N += 8;
            }
            if ((zt & 240) === 0) {
              for (Ut = wt, nn = zt, rn = Vt; Mt = u.distcode[rn + ((y & (1 << Ut + nn) - 1) >> Ut)], wt = Mt >>> 24, zt = Mt >>> 16 & 255, Vt = Mt & 65535, !(Ut + wt <= N); ) {
                if (O === 0)
                  break t;
                O--, y += M[l++] << N, N += 8;
              }
              y >>>= Ut, N -= Ut, u.back += Ut;
            }
            if (y >>>= wt, N -= wt, u.back += wt, zt & 64) {
              w.msg = "invalid distance code", u.mode = lt;
              break;
            }
            u.offset = Vt, u.extra = zt & 15, u.mode = et;
          /* falls through */
          case et:
            if (u.extra) {
              for (ne = u.extra; N < ne; ) {
                if (O === 0)
                  break t;
                O--, y += M[l++] << N, N += 8;
              }
              u.offset += y & (1 << u.extra) - 1, y >>>= u.extra, N -= u.extra, u.back += u.extra;
            }
            if (u.offset > u.dmax) {
              w.msg = "invalid distance too far back", u.mode = lt;
              break;
            }
            u.mode = ft;
          /* falls through */
          case ft:
            if (d === 0)
              break t;
            if (q = W - d, u.offset > q) {
              if (q = u.offset - q, q > u.whave && u.sane) {
                w.msg = "invalid distance too far back", u.mode = lt;
                break;
              }
              q > u.wnext ? (q -= u.wnext, ot = u.wsize - q) : ot = u.wnext - q, q > u.length && (q = u.length), Kt = u.window;
            } else
              Kt = K, ot = D - u.offset, q = u.length;
            q > d && (q = d), d -= q, u.length -= q;
            do
              K[D++] = Kt[ot++];
            while (--q);
            u.length === 0 && (u.mode = mt);
            break;
          case ut:
            if (d === 0)
              break t;
            K[D++] = u.length, d--, u.mode = mt;
            break;
          case xt:
            if (u.wrap) {
              for (; N < 32; ) {
                if (O === 0)
                  break t;
                O--, y |= M[l++] << N, N += 8;
              }
              if (W -= d, w.total_out += W, u.total += W, W && (w.adler = u.check = /*UPDATE(state.check, put - _out, _out);*/
              u.flags ? n(u.check, K, W, D - W) : e(u.check, K, W, D - W)), W = d, (u.flags ? y : bt(y)) !== u.check) {
                w.msg = "incorrect data check", u.mode = lt;
                break;
              }
              y = 0, N = 0;
            }
            u.mode = At;
          /* falls through */
          case At:
            if (u.wrap && u.flags) {
              for (; N < 32; ) {
                if (O === 0)
                  break t;
                O--, y += M[l++] << N, N += 8;
              }
              if (y !== (u.total & 4294967295)) {
                w.msg = "incorrect length check", u.mode = lt;
                break;
              }
              y = 0, N = 0;
            }
            u.mode = St;
          /* falls through */
          case St:
            qt = p;
            break t;
          case lt:
            qt = L;
            break t;
          case $t:
            return R;
          case Bt:
          /* falls through */
          default:
            return E;
        }
    return w.next_out = D, w.avail_out = d, w.next_in = l, w.avail_in = O, u.hold = y, u.bits = N, (u.wsize || W !== w.avail_out && u.mode < lt && (u.mode < xt || $ !== c)) && Ot(w, w.output, w.next_out, W - w.avail_out), J -= w.avail_in, W -= w.avail_out, w.total_in += J, w.total_out += W, u.total += W, u.wrap && W && (w.adler = u.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    u.flags ? n(u.check, K, W, w.next_out - W) : e(u.check, K, W, w.next_out - W)), w.data_type = u.bits + (u.last ? 64 : 0) + (u.mode === Q ? 128 : 0) + (u.mode === j || u.mode === Y ? 256 : 0), (J === 0 && W === 0 || $ === c) && qt === m && (qt = S), qt;
  }
  function B(w) {
    if (!w || !w.state)
      return E;
    var $ = w.state;
    return $.window && ($.window = null), w.state = null, m;
  }
  function V(w, $) {
    var u;
    return !w || !w.state || (u = w.state, (u.wrap & 2) === 0) ? E : (u.head = $, $.done = !1, m);
  }
  function H(w, $) {
    var u = $.length, M, K, l;
    return !w || !w.state || (M = w.state, M.wrap !== 0 && M.mode !== P) ? E : M.mode === P && (K = 1, K = e(K, $, u, 0), K !== M.check) ? L : (l = Ot(w, $, u, u), l ? (M.mode = $t, R) : (M.havedict = 1, m));
  }
  return Wt.inflateReset = it, Wt.inflateReset2 = dt, Wt.inflateResetKeep = pt, Wt.inflateInit = Z, Wt.inflateInit2 = vt, Wt.inflate = _, Wt.inflateEnd = B, Wt.inflateGetHeader = V, Wt.inflateSetDictionary = H, Wt.inflateInfo = "pako inflate (from Nodeca project)", Wt;
}
var hi, Aa;
function io() {
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
var ui, Na;
function W0() {
  if (Na) return ui;
  Na = 1;
  function t() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
  }
  return ui = t, ui;
}
var $a;
function Y0() {
  if ($a) return Ie;
  $a = 1;
  var t = q0(), e = de(), n = eo(), i = io(), r = ir(), a = no(), s = W0(), o = Object.prototype.toString;
  function c(m) {
    if (!(this instanceof c)) return new c(m);
    this.options = e.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, m || {});
    var p = this.options;
    p.raw && p.windowBits >= 0 && p.windowBits < 16 && (p.windowBits = -p.windowBits, p.windowBits === 0 && (p.windowBits = -15)), p.windowBits >= 0 && p.windowBits < 16 && !(m && m.windowBits) && (p.windowBits += 32), p.windowBits > 15 && p.windowBits < 48 && (p.windowBits & 15) === 0 && (p.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
    var g = t.inflateInit2(
      this.strm,
      p.windowBits
    );
    if (g !== i.Z_OK)
      throw new Error(r[g]);
    if (this.header = new s(), t.inflateGetHeader(this.strm, this.header), p.dictionary && (typeof p.dictionary == "string" ? p.dictionary = n.string2buf(p.dictionary) : o.call(p.dictionary) === "[object ArrayBuffer]" && (p.dictionary = new Uint8Array(p.dictionary)), p.raw && (g = t.inflateSetDictionary(this.strm, p.dictionary), g !== i.Z_OK)))
      throw new Error(r[g]);
  }
  c.prototype.push = function(m, p) {
    var g = this.strm, E = this.options.chunkSize, L = this.options.dictionary, R, S, v, k, x, A = !1;
    if (this.ended)
      return !1;
    S = p === ~~p ? p : p === !0 ? i.Z_FINISH : i.Z_NO_FLUSH, typeof m == "string" ? g.input = n.binstring2buf(m) : o.call(m) === "[object ArrayBuffer]" ? g.input = new Uint8Array(m) : g.input = m, g.next_in = 0, g.avail_in = g.input.length;
    do {
      if (g.avail_out === 0 && (g.output = new e.Buf8(E), g.next_out = 0, g.avail_out = E), R = t.inflate(g, i.Z_NO_FLUSH), R === i.Z_NEED_DICT && L && (R = t.inflateSetDictionary(this.strm, L)), R === i.Z_BUF_ERROR && A === !0 && (R = i.Z_OK, A = !1), R !== i.Z_STREAM_END && R !== i.Z_OK)
        return this.onEnd(R), this.ended = !0, !1;
      g.next_out && (g.avail_out === 0 || R === i.Z_STREAM_END || g.avail_in === 0 && (S === i.Z_FINISH || S === i.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (v = n.utf8border(g.output, g.next_out), k = g.next_out - v, x = n.buf2string(g.output, v), g.next_out = k, g.avail_out = E - k, k && e.arraySet(g.output, g.output, v, k, 0), this.onData(x)) : this.onData(e.shrinkBuf(g.output, g.next_out))), g.avail_in === 0 && g.avail_out === 0 && (A = !0);
    } while ((g.avail_in > 0 || g.avail_out === 0) && R !== i.Z_STREAM_END);
    return R === i.Z_STREAM_END && (S = i.Z_FINISH), S === i.Z_FINISH ? (R = t.inflateEnd(this.strm), this.onEnd(R), this.ended = !0, R === i.Z_OK) : (S === i.Z_SYNC_FLUSH && (this.onEnd(i.Z_OK), g.avail_out = 0), !0);
  }, c.prototype.onData = function(m) {
    this.chunks.push(m);
  }, c.prototype.onEnd = function(m) {
    m === i.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = e.flattenChunks(this.chunks)), this.chunks = [], this.err = m, this.msg = this.strm.msg;
  };
  function f(m, p) {
    var g = new c(p);
    if (g.push(m, !0), g.err)
      throw g.msg || r[g.err];
    return g.result;
  }
  function h(m, p) {
    return p = p || {}, p.raw = !0, f(m, p);
  }
  return Ie.Inflate = c, Ie.inflate = f, Ie.inflateRaw = h, Ie.ungzip = f, Ie;
}
var di, Ia;
function X0() {
  if (Ia) return di;
  Ia = 1;
  var t = de().assign, e = U0(), n = Y0(), i = io(), r = {};
  return t(r, e, n, i), di = r, di;
}
var K0 = X0();
const J0 = /* @__PURE__ */ tr(K0);
function Q0(t) {
  let e = 0;
  for (const n of t)
    e += n.length;
  return e;
}
function ro(t) {
  const e = new Uint8Array(Q0(t));
  let n = 0;
  for (const i of t)
    e.set(i, n), n += i.length;
  return e;
}
const { Z_SYNC_FLUSH: ao, Inflate: so } = J0;
async function rr(t) {
  try {
    let e, n = 0, i;
    const r = [];
    do {
      const a = t.subarray(n);
      if (i = new so(), { strm: e } = i, i.push(a, ao), i.err)
        throw new Error(i.msg);
      n += e.next_in, r.push(i.result);
    } while (e.avail_in);
    return ro(r);
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
    let h = 0;
    do {
      const m = t.subarray(a - i.blockPosition), p = new so();
      if ({ strm: n } = p, p.push(m, ao), p.err)
        throw new Error(p.msg);
      const g = p.result;
      o.push(g);
      let E = g.length;
      c.push(a), f.push(s), o.length === 1 && i.dataPosition && (o[0] = o[0].subarray(i.dataPosition), E = o[0].length);
      const L = a;
      if (a += n.next_in, s += E, L >= r.blockPosition) {
        o[h] = o[h].subarray(0, r.blockPosition === i.blockPosition ? r.dataPosition - i.dataPosition + 1 : r.dataPosition + 1), c.push(a), f.push(s);
        break;
      }
      h++;
    } while (n.avail_in);
    return {
      buffer: ro(o),
      cpositions: c,
      dpositions: f
    };
  } catch (n) {
    throw /incorrect header check/.exec(`${n}`) ? new Error("problem decompressing block: incorrect gzip header check") : n;
  }
}
class zn {
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
class oo {
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
const Ra = 65536, tp = Ra * Ra;
function lo(t, e = 0) {
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
function co(t, e) {
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
function Da(t, e) {
  return Math.floor(t / 2 ** e);
}
class pi extends oo {
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
    }, c = i.getInt32(n + 16, !0), f = c ? String.fromCharCode(c) : null, h = i.getInt32(n + 20, !0), m = i.getInt32(n + 24, !0), { refIdToName: p, refNameToId: g } = this._parseNameBytes(e.subarray(n + 28, n + 28 + m));
    return {
      refIdToName: p,
      refNameToId: g,
      skipLines: h,
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
    let f, h = 16 + s + 4;
    const m = new Array(c).fill(0).map(() => {
      const p = i.getInt32(h, !0);
      h += 4;
      const g = {};
      let E;
      for (let L = 0; L < p; L += 1) {
        const R = i.getUint32(h, !0);
        if (R > this.maxBinNumber)
          E = this.parsePseudoBin(n, h + 4), h += 48;
        else {
          const S = Oe(n, h + 4);
          f = this._findFirstData(f, S);
          const v = i.getInt32(h + 12, !0);
          h += 16;
          const k = new Array(v);
          for (let x = 0; x < v; x += 1) {
            const A = Oe(n, h), I = Oe(n, h + 8);
            h += 16, k[x] = new zn(A, I, R);
          }
          g[R] = k;
        }
      }
      return { binIndex: g, stats: E };
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
      lineCount: lo(e, n + 28)
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
    for (const [h, m] of c)
      for (let p = h; p <= m; p++)
        if (o.binIndex[p])
          for (const g of o.binIndex[p])
            f.push(new zn(g.minv, g.maxv, p));
    return co(f, new ar(0, 0));
  }
  /**
   * calculate the list of bins that may overlap with region [beg,end) (zero-based half-open)
   */
  reg2bins(e, n) {
    e -= 1, e < 1 && (e = 1), n > 2 ** 50 && (n = 2 ** 34), n -= 1;
    let i = 0, r = 0, a = this.minShift + this.depth * 3;
    const s = [];
    for (; i <= this.depth; a -= 3, r += sp(1, i * 3), i += 1) {
      const o = r + Da(e, a), c = r + Da(n, a);
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
class Pe extends oo {
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
    const s = r.getUint32(4, !0), o = r.getUint32(8, !0), c = o & 65536 ? "zero-based-half-open" : "1-based-closed", h = {
      0: "generic",
      1: "SAM",
      2: "VCF"
    }[o & 15];
    if (!h)
      throw new Error(`invalid Tabix preset format flags ${o}`);
    const m = {
      ref: r.getInt32(12, !0),
      start: r.getInt32(16, !0),
      end: r.getInt32(20, !0)
    }, p = r.getInt32(24, !0), g = 5, E = ((1 << (g + 1) * 3) - 1) / 7, L = 2 ** (14 + g * 3), R = p ? String.fromCharCode(p) : null, S = r.getInt32(28, !0), v = r.getInt32(32, !0), { refNameToId: k, refIdToName: x } = this._parseNameBytes(i.slice(36, 36 + v));
    let A = 36 + v, I;
    return {
      indices: new Array(s).fill(0).map(() => {
        const z = r.getInt32(A, !0);
        A += 4;
        const F = {};
        let C;
        for (let P = 0; P < z; P += 1) {
          const Q = r.getUint32(A, !0);
          if (A += 4, Q > E + 1)
            throw new Error("tabix index contains too many bins, please use a CSI index");
          if (Q === E + 1) {
            const rt = r.getInt32(A, !0);
            A += 4, rt === 2 && (C = this.parsePseudoBin(i, A)), A += 16 * rt;
          } else {
            const rt = r.getInt32(A, !0);
            A += 4;
            const ht = new Array(rt);
            for (let Y = 0; Y < rt; Y += 1) {
              const nt = Oe(i, A), U = Oe(i, A + 8);
              A += 16, I = this._findFirstData(I, nt), ht[Y] = new zn(nt, U, Q);
            }
            F[Q] = ht;
          }
        }
        const b = r.getInt32(A, !0);
        A += 4;
        const G = new Array(b);
        for (let P = 0; P < b; P += 1)
          G[P] = Oe(i, A), A += 8, I = this._findFirstData(I, G[P]);
        return {
          binIndex: F,
          linearIndex: G,
          stats: C
        };
      }),
      metaChar: R,
      maxBinNumber: E,
      maxRefLength: L,
      skipLines: S,
      firstDataLine: I,
      columnNumbers: m,
      coordinateType: c,
      format: h,
      refIdToName: x,
      refNameToId: k,
      maxBlockSize: 65536
    };
  }
  parsePseudoBin(e, n) {
    return {
      lineCount: lo(e, n + 16)
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
    const f = lp(n, i), h = [];
    for (const [L, R] of f)
      for (let S = L; S <= R; S++)
        if (o.binIndex[S])
          for (const v of o.binIndex[S])
            h.push(new zn(v.minv, v.maxv, S));
    const m = o.linearIndex.length;
    let p = null;
    const g = Math.min(n >> 14, m - 1), E = Math.min(i >> 14, m - 1);
    for (let L = g; L <= E; ++L) {
      const R = o.linearIndex[L];
      R && (!p || R.compareTo(p) < 0) && (p = R);
    }
    return co(h, p);
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
  constructor({ path: e, filehandle: n, url: i, tbiPath: r, tbiUrl: a, tbiFilehandle: s, csiPath: o, csiUrl: c, csiFilehandle: f, renameRefSeqs: h = (p) => p, chunkCacheSize: m = 5 * 2 ** 20 }) {
    if (n)
      this.filehandle = n;
    else if (e)
      this.filehandle = new _n(e);
    else if (i)
      this.filehandle = new ve(i);
    else
      throw new TypeError("must provide either filehandle or path");
    if (s)
      this.index = new Pe({
        filehandle: s,
        renameRefSeqs: h
      });
    else if (f)
      this.index = new pi({
        filehandle: f,
        renameRefSeqs: h
      });
    else if (r)
      this.index = new Pe({
        filehandle: new _n(r),
        renameRefSeqs: h
      });
    else if (o)
      this.index = new pi({
        filehandle: new _n(o),
        renameRefSeqs: h
      });
    else if (e)
      this.index = new Pe({
        filehandle: new _n(`${e}.tbi`),
        renameRefSeqs: h
      });
    else if (c)
      this.index = new pi({
        filehandle: new ve(c)
      });
    else if (a)
      this.index = new Pe({
        filehandle: new ve(a)
      });
    else if (i)
      this.index = new Pe({
        filehandle: new ve(`${i}.tbi`)
      });
    else
      throw new TypeError("must provide one of tbiFilehandle, tbiPath, csiFilehandle, csiPath, tbiUrl, csiUrl");
    this.renameRefSeq = h, this.chunkCache = new Ee({
      cache: new Pn({ maxSize: Math.floor(m / 65536) }),
      fill: (p, g) => this.readChunk(p, { signal: g })
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
    const f = n ?? 0, h = i ?? c.maxRefLength;
    if (!(f <= h))
      throw new TypeError("invalid start and end coordinates. start must be less than or equal to end");
    if (f === h)
      return;
    const m = await this.index.blocksForRange(e, f, h, s);
    We(a);
    const p = new TextDecoder("utf8");
    for (const g of m) {
      const { buffer: E, cpositions: L, dpositions: R } = await this.chunkCache.get(g.toString(), g, a);
      We(a);
      let S = 0, v = 0;
      const k = p.decode(E), x = cp(k);
      for (; S < k.length; ) {
        let A, I;
        if (x) {
          if (I = k.indexOf(`
`, S), I === -1)
            break;
          A = k.slice(S, I);
        } else {
          if (I = E.indexOf(10, S), I === -1)
            break;
          const F = E.slice(S, I);
          A = p.decode(F);
        }
        if (R) {
          for (; S + g.minv.dataPosition >= R[v++]; )
            ;
          v--;
        }
        const { startCoordinate: T, overlaps: z } = this.checkLine(c, e, f, h, A);
        if (z)
          o(
            A,
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
            L[v] * 256 + (S - R[v]) + g.minv.dataPosition + 1
          );
        else if (T !== void 0 && T >= h)
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
    We(e.signal);
    const a = ((n == null ? void 0 : n.blockPosition) || 0) + r, s = await this.filehandle.read(a, 0, e), o = await rr(s);
    if (i) {
      let c = -1;
      const f = 10, h = i.charCodeAt(0);
      for (let m = 0; m < o.length && !(m === c + 1 && o[m] !== h); m += 1)
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
    let { ref: h, start: m, end: p } = s;
    h || (h = 0), m || (m = 0), p || (p = 0), f === "VCF" && (p = 8);
    const g = Math.max(h, m, p);
    let E = 1, L = 0, R = "", S = -1 / 0;
    const v = a.length;
    for (let k = 0; k < v + 1; k++)
      if (a[k] === "	" || k === v) {
        if (E === h) {
          if (this.renameRefSeq(a.slice(L, k)) !== n)
            return {
              overlaps: !1
            };
        } else if (E === m) {
          if (S = parseInt(a.slice(L, k), 10), c === "1-based-closed" && (S -= 1), S >= r)
            return {
              startCoordinate: S,
              overlaps: !1
            };
          if ((p === 0 || p === m) && S + 1 <= i)
            return {
              startCoordinate: S,
              overlaps: !1
            };
        } else if (f === "VCF" && E === 4)
          R = a.slice(L, k);
        else if (E === p && (f === "VCF" ? this._getVcfEnd(S, R, a.slice(L, k)) : Number.parseInt(a.slice(L, k), 10)) <= i)
          return {
            overlaps: !1
          };
        if (L = k + 1, E += 1, E > g)
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
function hp(t, e, n) {
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
          const f = i[a++], h = f.indexOf(":");
          r[c] = h !== -1 ? f.slice(0, h) : f;
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
function up(t) {
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
  return Object.fromEntries(up(e).map((n) => {
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
function gp(t) {
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}
class _p {
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
        for (let h = 0; h < f.length; h++) {
          const m = f[h];
          i[c][a[h]] = m === "" || m === "." ? void 0 : m.split(",").map((p) => p === "." ? void 0 : s[h] ? +p : p);
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
    var I;
    let n = 0;
    for (let T = 0; n < e.length && (e[n] === "	" && (T += 1), T !== 9); n += 1)
      ;
    const i = e.slice(0, n).split("	"), r = e.slice(n + 1), [a, s, o, c, f, h, m] = i, p = a, g = +s, E = o === "." ? void 0 : o.split(";"), L = c, R = f === "." ? void 0 : f.split(","), S = h === "." ? void 0 : +h, v = m === "." ? void 0 : m.split(";"), k = i[8];
    if (this.strict && !i[7])
      throw new Error("no INFO field specified, must contain at least a '.' (turn off strict mode to allow)");
    const x = (I = i[7]) == null ? void 0 : I.includes("%"), A = i[7] === void 0 || i[7] === "." ? {} : Object.fromEntries(i[7].split(";").map((T) => {
      const [z, F] = T.split("="), C = F == null ? void 0 : F.split(",").map((G) => G === "." ? void 0 : G).map((G) => G && x ? gp(G) : G), b = this.getMetadata("INFO", z, "Type");
      return b === "Integer" || b === "Float" ? [
        z,
        C == null ? void 0 : C.map((G) => G === void 0 ? void 0 : Number(G))
      ] : b === "Flag" ? [z, !0] : [z, C ?? !0];
    }));
    return {
      CHROM: p,
      POS: g,
      ALT: R,
      INFO: A,
      REF: L,
      FILTER: v && v.length === 1 && v[0] === "PASS" ? "PASS" : v,
      ID: E,
      QUAL: S,
      FORMAT: k,
      SAMPLES: () => this.parseSamples(i[8] ?? "", r),
      GENOTYPES: () => hp(i[8] ?? "", r, this.samples)
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
const wp = {
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
function vp(t, e, n) {
  if (!e || e.length === 0)
    return ["remark", "no alternative alleles"];
  const i = /* @__PURE__ */ new Set();
  let r = /* @__PURE__ */ new Set();
  if (e.forEach((a) => {
    let [s, o] = fo(a, n);
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
        const c = a.map((f) => f.split("->").map((h) => h.trim())).map((f) => f[1] && f[0] === o ? f[1] : "").filter((f) => !!f);
        return c.length ? `${o} -> ${c.join(",")}` : o;
      })
    );
  }
  return i.size ? [[...i].join(","), [...r].join(",")] : [];
}
function fo(t, e) {
  if (typeof t == "string" && !t.startsWith("<"))
    return [];
  let n = wp[t];
  if (!n && e.getMetadata("ALT", t) && (n = "sequence_variant"), n)
    return [n, t];
  const i = t.split(":");
  return i.length > 1 ? fo(`<${i.slice(0, -1).join(":")}>`, e) : [];
}
function yp(t, e) {
  if (mp(e))
    return ["breakend", e];
  if (t.length === 1 && e.length === 1)
    return ["SNV", Re("SNV", t, e)];
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
    return t.split("").reverse().join("") === e ? ["inversion", Re("inversion", t, e)] : ["substitution", Re("substitution", t, e)];
  if (t.length <= e.length) {
    const i = e.length - t.length, r = i.toLocaleString("en-US");
    return [
      "insertion",
      i > 5 ? `${r}bp INS` : Re("insertion", t, e)
    ];
  }
  if (t.length > e.length) {
    const i = t.length - e.length, r = i.toLocaleString("en-US");
    return [
      "deletion",
      i > 5 ? `${r}bp DEL` : Re("deletion", t, e)
    ];
  }
  return ["indel", Re("indel", t, e)];
}
function Re(t, e, n) {
  return `${t} ${e} -> ${n}`;
}
function bp(t, e) {
  const { REF: n = "", ALT: i, POS: r, CHROM: a, ID: s } = t, o = r - 1, [c, f] = vp(n, i, e);
  return {
    refName: a,
    start: o,
    end: xp(t),
    description: f,
    type: c,
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
    tbiFilehandle: n === "TBI" ? new ve(r) : void 0,
    csiFilehandle: n === "CSI" ? new ve(r) : void 0,
    filehandle: new ve(t)
  }), s = new _p({
    header: await a.getHeader()
  }), o = [];
  let c = 0;
  return await a.getLines(i.chromosome, i.start, i.end, {
    lineCallback: (f) => {
      const h = s.parseLine(f), m = new kp({
        variant: h,
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
        type: Oa(p.soTerm[0]) ?? m.get("type"),
        ...Object.fromEntries(
          Object.entries(p).map(([g, E]) => [
            g,
            {
              values: [JSON.stringify(E.map((L) => Oa(L)))]
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
  return Tt(this.nodes()[0]);
};
Se.prototype.last = function() {
  return Tt(this.nodes()[this.size() - 1]);
};
class Np {
  constructor(e, n, i, r) {
    this.height = r, this.width = i, this.config = e, this.svg_target = n, this.viewer = this._initViewer(n), this.draw();
  }
  generateLegend() {
    return Ih();
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
    console.log("🎨 setSelectedAlleles called:", {
      selectedAlleles: e,
      target: n,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    const i = Tt(n);
    i.selectAll(".highlight").remove();
    const r = i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    );
    console.log("🎨 Found variant elements:", {
      count: r.size(),
      elements: r.nodes()
    }), r.each(function(a) {
      console.log("🎨 Variant element data:", {
        data: a,
        element: this,
        class: this.getAttribute("class")
      });
    }), i.selectAll(
      ".variant-deletion,.variant-SNV,.variant-insertion,.variant-delins"
    ).filter((a) => a.selected === "true").style("stroke", null).datum((a) => (a.selected = "false", a)), Xi(e, i);
  }
  _initViewer(e) {
    Tt(e).selectAll("*").remove();
    const n = Tt(e), r = `${e.replace("#", "")} main-view`, a = {
      top: 8,
      right: 30,
      bottom: 30,
      left: 40
    };
    return n.attr("width", this.width).attr("height", this.height).append("g").attr("transform", `translate(${a.left},${a.top})`).attr("class", r), this.width = this.width - a.left - a.right, this.height = this.height - a.top - a.bottom, Tt(`${e} .main-view`);
  }
  getTracks(e) {
    return e ? this.tracks[0] : this.tracks;
  }
  draw() {
    const e = this.width, n = this.config.transcriptTypes ?? kh, i = this.config.variantTypes ?? Eh, r = this.config.binRatio ?? 0.01, a = this.config.region, s = this._configureRange(
      a.start,
      a.end,
      e
    ), o = s.range, c = a.chromosome, f = this.config.variantFilter ?? [], h = this.config.isoformFilter ?? [], m = this.config.htpVariant ?? "", p = s.start, g = s.end;
    new Lh({
      viewer: this.viewer,
      track: {
        chromosome: c,
        start: p,
        end: g,
        range: s.range
      },
      height: this.height,
      width: e
    }).DrawOverviewTrack();
    let R = 100;
    const S = this.config.showVariantLabel ?? !0, { viewer: v, genome: k, height: x, tracks: A } = this;
    A.map((I) => {
      const { variantData: T, trackData: z } = I;
      if (I.type === Ve.ISOFORM_AND_VARIANT) {
        const F = new Dh({
          viewer: v,
          height: x,
          width: e,
          transcriptTypes: n,
          variantTypes: i,
          showVariantLabel: S,
          trackData: z,
          variantData: T,
          variantFilter: f,
          binRatio: r,
          isoformFilter: h
        });
        R += F.DrawTrack();
      } else if (I.type === Ve.ISOFORM_EMBEDDED_VARIANT) {
        const F = new Mh({
          viewer: v,
          height: x,
          width: e,
          transcriptTypes: n,
          variantData: T,
          trackData: z,
          variantTypes: i,
          showVariantLabel: S,
          variantFilter: f
        });
        R += F.DrawTrack();
      } else if (I.type === Ve.ISOFORM) {
        const F = new Oh({
          region: a,
          viewer: v,
          height: x,
          width: e,
          genome: k,
          trackData: z,
          transcriptTypes: n,
          htpVariant: m
        });
        R += F.DrawTrack();
      } else I.type === Ve.VARIANT ? new ad({
        region: a,
        viewer: v,
        range: o,
        height: x,
        width: e
      }).DrawTrack() : I.type === Ve.VARIANT_GLOBAL ? new sd({
        region: a,
        viewer: v,
        track: {
          ...I,
          range: o
        },
        height: x,
        width: e
      }).DrawTrack() : console.error(`TrackType not found ${I.type}`);
      Tt(this.svg_target).attr("height", R);
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
        Tt("#clip-rect").node().getBoundingClientRect().width / 2 + 100
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
  Np as GenomeFeatureViewer,
  Tp as fetchApolloAPIData,
  Ep as fetchNCListData,
  Sp as fetchTabixVcfData,
  Ap as parseLocString
};
