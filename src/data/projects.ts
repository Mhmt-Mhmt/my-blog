// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	visitUrl?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	showImage?: boolean;
}

export const projectsData: Project[] = [
	{
		id: "xunyang-flood-control",
		title: "旬阳水力发电厂水库调度辅助决策系统",
		description:
			"为大唐陕西发电有限公司开发的水库调度辅助决策系统，实现洪水预报数据管理、调度方案生成与可视化展示。项目已完成实际业务交付并投入使用，并获得国家计算机软件著作权。（企业项目，代码未开源）",
		image: "",
		category: "web",
		techStack: ["Python", "Flask", "SQLServer", "Vue3", "ECharts"],
		status: "completed",
		startDate: "2024-07-01",
		endDate: "2024-11-30",
		featured: true,
		tags: ["企业项目", "水库调度", "数据可视化"],
		showImage: false,
	},
	{
		id: "flood-regulation",
		title: "调洪计算系统",
		description:
			"为山西省水利水电勘测设计研究院开发的专业调洪计算软件。基于水量平衡原理实现调洪计算算法，使用二分法、插值等方法完成核心计算逻辑。已在设计院实际业务中投入使用，获山西省农林水系统'五小'创新大赛三等奖。（企业项目，代码未开源）",
		image: "",
		category: "desktop",
		techStack: ["Python", "PySide6", "qfluentwidgets", "Pandas"],
		status: "completed",
		liveDemo: "https://b23.tv/BV1i8Eg6ME9B",
		startDate: "2025-12-01",
		endDate: "2026-02-28",
		featured: true,
		tags: ["企业项目", "调洪计算", "桌面应用"],
		showImage: false,
	},
	{
		id: "runoff-regulation",
		title: "径流调节计算系统",
		description:
			"基于设计院原有 VBA 系统进行工程化重构与功能扩展。重构逐月调节功能，新增逐旬、逐日调节功能，开发现代化 GUI 界面，增加 Excel 报表导出、水印、工程文件管理等功能。已交付使用并稳定运行。（企业项目，代码未开源）",
		image: "",
		category: "desktop",
		techStack: ["Python", "PySide6", "Pandas", "Openpyxl"],
		status: "completed",
		startDate: "2026-02-01",
		endDate: "2026-03-31",
		featured: true,
		tags: ["企业项目", "径流调节", "桌面应用"],
		showImage: false,
	},
	{
		id: "rag-water-conservancy",
		title: "基于 RAG 的水利智能问答系统",
		description:
			"探索 AI 技术在水利行业中的知识库问答与辅助分析应用。基于 LangChain 构建 RAG 检索增强生成流程，使用 ChromaDB 实现本地知识库向量化存储与检索，支持 Markdown/PDF 专业文档解析，接入大模型 API。",
		image: "",
		category: "desktop",
		techStack: ["LangChain", "ChromaDB", "PySide6", "Python"],
		status: "completed",
		sourceCode: "https://github.com/Mhmt-Mhmt/Agent_RAG",
		startDate: "2026-02-01",
		endDate: "2026-03-31",
		tags: ["个人项目", "AI", "RAG"],
		showImage: false,
	},
	{
		id: "resume-analysis",
		title: "简历智能分析与评分系统",
		description:
			"为高校毕业设计项目开发的简历智能分析系统。使用 Flask + Vue3 完成前后端分离开发，基于 TF-IDF 与余弦相似度实现文本查重功能，实现简历内容解析与自动化评分逻辑，接入大模型 API 完成简历信息提取与分析。",
		image: "",
		category: "web",
		techStack: ["Vue3", "Flask", "Scikit-learn", "Python"],
		status: "completed",
		sourceCode: "https://github.com/Mhmt-Mhmt/Resume-Analayse-System",
		startDate: "2025-01-01",
		endDate: "2025-03-31",
		tags: ["个人项目", "AI", "Web"],
		showImage: false,
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter((p) => p.status === "completed").length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
