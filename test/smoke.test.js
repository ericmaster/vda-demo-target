import { test } from 'node:test';
import assert from 'node:assert/strict';
import { invoices } from '../src/invoices.js';
test('fixtures load', () => assert.equal(invoices.length, 2));
