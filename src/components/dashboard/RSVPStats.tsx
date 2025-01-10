import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { toast } from "@/hooks/use-toast";

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

export const RSVPStats = ({ eventId }: { eventId?: string }) => {
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ["rsvp-stats", eventId],
    queryFn: async () => {
      const { data: confirmed } = await supabase
        .from("guests")
        .select("id")
        .eq("rsvp_status", "confirmed")
        .eq("event_id", eventId);

      const { data: pending } = await supabase
        .from("guests")
        .select("id")
        .eq("rsvp_status", "pending")
        .eq("event_id", eventId);

      const { data: declined } = await supabase
        .from("guests")
        .select("id")
        .eq("rsvp_status", "declined")
        .eq("event_id", eventId);

      return [
        { name: "Confirmed", value: confirmed?.length || 0 },
        { name: "Pending", value: pending?.length || 0 },
        { name: "Declined", value: declined?.length || 0 },
      ];
    },
    enabled: !!eventId,
  });

  useEffect(() => {
    if (!eventId) return;

    const channel = supabase
      .channel('guests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'guests',
          filter: `event_id=eq.${eventId}`,
        },
        async (payload) => {
          console.log('RSVP update received:', payload);
          await refetch();
          
          // Show toast notification for RSVP updates
          if (payload.eventType === 'UPDATE') {
            toast({
              title: "RSVP Update",
              description: "A guest has updated their RSVP status",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId, refetch]);

  if (isLoading) {
    return <div>Loading stats...</div>;
  }

  if (!stats || !eventId) {
    return <div>No RSVP data available</div>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">RSVP Statistics</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={stats}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {stats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};