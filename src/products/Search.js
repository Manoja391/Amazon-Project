import { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import axios from "axios";
import Product from "./Product";





function Search() {

        let queryParams = new URLSearchParams(window.location.search);
        console.log("Query params:", queryParams)

        let searchkeyword = queryParams.get("keyword")
        console.log("Search keyword:", searchkeyword)

        let [products, setProducts] = useState([]);

        useEffect( () => {
            //call search api with searchkeyword

            const getProductsData = async () => {
                try {
                    //call search api
                    //method: POST
                    //endpoint: '/api/product/search'
                    //body: {searchKeyword: searchkeyword}
                    let response = await axios.get('https://dummyjson.com/products/search?q=phone')
                    console.log("Search results:", response.data)
                    setProducts(response.data.products)

                }
                catch(error) {
                    alert("Unable to fetch search results. Please try again later.")
                }
            }

            getProductsData();


        },[])

    return (
        <div>
            <NavBar />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-3">
                        
                    </div>
                     <div className="col-6">
                            {
                            products.map( (product) => (
                                
                               <Product data={product} />
                              
                             
                            ))
                    }
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Search;