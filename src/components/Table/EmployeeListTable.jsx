import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import "./EmployeeListTable.scss";

const EmployeeListTable = ({ employeeList, setEmployeeList }) => {
    const employeeSelect = (index) => {
        const _employeeList = [...employeeList];
        _employeeList[index].selected = true;
        setEmployeeList(_employeeList);
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
                                    className="flex jc-space-between align-center table-row"
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
            </table>
        </div>
    );
};

EmployeeListTable.propTypes = {
    employeeList: PropTypes.array.isRequired,
};

export default EmployeeListTable;
