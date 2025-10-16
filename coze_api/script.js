const endpoint = 'https://api.coze.cn/open_api/v2/chat';

/**
 * Coze 的 API 调用需要传 bot_id 和 user 参数，
 * 其中 bot_id 就是我们创建的通用智能体的 ID，前面我们说过它可以从浏览器地址栏的 URL 中获得
 * user 可以是一个任意字符串，只是用来标识。
 * 此外，Coze API 的 query 和 chat_history 是分开的，当前输入内容以 query 字段传入，格式是一个字符串，而历史消息以 chat_history 字段传入，格式和前面 Deepseek 的 messages 差不多，具体可以看 Coze 的官方文档。
 * 如果不需要历史消息，只需要传入一个空的数组。
 * 由于 Coze 没有 system 消息，它的提示词是在人设与回复逻辑中设置，我们在前面创建时，已经定义了一个叫 prompt 的模板变量，所以在这里我们可以通过 custom_variables 参数将 prompt 变量的具体值传入
 */
const payload = {
    bot_id: import.meta.env.VITE_BOT_ID,
    user: 'yvo',
    query: '你好',
    chat_history: [],
    stram: false,
    custom_variables: {
        prompt: '你是一个AI助手',
    },
};

const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify(payload),
});

const data = await response.json();
document.getElementById('reply').textContent = data.messages[0].content;
