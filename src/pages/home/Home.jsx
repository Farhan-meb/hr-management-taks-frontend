import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import EmployeeListTable from "../../components/Table/EmployeeListTable";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import axiosInstance from "../../services/axiosInstance";
import EmailModal from "../../components/Modal/EmailModal/EmailModal";
import AddBulkEmployee from "../../components/Employee/AddBulkEmployee/AddBulkEmployee";

import "./Home.scss";

const Home = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [emails, setEmails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showNext, setShowNext] = useState(true);
    const [showPrev, setShowPrev] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [loader, setLoader] = useState(false);

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

    const handleSendEmail = (e) => {
        e.preventDefault();

        setLoader(true);

        axiosInstance
            .post("api/employee/send-email", {
                emails,
                subject: emailSubject,
                body: emailBody,
            })
            .then((res) => {
                for (let email of res.data.emails) {
                    toast.success(res.data.message + " " + email, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((err) => {
                toast.error(err);
            })
            .finally(() => {
                setShowModal(false);
                setLoader(false);
                setEmails([]);
                const _employeeList = [...employeeList];
                for (let employee of _employeeList) {
                    employee.selected = false;
                }
                setEmployeeList(_employeeList);
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
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>

            {showModal && (
                <EmailModal
                    setShowModal={setShowModal}
                    setEmailSubject={setEmailSubject}
                    setEmailBody={setEmailBody}
                    handleSendEmail={handleSendEmail}
                    loader={loader}
                />
            )}

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

export default Home;
