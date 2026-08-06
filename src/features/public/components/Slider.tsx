import { useState, useEffect } from "react";

function Slider() {
    const [index, setIndex] = useState(0);

    const images = [
        "/images/headerimg1.jpg",
        "/images/headerimg2.jpg",
        "/images/headerimg3.jpg",
        "/images/headerimg4.jpg",
        "/images/headerimg5.jpeg"
    ];

    // 🔥 Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    // Buttons
    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="slider">
            <div
                className="slides"
                style={{
                    transform: `translateX(-${index * 100}%)`
                }}
            >
                {images.map((img, i) => (
                    <img key={i} src={img} />
                ))}
            </div>

            <div className="arrow left" onClick={prevSlide}>❮</div>
            <div className="arrow right" onClick={nextSlide}>❯</div>
        </div>
    );
}

export default Slider;