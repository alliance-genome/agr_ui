import assert from 'assert';
import { fromJS } from 'immutable';
import { DEFAULT_STATE as diseaseState } from '../../reducers/diseaseReducer';

import {
  selectDiseaseDomain,
  selectDisease,
  selectData,
  selectAssociations,
  selectCurrentPage,
  selectPerPageSize,
  selectTotalAssociations,
  selectLoadingAssociation,
  selectAssociationsError
} from '../diseaseSelectors';

describe('diseaseSelectors', () => {
  it('selectDiseaseDomain', () => {
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.equal(selectDiseaseDomain(mockedState), diseaseState);
  });

  it('selectDisease', () => {
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.deepEqual(selectDisease(mockedState), diseaseState.toJS());
  });

  // TODO - Very simple test, since I'm unsure is planned for the 'data' state prop.
  it('selectData', () => {
    const diseaseState = { data: [1,2,3,4,5] };
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.deepEqual(selectData(mockedState),diseaseState.data);
  });

  it('selectAssociations', () => {
    const diseaseState = { associations: [{ diseaseName: 'blah1'}, { diseaseName: 'blah2'}] };
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.deepEqual(selectAssociations(mockedState),diseaseState.associations);
  });

  it('selectCurrentPage', () => {
    const diseaseState = { currentPage: 5 };
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.equal(selectCurrentPage(mockedState),diseaseState.currentPage);
  });

  it('selectPerPageSize', () => {
    const diseaseState = { perPageSize: 20 };
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.equal(selectPerPageSize(mockedState),diseaseState.perPageSize);
  });

  it('selectTotalAssociations', () => {
    const diseaseState = { total: 20 };
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.equal(selectTotalAssociations(mockedState),diseaseState.totalAssociations);
  });

  it('selectLoadingAssociations', () => {
    const diseaseState = { loadingAssociations: true };
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.equal(selectLoadingAssociation(mockedState),diseaseState.loadingAssociations);
  });

  it('selectAssociationsError', () => {
    const diseaseState = { associationsError: 'This is an error' };
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.equal(selectAssociationsError(mockedState),diseaseState.associationsError);
  });
});
