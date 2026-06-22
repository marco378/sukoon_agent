import { Link } from 'react-router-dom'
import { FilePlus, FileText, Clock, CheckCircle, AlertCircle, ArrowUpRight, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button, buttonVariants } from '@/components/ui/button.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'
import { Separator } from '@/components/ui/separator.jsx'

const stats = [
  { label: 'Total Quotes', value: '147', change: '+12 this week', icon: FileText },
  { label: 'Active Proposals', value: '23', change: '5 pending review', icon: Clock },
  { label: 'Policies Issued', value: '89', change: '+3 this month', icon: CheckCircle },
  { label: 'Pending Decision', value: '12', change: '2 urgent', icon: AlertCircle },
]

const proposals = [
  { id: 'PRP-2024-0156', customer: 'Fatima Al-Rashidi', premium: '245.000', status: 'Under Review', variant: 'outline' },
  { id: 'PRP-2024-0155', customer: 'Mohammed Al-Habsi', premium: '180.500', status: 'Approved', variant: 'default' },
  { id: 'PRP-2024-0154', customer: 'Aisha Al-Balushi', premium: '312.750', status: 'Medical Pending', variant: 'secondary' },
  { id: 'PRP-2024-0153', customer: 'Khalid Al-Siyabi', premium: '425.000', status: 'Approved', variant: 'default' },
  { id: 'PRP-2024-0152', customer: 'Noor Al-Lawati', premium: '198.250', status: 'Declined', variant: 'destructive' },
]

const statusColor = {
  'Under Review': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Approved': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Medical Pending': 'text-blue-600 bg-blue-50 border-blue-200',
  'Declined': 'text-red-600 bg-red-50 border-red-200',
  'Policy Issued': 'text-primary bg-primary/10 border-primary/20',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">Welcome back, Ahmed.</p>
        </div>
        <Link to="/quotes/new" className={buttonVariants({ size: 'sm' }) + ' h-8 text-[13px] gap-1.5'}>
          <FilePlus size={14} />
          New Quote
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <Card key={label} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
                <Icon size={14} className="text-muted-foreground" />
              </div>
              <div className="text-2xl font-semibold tracking-tight">{value}</div>
              <p className="text-[12px] text-muted-foreground mt-1">{change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Recent proposals — 2 col span */}
        <Card className="col-span-2 border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[14px] font-medium">Recent Proposals</CardTitle>
              <Link to="/proposals" className="text-[12px] text-primary hover:underline flex items-center gap-0.5">
                View all <ArrowUpRight size={11} />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-[11px] h-8">ID</TableHead>
                  <TableHead className="text-[11px] h-8">Customer</TableHead>
                  <TableHead className="text-[11px] h-8 text-right">Premium</TableHead>
                  <TableHead className="text-[11px] h-8 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposals.map(p => (
                  <TableRow key={p.id} className="border-border">
                    <TableCell className="text-[13px] font-mono text-primary py-2.5">{p.id}</TableCell>
                    <TableCell className="text-[13px] py-2.5">{p.customer}</TableCell>
                    <TableCell className="text-[13px] text-right tabular-nums py-2.5">{p.premium}</TableCell>
                    <TableCell className="text-right py-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColor[p.status]}`}>
                        {p.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Activity panel */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <TrendingUp size={14} className="text-primary" />
                </div>
                <div>
                  <div className="text-[13px] font-medium">Commission</div>
                  <div className="text-[12px] text-muted-foreground">This month</div>
                </div>
              </div>
              <div className="text-xl font-semibold tabular-nums">1,245.500 <span className="text-[12px] text-muted-foreground font-normal">OMR</span></div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4 space-y-3">
              <div className="text-[13px] font-medium">Pending Actions</div>
              {[
                { text: '3 proposals need documents', urgent: true },
                { text: '5 renewals due in 30 days', urgent: false },
                { text: '2 medical reports awaited', urgent: false },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className={`size-1.5 rounded-full mt-1.5 shrink-0 ${item.urgent ? 'bg-yellow-500' : 'bg-muted-foreground/40'}`} />
                  <span className="text-[12px] text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
