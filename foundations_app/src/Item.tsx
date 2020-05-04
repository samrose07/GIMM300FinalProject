import React from 'react';
import { IonButton,IonItem, IonLabel, IonText, IonItemSliding, IonItemOption, IonItemOptions, IonIcon } from '@ionic/react';
import { trash, heart } from 'ionicons/icons';
import './Item.css';
import { findAllByDisplayValue } from '@testing-library/react';
import AddItem from './AddItem';
interface Props {
    doEdit: any;
    doDelete: any;
    doc: any;
}


const Item: React.FC<Props> = ({ doEdit, doDelete, doc }) => {
    let data = doc.data();

    return (
        
        <IonItemSliding className="theBody">
            <IonItem>
                <IonLabel class='ion-text-wrap'>
                    <IonText className="item-title">
                        <div>
                            {data.title}
                        </div>
                    </IonText>
                    <IonText className="item-prompt">
                        <div>
                            {data.prompt}
                        </div>
                    </IonText>
                    <IonText className="item-sub-title">
                        <div>
                            {data.content}
                        </div>
                    </IonText>
                    <IonText className="item-loc">
                        <div>
                            {data.location}
                        </div>
                    </IonText>
                    <IonText className="item-sub-title">
                        <div>
                            {data.date}
                        </div>
                    </IonText>

                </IonLabel>
            </IonItem>
            <IonItemOptions>
                <IonItemOption onClick={() => {
                    doEdit(doc.id);
                    }}>
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
                <IonItemOption onClick={() => {
                    doDelete(doc.id);
                    }}>
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
}
export default Item;