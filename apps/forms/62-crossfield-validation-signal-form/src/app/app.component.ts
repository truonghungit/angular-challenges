import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  email,
  FieldContext,
  form,
  FormField,
  FormRoot,
  minLength,
  required,
  SchemaPath,
  validate,
} from '@angular/forms/signals';

function matchValue(
  targetFieldPath: SchemaPath<string>,
  options?: { message?: string },
) {
  return (ctx: FieldContext<string>) => {
    const { value, valueOf } = ctx;

    const currentValue = value();
    if (!currentValue) {
      return null;
    }

    const targetValue = valueOf(targetFieldPath);

    if (currentValue !== targetValue) {
      return {
        kind: 'valueDoNotMatch',
        message: options?.message ?? 'Values do not match',
      };
    }

    return null;
  };
}

function afterDate(
  targetFieldPath: SchemaPath<string>,
  options?: { message?: string },
) {
  return (ctx: FieldContext<string>) => {
    const { value, valueOf } = ctx;

    const endDate = value();
    if (!endDate) {
      return null;
    }

    const startDate = valueOf(targetFieldPath);
    if (!startDate) {
      return null;
    }

    const endDateTime = new Date(endDate).getTime();
    const startDateTime = new Date(startDate).getTime();

    if (isNaN(endDateTime) || isNaN(startDateTime)) {
      return null;
    }

    if (endDateTime <= startDateTime) {
      return {
        kind: 'afterDate',
        message: options?.message ?? 'Date must be after the reference date',
      };
    }

    return null;
  };
}

type RegistrationFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  startDate: string;
  endDate: string;
};

const initialRegistrationFormData: RegistrationFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  startDate: '',
  endDate: '',
};

@Component({
  selector: 'app-root',
  imports: [FormRoot, FormField, JsonPipe],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isSubmitted = signal(false);

  model = signal<RegistrationFormData>(initialRegistrationFormData);

  form = form(
    this.model,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email is required' });
      email(schemaPath.email, {
        message: 'Please enter a valid email address',
      });
      required(schemaPath.password, { message: 'Password is required' });
      minLength(schemaPath.password, 6, {
        message: 'Password must be at least 6 characters',
      });
      required(schemaPath.confirmPassword, {
        message: 'Please confirm your password',
      });
      required(schemaPath.startDate, { message: 'Start date is required' });
      required(schemaPath.endDate, { message: 'End date is required' });
      validate(
        schemaPath.confirmPassword,
        matchValue(schemaPath.password, {
          message: 'Passwords do not match',
        }),
      );
      validate(
        schemaPath.endDate,
        afterDate(schemaPath.startDate, {
          message: 'End date must be after start date',
        }),
      );
    },
    {
      submission: {
        action: async (f) => {
          if (f().valid()) {
            this.isSubmitted.set(true);
          }
        },
      },
    },
  );

  onReset() {
    this.form().reset(initialRegistrationFormData);
    this.isSubmitted.set(false);
  }
}
