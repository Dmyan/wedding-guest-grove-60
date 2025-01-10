import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface RSVPFormProps {
  eventId: string;
  guestId: string;
}

export const RSVPForm = ({ eventId, guestId }: RSVPFormProps) => {
  const { toast } = useToast();
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [accessibilityNeeds, setAccessibilityNeeds] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState<"confirmed" | "declined">("confirmed");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log("Submitting RSVP for guest:", guestId);
      const { error } = await supabase
        .from("guests")
        .update({
          rsvp_status: rsvpStatus,
          dietary_preferences: dietaryPreferences,
          accessibility_needs: accessibilityNeeds,
          attendee_count: attendeeCount,
          updated_at: new Date().toISOString(),
        })
        .eq("id", guestId)
        .eq("event_id", eventId);

      if (error) {
        console.error("Error updating RSVP:", error);
        throw error;
      }

      toast({
        title: "RSVP Submitted",
        description: "Thank you for responding to the invitation!",
      });
    } catch (error) {
      console.error("Error in RSVP submission:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your RSVP. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">RSVP Response</h2>
          
          <div className="space-y-2">
            <Label>Will you be attending?</Label>
            <RadioGroup
              value={rsvpStatus}
              onValueChange={(value: "confirmed" | "declined") => setRsvpStatus(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="confirmed" id="confirmed" />
                <Label htmlFor="confirmed">Yes, I'll be there</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="declined" id="declined" />
                <Label htmlFor="declined">No, I can't make it</Label>
              </div>
            </RadioGroup>
          </div>

          {rsvpStatus === "confirmed" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="attendeeCount">Number of Guests</Label>
                <Input
                  id="attendeeCount"
                  type="number"
                  min={1}
                  value={attendeeCount}
                  onChange={(e) => setAttendeeCount(parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary Preferences</Label>
                <Textarea
                  id="dietary"
                  placeholder="Please list any dietary restrictions or preferences"
                  value={dietaryPreferences}
                  onChange={(e) => setDietaryPreferences(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessibility">Accessibility Needs</Label>
                <Textarea
                  id="accessibility"
                  placeholder="Please list any accessibility requirements"
                  value={accessibilityNeeds}
                  onChange={(e) => setAccessibilityNeeds(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <Button type="submit" className="w-full">
          Submit RSVP
        </Button>
      </form>
    </Card>
  );
};