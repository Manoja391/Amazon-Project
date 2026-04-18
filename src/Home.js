import Footer from "./shared/Footer"
import NavBar from "./shared/NavBar"

function Home()
{
    return (
        <div>
        
            <NavBar/>
            <div className="text-danger"> Todos home page content</div>
            <Footer/>
        </div>
         )
}

export default Home;