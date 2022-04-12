import axios from "axios"
import * as _ from "lodash"


const get = async( url: string): Promise<any> => {
    return await request("get", url)
}

const post = async(url: string, values?: any, config?: any): Promise<any> => {
    return await request("post", url, values, config)
}

const put = async(url: string, values?: any, config?: any): Promise<any> => {
    return await request("put", url, values, config)
}

