import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx'

const data = [
  { id: 'PRP-2024-0156', customer: 'Fatima Al-Rashidi', loan: '50,000.000', premium: '245.000', date: '22 Jun 2026', status: 'Under Review', medical: 'Pending' },
  { id: 'PRP-2024-0155', customer: 'Mohammed Al-Habsi', loan: '35,000.000', premium: '180.500', date: '21 Jun 2026', status: 'Approved', medical: 'Completed' },
  { id: 'PRP-2024-0154', customer: 'Aisha Al-Balushi', loan: '75,000.000', premium: '312.750', date: '20 Jun 2026', status: 'Medical Pending', medical: 'Sent' },
  { id: 'PRP-2024-0153', customer: 'Khalid Al-Siyabi', loan: '120,000.000', premium: '425.000', date: '19 Jun 2026', status: 'Approved', medical: 'Completed' },
  { id: 'PRP-2024-0152', customer: 'Noor Al-Lawati', loan: '25,000.000', premium: '198.250', date: '18 Jun 2026', status: 'Declined', medical: 'Completed' },
  { id: 'PRP-2024-0151', customer: 'Yusuf Al-Farsi', loan: '90,000.000', premium: '380.000', date: '17 Jun 2026', status: 'Policy Issued', medical: 'Completed' },
  { id: 'PRP-2024-0150', customer: 'Layla Al-Kindi', loan: '40,000.000', premium: '210.500', date: '16 Jun 2026', status: 'Payment Pending', medical: 'N/A' },
  { id: 'PRP-2024-0149', customer: 'Hassan Al-Riyami', loan: '65,000.000', premium: '290.000', date: '15 Jun 2026', status: 'Policy Issued', medical: 'Completed' },
]

const statusColor = {
  'Under Review': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Approved': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Medical Pending': 'text-blue-600 bg-blue-50 border-blue-200',
  'Declined': 'text-red-600 bg-red-50 border-red-200',
  'Policy Issued': 'text-primary bg-primary/10 border-primary/20',
  'Payment Pending': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
}

const filters = ['All', 'Under Review', 'Approved', 'Medical Pending', 'Payment Pending', 'Policy Issued', 'Declined']

export default function Proposals() {
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = data.filter(p =>
    (tab === 'All' || p.status === tab) &&
    (p.customer.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Proposals</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">Track and manage all proposals</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex gap-0.5 bg-muted rounded-lg p-0.5">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setTab(f)}
              className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors ${
                tab === f ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="h-8 w-52 pl-8 text-[12px] bg-muted border-none"
          />
        </div>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-[11px] h-9">ID</TableHead>
                <TableHead className="text-[11px] h-9">Customer</TableHead>
                <TableHead className="text-[11px] h-9 text-right">Loan</TableHead>
                <TableHead className="text-[11px] h-9 text-right">Premium</TableHead>
                <TableHead className="text-[11px] h-9">Date</TableHead>
                <TableHead className="text-[11px] h-9">Medical</TableHead>
                <TableHead className="text-[11px] h-9">Status</TableHead>
                <TableHead className="text-[11px] h-9 w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id} className="border-border group">
                  <TableCell className="text-[13px] font-mono text-primary py-2.5">{p.id}</TableCell>
                  <TableCell className="text-[13px] py-2.5">{p.customer}</TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums py-2.5 text-muted-foreground">{p.loan}</TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums py-2.5">{p.premium}</TableCell>
                  <TableCell className="text-[13px] text-muted-foreground py-2.5">{p.date}</TableCell>
                  <TableCell className="text-[12px] text-muted-foreground py-2.5">{p.medical}</TableCell>
                  <TableCell className="py-2.5">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColor[p.status]}`}>
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Link to={`/proposals/${p.id}`} className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={14} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-[13px] text-muted-foreground py-8">
                    No proposals found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
