const endpoint = 'https://api.deepseek.com/chat/completions';
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
};

const payload = {
    /**
     * model 字段指定了要调用的模型类型，Deepseek Platform 支持两个模型。其中 deepseek-chat 是基础模型，目前版本是 v3，deepseek-reasoner 是深度思考模型，目前版本号是 r1。
     */
    model: 'deepseek-chat',
    /**
     * messages 字段指定了对话历史，对话历史是一个数组，数组中的每个元素都是一个对象，对象包含 role 和 content 两个字段。
     * role 字段指定了对话角色，目前支持 system、user、assistant、function、tool 四个角色。
     * content 字段指定了对话内容，内容可以是字符串或数组。
     */
    messages: [
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: "你好 Deepseek"}
    ],
    /**
     * stream 字段指定了是否启用流式返回，如果设置为 true，则返回的数据会是流式数据，否则返回的数据是完整的 JSON 数据。
     */
    stream: false,
};


const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
});

const data = await response.json();
document.getElementById('reply').textContent = data.choices[0].message.content;
