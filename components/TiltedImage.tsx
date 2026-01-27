import React, { useState } from 'react';

interface TiltedImageProps {
    src: string;
    alt: string;
    className?: string;
    imgClassName?: string;
    defaultRotation?: string;
    grayscale?: boolean;
    blur?: string;
    hoverBlur?: string;
}

const TiltedImage: React.FC<TiltedImageProps> = ({
    src,
    alt,
    className = "",
    imgClassName = "object-cover",
    defaultRotation = "-2deg",
    grayscale = true,
    blur = "0px",
    hoverBlur = "0px"
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ease-out cursor-pointer z-10 hover:z-20 ${className}`}
            style={{
                transform: `rotate(${isHovered ? '0deg' : defaultRotation}) scale(${isHovered ? 1.05 : 1})`,
                boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.1)',
                filter: `blur(${isHovered ? hoverBlur : blur})`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={src}
                alt={alt}
                className={`w-full h-full transition-all duration-700 ${imgClassName} ${grayscale ? (isHovered ? 'grayscale-0' : 'grayscale') : ''}`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    );
};

export default TiltedImage;
