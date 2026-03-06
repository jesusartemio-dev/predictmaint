import axios from 'axios'

const API = 'http://localhost:8080/api'

export const getEquipment = async () => {
  try {
    const response = await axios.get(API + '/equipment')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEquipmentById = async (id) => {
  try {
    const response = await axios.get(API + '/equipment/' + id)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getEquipmentByArea = async (area) => {
  try {
    const response = await axios.get(API + '/equipment/area/' + area)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createEquipment = async (data) => {
  try {
    const response = await axios.post(API + '/equipment', data)
    return response.data
  } catch (error) {
    throw error
  }
}
