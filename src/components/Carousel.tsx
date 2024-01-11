import { useState } from 'react';
import Slider from 'react-slick';

export default function Carroussel({ cards }: any) {
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    centerMode: true,
    infinite: true,
    dots: false,
    speed: 300,
    slidesToShow: 5,
    centerPadding: '0',
    swipeToSlide: true,
    slidesToScroll: true,
    focusOnSelect: true,

    beforeChange: (_: any, next: number) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 1490,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  const templateImages = cards.map((item: any, idx: number) => {
    return (
      <div className={idx === imageIndex ? 'activeSlide' : 'slide'} key={item.id}>
        <div className="slideWrapper">{item.content}</div>
      </div>
    );
  });

  return <Slider {...settings}>{templateImages}</Slider>;
}
