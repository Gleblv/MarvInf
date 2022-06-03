import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
    const [character, setCharacters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        onCharLoading();

        marvelService.getCharacteer(charId)
            .then(onCharacterLoaded)
            .catch(onError)
    }

    const onCharacterLoaded = (character) => { // перекидываем пришедшие данные в state
        setCharacters(character);
        setLoading(false);
        setError(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharLoading = () => { // метод чтобы показывался спинер
        setLoading(true);
        setError(false);
    }

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

CharInfo.propTypes = {
    charId: propTypes.number
}

export default CharInfo;