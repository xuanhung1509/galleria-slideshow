import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function usePaintings(id) {
  const endpoint = !id ? '/api/paintings' : `/api/paintings/${id}`;

  const { data, error } = useSWR(endpoint, fetcher);

  return {
    paintings: id ? null : data,
    painting: id ? data?.currentPainting : null,
    total: id ? data?.total : null,
    isLoading: !error && !data,
    isError: error,
  };
}

export default usePaintings;
