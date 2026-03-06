import axios from 'axios'

const API = `${import.meta.env.VITE_API_URL || 'https://predictmaint-production.up.railway.app'}/api`

export const getReadingsByEquipment = async (equipmentId) => {
  try {
    const response = await axios.get(API + '/readings/equipment/' + equipmentId)
    return response.data
  } catch (error) {
    throw error
  }
}

// /last limita a 10 registros para no sobrecargar la tabla del modal
export const getLastReadings = async (equipmentId) => {
  try {
    const response = await axios.get(API + '/readings/equipment/' + equipmentId + '/last')
    return response.data
  } catch (error) {
    throw error
  }
}

export const createReading = async (equipmentId, data) => {
  try {
    const response = await axios.post(API + '/readings/equipment/' + equipmentId, data)
    return response.data
  } catch (error) {
    throw error
  }
}
