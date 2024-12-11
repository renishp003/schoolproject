import React from 'react'
import { Slide } from 'react-slideshow-image';

function HomeSlider() {

    const slideImages = [
        {
          url: 'images/Slide-2.jpg',
          caption: 'Slide 1'
        },
        {
          url: 'images/Slide-1.png',
          caption: 'Slide 2'
        },
        {
          url: 'images/Slide-3.jpg',
          caption: 'Slide 3'
        },
      ];

  return (
    <>
      <div className="slide-container" style={{ zIndex:'1'}}>
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" style={{height:'60vh'}} key={index}>
              <div className='h-100 w-100' style={{'backgroundImage': `url(${slideImage.url})`, backgroundRepeat:'no-repeat' , backgroundSize:'cover' , backgroundPosition:'center center'}}>
                {/* <span>{slideImage.caption}</span> */}
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    </>
  )
}

export default HomeSlider