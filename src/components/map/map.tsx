import React, { useEffect, useState } from 'react';

const MapComponent: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const savedPosition = localStorage.getItem('position');
    if (savedPosition) {
      const { latitude, longitude } = JSON.parse(savedPosition);
      setLatitude(latitude);
      setLongitude(longitude);
    }

    if (navigator.onLine) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          localStorage.setItem('position', JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error('Error getting user location:', error);
        },
      );
    }
  }, []);

  return (
    <div>
      {latitude && longitude ?
        <iframe width="100%" height="400" src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}></iframe> 
       : <p>Loading map...</p>}
    </div>
  );
};

export default MapComponent;