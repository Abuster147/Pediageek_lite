import { IPreferance } from "../../utils/TypeScript";
import { GET_PREFERANCE, IGetPreferanceType } from "../types/preferanceType";

const inti = {
  country: "",
  state: "",
  city: "",
  locality: "",
  language: [],
  interests: [],
  isdark: true,
}; 
const preferanceReducer = (
  state: IPreferance = inti,
  action: IGetPreferanceType
): IPreferance => {
  switch (action.type) {
    case GET_PREFERANCE:
      return action.payload;
    default:
      return state;
  }
};

export default preferanceReducer;
