import { IBlog } from "../../utils/TypeScript";

export const HOME_BLOGS_AFTER_LOGIN = "HOME_BLOGS_AFTER_LOGIN";
export const GET_HOME_BLOGS = "GET_HOME_BLOGS";
export const GET_BLOGS_CATEGORY_ID = "GET_BLOGS_CATEGORY_ID";
export const GET_BLOGS_USER_ID = "GET_BLOGS_USER_ID";
export const CREATE_BLOGS_USER_ID = "CREATE_BLOGS_USER_ID";
export const DELETE_BLOGS_USER_ID = "DELETE_BLOGS_USER_ID";

// export interface IHomeBlogs {
//   _id: string
//   name: string
//   count: number
//   blogs: IBlog[]
// }
export interface IHomeBlogs {
  total: number;
  blogs: IBlog[];
  count: number;
}

export interface IGetHomeBlogsType {
  type: typeof GET_HOME_BLOGS;
  payload: IHomeBlogs;
}

export interface IEraseHomeBlogsType {
  type: typeof HOME_BLOGS_AFTER_LOGIN;
  payload: IHomeBlogs;
}

export interface IBlogsCategory {
  id: string;
  blogs: IBlog[];
  total: number;
  page: number;
}

export interface IGetBlogsCategoryType {
  type: typeof GET_BLOGS_CATEGORY_ID;
  payload: IBlogsCategory;
}

export interface IBlogsUser {
  id: string;
  blogs: IBlog[];
  total: number;
  search: string;
}

export interface IGetBlogsUserType {
  type: typeof GET_BLOGS_USER_ID;
  payload: IBlogsUser;
}

export interface ICreateBlogsUserType {
  type: typeof CREATE_BLOGS_USER_ID;
  payload: IBlog;
}

export interface IDeleteBlogsUserType {
  type: typeof DELETE_BLOGS_USER_ID;
  payload: IBlog;
}

export type IBlogUserType =
  | IGetBlogsUserType
  | ICreateBlogsUserType
  | IDeleteBlogsUserType;

export type IHomeBlogsType = IGetHomeBlogsType | IEraseHomeBlogsType;
