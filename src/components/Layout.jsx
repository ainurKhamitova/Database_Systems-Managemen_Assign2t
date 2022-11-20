import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <section class="white-section">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid container-fluid-nav">
    <a className="navbar-brand" href="#">Menu</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href = "/">Home</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Tables
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="/diseaseType" >DiseaseType</a></li>
            <li><a className="dropdown-item" href="/country">Country</a></li>
            <li><a className="dropdown-item" href="/disease">Disease</a></li>
            <li><a className="dropdown-item" href="/discover">Discover</a></li>
            <li><a className="dropdown-item" href="/user">Users</a></li>
            <li><a className="dropdown-item" href="/publicServant" >PublicServant</a></li>
            <li><a className="dropdown-item" href="/doctor">Doctor</a></li>
            <li><a className="dropdown-item" href="/specialize">Specialize</a></li>
            <li><a className="dropdown-item" href="/record">Record</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  </nav>
  <Outlet />
    </section>
  
  )
};

export default Layout;