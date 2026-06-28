// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[];
	certifications?: string[];
	color?: string;
}

export const skillsData: Skill[] = [
	// Programming Languages
	{
		id: "python",
		name: "Python",
		description: "主力开发语言，用于后端开发、工程计算、数据处理及桌面应用开发。",
		icon: "logos:python",
		category: "backend",
		level: "advanced",
		experience: { years: 3, months: 0 },
		projects: ["xunyang-flood-control", "flood-regulation", "runoff-regulation", "rag-water-conservancy"],
		color: "#3776AB",
	},
	{
		id: "javascript",
		name: "JavaScript",
		description: "Web 前端开发，使用 Vue3 进行前端界面开发。",
		icon: "logos:javascript",
		category: "frontend",
		level: "intermediate",
		experience: { years: 1, months: 6 },
		projects: ["xunyang-flood-control", "resume-analysis"],
		color: "#F7DF1E",
	},

	// Frontend
	{
		id: "vue",
		name: "Vue.js",
		description: "使用 Vue3 开发数据可视化界面和 Web 应用前端。",
		icon: "logos:vue",
		category: "frontend",
		level: "intermediate",
		experience: { years: 1, months: 6 },
		projects: ["xunyang-flood-control", "resume-analysis"],
		color: "#4FC08D",
	},
	{
		id: "echarts",
		name: "ECharts",
		description: "数据可视化图表库，实现洪水过程线、调度方案等动态图表展示。",
		icon: "logos:echarts",
		category: "frontend",
		level: "intermediate",
		experience: { years: 1, months: 0 },
		projects: ["xunyang-flood-control"],
		color: "#AA344D",
	},

	// Backend
	{
		id: "flask",
		name: "Flask",
		description: "Python Web 框架，用于开发 RESTful API 和后端服务。",
		icon: "logos:flask",
		category: "backend",
		level: "advanced",
		experience: { years: 2, months: 0 },
		projects: ["xunyang-flood-control", "resume-analysis"],
		color: "#000000",
	},

	// Desktop
	{
		id: "pyside6",
		name: "PySide6/PyQt5",
		description: "Python 桌面应用开发框架，用于开发工程计算软件界面。",
		icon: "logos:qt",
		category: "tools",
		level: "advanced",
		experience: { years: 1, months: 6 },
		projects: ["flood-regulation", "runoff-regulation", "rag-water-conservancy"],
		color: "#41CD52",
	},

	// Database
	{
		id: "sqlserver",
		name: "SQL Server",
		description: "关系型数据库，用于企业级数据存储与管理。",
		icon: "logos:mysql",
		category: "database",
		level: "intermediate",
		experience: { years: 1, months: 0 },
		projects: ["xunyang-flood-control"],
		color: "#CC2927",
	},
	{
		id: "sqlite",
		name: "SQLite",
		description: "轻量级嵌入式数据库，用于桌面应用本地数据存储。",
		icon: "logos:sqlite",
		category: "database",
		level: "intermediate",
		experience: { years: 1, months: 0 },
		color: "#003B57",
	},
	{
		id: "chromadb",
		name: "ChromaDB",
		description: "向量数据库，用于 RAG 知识库的向量化存储与检索。",
		icon: "logos:chromadb",
		category: "database",
		level: "intermediate",
		experience: { years: 0, months: 6 },
		projects: ["rag-water-conservancy"],
		color: "#FAR729",
	},

	// Data & Tools
	{
		id: "pandas",
		name: "Pandas",
		description: "Python 数据分析库，用于水利数据处理与 Excel 自动化。",
		icon: "logos:pandas",
		category: "tools",
		level: "advanced",
		experience: { years: 2, months: 0 },
		projects: ["flood-regulation", "runoff-regulation"],
		color: "#150458",
	},
	{
		id: "numpy",
		name: "NumPy",
		description: "Python 科学计算库，用于工程数值计算。",
		icon: "logos:numpy",
		category: "tools",
		level: "advanced",
		experience: { years: 2, months: 0 },
		color: "#013243",
	},
	{
		id: "scipy",
		name: "Scipy",
		description: "科学计算工具库，用于插值、优化等工程计算。",
		icon: "logos:scipy",
		category: "tools",
		level: "intermediate",
		experience: { years: 1, months: 6 },
		projects: ["flood-regulation"],
		color: "#8CAAE6",
	},
	{
		id: "git",
		name: "Git",
		description: "版本控制工具，用于协作开发与代码管理。",
		icon: "logos:git-icon",
		category: "tools",
		level: "intermediate",
		experience: { years: 2, months: 0 },
		color: "#F05032",
	},

	// AI & ML
	{
		id: "langchain",
		name: "LangChain",
		description: "大模型应用开发框架，用于构建 RAG 检索增强生成流程。",
		icon: "logos:langchain",
		category: "other",
		level: "intermediate",
		experience: { years: 0, months: 6 },
		projects: ["rag-water-conservancy"],
		color: "#1C3C3C",
	},
	{
		id: "scikit-learn",
		name: "Scikit-learn",
		description: "机器学习库，用于文本特征提取与相似度计算。",
		icon: "logos:scikit-learn",
		category: "other",
		level: "intermediate",
		experience: { years: 0, months: 8 },
		projects: ["resume-analysis"],
		color: "#F7931E",
	},

	// Engineering tools
	{
		id: "arcgis",
		name: "ArcGIS",
		description: "地理信息系统软件，用于水利相关空间数据处理。",
		icon: "mdi:map",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 6 },
		color: "#2C5F2D",
	},
	{
		id: "autocad",
		name: "AutoCAD",
		description: "工程制图软件，用于水利工程设计图纸绘制。",
		icon: "mdi:draw-pen",
		category: "other",
		level: "beginner",
		experience: { years: 0, months: 6 },
		color: "#E51050",
	},
];

// Get skill statistics
export const getSkillStats = () => {
	const total = skillsData.length;
	const byCategory: Record<string, number> = {};
	const byLevel: Record<string, number> = {};

	skillsData.forEach((skill) => {
		byCategory[skill.category] = (byCategory[skill.category] || 0) + 1;
		byLevel[skill.level] = (byLevel[skill.level] || 0) + 1;
	});

	return { total, byCategory, byLevel };
};

// Get skills by category
export const getSkillsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return skillsData;
	}
	return skillsData.filter((s) => s.category === category);
};
