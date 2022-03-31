

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

    getAllCharacteers = () => { // Метод чтобы получить всех персонажей
        return this.getResoursec(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacteer = (id) => { // Метод чтобы получить одного персонажа по id
        return this.getResoursec(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;