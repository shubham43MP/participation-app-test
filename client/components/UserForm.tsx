"use client";

import { useState } from "react";
import { createUser } from "@/services/userService";
import { useRouter } from "next/navigation";

export default function UserForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    participationPercentage: "",
  });

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.participationPercentage) {
      alert("All fields are required");
      return;
    }

    try {
      await createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        participationPercentage: Number(form.participationPercentage),
      });

      setForm({ firstName: "", lastName: "", participationPercentage: "" });

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to create user");
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
      <input
        type="text"
        placeholder="First name"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        className="p-3 rounded-md flex-1 bg-white"
      />
      <input
        type="text"
        placeholder="Last name"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        className="p-3 rounded-md flex-1 bg-white"
      />
      <input
        type="number"
        placeholder="Participation"
        value={form.participationPercentage}
        onChange={(e) =>
          setForm({ ...form, participationPercentage: e.target.value })
        }
        className="p-3 rounded-md flex-1 bg-white"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-cyan-500 transition"
      >
        SEND
      </button>
    </div>
  );
}
