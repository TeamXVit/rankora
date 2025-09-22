"use client";

import { useState } from "react";
import { Star } from "lucide-react";

function StarInput({ name, value, setValue }) {
  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => setValue(name, star)}
          className={`w-6 h-6 cursor-pointer transition ${
            star <= value ? "fill-blue-400 text-blue-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function StarRatingForm({ id }) {
  const [ratings, setRatings] = useState({
    attendance: 0,
    theory: 0,
    lab: 0,
    project: 0,
  });
  const [message, setMessage] = useState("");

  const setValue = (name, value) => {
    setRatings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const res = await fetch(`/api/rate/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratings),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to submit rating");
      } else {
        setMessage("✅ Rating submitted successfully!");
      }
    } catch (err) {
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-6 w-full max-w-md"
    >
      <div>
        <label className="block font-medium mb-1">Attendance</label>
        <StarInput name="attendance" value={ratings.attendance} setValue={setValue} />
      </div>

      <div>
        <label className="block font-medium mb-1">Theory</label>
        <StarInput name="theory" value={ratings.theory} setValue={setValue} />
      </div>

      <div>
        <label className="block font-medium mb-1">Lab</label>
        <StarInput name="lab" value={ratings.lab} setValue={setValue} />
      </div>

      <div>
        <label className="block font-medium mb-1">Project</label>
        <StarInput name="project" value={ratings.project} setValue={setValue} />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Submit Rating
      </button>

      {message && <p className="text-sm text-center">{message}</p>}
    </form>
  );
}
