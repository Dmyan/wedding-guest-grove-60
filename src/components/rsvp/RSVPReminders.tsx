import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RSVPRemindersProps {
  eventId: string;
}

export const RSVPReminders = ({ eventId }: RSVPRemindersProps) => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: pendingGuests } = useQuery({
    queryKey: ["pending-guests", eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guests")
        .select("id")
        .eq("event_id", eventId)
        .eq("rsvp_status", "pending");

      if (error) throw error;
      return data;
    },
  });

  const handleSendReminders = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Sending reminders to", pendingGuests?.length, "guests");

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          event_id: eventId,
          pending_count: pendingGuests?.length || 0,
          timestamp: new Date().toISOString(),
        }),
      });

      toast({
        title: "Reminders Sent",
        description: `Reminder request sent for ${pendingGuests?.length} pending guests. Check your Zap's history to confirm.`,
      });
    } catch (error) {
      console.error("Error sending reminders:", error);
      toast({
        title: "Error",
        description: "Failed to send reminders. Please check the webhook URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">RSVP Reminders</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="webhook">Zapier Webhook URL</Label>
          <Input
            id="webhook"
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="Enter your Zapier webhook URL"
            className="mt-1"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {pendingGuests?.length || 0} guests pending response
          </p>
          <Button 
            onClick={handleSendReminders} 
            disabled={isLoading || !webhookUrl}
          >
            {isLoading ? "Sending..." : "Send Reminders"}
          </Button>
        </div>
      </div>
    </Card>
  );
};