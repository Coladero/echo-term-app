import AuthForm from '../../../components/AuthForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-green-400">
      <div className="w-full max-w-md p-6 border rounded-lg border-green-500">
        <h1 className="text-2xl mb-4">Login</h1>
        <AuthForm/>
      </div>
    </main>
  )
}
