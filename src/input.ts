import gfx from './graphics';

type KeyState = [ boolean, boolean ];

/**
 * Mapping of key codes to key names
 * We use key names in our code, but we
 * get key codes from the browser input events.
 */
const keyNames: Record<string, string> = {
    "Space": "space",
    "Enter": "enter",
    "ArrowUp": "up",
    "ArrowDown": "down",
    "ArrowLeft": "left",
    "ArrowRight": "right",
    "KeyW": "w",
    "KeyA": "a",
    "KeyS": "s",
    "KeyD": "d",
    "KeyQ": "q",
    "KeyE": "e",
    "Digit1": "one",
    "Digit2": "two",
    "Digit3": "three",
    "Digit4": "four",
    "Digit5": "five"
};

class InputState {
    mouseX: number = 0;
    mouseY: number = 0;
    keys: Record<string, KeyState> = {};
    mouseButton: KeyState = [ false, false ];

    constructor() {
        for(const keyCode in keyNames) {
            this.keys[keyNames[keyCode]] = [ false, false ];
        }

        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            const key = keyNames[e.code];
            if(key) {
                this.keys[key][0] = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            e.preventDefault();
            const key = keyNames[e.code];
            if(key) {
                this.keys[key][0] = false;
            }
        });

        gfx.canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();
            const scale = gfx.width / gfx.canvas.clientWidth;
            const clientRect = gfx.canvas.getClientRects()[0];
            this.mouseX = (e.clientX - clientRect.x) * scale;
            this.mouseY = (e.clientY - clientRect.y) * scale;
            return false;
        });

        gfx.canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if(e.button === 0) {
                this.mouseButton[0] = true;
            }
            return false;
        });

        gfx.canvas.addEventListener('mouseup', (e) => {
            e.preventDefault();
            if(e.button === 0) {
                this.mouseButton[0] = false;
            }
            return false;
        });
    }

    newFrame(): void {
        for(const key in this.keys) {
            this.keys[key][1] = this.keys[key][0];
        }

        this.mouseButton[1] = this.mouseButton[0];
    }

    mouseIsPressed(): boolean {
        if(this.mouseButton[0]) {
            return true;
        }

        return false;
    }

    mouseIsJustPressed(): boolean {
        if(this.mouseButton[0] && !this.mouseButton[1]) {
            return true;
        }

        return false;
    }

    mouseIsJustReleased(): boolean {
        if(!this.mouseButton[0] && this.mouseButton[1]) {
            return true;
        }

        return false;
    }

    keyIsPressed(...keys: string[]): boolean {
        if(keys.length > 0) {
            for(let i=0; i<keys.length; ++i) {
                if(this.keys[keys[i]][0]) {
                    return true;
                }
            }
        }
        else {
            for(const key in this.keys) {
                if(this.keys[key][0]) {
                    return true;
                }
            }
        }

        return false;
    }

    keyIsJustPressed(...keys: string[]): boolean {
        if(keys.length > 0) {
            for(let i=0; i<keys.length; ++i) {
                if( this.keys[keys[i]][0] &&
                   !this.keys[keys[i]][1]) {
                    return true;
                }
            }
        }
        else {
            for(const key in this.keys) {
                if( this.keys[key][0] &&
                   !this.keys[key][1]) {
                    return true;
                }
            }
        }

        return false;
    }

    keyIsJustReleased(...keys: string[]): boolean {
        if(keys.length > 0) {
            for(let i=0; i<keys.length; ++i) {
                if(!this.keys[keys[i]][0] &&
                    this.keys[keys[i]][1]) {
                    return true;
                }
            }
        }
        else {
            for(const key in this.keys) {
                if(!this.keys[key][0] &&
                    this.keys[key][1]) {
                    return true;
                }
            }
        }

        return false;
    }
}

const input = new InputState();

export default input;
