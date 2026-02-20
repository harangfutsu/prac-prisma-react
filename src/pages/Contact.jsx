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
    if (currentUser) {
      fetchContacts();
    }
    return () => {
      clearStore();
    };
  }, [currentUser?.userId]);

  useEffect(() => {
    fetchContacts(filters);
  }, [filters]);

  const handleDelete = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(contactId);
      } catch (error) {
        console.error("Failed to delete contact:", error);
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
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
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n.charAt(0).toUpperCase())
      .join("");
  };

  const getAvatarColor = (name) => {
    const colors = [
      "from-teal-400 to-cyan-500",
      "from-violet-400 to-purple-500",
      "from-rose-400 to-pink-500",
      "from-amber-400 to-orange-500",
      "from-emerald-400 to-green-500",
      "from-sky-400 to-blue-500",
      "from-fuchsia-400 to-pink-500",
      "from-lime-400 to-emerald-500",
    ];
    if (!name) return colors[0];
    const idx = name.charCodeAt(0) % colors.length;
    return colors[idx];
  };

  return (
    <div className="min-h-screen bg-gray-950" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)" }}
              >
                {currentUser?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-gray-400 text-sm tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                {currentUser?.fullName || "User"}
              </span>
            </div>
            <h1
              className="text-5xl font-bold text-white"
              style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
            >
              Contacts
            </h1>
            <p className="text-gray-500 mt-1 text-sm tracking-wide">
              {contacts.length} {contacts.length === 1 ? "record" : "records"} stored
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("entry")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Contact
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-400 border border-gray-800 hover:border-gray-600 hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-11 pr-24 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
                  style={{ background: "linear-gradient(135deg, #14b8a6, #6366f1)" }}
                >
                  Search
                </button>
              </div>
            </form>

            {/* Sort */}
            <button
              onClick={handleSortOrder}
              className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-300 hover:border-gray-500 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={filters.sortOrder === "asc" ? "M3 4h13M3 8h9m-9 4h6" : "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"}
                />
              </svg>
              A–Z {filters.sortOrder === "asc" ? "↑" : "↓"}
            </button>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-400 hover:text-white hover:border-gray-500 transition-all"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Error */}
        {isError && (
          <div className="bg-red-950 border border-red-800 text-red-300 px-5 py-4 rounded-xl mb-6 flex justify-between items-center">
            <div className="flex items-center gap-3 text-sm">
              <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
            <button onClick={clearError} className="text-red-400 hover:text-red-200 text-xl font-bold ml-4">×</button>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-2 border-gray-700 border-t-teal-400 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 text-sm tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
              Loading contacts...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && contacts.length === 0 && (
          <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-2">No contacts found</p>
            <button
              onClick={() => navigate("entry")}
              className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
            >
              + Add your first contact
            </button>
          </div>
        )}

        {/* Contact Grid */}
        {!isLoading && contacts.length > 0 && (
          <div className="grid gap-3">
            {contacts.map((contact) => (
              <div
                key={contact.contact_id}
                className="group bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-gradient-to-br ${getAvatarColor(contact.fullname)}`}
                  >
                    {getInitials(contact.fullname)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg leading-tight truncate">
                          {contact.fullname}
                        </h3>

                        {/* Job / Company */}
                        {(contact.job_title || contact.company) && (
                          <p className="text-gray-400 text-sm mt-0.5">
                            {contact.job_title && <span>{contact.job_title}</span>}
                            {contact.job_title && contact.company && <span className="text-gray-600"> @ </span>}
                            {contact.company && <span className="text-teal-400">{contact.company}</span>}
                          </p>
                        )}

                        {/* Contact Details */}
                        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
                          {contact.email && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-400">
                              <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <a href={`mailto:${contact.email}`} className="hover:text-teal-400 transition-colors truncate max-w-[200px]">
                                {contact.email}
                              </a>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-400">
                              <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <a href={`tel:${contact.phone}`} className="hover:text-teal-400 transition-colors">
                                {contact.phone}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-xs text-gray-600" style={{ fontFamily: "monospace" }}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(contact.created_at)}
                          </div>
                        </div>

                        {/* Notes */}
                        {contact.notes && (
                          <p className="text-gray-500 text-xs mt-2 italic truncate max-w-lg">
                            "{contact.notes}"
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => navigate(`update/${contact.contact_id}`)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 bg-gray-800 border border-gray-700 hover:border-gray-500 hover:text-white transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(contact.contact_id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 bg-gray-800 border border-gray-700 hover:border-red-800 hover:text-red-400 transition-all"
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
