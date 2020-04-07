import React, { useState, forwardRef, useImperativeHandle, useMemo, useCallback } from 'react';

import { StyledHorizontalSlide } from './horsizontal-slide.styles';

export default forwardRef(({ children, className }, ref) => {

  const [slide, setSlide] = useState({
    actual: 0,
    last: 0,
    canSlide: false,
    activateTransition: false,
  });

  // const slideRef = useRef(null);
  const [slideRef, setSlideRef] = useState(null);

  const onRefChange = useCallback(node => {
    // ref value changed to node
    setSlideRef(node); // e.g. change ref state to trigger re-render
    if (node === null) { 
      // node is null, if DOM node of ref had been unmounted before
    } else {
      // ref value exists
    }
  }, []);

  const childrensWidth = useMemo(
    () => {

      if (slideRef) {
        
        const elemArr = Array.from(slideRef.children);
        return elemArr.reduce((last, next) => {
          if (typeof last !== "number") {
            return last.offsetWidth + next.offsetWidth;
          }
          return last + next.offsetWidth;
        });

      }

      return 0;

    },
    [children, slideRef]
  )

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
    if (slide.canSlide) {

      const canMove = slideRef.current
        ? childrensWidth - slideRef.current.offsetWidth
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
        last: e.pageX,
        activateTransition: false,
      }));

    }

  };

  /**
   * @description Moves the slider programatically, based on the width in percentage of the father
   * @param {number} percentage Float number from 0 (0%) to 1 (100%) that indicates the move percentage
   * @param {'back' | 'next'} direction Direction that the slider will move
   * @returns {{ canGoBack: boolean, canGoNext: boolean }} { canGoBack: boolean, canGoNext: boolean }
   */
  const moveSliderByPercentage = (percentage, direction) => {

    if (slideRef && percentage >= 0 && percentage <= 1) {

      const fatherWidth = slideRef.offsetWidth;

      const changedWidth = Math.abs(fatherWidth * percentage);

      let finalPositionX = direction === 'next'
        ? slide.actual + changedWidth
        : slide.actual - changedWidth;

      if (finalPositionX < 0) {
        finalPositionX = 0;
      } else if (finalPositionX > childrensWidth) {
        finalPositionX = childrensWidth;
      }

      const feedback = {
        canGoBack: finalPositionX > 0,
        canGoNext: finalPositionX + slide.actual < childrensWidth,
      }

      setSlide(f => ({
        ...f,
        actual: finalPositionX,
        last: finalPositionX,
        activateTransition: true,
      }));

      return feedback;

    }

    return {
      canGoBack: false,
      canGoNext: false,
    }

  }

  useImperativeHandle(ref, () => ({
    moveSliderByPercentage,
  }));

  return (
    <StyledHorizontalSlide
      ref={onRefChange}
      actual={slide.actual}
      className={className}
      activateTransition={slide.activateTransition}
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

});