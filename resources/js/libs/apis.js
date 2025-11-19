import axios from "axios";
const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.content;

export const Login = async (data) => {
    try {
        const response = await axios.post('/auth/check', {
                _token: csrfToken, // Automatically include the CSRF token
                ...data
        });
        return response; // Directly returning the data
    } catch (error) {
        console.error('Error fetching business statistics:', error);
        throw error; // Re-throw the error for handling in the component
    }
};

export const register = async (data) => {
    try{
        const res = await axios.post('/register', data);
    return res;
    }catch(err){
        console.error('Something Went Wrong', err);
        throw err;
    }
}

export const onBoarding = async (data) => {
    try{
        const res = await axios.post('/auth/onboarding', data, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
        return res;
    }catch(err){
        console.error('Something Went Wrong', err);
        throw err;
    }
}