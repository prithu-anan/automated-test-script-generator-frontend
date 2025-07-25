import React from "react";
import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";
import { useTask } from "@/contexts/TaskContext";
import { useSettings } from "@/contexts/SettingsContext";

export const RunAgent = () => {
  const { selectedTaskId, setSelectedTaskId } = useTask();
  const { updateAgentSettings, updateBrowserSettings } = useSettings();

  const handleTaskSelect = (taskId: number) => {
    setSelectedTaskId(taskId);
  };

  const handleBackToTasks = () => {
    setSelectedTaskId(null);
    
    // Reset global settings to defaults when going back to task list
    updateAgentSettings({
      llmProvider: "openai",
      llmModel: "gpt-4o",
      temperature: 0.6,
      ollamaContextLength: 16000,
      baseUrl: "",
      apiKey: "",
    });

    updateBrowserSettings({
      headlessMode: true,
      disableSecurity: true,
      windowWidth: 1280,
      windowHeight: 720,
    });
  };

  if (selectedTaskId) {
    return <TaskForm taskId={selectedTaskId} onBack={handleBackToTasks} />;
  }

  return <TaskList onTaskSelect={handleTaskSelect} />;
};