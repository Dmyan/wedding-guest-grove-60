import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

type AuthMode = "signin" | "signup";

const getErrorMessage = (error: AuthError) => {
  if (error instanceof AuthApiError) {
    switch (error.status) {
      case 400:
        if (error.message.includes("Invalid login credentials")) {
          return "Invalid email or password. Please check your credentials and try again.";
        }
        return error.message;
      case 422:
        return "Invalid email format. Please enter a valid email address.";
      case 429:
        return "Too many attempts. Please try again later.";
      default:
        return error.message;
    }
  }
  return "An unexpected error occurred. Please try again.";
};

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === "signin") {
        const result = await signIn(email, password);
        if (result?.error) throw result.error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else {
        const result = await signUp(email, password);
        if (result?.error) throw result.error;
        
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link to complete your registration.",
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      const errorMessage = error instanceof AuthError 
        ? getErrorMessage(error)
        : "An unexpected error occurred. Please try again.";
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-600">
          {mode === "signin"
            ? "Sign in to manage your wedding"
            : "Sign up to start planning your special day"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
            disabled={loading}
            minLength={6}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-secondary hover:bg-secondary-dark text-white"
          disabled={loading}
        >
          {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-secondary-dark hover:underline"
          disabled={loading}
        >
          {mode === "signin"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </Card>
  );
};