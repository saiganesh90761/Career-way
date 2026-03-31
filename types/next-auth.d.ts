import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      isPaid: boolean
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
  interface User {
    isPaid: boolean
  }
}
