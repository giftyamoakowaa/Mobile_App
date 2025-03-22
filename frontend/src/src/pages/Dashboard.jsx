import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4100/api/stories") // Update with your actual backend URL
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg">
            <img src={book.imageUrl} alt={book.name} className="w-full h-40 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{book.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
