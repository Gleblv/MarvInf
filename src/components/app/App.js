import { useState } from "react";
import propTypes from "prop-types";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from '../comicsList/ComicsList';

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => { // получвем id персонажа по которому кликнули из компонента CharList и заносим его в state
        setSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ComicsList/>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary> {/* Предохранитель  */}
                        {/* <CharInfo charId={selectedChar}/> {/* передаём id персонажа из state в CharInfo */}
                    {/* </ErrorBoundary>  */}
                {/* </div>  */}
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

App.propTypes = {
    selectedChar: propTypes.number
}

export default App;