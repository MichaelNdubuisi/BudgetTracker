import { useState } from "react";
import { Target, CheckCircle, AlertCircle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

function GoalForm({ onAdd, darkMode }) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [due, setDue] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Please enter a goal title.";
    if (!target || parseFloat(target) <= 0) newErrors.target = "Please enter a valid target amount greater than 0.";
    if (!due) newErrors.due = "Please select a due date.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      await onAdd({ title: title.trim(), target: parseFloat(target), due, completed: false });
      setTitle(""); setTarget(""); setDue("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({ general: err.message || "Failed to add goal. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2" role="alert">
          <CheckCircle className="w-5 h-5" />
          Goal added successfully!
        </div>
      )}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2" role="alert">
          <AlertCircle className="w-5 h-5" />
          {errors.general}
        </div>
      )}
      <div className={`font-semibold mb-1 ${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>
        <label htmlFor="goal-title"></label>
      </div>
      <input
        id="goal-title"
        type="text" placeholder="Goal title" value={title}
        onChange={e => setTitle(e.target.value)}
        className={`w-full rounded-lg px-4 py-3 focus:ring-2 ${errors.title ? 'border-red-500' : ''} ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-700 focus:ring-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-indigo-600'}`}
        aria-invalid={errors.title ? "true" : "false"}
        aria-describedby={errors.title ? "title-error" : undefined}
      />
      {errors.title && <p id="title-error" className="text-red-500 text-sm mt-1">{errors.title}</p>}
      <input
        type="number" placeholder="Target amount (₦)" value={target}
        onChange={e => setTarget(e.target.value)}
        className={`w-full rounded-lg px-4 py-3 focus:ring-2 ${errors.target ? 'border-red-500' : ''} ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-700 focus:ring-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-indigo-600'}`}
        aria-invalid={errors.target ? "true" : "false"}
        aria-describedby={errors.target ? "target-error" : undefined}
      />
      {errors.target && <p id="target-error" className="text-red-500 text-sm mt-1">{errors.target}</p>}
      <input
        type="date" value={due}
        onChange={e => setDue(e.target.value)}
        className={`w-full rounded-lg px-4 py-3 focus:ring-2 ${errors.due ? 'border-red-500' : ''} ${darkMode ? 'bg-gray-800 text-gray-200 border-gray-700 focus:ring-indigo-500' : 'bg-white text-gray-900 border-gray-300 focus:ring-indigo-600'}`}
        aria-invalid={errors.due ? "true" : "false"}
        aria-describedby={errors.due ? "due-error" : undefined}
      />
      {errors.due && <p id="due-error" className="text-red-500 text-sm mt-1">{errors.due}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size="w-4 h-4" />
            Adding...
          </>
        ) : (
          "Add Goal"
        )}
      </button>
    </form>
  );
}

export default GoalForm;
