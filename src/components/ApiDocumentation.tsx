
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ApiDocumentation = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<"python" | "javascript" | "bash">("python");
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const apiEndpoints = [
    {
      name: "/lambda",
      description: "LLM Provider selection endpoint",
      parameter: {
        name: "x",
        type: "[Literal['anthropic', 'openai', 'deepseek', 'google', 'ollama', 'azure_openai', 'mistral', 'alibaba', 'moonshot', 'unbound', 'siliconflow', 'ibm']]",
        default: "openai",
        description: "The input value that is provided in the \"LLM Provider\" Dropdown component."
      },
      returns: {
        type: "float",
        description: "The output value that appears in the \"Ollama Context Length\" Slider component."
      },
      python: `from gradio_client import Client

client = Client("http://localhost:7788/")
result = client.predict(
    x="openai",
    api_name="/lambda"
)
print(result)`,
      javascript: `import { client } from "@gradio/client";

const app = await client("http://localhost:7788/");
const result = await app.predict("/lambda", {
    x: "openai",
});

console.log(result.data);`,
      bash: `curl -X POST \\
  http://localhost:7788/call/lambda \\
  -H "Content-Type: application/json" \\
  -d '{"data":["openai"]}'`
    },
    {
      name: "/predict",
      description: "Test prediction endpoint",
      parameter: {
        name: "input_text",
        type: "str",
        default: "",
        description: "The input text for test prediction."
      },
      returns: {
        type: "str",
        description: "The predicted output text."
      },
      python: `from gradio_client import Client

client = Client("http://localhost:7788/")
result = client.predict(
    input_text="Hello world",
    api_name="/predict"
)
print(result)`,
      javascript: `import { client } from "@gradio/client";

const app = await client("http://localhost:7788/");
const result = await app.predict("/predict", {
    input_text: "Hello world",
});

console.log(result.data);`,
      bash: `curl -X POST \\
  http://localhost:7788/call/predict \\
  -H "Content-Type: application/json" \\
  -d '{"data":["Hello world"]}'`
    },
    {
      name: "/generate_script",
      description: "Generate test script endpoint",
      parameter: {
        name: "task_description",
        type: "str",
        default: "",
        description: "Description of the test task to generate script for."
      },
      returns: {
        type: "str",
        description: "Generated test script code."
      },
      python: `from gradio_client import Client

client = Client("http://localhost:7788/")
result = client.predict(
    task_description="Login test automation",
    api_name="/generate_script"
)
print(result)`,
      javascript: `import { client } from "@gradio/client";

const app = await client("http://localhost:7788/");
const result = await app.predict("/generate_script", {
    task_description: "Login test automation",
});

console.log(result.data);`,
      bash: `curl -X POST \\
  http://localhost:7788/call/generate_script \\
  -H "Content-Type: application/json" \\
  -d '{"data":["Login test automation"]}'`
    },
    {
      name: "/upload_file",
      description: "File upload endpoint",
      parameter: {
        name: "file",
        type: "file",
        default: "None",
        description: "File to upload for processing."
      },
      returns: {
        type: "str",
        description: "Processing result of the uploaded file."
      },
      python: `from gradio_client import Client

client = Client("http://localhost:7788/")
result = client.predict(
    file="path/to/your/file.txt",
    api_name="/upload_file"
)
print(result)`,
      javascript: `import { client } from "@gradio/client";

const app = await client("http://localhost:7788/");
const result = await app.predict("/upload_file", {
    file: file_object,
});

console.log(result.data);`,
      bash: `curl -X POST \\
  http://localhost:7788/call/upload_file \\
  -H "Content-Type: multipart/form-data" \\
  -F "data=@path/to/your/file.txt"`
    },
    {
      name: "/browser_config",
      description: "Browser configuration endpoint",
      parameter: {
        name: "config",
        type: "dict",
        default: "{}",
        description: "Browser configuration settings."
      },
      returns: {
        type: "dict",
        description: "Updated browser configuration."
      },
      python: `from gradio_client import Client

client = Client("http://localhost:7788/")
result = client.predict(
    config={"headless": True, "width": 1920, "height": 1080},
    api_name="/browser_config"
)
print(result)`,
      javascript: `import { client } from "@gradio/client";

const app = await client("http://localhost:7788/");
const result = await app.predict("/browser_config", {
    config: {"headless": true, "width": 1920, "height": 1080},
});

console.log(result.data);`,
      bash: `curl -X POST \\
  http://localhost:7788/call/browser_config \\
  -H "Content-Type: application/json" \\
  -d '{"data":[{"headless": true, "width": 1920, "height": 1080}]}'`
    },
    {
      name: "/run_test",
      description: "Execute test script endpoint",
      parameter: {
        name: "script_content",
        type: "str",
        default: "",
        description: "Test script content to execute."
      },
      returns: {
        type: "dict",
        description: "Test execution results and logs."
      },
      python: `from gradio_client import Client

client = Client("http://localhost:7788/")
result = client.predict(
    script_content="selenium test script here",
    api_name="/run_test"
)
print(result)`,
      javascript: `import { client } from "@gradio/client";

const app = await client("http://localhost:7788/");
const result = await app.predict("/run_test", {
    script_content: "selenium test script here",
});

console.log(result.data);`,
      bash: `curl -X POST \\
  http://localhost:7788/call/run_test \\
  -H "Content-Type: application/json" \\
  -d '{"data":["selenium test script here"]}'`
    }
  ];

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] w-full">
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🚀</span>
            API documentation
            <span className="text-sm text-muted-foreground">http://localhost:7788/</span>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="secondary">🔴 API Recorder</Badge>
              <Badge variant="outline">{apiEndpoints.length} API endpoints</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Choose a language to see the code snippets for interacting with the API.
          </p>

          {/* Language Tabs */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={selectedLanguage === "python" ? "default" : "outline"}
              onClick={() => setSelectedLanguage("python")}
              className="flex items-center gap-1"
            >
              🐍 Python
            </Button>
            <Button
              size="sm"
              variant={selectedLanguage === "javascript" ? "default" : "outline"}
              onClick={() => setSelectedLanguage("javascript")}
              className="flex items-center gap-1"
            >
              📋 Javascript
            </Button>
            <Button
              size="sm"
              variant={selectedLanguage === "bash" ? "default" : "outline"}
              onClick={() => setSelectedLanguage("bash")}
              className="flex items-center gap-1"
            >
              🔧 Bash
            </Button>
          </div>

          {/* Installation */}
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">
                1. {selectedLanguage === "python" && "Install the Python client"}
                {selectedLanguage === "javascript" && "Install the Javascript client"}
                {selectedLanguage === "bash" && "Confirm that you have cURL installed on your system."}
              </span>{" "}
              {selectedLanguage !== "bash" && (
                <>
                  (<a href="#" className="text-primary underline">docs</a>)
                  {selectedLanguage === "python" ? " if you don't already have it installed." : " if you don't already have it installed."}
                </>
              )}
            </p>
            <div className="relative">
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                <code>
                  {selectedLanguage === "python" && "$ pip install gradio_client"}
                  {selectedLanguage === "javascript" && "$ npm install @gradio/client"}
                  {selectedLanguage === "bash" && "$ curl --version"}
                </code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => {
                  const installCmd = selectedLanguage === "python" ? "pip install gradio_client" :
                                   selectedLanguage === "javascript" ? "npm install @gradio/client" :
                                   "curl --version";
                  copyToClipboard(installCmd);
                }}
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

          {/* API Endpoints */}
          <div className="space-y-6">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="border rounded p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">api_name:</span>
                  <Badge variant="secondary">{endpoint.name}</Badge>
                </div>

                <p className="text-sm text-muted-foreground">{endpoint.description}</p>

                <div className="relative">
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                    <code>
                      {selectedLanguage === "python" && endpoint.python}
                      {selectedLanguage === "javascript" && endpoint.javascript}
                      {selectedLanguage === "bash" && endpoint.bash}
                    </code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      const currentCode = selectedLanguage === "python" ? endpoint.python :
                                        selectedLanguage === "javascript" ? endpoint.javascript :
                                        endpoint.bash;
                      copyToClipboard(currentCode);
                    }}
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
                      <Badge variant="outline" className="mr-2">{endpoint.parameter.name}</Badge>
                      <code className="text-xs bg-muted px-1 rounded">
                        {endpoint.parameter.type}
                      </code>
                      <span className="text-muted-foreground ml-2">Default: *{endpoint.parameter.default}*</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {endpoint.parameter.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">→ Returns 1 element</span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div>
                      <Badge variant="outline">{endpoint.returns.type}</Badge>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {endpoint.returns.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};
