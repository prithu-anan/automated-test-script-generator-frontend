
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Settings, Play } from "lucide-react";
import { AgentSettings } from "./AgentSettings";
import { BrowserSettings } from "./BrowserSettings";
import { RunAgent } from "./RunAgent";
import { ApiDocumentation } from "./ApiDocumentation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const TestScriptGenerator = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
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

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground py-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-warning">
                  <span>🚀</span>
                  Use via API
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[66vw] max-w-none">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <span>🚀</span>
                    API Documentation
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ApiDocumentation />
                </div>
              </SheetContent>
            </Sheet>

            <span>Built with Gradio 😊</span>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[66vw] max-w-none">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Display Theme */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Display Theme</Label>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        ☀️ Light
                      </Button>
                      <Button variant="default" size="sm" className="flex items-center gap-2">
                        🌙 Dark
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        💻 System
                      </Button>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Progressive Web App */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Progressive Web App</Label>
                    <p className="text-sm text-muted-foreground">
                      Progressive Web App is not enabled for this app. To enable it, start your Gradio app with launch(pwa=True).
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </footer>
      </div>
    </div>
  );
};
