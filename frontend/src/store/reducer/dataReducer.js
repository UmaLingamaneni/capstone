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

export const dataReducer = (
  state = { data: {}, defData: {}, success: false, loading: false, nData: {} },
  action
) => {
  switch (action.type) {
    case DATA_REQUEST:
      return { ...state, loading: true };
    case DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case DATA_FAIL:
      return {
        ...state,
        loading: false,
      };

    case N_DATA_REQUEST:
      return { ...state, loading: true };
    case N_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        nData: action.payload,
      };
    case N_DATA_FAIL:
      return {
        ...state,
        loading: false,
      };

    case DEFAULT_DATA_CSV_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DEFAULT_DATA_CSV_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DEFAULT_DATA_CSV_FAIL:
      return {
        ...state,
        loading: false,
      };

    case DEFAULT_DATA_REQUEST:
      return {
        ...state,
        loading: false,
        defData: {
          ...state.defData,
          [action.payload.type]: {
            ...state.defData[action.payload.type],
            loading: true,
          },
        },
      };
    case DEFAULT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        defData: {
          ...state.defData,
          [action.payload.type]: { ...action.payload.data, loading: false },
        },
      };
    case DEFAULT_DATA_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
