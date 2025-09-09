import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "w-6 h-6", className = "" }) => {
  return (
    <Loader2 className={`animate-spin ${size} ${className}`} />
  );
};

export default LoadingSpinner;
