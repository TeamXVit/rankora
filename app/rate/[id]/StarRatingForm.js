"use client";

import { useState } from "react";
import { Star, Send, CheckCircle, AlertCircle } from "lucide-react";

function StarInput({ name, value, setValue, label, color = "indigo" }) {
  const colorVariants = {
    indigo: "fill-indigo-400 text-indigo-400"
  };

  return (
    <div className="space-y-3">
      <label className="block text-white font-semibold">{label}</label>
      <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setValue(name, star)}
              className={`w-7 h-7 cursor-pointer transition-all duration-200 hover:scale-110 ${
                star <= value 
                  ? colorVariants[color] 
                  : "text-gray-600 hover:text-gray-400"
              }`}
            />
          ))}
        </div>
        <div className="text-right">
          <span className="text-gray-400 text-sm">{value}/5</span>
        </div>
      </div>
    </div>
  );
}

export default function StarRatingForm({ id }) {
  const [ratings, setRatings] = useState({
    teaching: 0,
    attendance: 0,
    theory: 0,
    lab: 0,
    project: 0,
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = (name, value) => {
    setRatings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Submitting your rating...");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/rate/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratings),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to submit rating");
      } else {
        setMessage("Rating submitted successfully!");
        // Reset form after successful submission
        setRatings({
          teaching: 0,
          attendance: 0,
          theory: 0,
          lab: 0,
          project: 0,
        });
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(ratings).every(rating => rating > 0);

  return (
    <div className="w-full max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Rating Categories */}
        <div className="space-y-4">
          <StarInput 
            name="teaching" 
            value={ratings.teaching} 
            setValue={setValue} 
            label="Teaching Quality"
            color="indigo"
          />
          
          <StarInput 
            name="attendance" 
            value={ratings.attendance} 
            setValue={setValue} 
            label="Attendance Policy"
            color="indigo"
          />
          
          <StarInput 
            name="theory" 
            value={ratings.theory} 
            setValue={setValue} 
            label="Theory Evaluation"
            color="indigo"
          />
          
          <StarInput 
            name="lab" 
            value={ratings.lab} 
            setValue={setValue} 
            label="Lab Evaluation"
            color="indigo"
          />
          
          <StarInput 
            name="project" 
            value={ratings.project} 
            setValue={setValue} 
            label="Project Evaluation"
            color="indigo"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`group relative w-full px-8 py-4 font-bold rounded-2xl shadow-2xl transform transition-all duration-500 overflow-hidden ${
              isFormValid && !isSubmitting
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:scale-105 shadow-indigo-500/30 hover:shadow-indigo-500/50'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {/* Button glow effect */}
            {isFormValid && !isSubmitting && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            )}
            
            {/* Shimmer effect */}
            {isFormValid && !isSubmitting && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            )}
            
            <div className="relative flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Rating
                </>
              )}
            </div>
          </button>

          {!isFormValid && (
            <p className="text-gray-400 text-sm text-center mt-3">
              Please rate all categories to submit
            </p>
          )}
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-xl border backdrop-blur-xl transition-all duration-300 ${
            message.includes('successfully') 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : message.includes('Submitting')
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            <div className="flex items-center gap-3">
              {message.includes('successfully') ? (
                <CheckCircle className="w-5 h-5" />
              ) : message.includes('Submitting') ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <p className="font-medium">{message}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
