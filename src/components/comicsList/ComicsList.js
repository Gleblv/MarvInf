import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';

import './comicsList.scss';

const setContent = (process, Component, newCharactersLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>
            break;
        case 'loading':
            return newCharactersLoading ? <Component/> : <Spinner/>
            break;
        case 'confirmed':
            return <Component/>
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsLoaded, setComicsLoaded] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequest = (offset, initial) => { // запрос 
        initial ? setComicsLoaded(false) : setComicsLoaded(true);
        getComics(offset)
            .then(onNewComicsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onNewComicsLoaded = (newComics) => { // добавление доп.данных
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setComicsLoaded(false)
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const renderItems = (arr) => { // рендер 
        const items = arr.map((item, i) => {
            return (
                <li key={i} className="comics__item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link to={`/comics/${item.id}`}> {/* динамический путь */}
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comics), comicsLoaded)}
            <button 
                disabled={comicsLoaded}
                className="button button__main button__long"
                style={{'display' : comicsEnded ? 'none' : 'block'}}>
                <div 
                    className="inner" 
                    onClick={() => onRequest(offset)}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;