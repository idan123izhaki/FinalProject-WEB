import Logo from "../logo/logo.jsx";
import "./home-page.css"

function Home() {
    let urlArr = [
            "../../images/image1.jpeg",
            "../../images/image2.webp",
            "../../images/image3.jpg",
            "../../images/image4.avif"
    ];

    return (
        <div className="home-page-main-container">
            <span className="title">
                <span className="company-name">VDT - Virual Data Tunnel</span>
                <span style={{fontSize: '20px', fontFamily:'cursive'}}>(TX side)</span>
            </span>

            <div className="home-page-inner-containers">
                <div className="website-info">
                    <span>
                    Welcome to my project homepage! <br/> My project focuses on efficient and secure file management
                    and processing. Leveraging modern C++ features and libraries such as std::filesystem and
                    std::thread, I offer robust solutions for handling file operations, ensuring data integrity,
                    and optimizing performance. <br/><br/> With a dedicated person committed to providing reliable software,
                    I prioritize user experience and satisfaction. Explore my project to discover how I
                    seamlessly manage file operations, maintain data security, and enhance productivity.
                    Join me on this journey towards effective solutions for managing and transferring files!
                    </span>
                </div>
                <div className="website-gallery"></div>
            </div>
        </div>
    );
}

export default Home;