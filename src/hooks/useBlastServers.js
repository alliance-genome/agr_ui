import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';

const BLAST_SERVER_ENVIRONMENT_URL = '/blast/environment_info.json';

export default function useBlastServers() {
  return useQuery({
    queryKey: ['blast-servers'],
    queryFn: () => {
      // I changed this from quoted with back-ticks to qouted with single qoutes
      return fetchData(BLAST_SERVER_ENVIRONMENT_URL);
    }
  });
}
