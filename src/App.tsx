import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useEffect, useState } from 'react';
import {ExcludedEmojis} from './excludedEmojis.ts';
const App = () => {

    const excludedEmojis = ExcludedEmojis();
    return (
        <div className="flex h-screen w-full items-center justify-center bg-surface-a0 text-white flex-col gap-6">
            <div
                id={'title'}
                className="flex w-full flex-col items-center justify-center gap-2"
            >
                <h1 className={'text-center text-5xl font-bold text-primary-a0'}>
                    Mashmoji
                </h1>
                <p className="text-xl font-semibold">Emojis, But Better.</p>
            </div>

            <div>
                <Picker data={data} onEmojiSelect={console.log} navPosition={"none"} noCountryFlags={true} exceptEmojis={excludedEmojis}/>
            </div>
        </div>
    );
};

export default App;