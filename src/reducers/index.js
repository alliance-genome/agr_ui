import geneReducer from './geneReducer';
import searchReducer from './searchReducer';
import wordpressReducer from './wordpressReducer';
import loadingReducer from './loadingReducer';
import alleleReducer from './alleleReducer';

export default {
  allele: alleleReducer,
  gene: geneReducer,
  search: searchReducer,
  wordpress: wordpressReducer,
  loading: loadingReducer,
};
