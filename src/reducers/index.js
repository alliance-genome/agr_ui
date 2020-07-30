import geneReducer from './geneReducer';
import searchReducer from './searchReducer';
import loadingReducer from './loadingReducer';
import alleleReducer from './alleleReducer';

export default {
  allele: alleleReducer,
  gene: geneReducer,
  search: searchReducer,
  loading: loadingReducer,
};
