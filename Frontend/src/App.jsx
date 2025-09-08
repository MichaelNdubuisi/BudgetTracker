import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Summary from "./components/Summary";
import CategoryPieChart from "./components/CategoryPieChart";
import TransactionForm from "./components/TransactionForm";
import GoalsSection from "./components/GoalsSection";
import WeeklyStats from "./components/WeeklyStats";
import WelcomeModal from "./components/WelcomeModal";
import { getTransactions, addTransaction, getGoals, addGoal, updateGoal } from "./api";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [transactionsData, goalsData] = await Promise.all([
          getTransactions(),
          getGoals(),
        ]);
        setTransactions(transactionsData);
        // Map backend goal fields to frontend format
        const mappedGoals = goalsData.map(goal => ({
          id: goal._id,
          title: goal.title,
          target: goal.targetAmount,
          due: goal.deadline,
          completed: goal.completed,
        }));
        setGoals(mappedGoals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddTransaction = async (transaction) => {
    try {
      const newTransaction = await addTransaction(transaction);
      setTransactions([...transactions, newTransaction]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddGoal = async (goal) => {
    try {
      const newGoal = await addGoal(goal);
      setGoals([newGoal, ...goals]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleGoal = async (id) => {
    try {
      const goal = goals.find((g) => g._id === id);
      if (!goal) return;
      const updatedGoal = await updateGoal(id, { completed: !goal.completed });
      setGoals(goals.map((g) => (g._id === id ? updatedGoal : g)));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-5xl mx-auto p-6 grid gap-12 md:grid-cols-3 md:grid-rows-[auto_auto_auto_1fr]">
        <section className="md:col-span-3 flex flex-col md:flex-row gap-6">
          <Summary transactions={transactions} darkMode={darkMode} />
          <WeeklyStats goals={goals} transactions={transactions} darkMode={darkMode} />
        </section>

        <TransactionForm onAddTransaction={handleAddTransaction} darkMode={darkMode} />

        <section className={`md:row-span-2 md:col-span-1 rounded-xl shadow-lg p-8 flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CategoryPieChart transactions={transactions} darkMode={darkMode} />
        </section>

        <GoalsSection goals={goals} onAddGoal={handleAddGoal} onToggleGoal={toggleGoal} darkMode={darkMode} />
      </main>

      <Footer darkMode={darkMode} />

      <WelcomeModal />
    </div>
  );
}

export default App;
