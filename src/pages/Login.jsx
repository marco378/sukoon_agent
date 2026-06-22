import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Separator } from '@/components/ui/separator.jsx'

export default function Login({ onLogin }) {
  const [showPw, setShowPw] = useState(false)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3">
            <path d="M20 4c-4 0-7 2-9 5-1.5 2.5-1 5.5 1 7.5l8 8c2 2 2.5 5 1 7.5s-5 5-9 5" stroke="#6B21A8" strokeWidth="5" strokeLinecap="round" />
            <path d="M20 36c4 0 7-2 9-5 1.5-2.5 1-5.5-1-7.5l-8-8c-2-2-2.5-5-1-7.5s5-5 9-5" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div className="text-center">
            <h1 className="text-xl font-bold text-purple-800 tracking-tight uppercase">Sukoon</h1>
            <span className="text-[11px] font-semibold text-orange-600 tracking-widest">INSURANCE</span>
          </div>
          <p className="text-[13px] text-muted-foreground mt-2">Sign in to Agent Portal</p>
        </div>

        <Card className="border-border">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-foreground">User ID</label>
              <Input placeholder="Enter your user ID" className="h-9 text-[13px]" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-medium text-foreground">Password</label>
                <button className="text-[12px] text-primary hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="h-9 text-[13px] pr-9"
                />
                <button
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <Button
              onClick={(e) => { e.preventDefault(); onLogin() }}
              className="w-full h-9 text-[13px] font-medium"
            >
              Sign in
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-[12px] text-muted-foreground mt-4">
          Need access? Contact your administrator.
        </p>
      </div>
    </div>
  )
}
