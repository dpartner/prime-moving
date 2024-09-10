export const addGalleryImg = GalleryLibrary => {
  return GalleryLibrary.map(
    img => `
  <li class="experience-gallery-item">
                <a href="">
                  <img
                    class="experience-gallery-img"
                    srcset="
                      ./img/exp-gallery/${img.defaultImg} 1x,
                      ./img/exp-gallery/${img.retinaImg} 2x
                    "
                    src="./img/exp-gallery/${img.defaultImg}"
                    alt="${img.alt}"
                  />
                </a>
              </li>
  `
  ).join('');
};

export const GalleryLibrary = [
  {
    defaultImg: 'gallery-mob-1@1x.webp',
    retinaImg: 'gallery-mob-1@2x.webp',
    alt: 'our experience 1',
  },
  {
    defaultImg: 'gallery-mob-2@1x.webp',
    retinaImg: 'gallery-mob-2@2x.webp',
    alt: 'our experience 2',
  },
  {
    defaultImg: 'gallery-mob-3@1x.webp',
    retinaImg: 'gallery-mob-3@2x.webp',
    alt: 'our experience 3',
  },
  {
    defaultImg: 'gallery-mob-4@1x.webp',
    retinaImg: 'gallery-mob-4@2x.webp',
    alt: 'our experience 4',
  },
  {
    defaultImg: 'gallery-mob-5@1x.webp',
    retinaImg: 'gallery-mob-5@2x.webp',
    alt: 'our experience 5',
  },
  {
    defaultImg: 'gallery-mob-6@1x.webp',
    retinaImg: 'gallery-mob-6@2x.webp',
    alt: 'our experience 6',
  },
  {
    defaultImg: 'gallery-mob-7@1x.webp',
    retinaImg: 'gallery-mob-7@2x.webp',
    alt: 'our experience 7',
  },
  {
    defaultImg: 'gallery-mob-8@1x.webp',
    retinaImg: 'gallery-mob-8@2x.webp',
    alt: 'our experience 8',
  },
  {
    defaultImg: 'gallery-mob-9@1x.webp',
    retinaImg: 'gallery-mob-9@2x.webp',
    alt: 'our experience 9',
  },
  {
    defaultImg: 'gallery-mob-10@1x.webp',
    retinaImg: 'gallery-mob-10@2x.webp',
    alt: 'our experience 10',
  },
  {
    defaultImg: 'gallery-mob-11@1x.webp',
    retinaImg: 'gallery-mob-11@2x.webp',
    alt: 'our experience 11',
  },
  {
    defaultImg: 'gallery-mob-12@1x.webp',
    retinaImg: 'gallery-mob-12@2x.webp',
    alt: 'our experience 12',
  },
];
