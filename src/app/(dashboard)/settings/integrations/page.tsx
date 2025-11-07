'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CheckCircle2, Plug, RefreshCcw, ShieldAlert } from 'lucide-react';

const integrationCatalog = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Collect online payments, manage subscriptions, and sync invoices automatically.',
    category: 'Payments',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Enable PayPal checkout for quick one-click purchasing experiences.',
    category: 'Payments',
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    description: 'Accept INR payments, subscriptions, and payouts through Razorpay.',
    category: 'Payments',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Sync real-time events, row-level security, and auth with Supabase.',
    category: 'Data & Storage',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Push notifications and approvals directly into your Slack workspace.',
    category: 'Collaboration',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate workflows with 5,000+ other SaaS tools using triggers and actions.',
    category: 'Automation',
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks Online',
    description: 'Keep your accounting ledger synchronized and reconcile faster.',
    category: 'Accounting',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Sync product catalogs, orders, and customer data from Shopify stores.',
    category: 'Commerce',
  },
];

const integrationStatusDefaults: Record<string, 'connected' | 'disconnected' | 'pending'> = {
  stripe: 'connected',
  paypal: 'disconnected',
  razorpay: 'pending',
  supabase: 'connected',
  slack: 'disconnected',
  zapier: 'connected',
  quickbooks: 'pending',
  shopify: 'disconnected',
};

export default function IntegrationsSettingsPage() {
  const [integrationStatus, setIntegrationStatus] = useState(integrationStatusDefaults);
  const [webhookEnabled, setWebhookEnabled] = useState(true);
  const [syncInventory, setSyncInventory] = useState(true);
  const [syncAccounting, setSyncAccounting] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  const handleAction = (id: string) => {
    const current = integrationStatus[id];
    const next = current === 'connected' ? 'disconnected' : 'connected';
    setIntegrationStatus((prev) => ({ ...prev, [id]: next }));
    toast.success(`${integrationCatalog.find((item) => item.id === id)?.name ?? 'Integration'} ${next === 'connected' ? 'connected' : 'disconnected'}.`);
  };

  const renderStatusBadge = (status: 'connected' | 'disconnected' | 'pending') => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-emerald-100 text-emerald-700">Connected</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      default:
        return <Badge variant="outline">Not connected</Badge>;
    }
  };

  const handleCredentialSave = () => {
    toast.success('API credentials updated');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect external platforms to automate workflows and data sync.</p>
        </div>
        <Button variant="outline" onClick={() => toast.info('Sync job triggered')}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Sync all now
        </Button>
      </div>

      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList>
          <TabsTrigger value="catalog">Available integrations</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks & API</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="grid gap-5 lg:grid-cols-2">
          {integrationCatalog.map((integration) => {
            const status = integrationStatus[integration.id] ?? 'disconnected';
            return (
              <Card key={integration.id} className="border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {renderStatusBadge(status)}
                    <Badge variant="secondary" className="text-xs uppercase tracking-wide">
                      {integration.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border border-dashed border-gray-200 p-4 text-sm text-gray-500">
                    {status === 'connected'
                      ? 'Data is syncing every 15 minutes. Last sync completed 9 minutes ago.'
                      : 'Connect to begin syncing data between SLICT ERP and this platform.'}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <Button variant="ghost" className="text-sm" onClick={() => toast.info('View integration documentation')}>
                    Documentation
                  </Button>
                  <Button onClick={() => handleAction(integration.id)}>
                    {status === 'connected' ? 'Disconnect' : status === 'pending' ? 'Resume setup' : 'Connect'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </TabsContent>

      <TabsContent value="automations" className="grid gap-5 lg:grid-cols-2">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Automated syncs</CardTitle>
              <CardDescription>Enable background jobs that keep modules aligned with external tools.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Inventory sync</p>
                  <p className="text-xs text-gray-500">Update stock levels when e-commerce orders are received.</p>
                </div>
                <Switch checked={syncInventory} onCheckedChange={setSyncInventory} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Accounting journal export</p>
                  <p className="text-xs text-gray-500">Push daily transactions into external accounting suites.</p>
                </div>
                <Switch checked={syncAccounting} onCheckedChange={setSyncAccounting} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">CRM pipeline updates</p>
                  <p className="text-xs text-gray-500">Let sales teams know when ERP invoices are paid.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success('Automation preferences saved')}>Save automation rules</Button>
            </CardFooter>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Integration health</CardTitle>
              <CardDescription>Review the latest sync checks and potential issues.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  All critical integrations are operational.
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Stripe invoices</span>
                  <span>Last sync 9 mins ago</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Razorpay payouts</span>
                  <span className="text-amber-600">Action required</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Slack notifications</span>
                  <span>Last sync 1 hour ago</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => toast.info('Opening incident log (placeholder)')}>
                View incident log
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>API credentials</CardTitle>
              <CardDescription>Generate secure API keys for custom integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Public key</label>
                  <Input
                    value={apiKey}
                    placeholder="slct_live_..."
                    onChange={(event) => setApiKey(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Secret key</label>
                  <Input
                    value={apiSecret}
                    placeholder="••••••••••••"
                    type="password"
                    onChange={(event) => setApiSecret(event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Allowed callback URLs</label>
                <Textarea placeholder="https://app.mycompany.com/api/webhooks/erp" rows={4} />
                <p className="text-xs text-gray-500">Separate multiple URLs with a newline.</p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => toast.info('Regenerate key (placeholder)')}>
                Regenerate keys
              </Button>
              <Button onClick={handleCredentialSave}>Save credentials</Button>
            </CardFooter>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Incoming webhooks</CardTitle>
              <CardDescription>Toggle webhook receivers and configure routing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Primary webhook endpoint</p>
                  <p className="text-xs text-gray-500">Forward events to /api/integrations/webhook</p>
                </div>
                <Switch checked={webhookEnabled} onCheckedChange={setWebhookEnabled} />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Replay failed events</p>
                  <p className="text-xs text-gray-500">Automatically retry webhook deliveries for 24 hours.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-700">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" />
                  Use signature verification to protect against forged events.
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => toast.info('Opening webhook logs (placeholder)')}>
                View recent deliveries
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
