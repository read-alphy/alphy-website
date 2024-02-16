import { useNavigate } from 'react-router-dom'
import SmartToyIcon from '@mui/icons-material/SmartToy'

export default function ArchipelagoCreationCard({ item, index }) {
  const navigate = useNavigate()

  return (
    <div className="rounded-md cursor-pointer border dark:border-zinc-700 dark:bg-darkMode h-[200px] w-[200px] justify-center items-center  mt-5">
      <div className="px-4 ">
        <div className="w*[180px] h-[40px] ">
          <SmartToyIcon className="text-greenColor mt-8" />
        </div>
        <p className="text-zinc-700 dark:text-zinc-200 text-l mt-16">
          Create a Archipelago
        </p>
      </div>
    </div>
  )
}
