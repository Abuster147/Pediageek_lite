import {
  GET_BLOGS_CATEGORY_ID,
  IBlogsCategory,
  IGetBlogsCategoryType,
} from "../types/blogType";

const blogsCategoryReducer = (
  state: IBlogsCategory[] = [],
  action: IGetBlogsCategoryType
): IBlogsCategory[] => {
  switch (action.type) {
    case GET_BLOGS_CATEGORY_ID:
      if (state.every((item) => item.id !== action.payload.id)) {
        return [...state, action.payload];
      } else {
        return state.map((blog) =>
          blog.id === action.payload.id
            ? {
                id: blog.id,
                total: action.payload.total,
                blogs: [...blog.blogs, ...action.payload.blogs],
                page: action.payload.page,
              }
            : blog
        );
      }

    default:
      return state;
  }
};

export default blogsCategoryReducer;
