import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MainPage, ComicsPage } from "../pages";
import AppHeader from "../appHeader/AppHeader";

const App = () => {

    return (
        <Router> {/* Маршрутизатор, который получает сигналы от ссылок и показывает нужную страницу */}
            <div className="app">
            <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/"> {/* Маршрут */}
                            <MainPage/>
                        </Route> {/* Маршрут */}
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;