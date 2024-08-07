import { Node } from "./type";

export const NODES: Node[] = [
    {
        name: "Recents",
        nodes: [
            {
                name: "ScreenShort",
                nodes: [],
            },
        ],
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
                                    { name: "Gladiator.mp4" },
                                    { name: "The-Dark-Knight.mp4" },
                                ],
                            },
                            { name: "2010s", nodes: [] },
                        ],
                    },
                    {
                        name: "Comedy",
                        nodes: [{ name: "2000s", nodes: [{ name: "Superbad.mp4" }] }],
                    },
                    {
                        name: "Drama",
                        nodes: [
                            { name: "2000s", nodes: [{ name: "American-Beauty.mp4" }] },
                        ],
                    },
                ],
            },
            {
                name: "Music",
                nodes: [
                    { name: "Rock", nodes: [] },
                    { name: "Classical", nodes: [] },
                ],
            },
            { name: "Pictures", nodes: [] },
            { name: "Codes", nodes: [] },
            { name: "Projects", nodes: [] },
            { name: "Games", nodes: [] },
            { name: "Notes", nodes: [] },
            { name: "Test", nodes: [] },
            { name: "Homeworks", nodes: [] },
            {
                name: "Documents",
                nodes: [],
            },
            { name: "passwords.txt" },
            { name: "myNotes.txt" },
            { name: "email.txt" },
        ],
    },
    {
        name: "Desktop",
        nodes: [
            {
                name: "Programs",
                nodes: [],
            },
        ],
    },
];

export const DEFAULT_SIZE_FOR_FINDER = {
    width: 800,
    height: 500
}

export const PERMANENT_FOLDER = ['Home', 'Desktop', 'Recents'];

export const AVAILABLE_WALLPAPERS = ['/wallpaper_1.jpg', '/wallpaper_2.jpg', '/wallpaper_3.jpg'];