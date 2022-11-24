import Link from 'next/link';
import Image from 'next/image';
import { useSlideshowContext } from '@/contexts/SlideshowContext';
import logo from '@/public/assets/shared/logo.svg';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className='mb-8'>{children}</main>
    </>
  );
}

function Header() {
  const { isPlaying, handleToggle } = useSlideshowContext();

  return (
    <header className='mb-8'>
      <div className='container border-b lg:border-b-0'>
        <div className='flex items-center justify-between gap-8  border-gray-200 px-2 py-4 lg:border-b'>
          <Link href='/'>
            <a className='w-32 lg:w-40'>
              <Image src={logo} alt='logo' />
            </a>
          </Link>
          <button
            type='button'
            className='mb-1 text-sm text-gray-500 transition-colors hover:text-gray-900 sm:text-base'
            onClick={handleToggle}
          >
            {isPlaying ? 'Stop' : 'Start'} Slideshow
          </button>
        </div>
      </div>
    </header>
  );
}

export default Layout;
