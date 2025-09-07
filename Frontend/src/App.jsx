import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Summary from "./components/Summary";
import CategoryPieChart from "./components/CategoryPieChart";
import TransactionForm from "./components/TransactionForm";
import GoalsSection from "./components/GoalsSection";
import WeeklyStats from "./components/WeeklyStats";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const [goals, setGoals] = useState(() => {
    const stored = localStorage.getItem("goals");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // State variables moved to TransactionForm component

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

  const handleAddTransaction = (transaction) => {
    setTransactions([
      ...transactions,
      { id: Date.now(), ...transaction },
    ]);
  };

  const handleAddGoal = (goal) => setGoals([goal, ...goals]);
  const toggleGoal = (id) =>
    setGoals(
      goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );

  // Removed handleExportData from App.jsx as it will be passed to Header component




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
