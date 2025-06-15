/**
 * 项目入口文件
 * @description 这是项目的主入口文件
 * @author RAG Demo Project
 * @version 1.0.0
 */
import path from 'node:path';
import { LocalIndex } from 'vectra';
import { getVector, getEmbeddings } from "./utils";

export class SimpleRag {
  private db: LocalIndex | undefined;

  get avaliable() {
    return this.db !== undefined;
  }

  async initialize(indexPath: string = '.index') {
    const index = new LocalIndex(path.join(__dirname, '..', indexPath));
    if (!(await index.isIndexCreated())) {
      await index.createIndex();
    }
    this.db = index;
  }

  async add(text: string) {
    if(!this.avaliable) throw new Error('RAG is not initialized');

    const embeddings = await getEmbeddings(text);
    const res = await Promise.all(embeddings.map(async (embedding) => this.db?.insertItem(embedding)));
    return res.filter(item => item).map((item) => ({id: item!.id}));
  }

  async del(items: {id: string}|{id: string}[]) {
    if(!Array.isArray(items)) items = [items];
    if(!this.avaliable) throw new Error('RAG is not initialized');
    return await Promise.all(items.map(async (item) => this.db?.deleteItem(item.id)));
  }

  async query(query: string, topK: number = 5) {
    if(!this.avaliable) throw new Error('RAG is not initialized');
    const vector = await getVector(query);
    const result = await this.db?.queryItems(vector, query, topK);
    return result?.map(({item, score}) => ({
      text: item.metadata.text,
      query,
      simularity: score,
      id: item.id,
    }));
  }
}