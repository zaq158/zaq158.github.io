;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-xiaoyuhao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M276.572548 509.846964c0.429789-4.851495 2.498914-9.586332 6.221702-13.298887L708.320783 70.989821c8.40646-8.396227 22.008246-8.396227 30.393217 0 8.407484 8.396227 8.407484 21.998013 0 30.394241L328.215742 511.913019l410.498258 410.527934c8.407484 8.397251 8.407484 21.999037 0 30.394241-8.40646 8.397251-21.986757 8.397251-30.393217 0L282.753317 527.234983C277.995967 522.478655 275.940145 516.052293 276.572548 509.846964z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-dayuhao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M744.909096 509.846964c-0.429789-4.851495-2.498914-9.586332-6.221702-13.298887L313.160861 70.989821c-8.40646-8.396227-22.008246-8.396227-30.393217 0-8.40646 8.396227-8.40646 21.998013 0 30.394241l410.499281 410.528957-410.499281 410.527934c-8.40646 8.397251-8.40646 21.999037 0 30.394241 8.40646 8.397251 21.986757 8.397251 30.393217 0L738.728326 527.234983C743.4867 522.478655 745.541499 516.052293 744.909096 509.846964z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)