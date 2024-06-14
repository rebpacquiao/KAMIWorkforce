// reducers/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

interface UserMetadata {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  userData: UserMetadata | null;
}

const initialState: UserState = {
  userData: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.setUserMetadata, (state, { metadata }) => ({
    ...state,
    userData: metadata,
  }))
);
