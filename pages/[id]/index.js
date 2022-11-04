import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useScroll from '@/hooks/useScroll';
import Modal from '@/components/Modal';
import ImageWithShimmer from '@/components/ImageWithShimmer';
import iconViewImage from '@/public/assets/shared/icon-view-image.svg';
import iconNextButton from '@/public/assets/shared/icon-next-button.svg';
import iconBackButton from '@/public/assets/shared/icon-back-button.svg';
import { server } from '@/config';

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 200, y: 0 },
};

function Painting({ data }) {
  const scrollPos = useRef(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [closeButtonVisible, setCloseButtonVisible] = useState(false);
  const { currentPainting: painting, total } = data;
  const navVisible = useScroll();

  // Prevent scrolling when modal open
  useEffect(() => {
    if (modalOpen) {
      scrollPos.current = window.pageYOffset;
      document.body.classList.add('noscroll');
      document.body.style.top = -scrollPos.current + 'px';
    } else {
      document.body.classList.remove('noscroll');
      document.body.style.top = 0;
      window.scrollTo(0, scrollPos.current);
    }
  }, [modalOpen]);

  return (
    <article>
      <div className='container'>
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={painting.id}
            variants={variants}
            initial='hidden'
            animate='enter'
            exit='exit'
            transition={{ duration: 1 }}
            className='grid grid-cols-1 items-center gap-8 lg:pt-8 xl:grid-cols-2 xl:gap-24'
          >
            <div className='relative'>
              <figure className='relative mx-auto lg:max-w-3xl'>
                {/* Painting */}
                <div className='md:max-w-lg xl:pb-12'>
                  <div className='md:hidden'>
                    <ImageWithShimmer
                      src={painting.images.hero.small}
                      width={painting.images.smallwidth}
                      height={painting.images.smallheight}
                      alt={painting.name}
                    />
                  </div>
                  <div className='hidden md:block'>
                    <ImageWithShimmer
                      src={painting.images.hero.large}
                      width={painting.images.bigwidth}
                      height={painting.images.bigheight}
                      alt={painting.name}
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

                <figcaption className='relative -top-12 right-0 flex w-full max-w-xl flex-col md:absolute md:top-0 md:items-end xl:-right-40 xl:h-full xl:justify-between'>
                  <div className='w-4/5 bg-white p-6 md:p-16 md:pt-0'>
                    <h1 className='mb-2 w-full text-2xl font-bold md:mb-4 md:text-5xl md:leading-tight'>
                      {painting.name}
                    </h1>
                    <h2 className='text-sm text-gray-500 lg:text-base'>
                      {painting.artist.name}
                    </h2>
                  </div>

                  {/* Artist image */}
                  <div className='mx-6 h-16 w-16 md:h-32 md:w-32'>
                    <ImageWithShimmer
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
          </motion.div>
        </AnimatePresence>
      </div>

      <nav
        className={`fixed bottom-4 left-1/2 w-[92vw] -translate-x-1/2 bg-white px-8 py-6 shadow-lg transition-all sm:w-[72vw] lg:w-[60vw] xl:w-[80vw] ${
          !navVisible && 'translate-y-full opacity-0'
        }`}
      >
        <div className='flex items-center justify-between gap-8'>
          <div>
            <h3 className='mb-2 text-sm font-bold sm:text-lg md:text-xl'>
              {painting.name}
            </h3>
            <h4 className='text-xs text-gray-500 md:text-sm'>
              {painting.artist.name}
            </h4>
          </div>
          <div className='flex items-center gap-8'>
            <Link href={`/${painting.id > 1 ? painting.id - 1 : total}`}>
              <a>
                <Image src={iconBackButton} width={18} height={18} alt='back' />
              </a>
            </Link>
            <Link href={`/${painting.id < total ? painting.id + 1 : 1}`}>
              <a>
                <Image src={iconNextButton} width={18} height={18} alt='next' />
              </a>
            </Link>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {modalOpen && (
          <Modal
            closeButtonVisible={closeButtonVisible}
            handleClose={() => setModalOpen(false)}
          >
            <Image
              src={painting.images.gallery}
              width={painting.images.gallerywidth}
              height={painting.images.galleryheight}
              alt={painting.name}
              onLoadingComplete={() => setCloseButtonVisible(true)}
              onClick={(e) => e.stopPropagation()}
            />
          </Modal>
        )}
      </AnimatePresence>
    </article>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/paintings/${context.params.id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${server}/api/paintings`);
  const paintings = await res.json();
  const ids = paintings.map((painting) => painting.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default Painting;
