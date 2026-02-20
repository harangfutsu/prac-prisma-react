import api from "./client"

export const getAllContacts = (params) => 
    api.get("/contact", {params}).then((r) => r.data.data)

export const getContactById = (id) =>
    api.get(`/contact/${id}`).then((r) => r.data.data)

export const createContact = (payload) =>
    api.post("/contact", payload).then((r) => r.data.data)

export const updateContact = (id, payload) =>
    api.patch(`/contact/${id}`, payload).then((r) => r.data.data)

export const deleteContact = (id) =>
    api.delete(`/contact/${id}`).then((r) => r.data.data)