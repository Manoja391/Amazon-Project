import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import axios from "axios";
import ReactImageMagnify from "react-image-magnify";
import { toast, ToastContainer } from "react-toastify";




function Singleproduct()
{

    const {productId} = useParams();
    let [ProductData, setProductData] = useState(null);
    let [MainImage, setMainImage] = useState("");
    let [Quantity, setQuantity] = useState(1);

    useEffect( () => {
            let ProductDetails = async () => {
                try {
                    console.log("Product:", productId)

                    let response = await axios.get('https://dummyjson.com/products/'+productId)
                    setProductData({...response.data})
                    console.log("Product details:", response.data)
                    setMainImage(response.data.images[0])
                }
                catch(error) {
                    alert("Unable to fetch product details. Please try again later.")
                }
            }

       
        ProductDetails();
    }, []);

    const addtocart = async() => {
        console.log("Adding to cart:", productId, Quantity)
        try {
            if (ProductData.stock >= Quantity) {
                    let apiresponse = await axios.post('https://dummyjson.com/carts/add', { userId: '1', products: [{ id: productId, quantity: Quantity, },] })
                            
            console.log("Add to cart response:", apiresponse.data)  
            }
            else {
                toast.error("Sorry, the requested quantity exceeds available stock.", { autoClose: 3000, position: "top-center" })
               
            }
        }
        catch(error) {
            toast.error("Unable to add product to cart. Please try again later.", { autoClose: 3000, position: "top-center" })     
        }
    }
    return(
       
         <div>
            <NavBar />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-5">
                        {
                            ProductData != null && 
                            <div className="row">
                                {
                                ProductData.images.map( (image,i) => (
                                    <div className="col-2" key={i}>
                                        <img src={image} className="img-thumbnail" alt="..." onMouseOver={e=>setMainImage(image)} />
                                    </div>
                                ))
                              }
                              
                            </div>
                        }
                        {
                            ProductData != null &&
                            
                                 //  <img src={MainImage} className="img-fluid rounded" alt="..." />
                                 <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            alt: "Product Image",
                                            isFluidWidth: true,
                                            src: MainImage,
                                           
                                        },
                                        largeImage: {
                                            src: MainImage,
                                            width: 800,
                                            height: 1100,
                                        },
                                        enlargedImagePosition: "beside",
                                    }}
                                                    
                                        />
                                }
                    </div>
                     <div className="col-4">
                            {
                           ProductData != null && 
                           <div>
                                <h1>{ProductData.title}</h1>
                                <div> <i className="bi bi-currency-rupee"></i>{ProductData.price}</div>
                                <div><i className="bi bi-star-fill"></i> {ProductData.rating}</div>
                           </div>
                        }
                    </div>
                    <div className="col-3">
                            <div className="card">
                                <div className="card-body">
                                   <h5>Add to Cart</h5>
                                   <select className="form-control mb-3" onChange={e=>setQuantity(e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="8">8</option>
                                   </select>
                                   <div className="d-grid mb-3">
                                        <button className="btn btn-primary" onClick={e=>addtocart()}>Add to Cart</button>    
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>

            </div>
            <Footer />
            <ToastContainer />                       
        </div>
    )
}

export default Singleproduct;