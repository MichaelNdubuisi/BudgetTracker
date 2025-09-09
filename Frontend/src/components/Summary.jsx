import { TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

function Summary({ transactions, darkMode }) {
  const income = transactions.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const balance = income - expense;
  const savings = transactions.filter(t => t.type === "savings").reduce((a, t) => a + t.amount, 0);

  const formatCurrency = (amount) => {
    if (Math.abs(amount) >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    } else if (Math.abs(amount) >= 1000) {
      return `₦${(amount / 1000).toFixed(1)}K`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className={`flex-1 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border card fade-in ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>
        ₦ Summary
      </h3>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-6 text-center">
        <div className={`p-4 rounded-lg transition-transform duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className={`text-sm uppercase font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Income</p>
          <p className="text-green-500 font-bold text-xl md:text-2xl break-all overflow-hidden" title={`₦${income.toLocaleString()}`}>
            {formatCurrency(income)}
          </p>
        </div>
        <div className={`p-4 rounded-lg transition-transform duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <TrendingDown className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <p className={`text-sm uppercase font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expenses</p>
          <p className="text-red-500 font-bold text-xl md:text-2xl break-all overflow-hidden" title={`₦${expense.toLocaleString()}`}>
            {formatCurrency(expense)}
          </p>
        </div>
        <div className={`p-4 rounded-lg transition-transform duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <TrendingUp className="w-6 h-6 text-indigo-300 mx-auto mb-2" />
          <p className={`text-sm uppercase font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Balance</p>
          <p className={`font-extrabold text-xl md:text-2xl break-all overflow-hidden ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`} title={`₦${balance.toLocaleString()}`}>
            {formatCurrency(balance)}
          </p>
        </div>
        <div className={`p-4 rounded-lg transition-transform duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <PiggyBank className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className={`text-sm uppercase font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Savings</p>
          <p className="text-blue-500 font-bold text-xl md:text-2xl break-all overflow-hidden" title={`₦${savings.toLocaleString()}`}>
            {formatCurrency(savings)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
