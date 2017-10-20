import { User } from "../model/user";

export class OAuthTokensData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  user: User;
}
