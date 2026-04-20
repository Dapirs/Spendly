const CategoryFilter = ({ categories, activeCategory, onFilterChange }) => {
  return (
    <div className="category-filter">
      <button
        className={`pill${activeCategory === null ? ' pill--active' : ''}`}
        onClick={() => onFilterChange(null)}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`pill${activeCategory === cat ? ' pill--active' : ''}`}
          onClick={() => onFilterChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
