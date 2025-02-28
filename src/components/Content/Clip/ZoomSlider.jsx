import { Slider } from "@/components/ui/slider";

export default function ZoomSlider ({zoomLevel, setZoomLevel, waveSurferRef}) {
    
return(
    <Slider
        min={0}
        defaultValue={[0]}
        max={100}
        value={[zoomLevel]}
        className="max-w-[200px] xs:max-w-[300px]"
        onValueChange={(value) => {
            const minPxPerSec = value[0]
            setZoomLevel(minPxPerSec)
            waveSurferRef.current.zoom(minPxPerSec/10)
        }}
    />
)

}