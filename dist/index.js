function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { memo, useState, useEffect, useRef } from 'react';
import useImageLoaded from './hooks/useImageLoaded';
const LazyImage = ({
  extraClass = '',
  src = '',
  alt,
  fallback_image = '',
  click,
  logo = false,
  ...rest
}) => {
  const [image_ref, onImageLoad] = useImageLoaded();
  const [file, setFile] = useState('');
  const [errorCounter, setErrorCounter] = useState(0);
  useEffect(() => {
    if (src) {
      setFile(src);
    } else {
      setFile(fallback_image ?? 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1902/pavelstasevich190200120/124934975-no-image-available-icon-vector-flat.jpg?ver=6');
    }
    return () => {
      setFile('');
    };
  }, [src]);
  const onErrorLoad = e => {
    if (errorCounter < 1) {
      e.target.src = fallback_image ? fallback_image : 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1902/pavelstasevich190200120/124934975-no-image-available-icon-vector-flat.jpg?ver=6';
    }
    setErrorCounter(prev => {
      return prev + 1;
    });
  };
  return /*#__PURE__*/React.createElement("img", _extends({}, rest, {
    ref: image_ref,
    alt: alt,
    src: file,
    onError: onErrorLoad,
    loading: "lazy",
    onLoad: onImageLoad
  }));
};
export default /*#__PURE__*/memo(LazyImage);