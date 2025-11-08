'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Save, X, Eye, EyeOff } from 'lucide-react';

const userSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: z.enum(['ADMIN', 'MANAGER', 'USER', 'VIEWER']),
  department: z.string().optional(),
  isActive: z.boolean(),
  permissions: z.object({
    sales: z.boolean(),
    accounting: z.boolean(),
    inventory: z.boolean(),
    hr: z.boolean(),
    purchasing: z.boolean(),
    manufacturing: z.boolean(),
    projects: z.boolean(),
    reports: z.boolean(),
  }),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData?: Partial<UserFormData> & { id?: string };
  onSubmit: (data: UserFormData) => Promise<void>;
  onCancel: () => void;
}

export function UserForm({
  initialData,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      email: initialData?.email || '',
      password: '',
      role: initialData?.role || 'USER',
      department: initialData?.department || '',
      isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
      permissions: {
        sales: initialData?.permissions?.sales || false,
        accounting: initialData?.permissions?.accounting || false,
        inventory: initialData?.permissions?.inventory || false,
        hr: initialData?.permissions?.hr || false,
        purchasing: initialData?.permissions?.purchasing || false,
        manufacturing: initialData?.permissions?.manufacturing || false,
        projects: initialData?.permissions?.projects || false,
        reports: initialData?.permissions?.reports || false,
      },
    },
  });

  const role = watch('role');
  const isActive = watch('isActive');

  const onFormSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-assign permissions based on role
  const handleRoleChange = (newRole: string) => {
    setValue('role', newRole as any);
    
    if (newRole === 'ADMIN') {
      // Admin gets all permissions
      setValue('permissions.sales', true);
      setValue('permissions.accounting', true);
      setValue('permissions.inventory', true);
      setValue('permissions.hr', true);
      setValue('permissions.purchasing', true);
      setValue('permissions.manufacturing', true);
      setValue('permissions.projects', true);
      setValue('permissions.reports', true);
    } else if (newRole === 'VIEWER') {
      // Viewer gets only view permissions
      setValue('permissions.sales', false);
      setValue('permissions.accounting', false);
      setValue('permissions.inventory', false);
      setValue('permissions.hr', false);
      setValue('permissions.purchasing', false);
      setValue('permissions.manufacturing', false);
      setValue('permissions.projects', false);
      setValue('permissions.reports', true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="John"
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Doe"
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john.doe@company.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">
                Password {!initialData?.id && '*'}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder={initialData?.id ? 'Leave blank to keep current' : 'Min 8 characters'}
                  className={errors.password ? 'border-red-500' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label 
                htmlFor="role" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Role *
              </label>
              <Select defaultValue={initialData?.role || undefined}>
                <SelectTrigger className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="VIEWER">Viewer</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                {...register('department')}
                placeholder="Sales, IT, HR..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={(checked) => setValue('isActive', checked)}
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active Account
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Module Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="sales"
                  checked={watch('permissions.sales')}
                  onCheckedChange={(checked) => setValue('permissions.sales', checked)}
                  disabled={role === 'ADMIN'}
                />
                <Label htmlFor="sales" className="cursor-pointer">
                  Sales & CRM
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="accounting"
                  checked={watch('permissions.accounting')}
                  onCheckedChange={(checked) => setValue('permissions.accounting', checked)}
                  disabled={role === 'ADMIN'}
                />
                <Label htmlFor="accounting" className="cursor-pointer">
                  Accounting
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="inventory"
                  checked={watch('permissions.inventory')}
                  onCheckedChange={(checked) => setValue('permissions.inventory', checked)}
                  disabled={role === 'ADMIN'}
                />
                <Label htmlFor="inventory" className="cursor-pointer">
                  Inventory
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="hr"
                  checked={watch('permissions.hr')}
                  onCheckedChange={(checked) => setValue('permissions.hr', checked)}
                  disabled={role === 'ADMIN'}
                />
                <Label htmlFor="hr" className="cursor-pointer">
                  Human Resources
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="purchasing"
                  checked={watch('permissions.purchasing')}
                  onCheckedChange={(checked) => setValue('permissions.purchasing', checked)}
                  disabled={role === 'ADMIN'}
                />
                <Label htmlFor="purchasing" className="cursor-pointer">
                  Purchasing
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="manufacturing"
                  checked={watch('permissions.manufacturing')}
                  onCheckedChange={(checked) => setValue('permissions.manufacturing', checked)}
                  disabled={role === 'ADMIN'}
                />
                <Label htmlFor="manufacturing" className="cursor-pointer">
                  Manufacturing
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="projects"
                  checked={watch('permissions.projects')}
                  onCheckedChange={(checked) => setValue('permissions.projects', checked)}
                  disabled={role === 'ADMIN'}
                />
                <Label htmlFor="projects" className="cursor-pointer">
                  Projects
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="reports"
                  checked={watch('permissions.reports')}
                  onCheckedChange={(checked) => setValue('permissions.reports', checked)}
                  disabled={role === 'ADMIN'}
                />
                <Label htmlFor="reports" className="cursor-pointer">
                  Reports & Analytics
                </Label>
              </div>
            </div>

            {role === 'ADMIN' && (
              <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                ℹ️ Administrators have access to all modules by default
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Saving...' : initialData?.id ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
}
