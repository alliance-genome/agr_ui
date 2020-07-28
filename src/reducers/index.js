import geneReducer from './geneReducer';
import searchReducer from './searchReducer';
import wordpressReducer from './wordpressReducer';
import fileManagementSystemReducer from './fileManagementSystemReducer';
import loadingReducer from './loadingReducer';
import alleleReducer from './alleleReducer';

export default {
  allele: alleleReducer,
  fileManagementSystem: fileManagementSystemReducer,
  gene: geneReducer,
  search: searchReducer,
  wordpress: wordpressReducer,
  loading: loadingReducer,
};
