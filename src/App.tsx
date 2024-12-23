import EmojiPicker, {
  Categories,
  EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react';
import { ExcludedEmojis } from './excludedEmojis.ts';
import { useCallback, useState } from 'react';
const App = () => {
  const [firstEmoji, setFirstEmoji] = useState<any>(null);
  const [secondEmoji, setSecondEmoji] = useState<any>(null);

  let firstEmojiId = '';
  let secondEmojiId = '';

  const [resultEmojiUrl, setResultEmojiUrl] = useState<string>('');

  const onFirstEmojiPick = useCallback((emoji: EmojiClickData) => {
    setFirstEmoji(emoji);
    firstEmojiId = emoji.unified;
      fetch(`http://localhost:3000/${firstEmojiId}/${secondEmojiId}`)
        .then((response) => response.json())
        .then((data) => setResultEmojiUrl(data.url));
  }, []);

  const onSecondEmojiPick = useCallback((emoji: EmojiClickData) => {
    setSecondEmoji(emoji);
    secondEmojiId = emoji.unified;
      fetch(`http://localhost:3000/${firstEmojiId}/${secondEmojiId}`)
        .then((response) => response.json())
        .then((data) => setResultEmojiUrl(data.url));
  }, []);

  const excludedEmojiUpper: string[] = ExcludedEmojis();
  const excludedEmojis: string[] = excludedEmojiUpper.map((emoji) =>
    emoji.toLowerCase(),
  );
  return (
    <div className="scroll flex h-screen w-full flex-col items-center justify-center gap-6 bg-surface-a0 text-white">
      <div
        id={'title'}
        className="flex w-full flex-col items-center justify-center gap-2"
      >
        <h1 className={'text-center text-5xl font-bold text-primary-a0'}>
          Mashmoji
        </h1>
        <p className="text-xl font-semibold">Emojis, But Better.</p>
      </div>

      <div className="flex w-full items-center justify-center gap-3">
        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-surface-a10  p-4">
          <img
            src={
              firstEmoji?.imageUrl ||
              'https://cloud-7rpsonfnk-hack-club-bot.vercel.app/0circle_help.svg'
            }
            alt="First Emoji"
            className="h-full w-full"
            style={firstEmoji?.imageUrl ? {} : { filter: 'invert(1)' }}
          />
        </div>
        <p className={'text-4xl font-semibold'}>+</p>
        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-surface-a10 p-4">
          <img
            src={
              secondEmoji?.imageUrl ||
              'https://cloud-7rpsonfnk-hack-club-bot.vercel.app/0circle_help.svg'
            }
            alt="Second Emoji"
            className="h-full w-full text-white"
            style={secondEmoji?.imageUrl ? {} : { filter: 'invert(1)' }}
          />
        </div>
        <p className={'text-4xl font-semibold'}>=</p>
        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-surface-a10 p-4">
          <img
            src={
              resultEmojiUrl ||
              'https://cloud-7rpsonfnk-hack-club-bot.vercel.app/0circle_help.svg'
            }
            alt="Final Emoji"
            className="h-full w-full"
            style={resultEmojiUrl ? {} : { filter: 'invert(1)' }}
          />
        </div>
      </div>
      <div
        className={
          'grid w-full grid-cols-2 grid-rows-1 items-center justify-center gap-12 p-12'
        }
      >
        <EmojiPicker
          className={'ml-auto !w-full'}
          hiddenEmojis={excludedEmojis}
          theme={'dark' as Theme}
          emojiStyle={'google' as EmojiStyle}
          lazyLoadEmojis={true}
          skinTonesDisabled={true}
          previewConfig={{ showPreview: false }}
          categories={[
            { category: Categories.SMILEYS_PEOPLE, name: 'Smileys & People' },
            { category: Categories.ANIMALS_NATURE, name: 'Animals & Nature' },
            { category: Categories.FOOD_DRINK, name: 'Food & Drink' },
            { category: Categories.TRAVEL_PLACES, name: 'Travel & Places' },
            { category: Categories.OBJECTS, name: 'Objects' },
            { category: Categories.SYMBOLS, name: 'Symbols' },
            { category: Categories.ACTIVITIES, name: 'Activites' },
          ]}
          onEmojiClick={onFirstEmojiPick}
        />
        <EmojiPicker
          className={'mr-auto !w-full'}
          hiddenEmojis={excludedEmojis}
          theme={'dark' as Theme}
          emojiStyle={'google' as EmojiStyle}
          lazyLoadEmojis={true}
          skinTonesDisabled={true}
          previewConfig={{ showPreview: false }}
          categories={[
            { category: Categories.SMILEYS_PEOPLE, name: 'Smileys & People' },
            { category: Categories.ANIMALS_NATURE, name: 'Animals & Nature' },
            { category: Categories.FOOD_DRINK, name: 'Food & Drink' },
            { category: Categories.TRAVEL_PLACES, name: 'Travel & Places' },
            { category: Categories.OBJECTS, name: 'Objects' },
            { category: Categories.SYMBOLS, name: 'Symbols' },
            { category: Categories.ACTIVITIES, name: 'Activites' },
          ]}
          onEmojiClick={onSecondEmojiPick}
        />
      </div>
    </div>
  );
};

export default App;
