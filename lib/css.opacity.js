// based upon https://gist.github.com/amannm/4965459

(function (global) {
"use strict";

    global.CSSStyleDeclaration && (function(CSSStyleDeclarationPrototype) {
        CSSStyleDeclarationPrototype.opacity || Object.defineProperty(CSSStyleDeclarationPrototype, 'opacity', {
            get: function() {
                return '' + (parseFloat(((this.filter).substring(48)).replace(')', '')) / 100);
            },
            set: function(value) {
                this.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + Math.round(100 * value) + ')';
            }
        });
    }(global.CSSStyleDeclaration.prototype));

}(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this));
