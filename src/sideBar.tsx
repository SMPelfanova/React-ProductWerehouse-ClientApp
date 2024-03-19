const SideBar = () => {
    return (
        <>
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon rotate-n-15">
            <i className="fa fa-database" aria-hidden="true"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Admin Panel</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
            <a className="nav-link" href="/">
                <i className="fa fa-table" aria-hidden="true"></i>
                <span>Products</span>
            </a>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">
            Interface
        </div>

        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-cog"></i>
                <span>Actions</span>
            </a>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Custom Actions:</h6>
                    <a className="collapse-item" href="/add">Add product</a>
                </div>
            </div>
        </li>

        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i className="fas fa-fw fa-wrench"></i>
                <span>Utilities</span>
            </a>
            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Custom Utilities:</h6>
                    <a className="collapse-item" href="/">Colors</a>
                    <a className="collapse-item" href="/">Borders</a>
                    <a className="collapse-item" href="/">Animations</a>
                    <a className="collapse-item" href="/">Other</a>
                </div>
            </div>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">
            Addons
        </div>

        <li className="nav-item active">
            <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true"
                aria-controls="collapsePages">
                <i className="fas fa-fw fa-folder"></i>
                <span>Pages</span>
            </a>
            <div id="collapsePages" className="collapse show" aria-labelledby="headingPages"
                data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Login Screens:</h6>
                    <a className="collapse-item" href="/">Login</a>
                    <a className="collapse-item" href="/">Register</a>
                    <a className="collapse-item" href="/">Forgot Password</a>
                    <div className="collapse-divider"></div>
                    <h6 className="collapse-header">Other Pages:</h6>
                    <a className="collapse-item active" href="/not-exisiting-url">404 Page</a>
                    <a className="collapse-item" href="/">Blank Page</a>
                </div>
            </div>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" type="submit"></button>
        </div>

    </ul>
    </>
    )
};

export default SideBar;