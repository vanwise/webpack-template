function setImage (className, imageSrc, altText=imageSrc.split('.')[0], isSet=true, isLazyLoading=false) {
  const filename = `/images/${imageSrc.split('.')[0]}`;
  const isSetLazyAttr = isLazyLoading ? ' loading="lazy"' : '';
  if (imageSrc.split('.')[1] === 'svg') {
    return `<img class="${className}" src="/images/${imageSrc}" alt="${altText}" ${isSetLazyAttr}>`;
  } else {
    const webp = currMode !== 'production' ? '' : isSet ?
      `<source type="image/webp" srcset="${filename}.webp 1x, ${filename}@2x.webp 2x, ${filename}@3x.webp 3x">` :
      `<source type="image/webp" srcset="${filename}.webp 1x">`;
    const img = isSet ? ` srcset="/images/${imageSrc.replace('.', '@2x.')} 2x, /images/${imageSrc.replace('.', '@3x.')} 3x"` : '';
    return `<picture class="${className}">${webp}<img src="/images/${imageSrc}" alt="${altText}"${img}${isSetLazyAttr}></picture>`;
  }
};

module.exports = {
  setImage: setImage
}