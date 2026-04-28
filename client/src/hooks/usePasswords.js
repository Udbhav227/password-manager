import { useState, useEffect } from "react";
import axios from "axios";

const usePasswords = (token, navigate) => {
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState("");

  // fetch passwords
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/passwords/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPasswords(res.data))
      .catch(() => setError("Failed to load passwords."));
  }, [token, navigate]);

  // add
  const addPassword = async (newEntry) => {
    const res = await axios.post(
      "http://localhost:5000/api/passwords/",
      newEntry,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setPasswords((prev) => [...prev, res.data]);
  };

  // delete
  const deletePassword = async (id) => {
    await axios.delete(`http://localhost:5000/api/passwords/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPasswords((prev) => prev.filter((e) => e._id !== id));
  };

  // update
  const updatePassword = async (id, data) => {
    await axios.put(`http://localhost:5000/api/passwords/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPasswords((prev) =>
      prev.map((e) => (e._id === id ? { ...e, ...data } : e)),
    );
  };

  return {
    passwords,
    error,
    addPassword,
    deletePassword,
    updatePassword,
  };
};

export default usePasswords;
