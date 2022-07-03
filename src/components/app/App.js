import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../pages";

import AppHeader from "../appHeader/AppHeader";

const App = () => {

    return (
        <Router> {/* Маршрутизатор, который получает сигналы от ссылок и показывает нужную страницу */}
            <div className="app">
            <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route> {/* Маршрут */}
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route> {/* Маршрут */}
                        <Route exact path="/comics/:comicId">
                            <SingleComicPage/>
                        </Route>
                        <Route path="*"> {/* Страница которая будет выводится при нерпавильном адресе */}
                            <Page404/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;