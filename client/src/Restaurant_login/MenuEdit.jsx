const MenuEdit = ({ menuItem, restID, onRemove }) => {
    return (
        <div className="menu-item-card-dash">
            <div className="food-data-dash">
                <h2>{menuItem.Food_Name}</h2>
                <p><b>Price:</b> ₹{menuItem.Price}</p>
                <p><b>Calories:</b> {menuItem.Calories}</p>
                <p><b>Description:</b> {menuItem.Food_Description}</p>
            </div>
            <div className="food-count-dash">
                <img className="food-image-dash" src={menuItem.ImageURL} alt={menuItem.Food_Name} />
                <button className="remove-btn-dash" onClick={onRemove}>Remove</button> {/* Remove button */}
            </div>
        </div>
    );
};

export default MenuEdit;
