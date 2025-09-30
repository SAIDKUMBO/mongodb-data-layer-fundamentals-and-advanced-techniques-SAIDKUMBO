//Task 1: Basic Queries

//Switch to the bookstore database  
use plp_bookstore

//Find all books in the collection
db.books.find()

//Find all books in a specific genre
db.books.find({genre: "Fiction"})

//Find books published after a certain year
db.books.find({published_year:{$gt: 1940}})

//Find books by a specific author
db.books.find({author: "J.R.R. Tolkien"})

//Update the price of a specific book
db.books.updateOne(
  { title: "Animal Farm" },        // filter
  { $set: { price: 10 } }         // update
)

//Delete a book by its title
db.books.deleteOne({title: "Pride and Prejudice"})

//Task 3:Complex Queries

//query to find books that are both in stock and published after 2010


//Use projection to return only the title, author, and price fields in your queries
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })


//Implement sorting to display books by price (ascending order)
db.books.find().sort({price: 1})


//Implement sorting to display books by price (descending order)
db.books.find().sort({price: -1})


//Use the limit and skip methods to implement pagination (5 books per page)
db.books.find().limit(5)

db.books.find().skip(5).limit(5)

db.books.find().skip(10).limit(5)


//Task 4: Aggregation Pipeline

//Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: {$avg: "$price"}
    }
  }
])

//Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",        // group by author
      bookCount: { $sum: 1 } // count number of books per author
    }
  },
  { $sort: { bookCount: -1 } }, // sort descending
  { $limit: 1 }                 // keep only top author
])

//Create an aggregation pipeline to count the number of books published in each decade
db.books.aggregate([
  {
    $project: {
      decade: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } }, 
          10
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


//Task 5: Indexing and Performance

//Create an index on the title field for faster searches
db.books.createIndex({ title: 1 })

//Create a compound index on author and published_year for optimized queries
db.books.createIndex({ author: 1, published_year: -1 })

//Use the explain method to analyze the performance of a query
db.books.find({ title: "Moby Dick" }).explain("executionStats")


db.books.find({ author: "Herman Melville", published_year: 2007 }).explain("executionStats")


