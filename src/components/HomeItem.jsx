/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
const HomeItem = ({ item }) => {
  const bagItems = useSelector((store) => store.bag);
  const dispatch = useDispatch();

  const elementFound = bagItems.indexOf(item.id) >= 0;

  const handleAddButton = () => {
    dispatch(bagActions.addToBag(item.id));
  };
  const handleRemoveButton = () => {
    dispatch(bagActions.removeToBag(item.id));
  };
  return (
    <>
      <div className="item-container">
        <img className="item-image" src={item.image} alt="item image" />
        <div className="rating">
          {item.rating.stars} ⭐ | {item.rating.count}
        </div>
        <div className="company-name">{item.company}</div>
        <div className="item-name">{item.item_name}</div>
        <div className="price">
          <span className="current-price">Rs {item.current_price}</span>
          <span className="original-price">Rs {item.original_price}</span>
          <span className="discount">({item.discount_percentage}% OFF)</span>
        </div>
        {elementFound ? <button type="button" className=" btn-add-bag btn btn-danger" onClick={handleRemoveButton}>
          <MdDelete />
          Remove
        </button>: <button
          className="btn-add-bag btn btn-success"
          onClick={handleAddButton}
        >
          <IoAddCircle />
          Add to Bag
        </button>}

        

        
      </div>
    </>
  );
};

export default HomeItem;
