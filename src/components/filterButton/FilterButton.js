import { useDispatch, useSelector } from "react-redux";
import { setActiveFilter} from "../../actions";

const FilterButton = ({en, ru}) => {
    const {activeFilter} = useSelector(state => state);
    let classes = "btn ";
    if (activeFilter === en) {
        classes += "active "
    }
    const dispatch = useDispatch();
    switch (en) {
        case 'all':
            classes += 'btn-outline-dark'
            break;
        case 'fire':
            classes += 'btn-danger';
            break;
        case 'water':
            classes += 'btn-primary';
            break;
        case 'wind':
            classes += 'btn-success';
            break;
        case 'earth':
            classes += 'btn-secondary';
            break;
        default:
            classes += 'btn-warning';
    }

    return (
        <>
            <button 
            className={classes}
            onClick={() => {
                dispatch(setActiveFilter(en));
            }}>{ru}</button>
        </>
    )
}

export default FilterButton;