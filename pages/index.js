import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ImageWithShimmer from '../components/ImageWithShimmer';
import { server } from '../config';

const macyOptions = {
  container: '#macy-grid',
  waitForImages: false,
  trueOrder: false,
  mobileFirst: true,
  columns: 1,
  margin: 16,
  breakAt: {
    576: 2,
    1024: 3,
    1280: 4,
  },
};

// Framer motion variants
const container = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: 'easeOut',
      delayChildren: 0.5,
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

function Gallery({ paintings }) {
  useEffect(() => {
    const initMacy = async () => {
      const Macy = (await import('macy')).default;
      new Macy(macyOptions);
    };

    initMacy();
  }, []);

  return (
    <section>
      <div className='container'>
        {paintings && (
          <motion.ul
            variants={container}
            initial='hidden'
            animate='visible'
            id='macy-grid'
            className='columns-1 gap-8 md:columns-2 lg:columns-3 xl:columns-4'
          >
            {paintings.map((item) => (
              <Painting
                key={item.id}
                id={item.id}
                name={item.name}
                artist={item.artist.name}
                image={item.images}
              />
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

function Painting({ id, name, artist, image }) {
  return (
    <motion.li variants={item} className='mb-8 leading-none'>
      <Link href={`/${id}`}>
        <a>
          <figure className='relative'>
            <ImageWithShimmer
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
    </motion.li>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${server}/api/paintings`);
  const paintings = await res.json();

  return {
    props: {
      paintings,
    },
  };
}

export default Gallery;
