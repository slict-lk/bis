import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  FileText, 
  Calendar,
  BarChart3,
  Settings,
  Zap,
  Globe,
  Factory,
  Building2,
  Mail,
  MessageSquare,
  BookOpen,
  GraduationCap,
  Home,
  CreditCard,
  Phone,
  Store,
  Hotel,
  UtensilsCrossed,
  Heart,
  Wrench,
  CheckSquare,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CloudCog
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type HeroHighlight = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type StatHighlight = {
  value: string;
  label: string;
  accent: string;
  icon: LucideIcon;
  helper?: string;
};

type FeatureCategory = {
  icon: LucideIcon;
  title: string;
  description: string;
  apps: number;
  accent: {
    text: string;
    bg: string;
  };
};

const HERO_HIGHLIGHTS: HeroHighlight[] = [
  {
    icon: ShieldCheck,
    title: 'Enterprise-grade security',
    description: 'Tenant isolation, audit trails, and compliance-ready defaults',
  },
  {
    icon: Sparkles,
    title: 'AI copilots everywhere',
    description: 'Smart assistants across CRM, inventory, finance, and support',
  },
  {
    icon: CloudCog,
    title: 'Automation-first operations',
    description: 'Orchestrated workflows, background jobs, and self-healing processes',
  },
];

