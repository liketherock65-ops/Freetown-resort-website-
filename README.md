# Freetown Resort-Gulu — Website

## 1. How to open the website
Unzip everything to one folder first (don't open from inside the zip). Double-click `index.html` to preview it in your browser. All files must stay in the same folder structure — don't move `style.css`, `script.js`, or the `images` folder separately.

## 2. Where to replace images
All photos are in the `images/` folder. To swap a photo, replace the file with your new one **using the exact same filename** (e.g. replace `images/room-single-1.jpg` with your new photo, keeping the name `room-single-1.jpg`). If you want to use a different filename, update the matching `src="images/..."` reference in `index.html`.

## 3. Where to change the WhatsApp number
Open `script.js` and edit this line near the top:
```js
const WHATSAPP_NUMBER = "256776810095"; // no "+" or spaces
```
Every WhatsApp button on the site (hero, booking section, contact card, footer, floating button, and the booking form) uses this one setting.

## 4. Where to change phone numbers
Phone numbers appear directly in `index.html` as `tel:+256704364474` and `tel:+256776810095` links (in the booking section, contact card, footer, and floating Call button). Search for `+256704364474` or `+256776810095` and replace them everywhere they appear — use Find & Replace in a text editor to catch every instance.

## 5. Where to change Facebook / Instagram / TikTok / YouTube links
Open `script.js` and edit this object near the top:
```js
const SOCIAL_LINKS = {
    facebook: "",
    instagram: "",
    tiktok: "https://vm.tiktok.com/ZS9D6Dr1HGLaJ-tsKfD/",
    youtube: ""
};
```
Paste a full profile URL into any empty field (e.g. `facebook: "https://facebook.com/yourpage"`) and that icon will automatically appear in the Contact section and footer. Leaving a field blank (`""`) automatically hides that icon everywhere.

## 6. How to upload to GitHub Pages
1. Unzip this project fully on your computer or phone.
2. Create a new repository on GitHub (or open your existing one).
3. Upload **all files and the whole `images` folder** — `index.html`, `style.css`, `script.js`, and `images/` with every photo inside it. If uploading through GitHub's website, drag the `images` folder in as a folder (not individual loose files) so the structure is preserved — or use GitHub Desktop, which preserves folders automatically.
4. Commit the changes.
5. Go to your repository's **Settings → Pages**, set the branch to `main` and the folder to `/ (root)`, then save.
6. GitHub will give you a live link (e.g. `yourname.github.io/your-repo-name`) within a minute or two.

---
*This file is for your own reference only — it is not part of the visible website.*
