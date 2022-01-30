import React from "react";
import Loader from "../../Loader/Loader";
import "./AddEmployeeForm.scss";

const AddEmployeeForm = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    handleAddEmployee,
    loader,
}) => {
    return (
        <form className="add-form" onSubmit={handleAddEmployee}>
            <div className="form-control">
                <div className="form-label">
                    <div className="form-filed">
                        <label> First Name</label>
                    </div>
                </div>
                <div className="form-field">
                    <input
                        className="input"
                        type="text"
                        placeholder="first name.."
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="form-control">
                <label> Last Name</label>
                <div className="form-field">
                    <input
                        className="input"
                        type="text"
                        placeholder="last name.."
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="form-control">
                <label> Email</label>
                <div className="form-field">
                    <input
                        className="input"
                        type="text"
                        placeholder="email.."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-action">
                <button
                    type="submit"
                    className={loader ? "btn-loader" : "form-btn"}
                >
                    {loader ? <Loader width={2} height={2} /> : "Add Employee"}
                </button>
            </div>
        </form>
    );
};

export default AddEmployeeForm;
