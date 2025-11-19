# 🎥 YouTube Tutorial Playlists

## ✨ What's Been Added

I've integrated free YouTube coding tutorial playlists into your learning platform! These are embedded directly in the lesson pages and on the homepage.

## 📚 Available Tutorials

### 1. **HTML Tutorial** (Lesson 1)
- **Playlist:** HTML Tutorial for Beginners
- **Channel:** Programming with Mosh
- **Location:** Embedded in lesson detail page

### 2. **CSS Fundamentals** (Lesson 2)
- **Playlist:** CSS Tutorials - Complete Course
- **Channel:** The Net Ninja
- **Location:** Embedded in lesson detail page

### 3. **JavaScript Basics** (Lesson 3)
- **Playlist:** JavaScript Tutorials for Beginners
- **Channel:** The Net Ninja
- **Location:** Embedded in lesson detail page

## 🎯 Features

### On Lesson Pages
- **Embedded YouTube Playlist** - Watch videos directly on the lesson page
- **Responsive Design** - Works on all devices
- **Auto-play disabled** - Respects user preferences
- **Full-screen support** - Watch in full-screen mode

### On Homepage
- **Video Tutorials Section** - Preview of all available tutorials
- **Quick Access** - Click to go to full lesson
- **Visual Preview** - See the first video in each playlist

## 📁 Files Created

- `src/components/YouTubePlaylist.tsx` - YouTube embed component
- `src/components/VideoTutorialsSection.tsx` - Homepage tutorials section
- `src/utils/youtubePlaylists.ts` - Playlist configuration

## 🔧 How It Works

1. **Lesson Detail Pages:**
   - When viewing a lesson, a YouTube playlist embed appears
   - Shows relevant tutorial playlist for that topic
   - Automatically matches lesson ID to playlist

2. **Homepage:**
   - New "Free Video Tutorials" section
   - Shows preview of all available video tutorials
   - Links to full lesson pages

## 🎨 Customization

To add more playlists, edit `src/utils/youtubePlaylists.ts`:

```typescript
export const youtubePlaylists: Record<string, { playlistId: string; title: string; channel: string }> = {
  "lesson-id": {
    playlistId: "YOUR_PLAYLIST_ID",
    title: "Playlist Title",
    channel: "Channel Name",
  },
};
```

## 📝 Notes

- All playlists are from trusted educational channels
- Completely free - no sign-up required
- Videos are embedded, not downloaded
- Respects YouTube's privacy settings
- Works with YouTube's embed API

## 🚀 Try It Out!

1. **Go to any lesson** - Click on a lesson card
2. **Scroll down** - See the embedded YouTube playlist
3. **Watch videos** - Click play to start learning
4. **Check homepage** - See the video tutorials section

Your learning platform now includes free video tutorials! 🎉



