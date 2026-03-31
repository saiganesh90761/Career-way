"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Map, LogOut, LayoutDashboard } from "lucide-react"
import Image from "next/image"
import PaymentButton from "./PaymentButton"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Map className="w-5 h-5 text-white" />
            </div>
            <Link href="/" className="text-xl font-bold text-white tracking-tight">
              CareerWay
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {status === "loading" && (
              <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse" />
            )}

            {status === "unauthenticated" && (
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all"
              >
                Login
              </Link>
            )}

            {status === "authenticated" && session && (
              <div className="flex items-center gap-3">
                
                {/* Dashboard button */}
                <Link
                  href="/dashboard"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                {/* Upgrade to Pro button */}
                {(session.user as any)?.paymentStatus !== "PAID" && (
                  <PaymentButton className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
                    Upgrade to Pro
                  </PaymentButton>
                )}

                {/* User avatar + dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-800 transition-colors">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                        {session.user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <span className="hidden sm:block text-sm text-white font-medium">
                      {session.user?.name?.split(" ")[0]}
                    </span>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl border border-slate-700 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-3 border-b border-slate-700">
                      <p className="text-sm font-medium text-white truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
