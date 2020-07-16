import diseaseRibbonReducer from './diseaseRibbonReducer';
import expressionReducer from './expressionReducer';
import geneReducer from './geneReducer';
import searchReducer from './searchReducer';
import wordpressReducer from './wordpressReducer';
import fileManagementSystemReducer from './fileManagementSystemReducer';
import loadingReducer from './loadingReducer';
import alleleReducer from './alleleReducer';

export default {
  allele: alleleReducer,
  diseaseRibbon: diseaseRibbonReducer,
  expression: expressionReducer,
  fileManagementSystem: fileManagementSystemReducer,
  gene: geneReducer,
  search: searchReducer,
  wordpress: wordpressReducer,
  loading: loadingReducer,
};
