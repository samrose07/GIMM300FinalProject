import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { IonItem, IonButton, IonCard, IonCardContent, IonTextarea } from '@ionic/react';
import DataProps from './components/DataProps';
import { Plugins } from '@capacitor/core';
import "./Item.css";
//
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
                prompt: item.prompt,
                date: new Date().toLocaleDateString(), location:item.location ? item.location : ""}, {merge:true});
                clearInfo(item);
                setItem(item);
                props.clear();
        }
        else {
            await collectionRef.add({
                
                title: item.title, content: item.content,
                prompt: item.prompt,
                date: new Date().toLocaleDateString(), location:item.location ? item.location : ""});
                clearInfo(item);
                setItem(item);
                props.clear();
        }
    };

    const updateField = e => {

        e.preventDefault();

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
        let randomNumber = Math.floor(Math.random() * prompts.length + 1);
        item.prompt = prompts[randomNumber];
        document.getElementById("theP").innerHTML = prompts[randomNumber];

    }


    return (
        <IonCard className="thebody">
            <IonCardContent>
                <IonItem>
                    <p id="theP" contentEditable="true"></p>

                </IonItem>
                <IonItem>
                    <IonButton className="item-prompt2" onClick={generatePrompt}>Get your prompt</IonButton>
                </IonItem>
                <IonItem>
                    <IonTextarea value={item.title} placeholder="Title" name="title" onIonChange={updateField}>
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
/*,
        "A girl who lost her parents to the Nazis during the invasion of her country sells oranges to keep her self alive, this is her journey...",
        "How long can a man enjoy what he doesn't feel? Asked the wise man atop of the...",
        "When Andrew woke up that same morning, he felt, first thing, a certain familiar brand of interpersonal regret/not-regret that hadn't paid him a visit in years. On that lonesome day...",
        "Kevin hung up the phone knowing it would be a long while before he would talk to her again...",
        "God knows it took them long enough, but here they were good old Kurt and Brad, right here at the border of California and Nevada...",
        "Mac picked up the phone and finally heard that his car was spotted in Guaymas, Mexico. With that news his next course of action was...",
        "Gabe was alone. It was 11:00 p.m. now, a warm Monday night...",
        "There is no God in California, there are only roads...",
        "I've been turned into a worm. My God, It works...",
        "You think you know me? You don't know a thing about me president...",
        "We arrived at battery park where we saw them sitting on the bright blue chairs...",
        "He said the birds were chirping and he wanted to be with the birds, that’s the last time I've heard from him...",
        "No, you're wrong. The world belongs to those that make you think...",
        "My late father's last words to me were, 'Never let go of your personal beliefs. But look at them and ask yourself how and why do they serve you.'...",
        "Deltron my man, matrimony is an eternal and longterm commitment where once you put a ring on it, your fate is sealed yaknow...",
        "When we arrived in the desert and everything fell out of the back of the car and only Kim was to blame...",
        "The test of the universe...",
        "My son, temptation is one thing that I've defeated...",
        "After that day, when I met Shaq, I knew exactly where my basketball career was going to go...",
        "You want money from us? you fool we are poor farmers we have nothing to offer except...",
        "She was just in love with the concept she didn't actually believe...",
        "The monkey stumbled upon a cool looking rock. Little did he know it was...",
        "What do you mean. Look I came all the way out to Paris and I’m in love with you...",
        "No! don't eat those meal supplements, they contain...",
        "The man pushes through the rugged bushes to get to the end of his journey...",
        "I am surrounded by beauty yet all I feel is fear. There is nothing but darkness, accommodated by the boundless twinkling of the stars. Is this the end?",
        "That feeling, it's back again. The walls are closing in. Nothing lasts forever. One must always find tranquility again...",
        "All that was keeping him up was the thought of reaching the top. Nothing could stop him now that the mountain's peak was in his sights...",
        "The weight of his sword seemed to increase with each swing. His body couldn't take much more of this. But it didn't matter, he needed to save...",
        "He laid on the ground entirely still. I didn't mean for this to happen, my anger had gotten the best of me. There is nothing to do now but run, before someone sees...",
        "The sea had finally calmed but there was no land in sight. Supplies were running low and hope was dwindling. All there was was water as far as the eye could see and yet thirst would be his end...",
        "I felt my body rattle with each consecutive strike as the rocks crumbled away little by little. This search felt futile, but just as I felt it was time to step away I noticed a glimmer...",
        "One needs goodness to counteract the bad just as one needs badness to recognize the good. But what's a man to do if the good never comes? What's a man to do if he is nothing but bad?",
        "He reached into his pocket and grabbed the serum that he had created. It was his last chance. As he swallowed the liquid, he felt a rush of energy in his veins. He had never felt power like this before...",
        "It was like nothing I had ever seen before. I couldn't even see the top of it. Who would have seen this coming? How could a creature even be so big..." */