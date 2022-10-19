import { useEffect, useState } from 'react';
import Image from 'next/image';
import usePaintings from '../../hooks/usePaintings';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal';
import iconViewImage from '../../public/assets/shared/icon-view-image.svg';

function Painting({ slug }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { painting, isLoading, isError } = usePaintings(slug);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [modalOpen]);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Failed to load</div>;

  console.log(painting);

  return (
    <article>
      <div className='container'>
        <div className='grid grid-cols-1 items-center gap-8 lg:pt-8 xl:grid-cols-2 xl:gap-24'>
          <div className='relative'>
            <figure className='relative mx-auto lg:max-w-3xl'>
              {/* Painting */}
              <div className='md:max-w-lg xl:pb-12'>
                <div className='md:hidden'>
                  <Image
                    src={painting.images.hero.small}
                    width={painting.images.smallwidth}
                    height={painting.images.smallheight}
                    alt={painting.name}
                  />
                </div>
                <div className='hidden md:block'>
                  <Image
                    src={painting.images.hero.large}
                    alt={painting.name}
                    width={painting.images.bigwidth}
                    height={painting.images.bigheight}
                  />
                </div>

                <button
                  type='button'
                  className='absolute top-4 left-4 flex items-center justify-center gap-3 bg-black py-3 px-6 text-white md:bottom-6 md:top-auto xl:bottom-20'
                  onClick={() => setModalOpen(true)}
                >
                  <Image src={iconViewImage} alt='icon view image' />
                  <span className='text-xs font-bold uppercase'>
                    View image
                  </span>
                </button>
              </div>

              <figcaption className='relative -top-12 right-0 mx-auto flex w-full max-w-xl flex-col md:absolute md:top-0 md:items-end xl:-right-80 xl:h-full xl:items-center xl:justify-between'>
                <div className='w-4/5 bg-white p-6 md:p-16 md:pt-0'>
                  <h1 className='mb-2 w-72 text-2xl font-bold md:mb-4 md:text-5xl md:leading-tight'>
                    {painting.name}
                  </h1>
                  <h2 className='text-sm text-gray-500 lg:text-base'>
                    {painting.artist.name}
                  </h2>
                </div>

                {/* Artist image */}
                <div className='mx-6 h-16 w-16 md:h-32 md:w-32'>
                  <Image
                    src={painting.artist.image}
                    width={painting.artist.artistwidth}
                    height={painting.artist.artistheight}
                    alt={painting.artist.name}
                  />
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Description */}
          <div className='relative mx-auto my-6 max-w-[30em] md:my-28 xl:max-w-[25em]'>
            <span className='absolute bottom-full right-0 translate-y-10 text-8xl font-bold text-gray-200 md:right-auto md:-left-20 md:translate-y-24 md:text-[12rem] xl:left-auto xl:-right-8 xl:translate-y-10 xl:text-[8rem]'>
              {painting.year}
            </span>
            <p className='relative text-sm leading-7 text-gray-700 md:text-base md:leading-8'>
              {painting.description}
            </p>
            <a
              href={painting.source}
              className='my-8 block text-sm text-gray-700 underline transition-colors hover:text-gray-500'
            >
              Go to source
            </a>
          </div>
        </div>
      </div>

      {modalOpen && (
        <Modal
          image={{
            src: painting.images.gallery,
            width: painting.images.gallerywidth,
            height: painting.images.galleryheight,
            alt: painting.name,
          }}
          handleClose={() => setModalOpen(false)}
        />
      )}
    </article>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      slug: context.params.slug,
    },
  };
}

export default Painting;
