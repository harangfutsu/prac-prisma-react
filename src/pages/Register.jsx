import { useNavigate } from "react-router"
import { useRef } from "react";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const navigate = useNavigate()
  const formRef = useRef();
  const { registerUser, loading, message } = useRegister();

  const inputClass = `w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm outline-none
    transition-all duration-200 placeholder:text-gray-400
    focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #22c55e 0%, #059669 50%, #0f766e 100%)" }}>

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-25 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #4ade80, transparent)" }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #2dd4bf, transparent)", animationDelay: "1.5s" }} />
      </div>

      <div className="relative w-full max-w-2xl z-10">

        {/* Brand */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-xl"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight drop-shadow">ContactVault</h1>
          <p className="text-green-100 text-sm mt-1 opacity-80">Your contacts, always organized</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8 shadow-2xl"
          style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)" }}>

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
            <p className="text-gray-500 text-sm mt-1">Join us and start managing your contacts</p>
          </div>

          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault()
              const formData = {
                fullName: e.target.fullName.value.trim(),
                email: e.target.email.value.trim(),
                password: e.target.password.value.trim()
              }
              if (e.target.password.value !== e.target.verification.value) {
                alert("Passwords do not match!");
                return;
              }
              registerUser(formData)
            }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input name="fullName" type="text" required placeholder="John Doe" className={inputClass} />
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <input name="password" type="password" required placeholder="••••••••" className={inputClass} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                <input name="verification" type="password" required placeholder="••••••••" className={inputClass} />
              </div>

            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full text-white font-semibold rounded-xl px-4 py-3.5 text-sm
                shadow-lg hover:-translate-y-0.5 transition-all duration-200 mt-2
                disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
              style={{ background: "linear-gradient(135deg, #22c55e, #059669, #0f766e)", boxShadow: "0 8px 24px rgba(5,150,105,0.35)" }}
            >
              <span className="flex items-center justify-center gap-2">
                {loading && (
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {loading ? "Creating Account..." : "Create Account"}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-emerald-600 hover:text-teal-700 transition-colors"
              >
                Sign in instead
              </button>
            </p>
          </div>

          {message && (
            <div className={`mt-5 p-4 rounded-xl flex items-start gap-3 text-sm ${message.includes("✅")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-rose-50 text-rose-700 border border-rose-200"}`}>
              <span className="text-base">{message.includes("✅") ? "" : "⚠️"}</span>
              <p className="leading-snug">{message}</p>
            </div>
          )}
        </div>

        <p className="text-center text-white/40 text-xs mt-5">Secured with end-to-end encryption</p>
      </div>
    </div>
  )
}

export default Register