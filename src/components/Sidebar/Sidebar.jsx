import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarContent,
    SidebarHeader,
} from "react-pro-sidebar";
import { useState } from "react";
import UserImage from "../../assets/images/user.png";
import { Link, useLocation } from "react-router-dom";

import "./Sidebar.scss";

const ROUTES = ["/", "/add-employee"];

const checkActiveMenu = (path) => {
    const index = ROUTES.indexOf(path);
    return "menu-" + (index + 1);
};

const Sidebar = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(
        checkActiveMenu(location.pathname)
    );

    const handleActiveMenu = (e, menu) => {
        e.stopPropagation();
        setActiveMenu(menu);
    };

    return (
        <ProSidebar>
            <SidebarHeader>
                <div className="sidebar-header stuck">
                    <div className="d-flex justify-content-center">
                        <div className="position-absolute">
                            <img
                                src={UserImage}
                                alt="User profile"
                                className="user-image"
                            />
                        </div>
                    </div>
                    <p className="user-name text-white">HR Admin</p>
                    <p className="user-email">017XX-XXXXXX</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu>
                    <MenuItem
                        onClick={(e) => handleActiveMenu(e, "menu-1")}
                        active={activeMenu === "menu-1" ? true : false}
                    >
                        All Employees
                        <Link to="/" />
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem
                        onClick={(e) => handleActiveMenu(e, "menu-2")}
                        active={activeMenu === "menu-2" ? true : false}
                    >
                        Add Employee
                        <Link to="/add-employee" />
                    </MenuItem>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
};

export default Sidebar;
