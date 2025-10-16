import {JSDOM} from 'jsdom';
import QUnit from 'qunit';
import { parseAttributes } from '../src/parseAttributes';

const document = new JSDOM().window.document;

QUnit.module('parseAttributes');

QUnit.test('simple', function(assert) {
  const el = document.createElement('el');

  el.setAttribute('foo', 1);

  assert.deepEqual(parseAttributes(el), { foo: '1' });
});

QUnit.test('empty', function(assert) {
  const el = document.createElement('el');

  assert.deepEqual(parseAttributes(el), {});
});

QUnit.test('parses qualityRanking as integer', function(assert) {
  const el = document.createElement('Representation');

  el.setAttribute('qualityRanking', '5');

  assert.deepEqual(parseAttributes(el), { qualityranking: 5 });
});

QUnit.test('parses multiple attributes including qualityRanking', function(assert) {
  const el = document.createElement('Representation');

  el.setAttribute('id', 'test-id');
  el.setAttribute('bandwidth', '1000000');
  el.setAttribute('qualityRanking', '10');
  el.setAttribute('width', '1920');
  el.setAttribute('height', '1080');

  assert.deepEqual(parseAttributes(el), {
    id: 'test-id',
    bandwidth: 1000000,
    qualityranking: 10,
    width: 1920,
    height: 1080
  });
});
