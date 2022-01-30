import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import EmployeeListTable from "../../components/Table/EmployeeListTable";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import axiosInstance from "../../services/axiosInstance";
import EmailModal from "../../components/Modal/EmailModal/EmailModal";

import "./Home.scss";

const Home = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [emails, setEmails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showNext, setShowNext] = useState(true);
    const [showPrev, setShowPrev] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let isMount = true;

        currentPage > 1 ? setShowPrev(true) : setShowPrev(false);

        axiosInstance
            .get(`api/employee?page=${currentPage}&limit=5`)
            .then((res) => {
                if (isMount) {
                    for (let employee of res.data.employees) {
                        employee["selected"] = false;
                    }
                    setEmployeeList(res.data.employees);

                    const totalEmployees = res.data.employees.length;

                    totalEmployees < 5 ? setShowNext(false) : setShowNext(true);

                    if (totalEmployees === 0) {
                        toast.warn("No employee to show!");
                    }
                }
            })
            .catch((err) => {
                toast.error(err);
            });
        return () => {
            isMount = false;
        };
    }, [currentPage]);

    const handleSendEmail = () => {
        axiosInstance
            .post("api/employee/send-email", {
                emails,
            })
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    const openEmailModal = () => {
        if (emails.length <= 0) {
            toast.warn("Please select atleast 1 employee to send email!");
        } else setShowModal((prev) => !prev);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => {
            return prev > 1 ? prev - 1 : 1;
        });
    };

    const handleNext = () => {
        setCurrentPage((prev) => {
            return showNext ? prev + 1 : prev;
        });
    };

    return (
        <>
            <div className="home-container">
                <Helmet>
                    <title>Home</title>
                </Helmet>

                <h4 className="header-text">HR-Management / Employee List</h4>

                <div className="home-action">
                    <button className="home-button" onClick={openEmailModal}>
                        Send Email
                    </button>
                </div>
                <div className="employeelist-table-wrapper">
                    <div className="employeelist-table">
                        <EmployeeListTable
                            employeeList={employeeList}
                            setEmployeeList={setEmployeeList}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            showNext={showNext}
                            showPrev={showPrev}
                            emails={emails}
                            setEmails={setEmails}
                        />
                    </div>
                </div>
            </div>

            {showModal && <EmailModal setShowModal={setShowModal} />}

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </>
    );
};

export default Home;
