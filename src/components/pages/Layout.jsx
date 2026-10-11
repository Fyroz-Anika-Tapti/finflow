import Header from "../Header.jsx";
import Sidebar from "../Sidebar.jsx";
import Footer from "../Footer.jsx";

function Layout({ children }) {
    return (

        <>
            <Header />
            <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">


                <div className="container-fluid">
                    <div className="row">

                        <Sidebar />



                        {children}



                    </div>
                </div>

                <Footer />
            </main>

        </>

    );
}

export default Layout