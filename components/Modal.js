import Image from 'next/image';

function Modal({ image, handleClose }) {
  const { src, width, height, alt } = image;

  return (
    <Backdrop handleClose={handleClose}>
      <div className='relative'>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          type='button'
          className='absolute top-4 right-4 bg-black py-3 px-6 text-xs font-bold uppercase text-white'
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Backdrop>
  );
}

function Backdrop({ children, handleClose }) {
  return (
    <div
      className='fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50'
      onClick={handleClose}
    >
      {children}
    </div>
  );
}

export default Modal;
