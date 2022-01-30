import { memo } from "react";
import "./Loader.scss";

const Loader = ({ width, height }) => {
    return (
        <div className="loading">
            <div className="loader" style={{ width, height }}></div>
        </div>
    );
};

export default memo(Loader);
