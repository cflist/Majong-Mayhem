export class Tile {
    xPos: number;
    yPos: number;
    zPos: number;
    tile: {
        id: number;
        suit: string;
        name: number;
        matchesWholeSuit: boolean;
    };
    _id: string;
    match: {
        foundBy: string;
        otherTileId: string;
        foundOn: Date;
    };
}
