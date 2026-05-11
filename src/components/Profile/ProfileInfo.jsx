import React, { useEffect, useState } from 'react'
import {
  User,
  Mail,
  Lock,
  Clock,
  Package,
  CreditCard,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Loading from '../Loading'
import WindDownNotice from '../WindDownNotice'

export default function ProfileInfo({
  isAccountPage,
  credit,
  tier,
  currentUser,
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading className="h-16 w-16 text-indigo-400" color="green" />
      </div>
    )
  }

  const getPlanDetails = () => {
    switch (tier) {
      case 'free':
        return { name: 'Starter', color: 'bg-slate-500' }
      case 'basic':
        return { name: 'Basic', color: 'bg-indigo-500' }
      case 'premium':
        return { name: 'Premium', color: 'bg-violet-500' }
      default:
        return { name: 'Read-only', color: 'bg-gray-500' }
    }
  }

  const planDetails = getPlanDetails()

  if (!isAccountPage) {
    return (
      <WindDownNotice
        title="Subscriptions are no longer available"
        body="Alphy is being kept online as a read-only archive. New subscriptions, credit purchases, uploads, submissions, AI interactions, Playground, and Arcs have been disabled."
      />
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mt-8 space-y-8 pb-20">
        {currentUser && (
          <div>
            <div className="mt-8">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Account Settings
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Your account remains available for reading existing material.
              </p>
            </div>

            <Card className="mt-6 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <User className="mr-2 h-5 w-5 text-indigo-500" />
                  Account Information
                </CardTitle>
                <CardDescription>
                  Subscription and credit purchases have been disabled.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Mail className="mr-2 h-4 w-4 text-slate-500" />
                      Email Address
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {currentUser.email}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Lock className="mr-2 h-4 w-4 text-slate-500" />
                      Password
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm"
                      onClick={() => {
                        window.location.href = '/u/resetpassword'
                      }}
                    >
                      Reset password
                    </Button>
                  </div>

                  {credit !== null && credit !== undefined && (
                    <div className="space-y-2">
                      <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                        <Clock className="mr-2 h-4 w-4 text-slate-500" />
                        Remaining Credits
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {Math.floor(credit)} minutes
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Credits can no longer be purchased or used for new processing.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Package className="mr-2 h-4 w-4 text-slate-500" />
                      Current Plan
                    </div>
                    <Badge className={planDetails.color}>{planDetails.name}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="border-slate-200 bg-slate-50 shadow-none dark:border-zinc-800 dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">
              <CreditCard className="mr-2 h-5 w-5 text-slate-500" />
              Service Wind-down
            </CardTitle>
            <CardDescription>
              New subscriptions, renewals, and credit purchases are disabled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-slate-600 dark:text-zinc-400">
              Existing public sources remain available for reading. AI Q&A, Playground,
              content submission, uploads, and Arcs are no longer available.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
