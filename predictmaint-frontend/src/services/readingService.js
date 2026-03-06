import axios from 'axios'

const API = 'http://localhost:8080/api'

export const getReadingsByEquipment = async (equipmentId) => {
  try {
    const response = await axios.get(API + '/readings/equipment/' + equipmentId)
    return response.data
  } catch (error) {
    throw error
  }
}

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
