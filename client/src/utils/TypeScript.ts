import { ChangeEvent, FormEvent } from "react";
import rootReducer from "../redux/reducers/index";

export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootStore = ReturnType<typeof rootReducer>;

export interface IParams {
  page: string;
  slug: string;
}

export interface IUserLogin {
  account: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
  referer?: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  following: string[];
  follower: string[];
  type: string;
  about: string;
  paytm: string;
  updatedAt: string;
  preferance: Boolean;
  _id: string;
  notice: Boolean;
  locality: string;
  city: string;
  state: string;
  country: string;
  language: string[];
  interests: string[];
  birthday: string;
  isdark: Boolean;
  gender: string;
  work: string;
  aspire: string;
  organization: string;
}

export interface IPreferance {
  locality?: string;
  city?: string;
  state?: string;
  country?: string;
  language?: string[];
  interests?: string[];
  birthday?: Date;
  isdark?: Boolean;
}

export interface IUserProfile extends IUserRegister {
  avatar: any;
  about: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  language?: string[];
  interests?: string[];
  birthday?: string;
  isdark?: Boolean;
  gender: string;
  work: string;
  aspire: string;
  organization: string;
}

export interface IUserFollow {
  _id: string;
  following: string[];
  follower: string[];
}

export interface IBalance {
  _id: string;
  balance: number;
  referalbalance: number;
  blogbalance: number;
}

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}

export interface INotification {
  msg: string;
  desc: string;
  createdAt: Date;
  url?: string;
}

export interface ICategory {
  _id?: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog extends GoodBlog {
  _id?: string;
  earn?: number;
  user: IUser | string;
  title: string;
  content: string;
  description: string;
  thumbnail: string | File;
  category: ICategory | string;
  views?: number;
  createdAt: string;
}
export interface GoodBlog {
  like?: number;
  comment?: number;
  share?: number;
  likeuser?: string[];
  commentuser?: string[];
  shareuser?: string[];
}

export interface Recomended extends GoodBlog {
  _id?: string;
  user: IUser;
  title: string;
  content: string;
  description: string;
  thumbnail: string | File;
  category: ICategory | string;
  views?: number;
  createdAt: string;
}



export interface IComment {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_user_id: string;
  content: string;
  replyCM: IComment[];
  reply_user?: IUser;
  comment_root?: string;
  createdAt: string;
}

export interface IName {
  _id: string;
  name: string;
}
