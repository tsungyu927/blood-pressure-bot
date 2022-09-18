import {
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  GetDataAction,
  GetDataSuccessPayload,
  GetDataSuccessAction,
  GetDataFailurePayload,
  GetDataFailureAction,
} from './constants';

export const getData = (userId: string): GetDataAction => ({
  type: GET_DATA,
  userId,
});

export const getDataSuccess = (payload: GetDataSuccessPayload): GetDataSuccessAction => ({
  type: GET_DATA_SUCCESS,
  payload,
});

export const getDataFailure = (payload: GetDataFailurePayload): GetDataFailureAction => ({
  type: GET_DATA_FAILURE,
  payload,
});
