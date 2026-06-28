import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp", // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
	name: "穆哈麦提·麦合木提",
	bio: [
		"水利工程 × 软件开发 | 科幻爱好者",
		"Water Engineer × Software Developer | Sci-Fi Enthusiast",
		"水利エンジニア × ソフトウェア開発者 | SF愛好家",
	],
	typewriter: {
		enable: true, // 启用个人简介打字机效果
		speed: 80, // 打字速度（毫秒）
	},
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/Mhmt-Mhmt",
		},
		{
			name: "Gitee",
			icon: "mdi:git",
			url: "https://gitee.com/Mhmt",
		},
		{
			name: "Bilibili",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/1647126462",
		},
		{
			name: "Email",
			icon: "material-symbols:mail",
			url: "mailto:1272167775@qq.com",
		},
	],
};
