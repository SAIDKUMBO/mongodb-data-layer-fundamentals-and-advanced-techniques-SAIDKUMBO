# 📚 PLP Bookstore – MongoDB Assignment (Week 1)

## 🚀 Objective

This project demonstrates the fundamentals and advanced techniques of MongoDB, including setup, CRUD operations, advanced queries, aggregation pipelines, and indexing.
The work is based on a `plp_bookstore` database containing a `books` collection.

---

## 📂 Tasks & Implementations

### **Task 1: MongoDB Setup**

* Created database: **`plp_bookstore`**
* Created collection: **`books`**

---

### **Task 2: Basic CRUD Operations**

Documents were inserted into the `books` collection using `insert_books.js`. Each document has fields:
`title`, `author`, `genre`, `published_year`, `price`, `in_stock`, `pages`, `publisher`.

**Queries:**

```js
// Find all books in the collection
db.books.find()

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1940 } })

// Find books by a specific author
db.books.find({ author: "J.R.R. Tolkien" })

// Update the price of a specific book
db.books.updateOne({ title: "Animal Farm" }, { $set: { price: 10 } })

// Delete a book by its title
db.books.deleteOne({ title: "Pride and Prejudice" })
```

---

### **Task 3: Advanced Queries**

```js
// Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sorting
db.books.find().sort({ price: 1 })   // ascending
db.books.find().sort({ price: -1 })  // descending

// Pagination (5 books per page)
db.books.find().limit(5)         // Page 1
db.books.find().skip(5).limit(5) // Page 2
db.books.find().skip(10).limit(5)// Page 3
```

---

### **Task 4: Aggregation Pipelines**

```js
// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// Books grouped by publication decade
db.books.aggregate([
  { $project: { decade: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])
```

---

### **Task 5: Indexing**

```js
// Index on title
db.books.createIndex({ title: 1 })

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Demonstrate query performance with explain()
db.books.find({ title: "Moby Dick" }).explain("executionStats")
db.books.find({ author: "Herman Melville", published_year: 2007 }).explain("executionStats")
```

---

## 🧪 Expected Outcome

* A functional **`plp_bookstore`** database with structured book documents.
* CRUD queries to manipulate and retrieve data.
* Advanced queries demonstrating filtering, projection, sorting, and pagination.
* Aggregation pipelines for analysis and insights.
* Indexing implemented with performance checks using `explain()`.
