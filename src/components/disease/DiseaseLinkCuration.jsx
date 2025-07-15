import { Link } from 'react-router-dom';
import DiseaseName from './DiseaseName.jsx';

const DiseaseLinkCuration = ({ disease }) => (
  <Link to={'/disease/' + disease.curie}>
    <DiseaseName disease={disease} />
  </Link>
);

export default DiseaseLinkCuration;
