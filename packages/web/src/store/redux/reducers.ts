import { combineReducers } from 'redux';
import { RecordDataProps } from '../../interface/I_Data';
import {
  GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE, GetDataTypes,
} from '../constants';

interface RecordStateProps {
  loading: boolean,
  record: RecordDataProps[]
}

const recordState: RecordStateProps = {
  loading: false,
  record: [],
};

export const recordReducer = (state = recordState, action: GetDataTypes) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        record: action.payload.record,
      };
    case GET_DATA_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

const rootReducer = combineReducers({
  record: recordReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
