import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainBanner() {
    // Slider settings
    const settings = {
        dots: true, // Shows dot indicators at the bottom of the slider
        infinite: true, // Infinite looping
        speed: 500, // Animation speed
        slidesToShow: 1, // Show one slide at a time
        slidesToScroll: 1, // Scroll one slide at a time
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000, // Delay in ms between auto scrolls
        pauseOnHover: true, // Pause autoplay on hover
        pauseOnDotsHover: true, // Pause autoplay when dots are hovered over
        swipeToSlide: true, // Allow each slide to be dragged
        adaptiveHeight: true // Adjust the height of the slider to the current slide
    };


    return (
        <div className="hero py-16 bg-base-100"> {/* Reduced the vertical padding */}
            <div className="hero-content mx-auto flex flex-col lg:flex-row-reverse">
                {/* Slider container with a max-height */}
                <div className='w-full' style={{ maxHeight: '75vh' }}> {/* Set a maximum height to 75% of the viewport height */}
                    <Slider {...settings}>
                        {/* Slide 1 */}
                        <div>
                            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/9e081727685123.56369171b80b1.jpg" className="w-full rounded-lg shadow-2xl" alt="Random Image" />
                        </div>
                        {/* Slide 2 */}
                        <div>
                            <img src="https://static.toiimg.com/thumb/msid-103364335,width-1280,resizemode-4/103364335.jpg" className="rounded-lg shadow-2xl" style={{ width: '100%', height: 'auto', maxHeight: '75vh' }} alt="Random Image" />
                        </div>
                        {/* Slide 3 */}
                        <div>
                            <img src="https://pbs.twimg.com/media/F-Jb4EsakAA0afb.jpg:large" className="rounded-lg shadow-2xl" style={{ width: '100%', height: 'auto', maxHeight: '75vh' }} alt="Random Image" />
                        </div>
                        {/* Slide 4 */}
                        <div>
                            <img src="https://www.koimoi.com/wp-content/new-galleries/2021/09/tom-cruises-stolen-car-had-copy-of-top-gun-maverick-script-001.jpg" className="rounded-lg shadow-2xl" style={{ width: '100%', height: 'auto', maxHeight: '75vh' }} alt="Random Image" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}