import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
  
    return (
      <Breadcrumb className="breadcrumb-custom">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>
          Dashboard
        </Breadcrumb.Item>
        {pathnames.slice(1).map((name, index) => {
          const routeTo = `/dashboard/${pathnames.slice(1, index + 2).join("/")}`;
          return (
            <Breadcrumb.Item key={name} linkAs={Link} linkProps={{ to: routeTo }}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };

  export default Breadcrumbs;