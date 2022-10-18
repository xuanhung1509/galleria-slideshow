import {
  ForwardIcon,
  BackwardIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Home() {
  const { data, error } = useSWR('/api/paintings', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);
  return (
    <div>
      <h1 className='font-bold text-3xl'>
        <ForwardIcon className='h-6 w-6 text-blue-300' />
        <ul>
          {data.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
      </h1>
    </div>
  );
}

export default Home;
