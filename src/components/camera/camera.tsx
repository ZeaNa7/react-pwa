import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import pictureStore from '../stores/picture.store';

const CameraComponent: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context?.drawImage(videoRef.current, 0, 0, 300, 200);
      const data = canvasRef.current.toDataURL('image/png');
      setPhotos((prevPhotos) => [...prevPhotos, data]);
      const dataa = data;
      pictureStore.setPhotos([...(pictureStore.photos || []), dataa]);
      stopCamera();
    }
  };

  useEffect(() => {
    const storedPhotos = localStorage.getItem('capturedPhotos');
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('capturedPhotos', JSON.stringify(photos));
  }, [photos]);

  const groupedPhotos = photos.reduce<string[][]>((acc, photo, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(photo);
    return acc;
  }, []);

  return (
    <div>
      <div className="m-8">
        <Button variant="outlined" onClick={startCamera}>
          Start Camera
        </Button>
        <Button variant="outlined" onClick={takePhoto}>
          Take Photo
        </Button>
      </div>

      <video ref={videoRef} width="300" height="200" autoPlay></video>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="200"></canvas>
      {groupedPhotos.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((photo, index) => (
            <div key={index}>
              <img src={photo} alt={`Captured ${rowIndex * 3 + index + 1}`} width="300" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CameraComponent;
