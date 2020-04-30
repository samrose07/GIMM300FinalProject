import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardContent } from '@ionic/react';
import './RandomPrompts';
import './Tab2.css';
import AddItem from '../AddItem';
import ItemList from '../ItemList';
import { mic } from 'ionicons/icons';
//import { NewPrompt } from './RandomPrompts';
import { analytics } from 'firebase';
const Tab2: React.FC = () => {

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
      
      <IonContent>
        <IonCard>
        <IonCardHeader>
          <h3>New Entry:</h3>
          <AddItem title={current} clear={() =>setCurrent(getEmpty())}/>
        </IonCardHeader>
        <IonCardContent>
          
        </IonCardContent>
        {}
        </IonCard>
      </IonContent>
    </IonPage>
    
  );
};

export default Tab2;
