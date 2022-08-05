import { filtersLoading, filtersLoaded, heroesAdd } from "../../actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться. !!СДЕЛАНО, ФИЛЬТРУЕТСЯ!!
// Уникальный идентификатор персонажа можно сгенерировать через uiid !!РЕАЛИЗОВАЛ ЧЕРЕЗ ID ПОСЛЕДНЕГО ГЕРОЯ + 1!!
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST !!ВЫПОЛНЕНО!!
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе !!СДЕЛАНО УРААААААААА!!
// данных из фильтров

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState(null);
    const [heroDesc, setHeroDesc] = useState(null);
    const [heroElement, setHeroElement] = useState(null);

    const dispatch = useDispatch();
    const {request} = useHttp();
    const {heroes, filtersLoadingStatus, filters} = useSelector(state => state);

    useEffect(() => {
        request('http://localhost:3001/filters')
        .then(data => {
            dispatch(filtersLoading(data));
            dispatch(filtersLoaded());
        })
        .catch(console.log('Error while loading filters'));
    }, [])

    if (filtersLoadingStatus !== 'idle') {
        return <h2>Cannot load filters</h2>
    }

    const filterOptions = [];
    filters.forEach(item => {
        if (item.en !== "all") {
            filterOptions.push(<option value={item.en}>{item.ru}</option>)
        }
    })

    return (
        <form className="border p-4 shadow-lg rounded" 
        onSubmit={(e) => {
            e.preventDefault();
            const lastId = heroes[heroes.length-1].id + 1;
            const newHero = {
                id: lastId,
                name: heroName,
                description: heroDesc,
                element: heroElement
            }
            const newHeroJson = JSON.stringify(newHero);
            console.log(newHeroJson);
            if (heroName !== null && heroName !== '' && heroDesc !== null && heroDesc !== '' && heroElement !== null && heroElement !== 'Я владею элементом...') {
                dispatch(heroesAdd(newHero));
                const res ={};
                request("http://localhost:3001/heroes", "POST", newHeroJson, {'Content-Type': 'application/json'})
                    // .then(data => console.log(data)
                    .then(res)
                    .catch(console.log("Something went wrong"));
                    console.log(res);
            }
        }}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?" 
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}} 
                    onChange={(e) => setHeroDesc(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element" 
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {filterOptions}
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;