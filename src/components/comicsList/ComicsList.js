import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(210);
    const [comicsLoaded, setComicsLoaded] = useState(false);

    const {loading, error, clearError, getComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequest = (offset) => {
        clearError();
        setComicsLoaded(true);
        getComics(offset)
            .then(onNewComicsLoaded);
        setComicsLoaded(false);
    }

    const onNewComicsLoaded = (newComics) => {
        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 9);
    }

    const renderItems = () => {
        const items = comics.map(item => {
            return (
                <li className="comics__item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const content = comicsLoaded ? null : renderItems();

    const spinner = loading & !comicsLoaded ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            {content}
            {spinner}
            {errorMessage}
            <button 
                disabled={comicsLoaded}
                className="button button__main button__long">
                <div 
                    className="inner" 
                    onClick={() => onRequest(offset)}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;