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

export type MyPageData = {
  name: string;
  propertyCount: number;
  checklistCount: number;
};

export type MyPageResponse = {
  code: string;
  message: string;
  data: MyPageData;
};

export type LogoutResponse = {
  code: string;
  message: string;
};
