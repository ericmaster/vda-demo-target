// CSV export for invoices (issue #1).
const esc = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(rows, columns = Object.keys(rows[0] || {})) {
  const head = columns.map(esc).join(',');
  const body = rows.map((r) => columns.map((c) => esc(r[c])).join(','));
  return [head, ...body].join('\n') + '\n';
}

export function invoicesCsv(invoices) {
  return toCsv(invoices.map((i) => ({ id: i.id, customer: i.customer, total: i.total.toFixed(2), issued: i.issued })), ['id', 'customer', 'total', 'issued']);
}
