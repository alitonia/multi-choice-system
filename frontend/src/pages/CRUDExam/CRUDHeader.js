import React from "react";
import styles from "./EditExam.module.scss";

const CRUDHeader = ({ headerType }) => {
    const name = "he";

    return (
        <div className={styles.CRUDHeader}>
            <span className={styles.CRUDHeader__text}>EDIT EXAM</span>
            <div className={styles.userWelcome}>
                <span>Welcome back, {name}</span>
            </div>
        </div>
    );
};

export default CRUDHeader;
