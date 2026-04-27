import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import AddAddress from "./AddAddress";
import { useState } from "react";

function Addresses() {

    let [showAddAddressForm, setShowAddAddressForm] = useState(false);

    return(
        <div>
            <NavBar />
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-3">
                            
                        </div>
                        <div className="col-6">
                             <button className="btn btn-secondary" onClick={e=>setShowAddAddressForm(true)}>Add Address</button>
                             <div className="mt-3">
                                {
                                showAddAddressForm == true && <AddAddress/>
                                }
                             </div>
                        </div>
                        <div className="col-3">
                            
                        </div>

                    </div>
                </div>
            <Footer />
        </div>
       
    )
}

export default Addresses;