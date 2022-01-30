import PropTypes from "prop-types";
import PrevIcon from "./_icon/PrevIcon";
import NextIcon from "./_icon/NextIcon";

import "./EmployeeListTable.scss";

const EmployeeListTable = ({
    employeeList,
    setEmployeeList,
    handleNext,
    handlePrev,
    showNext,
    showPrev,
    emails,
    setEmails,
}) => {
    const employeeSelect = (index) => {
        const _employeeList = [...employeeList];
        _employeeList[index].selected = true;
        setEmployeeList(_employeeList);
        const _emails = emails;
        _emails.push(_employeeList[index].email);
        setEmails(_emails);
    };

    return (
        <div className="employee-list-table">
            <table className="table mt-20">
                <thead className="thead">
                    <tr className="flex jc-space-between align-center table-row">
                        <th className="table-head-select">Select</th>
                        <th className="table-head">First Name</th>
                        <th className="table-head">Last Name</th>
                        <th
                            className="table-head"
                            style={{ borderRadius: "0 8px 8px 0" }}
                        >
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {employeeList &&
                        employeeList.length > 0 &&
                        employeeList?.map((employee, index) => {
                            return (
                                <tr
                                    key={index}
                                    className={
                                        employee.selected === true
                                            ? "flex jc-space-between align-center table-row table-row-selected"
                                            : "flex jc-space-between align-center table-row"
                                    }
                                >
                                    <td
                                        scope="row"
                                        className="table-data-select"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={employee.selected}
                                            className="form-check-input"
                                            onChange={() =>
                                                employeeSelect(index)
                                            }
                                        />
                                    </td>
                                    <td className="table-data">
                                        {employee?.first_name}
                                    </td>
                                    <td className="table-data">
                                        {employee?.last_name}
                                    </td>
                                    <td className="table-data">
                                        {employee?.email}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
                <div className="table-pagination">
                    {showPrev && (
                        <button onClick={handlePrev}>
                            <PrevIcon />
                        </button>
                    )}
                    {showNext && (
                        <button onClick={handleNext}>
                            <NextIcon />
                        </button>
                    )}
                </div>
            </table>
        </div>
    );
};

EmployeeListTable.propTypes = {
    employeeList: PropTypes.array.isRequired,
};

export default EmployeeListTable;
