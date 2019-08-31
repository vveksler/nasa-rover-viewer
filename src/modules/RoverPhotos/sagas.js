import { takeEvery, select, put, call } from 'redux-saga/effects';
import { getApiKey } from 'modules/Auth';
import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure
} from './actions';
import { getPhotos } from './api';

function* fetchPhotosWatcher() {
  yield takeEvery(fetchPhotosRequest.toString(), fetchPhotosFlow);
}

export function* fetchPhotosFlow(action) {
  try {
    let response;
    const key = yield select(getApiKey);

    if (key) {
      response = yield call(
        getPhotos,
        key,
        action.payload.name,
        action.payload.sol
      );
    }

    //console.log('PAYLOAD===>', action.payload);

    yield put(
      fetchPhotosSuccess({
        ...action.payload,
        photos: response.photos
      })
    );
  } catch (error) {
    yield put(
      fetchPhotosFailure({
        ...action.payload,
        error
      })
    );
  }
}

export default fetchPhotosWatcher;

// Реализуйте саги
