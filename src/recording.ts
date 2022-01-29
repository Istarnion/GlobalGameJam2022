import FrameRecording from "./framerecording";

export default class Recording {
    recordings: Array<FrameRecording> = [];
    currentIndex = 0;
    backwards = false;

    add(frameRecording: FrameRecording) {
        this.recordings.push(frameRecording);
    }

    get(index: number): FrameRecording {
        return this.recordings[index];
    }

    getNext(): FrameRecording {
        const frameRecording = this.recordings[this.currentIndex];

        if (this.backwards) {
            this.currentIndex--;
            if (this.currentIndex == 0) {
                this.backwards = false;
            }
        }
        else {
            this.currentIndex++;
            if (this.currentIndex == this.recordings.length - 1) {
                this.backwards = true;
            }
        }

        return frameRecording;
    }
}