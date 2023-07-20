import axios from 'axios';
export const apiClient = {
    async get(url){
        try{
        const response = await axios.get(url);
        console.log('data from network ', response);
        return response.data;
        }
        catch(err){
            return err;
        }
    }
}