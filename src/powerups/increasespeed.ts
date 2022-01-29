import Stats from "../components/stats";
import Entity from "../entity";
import { PowerUp } from "./powerup";


export default class IncreaseSpeed implements PowerUp {
    apply(stats: Stats) {
        stats.speedModifier *= 1.2;
        stats.onapply();
    }
}