import PropTypes from "prop-types";
import axiosInstance from "../../../services/axiosInstance";
import Loader from "../../Loader/Loader";
import "./AddBulkEmployee.scss";

const AddBulkEmployee = ({ loader }) => {
    return (
        <div className="import-product-section">
            <form className="import-form">
                <div className="import-product-body">
                    <input
                        className="input-form"
                        // onChange={handleFileChange}
                        type="file"
                        name="file"
                        accept="*.csv"
                    />
                    <button className="btn">
                        {loader ? (
                            <Loader width={15} height={15} />
                        ) : (
                            "Import Bulk Employee"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

AddBulkEmployee.propTypes = {};

export default AddBulkEmployee;
