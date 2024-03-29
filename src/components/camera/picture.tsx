import { observer } from 'mobx-react-lite';
import React from 'react';
import pictureStore from '../stores/picture.store';

const PictureComponent: React.FC = () => {
  return (
    <>
      {pictureStore.photos?.map((photo, index) => (
        <div key={index}>
          <img src={photo} alt={`Captured ${index + 1}`} />
        </div>
      ))}
    </>
  );
};

export default observer(PictureComponent);
