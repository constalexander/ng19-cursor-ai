import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent, CardHeaderComponent, CardContentComponent, CardFooterComponent } from '@lib/shared/ui';
import { AppStateService, UpdatePreferencesCommand, SetThemeCommand } from '@lib/core/state/app-state.service';

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
export class SettingsComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private appState = inject(AppStateService);

  form = this.fb.group({
    notifications: this.fb.group({
      pushEnabled: true,
      emailUpdates: true,
    }),
    preferences: this.fb.group({
      language: this.appState.userPreferences().language,
      timezone: this.appState.userPreferences().timezone,
      theme: this.appState.theme(),
    }),
    data: this.fb.group({
      retentionDays: 30,
      autoBackup: false,
      syncFrequency: 'daily' as const,
    }),
  });

  ngOnInit() {
    // Subscribe to form changes to update state
    this.form.get('preferences')?.valueChanges.subscribe(preferences => {
      if (preferences.theme) {
        this.appState.dispatch(new SetThemeCommand(preferences.theme));
      }

      this.appState.dispatch(
        new UpdatePreferencesCommand({
          language: preferences.language,
          timezone: preferences.timezone,
        })
      );
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { preferences } = this.form.getRawValue();

      // Update theme
      this.appState.dispatch(new SetThemeCommand(preferences.theme));

      // Update preferences
      this.appState.dispatch(
        new UpdatePreferencesCommand({
          language: preferences.language,
          timezone: preferences.timezone,
        })
      );

      console.log('Settings updated:', this.form.getRawValue());
    }
  }
}
