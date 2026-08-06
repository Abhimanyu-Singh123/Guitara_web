import { useRef, useState, useEffect } from "react";


import "../../app/styles/myPractice.css";
type Song = {
    title: string;
    audio: string;
    lyrics: string;
    image?: string;
    artist?: string;
};
type RecordingItem = {
    title: string;
    type: "solo" | "mix";
    recordDuration: number;   // 🔥 ADD
    songDuration: number;     // 🔥 ADD
    date: string;
    url: string;
    score: number;
    label: string;
};

function MyPractice() {
    const [isLoaded, setIsLoaded] = useState(false);
    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result as string);
        });
    };

    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioMap = useRef<{ [key: number]: HTMLAudioElement }>({});
    const applyModeAudio = (mode: "solo" | "mix") => {
        if (!audioRef.current) return;

        if (mode === "solo") {
            audioRef.current.muted = true;   // 🔇 SOLO
        } else {
            audioRef.current.muted = false;  // 🔊 MIX
        }
        if (mode === "solo" && audioRef.current) {
            audioRef.current.muted = true;
            audioRef.current.volume = 0;   // 🔥 FORCE
        }
    };
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingMode, setPendingMode] = useState<"solo" | "mix" | null>(null);
    const confirmSwitch = () => {
        stopRecording();

        setActiveRecorder(pendingMode);
        setRecordMode(pendingMode);

        setRecordTime(0);
        setHasRecording(false);
        setRecordedURL(null);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        setShowConfirm(false);
        applyModeAudio(pendingMode!);
    };
    const handleSwitch = (mode: "solo" | "mix") => {

        // 🔥 ONLY warn when actual recording running (timer > 0 + recording ON)
        if (activeRecorder && (isRecording || recordTime > 0)) {
            setPendingMode(mode);   // 🔥 new state
            setShowConfirm(true);
            return;
        }

        // 🔥 NORMAL SWITCH (no warning)
        setActiveRecorder(mode);
        setRecordMode(mode);

        setRecordTime(0);        // 🔥 RESET TIMER
        setHasRecording(false);
        setRecordedURL(null);

        setIsPaused(true);
        setIsPlaying(false);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        applyModeAudio(mode);
    };
    const recordTimeRef = useRef(0);

    const startTimer = () => {
        // 🔥 pehle purana interval band karo
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setRecordTime(prev => {
                recordTimeRef.current = prev + 1; // 🔥 real value store
                return prev + 1;
            });
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;   // 🔥 important
        }
    };
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);
    const startVoiceOnly = async () => {
        if (!audioRef.current) return;

        setRecordMode("solo");
        setIsRecording(true);

        audioRef.current.muted = true;
        audioRef.current.volume = 0;
        audioRef.current.play();
        setIsPlaying(true);
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false,
                channelCount: 1,
                sampleRate: 44100
            }
        });

        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        chunksRef.current = [];
        setRecordedURL(null);
        setHasRecording(false);   // 🔥 ADD THIS
        recorder.ondataavailable = (e) => {
            chunksRef.current.push(e.data);
        };

        recorder.onstop = async () => {
            const blob = new Blob(chunksRef.current, { type: "audio/webm" });
            const base64 = await blobToBase64(blob);
            const score = Math.floor(60 + Math.random() * 30);

            const newRecording: RecordingItem = {
                title: currentSong.title,
                type: recordMode!,
                recordDuration: recordTimeRef.current,       // 🎤 actual recording
                songDuration: duration,           // 🎵 real song length
                date: new Date().toISOString(),
                url: base64,
                score: score,   // 🔥 FIXED VALUE
                label:
                    score > 75 ? "Very Good"
                        : score > 65 ? "Good"
                            : "Average"

            };

            setRecordings(prev => [newRecording, ...prev]);

            setRecordedURL(prev => {
                if (prev) URL.revokeObjectURL(prev);
                return base64;
            });

            setIsRecording(false);
            stopTimer();
            setHasRecording(true);
        };

        recorder.start();
        startTimer();
    };
    const startWithMusic = async () => {
        if (!audioRef.current) return;
        audioRef.current.muted = false;
        audioRef.current.volume = 1;   // 🔥 full music
        setRecordMode("mix");
        setIsRecording(true);
        setRecordedURL(null);
        setHasRecording(false);

        audioRef.current.muted = false;
        audioRef.current.play();
        setIsPlaying(true);

        // 🎧 AUDIO CONTEXT
        const audioContext = new AudioContext();

        // 🎤 MIC
        const micStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false
            }
        });
        const micSource = audioContext.createMediaStreamSource(micStream);


        // 🎵 SONG
        const songStream = (audioRef.current as any).captureStream();
        const songSource = audioContext.createMediaStreamSource(songStream);

        // 🔥 DESTINATION (FINAL MIX)
        const destination = audioContext.createMediaStreamDestination();
        micSource.connect(destination);
        songSource.connect(destination);
        // 🔥 CONNECT BOTH
        songSource.connect(audioContext.destination);
        const recorder = new MediaRecorder(destination.stream);
        mediaRecorderRef.current = recorder;
        chunksRef.current = [];

        recorder.ondataavailable = (e) => {
            chunksRef.current.push(e.data);
        };

        recorder.onstop = async () => {
            const blob = new Blob(chunksRef.current, { type: "audio/webm" });
            const base64 = await blobToBase64(blob);
            const score = Math.floor(60 + Math.random() * 30);

            const newRecording: RecordingItem = {
                title: currentSong.title,
                type: recordMode!,
                recordDuration: recordTimeRef.current,       // 🎤 actual recording
                songDuration: duration,           // 🎵 real song length
                date: new Date().toISOString(),
                url: base64,
                score: score,   // 🔥 FIXED VALUE
                label:
                    score > 75 ? "Very Good"
                        : score > 65 ? "Good"
                            : "Average"
            };

            setRecordings(prev => [newRecording, ...prev]); // 🔥 ADD THIS

            setRecordedURL(base64);

            setIsRecording(false);
            stopTimer();
            setHasRecording(true);
        };

        recorder.start();
        startTimer();


        // 🔥 user ko bhi sunai de
    };
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const stopRecording = () => {
        if (!mediaRecorderRef.current) return;

        if (mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }

        if (audioRef.current) {
            audioRef.current.pause();
        }

        setIsPaused(false);
        setIsPaused(true);     // 🔥 force ▶
        setIsPlaying(false);   // 🔥 sync
    };
    const formatRecordTime = (time: number) => {
        const min = Math.floor(time / 60);
        const sec = time % 60;
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    };
    const formatDateTime = (dateStr: string | number | Date) => {
        const d = new Date(dateStr);
        return d.toLocaleString([], {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    useEffect(() => {
        const close = () => setOpenMenu(null);
        window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, []);
    const togglePause = () => {
        if (!audioRef.current) return;

        if (!isPaused) {
            audioRef.current.pause();
            stopTimer();
            setIsPaused(true);
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            startTimer();
            setIsPaused(false);
            setIsPlaying(true);
        }
    };
    const restartRecording = () => {
        if (!audioRef.current) return;

        // 🔥 audio reset + play
        audioRef.current.currentTime = 0;
        audioRef.current.play();

        // 🔥 state reset
        setIsPlaying(true);
        setRecordTime(0);
        setIsPaused(false);

        // 🔥 OLD recorder stop (if running)
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }

        // 🔥 delay to allow onstop finish
        setTimeout(() => {
            if (recordMode === "solo") startVoiceOnly();
            else if (recordMode === "mix") startWithMusic();
        }, 200);
    };
    const [recordings, setRecordings] = useState<RecordingItem[]>([]);
    useEffect(() => {
        const saved = localStorage.getItem("recordings");

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const valid = parsed.filter((r: any) => r.url && r.recordDuration);
                setRecordings(valid);
            } catch {
                setRecordings([]);
            }
        }

        setIsLoaded(true); // 🔥 IMPORTANT
    }, []);

    useEffect(() => {
        if (!isLoaded) return; // 🔥 STOP overwrite

        localStorage.setItem("recordings", JSON.stringify(recordings));
    }, [recordings, isLoaded]);
    const [hasRecording, setHasRecording] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [lastVolume, setLastVolume] = useState(0.6);
    const [isMuted, setIsMuted] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<any[]>([]);

    const [activeRecorder, setActiveRecorder] = useState<"solo" | "mix" | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordMode, setRecordMode] = useState<"solo" | "mix" | null>(null);
    const [recordTime, setRecordTime] = useState(0);
    const [recordedURL, setRecordedURL] = useState<string | null>(null);
    const timerRef = useRef<any>(null);
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [lyrics, setLyrics] = useState<any[]>([]);
    const [recent, setRecent] = useState<Song[]>([]);
    const parseLRC = (text: string) => {
        const lines = text.split("\n");

        return lines.map(line => {
            const match = line.match(/\[(\d+):(\d+\.\d+)\](?:\{(.*?)\})?(.*)/);

            if (!match) return null;

            const min = parseInt(match[1]);
            const sec = parseFloat(match[2]);

            return {
                time: min * 60 + sec,
                chord: match[3] || "",   // 👈 optional
                text: match[4].trim()
            };
        }).filter(Boolean);
    };
    const songs: Song[] = [
        {
            title: "Kesariya",
            audio: "/audio/kesariya.mp3",
            lyrics: "/lyrics/kesariya.lrc",
            image: "/images/kesariya.png",
            artist: "Arijit Singh"
        },
        {
            title: "Husn",   // 🔥 SEARCH NAME
            audio: "/audio/husn.mp3",   // 👈 tera instrumental
            lyrics: "/lyrics/husn.lrc",                // 👈 IMPORTANT
            image: "/images/husn.png",
            artist: "Anuv Jain"
        }
    ];

    const handleSelect = (song: Song) => {
        setCurrentSong(song);

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
        }

        setCurrentTime(0);
        setIsPlaying(false);
        setShowDropdown(false);

        // 🔥 RECENT ADD
        setRecent(prev => {
            const filtered = prev.filter(s => s.title !== song.title);
            return [song, ...filtered].slice(0, 3);
        });
    };
    useEffect(() => {
        const handleClick = () => setShowDropdown(false);

        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
    }, []);
    const [currentSong, setCurrentSong] = useState<Song>(songs[0]!);
    const activeRef = useRef<HTMLParagraphElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.6);


    const formatTime = (time: number) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    };
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onEnd = () => {
            setIsPlaying(false);
        };

        audio.addEventListener("ended", onEnd);

        return () => audio.removeEventListener("ended", onEnd);
    }, []);

    // PLAY / PAUSE
    const togglePlay = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    // UPDATE TIME
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const update = () => setCurrentTime(audio.currentTime);
        const loaded = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", update);
        audio.addEventListener("loadedmetadata", loaded);


        return () => {
            audio.removeEventListener("timeupdate", update);
            audio.removeEventListener("loadedmetadata", loaded);
        };

    }, []);


    useEffect(() => {
        if (!activeRef.current) return;

        const container = activeRef.current.parentElement;
        if (!container) return;

        const top = activeRef.current.offsetTop - container.clientHeight / 2;

        container.scrollTo({
            top,
            behavior: "smooth"
        });
    }, [currentTime]);
    useEffect(() => {
        if (!currentSong.lyrics) {
            setLyrics([]);
            return;
        }

        fetch(currentSong.lyrics + "?t=" + new Date().getTime())
            .then(res => res.text())
            .then(text => {
                const parsed = parseLRC(text);
                setLyrics(parsed);
            });
    }, [currentSong]);
    // SEEK
    const handleSeek = (e: any) => {
        const value = e.target.value;
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
        }
    };

    // VOLUME
    const handleVolume = (e: any) => {
        const value = e.target.value;

        if (!audioRef.current) return;

        audioRef.current.volume = value;
        setVolume(value);

        // 🔥 AUTO FIX ICON
        if (value > 0) {
            setIsMuted(false);
        } else {
            setIsMuted(true);
        }
    };
    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase())
    );
    const handleSearchClick = () => {
        if (filteredSongs.length > 0) {
            handleSelect(filteredSongs[0]); // 🔥 first match select
        } else {
            alert("Song not found");
        }
    };
    const totalRecordings = recordings.length;

    // ✅ SAFE unique songs
    const uniqueSongs = recordings.length
        ? [...new Set(recordings.map(r => r.title))].length
        : 0;

    // ✅ SAFE last practice
    const lastPractice: RecordingItem | null =
        recordings.length ? recordings[0] : null;

    // ✅ SAFE total time
    const totalTime = recordings.length
        ? recordings.reduce((acc: number, r: RecordingItem) => acc + r.recordDuration, 0)
        : 0;

    // ✅ FORMAT
    const formatTotalTime = (sec: number) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;

        return `${h}h ${m}m ${s}s`;
    };
    return (
        <>
            <div className="practice-wrapper">
                <div className="practice-page">

                    {/* HEADER */}
                    <div className="practice-header">
                        <div>
                            <h1>My Practice</h1>
                            <p>Practice, record and improve your guitar skills</p>
                        </div>

                        <div className="search-box">
                            <span className="search-icon left">
                                <i className="ri-search-line"></i>
                            </span>

                            <input
                                placeholder="Search for songs..."
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setShowDropdown(true);
                                }}
                                onFocus={() => setShowDropdown(true)}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (filteredSongs.length > 0) {
                                            handleSelect(filteredSongs[0]);
                                        } else {
                                            alert("Song not found");
                                        }
                                    }
                                }}
                            />
                            {showDropdown && (
                                <div
                                    className="search-dropdown"
                                    onClick={(e) => e.stopPropagation()}
                                >

                                    {/* 🔥 CASE 1: EMPTY → RECENT */}
                                    {query === "" && recent.length > 0 && (
                                        <>
                                            <p className="dropdown-title">Recent</p>

                                            {recent.map((song, i) => (
                                                <div
                                                    key={i}
                                                    className="dropdown-item"
                                                    onClick={() => handleSelect(song)}
                                                >
                                                    🕒 {song.title}
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {/* 🔥 CASE 2: SEARCH RESULT */}
                                    {query !== "" && filteredSongs.length > 0 && (
                                        <>
                                            {filteredSongs.map((song, i) => (
                                                <div
                                                    key={i}
                                                    className="dropdown-item"
                                                    onClick={() => handleSelect(song)}
                                                >
                                                    🎵 {song.title}
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {/* 🔥 CASE 3: NOT FOUND */}
                                    {query !== "" && filteredSongs.length === 0 && (
                                        <div className="dropdown-empty">
                                            ❌ Song not found
                                        </div>
                                    )}

                                </div>
                            )}

                            <div className="search-divider"></div>

                            <span
                                className="search-icon right"
                                onClick={handleSearchClick}
                            >
                                <i className="ri-search-line"></i>
                            </span>

                        </div>
                        <button className="tips-btn">Practice Tips</button>

                    </div>

                    {/* PLAYER */}
                    <div className="practice-top">

                        {/* LEFT */}
                        <div className="player-card relative">

                            <h3>Last Played</h3>
                            <div className="player-body">

                                <div className="song-row">
                                    <img src={currentSong.image} />

                                    <div>
                                        <h4>{currentSong.title}</h4>
                                        <p>{currentSong.artist}</p>
                                        <span>Key: C Major</span>
                                    </div>

                                </div>

                                {/* SEEK BAR */}
                                <div className="seek-row">
                                    <span>{formatTime(currentTime)}</span>
                                    <input
                                        className="seek-slider"
                                        type="range"
                                        min="0"
                                        max={duration || 0}
                                        value={currentTime}
                                        onChange={handleSeek}
                                        style={{
                                            background: duration
                                                ? `linear-gradient(to right, #ff7a00 ${(currentTime / duration) * 100}%, #444 ${(currentTime / duration) * 100}%)`
                                                : "#444"
                                        }}
                                    />

                                    <span>{formatTime(duration)}</span>
                                </div>

                                {/* CONTROLS */}
                                <div className="controls">
                                    <button
                                        className="icon-btn"
                                        onClick={() => {
                                            if (!audioRef.current) return;

                                            audioRef.current.currentTime = 0;
                                            setCurrentTime(0);
                                        }}
                                    >
                                        ◀
                                    </button>

                                    <button className="play-btn" onClick={togglePlay}>
                                        {isPlaying ? "⏸" : "▶"}
                                    </button>

                                    <button className="icon-btn">▶</button>

                                    <div className="volume">
                                        <span
                                            className="vol-icon"
                                            onClick={() => {
                                                if (!audioRef.current) return;

                                                if (!isMuted) {
                                                    setLastVolume(audioRef.current.volume);
                                                    audioRef.current.volume = 0;
                                                    setVolume(0);
                                                } else {
                                                    audioRef.current.volume = lastVolume;
                                                    setVolume(lastVolume);
                                                }

                                                setIsMuted(!isMuted);
                                            }}
                                        >
                                            {isMuted ? "🔇" : "🔊"}
                                        </span>

                                        <input
                                            className="volume-slider"
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={volume}
                                            onChange={handleVolume}
                                        />
                                    </div>

                                </div>
                                <div className="recording-controls">
                                    <div className="record-btn-row">

                                        {/* 🔥 SOLO BLOCK */}
                                        <div className="record-item">
                                            <button className="record-btn voice"
                                                onClick={() => handleSwitch("solo")
                                                }>
                                                🎙️ Solo Voice
                                                <span>Record without music audio file</span>
                                            </button>

                                            {activeRecorder === "solo" && (
                                                <div className="mini-recorder">
                                                    <div className="rec-timer">
                                                        {(activeRecorder || hasRecording) && (
                                                            <span className={`rec-dot ${isPaused ? "paused" : ""}`}></span>
                                                        )}
                                                        {formatRecordTime(recordTime)}
                                                    </div>
                                                    <div className="rec-controls">
                                                        <button onClick={restartRecording}>⭮</button>
                                                        <button onClick={togglePause}>
                                                            {isPaused ? "▶" : "⏸"}
                                                        </button>

                                                        <button onClick={stopRecording}>🟥</button>

                                                        {recordedURL && !isRecording && (
                                                            <button onClick={() => setShowPreview(true)}>🎧</button>
                                                        )}

                                                    </div>
                                                    <button
                                                        className="mini-close"
                                                        onClick={() => {
                                                            setActiveRecorder(null);
                                                            setRecordMode(null);   // 🔥 ADD HERE
                                                            setIsPaused(true);

                                                            if (audioRef.current) {
                                                                if (recordMode === "mix") {
                                                                    audioRef.current.muted = false;
                                                                    audioRef.current.volume = volume;   // 🔥 restore music
                                                                } else {
                                                                    audioRef.current.muted = true;
                                                                    audioRef.current.volume = 0;        // 🔥 SOLO silent
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* 🔥 MIX BLOCK */}
                                        <div className="record-item">
                                            <button className="record-btn mix" onClick={() => handleSwitch("mix")}>
                                                🎙️ Voice with Music
                                                <span>Record with music audio file</span>
                                            </button>

                                            {activeRecorder === "mix" && (
                                                <div className="mini-recorder">
                                                    <div className="rec-timer">
                                                        {(activeRecorder || hasRecording) && (
                                                            <span className={`rec-dot ${isPaused ? "paused" : ""}`}></span>
                                                        )}
                                                        {formatRecordTime(recordTime)}
                                                    </div>
                                                    <div className="rec-controls">
                                                        <button onClick={restartRecording}>⭮</button>
                                                        <button onClick={togglePause}>
                                                            {isPaused ? "▶" : "⏸"}
                                                        </button>

                                                        <button onClick={stopRecording}>🟥</button>


                                                        {recordedURL && !isRecording && (
                                                            <button onClick={() => setShowPreview(true)}>🎧</button>
                                                        )}
                                                    </div>
                                                    <button
                                                        className="mini-close"
                                                        onClick={() => {
                                                            setActiveRecorder(null);
                                                            setRecordMode(null);   // 🔥 ADD HERE
                                                            setIsPaused(true);

                                                            if (audioRef.current) {
                                                                if (recordMode === "mix") {
                                                                    audioRef.current.muted = false;
                                                                    audioRef.current.volume = volume;   // 🔥 restore music
                                                                } else {
                                                                    audioRef.current.muted = true;
                                                                    audioRef.current.volume = 0;        // 🔥 SOLO silent
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                </div>
                                {/* AUDIO */}
                                <audio ref={audioRef} src={currentSong.audio} />

                            </div>
                        </div>



                        {/* RIGHT */}
                        <div className="lyrics-card">
                            <div className="practice-overlay">

                                <div className="overlay-chord">
                                    {
                                        lyrics.find((line, i) =>
                                            currentTime >= line.time &&
                                            (lyrics[i + 1]
                                                ? currentTime < lyrics[i + 1].time
                                                : true)
                                        )?.chord
                                    }
                                </div>

                                <div className="overlay-strum">
                                    ↓ ↓ ↑ ↑ ↓ ↑
                                </div>

                            </div>
                            <h3>Lyrics & Chords</h3>

                            {lyrics.length > 0 ? (
                                <div className="lyrics">
                                    {lyrics.map((line, i) => {
                                        const isActive =
                                            currentTime >= line.time &&
                                            (lyrics[i + 1]
                                                ? currentTime < lyrics[i + 1].time
                                                : true);

                                        return (
                                            <p
                                                key={i}
                                                ref={(el) => {
                                                    if (isActive && el) activeRef.current = el;
                                                }}
                                                className={`line ${isActive ? "active" : ""}`}
                                            >
                                                <span className="chord">{line.chord}</span>
                                                <span className="text">{line.text}</span>
                                                {isActive && <span className="playing-icon">⬩➤</span>}
                                            </p>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p style={{ opacity: 0.5, textAlign: "center", marginTop: "20px" }}>
                                    🎵 Instrumental Track — No Lyrics
                                </p>
                            )}
                            {showPreview && recordedURL && (
                                <div className="preview-overlay" onClick={() => setShowPreview(false)}>

                                    <div className="preview-box" onClick={(e) => e.stopPropagation()}>

                                        <h3>Your Recording</h3>

                                        <audio key={recordedURL} controls src={recordedURL}></audio>

                                        <div className="preview-actions">
                                            {recordedURL && !isRecording && (
                                                <button onClick={() => setShowPreview(true)}>🎧</button>
                                            )}

                                        </div>

                                    </div>
                                </div>
                            )}
                            {showConfirm && (
                                <div className="confirm-overlay">
                                    <div className="confirm-box">

                                        <h3>⚠️ Switch Recording Mode?</h3>

                                        <p>
                                            If you switch now, your current recording will be lost and you won't be able to preview it.
                                        </p>

                                        <div className="confirm-actions">
                                            <button className="cancel" onClick={() => setShowConfirm(false)}>
                                                No
                                            </button>

                                            <button className="confirm" onClick={confirmSwitch}>
                                                Yes, Switch
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
                {/* 🔥 PRACTICE HISTORY */}

            </div>

            {/* 🔥 RECORDINGS LIST */}
            <div className="history-card">

                <div className="history-top">
                    <div>
                        <h2>Practice History</h2>
                        <p>All your practice recordings & activity</p>
                    </div>
                </div>

                <div className="history-stats">

                    {/* SONGS */}
                    <div className="stat-box purple">
                        <div className="stat-icon">
                            <i className="ri-music-2-line"></i>
                        </div>
                        <p>Songs Practiced</p>
                        <h3>{uniqueSongs}</h3>
                        <span>Total Songs Practiced</span>
                    </div>

                    {/* LAST PRACTICE */}
                    <div className="stat-box green">
                        <div className="stat-icon">
                            <i className="ri-calendar-line"></i>
                        </div>
                        <p>Last Practice</p>
                        <h3>
                            {lastPractice
                                ? (() => {
                                    const d = new Date(lastPractice.date);
                                    const today = new Date();

                                    const isToday =
                                        d.toDateString() === today.toDateString();

                                    const time = d.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    });

                                    return isToday ? `Today, ${time}` : formatDateTime(d);
                                })()
                                : "—"}
                        </h3>
                        <span>
                            {lastPractice
                                ? `${lastPractice.title} - ${lastPractice.type === "solo" ? "Solo" : "With Music"}`
                                : ""}
                        </span>
                    </div>

                    {/* TOTAL */}
                    <div className="stat-box orange">
                        <div className="stat-icon">
                            <i className="ri-headphone-line"></i>
                        </div>
                        <p>Total Recordings</p>
                        <h3>{totalRecordings}</h3>
                        <span>All time recordings</span>
                    </div>

                    {/* TIME */}
                    <div className="stat-box blue">
                        <div className="stat-icon">
                            <i className="ri-time-line"></i>
                        </div>
                        <p>Practice Time</p>
                        <h3>{formatTotalTime(totalTime)}</h3>
                        <span>Total time spent practicing</span>
                    </div>

                </div>

                {/* 🔥 TABLE */}
                <div className="history-list">

                    <div className="history-header">
                        <span>Song</span>
                        <span>Type</span>
                        <span>Clearity</span>
                        <span>Record Duration</span>
                        <span>Song Length</span>
                        <span>Date & Time</span>
                        <span>Recording</span>
                    </div>

                    {recordings.map((rec, i) => (
                        <div key={i} className="history-row">
                            <div className="desktop-history">

                                <div className="song-info">
                                    <img src={`/images/${rec.title.toLowerCase()}.png`} />
                                    <div>
                                        <h4>{rec.title}</h4>

                                        {/* 🔥 REAL SONG LENGTH */}
                                        <small>
                                            Song: {formatTime(rec.songDuration)}
                                        </small>
                                    </div>
                                </div>

                                <span className={`type ${rec.type === "solo" ? "solo" : "mix"}`}>
                                    {rec.type === "solo" ? "Solo Voice" : "With Music"}
                                </span>
                                <span className="score">
                                    {rec.score}%
                                    <small>{rec.label}</small>
                                </span>
                                <span>{formatRecordTime(rec.recordDuration)}</span>

                                <span>{formatTime(rec.songDuration)}</span>  {/* 🔥 NEW */}

                                <span>{formatDateTime(rec.date)}</span>

                                <div className="actions">

                                    <button
                                        className="play-small"
                                        onClick={() => {
                                            if (!audioMap.current[i]) {
                                                audioMap.current[i] = new Audio(rec.url);
                                            }

                                            const audio = audioMap.current[i];

                                            if (playingId === i) {
                                                audio.pause();
                                                setPlayingId(null);
                                            } else {
                                                // stop previous
                                                Object.values(audioMap.current).forEach(a => a.pause());

                                                audio.play();
                                                setPlayingId(i);

                                                audio.onended = () => setPlayingId(null);
                                            }
                                        }}
                                    >
                                        <i className={playingId === i ? "ri-pause-fill" : "ri-play-fill"}></i>
                                    </button>
                                    <div className="menu">
                                        <i className="ri-more-2-fill"></i>

                                        <div className="menu-dropdown">
                                            <a href={rec.url} download={`${rec.title}.webm`}>
                                                Download
                                            </a>

                                            <button onClick={() => {
                                                setRecordings(prev => prev.filter((_, index) => index !== i));
                                            }}>
                                                Clear History
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="mobile-history">

                                <div className="mobile-actions">
                                    <button
                                        className="play-small"
                                        onClick={() => {
                                            if (!audioMap.current[i]) {
                                                audioMap.current[i] = new Audio(rec.url);
                                            }

                                            const audio = audioMap.current[i];

                                            if (playingId === i) {
                                                audio.pause();
                                                setPlayingId(null);
                                            } else {
                                                Object.values(audioMap.current).forEach(a => a.pause());

                                                audio.play();
                                                setPlayingId(i);

                                                audio.onended = () => setPlayingId(null);
                                            }
                                        }}
                                    >
                                        <i className={playingId === i ? "ri-pause-fill" : "ri-play-fill"}></i>
                                    </button>
                                    <div className="menu">
                                        <i
                                            className="ri-more-2-fill"
                                            onClick={(e) => {
                                                e.stopPropagation();   // 🔥 IMPORTANT
                                                setOpenMenu(openMenu === i ? null : i);
                                            }}
                                        ></i>

                                        {openMenu === i && (
                                            <div className="menu-dropdown">
                                                <a href={rec.url} download={`${rec.title}.webm`}>
                                                    Download
                                                </a>

                                                <button onClick={() => {
                                                    setRecordings(prev => prev.filter((_, index) => index !== i));
                                                    setOpenMenu(null);
                                                }}>
                                                    Clear History
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mobile-info">

                                    <div className="mobile-top">

                                        <div className="mobile-left">
                                            <img src={`/images/${rec.title.toLowerCase()}.png`} />
                                            <div>
                                                <h4>{rec.title}</h4>
                                                <small>Song: {formatTime(rec.songDuration)}</small>
                                            </div>
                                        </div>

                                        <div className="mobile-right">
                                            <div className="type">
                                                {rec.type === "solo" ? "Solo Voice" : "With Music"}
                                            </div>
                                            <div className="score">
                                                {rec.score}%
                                                <small>{rec.label}</small>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mobile-meta">
                                        <div className="meta-item">
                                            <span>{formatRecordTime(rec.recordDuration)}</span>
                                            Record
                                        </div>

                                        <div className="meta-item">
                                            <span>{formatTime(rec.songDuration)}</span>
                                            Song
                                        </div>

                                        <div className="meta-item">
                                            <span>{formatDateTime(rec.date)}</span>
                                            Date
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    ))}

                </div>

            </div>

        </>
    );
}

export default MyPractice;