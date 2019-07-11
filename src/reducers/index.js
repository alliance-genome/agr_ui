import diseaseReducer from './diseaseReducer';
import diseaseRibbonReducer from './diseaseRibbonReducer';
import expressionReducer from './expressionReducer';
import geneReducer from './geneReducer';
import metadataReducer from './metadataReducer';
import searchReducer from './searchReducer';
import wordpressReducer from './wordpressReducer';

export default {
  disease: diseaseReducer,
  diseaseRibbon: diseaseRibbonReducer,
  expression: expressionReducer,
  gene: geneReducer,
  metadata: metadataReducer,
  search: searchReducer,
  wordpress: wordpressReducer,
};
