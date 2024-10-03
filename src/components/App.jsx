
// import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
// import NavBar from './NavBar';
import ItemContainer from './ItemContainer';
import '../css/App.css'

function App() {
    return (
        <div>
            <Header />
            <SearchBar />
            <div className='container'>
                <ItemContainer />
                <ItemContainer />
                <ItemContainer />
            </div>
        </div>
    );
}

export default App;