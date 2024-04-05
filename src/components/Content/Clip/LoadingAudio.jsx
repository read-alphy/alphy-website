import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useTheme} from 'next-themes';



export default function LoadingAudio({percentLoaded, isLoading}) {

    const {theme} = useTheme();
    

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className={`w-[200px] text-sm`}>
            <CircularProgressbar value={percentLoaded} text={`${percentLoaded<100 ? (percentLoaded+ "%") : "Last touches..."}`} 
            styles={buildStyles({            
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                
            
                // Text size
                textSize: '8px',
                

        
            
                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',
            
                // Colors
                pathColor: `rgba(153, 153, 255, ${percentLoaded / 100})`,
                trailColor: theme!=='light' ? '#3f3f46' : '#6b7280',
                textColor: theme!=='light' ? "#cbd5e1" : '#334155',
        
              })}/>
            </div>
        </div>
    );
}
