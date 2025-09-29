# SQL Workshop: Building a Simple Blog with SQLite

Welcome to this hands-on SQL workshop! We'll be building a simple blog application that demonstrates core SQL concepts using SQLite. This workshop focuses entirely on **SQL and database operations** - the frontend and server code are already provided.

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Clone the Repository](#clone-the-repository)
3. [Create the Database Table](#create-the-database-table)
4. [Write SQL for API Endpoints](#write-sql-for-api-endpoints)

---

## 1. Introduction

### What We're Building

We're creating a simple blog application with the following features:
- **View Posts**: Display all blog posts in chronological order
- **Create Posts**: Add new blog posts with username and message
- **Delete Posts**: Remove posts from the database

### Database Schema

Our application uses a single table called `Posts` with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Unique identifier for each post |
| `username` | TEXT NOT NULL | Name of the person who wrote the post |
| `message` | TEXT NOT NULL | The actual blog post content |
| `timestamp` | DATETIME DEFAULT CURRENT_TIMESTAMP | When the post was created |

### SQL Concepts We'll Cover

- **CREATE TABLE**: Setting up database structure
- **SELECT**: Retrieving data from tables
- **INSERT**: Adding new records
- **DELETE**: Removing records
- **ORDER BY**: Sorting query results
- **WHERE**: Filtering data
- **Parameterized Queries**: Safe database operations

---

## 2. Clone the Repository

First, let's get the code on your machine:

```bash
git clone https://github.com/jonathanguven/sce_db_demo.git
cd sce_db_demo
```

### Install Dependencies

```bash
npm install
```

### Project Structure

```
sce_db_demo/
├── db/
│   └── db_init.db           # Database initialization script
├── public/
│   ├── index.html           # Frontend interface
│   ├── styles.css           # Styling
│   └── script.js            # Frontend JavaScript
├── server.js                # Backend server with API endpoints
└── package.json             # Project dependencies
```

---

## 3. Create the Database Table

Before we can work with data, we need to create our database table. Let's examine the table creation process.

### Understanding the Table Structure

Our `Posts` table needs to store:
- A unique ID for each post
- The username of the author
- The message content
- A timestamp of when it was created

### SQL CREATE TABLE Statement

Here's the SQL we need to create our table:

```sql
CREATE TABLE IF NOT EXISTS Posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Copy it and paste it in `db/db_init.js` under the `createPostsTable` function!

### Breaking Down the SQL

- **`CREATE TABLE IF NOT EXISTS`**: Creates the table only if it doesn't already exist
- **`id INTEGER PRIMARY KEY AUTOINCREMENT`**:
  - `INTEGER`: Stores whole numbers
  - `PRIMARY KEY`: Uniquely identifies each row
  - `AUTOINCREMENT`: Automatically generates sequential numbers
- **`username TEXT NOT NULL`**:
  - `TEXT`: Stores string data
  - `NOT NULL`: This field cannot be empty
- **`message TEXT NOT NULL`**: Same as username, but for the post content
- **`timestamp DATETIME DEFAULT CURRENT_TIMESTAMP`**:
  - `DATETIME`: Stores date and time
  - `DEFAULT CURRENT_TIMESTAMP`: Automatically sets to current time when a row is inserted

### Initialize the Database

Run the database initialization script:

```bash
npm run init-db
```

This will create the `Posts` table in your SQLite database under a file called `db/database.db`.

Now that our table is created, let's take a look at our database structure:

Go to [this online SQLite viewer](https://sqliteviewer.app/)

Drag and drop your .db file in!

<img width="1208" height="817" alt="image" src="https://github.com/user-attachments/assets/27251af4-d76c-4fc5-8ae3-4e60af6e6d35" />

You should see this in the database viewer:

<img width="1091" height="263" alt="image" src="https://github.com/user-attachments/assets/9d46ef21-8340-4a2b-9ff9-6d4dc545620c" />

From now on, whenever you execute a SQL query, just re-upload your `.db` file on the website to view your changes!
---

## 4. Write SQL for API Endpoints

Now let's examine the server code and write the SQL statements for each API endpoint.

### Understanding the Server Code

Open `server.js` and you'll see three API endpoints that need SQL:

1. **GET /api/posts** - Retrieve all posts
2. **POST /api/posts** - Create a new post
3. **DELETE /api/posts/:id** - Delete a specific post

### 4.1 GET /api/posts - Select All Posts

**Goal**: Retrieve all posts from the database, ordered by most recent first.

**Current Code**:
```javascript
app.get('/api/posts', (req, res) => {

  const sql = 'WRITE YOUR SQL HERE!';

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
```

**Your Task**: Replace `'WRITE YOUR SQL HERE!'` with the appropriate SQL.

**Hint**: You need to:
- Select all columns from the Posts table
- Order the results by timestamp in descending order (newest first)

<details>
<summary><strong>Click to reveal solution</strong></summary>

**Solution**:
```sql
SELECT * FROM Posts ORDER BY timestamp DESC
```

**Explanation**:
- `SELECT *`: Gets all columns from the table
- `FROM Posts`: Specifies which table to query
- `ORDER BY timestamp DESC`: Sorts by timestamp, newest first

</details>

Let's create a new post now! Restart your Express server, and fill in the `username` and `message` form fields, and click `submit`!

We should now see the new post on our web page!

Just to make sure we added it to our database, let's re-upload our `database.db` file and see what shows up:

<img width="1040" height="224" alt="image" src="https://github.com/user-attachments/assets/9f1f4085-9473-4693-97b8-68ce80d29290" />

Hooray! We did it!

### 4.2 POST /api/posts - Insert New Post

**Goal**: Add a new post to the database with username and message.

**Current Code**:
```javascript
// API endpoint to create a new post
app.post('/api/posts', (req, res) => {
  const { username, message } = req.body;

  const sql = 'WRITE YOUR SQL HERE!';

  db.run(sql, [username, message], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Post created successfully', id: this.lastID });
  });
});
```

**Your Task**: Replace `'WRITE YOUR SQL HERE!'` with the appropriate SQL.

**Hint**: You need to:
- Insert data into the Posts table
- Specify which columns to insert into
- Use placeholders (?) for the values

<details>
<summary><strong>Click to reveal solution</strong></summary>

**Solution**:
```sql
INSERT INTO Posts (username, message) VALUES (?, ?)
```

**Explanation**:
- `INSERT INTO Posts`: Specifies the table to insert into
- `(username, message)`: Lists the columns to insert data into
- `VALUES (?, ?)`: Placeholders for the actual values (provided as parameters)

**Why Use Placeholders?**
- **Security**: Prevents SQL injection attacks
- **Clean Code**: Separates SQL logic from data
- **Reusability**: Same query works with different data

</details>

### 4.3 DELETE /api/posts/:id - Delete Specific Post

**Goal**: Remove a specific post from the database by its ID.

**Current Code**:
```javascript
// API endpoint to delete a post
app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;

  const sql = 'WRITE YOUR SQL HERE!';

  db.run(sql, [postId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json({ message: 'Post deleted successfully' });
  });
});
```

**Your Task**: Replace `'WRITE YOUR SQL HERE!'` with the appropriate SQL.

**Hint**: You need to:
- Delete from the Posts table
- Use a WHERE clause to specify which post to delete
- Use a placeholder for the ID

<details>
<summary><strong>Click to reveal solution</strong></summary>

**Solution**:
```sql
DELETE FROM Posts WHERE id = ?
```

**Explanation**:
- `DELETE FROM Posts`: Specifies the table to delete from
- `WHERE id = ?`: Only deletes rows where the id matches the provided value
- The `?` placeholder is replaced with the actual post ID

</details>

### Testing Your SQL

Once you've written all the SQL statements:

1. **Start the server**:
   ```bash
   npm start
   ```

2. **Open your browser** to `http://localhost:3000`

3. **Test the functionality**:
   - Create a new post using the form
   - Verify it appears in the list
   - Try deleting a post
   - Refresh the page to see if changes persist

---

## 🎯 Key SQL Takeaways

### 1. **SELECT** - Reading Data
```sql
SELECT * FROM table_name WHERE condition ORDER BY column;
```

### 2. **INSERT** - Adding Data
```sql
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
```

### 3. **DELETE** - Removing Data
```sql
DELETE FROM table_name WHERE condition;
```

### 4. **Best Practices**
- Always use parameterized queries (`?` placeholders)
- Include WHERE clauses in DELETE statements
- Use ORDER BY for consistent data presentation
- Handle errors appropriately

---

## 🚀 Next Steps

Now that you understand the basic SQL operations, you could extend this application with:

- **UPDATE** statements to edit existing posts
- **JOIN** operations if you add user tables
- **Complex WHERE** clauses for filtering posts
- **Database indexes** for better performance

Happy coding! 🎉
