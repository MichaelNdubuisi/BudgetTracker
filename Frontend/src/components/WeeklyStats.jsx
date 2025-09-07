function WeeklyStats({ goals, transactions, darkMode }) {
  const isThisWeek = dateStr => {
    const now = new Date();
    const date = new Date(dateStr);
    const start = new Date(now.setHours(0,0,0,0));
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return date >= start && date < end;
  };

  const formatCurrency = (amount) => {
    if (Math.abs(amount) >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    } else if (Math.abs(amount) >= 1000) {
      return `₦${(amount / 1000).toFixed(1)}K`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  // Calculate weekly statistics
  const completedGoals = goals.filter(g => g.completed && isThisWeek(g.due)).length;
  const totalGoals = goals.filter(g => isThisWeek(g.due)).length;
  const weeklyIncome = transactions.filter(t => t.type === "income" && isThisWeek(t.date)).reduce((a, t) => a + t.amount, 0);
  const weeklyExpense = transactions.filter(t => t.type === "expense" && isThisWeek(t.date)).reduce((a, t) => a + t.amount, 0);
  const weeklySavings = transactions.filter(t => t.type === "savings" && isThisWeek(t.date)).reduce((a, t) => a + t.amount, 0);
  const netWeekly = weeklyIncome - weeklyExpense;

  // Calculate goal completion rate
  const goalCompletionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <div className={`flex-1 rounded-xl p-6 shadow-md card fade-in ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>
        📅 Weekly Stats
      </h3>

      <div className="space-y-4">
        {/* Goals Section */}
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Goals Progress</span>
            <span className={`text-sm font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
              {completedGoals}/{totalGoals}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${goalCompletionRate}%` }}
            ></div>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {goalCompletionRate}% completion rate
          </p>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-lg text-center transition-transform duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Income</div>
            <div className="text-green-500 font-bold text-lg">{formatCurrency(weeklyIncome)}</div>
          </div>

          <div className={`p-3 rounded-lg text-center transition-transform duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expenses</div>
            <div className="text-red-500 font-bold text-lg">{formatCurrency(weeklyExpense)}</div>
          </div>

          <div className={`p-3 rounded-lg text-center transition-transform duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Savings</div>
            <div className="text-blue-500 font-bold text-lg">{formatCurrency(weeklySavings)}</div>
          </div>

          <div className={`p-3 rounded-lg text-center transition-transform duration-200 hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Net</div>
            <div className={`font-bold text-lg ${netWeekly >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatCurrency(netWeekly)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyStats;
