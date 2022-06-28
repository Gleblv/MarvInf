import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { MainPage, ComicsPage } from "../pages";

import AppHeader from "../appHeader/AppHeader";

const App = () => {

    return (
        <Router> {/* Маршрутизатор, который получает сигналы от ссылок и показывает нужную страницу */}
            <div className="app">
            <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/> {/* Маршрут */}
                        <Route path="/comics" element={<ComicsPage/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;