import { Component } from 'react/cjs/react.production.min';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount () {
        this.updateChar();
    }

    componentDidUpdate (prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService.getCharacteer(charId)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
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

    onCharLoading = () => { // метод чтобы показывался спинер
        this.setState({
            loading: true
        });
    }

    render () {
        const {character, loading, error} = this.state;

        const skeleton = character || loading || error ? null : <Skeleton/> // если всё загрузилось, но не выбран персонаж, то вставляем заглушку
        const errorMessage = error ? <ErrorMessage/> : null; // если есть ошибка то показываем компонент с ошибкой
        const spiner = loading ? <Spinner/> : null; // если есть загрузка то показываем компонент с загрузкой
        const content = !(loading || error || !character) ? <View character={character}/> : null; // если нет ошибки или загрузки то показываем контент

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spiner}
                {content}
            </div>
        )
    }
}

const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = character;

    let imgStyle = {"objectFit" : "cover"};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "Comics not found"} {/* если длина массива с комиксами больше нуля то рендерим следующий элемент, в ином случае рендерится просто надпись */}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line array-callback-return
                        if (i > 10) return;

                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
} 

export default CharInfo;