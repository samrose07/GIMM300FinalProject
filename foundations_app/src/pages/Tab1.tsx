import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardContent } from '@ionic/react';

import './Tab1.css';
import AddItem from '../AddItem';
import ItemList from '../ItemList';
import { mic } from 'ionicons/icons';
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

  const titleStyle = {
    color: "black",
    fontSize: "50"
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
