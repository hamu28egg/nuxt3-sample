import {inject, ref} from "vue"
import {defineStore} from "pinia"
import {API} from "@/utilities"
import {getApiEndpoint} from "@/common/constants/api"
import {useRuntimeConfig} from "#app"
import {Data, Post, Posts} from "~/@types/Posts"


type PostDisplay = Post & {
    id: string
        regist_datetime_yyyymmdd: string
}

export const usePostsStore = defineStore("posts", () => {
    const config = useRuntimeConfig()
    const posts = ref<Posts>({})

    // methods

    const getPosts = () => {
        const _ = inject("lodash")
        return _.map(posts.value, function (e: Data<Posts>) {
            return getDisplayPosts(e)
        })
    }

    const getPost = (id: string) => {
        const e = posts.value[id]
        return getDisplayPosts(e)
    }

    const getDispalyPosts = (e: Data<Post>): Partial<PostDisplay> => {
        if(!e) {
            return {}
        }
        const moment= inject("moment")
        const data = e.data
        return {
            id: e.id,
            ...data,
            regist_datetime_yyyymmdd: data.regist_datetime
             ? moment(data.regist_datetime).format("YYYY/MM/DD")
             : "",
        } as PostDisplay
    }
    
    const fetchPosts = async () => {
        const _ = inject("lodash")
        const response = await API.get(getApiEndpoint(config).POSTS)
        posts.value = _.mapKeys(response, "id")
    }

    const fetchPost = async (id: string) => {
        const response = await API.get(`${getApiEndpoint(config).POSTS}/${id}`)
        posts.value = {...posts.value, [id]: response}
    }

    return {
        getPosts,
        getPost,
        fetchPosts,
        fetchPost
    }
})

