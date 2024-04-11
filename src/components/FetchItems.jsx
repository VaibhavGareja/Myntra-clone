import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarting());

    fetch("http://localhost:8080/items", { signal })
      .then((res) => {
        return res.json();
      })
      .then(({ items }) => {
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinshed());
        dispatch(itemsActions.addIntialItems(items[0]));
        
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    return () => {
      controller.abort(); // Abort fetch request on component unmount
    };
  }, [fetchStatus, dispatch]);

  return <></>;
};

export default FetchItems;
