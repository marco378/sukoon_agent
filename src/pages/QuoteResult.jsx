import { Link } from 'react-router-dom'
import { Download, ArrowRight, Shield } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'

export default function QuoteResult() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Quote Generated</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Premium calculated successfully</p>
      </div>

      <Card className="border-border overflow-hidden">
        <div className="bg-primary/10 border-b border-primary/20 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield size={16} className="text-primary" />
            <div>
              <div className="text-[13px] font-medium">Credit Life Insurance</div>
              <div className="text-[11px] text-muted-foreground font-mono">QT-2024-0298</div>
            </div>
          </div>
          <span className="text-[11px] text-muted-foreground">22 Jun 2026</span>
        </div>

        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Customer', 'Fatima Al-Rashidi'],
              ['Civil ID', '12345678'],
              ['Date of Birth', '15 Mar 1988'],
              ['Age', '38 years'],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-[11px] text-muted-foreground">{k}</div>
                <div className="text-[13px] font-medium mt-0.5">{v}</div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3">
            {[
              ['Loan Amount', '50,000.000 OMR'],
              ['Tenure', '240 months'],
              ['Deferment', '0 months'],
              ['Beneficiary', 'National Bank'],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-[11px] text-muted-foreground">{k}</div>
                <div className="text-[13px] font-medium mt-0.5 tabular-nums">{v}</div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            {[
              ['Base Premium', '225.000'],
              ['Policy Fee', '10.000'],
              ['Tax', '10.000'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">{k}</span>
                <span className="tabular-nums">{v}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-baseline">
              <span className="text-[13px] font-medium">Total Premium</span>
              <span className="text-lg font-semibold tabular-nums text-primary">245.000 <span className="text-[12px] text-muted-foreground font-normal">OMR</span></span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button variant="secondary" size="sm" className="h-8 text-[12px] gap-1.5">
          <Download size={13} /> Download Quote
        </Button>
        <Link to="/applications/new" className={buttonVariants({ size: 'sm' }) + ' h-8 text-[12px] gap-1.5'}>
          Create Application <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}
