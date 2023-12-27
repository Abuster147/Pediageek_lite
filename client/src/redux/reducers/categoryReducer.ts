import * as types from "../types/categoryType";
import { ICategory } from "../../utils/TypeScript";

const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const categoryReducer = (
  state: ICategory[] = [],
  action: types.ICategoryType
): ICategory[] => {
  switch (action.type) {
    case types.CREATE_CATEGORY:
      return [action.payload, ...state];

    case types.GET_CATEGORIES:
      return getShuffledArr(action.payload);

    case types.UPDATE_CATEGORY:
      return state.map((item) =>
        item._id === action.payload._id
          ? { ...item, name: action.payload.name }
          : item
      );

    case types.DELETE_CATEGORY:
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

export default categoryReducer;
