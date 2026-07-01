import type { AnnouncementConfig } from "../types/config";

// 公告栏配置
export const announcementConfig: AnnouncementConfig = {
	title: "", // 公告标题，填空使用i18n字符串Key.announcement
	content: "欢迎访问我的博客！这里展示我的各项记录和日常、笔记以及状态。", // 公告内容
	closable: true, // 允许用户关闭公告
	link: {
		enable: true, // 启用链接
		text: "查看项目",
		url: "/projects/",
		external: false, // 内部链接
	},
};
