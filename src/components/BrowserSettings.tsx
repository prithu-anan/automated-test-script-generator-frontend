import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSettings } from "@/contexts/SettingsContext";

export const BrowserSettings = () => {
  const { settings, updateBrowserSettings } = useSettings();

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Keep Browser Open */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Keep Browser Open between Tasks</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="keep-browser-open" 
                checked={settings.browser.keepBrowserOpen}
                onCheckedChange={(checked) => updateBrowserSettings({ keepBrowserOpen: checked === true })}
              />
              <Label htmlFor="keep-browser-open" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Keep Browser Open
              </Label>
            </div>
          </div>

          {/* Headless Mode */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Run browser without GUI</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="headless-mode" 
                checked={settings.browser.headlessMode}
                onCheckedChange={(checked) => updateBrowserSettings({ headlessMode: checked === true })}
              />
              <Label htmlFor="headless-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Headless Mode
              </Label>
            </div>
          </div>

          {/* Disable Security */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Disable browser security</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="disable-security" 
                checked={settings.browser.disableSecurity}
                onCheckedChange={(checked) => updateBrowserSettings({ disableSecurity: checked === true })}
              />
              <Label htmlFor="disable-security" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Disable Security
              </Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Window Width */}
          <div className="space-y-2">
            <Label htmlFor="window-width">Window Width</Label>
            <p className="text-sm text-muted-foreground">Browser window width</p>
            <Input 
              id="window-width"
              type="number"
              value={settings.browser.windowWidth}
              onChange={(e) => updateBrowserSettings({ windowWidth: parseInt(e.target.value) || 1280 })}
              className="w-full"
            />
          </div>

          {/* Window Height */}
          <div className="space-y-2">
            <Label htmlFor="window-height">Window Height</Label>
            <p className="text-sm text-muted-foreground">Browser window height</p>
            <Input 
              id="window-height"
              type="number"
              value={settings.browser.windowHeight}
              onChange={(e) => updateBrowserSettings({ windowHeight: parseInt(e.target.value) || 720 })}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
