import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import AddAddress from "./AddAddress";
import { useEffect, useState } from "react";
import { GetLoggedInUserID } from "../Utilities/Utils";
import { addressViewAPi } from "../services/addressservice";
import SingleAddress from "./SingleAddress";

function Addresses() {

    let [showAddAddressForm, setShowAddAddressForm] = useState(false);

    let [addressData, setAddressData] = useState([]);

    useEffect(() => {

        let getaddresses = async () => { 
            try {
                let apiResponse = await addressViewAPi({userid:GetLoggedInUserID()});
                console.log("Address data fetched from API:", apiResponse.data);
               setAddressData(apiResponse.data.data);
            } catch (error) {
                
                alert("An error occurred while fetching your addresses. Please try again later.");
            }
        }
        getaddresses();
    },[])

    const addnewaddress = (data) => {
        console.log("ADDING TO STATE:", data);
        let tmpData = addressData;
        tmpData.push(data);
        setAddressData([...addressData, data]);
        
    }   

    const deleteAddress = (addressId) => {
        // Implement delete functionality here
        let tmpData = addressData
        tmpData = tmpData.filter(address => address.id!== addressId);
        setAddressData(tmpData); 
        console.log("Delete address with ID:", addressId);
    }

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
                                    showAddAddressForm == true && <AddAddress addnewaddress={addnewaddress}/>
                                }
                             </div>
                        </div>
                        <div className="col-3">
                            
                        </div>

                    </div>
                    <div className="row">
                                    {
                                        addressData.map ((address,i) => (
                                            <SingleAddress address={address} key={i} deleteAddress={deleteAddress}/>
                                        ))

                                    }
                    </div>
                </div>
            <Footer />
        </div>
       
    )
}

export default Addresses;