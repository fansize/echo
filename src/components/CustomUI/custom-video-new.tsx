import { useEffect, useState, useRef } from 'react';
import { Caption } from '@/interface/Caption';
import { timeToMilliseconds } from '@/lib/api';
import YouTube, { YouTubeProps, YouTubePlayer, YouTubeEvent } from 'react-youtube';
import ReactPlayer from 'react-player/youtube'

type Props = {
    caption: Caption;
    autoNextCaption: () => void;
    onClickSwitch: (direction: "previous" | "next") => void;
    uploadVideoUrl: string;
    defaultPlay?: boolean;
};

export default function VideoComponent({
    caption,
    autoNextCaption,
    onClickSwitch,
    uploadVideoUrl,
}: Props) {

    const videoRef = useRef<ReactPlayer>(null);
    const [playState, setPlayState] = useState(false);

    // basic youtube props
    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // start: 600,
            // end: 605,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            autohide: 1,
            // autoplay: 1,
        },
    };

    // 单次播放函数
    const playFromStartToEnd = (
        start: number,
        end: number,
    ) => {
        if (videoRef.current) {
            videoRef.current.seekTo(start);
            setPlayState(true);



        }
        const checkTime = setInterval(() => {
            if (videoRef.current && videoRef.current.getCurrentTime() >= end) {
                setPlayState(false);
                clearInterval(checkTime);
            }
        }, 100); // 每秒检查一次
    };

    const onError = (error: YouTubeEvent) => {
        console.error('YouTube Player Error:', error);
    };

    useEffect(() => {
        console.log('caption:', caption);
        // console.log('state:', playState);

        // videoRef.current?.seekTo(Number(caption.start));
        // setPlayState(true);
        playFromStartToEnd(Number(caption.start), Number(caption.end));

    }, [caption]);

    return (
        <div className='overflow-hidden rounded-xl'>
            <ReactPlayer
                ref={videoRef}
                url={uploadVideoUrl}
                width="100%"
                height={400}
                playing={playState}
            />
        </div>
    );
};

