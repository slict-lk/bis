'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  ShoppingBag,
  Package,
  Factory,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CalendarClock,
  BarChart3,
  Building2,
  Sparkles,
  Globe,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type DashboardResponse = {
  stats?: {
    totalRevenue?: number;
    revenueChange?: number;
    customerCount?: number;
    customerChange?: number;
    orderCount?: number;
    orderChange?: number;
    productCount?: number;
    productChange?: number;
  };
  recentOrders?: Array<{
    id: string;
    customer: string;
    amount: number;
    status: string;
    createdAt?: string;
  }>;
  manufacturing?: {
    inProgress?: number;
    scheduled?: number;
    pending?: number;
  };
};

const QUICK_LINKS: Array<{
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  { href: '/sales', title: 'Sales & CRM', description: 'Pipeline, quotes, subscriptions', icon: ShoppingCart },
  { href: '/accounting', title: 'Accounting', description: 'Invoices, payments, ledgers', icon: DollarSign },
  { href: '/inventory', title: 'Inventory', description: 'Stock, warehouses, logistics', icon: Package },
  { href: '/manufacturing', title: 'Manufacturing', description: 'MRP, work orders, quality', icon: Factory },
  { href: '/hr', title: 'HR & People', description: 'Employees, time off, payroll', icon: Users },
  { href: '/projects', title: 'Projects', description: 'Tasks, timesheets, approvals', icon: BarChart3 },
  { href: '/subscriptions', title: 'Subscriptions', description: 'Plans, renewals, billing', icon: TrendingUp },
  { href: '/studio', title: 'Studio', description: 'No-code automation builder', icon: Sparkles },
  { href: '/ai', title: 'AI Workflows', description: 'Assistants, insights, copilots', icon: Activity },
  { href: '/reports', title: 'Reports', description: 'Dashboards & BI exports', icon: CalendarClock },
  { href: '/settings', title: 'Settings', description: 'Users, roles, tenant config', icon: Building2 },
  { href: '/integrations', title: 'Integrations', description: 'Connect apps & services', icon: Globe },
];

const AUTOMATION_SUGGESTIONS: Array<{
  title: string;
  summary: string;
  impact: string;
}> = [
  {
    title: 'Lead-to-order automation',
    summary: 'Auto-create sales orders when opportunities hit “Won” and notify fulfilment teams.',
    impact: 'Cuts handoffs between sales and operations.',
  },
  {
    title: 'Inventory re-order guardrails',
    summary: 'Trigger purchase RFQs when stock drops below safety thresholds across warehouses.',
    impact: 'Prevents stockouts without over-ordering.',
  },
  {
    title: 'AI-driven customer follow-up',
    summary: 'Schedule smart reminders for dormant accounts and route tasks to account owners.',
    impact: 'Improves retention by keeping accounts engaged.',
  },
];

