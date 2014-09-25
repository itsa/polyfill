/*global describe, it */
"use strict";
var expect = require('chai').expect,
    should = require('chai').should();


describe('Testgroup', function () {

    it('test Array.filter', function () {
        var a = [1,2,3,4],
            b = a.filter(function(item){
                return (item>1) && (item<4);
            });
        expect(b.length).to.be.eql(2);
        expect(b[0]).to.be.eql(2);
        expect(b[1]).to.be.eql(3);
    });

    it('test Array.forEach', function () {
        var a = [1,2,3,4],
            count = 0;
        a.forEach(function(item) {
            count += 10*item;
        });
        expect(count).to.be.eql(100);
    });

    it('test Array.indexOf', function () {
        var a = [10,20,30,40];
        expect(a.indexOf(30)).to.be.eql(2);
    });

    it('test Array.isArray', function () {
        Array.isArray([]).should.be.true;
    });

    it('test Array.some', function () {
        var a = [1,2,3,4],
            count = 0;
        a.some(function(item) {
            count += 10*item;
            return item===3;
        });
        expect(count).to.be.eql(60);
    });

    it('test Object.defineProperty', function () {
        var obj = {};
        Object.defineProperty(obj, 'a', {value: 10});
        expect(obj.a).to.be.eql(10);
    });

});