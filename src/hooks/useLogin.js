import { useNavigate } from "react-router";
import { useState } from "react";
import useAuthStore from "../store/userStore";

export const useLogin = () => {
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const loginUser = async (formData) => {
    setMessage("");
    try {
      const res = await login(formData);
      setMessage(`✅ ${res.message}`);
      setTimeout(() => navigate("/contact"), 2000);
    } catch (err) {
      setMessage(`❌ ${err}`);
    }
  };

  return { loginUser, loading, message };
};