import { useEffect } from "react";
import style from "./Header.module.css";
const Header = ({inputValorIncial,setinputValorIncial,inputValorFinal,setinputValorFinal,movements,setcount}) => {
  useEffect(() => {
    const sumaGastos = movements
    .filter((movement) => movement.type === "Gasto")
    .reduce((total, movement) => total + parseFloat(movement.cantidad), 0);

   const sumaIngresos = movements
    .filter((movement) => movement.type === "Ingreso")
    .reduce((total, movement) => total + parseFloat(movement.cantidad), 0);

    setinputValorFinal(inputValorIncial+(sumaIngresos-sumaGastos));
    setcount(movements.length);
  }, [movements,inputValorIncial]);
  return (
    <div className={style.chart}>
        <div className={style.header}>
          <h3>Mis Finanzas</h3>
        </div>
        <div className={style.containerSaldo}>
          <label for="saldoInicial">Saldo inicial:</label>
          <input type="text" id="saldoInicial" value={inputValorIncial} name="saldoInicial" onChange={(e) => setinputValorIncial(e.target.value)}/>
          <label for="saldofinal">Saldo final:</label>
          <input type="text" id="saldoFinal" value={inputValorFinal} name="saldoFinal" readOnly></input>
        </div>
        
    </div>
  );
};

export default Header;