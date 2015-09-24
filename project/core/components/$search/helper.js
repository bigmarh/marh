module.exports = function() {
    return {
        filter: filterFilter
    }
}
function createMap() {
  return Object.create(null);
}

var NODE_TYPE_ELEMENT = 1;
var NODE_TYPE_ATTRIBUTE = 2;
var NODE_TYPE_TEXT = 3;
var NODE_TYPE_COMMENT = 8;
var NODE_TYPE_DOCUMENT = 9;
var NODE_TYPE_DOCUMENT_FRAGMENT = 11;


function filterFilter() {
    return function(array, expression, comparator) {
        if (!isArrayLike(array)) {
            if (array == null) {
                return array;
            } else {
                throw minErr('filter')('notarray', 'Expected array but received: {0}', array);
            }
        }

        var expressionType = getTypeForFilter(expression);
        var predicateFn;
        var matchAgainstAnyProp;

        switch (expressionType) {
            case 'function':
                predicateFn = expression;
                break;
            case 'boolean':
            case 'null':
            case 'number':
            case 'string':
                matchAgainstAnyProp = true;
                //jshint -W086
            case 'object':
                //jshint +W086
                predicateFn = createPredicateFn(expression, comparator, matchAgainstAnyProp);
                break;
            default:
                return array;
        }

        return Array.prototype.filter.call(array, predicateFn);
    };
}

// Helper functions for `filterFilter`
function createPredicateFn(expression, comparator, matchAgainstAnyProp) {
    var shouldMatchPrimitives = isObject(expression) && ('$' in expression);
    var predicateFn;

    if (comparator === true) {
        comparator = equals;
    } else if (!isFunction(comparator)) {
        comparator = function(actual, expected) {
            if (isUndefined(actual)) {
                // No substring matching against `undefined`
                return false;
            }
            if ((actual === null) || (expected === null)) {
                // No substring matching against `null`; only match against `null`
                return actual === expected;
            }
            if (isObject(expected) || (isObject(actual) && !hasCustomToString(actual))) {
                // Should not compare primitives against objects, unless they have custom `toString` method
                return false;
            }

            actual = lowercase('' + actual);
            expected = lowercase('' + expected);
            return actual.indexOf(expected) !== -1;
        };
    }

    predicateFn = function(item) {
        if (shouldMatchPrimitives && !isObject(item)) {
            return deepCompare(item, expression.$, comparator, false);
        }
        return deepCompare(item, expression, comparator, matchAgainstAnyProp);
    };

    return predicateFn;
}

function deepCompare(actual, expected, comparator, matchAgainstAnyProp, dontMatchWholeObject) {
    var actualType = getTypeForFilter(actual);
    var expectedType = getTypeForFilter(expected);

    if ((expectedType === 'string') && (expected.charAt(0) === '!')) {
        return !deepCompare(actual, expected.substring(1), comparator, matchAgainstAnyProp);
    } else if (isArray(actual)) {
        // In case `actual` is an array, consider it a match
        // if ANY of it's items matches `expected`
        return actual.some(function(item) {
            return deepCompare(item, expected, comparator, matchAgainstAnyProp);
        });
    }

    switch (actualType) {
        case 'object':
            var key;
            if (matchAgainstAnyProp) {
                for (key in actual) {
                    if ((key.charAt(0) !== '$') && deepCompare(actual[key], expected, comparator, true)) {
                        return true;
                    }
                }
                return dontMatchWholeObject ? false : deepCompare(actual, expected, comparator, false);
            } else if (expectedType === 'object') {
                for (key in expected) {
                    var expectedVal = expected[key];
                    if (isFunction(expectedVal) || isUndefined(expectedVal)) {
                        continue;
                    }

                    var matchAnyProperty = key === '$';
                    var actualVal = matchAnyProperty ? actual : actual[key];
                    if (!deepCompare(actualVal, expectedVal, comparator, matchAnyProperty, matchAnyProperty)) {
                        return false;
                    }
                }
                return true;
            } else {
                return comparator(actual, expected);
            }
            break;
        case 'function':
            return false;
        default:
            return comparator(actual, expected);
    }
}

