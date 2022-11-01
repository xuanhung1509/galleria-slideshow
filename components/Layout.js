import Link from 'next/link';
import Image from 'next/image';
import logo from 'public/assets/shared/logo.svg';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className='mb-8'>{children}</main>
    </>
  );
}

function Header() {
  return (
    <header className='mb-8'>
      <div className='container'>
        <div className='flex items-center justify-between gap-8 border-b border-gray-200 px-2 pt-6 pb-4'>
          <Link href='/'>
            <a>
              <Image src={logo} alt='logo' className='cursor-pointer' />
            </a>
          </Link>
          <button
            type='button'
            className='text-gray-500 transition-colors hover:text-gray-700'
          >
            Start Slideshow
          </button>
        </div>
      </div>
    </header>
  );
}

export default Layout;
