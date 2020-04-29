import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { IonItem, IonButton, IonInput, IonCard, IonContent, IonCardContent } from '@ionic/react';
import DataProps from './components/DataProps';
import { Plugins } from '@capacitor/core';


export function debugInfo(logInfo: DataProps) {
    console.log(logInfo.title, logInfo.content, logInfo.date, logInfo.location);
}
export function clearInfo(info: DataProps) {
        info.title = '';
        info.content = '';
        info.date = '';
        info.location = '';
        info.clear = '';

}

const AddItem: React.FC<DataProps> = (props) => {
    const [item, setItem] = useState<DataProps>({
        title:'',
        content:'',
        date:'',
        location: ''
    });

    const [value, loading, error] = useDocument(
        firebase.firestore().doc("data/" + props.title),
        {
            snapshotListenOptions: {includeMetadataChanges:true}
        }
    );

    useEffect(() => {
        !loading && props.title && value?.exists && setItem(value.data().name);
    },
    [loading,props.title, value]);

    const addLocation = async () => {
        const {Geolocation} = Plugins;
        const position = await Geolocation.getCurrentPosition();
        const newPos = "Latitiude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
        return setItem({
            ...item,
            location:newPos
        });
    }

    const onSave = async() => {
        let collectionRef = firebase.firestore().collection("data");
        if(props.title) {
            await(collectionRef).doc(props.title).set({
                title: item.title, content: item.content,
                date: new Date().getTime(), location:item.location ? item.location : ""}, {merge:true});
                clearInfo(item);
                setItem(item);
                props.clear();
        }
        else {
            await collectionRef.add({
                title: item.title, content: item.content,
                date: new Date().getTime(), location:item.location ? item.location : ""});
                clearInfo(item);
                setItem(item);
                props.clear();
        }
    };

    const updateField = e => {
        e.preventDefault();
        debugInfo(item);
        setItem({
            ...item,
            [e.target.name]:e.target.value
        });
    };

    return (
        <IonCard>
            <IonCardContent>
                <IonItem>
                    <IonInput value={item.title} placeholder="Title" name="title" onIonChange={updateField}>

                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput value={item.content} placeholder="Content" name="content" onIonChange={updateField}>
                    </IonInput>
                </IonItem>
                <IonButton onClick={onSave}>Upload
                </IonButton>
                <IonButton onClick={addLocation}>Location
                </IonButton>
            </IonCardContent>
        </IonCard>
    );
}
export default AddItem;