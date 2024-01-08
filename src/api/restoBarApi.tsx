import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = 'https://restobar-api-f773db51a259.herokuapp.com/api'

const restoBarApi = axios.create({ baseURL });

restoBarApi.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['x-access-token'] = token;
        }
        // console.log(config, token, 'desde interceptor')
        return config;
    }
)

export default restoBarApi;