const formatCurrency = (value?: number) =>
  `$${Number(value ?? 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatNumber = (value?: number) => Number(value ?? 0).toLocaleString('en-US');

const formatDateTime = (value?: string) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const getTrend = (change?: number) => {
  if (change === undefined || change === null || Number.isNaN(change)) {
    return { display: '—', positive: true, icon: ArrowUpRight };
  }
  const positive = change >= 0;
  const icon = positive ? ArrowUpRight : ArrowDownRight;
  return {
    display: `${positive ? '+' : ''}${change.toFixed(1)}%`,
    positive,
    icon,
  };
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [response, setResponse] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const tenantId = session?.user?.tenantId;

  useEffect(() => {
    if (!tenantId) {
      setLoading(false);
      return;
    }

    fetch(`/api/dashboard/stats?tenantId=${tenantId}`)
      .then((res) => res.json())
      .then((json) => {
        setResponse(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard data:', err);
        setLoading(false);
      });
  }, [tenantId]);

  // Calculate derived state at the top level
  const stats = response?.stats ?? {};
  const recentOrders = response?.recentOrders ?? [];
  const manufacturing = response?.manufacturing ?? {};

  const metrics = useMemo(
    () => [
      {
        title: 'Total revenue',
        value: formatCurrency(stats.totalRevenue),
        change: stats.revenueChange,
        helper: 'Last 30 days',
        icon: DollarSign,
      },
      {
        title: 'Customers',
        value: formatNumber(stats.customerCount),
        change: stats.customerChange,
        helper: 'Total customers',
        icon: Users,
      },
      {
        title: 'Orders',
        value: formatNumber(stats.orderCount),
        change: stats.orderChange,
        helper: 'This month',
        icon: ShoppingBag,
      },
      {
        title: 'Products',
        value: formatNumber(stats.productCount),
        change: stats.productChange,
        helper: 'In stock',
        icon: Package,
      },
    ],
    [stats]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-24 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500" />
          <p className="text-sm text-slate-500">Preparing your personalized workspace…</p>
        </div>
      </div>
    );
  }

  if (!tenantId) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-800">
            Action required
          </Badge>
          <h1 className="mt-6 text-3xl font-semibold text-slate-900">Connect your tenant to view the dashboard</h1>
          <p className="mt-4 text-sm text-slate-600">
            Once you configure a tenant or sign in with an organization, you'll see real-time revenue, inventory, and production analytics here.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/settings/company">
              <Button>Open company settings</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Sign in as another user</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const productionSummary = [
    {
      name: 'In progress',
      count: manufacturing.inProgress ?? 0,
      status: 'Active work orders',
      icon: Factory,
    },
    {
      name: 'Scheduled',
      count: manufacturing.scheduled ?? 0,
      status: 'Upcoming batches',
      icon: CalendarClock,
    },
    {
      name: 'Pending',
      count: manufacturing.pending ?? 0,
      status: 'Awaiting confirmation',
      icon: Package,
    },
  ];

  const firstName = session.user?.name?.split(' ')[0] ?? 'Operator';
  const tenantLabel = session.user?.tenant ?? 'your organization';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <Badge variant="secondary" className="w-fit border-transparent bg-blue-50 text-blue-700">
                Dashboard overview
              </Badge>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Hey {firstName}, here&apos;s what’s happening across {tenantLabel}.
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Track revenue, fulfillment, and workforce activity at a glance. Jump into modules or launch automations in a single click.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/reports">
                <Button variant="outline" className="gap-2">
                  View reports
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/studio">
                <Button className="gap-2">
                  Launch automation
                  <Sparkles className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Recent orders</CardTitle>
                <p className="text-sm text-slate-500">Latest transactions across ecommerce, POS, and subscriptions</p>
              </div>
              <Link href="/sales/orders" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
                  <ShoppingCart className="h-6 w-6 text-slate-400" />
                  <div className="space-y-1">
                    <p className="font-medium text-slate-700">No orders yet</p>
                    <p className="text-sm text-slate-500">Once customers place orders, they’ll show up here with live status updates.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.slice(0, 6).map((order) => (
                    <OrderItem
                      key={order.id}
                      id={order.id}
                      customer={order.customer}
                      amount={formatCurrency(order.amount)}
                      status={order.status}
                      createdAt={order.createdAt}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Production overview</CardTitle>
              <p className="text-sm text-slate-500">Monitor the flow of manufacturing jobs and staging batches</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {productionSummary.map((item) => (
                <ProductionItem key={item.name} {...item} />
              ))}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Syncing with shop-floor devices every 15 minutes.
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Quick access</CardTitle>
                <p className="text-sm text-slate-500">Jump into the modules your teams rely on every day</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {QUICK_LINKS.map((link) => (
                  <ModuleLink key={link.href} {...link} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Suggested automations</CardTitle>
              <p className="text-sm text-slate-500">Ideas tailored for faster workflows and tighter control</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {AUTOMATION_SUGGESTIONS.map((item) => (
                <AutomationSuggestion key={item.title} {...item} />
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string;
  change?: number;
  helper: string;
  icon: LucideIcon;
};

function MetricCard({ title, value, change, helper, icon: Icon }: MetricCardProps) {
  const trend = getTrend(change);
  const TrendIcon = trend.icon;

  return (
    <Card className="group relative overflow-hidden border-none bg-white/90 shadow-md ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:ring-2 hover:ring-blue-200">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-slate-500">{title}</p>
            <div className="text-3xl font-semibold text-slate-900">{value}</div>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={
                  trend.positive ? 'text-emerald-600' : 'text-rose-600'
                }
              >
                <TrendIcon className="mr-1 inline h-4 w-4" />
                {trend.display}
              </span>
              <span className="text-slate-500">vs. prior period</span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <p className="text-xs text-slate-500">{helper}</p>
      </CardContent>
    </Card>
  );
}

type OrderItemProps = {
  id: string;
  customer: string;
  amount: string;
  status: string;
  createdAt?: string;
};

function OrderItem({ id, customer, amount, status, createdAt }: OrderItemProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm transition hover:border-blue-200">
      <div className="space-y-1">
        <p className="font-medium text-slate-900">{customer}</p>
        <p className="text-xs uppercase tracking-wide text-slate-400">#{id}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right text-sm text-slate-500">
          <div className="font-semibold text-slate-900">{amount}</div>
          <div>{formatDateTime(createdAt)}</div>
        </div>
        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
          {status}
        </Badge>
      </div>
    </div>
  );
}

type ProductionItemProps = {
  name: string;
  count: number;
  status: string;
  icon: LucideIcon;
};

function ProductionItem({ name, count, status, icon: Icon }: ProductionItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-inner">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900">{name}</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">{status}</p>
      </div>
      <span className="text-2xl font-semibold text-slate-900">{count}</span>
    </div>
  );
}

type ModuleLinkProps = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

function ModuleLink({ href, title, description, icon: Icon }: ModuleLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:text-blue-500" />
    </Link>
  );
}

type AutomationSuggestionProps = {
  title: string;
  summary: string;
  impact: string;
};

function AutomationSuggestion({ title, summary, impact }: AutomationSuggestionProps) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 hover:border-blue-200">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-sm text-slate-600">{summary}</p>
        </div>
        <Sparkles className="h-4 w-4 text-blue-500" />
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">Impact: {impact}</p>
    </div>
  );
}
