/**
 * BATCH VERIFICATION — one entry per production batch.
 *
 * HOW TO ADD A NEW BATCH (client / developer):
 *   1. Put the two PDFs in  public/reports/  e.g.  public/reports/OH-W-2501-coa.pdf
 *                                                  public/reports/OH-W-2501-claims.pdf
 *   2. Copy one entry below, change the batch number, product, dates and the two file names.
 *   3. Deploy. Customers can now type that batch number on /verify.
 *
 * Tip: a QR code on the bottle can link straight to a batch:
 *   https://<your-domain>/verify?batch=OH-W-2501
 *
 * Batch numbers are matched without caring about upper/lower case, spaces or dashes,
 * so "oh w 2501" finds "OH-W-2501".
 */

export interface BatchRecord {
  /** Batch / lot number exactly as printed on the bottle */
  batch: string;
  product: 'womens-multi' | 'mens-multi';
  /** 'YYYY-MM' */
  mfgDate: string;
  /** 'YYYY-MM' */
  expDate: string;
  /** Certificate of Analysis PDF (path inside /public or full URL) */
  coaUrl: string;
  /** Claim / label-claim test report PDF */
  claimReportUrl: string;
  /** Name of the testing lab (optional, shown if filled) */
  testedBy?: string;
  /** Date the report was issued, 'YYYY-MM-DD' (optional) */
  reportDate?: string;
  /** true = example record for testing the page. Remove before launch. */
  demo?: boolean;
}

// TODO client: replace the two DEMO records with real batches + real PDFs.
export const batches: BatchRecord[] = [
  {
    batch: 'DEMO-W-001',
    product: 'womens-multi',
    mfgDate: '2026-01',
    expDate: '2028-01',
    coaUrl: '/reports/DEMO-W-001-coa.pdf',
    claimReportUrl: '/reports/DEMO-W-001-claims.pdf',
    demo: true,
  },
  {
    batch: 'DEMO-M-001',
    product: 'mens-multi',
    mfgDate: '2026-01',
    expDate: '2028-01',
    coaUrl: '/reports/DEMO-M-001-coa.pdf',
    claimReportUrl: '/reports/DEMO-M-001-claims.pdf',
    demo: true,
  },
];

const normalise = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, '');

export const findBatch = (input: string): BatchRecord | undefined => {
  const key = normalise(input);
  if (!key) return undefined;
  return batches.find((b) => normalise(b.batch) === key);
};

/** 'YYYY-MM' → 'Jan 2028' */
export const formatMonth = (ym: string): string => {
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return ym;
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/** true when the expiry month has fully passed */
export const isExpired = (ym: string): boolean => {
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return false;
  return new Date() >= new Date(y, m, 1); // first day of the month AFTER expiry
};
