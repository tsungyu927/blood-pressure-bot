import { createSelector } from '@reduxjs/toolkit';

import { AppState } from './redux/reducers';

const getLoading = (state: AppState) => state.record.loading;

const getRecord = (state: AppState) => state.record.record;

export const getRecordSelector = createSelector(getRecord, (record) => record);

export const getLoadingSelector = createSelector(getLoading, (loading) => loading);
