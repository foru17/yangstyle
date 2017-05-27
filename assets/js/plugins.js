/*
 * FitVids 1.1
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 */
! function(t) {
	"use strict";
	t.fn.fitVids = function(e) {
		var i = {
			customSelector: null
		};
		if (!document.getElementById("fit-vids-style")) {
			var r = document.head || document.getElementsByTagName("head")[0],
				d = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
				a = document.createElement("div");
			a.innerHTML = '<p>x</p><style id="fit-vids-style">' + d + "</style>", r.appendChild(a.childNodes[1])
		}
		return e && t.extend(i, e), this.each(function() {
			var e = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
			i.customSelector && e.push(i.customSelector);
			var r = t(this).find(e.join(","));
			r = r.not("object object"), r.each(function() {
				var e = t(this);
				if (!("embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
					var i = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height(),
						r = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10),
						d = i / r;
					if (!e.attr("id")) {
						var a = "fitvid" + Math.floor(999999 * Math.random());
						e.attr("id", a)
					}
					e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * d + "%"), e.removeAttr("height").removeAttr("width")
				}
			})
		})
	}
}(window.jQuery || window.Zepto);

/* Rainbow v2.1.2 rainbowco.de | included languages: c, coffeescript, css, generic, html, java, javascript, php, python, ruby */
! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Rainbow = t()
}(this, function() {
	"use strict";

	function e() {
		return "undefined" != typeof module && "object" == typeof module.exports
	}

	function t() {
		return "undefined" == typeof document && "undefined" != typeof self
	}

	function n(e) {
		var t = e.getAttribute("data-language") || e.parentNode.getAttribute("data-language");
		if (!t) {
			var n = /\blang(?:uage)?-(\w+)/,
				r = e.className.match(n) || e.parentNode.className.match(n);
			r && (t = r[1])
		}
		return t ? t.toLowerCase() : null
	}

	function r(e, t, n, r) {
		return (n !== e || r !== t) && (n <= e && r >= t)
	}

	function a(e) {
		return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&(?![\w\#]+;)/g, "&amp;")
	}

	function o(e, t) {
		for (var n = 0, r = 1; r < t; ++r) e[r] && (n += e[r].length);
		return n
	}

	function i(e, t, n, r) {
		return n >= e && n < t || r > e && r < t
	}

	function u(e) {
		var t = [];
		for (var n in e) e.hasOwnProperty(n) && t.push(n);
		return t.sort(function(e, t) {
			return t - e
		})
	}

	function c(e, t, n, r) {
		var a = r.substr(e);
		return r.substr(0, e) + a.replace(t, n)
	}

	function s(t, n) {
		if (e()) return global.Worker = require("webworker-threads").Worker, new Worker(__filename);
		var s = n.toString(),
			f = u.toString();
		f += a.toString(), f += r.toString(), f += i.toString(), f += c.toString(), f += o.toString(), f += s;
		var l = s.match(/function (\w+?)\(/)[1],
			d = t.toString();
		d = d.replace(/=new \w+/, "= new " + l);
		var g = f + "\tthis.onmessage =" + d,
			m = new Blob([g], {
				type: "text/javascript"
			});
		return new Worker((window.URL || window.webkitURL).createObjectURL(m))
	}

	function f(e) {
		function t() {
			self.postMessage({
				id: n.id,
				lang: n.lang,
				result: a
			})
		}
		var n = e.data,
			r = new C(n.options),
			a = r.refract(n.code, n.lang);
		return n.isNode ? (t(), void self.close()) : void setTimeout(function() {
			t()
		}, 1e3 * n.options.delay)
	}

	function l() {
		return (R || null === j) && (j = s(f, C)), j
	}

	function d(e, t) {
		function n(a) {
			a.data.id === e.id && (t(a.data), r.removeEventListener("message", n))
		}
		var r = l();
		r.addEventListener("message", n), r.postMessage(e)
	}

	function g(e, t, n) {
		return function(r) {
			e.innerHTML = r.result, e.classList.remove("loading"), "PRE" === e.parentNode.tagName && e.parentNode.classList.remove("loading"), M && M(e, r.lang), 0 === --t.c && n()
		}
	}

	function m(e) {
		return {
			patterns: S,
			inheritenceMap: T,
			aliases: x,
			globalClass: e.globalClass,
			delay: isNaN(e.delay) ? 0 : e.delay
		}
	}

	function v(e, t) {
		var n = {};
		"object" == typeof t && (n = t, t = n.language), t = x[t] || t;
		var r = {
			id: String.fromCharCode(65 + Math.floor(26 * Math.random())) + Date.now(),
			code: e,
			lang: t,
			options: m(n),
			isNode: R
		};
		return r
	}

	function p(e, t) {
		for (var r = {
				c: 0
			}, a = 0, o = e; a < o.length; a += 1) {
			var i = o[a],
				u = n(i);
			if (!i.classList.contains("rainbow") && u) {
				i.classList.add("loading"), i.classList.add("rainbow"), "PRE" === i.parentNode.tagName && i.parentNode.classList.add("loading");
				var c = i.getAttribute("data-global-class"),
					s = parseInt(i.getAttribute("data-delay"), 10);
				++r.c, d(v(i.innerHTML, {
					language: u,
					globalClass: c,
					delay: s
				}), g(i, r, t))
			}
		}
		0 === r.c && t()
	}

	function h(e) {
		var t = document.createElement("div");
		t.className = "preloader";
		for (var n = 0; n < 7; n++) t.appendChild(document.createElement("div"));
		e.appendChild(t)
	}

	function b(e, t) {
		t = t || function() {}, e = e && "function" == typeof e.getElementsByTagName ? e : document;
		for (var n = e.getElementsByTagName("pre"), r = e.getElementsByTagName("code"), a = [], o = [], i = 0, u = n; i < u.length; i += 1) {
			var c = u[i];
			h(c), c.getElementsByTagName("code").length ? c.getAttribute("data-trimmed") || (c.setAttribute("data-trimmed", !0), c.innerHTML = c.innerHTML.trim()) : a.push(c)
		}
		for (var s = 0, f = r; s < f.length; s += 1) {
			var l = f[s];
			o.push(l)
		}
		p(o.concat(a), t)
	}

	function w(e) {
		M = e
	}

	function y(e, t, n) {
		T[e] || (T[e] = n), S[e] = t.concat(S[e] || [])
	}

	function N(e) {
		delete T[e], delete S[e]
	}

	function L() {
		for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
		if ("string" == typeof e[0]) {
			var n = v(e[0], e[1]);
			return void d(n, function(e) {
				return function(t) {
					e && e(t.result, t.lang)
				}
			}(e[2]))
		}
		return "function" == typeof e[0] ? void b(0, e[0]) : void b(e[0], e[1])
	}

	function E(e, t) {
		x[e] = t
	}
	var M, C = function H(e) {
			function t(e, t) {
				for (var n in h)
					if (n = parseInt(n, 10), r(n, h[n], e, t) && (delete h[n], delete p[n]), i(n, h[n], e, t)) return !0;
				return !1
			}

			function n(t, n) {
				var r = t.replace(/\./g, " "),
					a = e.globalClass;
				return a && (r += " " + a), '<span class="' + r + '">' + n + "</span>"
			}

			function s(e) {
				for (var t = u(p), n = 0, r = t; n < r.length; n += 1) {
					var a = r[n],
						o = p[a];
					e = c(a, o.replace, o["with"], e)
				}
				return e
			}

			function f(e) {
				var t = "";
				return e.ignoreCase && (t += "i"), e.multiline && (t += "m"), new RegExp(e.source, t)
			}

			function l(r, a, i) {
				function s(e) {
					return r.name && (e = n(r.name, e)), p[w] = {
						replace: m[0],
						"with": e
					}, h[w] = y, !g && {
						remaining: a.substr(y - i),
						offset: y
					}
				}

				function l(t) {
					var a = m[t];
					if (a) {
						var i = r.matches[t],
							u = i.language,
							s = i.name && i.matches ? i.matches : i,
							f = function(e, r, a) {
								b = c(o(m, t), e, a ? n(a, r) : r, b)
							};
						if ("string" == typeof i) return void f(a, a, i);
						var l, d = new H(e);
						if (u) return l = d.refract(a, u), void f(a, l);
						l = d.refract(a, v, s.length ? s : [s]), f(a, l, i.matches ? i.name : 0)
					}
				}
				void 0 === i && (i = 0);
				var d = r.pattern;
				if (!d) return !1;
				var g = !d.global;
				d = f(d);
				var m = d.exec(a);
				if (!m) return !1;
				!r.name && r.matches && "string" == typeof r.matches[0] && (r.name = r.matches[0], delete r.matches[0]);
				var b = m[0],
					w = m.index + i,
					y = m[0].length + w;
				if (w === y) return !1;
				if (t(w, y)) return {
					remaining: a.substr(y - i),
					offset: y
				};
				for (var N = u(r.matches), L = 0, E = N; L < E.length; L += 1) {
					var M = E[L];
					l(M)
				}
				return s(b)
			}

			function d(e, t) {
				for (var n = 0, r = t; n < r.length; n += 1)
					for (var a = r[n], o = l(a, e); o;) o = l(a, o.remaining, o.offset);
				return s(e)
			}

			function g(t) {
				for (var n = e.patterns[t] || []; e.inheritenceMap[t];) t = e.inheritenceMap[t], n = n.concat(e.patterns[t] || []);
				return n
			}

			function m(e, t, n) {
				return v = t, n = n || g(t), d(a(e), n)
			}
			var v, p = {},
				h = {};
			this.refract = m
		},
		S = {},
		T = {},
		x = {},
		A = {},
		R = e(),
		k = t(),
		j = null;
	A = {
		extend: y,
		remove: N,
		onHighlight: w,
		addAlias: E,
		color: L
	}, R && (A.colorSync = function(e, t) {
		var n = v(e, t),
			r = new C(n.options);
		return r.refract(n.code, n.lang)
	}), R || k || document.addEventListener("DOMContentLoaded", function(e) {
		A.defer || A.color(e)
	}, !1), k && (self.onmessage = f);
	var B = A;
	return B
});
Rainbow.extend("c", [{
	name: "meta.preprocessor",
	matches: {
		1: [{
			matches: {
				1: "keyword.define",
				2: "entity.name"
			},
			pattern: /(\w+)\s(\w+)\b/g
		}, {
			name: "keyword.define",
			pattern: /endif/g
		}, {
			name: "constant.numeric",
			pattern: /\d+/g
		}, {
			matches: {
				1: "keyword.include",
				2: "string"
			},
			pattern: /(include)\s(.*?)$/g
		}]
	},
	pattern: /\#([\S\s]*?)$/gm
}, {
	name: "keyword",
	pattern: /\b(do|goto|typedef)\b/g
}, {
	name: "entity.label",
	pattern: /\w+:/g
}, {
	matches: {
		1: "storage.type",
		3: "storage.type",
		4: "entity.name.function"
	},
	pattern: /\b((un)?signed|const)? ?(void|char|short|int|long|float|double)\*? +((\w+)(?= ?\())?/g
}, {
	matches: {
		2: "entity.name.function"
	},
	pattern: /(\w|\*) +((\w+)(?= ?\())/g
}, {
	name: "storage.modifier",
	pattern: /\b(static|extern|auto|register|volatile|inline)\b/g
}, {
	name: "support.type",
	pattern: /\b(struct|union|enum)\b/g
}], "generic"), Rainbow.extend("coffeescript", [{
	name: "comment.block",
	pattern: /(\#{3})[\s\S]*\1/gm
}, {
	name: "string.block",
	pattern: /('{3}|"{3})[\s\S]*\1/gm
}, {
	name: "string.regex",
	matches: {
		2: {
			name: "comment",
			pattern: /\#(.*?)(?=\n)/g
		}
	},
	pattern: /(\/{3})([\s\S]*)\1/gm
}, {
	matches: {
		1: "keyword"
	},
	pattern: /\b(in|when|is|isnt|of|not|unless|until|super)(?=\b)/gi
}, {
	name: "keyword.operator",
	pattern: /\?/g
}, {
	name: "constant.language",
	pattern: /\b(undefined|yes|on|no|off)\b/g
}, {
	name: "keyword.variable.coffee",
	pattern: /@(\w+)/gi
}, {
	name: "reset",
	pattern: /object|class|print/gi
}, {
	matches: {
		1: "entity.name.function",
		2: "keyword.operator",
		3: {
			name: "function.argument.coffee",
			pattern: /([\@\w]+)/g
		},
		4: "keyword.function"
	},
	pattern: /(\w+)\s{0,}(=|:)\s{0,}\((.*?)((-|=)&gt;)/gi
}, {
	matches: {
		1: {
			name: "function.argument.coffee",
			pattern: /([\@\w]+)/g
		},
		2: "keyword.function"
	},
	pattern: /\s\((.*?)\)\s{0,}((-|=)&gt;)/gi
}, {
	matches: {
		1: "entity.name.function",
		2: "keyword.operator",
		3: "keyword.function"
	},
	pattern: /(\w+)\s{0,}(=|:)\s{0,}((-|=)&gt;)/gi
}, {
	matches: {
		1: "storage.class",
		2: "entity.name.class",
		3: "storage.modifier.extends",
		4: "entity.other.inherited-class"
	},
	pattern: /\b(class)\s(\w+)(\sextends\s)?([\w\\]*)?\b/g
}, {
	matches: {
		1: "keyword.new",
		2: {
			name: "support.class",
			pattern: /\w+/g
		}
	},
	pattern: /\b(new)\s(.*?)(?=\s)/g
}], "generic"), Rainbow.addAlias("coffee", "coffeescript"), Rainbow.extend("css", [{
	name: "comment",
	pattern: /\/\*[\s\S]*?\*\//gm
}, {
	name: "constant.hex-color",
	pattern: /#([a-f0-9]{3}|[a-f0-9]{6})(?=;|\s|,|\))/gi
}, {
	matches: {
		1: "constant.numeric",
		2: "keyword.unit"
	},
	pattern: /(\d+)(px|em|cm|s|%)?/g
}, {
	name: "string",
	pattern: /('|")(.*?)\1/g
}, {
	name: "support.css-property",
	matches: {
		1: "support.vendor-prefix"
	},
	pattern: /(-o-|-moz-|-webkit-|-ms-)?[\w-]+(?=\s?:)(?!.*\{)/g
}, {
	matches: {
		1: [{
			name: "entity.name.sass",
			pattern: /&amp;/g
		}, {
			name: "direct-descendant",
			pattern: /&gt;/g
		}, {
			name: "entity.name.class",
			pattern: /\.[\w\-_]+/g
		}, {
			name: "entity.name.id",
			pattern: /\#[\w\-_]+/g
		}, {
			name: "entity.name.pseudo",
			pattern: /:[\w\-_]+/g
		}, {
			name: "entity.name.tag",
			pattern: /\w+/g
		}]
	},
	pattern: /([\w\ ,\n:\.\#\&\;\-_]+)(?=.*\{)/g
}, {
	matches: {
		2: "support.vendor-prefix",
		3: "support.css-value"
	},
	pattern: /(:|,)\s*(-o-|-moz-|-webkit-|-ms-)?([a-zA-Z-]*)(?=\b)(?!.*\{)/g
}]), Rainbow.addAlias("scss", "css"), Rainbow.extend("generic", [{
	matches: {
		1: [{
			name: "keyword.operator",
			pattern: /\=|\+/g
		}, {
			name: "keyword.dot",
			pattern: /\./g
		}],
		2: {
			name: "string",
			matches: {
				name: "constant.character.escape",
				pattern: /\\('|"){1}/g
			}
		}
	},
	pattern: /(\(|\s|\[|\=|:|\+|\.|\{|,)(('|")([^\\\1]|\\.)*?(\3))/gm
}, {
	name: "comment",
	pattern: /\/\*[\s\S]*?\*\/|(\/\/|\#)(?!.*('|").*?[^:](\/\/|\#)).*?$/gm
}, {
	name: "constant.numeric",
	pattern: /\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi
}, {
	matches: {
		1: "keyword"
	},
	pattern: /\b(and|array|as|b(ool(ean)?|reak)|c(ase|atch|har|lass|on(st|tinue))|d(ef|elete|o(uble)?)|e(cho|lse(if)?|xit|xtends|xcept)|f(inally|loat|or(each)?|unction)|global|if|import|int(eger)?|long|new|object|or|pr(int|ivate|otected)|public|return|self|st(ring|ruct|atic)|switch|th(en|is|row)|try|(un)?signed|var|void|while)(?=\b)/gi
}, {
	name: "constant.language",
	pattern: /true|false|null/g
}, {
	name: "keyword.operator",
	pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g
}, {
	matches: {
		1: "function.call"
	},
	pattern: /(\w+?)(?=\()/g
}, {
	matches: {
		1: "storage.function",
		2: "entity.name.function"
	},
	pattern: /(function)\s(.*?)(?=\()/g
}]), Rainbow.extend("html", [{
	name: "source.php.embedded",
	matches: {
		1: "variable.language.php-tag",
		2: {
			language: "php"
		},
		3: "variable.language.php-tag"
	},
	pattern: /(&lt;\?php|&lt;\?=?(?!xml))([\s\S]*?)(\?&gt;)/gm
}, {
	name: "source.css.embedded",
	matches: {
		1: {
			matches: {
				1: "support.tag.style",
				2: [{
					name: "entity.tag.style",
					pattern: /^style/g
				}, {
					name: "string",
					pattern: /('|")(.*?)(\1)/g
				}, {
					name: "entity.tag.style.attribute",
					pattern: /(\w+)/g
				}],
				3: "support.tag.style"
			},
			pattern: /(&lt;\/?)(style.*?)(&gt;)/g
		},
		2: {
			language: "css"
		},
		3: "support.tag.style",
		4: "entity.tag.style",
		5: "support.tag.style"
	},
	pattern: /(&lt;style.*?&gt;)([\s\S]*?)(&lt;\/)(style)(&gt;)/gm
}, {
	name: "source.js.embedded",
	matches: {
		1: {
			matches: {
				1: "support.tag.script",
				2: [{
					name: "entity.tag.script",
					pattern: /^script/g
				}, {
					name: "string",
					pattern: /('|")(.*?)(\1)/g
				}, {
					name: "entity.tag.script.attribute",
					pattern: /(\w+)/g
				}],
				3: "support.tag.script"
			},
			pattern: /(&lt;\/?)(script.*?)(&gt;)/g
		},
		2: {
			language: "javascript"
		},
		3: "support.tag.script",
		4: "entity.tag.script",
		5: "support.tag.script"
	},
	pattern: /(&lt;script(?! src).*?&gt;)([\s\S]*?)(&lt;\/)(script)(&gt;)/gm
}, {
	name: "comment.html",
	pattern: /&lt;\!--[\S\s]*?--&gt;/g
}, {
	matches: {
		1: "support.tag.open",
		2: "support.tag.close"
	},
	pattern: /(&lt;)|(\/?\??&gt;)/g
}, {
	name: "support.tag",
	matches: {
		1: "support.tag",
		2: "support.tag.special",
		3: "support.tag-name"
	},
	pattern: /(&lt;\??)(\/|\!?)(\w+)/g
}, {
	matches: {
		1: "support.attribute"
	},
	pattern: /([a-z-]+)(?=\=)/gi
}, {
	matches: {
		1: "support.operator",
		2: "string.quote",
		3: "string.value",
		4: "string.quote"
	},
	pattern: /(=)('|")(.*?)(\2)/g
}, {
	matches: {
		1: "support.operator",
		2: "support.value"
	},
	pattern: /(=)([a-zA-Z\-0-9]*)\b/g
}, {
	matches: {
		1: "support.attribute"
	},
	pattern: /\s([\w-]+)(?=\s|&gt;)(?![\s\S]*&lt;)/g
}]), Rainbow.addAlias("xml", "html"), Rainbow.extend("java", [{
	name: "constant",
	pattern: /\b(false|null|true|[A-Z_]+)\b/g
}, {
	matches: {
		1: "keyword",
		2: "support.namespace"
	},
	pattern: /(import|package)\s(.+)/g
}, {
	name: "keyword",
	pattern: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/g
}, {
	name: "string",
	pattern: /(".*?")/g
}, {
	name: "char",
	pattern: /(')(.|\\.|\\u[\dA-Fa-f]{4})\1/g
}, {
	name: "integer",
	pattern: /\b(0x[\da-f]+|\d+)L?\b/g
}, {
	name: "comment",
	pattern: /\/\*[\s\S]*?\*\/|(\/\/).*?$/gm
}, {
	name: "support.annotation",
	pattern: /@\w+/g
}, {
	matches: {
		1: "entity.function"
	},
	pattern: /([^@\.\s]+)\(/g
}, {
	name: "entity.class",
	pattern: /\b([A-Z]\w*)\b/g
}, {
	name: "operator",
	pattern: /(\+{1,2}|-{1,2}|~|!|\*|\/|%|(?:&lt;){1,2}|(?:&gt;){1,3}|instanceof|(?:&amp;){1,2}|\^|\|{1,2}|\?|:|(?:=|!|\+|-|\*|\/|%|\^|\||(?:&lt;){1,2}|(?:&gt;){1,3})?=)/g
}]), Rainbow.extend("javascript", [{
	name: "selector",
	pattern: /\$(?=\.|\()/g
}, {
	name: "support",
	pattern: /\b(window|document)\b/g
}, {
	name: "keyword",
	pattern: /\b(export|default|from)\b/g
}, {
	name: "function.call",
	pattern: /\b(then)(?=\()/g
}, {
	name: "variable.language.this",
	pattern: /\bthis\b/g
}, {
	name: "variable.language.super",
	pattern: /super(?=\.|\()/g
}, {
	name: "storage.type",
	pattern: /\b(const|let|var)(?=\s)/g
}, {
	matches: {
		1: "support.property"
	},
	pattern: /\.(length|node(Name|Value))\b/g
}, {
	matches: {
		1: "support.function"
	},
	pattern: /(setTimeout|setInterval)(?=\()/g
}, {
	matches: {
		1: "support.method"
	},
	pattern: /\.(getAttribute|replace|push|getElementById|getElementsByClassName|setTimeout|setInterval)(?=\()/g
}, {
	name: "string.regexp",
	matches: {
		1: "string.regexp.open",
		2: {
			name: "constant.regexp.escape",
			pattern: /\\(.){1}/g
		},
		3: "string.regexp.close",
		4: "string.regexp.modifier"
	},
	pattern: /(\/)((?![*+?])(?:[^\r\n\[\/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)(\/)(?!\/)([igm]{0,3})/g
}, {
	matches: {
		1: "storage.type",
		3: "entity.function"
	},
	pattern: /(var)?(\s|^)(\S+)(?=\s?=\s?function\()/g
}, {
	matches: {
		1: "keyword",
		2: "variable.type"
	},
	pattern: /(new)\s+(?!Promise)([^\(]*)(?=\()/g
}, {
	name: "entity.function",
	pattern: /(\w+)(?=:\s{0,}function)/g
}, {
	name: "constant.other",
	pattern: /\*(?= as)/g
}, {
	matches: {
		1: "keyword",
		2: "constant.other"
	},
	pattern: /(export)\s+(\*)/g
}, {
	matches: {
		1: "storage.type.accessor",
		2: "entity.name.function"
	},
	pattern: /(get|set)\s+(\w+)(?=\()/g
}, {
	matches: {
		2: "entity.name.function"
	},
	pattern: /(^\s*)(\w+)(?=\([^\)]*?\)\s*\{)/gm
}, {
	matches: {
		1: "storage.type.class",
		2: "entity.name.class",
		3: "storage.modifier.extends",
		4: "entity.other.inherited-class"
	},
	pattern: /(class)\s+(\w+)(?:\s+(extends)\s+(\w+))?(?=\s*\{)/g
}, {
	name: "storage.type.function.arrow",
	pattern: /=&gt;/g
}, {
	name: "support.class.promise",
	pattern: /\bPromise(?=(\(|\.))/g
}], "generic"), Rainbow.addAlias("js", "javascript"), Rainbow.extend("php", [{
	name: "support",
	pattern: /\becho\b/gi
}, {
	matches: {
		1: "variable.dollar-sign",
		2: "variable"
	},
	pattern: /(\$)(\w+)\b/g
}, {
	name: "constant.language",
	pattern: /true|false|null/gi
}, {
	name: "constant",
	pattern: /\b[A-Z0-9_]{2,}\b/g
}, {
	name: "keyword.dot",
	pattern: /\./g
}, {
	name: "keyword",
	pattern: /\b(die|end(for(each)?|switch|if)|case|require(_once)?|include(_once)?)(?=\b)/gi
}, {
	matches: {
		1: "keyword",
		2: {
			name: "support.class",
			pattern: /\w+/g
		}
	},
	pattern: /(instanceof)\s([^\$].*?)(\)|;)/gi
}, {
	matches: {
		1: "support.function"
	},
	pattern: /\b(array(_key_exists|_merge|_keys|_shift)?|isset|count|empty|unset|printf|is_(array|string|numeric|object)|sprintf|each|date|time|substr|pos|str(len|pos|tolower|_replace|totime)?|ord|trim|in_array|implode|end|preg_match|explode|fmod|define|link|list|get_class|serialize|file|sort|mail|dir|idate|log|intval|header|chr|function_exists|dirname|preg_replace|file_exists)(?=\()/gi
}, {
	name: "variable.language.php-tag",
	pattern: /(&lt;\?(php)?|\?&gt;)/gi
}, {
	matches: {
		1: "keyword.namespace",
		2: {
			name: "support.namespace",
			pattern: /\w+/g
		}
	},
	pattern: /\b(namespace|use)\s(.*?);/gi
}, {
	matches: {
		1: "storage.modifier",
		2: "storage.class",
		3: "entity.name.class",
		4: "storage.modifier.extends",
		5: "entity.other.inherited-class",
		6: "storage.modifier.extends",
		7: "entity.other.inherited-class"
	},
	pattern: /\b(abstract|final)?\s?(class|interface|trait)\s(\w+)(\sextends\s)?([\w\\]*)?(\simplements\s)?([\w\\]*)?\s?\{?(\n|\})/gi
}, {
	name: "keyword.static",
	pattern: /self::|static::/gi
}, {
	matches: {
		1: "storage.function",
		2: "entity.name.function.magic"
	},
	pattern: /(function)\s(__.*?)(?=\()/gi
}, {
	matches: {
		1: "storage.function",
		2: "entity.name.function"
	},
	pattern: /(function)\s(.*?)(?=\()/gi
}, {
	matches: {
		1: "keyword.new",
		2: {
			name: "support.class",
			pattern: /\w+/g
		}
	},
	pattern: /\b(new)\s([^\$].*?)(?=\)|\(|;)/gi
}, {
	matches: {
		1: {
			name: "support.class",
			pattern: /\w+/g
		},
		2: "keyword.static"
	},
	pattern: /([\w\\]*?)(::)(?=\b|\$)/g
}, {
	matches: {
		2: {
			name: "support.class",
			pattern: /\w+/g
		}
	},
	pattern: /(\(|,\s?)([\w\\]*?)(?=\s\$)/g
}], "generic"), Rainbow.extend("python", [{
	name: "variable.self",
	pattern: /self/g
}, {
	name: "constant.language",
	pattern: /None|True|False|NotImplemented|\.\.\./g
}, {
	name: "support.object",
	pattern: /object/g
}, {
	name: "support.function.python",
	pattern: /\b(bs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|bin|file|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern)(?=\()/g
}, {
	matches: {
		1: "keyword"
	},
	pattern: /\b(pass|lambda|with|is|not|in|from|elif|raise|del)(?=\b)/g
}, {
	matches: {
		1: "storage.class",
		2: "entity.name.class",
		3: "entity.other.inherited-class"
	},
	pattern: /(class)\s+(\w+)\((\w+?)\)/g
}, {
	matches: {
		1: "storage.function",
		2: "support.magic"
	},
	pattern: /(def)\s+(__\w+)(?=\()/g
}, {
	name: "support.magic",
	pattern: /__(name)__/g
}, {
	matches: {
		1: "keyword.control",
		2: "support.exception.type"
	},
	pattern: /(except) (\w+):/g
}, {
	matches: {
		1: "storage.function",
		2: "entity.name.function"
	},
	pattern: /(def)\s+(\w+)(?=\()/g
}, {
	name: "entity.name.function.decorator",
	pattern: /@([\w\.]+)/g
}, {
	name: "comment.docstring",
	pattern: /('{3}|"{3})[\s\S]*?\1/gm
}], "generic"), Rainbow.extend("ruby", [{
	matches: {
		1: "variable.language",
		2: {
			language: null
		}
	},
	pattern: /^(__END__)\n((?:.*\n)*)/gm
}, {
	name: "string",
	matches: {
		1: "string.open",
		2: [{
			name: "string.interpolation",
			matches: {
				1: "string.open",
				2: {
					language: "ruby"
				},
				3: "string.close"
			},
			pattern: /(\#\{)(.*?)(\})/g
		}],
		3: "string.close"
	},
	pattern: /("|`)(.*?[^\\\1])?(\1)/g
}, {
	name: "string",
	pattern: /('|"|`)([^\\\1\n]|\\.)*?\1/g
}, {
	name: "string",
	pattern: /%[qQ](?=(\(|\[|\{|&lt;|.)(.*?)(?:'|\)|\]|\}|&gt;|\1))(?:\(\2\)|\[\2\]|\{\2\}|\&lt;\2&gt;|\1\2\1)/g
}, {
	matches: {
		1: "string",
		2: "string",
		3: "string"
	},
	pattern: /(&lt;&lt;)(\w+).*?$([\s\S]*?^\2)/gm
}, {
	matches: {
		1: "string",
		2: "string",
		3: "string"
	},
	pattern: /(&lt;&lt;\-)(\w+).*?$([\s\S]*?\2)/gm
}, {
	name: "string.regexp",
	matches: {
		1: "string.regexp",
		2: {
			name: "string.regexp",
			pattern: /\\(.){1}/g
		},
		3: "string.regexp",
		4: "string.regexp"
	},
	pattern: /(\/)(.*?)(\/)([a-z]*)/g
}, {
	name: "string.regexp",
	matches: {
		1: "string.regexp",
		2: {
			name: "string.regexp",
			pattern: /\\(.){1}/g
		},
		3: "string.regexp",
		4: "string.regexp"
	},
	pattern: /%r(?=(\(|\[|\{|&lt;|.)(.*?)('|\)|\]|\}|&gt;|\1))(?:\(\2\)|\[\2\]|\{\2\}|\&lt;\2&gt;|\1\2\1)([a-z]*)/g
}, {
	name: "comment",
	pattern: /#.*$/gm
}, {
	name: "comment",
	pattern: /^\=begin[\s\S]*?\=end$/gm
}, {
	matches: {
		1: "constant"
	},
	pattern: /(\w+:)[^:]/g
}, {
	matches: {
		1: "constant.symbol"
	},
	pattern: /[^:](:(?:\w+|(?=['"](.*?)['"])(?:"\2"|'\2')))/g
}, {
	name: "constant.numeric",
	pattern: /\b(0x[\da-f]+|[\d_]+)\b/g
}, {
	name: "support.class",
	pattern: /\b[A-Z]\w*(?=((\.|::)[A-Za-z]|\[))/g
}, {
	name: "constant",
	pattern: /\b[A-Z]\w*\b/g
}, {
	matches: {
		1: "storage.class",
		2: "entity.name.class",
		3: "entity.other.inherited-class"
	},
	pattern: /\s*(class)\s+((?:(?:::)?[A-Z]\w*)+)(?:\s+&lt;\s+((?:(?:::)?[A-Z]\w*)+))?/g
}, {
	matches: {
		1: "storage.module",
		2: "entity.name.class"
	},
	pattern: /\s*(module)\s+((?:(?:::)?[A-Z]\w*)+)/g
}, {
	name: "variable.global",
	pattern: /\$([a-zA-Z_]\w*)\b/g
}, {
	name: "variable.class",
	pattern: /@@([a-zA-Z_]\w*)\b/g
}, {
	name: "variable.instance",
	pattern: /@([a-zA-Z_]\w*)\b/g
}, {
	matches: {
		1: "keyword.control"
	},
	pattern: /[^\.]\b(BEGIN|begin|case|class|do|else|elsif|END|end|ensure|for|if|in|module|rescue|then|unless|until|when|while)\b(?![?!])/g
}, {
	matches: {
		1: "keyword.control.pseudo-method"
	},
	pattern: /[^\.]\b(alias|alias_method|break|next|redo|retry|return|super|undef|yield)\b(?![?!])|\bdefined\?|\bblock_given\?/g
}, {
	matches: {
		1: "constant.language"
	},
	pattern: /\b(nil|true|false)\b(?![?!])/g
}, {
	matches: {
		1: "variable.language"
	},
	pattern: /\b(__(FILE|LINE)__|self)\b(?![?!])/g
}, {
	matches: {
		1: "keyword.special-method"
	},
	pattern: /\b(require|gem|initialize|new|loop|include|extend|raise|attr_reader|attr_writer|attr_accessor|attr|catch|throw|private|module_function|public|protected)\b(?![?!])/g
}, {
	name: "keyword.operator",
	pattern: /\s\?\s|=|&lt;&lt;|&lt;&lt;=|%=|&=|\*=|\*\*=|\+=|\-=|\^=|\|{1,2}=|&lt;&lt;|&lt;=&gt;|&lt;(?!&lt;|=)|&gt;(?!&lt;|=|&gt;)|&lt;=|&gt;=|===|==|=~|!=|!~|%|&amp;|\*\*|\*|\+|\-|\/|\||~|&gt;&gt;/g
}, {
	matches: {
		1: "keyword.operator.logical"
	},
	pattern: /[^\.]\b(and|not|or)\b/g
}, {
	matches: {
		1: "storage.function",
		2: "entity.name.function"
	},
	pattern: /(def)\s(.*?)(?=(\s|\())/g
}]);

/*
 * Reading Time
 * Author: Michael Lynch
 * Author URL: http://michaelynch.com
 * Date Created: August 14, 2013
 * Date Updated: June 19, 2015
 * Licensed under the MIT license
 */
! function(e) {
	e.fn.readingTime = function(n) {
		var t = {
				readingTimeTarget: ".eta",
				wordCountTarget: null,
				wordsPerMinute: 500,
				round: !0,
				lang: "en",
				lessThanAMinuteString: "",
				prependTimeString: "",
				prependWordString: "",
				remotePath: null,
				remoteTarget: null,
				success: function() {},
				error: function() {}
			},
			i = this,
			r = e(this);
		i.settings = e.extend({}, t, n);
		var a = i.settings;
		if (!this.length) return a.error.call(this), this;
		if ("it" == a.lang) var s = a.lessThanAMinuteString || "Meno di un minuto",
			l = "min";
		else if ("fr" == a.lang) var s = a.lessThanAMinuteString || "Moins d'une minute",
			l = "min";
		else if ("de" == a.lang) var s = a.lessThanAMinuteString || "Weniger als eine Minute",
			l = "min";
		else if ("es" == a.lang) var s = a.lessThanAMinuteString || "Menos de un minuto",
			l = "min";
		else if ("nl" == a.lang) var s = a.lessThanAMinuteString || "Minder dan een minuut",
			l = "min";
		else if ("sk" == a.lang) var s = a.lessThanAMinuteString || "Menej než minútu",
			l = "min";
		else if ("cz" == a.lang) var s = a.lessThanAMinuteString || "Méně než minutu",
			l = "min";
		else if ("hu" == a.lang) var s = a.lessThanAMinuteString || "Kevesebb mint egy perc",
			l = "perc";
		else if ("zhs" == a.lang) var s = a.lessThanAMinuteString || "一分钟",
			l = "分钟";
		else var s = a.lessThanAMinuteString || "Less than a minute",
			l = "min";


		var countArticleLength = function(str) {
			var realLength = 0,
				len = str.length,
				charCode = -1;
			for (var i = 0; i < len; i++) {
				charCode = str.charCodeAt(i);
				if (charCode > 0 && charCode <= 128) realLength += 1;
				else realLength += 2;
			}
			return realLength;
		};


		var u = function(n) {
			if ("" !== n) {
				console.log(n.trim())
				var t = countArticleLength(n.trim()),
					i = a.wordsPerMinute / 60,
					r = t / i;
				console.log(t);
				if (a.round === !0) var u = Math.round(r / 60);
				else var u = Math.floor(r / 60);
				var g = Math.round(r - 60 * u);
				if (a.round === !0) e(a.readingTimeTarget).text(u > 0 ? a.prependTimeString + u + " " + l : a.prependTimeString + s);
				else {
					var o = u + ":" + g;
					e(a.readingTimeTarget).text(a.prependTimeString + o)
				}
				"" !== a.wordCountTarget && void 0 !== a.wordCountTarget && e(a.wordCountTarget).text(a.prependWordString + t), a.success.call(this)
			} else a.error.call(this, "The element is empty.")
		};
		r.each(function() {
			null != a.remotePath && null != a.remoteTarget ? e.get(a.remotePath, function(n) {
				u(e("<div>").html(n).find(a.remoteTarget).text())
			}) : u(r.text())
		})
	}
}(jQuery);

/*
Instafeed.js by Steven Schobert
Version: 1.4.1
Generated by CoffeeScript 1.9.3
*/
(function() {
	var e;
	e = function() {
			function e(e, t) {
				var n, r;
				this.options = {
					target: "instafeed",
					get: "popular",
					resolution: "thumbnail",
					sortBy: "none",
					links: !0,
					mock: !1,
					useHttp: !1
				};
				if (typeof e == "object")
					for (n in e) r = e[n], this.options[n] = r;
				this.context = t != null ? t : this, this.unique = this._genKey()
			}
			return e.prototype.hasNext = function() {
				return typeof this.context.nextUrl == "string" && this.context.nextUrl.length > 0
			}, e.prototype.next = function() {
				return this.hasNext() ? this.run(this.context.nextUrl) : !1
			}, e.prototype.run = function(t) {
				var n, r, i;
				if (typeof this.options.clientId != "string" && typeof this.options.accessToken != "string") throw new Error("Missing clientId or accessToken.");
				if (typeof this.options.accessToken != "string" && typeof this.options.clientId != "string") throw new Error("Missing clientId or accessToken.");
				return this.options.before != null && typeof this.options.before == "function" && this.options.before.call(this), typeof document != "undefined" && document !== null && (i = document.createElement("script"), i.id = "instafeed-fetcher", i.src = t || this._buildUrl(), n = document.getElementsByTagName("head"), n[0].appendChild(i), r = "instafeedCache" + this.unique, window[r] = new e(this.options, this), window[r].unique = this.unique), !0
			}, e.prototype.parse = function(e) {
				var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D;
				if (typeof e != "object") {
					if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "Invalid JSON data"), !1;
					throw new Error("Invalid JSON response")
				}
				if (e.meta.code !== 200) {
					if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, e.meta.error_message), !1;
					throw new Error("Error from Instagram: " + e.meta.error_message)
				}
				if (e.data.length === 0) {
					if (this.options.error != null && typeof this.options.error == "function") return this.options.error.call(this, "No images were returned from Instagram"), !1;
					throw new Error("No images were returned from Instagram")
				}
				this.options.success != null && typeof this.options.success == "function" && this.options.success.call(this, e), this.context.nextUrl = "", e.pagination != null && (this.context.nextUrl = e.pagination.next_url);
				if (this.options.sortBy !== "none") {
					this.options.sortBy === "random" ? M = ["", "random"] : M = this.options.sortBy.split("-"), O = M[0] === "least" ? !0 : !1;
					switch (M[1]) {
						case "random":
							e.data.sort(function() {
								return .5 - Math.random()
							});
							break;
						case "recent":
							e.data = this._sortBy(e.data, "created_time", O);
							break;
						case "liked":
							e.data = this._sortBy(e.data, "likes.count", O);
							break;
						case "commented":
							e.data = this._sortBy(e.data, "comments.count", O);
							break;
						default:
							throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
					}
				}
				if (typeof document != "undefined" && document !== null && this.options.mock === !1) {
					m = e.data, A = parseInt(this.options.limit, 10), this.options.limit != null && m.length > A && (m = m.slice(0, A)), u = document.createDocumentFragment(), this.options.filter != null && typeof this.options.filter == "function" && (m = this._filter(m, this.options.filter));
					if (this.options.template != null && typeof this.options.template == "string") {
						f = "", d = "", w = "", D = document.createElement("div");
						for (c = 0, N = m.length; c < N; c++) {
							h = m[c], p = h.images[this.options.resolution];
							if (typeof p != "object") throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o);
							E = p.width, y = p.height, b = "square", E > y && (b = "landscape"), E < y && (b = "portrait"), v = p.url, l = window.location.protocol.indexOf("http") >= 0, l && !this.options.useHttp && (v = v.replace(/https?:\/\//, "//")), d = this._makeTemplate(this.options.template, {
								model: h,
								id: h.id,
								link: h.link,
								type: h.type,
								image: v,
								width: E,
								height: y,
								orientation: b,
								caption: this._getObjectProperty(h, "caption.text"),
								likes: h.likes.count,
								comments: h.comments.count,
								location: this._getObjectProperty(h, "location.name")
							}), f += d
						}
						D.innerHTML = f, i = [], r = 0, n = D.childNodes.length;
						while (r < n) i.push(D.childNodes[r]), r += 1;
						for (x = 0, C = i.length; x < C; x++) L = i[x], u.appendChild(L)
					} else
						for (T = 0, k = m.length; T < k; T++) {
							h = m[T], g = document.createElement("img"), p = h.images[this.options.resolution];
							if (typeof p != "object") throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o);
							v = p.url, l = window.location.protocol.indexOf("http") >= 0, l && !this.options.useHttp && (v = v.replace(/https?:\/\//, "//")), g.src = v, this.options.links === !0 ? (t = document.createElement("a"), t.href = h.link, t.appendChild(g), u.appendChild(t)) : u.appendChild(g)
						}
					_ = this.options.target, typeof _ == "string" && (_ = document.getElementById(_));
					if (_ == null) throw o = 'No element with id="' + this.options.target + '" on page.', new Error(o);
					_.appendChild(u), a = document.getElementsByTagName("head")[0], a.removeChild(document.getElementById("instafeed-fetcher")), S = "instafeedCache" + this.unique, window[S] = void 0;
					try {
						delete window[S]
					} catch (P) {
						s = P
					}
				}
				return this.options.after != null && typeof this.options.after == "function" && this.options.after.call(this), !0
			}, e.prototype._buildUrl = function() {
				var e, t, n;
				e = "https://api.instagram.com/v1";
				switch (this.options.get) {
					case "popular":
						t = "media/popular";
						break;
					case "tagged":
						if (!this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
						t = "tags/" + this.options.tagName + "/media/recent";
						break;
					case "location":
						if (!this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
						t = "locations/" + this.options.locationId + "/media/recent";
						break;
					case "user":
						if (!this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
						t = "users/" + this.options.userId + "/media/recent";
						break;
					default:
						throw new Error("Invalid option for get: '" + this.options.get + "'.")
				}
				return n = e + "/" + t, this.options.accessToken != null ? n += "?access_token=" + this.options.accessToken : n += "?client_id=" + this.options.clientId, this.options.limit != null && (n += "&count=" + this.options.limit), n += "&callback=instafeedCache" + this.unique + ".parse", n
			}, e.prototype._genKey = function() {
				var e;
				return e = function() {
					return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
				}, "" + e() + e() + e() + e()
			}, e.prototype._makeTemplate = function(e, t) {
				var n, r, i, s, o;
				r = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, n = e;
				while (r.test(n)) s = n.match(r)[1], o = (i = this._getObjectProperty(t, s)) != null ? i : "", n = n.replace(r, function() {
					return "" + o
				});
				return n
			}, e.prototype._getObjectProperty = function(e, t) {
				var n, r;
				t = t.replace(/\[(\w+)\]/g, ".$1"), r = t.split(".");
				while (r.length) {
					n = r.shift();
					if (!(e != null && n in e)) return null;
					e = e[n]
				}
				return e
			}, e.prototype._sortBy = function(e, t, n) {
				var r;
				return r = function(e, r) {
					var i, s;
					return i = this._getObjectProperty(e, t), s = this._getObjectProperty(r, t), n ? i > s ? 1 : -1 : i < s ? 1 : -1
				}, e.sort(r.bind(this)), e
			}, e.prototype._filter = function(e, t) {
				var n, r, i, s, o;
				n = [], r = function(e) {
					if (t(e)) return n.push(e)
				};
				for (i = 0, o = e.length; i < o; i++) s = e[i], r(s);
				return n
			}, e
		}(),
		function(e, t) {
			return typeof define == "function" && define.amd ? define([], t) : typeof module == "object" && module.exports ? module.exports = t() : e.Instafeed = t()
		}(this, function() {
			return e
		})
}).call(this);