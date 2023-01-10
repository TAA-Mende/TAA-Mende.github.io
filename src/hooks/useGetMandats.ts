import { Octokit } from '@octokit/rest';
import { useQuery } from 'react-query';

const octokit = new Octokit();

interface Mandat {
  state: 'Validee' | 'Reportee';
  org: string;
  name: string;
  link?: string;
  date: string;
}

export type Mandats = Array<Mandat>;

export function useGetMandats() {
  const query = useQuery('fetch-data-github', () =>
    octokit.rest.repos.getContent({
      owner: 'TAA-Mende',
      repo: 'mandats',
      path: '/export/mandats.json',
    }),
  );

  if (query.isLoading || query.isError || !query.data) {
    return null;
  }

  // @ts-expect-error content is defined
  const encodedFile = query.data.data.content as string;
  const decodedFile = JSON.parse(
    Buffer.from(encodedFile, 'base64').toString('ascii'),
  ) as Mandats;

  return decodedFile.map((element) => ({
    ...element,
    state: element.state.replace('C)', 'é'),
  })) as Mandats;
}
