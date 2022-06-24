import { BaseUrl } from './index.js'
import axios from 'axios'
import Cookies from 'js-cookie'
import generateConstant, { token } from '../utils/Constants'
import qs from 'qs'


export const registerService = async (data) => {
    try {
        const response = await axios.post(`http://localhost:1339/auth/local/register`, data)
        return response
    } catch (error){
        if (error.response) {
            return error.response.data.message
          }
    }
}

export const newsPost = async (data) => {
    const response = await axios.post(`${BaseUrl}/newsletters/add`, data)
    return response
}



export const loginService = async (data) => {
    try{
        const response = await axios.post(`${BaseUrl}/auth/local`, data)
        Cookies.set(generateConstant(token), response.data.jwt)
        Cookies.set('token', response.data.jwt)
        return response
    } catch(e){
        console.log(e)
    }
}

export const socialLoginService = async (slug, token) => {
    const response = await axios.get(`${BaseUrl}/auth/${slug}/callback?access_token=${token}`)
    Cookies.set(generateConstant(token), response.data.jwt)
    Cookies.set('token', response.data.jwt)
    return response
}

export const generateAuthConfig = () => {
    const authToken = Cookies.get(generateConstant(token))
    return {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  }

export const CMSBlockService = async (slug) => {
    try{
        const response = await axios.get(`${BaseUrl}/cms-blocks?slug=${slug}`)
        return response
    } catch (e) {
        console.log(e)
    }
}

export const blogService = async (slug) => {
    try{
        const { data } = await axios.get(`${BaseUrl}/${slug}`)
        return data
        }
     catch(e) {
        console.log(e)
    }
}

export const userService = async () => {
    try{
        const { data } = await axios.get(`${BaseUrl}/users`, generateAuthConfig())
        return data
        }
     catch(e) {
        console.log(e)
    }
}

export const blogServiceHighlights = async (slug) => {
    try{
            const { data } = await axios.get(`${BaseUrl}/${slug}?stolen=true&_sort=created_at:desc`)
            return data
        }
     catch(e) {
        console.log(e)
    }
}

export const wheelSizes = async () => {
    try{
            const { data } = await axios.get(`${BaseUrl}/wheel-sizes?_sort=size:ASC`)
            return data
        }
     catch(e) {
        console.log(e)
    }
}

export const blogPostService = async (slug, blogData) => {
    try{
            const { data } = await axios.post(`${BaseUrl}/${slug}`, blogData, generateAuthConfig())
            return data
        }
     catch(e) {
        console.log(e)
    }
}

export const blogDataService = async (slug,limit) => {
    try{
        const { data } = await axios.get(`${BaseUrl}/${slug}?_limit=${limit}`)
        return data
        } catch(e) {
        console.log(e)
    }
}
export const cmsPageService =  async (slug) => {
    try {
        const response = await axios.get(`${BaseUrl}/cms-pages?slug=${slug}`)
        return response
    } catch(e) {
        console.log(e)
    }
}

export const blogDetails = async (slug) => {
    try {
        const response = await axios.get(`${BaseUrl}/our-blogs?_slug=${slug}`)
        return response
    } catch(e) {
        console.log(e)
    }
}
export const searchBikeDetail = async (slug) => {
    try {
        const { data } = await axios.get(`${BaseUrl}/bikes?slug=${slug}`)
        return data
    } catch(e) {
        console.log(e)
    }
}
export const postBlogDetails = async (limit) => {
    try {
        const response = await axios.get(`${BaseUrl}/our-blogs?_sort=date:desc&_limit=${limit}`)
        return response
    } catch(e) {
        console.log(e)
    }
}
export const bikeRegisterService = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/bikes`, data, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}
export const bikeUpdateService = async (id, data) => {
    try {
        const response = await axios.put(`${BaseUrl}/bikes/${id}`, data, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const transferOwnership = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/transfer-ownership/email`, data, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const addToHistory = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/histories`, data, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const getBikeHistory = async (id, start, limit) => {
    try {
        const response = await axios.get(`${BaseUrl}/histories?bikes=${id}&_start=${start}&_limit=${limit}`, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const getBikeAllHistory = async (id) => {
    try {
        const response = await axios.get(`${BaseUrl}/histories?bikes=${id}`, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const messageService = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/messages`, data, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const messageEmailService = async (data) => {
    try {
        const response = await axios.post(`${BaseUrl}/messages/send-email`, data, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const readMessageService = async (id, data) => {
    try {
        const response = await axios.put(`${BaseUrl}/messages/${id}`, data, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const messageLength = async (id) => {
    try {
        const response = await axios.get(`${BaseUrl}/messages?reciever=${id}`, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const sentMessageLength = async (id) => {
    try {
        const response = await axios.get(`${BaseUrl}/messages?sender=${id}`, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const getMessage = async (id, start, limit) => {
    try {
        const response = await axios.get(`${BaseUrl}/messages?reciever=${id}&_sort=created_at:desc&_start=${start}&_limit=${limit}`, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const userReceivedMessage = async (recId, sendId, bikeId) => {
    try {
        const response = await axios.get(`${BaseUrl}/messages?reciever=${recId}&sender=${sendId}&bike=${bikeId}&_sort=created_at:desc`, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const getAllMessage = async (id) => {
    try {
        const response = await axios.get(`${BaseUrl}/messages?reciever=${id}&_sort=created_at:desc`, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const getSentMessage = async (id, start, limit) => {
    try {
        const response = await axios.get(`${BaseUrl}/messages?sender=${id}&_sort=created_at:desc&_start=${start}&_limit=${limit}`, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}

export const searchBike = async (body) => {
    try {
        const query = qs.stringify(body)
        const response = await axios.get(`${BaseUrl}/bikes?${query}&_sort=created_at:desc`)
        return response
    } catch(e) {
        console.log(e)
    }
}
export const getStolenBike = async (start,limit) => {
    try {
        const response = await axios.get(`${BaseUrl}/bikes?_start=${start}&_limit=${limit}&_stolen=true&_sort=created_at:desc`)
        return response
    } catch(e) {
        console.log(e)
    }
}
export const ourBlogData = async (slug, body) => {
    try {
        const query = qs.stringify(body);
          
        const { data } = await axios.get(`${BaseUrl}/${slug}?${query}`);
        return data
    }
    catch(e) {
        console.log(e)
    }
}
export const getAllClassified = async (slug) => {
    try {          
        const { data } = await axios.get(`${BaseUrl}/${slug}?on_sale=true`);
        return data
    }
    catch(e) {
        console.log(e)
    }
}
export const ourBlogCategoryData = async (start,limit,categoryId) => {
    try {
        const {data} = await axios.get(`${BaseUrl}/our-blogs?_start=${start}&_limit=${limit}&blog_category=${categoryId}`)
        return data
    }
    catch(e) {
        console.log(e)
    }
}
export const ourBlogSearchData = async (slug, containValue, val, start, limit) => {
    try {
        const { data } = await axios.get(`${BaseUrl}/${slug}?${containValue}=${val}&_start=${start}&_limit=${limit}`)
        return data
    }
    catch(e) {
        console.log(e)
    }
}
export const classifiedDetailData = async (slug) => {
    try {
        const response = await axios.get(`${BaseUrl}/bikes?_slug=${slug}`)
        return response
    }
    catch(e) {
        console.log(e)
    }
}
export const classifiedRelated = async () => {
    try {
        const response = await axios.get(`${BaseUrl}/bikes`)
        return response
    }
    catch(e) {
        console.log(e)
    }
}
export const classifiedPost = async (id, data) => {
    try {
        const response = await axios.post(`${BaseUrl}/bikes?_slug=${id}`, data, generateAuthConfig())
        return response
    } catch(e) {
        console.log(e)
    }
}
export const contact = async (data) => {
    try{
        const response = await axios.post(`${BaseUrl}/contact`, data)
        return response
    }
    catch(e){
        console.log(e)
    }
}
export const donationService = async (data) => {
    try{
        const response = await axios.post(`${BaseUrl}/donations`, data)
        return response
    }
    catch(e){
        console.log(e)
    }
}
export const reviewService = async (id, data) => {
    try{
        const response = await axios.post(`${BaseUrl}/reviews?id=${id}`, data, generateAuthConfig())
        return response
    }
    catch(e){
        console.log(e)
    }
}
export const UploadImageService = async (file) => {
    const response = await axios.post(`${BaseUrl}/upload`, file, generateAuthConfig())
    return response
}
export const getRegisterBikeService = async () => {
    const { data } = await axios.get(`${BaseUrl}/bikes`, generateAuthConfig())
    return data
}
export const getBikeDataService = async (slug) => {
    const { data } = await axios.get(`${BaseUrl}/bikes?slug=${slug}`)
    return data
}
export const getUserIdService = async (email) => {
    const { data } = await axios.get(`${BaseUrl}/users?email=${email}`, generateAuthConfig())
    return data
}
export const findClaimBike = async (code) => {
    const { data } = await axios.get(`${BaseUrl}/bikes?auth_code=${code}`, generateAuthConfig())
    return data
}
export const getRegisterBikeDataService = async (id) => {
    const {data} = await axios.get(`${BaseUrl}/bikes?user.id=${id}`, generateAuthConfig())
    return data
}
export const getBikeSearchData = async (val) => {
    const response = await axios.get(`${BaseUrl}/bikes?model_contains=${val}`, generateAuthConfig())
    return response
}
export const userDetail = async() => {
    const response = await axios.get(`${BaseUrl}/users/me`, generateAuthConfig())
    return response
}
export const userDetailUpdate = async(id, data) => {
    const response = await axios.put(`${BaseUrl}/users/${id}`, data, generateAuthConfig())
    return response
}
export const stolenDetailUpdate = async(id, data) => {
    const response = await axios.put(`${BaseUrl}/bikes/${id}`, data, generateAuthConfig())
    return response
}
export const getRegisterBikeIdService = async (id) => {
    const response = await axios.get(`${BaseUrl}/bikes/${id}`, generateAuthConfig())
    return response
}
export const resetPasswordService = async (data) => {
    const response = await axios.put(`${BaseUrl}/auth/update-password`, data, generateAuthConfig())
    return response
}
export const forgotPasswordService = async (data) => {
    const response = await axios.post(`${BaseUrl}/auth/forgot-password`, data)
    return response
}
export const emailConfirmation = async (data) => {
    const response = await axios.post(`${BaseUrl}/auth/send-email-confirmation`, data)
    return response
}
export const resetForgotPasswordService = async (data) => {
    const response = await axios.post(`${BaseUrl}/auth/reset-password`, data)
    return response
}
export const getCityData = async () => {
    const response = await axios.get(`${BaseUrl}/cities`)
    return response
}
