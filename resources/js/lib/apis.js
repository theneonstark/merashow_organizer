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

export const createEvent = async (data) => {
  try {
    const res = await axios.post("/events/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Event creation failed", err);
    throw err;
  }
};

export const getEvents = async () => {
  return await axios.get("/events/list");
};

export const updateEvent = (id, data) => axios.post(`/events/update/${id}`, data);

export const toggleEventStatus = (id) => axios.post(`/events/toggle-status/${id}`);

export const deleteEvent = (id) => axios.delete(`/events/delete/${id}`);