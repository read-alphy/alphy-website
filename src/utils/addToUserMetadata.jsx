import axios from 'axios';
import { API_URL } from '../constants';
import getUserMetadata from './getUserMetadata';

export default async function addToUserMetadata(idToken, additionalMetadata){


    try {
        // Get current user metadata
        const currentUserMetadata = await getUserMetadata(idToken);

        // Combine current metadata with additional metadata
        const combinedMetadata = { ...currentUserMetadata, ...additionalMetadata };
        console.log(combinedMetadata)

        // Post request to update metadata
        const response = await axios.post(`${API_URL}/fe-metadata`, combinedMetadata, {
            headers: {
                'id-token': idToken,
            },
        });

        
        return response.data;
    } catch (error) {
        // Handle errors here
        console.error('Error in addToUserMetadata:', error);
        throw error; // Or handle it as per your application's error handling policy
    }
}
