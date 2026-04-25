function Product({data}) {

        function handleProductClick()
        {
            alert("Product clicked: "+data.id)
        }

        return(
            <div className="card mb-3"> 
                <div className="row">
                        <div className="col-4">
                            <img src={data.thumbnail} className="img-fluid rounded-start amazon-pointer" alt="..." onClick={e => handleProductClick()} />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                    <h5 className="card-title amazon-pointer" onClick={e=>handleProductClick()}> {data.title}</h5>
                                    <div className="card-title"> <i class="bi bi-currency-rupee"></i>{data.price}</div>
                                <div><i class="bi bi-star-fill"></i> {data.rating}</div>
                                <div>
                                    <button className="btn btn-warning mt-3">Add to Cart</button>
                                </div>
                            </div>
                        </div> 
                </div>

            </div>
        )

}

export default Product;