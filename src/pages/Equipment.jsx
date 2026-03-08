import Navbar from "../components/Navbar"
import EquipmentFilter from "../components/EquipmentFilter"
import EquipmentGrid from "../components/EquipmentGrid"
import EquipmentHeader from "../components/EquipmentHeader"
import "../styles/Equipment.css"

function Equipment({ setPage }) {
  return (
    <>
      <Navbar setPage={setPage} />
      <EquipmentHeader />
      <EquipmentFilter />
      <EquipmentGrid />
    </>
  )
}

export default Equipment