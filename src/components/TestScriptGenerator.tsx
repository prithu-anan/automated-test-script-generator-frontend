import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Settings, Play } from "lucide-react";
import { AgentSettings } from "./AgentSettings";
import { BrowserSettings } from "./BrowserSettings";
import { RunAgent } from "./RunAgent";
import { SettingsDialog } from "./SettingsDialog";
import { ApiDocumentation } from "./ApiDocumentation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const TestScriptGenerator = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isApiOpen, setIsApiOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Automated Test Script Generator</h1>
          </div>
          <p className="text-muted-foreground">Generate test scripts for your web applications</p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="agent-settings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="agent-settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Agent Settings
            </TabsTrigger>
            <TabsTrigger value="browser-settings" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Browser Settings
            </TabsTrigger>
            <TabsTrigger value="run-agent" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Run Agent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agent-settings">
            <AgentSettings />
          </TabsContent>

          <TabsContent value="browser-settings">
            <BrowserSettings />
          </TabsContent>

          <TabsContent value="run-agent">
            <RunAgent />
          </TabsContent>
        </Tabs>

        {/* Footer with collapsible sections */}
        <div className="mt-8 space-y-4">
          <Collapsible open={isApiOpen} onOpenChange={setIsApiOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-warning">
                <span>🚀</span>
                Use via API
                <ChevronDown className={`w-4 h-4 transition-transform ${isApiOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ApiDocumentation />
            </CollapsibleContent>
          </Collapsible>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Built with Gradio 😊</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      </div>
    </div>
  );
};