import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatPrice } from '../../utils/formatPrice';

const ListingDetails = ({ product, open, onClose }) => {
  const [message, setMessage] = useState('');

  if (!open || !product) return null; // don't render if closed

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log('Message to seller:', message);
    setMessage('');
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-full max-w-6xl h-[85vh] rounded-xl overflow-hidden flex'>
        {/* Left - Image slider */}
        <div className='w-1/2 bg-black flex items-center justify-center p-4'>
          <Slider {...sliderSettings} className='w-full max-w-2xl'>
            {product.photos.map((img, idx) => (
              <div key={idx} className='flex justify-center'>
                <img
                  src={img.url}
                  alt={`product-${idx}`}
                  className='rounded-xl object-contain max-h-[75vh] w-auto'
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Right - Product details */}
        <div className='w-1/2 flex flex-col p-6 overflow-y-auto relative'>
          {/* Close button */}
          <button
            onClick={() => onClose(false)}
            className='absolute top-3 right-3 text-gray-500 hover:text-black'
          >
            ✕
          </button>

          <h2 className='text-2xl font-bold'>{product.title}</h2>
          <p className='text-xl font-semibold text-green-600 mt-2'>
            ₱{formatPrice(product.price)}
          </p>
          <p className='text-gray-700 mt-4'>{product.description}</p>

          <div className='mt-4'>
            <h3 className='font-semibold'>Seller: {product.seller.name}</h3>
            {/* <p className='text-sm text-gray-500'>{product.seller.location}</p> */}
          </div>

          {/* Message box */}
          <div className='mt-auto'>
            <h3 className='font-semibold mb-2'>Message Seller</h3>
            <textarea
              placeholder='Write a message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-full border rounded-lg p-2 mb-2'
              rows={3}
            />
            <button
              onClick={handleSendMessage}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg'
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
