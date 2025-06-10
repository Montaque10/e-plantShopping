// src/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    // The container for the About Us content.
    // Styled with Tailwind CSS for responsiveness, background, padding, and text alignment.
    // `custom-scrollbar` is a global style defined in `index.html` for better scroll appearance.
    // Color scheme: `bg-green-950` with `bg-opacity-70`, `rounded-xl`, `shadow-2xl`, `backdrop-blur-sm`,
    // `text-white`, `border border-green-700` for a rich, nature-inspired feel.
    <div className="w-full md:max-w-xl p-6 bg-green-950 bg-opacity-70 rounded-xl shadow-2xl backdrop-blur-sm flex flex-col justify-center h-auto md:h-[450px] overflow-y-auto custom-scrollbar text-white border border-green-700">
      {/* Heading/Welcome message for the About Us section */}
      <p className="text-xl mb-4 leading-relaxed text-center font-semibold text-green-300">
        Welcome to Paradise Nursery, where green meets serenity!
      </p>
      {/* First paragraph detailing the company's passion and mission */}
      <p className="text-base mb-4 leading-relaxed text-justify opacity-90">
        At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is to provide a wide range of
        high-quality plants that not only enhance the beauty of your surroundings but also contribute to a healthier and
        more sustainable lifestyle. From air-purifying plants to aromatic fragrant ones, we have something for every
        plant enthusiast.
      </p>
      {/* Second paragraph about the team's dedication and support */}
      <p className="text-base mb-4 leading-relaxed text-justify opacity-90">
        Our team of experts is dedicated to ensuring that each plant meets our strict standards of quality and care.
        Whether you&#39;re a seasoned gardener or just starting your green journey, we&#39;re here to support you every step of
        the way. Feel free to explore our collection, ask questions, and let us help you find the perfect plant for your
        home or office.
      </p>
      {/* Concluding paragraph with a call to action */}
      <p className="text-base leading-relaxed text-justify opacity-90">
        Join us in our mission to create a greener, healthier world. Visit Paradise Nursery today and experience the
        beauty of nature right at your doorstep.
      </p>
    </div>
  );
};

export default AboutUs;
