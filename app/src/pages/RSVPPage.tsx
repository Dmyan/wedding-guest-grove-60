import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RSVPForm } from "@/components/rsvp/RSVPForm";
import { Card } from "@/components/ui/card";

export const RSVPPage = () => {
  const { eventId, guestId } = useParams();
  
  const { data: event, isLoading: eventLoading } = useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      console.log("Fetching event details:", eventId);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
        throw error;
      }

      return data;
    },
    enabled: !!eventId,
  });

  const { data: guest, isLoading: guestLoading } = useQuery({
    queryKey: ["guest", guestId],
    queryFn: async () => {
      console.log("Fetching guest details:", guestId);
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("id", guestId)
        .eq("event_id", eventId)
        .single();

      if (error) {
        console.error("Error fetching guest:", error);
        throw error;
      }

      return data;
    },
    enabled: !!guestId && !!eventId,
  });

  if (eventLoading || guestLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-6">
          <p className="text-gray-600">Loading...</p>
        </Card>
      </div>
    );
  }

  if (!event || !guest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Invalid RSVP Link</h2>
          <p className="text-gray-600">This RSVP link appears to be invalid or expired.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-2">
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-600">{event.location}</p>
          {event.description && (
            <p className="mt-4 text-gray-600">{event.description}</p>
          )}
        </Card>

        <RSVPForm eventId={eventId!} guestId={guestId!} />
      </div>
    </div>
  );
};