'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  FileText,
  Calendar,
  Settings,
  Factory,
  CreditCard,
  Brain,
  Palette,
  Heart,
  Truck,
  MessageCircle,
  Link as LinkIcon,
  Headphones,
  Mail,
  UserCircle,
  ClipboardList,
  Globe,
  FileEdit,
  CalendarDays,
  CheckCircle,
  BarChart3,
  DollarSign,
  BookOpen,
  Home,
  Utensils,
  Hotel as HotelIcon,
  BookText,
  MessageSquare,
  Zap,
  ShoppingBag,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  
  // Core Business
  {
    name: 'Sales & CRM',
    href: '/sales',
    icon: ShoppingCart,
    children: [
      { name: 'Overview', href: '/sales' },
      { name: 'Customers', href: '/sales/customers' },
      { name: 'Leads', href: '/sales/leads' },
      { name: 'Opportunities', href: '/sales/opportunities' },
      { name: 'Orders', href: '/sales/orders' },
      { name: 'Quotations', href: '/sales/quotations' },
    ],
  },
  {
    name: 'Accounting',
    href: '/accounting',
    icon: FileText,
    children: [
      { name: 'Overview', href: '/accounting' },
      { name: 'Invoices', href: '/accounting/invoices' },
      { name: 'Payments', href: '/accounting/payments' },
    ],
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    children: [
      { name: 'Overview', href: '/inventory' },
      { name: 'Products', href: '/inventory/products' },
      { name: 'Categories', href: '/inventory/categories' },
      { name: 'Warehouses', href: '/inventory/warehouses' },
      { name: 'Movements', href: '/inventory/movements' },
    ],
  },
  {
    name: 'Manufacturing',
    href: '/manufacturing',
    icon: Factory,
    children: [
      { name: 'Overview', href: '/manufacturing' },
      { name: 'Bill of Materials', href: '/manufacturing/bom' },
      { name: 'Work Orders', href: '/manufacturing/work-orders' },
    ],
  },
  { name: 'Quality Control', href: '/quality', icon: CheckCircle },
  {
    name: 'Purchasing',
    href: '/purchasing',
    icon: Truck,
    children: [
      { name: 'Orders', href: '/purchasing/orders' },
      { name: 'Vendors', href: '/purchasing/vendors' },
    ],
  },
  
  // People & Support
  {
    name: 'HR & People',
    href: '/hr',
    icon: Users,
    children: [
      { name: 'Overview', href: '/hr' },
      { name: 'Employees', href: '/hr/employees' },
      { name: 'Departments', href: '/hr/departments' },
    ],
  },
  { name: 'Helpdesk', href: '/helpdesk', icon: Headphones },
  { name: 'Contacts', href: '/contacts', icon: UserCircle },
  { name: 'Live Chat', href: '/livechat', icon: MessageCircle },
  { name: 'Knowledge Base', href: '/knowledge', icon: BookText },
  { name: 'Community Forum', href: '/forum', icon: MessageSquare },
  
  // Projects & Productivity
  { name: 'Projects', href: '/projects', icon: Calendar },
  { name: 'Calendar', href: '/calendar', icon: CalendarDays },
  
  // Website & Marketing
  { name: 'Website', href: '/website', icon: Globe },
  { name: 'Blog', href: '/blog', icon: FileEdit },
  { name: 'eLearning', href: '/courses', icon: BookOpen },
  { name: 'Email Marketing', href: '/email-marketing', icon: Mail },
  { name: 'Events', href: '/events', icon: CalendarDays },
  { name: 'Surveys', href: '/surveys', icon: ClipboardList },
  
  // eCommerce
  { name: 'Shopping Cart', href: '/cart', icon: ShoppingBag },
  
  // Sales Channels
  { name: 'Point of Sale', href: '/pos', icon: CreditCard },
  { name: 'Subscriptions', href: '/subscriptions', icon: DollarSign },
  
  // Integration & Automation
  {
    name: 'Integrations',
    href: '/integrations',
    icon: LinkIcon,
    children: [
      { name: 'Overview', href: '/integrations' },
      { name: 'Courier Tracking', href: '/integrations/tracking' },
      { name: 'Messages', href: '/integrations/messages' },
    ],
  },
  { name: 'AI & Automation', href: '/ai', icon: Brain },
  { name: 'No-Code Studio', href: '/studio', icon: Palette },
  { name: 'Automation Rules', href: '/automation', icon: Zap },
  
  // Industry Verticals
  { name: 'Healthcare', href: '/healthcare', icon: Heart },
  { name: 'Real Estate', href: '/real-estate', icon: Home },
  { name: 'Restaurant', href: '/restaurant', icon: Utensils },
  { name: 'Hotel', href: '/hotel', icon: HotelIcon },
  
  // Analytics & Admin
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    children: [
      { name: 'Overview', href: '/settings' },
      { name: 'Company', href: '/settings/company' },
      { name: 'Users', href: '/settings/users' },
      { name: 'Roles', href: '/settings/roles' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">SLICT ERP</h1>
        <p className="text-sm text-gray-400">Complete ERP Solution</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const hasChildren = item.children && item.children.length > 0;

          if (hasChildren) {
            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>

                {isActive && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
                          ${
                            pathname === child.href
                              ? 'bg-blue-500 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }
                        `}
                      >
                        <span>{child.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="text-sm text-gray-400">
          Version 2025.1.0
        </div>
      </div>
    </div>
  );
}
