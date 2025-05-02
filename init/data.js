const samplePosts = [
  {
    description: "A serene lake reflecting the surrounding mountains.",
    image: {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 22,
  },
  {
    description: "A winding path through a golden autumn forest.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 18,
  },
  {
    description: "A latte art heart in a cappuccino.",
    image: {
      url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 31,
  },
  {
    description: "A dramatic sunset over a rocky coastline.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 41,
  },
  {
    description: "Freshly baked croissants on a wooden board.",
    image: {
      url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 25,
  },
  {
    description: "An old rustic wooden door with iron hinges.",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 19,
  },
  {
    description: "A modern kitchen with stainless steel appliances.",
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 38,
  },
  {
    description: "A vibrant coral reef with colorful fish swimming.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 30,
  },
  {
    description: "A foggy sunrise over rolling green hills.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 23,
  },
  {
    description: "A cozy reading nook with a soft blanket and pillows.",
    image: {
      url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 20,
  },
  {
    description: "A vibrant display of fireworks at night.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 45,
  },
  {
    description: "An old stone archway covered in ivy.",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 21,
  },
  {
    description: "A delicate pink lotus flower floating on water.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 33,
  },
  {
    description: "A bustling city street at twilight.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 40,
  },
  {
    description: "A cozy campfire under a starry night sky.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 42,
  },
  {
    description: "Sunlight piercing through a dense bamboo forest.",
    image: {
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 33,
  },
  {
    description: "A scenic mountain road surrounded by trees.",
    image: {
      url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 21,
  },
  {
    description: "A blue-and-yellow macaw perched on a branch.",
    image: {
      url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 49,
  },
  {
    description: "A scenic boat ride through the canals of Venice.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 44,
  },
  {
    description: "An aerial view of a forest covered in morning fog.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 36,
  },
  {
    description: "A pile of vintage books with dried flowers.",
    image: {
      url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 26,
  },
  {
    description: "Hot air balloons soaring over Cappadocia at sunrise.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 42,
  },
  {
    description: "Sunlight filtering through a dense bamboo forest.",
    image: {
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 28,
  },
  {
    description: "A winding mountain road surrounded by autumn trees.",
    image: {
      url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 33,
  },
  {
    description: "A vibrant macaw perched on a tree branch.",
    image: {
      url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 47,
  },
  {
    description: "A gondola gliding through the canals of Venice.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 38,
  },
  {
    description: "A foggy forest with sunlight peeking through trees.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 29,
  },
  {
    description: "Vintage books stacked with dried flowers on top.",
    image: {
      url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 25,
  },
  {
    description: "A serene lake reflecting the surrounding mountains.",
    image: {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2069&auto=format&fit=crop",
      filename: "postimage",
    },
    likes: 37,
  },
];

module.exports = { data: samplePosts };
