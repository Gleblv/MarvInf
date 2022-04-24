import { Component } from 'react/cjs/react.production.min';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage.js';

import './charList.scss';

class CharList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            characters: [],
            loading: true,
            error: false
        };
    }

    marvelService = new MarvelService();

    componentDidMount () {
        this.marvelService
            .getAllCharacteers()
            .then(data => this.setState(({
                characters: data,
                loading: false
            }))) // помещаем ответ от сервера  с массивом персонажей в state 
            .catch(this.onError)    
    }

    onError = () => {
        this.setState({
            error: true
        })
    }

    pushCharacters = () => {

        const charactersList = this.state.characters.map(item => { // перебираем массив из state и возвращаем массив с элементами списка
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'contain'};
            }

            return (
                <li className='char__item'
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
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
        const {loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spiner = loading ? <Spinner/> : null;
        const content = (errorMessage === null && spiner === null) ? this.pushCharacters() : null

        return (
            <div className="char__list">
                {content}
                {spiner}
                {errorMessage}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;