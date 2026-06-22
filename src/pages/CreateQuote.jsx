import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Smartphone, CreditCard, Calculator, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'

const steps = [
  { n: 1, label: 'Verify Mobile', icon: Smartphone },
  { n: 2, label: 'Civil ID', icon: CreditCard },
  { n: 3, label: 'Loan Details', icon: Calculator },
]

export default function CreateQuote() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [idScanned, setIdScanned] = useState(false)
  const [loading, setLoading] = useState(false)

  const withDelay = (fn, ms = 1000) => {
    setLoading(true)
    setTimeout(() => { fn(); setLoading(false) }, ms)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Create Quote</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Generate a Credit Life insurance quote</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-1">
        {steps.map(({ n, label, icon: Icon }, i) => (
          <div key={n} className="flex items-center gap-1">
            <button
              onClick={() => n < step && setStep(n)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
                step === n ? 'bg-primary text-primary-foreground' :
                step > n ? 'bg-muted text-foreground' :
                'text-muted-foreground'
              }`}
            >
              {step > n ? <Check size={12} /> : <Icon size={12} />}
              {label}
            </button>
            {i < 2 && <div className={`w-8 h-px ${step > n ? 'bg-primary/50' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="p-5">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-[14px] font-medium mb-1">Verify Mobile Number</h2>
                <p className="text-[12px] text-muted-foreground">Send OTP to customer's mobile</p>
              </div>

              <div className="flex gap-2">
                <Input placeholder="+968 XXXX XXXX" className="h-9 text-[13px] flex-1" />
                <Button
                  size="sm"
                  onClick={() => withDelay(() => setOtpSent(true))}
                  disabled={otpSent || loading}
                  className="h-9 text-[12px]"
                >
                  {loading && !otpSent ? <Loader2 size={13} className="animate-spin mr-1.5" /> : null}
                  {otpSent ? 'Sent' : 'Send OTP'}
                </Button>
              </div>

              {otpSent && !otpVerified && (
                <div className="flex gap-2">
                  <Input placeholder="Enter 6-digit OTP" maxLength={6} className="h-9 text-[13px] tracking-widest flex-1 font-mono" />
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => withDelay(() => setOtpVerified(true), 800)}
                    disabled={loading}
                    className="h-9 text-[12px]"
                  >
                    {loading ? <Loader2 size={13} className="animate-spin mr-1.5" /> : null}
                    Verify
                  </Button>
                </div>
              )}

              {otpVerified && (
                <>
                  <div className="flex items-center gap-2 text-[13px] text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
                    <Check size={14} /> Mobile verified
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => setStep(2)} className="h-8 text-[12px]">Continue</Button>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-[14px] font-medium mb-1">Scan Civil ID</h2>
                <p className="text-[12px] text-muted-foreground">Details auto-populate from the ID card</p>
              </div>

              {!idScanned ? (
                <div className="border border-dashed border-border rounded-lg p-8 text-center">
                  <CreditCard size={28} className="mx-auto mb-2 text-muted-foreground/40" />
                  <p className="text-[13px] text-muted-foreground mb-3">Place Civil ID in front of scanner</p>
                  <Button size="sm" onClick={() => withDelay(() => setIdScanned(true), 1500)} disabled={loading} className="h-8 text-[12px]">
                    {loading ? <Loader2 size={13} className="animate-spin mr-1.5" /> : <CreditCard size={13} className="mr-1.5" />}
                    {loading ? 'Scanning...' : 'Scan'}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-[13px] text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
                    <Check size={14} /> Civil ID scanned — details populated
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['Full Name', 'Fatima Al-Rashidi'],
                      ['Civil ID', '12345678'],
                      ['Date of Birth', '1988-03-15'],
                      ['Gender', 'Female'],
                    ].map(([label, val]) => (
                      <div key={label} className="space-y-1">
                        <label className="text-[12px] text-muted-foreground">{label}</label>
                        <Input value={val} readOnly className="h-9 text-[13px] bg-muted border-none" />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" onClick={() => setStep(3)} className="h-8 text-[12px]">Continue</Button>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-[14px] font-medium mb-1">Loan Details</h2>
                <p className="text-[12px] text-muted-foreground">Enter loan information to calculate premium</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[12px] text-muted-foreground">Loan Amount (OMR)</label>
                  <Input type="number" placeholder="50000" className="h-9 text-[13px]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] text-muted-foreground">Tenure (months)</label>
                  <Input type="number" placeholder="240" className="h-9 text-[13px]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] text-muted-foreground">Deferment (months)</label>
                  <Input type="number" placeholder="0" className="h-9 text-[13px]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] text-muted-foreground">Beneficiary</label>
                  <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-[13px] text-foreground">
                    <option value="">Select</option>
                    <option>National Bank</option>
                    <option>Commercial Bank</option>
                    <option>Investment Bank</option>
                    <option>Housing Bank</option>
                  </select>
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-[12px] text-muted-foreground">Governorate</label>
                  <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-[13px] text-foreground">
                    <option value="">Select</option>
                    <option>Capital Region</option>
                    <option>Northern Region</option>
                    <option>Southern Region</option>
                    <option>Eastern Region</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button size="sm" onClick={() => withDelay(() => navigate('/quotes/result'), 1200)} disabled={loading} className="h-8 text-[12px]">
                  {loading ? <Loader2 size={13} className="animate-spin mr-1.5" /> : <Calculator size={13} className="mr-1.5" />}
                  {loading ? 'Calculating...' : 'Generate Premium'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
