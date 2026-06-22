import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Send, FileText, Check, Clock, Percent, Loader2, Download, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'

const timeline = [
  { label: 'Quote', done: true },
  { label: 'Application', done: true },
  { label: 'Medical', active: true },
  { label: 'Underwriting' },
  { label: 'Decision' },
  { label: 'Payment' },
  { label: 'Issued' },
]

export default function ProposalDetail() {
  const { id } = useParams()
  const [tab, setTab] = useState('overview')
  const [mtrfSent, setMtrfSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [discount, setDiscount] = useState('')

  const tabs = ['overview', 'medical', 'documents', 'underwriting', 'payment']

  return (
    <div className="space-y-5">
      <Link to="/proposals" className="inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={13} /> Proposals
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight font-mono">{id}</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Credit Life Insurance Proposal</p>
        </div>
        <span className="text-[11px] font-medium text-yellow-600 bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full">Under Review</span>
      </div>

      {/* Timeline */}
      <Card className="border-border">
        <CardContent className="py-4 px-5">
          <div className="flex items-center justify-between">
            {timeline.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`size-6 rounded-full flex items-center justify-center text-[10px] font-medium ${
                    s.done ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                    s.active ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {s.done ? <Check size={11} /> : i + 1}
                  </div>
                  <span className={`text-[10px] ${s.active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{s.label}</span>
                </div>
                {i < timeline.length - 1 && <div className={`w-10 h-px mx-1 -mt-4 ${s.done ? 'bg-emerald-300' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-0.5 bg-muted rounded-lg p-0.5 w-fit">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md text-[12px] font-medium capitalize transition-colors ${
              tab === t ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="p-5">
          {tab === 'overview' && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-3">Customer</h3>
                <div className="space-y-2.5">
                  {[['Name', 'Fatima Al-Rashidi'], ['Civil ID', '12345678'], ['DOB', '15 Mar 1988'], ['Gender', 'Female'], ['Mobile', '+968 9123 4567'], ['Email', 'fatima.r@email.com']].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[13px] py-1 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider mb-3">Loan & Premium</h3>
                <div className="space-y-2.5">
                  {[['Loan Amount', '50,000.000 OMR'], ['Tenure', '240 months'], ['Beneficiary', 'National Bank'], ['Total Premium', '245.000 OMR'], ['Quote Ref', 'QT-2024-0298'], ['Created', '22 Jun 2026']].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[13px] py-1 border-b border-border/50 last:border-0">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium tabular-nums">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'medical' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-medium">Medical Test Requisition</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Tests auto-selected per medical grid</p>
                </div>
                {!mtrfSent ? (
                  <Button size="sm" onClick={() => { setSending(true); setTimeout(() => { setMtrfSent(true); setSending(false) }, 1500) }} disabled={sending} className="h-7 text-[11px] gap-1">
                    {sending ? <Loader2 size={11} className="animate-spin" /> : <Send size={11} />}
                    {sending ? 'Sending...' : 'Send MTRF'}
                  </Button>
                ) : (
                  <span className="text-[11px] text-emerald-600 flex items-center gap-1"><Check size={12} /> MTRF Sent</span>
                )}
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-[11px] h-8">Test</TableHead>
                    <TableHead className="text-[11px] h-8">Required</TableHead>
                    <TableHead className="text-[11px] h-8">Status</TableHead>
                    <TableHead className="text-[11px] h-8">Charges</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ['Complete Blood Count', 'Yes', 'Pending', 'Client'],
                    ['Fasting Blood Sugar', 'Yes', 'Pending', 'Client'],
                    ['Lipid Profile', 'Yes', 'Pending', 'Client'],
                    ['ECG', 'Yes', 'Pending', 'Client'],
                    ['Urine Analysis', 'Yes', 'Pending', 'Client'],
                    ['Chest X-Ray', 'Conditional', 'N/A', '--'],
                  ].map(([test, req, status, charges]) => (
                    <TableRow key={test} className="border-border">
                      <TableCell className="text-[13px] py-2">{test}</TableCell>
                      <TableCell className="text-[12px] text-muted-foreground py-2">{req}</TableCell>
                      <TableCell className="py-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          status === 'Pending' ? 'text-yellow-600 bg-yellow-50' : 'text-muted-foreground bg-muted'
                        }`}>{status}</span>
                      </TableCell>
                      <TableCell className="text-[12px] text-muted-foreground py-2">{charges}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex gap-4">
                {['WhatsApp', 'Email', 'SMS'].map(ch => (
                  <button key={ch} className="text-[11px] text-primary hover:underline flex items-center gap-1">
                    <Send size={10} /> Send via {ch}
                  </button>
                ))}
              </div>

              {mtrfSent && (
                <div className="text-[12px] text-blue-600 bg-blue-50 border border-blue-200 rounded-md px-3 py-2 flex items-center gap-2">
                  <Clock size={13} /> Waiting for medical centre to upload results.
                </div>
              )}
            </div>
          )}

          {tab === 'documents' && (
            <div className="space-y-3">
              <h3 className="text-[14px] font-medium mb-1">Uploaded Documents</h3>
              {[
                { name: 'Civil ID Copy.pdf', size: '245 KB', status: 'Verified' },
                { name: 'Proposal Form (Signed).pdf', size: '1.2 MB', status: 'Verified' },
                { name: 'Salary Certificate.pdf', size: '380 KB', status: 'Pending' },
              ].map(doc => (
                <div key={doc.name} className="flex items-center justify-between p-3 rounded-md border border-border">
                  <div className="flex items-center gap-2.5">
                    <FileText size={15} className="text-muted-foreground" />
                    <div>
                      <div className="text-[13px]">{doc.name}</div>
                      <div className="text-[11px] text-muted-foreground">{doc.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      doc.status === 'Verified' ? 'text-emerald-600 bg-emerald-50' : 'text-yellow-600 bg-yellow-50'
                    }`}>{doc.status}</span>
                    <button className="text-muted-foreground hover:text-foreground"><Download size={13} /></button>
                  </div>
                </div>
              ))}
              <button className="text-[12px] text-primary hover:underline mt-2">+ Upload more</button>
            </div>
          )}

          {tab === 'underwriting' && (
            <div className="space-y-5">
              <div className="text-[12px] text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2">
                Proposal under review by underwriter.
              </div>

              <Separator />

              <div>
                <h3 className="text-[13px] font-medium flex items-center gap-1.5 mb-3">
                  <Percent size={13} /> Discount from Commission
                </h3>
                <p className="text-[12px] text-muted-foreground mb-3">Give customer a discount from your 10% commission.</p>
                <div className="flex items-end gap-4 max-w-sm">
                  <div className="flex-1 space-y-1">
                    <label className="text-[12px] text-muted-foreground">Discount %</label>
                    <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} max={10} placeholder="e.g. 3" className="h-9 text-[13px]" />
                  </div>
                  <div className="text-[12px] text-muted-foreground pb-2.5">
                    Remaining: <span className="text-foreground font-medium">{discount ? 10 - Number(discount) : 10}%</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-[13px] font-medium mb-2">Decision Letter</h3>
                <div className="rounded-md bg-muted p-6 text-center">
                  <Clock size={16} className="mx-auto mb-1.5 text-muted-foreground" />
                  <p className="text-[12px] text-muted-foreground">Will appear here once reviewed.</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'payment' && (
            <div className="space-y-5">
              <div className="rounded-md bg-muted p-6 text-center">
                <CreditCard size={20} className="mx-auto mb-2 text-muted-foreground/40" />
                <p className="text-[13px] text-muted-foreground">Awaiting underwriter decision</p>
                <p className="text-[11px] text-muted-foreground/60 mt-0.5">Payment link generated after approval. Auto-issued if paid via gateway.</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-[13px] font-medium mb-3">Policy Kit</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Policy Schedule', 'Welcome Letter', 'Tax Invoice', 'Payment Receipt', 'Stamped Proposal', 'Stamped Medical'].map(doc => (
                    <div key={doc} className="flex items-center gap-2 p-2.5 rounded-md border border-border opacity-40">
                      <FileText size={13} className="text-muted-foreground" />
                      <span className="text-[12px] text-muted-foreground">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" className="h-7 text-[11px]">Request Amendment</Button>
        <Button variant="secondary" size="sm" className="h-7 text-[11px]">Request Endorsement</Button>
        <Button variant="secondary" size="sm" className="h-7 text-[11px] text-red-600 hover:text-red-700">Request Cancellation</Button>
      </div>
    </div>
  )
}
