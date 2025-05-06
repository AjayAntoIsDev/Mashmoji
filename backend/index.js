const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs').promises;
const path = require('path');
const app = express();

let emojiData = null;
async function loadMetadata() {
  try {
    console.log('Loading metadata file...');
    const startTime = Date.now();

    const filePath = path.join(__dirname, 'metadata.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(fileContent);

    emojiData = parsedData.data;

    const endTime = Date.now();
    console.log(`Metadata loaded successfully in ${endTime - startTime}ms`);
    console.log(`Loaded ${Object.keys(emojiData).length} emojis`);
  } catch (error) {
    console.error('Error loading metadata:', error);
    process.exit(1);
  }
}

const limiter = rateLimit({
  windowMs: 1000 * 60,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    url: 'https://cloud-qn5szuhpy-hack-club-bot.vercel.app/0slow_down_icon.png',
  },
});

app.use(
  cors({
    origin: 'https://mashmoji.ajayanto.me',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(limiter);

app.use((req, res, next) => {
  if (!emojiData) {
    return res.json({
      url: 'https://cloud-ks2x4kgzd-hack-club-bot.vercel.app/0unavailable_icon.png',
    });
  }
  next();
});

app.get('/:firstEmoji/:secondEmoji', (req, res) => {
  const { firstEmoji, secondEmoji } = req.params;
  const firstEmojiData = emojiData[firstEmoji];

  if (!firstEmojiData) {
    return res.json({
      url: 'https://cloud-7kj5r6n58-hack-club-bot.vercel.app/0not_found_icon_from_photopea.png',
    });
  }

  const combinations = firstEmojiData.combinations[secondEmoji];
  if (!combinations) {
    return res.json({
      url: 'https://cloud-7kj5r6n58-hack-club-bot.vercel.app/0not_found_icon_from_photopea.png',
    });
  }

  const latestCombination =
    combinations.find((combo) => combo.isLatest) || combinations[0];
  res.json({
    url: latestCombination['gStaticUrl'],
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    dataLoaded: !!emojiData,
    emojis: emojiData ? Object.keys(emojiData).length : 0,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong!',
  });
});

async function startServer() {
  await loadMetadata();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});
