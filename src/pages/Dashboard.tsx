import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RSVPStats } from "@/components/dashboard/RSVPStats";
import { CountdownTimer } from "@/components/dashboard/CountdownTimer";
import { TodoList } from "@/components/dashboard/TodoList";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: event, error } = useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      console.log("Fetching events for user:", user?.id);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("created_by", user?.id)
        .order("date", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching event:", error);
        throw error;
      }
      
      console.log("Fetched event data:", data);
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (error) {
    console.error("Error in dashboard:", error);
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600">There was a problem loading your dashboard. Please try again later.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {!event ? (
            <Card className="p-6 lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
              <p className="text-gray-600 mb-4">
                Get started by creating your first event.
              </p>
              <Button onClick={() => navigate("/events/new")}>
                Create New Event
              </Button>
            </Card>
          ) : (
            <>
              <div className="lg:col-span-2 space-y-6">
                <CountdownTimer date={event.date} />
                <TodoList eventId={event.id} />
              </div>
              <div className="space-y-6">
                <RSVPStats eventId={event.id} />
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="space-y-4">
                    <Button className="w-full" onClick={() => navigate("/guests")}>
                      Manage Guests
                    </Button>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => navigate("/events/edit")}
                    >
                      Edit Event
                    </Button>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;