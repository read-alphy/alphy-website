import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '../../../constants'

export const useArchipelago = (
  source_id,
  source_type,
  currentUser,
  setMainPopoverOpen,
  router
) => {
  const handleAddToArchipelago = (archipelagoUID, create) => {
    const newSource = {
      source_id: source_id,
      source_type: source_type,
    }
    
    if (create === false) {
      axios
        .get(
          `${API_URL}/playlists/${archipelagoUID}?nof_questions=10&tracks=true`
        )
        .then(response => {
          axios.patch(
            `${API_URL}/playlists/${archipelagoUID}`,
            {
              user_id: currentUser.uid,
              sources: [...response.data.tracks, newSource],
            }
          )
          setMainPopoverOpen(false)
        })
        .catch(error => {
          console.error('Error fetching archipelago:', error)
        })
    } else if (create === true) {
      axios
        .post(
          `${API_URL}/playlists/`,
          {
            name: title,
            user_id: currentUser.uid,
            sources: [newSource],
          },
          {
            headers: {
              'id-token': currentUser.accessToken,
            },
          }
        )
        .then(response => {
          setMainPopoverOpen(false)
          const arcUID = response.data.uid
          router.push(`/arc/${arcUID}`)
        })
        .catch(error => {
          console.error('Error adding to arc:', error)
          setMainPopoverOpen(false)
        })
    }
  }

  return { handleAddToArchipelago }
}