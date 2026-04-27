import { Link } from "react-router-dom";
import { CheckUserLoginStatus } from "../Utilities/Utils";
import { useState } from "react";
import { searchSuggestionsApi } from "../services/searchservice";


function NavBar(){

    let [showSearchDropdown, setShowSearchDropdown] = useState(false);
    
    let [searchSuggestions, setSearchSuggestions] = useState([]);

    const SearchHandler = async (e) => {
      
        let keyword = e.target.value;
        if(keyword.length>0) {
            
            console.log("Search word:", keyword);
            try{
                    let response = await searchSuggestionsApi({ searchWord: keyword });       
                    let Suggestionslist = response.data.data          
                   let suggestionvalues = Suggestionslist.map(suggestion => 
                    {
                        return suggestion.value
                    })
                    console.log(Suggestionslist)
                    setSearchSuggestions(suggestionvalues)
                    setShowSearchDropdown(true)
            }
            catch(error){
                alert("Unable to fetch search results. Please try again later.")
            }
        }
        else{
            setShowSearchDropdown(false)
        }
    }

    let IsUserLoggedIn = CheckUserLoginStatus();

    const logOutUser = () => {
        let trackingId = localStorage.getItem("TrackingId");
        localStorage.clear();
            localStorage.setItem("TrackingId", trackingId);
            console.log(trackingId);
        window.location.href="/"
    }

    const handleSuggestionClick = (suggestion) => {
        //setSearchWord(suggestion)
        //console.log("Clicked suggestion:", suggestion);
        //setShowSearchDropdown(false)
            window.location.href=`/product-search?keyword=${suggestion}`
    }

    return( 
    <nav className="navbar bg-body-tertiary navbar-expand-lg">
        <div className="container-fluid">
            <h3 className="navbar-brand">Amazon</h3>
            <div className="input-group">
                 <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">All</button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action before</a></li>
                        <li><a className="dropdown-item" href="#">Another action before</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                    <input type="text" className="form-control" onChange={e => SearchHandler(e)} />
                    <button className="btn btn-outline-secondary " type="button" ><i className="bi bi-search"></i></button>

                   { showSearchDropdown === true &&
                    <div className="search-dropdown">{
                         searchSuggestions.map( (suggestion, i) => (
                        <div key={i} className="suggestion-item" onClick={e => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </div> 
                         ))
           }
                    </div>
                 }
                   
             </div>
            <div className="d-flex">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link" >Home </Link>
                </li>
                <li className="nav-item">
                    <Link to="/pricing" className="nav-link" >Pricing </Link>              
                </li>
                <li className="nav-item">
                    <Link to="/contact-us" className="nav-link" >ContactUs </Link>
                </li>
                <li className="nav-item">
                    
                        
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </button>
                            
                            { IsUserLoggedIn == false &&
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/Login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="/Signup">No Account? <span className='text-primary'>Start here</span></Link></li>
                                
                                </ul>
                            }
                             { IsUserLoggedIn == true &&
                                <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/Addresses" >Manage Address</Link></li>
                                    </ul>
                            }
                            { IsUserLoggedIn == true &&
                                <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/Logout" onClick={e=>logOutUser()}>Logout</Link></li>
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