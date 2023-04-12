import React, { useState } from 'react';
import templateImage from "./template_image.jpg"

function ImageGenerator() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');

    const generateImage = () => {
        // create a new canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        const context = canvas.getContext('2d');
        // create a new image element and set its source to the template image
        const img = new Image();

        img.onload = () => {
            // draw the image onto the canvas
            context.drawImage(img, 0, 0);



            // add the text to the canvas
            context.font = 'bold 40px Arial';
            context.background = '#f1f1f1';
            context.textAlign = 'center';
            context.fillText(text, canvas.width / 2, canvas.height / 2);

            // set the state with the generated image data URL

            setImage(canvas.toDataURL());

        };
        img.src = templateImage;
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <input type="text" value={text} onChange={handleTextChange} />
            <button onClick={generateImage}>Generate Image</button>
            {image && <img src={image} alt="Generated Image" />}
        </div>
    );
}

export default ImageGenerator;