import { useState } from "react";

export function usePagination(initialPage = 1, initialPageSize = 5) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const changePage = (page, newPageSize = pageSize) => {
        setCurrentPage(page);
        setPageSize(newPageSize);
    };

    return [currentPage, pageSize, changePage];
}
