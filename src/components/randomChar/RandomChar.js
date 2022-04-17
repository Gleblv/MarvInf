import { Component } from 'react/cjs/react.production.min';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage.js'

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        character: {
        
        },
        loading: true,
        error: false
    }

    marvelService = new MarvelService(); // создаём новое свойство. Тоже самое что this.marvelService = ... ;

    componentDidMount() {
        this.updateChar(); // вызываем метод один раз чтобы при загрузке сайта отрендерился случайный персонаж
    }

    onCharacterLoaded = (character) => { // перекидываем пришедшие данные в state
        this.setState({
            character, 
            loading: false
        });
    }

    onError = () => {
        this.setState({ 
            loading: false,
            error: true
        });
    }

    updateChar = () => {
        const id = ~~(Math.random() * (1011400 - 1011000) + 1011000); // случайное число в промежутке от 1011000 до 1011400
        this.marvelService
            .getCharacteer(id) // получаем данные об одном персонаже (Метод написан в папке servesec/MarvelServise.js)
            .then(this.onCharacterLoaded) // пришедший объект сразу видоизменяется после метода getCharacteer. Пришедший аргумент автоматически подставляется в метод
            .catch(this.onError); // в случае ошибки вызываем метод
    }

    render () {
        const {character, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null; // если есть ошибка то показываем компонент с ошибкой
        const spiner = loading ? <Spinner/> : null; // если есть загрузка то показываем компонент с загрузкой
        const content = !(loading || error) ? <View character={character}/> : null; // если нет ошибки или загрузки то показываем контент

        return (
            <div className="randomchar">
                {/* Подставляем либо компонент с вёрсткой (смотреть ниже) либо компонент с svg спинером */}
                {errorMessage}
                {spiner}
                {content} 
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
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

    let thumbnailStyle = {
        width: '180px',
        height: '180px',
        objectFit: 'cover'
    }

    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") { // если сообщение с ошибкой, то немного меняем стили изображения
        thumbnailStyle = {
            width: '180px',
            height: '180px',
            objectFit: 'contain'
        }
    }

    return (
        <div className="randomchar__block">
                    <img src={thumbnail} style={thumbnailStyle} alt="Random character" className="randomchar__img"/>
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