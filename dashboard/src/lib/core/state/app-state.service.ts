import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AppState {
  theme: 'system' | 'dark' | 'light';
  sidebarCollapsed: boolean;
  userPreferences: {
    language: string;
    timezone: string;
  };
}

const initialState: AppState = {
  theme: 'system',
  sidebarCollapsed: false,
  userPreferences: {
    language: 'en',
    timezone: 'UTC',
  },
};

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  // State as signals
  private state = signal<AppState>(initialState);

  // Computed values
  readonly theme = computed(() => this.state().theme);
  readonly sidebarCollapsed = computed(() => this.state().sidebarCollapsed);
  readonly userPreferences = computed(() => this.state().userPreferences);

  // State as observables for reactive patterns
  private stateSubject = new BehaviorSubject<AppState>(initialState);
  readonly state$ = this.stateSubject.asObservable();

  readonly theme$ = this.state$.pipe(map(state => state.theme));
  readonly sidebarCollapsed$ = this.state$.pipe(map(state => state.sidebarCollapsed));
  readonly userPreferences$ = this.state$.pipe(map(state => state.userPreferences));

  // Command pattern for actions
  dispatch(command: StateCommand) {
    const newState = command.execute(this.state());
    this.state.set(newState);
    this.stateSubject.next(newState);
  }
}

// Command Pattern
interface StateCommand {
  execute(state: AppState): AppState;
}

export class SetThemeCommand implements StateCommand {
  constructor(private theme: AppState['theme']) {}

  execute(state: AppState): AppState {
    return { ...state, theme: this.theme };
  }
}

export class ToggleSidebarCommand implements StateCommand {
  execute(state: AppState): AppState {
    return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
  }
}

export class UpdatePreferencesCommand implements StateCommand {
  constructor(private preferences: Partial<AppState['userPreferences']>) {}

  execute(state: AppState): AppState {
    return {
      ...state,
      userPreferences: { ...state.userPreferences, ...this.preferences },
    };
  }
}
