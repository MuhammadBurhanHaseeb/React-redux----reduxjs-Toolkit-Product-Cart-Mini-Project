import axios from 'axios'
export function fetchProducts() {
 return axios.get('http://localhost:8000/products')
}
