import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";

export const ApiDocumentation = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const pythonCode = `from gradio_client import Client

client = Client("http://localhost:7788/")
result = client.predict(
    x="openai",
    api_name="/lambda"
)
print(result)`;

  const javascriptCode = `import { client } from "@gradio/client";

const app = await client("http://localhost:7788/");
const result = await app.predict("/lambda", {
    x: "openai",
});

console.log(result.data);`;

  const bashCode = `curl -X POST \\
  http://localhost:7788/call/lambda \\
  -H "Content-Type: application/json" \\
  -d '{"data":["openai"]}'`;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🚀</span>
          API documentation
          <span className="text-sm text-muted-foreground">http://localhost:7788/</span>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary">🔴 API Recorder</Badge>
            <Badge variant="outline">11 API endpoints</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Choose a language to see the code snippets for interacting with the API.
        </p>

        {/* Language Tabs */}
        <div className="flex gap-2">
          <Badge variant="default">🐍 Python</Badge>
          <Badge variant="outline">📋 Javascript</Badge>
          <Badge variant="outline">🔧 Bash</Badge>
        </div>

        {/* Installation */}
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">1. Install the Python client</span> (
            <a href="#" className="text-primary underline">docs</a>
            ) if you don't already have it installed.
          </p>
          <div className="relative">
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              <code>$ pip install gradio_client</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard("pip install gradio_client")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* API Usage */}
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">2. Find the API endpoint below</span> corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data. Or use the{" "}
            <Badge variant="outline">🔴 API Recorder</Badge> to automatically generate your API requests.
          </p>
        </div>

        {/* API Endpoint Example */}
        <div className="space-y-4">
          <div className="border rounded p-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">api_name:</span>
              <Badge variant="secondary">/lambda</Badge>
            </div>

            <div className="relative">
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code>{pythonCode}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(pythonCode)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">→ Accepts 1 parameter:</span>
              </div>
              <div className="pl-4 space-y-1 text-sm">
                <div>
                  <Badge variant="outline" className="mr-2">x</Badge>
                  <code className="text-xs bg-muted px-1 rounded">
                    [Literal['anthropic', 'openai', 'deepseek', 'google', 'ollama', 'azure_openai', 'mistral', 'alibaba', 'moonshot', 'unbound', 'siliconflow', 'ibm']]
                  </code>
                  <span className="text-muted-foreground ml-2">Default: *openai*</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  The input value that is provided in the "LLM Provider" Dropdown component.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">→ Returns 1 element</span>
              </div>
              <div className="pl-4 space-y-1 text-sm">
                <div>
                  <Badge variant="outline">float</Badge>
                </div>
                <p className="text-muted-foreground text-xs">
                  The output value that appears in the "Ollama Context Length" Slider component.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};