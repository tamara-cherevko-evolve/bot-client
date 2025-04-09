import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

export const axiosGet = <T = any>(url: string, params?: any) =>
  axiosInstance.get<T>(url, params).then((response) => response?.data || null)

export const axiosPost = <T = any>(url: string, body?: any, headers?: any) =>
  axiosInstance.post<T>(url, body, { headers }).then((response) => response?.data || null)

export const axiosPut = (url: string, body?: any) =>
  axiosInstance.put(url, body).then((response) => response?.data || null)

export const axiosDelete = <T = any>(url: string, params?: any) =>
  axiosInstance.delete<T>(url, params).then((response) => response?.data || null)

export default axiosInstance
