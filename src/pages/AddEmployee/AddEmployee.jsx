import React from "react";
import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEmployee.scss";
import AddEmployeeForm from "../../components/Employee/AddEmployee/AddEmployeeForm";

const AddEmployee = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);

    const handleAddEmployee = (e) => {
        e.preventDefault();
        setLoader(true);
        axiosInstance
            .post("api/employee", {
                first_name: firstName,
                last_name: lastName,
                email,
            })
            .then((res) => {
                setFirstName("");
                setLastName("");
                setEmail("");
                toast.success(res.data.message);
            })
            .catch((err) => {
                const errMsg = err.response.data.message;
                toast.error(errMsg);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    return (
        <>
            <div className="add-employee-container">
                <Helmet>
                    <title>Add Employee</title>
                </Helmet>
                <div className="form">
                    <AddEmployeeForm
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        handleAddEmployee={handleAddEmployee}
                        loader={loader}
                    />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default AddEmployee;
