import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams(); // получаем id комикса
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => { // обновляем данные комикса когда меняется id
        updateComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicId])

    const updateComic = () => { // получаем данные комикса по id
        clearError();

        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => { // перекидываем пришедшие данные в state
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null; // если есть ошибка то показываем компонент с ошибкой
    const spiner = loading ? <Spinner/> : null; // если есть загрузка то показываем компонент с загрузкой
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null; // если нет ошибки или загрузки то показываем контент

    return (
        <>
            {errorMessage}
            {spiner}
            {content}
        </>
    )
}

const View = ({comic}) => { // компонент который отвечает только за вёрстку
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;