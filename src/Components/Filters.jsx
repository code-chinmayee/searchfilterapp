function Filters({
  search, setSearch,
  category, setCategory,
  price, setPrice,
  rating, setRating,
  categories
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="range"
        min="0"
        max="1000"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <span>Max Price: ${price}</span>

      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="0">All Ratings</option>
        <option value="3">3⭐ & up</option>
        <option value="4">4⭐ & up</option>
      </select>
    </div>
  );
}

export default Filters;
