import React, { useState, useEffect, useRef } from 'react';
import audioFile from './lotr.mp3'; // Import the audio file

const Audiogram = () => {
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const requestRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSource, setAudioSource] = useState(null); // State to store the audio source

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.lineCap = 'round';

        loadAudioFile();

        return () => {
            audioContextRef.current?.close();
            cancelAnimationFrame(requestRef.current);
            audioSource?.disconnect();
        };
    }, []);

    const loadAudioFile = () => {
        const audio = new Audio(audioFile);
        const source = audioContextRef.current.createMediaElementSource(audio);
        setAudioSource(source); // Set the audio source

        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);
        analyser.connect(audioContextRef.current.destination);

        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        draw();
    };

    
    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const bufferLength = analyserRef.current.frequencyBinCount;
        let dataArray = dataArrayRef.current;
        const barWidth = (canvas.width - 3 * bufferLength - 4) / bufferLength * 2.5;

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        
        const centerX = canvas.width / 2; // center of the canvas

        const halfBufferLength = bufferLength / 2; // assuming an even number of bars

            for (let i = 0; i < halfBufferLength; i++) {
                const barHeight = dataArray[i]>70 ? dataArray[i] * 0.65 : dataArray[i]
                

                // Drawing the left bar
                ctx.beginPath();
                ctx.moveTo(centerX - 2 * i * barWidth - barWidth / 2, canvas.height - barWidth);
                ctx.lineTo(centerX - 2 * i * barWidth - barWidth / 2, canvas.height - barHeight - barWidth);
                ctx.stroke();

                // Drawing the right bar
                ctx.beginPath();
                ctx.moveTo(centerX + 2 * i * barWidth + barWidth / 2, canvas.height - barWidth / 2);
                ctx.lineTo(centerX + 2 * i * barWidth + barWidth / 2, canvas.height - barHeight - barWidth / 2);
                ctx.stroke();
            }

        requestRef.current = requestAnimationFrame(draw);
    };


    const togglePlay = () => {
        if (audioSource) {
            if (!isPlaying) {
                audioContextRef.current.resume().then(() => {
                    audioSource.mediaElement.play();
                    setIsPlaying(true);
                });
            } else {
                audioSource.mediaElement.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div>
            <canvas ref={canvasRef} width="500" height="180" />
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default Audiogram;