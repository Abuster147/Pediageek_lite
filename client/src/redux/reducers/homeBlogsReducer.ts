import { unique } from "jquery";
import {
  GET_HOME_BLOGS,
  HOME_BLOGS_AFTER_LOGIN,
  IGetHomeBlogsType,
  IHomeBlogs,
  IHomeBlogsType,
} from "../types/blogType";
const initialState = {
  blogs: [],
  total: 0, //total number of pages present in the data base
  count: 0, //page scrolled
};

const homeBlogsReducer = (
  state: IHomeBlogs = initialState,
  action: IHomeBlogsType
): IHomeBlogs => {
  switch (action.type) {
    case GET_HOME_BLOGS: {
      return {
        total: action.payload.total,
        count: state.count + 1,
        blogs: [...new Set([...state.blogs, ...action.payload.blogs])],
      };
    }
    case HOME_BLOGS_AFTER_LOGIN: {
      return initialState;
    }
    default:
      return state;
  }
};

export default homeBlogsReducer;
