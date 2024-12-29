import { useState } from "react";

export default function Search({
    onSearch
}) {
    const [searchInput, setSearchInput] = useState("");
    const [searchCriteria, setSearchCriteria] = useState("");

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        
        if (!value) {
            onSearch("", "");
        }
    };

    const handleCriteriaChange = (e) => {
        setSearchCriteria(e.target.value);
    };

    const searchHandler = (e) => {
        e.preventDefault();
        
        if (searchCriteria && searchInput) {
            onSearch(searchCriteria, searchInput);
        } else {
            alert("Please select a criteria and enter a search value.");
        }
    };

    const clearHandler = () => {
        setSearchInput("");
        setSearchCriteria("");
        onSearch("", "");
    };

    return (
        <form className="search-form" onSubmit={searchHandler}>
            <h2>
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="user"
                    className="svg-inline--fa fa-user SearchBar_icon__cXpTg"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
                    ></path>
                </svg>
                <span>Users</span>
            </h2>
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Please, select the search criteria"
                    name="search"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                {searchInput.length > 0 && (
                    <button
                        type="button"
                        className="btn close-btn"
                        onClick={clearHandler}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}
                <button
                    type="submit"
                    className="btn"
                    title="Please, select the search criteria"
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <div className="filter">
                <span>Search Criteria:</span>
                <select
                    name="criteria"
                    className="criteria"
                    value={searchCriteria}
                    onChange={handleCriteriaChange}
                >
                    <option value="">Not selected</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
            </div>
        </form>
    );
}
