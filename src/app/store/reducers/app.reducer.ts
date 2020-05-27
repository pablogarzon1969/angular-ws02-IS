import { ActionReducerMap } from '@ngrx/store';
import * as auth from '../reducers/auth.reducer';


export interface AppState {
  user: auth.State
}

export const appReducers: ActionReducerMap<AppState> = {
  user: auth.authReducer
}
