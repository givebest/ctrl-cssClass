(function() {


  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  // Polyfill
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {

      var k;
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return -1;
      }

      var n = +fromIndex || 0;
      if (Math.abs(n) === Infinity) {
        n = 0;
      }

      if (n >= len) {
        return -1;
      }

      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      while (k < len) {
        if (k in o && o[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };

  }


  // Polyfill (trim @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
  if (!String.prototype.trim) {
    String.prototype.trim = function(){
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }

    var cl = ('classList' in document.createElement('a'));


    function ctrlClass(opts) {
        if (!opts.ele || !opts.c) return false;
        // console.log(opts.c)
        var c = null;
        typeof (opts.c) === 'string' ? 
        c = opts.c.trim().replace(/\s+/g, ' ').split(' ') :
        c = opts.c;  //修复不规范传参
        
        return opts.fun({
            ele: opts.ele,
            c: c
        });
        opts.ele = null;
    }   

    // 支持 classList
    if(cl){
        /**
         * hasClass
         * @param (element, 'c1 c2 c3 c4 c5')
         */
         function hasClass(ele, c) {
            return ctrlClass({
                ele: ele,
                c: c,
                fun: function(opts) {
                    return opts.c.some(function(v) {
                        return !!opts.ele.classList.contains(v);
                    });
                }
             });
         }

         /**
         * addClass
         * @param (element, 'c1 c2 c3 c4 c5')
         */
         function addClass(ele, c) {
            return ctrlClass({
                ele: ele,
                c: c,
                fun: function(opts) {
                    var ele = opts.ele,
                        c = opts.c;
                    c.forEach(function(v) {
                        if (!hasClass(ele, v)) {
                            ele.classList.add(v);
                        }
                    });
                }
            })
         }

         /**
          * removeClass
          * @param (element, 'c1 c2 c3')
         */
         function removeClass(ele, c) {
          ctrlClass({
            ele: ele,
            c: c,
            fun: function(opts) {
              var ele = opts.ele,
                  c = opts.c;
              c.forEach(function(v) {
                // TODO 是否有必要判断 hasClass
                // if (!hasClass(ele, v)) {
                  ele.classList.remove(v);
                // }
              });
            }
          });
         }


         /**
          * toggleClass
          * @param (element, 'c1 c2 c3')
         */
         function toggleClass(ele, c) {
          ctrlClass({
            ele: ele,
            c: c,
            fun: function(opts) {
              var ele = opts.ele,
                  c = opts.c;
              c.forEach(function(v) {
                ele.classList.toggle(v);
              })
            }
          })
         }




    }else{
        /**
         * hasClass
         * @param (element, 'c1 c2 c3 c4 c5')
         */
         function hasClass(ele, c) {
            return ctrlClass({
                ele: ele,
                c: c,
                fun: function(opts) {
                    var cln = opts.ele.className.split(' ');
                    var c = opts.c;
                    for (var i = 0; i < c.length; i++) {
                        if(cln.indexOf(c[i]) !== -1){
                            return true;
                        }
                    }
                    return false;
                }
             });
         }


         /**
          * addClass
          * @param (element, 'c1 c2 c3')
         */
         function addClass(ele, c) {
          ctrlClass({
            ele: ele,
            c: c,
            fun: function(opts) {
              var ele = opts.ele,
                  c = opts.c;
              for (var i = 0; i < c.length; i++) {
                if(!hasClass(ele, c[i])) {
                  ele.className = ele.className !== '' ? (ele.className + ' ' + c[i]) : c[i];
                }
              }  
            }
          });
         }


         /**
          * removeClass
          * @param (element, 'c1 c2 c3')
         */
         function removeClass(ele, c) {
          ctrlClass({
            ele: ele,
            c: c,
            fun: function(opts) {
              var ele = opts.ele,
                  c = opts.c,
                  cln = ele.className.split(' ');
              for (var i = 0; i < c.length; i++) {
                if (hasClass(ele, c[i])) {
                  cln.splice(cln.indexOf(c[i]), 1);
                }
              }
              ele.className = cln.join(' ');
            }
          });
         }

         /**
          * toggleClass
          * @param (element, 'c1 c2 c3')
         */
         function toggleClass(ele, c){
          ctrlClass({
            ele: ele,
            c: c,
            fun: function(opts) {
              var ele = opts.ele,
                  c = opts.c;
              for (var i = 0; i < c.length; i++) {
                !!hasClass(ele, c[i]) ? removeClass(ele, c[i]) : addClass(ele, c[i]);  
              }
            }
          });
         }
    }

/*    var ctrlCssClass = {
        hasClass: function(ele, c) {
          return hasClass(ele, c);
        },
        addClass: function(ele, c) {
          addClass(ele, c);
        },
        removeClass: function(ele, c){
          removeClass(ele, c);
        },
        toggleClass: function(ele, c){
          toggleClass(ele, c);
        }
    };
    window.ctrlCssClass = ctrlCssClass;*/

    function CtrlCssClass(){
      return {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass
      }
    }
    
    window.ctrlCssClass = window.ctrlCssClass || new CtrlCssClass();

    // (@see https://github.com/madrobby/zepto/blob/master/src/zepto.js)
    window.ccc === undefined && (window.ccc = ctrlCssClass);

    // AMD (@see https://github.com/jashkenas/underscore/blob/master/underscore.js)
    if (typeof define == 'function' && define.amd) {
      define('ctrl-cssClass-compatible', [], function() {
        return ctrlCssClass;
      });
    }

}());