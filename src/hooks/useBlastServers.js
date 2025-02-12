import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';

const BLAST_SERVER_ENVIRONMENT_URL = 'https://blast.alliancegenome.org/blast/environment_info.json';

export default function useBlastServers() {
  return useQuery(['blast-servers'], () => {
    // I changed this from quoted with back-ticks to qouted with single qoutes
    return fetchData(BLAST_SERVER_ENVIRONMENT_URL);
  });
}
