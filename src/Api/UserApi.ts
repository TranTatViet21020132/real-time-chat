import axiosClient from "./AxiosClient";

class UserApi {

    signin = async (data: object) => {
        const url = '/api/user/login/';
        return await axiosClient.post(url, data);
    }

    requestResetPassword = async (data: object) => {
        const url = '/api/user/passwordreset/';
        return await axiosClient.post(url, data);
    }
    
    resetPassword = async (data: object) => {
        const url = '/api/user/passwordreset/confirm/';
        return await axiosClient.post(url, data);
    }

    changePassword = async (data: object) => {
        const url = '/api/user/change-password/'
        return await axiosClient.put(url, data);
    }

    getFriends = async () => {
        const url = '/api/user/friends/';
        return await axiosClient.get(url);
    }
}

export default new UserApi();

