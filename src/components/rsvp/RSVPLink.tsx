import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

interface RSVPLinkProps {
  eventId: string;
  guestId: string;
}

export const RSVPLink = ({ eventId, guestId }: RSVPLinkProps) => {
  const [copied, setCopied] = useState(false);
  const rsvpLink = `${window.location.origin}/rsvp/${eventId}/${guestId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(rsvpLink);
      setCopied(true);
      toast({
        title: "Link Copied",
        description: "RSVP link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying link:", error);
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Input value={rsvpLink} readOnly className="flex-1" />
      <Button
        variant="outline"
        size="icon"
        onClick={copyLink}
        className={copied ? "bg-green-100" : ""}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};