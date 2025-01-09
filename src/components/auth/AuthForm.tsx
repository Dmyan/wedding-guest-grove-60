import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "signin" | "signup";

export const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Auth submission:", { mode, email });
    
    toast({
      title: "Coming Soon",
      description: "Authentication will be implemented with Supabase integration",
    });
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
          />
        </div>
        <Button type="submit" className="w-full bg-secondary hover:bg-secondary-dark text-white">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-secondary-dark hover:underline"
        >
          {mode === "signin"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </Card>
  );
};