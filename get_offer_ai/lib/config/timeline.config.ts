/* 
  定义面试过程的时间线
  0~3 分钟 自我介绍
  3~10 分钟 项目讨论
  10~17 分钟 技术讨论
  17～25 分钟 代码和算法讨论
  25~30 分钟 非技术问题讨论
  30~32 分钟 反问
  32 分钟以上 结束
*/

interface TimelineStep {
  startTime: number;
  endTime: number;
  focus: string; // 聚焦的问题，例如项目、技术、代码、算法、非技术问题
  prompt: string; // 提示语
}

interface TimelineConfig {
  steps: TimelineStep[];
}

export const timelineConfig: TimelineConfig = {
  steps: [
    {
      startTime: 0,
      endTime: 2,
      focus: '自我介绍',
      prompt: `当前在自我介绍阶段，你要求候选人自我介绍，内容包括：
1. 个人信息
2. 教育背景
3. 工作经历
4. 项目经历
5. 擅长的技术
6. 自我评价

你首先根据<memory>的信息，判断候选人是否完成了自我介绍，如果没有完成，你询问并收集候选人缺失的信息，以便于后续的面试。
      `,
    }
  ]
};