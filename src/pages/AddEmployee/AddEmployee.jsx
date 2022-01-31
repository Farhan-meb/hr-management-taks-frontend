import React, { useRef } from "react";
import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import Helmet from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEmployee.scss";
import AddEmployeeForm from "../../components/Employee/AddEmployee/AddEmployeeForm";
import AddBulkEmployee from "../../components/Employee/AddBulkEmployee/AddBulkEmployee";

const AddEmployee = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [loader, setLoader] = useState(false);
    const [fileValue, setFileValue] = useState("");

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

    const handleAddBulkEmployee = (e) => {
        e.preventDefault();
        setLoader(true);

        const formData = new FormData();
        formData.append("file", file);

        axiosInstance
            .post("api/employee/import-bulk-employees", formData)
            .then((res) => {
                toast.success(res.data.succeeded);
                toast.error(res.data.failed);
                setFileValue("");
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileValue(e.target.value);
    };

    return (
        <>
            <div className="add-employee-container">
                <Helmet>
                    <title>Add Employee</title>
                </Helmet>
                <h4 className="header-text">HR-Management / Add Employee</h4>
                <div className="add-employee">
                    <AddBulkEmployee
                        fileValue={fileValue}
                        handleFileChange={handleFileChange}
                        handleAddBulkEmployee={handleAddBulkEmployee}
                    />
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
