# SLICT ERP 2025

**Complete Multi-Tenant SaaS ERP System**  
50 + Apps + Enhanced AI Features

## Project Overview

SLICT ERP is a modern, TypeScript-first ERP system that provides complete coverage of all applications plus enhanced features with AI-powered automation, superior no-code customization, and true multi-tenant SaaS architecture.

### Complete Coverage

- **50+  Apps** - Full feature parity with all modules
- **Multi-Tenant SaaS** - True data isolation with subdomain routing
- **AI-Powered** - Natural language queries, predictive analytics, automated insights
- **Modern Stack** - Next.js 14, React 18, TypeScript, Prisma ORM
- **No-Code Studio** - Visual workflow builder and dashboard designer

## Module Coverage

### Sales & CRM (8 apps)
- Sales Orders & Quotations
- CRM Pipeline & Lead Management
- Point of Sale (POS)
- eCommerce Website
- Subscription Management
- Rental Management
- Loyalty Programs

### Accounting & Finance (6 apps)
- Invoicing & Payments
- Account Reports (P&L, Balance Sheet)
- Bank Reconciliation
- Expense Management
- Assets Management
- Budget Management

### Inventory & Operations (7 apps)
- Inventory Management
- Purchase Management
- Manufacturing (MRP)
- Quality Control (QMS)
- Maintenance
- Field Service

### HR & People (7 apps)
- Employees & Attendance
- Recruitment & Applications
- Time Off & Leaves
- Payroll & Expenses
- Appraisal & Skills
- Fleet Management

### Website & Marketing (7 apps)
- Website Builder
- Blog & News
- Email Marketing
- Social Media Integration
- Events Management
- Live Chat

### Productivity Tools (7 apps)
- Projects & Tasks
- Timesheets
- Helpdesk & Support
- Surveys & Forms
- Approvals & Workflows
- Documents & Files

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL database

### Installation

```bash
# Clone the repository
cd ERP_v01

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Initialize the database
pnpm db:push

# Generate Prisma client
pnpm db:generate

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
EERP_v01/
├── config/
│   ├── bfg.jar
│   ├── compare.txt
│   ├── db_setup.txt
│   ├── deploy.sh
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── env/
│   │   ├── .env
│   │   ├── env
│   │   ├── .env.example
│   │   └── env.example
│   ├── .env.production.example
│   ├── .eslintrc.json
│   ├── jest.config.js
│   ├── next.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.js
│   ├── prepare-vercel.sh
│   ├── tailwind.config.ts
│   ├── tailwindcss-animate.d.ts
│   ├── test-apis.sh
│   ├── tsconfig.json
│   └── verify-integrations.sh
├── documentation/
│   ├── README.md
│   └── ROADMAP.md
├── prisma/
│   ├── migrations/
│   │   ├── 20251029163003_complete_erp_all_phases/
│   │   ├── 20251029183951_add_all_missing_modules/
│   │   └── migration_lock.toml
│   ├── create-superadmin.ts
│   ├── create-tenant.ts
│   ├── schema.prisma
│   ├── schema_additions.txt
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── apps/
│   │   ├── accounting/
│   │   ├── ai/
│   │   ├── education/
│   │   ├── healthcare/
│   │   ├── hr/
│   │   ├── inventory/
│   │   ├── manufacturing/
│   │   ├── pos/
│   │   ├── projects/
│   │   ├── README.md
│   │   ├── realestate/
│   │   ├── restaurant/
│   │   ├── sales/
│   │   ├── studio/
│   │   └── subscriptions/
│   ├── components/
│   │   ├── accounting/
│   │   ├── automation/
│   │   ├── construction/
│   │   ├── courses/
│   │   ├── dashboard/
│   │   ├── forum/
│   │   ├── hotel/
│   │   ├── hr/
│   │   ├── integrations/
│   │   ├── inventory/
│   │   ├── knowledge/
│   │   ├── layout/
│   │   ├── livechat/
│   │   ├── loyalty/
│   │   ├── manufacturing/
│   │   ├── modules/
│   │   ├── projects/
│   │   ├── properties/
│   │   ├── providers/
│   │   ├── purchasing/
│   │   ├── restaurant/
│   │   ├── sales/
│   │   ├── settings/
│   │   ├── sms/
│   │   └── ui/
│   ├── hooks/
│   │   ├── useAI.ts
│   │   ├── useHealthcare.ts
│   │   ├── useManufacturing.ts
│   │   ├── usePOS.ts
│   │   └── useSubscriptions.ts
│   ├── lib/
│   │   ├── api-client.ts
│   │   ├── audit.ts
│   │   ├── auth-config.ts
│   │   ├── auth-options.ts
│   │   ├── auth.ts
│   │   ├── calculation-utils.ts
│   │   ├── date-utils.ts
│   │   ├── email-templates.ts
│   │   ├── error-handler.ts
│   │   ├── export-utils.ts
│   │   ├── get-tenant.ts
│   │   ├── integrations/
│   │   ├── jobs/
│   │   ├── next-auth.d.ts
│   │   ├── prisma.ts
│   │   ├── queue/
│   │   ├── rbac.ts
│   │   ├── supabase.ts
│   │   ├── tenant.ts
│   │   ├── utils/
│   │   ├── utils.ts
│   │   └── validation-helpers.ts
│   ├── middleware.ts
│   ├── modules/
│   │   └── integrations/
│   ├── __tests__/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── setup.ts
│   │   └── simple.test.ts
│   └── types/
│       └── next-auth.d.ts
└── vercel/
    ├── .vercelignore
    ├── vercel.json
    └── .vercel/
        ├── project.json
        └── README.txt
## Development Scripts

```bash
# Development
pnpm dev                      # Start dev server
pnpm dev:assign-sales         # Work on Sales & CRM
pnpm dev:assign-accounting    # Work on Accounting
pnpm dev:assign-inventory     # Work on Inventory
pnpm dev:assign-hr            # Work on HR
pnpm dev:assign-website       # Work on Website
pnpm dev:assign-projects      # Work on Projects

