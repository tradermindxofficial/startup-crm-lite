/**
 * @fileoverview Form component for creating or editing a lead.
 */
import React, { useState, useEffect } from "react";

const STATUS_OPTIONS = ["New", "Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"];
const SOURCE_OPTIONS = ["Website", "Referral", "LinkedIn", "Cold Call", "Email Campaign", "Other"];

export default function LeadForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "New",
    source: "Website",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const inputClass = (field) =>
    `w-full min-h-11 rounded-lg border px-3 py-2.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white sm:text-sm ${
      errors[field] ? "border-red-500 focus:border-red-500" : "border-gray-300 dark:border-gray-700"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name *
        </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass("name")} placeholder="Jane Doe" />
        {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company *
        </label>
        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClass("company")} placeholder="Acme Corp" />
        {errors.company ? <p className="mt-1 text-sm text-red-500">{errors.company}</p> : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email *
        </label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass("email")} placeholder="jane@example.com" />
        {errors.email ? <p className="mt-1 text-sm text-red-500">{errors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone
        </label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full min-h-11 rounded-lg border border-gray-300 px-3 py-2.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm" placeholder="(555) 123-4567" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full min-h-11 rounded-lg border border-gray-300 px-3 py-2.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm">
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="source" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Source
          </label>
          <select id="source" name="source" value={formData.source} onChange={handleChange} className="w-full min-h-11 rounded-lg border border-gray-300 px-3 py-2.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:text-sm">
            {SOURCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-200 pt-4 dark:border-gray-800 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="min-h-11 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {initialData ? "Save Changes" : "Add Lead"}
        </button>
      </div>
    </form>
  );
}
