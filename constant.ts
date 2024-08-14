import { Node } from "./type";
import { v4 as uuidv4 } from "uuid";

export const NODES: Node[] = [
  {
    name: "Recents",
    nodes: [
      {
        name: "Screen shot",
        nodes: [],
        order: 0,
        id: uuidv4(),
      },
    ],
    order: 0,
    id: uuidv4(),
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
                  { name: "Gladiator.mp4", order: 0, id: uuidv4() },
                  { name: "The-Dark-Knight.mp4", order: 1, id: uuidv4() },
                ],
                order: 0,
                id: uuidv4(),
              },
              { name: "2010s", nodes: [], order: 1, id: uuidv4() },
            ],
            order: 0,
            id: uuidv4(),
          },
          {
            name: "Comedy",
            nodes: [
              {
                name: "2000s",
                nodes: [{ name: "Superbad.mp4", order: 0, id: uuidv4() }],
                order: 0,
                id: uuidv4(),
              },
            ],
            order: 1,
            id: uuidv4(),
          },
          {
            name: "Drama",
            nodes: [
              {
                name: "2000s",
                nodes: [
                  { name: "American-Beauty.mp4", order: 0, id: uuidv4() },
                ],
                order: 0,
                id: uuidv4(),
              },
            ],
            order: 2,
            id: uuidv4(),
          },
        ],
        order: 0,
        id: uuidv4(),
      },
      {
        name: "Music",
        nodes: [
          { name: "Rock", nodes: [], order: 0, id: uuidv4() },
          { name: "Classical", nodes: [], order: 1, id: uuidv4() },
        ],
        order: 1,
        id: uuidv4(),
      },
      { name: "Pictures", nodes: [], order: 2, id: uuidv4() },
      { name: "Codes", nodes: [], order: 3, id: uuidv4() },
      { name: "Projects", nodes: [], order: 4, id: uuidv4() },
      { name: "Games", nodes: [], order: 5, id: uuidv4() },
      { name: "Notes", nodes: [], order: 6, id: uuidv4() },
      { name: "Test", nodes: [], order: 7, id: uuidv4() },
      { name: "Homeworks", nodes: [], order: 8, id: uuidv4() },
      {
        name: "Documents",
        nodes: [],
        order: 9,
        id: uuidv4(),
      },
      { name: "passwords.txt", order: 10, id: uuidv4() },
      { name: "myNotes.txt", order: 11, id: uuidv4() },
      { name: "email.txt", order: 12, id: uuidv4() },
    ],
    order: 1,
    id: uuidv4(),
  },
  {
    name: "Desktop",
    nodes: [
      {
        name: "Programs",
        nodes: [],
        order: 0,
        id: uuidv4(),
      },
    ],
    order: 2,
    id: uuidv4(),
  },
];

export const DEFAULT_SIZE_FOR_FINDER = {
  width: 800,
  height: 500,
};

export const PERMANENT_FOLDER = ["Home", "Desktop", "Recents"];

export const AVAILABLE_WALLPAPERS = [
  "/wallpaper_1.jpg",
  "/wallpaper_2.jpg",
  "/wallpaper_3.jpg",
];
