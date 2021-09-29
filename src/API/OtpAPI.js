import axiosClient from "./axiosClient";

const OtpAPI = {
    get(data){
        const url = "/email/otp";
        return axiosClient.post(url, data);
    },
    post(data){
        const url = "/email/verifyemail";
        return axiosClient.post(url,data);
    }
}

export default OtpAPI;