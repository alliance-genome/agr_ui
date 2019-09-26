import assert from 'assert';
import { fromJS } from 'immutable';
import { DEFAULT_STATE as diseaseState } from '../../reducers/diseaseReducer';

import {
  selectDiseaseDomain,
  selectData,
  selectGeneAssociations,
} from '../diseaseSelectors';

describe('diseaseSelectors', () => {
  it('selectDiseaseDomain', () => {
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.equal(selectDiseaseDomain(mockedState), diseaseState);
  });

  // TODO - Very simple test, since I'm unsure is planned for the 'data' state prop.
  it('selectData', () => {
    const diseaseState = { data: [1,2,3,4,5] };
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.deepEqual(selectData(mockedState).toJS(),diseaseState.data);
  });

  it('selectAssociations', () => {
    const diseaseState = { geneAssociations: [{ diseaseName: 'blah1'}, { diseaseName: 'blah2'}] };
    const mockedState = {
      disease: fromJS(diseaseState),
    };
    assert.deepEqual(selectGeneAssociations(mockedState), diseaseState.geneAssociations);
  });
});
