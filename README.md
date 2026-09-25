# Digital Bookshelf API

A backend API that helps a library keep track of its books. Libararies can **add** books, **see** all books, **find** one book, **update** a book, and **remove** a book.

Built with **Node.js**, **Express**, **MongoDB Atlas** and **Mongoose**

## What Does This Project Do?

When a request comes in, Express checks which route matches it. That route uses the `Book` model to save, find, update, or delete a book in MongoDB, and then sends back a response.

The model makes sure everybook follows the same rules so nothing gets saved without a title or author.

This kind of API is called a **CRUD** API, which stands for the four things you can do with data:

| Letter | Means | Example |
|---|---|---|
| **C** | Create | Add a new book |
| **R** | Read | Look at books |
| **U** | Update | Change a book's info |
| **D** | Delete | Remove a book |

---

## 🗂️ Project Structure

```
digital-bookshelf-api/
├── db/
│   └── connection.js    # Connects the app to MongoDB Atlas
├── models/
│   └── Book.js          # The rules for what a book looks like
├── routes/
│   └── bookRoutes.js    # What happens for each request (the CRUD actions)
├── .env                 # Secret settings (NOT uploaded to GitHub)
├── .env.example         # A safe template showing what goes in .env
├── .gitignore           # Tells Git which files to never upload
├── package.json         # Project info and list of packages
└── server.js            # Starts the app and connects all the pieces
```

**Each file has one job.** That makes it easier to find bugs and add new features later.

---

## The Book Model

Every book saved in the database follows these rules:

| Field | Type | Rule |
|---|---|---|
| `title` | String | **Required** — you can't save a book without it |
| `author` | String | **Required** |
| `isbn` | String | **Unique** — no two books can share one |
| `publishedDate` | Date | Optional |
| `inStock` | Boolean | Defaults to `true` if you don't send it |

MongoDB also gives every book an automatic `_id`, which is how we find a specific book.

---

## How to Run This Project

**1. Clone the repo and move into the folder**

```bash
git clone <your-repo-url>
cd digital-bookshelf-api
```

**2. Install the packages**

```bash
npm install
```

This installs `express`, `mongoose`, and `dotenv`.

**3. Create your `.env` file**

Make a copy of `.env.example`, name it `.env`, and fill in your own MongoDB Atlas connection string:

```
MONGO_URI=your-mongodb-atlas-connection-string
PORT=3005
```

> ⚠️ Never share your `.env` file or upload it to GitHub. It has your database password in it.

**4. Start the server**

```bash
node server.js
```

You should see:

```
✅ Connected to MongoDB Atlas
🚀 Server running at http://localhost:3005
```

> 💡 **Tip:** Node only reads your files when it starts. If you change code, stop the server (`Ctrl + C`) and start it again, or use `node --watch server.js` so it restarts on its own.

---

## 🔌 API Endpoints

All routes start with: `http://localhost:3005/api/books`

| Action | Method | URL | Body needed? | Success response |
|---|---|---|---|---|
| Create a book | `POST` | `/api/books` | ✅ Yes | `201` + the new book |
| Get all books | `GET` | `/api/books` | ❌ No | `200` + array of books |
| Get one book | `GET` | `/api/books/:id` | ❌ No | `200` + one book |
| Update a book | `PUT` | `/api/books/:id` | ✅ Yes | `200` + the updated book |
| Delete a book | `DELETE` | `/api/books/:id` | ❌ No | `200` + confirmation message |

**What is `:id`?** It's a blank that gets filled in with a real book's `_id`. For example: `/api/books/66f1a2b3c4d5e6f7a8b9c0d1`

### Example: Creating a Book

**Request:** `POST /api/books`

```json
{
  "title": "The Monk Who Sold His Ferrari",
  "author": "Robin Sharma",
  "isbn": "9780062515674",
  "publishedDate": "1997-09-25"
}
```

**Response:** `201 Created`

```json
{
  "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
  "title": "The Monk Who Sold His Ferrari",
  "author": "Robin Sharma",
  "isbn": "9780062515674",
  "publishedDate": "1997-09-25T00:00:00.000Z",
  "inStock": true,
  
}
```

### Error Responses

The API sends back clear messages when something goes wrong:

| Status | Meaning | When it happens |
|---|---|---|
| `400` | Bad Request | Missing a required field, or the id isn't a valid format |
| `404` | Not Found | No book has that id |
| `409` | Conflict | A book with that ISBN already exists |
| `500` | Server Error | Something unexpected broke on the server |

---

## 🧪 How I Tested It

I tested every endpoint in **Postman**. For each request, I checked three things:

1. **The status code** (like `201` or `404`)
2. **The response body** (the JSON that came back)
3. **The database** (did the change really save?)

**Happy path tests** (things that should work):

- ✅ `POST` a new book → got `201` and the book with `inStock: true` by default
- ✅ `GET` all books → got an array of every book
- ✅ `GET` one book by id → got just that book
- ✅ `PUT` `{ "inStock": false }` → got the updated book, and a second `GET` confirmed it saved
- ✅ `DELETE` a book → got a confirmation message, and a second `GET` returned `404`

**Error tests** (things that should fail safely):

- ✅ `POST` with no title → `400`
- ✅ `POST` a duplicate ISBN → `409`
- ✅ `GET` a deleted book → `404`
- ✅ `GET` `/api/books/banana` → `400` (not a valid id)
- ✅ `PUT` with an empty title → `400`

---

## 💭 Reflection Questions

### 1. Why is it beneficial to separate your routes, models, and database connection into different directories?

Because **each file has one job**, just like workers in a library. One person answers the phone, one person makes the library cards, and one person helps visitors at the desk.

This helps in a few ways:

- **Finding bugs is faster.** If the database won't connect, I know to look in `db/connection.js`, not dig through one giant file.
- **Adding features is easier.** If the library later wants to track members, I can add `models/Member.js` and `routes/memberRoutes.js` without touching the book code.
- **Teams can work together.** One person can work on routes while another works on models without getting in each other's way.
- **Code can be reused.** The `Book` model can be used by any route that needs it, not just one.

If everything lived in `server.js`, it would work at first, but it would turn into a messy junk drawer as the app grew.

### 2. What is the difference between `PUT` and `PATCH` HTTP methods, and which one does your `PUT /:id` endpoint more closely resemble?

- **`PUT`** means *"replace the whole thing."* You're supposed to send the **complete** new version of the book. Anything you leave out should be wiped away.
- **`PATCH`** means *"change just this part."* You only send the fields you want to update, and everything else stays the same.

**Example:** If a book has a title, author, and ISBN, and I send `{ "inStock": false }`:

- A true `PUT` would replace the book with *only* `inStock: false` and the title, author, and ISBN would be gone.
- A `PATCH` would only change `inStock` and keep everything else.

**My `PUT /:id` route actually behaves more like `PATCH`.** It uses Mongoose's `findByIdAndUpdate()`, which by default only changes the fields I send and leaves the rest alone. When I tested it by sending just `{ "inStock": false }`, the title, author, and ISBN were all still there. So even though the route uses the `PUT` method, it acts like a partial update.

### 3. In the `DELETE` route, what is a good practice for the response you send back to the client after a successful deletion? Should you send the deleted object, a simple success message, or something else? Why?

There are a few good options, and each one fits a different situation:

| Option | What it is | When it's useful |
|---|---|---|
| **Success message + deleted object** | `200` with a message and the book that was removed | When the app wants to show "You deleted *Sharma*" or offer an **undo** button |
| **Simple success message** | `200` with `{ "message": "Book deleted" }` | When the app just needs to know