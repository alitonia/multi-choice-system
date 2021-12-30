import classNames from "classnames";
import PropTypes from "prop-types";
import { DOTS, usePagination } from "../../hooks/usePagination";
import { ReactComponent as NextSvg } from "../../assets/icons/next.svg";
import { ReactComponent as PrevSvg } from "../../assets/icons/prev.svg";
import "./index.css";

Pagination.propTypes = {
    onPageChange: PropTypes.func,
    onPageSizeChange: PropTypes.func,
    total: PropTypes.number,
    siblingCount: PropTypes.number,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number
};

function Pagination({
    onPageChange,
    onPageSizeChange,
    total = 0,
    siblingCount = 1,
    currentPage = 0,
    pageSize = 10
}) {
    const paginationRange = usePagination({
        currentPage,
        total,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2 || total <= pageSize) {
        return null;
    }

    const lastPage = paginationRange[paginationRange.length - 1];
    const onNext = () => onPageChange(currentPage + 1);
    const onPrevious = () => onPageChange(currentPage - 1);

    return (
        <ul className="pagination-container">
            <li
                className={classNames("pagination-item", {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <PrevSvg />
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return (
                        <li key={index} className="pagination-item dots">
                            {DOTS}
                        </li>
                    );
                }

                return (
                    <li
                        key={index}
                        className={classNames("pagination-item", {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classNames("pagination-item", {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <NextSvg />
            </li>
            {onPageSizeChange && (
                <li>
                    <select
                        className="pagination-item pagination-options"
                        value={pageSize}
                        onChange={e => onPageSizeChange(e.target.value)}
                    >
                        <option value={10}>10/page</option>
                        <option value={20}>20/page</option>
                        <option value={50}>50/page</option>
                        <option value={100}>100/page</option>
                    </select>
                </li>
            )}
        </ul>
    );
}

export default Pagination;
