import style from "./MovementItem.module.css"
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

const MovementItem = ({movement,setEdit,deleteMovement})=>{
    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD", // Cambia a la moneda que desees
          minimumFractionDigits: 0,
        });
      };
    return (
        <li className={style.list}>
            <div>
                <button onClick={() => setEdit(movement)}>
                <FaEdit />
                </button>
            </div>
            <button onClick={() => deleteMovement(movement)}>
                <FaTrash />
            </button>
            <div className={style.listItem}> 
               {movement.name} 
            </div>
            <div className={`${movement.type == "Gasto" ? style.gasto : style.ingreso}`}>
               {formatCurrency(parseFloat(movement.cantidad))} 
            </div>
        </li>
    );
};

export default MovementItem;