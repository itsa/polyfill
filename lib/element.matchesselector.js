"use strict";

// based upon https://gist.github.com/jonathantneal/3062955
module.exports = function (window) {
    window.Element && (function(ElementPrototype) {
        ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
        ElementPrototype.mozMatchesSelector ||
        ElementPrototype.msMatchesSelector ||
        ElementPrototype.oMatchesSelector ||
        ElementPrototype.webkitMatchesSelector ||
        function (selector) {
            var node = this,
                nodes = (node.parentNode || window.document).querySelectorAll(selector),
                i = -1;
            while (nodes[++i] && (nodes[i] !== node));
            return !!nodes[i];
        };
    }(window.Element.prototype));
};