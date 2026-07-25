/**
 * Real payment account details shown to customers before they submit a proof.
 * Hardcoded for now — no admin UI to edit these yet (Facturación etc. is deliberately
 * out of scope for this pass, see pending_bcv_rate_facturacion memory for the
 * unrelated but similarly-deferred BCV item).
 */
export const PAGO_MOVIL_INFO = {
  cedula: '19736656',
  telefono: '0414-1383491',
  bancos: ['Banco de Venezuela', 'Banesco'],
}
