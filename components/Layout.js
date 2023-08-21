import Footer from "./footer"
import Nav from "./nav"

const Layout = ({ children }) => {
    return (
        <div className="col-lg-8 mx-auto p-3 py-md-5">
            <Nav />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;