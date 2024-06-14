import { createAction, props } from '@ngrx/store';

interface UserMetadata {
  id: string;
  name: string;
  [key: string]: unknown;
}

export const setUserMetadata = createAction(
  '[User] Set User Metadata',
  props<{ metadata: UserMetadata }>()
);
