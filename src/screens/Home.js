import React from 'react';

const Home = ({ setIsLoggedIn }) => {
    return (<>
        <h1>Home</h1>
        <button onClick={() => setIsLoggedIn(false)}>Log Out Now!</button>
    </>);
}

export default Home;