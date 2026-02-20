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
    if (isUpdate && id) {
      fetchContactById(id);
    }
    return () => {
      clearContactDetail();
      clearError();
    };
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
      if (isUpdate) {
        await updateContact(id, payload);
      } else {
        await createContact(payload);
      }
      navigate("/contact");
    } catch (err) {
      // error is set in store
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-950"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/contact")}
          className="flex items-center gap-2 text-gray-500 hover:text-teal-400 transition-colors mb-8 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Contacts
        </button>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Card Header */}
          <div
            className="px-8 py-7 border-b border-gray-800"
            style={{ background: "linear-gradient(135deg, rgba(20,184,166,0.12), rgba(99,102,241,0.12))" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)" }}
              >
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
                <h2 className="text-2xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>
                  {isUpdate ? "Update Contact" : "New Contact"}
                </h2>
                <p className="text-gray-400 text-sm mt-0.5">
                  {isUpdate
                    ? "Edit the details for this contact."
                    : "Add a new person to your contact list."}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-10 h-10 border-2 border-gray-700 border-t-teal-400 rounded-full animate-spin" />
                <p className="text-gray-500 text-sm tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                  {isUpdate ? "Loading contact..." : "Saving..."}
                </p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="bg-red-950 border border-red-800 text-red-300 px-5 py-4 rounded-xl mb-6 flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error || "Something went wrong. Please try again."}
                </div>
                <button onClick={clearError} className="text-red-400 hover:text-red-200 text-xl font-bold ml-4">×</button>
              </div>
            )}

            {/* Form */}
            {!isLoading && (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-px h-5 bg-teal-400" />
                    <h3 className="text-sm font-semibold text-gray-300 tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                      Basic Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-2 tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                        Full Name <span className="text-teal-400">*</span>
                      </label>
                      <input
                        name="fullname"
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                        Email <span className="text-teal-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="e.g. john@example.com"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                        Phone <span className="text-teal-400">*</span>
                      </label>
                      <input
                        name="phone"
                        type="text"
                        required
                        placeholder="e.g. 08123456789"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-800" />

                {/* Work Info */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-px h-5 bg-violet-400" />
                    <h3 className="text-sm font-semibold text-gray-300 tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                      Work &amp; Notes
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Company */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                        Company
                      </label>
                      <input
                        name="company"
                        type="text"
                        placeholder="e.g. Tech Corp"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                      />
                    </div>

                    {/* Job Title */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                        Job Title
                      </label>
                      <input
                        name="job_title"
                        type="text"
                        placeholder="e.g. Software Engineer"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                      />
                    </div>

                    {/* Notes */}
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-2 tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        rows={4}
                        placeholder="Additional notes about this contact..."
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="px-6 py-3 rounded-xl border border-gray-700 text-gray-400 text-sm font-semibold hover:border-gray-500 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)" }}
                  >
                    {isLoading
                      ? "Saving..."
                      : isUpdate
                      ? "Save Changes"
                      : "Create Contact"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