const STAT_HIGHLIGHTS: StatHighlight[] = [
  {
    value: '50+',
    label: 'Modular business apps',
    accent: 'text-blue-600 bg-blue-50',
    icon: LayoutDashboard,
  },
  {
    value: '20+',
    label: 'AI automations & copilots',
    accent: 'text-purple-600 bg-purple-50',
    icon: Sparkles,
  },
  {
    value: '∞',
    label: 'Scalable multi-tenancy',
    accent: 'text-orange-600 bg-orange-50',
    icon: Globe,
  },
  {
    value: '24/7',
    label: 'Monitoring & reliability',
    helper: 'Built-in observability, alerts & SLOs',
    accent: 'text-green-600 bg-green-50',
    icon: ShieldCheck,
  },
];

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    icon: ShoppingCart,
    title: 'Sales & CRM',
    description: 'Orders, quotations, pipeline, POS, ecommerce, subscriptions',
    apps: 8,
    accent: { text: 'text-blue-600', bg: 'bg-blue-50' },
  },
  {
    icon: FileText,
    title: 'Accounting & Finance',
    description: 'Invoicing, payments, reporting, bank reconciliation, assets',
    apps: 6,
    accent: { text: 'text-green-600', bg: 'bg-green-50' },
  },
  {
    icon: Package,
    title: 'Inventory & Operations',
    description: 'Stock, purchase, manufacturing, quality, maintenance',
    apps: 7,
    accent: { text: 'text-purple-600', bg: 'bg-purple-50' },
  },
  {
    icon: Users,
    title: 'HR & People',
    description: 'Employees, recruitment, payroll, time off, appraisals',
    apps: 7,
    accent: { text: 'text-orange-500', bg: 'bg-orange-50' },
  },
  {
    icon: Globe,
    title: 'Website & Marketing',
    description: 'Website builder, blog, email, social, events',
    apps: 7,
    accent: { text: 'text-sky-600', bg: 'bg-sky-50' },
  },
  {
    icon: LayoutDashboard,
    title: 'Projects & Productivity',
    description: 'Tasks, timesheets, helpdesk, surveys, approvals',
    apps: 7,
    accent: { text: 'text-indigo-600', bg: 'bg-indigo-50' },
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="container mx-auto space-y-16 px-4 py-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/80 px-6 py-16 text-center shadow-lg backdrop-blur-sm md:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8">
            <Badge className="border-blue-200 bg-blue-50 text-blue-700">
              New for 2025 • AI-first multi-tenant ERP
            </Badge>
            <div className="space-y-4">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl">
                Operate every part of your business from one command center
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                SLICT ERP 2025 delivers a production-ready, multi-tenant SaaS suite covering 50+ business apps with AI copilots, automation, and enterprise-grade security baked in.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2 px-8 text-lg">
                  Explore the platform
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="px-8 text-lg">
                  View sample dashboard
                </Button>
              </Link>
            </div>
            <div className="grid w-full gap-4 text-left sm:grid-cols-2 md:grid-cols-3">
              {HERO_HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="relative flex items-start gap-3 rounded-2xl border border-blue-100/60 bg-blue-50/40 p-4 text-sm text-slate-600 shadow-sm backdrop-blur"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-inner ring-1 ring-blue-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {STAT_HIGHLIGHTS.map(({ value, label, accent, icon: Icon, helper }) => (
            <Card
              key={label}
              className="relative overflow-hidden border-none bg-white/90 shadow-md ring-1 ring-gray-200/60 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-400/40 via-sky-400/70 to-purple-400/40" />
              <CardHeader className="space-y-4">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${accent} shadow-inner`}> 
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-4xl font-semibold text-gray-900">{value}</CardTitle>
                  <CardDescription className="text-base text-gray-600">{label}</CardDescription>
                </div>
                {helper && (
                  <p className="text-sm text-muted-foreground">{helper}</p>
                )}
              </CardHeader>
            </Card>
          ))}
        </section>

        {/* Feature Categories */}
        <section className="space-y-6">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="border-transparent bg-slate-900/90 text-slate-50">
              Comprehensive module coverage
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Every mission-critical department, fully integrated
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              From sales and finance to manufacturing and marketing, SLICT ERP unifies your teams with consistent data, shared automations, and intuitive interfaces.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURE_CATEGORIES.map((category) => (
              <FeatureCard key={category.title} {...category} />
            ))}
          </div>
        </section>

        {/* All Apps & Functions */}
        <section className="space-y-6">
          <div className="space-y-3 text-center">
            <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
              Explore every module, filter by team
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">📋 Complete Apps & Functions Library</h2>
            <p className="mx-auto max-w-3xl text-base text-muted-foreground">
              Browse category-specific capabilities. Switch tabs to see exactly how each department operates inside SLICT ERP.
            </p>
          </div>
          <Card className="border-none bg-white/90 shadow-lg ring-1 ring-gray-200/70">
            <CardContent className="space-y-6 pt-8">
              <Tabs defaultValue="sales" className="w-full space-y-6">
                <TabsList className="flex w-full flex-wrap justify-center gap-2 overflow-x-auto rounded-2xl bg-slate-100/80 p-2 text-sm shadow-inner">
                  <TabsTrigger value="sales">Sales & CRM</TabsTrigger>
                  <TabsTrigger value="accounting">Accounting</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="hr">HR & People</TabsTrigger>
                  <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="website">Website</TabsTrigger>
                  <TabsTrigger value="pos">Point of Sale</TabsTrigger>
                  <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                  <TabsTrigger value="purchasing">Purchasing</TabsTrigger>
                  <TabsTrigger value="quality">Quality</TabsTrigger>
                  <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
                  <TabsTrigger value="hotel">Hotel</TabsTrigger>
                  <TabsTrigger value="realestate">Real Estate</TabsTrigger>
                  <TabsTrigger value="construction">Construction</TabsTrigger>
                  <TabsTrigger value="helpdesk">Helpdesk</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>

                <TabsContent value="sales" className="space-y-4">
                  <AppFunctionsList
                    title="Sales & CRM (8 Apps)"
                    apps={[
                      { name: "Customer Management", functions: ["Customer database", "Contact management", "Communication history", "Customer segmentation", "Address management", "Credit limits"] },
                      { name: "Lead Management", functions: ["Lead capture", "Lead scoring", "Lead conversion", "Kanban pipeline", "Lead assignment", "Activity tracking"] },
                      { name: "Opportunity Management", functions: ["Sales pipeline", "Stage management", "Win/loss analysis", "Forecasting", "Revenue tracking", "Activity logging"] },
                      { name: "Sales Orders", functions: ["Order creation", "Line items", "Pricing & discounts", "Order workflow", "Delivery scheduling", "Status tracking"] },
                      { name: "Quotations", functions: ["Quote generation", "PDF export", "Email sending", "Quote expiration", "Quote to order conversion", "Revision tracking"] },
                      { name: "Point of Sale (POS)", functions: ["POS interface", "Product selection", "Payment processing", "Receipt printing", "Session management", "Cash management"] },
                      { name: "eCommerce Website", functions: ["Product catalog", "Shopping cart", "Checkout process", "Order management", "Payment integration", "Inventory sync"] },
                      { name: "Subscription Management", functions: ["Subscription plans", "Recurring billing", "Customer portal", "Renewal management", "Proration", "Dunning management"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="accounting" className="space-y-4">
                  <AppFunctionsList
                    title="Accounting & Finance (6 Apps)"
                    apps={[
                      { name: "Invoice Management", functions: ["Invoice creation", "Multi-line invoicing", "Tax calculations", "PDF generation", "Email sending", "Payment tracking"] },
                      { name: "Payment Processing", functions: ["Payment recording", "Payment methods", "Reconciliation", "Cash flow tracking", "Payment matching", "Bank deposits"] },
                      { name: "Account Reports", functions: ["P&L statements", "Balance sheet", "Cash flow reports", "Trial balance", "General ledger", "Financial analytics"] },
                      { name: "Bank Reconciliation", functions: ["Bank statement import", "Transaction matching", "Reconciliation reports", "Outstanding checks", "Deposit tracking"] },
                      { name: "Expense Management", functions: ["Expense tracking", "Receipt upload", "Approval workflow", "Reimbursement", "Expense categories", "Reporting"] },
                      { name: "Assets Management", functions: ["Asset register", "Depreciation calculation", "Asset categories", "Maintenance tracking", "Disposal management", "Asset reports"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="inventory" className="space-y-4">
                  <AppFunctionsList
                    title="Inventory & Operations (7 Apps)"
                    apps={[
                      { name: "Product Management", functions: ["Product catalog", "SKU management", "Product variants", "Barcode support", "Product categories", "Pricing rules"] },
                      { name: "Warehouse Management", functions: ["Multi-warehouse support", "Location tracking", "Stock levels", "Warehouse transfers", "Inventory valuation", "Cycle counting"] },
                      { name: "Stock Movements", functions: ["Stock receipts", "Stock issues", "Transfers", "Adjustments", "Stock returns", "Movement history"] },
                      { name: "Purchase Management", functions: ["Purchase orders", "Vendor management", "Receiving", "Three-way matching", "Purchase reports", "Vendor performance"] },
                      { name: "Manufacturing (MRP)", functions: ["Bill of Materials", "Work orders", "Production planning", "Capacity planning", "Production tracking", "Material requirements"] },
                      { name: "Quality Control (QMS)", functions: ["Quality checks", "Inspection points", "Defect tracking", "Quality reports", "Certifications", "Compliance"] },
                      { name: "Maintenance", functions: ["Equipment tracking", "Maintenance schedules", "Work orders", "Parts inventory", "Maintenance history", "Downtime tracking"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="hr" className="space-y-4">
                  <AppFunctionsList
                    title="HR & People (7 Apps)"
                    apps={[
                      { name: "Employee Management", functions: ["Employee directory", "Employee profiles", "Organizational chart", "Employment history", "Skills tracking", "Document management"] },
                      { name: "Attendance Tracking", functions: ["Time clock", "Attendance recording", "Leave balance", "Overtime tracking", "Attendance reports", "Shift management"] },
                      { name: "Leave Management", functions: ["Leave requests", "Leave approval workflow", "Leave types", "Leave balance", "Holiday calendar", "Leave reports"] },
                      { name: "Recruitment", functions: ["Job postings", "Applicant tracking", "Interview scheduling", "Candidate evaluation", "Offer management", "Onboarding"] },
                      { name: "Payroll", functions: ["Salary management", "Payroll calculation", "Pay slips", "Tax deductions", "Benefits administration", "Payroll reports"] },
                      { name: "Appraisal & Skills", functions: ["Performance reviews", "Goal setting", "360 feedback", "Skills assessment", "Career planning", "Training records"] },
                      { name: "Fleet Management", functions: ["Vehicle tracking", "Maintenance scheduling", "Fuel tracking", "Driver management", "Route optimization", "Fleet reports"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="manufacturing" className="space-y-4">
                  <AppFunctionsList
                    title="Manufacturing (3 Apps)"
                    apps={[
                      { name: "Bill of Materials", functions: ["BOM creation", "Component management", "BOM types", "Version control", "Cost calculation", "BOM reports"] },
                      { name: "Work Orders", functions: ["Order creation", "Production scheduling", "Material allocation", "Progress tracking", "Quality checks", "Completion"] },
                      { name: "Production Planning", functions: ["Capacity planning", "Resource allocation", "Production scheduling", "Material requirements", "Workload analysis", "Optimization"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  <AppFunctionsList
                    title="Projects & Productivity (7 Apps)"
                    apps={[
                      { name: "Project Management", functions: ["Project creation", "Task management", "Project planning", "Resource allocation", "Progress tracking", "Project reports"] },
                      { name: "Task Tracking", functions: ["Task creation", "Kanban board", "Task assignment", "Priority levels", "Due dates", "Task dependencies"] },
                      { name: "Timesheets", functions: ["Time logging", "Project time tracking", "Billable hours", "Timesheet approval", "Time reports", "Invoicing integration"] },
                      { name: "Helpdesk & Support", functions: ["Ticket management", "Ticket routing", "SLA tracking", "Knowledge base", "Customer portal", "Support analytics"] },
                      { name: "Surveys & Forms", functions: ["Survey creation", "Form builder", "Response collection", "Data analysis", "Reporting", "Integration"] },
                      { name: "Approvals & Workflows", functions: ["Approval workflows", "Document approval", "Multi-level approval", "Notifications", "Approval history", "Workflow automation"] },
                      { name: "Documents & Files", functions: ["Document storage", "Version control", "Access control", "Document sharing", "Search", "Collaboration"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="website" className="space-y-4">
                  <AppFunctionsList
                    title="Website & Marketing (7 Apps)"
                    apps={[
                      { name: "Website Builder", functions: ["Drag-and-drop editor", "Page templates", "Responsive design", "SEO optimization", "Content management", "Multi-language"] },
                      { name: "Blog & News", functions: ["Blog posts", "Categories & tags", "Comments", "RSS feeds", "Content scheduling", "Analytics"] },
                      { name: "Email Marketing", functions: ["Campaign creation", "Email templates", "Subscriber management", "A/B testing", "Analytics", "Automation"] },
                      { name: "Social Media", functions: ["Multi-channel posting", "Content scheduling", "Social monitoring", "Engagement tracking", "Analytics", "Integration"] },
                      { name: "Events Management", functions: ["Event creation", "Registration", "Ticketing", "Venue management", "Event calendar", "Attendee management"] },
                      { name: "Live Chat", functions: ["Chat widget", "Chat routing", "Chat history", "File sharing", "Canned responses", "Analytics"] },
                      { name: "SMS Campaigns", functions: ["SMS sending", "Contact lists", "Campaign management", "Delivery tracking", "Analytics", "Integration"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="pos" className="space-y-4">
                  <AppFunctionsList
                    title="Point of Sale (POS)"
                    apps={[
                      { name: "POS System", functions: ["Touch-friendly interface", "Product selection", "Payment processing", "Receipt printing", "Session management", "Cash drawer control"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="subscriptions" className="space-y-4">
                  <AppFunctionsList
                    title="Subscriptions"
                    apps={[
                      { name: "Subscription Management", functions: ["Plan management", "Recurring billing", "Payment gateway integration", "Customer portal", "Renewal automation", "Metrics & analytics"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="purchasing" className="space-y-4">
                  <AppFunctionsList
                    title="Purchasing"
                    apps={[
                      { name: "Purchase Management", functions: ["Purchase orders", "Vendor management", "RFQ process", "Receiving", "Three-way matching", "Purchase analytics"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="quality" className="space-y-4">
                  <AppFunctionsList
                    title="Quality Control"
                    apps={[
                      { name: "Quality Management", functions: ["Quality checks", "Inspection points", "Defect tracking", "CAPA management", "Audits", "Compliance reports"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="healthcare" className="space-y-4">
                  <AppFunctionsList
                    title="Healthcare"
                    apps={[
                      { name: "Patient Management", functions: ["Patient records", "Medical history", "Appointments", "Billing", "Insurance", "Prescriptions"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <AppFunctionsList
                    title="Education"
                    apps={[
                      { name: "eLearning Platform", functions: ["Course creation", "Lesson management", "Student enrollment", "Progress tracking", "Assessments", "Certificates"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="restaurant" className="space-y-4">
                  <AppFunctionsList
                    title="Restaurant"
                    apps={[
                      { name: "Restaurant Management", functions: ["Table management", "Reservations", "Order management", "Menu management", "Kitchen display", "Billing"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="hotel" className="space-y-4">
                  <AppFunctionsList
                    title="Hotel"
                    apps={[
                      { name: "Hotel Management", functions: ["Room inventory", "Booking management", "Check-in/out", "Housekeeping", "Guest services", "Revenue management"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="realestate" className="space-y-4">
                  <AppFunctionsList
                    title="Real Estate"
                    apps={[
                      { name: "Property Management", functions: ["Property listings", "Photo management", "Viewing scheduling", "Lease management", "Tenant management", "Maintenance requests"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="construction" className="space-y-4">
                  <AppFunctionsList
                    title="Construction"
                    apps={[
                      { name: "Construction Management", functions: ["Job management", "Project tracking", "Cost tracking", "Material management", "Labor tracking", "Progress reports"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="helpdesk" className="space-y-4">
                  <AppFunctionsList
                    title="Helpdesk"
                    apps={[
                      { name: "Customer Support", functions: ["Ticket management", "Ticket routing", "SLA management", "Knowledge base", "Customer portal", "Support analytics"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="automation" className="space-y-4">
                  <AppFunctionsList
                    title="Automation"
                    apps={[
                      { name: "Workflow Automation", functions: ["Rule builder", "Triggers & actions", "Conditional logic", "Scheduled tasks", "Integration automation", "Execution history"] }
                    ]}
                  />
                </TabsContent>

                <TabsContent value="integrations" className="space-y-4">
                  <AppFunctionsList
                    title="Integrations"
                    apps={[
                      { name: "Third-Party Integrations", functions: ["Payment gateways", "Shipping providers", "Accounting software", "Email services", "Marketplace sync", "API management"] }
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Enhanced Features */}
        <section className="space-y-6">
          <div className="space-y-3 text-center">
            <Badge variant="secondary" className="border-transparent bg-yellow-100 text-yellow-800">
              🌟 Beyond standard ERP
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Innovation built in, not bolted on</h2>
            <p className="mx-auto max-w-3xl text-base text-muted-foreground">
              Automate decisions, customize without code, and scale confidently with global-ready infrastructure and observability.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: Zap,
                accent: 'bg-yellow-50 text-yellow-600 ring-yellow-200',
                title: 'AI copilots everywhere',
                description:
                  'Natural language queries, predictive analytics, anomaly detection, and proactive insights across every module.',
              },
              {
                icon: Settings,
                accent: 'bg-blue-50 text-blue-600 ring-blue-200',
                title: 'No-code studio',
                description:
                  'Drag-and-drop workflows, dashboard builders, dynamic forms, and component kits for rapid customization.',
              },
              {
                icon: Globe,
                accent: 'bg-green-50 text-green-600 ring-green-200',
                title: 'Global-ready multi-tenancy',
                description:
                  'Isolated data per tenant, custom branding, regional compliance, localized content, and flexible billing models.',
              },
              {
                icon: BarChart3,
                accent: 'bg-purple-50 text-purple-600 ring-purple-200',
                title: 'Observable architecture',
                description:
                  'Event streams, audit trails, SLO dashboards, and deep integrations with BI tools to analyze operations in real time.',
              },
            ].map(({ icon: Icon, accent, title, description }) => (
              <Card key={title} className="group relative overflow-hidden border-none bg-white/90 shadow-md ring-1 ring-gray-200/70 transition hover:-translate-y-1 hover:ring-2 hover:ring-blue-200">
                <CardHeader className="space-y-3">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Implementation Status */}
        <section className="rounded-3xl border border-green-200/70 bg-gradient-to-br from-green-50 via-white to-white p-8 shadow-lg">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4 md:max-w-xl">
              <Badge variant="outline" className="border-green-300 bg-green-50 text-green-700">
                ✅ Implementation complete
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Production hardened & fully automated</h2>
              <p className="text-base text-muted-foreground">
                Every module ships with CRUD UIs, robust APIs, validation, and tenant-aware governance. Deploy with confidence knowing the platform covers your entire operating stack.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'Role-based access & audit log',
                  'Real-time search & export utilities',
                  'Automated alerts & escalation workflows',
                  'Tenant isolation with custom domains',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              {[
                { label: 'Sales & CRM', color: 'bg-blue-500' },
                { label: 'Accounting & Finance', color: 'bg-emerald-500' },
                { label: 'Inventory & Operations', color: 'bg-purple-500' },
                { label: 'HR & People', color: 'bg-orange-500' },
                { label: 'Purchasing & Manufacturing', color: 'bg-rose-500' },
                { label: 'Projects & Tasks', color: 'bg-indigo-500' },
                { label: 'User Management & Settings', color: 'bg-slate-700' },
              ].map(({ label, color }) => (
                <ProgressBar key={label} label={label} percentage={100} color={color} />
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-green-200/70 bg-white/90 p-6">
            <h3 className="text-lg font-semibold text-gray-900">What's inside the box?</h3>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              {[
                'Complete CRUD flows and validation patterns',
                'REST + GraphQL-ready adapters with auth',
                'Responsive dashboards & analytics widgets',
                'Global filters, exports (CSV, Excel, PDF)',
                'Automated email templates & notifications',
                'Service layer with error handling helpers',
                'Async jobs, webhooks & background tasks',
                'Observability hooks for metrics & logs',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 px-8 py-12 text-white shadow-2xl">
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-36 w-36 rounded-full bg-sky-400/40 blur-3xl" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Launch your ERP in days, not months</h2>
            <p className="max-w-2xl text-base text-sky-100 md:text-lg">
              Sign in to explore the entire workspace, or jump straight into the dashboard to witness end-to-end automation — from CRM to operations — already wired for multi-tenant scale.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2 rounded-full bg-white text-blue-600 hover:bg-white/90">
                  Get instant access
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="rounded-full border-white/60 bg-white/10 text-white hover:bg-white/20">
                  Explore live dashboard
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-sky-100/90">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Enterprise SSO ready
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Guided onboarding workspace
              </div>
              <div className="flex items-center gap-2">
                <CloudCog className="h-4 w-4" />
                API & webhook sandbox included
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-slate-200/60 bg-slate-950 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),_transparent_65%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr,1fr,1fr]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                SLICT ERP 2025
              </div>
              <h3 className="text-3xl font-semibold text-white">The multi-tenant ERP starter you can ship today.</h3>
              <p className="text-sm text-slate-400">
                SaaS-ready infrastructure, modular workflows, enterprise guardrails, and AI automation — all in a single Next.js codebase.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Features</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2"><Sparkles className="mt-0.5 h-4 w-4 text-blue-400" /> 50+ business-ready modules</li>
                <li className="flex items-start gap-2"><CloudCog className="mt-0.5 h-4 w-4 text-blue-400" /> Multi-tenant isolation & branding</li>
                <li className="flex items-start gap-2"><Zap className="mt-0.5 h-4 w-4 text-blue-400" /> AI copilots & workflow automations</li>
                <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-blue-400" /> Security, RBAC, and audit trails</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Technology</h4>
              <p className="text-sm text-slate-400">Built with modern technologies:</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Next.js 15 • React 18 • TypeScript</li>
                <li>Prisma ORM • PostgreSQL • Drizzle-ready</li>
                <li>Tailwind CSS • Radix UI • Shadcn/ui</li>
                <li>Background jobs • Webhooks • BI-ready</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-800/80 pt-8 text-sm text-slate-500 md:flex-row">
            <p>Built with ❤️ using Next.js, TypeScript, and Prisma</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500/80">
              <span>© 2025 SLICT ERP. All rights reserved.</span>
              <Link href="/legal/privacy" className="hover:text-slate-300">Privacy</Link>
              <Link href="/legal/terms" className="hover:text-slate-300">Terms</Link>
              <Link href="/support" className="hover:text-slate-300">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  apps,
  accent,
}: FeatureCategory) {
  return (
    <Card className="group relative overflow-hidden border-none bg-white/90 shadow-md ring-1 ring-gray-200/70 transition-all hover:-translate-y-1 hover:ring-2 hover:ring-blue-200">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400/70 via-sky-400/80 to-purple-400/70 opacity-0 transition-opacity group-hover:opacity-100" />
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.bg} ${accent.text}`}>
            <Icon className="h-6 w-6" />
          </span>
          <Badge variant="outline" className="border-gray-200 bg-white/80 text-gray-700">
            {apps} apps
          </Badge>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
          <CardDescription className="text-base leading-relaxed text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}

function ProgressBar({ 
  label, 
  percentage, 
  color 
}: { 
  label: string; 
  percentage: number; 
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-gray-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${color} h-2.5 rounded-full transition-all`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function AppFunctionsList({
  title,
  apps
}: {
  title: string;
  apps: Array<{ name: string; functions: string[] }>;
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-gray-900">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apps.map((app, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-green-600" />
                {app.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {app.functions.map((func, funcIndex) => (
                  <li key={funcIndex} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{func}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
