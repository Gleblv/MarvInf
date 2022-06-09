import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body, headers={'Content-Type': 'application/json'}) => { // функция по хапросу на сервер
        setLoading(true); // показываем что идёт загрузка

        try {
            const response = await fetch(url, {method, body, headers}); // отправляем запрос и помещаем ответ в response

            if (!response.ok) { // если ошибка
                throw new Error(`Cloud not fetch ${url}, status ${response.status}`); // создаём новую ошибку
            }

            const data = await response.json(); // ждём когда данные декодируются

            setLoading(false); // заканчиваем загрузку
            return data;
        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e; // выкидываем ошибку
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}