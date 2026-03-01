export default function Button({ children, type = "button", loading = false, disabled, className = "", ...props }) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium
        ${loading || disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-primary-orange hover:bg-primary-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue'}
        transition-colors ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          Processing...
        </div>
      ) : children}
    </button>
  );
}