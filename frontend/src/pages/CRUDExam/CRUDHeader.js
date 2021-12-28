import React from "react";
import PropTypes from "prop-types";
import styles from "./EditExam.module.scss";

const CRUDHeader = ({ headerType }) => {
    const name = "he";

    return (
        <div className={styles.CRUDHeader}>
            <span className={styles.CRUDHeader__text}>{headerType} EXAM</span>
            <div className={styles.userWelcome}>
                <span>Welcome back, {name}</span>
            </div>
        </div>
    );
};
CRUDHeader.propTypes = {
    headerType: PropTypes.string
};
export default CRUDHeader;
