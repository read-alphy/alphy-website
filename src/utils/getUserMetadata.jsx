
import axios from 'axios';
import { API_URL } from '../constants';

export default async function getUserMetadata(idToken){
        
    const userMetadata = await axios.get(`${API_URL}/fe-metadata`, {
        headers: {
            'id-token': idToken,
        },
    }).then((response) => {
        
        return response.data
          
    })
    .catch((error) => {
        console.error('Error in getUserMetadata:', error)
        return null
    })

    return userMetadata
}


