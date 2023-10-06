import style from "./MovementItem.module.css"
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

const MovementItem = ({movement,setEdit,deleteMovement})=>{
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
               {movement.cantidad} 
            </div>
        </li>
    );
};

export default MovementItem;