# Database
pnpm db:generate              # Generate Prisma client
pnpm db:push                  # Push schema to database
pnpm db:migrate               # Run migrations
pnpm db:studio                # Open Prisma Studio

# Build & Test
pnpm build                    # Build for production
pnpm start                    # Start production server
pnpm test                     # Run tests
pnpm lint                     # Lint code
pnpm type-check               # TypeScript type checking
```

## Multi-Tenant Architecture

SLICT ERP supports true multi-tenancy with data isolation:

### Subdomain Routing
- `demo.slict.lk` - Demo tenant
- `acme.sslict.lk` - Acme Corp tenant
- `widgets.slict.lk` - Widgets Inc tenant

### Local Development
- `demo.localhost:3000` - Demo tenant
- `acme.localhost:3000` - Acme Corp tenant

### Custom Domains
- `erp.acmecorp.com` - Custom domain support
- `system.widgetsinc.com` - Custom domain support

## AI-Powered Features

- **Natural Language ERP Queries** - Ask questions in plain English
- **Predictive Analytics** - AI-powered forecasting and insights
- **Automated Workflows** - Smart automation rules
- **Anomaly Detection** - Automatic issue identification
- **Smart Recommendations** - Context-aware suggestions

## Enhanced Features

- **Enhanced Reporting** - Advanced reporting capabilities
- **Customizable Dashboards** - Personalized dashboard views
- **Advanced Security** - Enhanced security features
- **Integration with Third-Party Services** - Seamless integration with external services
- **Mobile Optimization** - Optimized for mobile devices

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **UI**: TailwindCSS, Radix UI, Lucide Icons
- **State Management**: Zustand, TanStack Query
- **Authentication**: NextAuth.js
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel, Docker support
- **Package Manager**: pnpm
- **Linting/Formatting**: ESLint, Prettier
- **Styling**: Tailwind CSS, CSS Modules
- **Build Tools**: Vite (for component library)
- **Additional Tools**: GitHub Actions for CI/CD, Sentry for error tracking, and New Relic for performance monitoring

## Development Roadmap

### Phase 1: Core Modules (Months 1-3)
- Project setup and architecture
- Sales & CRM
- Accounting & Finance
- Inventory & Operations
- Website & eCommerce

### Phase 2: Advanced Features (Months 4-6)
- Manufacturing (MRP)
- Point of Sale (POS)
- Field Service
- Quality Management

### Phase 3: AI & Automation (Months 7-9)
- AI-powered automation
- Advanced analytics
- No-code studio enhancements
- Mobile applications

### Phase 4: Industry Specialization (Months 10-12)
- Healthcare Management
- Education & eLearning
- Restaurant & Hospitality
- Real Estate Management

## Contributing

We welcome contributions! Please see our contributing guidelines.

## License

This project is proprietary software. All rights reserved.

## Acknowledgments

- Comprehensive ERP coverage
- Built with modern web technologies
- Designed for the next 20 years of ERP evolution

## Contact

For questions and support, please contact the development team.
---

**Built with ❤️ using Next.js, TypeScript, and Prisma**
