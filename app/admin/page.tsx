import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export default async function AdminPage() {
  const session = await auth()

  // Only YOUR email can access this
  // TODO: Replace with your actual email used for login
  if (session?.user?.email !== "embotzgammer@gmail.com") {
    redirect("/")
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isPaid: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="min-h-screen bg-slate-900 pt-24 px-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Admin Panel
      </h1>

      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Users ({users.length})
        </h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Plan</th>
              <th className="pb-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} 
                className="border-b border-slate-700/50">
                <td className="py-3 text-white">
                  {user.name}
                </td>
                <td className="py-3 text-slate-300">
                  {user.email}
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    user.isPaid 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-slate-600 text-slate-400"
                  }`}>
                    {user.isPaid ? "Pro" : "Free"}
                  </span>
                </td>
                <td className="py-3 text-slate-400 text-sm">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
