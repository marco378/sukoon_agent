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
          <img src="/logo.png" alt="Sukoon Insurance" className="h-14 mb-3" />
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
