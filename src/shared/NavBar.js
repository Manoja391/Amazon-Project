import { CheckUserLoginStatus } from "../Utilities/Utils";



function NavBar(){

    let IsUserLoggedIn = CheckUserLoginStatus();

    const logOutUser = () => {
        let trackingId = localStorage.getItem("TrackingId");
        localStorage.clear();
            localStorage.setItem("TrackingId", trackingId);
            console.log(trackingId);
        window.location.href="/"
    }

    return( 
    <nav className="navbar bg-body-tertiary navbar-expand-lg">
        <div className="container">
            <h3 className="navbar-brand">Amazon</h3>
            <div className="d-flex">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="/" className="nav-link" >Home </a>
                </li>
                <li className="nav-item">
                    <a href="/pricing" className="nav-link" >Pricing </a>              
                </li>
                <li className="nav-item">
                    <a href="/contact-us" className="nav-link" >ContactUs </a>
                </li>
                <li className="nav-item">
                    
                        
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </button>
                            
                            { IsUserLoggedIn == false &&
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="Login">Login</a></li>
                                    <li><a className="dropdown-item" href="Signup">No Account? <span className='text-primary'>Start here</span></a></li>
                                
                                </ul>
                            }
                            { IsUserLoggedIn == true &&
                                <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={e=>logOutUser()}>Logout</a></li>
                                    </ul>
                            }
                        </div>
                    
                </li>

            </ul>
            
            </div>
        </div>

    </nav>
)
}

export default NavBar;