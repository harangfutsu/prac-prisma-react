import { useNavigate, useParams } from "react-router";
import { useEffect, useRef } from "react";
import useContactStore from "../store/contactStore";

const Entry = ({ isUpdate }) => {
  const { id } = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate();

  const {
    contactDetail,
    fetchContactById,
    createContact,
    updateContact,
    clearContactDetail,
    clearError,
    isLoading,
    isError,
    error,
  } = useContactStore();

  useEffect(() => {
    if (isUpdate && id) fetchContactById(id);
    return () => { clearContactDetail(); clearError(); };
  }, [id, isUpdate]);

  useEffect(() => {
    if (isUpdate && contactDetail && formRef.current) {
      formRef.current.fullname.value = contactDetail.fullname || "";
      formRef.current.email.value = contactDetail.email || "";
      formRef.current.phone.value = contactDetail.phone || "";
      formRef.current.company.value = contactDetail.company || "";
      formRef.current.job_title.value = contactDetail.job_title || "";
      formRef.current.notes.value = contactDetail.notes || "";
    } else if (!isUpdate && formRef.current) {
      formRef.current.reset();
    }
  }, [contactDetail, isUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      company: e.target.company.value,
      job_title: e.target.job_title.value,
      notes: e.target.notes.value,
    };
    try {
      if (isUpdate) await updateContact(id, payload);
      else await createContact(payload);
      navigate("/contact");
    } catch (err) {
      // error shown via store
    }
  };

  const gradientBg = "linear-gradient(135deg, #22c55e 0%, #059669 50%, #0f766e 100%)";

  const inputClass = `w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm
    placeholder:text-gray-400 outline-none transition-all duration-200
    focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top accent */}
      <div className="h-1 w-full" style={{ background: gradientBg }} />

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
              style={{ background: gradientBg }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">ContactVault</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Back */}
        <button
          onClick={() => navigate("/contact")}
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-8 text-sm font-medium group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Contacts
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">

          {/* Gradient Header */}
          <div className="px-8 py-7" style={{ background: gradientBg }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                {isUpdate ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{isUpdate ? "Update Contact" : "New Contact"}</h2>
                <p className="text-green-100 text-sm mt-0.5">
                  {isUpdate ? "Edit the details for this contact." : "Add a new person to your contact list."}
                </p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="px-8 py-8">

            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-10 h-10 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">{isUpdate ? "Loading contact..." : "Saving..."}</p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-5 py-4 rounded-xl mb-6 flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error || "Something went wrong."}
                </div>
                <button onClick={clearError} className="text-rose-400 hover:text-rose-600 text-xl font-bold ml-4 leading-none">×</button>
              </div>
            )}

            {!isLoading && (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">

                {/* Section: Basic Info */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-1 h-5 rounded-full" style={{ background: gradientBg }} />
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Basic Information</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-green-500">*</span>
                      </label>
                      <input name="fullname" type="text" required placeholder="e.g. John Doe" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email <span className="text-green-500">*</span>
                      </label>
                      <input name="email" type="email" required placeholder="e.g. john@example.com" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Phone <span className="text-green-500">*</span>
                      </label>
                      <input name="phone" type="text" required placeholder="e.g. 08123456789" className={inputClass} />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Section: Work & Notes */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-1 h-5 rounded-full" style={{ background: "linear-gradient(to bottom, #059669, #0f766e)" }} />
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Work &amp; Notes</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company</label>
                      <input name="company" type="text" placeholder="e.g. Tech Corp" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Job Title</label>
                      <input name="job_title" type="text" placeholder="e.g. Software Engineer" className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
                      <textarea
                        name="notes"
                        rows={4}
                        placeholder="Additional notes about this contact..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold
                      hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 rounded-xl text-white text-sm font-semibold
                      shadow-md hover:-translate-y-0.5 transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
                    style={{ background: gradientBg, boxShadow: "0 6px 20px rgba(5,150,105,0.30)" }}
                  >
                    {isLoading ? "Saving..." : isUpdate ? "Save Changes" : "Create Contact"}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Entry;
