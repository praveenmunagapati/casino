import React from 'react';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";


function App() {
    const [balance, setBalance] = React.useState(100);
    const [isLoginOpen, setOpenLogin] = React.useState(false);
    const [userName, setUserName] = React.useState("")

    function openLoginModal() {
        setOpenLogin(true)
    }

    function closeLoginModal() {
        setOpenLogin(false)
    }

    return (
        <div className="App">
            <Header userName={userName} openLoginModal={openLoginModal} balance={balance}/>
            <Content
                setUserName={setUserName}
                userName={userName}
                closeLoginModal={closeLoginModal}
                isLoginOpen={isLoginOpen}
                balance={balance}
                setBalance={setBalance}
            />
            <Footer/>
        </div>
    );
}

export default App;
