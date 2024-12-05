import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent, CardHeaderComponent, CardContentComponent, CardFooterComponent } from '@lib/shared/ui';

interface SettingsForm {
  notifications: {
    pushEnabled: boolean;
    emailUpdates: boolean;
  };
  preferences: {
    language: 'en' | 'es' | 'fr';
    timezone: string;
    theme: 'system' | 'dark' | 'light';
  };
  data: {
    retentionDays: number;
    autoBackup: boolean;
    syncFrequency: 'hourly' | 'daily' | 'weekly';
  };
}

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
  ],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    notifications: this.fb.group({
      pushEnabled: true,
      emailUpdates: true,
    }),
    preferences: this.fb.group({
      language: 'en' as const,
      timezone: 'UTC',
      theme: 'system' as const,
    }),
    data: this.fb.group({
      retentionDays: 30,
      autoBackup: false,
      syncFrequency: 'daily' as const,
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      const settings = this.form.getRawValue();
      console.log('Settings updated:', settings);
    }
  }
}
