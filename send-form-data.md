When you want to send array of something you send it one-by-one

if postman, so you write for example
tags[] = "Monitor"
tags[] = "LED"

if images

by code
```js
// Append images one by one (NOT JSON.stringify)
data.images.forEach((file: File) => {
  if (file && file.size > 0) {
    formData.append('images', file);
  }
});
```

by postman

------



https://chatgpt.com/share/687417df-1d40-800f-8307-04a556e2beec
Great question, Karim!

Let’s go over everything step by step:

---

## ✅ 1. `colors: Array<{ name: string, hexCode: string, quantity: number }>`

You **cannot** append it like `formData.append('colors', obj)` directly because it's an object.
**You have two correct options:**

### ✅ Option A — **JSON.stringify the full array**:

```ts
formData.append("colors", JSON.stringify(colors));
```

This is the **most reliable** way if your backend can parse JSON.

### ✅ Option B — **Append each color object as a separate field (less common, not ideal):**

```ts
colors.forEach((color, index) => {
  formData.append(`colors[${index}][name]`, color.name);
  formData.append(`colors[${index}][hexCode]`, color.hexCode);
  formData.append(`colors[${index}][quantity]`, String(color.quantity));
});
```

⚠️ This requires backend support for parsing nested keys, which not all setups handle.

---

## ✅ 2. Uploading `tags`, `images`, and `colors` in Postman

### ✅ Headers:

* **No need to manually set `Content-Type`** — Postman sets it when you choose `form-data`.

### ✅ Body (select `form-data` tab):

| Key           | Type | Value (Example)                        |
| ------------- | ---- | -------------------------------------- |
| `name`        | Text | "My product"                           |
| `description` | Text | "Awesome product"                      |
| `tags`        | Text | tag1                                   |
| `tags`        | Text | tag2 (Click `+` to add same key again) |
| `images`      | File | \[Upload file]                         |
| `images`      | File | \[Upload another file]                 |
| `colors`      | Text | Paste full JSON:                       |

For `colors`:

```json
[
  { "name": "Red", "hexCode": "#ff0000", "quantity": 10 },
  { "name": "Blue", "hexCode": "#0000ff", "quantity": 5 }
]
```

🟢 You paste this in the **Value** column, and Postman sends it as one text field, and you parse it on backend with `JSON.parse(req.body.colors)`.

---

## ✅ 3. Backend example (Node.js + Express)

```ts
app.post('/upload', upload.array('images'), (req, res) => {
  const tags = req.body.tags; // Array of strings
  const colors = JSON.parse(req.body.colors); // Array of objects
  const images = req.files; // Array of files from multer

  console.log({ tags, colors, images });
});
```

---

## ✅ Summary

| Field  | Type       | How to Send in Postman | How to Parse in Backend       |
| ------ | ---------- | ---------------------- | ----------------------------- |
| images | `File[]`   | Add multiple files     | `req.files` (Multer)          |
| tags   | `string[]` | Multiple `tags` keys   | `req.body.tags` (auto array)  |
| colors | `object[]` | One `colors` key, JSON | `JSON.parse(req.body.colors)` |

---

Let me know if you're using a different backend (like Laravel, Flask, etc.), and I’ll adjust the parsing guide for you.
