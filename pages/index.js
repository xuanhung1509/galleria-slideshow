import Link from 'next/link';
import Image from 'next/image';
import usePaintings from '../hooks/usePaintings';
import Spinner from '../components/Spinner';

function Home() {
  const { paintings, isLoading, isError } = usePaintings();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Failed to load</div>;

  return (
    <section>
      <div className='container'>
        <ul className='columns-1 gap-8 md:columns-2 lg:columns-3 xl:columns-4'>
          {paintings.map((item) => (
            <PaintingItem
              key={item.id}
              id={item.id}
              name={item.name}
              artist={item.artist.name}
              image={item.images}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PaintingItem({ id, name, artist, image }) {
  return (
    <li className='mb-8 bg-red-50 leading-none'>
      <Link href={`/${id}`}>
        <a>
          <figure className='relative'>
            <Image
              src={image.thumbnail}
              width={image.thumbwidth}
              height={image.thumbheight}
              alt={name}
            />
            <div
              className='absolute top-0 left-0 w-full transition-colors hover:bg-black/50'
              style={{ height: 'calc(100% - 4px)' }}
            />
            <figcaption className='pointer-events-none absolute bottom-8 left-4'>
              <h2 className='mb-2 text-2xl font-bold text-gray-200'>{name}</h2>
              <h3 className='text-sm text-gray-300'>{artist}</h3>
            </figcaption>
          </figure>
        </a>
      </Link>
    </li>
  );
}

export default Home;
