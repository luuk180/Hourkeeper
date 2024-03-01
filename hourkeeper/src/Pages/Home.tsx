import Navbar from "../Components/Navbar.tsx";

const Home = () => {
    return <>
            <Navbar />
            <div className={"container"}>
                <h1>Welcome to Hourkeeper!</h1>
                Here to help you keep track of your hours.
            </div>
        </>
}

export default Home;