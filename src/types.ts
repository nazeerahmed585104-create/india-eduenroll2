export interface AppState {
  status: 'ready' | 'loading' | 'error';
  message: string;
}
