module.exports = /******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {} // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }) // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__,
    ) // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true // Return the exports of the module
    /******/
    /******/ /******/ return module.exports
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter })
      /******/
    }
    /******/
  } // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true })
    /******/
  } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode,
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value })
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key]
          }.bind(null, key),
        )
    /******/ return ns
    /******/
  } // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default']
          }
        : /******/ function getModuleExports() {
            return module
          }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  } // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  } // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 'fb15'))
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ '01f9': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var LIBRARY = __webpack_require__('2d00')
      var $export = __webpack_require__('5ca1')
      var redefine = __webpack_require__('2aba')
      var hide = __webpack_require__('32e9')
      var Iterators = __webpack_require__('84f2')
      var $iterCreate = __webpack_require__('41a0')
      var setToStringTag = __webpack_require__('7f20')
      var getPrototypeOf = __webpack_require__('38fd')
      var ITERATOR = __webpack_require__('2b4c')('iterator')
      var BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
      var FF_ITERATOR = '@@iterator'
      var KEYS = 'keys'
      var VALUES = 'values'

      var returnThis = function() {
        return this
      }

      module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
        $iterCreate(Constructor, NAME, next)
        var getMethod = function(kind) {
          if (!BUGGY && kind in proto) return proto[kind]
          switch (kind) {
            case KEYS:
              return function keys() {
                return new Constructor(this, kind)
              }
            case VALUES:
              return function values() {
                return new Constructor(this, kind)
              }
          }
          return function entries() {
            return new Constructor(this, kind)
          }
        }
        var TAG = NAME + ' Iterator'
        var DEF_VALUES = DEFAULT == VALUES
        var VALUES_BUG = false
        var proto = Base.prototype
        var $native = proto[ITERATOR] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT])
        var $default = $native || getMethod(DEFAULT)
        var $entries = DEFAULT ? (!DEF_VALUES ? $default : getMethod('entries')) : undefined
        var $anyNative = NAME == 'Array' ? proto.entries || $native : $native
        var methods, key, IteratorPrototype
        // Fix native
        if ($anyNative) {
          IteratorPrototype = getPrototypeOf($anyNative.call(new Base()))
          if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
            // Set @@toStringTag to native iterators
            setToStringTag(IteratorPrototype, TAG, true)
            // fix for some old engines
            if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function')
              hide(IteratorPrototype, ITERATOR, returnThis)
          }
        }
        // fix Array#{values, @@iterator}.name in V8 / FF
        if (DEF_VALUES && $native && $native.name !== VALUES) {
          VALUES_BUG = true
          $default = function values() {
            return $native.call(this)
          }
        }
        // Define iterator
        if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
          hide(proto, ITERATOR, $default)
        }
        // Plug for library
        Iterators[NAME] = $default
        Iterators[TAG] = returnThis
        if (DEFAULT) {
          methods = {
            values: DEF_VALUES ? $default : getMethod(VALUES),
            keys: IS_SET ? $default : getMethod(KEYS),
            entries: $entries,
          }
          if (FORCED)
            for (key in methods) {
              if (!(key in proto)) redefine(proto, key, methods[key])
            }
          else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods)
        }
        return methods
      }

      /***/
    },

    /***/ '0a49': /***/ function(module, exports, __webpack_require__) {
      // 0 -> Array#forEach
      // 1 -> Array#map
      // 2 -> Array#filter
      // 3 -> Array#some
      // 4 -> Array#every
      // 5 -> Array#find
      // 6 -> Array#findIndex
      var ctx = __webpack_require__('9b43')
      var IObject = __webpack_require__('626a')
      var toObject = __webpack_require__('4bf8')
      var toLength = __webpack_require__('9def')
      var asc = __webpack_require__('cd1c')
      module.exports = function(TYPE, $create) {
        var IS_MAP = TYPE == 1
        var IS_FILTER = TYPE == 2
        var IS_SOME = TYPE == 3
        var IS_EVERY = TYPE == 4
        var IS_FIND_INDEX = TYPE == 6
        var NO_HOLES = TYPE == 5 || IS_FIND_INDEX
        var create = $create || asc
        return function($this, callbackfn, that) {
          var O = toObject($this)
          var self = IObject(O)
          var f = ctx(callbackfn, that, 3)
          var length = toLength(self.length)
          var index = 0
          var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
          var val, res
          for (; length > index; index++)
            if (NO_HOLES || index in self) {
              val = self[index]
              res = f(val, index, O)
              if (TYPE) {
                if (IS_MAP) result[index] = res
                // map
                else if (res)
                  switch (TYPE) {
                    case 3:
                      return true // some
                    case 5:
                      return val // find
                    case 6:
                      return index // findIndex
                    case 2:
                      result.push(val) // filter
                  }
                else if (IS_EVERY) return false // every
              }
            }
          return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result
        }
      }

      /***/
    },

    /***/ '0bfb': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      // 21.2.5.3 get RegExp.prototype.flags
      var anObject = __webpack_require__('cb7c')
      module.exports = function() {
        var that = anObject(this)
        var result = ''
        if (that.global) result += 'g'
        if (that.ignoreCase) result += 'i'
        if (that.multiline) result += 'm'
        if (that.unicode) result += 'u'
        if (that.sticky) result += 'y'
        return result
      }

      /***/
    },

    /***/ '0d58': /***/ function(module, exports, __webpack_require__) {
      // 19.1.2.14 / 15.2.3.14 Object.keys(O)
      var $keys = __webpack_require__('ce10')
      var enumBugKeys = __webpack_require__('e11e')

      module.exports =
        Object.keys ||
        function keys(O) {
          return $keys(O, enumBugKeys)
        }

      /***/
    },

    /***/ '1169': /***/ function(module, exports, __webpack_require__) {
      // 7.2.2 IsArray(argument)
      var cof = __webpack_require__('2d95')
      module.exports =
        Array.isArray ||
        function isArray(arg) {
          return cof(arg) == 'Array'
        }

      /***/
    },

    /***/ '11e9': /***/ function(module, exports, __webpack_require__) {
      var pIE = __webpack_require__('52a7')
      var createDesc = __webpack_require__('4630')
      var toIObject = __webpack_require__('6821')
      var toPrimitive = __webpack_require__('6a99')
      var has = __webpack_require__('69a8')
      var IE8_DOM_DEFINE = __webpack_require__('c69a')
      var gOPD = Object.getOwnPropertyDescriptor

      exports.f = __webpack_require__('9e1e')
        ? gOPD
        : function getOwnPropertyDescriptor(O, P) {
            O = toIObject(O)
            P = toPrimitive(P, true)
            if (IE8_DOM_DEFINE)
              try {
                return gOPD(O, P)
              } catch (e) {
                /* empty */
              }
            if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P])
          }

      /***/
    },

    /***/ '1495': /***/ function(module, exports, __webpack_require__) {
      var dP = __webpack_require__('86cc')
      var anObject = __webpack_require__('cb7c')
      var getKeys = __webpack_require__('0d58')

      module.exports = __webpack_require__('9e1e')
        ? Object.defineProperties
        : function defineProperties(O, Properties) {
            anObject(O)
            var keys = getKeys(Properties)
            var length = keys.length
            var i = 0
            var P
            while (length > i) dP.f(O, (P = keys[i++]), Properties[P])
            return O
          }

      /***/
    },

    /***/ '1c4c': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var ctx = __webpack_require__('9b43')
      var $export = __webpack_require__('5ca1')
      var toObject = __webpack_require__('4bf8')
      var call = __webpack_require__('1fa8')
      var isArrayIter = __webpack_require__('33a4')
      var toLength = __webpack_require__('9def')
      var createProperty = __webpack_require__('f1ae')
      var getIterFn = __webpack_require__('27ee')

      $export(
        $export.S +
          $export.F *
            !__webpack_require__('5cc5')(function(iter) {
              Array.from(iter)
            }),
        'Array',
        {
          // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
          from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
            var O = toObject(arrayLike)
            var C = typeof this == 'function' ? this : Array
            var aLen = arguments.length
            var mapfn = aLen > 1 ? arguments[1] : undefined
            var mapping = mapfn !== undefined
            var index = 0
            var iterFn = getIterFn(O)
            var length, result, step, iterator
            if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2)
            // if object isn't iterable or it's array with default iterator - use simple case
            if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
              for (
                iterator = iterFn.call(O), result = new C();
                !(step = iterator.next()).done;
                index++
              ) {
                createProperty(
                  result,
                  index,
                  mapping ? call(iterator, mapfn, [step.value, index], true) : step.value,
                )
              }
            } else {
              length = toLength(O.length)
              for (result = new C(length); length > index; index++) {
                createProperty(result, index, mapping ? mapfn(O[index], index) : O[index])
              }
            }
            result.length = index
            return result
          },
        },
      )

      /***/
    },

    /***/ '1fa8': /***/ function(module, exports, __webpack_require__) {
      // call something on iterator step with safe closing on error
      var anObject = __webpack_require__('cb7c')
      module.exports = function(iterator, fn, value, entries) {
        try {
          return entries ? fn(anObject(value)[0], value[1]) : fn(value)
          // 7.4.6 IteratorClose(iterator, completion)
        } catch (e) {
          var ret = iterator['return']
          if (ret !== undefined) anObject(ret.call(iterator))
          throw e
        }
      }

      /***/
    },

    /***/ '214f': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var hide = __webpack_require__('32e9')
      var redefine = __webpack_require__('2aba')
      var fails = __webpack_require__('79e5')
      var defined = __webpack_require__('be13')
      var wks = __webpack_require__('2b4c')

      module.exports = function(KEY, length, exec) {
        var SYMBOL = wks(KEY)
        var fns = exec(defined, SYMBOL, ''[KEY])
        var strfn = fns[0]
        var rxfn = fns[1]
        if (
          fails(function() {
            var O = {}
            O[SYMBOL] = function() {
              return 7
            }
            return ''[KEY](O) != 7
          })
        ) {
          redefine(String.prototype, KEY, strfn)
          hide(
            RegExp.prototype,
            SYMBOL,
            length == 2
              ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
                // 21.2.5.11 RegExp.prototype[@@split](string, limit)
                function(string, arg) {
                  return rxfn.call(string, this, arg)
                }
              : // 21.2.5.6 RegExp.prototype[@@match](string)
                // 21.2.5.9 RegExp.prototype[@@search](string)
                function(string) {
                  return rxfn.call(string, this)
                },
          )
        }
      }

      /***/
    },

    /***/ '230e': /***/ function(module, exports, __webpack_require__) {
      var isObject = __webpack_require__('d3f4')
      var document = __webpack_require__('7726').document
      // typeof document.createElement is 'object' in old IE
      var is = isObject(document) && isObject(document.createElement)
      module.exports = function(it) {
        return is ? document.createElement(it) : {}
      }

      /***/
    },

    /***/ '2350': /***/ function(module, exports) {
      /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
      // css base code, injected by the css-loader
      module.exports = function(useSourceMap) {
        var list = []

        // return the list of modules as css string
        list.toString = function toString() {
          return this.map(function(item) {
            var content = cssWithMappingToString(item, useSourceMap)
            if (item[2]) {
              return '@media ' + item[2] + '{' + content + '}'
            } else {
              return content
            }
          }).join('')
        }

        // import a list of modules into the list
        list.i = function(modules, mediaQuery) {
          if (typeof modules === 'string') modules = [[null, modules, '']]
          var alreadyImportedModules = {}
          for (var i = 0; i < this.length; i++) {
            var id = this[i][0]
            if (typeof id === 'number') alreadyImportedModules[id] = true
          }
          for (i = 0; i < modules.length; i++) {
            var item = modules[i]
            // skip already imported module
            // this implementation is not 100% perfect for weird media query combinations
            //  when a module is imported multiple times with different media queries.
            //  I hope this will never occur (Hey this way we have smaller bundles)
            if (typeof item[0] !== 'number' || !alreadyImportedModules[item[0]]) {
              if (mediaQuery && !item[2]) {
                item[2] = mediaQuery
              } else if (mediaQuery) {
                item[2] = '(' + item[2] + ') and (' + mediaQuery + ')'
              }
              list.push(item)
            }
          }
        }
        return list
      }

      function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || ''
        var cssMapping = item[3]
        if (!cssMapping) {
          return content
        }

        if (useSourceMap && typeof btoa === 'function') {
          var sourceMapping = toComment(cssMapping)
          var sourceURLs = cssMapping.sources.map(function(source) {
            return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
          })

          return [content]
            .concat(sourceURLs)
            .concat([sourceMapping])
            .join('\n')
        }

        return [content].join('\n')
      }

      // Adapted from convert-source-map (MIT)
      function toComment(sourceMap) {
        // eslint-disable-next-line no-undef
        var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))
        var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64

        return '/*# ' + data + ' */'
      }

      /***/
    },

    /***/ '23c6': /***/ function(module, exports, __webpack_require__) {
      // getting tag from 19.1.3.6 Object.prototype.toString()
      var cof = __webpack_require__('2d95')
      var TAG = __webpack_require__('2b4c')('toStringTag')
      // ES3 wrong here
      var ARG =
        cof(
          (function() {
            return arguments
          })(),
        ) == 'Arguments'

      // fallback for IE11 Script Access Denied error
      var tryGet = function(it, key) {
        try {
          return it[key]
        } catch (e) {
          /* empty */
        }
      }

      module.exports = function(it) {
        var O, T, B
        return it === undefined
          ? 'Undefined'
          : it === null
          ? 'Null'
          : // @@toStringTag case
          typeof (T = tryGet((O = Object(it)), TAG)) == 'string'
          ? T
          : // builtinTag case
          ARG
          ? cof(O)
          : // ES3 arguments fallback
          (B = cof(O)) == 'Object' && typeof O.callee == 'function'
          ? 'Arguments'
          : B
      }

      /***/
    },

    /***/ '27ee': /***/ function(module, exports, __webpack_require__) {
      var classof = __webpack_require__('23c6')
      var ITERATOR = __webpack_require__('2b4c')('iterator')
      var Iterators = __webpack_require__('84f2')
      module.exports = __webpack_require__('8378').getIteratorMethod = function(it) {
        if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)]
      }

      /***/
    },

    /***/ '28a5': /***/ function(module, exports, __webpack_require__) {
      // @@split logic
      __webpack_require__('214f')('split', 2, function(defined, SPLIT, $split) {
        'use strict'
        var isRegExp = __webpack_require__('aae3')
        var _split = $split
        var $push = [].push
        var $SPLIT = 'split'
        var LENGTH = 'length'
        var LAST_INDEX = 'lastIndex'
        if (
          'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
          'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
          'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
          '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
          '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
          ''[$SPLIT](/.?/)[LENGTH]
        ) {
          var NPCG = /()??/.exec('')[1] === undefined // nonparticipating capturing group
          // based on es5-shim implementation, need to rework it
          $split = function(separator, limit) {
            var string = String(this)
            if (separator === undefined && limit === 0) return []
            // If `separator` is not a regex, use native split
            if (!isRegExp(separator)) return _split.call(string, separator, limit)
            var output = []
            var flags =
              (separator.ignoreCase ? 'i' : '') +
              (separator.multiline ? 'm' : '') +
              (separator.unicode ? 'u' : '') +
              (separator.sticky ? 'y' : '')
            var lastLastIndex = 0
            var splitLimit = limit === undefined ? 4294967295 : limit >>> 0
            // Make `global` and avoid `lastIndex` issues by working with a copy
            var separatorCopy = new RegExp(separator.source, flags + 'g')
            var separator2, match, lastIndex, lastLength, i
            // Doesn't need flags gy, but they don't hurt
            if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags)
            while ((match = separatorCopy.exec(string))) {
              // `separatorCopy.lastIndex` is not reliable cross-browser
              lastIndex = match.index + match[0][LENGTH]
              if (lastIndex > lastLastIndex) {
                output.push(string.slice(lastLastIndex, match.index))
                // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
                // eslint-disable-next-line no-loop-func
                if (!NPCG && match[LENGTH] > 1)
                  match[0].replace(separator2, function() {
                    for (i = 1; i < arguments[LENGTH] - 2; i++)
                      if (arguments[i] === undefined) match[i] = undefined
                  })
                if (match[LENGTH] > 1 && match.index < string[LENGTH])
                  $push.apply(output, match.slice(1))
                lastLength = match[0][LENGTH]
                lastLastIndex = lastIndex
                if (output[LENGTH] >= splitLimit) break
              }
              if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++ // Avoid an infinite loop
            }
            if (lastLastIndex === string[LENGTH]) {
              if (lastLength || !separatorCopy.test('')) output.push('')
            } else output.push(string.slice(lastLastIndex))
            return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output
          }
          // Chakra, V8
        } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
          $split = function(separator, limit) {
            return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit)
          }
        }
        // 21.1.3.17 String.prototype.split(separator, limit)
        return [
          function split(separator, limit) {
            var O = defined(this)
            var fn = separator == undefined ? undefined : separator[SPLIT]
            return fn !== undefined
              ? fn.call(separator, O, limit)
              : $split.call(String(O), separator, limit)
          },
          $split,
        ]
      })

      /***/
    },

    /***/ '2aba': /***/ function(module, exports, __webpack_require__) {
      var global = __webpack_require__('7726')
      var hide = __webpack_require__('32e9')
      var has = __webpack_require__('69a8')
      var SRC = __webpack_require__('ca5a')('src')
      var TO_STRING = 'toString'
      var $toString = Function[TO_STRING]
      var TPL = ('' + $toString).split(TO_STRING)

      __webpack_require__('8378').inspectSource = function(it) {
        return $toString.call(it)
      }
      ;(module.exports = function(O, key, val, safe) {
        var isFunction = typeof val == 'function'
        if (isFunction) has(val, 'name') || hide(val, 'name', key)
        if (O[key] === val) return
        if (isFunction)
          has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)))
        if (O === global) {
          O[key] = val
        } else if (!safe) {
          delete O[key]
          hide(O, key, val)
        } else if (O[key]) {
          O[key] = val
        } else {
          hide(O, key, val)
        }
        // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
      })(Function.prototype, TO_STRING, function toString() {
        return (typeof this == 'function' && this[SRC]) || $toString.call(this)
      })

      /***/
    },

    /***/ '2aeb': /***/ function(module, exports, __webpack_require__) {
      // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
      var anObject = __webpack_require__('cb7c')
      var dPs = __webpack_require__('1495')
      var enumBugKeys = __webpack_require__('e11e')
      var IE_PROTO = __webpack_require__('613b')('IE_PROTO')
      var Empty = function() {
        /* empty */
      }
      var PROTOTYPE = 'prototype'

      // Create object with fake `null` prototype: use iframe Object with cleared prototype
      var createDict = function() {
        // Thrash, waste and sodomy: IE GC bug
        var iframe = __webpack_require__('230e')('iframe')
        var i = enumBugKeys.length
        var lt = '<'
        var gt = '>'
        var iframeDocument
        iframe.style.display = 'none'
        __webpack_require__('fab2').appendChild(iframe)
        iframe.src = 'javascript:' // eslint-disable-line no-script-url
        // createDict = iframe.contentWindow.Object;
        // html.removeChild(iframe);
        iframeDocument = iframe.contentWindow.document
        iframeDocument.open()
        iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt)
        iframeDocument.close()
        createDict = iframeDocument.F
        while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]]
        return createDict()
      }

      module.exports =
        Object.create ||
        function create(O, Properties) {
          var result
          if (O !== null) {
            Empty[PROTOTYPE] = anObject(O)
            result = new Empty()
            Empty[PROTOTYPE] = null
            // add "__proto__" for Object.getPrototypeOf polyfill
            result[IE_PROTO] = O
          } else result = createDict()
          return Properties === undefined ? result : dPs(result, Properties)
        }

      /***/
    },

    /***/ '2b4c': /***/ function(module, exports, __webpack_require__) {
      var store = __webpack_require__('5537')('wks')
      var uid = __webpack_require__('ca5a')
      var Symbol = __webpack_require__('7726').Symbol
      var USE_SYMBOL = typeof Symbol == 'function'

      var $exports = (module.exports = function(name) {
        return (
          store[name] ||
          (store[name] =
            (USE_SYMBOL && Symbol[name]) || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name))
        )
      })

      $exports.store = store

      /***/
    },

    /***/ '2d00': /***/ function(module, exports) {
      module.exports = false

      /***/
    },

    /***/ '2d95': /***/ function(module, exports) {
      var toString = {}.toString

      module.exports = function(it) {
        return toString.call(it).slice(8, -1)
      }

      /***/
    },

    /***/ '2f21': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var fails = __webpack_require__('79e5')

      module.exports = function(method, arg) {
        return (
          !!method &&
          fails(function() {
            // eslint-disable-next-line no-useless-call
            arg
              ? method.call(
                  null,
                  function() {
                    /* empty */
                  },
                  1,
                )
              : method.call(null)
          })
        )
      }

      /***/
    },

    /***/ '2fdb': /***/ function(module, exports, __webpack_require__) {
      'use strict'
      // 21.1.3.7 String.prototype.includes(searchString, position = 0)

      var $export = __webpack_require__('5ca1')
      var context = __webpack_require__('d2c8')
      var INCLUDES = 'includes'

      $export($export.P + $export.F * __webpack_require__('5147')(INCLUDES), 'String', {
        includes: function includes(searchString /* , position = 0 */) {
          return !!~context(this, searchString, INCLUDES).indexOf(
            searchString,
            arguments.length > 1 ? arguments[1] : undefined,
          )
        },
      })

      /***/
    },

    /***/ '32e9': /***/ function(module, exports, __webpack_require__) {
      var dP = __webpack_require__('86cc')
      var createDesc = __webpack_require__('4630')
      module.exports = __webpack_require__('9e1e')
        ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value))
          }
        : function(object, key, value) {
            object[key] = value
            return object
          }

      /***/
    },

    /***/ '33a4': /***/ function(module, exports, __webpack_require__) {
      // check on default Array iterator
      var Iterators = __webpack_require__('84f2')
      var ITERATOR = __webpack_require__('2b4c')('iterator')
      var ArrayProto = Array.prototype

      module.exports = function(it) {
        return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it)
      }

      /***/
    },

    /***/ '3846': /***/ function(module, exports, __webpack_require__) {
      // 21.2.5.3 get RegExp.prototype.flags()
      if (__webpack_require__('9e1e') && /./g.flags != 'g')
        __webpack_require__('86cc').f(RegExp.prototype, 'flags', {
          configurable: true,
          get: __webpack_require__('0bfb'),
        })

      /***/
    },

    /***/ '386b': /***/ function(module, exports, __webpack_require__) {
      var $export = __webpack_require__('5ca1')
      var fails = __webpack_require__('79e5')
      var defined = __webpack_require__('be13')
      var quot = /"/g
      // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
      var createHTML = function(string, tag, attribute, value) {
        var S = String(defined(string))
        var p1 = '<' + tag
        if (attribute !== '')
          p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"'
        return p1 + '>' + S + '</' + tag + '>'
      }
      module.exports = function(NAME, exec) {
        var O = {}
        O[NAME] = exec(createHTML)
        $export(
          $export.P +
            $export.F *
              fails(function() {
                var test = ''[NAME]('"')
                return test !== test.toLowerCase() || test.split('"').length > 3
              }),
          'String',
          O,
        )
      }

      /***/
    },

    /***/ '38fd': /***/ function(module, exports, __webpack_require__) {
      // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
      var has = __webpack_require__('69a8')
      var toObject = __webpack_require__('4bf8')
      var IE_PROTO = __webpack_require__('613b')('IE_PROTO')
      var ObjectProto = Object.prototype

      module.exports =
        Object.getPrototypeOf ||
        function(O) {
          O = toObject(O)
          if (has(O, IE_PROTO)) return O[IE_PROTO]
          if (typeof O.constructor == 'function' && O instanceof O.constructor) {
            return O.constructor.prototype
          }
          return O instanceof Object ? ObjectProto : null
        }

      /***/
    },

    /***/ '41a0': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var create = __webpack_require__('2aeb')
      var descriptor = __webpack_require__('4630')
      var setToStringTag = __webpack_require__('7f20')
      var IteratorPrototype = {}

      // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
      __webpack_require__('32e9')(
        IteratorPrototype,
        __webpack_require__('2b4c')('iterator'),
        function() {
          return this
        },
      )

      module.exports = function(Constructor, NAME, next) {
        Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) })
        setToStringTag(Constructor, NAME + ' Iterator')
      }

      /***/
    },

    /***/ '456d': /***/ function(module, exports, __webpack_require__) {
      // 19.1.2.14 Object.keys(O)
      var toObject = __webpack_require__('4bf8')
      var $keys = __webpack_require__('0d58')

      __webpack_require__('5eda')('keys', function() {
        return function keys(it) {
          return $keys(toObject(it))
        }
      })

      /***/
    },

    /***/ '4588': /***/ function(module, exports) {
      // 7.1.4 ToInteger
      var ceil = Math.ceil
      var floor = Math.floor
      module.exports = function(it) {
        return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it)
      }

      /***/
    },

    /***/ '4630': /***/ function(module, exports) {
      module.exports = function(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value,
        }
      }

      /***/
    },

    /***/ '499e': /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)

      // CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
      /**
       * Translates the list format produced by css-loader into something
       * easier to manipulate.
       */
      function listToStyles(parentId, list) {
        var styles = []
        var newStyles = {}
        for (var i = 0; i < list.length; i++) {
          var item = list[i]
          var id = item[0]
          var css = item[1]
          var media = item[2]
          var sourceMap = item[3]
          var part = {
            id: parentId + ':' + i,
            css: css,
            media: media,
            sourceMap: sourceMap,
          }
          if (!newStyles[id]) {
            styles.push((newStyles[id] = { id: id, parts: [part] }))
          } else {
            newStyles[id].parts.push(part)
          }
        }
        return styles
      }

      // CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        'default',
        function() {
          return addStylesClient
        },
      )
      /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

      var hasDocument = typeof document !== 'undefined'

      if (typeof DEBUG !== 'undefined' && DEBUG) {
        if (!hasDocument) {
          throw new Error(
            'vue-style-loader cannot be used in a non-browser environment. ' +
              "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.",
          )
        }
      }

      /*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

      var stylesInDom = {
        /*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/
      }

      var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
      var singletonElement = null
      var singletonCounter = 0
      var isProduction = false
      var noop = function() {}
      var options = null
      var ssrIdKey = 'data-vue-ssr-id'

      // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
      // tags it will allow on a page
      var isOldIE =
        typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

      function addStylesClient(parentId, list, _isProduction, _options) {
        isProduction = _isProduction

        options = _options || {}

        var styles = listToStyles(parentId, list)
        addStylesToDom(styles)

        return function update(newList) {
          var mayRemove = []
          for (var i = 0; i < styles.length; i++) {
            var item = styles[i]
            var domStyle = stylesInDom[item.id]
            domStyle.refs--
            mayRemove.push(domStyle)
          }
          if (newList) {
            styles = listToStyles(parentId, newList)
            addStylesToDom(styles)
          } else {
            styles = []
          }
          for (var i = 0; i < mayRemove.length; i++) {
            var domStyle = mayRemove[i]
            if (domStyle.refs === 0) {
              for (var j = 0; j < domStyle.parts.length; j++) {
                domStyle.parts[j]()
              }
              delete stylesInDom[domStyle.id]
            }
          }
        }
      }

      function addStylesToDom(styles /* Array<StyleObject> */) {
        for (var i = 0; i < styles.length; i++) {
          var item = styles[i]
          var domStyle = stylesInDom[item.id]
          if (domStyle) {
            domStyle.refs++
            for (var j = 0; j < domStyle.parts.length; j++) {
              domStyle.parts[j](item.parts[j])
            }
            for (; j < item.parts.length; j++) {
              domStyle.parts.push(addStyle(item.parts[j]))
            }
            if (domStyle.parts.length > item.parts.length) {
              domStyle.parts.length = item.parts.length
            }
          } else {
            var parts = []
            for (var j = 0; j < item.parts.length; j++) {
              parts.push(addStyle(item.parts[j]))
            }
            stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
          }
        }
      }

      function createStyleElement() {
        var styleElement = document.createElement('style')
        styleElement.type = 'text/css'
        head.appendChild(styleElement)
        return styleElement
      }

      function addStyle(obj /* StyleObjectPart */) {
        var update, remove
        var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

        if (styleElement) {
          if (isProduction) {
            // has SSR styles and in production mode.
            // simply do nothing.
            return noop
          } else {
            // has SSR styles but in dev mode.
            // for some reason Chrome can't handle source map in server-rendered
            // style tags - source maps in <style> only works if the style tag is
            // created and inserted dynamically. So we remove the server rendered
            // styles and inject new ones.
            styleElement.parentNode.removeChild(styleElement)
          }
        }

        if (isOldIE) {
          // use singleton mode for IE9.
          var styleIndex = singletonCounter++
          styleElement = singletonElement || (singletonElement = createStyleElement())
          update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
          remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
        } else {
          // use multi-style-tag mode in all other cases
          styleElement = createStyleElement()
          update = applyToTag.bind(null, styleElement)
          remove = function() {
            styleElement.parentNode.removeChild(styleElement)
          }
        }

        update(obj)

        return function updateStyle(newObj /* StyleObjectPart */) {
          if (newObj) {
            if (
              newObj.css === obj.css &&
              newObj.media === obj.media &&
              newObj.sourceMap === obj.sourceMap
            ) {
              return
            }
            update((obj = newObj))
          } else {
            remove()
          }
        }
      }

      var replaceText = (function() {
        var textStore = []

        return function(index, replacement) {
          textStore[index] = replacement
          return textStore.filter(Boolean).join('\n')
        }
      })()

      function applyToSingletonTag(styleElement, index, remove, obj) {
        var css = remove ? '' : obj.css

        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = replaceText(index, css)
        } else {
          var cssNode = document.createTextNode(css)
          var childNodes = styleElement.childNodes
          if (childNodes[index]) styleElement.removeChild(childNodes[index])
          if (childNodes.length) {
            styleElement.insertBefore(cssNode, childNodes[index])
          } else {
            styleElement.appendChild(cssNode)
          }
        }
      }

      function applyToTag(styleElement, obj) {
        var css = obj.css
        var media = obj.media
        var sourceMap = obj.sourceMap

        if (media) {
          styleElement.setAttribute('media', media)
        }
        if (options.ssrId) {
          styleElement.setAttribute(ssrIdKey, obj.id)
        }

        if (sourceMap) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
          // http://stackoverflow.com/a/26603875
          css +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) +
            ' */'
        }

        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = css
        } else {
          while (styleElement.firstChild) {
            styleElement.removeChild(styleElement.firstChild)
          }
          styleElement.appendChild(document.createTextNode(css))
        }
      }

      /***/
    },

    /***/ '4abb': /***/ function(module, exports, __webpack_require__) {
      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__('efa1')
      if (typeof content === 'string') content = [[module.i, content, '']]
      if (content.locals) module.exports = content.locals
      // add the styles to the DOM
      var add = __webpack_require__('499e').default
      var update = add('c9579538', content, true, { sourceMap: false, shadowMode: false })

      /***/
    },

    /***/ '4bf8': /***/ function(module, exports, __webpack_require__) {
      // 7.1.13 ToObject(argument)
      var defined = __webpack_require__('be13')
      module.exports = function(it) {
        return Object(defined(it))
      }

      /***/
    },

    /***/ '4ed8': /***/ function(module, exports, __webpack_require__) {
      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__('8b2e')
      if (typeof content === 'string') content = [[module.i, content, '']]
      if (content.locals) module.exports = content.locals
      // add the styles to the DOM
      var add = __webpack_require__('499e').default
      var update = add('ef80da60', content, true, { sourceMap: false, shadowMode: false })

      /***/
    },

    /***/ '5147': /***/ function(module, exports, __webpack_require__) {
      var MATCH = __webpack_require__('2b4c')('match')
      module.exports = function(KEY) {
        var re = /./
        try {
          '/./'[KEY](re)
        } catch (e) {
          try {
            re[MATCH] = false
            return !'/./'[KEY](re)
          } catch (f) {
            /* empty */
          }
        }
        return true
      }

      /***/
    },

    /***/ '52a7': /***/ function(module, exports) {
      exports.f = {}.propertyIsEnumerable

      /***/
    },

    /***/ '5537': /***/ function(module, exports, __webpack_require__) {
      var core = __webpack_require__('8378')
      var global = __webpack_require__('7726')
      var SHARED = '__core-js_shared__'
      var store = global[SHARED] || (global[SHARED] = {})

      ;(module.exports = function(key, value) {
        return store[key] || (store[key] = value !== undefined ? value : {})
      })('versions', []).push({
        version: core.version,
        mode: __webpack_require__('2d00') ? 'pure' : 'global',
        copyright: '© 2018 Denis Pushkarev (zloirock.ru)',
      })

      /***/
    },

    /***/ '556c': /***/ function(module, exports, __webpack_require__) {
      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__('e4b6')
      if (typeof content === 'string') content = [[module.i, content, '']]
      if (content.locals) module.exports = content.locals
      // add the styles to the DOM
      var add = __webpack_require__('499e').default
      var update = add('ea76f838', content, true, { sourceMap: false, shadowMode: false })

      /***/
    },

    /***/ '55dd': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var $export = __webpack_require__('5ca1')
      var aFunction = __webpack_require__('d8e8')
      var toObject = __webpack_require__('4bf8')
      var fails = __webpack_require__('79e5')
      var $sort = [].sort
      var test = [1, 2, 3]

      $export(
        $export.P +
          $export.F *
            (fails(function() {
              // IE8-
              test.sort(undefined)
            }) ||
              !fails(function() {
                // V8 bug
                test.sort(null)
                // Old WebKit
              }) ||
              !__webpack_require__('2f21')($sort)),
        'Array',
        {
          // 22.1.3.25 Array.prototype.sort(comparefn)
          sort: function sort(comparefn) {
            return comparefn === undefined
              ? $sort.call(toObject(this))
              : $sort.call(toObject(this), aFunction(comparefn))
          },
        },
      )

      /***/
    },

    /***/ '5ca1': /***/ function(module, exports, __webpack_require__) {
      var global = __webpack_require__('7726')
      var core = __webpack_require__('8378')
      var hide = __webpack_require__('32e9')
      var redefine = __webpack_require__('2aba')
      var ctx = __webpack_require__('9b43')
      var PROTOTYPE = 'prototype'

      var $export = function(type, name, source) {
        var IS_FORCED = type & $export.F
        var IS_GLOBAL = type & $export.G
        var IS_STATIC = type & $export.S
        var IS_PROTO = type & $export.P
        var IS_BIND = type & $export.B
        var target = IS_GLOBAL
          ? global
          : IS_STATIC
          ? global[name] || (global[name] = {})
          : (global[name] || {})[PROTOTYPE]
        var exports = IS_GLOBAL ? core : core[name] || (core[name] = {})
        var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
        var key, own, out, exp
        if (IS_GLOBAL) source = name
        for (key in source) {
          // contains in native
          own = !IS_FORCED && target && target[key] !== undefined
          // export native or passed
          out = (own ? target : source)[key]
          // bind timers to global for call from export context
          exp =
            IS_BIND && own
              ? ctx(out, global)
              : IS_PROTO && typeof out == 'function'
              ? ctx(Function.call, out)
              : out
          // extend global
          if (target) redefine(target, key, out, type & $export.U)
          // export
          if (exports[key] != out) hide(exports, key, exp)
          if (IS_PROTO && expProto[key] != out) expProto[key] = out
        }
      }
      global.core = core
      // type bitmap
      $export.F = 1 // forced
      $export.G = 2 // global
      $export.S = 4 // static
      $export.P = 8 // proto
      $export.B = 16 // bind
      $export.W = 32 // wrap
      $export.U = 64 // safe
      $export.R = 128 // real proto method for `library`
      module.exports = $export

      /***/
    },

    /***/ '5cc5': /***/ function(module, exports, __webpack_require__) {
      var ITERATOR = __webpack_require__('2b4c')('iterator')
      var SAFE_CLOSING = false

      try {
        var riter = [7][ITERATOR]()
        riter['return'] = function() {
          SAFE_CLOSING = true
        }
        // eslint-disable-next-line no-throw-literal
        Array.from(riter, function() {
          throw 2
        })
      } catch (e) {
        /* empty */
      }

      module.exports = function(exec, skipClosing) {
        if (!skipClosing && !SAFE_CLOSING) return false
        var safe = false
        try {
          var arr = [7]
          var iter = arr[ITERATOR]()
          iter.next = function() {
            return { done: (safe = true) }
          }
          arr[ITERATOR] = function() {
            return iter
          }
          exec(arr)
        } catch (e) {
          /* empty */
        }
        return safe
      }

      /***/
    },

    /***/ '5dbc': /***/ function(module, exports, __webpack_require__) {
      var isObject = __webpack_require__('d3f4')
      var setPrototypeOf = __webpack_require__('8b97').set
      module.exports = function(that, target, C) {
        var S = target.constructor
        var P
        if (
          S !== C &&
          typeof S == 'function' &&
          (P = S.prototype) !== C.prototype &&
          isObject(P) &&
          setPrototypeOf
        ) {
          setPrototypeOf(that, P)
        }
        return that
      }

      /***/
    },

    /***/ '5eda': /***/ function(module, exports, __webpack_require__) {
      // most Object methods by ES6 should accept primitives
      var $export = __webpack_require__('5ca1')
      var core = __webpack_require__('8378')
      var fails = __webpack_require__('79e5')
      module.exports = function(KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY]
        var exp = {}
        exp[KEY] = exec(fn)
        $export(
          $export.S +
            $export.F *
              fails(function() {
                fn(1)
              }),
          'Object',
          exp,
        )
      }

      /***/
    },

    /***/ '613b': /***/ function(module, exports, __webpack_require__) {
      var shared = __webpack_require__('5537')('keys')
      var uid = __webpack_require__('ca5a')
      module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key))
      }

      /***/
    },

    /***/ '626a': /***/ function(module, exports, __webpack_require__) {
      // fallback for non-array-like ES3 and non-enumerable old V8 strings
      var cof = __webpack_require__('2d95')
      // eslint-disable-next-line no-prototype-builtins
      module.exports = Object('z').propertyIsEnumerable(0)
        ? Object
        : function(it) {
            return cof(it) == 'String' ? it.split('') : Object(it)
          }

      /***/
    },

    /***/ '6762': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      // https://github.com/tc39/Array.prototype.includes
      var $export = __webpack_require__('5ca1')
      var $includes = __webpack_require__('c366')(true)

      $export($export.P, 'Array', {
        includes: function includes(el /* , fromIndex = 0 */) {
          return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined)
        },
      })

      __webpack_require__('9c6c')('includes')

      /***/
    },

    /***/ '6821': /***/ function(module, exports, __webpack_require__) {
      // to indexed object, toObject with fallback for non-array-like ES3 strings
      var IObject = __webpack_require__('626a')
      var defined = __webpack_require__('be13')
      module.exports = function(it) {
        return IObject(defined(it))
      }

      /***/
    },

    /***/ '69a8': /***/ function(module, exports) {
      var hasOwnProperty = {}.hasOwnProperty
      module.exports = function(it, key) {
        return hasOwnProperty.call(it, key)
      }

      /***/
    },

    /***/ '6a99': /***/ function(module, exports, __webpack_require__) {
      // 7.1.1 ToPrimitive(input [, PreferredType])
      var isObject = __webpack_require__('d3f4')
      // instead of the ES6 spec version, we didn't implement @@toPrimitive case
      // and the second argument - flag - preferred type is a string
      module.exports = function(it, S) {
        if (!isObject(it)) return it
        var fn, val
        if (S && typeof (fn = it.toString) == 'function' && !isObject((val = fn.call(it))))
          return val
        if (typeof (fn = it.valueOf) == 'function' && !isObject((val = fn.call(it)))) return val
        if (!S && typeof (fn = it.toString) == 'function' && !isObject((val = fn.call(it))))
          return val
        throw TypeError("Can't convert object to primitive value")
      }

      /***/
    },

    /***/ '6b54': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      __webpack_require__('3846')
      var anObject = __webpack_require__('cb7c')
      var $flags = __webpack_require__('0bfb')
      var DESCRIPTORS = __webpack_require__('9e1e')
      var TO_STRING = 'toString'
      var $toString = /./[TO_STRING]

      var define = function(fn) {
        __webpack_require__('2aba')(RegExp.prototype, TO_STRING, fn, true)
      }

      // 21.2.5.14 RegExp.prototype.toString()
      if (
        __webpack_require__('79e5')(function() {
          return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'
        })
      ) {
        define(function toString() {
          var R = anObject(this)
          return '/'.concat(
            R.source,
            '/',
            'flags' in R
              ? R.flags
              : !DESCRIPTORS && R instanceof RegExp
              ? $flags.call(R)
              : undefined,
          )
        })
        // FF44- RegExp#toString has a wrong name
      } else if ($toString.name != TO_STRING) {
        define(function toString() {
          return $toString.call(this)
        })
      }

      /***/
    },

    /***/ '7514': /***/ function(module, exports, __webpack_require__) {
      'use strict'

      // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
      var $export = __webpack_require__('5ca1')
      var $find = __webpack_require__('0a49')(5)
      var KEY = 'find'
      var forced = true
      // Shouldn't skip holes
      if (KEY in [])
        Array(1)[KEY](function() {
          forced = false
        })
      $export($export.P + $export.F * forced, 'Array', {
        find: function find(callbackfn /* , that = undefined */) {
          return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
        },
      })
      __webpack_require__('9c6c')(KEY)

      /***/
    },

    /***/ '7726': /***/ function(module, exports) {
      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      var global = (module.exports =
        typeof window != 'undefined' && window.Math == Math
          ? window
          : typeof self != 'undefined' && self.Math == Math
          ? self
          : // eslint-disable-next-line no-new-func
            Function('return this')())
      if (typeof __g == 'number') __g = global // eslint-disable-line no-undef

      /***/
    },

    /***/ '77f1': /***/ function(module, exports, __webpack_require__) {
      var toInteger = __webpack_require__('4588')
      var max = Math.max
      var min = Math.min
      module.exports = function(index, length) {
        index = toInteger(index)
        return index < 0 ? max(index + length, 0) : min(index, length)
      }

      /***/
    },

    /***/ '79e5': /***/ function(module, exports) {
      module.exports = function(exec) {
        try {
          return !!exec()
        } catch (e) {
          return true
        }
      }

      /***/
    },

    /***/ '7f20': /***/ function(module, exports, __webpack_require__) {
      var def = __webpack_require__('86cc').f
      var has = __webpack_require__('69a8')
      var TAG = __webpack_require__('2b4c')('toStringTag')

      module.exports = function(it, tag, stat) {
        if (it && !has((it = stat ? it : it.prototype), TAG))
          def(it, TAG, { configurable: true, value: tag })
      }

      /***/
    },

    /***/ '7f7f': /***/ function(module, exports, __webpack_require__) {
      var dP = __webpack_require__('86cc').f
      var FProto = Function.prototype
      var nameRE = /^\s*function ([^ (]*)/
      var NAME = 'name'

      // 19.2.4.2 name
      NAME in FProto ||
        (__webpack_require__('9e1e') &&
          dP(FProto, NAME, {
            configurable: true,
            get: function() {
              try {
                return ('' + this).match(nameRE)[1]
              } catch (e) {
                return ''
              }
            },
          }))

      /***/
    },

    /***/ '8378': /***/ function(module, exports) {
      var core = (module.exports = { version: '2.5.7' })
      if (typeof __e == 'number') __e = core // eslint-disable-line no-undef

      /***/
    },

    /***/ '84f2': /***/ function(module, exports) {
      module.exports = {}

      /***/
    },

    /***/ '86cc': /***/ function(module, exports, __webpack_require__) {
      var anObject = __webpack_require__('cb7c')
      var IE8_DOM_DEFINE = __webpack_require__('c69a')
      var toPrimitive = __webpack_require__('6a99')
      var dP = Object.defineProperty

      exports.f = __webpack_require__('9e1e')
        ? Object.defineProperty
        : function defineProperty(O, P, Attributes) {
            anObject(O)
            P = toPrimitive(P, true)
            anObject(Attributes)
            if (IE8_DOM_DEFINE)
              try {
                return dP(O, P, Attributes)
              } catch (e) {
                /* empty */
              }
            if ('get' in Attributes || 'set' in Attributes)
              throw TypeError('Accessors not supported!')
            if ('value' in Attributes) O[P] = Attributes.value
            return O
          }

      /***/
    },

    /***/ '8b2e': /***/ function(module, exports, __webpack_require__) {
      exports = module.exports = __webpack_require__('2350')(false)
      // imports

      // module
      exports.push([
        module.i,
        '.vue-slider-dot{position:absolute;will-change:transform;-webkit-transition:all 0s;transition:all 0s;z-index:5}.vue-slider-dot-tooltip{position:absolute;visibility:hidden}.vue-slider-dot-tooltip-show{visibility:visible}.vue-slider-dot-tooltip-top{top:-10px;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.vue-slider-dot-tooltip-bottom{bottom:-10px;left:50%;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.vue-slider-dot-tooltip-left{left:-10px;top:50%;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.vue-slider-dot-tooltip-right{right:-10px;top:50%;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}',
        '',
      ])

      // exports

      /***/
    },

    /***/ '8b97': /***/ function(module, exports, __webpack_require__) {
      // Works with __proto__ only. Old v8 can't work with null proto objects.
      /* eslint-disable no-proto */
      var isObject = __webpack_require__('d3f4')
      var anObject = __webpack_require__('cb7c')
      var check = function(O, proto) {
        anObject(O)
        if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!")
      }
      module.exports = {
        set:
          Object.setPrototypeOf ||
          ('__proto__' in {} // eslint-disable-line
            ? (function(test, buggy, set) {
                try {
                  set = __webpack_require__('9b43')(
                    Function.call,
                    __webpack_require__('11e9').f(Object.prototype, '__proto__').set,
                    2,
                  )
                  set(test, [])
                  buggy = !(test instanceof Array)
                } catch (e) {
                  buggy = true
                }
                return function setPrototypeOf(O, proto) {
                  check(O, proto)
                  if (buggy) O.__proto__ = proto
                  else set(O, proto)
                  return O
                }
              })({}, false)
            : undefined),
        check: check,
      }

      /***/
    },

    /***/ '8bbf': /***/ function(module, exports) {
      module.exports = require('vue')

      /***/
    },

    /***/ '9093': /***/ function(module, exports, __webpack_require__) {
      // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
      var $keys = __webpack_require__('ce10')
      var hiddenKeys = __webpack_require__('e11e').concat('length', 'prototype')

      exports.f =
        Object.getOwnPropertyNames ||
        function getOwnPropertyNames(O) {
          return $keys(O, hiddenKeys)
        }

      /***/
    },

    /***/ '9b43': /***/ function(module, exports, __webpack_require__) {
      // optional / simple context binding
      var aFunction = __webpack_require__('d8e8')
      module.exports = function(fn, that, length) {
        aFunction(fn)
        if (that === undefined) return fn
        switch (length) {
          case 1:
            return function(a) {
              return fn.call(that, a)
            }
          case 2:
            return function(a, b) {
              return fn.call(that, a, b)
            }
          case 3:
            return function(a, b, c) {
              return fn.call(that, a, b, c)
            }
        }
        return function(/* ...args */) {
          return fn.apply(that, arguments)
        }
      }

      /***/
    },

    /***/ '9c6c': /***/ function(module, exports, __webpack_require__) {
      // 22.1.3.31 Array.prototype[@@unscopables]
      var UNSCOPABLES = __webpack_require__('2b4c')('unscopables')
      var ArrayProto = Array.prototype
      if (ArrayProto[UNSCOPABLES] == undefined)
        __webpack_require__('32e9')(ArrayProto, UNSCOPABLES, {})
      module.exports = function(key) {
        ArrayProto[UNSCOPABLES][key] = true
      }

      /***/
    },

    /***/ '9def': /***/ function(module, exports, __webpack_require__) {
      // 7.1.15 ToLength
      var toInteger = __webpack_require__('4588')
      var min = Math.min
      module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0 // pow(2, 53) - 1 == 9007199254740991
      }

      /***/
    },

    /***/ '9e1e': /***/ function(module, exports, __webpack_require__) {
      // Thank's IE8 for his funny defineProperty
      module.exports = !__webpack_require__('79e5')(function() {
        return (
          Object.defineProperty({}, 'a', {
            get: function() {
              return 7
            },
          }).a != 7
        )
      })

      /***/
    },

    /***/ a481: /***/ function(module, exports, __webpack_require__) {
      // @@replace logic
      __webpack_require__('214f')('replace', 2, function(defined, REPLACE, $replace) {
        // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
        return [
          function replace(searchValue, replaceValue) {
            'use strict'
            var O = defined(this)
            var fn = searchValue == undefined ? undefined : searchValue[REPLACE]
            return fn !== undefined
              ? fn.call(searchValue, O, replaceValue)
              : $replace.call(String(O), searchValue, replaceValue)
          },
          $replace,
        ]
      })

      /***/
    },

    /***/ aa77: /***/ function(module, exports, __webpack_require__) {
      var $export = __webpack_require__('5ca1')
      var defined = __webpack_require__('be13')
      var fails = __webpack_require__('79e5')
      var spaces = __webpack_require__('fdef')
      var space = '[' + spaces + ']'
      var non = '\u200b\u0085'
      var ltrim = RegExp('^' + space + space + '*')
      var rtrim = RegExp(space + space + '*$')

      var exporter = function(KEY, exec, ALIAS) {
        var exp = {}
        var FORCE = fails(function() {
          return !!spaces[KEY]() || non[KEY]() != non
        })
        var fn = (exp[KEY] = FORCE ? exec(trim) : spaces[KEY])
        if (ALIAS) exp[ALIAS] = fn
        $export($export.P + $export.F * FORCE, 'String', exp)
      }

      // 1 -> String#trimLeft
      // 2 -> String#trimRight
      // 3 -> String#trim
      var trim = (exporter.trim = function(string, TYPE) {
        string = String(defined(string))
        if (TYPE & 1) string = string.replace(ltrim, '')
        if (TYPE & 2) string = string.replace(rtrim, '')
        return string
      })

      module.exports = exporter

      /***/
    },

    /***/ aae3: /***/ function(module, exports, __webpack_require__) {
      // 7.2.8 IsRegExp(argument)
      var isObject = __webpack_require__('d3f4')
      var cof = __webpack_require__('2d95')
      var MATCH = __webpack_require__('2b4c')('match')
      module.exports = function(it) {
        var isRegExp
        return (
          isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp')
        )
      }

      /***/
    },

    /***/ ac6a: /***/ function(module, exports, __webpack_require__) {
      var $iterators = __webpack_require__('cadf')
      var getKeys = __webpack_require__('0d58')
      var redefine = __webpack_require__('2aba')
      var global = __webpack_require__('7726')
      var hide = __webpack_require__('32e9')
      var Iterators = __webpack_require__('84f2')
      var wks = __webpack_require__('2b4c')
      var ITERATOR = wks('iterator')
      var TO_STRING_TAG = wks('toStringTag')
      var ArrayValues = Iterators.Array

      var DOMIterables = {
        CSSRuleList: true, // TODO: Not spec compliant, should be false.
        CSSStyleDeclaration: false,
        CSSValueList: false,
        ClientRectList: false,
        DOMRectList: false,
        DOMStringList: false,
        DOMTokenList: true,
        DataTransferItemList: false,
        FileList: false,
        HTMLAllCollection: false,
        HTMLCollection: false,
        HTMLFormElement: false,
        HTMLSelectElement: false,
        MediaList: true, // TODO: Not spec compliant, should be false.
        MimeTypeArray: false,
        NamedNodeMap: false,
        NodeList: true,
        PaintRequestList: false,
        Plugin: false,
        PluginArray: false,
        SVGLengthList: false,
        SVGNumberList: false,
        SVGPathSegList: false,
        SVGPointList: false,
        SVGStringList: false,
        SVGTransformList: false,
        SourceBufferList: false,
        StyleSheetList: true, // TODO: Not spec compliant, should be false.
        TextTrackCueList: false,
        TextTrackList: false,
        TouchList: false,
      }

      for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
        var NAME = collections[i]
        var explicit = DOMIterables[NAME]
        var Collection = global[NAME]
        var proto = Collection && Collection.prototype
        var key
        if (proto) {
          if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues)
          if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME)
          Iterators[NAME] = ArrayValues
          if (explicit)
            for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true)
        }
      }

      /***/
    },

    /***/ be13: /***/ function(module, exports) {
      // 7.2.1 RequireObjectCoercible(argument)
      module.exports = function(it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it)
        return it
      }

      /***/
    },

    /***/ c366: /***/ function(module, exports, __webpack_require__) {
      // false -> Array#indexOf
      // true  -> Array#includes
      var toIObject = __webpack_require__('6821')
      var toLength = __webpack_require__('9def')
      var toAbsoluteIndex = __webpack_require__('77f1')
      module.exports = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
          var O = toIObject($this)
          var length = toLength(O.length)
          var index = toAbsoluteIndex(fromIndex, length)
          var value
          // Array#includes uses SameValueZero equality algorithm
          // eslint-disable-next-line no-self-compare
          if (IS_INCLUDES && el != el)
            while (length > index) {
              value = O[index++]
              // eslint-disable-next-line no-self-compare
              if (value != value) return true
              // Array#indexOf ignores holes, Array#includes - not
            }
          else
            for (; length > index; index++)
              if (IS_INCLUDES || index in O) {
                if (O[index] === el) return IS_INCLUDES || index || 0
              }
          return !IS_INCLUDES && -1
        }
      }

      /***/
    },

    /***/ c5f6: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var global = __webpack_require__('7726')
      var has = __webpack_require__('69a8')
      var cof = __webpack_require__('2d95')
      var inheritIfRequired = __webpack_require__('5dbc')
      var toPrimitive = __webpack_require__('6a99')
      var fails = __webpack_require__('79e5')
      var gOPN = __webpack_require__('9093').f
      var gOPD = __webpack_require__('11e9').f
      var dP = __webpack_require__('86cc').f
      var $trim = __webpack_require__('aa77').trim
      var NUMBER = 'Number'
      var $Number = global[NUMBER]
      var Base = $Number
      var proto = $Number.prototype
      // Opera ~12 has broken Object#toString
      var BROKEN_COF = cof(__webpack_require__('2aeb')(proto)) == NUMBER
      var TRIM = 'trim' in String.prototype

      // 7.1.3 ToNumber(argument)
      var toNumber = function(argument) {
        var it = toPrimitive(argument, false)
        if (typeof it == 'string' && it.length > 2) {
          it = TRIM ? it.trim() : $trim(it, 3)
          var first = it.charCodeAt(0)
          var third, radix, maxCode
          if (first === 43 || first === 45) {
            third = it.charCodeAt(2)
            if (third === 88 || third === 120) return NaN // Number('+0x1') should be NaN, old V8 fix
          } else if (first === 48) {
            switch (it.charCodeAt(1)) {
              case 66:
              case 98:
                radix = 2
                maxCode = 49
                break // fast equal /^0b[01]+$/i
              case 79:
              case 111:
                radix = 8
                maxCode = 55
                break // fast equal /^0o[0-7]+$/i
              default:
                return +it
            }
            for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
              code = digits.charCodeAt(i)
              // parseInt parses a string to a first unavailable symbol
              // but ToNumber should return NaN if a string contains unavailable symbols
              if (code < 48 || code > maxCode) return NaN
            }
            return parseInt(digits, radix)
          }
        }
        return +it
      }

      if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
        $Number = function Number(value) {
          var it = arguments.length < 1 ? 0 : value
          var that = this
          return that instanceof $Number &&
            // check on 1..constructor(foo) case
            (BROKEN_COF
              ? fails(function() {
                  proto.valueOf.call(that)
                })
              : cof(that) != NUMBER)
            ? inheritIfRequired(new Base(toNumber(it)), that, $Number)
            : toNumber(it)
        }
        for (
          var keys = __webpack_require__('9e1e')
              ? gOPN(Base)
              : // ES3:
                (
                  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
                  // ES6 (in case, if modules with ES6 Number statics required before):
                  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
                  'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
                ).split(','),
            j = 0,
            key;
          keys.length > j;
          j++
        ) {
          if (has(Base, (key = keys[j])) && !has($Number, key)) {
            dP($Number, key, gOPD(Base, key))
          }
        }
        $Number.prototype = proto
        proto.constructor = $Number
        __webpack_require__('2aba')(global, NUMBER, $Number)
      }

      /***/
    },

    /***/ c69a: /***/ function(module, exports, __webpack_require__) {
      module.exports =
        !__webpack_require__('9e1e') &&
        !__webpack_require__('79e5')(function() {
          return (
            Object.defineProperty(__webpack_require__('230e')('div'), 'a', {
              get: function() {
                return 7
              },
            }).a != 7
          )
        })

      /***/
    },

    /***/ c89a: /***/ function(module, exports, __webpack_require__) {
      'use strict'
      /**
       * vue-class-component v6.3.0
       * (c) 2015-present Evan You
       * @license MIT
       */

      Object.defineProperty(exports, '__esModule', { value: true })

      function _interopDefault(ex) {
        return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
      }

      var Vue = _interopDefault(__webpack_require__('8bbf'))

      function reflectionIsSupported() {
        return (Reflect && Reflect.defineMetadata) !== undefined
      }
      function copyReflectionMetadata(to, from) {
        forwardMetadata(to, from)
        Object.getOwnPropertyNames(from.prototype).forEach(function(key) {
          forwardMetadata(to.prototype, from.prototype, key)
        })
        Object.getOwnPropertyNames(from).forEach(function(key) {
          forwardMetadata(to, from, key)
        })
      }
      function forwardMetadata(to, from, propertyKey) {
        var metaKeys = propertyKey
          ? Reflect.getOwnMetadataKeys(from, propertyKey)
          : Reflect.getOwnMetadataKeys(from)
        metaKeys.forEach(function(metaKey) {
          var metadata = propertyKey
            ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
            : Reflect.getOwnMetadata(metaKey, from)
          if (propertyKey) {
            Reflect.defineMetadata(metaKey, metadata, to, propertyKey)
          } else {
            Reflect.defineMetadata(metaKey, metadata, to)
          }
        })
      }

      var fakeArray = { __proto__: [] }
      var hasProto = fakeArray instanceof Array
      function createDecorator(factory) {
        return function(target, key, index) {
          var Ctor = typeof target === 'function' ? target : target.constructor
          if (!Ctor.__decorators__) {
            Ctor.__decorators__ = []
          }
          if (typeof index !== 'number') {
            index = undefined
          }
          Ctor.__decorators__.push(function(options) {
            return factory(options, key, index)
          })
        }
      }
      function mixins() {
        var Ctors = []
        for (var _i = 0; _i < arguments.length; _i++) {
          Ctors[_i] = arguments[_i]
        }
        return Vue.extend({ mixins: Ctors })
      }
      function isPrimitive(value) {
        var type = typeof value
        return value == null || (type !== 'object' && type !== 'function')
      }
      function warn(message) {
        if (typeof console !== 'undefined') {
          console.warn('[vue-class-component] ' + message)
        }
      }

      function collectDataFromConstructor(vm, Component) {
        // override _init to prevent to init as Vue instance
        var originalInit = Component.prototype._init
        Component.prototype._init = function() {
          var _this = this
          // proxy to actual vm
          var keys = Object.getOwnPropertyNames(vm)
          // 2.2.0 compat (props are no longer exposed as self properties)
          if (vm.$options.props) {
            for (var key in vm.$options.props) {
              if (!vm.hasOwnProperty(key)) {
                keys.push(key)
              }
            }
          }
          keys.forEach(function(key) {
            if (key.charAt(0) !== '_') {
              Object.defineProperty(_this, key, {
                get: function() {
                  return vm[key]
                },
                set: function(value) {
                  vm[key] = value
                },
                configurable: true,
              })
            }
          })
        }
        // should be acquired class property values
        var data = new Component()
        // restore original _init to avoid memory leak (#209)
        Component.prototype._init = originalInit
        // create plain data object
        var plainData = {}
        Object.keys(data).forEach(function(key) {
          if (data[key] !== undefined) {
            plainData[key] = data[key]
          }
        })
        if (false) {
        }
        return plainData
      }

      var $internalHooks = [
        'data',
        'beforeCreate',
        'created',
        'beforeMount',
        'mounted',
        'beforeDestroy',
        'destroyed',
        'beforeUpdate',
        'updated',
        'activated',
        'deactivated',
        'render',
        'errorCaptured', // 2.5
      ]
      function componentFactory(Component, options) {
        if (options === void 0) {
          options = {}
        }
        options.name = options.name || Component._componentTag || Component.name
        // prototype props.
        var proto = Component.prototype
        Object.getOwnPropertyNames(proto).forEach(function(key) {
          if (key === 'constructor') {
            return
          }
          // hooks
          if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key]
            return
          }
          var descriptor = Object.getOwnPropertyDescriptor(proto, key)
          if (descriptor.value !== void 0) {
            // methods
            if (typeof descriptor.value === 'function') {
              ;(options.methods || (options.methods = {}))[key] = descriptor.value
            } else {
              // typescript decorated data
              ;(options.mixins || (options.mixins = [])).push({
                data: function() {
                  var _a
                  return (_a = {}), (_a[key] = descriptor.value), _a
                },
              })
            }
          } else if (descriptor.get || descriptor.set) {
            // computed properties
            ;(options.computed || (options.computed = {}))[key] = {
              get: descriptor.get,
              set: descriptor.set,
            }
          }
        })
        ;(options.mixins || (options.mixins = [])).push({
          data: function() {
            return collectDataFromConstructor(this, Component)
          },
        })
        // decorate options
        var decorators = Component.__decorators__
        if (decorators) {
          decorators.forEach(function(fn) {
            return fn(options)
          })
          delete Component.__decorators__
        }
        // find super
        var superProto = Object.getPrototypeOf(Component.prototype)
        var Super = superProto instanceof Vue ? superProto.constructor : Vue
        var Extended = Super.extend(options)
        forwardStaticMembers(Extended, Component, Super)
        if (reflectionIsSupported()) {
          copyReflectionMetadata(Extended, Component)
        }
        return Extended
      }
      var reservedPropertyNames = [
        // Unique id
        'cid',
        // Super Vue constructor
        'super',
        // Component options that will be used by the component
        'options',
        'superOptions',
        'extendOptions',
        'sealedOptions',
        // Private assets
        'component',
        'directive',
        'filter',
      ]
      function forwardStaticMembers(Extended, Original, Super) {
        // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
        Object.getOwnPropertyNames(Original).forEach(function(key) {
          // `prototype` should not be overwritten
          if (key === 'prototype') {
            return
          }
          // Some browsers does not allow reconfigure built-in properties
          var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key)
          if (extendedDescriptor && !extendedDescriptor.configurable) {
            return
          }
          var descriptor = Object.getOwnPropertyDescriptor(Original, key)
          // If the user agent does not support `__proto__` or its family (IE <= 10),
          // the sub class properties may be inherited properties from the super class in TypeScript.
          // We need to exclude such properties to prevent to overwrite
          // the component options object which stored on the extended constructor (See #192).
          // If the value is a referenced value (object or function),
          // we can check equality of them and exclude it if they have the same reference.
          // If it is a primitive value, it will be forwarded for safety.
          if (!hasProto) {
            // Only `cid` is explicitly exluded from property forwarding
            // because we cannot detect whether it is a inherited property or not
            // on the no `__proto__` environment even though the property is reserved.
            if (key === 'cid') {
              return
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key)
            if (
              !isPrimitive(descriptor.value) &&
              superDescriptor &&
              superDescriptor.value === descriptor.value
            ) {
              return
            }
          }
          // Warn if the users manually declare reserved properties
          if (false) {
          }
          Object.defineProperty(Extended, key, descriptor)
        })
      }

      function Component(options) {
        if (typeof options === 'function') {
          return componentFactory(options)
        }
        return function(Component) {
          return componentFactory(Component, options)
        }
      }
      Component.registerHooks = function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys)
      }

      exports.default = Component
      exports.createDecorator = createDecorator
      exports.mixins = mixins

      /***/
    },

    /***/ ca5a: /***/ function(module, exports) {
      var id = 0
      var px = Math.random()
      module.exports = function(key) {
        return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36))
      }

      /***/
    },

    /***/ cadf: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var addToUnscopables = __webpack_require__('9c6c')
      var step = __webpack_require__('d53b')
      var Iterators = __webpack_require__('84f2')
      var toIObject = __webpack_require__('6821')

      // 22.1.3.4 Array.prototype.entries()
      // 22.1.3.13 Array.prototype.keys()
      // 22.1.3.29 Array.prototype.values()
      // 22.1.3.30 Array.prototype[@@iterator]()
      module.exports = __webpack_require__('01f9')(
        Array,
        'Array',
        function(iterated, kind) {
          this._t = toIObject(iterated) // target
          this._i = 0 // next index
          this._k = kind // kind
          // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
        },
        function() {
          var O = this._t
          var kind = this._k
          var index = this._i++
          if (!O || index >= O.length) {
            this._t = undefined
            return step(1)
          }
          if (kind == 'keys') return step(0, index)
          if (kind == 'values') return step(0, O[index])
          return step(0, [index, O[index]])
        },
        'values',
      )

      // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
      Iterators.Arguments = Iterators.Array

      addToUnscopables('keys')
      addToUnscopables('values')
      addToUnscopables('entries')

      /***/
    },

    /***/ cb7c: /***/ function(module, exports, __webpack_require__) {
      var isObject = __webpack_require__('d3f4')
      module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + ' is not an object!')
        return it
      }

      /***/
    },

    /***/ cd1c: /***/ function(module, exports, __webpack_require__) {
      // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
      var speciesConstructor = __webpack_require__('e853')

      module.exports = function(original, length) {
        return new (speciesConstructor(original))(length)
      }

      /***/
    },

    /***/ ce10: /***/ function(module, exports, __webpack_require__) {
      var has = __webpack_require__('69a8')
      var toIObject = __webpack_require__('6821')
      var arrayIndexOf = __webpack_require__('c366')(false)
      var IE_PROTO = __webpack_require__('613b')('IE_PROTO')

      module.exports = function(object, names) {
        var O = toIObject(object)
        var i = 0
        var result = []
        var key
        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key)
        // Don't enum bug & hidden keys
        while (names.length > i)
          if (has(O, (key = names[i++]))) {
            ~arrayIndexOf(result, key) || result.push(key)
          }
        return result
      }

      /***/
    },

    /***/ d263: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      // B.2.3.6 String.prototype.fixed()
      __webpack_require__('386b')('fixed', function(createHTML) {
        return function fixed() {
          return createHTML(this, 'tt', '', '')
        }
      })

      /***/
    },

    /***/ d2c8: /***/ function(module, exports, __webpack_require__) {
      // helper for String#{startsWith, endsWith, includes}
      var isRegExp = __webpack_require__('aae3')
      var defined = __webpack_require__('be13')

      module.exports = function(that, searchString, NAME) {
        if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!")
        return String(defined(that))
      }

      /***/
    },

    /***/ d3f4: /***/ function(module, exports) {
      module.exports = function(it) {
        return typeof it === 'object' ? it !== null : typeof it === 'function'
      }

      /***/
    },

    /***/ d53b: /***/ function(module, exports) {
      module.exports = function(done, value) {
        return { value: value, done: !!done }
      }

      /***/
    },

    /***/ d8e8: /***/ function(module, exports) {
      module.exports = function(it) {
        if (typeof it != 'function') throw TypeError(it + ' is not a function!')
        return it
      }

      /***/
    },

    /***/ e11e: /***/ function(module, exports) {
      // IE 8- don't enum bug keys
      module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
        ',',
      )

      /***/
    },

    /***/ e4b6: /***/ function(module, exports, __webpack_require__) {
      exports = module.exports = __webpack_require__('2350')(false)
      // imports

      // module
      exports.push([
        module.i,
        '.vue-slider-marks{position:relative;width:100%;height:100%}.vue-slider-mark{position:absolute;z-index:1}.vue-slider-ltr .vue-slider-mark,.vue-slider-rtl .vue-slider-mark{width:0;height:100%;top:50%}.vue-slider-ltr .vue-slider-mark-step,.vue-slider-rtl .vue-slider-mark-step{top:0}.vue-slider-ltr .vue-slider-mark-label,.vue-slider-rtl .vue-slider-mark-label{top:100%;margin-top:10px}.vue-slider-ltr .vue-slider-mark{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vue-slider-ltr .vue-slider-mark-step{left:0}.vue-slider-ltr .vue-slider-mark-label{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.vue-slider-rtl .vue-slider-mark{-webkit-transform:translate(50%,-50%);transform:translate(50%,-50%)}.vue-slider-rtl .vue-slider-mark-step{right:0}.vue-slider-rtl .vue-slider-mark-label{right:50%;-webkit-transform:translateX(50%);transform:translateX(50%)}.vue-slider-btt .vue-slider-mark,.vue-slider-ttb .vue-slider-mark{width:100%;height:0;left:50%}.vue-slider-btt .vue-slider-mark-step,.vue-slider-ttb .vue-slider-mark-step{left:0}.vue-slider-btt .vue-slider-mark-label,.vue-slider-ttb .vue-slider-mark-label{left:100%;margin-left:10px}.vue-slider-btt .vue-slider-mark{-webkit-transform:translate(-50%,50%);transform:translate(-50%,50%)}.vue-slider-btt .vue-slider-mark-step{top:0}.vue-slider-btt .vue-slider-mark-label{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vue-slider-ttb .vue-slider-mark{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vue-slider-ttb .vue-slider-mark-step{bottom:0}.vue-slider-ttb .vue-slider-mark-label{bottom:50%;-webkit-transform:translateY(50%);transform:translateY(50%)}.vue-slider-mark-label,.vue-slider-mark-step{position:absolute}',
        '',
      ])

      // exports

      /***/
    },

    /***/ e853: /***/ function(module, exports, __webpack_require__) {
      var isObject = __webpack_require__('d3f4')
      var isArray = __webpack_require__('1169')
      var SPECIES = __webpack_require__('2b4c')('species')

      module.exports = function(original) {
        var C
        if (isArray(original)) {
          C = original.constructor
          // cross-realm fallback
          if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined
          if (isObject(C)) {
            C = C[SPECIES]
            if (C === null) C = undefined
          }
        }
        return C === undefined ? Array : C
      }

      /***/
    },

    /***/ efa1: /***/ function(module, exports, __webpack_require__) {
      exports = module.exports = __webpack_require__('2350')(false)
      // imports

      // module
      exports.push([
        module.i,
        '.vue-slider{position:relative;-webkit-box-sizing:content-box;box-sizing:content-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block;-ms-touch-action:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.vue-slider-disabled{opacity:.5;pointer-events:none}.vue-slider-rail{position:relative;width:100%;height:100%;-webkit-transition-property:width,height,left,right,top,bottom;transition-property:width,height,left,right,top,bottom}.vue-slider-process{position:absolute;z-index:1}.vue-slider-sr-only{clip:rect(1px,1px,1px,1px);height:1px;width:1px;overflow:hidden;position:absolute!important}',
        '',
      ])

      // exports

      /***/
    },

    /***/ f1ae: /***/ function(module, exports, __webpack_require__) {
      'use strict'

      var $defineProperty = __webpack_require__('86cc')
      var createDesc = __webpack_require__('4630')

      module.exports = function(object, index, value) {
        if (index in object) $defineProperty.f(object, index, createDesc(0, value))
        else object[index] = value
      }

      /***/
    },

    /***/ fab2: /***/ function(module, exports, __webpack_require__) {
      var document = __webpack_require__('7726').document
      module.exports = document && document.documentElement

      /***/
    },

    /***/ fb15: /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)

      // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
      // This file is imported into lib/wc client bundles.

      if (typeof window !== 'undefined') {
        var setPublicPath_i
        if (
          (setPublicPath_i = window.document.currentScript) &&
          (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js$/))
        ) {
          __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
        }
      }

      // Indicate to webpack that this file can be concatenated
      /* harmony default export */ var setPublicPath = null

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
      var es7_array_includes = __webpack_require__('6762')

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
      var es6_string_includes = __webpack_require__('2fdb')

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
      var es6_number_constructor = __webpack_require__('c5f6')

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.from.js
      var es6_array_from = __webpack_require__('1c4c')

      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
          })
        } else {
          obj[key] = value
        }

        return obj
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/objectSpread.js

      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {}
          var ownKeys = Object.keys(source)

          if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(
              Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable
              }),
            )
          }

          ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key])
          })
        }

        return target
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/arrayWithHoles.js
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/iterableToArrayLimit.js
      function _iterableToArrayLimit(arr, i) {
        var _arr = []
        var _n = true
        var _d = false
        var _e = undefined

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value)

            if (i && _arr.length === i) break
          }
        } catch (err) {
          _d = true
          _e = err
        } finally {
          try {
            if (!_n && _i['return'] != null) _i['return']()
          } finally {
            if (_d) throw _e
          }
        }

        return _arr
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/nonIterableRest.js
      function _nonIterableRest() {
        throw new TypeError('Invalid attempt to destructure non-iterable instance')
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/slicedToArray.js

      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
      }
      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
      var es6_function_name = __webpack_require__('7f7f')

      // EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
      var web_dom_iterable = __webpack_require__('ac6a')

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.fixed.js
      var es6_string_fixed = __webpack_require__('d263')

      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/classCallCheck.js
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function')
        }
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/setPrototypeOf.js
      function _setPrototypeOf(o, p) {
        _setPrototypeOf =
          Object.setPrototypeOf ||
          function _setPrototypeOf(o, p) {
            o.__proto__ = p
            return o
          }

        return _setPrototypeOf(o, p)
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/inherits.js

      function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
          throw new TypeError('Super expression must either be null or a function')
        }

        _setPrototypeOf(subClass.prototype, superClass && superClass.prototype)
        if (superClass) _setPrototypeOf(subClass, superClass)
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/createClass.js
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i]
          descriptor.enumerable = descriptor.enumerable || false
          descriptor.configurable = true
          if ('value' in descriptor) descriptor.writable = true
          Object.defineProperty(target, descriptor.key, descriptor)
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps)
        if (staticProps) _defineProperties(Constructor, staticProps)
        return Constructor
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/typeof.js
      function _typeof2(obj) {
        if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
          _typeof2 = function _typeof2(obj) {
            return typeof obj
          }
        } else {
          _typeof2 = function _typeof2(obj) {
            return obj &&
              typeof Symbol === 'function' &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj
          }
        }
        return _typeof2(obj)
      }

      function _typeof(obj) {
        if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
          _typeof = function _typeof(obj) {
            return _typeof2(obj)
          }
        } else {
          _typeof = function _typeof(obj) {
            return obj &&
              typeof Symbol === 'function' &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : _typeof2(obj)
          }
        }

        return _typeof(obj)
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/assertThisInitialized.js
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
        }

        return self
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/possibleConstructorReturn.js

      function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
          return call
        }

        return _assertThisInitialized(self)
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/getPrototypeOf.js
      function _getPrototypeOf(o) {
        _getPrototypeOf =
          Object.getPrototypeOf ||
          function _getPrototypeOf(o) {
            return o.__proto__
          }

        return _getPrototypeOf(o)
      }
      // CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      /* global Reflect, Promise */

      var extendStatics = function(d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(d, b) {
              d.__proto__ = b
            }) ||
          function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
          }
        return extendStatics(d, b)
      }

      function __extends(d, b) {
        extendStatics(d, b)
        function __() {
          this.constructor = d
        }
        d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
      }

      var __assign = function() {
        __assign =
          Object.assign ||
          function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i]
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
            }
            return t
          }
        return __assign.apply(this, arguments)
      }

      function __rest(s, e) {
        var t = {}
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]
        if (s != null && typeof Object.getOwnPropertySymbols === 'function')
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
            if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]]
        return t
      }

      function __decorate(decorators, target, key, desc) {
        var c = arguments.length,
          r =
            c < 3
              ? target
              : desc === null
              ? (desc = Object.getOwnPropertyDescriptor(target, key))
              : desc,
          d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
          r = Reflect.decorate(decorators, target, key, desc)
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if ((d = decorators[i]))
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
      }

      function __param(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex)
        }
      }

      function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
          return Reflect.metadata(metadataKey, metadataValue)
      }

      function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value))
            } catch (e) {
              reject(e)
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value))
            } catch (e) {
              reject(e)
            }
          }
          function step(result) {
            result.done
              ? resolve(result.value)
              : new P(function(resolve) {
                  resolve(result.value)
                }).then(fulfilled, rejected)
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next())
        })
      }

      function __generator(thisArg, body) {
        var _ = {
            label: 0,
            sent: function() {
              if (t[0] & 1) throw t[1]
              return t[1]
            },
            trys: [],
            ops: [],
          },
          f,
          y,
          t,
          g
        return (
          (g = { next: verb(0), throw: verb(1), return: verb(2) }),
          typeof Symbol === 'function' &&
            (g[Symbol.iterator] = function() {
              return this
            }),
          g
        )
        function verb(n) {
          return function(v) {
            return step([n, v])
          }
        }
        function step(op) {
          if (f) throw new TypeError('Generator is already executing.')
          while (_)
            try {
              if (
                ((f = 1),
                y &&
                  (t =
                    op[0] & 2
                      ? y['return']
                      : op[0]
                      ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                      : y.next) &&
                  !(t = t.call(y, op[1])).done)
              )
                return t
              if (((y = 0), t)) op = [op[0] & 2, t.value]
              switch (op[0]) {
                case 0:
                case 1:
                  t = op
                  break
                case 4:
                  _.label++
                  return { value: op[1], done: false }
                case 5:
                  _.label++
                  y = op[1]
                  op = [0]
                  continue
                case 7:
                  op = _.ops.pop()
                  _.trys.pop()
                  continue
                default:
                  if (
                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                    (op[0] === 6 || op[0] === 2)
                  ) {
                    _ = 0
                    continue
                  }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                    _.label = op[1]
                    break
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1]
                    t = op
                    break
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2]
                    _.ops.push(op)
                    break
                  }
                  if (t[2]) _.ops.pop()
                  _.trys.pop()
                  continue
              }
              op = body.call(thisArg, _)
            } catch (e) {
              op = [6, e]
              y = 0
            } finally {
              f = t = 0
            }
          if (op[0] & 5) throw op[1]
          return { value: op[0] ? op[1] : void 0, done: true }
        }
      }

      function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p]
      }

      function __values(o) {
        var m = typeof Symbol === 'function' && o[Symbol.iterator],
          i = 0
        if (m) return m.call(o)
        return {
          next: function() {
            if (o && i >= o.length) o = void 0
            return { value: o && o[i++], done: !o }
          },
        }
      }

      function __read(o, n) {
        var m = typeof Symbol === 'function' && o[Symbol.iterator]
        if (!m) return o
        var i = m.call(o),
          r,
          ar = [],
          e
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
        } catch (error) {
          e = { error: error }
        } finally {
          try {
            if (r && !r.done && (m = i['return'])) m.call(i)
          } finally {
            if (e) throw e.error
          }
        }
        return ar
      }

      function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]))
        return ar
      }

      function __await(v) {
        return this instanceof __await ? ((this.v = v), this) : new __await(v)
      }

      function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
        var g = generator.apply(thisArg, _arguments || []),
          i,
          q = []
        return (
          (i = {}),
          verb('next'),
          verb('throw'),
          verb('return'),
          (i[Symbol.asyncIterator] = function() {
            return this
          }),
          i
        )
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v)
              })
            }
        }
        function resume(n, v) {
          try {
            step(g[n](v))
          } catch (e) {
            settle(q[0][3], e)
          }
        }
        function step(r) {
          r.value instanceof __await
            ? Promise.resolve(r.value.v).then(fulfill, reject)
            : settle(q[0][2], r)
        }
        function fulfill(value) {
          resume('next', value)
        }
        function reject(value) {
          resume('throw', value)
        }
        function settle(f, v) {
          if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1])
        }
      }

      function __asyncDelegator(o) {
        var i, p
        return (
          (i = {}),
          verb('next'),
          verb('throw', function(e) {
            throw e
          }),
          verb('return'),
          (i[Symbol.iterator] = function() {
            return this
          }),
          i
        )
        function verb(n, f) {
          i[n] = o[n]
            ? function(v) {
                return (p = !p) ? { value: __await(o[n](v)), done: n === 'return' } : f ? f(v) : v
              }
            : f
        }
      }

      function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.')
        var m = o[Symbol.asyncIterator],
          i
        return m
          ? m.call(o)
          : ((o = typeof __values === 'function' ? __values(o) : o[Symbol.iterator]()),
            (i = {}),
            verb('next'),
            verb('throw'),
            verb('return'),
            (i[Symbol.asyncIterator] = function() {
              return this
            }),
            i)
        function verb(n) {
          i[n] =
            o[n] &&
            function(v) {
              return new Promise(function(resolve, reject) {
                ;(v = o[n](v)), settle(resolve, reject, v.done, v.value)
              })
            }
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v) {
            resolve({ value: v, done: d })
          }, reject)
        }
      }

      function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, 'raw', { value: raw })
        } else {
          cooked.raw = raw
        }
        return cooked
      }

      function __importStar(mod) {
        if (mod && mod.__esModule) return mod
        var result = {}
        if (mod != null)
          for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
        result.default = mod
        return result
      }

      function __importDefault(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
      }

      // EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
      var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__('8bbf')
      var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/ __webpack_require__.n(
        external_commonjs_vue_commonjs2_vue_root_Vue_,
      )

      // EXTERNAL MODULE: ./node_modules/vue-property-decorator/node_modules/vue-class-component/dist/vue-class-component.common.js
      var vue_class_component_common = __webpack_require__('c89a')
      var vue_class_component_common_default = /*#__PURE__*/ __webpack_require__.n(
        vue_class_component_common,
      )

      // CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
      /** vue-property-decorator verson 7.2.0 MIT LICENSE copyright 2018 kaorun343 */

      /**
       * decorator of an inject
       * @param from key
       * @return PropertyDecorator
       */
      function Inject(options) {
        return Object(vue_class_component_common['createDecorator'])(function(
          componentOptions,
          key,
        ) {
          if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {}
          }
          if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[key] = options || key
          }
        })
      }
      /**
       * decorator of a provide
       * @param key key
       * @return PropertyDecorator | void
       */
      function Provide(key) {
        return Object(vue_class_component_common['createDecorator'])(function(componentOptions, k) {
          var provide = componentOptions.provide
          if (typeof provide !== 'function' || !provide.managed) {
            var original_1 = componentOptions.provide
            provide = componentOptions.provide = function() {
              var rv = Object.create(
                (typeof original_1 === 'function' ? original_1.call(this) : original_1) || null,
              )
              for (var i in provide.managed) rv[provide.managed[i]] = this[i]
              return rv
            }
            provide.managed = {}
          }
          provide.managed[k] = key || k
        })
      }
      /**
       * decorator of model
       * @param  event event name
       * @param options options
       * @return PropertyDecorator
       */
      function Model(event, options) {
        if (options === void 0) {
          options = {}
        }
        return Object(vue_class_component_common['createDecorator'])(function(componentOptions, k) {
          ;(componentOptions.props || (componentOptions.props = {}))[k] = options
          componentOptions.model = { prop: k, event: event || k }
        })
      }
      /**
       * decorator of a prop
       * @param  options the options for the prop
       * @return PropertyDecorator | void
       */
      function Prop(options) {
        if (options === void 0) {
          options = {}
        }
        return Object(vue_class_component_common['createDecorator'])(function(componentOptions, k) {
          ;(componentOptions.props || (componentOptions.props = {}))[k] = options
        })
      }
      /**
       * decorator of a watch function
       * @param  path the path or the expression to observe
       * @param  WatchOption
       * @return MethodDecorator
       */
      function Watch(path, options) {
        if (options === void 0) {
          options = {}
        }
        var _a = options.deep,
          deep = _a === void 0 ? false : _a,
          _b = options.immediate,
          immediate = _b === void 0 ? false : _b
        return Object(vue_class_component_common['createDecorator'])(function(
          componentOptions,
          handler,
        ) {
          if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null)
          }
          componentOptions.watch[path] = { handler: handler, deep: deep, immediate: immediate }
        })
      }
      // Code copied from Vue/src/shared/util.js
      var hyphenateRE = /\B([A-Z])/g
      var hyphenate = function(str) {
        return str.replace(hyphenateRE, '-$1').toLowerCase()
      }
      /**
       * decorator of an event-emitter function
       * @param  event The name of the event
       * @return MethodDecorator
       */
      function Emit(event) {
        return function(_target, key, descriptor) {
          key = hyphenate(key)
          var original = descriptor.value
          descriptor.value = function emitter() {
            var _this = this
            var args = []
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i]
            }
            var emit = function(returnValue) {
              if (returnValue !== undefined) args.unshift(returnValue)
              _this.$emit.apply(_this, [event || key].concat(args))
            }
            var returnValue = original.apply(this, args)
            if (isPromise(returnValue)) {
              returnValue.then(function(returnValue) {
                emit(returnValue)
              })
            } else {
              emit(returnValue)
            }
          }
        }
      }
      function isPromise(obj) {
        return obj instanceof Promise || (obj && typeof obj.then === 'function')
      }

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
      var es6_regexp_replace = __webpack_require__('a481')

      // EXTERNAL MODULE: ./lib/styles/dot.scss
      var styles_dot = __webpack_require__('4ed8')

      // CONCATENATED MODULE: ./lib/vue-slider-dot.tsx

      var vue_slider_dot_VueSliderDot =
        /*#__PURE__*/
        (function(_Vue) {
          function VueSliderDot() {
            _classCallCheck(this, VueSliderDot)

            return _possibleConstructorReturn(
              this,
              _getPrototypeOf(VueSliderDot).apply(this, arguments),
            )
          }

          _createClass(VueSliderDot, [
            {
              key: 'dragStart',
              // 拖拽开始
              value: function dragStart(e) {
                if (this.disabled) {
                  return false
                }

                this.$emit('dragStart')
              },
            },
            {
              key: 'render',
              value: function render() {
                var h = arguments[0]
                return h(
                  'div',
                  {
                    ref: 'dot',
                    class: this.dotClasses,
                    on: {
                      mousedown: this.dragStart,
                      touchstart: this.dragStart,
                    },
                    attrs: {
                      'data-value': this.value,
                    },
                  },
                  [
                    this.$slots.default ||
                      h('div', {
                        class: this.handleClasses,
                        style: this.dotStyle,
                      }),
                    this.tooltip !== 'none'
                      ? h(
                          'div',
                          {
                            class: this.tooltipClasses,
                          },
                          [
                            this.$slots.tooltip ||
                              h(
                                'div',
                                {
                                  class: this.tooltipInnerClasses,
                                  style: this.tooltipStyle,
                                },
                                [this.tooltipValue],
                              ),
                          ],
                        )
                      : null,
                  ],
                )
              },
            },
            {
              key: 'dotClasses',
              get: function get() {
                return [
                  'vue-slider-dot',
                  {
                    'vue-slider-dot-disabled': this.disabled,
                    'vue-slider-dot-focus': this.focus,
                  },
                ]
              },
            },
            {
              key: 'handleClasses',
              get: function get() {
                return [
                  'vue-slider-dot-handle',
                  {
                    'vue-slider-dot-handle-disabled': this.disabled,
                    'vue-slider-dot-handle-focus': this.focus,
                  },
                ]
              },
            },
            {
              key: 'tooltipClasses',
              get: function get() {
                return [
                  'vue-slider-dot-tooltip',
                  ['vue-slider-dot-tooltip-'.concat(this.tooltipPlacement)],
                  {
                    'vue-slider-dot-tooltip-show': this.showTooltip,
                  },
                ]
              },
            },
            {
              key: 'tooltipInnerClasses',
              get: function get() {
                return [
                  'vue-slider-dot-tooltip-inner',
                  ['vue-slider-dot-tooltip-inner-'.concat(this.tooltipPlacement)],
                  {
                    'vue-slider-dot-tooltip-inner-disabled': this.disabled,
                    'vue-slider-dot-tooltip-inner-focus': this.focus,
                  },
                ]
              },
            },
            {
              key: 'showTooltip',
              get: function get() {
                switch (this.tooltip) {
                  case 'always':
                    return true

                  case 'none':
                    return false

                  case 'focus':
                    return !!this.focus

                  default:
                    return false
                }
              },
            },
            {
              key: 'tooltipValue',
              get: function get() {
                if (this.tooltipFormatter) {
                  return typeof this.tooltipFormatter === 'string'
                    ? this.tooltipFormatter.replace(/\{value\}/, String(this.value))
                    : this.tooltipFormatter(this.value)
                } else {
                  return this.value
                }
              },
            },
          ])

          _inherits(VueSliderDot, _Vue)

          return VueSliderDot
        })(external_commonjs_vue_commonjs2_vue_root_Vue_default.a)

      __decorate(
        [
          Prop({
            default: 0,
          }),
        ],
        vue_slider_dot_VueSliderDot.prototype,
        'value',
        void 0,
      )

      __decorate([Prop()], vue_slider_dot_VueSliderDot.prototype, 'tooltip', void 0)

      __decorate([Prop()], vue_slider_dot_VueSliderDot.prototype, 'dotStyle', void 0)

      __decorate([Prop()], vue_slider_dot_VueSliderDot.prototype, 'tooltipStyle', void 0)

      __decorate(
        [
          Prop({
            type: String,
            validator: function validator(val) {
              return ['top', 'right', 'bottom', 'left'].includes(val)
            },
            required: true,
          }),
        ],
        vue_slider_dot_VueSliderDot.prototype,
        'tooltipPlacement',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: [String, Function],
          }),
        ],
        vue_slider_dot_VueSliderDot.prototype,
        'tooltipFormatter',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Boolean,
            default: false,
          }),
        ],
        vue_slider_dot_VueSliderDot.prototype,
        'focus',
        void 0,
      )

      __decorate(
        [
          Prop({
            default: false,
          }),
        ],
        vue_slider_dot_VueSliderDot.prototype,
        'disabled',
        void 0,
      )

      vue_slider_dot_VueSliderDot = __decorate(
        [vue_class_component_common_default.a],
        vue_slider_dot_VueSliderDot,
      )
      /* harmony default export */ var vue_slider_dot = vue_slider_dot_VueSliderDot
      // EXTERNAL MODULE: ./lib/styles/mark.scss
      var styles_mark = __webpack_require__('556c')

      // CONCATENATED MODULE: ./lib/vue-slider-mark.tsx

      var vue_slider_mark_VueSlideMark =
        /*#__PURE__*/
        (function(_Vue) {
          function VueSlideMark() {
            _classCallCheck(this, VueSlideMark)

            return _possibleConstructorReturn(
              this,
              _getPrototypeOf(VueSlideMark).apply(this, arguments),
            )
          }

          _createClass(VueSlideMark, [
            {
              key: 'render',
              value: function render() {
                var h = arguments[0]
                var mark = this.mark
                return h(
                  'div',
                  {
                    class: this.marksClasses,
                  },
                  [
                    this.$scopedSlots.step ||
                      h('div', {
                        class: this.stepClasses,
                        style: [
                          this.stepStyle,
                          mark.style,
                          mark.active ? this.stepActiveStyle : null,
                          mark.active ? mark.activeStyle : null,
                        ],
                      }),
                    !this.hideLabel
                      ? this.$scopedSlots.label ||
                        h(
                          'div',
                          {
                            class: this.labelClasses,
                            style: [
                              this.labelStyle,
                              mark.labelStyle,
                              mark.active ? this.labelActiveStyle : null,
                              mark.active ? mark.labelActiveStyle : null,
                            ],
                          },
                          [mark.label],
                        )
                      : null,
                  ],
                )
              },
            },
            {
              key: 'marksClasses',
              get: function get() {
                return [
                  'vue-slider-mark',
                  {
                    'vue-slider-mark-active': this.mark.active,
                  },
                ]
              },
            },
            {
              key: 'stepClasses',
              get: function get() {
                return [
                  'vue-slider-mark-step',
                  {
                    'vue-slider-mark-step-active': this.mark.active,
                  },
                ]
              },
            },
            {
              key: 'labelClasses',
              get: function get() {
                return [
                  'vue-slider-mark-label',
                  {
                    'vue-slider-mark-label-active': this.mark.active,
                  },
                ]
              },
            },
          ])

          _inherits(VueSlideMark, _Vue)

          return VueSlideMark
        })(external_commonjs_vue_commonjs2_vue_root_Vue_default.a)

      __decorate(
        [
          Prop({
            required: true,
          }),
        ],
        vue_slider_mark_VueSlideMark.prototype,
        'mark',
        void 0,
      )

      __decorate([Prop(Boolean)], vue_slider_mark_VueSlideMark.prototype, 'hideLabel', void 0)

      __decorate([Prop()], vue_slider_mark_VueSlideMark.prototype, 'stepStyle', void 0)

      __decorate([Prop()], vue_slider_mark_VueSlideMark.prototype, 'stepActiveStyle', void 0)

      __decorate([Prop()], vue_slider_mark_VueSlideMark.prototype, 'labelStyle', void 0)

      __decorate([Prop()], vue_slider_mark_VueSlideMark.prototype, 'labelActiveStyle', void 0)

      vue_slider_mark_VueSlideMark = __decorate(
        [vue_class_component_common_default.a],
        vue_slider_mark_VueSlideMark,
      )
      /* harmony default export */ var vue_slider_mark = vue_slider_mark_VueSlideMark
      // CONCATENATED MODULE: ./lib/utils/index.ts
      // 将数字或字符串格式化成像素格式
      var toPx = function toPx(value) {
        return typeof value === 'number' ? ''.concat(value, 'px') : value
      } // 得到当前鼠标在元素中的位置

      var getPos = function getPos(
        e, // NOTE: safari not support TouchEvent
        elem,
        isReverse,
      ) {
        var event = e.targetTouches ? e.targetTouches[0] : e
        var posObj = {
          x: event.pageX - elem.offsetLeft,
          y: event.pageY - elem.offsetTop,
        }
        return {
          x: isReverse ? elem.offsetWidth - posObj.x : posObj.x,
          y: isReverse ? elem.offsetHeight - posObj.y : posObj.y,
        }
      }
      var KEY_CODE
      ;(function(KEY_CODE) {
        KEY_CODE[(KEY_CODE['PAGE_UP'] = 33)] = 'PAGE_UP'
        KEY_CODE[(KEY_CODE['PAGE_DOWN'] = 34)] = 'PAGE_DOWN'
        KEY_CODE[(KEY_CODE['END'] = 35)] = 'END'
        KEY_CODE[(KEY_CODE['HOME'] = 36)] = 'HOME'
        KEY_CODE[(KEY_CODE['LEFT'] = 37)] = 'LEFT'
        KEY_CODE[(KEY_CODE['UP'] = 38)] = 'UP'
        KEY_CODE[(KEY_CODE['RIGHT'] = 39)] = 'RIGHT'
        KEY_CODE[(KEY_CODE['DOWN'] = 40)] = 'DOWN'
      })(KEY_CODE || (KEY_CODE = {})) // TODO: 键盘处理逻辑

      var getKeyboardHandleFunc = function getKeyboardHandleFunc(e, params) {
        switch (e.keyCode) {
          case KEY_CODE.UP:
            return function(i) {
              return params.direction === 'ttb' ? i - 1 : i + 1
            }

          case KEY_CODE.RIGHT:
            return function(i) {
              return params.direction === 'rtl' ? i - 1 : i + 1
            }

          case KEY_CODE.DOWN:
            return function(i) {
              return params.direction === 'ttb' ? i + 1 : i - 1
            }

          case KEY_CODE.LEFT:
            return function(i) {
              return params.direction === 'rtl' ? i + 1 : i - 1
            }

          case KEY_CODE.END:
            return function() {
              return params.max
            }

          case KEY_CODE.HOME:
            return function() {
              return params.min
            }

          case KEY_CODE.PAGE_UP:
            return function(i) {
              return i + 10
            }

          case KEY_CODE.PAGE_DOWN:
            return function(i) {
              return i - 10
            }

          default:
            return null
        }
      }
      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
      var es6_regexp_split = __webpack_require__('28a5')

      // CONCATENATED MODULE: ./lib/utils/decimal.ts

      /**
       * 用于任意精准的浮点计算
       *
       * @export
       * @class Decimal
       */
      var decimal_Decimal =
        /*#__PURE__*/
        (function() {
          function Decimal(num) {
            _classCallCheck(this, Decimal)

            this.num = num
          }

          _createClass(Decimal, [
            {
              key: 'decimal',
              value: function decimal(num2, operator, isChain) {
                var num1 = this.num
                var decimals1 = ''.concat(num1).split('.')[1] || ''
                var decimals2 = ''.concat(num2).split('.')[1] || ''
                var decimals = decimals1.length > decimals2.length ? decimals1 : decimals2
                var multiple = decimals ? Math.pow(10, decimals.length) : 1
                var n1 = Math.round(num1 * multiple)
                var n2 = Math.round(num2 * multiple)
                var n = 0

                switch (operator) {
                  case '+':
                    n = n1 + n2
                    break

                  case '-':
                    n = n1 - n2
                    break

                  case '*':
                    n = n1 * n2
                    multiple *= multiple
                    break

                  case '/':
                    n = n1 / n2
                    multiple = 1
                    break

                  case '%':
                    n = n1 % n2
                    multiple = 1
                    break
                }

                this.num = n / multiple
                return this
              },
            },
            {
              key: 'plus',
              value: function plus(num2) {
                return this.decimal(num2, '+')
              },
            },
            {
              key: 'minus',
              value: function minus(num2) {
                return this.decimal(num2, '-')
              },
            },
            {
              key: 'multiply',
              value: function multiply(num2) {
                return this.decimal(num2, '*')
              },
            },
            {
              key: 'divide',
              value: function divide(num2) {
                return this.decimal(num2, '/')
              },
            },
            {
              key: 'remainder',
              value: function remainder(num2) {
                return this.decimal(num2, '%')
              },
            },
            {
              key: 'toNumber',
              value: function toNumber() {
                return this.num
              },
            },
          ])

          return Decimal
        })()

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
      var es6_array_iterator = __webpack_require__('cadf')

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
      var es6_object_keys = __webpack_require__('456d')

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
      var es6_regexp_to_string = __webpack_require__('6b54')

      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
      var es6_array_find = __webpack_require__('7514')

      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/arrayWithoutHoles.js
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i]
          }

          return arr2
        }
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/iterableToArray.js
      function _iterableToArray(iter) {
        if (
          Symbol.iterator in Object(iter) ||
          Object.prototype.toString.call(iter) === '[object Arguments]'
        )
          return Array.from(iter)
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/nonIterableSpread.js
      function _nonIterableSpread() {
        throw new TypeError('Invalid attempt to spread non-iterable instance')
      }
      // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/toConsumableArray.js

      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
      }
      // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
      var es6_array_sort = __webpack_require__('55dd')

      // CONCATENATED MODULE: ./lib/utils/control.ts

      var _ERROR_MSG

      // 错误类型

      var ERROR_TYPE
      ;(function(ERROR_TYPE) {
        ERROR_TYPE[(ERROR_TYPE['VALUE'] = 1)] = 'VALUE'
        ERROR_TYPE[(ERROR_TYPE['INTERVAL'] = 2)] = 'INTERVAL'
        ERROR_TYPE[(ERROR_TYPE['MIN'] = 3)] = 'MIN'
        ERROR_TYPE[(ERROR_TYPE['MAX'] = 4)] = 'MAX'
        ERROR_TYPE[(ERROR_TYPE['ORDER'] = 5)] = 'ORDER'
      })(ERROR_TYPE || (ERROR_TYPE = {}))

      var ERROR_MSG = ((_ERROR_MSG = {}),
      _defineProperty(_ERROR_MSG, ERROR_TYPE.VALUE, 'The type of the "value" is illegal'),
      _defineProperty(
        _ERROR_MSG,
        ERROR_TYPE.INTERVAL,
        'The prop "interval" is invalid, "(max - min)" cannot be divisible by "interval"',
      ),
      _defineProperty(_ERROR_MSG, ERROR_TYPE.MIN, 'The "value" cannot be less than the minimum.'),
      _defineProperty(
        _ERROR_MSG,
        ERROR_TYPE.MAX,
        'The "value" cannot be greater than the maximum.',
      ),
      _defineProperty(
        _ERROR_MSG,
        ERROR_TYPE.ORDER,
        'When "order" is false, the parameters "minRange", "maxRange", "fixed", "enabled" are invalid.',
      ),
      _ERROR_MSG)
      /**
       * 组件的逻辑控制中心
       *
       * @export
       * @class Control
       */

      var control_Control =
        /*#__PURE__*/
        (function() {
          function Control(options) {
            _classCallCheck(this, Control)

            this.dotsPos = [] // 每个滑块的位置

            this.dotsValue = [] // 每个滑块的值

            this.data = options.data
            this.max = options.max
            this.min = options.min
            this.interval = options.interval
            this.order = options.order
            this.marks = options.marks
            this.process = options.process
            this.onError = options.onError

            if (this.order) {
              this.minRange = options.minRange || 0
              this.maxRange = options.maxRange || 0
              this.enableCross = options.enableCross
              this.fixed = options.fixed
            } else {
              if (options.minRange || options.maxRange || !options.enableCross || options.fixed) {
                this.emitError(ERROR_TYPE.ORDER)
              }

              this.minRange = 0
              this.maxRange = 0
              this.enableCross = true
              this.fixed = false
            }

            this.setValue(options.value)
          }
          /**
           * 设置滑块的值
           *
           * @param {(Value | Value[])} value
           * @memberof Control
           */

          _createClass(Control, [
            {
              key: 'setValue',
              value: function setValue(value) {
                this.dotsValue = Array.isArray(value) ? value : [value]
                this.syncDotsPos()
              },
              /**
               * 设置滑块位置
               * @param {number[]} dotsPos 滑块位置的数组
               */
            },
            {
              key: 'setDotsPos',
              value: function setDotsPos(dotsPos) {
                var _this = this

                // 只排序值不排序位置，在拖拽完成后再调用[syncDotsPos]排序位置
                var list = this.order
                  ? _toConsumableArray(dotsPos).sort(function(a, b) {
                      return a - b
                    })
                  : dotsPos
                this.dotsPos = list
                this.dotsValue = list.map(function(dotPos) {
                  return _this.parsePos(dotPos)
                })
              },
              /**
               * 排序滑块位置
               *
               * @memberof Control
               */
            },
            {
              key: 'sortDotsPos',
              value: function sortDotsPos() {
                this.dotsPos = _toConsumableArray(this.dotsPos).sort(function(a, b) {
                  return a - b
                })
              },
              /**
               * 同步滑块位置
               *
               * @memberof Control
               */
            },
            {
              key: 'syncDotsPos',
              value: function syncDotsPos() {
                var _this2 = this

                this.dotsPos = this.dotsValue.map(function(v) {
                  return _this2.parseValue(v)
                })
              },
              /**
               * 得到所有标志
               *
               * @readonly
               * @type {Mark[]}
               * @memberof Control
               */
            },
            {
              key: 'getRecentDot',

              /**
               * 通过位置得到最近的一个滑块索引
               *
               * @param {number} pos
               * @returns {number}
               * @memberof Control
               */
              value: function getRecentDot(pos) {
                var arr = this.dotsPos.map(function(dotPos) {
                  return Math.abs(dotPos - pos)
                })
                return arr.indexOf(Math.min.apply(Math, _toConsumableArray(arr)))
              },
              /**
               * 通过值得到索引
               *
               * @param {Value} value
               * @returns {number}
               * @memberof Control
               */
            },
            {
              key: 'getIndexByValue',
              value: function getIndexByValue(value) {
                if (this.data) {
                  return this.data.indexOf(value)
                }

                return new decimal_Decimal(+value)
                  .minus(this.min)
                  .divide(this.interval)
                  .toNumber()
              },
              /**
               * 通过索引得到值
               *
               * @param {index} number
               * @returns {Value}
               * @memberof Control
               */
            },
            {
              key: 'getValueByIndex',
              value: function getValueByIndex(index) {
                return this.data
                  ? this.data[index]
                  : new decimal_Decimal(index)
                      .multiply(this.interval)
                      .plus(this.min)
                      .toNumber()
              },
              /**
               * 设置单个滑块的位置
               *
               * @param {number} pos 滑块在组件中的位置
               * @param {number} index 滑块的索引
               */
            },
            {
              key: 'setDotPos',
              value: function setDotPos(pos, index) {
                // 滑块变化的距离
                pos = this.getValidPos(pos, index).pos
                var changePos = pos - this.dotsPos[index] // 没有变化则不更新位置

                if (!changePos) {
                  return
                }

                var changePosArr = new Array(this.dotsPos.length)

                if (this.fixed) {
                  changePosArr = this.getFixedChangePosArr(changePos, index)
                } else if (this.minRange || this.maxRange) {
                  changePosArr = this.getLimitRangeChangePosArr(pos, changePos, index)
                } else {
                  changePosArr[index] = changePos
                }

                this.setDotsPos(
                  this.dotsPos.map(function(curPos, i) {
                    return curPos + (changePosArr[i] || 0)
                  }),
                )
              },
              /**
               * 在 fixed 模式下，得到全部滑块变化的位置
               *
               * @param {number} changePos 单个滑块的变化距离
               * @param {number} index 滑块的索引
               * @returns {DotsPosChangeArray}
               * @memberof Control
               */
            },
            {
              key: 'getFixedChangePosArr',
              value: function getFixedChangePosArr(changePos, index) {
                var _this3 = this

                this.dotsPos.forEach(function(originPos, i) {
                  if (i !== index) {
                    var _this3$getValidPos = _this3.getValidPos(originPos + changePos, i),
                      lastPos = _this3$getValidPos.pos,
                      inRange = _this3$getValidPos.inRange

                    if (!inRange) {
                      changePos =
                        Math.min(Math.abs(lastPos - originPos), Math.abs(changePos)) *
                        (changePos < 0 ? -1 : 1)
                    }
                  }
                })
                return this.dotsPos.map(function(_) {
                  return changePos
                })
              },
              /**
               * 在 minRange/maxRange 模式下，得到全部滑块变化的位置
               *
               * @param {number} pos 单个滑块的位置
               * @param {number} changePos 单个滑块的变化距离
               * @param {number} index 滑块的索引
               * @returns {DotsPosChangeArray}
               * @memberof Control
               */
            },
            {
              key: 'getLimitRangeChangePosArr',
              value: function getLimitRangeChangePosArr(pos, changePos, index) {
                var _this4 = this

                var changeDots = [
                  {
                    index: index,
                    changePos: changePos,
                  },
                ]
                var newChangePos = changePos
                ;[this.minRange, this.maxRange].forEach(function(isLimitRange, rangeIndex) {
                  if (!isLimitRange) {
                    return false
                  }

                  var isMinRange = rangeIndex === 0
                  var isForward = changePos > 0
                  var next = 0

                  if (isMinRange) {
                    next = isForward ? 1 : -1
                  } else {
                    next = isForward ? -1 : 1
                  } // 是否在限制的范围中

                  var inLimitRange = function inLimitRange(pos2, pos1) {
                    var diff = Math.abs(pos2 - pos1)
                    return isMinRange ? diff < _this4.minRangeDir : diff > _this4.maxRangeDir
                  }

                  var i = index + next
                  var nextPos = _this4.dotsPos[i]
                  var curPos = pos

                  while (_this4.isPos(nextPos) && inLimitRange(nextPos, curPos)) {
                    var _this4$getValidPos = _this4.getValidPos(nextPos + newChangePos, i),
                      lastPos = _this4$getValidPos.pos

                    changeDots.push({
                      index: i,
                      changePos: lastPos - nextPos,
                    })
                    i = i + next
                    curPos = lastPos
                    nextPos = _this4.dotsPos[i]
                  }
                })
                return this.dotsPos.map(function(_, i) {
                  var changeDot = changeDots.find(function(dot) {
                    return dot.index === i
                  })
                  return changeDot ? changeDot.changePos : 0
                })
              },
            },
            {
              key: 'isPos',
              value: function isPos(pos) {
                return typeof pos === 'number'
              },
              /**
               * 得到最后滑块位置
               *
               * @param {number} newPos 新的滑块位置
               * @param {number} index 滑块索引
               * @returns {{ pos: number, inRange: boolean }}
               */
            },
            {
              key: 'getValidPos',
              value: function getValidPos(newPos, index) {
                var range = this.valuePosRange[index]
                var pos = newPos
                var inRange = true

                if (newPos < range[0]) {
                  pos = range[0]
                  inRange = false
                } else if (newPos > range[1]) {
                  pos = range[1]
                  inRange = false
                }

                return {
                  pos: pos,
                  inRange: inRange,
                }
              },
              /**
               * 根据值计算出滑块的位置
               *
               * @param {Value} val
               * @returns {number}
               */
            },
            {
              key: 'parseValue',
              value: function parseValue(val) {
                if (this.data) {
                  val = this.data.indexOf(val)
                } else if (typeof val === 'number' || typeof val === 'string') {
                  val = +val

                  if (val < this.min) {
                    this.emitError(ERROR_TYPE.MIN)
                    return 0
                  }

                  if (val > this.max) {
                    this.emitError(ERROR_TYPE.MAX)
                    return 0
                  }

                  val = new decimal_Decimal(val)
                    .minus(this.min)
                    .divide(this.interval)
                    .toNumber()
                }

                if (typeof val !== 'number') {
                  this.emitError(ERROR_TYPE.VALUE)
                  return 0
                }

                var pos = new decimal_Decimal(val).multiply(this.gap).toNumber()
                return pos < 0 ? 0 : pos > 100 ? 100 : pos
              },
              /**
               * 通过位置计算出值
               *
               * @param {number} pos
               * @returns {Value}
               * @memberof Control
               */
            },
            {
              key: 'parsePos',
              value: function parsePos(pos) {
                var index = Math.round(pos / this.gap)
                return this.getValueByIndex(index)
              },
              /**
               * 判断该位置是否激活状态
               *
               * @param {number} pos
               * @returns {boolean}
               * @memberof Control
               */
            },
            {
              key: 'isActiveByPos',
              value: function isActiveByPos(pos) {
                return this.processArray.some(function(_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                    start = _ref2[0],
                    end = _ref2[1]

                  return pos >= start && pos <= end
                })
              },
              /**
               * 获得每个值
               *
               * @returns {Value[]}
               * @memberof Control
               */
            },
            {
              key: 'getValues',
              value: function getValues() {
                var _this5 = this

                if (this.data) {
                  return this.data
                } else {
                  return Array.from(new Array(this.total), function(_, index) {
                    return new decimal_Decimal(index)
                      .multiply(_this5.interval)
                      .plus(_this5.min)
                      .toNumber()
                  }).concat([this.max])
                }
              },
              /**
               * 获得每个值的位置
               *
               * @private
               * @returns {number[]}
               * @memberof Control
               */
            },
            {
              key: 'geValuePos',
              value: function geValuePos() {
                var gap = this.gap
                return Array.from(new Array(this.total), function(_, index) {
                  return new decimal_Decimal(index).multiply(gap).toNumber()
                }).concat([100])
              },
              /**
               * 返回错误
               *
               * @private
               * @param {ERROR_TYPE} type 错误类型
               * @memberof Control
               */
            },
            {
              key: 'emitError',
              value: function emitError(type) {
                if (this.onError) {
                  this.onError(type, ERROR_MSG[type])
                }
              },
              /**
               * 进度条数组
               *
               * @readonly
               * @type {ProcessOption}
               * @memberof Control
               */
            },
            {
              key: 'markList',
              get: function get() {
                var _this6 = this

                if (!this.marks) {
                  return []
                } // 通过值获取 Mark

                var getMarkByValue = function getMarkByValue(value, mark) {
                  var pos = _this6.parseValue(value)

                  return _objectSpread(
                    {
                      pos: pos,
                      value: typeof value === 'string' ? parseFloat(value) : value,
                      label: value,
                      active: _this6.isActiveByPos(pos),
                    },
                    mark,
                  )
                }

                if (this.marks === true) {
                  return this.getValues().map(function(value) {
                    return getMarkByValue(value)
                  })
                } else if (Object.prototype.toString.call(this.marks) === '[object Object]') {
                  return Object.keys(this.marks)
                    .sort(function(a, b) {
                      return +a - +b
                    })
                    .map(function(value) {
                      var item = _this6.marks[value]
                      return getMarkByValue(
                        value,
                        typeof item !== 'string'
                          ? item
                          : {
                              label: item,
                            },
                      )
                    })
                } else if (Array.isArray(this.marks)) {
                  return this.marks.map(function(value) {
                    return getMarkByValue(value)
                  })
                } else if (typeof this.marks === 'function') {
                  return this.getValues()
                    .map(function(value) {
                      return {
                        value: value,
                        result: _this6.marks(value),
                      }
                    })
                    .filter(function(_ref3) {
                      var result = _ref3.result
                      return !!result
                    })
                    .map(function(_ref4) {
                      var value = _ref4.value,
                        result = _ref4.result
                      return getMarkByValue(value, result)
                    })
                } else {
                  return []
                }
              },
            },
            {
              key: 'processArray',
              get: function get() {
                if (this.process) {
                  if (typeof this.process === 'function') {
                    return this.process(this.dotsPos)
                  } else if (this.dotsPos.length === 1) {
                    return [[0, this.dotsPos[0]]]
                  } else if (this.dotsPos.length > 1) {
                    return [
                      [
                        Math.min.apply(Math, _toConsumableArray(this.dotsPos)),
                        Math.max.apply(Math, _toConsumableArray(this.dotsPos)),
                      ],
                    ]
                  }
                }

                return []
              },
              /**
               * 值的总个数
               *
               * @type {number}
               * @memberof Control
               */
            },
            {
              key: 'total',
              get: function get() {
                var total = 0

                if (this.data) {
                  total = this.data.length - 1
                } else {
                  total = new decimal_Decimal(this.max)
                    .minus(this.min)
                    .divide(this.interval)
                    .toNumber()
                }

                if (total - Math.floor(total) !== 0) {
                  this.emitError(ERROR_TYPE.INTERVAL)
                  return 0
                }

                return total
              },
              /**
               * 每个可用值之间的距离
               *
               * @type {number}
               * @memberof Control
               */
            },
            {
              key: 'gap',
              get: function get() {
                return 100 / this.total
              },
              /**
               * 两个滑块最小的距离
               *
               * @type {number}
               * @memberof Control
               */
            },
            {
              key: 'minRangeDir',
              get: function get() {
                return this.minRange ? this.minRange * this.gap : 0
              },
              /**
               * 两个滑块最大的距离
               *
               * @type {number}
               * @memberof Control
               */
            },
            {
              key: 'maxRangeDir',
              get: function get() {
                return this.maxRange ? this.maxRange * this.gap : 100
              },
              /**
               * 每个滑块的滑动范围
               *
               * @type {Array<[number, number]>}
               * @memberof Control
               */
            },
            {
              key: 'valuePosRange',
              get: function get() {
                var _this7 = this

                var dotsPos = this.dotsPos
                var valuePosRange = []
                dotsPos.forEach(function(pos, i) {
                  valuePosRange.push([
                    Math.max(
                      _this7.minRange ? _this7.minRangeDir * i : 0,
                      !_this7.enableCross ? dotsPos[i - 1] || 0 : 0,
                    ),
                    Math.min(
                      _this7.minRange ? 100 - _this7.minRangeDir * (dotsPos.length - 1 - i) : 100,
                      !_this7.enableCross ? dotsPos[i + 1] || 100 : 100,
                    ),
                  ])
                })
                return valuePosRange
              },
            },
          ])

          return Control
        })()

      // CONCATENATED MODULE: ./lib/utils/state.ts

      var state_State =
        /*#__PURE__*/
        (function() {
          function State(map) {
            _classCallCheck(this, State)

            this.states = 0
            this.map = map
          } // 设置状态

          _createClass(State, [
            {
              key: 'add',
              value: function add(state) {
                this.states |= state
              }, // 移除状态
            },
            {
              key: 'delete',
              value: function _delete(state) {
                this.states &= ~state
              }, // 切换状态
            },
            {
              key: 'toggle',
              value: function toggle(state) {
                if (this.has(state)) {
                  this.delete(state)
                } else {
                  this.add(state)
                }
              }, // 判断是否存在该状态
            },
            {
              key: 'has',
              value: function has(state) {
                return !!(this.states & state)
              },
            },
          ])

          return State
        })()

      // EXTERNAL MODULE: ./lib/styles/slider.scss
      var slider = __webpack_require__('4abb')

      // CONCATENATED MODULE: ./lib/vue-slider.tsx

      var SliderState = {
        None: 0,
        Drag: 1 << 0,
        FOCUS: 2 << 0,
      }
      var DEFAULT_SLIDER_SIZE = 4

      var vue_slider_VueSlider =
        /*#__PURE__*/
        (function(_Vue) {
          function VueSlider() {
            var _this

            _classCallCheck(this, VueSlider)

            _this = _possibleConstructorReturn(
              this,
              _getPrototypeOf(VueSlider).apply(this, arguments),
            )
            _this.states = new state_State(SliderState) // 组件状态

            _this.scale = 1 // 比例，1% = ${scale}px

            _this.focusDotIndex = 0
            return _this
          } // 轨道尺寸

          _createClass(VueSlider, [
            {
              key: 'onValueChanged',
              value: function onValueChanged() {
                if (!this.states.has(SliderState.Drag) && this.isNotSync) {
                  this.control.setValue(this.value)
                }
              },
            },
            {
              key: 'created',
              value: function created() {
                this.initControl()
              },
            },
            {
              key: 'mounted',
              value: function mounted() {
                this.bindEvent()
              },
            },
            {
              key: 'beforeDestroy',
              value: function beforeDestroy() {
                this.unbindEvent()
              },
            },
            {
              key: 'bindEvent',
              value: function bindEvent() {
                document.addEventListener('touchmove', this.dragMove, {
                  passive: false,
                })
                document.addEventListener('touchend', this.dragEnd, {
                  passive: false,
                })
                document.addEventListener('mousedown', this.isBlurSlider)
                document.addEventListener('mousemove', this.dragMove)
                document.addEventListener('mouseup', this.dragEnd)
                document.addEventListener('mouseleave', this.dragEnd)
                document.addEventListener('keydown', this.handleKeydown)
                document.addEventListener('keyup', this.handleKeyup)
              },
            },
            {
              key: 'unbindEvent',
              value: function unbindEvent() {
                document.removeEventListener('touchmove', this.dragMove)
                document.removeEventListener('touchend', this.dragEnd)
                document.removeEventListener('mousemove', this.dragMove)
                document.removeEventListener('mouseup', this.dragEnd)
                document.removeEventListener('mouseleave', this.dragEnd)
                document.removeEventListener('keydown', this.handleKeydown)
                document.removeEventListener('keyup', this.handleKeyup)
              }, // 获取组件比例
            },
            {
              key: 'setScale',
              value: function setScale() {
                this.scale = new decimal_Decimal(
                  Math.floor(this.isHorizontal ? this.$el.offsetWidth : this.$el.offsetHeight),
                )
                  .divide(100)
                  .toNumber()
              }, // 初始化
            },
            {
              key: 'initControl',
              value: function initControl() {
                var _this2 = this

                this.control = new control_Control({
                  value: this.value,
                  data: this.data,
                  enableCross: this.enableCross,
                  fixed: this.fixed,
                  max: this.max,
                  min: this.min,
                  interval: this.interval,
                  minRange: this.minRange,
                  maxRange: this.maxRange,
                  order: this.order,
                  marks: this.marks,
                  process: this.process,
                  onError: this.emitError,
                })
                ;[
                  'value',
                  'data',
                  'enableCross',
                  'fixed',
                  'max',
                  'min',
                  'interval',
                  'minRange',
                  'maxRange',
                  'order',
                  'marks',
                  'process',
                ].forEach(function(name) {
                  _this2.$watch(name, function(val) {
                    _this2.control[name] = val

                    _this2.control.syncDotsPos()
                  })
                })
              }, // 判断滑块是否禁用状态
            },
            {
              key: 'isDisabledByDotIndex',
              value: function isDisabledByDotIndex(index) {
                return this.dots[index].disabled
              }, // 同步值
            },
            {
              key: 'syncValueByPos',
              value: function syncValueByPos() {
                var _this3 = this

                var values = this.control.dotsValue // 当开启 included 时，返回值为离最近的 mark 的值

                if (this.included && this.control.markList.length > 0) {
                  var getRecentValue = function getRecentValue(val) {
                    var curValue = val
                    var dir = _this3.max - _this3.min

                    _this3.control.markList.forEach(function(mark) {
                      if (typeof mark.value === 'number' && typeof val === 'number') {
                        var curDir = Math.abs(mark.value - val)

                        if (curDir < dir) {
                          dir = curDir
                          curValue = mark.value
                        }
                      }
                    })

                    return curValue
                  }

                  values = values.map(function(val) {
                    return getRecentValue(val)
                  })
                }

                if (this.isDiff(values, Array.isArray(this.value) ? this.value : [this.value])) {
                  this.$emit('change', values.length === 1 ? values[0] : values)
                }
              }, // 判断当前值和组件内部值是否不一致
            },
            {
              key: 'isDiff',
              // 判断值是否发生变化
              value: function isDiff(value1, value2) {
                return (
                  value1.length !== value2.length ||
                  value1.some(function(val, index) {
                    return val !== value2[index]
                  })
                )
              }, // 返回错误
            },
            {
              key: 'emitError',
              value: function emitError(type, message) {
                this.$emit('error', {
                  type: type,
                  message: message,
                })
              },
              /**
               * 得到滑块的拖拽范围
               *
               * @private
               * @param {number} index 滑块索引
               * @returns {[number, number]} 范围 [start, end]
               * @memberof VueSlider
               */
            },
            {
              key: 'dragStart',
              // 拖拽开始
              value: function dragStart(index) {
                this.focusDotIndex = index
                this.setScale()
                this.states.add(SliderState.Drag)
                this.states.add(SliderState.FOCUS)
                this.$emit('dragStart')
              }, // 拖拽中
            },
            {
              key: 'dragMove',
              value: function dragMove(e) {
                if (!this.states.has(SliderState.Drag)) {
                  return false
                }

                e.preventDefault()
                var pos = this.getPosByEvent(e) // 如果组件是排序的，那当滑块交叉时，切换当前选中的滑块索引

                if (this.isOrder) {
                  var curIndex = this.focusDotIndex
                  var curPos = pos

                  if (curPos > this.dragRange[1]) {
                    curPos = this.dragRange[1]
                    this.focusDotIndex++
                  } else if (curPos < this.dragRange[0]) {
                    curPos = this.dragRange[0]
                    this.focusDotIndex--
                  }

                  if (curIndex !== this.focusDotIndex) {
                    this.control.setDotPos(curPos, curIndex)
                  }
                }

                this.control.setDotPos(pos, this.focusDotIndex)

                if (!this.lazy) {
                  this.syncValueByPos()
                }

                this.$emit('dragging')
              }, // 拖拽结束
            },
            {
              key: 'dragEnd',
              value: function dragEnd() {
                var _this4 = this

                if (!this.states.has(SliderState.Drag)) {
                  return false
                }

                if (this.isOrder) {
                  this.control.sortDotsPos()
                }

                if (this.lazy) {
                  this.syncValueByPos()
                }

                setTimeout(function() {
                  // included = true 的情况下，拖拽完毕需强制更新组件内部值
                  if (_this4.included && _this4.isNotSync) {
                    _this4.control.setValue(_this4.value)
                  } else {
                    // 拖拽完毕后同步滑块的位置
                    _this4.control.syncDotsPos()
                  }

                  _this4.states.delete(SliderState.Drag) // 仅当支持键盘操作模式时，拖拽完毕后保留 FOCUS 状态

                  if (!_this4.useKeyboard) {
                    _this4.states.delete(SliderState.FOCUS)
                  }

                  _this4.$emit('dragEnd')
                })
              }, // 判断组件是否失去焦点
            },
            {
              key: 'isBlurSlider',
              value: function isBlurSlider(e) {
                if (
                  !this.states.has(SliderState.FOCUS) ||
                  !this.$refs.container ||
                  this.$refs.container.contains(e.target)
                ) {
                  return false
                }

                this.states.delete(SliderState.FOCUS)
              }, // 处理点击事件
            },
            {
              key: 'clickHandle',
              value: function clickHandle(e) {
                var _this5 = this

                if (this.states.has(SliderState.Drag)) {
                  return
                }

                this.setScale()
                var pos = this.getPosByEvent(e)
                var index = this.control.getRecentDot(pos)

                if (this.isDisabledByDotIndex(index)) {
                  return false
                }

                this.focusDotIndex = index
                this.control.setDotPos(pos, index)
                this.syncValueByPos()

                if (this.useKeyboard) {
                  this.states.add(SliderState.FOCUS)
                }

                setTimeout(function() {
                  // included = true 的情况下，拖拽完毕需强制更新组件内部值
                  if (_this5.included && _this5.isNotSync) {
                    _this5.control.setValue(_this5.value)
                  } else {
                    // 拖拽完毕后同步滑块的位置
                    _this5.control.syncDotsPos()
                  }
                })
              }, // 处理键盘按键按下
            },
            {
              key: 'handleKeydown',
              value: function handleKeydown(e) {
                if (!this.useKeyboard || !this.states.has(SliderState.FOCUS)) {
                  return false
                }

                var handleFunc = getKeyboardHandleFunc(e, {
                  direction: this.direction,
                  max: this.control.total,
                  min: 0,
                })

                if (handleFunc) {
                  e.preventDefault()
                  var index = this.control.getIndexByValue(
                    this.control.dotsValue[this.focusDotIndex],
                  )
                  var newIndex = handleFunc(index)
                  this.control.setDotPos(
                    this.control.parseValue(this.control.getValueByIndex(newIndex)),
                    this.focusDotIndex,
                  )
                }
              }, // 处理键盘按键弹起
            },
            {
              key: 'handleKeyup',
              value: function handleKeyup(e) {
                if (!this.useKeyboard || !this.states.has(SliderState.FOCUS)) {
                  return false
                }
              }, // 获取鼠标的位置
            },
            {
              key: 'getPosByEvent',
              value: function getPosByEvent(e) {
                return (
                  getPos(e, this.$el, this.isReverse)[this.isHorizontal ? 'x' : 'y'] / this.scale
                )
              }, // 渲染 slot
            },
            {
              key: 'renderSlot',
              value: function renderSlot(name, data, defaultSlot) {
                return this.$scopedSlots[name] ? this.$scopedSlots[name](data) : defaultSlot
              },
            },
            {
              key: 'render',
              value: function render() {
                var _this6 = this

                var h = arguments[0]
                return h(
                  'div',
                  {
                    directives: [
                      {
                        name: 'show',
                        value: this.show,
                      },
                    ],
                    ref: 'container',
                    class: this.containerClasses,
                    style: this.containerStyles,
                    attrs: {
                      'aria-hidden': true,
                    },
                    on: {
                      click: this.clickHandle,
                    },
                  },
                  [
                    h(
                      'div',
                      {
                        class: 'vue-slider-rail',
                        style: this.tailStyle,
                      },
                      [
                        this.processBaseStyleArray.map(function(baseStyle, index) {
                          return h('div', {
                            class: 'vue-slider-process',
                            key: 'process-'.concat(index),
                            style: [baseStyle, _this6.processStyle],
                          })
                        }),
                        this.marks
                          ? h(
                              'div',
                              {
                                class: 'vue-slider-marks',
                              },
                              [
                                this.control.markList.map(function(mark) {
                                  var _ref

                                  return _this6.renderSlot(
                                    'mark',
                                    mark,
                                    h(
                                      'vue-slider-mark',
                                      {
                                        attrs: {
                                          mark: mark,
                                          hideLabel: _this6.hideLabel,
                                          stepStyle: _this6.stepStyle,
                                          stepActiveStyle: _this6.stepActiveStyle,
                                          labelStyle: _this6.labelStyle,
                                          labelActiveStyle: _this6.labelActiveStyle,
                                        },
                                        style: ((_ref = {}),
                                        _defineProperty(
                                          _ref,
                                          _this6.isHorizontal ? 'height' : 'width',
                                          '100%',
                                        ),
                                        _defineProperty(
                                          _ref,
                                          _this6.isHorizontal ? 'width' : 'height',
                                          ''.concat(_this6.tailSize, 'px'),
                                        ),
                                        _defineProperty(
                                          _ref,
                                          _this6.mainDirection,
                                          ''.concat(mark.pos, '%'),
                                        ),
                                        _ref),
                                      },
                                      [
                                        _this6.renderSlot('step', mark, null),
                                        _this6.renderSlot('label', mark, null),
                                      ],
                                    ),
                                  )
                                }),
                              ],
                            )
                          : null,
                        this.dots.map(function(dot, index) {
                          var _ref2

                          return h(
                            'vue-slider-dot',
                            {
                              ref: 'dot-'.concat(index),
                              key: 'dot-'.concat(index),
                              attrs: {
                                dotSize: _this6.dotSize,
                                value: dot.value,
                                disabled: dot.disabled,
                                focus: dot.focus,
                                'dot-style': [
                                  dot.style,
                                  dot.disabled ? dot.disabledStyle : null,
                                  dot.focus ? dot.focusStyle : null,
                                ],
                                tooltip: dot.tooltip || _this6.tooltip,
                                'tooltip-style': [
                                  dot.tooltipStyle,
                                  dot.disabled ? dot.tooltipDisabledStyle : null,
                                  dot.focus ? dot.tooltipFocusStyle : null,
                                ],
                                'tooltip-formatter': _this6.tooltipFormatter,
                                'tooltip-placement': _this6.tooltipDirections[index],
                              },
                              style: [
                                _this6.dotBaseStyle,
                                ((_ref2 = {}),
                                _defineProperty(
                                  _ref2,
                                  _this6.mainDirection,
                                  ''.concat(dot.pos, '%'),
                                ),
                                _defineProperty(
                                  _ref2,
                                  'transition',
                                  ''
                                    .concat(_this6.mainDirection, ' ')
                                    .concat(_this6.animateTime, 's'),
                                ),
                                _ref2),
                              ],
                              on: {
                                dragStart: function dragStart() {
                                  return _this6.dragStart(index)
                                },
                              },
                            },
                            [
                              _this6.renderSlot('dot', dot, null),
                              _this6.renderSlot('tooltip', dot, null),
                            ],
                          )
                        }),
                      ],
                    ),
                    this.dots.length === 1 && !this.data
                      ? h('input', {
                          class: 'vue-slider-sr-only',
                          attrs: {
                            type: 'range',
                            min: this.min,
                            max: this.max,
                          },
                          domProps: {
                            value: this.value,
                          },
                        })
                      : null,
                  ],
                )
              },
            },
            {
              key: 'tailSize',
              get: function get() {
                return (this.isHorizontal ? this.height : this.width) || DEFAULT_SLIDER_SIZE
              }, // 容器类
            },
            {
              key: 'containerClasses',
              get: function get() {
                return [
                  'vue-slider',
                  ['vue-slider-'.concat(this.direction)],
                  {
                    'vue-slider-disabled': this.disabled,
                  },
                ]
              }, // 容器样式
            },
            {
              key: 'containerStyles',
              get: function get() {
                var _ref3 = Array.isArray(this.dotSize)
                    ? this.dotSize
                    : [this.dotSize, this.dotSize],
                  _ref4 = _slicedToArray(_ref3, 2),
                  dotWidth = _ref4[0],
                  dotHeight = _ref4[1]

                var containerWidth = this.width
                  ? toPx(this.width)
                  : this.isHorizontal
                  ? 'auto'
                  : toPx(DEFAULT_SLIDER_SIZE)
                var containerHeight = this.height
                  ? toPx(this.height)
                  : this.isHorizontal
                  ? toPx(DEFAULT_SLIDER_SIZE)
                  : 'auto'
                return {
                  padding: ''.concat(dotHeight / 2, 'px ').concat(dotWidth / 2, 'px'),
                  width: containerWidth,
                  height: containerHeight,
                }
              }, // 进度条样式数组
            },
            {
              key: 'processBaseStyleArray',
              get: function get() {
                var _this7 = this

                return this.control.processArray.map(function(_ref5) {
                  var _objectSpread2

                  var _ref6 = _slicedToArray(_ref5, 3),
                    start = _ref6[0],
                    end = _ref6[1],
                    style = _ref6[2]

                  if (start > end) {
                    /* tslint:disable:semicolon */
                    var _ref7 = [end, start]
                    start = _ref7[0]
                    end = _ref7[1]
                  }

                  var sizeStyleKey = _this7.isHorizontal ? 'width' : 'height'
                  return _objectSpread(
                    ((_objectSpread2 = {}),
                    _defineProperty(
                      _objectSpread2,
                      _this7.isHorizontal ? 'height' : 'width',
                      '100%',
                    ),
                    _defineProperty(_objectSpread2, _this7.isHorizontal ? 'top' : 'left', 0),
                    _defineProperty(_objectSpread2, _this7.mainDirection, ''.concat(start, '%')),
                    _defineProperty(_objectSpread2, sizeStyleKey, ''.concat(end - start, '%')),
                    _defineProperty(
                      _objectSpread2,
                      'transitionProperty',
                      ''.concat(sizeStyleKey, ',').concat(_this7.mainDirection),
                    ),
                    _defineProperty(
                      _objectSpread2,
                      'transitionDuration',
                      ''.concat(_this7.animateTime, 's'),
                    ),
                    _objectSpread2),
                    style,
                  )
                })
              }, // dot style
            },
            {
              key: 'dotBaseStyle',
              get: function get() {
                var _ref8 = Array.isArray(this.dotSize)
                    ? this.dotSize
                    : [this.dotSize, this.dotSize],
                  _ref9 = _slicedToArray(_ref8, 2),
                  dotWidth = _ref9[0],
                  dotHeight = _ref9[1]

                var dotPos

                if (this.isHorizontal) {
                  var _dotPos

                  dotPos = ((_dotPos = {
                    marginTop: '-'.concat((dotHeight - this.tailSize) / 2, 'px'),
                  }),
                  _defineProperty(
                    _dotPos,
                    this.direction === 'ltr' ? 'marginLeft' : 'marginRight',
                    '-'.concat(dotWidth / 2, 'px'),
                  ),
                  _defineProperty(_dotPos, 'top', '0'),
                  _defineProperty(_dotPos, this.direction === 'ltr' ? 'left' : 'right', '0'),
                  _dotPos)
                } else {
                  var _dotPos2

                  dotPos = ((_dotPos2 = {
                    marginLeft: '-'.concat((dotWidth - this.tailSize) / 2, 'px'),
                  }),
                  _defineProperty(
                    _dotPos2,
                    this.direction === 'btt' ? 'marginBottom' : 'marginTop',
                    '-'.concat(dotHeight / 2, 'px'),
                  ),
                  _defineProperty(_dotPos2, 'left', '0'),
                  _defineProperty(_dotPos2, this.direction === 'btt' ? 'bottom' : 'top', '0'),
                  _dotPos2)
                }

                return _objectSpread(
                  {
                    width: ''.concat(dotWidth, 'px'),
                    height: ''.concat(dotHeight, 'px'),
                  },
                  dotPos,
                )
              }, // 滑块滑动的主方向
            },
            {
              key: 'mainDirection',
              get: function get() {
                switch (this.direction) {
                  case 'ltr':
                    return 'left'

                  case 'rtl':
                    return 'right'

                  case 'btt':
                    return 'bottom'

                  case 'ttb':
                    return 'top'
                }
              }, // 是否水平方向组件
            },
            {
              key: 'isHorizontal',
              get: function get() {
                return this.direction === 'ltr' || this.direction === 'rtl'
              }, // 是否反向
            },
            {
              key: 'isReverse',
              get: function get() {
                return this.direction === 'rtl' || this.direction === 'btt'
              }, // 全部 tooltip 的方向
            },
            {
              key: 'tooltipDirections',
              get: function get() {
                var dir = this.tooltipPlacement || (this.isHorizontal ? 'top' : 'left')

                if (Array.isArray(dir)) {
                  return dir
                } else {
                  return Array.from(new Array(this.dots.length), function() {
                    return dir
                  })
                }
              }, // 得到所有的滑块
            },
            {
              key: 'dots',
              get: function get() {
                var _this8 = this

                return this.control.dotsPos.map(function(pos, index) {
                  return _objectSpread(
                    {
                      pos: pos,
                      value: _this8.control.dotsValue[index],
                      focus: _this8.states.has(SliderState.FOCUS) && _this8.focusDotIndex === index,
                      disabled: false,
                    },
                    _this8.dotStyle,
                    (Array.isArray(_this8.dotOptions)
                      ? _this8.dotOptions[index]
                      : _this8.dotOptions) || {},
                  )
                })
              }, // 滑块动画过渡时间
            },
            {
              key: 'animateTime',
              get: function get() {
                if (this.states.has(SliderState.Drag)) {
                  return 0
                }

                return this.speed
              }, // 是否可以排序
            },
            {
              key: 'isOrder',
              get: function get() {
                return (
                  this.order && !this.minRange && !this.maxRange && !this.fixed && this.enableCross
                )
              },
            },
            {
              key: 'isNotSync',
              get: function get() {
                var values = this.control.dotsValue
                return Array.isArray(this.value)
                  ? this.value.some(function(val, index) {
                      return val !== values[index]
                    })
                  : this.value !== values[0]
              },
            },
            {
              key: 'dragRange',
              get: function get() {
                var prevDot = this.dots[this.focusDotIndex - 1]
                var nextDot = this.dots[this.focusDotIndex + 1]
                return [prevDot ? prevDot.pos : -Infinity, nextDot ? nextDot.pos : Infinity]
              },
            },
          ])

          _inherits(VueSlider, _Vue)

          return VueSlider
        })(external_commonjs_vue_commonjs2_vue_root_Vue_default.a)

      __decorate(
        [
          Model('change', {
            default: 0,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'value',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Boolean,
            default: true,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'show',
        void 0,
      )

      __decorate([Prop(Number)], vue_slider_VueSlider.prototype, 'width', void 0)

      __decorate([Prop(Number)], vue_slider_VueSlider.prototype, 'height', void 0)

      __decorate(
        [
          Prop({
            default: 14,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'dotSize',
        void 0,
      )

      __decorate(
        [
          Prop({
            default: 'ltr',
            validator: function validator(dir) {
              return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(dir) > -1
            },
          }),
        ],
        vue_slider_VueSlider.prototype,
        'direction',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Number,
            default: 0,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'min',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Number,
            default: 100,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'max',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Number,
            default: 1,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'interval',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Number,
            default: 0.5,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'speed',
        void 0,
      )

      __decorate([Prop()], vue_slider_VueSlider.prototype, 'disabled', void 0)

      __decorate([Prop(Array)], vue_slider_VueSlider.prototype, 'data', void 0)

      __decorate(
        [
          Prop({
            type: Boolean,
            default: false,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'lazy',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: String,
            validator: function validator(val) {
              return ['none', 'always', 'focus'].includes(val)
            },
            default: 'focus',
          }),
        ],
        vue_slider_VueSlider.prototype,
        'tooltip',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: String,
            validator: function validator(val) {
              return ['top', 'right', 'bottom', 'left'].includes(val)
            },
          }),
        ],
        vue_slider_VueSlider.prototype,
        'tooltipPlacement',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: [String, Function],
          }),
        ],
        vue_slider_VueSlider.prototype,
        'tooltipFormatter',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Boolean,
            default: true,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'useKeyboard',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Boolean,
            default: true,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'enableCross',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Boolean,
            default: false,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'fixed',
        void 0,
      )

      __decorate(
        [
          Prop({
            type: Boolean,
            default: true,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'order',
        void 0,
      )

      __decorate([Prop(Number)], vue_slider_VueSlider.prototype, 'minRange', void 0)

      __decorate([Prop(Number)], vue_slider_VueSlider.prototype, 'maxRange', void 0)

      __decorate([Prop()], vue_slider_VueSlider.prototype, 'tailStyle', void 0)

      __decorate([Prop()], vue_slider_VueSlider.prototype, 'processStyle', void 0)

      __decorate([Prop()], vue_slider_VueSlider.prototype, 'dotStyle', void 0)

      __decorate([Prop()], vue_slider_VueSlider.prototype, 'dotOptions', void 0)

      __decorate(
        [
          Prop({
            type: [Boolean, Function],
            default: true,
          }),
        ],
        vue_slider_VueSlider.prototype,
        'process',
        void 0,
      )

      __decorate(
        [Prop([Boolean, Object, Array, Function])],
        vue_slider_VueSlider.prototype,
        'marks',
        void 0,
      )

      __decorate([Prop(Boolean)], vue_slider_VueSlider.prototype, 'included', void 0)

      __decorate([Prop(Boolean)], vue_slider_VueSlider.prototype, 'hideLabel', void 0)

      __decorate([Prop()], vue_slider_VueSlider.prototype, 'stepStyle', void 0)

      __decorate([Prop()], vue_slider_VueSlider.prototype, 'stepActiveStyle', void 0)

      __decorate([Prop()], vue_slider_VueSlider.prototype, 'labelStyle', void 0)

      __decorate([Prop()], vue_slider_VueSlider.prototype, 'labelActiveStyle', void 0)

      __decorate([Watch('value')], vue_slider_VueSlider.prototype, 'onValueChanged', null)

      vue_slider_VueSlider = __decorate(
        [
          vue_class_component_common_default()({
            data: function data() {
              return {
                control: null,
              }
            },
            components: {
              VueSliderDot: vue_slider_dot,
              VueSliderMark: vue_slider_mark,
            },
            inheritAttrs: false,
          }),
        ],
        vue_slider_VueSlider,
      )
      /* harmony default export */ var vue_slider = vue_slider_VueSlider
      // CONCATENATED MODULE: ./lib/index.ts

      /* harmony default export */ var lib = vue_slider
      // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
      /* concated harmony reexport VueSliderDot */ __webpack_require__.d(
        __webpack_exports__,
        'VueSliderDot',
        function() {
          return vue_slider_dot
        },
      )
      /* concated harmony reexport VueSliderMark */ __webpack_require__.d(
        __webpack_exports__,
        'VueSliderMark',
        function() {
          return vue_slider_mark
        },
      )

      /* harmony default export */ var entry_lib = (__webpack_exports__['default'] = lib)

      /***/
    },

    /***/ fdef: /***/ function(module, exports) {
      module.exports =
        '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
        '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'

      /***/
    },

    /******/
  },
)['default']
//# sourceMappingURL=vue-slider-component.common.js.map
