import { useSelector} from "react-redux";
import FilterButton from '../filterButton/FilterButton';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных !!ВЫПОЛНЕНО!!
// Фильтры должны отображать только нужных героев при выборе !!ВЫПОЛНЕНО!!
// Активный фильтр имеет класс active !!ВЫПОЛНЕНО!!
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filtersLoadingStatus, filters} = useSelector(state => state);

    if (filtersLoadingStatus !== 'idle') {
        return <h2>Cannot load filters</h2>
    }

    let filtersArr;

    if (filters !== []) {
        filtersArr = filters.map(item => <FilterButton key={item.en} ru={item.ru} en={item.en} />)
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filtersArr}
                    {/* <button className="btn btn-outline-dark active">Все</button> */}
                    {/* <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;