import axios from 'axios'

const API = `${import.meta.env.VITE_API_URL || 'https://predictmaint-production.up.railway.app'}/api`

export const getWorkOrders = async () => {
  try {
    const response = await axios.get(API + '/workorders')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getWorkOrdersByEquipment = async (equipmentId) => {
  try {
    const response = await axios.get(API + '/workorders/equipment/' + equipmentId)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createWorkOrder = async (equipmentId, data) => {
  try {
    const response = await axios.post(API + '/workorders/equipment/' + equipmentId, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateWorkOrderStatus = async (id, status) => {
  try {
    const response = await axios.patch(API + '/workorders/' + id + '/status', null, { params: { status } })
    return response.data
  } catch (error) {
    throw error
  }
}
