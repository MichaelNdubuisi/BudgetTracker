function Footer({ darkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`max-w-5xl mx-auto py-8 px-6 mt-12 border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} fade-in`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          © {currentYear} Budget Tracker. Built for better financial management.
        </div>
        <div className="flex gap-6 text-sm">
          <a
            href="#"
            className={`hover:text-indigo-400 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            onClick={(e) => {
              e.preventDefault();
              alert('Privacy Policy: We respect your privacy and do not share your data.');
            }}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className={`hover:text-indigo-400 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            onClick={(e) => {
              e.preventDefault();
              alert('Terms of Service: Use this app responsibly for personal finance tracking.');
            }}
          >
            Terms of Service
          </a>
          <a
            href="mailto:support@budgettracker.com"
            className={`hover:text-indigo-400 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
