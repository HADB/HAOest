/* ========================================================================
 * HAOest
 * http://hadb.github.io/HAOest
 * ========================================================================
 * Copyright 2014 HADB.
 * Licensed under MIT (https://github.com/HADB/HAOest/blob/master/LICENSE)
 * ========================================================================*/

(function (Global) {
    'use strict';

    var haoest = {
        version: 0.1
    };

    Global.HAOest = haoest;
}(this));

/* ========================================================================
 * HAOest: mobile.js
 * http://hadb.github.io/HAOest
 * ========================================================================
 * Copyright 2014 HADB.
 * Licensed under MIT (https://github.com/HADB/HAOest/blob/master/LICENSE)
 * ========================================================================*/

(function (HAOest) {
    'use strict';

    var mobile = {
        browser: {
            userAgent: navigator.userAgent,
            webkitVersion: (function () {
                var u = navigator.userAgent;
                var matchIndex = u.indexOf('AppleWebKit/');
                if (matchIndex > -1) {
                    var num = u.substring(matchIndex + 12, matchIndex + 18).replace(' ', '');
                    return parseFloat(num);
                }
                return '';
            }()),
            isQQBrowser: (function () {
                if (navigator.userAgent.indexOf('MQQBrowser') > -1) {
                    return true;
                }
                return false;
            }()),
            versions: (function () {
                var u = navigator.userAgent;
                //移动终端浏览器版本信息
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    weixin: u.indexOf('MicroMessenger') > -1
                };
            }()),
            language: (navigator.browserLanguage || navigator.language).toLowerCase(),
            screen: (function () {
                var width = document.documentElement.clientWidth || document.body.clientWidth;
                var height = document.documentElement.clientHeight || document.body.clientHeight;
                var ratio = width / height;
                return { width: width, height: height, ratio: ratio };
            }())
        }
    };

    HAOest.mobile = mobile;
}(HAOest));

/* ========================================================================
 * HAOest: fullscreen.js
 * http://hadb.github.io/HAOest
 * ========================================================================
 * Copyright 2014 HADB.
 * Licensed under MIT (https://github.com/HADB/HAOest/blob/master/LICENSE)
 * ========================================================================
 * Reference https://github.com/sindresorhus/screenfull.js
 * MIT © Sindre Sorhus(http://sindresorhus.com/)
 * ========================================================================*/

(function (HAOest) {
    'use strict';

    var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

    var fn = (function () {
        var val;
        var valLength;

        var fnMap = [
            [
                'requestFullscreen',
                'exitFullscreen',
                'fullscreenElement',
                'fullscreenEnabled',
                'fullscreenchange',
                'fullscreenerror'
            ],
            // new WebKit
            [
                'webkitRequestFullscreen',
                'webkitExitFullscreen',
                'webkitFullscreenElement',
                'webkitFullscreenEnabled',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            // old WebKit (Safari 5.1)
            [
                'webkitRequestFullScreen',
                'webkitCancelFullScreen',
                'webkitCurrentFullScreenElement',
                'webkitCancelFullScreen',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            [
                'mozRequestFullScreen',
                'mozCancelFullScreen',
                'mozFullScreenElement',
                'mozFullScreenEnabled',
                'mozfullscreenchange',
                'mozfullscreenerror'
            ],
            [
                'msRequestFullscreen',
                'msExitFullscreen',
                'msFullscreenElement',
                'msFullscreenEnabled',
                'MSFullscreenChange',
                'MSFullscreenError'
            ]
        ];

        var i = 0;
        var l = fnMap.length;
        var ret = {};

        for (; i < l; i++) {
            val = fnMap[i];
            if (val && val[1] in document) {
                for (i = 0, valLength = val.length; i < valLength; i++) {
                    ret[fnMap[0][i]] = val[i];
                }
                return ret;
            }
        }

        return false;
    })();

    var fullscreen = {
        request: function (elem) {
            var request = fn.requestFullscreen;

            elem = elem || document.documentElement;

            // Work around Safari 5.1 bug: reports support for
            // keyboard in fullscreen even though it doesn't.
            // Browser sniffing, since the alternative with
            // setTimeout is even worse.
            if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
                elem[request]();
            } else {
                elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
            }
        },
        exit: function () {
            document[fn.exitFullscreen]();
        },
        toggle: function (elem) {
            if (this.isFullscreen) {
                this.exit();
            } else {
                this.request(elem);
            }
        },
        onchange: function () { },
        onerror: function () { },
        raw: fn
    };

    if (!fn) {
        window.fullscreen = false;
        return;
    }

    Object.defineProperties(fullscreen, {
        isFullscreen: {
            get: function () {
                return !!document[fn.fullscreenElement];
            }
        },
        element: {
            enumerable: true,
            get: function () {
                return document[fn.fullscreenElement];
            }
        },
        enabled: {
            enumerable: true,
            get: function () {
                // Coerce to boolean in case of old WebKit
                return !!document[fn.fullscreenEnabled];
            }
        }
    });

    document.addEventListener(fn.fullscreenchange, function (e) {
        fullscreen.onchange.call(fullscreen, e);
    });

    document.addEventListener(fn.fullscreenerror, function (e) {
        fullscreen.onerror.call(fullscreen, e);
    });

    HAOest.fullscreen = fullscreen;
}(HAOest));
