/*global describe, it */
"use strict";
var expect = require('chai').expect,
    should = require('chai').should();


describe('Testgroup', function () {

    it('test Array.isArray', function () {
        Array.isArray([]).should.be.true;
    });

    it('test Object.defineProperty', function () {
        var obj = {};
        Object.defineProperty(obj, 'a', {value: 10});
        expect(obj.a).to.be.eql(10);
    });

});