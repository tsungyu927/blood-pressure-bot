import { RecordDataProps } from '../../interface/I_Data';

export const GET_DATA = 'GET_DATA';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';

export interface GetDataSuccessPayload {
  record: RecordDataProps[]
}

export interface GetDataFailurePayload {
  error: string;
}

export type GetDataAction = {
  type: typeof GET_DATA;
  userId: string;
};

export type GetDataSuccessAction = {
  type: typeof GET_DATA_SUCCESS;
  payload: GetDataSuccessPayload;
};

export type GetDataFailureAction = {
  type: typeof GET_DATA_FAILURE;
  payload: GetDataFailurePayload;
};

export type GetDataTypes = GetDataAction | GetDataSuccessAction | GetDataFailureAction;
