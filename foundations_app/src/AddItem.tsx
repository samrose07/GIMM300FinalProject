import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { IonItem, IonButton, IonInput, IonCard, IonContent, IonCardContent, IonTextarea } from '@ionic/react';
import DataProps from './components/DataProps';
import { Plugins } from '@capacitor/core';

export function debugInfo(logInfo: DataProps) {
    console.log(logInfo.title, logInfo.content, logInfo.date, logInfo.location, logInfo.prompt);
}
export function clearInfo(info: DataProps) {
        info.prompt = '';
        info.title = '';
        info.content = '';
        info.date = '';
        info.location = '';
        info.clear = '';

}

const AddItem: React.FC<DataProps> = (props) => {
    const [item, setItem] = useState<DataProps>({
        prompt:'',
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
        !loading && props.prompt && props.title && value?.exists && setItem(value.data().name);
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
                prompt: item.prompt,
                title: item.title, content: item.content,
                date: new Date().toLocaleDateString(), location:item.location ? item.location : ""}, {merge:true});
                clearInfo(item);
                setItem(item);
                props.clear();
        }
        else {
            await collectionRef.add({
                prompt: item.prompt,
                title: item.title, content: item.content,
                date: new Date().toLocaleDateString(), location:item.location ? item.location : ""});
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

    
    const generatePrompt = () => {
        let prompts = ["The world crumbles with each step that she takes. Splicers surround the compound as she begins her escape - her freedom to...",
        "A bear treads down the mounten with each step he feels his consciousness tearing away. His momma told him to be brave but she could never prepare him for the white wolf.",
        "To extrapolate fear from doubt is to make a man feared by doubt itself. These were the words that...",
        "Dr. Dan looked upon his disciples. He knew not how to control them, but he knew how to punish them. With the raise of his fist any command could be done out of fear of what would come otherwise.",
        "Dormamu, I've come to bargain. Today, I bring you...",
        "She pondered the thought of losing her younger brother to the fog. It all happened so fast. Her hometown is now deserted, once a bustling community of racist elders. In a state of mind where emotions get you hurt, she wants nothing more than to...",
        "This was unlike anything he had ever seen... Subway... it was... crowded! People lined up for two blocks to get a taste of what was cooking. He had to know what it was. But as he looked upon it after two hours of waiting...",
        "This world was not meant for us. It facilitates us out of necessessity. If it had its way, we would have never made it past the water evolution. But here we are, chillin' in a hottub, five feet apart because we are...",
        "The tendrils appeared first. Then came the horrendous wings, horn-tipped. As they rose they expanded to their full length, and the face was like nothing I could describe; so horrible you could see the flowers wilting in the reflection, but so beautiful you could not look away...",
        "The report slammed upon her desk with a thud. Thick and full of irrelevant judgement. For she was not destined for this, but something...",
        "Where does one go when they sleep?",
        "If we are alone in this universe then I might be alright. But if I am alone on this earth, no one is safe...",
        "Grandma stopped being able to walk before her mind went too. But this elixir might just be able to save her. I fear by doing so I might kill another part of her though. I guess this might be a risk I'll have to take. Unless...",
        "The election process went swimmingly. You now own 90% of company X. You are now worth more than your parents could ever dream of. What will you do first?",
        "The roses and the daisies spoke softly as I sauntered on the hill. But what they spoke of illicited a new kind of happiness not found in any buddhist's home. I will follow their call of action to...",
        "We stopped off the highway in some rinkydink town filled with nothing but dust and dry air. We were hungry, perfect for us was a diner just a minute from the road. It looked empty save for one car. This was 'The Stop,' but with a name like that, how could it ever meet the needs of...",
        "The plan is simple: get in, raise the alarms, rain hell, take the money, bring justice upon those who have wronged us, and get out. How could it have ever gone so wrong?",
        "What a funny looking mushroom...",
        "Have you ever been to Iceland? I heard there are beautiful mountains and wonderous dragons stalking the skies. Oh did I say dragons? Well, you'll have to come and see for yourself.",
        "The feeling of the road can never be beaten. The asphault gripped at me like a lover after a month away. The petrol seeped into the vents and filled my lungs with joyous reprise. The finish line was near. And so was..."];
        let randomNumber = Math.floor(Math.random() * prompts.length);
        item.prompt = prompts[randomNumber];
        document.getElementById("theP").innerHTML = prompts[randomNumber];
        
    }


    return (
        <IonCard>
            <IonCardContent>
                <IonItem>
                    <p id="theP" contentEditable="true"></p>
                   
                </IonItem>
                <IonItem>
                    <IonButton onClick={generatePrompt}>Get your prompt</IonButton>
                </IonItem>
                <IonItem>
                    <IonTextarea value={item.title} placeholder="Title" name="title" onIonChange={updateField} >

                    </IonTextarea>
                </IonItem>
                <IonItem>
                    <IonTextarea auto-grow="true" value={item.content} placeholder="Content" name="content" onIonChange={updateField}>
                    </IonTextarea>
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