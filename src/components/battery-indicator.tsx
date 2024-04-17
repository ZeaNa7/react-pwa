import React, { useState, useEffect } from 'react';

const BatteryIndicator: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    if (('getBattery' in navigator) as any) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryLevel = () => {
          setBatteryLevel(Math.floor(battery.level * 100));
        };

        updateBatteryLevel();
        battery.addEventListener('levelchange', updateBatteryLevel);
      });
    }
  }, []);

  return <div>{batteryLevel !== null ? <div className='pt-9'>Battery Level: {batteryLevel}%</div> : <>Unavailable</>}</div>;
};

export default BatteryIndicator;
