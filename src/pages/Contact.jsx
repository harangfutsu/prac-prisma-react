import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useContactStore from "../store/contactStore";
import useAuthStore from "../store/userStore";

const Contact = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const {
    contacts,
    filters,
    setFilters,
    fetchContacts,
    deleteContact,
    isLoading,
    isError,
    error,
    clearError,
    clearStore,
  } = useContactStore();

  const { currentUser, logout } = useAuthStore();

  useEffect(() => {
    if (currentUser) fetchContacts();
    return () => clearStore();
  }, [currentUser?.userId]);

  useEffect(() => {
    fetchContacts(filters);
  }, [filters]);

  const handleDelete = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try { await deleteContact(contactId); }
      catch (err) { console.error("Failed to delete contact:", err); }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout(); navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ search: searchInput });
  };

  const handleSortOrder = () => {
    setFilters({ sortOrder: filters.sortOrder === "desc" ? "asc" : "desc" });
  };

  const clearFilters = () => {
    setSearchInput("");
    setFilters({ sortOrder: "desc", search: "" });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" });
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").slice(0, 2).map((n) => n.charAt(0).toUpperCase()).join("");
  };

  // All avatars use the brand gradient family
  const avatarColors = [
    { from: "#22c55e", to: "#059669" },
    { from: "#059669", to: "#0f766e" },
    { from: "#10b981", to: "#0d9488" },
    { from: "#16a34a", to: "#059669" },
    { from: "#15803d", to: "#0f766e" },
    { from: "#4ade80", to: "#34d399" },
    { from: "#34d399", to: "#2dd4bf" },
    { from: "#6ee7b7", to: "#5eead4" },
  ];

  const getAvatarGradient = (name) => {
    if (!name) return avatarColors[0];
    return avatarColors[name.charCodeAt(0) % avatarColors.length];
  };

  const gradientBg = "linear-gradient(135deg, #22c55e 0%, #059669 50%, #0f766e 100%)";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: gradientBg }} />

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: gradientBg }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight hidden sm:block">ContactManager</span>
            </div>

            {/* User + Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: gradientBg }}>
                  {currentUser?.fullName?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-gray-600 text-sm font-medium">{currentUser?.fullName || "User"}</span>
              </div>
              <button
                onClick={() => navigate("entry")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md hover:-translate-y-0.5 transition-all duration-200"
                style={{ background: gradientBg, boxShadow: "0 4px 14px rgba(5,150,105,0.3)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add Contact</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Contacts</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {contacts.length} {contacts.length === 1 ? "contact" : "contacts"} stored
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-11 pr-24 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900
                    placeholder:text-gray-400 outline-none transition-all
                    focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
                  style={{ background: gradientBg }}
                >
                  Search
                </button>
              </div>
            </form>

            <button
              onClick={handleSortOrder}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600
                hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={filters.sortOrder === "asc" ? "M3 4h13M3 8h9m-9 4h6" : "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"} />
              </svg>
              A–Z {filters.sortOrder === "asc" ? "↑" : "↓"}
            </button>

            <button
              onClick={clearFilters}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500
                hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50 transition-all whitespace-nowrap"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Error */}
        {isError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-5 py-4 rounded-2xl mb-5 flex justify-between items-center">
            <div className="flex items-center gap-3 text-sm">
              <svg className="w-5 h-5 text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
            <button onClick={clearError} className="text-rose-400 hover:text-rose-600 text-xl font-bold ml-4 leading-none">×</button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p className="text-gray-400 text-sm">Loading contacts...</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && contacts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "linear-gradient(135deg, #dcfce7, #d1fae5)" }}>
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold mb-1">No contacts yet</p>
            <p className="text-gray-400 text-sm mb-6">Start building your network</p>
            <button
              onClick={() => navigate("entry")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: gradientBg, boxShadow: "0 4px 14px rgba(5,150,105,0.3)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add first contact
            </button>
          </div>
        )}

        {/* Contact List */}
        {!isLoading && contacts.length > 0 && (
          <div className="space-y-3">
            {contacts.map((contact) => {
              const grad = getAvatarGradient(contact.fullname);
              return (
                <div
                  key={contact.contact_id}
                  className="group bg-white border border-gray-100 rounded-2xl p-5
                    shadow-sm hover:shadow-md transition-all duration-200 hover:border-emerald-200"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
                    >
                      {getInitials(contact.fullname)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 font-semibold text-base truncate">{contact.fullname}</h3>

                          {(contact.job_title || contact.company) && (
                            <p className="text-gray-400 text-sm mt-0.5">
                              {contact.job_title}
                              {contact.job_title && contact.company && <span className="text-gray-300"> @ </span>}
                              {contact.company && (
                                <span className="font-medium" style={{ color: "#059669" }}>{contact.company}</span>
                              )}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5">
                            {contact.email && (
                              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${contact.email}`} className="hover:text-emerald-600 transition-colors truncate max-w-[180px]">
                                  {contact.email}
                                </a>
                              </div>
                            )}
                            {contact.phone && (
                              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`tel:${contact.phone}`} className="hover:text-emerald-600 transition-colors">
                                  {contact.phone}
                                </a>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 text-xs text-gray-300">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(contact.created_at)}
                            </div>
                          </div>

                          {contact.notes && (
                            <p className="text-gray-400 text-xs mt-2 italic truncate max-w-md">
                              &ldquo;{contact.notes}&rdquo;
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => navigate(`update/${contact.contact_id}`)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600
                              bg-gray-50 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(contact.contact_id)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-400
                              bg-gray-50 border border-gray-200 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Contact;
