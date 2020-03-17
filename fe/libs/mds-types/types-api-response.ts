export type MdsResponseAnonymousUser = {
  info: {
    userid: string;
    email: string;
    enc_userid: string;
    enc_email: string;
    hp: string;
    gender: string;
    birthday: string;
    name: string;
    device_id: string;
    expired_time: string;
    user_point: string;
    avatar: string;
  };
  token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
  ip_address: string;
  thor_token: string;
  thor_refresh_token: string;
  thor_expiration: string;
};
