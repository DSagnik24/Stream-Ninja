import React from 'react'

function VideoPlayer({ src }) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
  
    useEffect(() => {
      //for init
  
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        muted: true,
        preload: "auto",
        download: true,
      });

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play();
        });
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = src;
        videoRef.current.addEventListener("canplay", () => {
          videoRef.current.play();
        });
      } else {
        console.log("video format not supportted");
        toast.error("Video format not supporteds");
      }
    }, [src]);
}

export default VideoPlayer
