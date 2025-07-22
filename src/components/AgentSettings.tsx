import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const AgentSettings = () => {
  const [temperature, setTemperature] = useState([0.6]);
  const [useVision, setUseVision] = useState(true);

  const llmProviders = [
    "openai",
    "anthropic", 
    "deepseek",
    "google",
    "ollama",
    "azure_openai",
    "mistral",
    "alibaba",
    "moonshot",
    "unbound",
    "siliconflow",
    "ibm"
  ];

  const modelOptions = [
    "gpt-4o",
    "gpt-4",
    "gpt-3.5-turbo",
    "o3-mini"
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LLM Provider */}
          <div className="space-y-2">
            <Label htmlFor="llm-provider">LLM Provider</Label>
            <p className="text-sm text-muted-foreground">Select LLM provider for LLM</p>
            <Select defaultValue="openai">
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {llmProviders.map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* LLM Model Name */}
          <div className="space-y-2">
            <Label htmlFor="llm-model">LLM Model Name</Label>
            <p className="text-sm text-muted-foreground">Select a model in the dropdown options or directly type a custom model name</p>
            <Select defaultValue="gpt-4o">
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* LLM Temperature */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>LLM Temperature</Label>
              <p className="text-sm text-muted-foreground">Controls randomness in model outputs</p>
            </div>
            <div className="space-y-3">
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                max={2}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0</span>
                <span className="font-medium">{temperature[0]}</span>
                <span>2</span>
              </div>
            </div>
          </div>

          {/* Use Vision */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Vision Settings</Label>
              <p className="text-sm text-muted-foreground">Enable Vision(Input highlighted screenshot into LLM)</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="use-vision" 
                checked={useVision}
                onCheckedChange={(checked) => setUseVision(checked === true)}
              />
              <Label htmlFor="use-vision" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Use Vision
              </Label>
            </div>
          </div>

          {/* Base URL */}
          <div className="space-y-2">
            <Label htmlFor="base-url">Base URL</Label>
            <p className="text-sm text-muted-foreground">API endpoint URL (if required)</p>
            <Input 
              id="base-url"
              placeholder="Enter base URL"
              className="w-full"
            />
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <p className="text-sm text-muted-foreground">Your API key (leave blank to use .env)</p>
            <Input 
              id="api-key"
              type="password"
              placeholder="Enter API key"
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};