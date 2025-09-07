import GoalForm from "./GoalForm";
import GoalList from "./GoalList";

function GoalsSection({ goals, onAddGoal, onToggleGoal, darkMode }) {
  return (
    <section className={`md:col-span-2 rounded-xl shadow-lg p-8 flex flex-col card fade-in ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>
        🎯 Goals
      </h2>
      <GoalForm onAdd={onAddGoal} darkMode={darkMode} />
      <div className="mt-6 overflow-y-auto max-h-[320px]">
        <GoalList goals={goals} onToggle={onToggleGoal} darkMode={darkMode} />
      </div>
    </section>
  );
}

export default GoalsSection;
