import React from 'react';
import { useHistory } from 'react-router-dom';
import { logUserOut } from '../apllo';

const Home = () => {
    const history = useHistory()
    return (<>
        <h1>WelCome! we did it!</h1>
        <button onClick={() => logUserOut(history)}>Log out Now!</button>
    </>);
}

export default Home;