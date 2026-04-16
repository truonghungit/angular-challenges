import { inject, Injectable } from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserRoleService {
  private readonly userStore = inject(UserStore);

  hasAnyRole(roles: Role[]): boolean {
    const user = this.userStore.getUser();
    const userRoles = user()?.roles ?? [];

    return roles.some((role) => userRoles.includes(role));
  }

  hasAllRoles(roles: Role[]): boolean {
    const user = this.userStore.getUser();
    const userRoles = user()?.roles ?? [];

    return roles.every((role) => userRoles.includes(role));
  }

  hasRole(role: Role): boolean {
    return this.hasAnyRole([role]);
  }

  isSuperAdminUser(): boolean {
    const user = this.userStore.getUser();
    return user()?.isAdmin ?? false;
  }
}
