(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
     !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  var browser = getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      log.debug = true; // set to false before publishing

      var dom = domIds(); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        var tl = gsap.timeline({
          defaults: {},
          onComplete: addRollover
        });
        tl.from('#img_1', 3, {
          scale: 1.05,
          force3D: false
        }).staggerFrom(['#txt_1', '#txt_2'], 0.9, {
          y: 20,
          autoAlpha: 0,
          ease: Cubic.easeOut
        }, 0.3, '-=2.5').staggerTo(['#txt_1', '#txt_2'], 0.9, {
          y: -20,
          autoAlpha: 0,
          ease: Cubic.easeOut
        }, 0.2).from(['#img_2,#txt_6'], 2, {
          scale: 1.05,
          force3D: false,
          autoAlpha: 0
        }, '-=0.1').from(['#txt_3', '#mancha_1'], 0.1, {
          autoAlpha: 0
        }).from(['#txt_4', '#mancha_2'], 0.1, {
          autoAlpha: 0
        }, '+=0.7').from(['#txt_5', '#mancha_3'], 0.1, {
          autoAlpha: 0
        }, '+=0.7').to(['#txt_3,#txt_4,#txt_5,#mancha_1,#mancha_2,#mancha_3,#txt_6'], 0.4, {
          autoAlpha: 0
        }, '+=2').from('#txt_ef', 0.9, {
          y: 20,
          autoAlpha: 0,
          ease: Cubic.easeOut
        }).to("#cta_container", 0.1, {
          autoAlpha: 1,
          ease: Cubic.easeOut
        }, '+=0.5');
        dom.ad_content.classList.remove('invisible');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          gsap.to("#cta", 0.25, {
            autoAlpha: 0
          });
          gsap.to("#cta_over", 0.25, {
            autoAlpha: 1
          }); // Hover enter code goes here. Please remove this comment.
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          gsap.to("#cta_over", 0.25, {
            autoAlpha: 0
          });
          gsap.to("#cta", 0.25, {
            autoAlpha: 1
          }); // Hover out code goes here. Please remove this comment.
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      } ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////


      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    window.requestAnimationFrame(Banner.init);
  };

}());
