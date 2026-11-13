import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for rotating hero text slider
 * Automatically cycles every `intervalMs` (default: 6000ms = 6 seconds).
 */
export const useSlider = (totalSlides, intervalMs = 6000) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [nextSlide, intervalMs, isPaused, totalSlides]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    setIsPaused,
  };
};

export default useSlider;
