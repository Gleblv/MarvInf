import { Component } from 'react/cjs/react.production.min';

import MarvelService from '../../services/MarvelService';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            characters: []
        }
    }

    marvelService = new MarvelService();

    componentDidMount () {
        this.marvelService
            .getAllCharacteers()
            .then(data => this.setState(({characters: data}))) // помещаем ответ от сервера  с массивом персонажей в state
                        
    }

    pushCharacters = () => {
        const charactersList = this.state.characters.map(item => { // перебираем массив из state и возвращаем массив с элементами списка
            return (
                <li className='char__item' key={item.id}>
                    <img src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return ( // возвращаем список с нашим массивом
            <ul className='char__grid'>
                {charactersList}
            </ul>
        )
    }

    render () { 
        const content = this.pushCharacters();

        return (
            <div className="char__list">
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;