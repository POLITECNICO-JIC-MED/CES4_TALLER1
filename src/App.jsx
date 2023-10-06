import { useState } from 'react'
import Header from "./components/Header";
import Form from "./components/Form";
import MovementList from './components/MovementList';
import style from './App.module.css'
import CustomModal from "./components/CustomModal";

function App() {
  const [count, setcount] = useState(0);
  const [inputValorIncial, setinputValorIncial] = useState(0);
  const [inputValorFinal, setinputValorFinal] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [InputNombre, setInputNombre] = useState("");
  const [InputCantidad, setInputCantidad] = useState(0);
  const [movements,setmovements]=useState([]);
  const [edit, setEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [titleModal,settitleModal]=useState("");
  const [validationMessages, setValidationMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Todos");

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className={style.container}>
      <div>
        <Header
          inputValorIncial={inputValorIncial}
          setinputValorIncial={setinputValorIncial}
          inputValorFinal={inputValorFinal}
          setinputValorFinal={setinputValorFinal}
          movements={movements}
          setcount={setcount}
        />
      </div>
      <div className={style.containerForm}>
      <Form
          setcount={setcount}
          inputValorIncial={inputValorIncial}
          inputValorFinal={inputValorFinal}
          setinputValorFinal={setinputValorFinal}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setInputNombre={setInputNombre}
          InputNombre={InputNombre}
          setInputCantidad={setInputCantidad}
          InputCantidad={InputCantidad}
          setmovements={setmovements}
          movements={movements}
          edit={edit}
          setEdit={setEdit}
          showModal={showModal}
          setShowModal={setShowModal}
          titleModal={titleModal}
          settitleModal={settitleModal}
          validationMessages={validationMessages}
          setValidationMessages={setValidationMessages}

      />
      </div>
      <div className={style.containerList}>
      <MovementList
        count={count}        
        movements={movements}
        setmovements={setmovements}
        setEdit={setEdit}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      </div>
        
          
      
      <CustomModal
          isOpen={showModal}
          title={titleModal}
          messages={validationMessages}
          onRequestClose={closeModal}
          
      />
    </div>
    
  )
}

export default App
