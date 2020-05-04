import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';
import ItemList from '../ItemList';
const Tab1: React.FC = () => {

  const [current, setCurrent] = useState(null);

  const getEmpty = () => {
    return ({
      prompt:'',
      title: '',
      content: '',
      date: '',
      location:'',
      clear: '',
      initialValue: ''
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Writer's Unblock</IonTitle>
        </IonToolbar>
      </IonHeader>
      {}
      <IonContent>        
        <ItemList doEdit={setCurrent}/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
