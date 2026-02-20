import { useNavigate } from "react-router"
import { useRef } from "react";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const navigate = useNavigate()
  const formRef = useRef();
  const { registerUser, loading, message } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-400 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-400 opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Join us to start managing your contacts effectively
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault()
            const formData = {
              fullName: e.target.fullName.value.trim(),
              email: e.target.email.value.trim(),
              gender: e.target.gender.value,
              country: e.target.country.value,
              phone: e.target.phone.value.trim(),
              password: e.target.password.value.trim()
            }
            // Simple validation check for password match could go here
            if (e.target.password.value !== e.target.verification.value) {
              alert("Passwords do not match!");
              return;
            }
            registerUser(formData)
          }}
          className="space-y-6"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                outline-none transition-all duration-200
                focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                outline-none transition-all duration-200
                focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                placeholder="you@example.com"
              />
            </div>

            {/* Gender */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                Gender
              </label>
              <div className="relative">
                <select
                  name="gender"
                  required
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                    outline-none transition-all duration-200 appearance-none
                    focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="" disabled selected>Select Gender</option>
                  <option value="Pria">Male</option>
                  <option value="Wanita">Female</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                Phone Number
              </label>
              <div className="flex gap-3">
                <div className="relative w-28">
                  <select
                    name="country"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                    outline-none transition-all duration-200 appearance-none
                    focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  >
                    <option value="+62">+62</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <input
                  type="number"
                  name="phone"
                  required
                  className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                  outline-none transition-all duration-200
                  focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  placeholder="812xxxxxxx"
                />
              </div>
            </div>

            {/* Password */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                outline-none transition-all duration-200
                focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                placeholder="••••••••"
              />
            </div>

            {/* Re-type password */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
                Confirm Password
              </label>
              <input
                name="verification"
                type="password"
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 
                outline-none transition-all duration-200
                focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                placeholder="••••••••"
              />
            </div>

          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full mt-4 relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl px-4 py-3.5 
            shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200
            disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? "Creating Account..." : "Create Account"}
            </span>
          </button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-indigo-600 hover:text-purple-600 transition-colors"
            >
              Sign in instead
            </button>
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 text-sm animate-fade-in ${message.includes("✅")
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-rose-50 text-rose-700 border border-rose-100"
            }`}>
            <span className="text-lg">
              {message.includes("✅") ? "✨" : "⚠️"}
            </span>
            <p className="pt-0.5">{message}</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Register