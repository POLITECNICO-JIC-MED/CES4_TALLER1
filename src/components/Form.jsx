import { useEffect } from "react";
import style from "./Form.module.css";
import uuid4 from "uuid4";

const Form = ({inputValorIncial,inputValorFinal,setinputValorFinal,selectedOption,setSelectedOption,setInputNombre,InputNombre,setInputCantidad,InputCantidad,setmovements,movements,edit,setEdit,setcount
,showModal,setShowModal,titleModal,settitleModal,validationMessages,setValidationMessages}) => {
    
    const handlerSubmit = (e) => {
        e.preventDefault();
        const messages = [];
        if (!InputNombre || InputNombre.trim() === "") {
            settitleModal("Error");
            messages.push("El campo de nombre no puede estar vacío.");
        }

        if (isNaN(InputCantidad.replace(/[^0-9.]/g, "")) || InputCantidad.replace(/[^0-9.]/g, "") <= 0) {
            messages.push("La cantidad debe ser un número válido y mayor que cero.");
        }

        if (selectedOption === "Gasto") {
            debugger
            const cantidad = parseFloat(InputCantidad.replace(/[^0-9.]/g, "")); 
            var saldoFinal=0;
            if(edit){
                const sumaGastos = movements
                .filter((movement) => movement.type === "Gasto" && movement.id !==edit.id)
                .reduce((total, movement) => total + parseFloat(movement.cantidad), 0);
    
                const sumaIngresos = movements
                .filter((movement) => movement.type === "Ingreso" && movement.id !==edit.id)
                .reduce((total, movement) => total + parseFloat(movement.cantidad), 0);
    
                const numericInicial = (parseFloat(inputValorIncial.replace(/[^0-9.]/g, "")));    
    
                saldoFinal = (isNaN(numericInicial) ? 0 : numericInicial) + parseFloat(sumaIngresos) - parseFloat(sumaGastos);
    
            }else{
                saldoFinal=inputValorFinal.replace(/[^0-9.]/g, "");
            }                            
        
            if (cantidad > saldoFinal) {
                settitleModal("Error");
                messages.push("No tienes suficiente saldo para realizar este gasto.");
            }
          }

        if (messages.length > 0) {
            setValidationMessages(messages);
            setShowModal(true);
            return;
        }

        if (edit) {
            editMovement(edit);
          } else {
        const newMovement = {
        id: uuid4(),
        type:selectedOption,
        name: InputNombre,
        cantidad: InputCantidad.replace(/[^0-9.]/g, ""),
        };
    
        setmovements([...movements, newMovement]);
        
        }
        
        settitleModal("Registro Exitoso");
        messages.push("El " + selectedOption + " fue " + (edit ? "editado" : "agregado") + " correctamente.");
        setValidationMessages(messages);
        setShowModal(true);
              
        setSelectedOption("")
        setInputNombre("");
        setInputCantidad("0");

        
        
        
    };
    
    const editMovement = (movement) =>{
        const newMovement=movements.map((item)=>
        item.id==movement.id ? {...movement,type:selectedOption,name:InputNombre,cantidad:InputCantidad.replace(/[^0-9.]/g, "")}:item
        );
        setmovements(newMovement);
        setEdit(null)
    }
    useEffect(() => {
        if (edit){
            setSelectedOption(edit.type);
            setInputNombre(edit.name);
            setInputCantidad(edit.cantidad);
        } 
        else{ 
            setInputNombre("");
            setInputCantidad("0");
        }  
          
      }, [edit]);

    const handleCancel = () => {
    setInputNombre("");
    setInputCantidad("0");
    setEdit(null);
    };
    const formatCurrency = (value) => {
        debugger
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD", // Cambia a la moneda que desees
          minimumFractionDigits: 0,
        });
      };
    const handleInputCantidadChange = (e) => {
        debugger
        const inputValue = e.target.value;
        const numericValue = parseFloat(inputValue.replace(/[^0-9.]/g, ""));
        const formattedValue = formatCurrency(isNaN(numericValue) ? 0 : numericValue);
        setInputCantidad(formattedValue);
      };
    

    return (
        <div className={style.containerForm}>
            <div className={style.headerForm}>Registro</div>
            <div className={style.taskform}>
                
                <form onSubmit={handlerSubmit}>
                    <div className={style.taskLine}>
                        <label className={style.labelname}>Tipo movimiento: </label>
                        <select value={selectedOption} className={style.taskInput} onChange={(e) => setSelectedOption(e.target.value)}>
                            <option value="">Seleccionar</option>
                            <option value="Ingreso">Ingreso</option>
                            <option value="Gasto">Gasto</option>
                        </select>
                    </div>
                    <div className={style.taskLine}>
                        <label  className={style.labelname}>Nombre: </label>
                        <input
                        type="text"
                        name="task"
                        placeholder=""
                        className={style.taskInput}
                        value={InputNombre}
                        onChange={(e) => setInputNombre(e.target.value)}
                        />
                    </div>
                    <div className={style.taskLine}>
                        <label  className={style.labelname}>Cantidad: </label>
                        <input
                        type="text"
                        name="cantidad"
                        placeholder=""
                        className={style.taskInput}
                        value={formatCurrency(parseFloat(InputCantidad.replace(/[^0-9.]/g, "")))}
                        onChange={handleInputCantidadChange}
                        />
                    </div>
                    
                    <div className={style.buttonContainer}>
                        <button type="submit" >
                        {edit ? "Editar Movimiento" : "Agregar Movimiento"}
                        </button>


                        <button type="button" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>

                    
                
                    

                </form>
                
                
        </div>
      </div>
    );
  };

  export default Form;