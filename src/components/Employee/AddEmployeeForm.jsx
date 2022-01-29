import React from "react";
import "./AddEmployeeForm.scss";

const AddEmployeeForm = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    handleAddEmployee,
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
                        placeholder="Your first name"
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
                        placeholder="Your last name"
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
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="form-action">
                <input
                    type="submit"
                    value="Add Employee"
                    className="form-btn"
                />
            </div>
        </form>
    );
};

export default AddEmployeeForm;
