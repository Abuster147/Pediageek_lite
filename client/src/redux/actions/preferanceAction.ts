import { Dispatch } from "redux";
import { AUTH, IAuth, IAuthType } from "../types/authType";
import { IAlertType, ALERT } from "../types/alertType";
import { getAPI, postAPI } from "../../utils/FetchData";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { GET_HOME_BLOGS, IGetHomeBlogsType } from "../types/blogType";

export const updateUserPre =
  (interests: string[], categoryid: string[], auth: IAuth) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    try {
      const res = await postAPI(
        "preferance",
        {
          interests: interests,
          categoryid: categoryid,
        },
        access_token
      );
      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            preferance: true,
          },
        },
      }); 
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
export const updateOtherInfo =
  (
    gender: string,
    work: string,
    aspire: string,
    organization: string,
    auth: IAuth,
    birthday?: string
  ) =>
  async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    try {
      const res = await postAPI(
        "updateotherinfo",
        {
          work: work ? work : auth.user.work,
          gender: gender ? gender : auth.user.gender,
          organization: organization ? organization : auth.user.organization,
          aspire: aspire ? aspire : auth.user.aspire,
          birthday: birthday ? birthday : auth.user.birthday,
        },
        access_token
      );
      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            work: work ? work : auth.user.work,
            gender: gender ? gender : auth.user.gender,
            organization: organization ? organization : auth.user.organization,
            aspire: aspire ? aspire : auth.user.aspire,
            birthday: birthday ? birthday : auth.user.birthday,
          },
        },
      });

      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };

export const updateLocation =
  (locality: string, city: string, state: string, country: string, auth) =>
  async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType | IAuthType>) => {
    if (!auth.access_token || !auth.user) return;
    const result = await checkTokenExp(auth.access_token, dispatch);
    const access_token = result ? result : auth.access_token;
    try {
      const res = await postAPI(
        "updatelocation",
        {
          locality: locality ? locality : auth.user.locality,
          city: city ? city : auth.user.city,
          state: state ? state : auth.user.state,
          country: country ? country : auth.user.country,
        },
        access_token
      );
      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            locality: locality ? locality : auth.user.locality,
            city: city ? city : auth.user.city,
            state: state ? state : auth.user.state,
            country: country ? country : auth.user.country,
          },
        },
      });
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (err: any) {
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
    }
  };
