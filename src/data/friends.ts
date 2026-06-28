// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "NumPy",
		imgurl: "https://avatars.githubusercontent.com/u/288276?v=4&s=640",
		desc: "The fundamental package for scientific computing with Python",
		siteurl: "https://numpy.org",
		tags: ["Python", "科学计算"],
	},
	{
		id: 2,
		title: "qfluentwidgets",
		imgurl: "https://avatars.githubusercontent.com/u/102226221?v=4&s=640",
		desc: "Fluent Design widget library for PyQt/PySide",
		siteurl: "https://github.com/zhiyiYo/PyQt-Fluent-Widgets",
		tags: ["Python", "GUI", "PySide"],
	},
	{
		id: 3,
		title: "scikit-learn",
		imgurl: "https://avatars.githubusercontent.com/u/365630?v=4&s=640",
		desc: "Machine learning in Python",
		siteurl: "https://scikit-learn.org",
		tags: ["Python", "机器学习", "AI"],
	},
	{
		id: 4,
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
	},
	{
		id: 5,
		title: "Mizuki Docs",
		imgurl:
			"https://q.qlogo.cn/headimg_dl?dst_uin=3231515355&spec=640&img_type=jpg",
		desc: "Mizuki User Manual",
		siteurl: "https://docs.mizuki.mysqil.com",
		tags: ["Docs"],
	},
	{
		id: 6,
		title: "GitHub",
		imgurl: "https://avatars.githubusercontent.com/u/9919?v=4&s=640",
		desc: "Where the world builds software",
		siteurl: "https://github.com",
		tags: ["Development", "Platform"],
	},
	{
		id: 7,
		title: "Vercel",
		imgurl: "https://avatars.githubusercontent.com/u/14985020?v=4&s=640",
		desc: "Develop. Preview. Ship.",
		siteurl: "https://vercel.com",
		tags: ["Hosting", "Cloud"],
	},
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
