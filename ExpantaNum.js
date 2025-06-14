// This is a modified version by hamster624
!function(r) {
    "use strict";
    var e = {
        maxOps: 8,
        serializeMode: 1,
        debug: 0
    }
      , t = "[ExpantaNumError] "
      , n = t + "Invalid argument: "
      , a = /^[-\+]*(Infinity|NaN|(J+|J\^\d+ )?(10(\^+|\{[1-9]\d*\})|\(10(\^+|\{[1-9]\d*\})\)\^[1-9]\d* )*((\d+(\.\d*)?|\d*\.\d+)?([Ee][-\+]*))*(0|\d+(\.\d*)?|\d*\.\d+))$/
      , i = Math.log10(9007199254740991)
      , o = {}
      , s = {}
      , u = {
        ZERO: 0,
        ONE: 1
    };
    u.E = Math.E,
    u.LN2 = Math.LN2,
    u.LN10 = Math.LN10,
    u.LOG2E = Math.LOG2E,
    u.LOG10E = Math.LOG10E,
    u.PI = Math.PI,
    u.SQRT1_2 = Math.SQRT1_2,
    u.SQRT2 = Math.SQRT2,
    u.MAX_SAFE_INTEGER = 9007199254740991,
    u.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER,
    u.NaN = Number.NaN,
    u.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
    u.POSITIVE_INFINITY = Number.POSITIVE_INFINITY,
    u.E_MAX_SAFE_INTEGER = "e9007199254740991",
    u.EE_MAX_SAFE_INTEGER = "ee9007199254740991",
    u.TETRATED_MAX_SAFE_INTEGER = "10^^9007199254740991",
    u.GRAHAMS_NUMBER = "J^63 10^^^(10^)^7625597484984 3638334640023.7783",
    o.absoluteValue = o.abs = function() {
        var r = this.clone();
        return r.sign = 1,
        r
    }
    ,
    s.absoluteValue = s.abs = function(r) {
        return new e(r).abs()
    }
    ,
    o.negate = o.neg = function() {
        var r = this.clone();
        return r.sign = -1 * r.sign,
        r
    }
    ,
    s.negate = s.neg = function(r) {
        return new e(r).neg()
    }
    ,
    o.compareTo = o.cmp = function(r) {
        if (r instanceof e || (r = new e(r)),
        isNaN(this.array[0][1]) || isNaN(r.array[0][1]))
            return NaN;
        if (this.array[0][1] == 1 / 0 && r.array[0][1] != 1 / 0)
            return this.sign;
        if (this.array[0][1] != 1 / 0 && r.array[0][1] == 1 / 0)
            return -r.sign;
        if (1 == this.array.length && 0 === this.array[0][1] && 1 == r.array.length && 0 === r.array[0][1])
            return 0;
        if (this.sign != r.sign)
            return this.sign;
        var t, n = this.sign;
        if (this.layer > r.layer)
            t = 1;
        else if (this.layer < r.layer)
            t = -1;
        else {
            for (var a, i, o = 0, s = Math.min(this.array.length, r.array.length); o < s; ++o) {
                if (a = this.array[this.array.length - 1 - o],
                i = r.array[r.array.length - 1 - o],
                a[0] > i[0] || a[0] == i[0] && a[1] > i[1]) {
                    t = 1;
                    break
                }
                if (a[0] < i[0] || a[0] == i[0] && a[1] < i[1]) {
                    t = -1;
                    break
                }
            }
            void 0 === t && (t = this.array.length == r.array.length ? 0 : this.array.length > r.array.length ? (a = this.array[this.array.length - s])[0] >= 1 || a[1] > 10 ? 1 : -1 : (a = r.array[r.array.length - s])[0] >= 1 || a[1] > 10 ? -1 : 1)
        }
        return t * n
    }
    ,
    s.compare = s.cmp = function(r, t) {
        return new e(r).cmp(t)
    }
    ,
    o.greaterThan = o.gt = function(r) {
        return this.cmp(r) > 0
    }
    ,
    s.greaterThan = s.gt = function(r, t) {
        return new e(r).gt(t)
    }
    ,
    o.greaterThanOrEqualTo = o.gte = function(r) {
        return this.cmp(r) >= 0
    }
    ,
    s.greaterThanOrEqualTo = s.gte = function(r, t) {
        return new e(r).gte(t)
    }
    ,
    o.lessThan = o.lt = function(r) {
        return this.cmp(r) < 0
    }
    ,
    s.lessThan = s.lt = function(r, t) {
        return new e(r).lt(t)
    }
    ,
    o.lessThanOrEqualTo = o.lte = function(r) {
        return this.cmp(r) <= 0
    }
    ,
    s.lessThanOrEqualTo = s.lte = function(r, t) {
        return new e(r).lte(t)
    }
    ,
    o.equalsTo = o.equal = o.eq = function(r) {
        return 0 === this.cmp(r)
    }
    ,
    s.equalsTo = s.equal = s.eq = function(r, t) {
        return new e(r).eq(t)
    }
    ,
    o.notEqualsTo = o.notEqual = o.neq = function(r) {
        return 0 !== this.cmp(r)
    }
    ,
    s.notEqualsTo = s.notEqual = s.neq = function(r, t) {
        return new e(r).neq(t)
    }
    ,
    o.minimum = o.min = function(r) {
        return this.lt(r) ? this.clone() : new e(r)
    }
    ,
    s.minimum = s.min = function(r, t) {
        return new e(r).min(t)
    }
    ,
    o.maximum = o.max = function(r) {
        return this.gt(r) ? this.clone() : new e(r)
    }
    ,
    s.maximum = s.max = function(r, t) {
        return new e(r).max(t)
    }
    ,
    o.isPositive = o.ispos = function() {
        return this.gt(e.ZERO)
    }
    ,
    s.isPositive = s.ispos = function(r) {
        return new e(r).ispos()
    }
    ,
    o.isNegative = o.isneg = function() {
        return this.lt(e.ZERO)
    }
    ,
    s.isNegative = s.isneg = function(r) {
        return new e(r).isneg()
    }
    ,
    o.isNaN = function() {
        return isNaN(this.array[0][1])
    }
    ,
    s.isNaN = function(r) {
        return new e(r).isNaN()
    }
    ,
    o.isFinite = function() {
        return isFinite(this.array[0][1])
    }
    ,
    s.isFinite = function(r) {
        return new e(r).isFinite()
    }
    ,
    o.isInfinite = function() {
        return this.array[0][1] == 1 / 0
    }
    ,
    s.isInfinite = function(r) {
        return new e(r).isInfinite()
    }
    ,
    o.isInteger = o.isint = function() {
        return -1 == this.sign ? this.abs().isint() : !!this.gt(e.MAX_SAFE_INTEGER) || Number.isInteger(this.toNumber())
    }
    ,
    s.isInteger = s.isint = function(r) {
        return new e(r).isint()
    }
    ,
    o.floor = function() {
        return this.isInteger() ? this.clone() : new e(Math.floor(this.toNumber()))
    }
    ,
    s.floor = function(r) {
        return new e(r).floor()
    }
    ,
    o.ceiling = o.ceil = function() {
        return this.isInteger() ? this.clone() : new e(Math.ceil(this.toNumber()))
    }
    ,
    s.ceiling = s.ceil = function(r) {
        return new e(r).ceil()
    }
    ,
    o.round = function() {
        return this.isInteger() ? this.clone() : new e(Math.round(this.toNumber()))
    }
    ,
    s.round = function(r) {
        return new e(r).round()
    }
    ,
    o.plus = o.add = function(r) {
        var t = this.clone();
        if (r = new e(r),
        e.debug >= e.NORMAL && console.log(this + "+" + r),
        -1 == t.sign)
            return t.neg().add(r.neg()).neg();
        if (-1 == r.sign)
            return t.sub(r.neg());
        if (t.eq(e.ZERO))
            return r;
        if (r.eq(e.ZERO))
            return t;
        if (t.isNaN() || r.isNaN() || t.isInfinite() && r.isInfinite() && t.eq(r.neg()))
            return e.NaN.clone();
        if (t.isInfinite())
            return t;
        if (r.isInfinite())
            return r;
        var n, a = t.min(r), i = t.max(r), o = i.operator(0), s = i.operator(1);
        if (i.gt(e.E_MAX_SAFE_INTEGER) || i.div(a).gt(e.MAX_SAFE_INTEGER))
            n = i;
        else if (s) {
            if (1 == s) {
                var u = a.operator(1) ? a.operator(0) : Math.log10(a.operator(0));
                n = new e([u + Math.log10(Math.pow(10, o - u) + 1), 1])
            }
        } else
            n = new e(t.toNumber() + r.toNumber());
        return a = i = null,
        n
    }
    ,
    s.plus = s.add = function(r, t) {
        return new e(r).add(t)
    }
    ,
    o.minus = o.sub = function(r) {
        var t = this.clone();
        if (r = new e(r),
        e.debug >= e.NORMAL && console.log(t + "-" + r),
        -1 == t.sign)
            return t.neg().sub(r.neg()).neg();
        if (-1 == r.sign)
            return t.add(r.neg());
        if (t.eq(r))
            return e.ZERO.clone();
        if (r.eq(e.ZERO))
            return t;
        if (t.isNaN() || r.isNaN() || t.isInfinite() && r.isInfinite())
            return e.NaN.clone();
        if (t.isInfinite())
            return t;
        if (r.isInfinite())
            return r.neg();
        var n, a = t.min(r), i = t.max(r), o = r.gt(t), s = i.operator(0), u = i.operator(1);
        if (i.gt(e.E_MAX_SAFE_INTEGER) || i.div(a).gt(e.MAX_SAFE_INTEGER))
            n = i,
            n = o ? n.neg() : n;
        else if (u) {
            if (1 == u) {
                var f = a.operator(1) ? a.operator(0) : Math.log10(a.operator(0));
                n = new e([f + Math.log10(Math.pow(10, s - f) - 1), 1]),
                n = o ? n.neg() : n
            }
        } else
            n = new e(t.toNumber() - r.toNumber());
        return a = i = null,
        n
    }
    ,
    s.minus = s.sub = function(r, t) {
        return new e(r).sub(t)
    }
    ,
    o.times = o.mul = function(r) {
        var t = this.clone();
        if (r = new e(r),
        e.debug >= e.NORMAL && console.log(t + "*" + r),
        t.sign * r.sign == -1)
            return t.abs().mul(r.abs()).neg();
        if (-1 == t.sign)
            return t.abs().mul(r.abs());
        if (t.isNaN() || r.isNaN() || t.eq(e.ZERO) && r.isInfinite() || t.isInfinite() && r.abs().eq(e.ZERO))
            return e.NaN.clone();
        if (r.eq(e.ZERO))
            return e.ZERO.clone();
        if (r.eq(e.ONE))
            return t.clone();
        if (t.isInfinite())
            return t;
        if (r.isInfinite())
            return r;
        if (t.max(r).gt(e.EE_MAX_SAFE_INTEGER))
            return t.max(r);
        var n = t.toNumber() * r.toNumber();
        return n <= 9007199254740991 ? new e(n) : e.pow(10, t.log10().add(r.log10()))
    }
    ,
    s.times = s.mul = function(r, t) {
        return new e(r).mul(t)
    }
    ,
    o.divide = o.div = function(r) {
        var t = this.clone();
        if (r = new e(r),
        e.debug >= e.NORMAL && console.log(t + "/" + r),
        t.sign * r.sign == -1)
            return t.abs().div(r.abs()).neg();
        if (-1 == t.sign)
            return t.abs().div(r.abs());
        if (t.isNaN() || r.isNaN() || t.isInfinite() && r.isInfinite() || t.eq(e.ZERO) && r.eq(e.ZERO))
            return e.NaN.clone();
        if (r.eq(e.ZERO))
            return e.POSITIVE_INFINITY.clone();
        if (r.eq(e.ONE))
            return t.clone();
        if (t.eq(r))
            return e.ONE.clone();
        if (t.isInfinite())
            return t;
        if (r.isInfinite())
            return e.ZERO.clone();
        if (t.max(r).gt(e.EE_MAX_SAFE_INTEGER))
            return t.gt(r) ? t.clone() : e.ZERO.clone();
        var n = t.toNumber() / r.toNumber();
        if (n <= 9007199254740991)
            return new e(n);
        var a = e.pow(10, t.log10().sub(r.log10()))
          , i = a.floor();
        return a.sub(i).lt(new e(1e-9)) ? i : a
    }
    ,
    s.divide = s.div = function(r, t) {
        return new e(r).div(t)
    }
    ,
    o.reciprocate = o.rec = function() {
        return e.debug >= e.NORMAL && console.log(this + "^-1"),
        this.isNaN() || this.eq(e.ZERO) ? e.NaN.clone() : this.abs().gt("2e323") ? e.ZERO.clone() : new e(1 / this)
    }
    ,
    s.reciprocate = s.rec = function(r) {
        return new e(r).rec()
    }
    ,
    o.modular = o.mod = function(r) {
        return (r = new e(r)).eq(e.ZERO) ? e.ZERO.clone() : this.sign * r.sign == -1 ? this.abs().mod(r.abs()).neg() : -1 == this.sign ? this.abs().mod(r.abs()) : this.sub(this.div(r).floor().mul(r))
    }
    ,
    s.modular = s.mod = function(r, t) {
        return new e(r).mod(t)
    }
    ;
    o.gamma = function() {
        var r = this.clone();
        if (r.gt(e.TETRATED_MAX_SAFE_INTEGER))
            return r;
        if (r.gt(e.E_MAX_SAFE_INTEGER))
            return e.exp(r);
        if (r.gt(e.MAX_SAFE_INTEGER))
            return e.exp(e.mul(r, e.ln(r).sub(1)));
        var t = r.operator(0);
        if (t > 1) {
            if (t < 24)
                return new e(function(r) {
                    if (!isFinite(r))
                        return r;
                    if (r < -50)
                        return r == Math.trunc(r) ? Number.NEGATIVE_INFINITY : 0;
                    for (var e = 1; r < 10; )
                        e *= r,
                        ++r;
                    var t = .9189385332046727;
                    t += (.5 + (r -= 1)) * Math.log(r),
                    t -= r;
                    var n = r * r
                      , a = r;
                    return t += 1 / (12 * a),
                    t += 1 / (360 * (a *= n)),
                    t += 1 / (1260 * (a *= a * n)),
                    t += 1 / (1680 * (a *= n)),
                    t += 1 / (1188 * (a *= n)),
                    t += 691 / (360360 * (a *= n)),
                    t += 7 / (1092 * (a *= n)),
                    t += 3617 / (122400 * (a *= n)),
                    Math.exp(t) / e
                }(r.sign * t));
            var n = t - 1
              , a = .9189385332046727;
            a += (n + .5) * Math.log(n);
            var i = n * n
              , o = n
              , s = 12 * o
              , u = 1 / s
              , f = (a -= n) + u;
            if (f == a)
                return e.exp(a);
            if ((f = (a = f) - (u = 1 / (s = 360 * (o *= i)))) == a)
                return e.exp(a);
            a = f;
            var l = 1 / (s = 1260 * (o *= i));
            return a += l,
            a -= l = 1 / (s = 1680 * (o *= i)),
            e.exp(a)
        }
        return this.rec()
    }
    ,
    s.gamma = function(r) {
        return new e(r).gamma()
    }
    ,
    s.factorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368e3, 20922789888e3, 355687428096e3, 6402373705728e3, 0x1b02b9306890000, 243290200817664e4, 5109094217170944e4, 0x3ceea4c2b3e0d80000, 2.585201673888498e22, 6.204484017332394e23, 1.5511210043330986e25, 4.0329146112660565e26, 1.0888869450418352e28, 3.0488834461171387e29, 8.841761993739702e30, 2.6525285981219107e32, 8.222838654177922e33, 2.631308369336935e35, 8.683317618811886e36, 2.9523279903960416e38, 1.0333147966386145e40, 3.7199332678990125e41, 1.3763753091226346e43, 5.230226174666011e44, 2.0397882081197444e46, 8.159152832478977e47, 3.345252661316381e49, 1.40500611775288e51, 6.041526306337383e52, 2.658271574788449e54, 1.1962222086548019e56, 5.502622159812089e57, 2.5862324151116818e59, 1.2413915592536073e61, 6.082818640342675e62, 3.0414093201713376e64, 1.5511187532873822e66, 8.065817517094388e67, 4.2748832840600255e69, 2.308436973392414e71, 1.2696403353658276e73, 7.109985878048635e74, 4.0526919504877214e76, 2.3505613312828785e78, 1.3868311854568984e80, 8.32098711274139e81, 5.075802138772248e83, 3.146997326038794e85, 1.98260831540444e87, 1.2688693218588417e89, 8.247650592082472e90, 5.443449390774431e92, 3.647111091818868e94, 2.4800355424368305e96, 1.711224524281413e98, 1.1978571669969892e100, 8.504785885678623e101, 6.1234458376886085e103, 4.4701154615126844e105, 3.307885441519386e107, 2.48091408113954e109, 1.8854947016660504e111, 1.4518309202828587e113, 1.1324281178206297e115, 8.946182130782976e116, 7.156945704626381e118, 5.797126020747368e120, 4.753643337012842e122, 3.945523969720659e124, 3.314240134565353e126, 2.81710411438055e128, 2.4227095383672734e130, 2.107757298379528e132, 1.8548264225739844e134, 1.650795516090846e136, 1.4857159644817615e138, 1.352001527678403e140, 1.2438414054641308e142, 1.1567725070816416e144, 1.087366156656743e146, 1.032997848823906e148, 9.916779348709496e149, 9.619275968248212e151, 9.426890448883248e153, 9.332621544394415e155, 9.332621544394415e157, 9.42594775983836e159, 9.614466715035127e161, 9.90290071648618e163, 1.0299016745145628e166, 1.081396758240291e168, 1.1462805637347084e170, 1.226520203196138e172, 1.324641819451829e174, 1.4438595832024937e176, 1.588245541522743e178, 1.7629525510902446e180, 1.974506857221074e182, 2.2311927486598138e184, 2.5435597334721877e186, 2.925093693493016e188, 3.393108684451898e190, 3.969937160808721e192, 4.684525849754291e194, 5.574585761207606e196, 6.689502913449127e198, 8.094298525273444e200, 9.875044200833601e202, 1.214630436702533e205, 1.506141741511141e207, 1.882677176888926e209, 2.372173242880047e211, 3.0126600184576594e213, 3.856204823625804e215, 4.974504222477287e217, 6.466855489220474e219, 8.47158069087882e221, 1.1182486511960043e224, 1.4872707060906857e226, 1.9929427461615188e228, 2.6904727073180504e230, 3.659042881952549e232, 5.012888748274992e234, 6.917786472619489e236, 9.615723196941089e238, 1.3462012475717526e241, 1.898143759076171e243, 2.695364137888163e245, 3.854370717180073e247, 5.5502938327393044e249, 8.047926057471992e251, 1.1749972043909107e254, 1.727245890454639e256, 2.5563239178728654e258, 3.80892263763057e260, 5.713383956445855e262, 8.62720977423324e264, 1.3113358856834524e267, 2.0063439050956823e269, 3.0897696138473508e271, 4.789142901463394e273, 7.471062926282894e275, 1.1729568794264145e278, 1.853271869493735e280, 2.9467022724950384e282, 4.7147236359920616e284, 7.590705053947219e286, 1.2296942187394494e289, 2.0044015765453026e291, 3.287218585534296e293, 5.423910666131589e295, 9.003691705778438e297, 1.503616514864999e300, 2.5260757449731984e302, 4.269068009004705e304, 7.257415615307999e306],
    o.factorial = o.fact = function() {
        var r = this.clone()
          , t = e.factorials;
        if (r.lt(e.ZERO) || !r.isint())
            return r.add(1).gamma();
        if (r.lte(170))
            return new e(t[+r]);
        var n = +r;
        return n < 500 && (n += 163879 / 209018880 * Math.pow(n, 5)),
        n < 1e3 && (n += -571 / 2488320 * Math.pow(n, 4)),
        n < 5e4 && (n += -139 / 51840 * Math.pow(n, 3)),
        n < 1e7 && (n += 1 / 288 * Math.pow(n, 2)),
        n < 1e20 && (n += 1 / 12 * n),
        r.div(e.E).pow(r).mul(r.mul(e.PI).mul(2).sqrt()).times(1)
    }
    ,
    s.factorial = s.fact = function(r) {
        return new e(r).fact()
    }
    ,
    o.toPower = o.pow = function(r) {
        if (r = new e(r),
        e.debug >= e.NORMAL && console.log(this + "^" + r),
        r.eq(e.ZERO))
            return e.ONE.clone();
        if (r.eq(e.ONE))
            return this.clone();
        if (r.lt(e.ZERO))
            return this.pow(r.neg()).rec();
        if (this.lt(e.ZERO) && r.isint())
            return r.mod(2).lt(e.ONE) ? this.abs().pow(r) : this.abs().pow(r).neg();
        if (this.lt(e.ZERO))
            return e.NaN.clone();
        if (this.eq(e.ONE))
            return e.ONE.clone();
        if (this.eq(e.ZERO))
            return e.ZERO.clone();
        if (this.max(r).gt(e.TETRATED_MAX_SAFE_INTEGER))
            return this.max(r);
        if (this.eq(10))
            return r.gt(e.ZERO) ? (r.operator(1, r.operator(1) + 1 || 1),
            r.standardize(),
            r) : new e(Math.pow(10, r.toNumber()));
        if (r.lt(e.ONE))
            return this.root(r.rec());
        var t = Math.pow(this.toNumber(), r.toNumber());
        return t <= 9007199254740991 ? new e(t) : e.pow(10, this.log10().mul(r))
    }
    ,
    s.toPower = s.pow = function(r, t) {
        return new e(r).pow(t)
    }
    ,
    o.exponential = o.exp = function() {
        return e.pow(Math.E, this)
    }
    ,
    s.exponential = s.exp = function(r) {
        return e.pow(Math.E, r)
    }
    ,
    o.squareRoot = o.sqrt = function() {
        return this.root(2)
    }
    ,
    s.squareRoot = s.sqrt = function(r) {
        return new e(r).root(2)
    }
    ,
    o.cubeRoot = o.cbrt = function() {
        return this.root(3)
    }
    ,
    s.cubeRoot = s.cbrt = function(r) {
        return new e(r).root(3)
    }
    ,
    o.root = function(r) {
        return r = new e(r),
        e.debug >= e.NORMAL && console.log(this + "root" + r),
        r.eq(e.ONE) ? this.clone() : r.lt(e.ZERO) ? this.root(r.neg()).rec() : r.lt(e.ONE) ? this.pow(r.rec()) : this.lt(e.ZERO) && r.isint() && r.mod(2).eq(e.ONE) ? this.neg().root(r).neg() : this.lt(e.ZERO) ? e.NaN.clone() : this.eq(e.ONE) ? e.ONE.clone() : this.eq(e.ZERO) ? e.ZERO.clone() : this.max(r).gt(e.TETRATED_MAX_SAFE_INTEGER) ? this.gt(r) ? this.clone() : e.ZERO.clone() : e.pow(10, this.log10().div(r))
    }
    ,
    s.root = function(r, t) {
        return new e(r).root(t)
    }
    ,
    o.generalLogarithm = o.log10 = function() {
        var r = this.clone();
        return e.debug >= e.NORMAL && console.log("log" + this),
        r.lt(e.ZERO) ? e.NaN.clone() : r.eq(e.ZERO) ? e.NEGATIVE_INFINITY.clone() : r.lte(e.MAX_SAFE_INTEGER) ? new e(Math.log10(r.toNumber())) : r.isFinite() ? r.gt(e.TETRATED_MAX_SAFE_INTEGER) ? r : (r.operator(1, r.operator(1) - 1),
        r.standardize()) : r
    }
    ,
    s.generalLogarithm = s.log10 = function(r) {
        return new e(r).log10()
    }
    ,
    o.logarithm = o.logBase = function(r) {
        return void 0 === r && (r = Math.E),
        this.log10().div(e.log10(r))
    }
    ,
    s.logarithm = s.logBase = function(r, t) {
        return new e(r).logBase(t)
    }
    ,
    o.naturalLogarithm = o.log = o.ln = function() {
        return this.logBase(Math.E)
    }
    ,
    s.naturalLogarithm = s.log = s.ln = function(r) {
        return new e(r).ln()
    }
    ;
    o.lambertw = function() {
        var r = this.clone();
        if (r.isNaN())
            return r;
        if (r.lt(-.3678794411710499))
            throw Error("lambertw is unimplemented for results less than -1, sorry!");
        return r.gt(e.TETRATED_MAX_SAFE_INTEGER) ? r : r.gt(e.EE_MAX_SAFE_INTEGER) ? (r.operator(1, r.operator(1) - 1),
        r) : r.gt(e.MAX_SAFE_INTEGER) ? function(r, t) {
            var n, a, i, o;
            if (void 0 === t && (t = 1e-10),
            !(r = new e(r)).isFinite())
                return r;
            if (0 === r)
                return r;
            if (1 === r)
                return .5671432904097838;
            n = e.ln(r);
            for (var s = 0; s < 100; ++s) {
                if (a = e.exp(-n),
                i = n.sub(r.mul(a)),
                o = n.sub(i.div(n.add(e.ONE).sub(n.add(2).mul(i).div(e.mul(2, n).add(2))))),
                e.abs(o.sub(n)).lt(e.abs(o).mul(t)))
                    return o;
                n = o
            }
            throw Error("Iteration failed to converge: " + r)
        }(r) : new e(function(r, e) {
            var t, n;
            if (void 0 === e && (e = 1e-10),
            !Number.isFinite(r))
                return r;
            if (0 === r)
                return r;
            if (1 === r)
                return .5671432904097838;
            t = r < 10 ? 0 : Math.log(r) - Math.log(Math.log(r));
            for (var a = 0; a < 100; ++a) {
                if (n = (r * Math.exp(-t) + t * t) / (t + 1),
                Math.abs(n - t) < e * Math.abs(n))
                    return n;
                t = n
            }
            throw Error("Iteration failed to converge: " + r)
        }(r.sign * r.operator(0)))
    }
    ,
    s.lambertw = function(r) {
        return new e(r).lambertw()
    }
    ,
    o.tetrate = o.tetr = function(r, t) {
        void 0 === t && (t = e.ONE);
        var n, a = this.clone();
        if (r = new e(r),
        (t = new e(t)).neq(e.ONE) && (r = r.add(t.slog(a))),
        e.debug >= e.NORMAL && console.log(a + "^^" + r),
        a.isNaN() || r.isNaN() || t.isNaN())
            return e.NaN.clone();
        if (r.isInfinite() && r.sign > 0)
            return a.gte(Math.exp(1 / Math.E)) ? e.POSITIVE_INFINITY.clone() : (n = a.ln().neg()).lambertw().div(n);
        if (r.lte(-2))
            return e.NaN.clone();
        if (a.eq(e.ZERO))
            return r.eq(e.ZERO) ? e.NaN.clone() : r.mod(2).eq(e.ZERO) ? e.ZERO.clone() : e.ONE.clone();
        if (a.eq(e.ONE))
            return r.eq(e.ONE.neg()) ? e.NaN.clone() : e.ONE.clone();
        if (r.eq(e.ONE.neg()))
            return e.ZERO.clone();
        if (r.eq(e.ZERO))
            return e.ONE.clone();
        if (r.eq(e.ONE))
            return a;
        if (r.eq(2))
            return a.pow(a);
        if (a.eq(2)) {
            if (r.eq(3))
                return new e(16);
            if (r.eq(4))
                return new e(65536)
        }
        var i = a.max(r);
        if (i.gt("10^^^9007199254740991"))
            return i;
        if (i.gt(e.TETRATED_MAX_SAFE_INTEGER) || r.gt(e.MAX_SAFE_INTEGER)) {
            if (this.lt(Math.exp(1 / Math.E)))
                return (n = a.ln().neg()).lambertw().div(n);
            var o = a.slog(10).add(r);
            return o.operator(2, (r.operator(2) || 0) + 1),
            o.standardize(),
            o
        }
        for (var s = r.toNumber(), u = Math.floor(s), f = a.pow(s - u), l = e.NaN, h = 0, c = new e(e.E_MAX_SAFE_INTEGER); 0 !== u && f.lt(c) && h < 100; ++h)
            if (u > 0) {
                if (f = a.pow(f),
                l.eq(f)) {
                    u = 0;
                    break
                }
                l = f,
                --u
            } else {
                if (f = f.logBase(a),
                l.eq(f)) {
                    u = 0;
                    break
                }
                l = f,
                ++u
            }
        return (100 == h || this.lt(Math.exp(1 / Math.E))) && (u = 0),
        f.operator(1, f.operator(1) + u || u),
        f.standardize(),
        f
    }
    ,
    s.tetrate = s.tetr = function(r, t, n) {
        return new e(r).tetr(t, n)
    }
    ,
    o.iteratedexp = function(r, e) {
        return this.tetr(r, e)
    }
    ,
    s.iteratedexp = function(r, t, n) {
        return new e(r).iteratedexp(other, n)
    }
    ,
    o.iteratedlog = function(r, t) {
        void 0 === r && (r = 10),
        void 0 === t && (t = e.ONE.clone());
        var n = this.clone();
        return t.eq(e.ZERO) ? n : t.eq(e.ONE) ? n.logBase(r) : (r = new e(r),
        t = new e(t),
        r.tetr(n.slog(r).sub(t)))
    }
    ,
    s.iteratedlog = function(r, t, n) {
        return new e(r).iteratedlog(t, n)
    }
    ,
    o.layeradd = function(r, t) {
        void 0 === t && (t = 10),
        void 0 === r && (r = e.ONE.clone());
        var n = this.clone();
        return t = new e(t),
        r = new e(r),
        t.tetr(n.slog(t).add(r))
    }
    ,
    s.layeradd = function(r, t, n) {
        return new e(r).layeradd(t, n)
    }
    ,
    o.layeradd10 = function(r) {
        return this.layeradd(r)
    }
    ,
    s.layeradd10 = function(r, t) {
        return new e(r).layeradd10(t)
    }
    ,
    o.ssqrt = o.ssrt = function() {
        var r = this.clone();
        if (r.lt(Math.exp(-1 / Math.E)))
            return e.NaN.clone();
        if (!r.isFinite())
            return r;
        if (r.gt(e.TETRATED_MAX_SAFE_INTEGER))
            return r;
        if (r.gt(e.EE_MAX_SAFE_INTEGER))
            return r.operator(1, r.operator(1) - 1),
            r;
        var t = r.ln();
        return t.div(t.lambertw())
    }
    ,
    s.ssqrt = s.ssrt = function(r) {
        return new e(r).ssqrt()
    }
    ,
    o.slog = function(r) {
        void 0 === r && (r = 10);
        var t = new e(this);
        if (r = new e(r),
        t.isNaN() || r.isNaN() || t.isInfinite() && r.isInfinite())
            return e.NaN.clone();
        if (t.isInfinite())
            return t;
        if (r.isInfinite())
            return e.ZERO.clone();
        if (t.lt(e.ZERO))
            return e.ONE.neg();
        if (t.eq(e.ONE))
            return e.ZERO.clone();
        if (t.eq(r))
            return e.ONE.clone();
        if (r.lt(Math.exp(1 / Math.E))) {
            var n = e.tetr(r, 1 / 0);
            if (t.eq(n))
                return e.POSITIVE_INFINITY.clone();
            if (t.gt(n))
                return e.NaN.clone()
        }
        if (t.max(r).gt("10^^^9007199254740991"))
            return t.gt(r) ? t : e.ZERO.clone();
        if (t.max(r).gt(e.TETRATED_MAX_SAFE_INTEGER))
            return t.gt(r) ? (t.operator(2, t.operator(2) - 1),
            t.standardize(),
            t.sub(t.operator(1))) : e.ZERO.clone();
        var a = 0
          , i = (t.operator(1) || 0) - (r.operator(1) || 0);
        if (i > 3) {
            var o = i - 3;
            a += o,
            t.operator(1, t.operator(1) - o)
        }
        for (var s = 0; s < 100; ++s)
            if (t.lt(e.ZERO))
                t = e.pow(r, t),
                --a;
            else {
                if (t.lte(1))
                    return new e(a + t.toNumber() - 1);
                ++a,
                t = e.logBase(t, r)
            }
        return t.gt(10) ? new e(a) : void 0
    }
    ,
    s.slog = function(r, t) {
        return new e(r).slog(t)
    }
    ,
    o.pentate = o.pent = function(r) {
        return this.arrow(3)(r);
    },
    s.pentate = s.pent = function(r, t) {
        return e.arrow(r, 3, t);
    },
    o.hexate = o.hexate = function(r) {
        return this.arrow(4)(r);
    },
    s.hexate = s.hexate = function(r, t) {
        return e.arrow(r, 4, t);
    },
    o.heptate = o.heptate = function(r) {
        return this.arrow(5)(r);
    },
    s.heptate = s.heptate = function(r, t) {
        return e.arrow(r, 5, t);
    },
    o.octate = o.octate = function(r) {
        return this.arrow(6)(r);
    },
    s.octate = s.octate = function(r, t) {
        return e.arrow(r, 6, t);
    },
    o.nonate = o.nonate = function(r) {
        return this.arrow(7)(r);
    },
    s.nonate = s.nonate = function(r, t) {
        return e.arrow(r, 7, t);
    },
    o.decate = o.decate = function(r) {
        return this.arrow(8)(r);
    },
    s.decate = s.decate = function(r, t) {
        return e.arrow(r, 8, t);
    },
    o.unodecate = o.unodecate = function(r) {
        return this.arrow(9)(r);
    },
    s.unodecate = s.unodecate = function(r, t) {
        return e.arrow(r, 9, t);
    },
    o.dodecate = o.dodecate = function(r) {
        return this.arrow(10)(r);
    },
    s.dodecate = s.dodecate = function(r, t) {
        return e.arrow(r, 10, t);
    },
    o.tridocate = o.tridocate = function(r) {
        return this.arrow(11)(r);
    },
    s.tridocate = s.tridocate = function(r, t) {
        return e.arrow(r, 11, t);
    },
    o.quadocate = o.quadocate = function(r) {
        return this.arrow(12)(r);
    },
    s.quadocate = s.quadocate = function(r, t) {
        return e.arrow(r, 12, t);
    },
    o.quindecate = o.quindecate = function(r) {
        return this.arrow(13)(r);
    },
    s.quindecate = s.quindecate = function(r, t) {
        return e.arrow(r, 13, t);
    },
    o.sedecate = o.sedecate = function(r) {
        return this.arrow(14)(r);
    },
    s.sedecate = s.sedecate = function(r, t) {
        return e.arrow(r, 14, t);
    },
    o.septendecate = o.septendecate = function(r) {
        return this.arrow(15)(r);
    },
    s.septendecate = s.septendecate = function(r, t) {
        return e.arrow(r, 15, t);
    },
    o.big = o.big = function(r) {
        return this.arrow(1000)(r);
    },
    s.big = s.big = function(r, t) {
        return e.arrow(r, 1000, t);
    },
    o.big2 = o.big2 = function(r) {
        return this.arrow(10000)(r);
    },
    s.big2 = s.big2 = function(r, t) {
        return e.arrow(r, 10000, t);
    },
    o.big3 = o.big3 = function(r) {
        return this.arrow(100000)(r);
    },
    s.big3 = s.big3 = function(r, t) {
        return e.arrow(r, 100000, t);
    },
    o.big4 = o.big4 = function(r) {
        return this.arrow(1000000)(r);
    },
    s.big4 = s.big4 = function(r, t) {
        return e.arrow(r, 1000000, t);
    };
    
    o.arrow = function(r) {
        var t = this.clone();
        return !(r = new e(r)).isint() || r.lt(e.ZERO) ? function(r) {
            return e.NaN.clone()
        }
        : r.eq(e.ZERO) ? function(r) {
            return t.mul(r)
        }
        : r.eq(e.ONE) ? function(r) {
            return t.pow(r)
        }
        : r.eq(2) ? function(r) {
            return t.tetr(r)
        }
        : function(n) {
            var a, i;
            if (a = 2 == arguments.length ? arguments[1] : 0,
            n = new e(n),
            e.debug >= e.NORMAL && console.log(t + "{" + r + "}" + n),
            t.isNaN() || n.isNaN())
                return e.NaN.clone();
            if (n.lt(e.ZERO))
                return e.NaN.clone();
            if (t.eq(e.ZERO))
                return n.eq(e.ONE) ? e.ZERO.clone() : e.NaN.clone();
            if (t.eq(e.ONE))
                return e.ONE.clone();
            if (n.eq(e.ZERO))
                return e.ONE.clone();
            if (n.eq(e.ONE))
                return t.clone();
            if (r.gt(e.MAX_SAFE_INTEGER))
                return (i = r.clone()).layer++,
                i;
            if (n.eq(2))
                return t.arrow(r - 1)(t, a + 1);
            if (t.max(n).gt("10{" + r.add(e.ONE) + "}9007199254740991"))
                return t.max(n);
            if (t.gt("10{" + r + "}9007199254740991") || n.gt(e.MAX_SAFE_INTEGER)) {
                t.gt("10{" + r + "}9007199254740991") ? ((i = t.clone()).operator(r, i.operator(r) - 1),
                i.standardize()) : i = t.gt("10{" + r.sub(e.ONE) + "}9007199254740991") ? new e(t.operator(r - 1)) : e.ZERO;
                var o = i.add(n);
                return o.operator(r, (n.operator(r) || 0) + 1),
                o.standardize(),
                o
            }
            if (a >= e.maxOps + 10)
                return new e([[0, 10], [Number(r), 1]]);
            var s = n.toNumber()
              , u = Math.floor(s);
            i = t.arrow(r.sub(1))(s - u, a + 1);
            for (var f = 0, l = new e("10{" + r.sub(e.ONE) + "}9007199254740991"); 0 !== u && i.lt(l) && f < 100; ++f)
                u > 0 && (i = t.arrow(r.sub(e.ONE))(i, a + 1),
                --u);
            return 100 == f && (u = 0),
            i.operator(Number(r.sub(e.ONE)), i.operator(Number(r.sub(e.ONE))) + u || u),
            i.standardize(),
            i
        }
    }
    ,
    o.chain = function(r, e) {
        return this.arrow(e)(r)
    }
    ,
    s.arrow = function(r, t, n) {
        return new e(r).arrow(t)(n)
    }
    ,
    s.chain = function(r, t, n) {
        return new e(r).arrow(n)(t)
    }
    ,
    s.hyper = function(r) {
        return (r = new e(r)).eq(e.ZERO) ? function(r, t) {
            return new e(t).eq(e.ZERO) ? new e(r) : new e(r).add(e.ONE)
        }
        : r.eq(e.ONE) ? function(r, t) {
            return e.add(r, t)
        }
        : function(t, n) {
            return new e(t).arrow(r.sub(2))(n)
        }
    }
    ,
    o.expansion = function(r) {
        var t, n = this.clone();
        if (r = new e(r),
        e.debug >= e.NORMAL && console.log("{" + n + "," + r + ",1,2}"),
        r.lte(e.ZERO) || !r.isint())
            return e.NaN.clone();
        if (r.eq(e.ONE))
            return n.clone();
        if (!n.isint())
            return e.NaN.clone();
        if (n.eq(2))
            return new e(4);
        if (r.gt(e.MAX_SAFE_INTEGER))
            return e.POSITIVE_INFINITY.clone();
        var a = r.toNumber() - 1;
        t = n;
        for (var i = 0; 0 !== a && t.lt(e.MAX_SAFE_INTEGER) && i < 100; ++i)
            a > 0 && (t = n.arrow(t)(n),
            --a);
        return 100 == i && (a = 0),
        t.layer += a,
        t.standardize(),
        t
    }
    ,
    s.expansion = function(r, t) {
        return new e(r).expansion(t)
    }
    ,
    s.affordGeometricSeries = function(r, t, n, a) {
        r = new e(r),
        t = new e(t),
        n = new e(n);
        var i = t.mul(n.pow(a));
        return e.floor(r.div(i).mul(n.sub(e.ONE)).add(e.ONE).log10().div(n.log10()))
    }
    ,
    s.affordArithmeticSeries = function(r, t, n, a) {
        r = new e(r),
        t = new e(t),
        n = new e(n),
        a = new e(a);
        var i = t.add(a.mul(n)).sub(n.div(2))
          , o = i.pow(2);
        return i.neg().add(o.add(n.mul(r).mul(2)).sqrt()).div(n).floor()
    }
    ,
    s.sumGeometricSeries = function(r, t, n, a) {
        return t = new e(t),
        n = new e(n),
        t.mul(n.pow(a)).mul(e.sub(e.ONE, n.pow(r))).div(e.sub(e.ONE, n))
    }
    ,
    s.sumArithmeticSeries = function(r, t, n, a) {
        r = new e(r),
        t = new e(t),
        a = new e(a);
        var i = t.add(a.mul(n));
        return r.div(2).mul(i.mul(2).plus(r.sub(e.ONE).mul(n)))
    }
    ,
    s.choose = function(r, t) {
        return new e(r).factorial().div(new e(t).factorial().mul(new e(r).sub(new e(t)).factorial()))
    }
    ,
    o.choose = function(r) {
        return e.choose(this, r)
    }
    ,
    o.standardize = function() {
        var r, t = this;
        if (e.debug >= e.ALL && console.log(t.toString()),
        t.array && t.array.length || (t.array = [[0, 0]]),
        1 != t.sign && -1 != t.sign && ("number" != typeof t.sign && (t.sign = Number(t.sign)),
        t.sign = t.sign < 0 ? -1 : 1),
        t.layer > 9007199254740991)
            return t.array = [[0, 1 / 0]],
            t.layer = 0,
            t;
        Number.isInteger(t.layer) && (t.layer = Math.floor(t.layer));
        for (var n = 0; n < t.array.length; ++n) {
            var a = t.array[n];
            if (null !== a[0] && void 0 !== a[0] || (a[0] = 0),
            0 === a[0] || 0 !== a[1] && null !== a[1] && void 0 !== a[1]) {
                if (isNaN(a[0]) || isNaN(a[1]))
                    return t.array = [[0, NaN]],
                    t;
                if (!isFinite(a[0]) || !isFinite(a[1]))
                    return t.array = [[0, 1 / 0]],
                    t;
                Number.isInteger(a[0]) || (a[0] = Math.floor(a[0])),
                0 === a[0] || Number.isInteger(a[1]) || (a[1] = Math.floor(a[1]))
            } else
                t.array.splice(n, 1),
                --n
        }
        do {
            for (e.debug >= e.ALL && console.log(t.toString()),
            r = !1,
            t.array.sort(function(r, e) {
                return r[0] > e[0] ? 1 : r[0] < e[0] ? -1 : 0
            }),
            t.array.length > e.maxOps && t.array.splice(0, t.array.length - e.maxOps),
            t.array.length || (t.array = [[0, 0]]),
            t.array[t.array.length - 1][0] > 9007199254740991 ? (t.layer++,
            t.array = [[0, t.array[t.array.length - 1][0]]],
            r = !0) : t.layer && 1 == t.array.length && 0 === t.array[0][0] && (t.layer--,
            0 === t.array[0][1] ? t.array = [[0, 10]] : t.array = [[0, 10], [Math.round(t.array[0][1]), 1]],
            r = !0),
            t.array.length < e.maxOps && 0 !== t.array[0][0] && t.array.unshift([0, 10]),
            n = 0; n < t.array.length - 1; ++n)
                t.array[n][0] == t.array[n + 1][0] && (t.array[n][1] += t.array[n + 1][1],
                t.array.splice(n + 1, 1),
                --n,
                r = !0);
            for (0 === t.array[0][0] && t.array[0][1] > 9007199254740991 && (t.array.length >= 2 && 1 == t.array[1][0] ? t.array[1][1]++ : t.array.splice(1, 0, [1, 1]),
            t.array[0][1] = Math.log10(t.array[0][1]),
            r = !0); t.array.length >= 2 && 0 === t.array[0][0] && t.array[0][1] < i && 1 == t.array[1][0] && t.array[1][1]; )
                t.array[0][1] = Math.pow(10, t.array[0][1]),
                t.array[1][1] > 1 ? t.array[1][1]-- : t.array.splice(1, 1),
                r = !0;
            for (; t.array.length >= 2 && 0 === t.array[0][0] && 1 == t.array[0][1] && t.array[1][1]; )
                t.array[1][1] > 1 ? t.array[1][1]-- : t.array.splice(1, 1),
                t.array[0][1] = 10;
            for (t.array.length >= 2 && 0 === t.array[0][0] && 1 != t.array[1][0] && (t.array[0][1] && t.array.splice(1, 0, [t.array[1][0] - 1, t.array[0][1]]),
            t.array[0][1] = 1,
            t.array[2][1] > 1 ? t.array[2][1]-- : t.array.splice(2, 1),
            r = !0),
            n = 1; n < t.array.length; ++n)
                t.array[n][1] > 9007199254740991 && (n != t.array.length - 1 && t.array[n + 1][0] == t.array[n][0] + 1 ? t.array[n + 1][1]++ : t.array.splice(n + 1, 0, [t.array[n][0] + 1, 1]),
                0 === t.array[0][0] ? t.array[0][1] = t.array[n][1] + 1 : t.splice(0, 0, [0, t.array[n][1] + 1]),
                t.splice(1, n),
                r = !0)
        } while (r);
        return t.array.length || (t.array = [[0, 0]]),
        t
    }
    ,
    o.toNumber = function() {
        return -1 == this.sign ? -1 * this.abs() : this.array.length >= 2 && (this.array[1][0] >= 2 || this.array[1][1] >= 2 || 1 == this.array[1][1] && this.array[0][1] > Math.log10(Number.MAX_VALUE)) ? 1 / 0 : this.array.length >= 2 && 1 == this.array[1][1] ? Math.pow(10, this.array[0][1]) : this.array[0][1]
    }
    ,
    o.toString = function() {
        if (-1 == this.sign)
            return "-" + this.abs();
        if (isNaN(this.array[0][1]))
            return "NaN";
        if (!isFinite(this.array[0][1]))
            return "Infinity";
        var r = "";
        if (this.layer ? this.layer < 3 ? r += "J".repeat(this.layer) : r += "J^" + this.layer + " " : r += "",
        this.array.length >= 3 || 2 == this.array.length && this.array[1][0] >= 2)
            for (var e = this.array.length - 1; e >= 2; --e) {
                var t = this.array[e]
                  , n = t[0] >= 5 ? "{" + t[0] + "}" : "^".repeat(t[0]);
                t[1] > 1 ? r += "(10" + n + ")^" + t[1] + " " : 1 == t[1] && (r += "10" + n)
            }
        var a = this.operator(0)
          , i = this.operator(1);
        return r += i ? i < 3 ? "e".repeat(i - 1) + Math.pow(10, a - Math.floor(a)) + "e" + Math.floor(a) : i < 8 ? "e".repeat(i) + a : "(10^)^" + i + " " + a : String(a)
    }
    ;
    var f = function(r, e) {
        var t = e + 1
          , n = Math.ceil(Math.log10(Math.abs(r)))
          , a = Math.round(r * Math.pow(10, t - n)) * Math.pow(10, n - t);
        return parseFloat(a.toFixed(Math.max(t - n, 0)))
    };
    function l(r) {
        if (!r || "object" != typeof r)
            throw Error(t + "Object expected");
        var e, a, i, o = ["maxOps", 1, Number.MAX_SAFE_INTEGER, "serializeMode", 0, 1, "debug", 0, 2];
        for (e = 0; e < o.length; e += 3)
            if (void 0 !== (i = r[a = o[e]])) {
                if (!(Math.floor(i) === i && i >= o[e + 1] && i <= o[e + 2]))
                    throw Error(n + a + ": " + i);
                this[a] = i
            }
        return this
    }
    o.toStringWithDecimalPlaces = function(r, e) {
        if (-1 == this.sign)
            return "-" + this.abs();
        if (isNaN(this.array[0][1]))
            return "NaN";
        if (!isFinite(this.array[0][1]))
            return "Infinity";
        var t = 0
          , n = ""
          , a = Math.pow(10, r);
        if (this.layer ? this.layer < 3 ? n += "J".repeat(this.layer) : n += "J^" + this.layer + " " : n += "",
        this.array.length >= 3 || 2 == this.array.length && this.array[1][0] >= 2)
            for (var i = this.array.length - 1; !t && i >= 2; --i) {
                var o = this.array[i]
                  , s = o[0]
                  , u = o[1];
                e && u >= a ? (++s,
                t = u,
                u = 1) : e && this.array[i - 1][0] == s - 1 && this.array[i - 1][1] >= a && (++u,
                t = this.array[i - 1][1]);
                var l = s >= 5 ? "{" + s + "}" : "^".repeat(s);
                u > 1 ? n += "(10" + l + ")^" + u + " " : 1 == u && (n += "10" + l)
            }
        var h = this.operator(0)
          , c = this.operator(1);
        return h > a && (h = Math.log10(h),
        ++c),
        n += t ? f(t, r) : c ? c < 3 ? "e".repeat(c - 1) + f(Math.pow(10, h - Math.floor(h)), r) + "e" + f(Math.floor(h), r) : c < 8 ? "e".repeat(c) + f(h, r) : e ? "(10^)^" + f(c, r) + " " + f(h, r) : "(10^)^" + c + " " + f(h, r) : String(f(h, r))
    }
    ,
    o.toExponential = function(r, e) {
        return 1 == this.array.length ? (this.sign * this.array[0][1]).toExponential(r) : this.toStringWithDecimalPlaces(r, e)
    }
    ,
    o.toFixed = function(r, e) {
        return 1 == this.array.length ? (this.sign * this.array[0][1]).toFixed(r) : this.toStringWithDecimalPlaces(r, e)
    }
    ,
    o.toPrecision = function(r, e) {
        return 0 === this.array[0][1] ? (this.sign * this.array[0][1]).toFixed(r - 1, e) : 1 == this.array.length && this.array[0][1] < 1e-6 ? this.toExponential(r - 1, e) : 1 == this.array.length && r > Math.log10(this.array[0][1]) ? this.toFixed(r - Math.floor(Math.log10(this.array[0][1])) - 1, e) : this.toExponential(r - 1, e)
    }
    ,
    o.valueOf = function() {
        return this.toString()
    }
    ,
    o.toJSON = function() {
        if (e.serializeMode == e.JSON) {
            for (var r = [], t = 0; t < this.array.length; ++t)
                r.push([this.array[t][0], this.array[t][1]]);
            return {
                array: r,
                layer: this.layer,
                sign: this.sign
            }
        }
        if (e.serializeMode == e.STRING)
            return this.toString()
    }
    ,
    o.toHyperE = function() {
        if (this.layer)
            throw Error(t + "Sorry, but this prototype doesn't support correct Hyper-E notation for numbers larger than 10{MSI}10");
        if (-1 == this.sign)
            return "-" + this.abs().toHyperE();
        if (isNaN(this.array[0][1]))
            return "NaN";
        if (!isFinite(this.array[0][1]))
            return "Infinity";
        if (this.lt(e.MAX_SAFE_INTEGER))
            return String(this.array[0][1]);
        if (this.lt(e.E_MAX_SAFE_INTEGER))
            return "E" + this.array[0][1];
        for (var r = "E" + this.operator(0) + "#" + this.operator(1), n = 1, a = Math.ceil(this.getOperatorIndex(2)); a < this.array.length; ++a)
            n + 1 < this.array[a][0] && (r += "#1".repeat(this.array[a][0] - n - 1)),
            n = this.array[a][0],
            r += "#" + (this.array[a][1] + 1);
        return r = this.layer ? this.layer < 3 ? "J".repeat(this.layer) + r : "J^" + this.layer + " " + r : "" + r
    }
    ,
    s.fromNumber = function(r) {
        if ("number" != typeof r)
            throw Error(n + "Expected Number");
        var t = new e;
        return t.array[0][1] = Math.abs(r),
        t.sign = r < 0 ? -1 : 1,
        t.standardize(),
        t
    }
    ,
    s.fromString = function(r) {
        if ("string" != typeof r)
            throw Error(n + "Expected String");
        var o = !1;
        if ("string" == typeof r && ("[" == r[0] || "{" == r[0]))
            try {
                JSON.parse(r)
            } finally {
                o = !0
            }
        if (o)
            return e.fromJSON(r);
        var s = new e;
        if (s.array = [[0, 0]],
        !a.test(r))
            s.array = [[0, NaN]],
            s;
        var u = !1;
        if ("-" == r[0] || "+" == r[0]) {
            var f = r.search(/[^-\+]/);
            u = r.substring(0, f).match(/-/g).length % 2 == 1,
            r = r.substring(f)
        }
        if ("NaN" == r)
            s.array = [[0, NaN]];
        else if ("Infinity" == r)
            s.array = [[0, 1 / 0]];
        else {
            var l, h, c, g, y;
            for ("J" == r[0] && ("^" == r[1] ? (l = r.substring(2).search(/[^0-9]/) + 2,
            s.layer = Number(r.substring(2, l)),
            r = r.substring(l + 1)) : (l = r.search(/[^J]/),
            s.layer = l,
            r = r.substring(l))); r && /^\(?10[\^\{]/.test(r); ) {
                var E;
                "(" == r[0] && (r = r.substring(1)),
                "^" == r[2] ? (E = l = r.substring(2).search(/[^\^]/),
                h = l + 2) : (l = r.indexOf("}"),
                E = Number(r.substring(3, l)),
                h = l + 1),
                ")" == (r = r.substring(h))[0] ? (l = r.indexOf(" "),
                c = Number(r.substring(2, l)),
                r = r.substring(l + 1)) : c = 1,
                1 == E ? s.array.length >= 2 && 1 == s.array[1][0] ? s.array[1][1] += c : s.array.splice(1, 0, [1, c]) : 2 == E ? (l = s.array.length >= 2 && 1 == s.array[1][0] ? s.array[1][1] : 0,
                (h = s.array[0][1]) >= 1e10 && ++l,
                h >= 10 && ++l,
                s.array[0][1] = l,
                s.array.length >= 2 && 1 == s.array[1][0] && s.array.splice(1, 1),
                g = s.getOperatorIndex(2),
                Number.isInteger(g) ? s.array[g][1] += c : s.array.splice(Math.ceil(g), 0, [2, c])) : (l = s.operator(E - 1),
                (h = s.operator(E - 2)) >= 10 && ++l,
                g = s.getOperatorIndex(E),
                s.array.splice(1, Math.ceil(g) - 1),
                s.array[0][1] = l,
                Number.isInteger(g) ? s.array[1][1] += c : s.array.splice(1, 0, [E, c]))
            }
            for (l = r.split(/[Ee]/),
            h = [s.array[0][1], 0],
            c = 1,
            y = l.length - 1; y >= 0; --y)
                g = l[y] ? Number(l[y]) : 1,
                h[0] < i && 0 === h[1] ? h[0] = Math.pow(10, c * h[0]) : -1 == c ? (0 === h[1] ? h[0] = Math.pow(10, c * h[0]) : 1 == h[1] && h[0] <= Math.log10(Number.MAX_VALUE) ? h[0] = Math.pow(10, c * Math.pow(10, h[0])) : h[0] = 0,
                h[1] = 0) : h[1]++,
                0 === h[1] ? h[0] *= Number(g) : 1 == h[1] ? h[0] += Math.log10(Number(g)) : 2 == h[1] && h[0] < i + Math.log10(Math.log10(Number(g))) && (h[0] += Math.log10(1 + Math.pow(10, Math.log10(Math.log10(Number(g))) - h[0]))),
                h[0] < i && h[1] ? (h[0] = Math.pow(10, h[0]),
                h[1]--) : h[0] > 9007199254740991 && (h[0] = Math.log10(h[0]),
                h[1]++);
            s.array[0][1] = h[0],
            h[1] && (s.array.length >= 2 && 1 == s.array[1][0] ? s.array[1][1] += h[1] : s.array.splice(1, 0, [1, h[1]]))
        }
        return u && (s.sign *= -1),
        s.standardize(),
        s
    }
    ,
    s.fromArray = function(r, t, a) {
        var i, o;
        if (!(r instanceof Array) || void 0 !== t && "number" != typeof t || void 0 !== a && "number" != typeof a)
            if ("number" == typeof r && t instanceof Array && (void 0 === a || "number" == typeof a))
                i = t,
                o = r,
                a || 0;
            else {
                if (!("number" == typeof r && "number" == typeof t && a instanceof Array))
                    throw Error(n + "Expected an Array [and 1 or 2 Number]");
                i = a,
                o = r,
                t
            }
        else
            i = r,
            o = t,
            a || 0;
        var s, u = new e;
        if (i.length)
            if ("number" == typeof i[0])
                for (u.array = [],
                s = 0; s < i.length; s++) {
                    if ("number" != typeof i[s])
                        throw Error(n + "Expected Array of Number");
                    u.array.push([s, i[s]])
                }
            else {
                if (!(i[0]instanceof Array))
                    throw Error(n + "Expected Array of Number or Array of pair of Number");
                for (u.array = [],
                s = 0; s < i.length; s++) {
                    if (!(i[s]instanceof Array) || "number" != typeof i[s][0] || "number" != typeof i[s][1])
                        throw Error(n + "Expected Array of pair of Number");
                    u.array.push([i[s][0], i[s][1]])
                }
            }
        else
            u.array = [[0, 0]];
        return u.sign = o ? Number(o) : 1,
        u.standardize(),
        u
    }
    ,
    s.fromObject = function(r) {
        if ("object" != typeof r)
            throw Error(n + "Expected Object");
        if (null === r)
            return e.ZERO.clone();
        if (r instanceof Array)
            return e.fromArray(r);
        if (r instanceof e)
            return new e(r);
        if (!(r.array instanceof Array))
            throw Error(n + "Expected that property 'array' exists");
        if (void 0 !== r.sign && "number" != typeof r.sign)
            throw Error(n + "Expected that property 'sign' is Number");
        if (void 0 !== r.layer && "number" != typeof r.layer)
            throw Error(n + "Expected that property 'layer' is Number");
        return e.fromArray(r.array, r.sign, r.layer)
    }
    ,
    s.fromJSON = function(r) {
        if ("object" == typeof r)
            return e.fromObject(t);
        if ("string" != typeof r)
            throw Error(n + "Expected String");
        var t, a;
        try {
            t = JSON.parse(r)
        } catch (r) {
            throw t = null,
            r
        } finally {
            a = e.fromObject(t)
        }
        return t = null,
        a
    }
    ,
    s.fromHyperE = function(r) {
        if ("string" != typeof r)
            throw Error(n + "Expected String");
        var a = new e;
        if (a.array = [[0, 0]],
        !/^[-\+]*(0|[1-9]\d*(\.\d*)?|Infinity|NaN|E[1-9]\d*(\.\d*)?(#[1-9]\d*)*)$/.test(r))
            return console.warn(t + "Malformed input: " + r),
            a.array = [[0, NaN]],
            a;
        var i = !1;
        if ("-" == r[0] || "+" == r[0]) {
            var o = r.search(/[^-\+]/);
            i = r.substring(0, o).match(/-/g).length % 2 == 0,
            r = r.substring(o)
        }
        if ("NaN" == r)
            a.array = [[0, NaN]];
        else if ("Infinity" == r)
            a.array = [[0, 1 / 0]];
        else if ("E" != r[0])
            a.array[0][1] = Number(r);
        else if (-1 == r.indexOf("#"))
            a.array[0][1] = Number(r.substring(1)),
            a.array[1] = [1, 1];
        else
            for (var s = r.substring(1).split("#"), u = 0; u < s.length; ++u) {
                var f = Number(s[u]);
                u >= 2 && --f,
                a.array[u] = [u, f]
            }
        return i && (a.sign *= -1),
        a.standardize(),
        a
    }
    ,
    o.getOperatorIndex = function(r) {
        if ("number" != typeof r && (r = Number(r)),
        !isFinite(r))
            throw Error(n + "Index out of range.");
        var e = this.array
          , t = 0
          , a = e.length - 1;
        if (e[a][0] < r)
            return a + .5;
        if (e[t][0] > r)
            return -.5;
        for (; t != a; ) {
            if (e[t][0] == r)
                return t;
            if (e[a][0] == r)
                return a;
            var i = Math.floor((t + a) / 2);
            if (t == i || e[i][0] == r) {
                t = i;
                break
            }
            e[i][0] < r && (t = i),
            e[i][0] > r && (a = i)
        }
        return e[t][0] == r ? t : t + .5
    }
    ,
    o.getOperator = function(r) {
        if ("number" != typeof r && (r = Number(r)),
        !isFinite(r))
            throw Error(n + "Index out of range.");
        var e = this.getOperatorIndex(r);
        return Number.isInteger(e) ? this.array[e][1] : 0 === r ? 10 : 0
    }
    ,
    o.setOperator = function(r, e) {
        if ("number" != typeof r && (r = Number(r)),
        !isFinite(r))
            throw Error(n + "Index out of range.");
        var t = this.getOperatorIndex(r);
        Number.isInteger(t) ? this.array[t][1] = e : (t = Math.ceil(t),
        this.array.splice(t, 0, [r, e])),
        this.standardize()
    }
    ,
    o.operator = function(r, e) {
        if (void 0 === e)
            return this.getOperator(r);
        this.setOperator(r, e)
    }
    ,
    o.clone = function() {
        for (var r = new e, t = [], n = 0; n < this.array.length; ++n)
            t.push([this.array[n][0], this.array[n][1]]);
        return r.array = t,
        r.sign = this.sign,
        r.layer = this.layer,
        r
    }
    ,
    (e = function(r) {
        for (var t in u)
            u.hasOwnProperty(t) && (Object.defineProperty ? Object.defineProperty(r, t, {
                configurable: !1,
                enumerable: !0,
                writable: !1,
                value: new e(u[t])
            }) : r[t] = new e(u[t]));
        return r
    }(e = function r(e) {
        var t, n, a;
        function i(r, e) {
            var t = this;
            if (!(t instanceof i))
                return new i(r,e);
            t.constructor = i;
            var n, a, o, s = null;
            if ("string" == typeof r && ("[" == r[0] || "{" == r[0]))
                try {
                    s = JSON.parse(r)
                } catch (r) {}
            if ("number" != typeof r || e instanceof Array)
                if (s)
                    n = i.fromObject(s);
                else if ("string" == typeof r && "E" == r[0])
                    n = i.fromHyperE(r);
                else if ("string" == typeof r)
                    n = i.fromString(r);
                else if (r instanceof Array || e instanceof Array)
                    n = i.fromArray(r, e);
                else if (r instanceof i) {
                    n = [];
                    for (var u = 0; u < r.array.length; ++u)
                        n.push([r.array[u][0], r.array[u][1]]);
                    a = r.sign,
                    o = r.layer
                } else
                    "object" == typeof r ? n = i.fromObject(r) : (n = [[0, NaN]],
                    a = 1,
                    o = 0);
            else
                n = i.fromNumber(r);
            return void 0 === a ? (t.array = n.array,
            t.sign = n.sign,
            t.layer = n.layer) : (t.array = n,
            t.sign = a,
            t.layer = o),
            t
        }
        for (var u in i.prototype = o,
        i.JSON = 0,
        i.STRING = 1,
        i.NONE = 0,
        i.NORMAL = 1,
        i.ALL = 2,
        i.clone = r,
        i.config = i.set = l,
        s)
            s.hasOwnProperty(u) && (i[u] = s[u]);
        if (void 0 === e && (e = {}),
        e)
            for (a = ["maxOps", "serializeMode", "debug"],
            t = 0; t < a.length; )
                e.hasOwnProperty(n = a[t++]) || (e[n] = this[n]);
        return i.config(e),
        i
    }(e))).default = e.ExpantaNum = e,
    "function" == typeof define && define.amd ? define(function() {
        return e
    }) : "undefined" != typeof module && module.exports ? module.exports = e : (r || (r = "undefined" != typeof self && self && self.self == self ? self : Function("return this")()),
    r.ExpantaNum = e)
  }(this);