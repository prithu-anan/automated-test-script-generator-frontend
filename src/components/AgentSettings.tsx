import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2, Save } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { useTask } from "@/contexts/TaskContext";
import { updateAgentSettings as updateAgentSettingsAPI, AgentSettings as AgentSettingsType } from "@/utils/tasks-api";

export const AgentSettings = () => {
  const { settings, updateAgentSettings } = useSettings();
  const { selectedTaskId } = useTask();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // const llmProviders = [
  //   "anthropic",
  //   "openai", 
  //   "deepseek",
  //   "google",
  //   "ollama",
  //   "azure_openai",
  //   "mistral",
  //   "alibaba",
  //   "moonshot",
  //   "unbound",
  //   "siliconflow",
  //   "ibm"
  // ];

  const llmProviders = [
    "openai", 
    "ollama",
  ];

  // Model options for each provider (matching the original config)
  const modelOptions = {
    "anthropic": ["claude-3-5-sonnet-20241022", "claude-3-5-sonnet-20240620", "claude-3-opus-20240229"],
    "openai": ["gpt-4o", "gpt-4o-mini"],
    "deepseek": ["deepseek-chat", "deepseek-reasoner"],
    "google": ["gemini-2.0-flash", "gemini-2.0-flash-thinking-exp", "gemini-1.5-flash-latest", "gemini-1.5-flash-8b-latest", "gemini-2.0-flash-thinking-exp-01-21", "gemini-2.0-pro-exp-02-05", "gemini-2.5-pro-preview-03-25", "gemini-2.5-flash-preview-04-17"],
    "ollama": ["qwen2.5:7b", "qwen2.5:14b", "qwen2.5:32b", "qwen2.5-coder:14b", "qwen2.5-coder:32b", "llama2:7b", "deepseek-r1:14b", "deepseek-r1:32b"],
    "azure_openai": ["gpt-4o", "gpt-4", "gpt-3.5-turbo"],
    "mistral": ["pixtral-large-latest", "mistral-large-latest", "mistral-small-latest", "ministral-8b-latest"],
    "alibaba": ["qwen-plus", "qwen-max", "qwen-vl-max", "qwen-vl-plus", "qwen-turbo", "qwen-long"],
    "moonshot": ["moonshot-v1-32k-vision-preview", "moonshot-v1-8k-vision-preview"],
    "unbound": ["gemini-2.0-flash", "gpt-4o-mini", "gpt-4o", "gpt-4.5-preview"],
    "siliconflow": ["deepseek-ai/DeepSeek-R1", "deepseek-ai/DeepSeek-V3", "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B", "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B", "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B", "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B", "deepseek-ai/DeepSeek-V2.5", "deepseek-ai/deepseek-vl2", "Qwen/Qwen2.5-72B-Instruct-128K", "Qwen/Qwen2.5-72B-Instruct", "Qwen/Qwen2.5-32B-Instruct", "Qwen/Qwen2.5-14B-Instruct", "Qwen/Qwen2.5-7B-Instruct", "Qwen/Qwen2.5-Coder-32B-Instruct", "Qwen/Qwen2.5-Coder-7B-Instruct", "Qwen/Qwen2-7B-Instruct", "Qwen/Qwen2-1.5B-Instruct", "Qwen/QwQ-32B-Preview", "Qwen/Qwen2-VL-72B-Instruct", "Qwen/Qwen2.5-VL-32B-Instruct", "Qwen/Qwen2.5-VL-72B-Instruct", "TeleAI/TeleChat2", "THUDM/glm-4-9b-chat", "Vendor-A/Qwen/Qwen2.5-72B-Instruct", "internlm/internlm2_5-7b-chat", "internlm/internlm2_5-20b-chat", "Pro/Qwen/Qwen2.5-7B-Instruct", "Pro/Qwen/Qwen2-7B-Instruct", "Pro/Qwen/Qwen2-1.5B-Instruct", "Pro/THUDM/chatglm3-6b", "Pro/THUDM/glm-4-9b-chat"],
    "ibm": ["ibm/granite-vision-3.1-2b-preview", "meta-llama/llama-4-maverick-17b-128e-instruct-fp8", "meta-llama/llama-3-2-90b-vision-instruct"]
  };

  const currentModels = modelOptions[settings.agent.llmProvider as keyof typeof modelOptions] || [];

  const handleSaveSettings = async () => {
    if (!selectedTaskId) {
      setError("No task selected. Please select a task first.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const agentSettings: AgentSettingsType = {
        llm_provider: settings.agent.llmProvider,
        llm_model: settings.agent.llmModel,
        temperature: settings.agent.temperature,
        context_length: settings.agent.ollamaContextLength || 16000,
        base_url: settings.agent.baseUrl,
        api_key: settings.agent.apiKey,
      };

      const result = await updateAgentSettingsAPI(selectedTaskId, agentSettings);

      if ('error' in result) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError("Failed to save agent settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Agent Settings
          {selectedTaskId && (
            <Button 
              onClick={handleSaveSettings}
              disabled={saving}
              size="sm"
              className="flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Settings
                </>
              )}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Success/Error Messages */}
        {success && (
          <Alert className="mb-4 border-teal-500 text-teal-700 dark:text-teal-300 dark:border-teal-400">
            <AlertDescription>
              Agent settings saved successfully!
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* First Row - LLM Provider and Model Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LLM Provider */}
            <div className="space-y-2">
              <Label htmlFor="llm-provider">LLM Provider</Label>
              <p className="text-sm text-muted-foreground">Select LLM provider for LLM</p>
              <Select 
                value={settings.agent.llmProvider}
                onValueChange={(value) => {
                  updateAgentSettings({ llmProvider: value });
                  // Reset model to first option of new provider
                  const newModels = modelOptions[value as keyof typeof modelOptions] || [];
                  if (newModels.length > 0) {
                    updateAgentSettings({ llmModel: newModels[0] });
                  }
                }}
              >
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
              <Select 
                value={settings.agent.llmModel}
                onValueChange={(value) => updateAgentSettings({ llmModel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {currentModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Second Row - Temperature and Vision Settings with equal width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LLM Temperature */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>LLM Temperature</Label>
                <p className="text-sm text-muted-foreground">Controls randomness in model outputs</p>
              </div>
              <div className="space-y-3">
                <Slider
                  value={[settings.agent.temperature]}
                  onValueChange={(value) => updateAgentSettings({ temperature: value[0] })}
                  max={2}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0</span>
                  <span className="font-medium">{settings.agent.temperature}</span>
                  <span>2</span>
                </div>
              </div>
            </div>

            {/* Use Vision */}
            {/* <div className="space-y-4">
              <div className="space-y-2">
                <Label>Vision Settings</Label>
                <p className="text-sm text-muted-foreground">Enable Vision(Input highlighted screenshot into LLM)</p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="use-vision" 
                  checked={settings.agent.useVision}
                  onCheckedChange={(checked) => updateAgentSettings({ useVision: checked === true })}
                />
                <Label htmlFor="use-vision" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Use Vision
                </Label>
              </div>
            </div> */}
          </div>

          {/* Third Row - Ollama Context Length (only for Ollama) */}
          {settings.agent.llmProvider === "ollama" && (
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Ollama Context Length</Label>
                  <p className="text-sm text-muted-foreground">Controls max context length model needs to handle (less = faster)</p>
                </div>
                <div className="space-y-3">
                  <Slider
                    value={[settings.agent.ollamaContextLength || 16000]}
                    onValueChange={(value) => updateAgentSettings({ ollamaContextLength: value[0] })}
                    max={65536}
                    min={256}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>256</span>
                    <span className="font-medium">{settings.agent.ollamaContextLength || 16000}</span>
                    <span>65536</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fourth Row - Base URL and API Key */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Base URL */}
            <div className="space-y-2">
              <Label htmlFor="base-url">Base URL</Label>
              <p className="text-sm text-muted-foreground">API endpoint URL (if required)</p>
              <Input 
                id="base-url"
                value={settings.agent.baseUrl}
                onChange={(e) => updateAgentSettings({ baseUrl: e.target.value })}
                placeholder="Enter base URL"
              />
            </div>

            {/* API Key */}
            {/* <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <p className="text-sm text-muted-foreground">Your API key (leave blank to use .env)</p>
              <Input 
                id="api-key"
                type="password"
                value={settings.agent.apiKey}
                onChange={(e) => updateAgentSettings({ apiKey: e.target.value })}
                placeholder="Enter API key"
              />
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};