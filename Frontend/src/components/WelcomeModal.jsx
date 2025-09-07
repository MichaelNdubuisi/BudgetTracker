import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("hasVisited", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <h2 className="text-xl font-bold text-indigo-200">Welcome to Budget Tracker!</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Close welcome modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 text-gray-300">
          <p>
            Take control of your finances with our intuitive budget tracking app. Here's how to get started:
          </p>

          <div className="space-y-2">
            <h3 className="font-semibold text-indigo-200">Quick Start:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">1.</span>
                <span>Add your income and expenses to track your spending.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">2.</span>
                <span>Set savings goals to stay motivated and on track.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">3.</span>
                <span>View charts and summaries to understand your financial habits.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">4.</span>
                <span>Export your data anytime for backup or analysis.</span>
              </li>
            </ul>
          </div>
          <div className="text-xs text-gray-500 bg-gray-700 p-3 rounded-lg">
            💡 Tip: Use the dark mode toggle for a better viewing experience at night.
          </div>
        </div>

        <button
          onClick={handleClose}
          className="w-full mt-6 bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;
