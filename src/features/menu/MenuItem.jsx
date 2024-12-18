import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addPizza, getCurrentQuantityById } from "../cart/cartSlice";
import UpdateQuantity from "../cart/UpdateQuantity";
import { useState } from "react";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const [tempQuantity, setTempQuantity] = useState(0);

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const dispatch = useDispatch();

  function handleAddToCart() {
    if (tempQuantity === 0) return;

    const newPizza = {
      pizzaId: id,
      name: name,
      quantity: tempQuantity + currentQuantity,
      unitPrice,
      totalPrice: unitPrice * (tempQuantity + currentQuantity),
    };

    dispatch(addPizza(newPizza));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="relative flex flex-grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-600">
          {ingredients.join(", ")}
        </p>
        <div className="x_small:justify-between mt-auto flex items-end justify-center">
          {!soldOut ? (
            <p className="x_small:static absolute right-1 top-1 text-sm">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-medium uppercase text-red-700">
              Sold out
            </p>
          )}
          {!soldOut && (
            <div className="flex items-center gap-6">
              <UpdateQuantity
                pizzaId={id}
                display={true}
                tempQuantity={tempQuantity}
                setTempQuantity={setTempQuantity}
              />
              <div className="relative flex flex-col items-center">
                {currentQuantity ? (
                  <p className="small:absolute small:block top-[-1.5rem] hidden text-sm italic">
                    ({currentQuantity} in cart)
                  </p>
                ) : null}
                <Button type="small" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
