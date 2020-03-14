import React from 'react';

import { StyledHorizontalSlide } from './horsizontal-slide.styles';

export default ({ children, className }) => {
  const [slide, setSlide] = useState({
    actual: 0,
    last: 0,
    canSlide: false
  });
  const slideRef = useRef(null);

  const startSlide = e => {
    e.persist();
    setSlide(f => ({
      ...f,
      last: e.pageX,
      canSlide: true
    }));
  };

  const stopSlide = () => {
    setSlide(f => ({
      ...f,
      canSlide: false
    }));
  };

  const moveSlide = e => {
    e.persist();
    // console.log("target: ", e);
    if (slide.canSlide) {
      // get actual width of the box if it's resized and decrement in the max drag width
      const elemArr = Array.from(slideRef.current.children);
      const anotherTotal = elemArr.reduce((last, next) => {
        if (typeof last !== "number") {
          return last.offsetWidth + next.offsetWidth;
        }
        return last + next.offsetWidth;
      });

      const canMove = slideRef.current
        ? anotherTotal - slideRef.current.offsetWidth
        : 0;
      const maxDragWidth = canMove >= 0 ? canMove : 0;

      if (!slide.last) setSlide(f => ({ ...f, last: e.pageX }));

      const movedValue = Math.abs(slide.last) - e.pageX;
      let finalPositionX = Math.abs(slide.actual + movedValue);

      if (slide.actual + movedValue <= 0) finalPositionX = 0;
      if (slide.actual + movedValue >= maxDragWidth)
        finalPositionX = maxDragWidth;

      setSlide(f => ({
        ...f,
        actual: finalPositionX,
        last: e.pageX
      }));
    }
  };

  return (
    <StyledHorizontalSlide
      ref={slideRef}
      actual={slide.actual}
      className={className}
      onMouseDown={startSlide}
      onMouseMove={moveSlide}
      onMouseUp={stopSlide}
      onMouseLeave={stopSlide}
      onTouchStart={startSlide}
      onTouchMove={moveSlide}
      onTouchEnd={stopSlide}
    >
      {children}
    </StyledHorizontalSlide>
  );
};