// Used for easily differentiating between `null` and actual `object`
function getTypeForFilter(val) {
    return (val === null) ? 'null' : typeof val;
}

function isArrayLike(obj) {
  if (obj == null || isWindow(obj)) {
    return false;
  }

  // Support: iOS 8.2 (not reproducible in simulator)
  // "length" in obj used to prevent JIT error (gh-11508)
  var length = "length" in Object(obj) && obj.length;

  if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
    return true;
  }

  return isString(obj) || isArray(obj) || length === 0 ||
         typeof length === 'number' && length > 0 && (length - 1) in obj;
}

function isWindow(obj) {
    return obj && obj.window === obj;
}
/**
 * @description
 *
 * This object provides a utility for producing rich Error messages within
 * Angular. It can be called as follows:
 *
 * var exampleMinErr = minErr('example');
 * throw exampleMinErr('one', 'This {0} is {1}', foo, bar);
 *
 * The above creates an instance of minErr in the example namespace. The
 * resulting error will have a namespaced error code of example.one.  The
 * resulting error will replace {0} with the value of foo, and {1} with the
 * value of bar. The object is not restricted in the number of arguments it can
 * take.
 *
 * If fewer arguments are specified than necessary for interpolation, the extra
 * interpolation markers will be preserved in the final string.
 *
 * Since data will be parsed statically during a build step, some restrictions
 * are applied with respect to how minErr instances are created and called.
 * Instances should have names of the form namespaceMinErr for a minErr created
 * using minErr('namespace') . Error codes, namespaces and template strings
 * should all be static strings, not variables or general expressions.
 *
 * @param {string} module The namespace to use for the new minErr instance.
 * @param {function} ErrorConstructor Custom error constructor to be instantiated when returning
 *   error from returned function, for cases when a particular type of error is useful.
 * @returns {function(code:string, template:string, ...templateArgs): Error} minErr instance
 */

function minErr(module, ErrorConstructor) {
    ErrorConstructor = ErrorConstructor || Error;
    return function() {
        var SKIP_INDEXES = 2;

        var templateArgs = arguments,
            code = templateArgs[0],
            message = '[' + (module ? module + ':' : '') + code + '] ',
            template = templateArgs[1],
            paramPrefix, i;

        message += template.replace(/\{\d+\}/g, function(match) {
            var index = +match.slice(1, -1),
                shiftedIndex = index + SKIP_INDEXES;

            if (shiftedIndex < templateArgs.length) {
                return toDebugString(templateArgs[shiftedIndex]);
            }

            return match;
        });

        message += '\nhttp://errors.angularjs.org/1.4.4/' +
            (module ? module + '/' : '') + code;

        for (i = SKIP_INDEXES, paramPrefix = '?'; i < templateArgs.length; i++, paramPrefix = '&') {
            message += paramPrefix + 'p' + (i - SKIP_INDEXES) + '=' +
                encodeURIComponent(toDebugString(templateArgs[i]));
        }

        return new ErrorConstructor(message);
    };
}

function serializeObject(obj) {
  var seen = [];

  return JSON.stringify(obj, function(key, val) {
    val = toJsonReplacer(key, val);
    if (isObject(val)) {

      if (seen.indexOf(val) >= 0) return '<<already seen>>';

      seen.push(val);
    }
    return val;
  });
}

function toDebugString(obj) {
  if (typeof obj === 'function') {
    return obj.toString().replace(/ \{[\s\S]*$/, '');
  } else if (typeof obj === 'undefined') {
    return 'undefined';
  } else if (typeof obj !== 'string') {
    return serializeObject(obj);
  }
  return obj;
}
function toJsonReplacer(key, value) {
  var val = value;

  if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
    val = undefined;
  } else if (isWindow(value)) {
    val = '$WINDOW';
  } else if (value &&  document === value) {
    val = '$DOCUMENT';
  } else if (isScope(value)) {
    val = '$SCOPE';
  }

  return val;
}
/**
 * Checks if `obj` is a window object.
 *
 * @private
 * @param {*} obj Object to check
 * @returns {boolean} True if `obj` is a window obj.
 */
