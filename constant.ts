import { Node } from "./type";

export const NODES: Node[] = [
    {
        name: "Recents",
        nodes: [
            {
                name: "ScreenShort",
                nodes: [],
                order: 0,
                id: 1
            },
        ],
        order: 0,
        id: 1,
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
                                    { name: "Gladiator.mp4", order: 0, id: 1 },
                                    { name: "The-Dark-Knight.mp4", order: 1, id: 2 },
                                ],
                                order: 0,
                                id: 1
                            },
                            { name: "2010s", nodes: [], order: 1, id: 2 },
                        ],
                        order: 0,
                        id: 1
                    },
                    {
                        name: "Comedy",
                        nodes: [
                            {
                                name: "2000s",
                                nodes: [
                                    { name: "Superbad.mp4", order: 0, id: 1 }
                                ],
                                order: 0,
                                id: 1
                            }
                        ],
                        order: 1,
                        id: 2
                    },
                    {
                        name: "Drama",
                        nodes: [
                            { name: "2000s", nodes: [{ name: "American-Beauty.mp4", order: 0, id: 1 }], order: 0, id: 1 },
                        ],
                        order: 2,
                        id: 3
                    },
                ],
                order: 0,
                id: 1
            },
            {
                name: "Music",
                nodes: [
                    { name: "Rock", nodes: [], order: 0, id: 1 },
                    { name: "Classical", nodes: [], order: 1, id: 2 },
                ],
                order: 1,
                id: 2
            },
            { name: "Pictures", nodes: [], order: 2, id: 3 },
            { name: "Codes", nodes: [], order: 3, id: 4 },
            { name: "Projects", nodes: [], order: 4, id: 5 },
            { name: "Games", nodes: [], order: 5, id: 6 },
            { name: "Notes", nodes: [], order: 6, id: 7 },
            { name: "Test", nodes: [], order: 7, id: 8 },
            { name: "Homeworks", nodes: [], order: 8, id: 9 },
            {
                name: "Documents",
                nodes: [],
                order: 9,
                id: 10,
            },
            { name: "passwords.txt", order: 10, id: 11 },
            { name: "myNotes.txt", order: 11, id: 12 },
            { name: "email.txt", order: 12, id: 13 },
        ],
        order: 1,
        id: 2
    },
    {
        name: "Desktop",
        nodes: [
            {
                name: "Programs",
                nodes: [],
                order: 0,
                id: 1,
            },
        ],
        order: 2,
        id: 3
    },
];

export const DEFAULT_SIZE_FOR_FINDER = {
    width: 800,
    height: 500
}

export const PERMANENT_FOLDER = ['Home', 'Desktop', 'Recents'];

export const AVAILABLE_WALLPAPERS = ['/wallpaper_1.jpg', '/wallpaper_2.jpg', '/wallpaper_3.jpg'];

