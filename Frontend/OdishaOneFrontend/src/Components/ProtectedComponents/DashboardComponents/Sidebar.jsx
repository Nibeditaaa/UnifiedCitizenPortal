import { Link } from "react-router-dom";

const Sidebar = ({ show }) => {
  return (
    <div className={`sidebar ${show ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="sidebar-header">
        <h4 className="merienda-logo px-1">Odisha</h4>
      </div>
      <ul className="nav flex-column gap-3 mt-3">
        {[
          { path: "/dashboard", label: "Dashboard" },
          { path: "/dashboard/grievances", label: "Grievances" },
          { path: "/dashboard/announcement", label: "Announcements" },
          { path: "/dashboard/analytics", label: "Analytics" },
          { path: "/dashboard/user-management", label: "User Management" },
          { path: "/dashboard/settings", label: "Settings" },
          { path: "/dashboard/notifications", label: "Notifications" },
          { path: "/dashboard/integrations", label: "Integrations" },
          { path: "/dashboard/support", label: "Support" },
          { path: "/dashboard/billing", label: "Billing" },
        ].map((item, index) => (
          <li className="nav-item mx-2" key={index}>
            <Link to={item.path} className="nav-link sidebar-link rounded-2">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
