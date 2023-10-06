import { useEffect, useState } from "react";
import style from "./Header.module.css";

const Header = ({ inputValorIncial, setinputValorIncial, inputValorFinal, setinputValorFinal, movements, setcount }) => {
  // Función para formatear un número como moneda
  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD", // Cambia a la moneda que desees
      minimumFractionDigits: 0,
    });
  };


  const handleInputValorInicialChange = (e) => {
    const inputValue = e.target.value;

    const numericValue = inputValue.replace(/[^0-9.]/g, "");

    const formattedValue = formatCurrency(parseFloat(numericValue));
    setinputValorIncial(formattedValue);
  };

  useEffect(() => {
    const sumaGastos = movements
      .filter((movement) => movement.type === "Gasto" )
      .reduce((total, movement) => total + parseFloat(movement.cantidad), 0);

    const sumaIngresos = movements
      .filter((movement) => movement.type === "Ingreso")
      .reduce((total, movement) => total + parseFloat(movement.cantidad), 0);

    const numericInicial = (parseFloat(inputValorIncial.replace(/[^0-9.]/g, "")));
    setinputValorIncial(formatCurrency(isNaN(numericInicial) ? 0 : numericInicial));


    const saldoFinal = (isNaN(numericInicial) ? 0 : numericInicial) + parseFloat(sumaIngresos) - parseFloat(sumaGastos);
    setinputValorFinal(formatCurrency(saldoFinal));

    setcount(movements.length);
  }, [movements, inputValorIncial]);

  return (
    <div className={style.chart}>
      <div className={style.header}>
        <h3>Mis Finanzas</h3>
      </div>
      <div className={style.containerSaldo}>
        <label htmlFor="saldoInicial">Saldo inicial:</label>
        <input
          type="text"
          id="saldoInicial"
          value={inputValorIncial}
          name="saldoInicial"
          onChange={handleInputValorInicialChange}
        />
        <label htmlFor="saldoFinal">Saldo final:</label>
        <input
          type="text"
          id="saldoFinal"
          value={inputValorFinal}
          name="saldoFinal"
          readOnly
        />
      </div>
    </div>
  );
};

export default Header;
