import { Component } from "react/cjs/react.production.min";
import propTypes from "prop-types";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedChar: null 
    }

    onCharSelected = (id) => { // получвем id персонажа по которому кликнули из компонента CharList и заносим его в state
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>
                        <ErrorBoundary> {/* Предохранитель */}
                            <CharInfo charId={this.state.selectedChar}/> {/* передаём id персонажа из state в CharInfo */}
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

App.propTypes = {
    selectedChar: propTypes.number
}

export default App;