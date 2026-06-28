import type { TimelineItem } from "../components/features/timeline/types";

export const timelineData: TimelineItem[] = [
	// Education
	{
		id: "university",
		title: "太原理工大学（211）",
		description:
			"水文与水资源工程专业 · 本科。主修方向：水文学、水库调度、水文预报、水力学、水资源工程等。",
		type: "education",
		startDate: "2021-09-01",
		endDate: "2025-06-30",
		location: "山西太原",
		organization: "太原理工大学",
		skills: ["水文与水资源", "水力学", "水文预报", "Python", "ArcGIS"],
		achievements: [
			"具备水利工程与软件开发复合背景",
			"参与多个实际工程软件开发项目",
			"毕业后从事水利信息化与软件开发工作",
		],
		icon: "material-symbols:school",
		color: "#2563EB",
		featured: true,
	},

	// Work Experience
	{
		id: "work-design-institute",
		title: "软件开发 / 水利报告编制",
		description:
			"在山西省水利水电勘测设计研究院从事软件开发与水利报告编制工作。参与防洪评价等水利报告编写，开发调洪计算系统与径流调节计算系统，并根据工程人员实际使用反馈持续维护与优化软件。",
		type: "work",
		startDate: "2025-10-01",
		endDate: "2026-03-31",
		location: "山西太原",
		organization: "山西省水利水电勘测设计研究院",
		position: "软件开发 / 水利报告编制",
		skills: ["Python", "PySide6", "Pandas", "调洪计算", "径流调节"],
		achievements: [
			"开发调洪计算系统并获'五小'创新大赛三等奖",
			"完成径流调节计算系统的 VBA 重构",
			"参与防洪评价等水利报告编写",
		],
		icon: "material-symbols:work",
		color: "#DC2626",
		featured: true,
	},
	{
		id: "work-qiancheng",
		title: "水利工程技术人员",
		description:
			"在山西千程水利工程设计有限公司从事水利工程相关技术工作，参与防洪评价等水利工程相关报告编写及技术工作。",
		type: "work",
		startDate: "2026-03-01",
		location: "山西太原",
		organization: "山西千程水利工程设计有限公司",
		position: "水利工程技术人员",
		skills: ["水利工程", "报告编制", "防洪评价"],
		achievements: [
			"参与防洪评价等水利工程报告编写",
			"参与水利工程相关技术工作",
		],
		icon: "material-symbols:work",
		color: "#2563EB",
		featured: true,
	},

	// Achievements
	{
		id: "wx-fifth-innovation",
		title: "'五小'创新大赛三等奖",
		description:
			"调洪软件获得山西省农林水系统'五小'创新大赛三等奖，带队参加并完成答辩，展现了在工程软件领域的创新与实践能力。",
		type: "achievement",
		startDate: "2025-12-01",
		organization: "山西省农林水系统",
		skills: ["调洪计算", "PySide6", "桌面开发"],
		achievements: [
			"获得省部级三等奖",
			"带队参加并完成答辩",
			"工程软件创新实践",
		],
		icon: "material-symbols:emoji-events",
		color: "#F59E0B",
		featured: true,
	},
	{
		id: "software-copyright",
		title: "国家计算机软件著作权",
		description:
			"旬阳水力发电厂水库调度辅助决策系统获得国家版权局颁发的计算机软件著作权登记证书，证明独立开发系统的原创性。",
		type: "achievement",
		startDate: "2024-12-01",
		organization: "国家版权局",
		skills: ["Flask", "Vue3", "SQLServer"],
		achievements: [
			"获得国家计算机软件著作权",
			"完成系统开发与交付",
			"投入实际业务使用",
		],
		links: [
			{
				name: "项目仓库",
				url: "https://github.com/Mhmt-Mhmt/xunyang-flood-control",
				type: "project",
			},
		],
		icon: "material-symbols:verified",
		color: "#059669",
		featured: true,
	},
	{
		id: "robot-competition",
		title: "全国大学生机器人格斗大赛一等奖",
		description:
			"获得全国大学生机器人格斗大赛国家级一等奖，在团队中负责核心运动控制算法开发，体现了团队协作与技术实践能力。",
		type: "achievement",
		startDate: "2023-06-01",
		organization: "全国大学生机器人竞赛组委会",
		skills: ["运动控制", "算法开发", "嵌入式"],
		achievements: [
			"国家级一等奖",
			"负责核心运动控制算法",
			"团队协作与技术实践",
		],
		icon: "material-symbols:emoji-events",
		color: "#7C3AED",
		featured: true,
	},

	// Projects
	{
		id: "project-xunyang",
		title: "旬阳水力发电厂水库调度辅助决策系统",
		description:
			"为大唐陕西发电有限公司开发的水库调度辅助决策系统，实现洪水预报数据管理、调度方案生成与可视化展示。基于 Flask + SQLServer 完成后端开发，使用 Vue3 + ECharts 开发数据可视化界面。",
		type: "project",
		startDate: "2024-07-01",
		endDate: "2024-11-30",
		skills: ["Python", "Flask", "SQLServer", "Vue3", "ECharts"],
		achievements: [
			"完成系统开发与实际业务交付",
			"获国家计算机软件著作权",
			"实现 Excel 数据自动解析与入库",
		],
		links: [
			{
				name: "GitHub",
				url: "https://github.com/Mhmt-Mhmt/xunyang-flood-control",
				type: "project",
			},
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
		featured: true,
	},
	{
		id: "project-flood-regulation",
		title: "调洪计算系统开发",
		description:
			"为山西省水利水电勘测设计研究院开发专业调洪计算软件。基于水量平衡原理完成调洪计算算法工程化实现，使用 PySide6 + qfluentwidgets 开发桌面端图形界面。",
		type: "project",
		startDate: "2025-12-01",
		endDate: "2026-02-28",
		skills: ["Python", "PySide6", "qfluentwidgets", "Pandas"],
		achievements: [
			"软件已在设计院实际业务中投入使用",
			"项目源码被设计院正式采购",
			"获山西省'五小'创新大赛三等奖",
		],
		links: [
			{
				name: "GitHub",
				url: "https://github.com/Mhmt-Mhmt/Flood-regulation",
				type: "project",
			},
		],
		icon: "material-symbols:code",
		color: "#DC2626",
	},
	{
		id: "project-rag",
		title: "基于 RAG 的水利智能问答系统",
		description:
			"探索 AI 技术在水利行业中的应用。基于 LangChain 构建 RAG 检索增强生成流程，使用 ChromaDB 实现知识库向量化存储与检索。",
		type: "project",
		startDate: "2026-02-01",
		endDate: "2026-03-31",
		skills: ["LangChain", "ChromaDB", "PySide6", "Python"],
		achievements: [
			"实现水利专业知识库智能检索与问答",
			"完成桌面端知识库管理系统搭建",
			"支持 Markdown/PDF 文档知识解析",
		],
		links: [
			{
				name: "GitHub",
				url: "https://github.com/Mhmt-Mhmt/Agent_RAG",
				type: "project",
			},
		],
		icon: "material-symbols:psychology",
		color: "#059669",
	},
];
