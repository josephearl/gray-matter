/*!
 * preliminaries <https://github.com/josephearl/preliminaries.git>
 *
 * Copyright (C) 2017 Joseph Earl.
 * Copyright (C) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');

describe('stringify JSON:', function() {
  var preliminaries;
  
  before(function() {
    preliminaries = require('..')(true);
  });

  after(function() {
    preliminaries.unregisterParser('json');
  });

  it('stringify json by default', function() {
    var data = {name: 'test-name'};
    var res = preliminaries.stringify('Name: {{name}}', data);
    res.should.equal([
      '---json',
      '{',
      '"name":"test-name"',
      '}',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('not stringify lang if custom delimiters are used', function() {
    var data = {name: 'test-name'};
    var res = preliminaries.stringify('Name: {{name}}', data, {delims: '---'});
    res.should.equal([
      '---',
      '{',
      '"name":"test-name"',
      '}',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('not stringify lang if stringifyLang is false', function() {
    var data = {name: 'test-name'};
    var res = preliminaries.stringify('Name: {{name}}', data, {stringifyLang: false});
    res.should.equal([
      '---',
      '{',
      '"name":"test-name"',
      '}',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('stringify lang if custom delimiters are used and stringifyLang is true', function() {
    var data = {name: 'test-name'};
    var res = preliminaries.stringify('Name: {{name}}', data, {delims: '~~~', stringifyLang: true});
    res.should.equal([
      '~~~json',
      '{',
      '"name":"test-name"',
      '}',
      '~~~',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should extract front matter, extend it, and convert it back to front matter', function() {
    var data = {name: 'test-name'};
    var res = preliminaries.stringify('Name: {{name}}', data, {lang: 'json'});
    res.should.equal([
      '---json',
      '{',
      '"name":"test-name"',
      '}',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should use custom delimiters', function() {
    var data = {name: 'test-name'};
    var res = preliminaries.stringify('Name: {{name}}', data, {delims: '~~~'});
    res.should.equal([
      '~~~',
      '{',
      '"name":"test-name"',
      '}',
      '~~~',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should stringify json with standard delimiters', function() {
    var data = {name: 'test-name'};
    var res = preliminaries.stringify('Name: {{name}}', data, {lang: 'json', delims: ['{', '}']});
    res.should.equal([
      '{',
      '"name":"test-name"',
      '}',
      'Name: {{name}}\n'
    ].join('\n'));
  });
});