function isWindow(obj) {
  return obj && obj.window === obj;
}


function isScope(obj) {
  return obj && obj.$evalAsync && obj.$watch;
}


function isFile(obj) {
  return toString.call(obj) === '[object File]';
}


function isFormData(obj) {
  return toString.call(obj) === '[object FormData]';
}


function isBlob(obj) {
  return toString.call(obj) === '[object Blob]';
}


function isBoolean(value) {
  return typeof value === 'boolean';
}


function isPromiseLike(obj) {
  return obj && isFunction(obj.then);
}


var TYPED_ARRAY_REGEXP = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/;
function isTypedArray(value) {
  return TYPED_ARRAY_REGEXP.test(toString.call(value));
}

function isString(value) {return typeof value === 'string';}

var trim = function(value) {
  return isString(value) ? value.trim() : value;
};
function isObject(value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object';
}
/**
 * @ngdoc function
 * @name angular.identity
 * @module ng
 * @kind function
 *
 * @description
 * A function that returns its first argument. This function is useful when writing code in the
 * functional style.
 *
   ```js
     function transformer(transformationFn, value) {
       return (transformationFn || angular.identity)(value);
     };
   ```
  * @param {*} value to be returned.
  * @returns {*} the value passed in.
 */
function identity($) {return $;}
identity.$inject = [];


function valueFn(value) {return function() {return value;};}

function hasCustomToString(obj) {
  return isFunction(obj.toString) && obj.toString !== Object.prototype.toString;
}


/**
 * @ngdoc function
 * @name angular.isUndefined
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is undefined.
 */
function isUndefined(value) {return typeof value === 'undefined';}


/**
 * @ngdoc function
 * @name angular.isDefined
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is defined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is defined.
 */
function isDefined(value) {return typeof value !== 'undefined';}


/**
 * @ngdoc function
 * @name angular.isObject
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
 * considered to be objects. Note that JavaScript arrays are objects.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Object` but not `null`.
 */
function isObject(value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object';
}


/**
 * Determine if a value is an object with a null prototype
 *
 * @returns {boolean} True if `value` is an `Object` with a null prototype
 */
function isBlankObject(value) {
  return value !== null && typeof value === 'object' && !getPrototypeOf(value);
}


/**
 * @ngdoc function
 * @name angular.isString
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `String`.
 */
function isString(value) {return typeof value === 'string';}


/**
 * @ngdoc function
 * @name angular.isNumber
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `Number`.
 *
 * This includes the "special" numbers `NaN`, `+Infinity` and `-Infinity`.
 *
 * If you wish to exclude these then you can use the native
 * [`isFinite'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite)
 * method.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Number`.
 */
function isNumber(value) {return typeof value === 'number';}


/**
 * @ngdoc function
 * @name angular.isDate
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a value is a date.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Date`.
 */
function isDate(value) {
  return toString.call(value) === '[object Date]';
}


/**
 * @ngdoc function
 * @name angular.isArray
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is an `Array`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Array`.
 */
var isArray = Array.isArray;

/**
 * @ngdoc function
 * @name angular.isFunction
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `Function`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Function`.
 */
function isFunction(value) {return typeof value === 'function';}


/**
 * Determines if a value is a regular expression object.
 *
 * @private
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `RegExp`.
 */
function isRegExp(value) {
  return toString.call(value) === '[object RegExp]';
}
var uppercase = function(string) {return isString(string) ? string.toUpperCase() : string;};
var lowercase = function(string) {return isString(string) ? string.toLowerCase() : string;};
var hasOwnProperty = Object.prototype.hasOwnProperty;
