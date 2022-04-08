

class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=56c5cb94b120889883bcc2d2ebcd6bb7";

    getResoursec = async (url) => { // запрос с сервера
        let res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacteers = async () => { // Метод чтобы получить всех персонажей
        const res = await this.getResoursec(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`); // записываем ответ от сервера в переменную
        return res.data.results.map(this._transformCharacter); // передаём функцию по которой будем изменять элементы массива
    }

    getCharacteer = async (id) => { // Метод чтобы получить одного персонажа по id
        const res = await this.getResoursec(`${this._apiBase}characters/${id}?${this._apiKey}`); // записываем ответ от сервера в переменную

        if (res.data.results[0].description === "") { // если нет описания то вставляем заглушку
            res.data.results[0].description = "Description of the character is temporarily unavailable";
        } 

        if (res.data.results[0].description.length > 220) { // если описание слишеом длинное то обрезаем
            res.data.results[0].description.substring = res.data.results[0].description.substring(0, 220);
        }

        return this._transformCharacter(res.data.results[0]); // возвращаем уже видоизменённый объект
    }

    _transformCharacter = (character) => { // передаём индекс нужного персонажа из массива пришедшего с API
        return {
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url
        }
    }
}

export default MarvelService;