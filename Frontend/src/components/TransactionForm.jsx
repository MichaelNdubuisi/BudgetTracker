import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

function TransactionForm({ onAddTransaction, darkMode, className = "" }) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = "Please enter a valid amount greater than 0.";
    if (!category.trim()) newErrors.category = "Please enter a category.";
    if (!date) newErrors.date = "Please select a date.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      await onAddTransaction({ type, amount: parseFloat(amount), category: category.trim(), date });
      setAmount("");
      setCategory("");
      setDate("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({ general: err.message || "Failed to add transaction. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`md:col-span-2 rounded-xl shadow-lg p-8 ${className} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>
        Add Transaction
      </h2>
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2" role="alert">
          <CheckCircle className="w-5 h-5" />
          Transaction added successfully!
        </div>
      )}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2" role="alert">
          <AlertCircle className="w-5 h-5" />
          {errors.general}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-5" role="form" aria-labelledby="transaction-form">
        <div>
          <label htmlFor="transaction-type" className="sr-only">Transaction Type</label>
          <select
            id="transaction-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-200 focus:ring-indigo-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-indigo-600'}`}
            aria-label="Select transaction type"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="savings">Savings</option>
          </select>
        </div>
        <div>
          <label htmlFor="transaction-amount" className="sr-only">Amount</label>
          <input
            id="transaction-amount"
            type="number"
            placeholder="Amount (₦)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${errors.amount ? 'border-red-500' : ''} ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-200 focus:ring-indigo-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-indigo-600'}`}
            aria-label="Enter transaction amount"
            aria-invalid={errors.amount ? "true" : "false"}
            aria-describedby={errors.amount ? "amount-error" : undefined}
            min="0"
            step="0.01"
          />
          {errors.amount && <p id="amount-error" className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>
        <div>
          <label htmlFor="transaction-category" className="sr-only">Category</label>
          <input
            id="transaction-category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${errors.category ? 'border-red-500' : ''} ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-200 focus:ring-indigo-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-indigo-600'}`}
            aria-label="Enter transaction category"
            aria-invalid={errors.category ? "true" : "false"}
            aria-describedby={errors.category ? "category-error" : undefined}
          />
          {errors.category && <p id="category-error" className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
        <div>
          <label htmlFor="transaction-date" className="sr-only">Date</label>
          <input
            id="transaction-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${errors.date ? 'border-red-500' : ''} ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-200 focus:ring-indigo-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-indigo-600'}`}
            aria-label="Select transaction date"
            aria-invalid={errors.date ? "true" : "false"}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && <p id="date-error" className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="sm:col-span-4 bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          aria-label="Add transaction"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Transaction"
          )}
        </button>
      </form>
    </section>
  );
}

export default TransactionForm;
