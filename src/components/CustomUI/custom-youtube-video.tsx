import { useEffect, useState } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer, YouTubeEvent } from 'react-youtube';
import { Caption } from '@/interface/Caption';
import { timeToMilliseconds } from '@/lib/api';

type Props = {
    caption?: Caption;
    autoNextCaption: () => void;
    onClickSwitch: (direction: "previous" | "next") => void;
    uploadVideoUrl: string;
    defaultPlay?: boolean;
};

export default function YouTubeVideo({
    caption,
    autoNextCaption,
    onClickSwitch,
    uploadVideoUrl,
}: Props) {
    const [startNumber, setStartNumber] = useState(0);
    const [endNumber, setEndNumber] = useState(0);
    const [player, setPlayer] = useState<YouTubePlayer | null>(null);

    const [shouldSeek, setShouldSeek] = useState(false);

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // start: startNumber,
            // end: endNumber,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            autohide: 1,
            // autoplay: 1,
        },
    };

    const onReady = (event: any) => {
        const player = event.target;
        setPlayer(player);
        console.log('onReady:', player);
        player.playVideo();
    };

    const onError = (error: any) => {
        console.error('YouTube Player Error:', error);
    };

    useEffect(() => {
        if (caption) {
            setStartNumber(timeToMilliseconds(caption.start));
            player.seekTo(startNumber / 1000, true);
            console.log('seekTo:', startNumber / 1000);
        }
    }, [caption]);

    return (
        <div className='relative w-full pt-[56.25%]'>
            <YouTube
                videoId={uploadVideoUrl}
                opts={opts}
                onReady={onReady}
                onError={onError}
                // onStateChange={onStateChange}
                iframeClassName='absolute inset-0 w-full h-full rounded-lg'
            />
        </div>
    );
};

