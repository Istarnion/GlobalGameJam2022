import Stats from "../components/stats";
import { PowerUp } from "./powerup";

export default class DecreaseSpeed implements PowerUp {
    apply(stats: Stats) {
        stats.speedModifier /= 1.3;
        stats.onapply();
    }
}