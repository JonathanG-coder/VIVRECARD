import axios from "axios"
import * as SecuScore  from "expo-secure-store"  // permet de prendre le token et mettre en memoire telephone

export const api = axios.create({
    baseURL: "https://vivrecard-ashy.vercel.app/api",
    // baseURL: "http://localhost:5000/api"
    headers : {
        "Content-Type" : "application/json"
    }
})

//interceptor permet d'intercepter le tokoen et le mettre memoi telephone
api.interceptors.request.use(async(config) => {
    const token = await SecuScore.getItemAsync("token");
        if (token) {
            config.headers.Authorization = 'Bearer ${token}'
        }
        return config;
})