import Stats from "../components/stats";

export interface PowerUp {
    apply(stats: Stats): void;
}