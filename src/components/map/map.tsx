import React, { useEffect, useState } from 'react';

const MapComponent: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
      },
    );
  }, []);

  return (
    <div className='flex justify-center items-center'>
      {latitude && longitude ? (
        <iframe
          width="50%"
          height="400"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
        ></iframe>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapComponent;
