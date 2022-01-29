import Howl from "howler";

class AudioManager {
    clips: Record<string, Howl.Howl>;

    constructor() {
        this.clips = {};

        this.load('menu', './res/audio/music/menu.mp3', true);
        this.load('pee', './res/audio/sfx/pee.mp3', false);
        this.load('battle', './res/audio/music/battle.mp3', true);
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


    fadeOut(name: string, duration: number) {
        let sound = this.clips[name];
        sound.fade(sound.volume(), 0, duration);
        sound.on('fade', () => {
            sound.stop();
        });
    }
}

const audio = new AudioManager();
export default audio;
