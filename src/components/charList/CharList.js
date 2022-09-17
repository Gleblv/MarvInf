import { useState, useEffect, useRef } from 'react';
import React from 'react';
import propTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage.js';

import './charList.scss';

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

const CharList = (props) => {

    const [characters, setCharacters] = useState([]);
    const [newCharactersLoading, setNewCharactersLoading] = useState(false); // проверяем грузятся ли дополнительные компоненты 
    const [offset, setOffset] = useState(210);
    const [charactersEnded, setCharactersEnded] = useState(false);
    const [animTriger, setAnimTriger] = useState(false);

    const {getAllCharacteers, process, setProcess} = useMarvelService();

    useEffect(() => { // запрос при первой загрузке страницы
        onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    const onRequest = (offset, initial) => { // запрос с сервера
        initial ? setNewCharactersLoading(true) : setNewCharactersLoading(false);
        setNewCharactersLoading(true);
        getAllCharacteers(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = (newCharacters) => { // данные персонажей помещаем в массив в state
        let ended = false; 
        if (newCharacters.length < 9) { // проверяем не закончились ли персонажи
            ended = true;
        }

        setCharacters(characters => [...characters, ...newCharacters]); // добавляем новыее данные о персонажах в массив к старым
        setNewCharactersLoading(false);
        setOffset(offset => offset + 9);
        setCharactersEnded(ended);
    }

    const itemRefs = useRef([]); // массив ссылок на DOM-элементы

    const focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected')); 
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const pushCharacters = () => {

        const charactersList = characters.map((item, i) => { // перебираем массив из state и возвращаем массив с элементами списка
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'contain'};
            }

            return (
                <CSSTransition in={animTriger} timeout={1000} classNames="char-card">
                    <li className='char__item'
                    ref={el => itemRefs.current[i] = el} // el - ссылка на DOM-элемент
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                        setAnimTriger(true);
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
                </CSSTransition>
            )
        })

        return ( // возвращаем список с нашим массивом
            <ul className='char__grid'>
                {charactersList}
            </ul>
        )
    }

    return (
        <div className="char__list"> 
            {/* pushCharacters - функция которая возвращает список элементов charactersList */}
            {setContent(process, () => pushCharacters(), newCharactersLoading)} 
            <button 
                className="button button__main button__long"
                disabled={newCharactersLoading}
                style={{'display': charactersEnded ? 'none' : 'block'}} // если персонажи для подгрухки закончаться, то кнопка пропадёт
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: propTypes.func.isRequired
}

export default CharList;