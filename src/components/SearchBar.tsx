import "../styles/components/SearchBar.scss";

const SearchBar = () => {
	return (
		<div className="search-bar">
			<input
				name="search-query"
				type="text"
				placeholder="Search for anything"
			/>
			<button
				className="search-button"
				type="button"
			>
				<img
					src="/assets/icons/search.svg"
					alt="Search icon"
				/>
			</button>
		</div>
	);
};

export default SearchBar;
