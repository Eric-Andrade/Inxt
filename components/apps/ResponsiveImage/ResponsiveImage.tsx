import React, { useState, useEffect, useRef } from 'react'
import { widths, domain } from './config'
import defaultPlaceHolder from './imgPlaceholder'

// @ts-ignore
export default function ResponsiveImage({ placeholder = defaultPlaceHolder, src: getSrc }) {
  const { src, ref, srcSet } = useViewPortSrcSet(getSrc, placeholder);
  return (
    <img src={src} ref={ref} srcSet={srcSet} />
  );
}

// @ts-ignore
function useViewPortSrcSet(getSrc, placeholder) {
  const imgRef = useRef(null);
  const [srcSet, setSrcSet] = useState();
  const [src, setSrc] = useState(placeholder);

  useEffect(() => {
    // @ts-ignore
    const showImgIfIsInViewPort = (e) => {
      if (isInViewPort(imgRef.current)) {
        setSrc('https://images-eu.ssl-images-amazon.com/images/I/51I77Rx7KOL._AC_UL260_SR200,260_.jpg');
        window.removeEventListener('scroll', showImgIfIsInViewPort);
        const images = getImages(getSrc);
        // @ts-ignore
        const newSrcSet = Object.keys(widths).map(w => `${images[w]} ${widths[w]}w`).join(', ');
        setSrcSet(newSrcSet);
      }
    };

    // @ts-ignore
    showImgIfIsInViewPort();
    window.addEventListener('scroll', showImgIfIsInViewPort);
    return () => window.removeEventListener('scroll', showImgIfIsInViewPort);
  }, []);

  return { ref: imgRef, srcSet, src };
}

// @ts-ignore
function isInViewPort(el, percentVisible = 1) {
  let rect = el.getBoundingClientRect();
  let windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
};

// @ts-ignore
function getImages(getUrl) {
  const images = {};
  // @ts-ignore
  Object.keys(widths).forEach(w => images[w] = domain + getUrl(widths[w]));
  return images;
}