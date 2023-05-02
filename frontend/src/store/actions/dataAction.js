import { toast } from "react-toastify";
import service from "../../service";
import {
  DATA_FAIL,
  DATA_REQUEST,
  DATA_SUCCESS,
  DEFAULT_DATA_CSV_FAIL,
  DEFAULT_DATA_CSV_REQUEST,
  DEFAULT_DATA_CSV_SUCCESS,
  DEFAULT_DATA_FAIL,
  DEFAULT_DATA_REQUEST,
  DEFAULT_DATA_SUCCESS,
  N_DATA_FAIL,
  N_DATA_REQUEST,
  N_DATA_SUCCESS,
} from "../constant/covidDataConstant";

// Load user
export const getData = (from, to, type, country) => async (dispatch) => {
  try {
    dispatch({ type: DATA_REQUEST });
    if (type == 1) {
      const data = await service.get(
        `/covid/data?from=${from}&to=${to}&type=1`
      );

      dispatch({
        type: DATA_SUCCESS,
        payload: data,
      });
    } else {
      const data = await service.get(`/covid/data?type=2`);

      dispatch({
        type: DATA_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: DATA_FAIL,
      payload: error.response,
    });
  }
};

// Load NcONtent
export const getNContentData = () => async (dispatch) => {
  try {
    dispatch({ type: N_DATA_REQUEST });
    const data = await service.get(`/covid/ncontent`);

    dispatch({
      type: N_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: N_DATA_FAIL,
      payload: error.response,
    });
  }
};

export const getDefaultData = (datas, type) => async (dispatch) => {
  try {
    dispatch({ type: DEFAULT_DATA_REQUEST, payload: { type: type } });
    const data = await service.post(`/covid/default`, {
      sql: datas,
    });

    console.log(data);
    dispatch({
      type: DEFAULT_DATA_SUCCESS,
      payload: { data, type },
    });
  } catch (error) {
    dispatch({
      type: DEFAULT_DATA_FAIL,
      payload: error.response,
    });
  }
};

export const getDefaultDataCSV = (datas) => async (dispatch) => {
  try {
    dispatch({ type: DEFAULT_DATA_CSV_REQUEST });
    const data = await service.post(`/covid/default/csv`, {
      sql: datas,
    });

    console.log(data);
    dispatch({
      type: DEFAULT_DATA_CSV_SUCCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: DEFAULT_DATA_CSV_FAIL,
      payload: error.response,
    });
  }
};
