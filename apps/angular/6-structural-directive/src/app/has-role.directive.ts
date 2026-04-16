import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({ selector: '[hasRole]' })
export class HasRoleDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly vcRef = inject(ViewContainerRef);
  private readonly userStore = inject(UserStore);

  hasRole = input<Role[], Role | Role[]>([], {
    alias: 'hasRole',
    transform: (v: Role | Role[]) => {
      return typeof v === 'string' ? [v] : v;
    },
  });

  effect = effect(() => {
    const user = this.userStore.getUser();
    const userRoles = user()?.roles ?? [];
    const requiredRoles = this.hasRole() ?? [];

    this.updateView(userRoles, requiredRoles);
  });

  private updateView(userRoles: Role[], requiredRoles: Role[]) {
    this.vcRef.clear();

    if (requiredRoles.length === 0) {
      this.vcRef.createEmbeddedView(this.templateRef);
      return;
    }

    const canAccess = requiredRoles.some((role) =>
      userRoles.includes(role as any),
    );

    if (canAccess) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }
}

@Directive({ selector: '[isSuperAdmin]' })
export class IsSuperAdminDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly vcRef = inject(ViewContainerRef);
  private readonly userStore = inject(UserStore);

  effect = effect(() => {
    const user = this.userStore.getUser();

    this.updateView(user()?.isAdmin);
  });

  private updateView(isAdminUser: boolean | undefined) {
    this.vcRef.clear();

    if (isAdminUser) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }
}
