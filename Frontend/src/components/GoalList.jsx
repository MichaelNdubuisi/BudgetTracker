import { useState, useEffect } from "react";

function GoalList({ goals, onToggle, darkMode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      // Simulate error boundary by catching rendering errors
      if (!Array.isArray(goals)) {
        throw new Error("Goals prop is not an array");
      }
      setHasError(false);
    } catch (error) {
      setHasError(true);
      console.error("Error in GoalList component:", error);
    }
  }, [goals]);

  if (hasError) {
    return (
      <div role="alert" className={`p-4 rounded bg-red-100 text-red-700 ${darkMode ? 'bg-red-900 text-red-300' : ''}`}>
        An error occurred while displaying goals. Please try again later.
      </div>
    );
  }

  if (goals.length === 0) return <p className={`text-center italic mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No goals added yet.</p>;

  return (
    <ul className="space-y-3" role="list" aria-label="Financial goals list">
      {goals.map(goal => (
        <li
          key={goal.id}
          className={`flex justify-between items-center rounded-lg p-4 border ${
            goal.completed
              ? darkMode
                ? "bg-green-900 border-green-700 line-through text-gray-400"
                : "bg-green-100 border-green-300 line-through text-gray-600"
              : darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-300 text-gray-900"
          }`}
          role="listitem"
        >
          <div>
            <p className="text-lg font-semibold">{goal.title}</p>
            <p className={`text-sm ${darkMode ? 'opacity-70' : 'text-gray-600'}`}>
              Target: ₦{goal.target ? goal.target.toLocaleString() : '0'} — Due: {goal.due ? new Date(goal.due).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <input
            type="checkbox"
            checked={goal.completed}
            onChange={() => onToggle(goal.id)}
            className={`w-5 h-5 rounded cursor-pointer ${darkMode ? 'border-gray-400' : 'border-gray-300'}`}
            aria-label={`Mark goal "${goal.title}" as ${goal.completed ? 'incomplete' : 'completed'}`}
            title="Mark as completed"
          />
        </li>
      ))}
    </ul>
  );
}

export default GoalList;
