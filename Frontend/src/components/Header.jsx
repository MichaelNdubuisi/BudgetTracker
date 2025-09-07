import { Sun, Moon } from "lucide-react";

function Header({ darkMode, setDarkMode}) {
  return (
    <header className="max-w-5xl mx-auto py-8 px-6 flex justify-between items-center">
      <div>
        <h1 className={`text-4xl font-extrabold tracking-tight ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
          Budget Planner
        </h1>
        <p className={`mt-1 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`}>
          Track your finances & reach your goals
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 focus:ring-indigo-500' : 'bg-gray-200 hover:bg-gray-300 focus:ring-indigo-600'}`}
        >
          {darkMode ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
