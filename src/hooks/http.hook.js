import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting'); // состояние которое показывает какой сейчас процесс

    const request = useCallback(async (url, method = "GET", body, headers={'Content-Type': 'application/json'}) => { // функция по хапросу на сервер
        setProcess('loading'); // ставим загрузку в state-machine

        try {
            const response = await fetch(url, {method, body, headers}); // отправляем запрос и помещаем ответ в response

            if (!response.ok) { // если ошибка
                throw new Error(`Cloud not fetch ${url}, status ${response.status}`); // создаём новую ошибку
            }

            const data = await response.json(); // ждём когда данные декодируются

            return data;
        } catch(e) {
            setProcess('error');
            throw e; // выкидываем ошибку
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading');
    }, []);

    return {request, clearError, process, setProcess}
    // передаём setProcess чтобы избежать ошибки из-за ого что состояние установиться раньше, чем придут данные с сервера 
}