import EmojiPicker, {
  Categories,
  EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react';
import { ExcludedEmojis } from './excludedEmojis.ts';
import { useCallback, useState } from 'react';

let selectedEmojiId = 1;

const App = () => {
  const [firstEmoji, setFirstEmoji] = useState<any>(null);
  const [secondEmoji, setSecondEmoji] = useState<any>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<number>(1);
  let firstEmojiId = '';
  let secondEmojiId = '';

  const [resultEmojiUrl, setResultEmojiUrl] = useState<string>('');

  const onFirstEmojiPick = useCallback((emoji: EmojiClickData) => {
    setFirstEmoji(emoji);
    firstEmojiId = emoji.unified;
    setTimeout(() => {
      fetch(`https://mashmojiapi.ajayanto.me/${firstEmojiId}/${secondEmojiId}`)
        .then((response) => response.json())
        .then((data) => setResultEmojiUrl(data.url));
    }, 100);
  }, []);

  const onSecondEmojiPick = useCallback((emoji: EmojiClickData) => {
    setSecondEmoji(emoji);
    secondEmojiId = emoji.unified;
    setTimeout(() => {
      fetch(`https://mashmojiapi.ajayanto.me/${firstEmojiId}/${secondEmojiId}`)
        .then((response) => response.json())
        .then((data) => setResultEmojiUrl(data.url));
    }, 100);
  }, []);

  const copyToClipboard = async () => {
    if (resultEmojiUrl) {
      try {
        const response = await fetch(resultEmojiUrl);
        const blob = await response.blob();
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        alert('Image copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy image:', error);
      }
    }
  };

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
        <div
          className={`flex h-[5.5rem] w-[5.5rem] cursor-pointer items-center justify-center rounded-2xl bg-surface-a10 p-4 md:h-28 md:w-28 ${
            selectedEmoji === 1 ? 'outline outline-2 outline-blue-500' : ''
          }`}
          onClick={() => {
            selectedEmojiId = 1;
            console.log(selectedEmojiId);
            setSelectedEmoji(1);
          }}
        >
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
        <div
          className={`flex h-[5.5rem] w-[5.5rem] cursor-pointer items-center justify-center rounded-2xl bg-surface-a10 p-4 md:h-28 md:w-28 ${
            selectedEmoji === 2 ? 'outline outline-2 outline-blue-500' : ''
          }`}
          onClick={() => {
            selectedEmojiId = 2;
            console.log(selectedEmojiId);
            setSelectedEmoji(2);
          }}
        >
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
        <div className={'self-start'}>
          <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-2xl bg-surface-a10 p-4 md:h-28 md:w-28">
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
          <button
            onClick={copyToClipboard}
            className="absolute mt-4 w-[5.5rem] rounded-lg bg-blue-700 bg-opacity-70  p-2 text-xs text-white hover:bg-opacity-50 md:w-28 md:text-base"
          >
            Copy Emoji
          </button>
        </div>
      </div>

      <div
        className={
          'grid w-full grid-cols-1 grid-rows-1 items-center justify-center gap-12 p-12 md:grid-cols-2'
        }
      >
        <EmojiPicker
          className={'ml-auto !hidden !h-[50vh] !w-full md:!flex'}
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
          className={'mr-auto !hidden !h-[50vh] !w-full md:!flex'}
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
        <EmojiPicker
          className={'!flex !h-[55vh] !w-full md:!hidden'}
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
          onEmojiClick={(emoji) => {
            console.log(selectedEmojiId);
            selectedEmojiId === 1
              ? onFirstEmojiPick(emoji)
              : onSecondEmojiPick(emoji);
          }}
        />
      </div>
    </div>
  );
};

export default App;
