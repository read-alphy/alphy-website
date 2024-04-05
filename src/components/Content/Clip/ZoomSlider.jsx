
import Slider from '@mui/material/Slider';

export default function ZoomSlider ({zoomLevel, setZoomLevel, waveSurferRef}) {


    


return(
    <Slider
          min={0}
          defaultValue={0}
          max={100}
          value={zoomLevel}
          className="max-w-[200px] xs:max-w-[300px]"
          color='primary'
          onChange={(e, value) => {

            const minPxPerSec = value
            setZoomLevel(minPxPerSec)
            waveSurferRef.current.zoom(minPxPerSec/10)
          }
          }
          />
)

}