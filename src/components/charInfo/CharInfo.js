import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [character, setCharacters] = useState(null);

    const {process, setProcess, getCharacteer, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        clearError();

        getCharacteer(charId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharacterLoaded = (character) => { // перекидываем пришедшие данные в state
        setCharacters(character);
    }

    return (
        <div className="char__info">
            {setContent(process, View, character)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;


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