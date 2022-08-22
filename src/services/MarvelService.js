import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=56c5cb94b120889883bcc2d2ebcd6bb7";
    const _baseOffset = 210; // для подгрузки нвоых персонажей

    const getAllCharacteers = async (offset = _baseOffset) => { // Метод чтобы получить всех персонажей
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`); // записываем ответ от сервера в переменную
        return res.data.results.map(_transformCharacter); // передаём функцию по которой будем изменять элементы массива
    }

    const getCharacteer = async (id) => { // Метод чтобы получить одного персонажа по id
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`); // записываем ответ от сервера в переменную

        if (res.data.results[0].description === "") { // если нет описания то вставляем заглушку
            res.data.results[0].description = "Description of the character is temporarily unavailable";
        } 

        // if (res.data.results[0].description.length > 220) { // если описание слишеом длинное то обрезаем
        //     res.data.results[0].description.substring = res.data.results[0].description.substring(0, 220);
        // }

        return _transformCharacter(res.data.results[0]); // возвращаем уже видоизменённый объект
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`);
        
        return res.data.results.map(_transformComics);
    }

    const getComic = async id => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (character) => { // передаём индекс нужного персонажа из массива пришедшего с API
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items // массив с объектами с названием комикса и ссылкой на него
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {loading, error, getAllCharacteers, getCharacteer, getCharacterByName, getComics, getComic, clearError}
}

export default useMarvelService;