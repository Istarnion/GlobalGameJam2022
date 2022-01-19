import Howl from "howler";

class AudioManager {
    clips: Record<string, Howl.Howl>;

    constructor() {
        this.clips = {};

        this.load('musicloop', './res/Game_Loop.mp3', true);
    }

    load(name: string, src: string | string[], loop: boolean, volume = 1): void {
        const clip = new Howl.Howl({
            src: src,
            loop: loop,
            volume: volume
        });

        this.clips[name] = clip;
    }

    play(name: string, volume = 1): void {
        const clip = this.clips[name];
        clip.volume(volume);
        this.clips[name].play();
    }
}

const audio = new AudioManager();
export default audio;
