"use strict";

module.exports = function (window) {

    if (!window._ITSAmodules) {
        Object.defineProperty(window, '_ITSAmodules', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: {} // `writable` is false means we cannot chance the value-reference, but we can change {} its members
        });
    }

    if (window._ITSAmodules.TransitionEnd) {
        return window._ITSAmodules.TransitionEnd; // TransitionEnd was already created
    }

    var DOCUMENT_STYLE = window.document.documentElement.style,
        transitions = {},
        ransition = 'ransition',
        transition = 't'+ransition,
        end = 'end',
        transitionEnd, t;

    transitions[transition] = transition+end;
    transitions['WebkitT'+ransition] = 'webkitT'+ransition+'End';
    transitions['MozT'+ransition] = transition+end;
    transitions['OT'+ransition] = 'o'+transition+end;

    for (t in transitions) {
        if (typeof DOCUMENT_STYLE[t] !== 'undefined') {
            transitionEnd = transitions[t];
            break;
        }
    }

    window._ITSAmodules.TransitionEnd = transitionEnd;

    return transitionEnd;
};