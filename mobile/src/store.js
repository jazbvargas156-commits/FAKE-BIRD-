import * as SQLite from 'expo-sqlite';
import {Directory,File,Paths} from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
let dbPromise;
export function uid(){return Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12);}
async function db(){if(!dbPromise)dbPromise=(async()=>{const d=await SQLite.openDatabaseAsync('fake-bird.db');await d.execAsync('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS profiles (id TEXT PRIMARY KEY, data TEXT NOT NULL); CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, data TEXT NOT NULL); CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);');return d;})().catch(e=>{dbPromise=null;throw e});return dbPromise;}
export async function load(){const d=await db();const [profiles,posts,actor]=await Promise.all([d.getAllAsync('SELECT data FROM profiles'),d.getAllAsync('SELECT data FROM posts'),d.getFirstAsync('SELECT value FROM settings WHERE key=?','actor')]);return {profiles:profiles.map(r=>JSON.parse(r.data)),posts:posts.map(r=>JSON.parse(r.data)),actor:actor?.value||''};}
async function put(table,item){const d=await db();await d.runAsync('INSERT INTO '+table+' (id,data) VALUES (?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data',item.id,JSON.stringify(item));}
export const saveProfile=p=>put('profiles',p);
export const savePost=p=>put('posts',p);
export async function saveActor(id){const d=await db();await d.runAsync('INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value','actor',id);}
export async function deletePosts(ids){const d=await db();await d.withExclusiveTransactionAsync(async tx=>{for(const id of ids)await tx.runAsync('DELETE FROM posts WHERE id=?',id);});}
function mediaDir(){return new Directory(Paths.document,'fakebird-media');}
export function mediaUri(name){return name?new File(mediaDir(),name).uri:undefined;}
export async function chooseImages(limit=1){const r=await ImagePicker.launchImageLibraryAsync({mediaTypes:['images'],allowsMultipleSelection:limit>1,selectionLimit:limit,quality:0.8});if(r.canceled)return [];const dir=mediaDir();dir.create({idempotent:true,intermediates:true});return r.assets.slice(0,limit).map(a=>{const ext=({'image/png':'png','image/heic':'heic','image/heif':'heif','image/webp':'webp','image/gif':'gif','image/avif':'avif'})[(a.mimeType||'').toLowerCase()]||'jpg';const name=uid()+'.'+ext;new File(a.uri).copy(new File(dir,name));return name;});}
