import React from "react";
import { TaskForm } from "./TaskForm";
import { useTask } from "@/contexts/TaskContext";
import { useNavigate } from "react-router-dom";

export const RunAgent = () => {
  const { selectedTaskId } = useTask();
  const navigate = useNavigate();

  const handleBackToTasks = () => {
    navigate("/");
  };

  if (!selectedTaskId) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No task selected. Please select a task first.</p>
      </div>
    );
  }

  return <TaskForm taskId={selectedTaskId} onBack={handleBackToTasks} />;
};