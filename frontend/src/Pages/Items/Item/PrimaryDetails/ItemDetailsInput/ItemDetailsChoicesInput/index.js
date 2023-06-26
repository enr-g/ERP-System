const ItemDetailsChoicesInput = ({choices}) => {

    //reusable input if there are choices
    return (
        choices?.map((choice) => (
            <option value={choice} key={choice}>{choice}</option>
        ))
    )
}

export default ItemDetailsChoicesInput