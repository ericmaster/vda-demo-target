import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCsv, invoicesCsv } from '../src/csv.js';
import { invoices } from '../src/invoices.js';

test('header and rows', () => {
  assert.equal(toCsv([{ a: 1, b: 2 }]), 'a,b\n1,2\n');
});
test('escapes commas and quotes', () => {
  assert.equal(toCsv([{ a: 'x,y', b: 'say "hi"' }]), 'a,b\n"x,y","say ""hi"""\n');
});
test('empty input gives empty header', () => {
  assert.equal(toCsv([]), '\n');
});
test('invoice export keeps the offset and two decimals', () => {
  const csv = invoicesCsv(invoices).split('\n');
  assert.equal(csv[0], 'id,customer,total,issued');
  assert.equal(csv[1], 'INV-1,Acme,120.50,2026-10-01T10:00:00-05:00');
  assert.equal(csv[2], 'INV-2,Globex,80.00,2026-10-15T09:30:00-05:00');
});
