# DriveLegal 🚗⚖️ (Static Edition)

> **India's most advanced AI-powered traffic law assistant & challan calculator**

This is the **pure HTML, CSS, and Vanilla JS** version of DriveLegal, designed to be extremely lightweight (under 50MB) and perfect for hosting on **GitHub Pages**.

---

## 🌐 Live Demo
*(Will be available once deployed to GitHub Pages)*

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Legal Search** | Ask any traffic law question — powered by Google Gemini |
| 📄 **Challan Calculator** | Interactive fines, real-time totals, downloadable summary |
| ⚖️ **Know Your Rights** | Legal rights during traffic stops with MVA references |
| 🚗 **Vehicle Compliance** | Check document validity and get a compliance score |
| 🌙 **Futuristic Dark UI** | Glass morphism, neon accents, pure CSS animations |
| 📱 **Zero Dependencies** | No Node.js, no build steps, pure static files |

---

## 🚀 Getting Started

Since this is a static site, you don't need `npm`, `node`, or any build tools!

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/drivelegal.git
   cd drivelegal
   ```

2. Open `index.html` directly in your web browser. 
   *(Alternatively, use the VS Code "Live Server" extension for a better experience).*

---

## 🌍 Deploy to GitHub Pages

1. Create a new repository on GitHub.
2. Upload all the files (`index.html`, `css/`, `js/`, etc.) to the repository.
3. Go to your repository **Settings** > **Pages**.
4. Set the source to the `main` branch.
5. Save, and your app will be live in a few minutes!

---

## 📁 Project Structure

```
drivelegal/
├── index.html           # Home page
├── ask.html             # AI legal search chat
├── challan.html         # Challan calculator
├── rights.html          # Know your rights
├── compliance.html      # Vehicle compliance checker
├── css/
│   └── styles.css       # Global futuristic styles
├── js/
│   ├── main.js          # Shared interactions
│   ├── ask.js           # Gemini AI API integration
│   ├── challan.js       # Fine calculation logic
│   └── compliance.js    # Document scoring logic
└── README.md
```

---

## ⚠️ Important Note About AI Search

The `ask.html` feature uses the Google Gemini AI API. Because this is a static, client-side application, the API key is embedded in `js/ask.js`. **If your repository is public, others will be able to see your API key.**
If you publish this to a public GitHub repo, it is highly recommended to secure your API key or remove it.

---

## 📄 Legal Disclaimer

This application is for **informational purposes only** and does not constitute legal advice. 
Always consult a qualified legal professional for legal matters.
Fine amounts are based on the Motor Vehicles Act 2019 and may vary by state.

---

## 📝 License

MIT © 2025 DriveLegal
