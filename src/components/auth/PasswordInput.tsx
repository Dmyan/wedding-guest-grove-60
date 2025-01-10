import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

export const PasswordInput = ({ password, setPassword }: PasswordInputProps) => (
  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      className="w-full"
    />
  </div>
);