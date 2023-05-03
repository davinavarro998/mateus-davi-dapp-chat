
import styles from "../styles/GenericForm.module.css"
import GenericButton from "./GenericButton"

const GenericForm = ({inputPlaceHolder, btnOnClick ,buttonPlaceHolder,label,handleOnChange})=>{

    return (
      <div className={styles.genericForm}>
        <img src="https://2ndmarket.com.br/icon.svg" alt="secondCircleLogo" />
        {label ? <p>{label}</p> : <></>}
        <input
          onChange={handleOnChange}
          type="text"
          placeholder={inputPlaceHolder}
        />
        <GenericButton textContent={buttonPlaceHolder} onClick={btnOnClick} />
      </div>
    );
}

export default GenericForm