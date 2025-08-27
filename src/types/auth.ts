export type UserData = {
  name: string;
  providerId: string;
  role: string;
};

export type MyInfoResponse = {
  code: string;
  message: string;
  data: UserData;
};

export type LogoutResponse = {
  code: string;
  message: string;
};
