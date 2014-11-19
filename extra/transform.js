"use strict";

/*
 * Returns the right transform-property for the current environment.
 *
 * `transform`, `-webkit-transform`, `-moz-transform`, `-ms-transform`, `-o-transform` or `undefined` when not supported
 */

module.exports = function (window) {

    if (!window._ITSAmodules) {
        Object.defineProperty(window, '_ITSAmodules', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: {} // `writable` is false means we cannot chance the value-reference, but we can change {} its members
        });
    }

    if (window._ITSAmodules.Transform) {
        return window._ITSAmodules.Transform; // Transform was already created
    }

    var DOCUMENT = window.document,
        containerNode = DOCUMENT.createElement('div'),
        node1 = DOCUMENT.createElement('div'),
        node2 = DOCUMENT.createElement('div'),
        node3 = DOCUMENT.createElement('div'),
        node4 = DOCUMENT.createElement('div'),
        node5 = DOCUMENT.createElement('div'),
        TRANSFORM = 'transform',
        STYLE = 'style',
        TR = TRANSFORM + ': translateX(100px); display: block;',
        containerleft, transform;

    containerNode.setAttribute(STYLE, 'position: absolute; left: -9999px; top: -9999px; visiblilty: hidden;');
    node1.setAttribute(STYLE, TR);
    node2.setAttribute(STYLE, '-webkit-'+TR);
    node3.setAttribute(STYLE, '-moz-'+TR);
    node4.setAttribute(STYLE, '-ms-'+TR);
    node5.setAttribute(STYLE, '-o-'+TR);

    containerNode.appendChild(node1);
    containerNode.appendChild(node2);
    containerNode.appendChild(node3);
    containerNode.appendChild(node4);
    containerNode.appendChild(node5);

    DOCUMENT.body.appendChild(containerNode);
    containerleft = containerNode.getBoundingClientRect().left;

    if (node1.getBoundingClientRect().left!==containerleft) {
        transform = TRANSFORM;
    }
    else if (node2.getBoundingClientRect().left!==containerleft) {
        transform = '-webkit-'+TRANSFORM;
    }
    else if (node3.getBoundingClientRect().left!==containerleft) {
        transform = '-moz-'+TRANSFORM;
    }
    else if (node4.getBoundingClientRect().left!==containerleft) {
        transform = '-ms-'+TRANSFORM;
    }
    else if (node5.getBoundingClientRect().left!==containerleft) {
        transform = '-o-'+TRANSFORM;
    }

    window._ITSAmodules.Transform = transform;

    return transform;
};