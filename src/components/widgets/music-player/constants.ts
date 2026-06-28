import type { Song } from "./types";

export const STORAGE_KEY_VOLUME = "music-player-volume";

export const DEFAULT_VOLUME = 0.7;

export const LOCAL_PLAYLIST: Song[] = [
	{
		id: 1,
		title: "Always Remember Us This Way",
		artist: "Lady Gaga",
		cover: "assets/music/cover/Always Remember Us This Way.jpg",
		url: "assets/music/url/Always Remember Us This Way.mp3",
		duration: 0,
	},
	{
		id: 2,
		title: "Bob Dylan",
		artist: "Bob Dylan",
		cover: "assets/music/cover/Bob Dylan.jpg",
		url: "assets/music/url/Bob Dylan.mp3",
		duration: 0,
	},
	{
		id: 3,
		title: "Doin' Dirt",
		artist: "",
		cover: "assets/music/cover/Doin_Dirt.jpg",
		url: "assets/music/url/Doin_Dirt.mp3",
		duration: 0,
	},
	{
		id: 4,
		title: "Drive (From F1® The Movie)",
		artist: "",
		cover: "assets/music/cover/Drive (From F1® The Movie).jpg",
		url: "assets/music/url/Drive (From F1® The Movie).mp3",
		duration: 0,
	},
	{
		id: 5,
		title: "Easy Lover",
		artist: "",
		cover: "assets/music/cover/Easy Lover.jpg",
		url: "assets/music/url/Easy Lover.mp3",
		duration: 0,
	},
	{
		id: 6,
		title: "End It",
		artist: "",
		cover: "assets/music/cover/End It.jpg",
		url: "assets/music/url/End It.mp3",
		duration: 0,
	},
	{
		id: 7,
		title: "Etles koynek",
		artist: "Ablajan Awut Ayup",
		cover: "assets/music/cover/Etles koynek - Ablajan Awut Ayup.jpg",
		url: "assets/music/url/Etles koynek - Ablajan Awut Ayup.mp3",
		duration: 0,
	},
	{
		id: 8,
		title: "Faded",
		artist: "Alan Walker",
		cover: "assets/music/cover/Faded.jpg",
		url: "assets/music/url/Faded.mp3",
		duration: 0,
	},
	{
		id: 9,
		title: "Hasret",
		artist: "",
		cover: "assets/music/cover/Hasret.jpg",
		url: "assets/music/url/Hasret.mp3",
		duration: 0,
	},
	{
		id: 10,
		title: "Heaven",
		artist: "",
		cover: "assets/music/cover/Heaven.jpg",
		url: "assets/music/url/Heaven.mp3",
		duration: 0,
	},
	{
		id: 11,
		title: "Houdini",
		artist: "Dua Lipa",
		cover: "assets/music/cover/Houdini.jpg",
		url: "assets/music/url/Houdini.mp3",
		duration: 0,
	},
	{
		id: 12,
		title: "I Don't Write About Girls",
		artist: "",
		cover: "assets/music/cover/I Don't Write About Girls.jpg",
		url: "assets/music/url/I Don't Write About Girls.mp3",
		duration: 0,
	},
	{
		id: 13,
		title: "I Only Miss You",
		artist: "",
		cover: "assets/music/cover/I Only Miss You.jpg",
		url: "assets/music/url/I Only Miss You.mp3",
		duration: 0,
	},
	{
		id: 14,
		title: "Maria",
		artist: "",
		cover: "assets/music/cover/Maria.jpg",
		url: "assets/music/url/Maria.mp3",
		duration: 0,
	},
	{
		id: 15,
		title: "Masquerade",
		artist: "",
		cover: "assets/music/cover/Masquerade.jpg",
		url: "assets/music/url/Masquerade.mp3",
		duration: 0,
	},
	{
		id: 16,
		title: "Qidamdigansan",
		artist: "",
		cover: "assets/music/cover/Qidamdigansan&你能容忍吗.jpg",
		url: "assets/music/url/Qidamdigansan&你能容忍吗.mp3",
		duration: 0,
	},
	{
		id: 17,
		title: "Seni soyimen",
		artist: "",
		cover: "assets/music/cover/Seni soyimen.jpg",
		url: "assets/music/url/Seni soyimen.mp3",
		duration: 0,
	},
	{
		id: 18,
		title: "Shadow Of A Man",
		artist: "",
		cover: "assets/music/cover/Shadow Of A Man.jpg",
		url: "assets/music/url/Shadow Of A Man.mp3",
		duration: 0,
	},
	{
		id: 19,
		title: "The Way I Am",
		artist: "",
		cover: "assets/music/cover/The Way I Am.jpg",
		url: "assets/music/url/The Way I Am.mp3",
		duration: 0,
	},
	{
		id: 20,
		title: "ZEN",
		artist: "",
		cover: "assets/music/cover/ZEN.jpg",
		url: "assets/music/url/ZEN.mp3",
		duration: 0,
	},
];

export const DEFAULT_SONG: Song = {
	title: "Sample Song",
	artist: "Sample Artist",
	cover: "/favicon/favicon.ico",
	url: "",
	duration: 0,
	id: 0,
};

export const DEFAULT_METING_API =
	"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r";
export const DEFAULT_METING_ID = "14164869977";
export const DEFAULT_METING_SERVER = "netease";
export const DEFAULT_METING_TYPE = "playlist";

export const ERROR_DISPLAY_DURATION = 3000;
export const SKIP_ERROR_DELAY = 1000;
