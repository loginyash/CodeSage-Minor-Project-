// YouTube Playlist IDs for free coding tutorials
// These are popular free tutorial playlists from FreeCodeCamp and other trusted educational channels

export const youtubePlaylists: Record<string, { playlistId: string; title: string; channel: string; isVideo?: boolean }> = {
  "lesson-1": {
    playlistId: "mJgBOIoGIHk", // HTML Full Course - FreeCodeCamp
    title: "HTML Full Course for Beginners",
    channel: "freeCodeCamp.org",
    isVideo: true,
  },
  "lesson-2": {
    playlistId: "1Rs2ND1ryYc", // CSS Full Course - FreeCodeCamp
    title: "CSS Full Course for Beginners",
    channel: "freeCodeCamp.org",
    isVideo: true,
  },
  "lesson-3": {
    playlistId: "jS4aFq5-91M", // JavaScript Full Course - FreeCodeCamp
    title: "JavaScript Full Course for Beginners",
    channel: "freeCodeCamp.org",
    isVideo: true,
  },
  "lesson-4": {
    playlistId: "rfscVS0vtbw", // Python Full Course - FreeCodeCamp
    title: "Python Full Course for Beginners",
    channel: "freeCodeCamp.org",
    isVideo: true,
  },
  "lesson-5": {
    playlistId: "bMknfKXIFA8", // React Full Course - FreeCodeCamp
    title: "React Full Course for Beginners",
    channel: "freeCodeCamp.org",
    isVideo: true,
  },
  "lesson-6": {
    playlistId: "TlB_eWDSMt4", // Node.js Full Course - FreeCodeCamp
    title: "Node.js Full Course for Beginners",
    channel: "freeCodeCamp.org",
    isVideo: true,
  },
  "lesson-7": {
    playlistId: "nZ1DMMsyVyI", // SQL Full Course - FreeCodeCamp
    title: "SQL Full Course for Beginners",
    channel: "freeCodeCamp.org",
    isVideo: true,
  },
  "lesson-8": {
    playlistId: "HcWcAfb4dVI", // Git & GitHub Full Course - FreeCodeCamp
    title: "Git & GitHub Full Course for Beginners",
    channel: "freeCodeCamp.org",
    isVideo: true,
  },
};

// Alternative popular free tutorial playlists from FreeCodeCamp
export const alternativePlaylists = {
  html: [
    {
      playlistId: "mJgBOIoGIHk",
      title: "HTML Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    },
  ],
  css: [
    {
      playlistId: "1Rs2ND1ryYc",
      title: "CSS Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    },
  ],
  javascript: [
    {
      playlistId: "jS4aFq5-91M",
      title: "JavaScript Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    },
  ],
  python: [
    {
      playlistId: "rfscVS0vtbw",
      title: "Python Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    },
  ],
  react: [
    {
      playlistId: "bMknfKXIFA8",
      title: "React Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    },
  ],
};

// Fallback playlists by topic
export const getPlaylistByTopic = (topic: string): { playlistId: string; title: string; channel: string; isVideo?: boolean } | null => {
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes("html")) {
    return {
      playlistId: "mJgBOIoGIHk",
      title: "HTML Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    };
  }
  
  if (topicLower.includes("css")) {
    return {
      playlistId: "1Rs2ND1ryYc",
      title: "CSS Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    };
  }
  
  if (topicLower.includes("javascript") || topicLower.includes("js")) {
    return {
      playlistId: "jS4aFq5-91M",
      title: "JavaScript Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    };
  }
  
  if (topicLower.includes("python")) {
    return {
      playlistId: "rfscVS0vtbw",
      title: "Python Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    };
  }
  
  if (topicLower.includes("react")) {
    return {
      playlistId: "bMknfKXIFA8",
      title: "React Full Course for Beginners",
      channel: "freeCodeCamp.org",
      isVideo: true,
    };
  }
  
  return null;
};

