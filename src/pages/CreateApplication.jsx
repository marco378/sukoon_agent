import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Landmark, Briefcase, HeartPulse, FileCheck, ArrowRight, ArrowLeft, Send, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'

const tabs = [
  { id: 'customer', label: 'Customer', icon: User },
  { id: 'loan', label: 'Loan', icon: Landmark },
  { id: 'employment', label: 'Employment', icon: Briefcase },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'declarations', label: 'Declarations', icon: FileCheck },
]

export default function CreateApplication() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('customer')
  const [healthLinkSent, setHealthLinkSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const idx = tabs.findIndex(t => t.id === activeTab)
  const goNext = () => idx < tabs.length - 1 && setActiveTab(tabs[idx + 1].id)
  const goPrev = () => idx > 0 && setActiveTab(tabs[idx - 1].id)

  const selectClass = "h-9 w-full rounded-md border border-input bg-background px-3 text-[13px] text-foreground"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Create Application</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Complete the proposal form</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0.5 bg-muted rounded-lg p-0.5 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
              activeTab === id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="p-5">
          {activeTab === 'customer' && (
            <div className="space-y-4">
              <div className="text-[12px] text-blue-600 bg-blue-50 border border-blue-200 rounded-md px-3 py-2">
                Basic info retrieved from the quote.
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Full Name', 'Fatima Al-Rashidi', true],
                  ['Civil ID', '12345678', true],
                  ['Date of Birth', '1988-03-15', true],
                  ['Gender', 'Female', true],
                  ['Email', '', false, 'customer@email.com'],
                  ['Mobile', '+968 9123 4567', true],
                ].map(([label, val, ro, ph]) => (
                  <div key={label} className="space-y-1">
                    <label className="text-[12px] text-muted-foreground">{label}</label>
                    <Input
                      defaultValue={val}
                      readOnly={ro}
                      placeholder={ph}
                      className={`h-9 text-[13px] ${ro ? 'bg-muted border-none' : ''}`}
                    />
                  </div>
                ))}
                <div className="space-y-1">
                  <label className="text-[12px] text-muted-foreground">Nationality</label>
                  <select className={selectClass}><option>National</option><option>Expatriate</option></select>
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] text-muted-foreground">Marital Status</label>
                  <select className={selectClass}><option value="">Select</option><option>Single</option><option>Married</option></select>
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[12px] text-muted-foreground">Address</label>
                  <Input placeholder="Full residential address" className="h-9 text-[13px]" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loan' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['Loan Type'],
                  ['Account No.'],
                  ['Loan Amount', '50,000.000', true],
                  ['Tenure', '240 months', true],
                  ['Interest Rate (%)'],
                  ['Monthly Instalment'],
                  ['Beneficiary', 'National Bank', true],
                  ['Deferment', '0 months', true],
                ].map(([label, val, ro]) => (
                  <div key={label} className="space-y-1">
                    <label className="text-[12px] text-muted-foreground">{label}</label>
                    <Input
                      defaultValue={val || ''}
                      readOnly={ro}
                      placeholder={ro ? '' : `Enter ${label.toLowerCase()}`}
                      className={`h-9 text-[13px] ${ro ? 'bg-muted border-none' : ''}`}
                    />
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-md px-4 py-3">
                <span className="text-[13px] font-medium">Total Exposure</span>
                <span className="text-[15px] font-semibold tabular-nums text-primary">50,000.000 OMR</span>
              </div>
            </div>
          )}

          {activeTab === 'employment' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[12px] text-muted-foreground">Status</label>
                <select className={selectClass}><option value="">Select</option><option>Employed</option><option>Self-Employed</option><option>Government</option><option>Retired</option></select>
              </div>
              <div className="space-y-1">
                <label className="text-[12px] text-muted-foreground">Employer</label>
                <Input placeholder="Enter employer name" className="h-9 text-[13px]" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] text-muted-foreground">Occupation</label>
                <select className={selectClass}><option value="">Select</option><option>Manager</option><option>Engineer</option><option>Doctor</option><option>Teacher</option><option>Other</option></select>
              </div>
              <div className="space-y-1">
                <label className="text-[12px] text-muted-foreground">Monthly Income (OMR)</label>
                <Input type="number" placeholder="1500" className="h-9 text-[13px]" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] text-muted-foreground">Years of Service</label>
                <Input type="number" placeholder="5" className="h-9 text-[13px]" />
              </div>
              <div className="space-y-1">
                <label className="text-[12px] text-muted-foreground">Work Phone</label>
                <Input placeholder="+968 XXXX XXXX" className="h-9 text-[13px]" />
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-md px-4 py-3">
                <div>
                  <div className="text-[13px] font-medium">Health Questionnaire</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Send link for customer to fill on their device</div>
                </div>
                {!healthLinkSent ? (
                  <Button size="sm" onClick={() => setHealthLinkSent(true)} className="h-7 text-[11px] gap-1">
                    <Send size={11} /> Send Link
                  </Button>
                ) : (
                  <span className="text-[12px] text-emerald-600 flex items-center gap-1"><Check size={13} /> Sent</span>
                )}
              </div>

              <div className="space-y-0">
                {[
                  'Heart disease or condition?',
                  'Diabetes or high blood sugar?',
                  'High blood pressure?',
                  'Cancer diagnosis?',
                  'Respiratory conditions?',
                  'Surgery in past 5 years?',
                  'Currently on medication?',
                  'Smoke or use tobacco?',
                  'Regular alcohol consumption?',
                  'Previously declined for insurance?',
                ].map((q, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[11px] text-muted-foreground tabular-nums w-5">{i + 1}.</span>
                      <span className="text-[13px]">{q}</span>
                    </div>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-1 text-[12px] text-muted-foreground cursor-pointer">
                        <input type="radio" name={`q${i}`} className="accent-primary" /> Yes
                      </label>
                      <label className="flex items-center gap-1 text-[12px] text-muted-foreground cursor-pointer">
                        <input type="radio" name={`q${i}`} defaultChecked className="accent-primary" /> No
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'declarations' && (
            <div className="space-y-4">
              {[
                'All statements are true and complete.',
                'Misrepresentation may void the policy.',
                'I authorize information collection for assessment.',
                'I consent to personal data processing.',
                'Coverage is subject to policy terms.',
              ].map((t, i) => (
                <label key={i} className="flex items-start gap-2.5 cursor-pointer group">
                  <input type="checkbox" className="accent-primary mt-0.5" />
                  <span className="text-[13px] text-muted-foreground group-hover:text-foreground transition-colors">{t}</span>
                </label>
              ))}

              <Separator />

              <div>
                <div className="text-[13px] font-medium mb-2">Digital Signature</div>
                <div className="border border-dashed border-border rounded-lg p-6 text-center">
                  <p className="text-[12px] text-muted-foreground">Click to sign or upload scanned signature</p>
                </div>
              </div>

              <div>
                <div className="text-[13px] font-medium mb-2">Supporting Documents</div>
                <div className="border border-dashed border-border rounded-lg p-6 text-center">
                  <p className="text-[12px] text-muted-foreground">Drag & drop or click to upload — PDF, JPG, PNG</p>
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <Separator className="mt-5" />
          <div className="flex justify-between pt-4">
            <Button variant="secondary" size="sm" onClick={goPrev} disabled={idx === 0} className="h-8 text-[12px] gap-1">
              <ArrowLeft size={13} /> Previous
            </Button>
            {idx < tabs.length - 1 ? (
              <Button size="sm" onClick={goNext} className="h-8 text-[12px] gap-1">
                Next <ArrowRight size={13} />
              </Button>
            ) : (
              <Button size="sm" onClick={() => { setSubmitting(true); setTimeout(() => navigate('/proposals/PRP-2024-0156'), 1500) }} disabled={submitting} className="h-8 text-[12px] gap-1 bg-emerald-600 hover:bg-emerald-700">
                {submitting ? <Loader2 size={13} className="animate-spin mr-1" /> : <FileCheck size={13} />}
                {submitting ? 'Submitting...' : 'Submit Proposal'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
