import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function usePaintings(slug) {
  const endpoint = !slug ? '/api/paintings' : `/api/paintings/${slug}`;

  const { data, error } = useSWR(endpoint, fetcher);

  return {
    paintings: slug ? null : data,
    painting: slug ? data : null,
    isLoading: !error && !data,
    isError: error,
  };
}

export default usePaintings;
