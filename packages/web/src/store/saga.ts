import {
  all, call, put, takeEvery, takeLatest, fork,
} from 'redux-saga/effects';

import getValueSync from '../firebase/firebaseInit';
import { RecordDataProps } from '../interface/I_Data';
import { GET_DATA } from './constants';
import { getData as getDataAction, getDataSuccess, getDataFailure } from './slice';
// ...

// Our worker Saga: will perform the async increment task
export function* getData(action: ReturnType<typeof getDataAction>) {
  try {
    const data: RecordDataProps[] = yield call(() => getValueSync(action.userId));
    yield put(getDataSuccess({ record: data }));
  } catch (err) {
    yield put(getDataFailure({ error: err as string }));
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchGetData() {
  yield takeLatest(GET_DATA, getData);
}

function* rootSaga() {
  yield all(
    [
      fork(watchGetData),
    ],
  );
}

export default rootSaga;
