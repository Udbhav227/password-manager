import { useState, useEffect } from "react";
import api from "../api/axios";

const usePasswords = (token, navigate) => {
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // fetch passwords
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    setIsLoading(true); // Start loading
    api
      .get("/passwords/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPasswords(res.data))
      .catch(() => setError("Failed to load passwords."))
      .finally(() => setIsLoading(false));
  }, [token, navigate]);

  // add
  const addPassword = async (newEntry) => {
    const res = await api.post("/passwords/add", newEntry, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPasswords((prev) => [...prev, res.data]);
  };

  // delete
  const deletePassword = async (id) => {
    await api.delete(`/passwords/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPasswords((prev) => prev.filter((e) => e._id !== id));
  };

  // update
  const updatePassword = async (id, data) => {
    await api.put(`/passwords/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPasswords((prev) =>
      prev.map((e) => (e._id === id ? { ...e, ...data } : e)),
    );
  };

  return {
    passwords,
    error,
    isLoading,
    addPassword,
    deletePassword,
    updatePassword,
  };
};

export default usePasswords;
