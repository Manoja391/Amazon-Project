import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import axios from "axios";
import ReactImageMagnify from "react-image-magnify";


function Singleproduct()
{

    const {productId} = useParams();
    let [ProductData, setProductData] = useState(null);
    let [MainImage, setMainImage] = useState("");

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
                                            width: 1000,
                                            height: 1300,
                                        },
                                        enlargedImagePosition: "beside",
                                    }}
                                                    
                                        />
                                }
                    </div>
                     <div className="col-4">
                            <h1>{productId}</h1>
                    </div>
                    <div className="col-3">
                            <h1>{productId}</h1>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Singleproduct;