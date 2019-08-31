import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
//import produce from 'immer';
import {
  changeSol,
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure
} from './actions';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import defaultTo from 'ramda/src/defaultTo';
import prop from 'ramda/src/prop';
import gt from 'ramda/src/gt';

const sol = handleActions(
  {
    [changeSol]: (state, { payload }) => ({
      ...state,
      current: Math.min(Math.max(payload, state.min), state.max)
    })
  },
  {
    current: 1,
    min: 1,
    max: 100
  }
);

const photos = handleActions(
  {
    [fetchPhotosRequest]: (state, { payload: { name, sol } }) => ({
      ...state,
      [name]: {
        ...state[name],
        [sol]: {
          isLoading: true,
          isLoaded: false,
          photos: []
        }
      }
    }),
    [fetchPhotosSuccess]: (state, { payload: { name, sol, photos } }) => {
      return {
        ...state,
        [name]: {
          ...state[name],
          [sol]: {
            isLoading: false,
            isLoaded: true,
            photos
          }
        }
      };
    },
    [fetchPhotosFailure]: (state, { payload: { name, sol, error } }) => ({
      ...state,
      [name]: {
        ...state[name],
        [sol]: {
          isLoading: false,
          isLoaded: true,
          error: error
        }
      }
    })
  },
  {
    curiosity: {},
    opportunity: {},
    spirit: {}
  }
);

export const getSelectedSol = state => state.roverPhotos.sol.current;
export const getMinSol = state => state.roverPhotos.sol.min;
export const getMaxSol = state => state.roverPhotos.sol.max;

export const getRovers = () => ['curiosity', 'opportunity', 'spirit'];

export const getIsLoading = (state, rover, sol) => {
  return pipe(
    path(['roverPhotos', 'photos', rover, sol, 'isLoading'], defaultTo(false))(
      state
    )
  );
};

export const getRoverPhotos = (state, rover, sol) => {
  return pipe(
    path(['roverPhotos', 'photos', rover, sol, 'photos']),
    defaultTo([])
  )(state);
};

export const isRoverHasPhotosForSol = (state, rover, sol) => {
  return (
    pipe(
      path(['roverPhotos', 'photos', rover, sol, 'photos']),
      defaultTo([]),
      prop('length'),
      gt(0)
    )(state) ||
    pipe(
      path(['roverPhotos', 'photos', rover, sol, 'isLoaded']),
      defaultTo(false)
    )(state)
  );
};

export default combineReducers({
  sol,
  photos
});
// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом
