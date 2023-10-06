import MovementItem from "./MovementItem";
import style from "./MovementList.module.css"

const MovementList=({movements,setmovements,setEdit,count,searchTerm,setSearchTerm,filterType,setFilterType}) => {
    
    const deleteMovement = ({ id }) => {
        setmovements(movements.filter((movement) => movement.id !== id));        
      };
      const filteredMovements = movements.filter((movement) => {
        // Filtrar por tipo si el filtro está activado
        if (filterType !== "Todos" && movement.type !== filterType) {
            return false;
        }
    
        // Coincidencia parcial en el campo de nombre
        return movement.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    return(
        <div className={style.containerList}>
      <div className={style.headerList}>
        <div>Listado Movimientos</div>
        <div className={style.count}>{count}</div>
      </div>
      <div className={style.filter}>
        <div className={style.nameFilter}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={style.typeFilter}>
          <label>
            <input
              type="checkbox"
              checked={filterType === "Todos"}
              onChange={() => setFilterType("Todos")}
            />
            Todos
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterType === "Ingreso"}
              onChange={() => setFilterType("Ingreso")}
            />
            Ingresos
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterType === "Gasto"}
              onChange={() => setFilterType("Gasto")}
            />
            Gastos
          </label>
        </div>
      </div>
      <div className={style.taskList}>
        {filteredMovements.map((movement) => (
          <MovementItem
            key={movement.id}
            movement={movement}
            setEdit={setEdit}
            deleteMovement={deleteMovement}
          />
        ))}
      </div>
    </div>
  );
};

export default MovementList;