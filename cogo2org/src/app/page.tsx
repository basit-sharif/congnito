"use client"
import React, { useRef } from 'react';

const image = "https://res.cloudinary.com/dg3oj3rkx/image/upload/v1695053816/tiktok_password_reset_level1_r3hjzn.png"

const MagnifiedImage = () => {
  const imageRef = useRef(null);

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = (imageRef.current as any).getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    (imageRef.current as any).style.backgroundPosition = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    (imageRef.current as any).style.backgroundSize = '280%'; // Increase the size for zoom effect
  };

  const handleMouseLeave = () => {
    (imageRef.current as any).style.backgroundSize = 'cover'; // Reset back to normal
    (imageRef.current as any).style.backgroundPosition = 'center';
  };

  return (
    <div
      className="w-96 h-96 bg-cover border border-gray-300"
      style={{ backgroundImage: `url(${image})` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={imageRef}
    ></div>
  );
};

export default MagnifiedImage;
