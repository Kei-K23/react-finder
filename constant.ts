import { Node } from "./type";

export const NODES: Node[] = [
    {
        name: "Recents",
        nodes: [
            {
                name: "ScreenShort",
                nodes: [],
                order: 0
            },
        ],
        order: 0,
    },
    {
        name: "Home",
        nodes: [
            {
                name: "Movies",
                nodes: [
                    {
                        name: "Action",
                        nodes: [
                            {
                                name: "2000s",
                                nodes: [
                                    { name: "Gladiator.mp4", order: 0 },
                                    { name: "The-Dark-Knight.mp4", order: 1 },
                                ],
                                order: 0
                            },
                            { name: "2010s", nodes: [], order: 1 },
                        ],
                        order: 0
                    },
                    {
                        name: "Comedy",
                        nodes: [
                            {
                                name: "2000s",
                                nodes: [
                                    { name: "Superbad.mp4", order: 0 }
                                ],
                                order: 0
                            }
                        ],
                        order: 1
                    },
                    {
                        name: "Drama",
                        nodes: [
                            { name: "2000s", nodes: [{ name: "American-Beauty.mp4", order: 0 }], order: 0 },
                        ],
                        order: 2
                    },
                ],
                order: 0
            },
            {
                name: "Music",
                nodes: [
                    { name: "Rock", nodes: [], order: 0 },
                    { name: "Classical", nodes: [], order: 1 },
                ],
                order: 1
            },
            { name: "Pictures", nodes: [], order: 2 },
            { name: "Codes", nodes: [], order: 3 },
            { name: "Projects", nodes: [], order: 4 },
            { name: "Games", nodes: [], order: 5 },
            { name: "Notes", nodes: [], order: 6 },
            { name: "Test", nodes: [], order: 7 },
            { name: "Homeworks", nodes: [], order: 8 },
            {
                name: "Documents",
                nodes: [],
                order: 9
            },
            { name: "passwords.txt", order: 10 },
            { name: "myNotes.txt", order: 11 },
            { name: "email.txt", order: 12 },
        ],
        order: 1
    },
    {
        name: "Desktop",
        nodes: [
            {
                name: "Programs",
                nodes: [],
                order: 0
            },
        ],
        order: 2
    },
];

export const DEFAULT_SIZE_FOR_FINDER = {
    width: 800,
    height: 500
}

export const PERMANENT_FOLDER = ['Home', 'Desktop', 'Recents'];

export const AVAILABLE_WALLPAPERS = ['/wallpaper_1.jpg', '/wallpaper_2.jpg', '/wallpaper_3.jpg'];

