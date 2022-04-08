import { Component } from 'react/cjs/react.production.min';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    constructor (props) {
        super(props);
        this.updateChar(); // вызываем метод один раз чтобы при загрузке сайта отрендерился случайный персонаж
    }

    state = {
        character: {
        
        },
        loading: true
    }

    marvelService = new MarvelService(); // создаём новое свойство. Тоже самое что this.marvelService = ... ;

    onCharacterLoaded = (character) => { // перекидываем пришедшие данные в state
        this.setState({
            character, 
            loading: false
        });
    }

    updateChar = () => {
        const id = ~~(Math.random() * (1011400 - 1011000) + 1011000); // случайное число в промежутке от 1011000 до 1011400
        this.marvelService
            .getCharacteer(id) // получаем данные об одном персонаже (Метод написан в папке servesec/MarvelServise.js)
            .then(this.onCharacterLoaded) // пришедший объект сразу видоизменяется после метода getCharacteer. Пришедший аргумент автоматически подставляется в метод
    }

    render () {
        const {character, loading} = this.state;

        return (
            <div className="randomchar">
                {/* Подставляем либо компонент с вёрсткой (смотреть ниже) либо компонент с svg спинером */}
                {loading ? <Spinner/> : <View character={character}/>} 
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({character}) => { // вынесли часть вёстки из гланого компонента
    const {name, description, thumbnail, homepage, wiki} = character;

    return (
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;