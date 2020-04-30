import React from 'react';
import Item from './Item';
import firebase, { database, firestore } from 'firebase';
import {useCollection} from 'react-firebase-hooks/firestore';
import {IonList, IonButton, IonIcon} from '@ionic/react';
import { heart } from 'ionicons/icons';
interface Props {
    doEdit:any;
}

const ItemList: React.FC<Props> = ({doEdit}) => {
    const [value, loading, error] = useCollection(
    firebase.firestore().collection("data").orderBy("date","desc"),
    {
        snapshotListenOptions:{includeMetadataChanges:true}
    }
    );

    const closeSlidingItems = () => {
        let list = document.getElementById("list") as any;
    };

    const doDelete = id => {
        firebase.firestore().collection("data").doc(id).delete();
    };
    return (
        <IonList id="list">
            {value && value.docs.map(doc => {
                return (
                    
                    !loading && (
                        
                        <Item doc={doc}
                        doEdit = {i => {
                        closeSlidingItems();
                        doEdit(i);
                        }}                        
                        doDelete = {i => {
                            closeSlidingItems();
                            doDelete(i);
                        }}
                    key = {doc.id}
                    />
                    )
                );
            })}
            
        </IonList>
    );
}

export default ItemList;