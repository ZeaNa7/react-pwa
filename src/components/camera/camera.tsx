import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import pictureStore from '../stores/picture.store';

const CameraComponent: React.FC = () => {
  const [pictures, setPictures] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL('image/png');
      setPictures((prevPhotos) => [...prevPhotos, data]);
      const dataa = data;
      pictureStore.setPhotos([...(pictureStore.photos || []), dataa]);
    }
  };

  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
        const videoURL = URL.createObjectURL(blob);
        setVideos((prevPhotos) => [...prevPhotos, videoURL]);
        const blobCopy = blob;
        // pictureStore.setVideos([...(pictureStore.videos || []), blobCopy]);
        chunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const storedPhotos = localStorage.getItem('capturedPhotos');
    if (storedPhotos) {
      setPictures(JSON.parse(storedPhotos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('capturedPhotos', JSON.stringify(pictures));
  }, [pictures]);

  return (
    <div>
      <video ref={videoRef} width="50%" height="auto" autoPlay></video>
      <canvas ref={canvasRef} style={{ display: 'none', width: '100%', height: 'auto' }}></canvas>

      <div className="m-10">
        <Button variant="outlined" onClick={takePhoto}>
          Take Photo
        </Button>
        {!isRecording ? (
          <Button variant="outlined" onClick={startRecording}>
            Start Recording
          </Button>
        ) : (
          <Button variant="outlined" onClick={stopRecording}>
            Stop Recording
          </Button>
        )}
      </div>

      {pictures.map((photo, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <img src={photo} alt="captured" width="50%" height="auto"/>
        </div>
      ))}

      {videos.map((videoURL, index) => (
        <div key={index}>
          <video src={videoURL} controls width="50%" height="auto"></video>
        </div>
      ))}
    </div>
  );
};

export default CameraComponent;
