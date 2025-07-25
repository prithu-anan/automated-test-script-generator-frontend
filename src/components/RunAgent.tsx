import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Square, Pause, Eraser, FileText, Send, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { createTask, TaskCreate } from "@/utils/tasks-api";

export const RunAgent = () => {
  const [taskName, setTaskName] = useState("Navigate to Tech Roles section");
  const [instruction, setInstruction] = useState("go to https://www.hackerrank.com/blog/ and perform the following test case");
  const [description, setDescription] = useState("User navigates to the 'Tech Roles' section from the main blog page.");
  const [searchInput, setSearchInput] = useState("N/A");
  const [action, setAction] = useState("Click on the 'Tech Roles' link in the navigation bar");
  const [expectedOutcome, setExpectedOutcome] = useState("The user is taken to the 'Tech Roles' section of the blog.");
  const [expectedStatus, setExpectedStatus] = useState("Successful");
  const [userInput, setUserInput] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { getSettingsForAPI } = useSettings();

  const handleSubmitTask = async () => {
    if (!taskName.trim() || !instruction.trim()) {
      setShowWarning(true);
      return;
    }
    
    setShowWarning(false);
    setSubmitError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      const taskData: TaskCreate = {
        task_name: taskName,
        instruction: instruction,
        description: description,
        search_input_input: searchInput,
        search_input_action: action,
        expected_outcome: expectedOutcome,
        expected_status: expectedStatus,
      };

      const settings = getSettingsForAPI();
      const result = await createTask(taskData, settings);

      if (result.error) {
        setSubmitError(result.error);
      } else {
        setSubmitSuccess(true);
        // Reset form or show success message
        console.log("Task created successfully:", result);
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred while submitting the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Agent Interaction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-2 h-2 bg-muted rounded-full"></span>
            Agent Interaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
            <p className="text-muted-foreground">Agent interaction will appear here</p>
          </div>
        </CardContent>
      </Card>

      {/* User Input */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <Label htmlFor="user-input">User Input</Label>
            <Input 
              id="user-input"
              placeholder="Enter your next task..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Test Case Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Test Case Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="task-name">Task Name</Label>
            <Input 
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          {/* Instruction */}
          <div className="space-y-2">
            <Label htmlFor="instruction">Instruction</Label>
            <Textarea 
              id="instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              rows={3}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Input Parameters Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Input Parameters</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Input */}
              <div className="space-y-2">
                <Label htmlFor="search-input">Search Input</Label>
                <Input 
                  id="search-input"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              {/* Action */}
              <div className="space-y-2">
                <Label htmlFor="action">Action</Label>
                <Input 
                  id="action"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Expected Results Section */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Expected Results</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Expected Outcome */}
              <div className="space-y-2">
                <Label htmlFor="expected-outcome">Expected Outcome</Label>
                <Textarea 
                  id="expected-outcome"
                  value={expectedOutcome}
                  onChange={(e) => setExpectedOutcome(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Expected Status */}
              <div className="space-y-2">
                <Label htmlFor="expected-status">Expected Status</Label>
                <Input 
                  id="expected-status"
                  value={expectedStatus}
                  onChange={(e) => setExpectedStatus(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success/Error Messages */}
      {submitSuccess && (
        <Alert>
          <AlertDescription>
            Task submitted successfully! The task has been created with your current settings.
          </AlertDescription>
        </Alert>
      )}

      {submitError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {submitError}
          </AlertDescription>
        </Alert>
      )}

      {/* Warning Alert */}
      {showWarning && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please enter at least a task name and instruction.
          </AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-5 gap-4 w-full">
        <Button variant="outline" size="default" className="flex items-center gap-2 bg-muted/50 border-muted-foreground/20 text-muted-foreground hover:bg-muted h-12">
          <Square className="w-4 h-4" />
          Stop
        </Button>
        <Button variant="outline" size="default" className="flex items-center gap-2 bg-muted/50 border-muted-foreground/20 text-muted-foreground hover:bg-muted h-12">
          <Pause className="w-4 h-4" />
          Pause
        </Button>
        <Button variant="outline" size="default" className="flex items-center gap-2 bg-muted/50 border-muted-foreground/20 text-muted-foreground hover:bg-muted h-12">
          <Eraser className="w-4 h-4" />
          Clear
        </Button>
        <Button variant="outline" size="default" className="flex items-center gap-2 bg-muted/50 border-muted-foreground/20 text-muted-foreground hover:bg-muted h-12">
          <FileText className="w-4 h-4" />
          Create Script
        </Button>
        <Button 
          onClick={handleSubmitTask} 
          size="default"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? 'Submitting...' : 'Submit Task'}
        </Button>
      </div>

      {/* Task Outputs */}
      <Card>
        <CardHeader>
          <CardTitle>Task Outputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Agent History JSON */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <Label>Agent History JSON</Label>
            </div>
            <div className="h-32 bg-muted/20 rounded border flex items-center justify-center">
              <p className="text-muted-foreground">No history available</p>
            </div>
          </div>

          {/* Task Recording GIF */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <Label>Task Recording GIF</Label>
            </div>
            <div className="h-32 bg-muted/20 rounded border flex items-center justify-center">
              <p className="text-muted-foreground">No recording available</p>
            </div>
          </div>

          {/* Download Script */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <Label>Download Script</Label>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded border">
              <span className="text-sm">script.py</span>
              <span className="text-xs text-primary">7.2 KB ↓</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};