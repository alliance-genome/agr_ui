import assert from 'assert';
import { fromJS } from 'immutable';

import {
    selectSearchDomain,
    selectSearch,
    selectErrorMessage,
    selectIsError,
    selectResults,
    selectTotal,
    selectPageSize,
    selectTotalPages,
    selectActiveCategory,
    selectAggregations,
} from '../searchSelectors';

describe('SearchSelectors', () => {
    it('selectSearchDomain', () => {
        const searchState = fromJS({
            isError: true,
            results: [],
        });
        const mockedState = {
            search: fromJS(searchState),
        };
        assert.equal(selectSearchDomain(mockedState),searchState);
    });

    it('selectSearch', () => {
        const searchState = {
            isError: true,
            results: [],
        };
        const mockedState = {
            search: fromJS(searchState),
        };
        assert.deepEqual(selectSearch(mockedState),searchState);
    });

    it('selectResults', () => {
        const searchState = { results: [1,2,3,4] };
        const mockedState = {
            search: fromJS(searchState),
        };
        assert.deepEqual(selectResults(mockedState),searchState.results);
    });

    it('selectErrorMessage', () => {
        const searchState = { errorMessage: 'This is an error' };
        const mockedState = {
            search: fromJS(searchState),
        };
        assert.deepEqual(selectErrorMessage(mockedState),searchState.errorMessage);
    });
    
    it('selectIsError', () => {
        const searchState = { isError: true };
        const mockedState = {
            search: fromJS(searchState),
        };
        assert.equal(selectIsError(mockedState),searchState.isError);
    });

    it('selectTotal', () => {
        const searchState = { total: 10 };
        const mockedState = {
            search: fromJS(searchState),
        };
        assert.equal(selectTotal(mockedState),searchState.total);
    });

    it('selectPageSize', () => {
        const searchState = { pageSize: 33 };
        const mockedState = {
            search: fromJS(searchState),
        };
        assert.equal(selectPageSize(mockedState),searchState.pageSize);
    });

    it('selectTotalPages', () => {
        let searchState = { total: 10, pageSize: 50 };
        let mockedState = {
            search: fromJS(searchState),
        };
        assert.equal(selectTotalPages(mockedState),1);

        searchState = { total: 101, pageSize: 50 };
        mockedState = {
            search: fromJS(searchState),
        };
        assert.equal(selectTotalPages(mockedState),3);
    });

    it('selectActiveCategory', () => {
        const searchState = { activeCategory: 'my category' };
        const mockedState = {
            search: fromJS(searchState),
        };
        assert.equal(selectActiveCategory(mockedState),searchState.activeCategory);
    });

    it('selectAggregations', () => {
        const searchState = { aggregations: [{name:'myagg1', displayName:'My agg1'},{name:'myagg2', displayName:'My agg2'}]};
        const mockedState = {
            search: fromJS(searchState),
        };
        assert.deepEqual(selectAggregations(mockedState),searchState.aggregations);
        });
});

