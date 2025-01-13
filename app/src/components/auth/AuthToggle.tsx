interface AuthToggleProps {
  isSignUp: boolean;
  setIsSignUp: (isSignUp: boolean) => void;
}

export const AuthToggle = ({ isSignUp, setIsSignUp }: AuthToggleProps) => (
  <div className="text-center">
    <button
      type="button"
      onClick={() => setIsSignUp(!isSignUp)}
      className="text-sm text-blue-600 hover:underline"
    >
      {isSignUp
        ? "Already have an account? Sign in"
        : "Don't have an account? Sign up"}
    </button>
  </div>
);