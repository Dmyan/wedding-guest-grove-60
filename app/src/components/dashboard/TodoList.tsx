import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const TodoList = ({ eventId }: { eventId?: string }) => {
  const [newTask, setNewTask] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("event_id", eventId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!eventId,
  });

  const addTaskMutation = useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ event_id: eventId, title }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", eventId] });
      setNewTask("");
      toast({
        title: "Task added",
        description: "Your task has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { data, error } = await supabase
        .from("tasks")
        .update({ completed })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", eventId] });
    },
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() && eventId) {
      addTaskMutation.mutate(newTask.trim());
    }
  };

  if (!eventId) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Wedding To-Do List</h2>
      
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" disabled={!newTask.trim()}>
          Add
        </Button>
      </form>

      {isLoading ? (
        <div>Loading tasks...</div>
      ) : (
        <div className="space-y-2">
          {tasks?.map((task) => (
            <div key={task.id} className="flex items-center gap-2">
              <Checkbox
                checked={task.completed}
                onCheckedChange={(checked) =>
                  toggleTaskMutation.mutate({
                    id: task.id,
                    completed: checked as boolean,
                  })
                }
              />
              <span className={task.completed ? "line-through text-gray-500" : ""}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};