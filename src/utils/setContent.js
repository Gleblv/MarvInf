/* eslint-disable no-unreachable */

import Spinner from '../components/spinner/spinner';
import ErrorMessage from '../components/errorMessage/errorMessage';
import Skeleton from '../components/skeleton/Skeleton';

// state-machine (В зависимости от того какой процесс сейчас происходит, мы возвращаем нужный компонент)
// Component - компонент который мы передаём в эту функицю в качестве аргумента
// data - пропс для этого компонента
const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <Skeleton/>
            break;
        case 'loading':
            return <Spinner/>
            break;
        case 'confirmed':
            return <Component data={data}/>
            break;
        case 'error':
            return <ErrorMessage/>
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;