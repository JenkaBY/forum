import { User } from '../shared/entity/user';

// {"error":"invalid_grant","error_description":"User is disabled"} if enabled
// {"error":"invalid_grant","error_description":"User account is locked"} if accountNonLocked
export class OAuthTokensData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  user: User;
}
