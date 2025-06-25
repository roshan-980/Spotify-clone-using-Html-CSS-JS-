# Spotify-clone-using-Html-CSS-JS-
# 🎧 Spotify Web Clone

A responsive, dynamic Spotify web player clone built using **HTML**, **CSS**, and **JavaScript**. This project mimics the core features of Spotify's UI and music playback behavior while being entirely client-side. It allows users to browse albums, view their details, and play stored music files.

![Spotify Clone Screenshot](img/logo.svg) <!-- Replace with a screenshot of your UI if available -->

---

## 🚀 Features

- 🎵 **Dynamic Album Rendering**  
  Automatically scans folders inside `/songs/`, reads `info.json`, and dynamically creates album cards with image, title, and description.

- 📂 **Client-side Music Playback**  
  Plays `.mp3` files directly stored in the project, showcasing how media can be handled on the client side.

- 🖱️ **Interactive Play Controls**  
  Includes features like play/pause, next/previous track, seek bar, volume control, and mute toggle.

- 📱 **Responsive Design**  
  Fully responsive UI using **CSS Media Queries** for:
  - `max-width: 1200px`
  - `max-width: 500px`  
  Ensures usability across desktops, tablets, and mobile devices.

- 📜 **Album Info with JSON**  
  Each album has a corresponding `info.json` and `cover.jpg`, making the player scalable and easy to extend with new albums.

- 🎛️ **Seamless UI Transitions**  
  Includes navigation toggles, left sidebar animation, and real-time song info updates.

---

## 🛠️ Tech Stack

- **HTML5** – Markup structure
- **CSS3** – Custom styles + media queries for responsiveness
- **Vanilla JavaScript** – Core functionality, dynamic DOM manipulation
- **SVG Icons** – For controls like play, pause, volume, etc.
- **MP3 Files** – For local audio demonstration

---

## 📁 Folder Structure

📦 project-root/
┣ 📁 css/
┃ ┣ 📄 style.css
┃ ┗ 📄 utility.css
┣ 📁 img/
┃ ┗ 📄 (all icons and images used)
┣ 📁 songs/
┃ ┣ 📁 album1/
┃ ┃ ┣ 📄 info.json
┃ ┃ ┣ 📄 cover.jpg
┃ ┃ ┗ 📄 song.mp3
┃ ┗ 📄 ...
┣ 📄 index.html
┣ 📄 script.js
┗ 📄 favicon.ico

yaml
Copy
Edit

---

## ⚡ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spotify-clone.git
Open index.html in your browser (no backend required!).

To add new music:

Create a new folder in /songs/

Add cover.jpg, info.json, and your .mp3 files

The app will automatically detect and render it

📌 Notes
This is a frontend-only project. No backend or database integration.

Designed for learning and showcasing dynamic UI/UX and client-side JS capabilities.

Optimized for desktop and mobile views.

👨‍💻 Author
Roshan Gupta
GitHub • LinkedIn

