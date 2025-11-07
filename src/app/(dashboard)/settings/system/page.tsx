'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Activity, Database, ShieldCheck, Timer, Wrench } from 'lucide-react';

export default function SystemSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState([45]);
  const [passwordRotation, setPasswordRotation] = useState([90]);
  const [auditLogRetention, setAuditLogRetention] = useState([180]);
  const [backupTime, setBackupTime] = useState('01:00');
  const [statusMessage, setStatusMessage] = useState('We are performing routine upgrades. Downtime is not expected.');

  const handleSaveSecurity = () => toast.success('Security preferences saved');
  const handleSaveMaintenance = () => toast.success('Maintenance settings saved');
  const handleSavePerformance = () => toast.success('Performance profile updated');

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System settings</h1>
          <p className="text-gray-600">Control platform-wide policies, maintenance, and infrastructure behavior.</p>
        </div>
        <Button variant="outline" onClick={() => toast.info('Diagnostics snapshot generated (placeholder)')}>
          <Wrench className="mr-2 h-4 w-4" />
          Run diagnostics
        </Button>
      </div>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList>
          <TabsTrigger value="security">Security & compliance</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="status">System status</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Authentication policies</CardTitle>
              <CardDescription>Define password rules and session duration requirements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Session timeout</p>
                  <span className="text-xs text-gray-500">{sessionTimeout[0]} minutes</span>
                </div>
                <Slider value={sessionTimeout} min={15} max={180} step={5} onValueChange={setSessionTimeout} />
                <p className="text-xs text-gray-500">Automatically sign out inactive users to protect sensitive data.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Password rotation</p>
                  <span className="text-xs text-gray-500">{passwordRotation[0]} days</span>
                </div>
                <Slider value={passwordRotation} min={30} max={365} step={15} onValueChange={setPasswordRotation} />
                <p className="text-xs text-gray-500">Enforce regular password updates to reduce breach risk.</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Enable multi-factor authentication</p>
                  <p className="text-xs text-gray-500">Require TOTP codes for all non-SSO logins.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Enforce IP allow-list</p>
                  <p className="text-xs text-gray-500">Restrict admin access to trusted office networks.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSecurity}>Save security rules</Button>
            </CardFooter>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Compliance snapshot</CardTitle>
              <CardDescription>Summary of controls mapped to your compliance frameworks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                SOC 2 policy coverage: 92%
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">ISO 27001</Badge>
                18 / 21 controls satisfied
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">GDPR</Badge>
                Data protection impact assessment due in 14 days
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Maintenance window</CardTitle>
              <CardDescription>Schedule downtime notifications and automated backups.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Maintenance mode</p>
                  <p className="text-xs text-gray-500">Temporarily disable user logins while administrators work.</p>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Preferred backup time</label>
                  <Input type="time" value={backupTime} onChange={(event) => setBackupTime(event.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Notify users</label>
                  <Textarea rows={3} value={statusMessage} onChange={(event) => setStatusMessage(event.target.value)} />
                  <p className="text-xs text-gray-500">Displayed on the login screen when maintenance is active.</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Audit log retention</p>
                  <span className="text-xs text-gray-500">{auditLogRetention[0]} days</span>
                </div>
                <Slider value={auditLogRetention} min={30} max={365} step={15} onValueChange={setAuditLogRetention} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveMaintenance}>Save maintenance plan</Button>
            </CardFooter>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Scheduled jobs</CardTitle>
              <CardDescription>Monitor upcoming automated tasks and their outcomes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Daily backups</span>
                <span>Next run in 3 hrs</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database vacuum</span>
                <span className="text-amber-600">Queued</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Prune application logs</span>
                <span>Last run 22 mins ago</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Resource profile</CardTitle>
              <CardDescription>Allocate capacity for compute, memory, and background workers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Auto-scale background jobs</p>
                  <p className="text-xs text-gray-500">Start additional workers during peak hours.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Card className="border border-gray-200 p-4">
                  <p className="text-sm font-medium text-gray-900">Compute scaling</p>
                  <p className="text-xs text-gray-500">Currently 3 instances · Max 8</p>
                </Card>
                <Card className="border border-gray-200 p-4">
                  <p className="text-sm font-medium text-gray-900">Database headroom</p>
                  <p className="text-xs text-gray-500">70% capacity remaining</p>
                </Card>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Average latency decreased 18% after last tuning window.
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePerformance}>Apply profile</Button>
            </CardFooter>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Infrastructure summary</CardTitle>
              <CardDescription>Snapshots from observability dashboards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Worker queue depth</span>
                <span>Low</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cache hit rate</span>
                <span>92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Incidents this week</span>
                <span>0</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Status broadcast</CardTitle>
              <CardDescription>Publish updates to the login screen and customer portal.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-900">Message headline</label>
                <Input placeholder="Scheduled maintenance completed successfully" />
                <label className="text-sm font-medium text-gray-900">Details</label>
                <Textarea rows={4} placeholder="We have finished upgrading the database cluster. No further action is required." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-900">Audience</label>
                <div className="space-y-2 text-sm text-gray-600">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="h-4 w-4" /> Admins
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="h-4 w-4" /> Internal users
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" /> External clients
                  </label>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 space-y-2">
                  <p className="font-medium text-gray-900">Preview</p>
                  <p>{statusMessage}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={() => toast.info('Status archived (placeholder)')}>
                Archive message
              </Button>
              <Button onClick={() => toast.success('Status published')}>Publish update</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
