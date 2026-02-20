// contactStore.js
import { create } from "zustand";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../services/api/contact";

const useContactStore = create((set, get) => ({
  contacts: [],
  contactDetail: null,
  isLoading: false,
  isError: false,
  error: null,
  filters: {
    type: "",
    sortOrder: "desc",
    search: "",
  },

  // Set filters
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },

  // Fetch all contacts with filters
  fetchContacts: async (customFilters) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const filters = customFilters || get().filters;

      // Remove empty filter values
      const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});

      const data = await getAllContacts(cleanFilters);
      set({ contacts: data, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to fetch contacts",
      });
    }
  },

  // Fetch contact by ID
  fetchContactById: async (id) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const data = await getContactById(id);
      set({ contactDetail: data, isLoading: false });
      return data;
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to fetch contact",
      });
      throw err;
    }
  },

  // Create new contact
  createContact: async (payload) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const newContact = await createContact(payload);
      set({
        contacts: [newContact, ...get().contacts],
        isLoading: false,
      });
      return newContact;
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to create contact",
      });
      throw err;
    }
  },

  // Update contact
  updateContact: async (id, payload) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const updatedContact = await updateContact(id, payload);
      set({
        contacts: get().contacts.map((contact) =>
          contact.contact_id === id ? { ...contact, ...updatedContact } : contact
        ),
        contactDetail:
          get().contactDetail?.contact_id === id
            ? { ...get().contactDetail, ...updatedContact }
            : get().contactDetail,
        isLoading: false,
      });
      return updatedContact;
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to update contact",
      });
      throw err;
    }
  },

  // Delete contact
  deleteContact: async (id) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      await deleteContact(id);
      set({
        contacts: get().contacts.filter((contact) => contact.contact_id !== id),
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        isError: true,
        error: err.response?.data?.message || "Failed to delete contact",
      });
      throw err;
    }
  },

  // Clear contact detail
  clearContactDetail: () => {
    set({ contactDetail: null });
  },

  // Clear error
  clearError: () => {
    set({ isError: false, error: null });
  },

  // Clear entire store (for logout)
  clearStore: () => {
    set({
      contacts: [],
      contactDetail: null,
      isLoading: false,
      isError: false,
      error: null,
      filters: {
        type: "",
        sortOrder: "desc",
        search: "",
      },
    });
  },
}));

export default useContactStore;