import { hasRoleGuard, isAdminGuard } from './has-role.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [isAdminGuard],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [hasRoleGuard(['MANAGER'])],
    data: { role: 'MANAGER' },
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [hasRoleGuard(['READER'])],
    data: { role: 'READER' },
    loadComponent: () =>
      import('./dashboard/reader.component').then(
        (m) => m.ReaderDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [hasRoleGuard(['WRITER'])],
    data: { role: 'WRITER' },
    loadComponent: () =>
      import('./dashboard/writer.component').then(
        (m) => m.WriterDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [hasRoleGuard(['CLIENT'])],
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent,
      ),
  },
];
