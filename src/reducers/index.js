import diseaseReducer from './diseaseReducer';
import diseaseRibbonReducer from './diseaseRibbonReducer';
import expressionReducer from './expressionReducer';
import geneReducer from './geneReducer';
import searchReducer from './searchReducer';
import wordpressReducer from './wordpressReducer';
import fileManagementSystemReducer from './fileManagementSystemReducer';
import alleleReducer from './alleleReducer';

export default {
  allele: alleleReducer,
  disease: diseaseReducer,
  diseaseRibbon: diseaseRibbonReducer,
  expression: expressionReducer,
  fileManagementSystem: fileManagementSystemReducer,
  gene: geneReducer,
  search: searchReducer,
  wordpress: wordpressReducer,
};
