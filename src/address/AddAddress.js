import { useState } from "react";
import axios from "axios";
import { addressAddApi } from "../services/addressservice";


function AddAddress({ addnewaddress, editAddress }) {

    
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

        if (editAddress) {
            
        console.log("editaddress prop in AddAddress component:", editAddress);
        setAddressData({name: editAddress.name, mobile: editAddress.mobile, addressLine1: editAddress.flat, city: editAddress.city, state: editAddress.state, country: editAddress.country, pincode: editAddress.pincode, latlong: editAddress.latlong})


        }

        const getLocationData = async (lat,long) => {
            try {
                console.log("Fetching location data for latlong:", lat,long);
                const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyBxjYFqq8swhMenZlv8AdIjXYeMPKFfJ18');
                const data = response.data; // Parse the JSON response
                console.log("Location data from Google Maps API:", data);
                if (data.status === "OK" && data.results.length > 0) {
                    const addressComponents = data.results[0].address_components;
                    const city = addressComponents.find(component => component.types.includes("locality"))?.long_name || "";
                    const state = addressComponents.find(component => component.types.includes("administrative_area_level_1"))?.long_name || "";
                    const country = addressComponents.find(component => component.types.includes("country"))?.long_name || "";
                    const pincode = addressComponents.find(component => component.types.includes("postal_code"))?.long_name || "";
                    setAddressData({...AddressData, city, state, country, pincode})
                } else {
                    console.error("No results found for the given latitude and longitude.");
                    alert("Unable to fetch address details from your location.")
                }
            } catch (error) {
                console.error("Error fetching location data:", error);
                alert("An error occurred while fetching address details. Please try again.")
            }
        }
        // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyBxjYFqq8swhMenZlv8AdIjXYeMPKFfJ18
        // AIzaSyBxjYFqq8swhMenZlv8AdIjXYeMPKFfJ18
        const getUserLatLong = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const long = position.coords.longitude;
                        setAddressData({...AddressData, latlong: `${lat},${long}`})
                        console.log("User's latitude and longitude:", lat, long);
                        getLocationData(lat,long);

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

        
        const AddAddressHandler = async(e) => {
            console.log("SUBMIT FIRED"); 
             e.preventDefault(); 

            let apiresponse = await addressAddApi(AddressData);
            addnewaddress(apiresponse.data.data);

            console.log("API response from adding address:" + apiresponse.data.message);


         }

        

    return(
        <div>
            <div className="card shadow p-3 mb-5 bg-body rounded">
                <div className="row">
                        <form onSubmit={AddAddressHandler}>
                            <div className="mb-3">
                                <button type="button" className="btn btn-primary" onClick={e => getUserLatLong()}><i className="bi bi-crosshair"></i> Use my Location</button>
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
                            
                            
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                    

                </div>  

            </div>
        
    )
}

export default AddAddress;