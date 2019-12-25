import axios from "axios"

const baseUrl = "http://localhost:3001/api/prices"

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async (name) => {
  const res = await axios.get(`${baseUrl}/${name}`)
  return res.data
}

export default { getAll, getOne }