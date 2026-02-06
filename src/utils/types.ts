type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type TUserPayload = {
  id: number;
  username: string;
  isAdmin: boolean;
};

export type { TPost, TUserPayload };
