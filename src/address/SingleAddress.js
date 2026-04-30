const SingleAddress = ({ address , deleteAddress, editAddress }) => {
    console.log("Rendering SingleAddress component with address:", address);
    return (
        
        <div className="col-12">
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{address.name}</h5>
                    <p className="card-text">{address.flat}, {address.city}, {address.state}, {address.country} - {address.pincode}</p>
                    <p className="card-text"><small className="text-muted">Mobile: {address.mobile}</small></p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={() => editAddress(address)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteAddress(address.id)}>Delete</button>
                </div>
            </div>
            
        </div>
        
    )
}

export default SingleAddress;