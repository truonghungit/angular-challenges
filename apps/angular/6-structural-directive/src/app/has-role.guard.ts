import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { UserRoleService } from './user-role.service';
import { Role } from './user.model';

export const isAdminGuard: CanMatchFn = () => {
  const userRoleService = inject(UserRoleService);

  return userRoleService.isSuperAdminUser();
};

export const hasRoleGuard = (roles: Role[]): CanMatchFn => {
  return () => {
    const userRoleService = inject(UserRoleService);

    return userRoleService.hasAnyRole(roles);
  };
};
