import { useState } from "react";

function AddAddress() {
        let [AddressData, setAddressData] = useState({
            name: "",
            mobile: "",
            addressLine1: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            latlong:""
        });

        const getUserLatLong = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const long = position.coords.longitude;
                        setAddressData({...AddressData, latlong: `${lat},${long}`})
                        console.log("User's latitude and longitude:", lat, long);
                    },
                    (error) => {
                        console.error("Error getting user's location:", error);
                        alert("Unable to fetch your location. Please allow location access and try again.")
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                alert("Geolocation is not supported by your browser.")
            }
        }

    return(
        <div>
            <div className="container">
                <div className="row">
                        <form>
                            <div className="mb-3">
                                <button type="button" className="btn btn-primary" onClick={e => getUserLatLong()}><i class="bi bi-crosshair"></i> Use my Location</button>
                                </div>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" value={AddressData.name} onChange={e => setAddressData({...AddressData, name: e.target.value})} />
                            </div>
                             <div className="mb-3">
                                <label className="form-label">Mobile</label>
                                <input type="text" className="form-control" value={AddressData.mobile} onChange={e => setAddressData({...AddressData, mobile: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address Line 1</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" value={AddressData.addressLine1} onChange={e => setAddressData({...AddressData, addressLine1: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">City</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" value={AddressData.city} onChange={e => setAddressData({...AddressData, city: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">State</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" value={AddressData.state} onChange={e => setAddressData({...AddressData, state: e.target.value})} />
                            </div>
                             <div className="mb-3">
                                <label className="form-label">Country</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" value={AddressData.country} onChange={e => setAddressData({...AddressData, country: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Pincode</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" value={AddressData.pincode} onChange={e => setAddressData({...AddressData, pincode: e.target.value})} />
                            </div>
                            
                            
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    

                </div>  

            </div>
        
    )
}

export default AddAddress;