# 🔗 URL Shortener

A simple and fast URL Shortener web application that converts long URLs into short, shareable links.

---

## 🚀 Features

- Shorten any long URL into a compact link
- Redirect users to the original URL using the short link
- Copy short URL to clipboard with one click
- Clean and responsive UI
- REST API support

---

## 🛠️ Tech Stack

- **Backend:** Node.js / Express.js
- **Database:** MongoDB / MySQL
- **Others:** Nanoid / UUID (for generating short codes)

---

## 📁 Project Structure

```
url-shortner/
├── public/
│   ├── index.html
│   └── style.css
├── routes/
│   └── url.js
├── models/
│   └── Url.js
├── controllers/
│   └── urlController.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gudduKumar548/url-shortner-.git
cd url-shortner-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

### 4. Run the Application

```bash
npm start
```

The app will run at `http://localhost:5000`.

---

## 📡 API Endpoints

| Method | Endpoint        | Description                        |
|--------|----------------|------------------------------------|
| POST   | `/api/shorten`  | Convert a long URL to a short one  |
| GET    | `/:shortCode`   | Redirect to the original URL       |

### Example Request

```json
POST /api/shorten
{
  "originalUrl": "https://www.example.com/very/long/url/path"
}
```

### Example Response

```json
{
  "shortUrl": "http://localhost:5000/abc123",
  "originalUrl": "https://www.example.com/very/long/url/path"
}
```

---

## 🤝 Contributing

Pull requests are welcome! If you find a bug or want to add a new feature:

1. Fork the repository
2. Create your branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project currently does not specify a license.

---

## 👨‍💻 Author

**Guddu Kumar**  
GitHub: [@gudduKumar548](https://github.com/gudduKumar548)

---

> ⭐ If you found this project helpful, please give it a star!
