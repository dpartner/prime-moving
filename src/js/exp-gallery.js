export const handleGallery = (
  ev,
  { expGalleryList, expGalleryItem, expGalleryNumberItem },
  galleryItemCount
) => {
  const rightArrow = 'gallery-right-arrow';
  const leftArrow = 'gallery-left-arrow';
  const galleryItemWidth = expGalleryItem.offsetWidth;
  const galleryItemLenght = expGalleryList.children.length;
  // const galleryItemWidth = document.querySelector(
  //   '.experience-gallery-item'
  // ).offsetWidth;
  // const galleryItemLenght = document.querySelector('.experience-gallery-list')
  //   .children.length;
  let padding = 15;

  if (ev.target.classList.contains(rightArrow)) {
    if (galleryItemCount === galleryItemLenght - 1) {
      return galleryItemCount;
    }
    galleryItemCount += 1;
    expGalleryNumberItem.textContent = galleryItemCount + 1;
    padding *= galleryItemCount;
    expGalleryList.style.transform = `translateX(-${
      galleryItemWidth * galleryItemCount + padding
    }px)`;
    return galleryItemCount;
  }
  if (ev.target.classList.contains(leftArrow)) {
    if (galleryItemCount === 0) {
      return (galleryItemCount = 0);
    }
    galleryItemCount -= 1;
    expGalleryNumberItem.textContent = galleryItemCount + 1;
    padding *= galleryItemCount;
    expGalleryList.style.transform = `translateX(-${
      galleryItemWidth * galleryItemCount + padding
    }px)`;
    return galleryItemCount;
  }
};

export const handleGallerySwipe = (
  direction,
  { expGalleryList, expGalleryItem, expGalleryNumberItem },
  galleryItemCount
) => {
  const galleryItemWidth = expGalleryItem.offsetWidth;
  const galleryItemLenght = expGalleryList.children.length;
  let padding = 15;

  if (direction === 'left') {
    if (galleryItemCount === galleryItemLenght - 1) {
      return galleryItemCount;
    }
    galleryItemCount += 1;
    expGalleryNumberItem.textContent = galleryItemCount + 1;
    padding *= galleryItemCount;
    expGalleryList.style.transform = `translateX(-${
      galleryItemWidth * galleryItemCount + padding
    }px)`;
    return galleryItemCount;
  }
  if (direction === 'right') {
    if (galleryItemCount === 0) {
      return (galleryItemCount = 0);
    }
    galleryItemCount -= 1;
    expGalleryNumberItem.textContent = galleryItemCount + 1;
    padding *= galleryItemCount;
    expGalleryList.style.transform = `translateX(-${
      galleryItemWidth * galleryItemCount + padding
    }px)`;
    return galleryItemCount;
  }
};
