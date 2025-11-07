'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { HexColorPicker } from 'react-colorful';
import { Label } from '@/components/ui/label';

const themes = [
  {
    id: 'light',
    name: 'Light',
    description: 'Bright and clean interface for well-lit environments',
    primary: '#2563eb',
    accent: '#f8fafc',
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'High contrast theme optimized for low-light working',
    primary: '#1d4ed8',
    accent: '#0f172a',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Dimmed interface for long working hours',
    primary: '#38bdf8',
    accent: '#020817',
  },
];

const colorPresets = [
  '#2563eb',
  '#16a34a',
  '#f97316',
  '#a855f7',
  '#ec4899',
  '#14b8a6',
  '#facc15',
  '#0ea5e9',
];

export default function AppearanceSettingsPage() {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [accentColor, setAccentColor] = useState('#f8fafc');
  const [borderRadius, setBorderRadius] = useState([12]);
  const [compactMode, setCompactMode] = useState(false);
  const [glassmorphism, setGlassmorphism] = useState(true);
  const [headerBlur, setHeaderBlur] = useState([20]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/settings/appearance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: selectedTheme,
          primaryColor,
          accentColor,
          borderRadius: borderRadius[0],
          compactMode,
          glassmorphism,
          headerBlur: headerBlur[0]
        }),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      toast.success('Appearance settings saved');
    } catch (error) {
      toast.error('Failed to save appearance settings');
    }
  };

  const handleThemeSelect = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);
    if (!theme) return;

    setSelectedTheme(themeId);
    setPrimaryColor(theme.primary);
    setAccentColor(theme.accent);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appearance</h1>
          <p className="text-gray-600">Customize how the ERP looks and feels for your organization.</p>
        </div>
        <Button onClick={handleSave}>Save changes</Button>
      </div>

      <Tabs defaultValue="themes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="themes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {themes.map((theme) => (
              <Card
                key={theme.id}
                className={`border-2 transition-all ${
                  selectedTheme === theme.id ? 'border-blue-600 shadow-lg scale-[1.01]' : 'border-transparent'
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{theme.name}</span>
                    <Button
                      variant={selectedTheme === theme.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeSelect(theme.id)}
                    >
                      {selectedTheme === theme.id ? 'Selected' : 'Use theme'}
                    </Button>
                  </CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-gray-200 overflow-hidden">
                      <div className="flex h-24">
                        <div className="flex-1" style={{ backgroundColor: theme.primary }} />
                        <div className="flex-1" style={{ backgroundColor: theme.accent }} />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Primary: {theme.primary}</p>
                      <p>Accent: {theme.accent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="colors" className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Brand colors</CardTitle>
              <CardDescription>Align the ERP interface with your company’s visual identity.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-900">Primary color</Label>
                <HexColorPicker
                  color={primaryColor}
                  onChange={(value) => setPrimaryColor(value)}
                  className="w-full"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setPrimaryColor(preset)}
                      className="h-10 w-10 rounded-full border border-white shadow-lg"
                      style={{ backgroundColor: preset }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">Primary color applies to buttons, links and key highlights.</p>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-900">Accent/background color</Label>
                <HexColorPicker
                  color={accentColor}
                  onChange={(value) => setAccentColor(value)}
                  className="w-full"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAccentColor(preset)}
                      className="h-10 w-10 rounded-full border border-white shadow-lg"
                      style={{ backgroundColor: preset }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">Accent color influences cards, panels, and background gradients.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme options</CardTitle>
              <CardDescription>Quick toggles for advanced visual effects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-900">Compact mode</p>
                  <p className="text-xs text-gray-500">Reduce padding and whitespace for dense data tables.</p>
                </div>
                <Switch checked={compactMode} onCheckedChange={setCompactMode} />
              </div>

              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-900">Glassmorphism</p>
                  <p className="text-xs text-gray-500">Enable frosted glass panels and translucent cards.</p>
                </div>
                <Switch checked={glassmorphism} onCheckedChange={setGlassmorphism} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Header blur intensity</p>
                  <span className="text-xs text-gray-500">{headerBlur[0]}px</span>
                </div>
                <Slider
                  className="pt-3"
                  value={headerBlur}
                  min={0}
                  max={40}
                  step={1}
                  onValueChange={setHeaderBlur}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Layout density</CardTitle>
              <CardDescription>Adjust spacing to better match your team’s workflows.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Component border radius</p>
                  <span className="text-xs text-gray-500">{borderRadius[0]}px</span>
                </div>
                <Slider
                  className="pt-2"
                  value={borderRadius}
                  min={0}
                  max={24}
                  step={1}
                  onValueChange={setBorderRadius}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-900">Menu style</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  {['Classic', 'Compact', 'Minimal'].map((menu) => (
                    <button
                      key={menu}
                      type="button"
                      className="group rounded-lg border border-gray-200 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                    >
                      <p className="text-sm font-medium text-gray-900">{menu}</p>
                      <p className="text-xs text-gray-500">Navigation preset</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Card className="p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Sidebar icons</p>
                  <p className="text-xs text-gray-500">Always show icon labels</p>
                  <Switch className="mt-4" />
                </Card>

                <Card className="p-4 border border-gray-200">
                  <p className="text-sm font-medium text-gray-900">Sticky sub-navigation</p>
                  <p className="text-xs text-gray-500">Keep page-level tabs visible when you scroll.</p>
                  <Switch className="mt-4" checked />
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login experience</CardTitle>
              <CardDescription>Control how the login page appears to new users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Display demo credentials</p>
                  <p className="text-xs text-gray-500">Show demo access on the login page for trials.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Allow custom background</p>
                  <p className="text-xs text-gray-500">Enable uploading a branded illustration or photo.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Live preview</CardTitle>
              <CardDescription>See how your selections would look across the ERP interface.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-[1.75fr_1fr]">
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-gray-200 p-4" style={{ backgroundColor: accentColor }}>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg" style={{ backgroundColor: primaryColor }} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Dashboard</p>
                        <p className="text-xs text-gray-600">Sales overview</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="h-2 w-8 rounded-full bg-gray-300" />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-6">
                    {[1, 2, 3, 4, 5, 6].map((card) => (
                      <div key={card} className="rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="h-16 rounded-md" style={{ backgroundColor: `${primaryColor}20` }} />
                        <div className="mt-4 space-y-2">
                          <div className="h-2 w-3/4 rounded-full bg-gray-200" />
                          <div className="h-2 w-1/2 rounded-full bg-gray-200" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-900">Sidebar</p>
                    <div className="mt-4 space-y-2">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                          <div className="h-2 flex-1 rounded-full bg-gray-200" />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-900">Login card</p>
                    <div className="mt-4 space-y-2">
                      <div className="h-10 rounded-md" style={{ backgroundColor: primaryColor }} />
                      <div className="h-2 w-3/4 rounded-full bg-gray-200" />
                      <div className="h-2 w-1/2 rounded-full bg-gray-200" />
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" onClick={() => toast.info('Preview launched in new window (placeholder)')}>
                Launch full preview
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
